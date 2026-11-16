"use client";

import { useEffect, useRef } from "react";

/** Same 11×11 body as the page loader; eyes (2×2 each) and a 3-cell mouth are cut out of it. */
const BODY = ["...#####...", ".#########.", "###########", "###########", "###########", "###########", "###########", "###########", "###########", ".#########.", "...#####..."];
const isMouth = (x: number, y: number) => y === 8 && x >= 4 && x <= 6;

/**
 * The "0" of the 404. The pixel face's eyes and mouth are knocked out to the page colour; the eyes
 * glance toward the pointer in whole-pixel steps (pointer, pen and touch-drag all work).
 * Under reduced motion it stays still.
 */
export function FaceZero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const eyes = el.querySelectorAll<HTMLElement>("[data-eye]");
    let raf = 0;
    const look = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const m = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, m / 280);
        const cell = r.width / 11;
        const tx = Math.round((dx / m) * k) * cell;
        const ty = Math.round((dy / m) * k) * cell;
        eyes.forEach((i) => { i.style.transform = `translate(${tx}px, ${ty}px)`; });
      });
    };
    addEventListener("pointermove", look, { passive: true });
    addEventListener("pointerdown", look, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", look); removeEventListener("pointerdown", look); };
  }, []);

  return (
    <div ref={root} className="nf-face" aria-hidden="true">
      {BODY.flatMap((row, y) =>
        [...row].map((c, x) => {
          const key = `${x}-${y}`;
          if (c !== "#") return <i key={key} className="nf-n" />;
          return <i key={key} className={isMouth(x, y) ? "nf-cut" : undefined} />;
        }),
      )}
      {/* pupils sit on top of the solid face (own grid layer, so the body grid is untouched) and can glance without leaving a hole */}
      <span className="nf-eyes">
        {[4, 8].map((col) => <b key={col} data-eye="" style={{ gridColumn: col, gridRow: "5 / span 2" }} />)}
      </span>
    </div>
  );
}
