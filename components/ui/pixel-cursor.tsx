"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Pixel-face cursor. The normal system cursor stays everywhere by default; the face appears only while the pointer is over an
 * interactive touchpoint (links, buttons, tabs, cards that read as clickable) and replaces the native cursor there.
 *
 * Subtle by design:
 *  - mouse / trackpad only (never touch or pen) and only on `(hover: hover) and (pointer: fine)` devices;
 *  - hidden the moment the page scrolls, so the native cursor is back while people scroll, and it returns ~140 ms after scrolling
 *    stops (or as soon as the mouse actually moves);
 *  - no lag or trail: the face sits exactly on the pointer, so the click point never drifts;
 *  - `prefers-reduced-motion` removes the pop-in (see globals.css).
 *
 * Size: `size` is the face's width in px (the halo and shadow add one cell on each side). Use multiples of 12 (24, 36, 48) so each of the 12 pixel cells lands on whole pixels.
 * Case-study cards (`.cs-card`) and images (`.cs-ex`) also count as touchpoints: they lift on hover, so the face marks them too.
 * Opt an element out with `data-cursor="off"`, or opt one in with `data-cursor="face"`.
 */

const TOUCHPOINTS = 'a[href], button:not([disabled]), [role="button"], [role="tab"], [role="menuitem"], [role="switch"], summary, label[for], [data-cursor="face"], .cs-card, .cs-ex';
const NATIVE_ONLY = 'input, textarea, select, [contenteditable=""], [contenteditable="true"], [data-cursor="off"]';

const cells = (rows: string[]) => rows.flatMap((r, y) => [...r].flatMap((c, x) => (c === "#" ? [[x, y] as const] : [])));
const FULL = "###########";
const BODY = cells(["...#####...", ".#########.", FULL, FULL, FULL, FULL, FULL, FULL, FULL, ".#########.", "...#####..."]);
const EYES = [[3, 3], [3, 4], [7, 3], [7, 4]] as const;
const EYES_SQUINT = [[2, 4], [3, 4], [7, 4], [8, 4]] as const;
const SMILE = [[3, 7], [4, 8], [5, 8], [6, 8], [7, 7]] as const;

/** One-pixel halo around the face and its shadow, in the page colour, so it stays readable over light buttons and pills. */
const HALO = (() => {
  const seen = new Set<string>(); const out: [number, number][] = [];
  for (const [bx, by] of BODY) for (const o of [0, 1]) for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
    const x = bx + o + dx, y = by + o + dy, k = `${x},${y}`;
    if (!seen.has(k)) { seen.add(k); out.push([x, y]); }
  }
  return out;
})();

const px = (list: readonly (readonly [number, number])[], fill: string, dx = 0, dy = 0) =>
  list.map(([x, y]) => <rect key={`${x}-${y}`} x={x + dx} y={y + dy} width={1} height={1} fill={fill} />);

export function PixelCursor({ size = 36 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reeval = useRef<() => void>(() => {});
  const pathname = usePathname();

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const root = ref.current;
    if (!root || !fine.matches) return;
    const html = document.documentElement;

    let x = -100, y = -100, active = false, scrolling = false, seen = false;
    let ox = 0, oy = 0, timer = 0, raf = 0, lastEl: Element | null = null, lastHit = false;

    const show = (on: boolean) => {
      if (on === active) return;
      active = on;
      root.dataset.on = on ? "1" : "0";
      if (on) html.dataset.pixelCursor = "on"; else delete html.dataset.pixelCursor;
    };
    const isTouchpoint = (el: Element | null) => {
      if (!el) return false;
      if (el === lastEl) return lastHit;
      lastEl = el;
      lastHit = !el.closest(NATIVE_ONLY) && (!!el.closest(TOUCHPOINTS) || getComputedStyle(el).cursor === "pointer");
      return lastHit;
    };
    const place = () => { raf = 0; root.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
    const evaluate = () => { if (seen && !scrolling) show(isTouchpoint(document.elementFromPoint(x, y))); };
    reeval.current = evaluate;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") { show(false); return; }
      x = e.clientX; y = e.clientY; seen = true;
      if (scrolling && Math.hypot(x - ox, y - oy) > 6) { scrolling = false; clearTimeout(timer); }
      show(!scrolling && isTouchpoint(e.target as Element));
      if (!raf) raf = requestAnimationFrame(place);
    };
    const onScroll = () => {
      if (!scrolling) { ox = x; oy = y; }
      scrolling = true;
      show(false);
      clearTimeout(timer);
      timer = window.setTimeout(() => { scrolling = false; evaluate(); }, 140);
    };
    const onDown = (e: PointerEvent) => { if (e.pointerType === "mouse") root.dataset.down = "1"; };
    const onUp = () => { delete root.dataset.down; };
    const onLeave = () => { show(false); onUp(); };

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true, capture: true });
    addEventListener("wheel", onScroll, { passive: true });
    addEventListener("pointerdown", onDown, { passive: true });
    addEventListener("pointerup", onUp, { passive: true });
    addEventListener("pointercancel", onUp, { passive: true });
    addEventListener("blur", onLeave);
    html.addEventListener("pointerleave", onLeave);
    return () => {
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll, { capture: true });
      removeEventListener("wheel", onScroll);
      removeEventListener("pointerdown", onDown);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointercancel", onUp);
      removeEventListener("blur", onLeave);
      html.removeEventListener("pointerleave", onLeave);
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      reeval.current = () => {};
      show(false);
    };
  }, []);

  /* After a client navigation the page under a stationary pointer changes; re-check once it has painted. */
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => reeval.current()));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div ref={ref} aria-hidden="true" className="pixel-cursor" data-on="0" style={{ "--pc-size": `${(size * 14) / 12}px` } as React.CSSProperties}>
      <div className="pc-face">
        <svg viewBox="-1 -1 14 14" width="100%" height="100%" shapeRendering="crispEdges" focusable="false">
          {px(HALO, "var(--canvas)")}
          {px(BODY, "var(--accent-soft)", 1, 1)}
          {px(BODY, "var(--fg)")}
          <g className="pc-n">{px(EYES, "var(--canvas)")}</g>
          <g className="pc-s">{px(EYES_SQUINT, "var(--canvas)")}</g>
          {px(SMILE, "var(--canvas)")}
        </svg>
      </div>
    </div>
  );
}
