"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { CharacterThumb } from "./character-thumb";
import { Item, Stage } from "@/components/motion/stage";
import { cn } from "@/lib/cn";

type Row = { n: string; title: string; sub: string; href: string };
type Character = { src: string };
type Props = { rows: readonly Row[]; characters: readonly Character[]; label: string };

/**
 * Editorial rows. One row is "active" at a time (row 01 by default) and shows its arrow.
 * When the row is engaged (pointer hover, keyboard focus, or — on touch — the row crossing the middle of the screen)
 * its character thumbnail is revealed beside the arrow. Only the active row ever shows either.
 *
 * Reveal is CSS-only (opacity + translate + scale, data-attribute driven) so it is interruptible and never touches layout:
 * the thumbnail is absolutely centred in a fixed slot, so rows keep their 114px Figma height in every state.
 */
export function AboutBody({ rows, characters, label }: Props) {
  const [state, setState] = useState({ active: 0, engaged: false });
  const root = useRef<HTMLDivElement>(null);

  const set = useCallback((active: number, engaged: boolean) => {
    setState((s) => (s.active === active && s.engaged === engaged ? s : { active, engaged }));
  }, []);

  /** Back to row 01 — unless keyboard focus is still inside a row, in which case that row stays engaged. */
  const restore = useCallback(() => {
    const el = document.activeElement;
    const focused = root.current?.contains(el) && el?.matches(":focus-visible") ? el.closest<HTMLElement>("[data-row]") : null;
    if (focused) set(Number(focused.dataset.row), true);
    else set(0, false);
  }, [set]);

  // Touch has no hover: the row crossing the middle band of the viewport becomes the active, engaged one.
  useEffect(() => {
    if (!root.current || !window.matchMedia("(hover: none)").matches) return;
    const els = [...root.current.querySelectorAll<HTMLElement>("[data-row]")];
    // The observer only signals "a row is near the middle"; the row that actually contains the midline wins.
    const io = new IntersectionObserver(
      () => {
        const mid = window.innerHeight / 2;
        const hit = els.find((el) => { const r = el.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; });
        if (hit) set(Number(hit.dataset.row), true);
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [set]);

  return (
    <div
      ref={root}
      onPointerLeave={(e) => e.pointerType !== "touch" && restore()}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) restore(); }}
    >
      <Stage as="ul" amount={0.25} gap={0.08} className="w-full min-w-0">
        {rows.map((row, i) => {
          const on = state.active === i;
          return (
            // Figma strokes sit inside the 114px row, so border + padding total 114 (28 + 58 + 27 + 1).
            // The 1px border slot is kept transparent and the visible rule is drawn on top as it scrolls in.
            <Item
              as="li"
              kind="fade"
              key={row.n}
              data-active={on}
              data-shown={on && state.engaged}
              className="group/row relative border-b border-transparent"
            >
              <Item aria-hidden kind="grow" className="absolute inset-x-0 bottom-0 h-px origin-left bg-line" />
              <Link
                href={row.href}
                data-row={i}
                onPointerEnter={(e) => e.pointerType !== "touch" && set(i, true)}
                onFocus={() => set(i, true)}
                className="flex items-center gap-4 pb-[27px] pt-7 md:gap-6"
              >
                <span className={cn("w-[52px] shrink-0 text-[28px] font-bold leading-[44px] transition-colors duration-300 md:w-[72px] md:text-[40px]", on ? "text-accent-soft" : "text-fg-subtle/70")}>
                  {row.n}
                </span>
                <span className="flex min-w-0 flex-1 flex-col justify-center gap-3 text-fg">
                  <span className="text-[22px] font-semibold leading-8 md:text-[32px]">{row.title}</span>
                  <span className="text-[14px] font-normal leading-5 text-fg-muted">{row.sub}</span>
                </span>

                <span className="flex shrink-0 items-center gap-5 lg:mr-[27px]">
                  {/* Thumbnail slot: fixed width, zero layout height; the art is centred on the arrow's row. */}
                  <span aria-hidden className="relative hidden h-10 w-[89px] md:block">
                    <span
                      className={cn(
                        "row-reveal absolute right-0 top-1/2 -translate-y-1/2 origin-right",
                        "opacity-0 translate-x-3 scale-95 transition-[opacity,translate,scale] duration-150 ease-out-quint",
                        "group-data-[shown=true]/row:translate-x-0 group-data-[shown=true]/row:scale-100 group-data-[shown=true]/row:opacity-100",
                        "group-data-[shown=true]/row:delay-[40ms] group-data-[shown=true]/row:duration-[380ms]",
                      )}
                    >
                      <CharacterThumb src={characters[Math.min(i, characters.length - 1)].src} label={label} />
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className={cn(
                      "row-reveal opacity-35 translate-x-0 scale-95 transition-[opacity,translate,scale] duration-150 ease-out-quint",
                      "group-data-[active=true]/row:translate-x-0 group-data-[active=true]/row:scale-100 group-data-[active=true]/row:opacity-100 group-data-[active=true]/row:duration-300",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-full border border-line bg-inset text-fg-muted transition-[transform,background-color,color] duration-300 ease-out-quint",
                        "group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:bg-fg group-hover/row:text-canvas",
                        "group-has-[:focus-visible]/row:bg-fg group-has-[:focus-visible]/row:text-canvas",
                      )}
                    >
                      <ArrowUpRight />
                    </span>
                  </span>
                </span>
              </Link>
            </Item>
          );
        })}
      </Stage>
    </div>
  );
}
