"use client";

import { useEffect, useRef } from "react";

/**
 * Reach out: one "fresh coffee" moment. When the section scrolls into view the squiggle draws, the note writes itself letter by
 * letter, and soft steam starts rising off the cup and keeps looping gently.
 *
 * The steam is pinned to the cup in the photo's own coordinates: the photo is `object-cover object-right` (2880×1188), so the
 * rendered scale is max(W/2880, H/1188) and the cup sits a fixed distance from the right edge. A size container lets CSS do that
 * maths (see "Coffee steam" in globals.css). Only transform and opacity animate; the blur is drawn once.
 *
 * States on the section (`data-coffee`): unset = finished (no JS / reduced motion), "armed" = waiting, "on" = playing.
 */
export function CoffeeSteam() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = ref.current?.closest("section");
    if (!sec || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sec.dataset.coffee = "armed";
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      sec.dataset.coffee = "on";
      io.disconnect();
    }, { threshold: 0.35 });
    io.observe(sec);
    return () => io.disconnect();
  }, []);

  const wisp = (d: number, x: number, k: number, o: number, path: string, w: number) => (
    <g className="cs-w" style={{ "--d": `${d}s`, "--x": `${x}px`, "--k": `${k}deg`, "--o": o } as React.CSSProperties}>
      <path d={path} stroke="#f0e8de" strokeWidth={w} strokeLinecap="round" fill="none" filter="url(#cs-blur)" />
    </g>
  );

  return (
    <div ref={ref} aria-hidden className="cs-box">
      <div className="cs-steam">
        <svg viewBox="0 0 340 300" preserveAspectRatio="none">
          <defs><filter id="cs-blur" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="7" /></filter></defs>
          {wisp(0, -8, 6, 0.19, "M150 250 C 120 210 180 180 150 140 S 130 80 160 40", 16)}
          {wisp(2.3, 10, -8, 0.15, "M185 255 C 210 215 160 185 190 145 S 215 90 185 50", 14)}
          {wisp(4.6, -4, 4, 0.17, "M165 250 C 145 220 195 190 165 150 S 150 100 175 60", 18)}
        </svg>
      </div>
    </div>
  );
}

/** The note, split so each letter can ink in. Screen readers get the sentence once. */
export function WrittenNote({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {[...text].map((ch, i) => (
          <span key={i} className="cs-c" style={{ "--i": i } as React.CSSProperties}>{ch}</span>
        ))}
      </span>
    </>
  );
}
