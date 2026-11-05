"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { WorksStack, type PinGeometry } from "./works-stack";
import { useReducedMotionSafe } from "@/lib/motion";
import type { Project } from "@/content/projects";

/**
 * Section shell for Selected Works. When the viewport is tall enough to hold the Figma composition, the section
 * becomes a scroll track: the composition is pinned (CSS `position: sticky`, native scrolling, no scroll hijacking)
 * while the extra scroll distance steps through the projects. At rest (before the pin and after release) the layout
 * is exactly the Figma 1440×731 composition. Short viewports and reduced-motion users get the static section
 * with arrow / key / swipe navigation only.
 */
export function WorksSection({ projects, eyebrow, ctaLabel }: { projects: readonly Project[]; eyebrow: string; ctaLabel: string }) {
  const outerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const n = projects.length;
  const geom = useRef<PinGeometry>({ pinned: false, start: 0, step: 0, extra: 0 });
  const [layout, setLayout] = useState({ pinned: false, height: 0, top: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const outer = outerRef.current;
      const content = contentRef.current;
      if (!outer || !content) return;
      const vh = window.innerHeight;
      const ch = content.offsetHeight;
      const pinned = !reducedRef.current && n > 1 && vh >= ch + 16;
      const step = Math.round(Math.min(640, Math.max(360, vh * 0.55)));
      const extra = pinned ? (n - 1) * step : 0;
      const top = Math.round((vh - ch) / 2); // pinned composition is vertically centred in the viewport
      const docTop = outer.getBoundingClientRect().top + window.scrollY;
      geom.current = { pinned, step, extra, start: docTop - top };
      setLayout((p) => (p.pinned === pinned && p.height === ch + extra && p.top === top ? p : { pinned, height: ch + extra, top }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(contentRef.current!);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [n, reduced]);

  return (
    <section
      ref={outerRef}
      id="selected-work"
      aria-labelledby="works-eyebrow"
      style={layout.pinned ? { height: layout.height } : undefined}
      className="overflow-x-clip bg-raised"
    >
      <div className={layout.pinned ? "sticky" : undefined} style={layout.pinned ? { top: layout.top } : undefined}>
        <div ref={contentRef} className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-12 md:px-8 md:py-16 xl:pb-[63px] xl:pl-[77px] xl:pr-[76px]">
          <h2 id="works-eyebrow" className="h-5 text-[12px] font-semibold uppercase leading-7 text-fg-muted">{eyebrow}</h2>
          <WorksStack projects={projects} ctaLabel={ctaLabel} geometry={geom} />
        </div>
      </div>
    </section>
  );
}
