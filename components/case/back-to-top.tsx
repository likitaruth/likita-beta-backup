"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating "Back to top" for case studies. Appears after ~1.5 screens of scrolling, hides near the top.
 * The olive ring fills with reading progress; hovering or focusing reveals a short label.
 * Smooth-scrolls to the top (an instant jump under reduced motion). Pixel face cursor via the global touchpoint rule (it's a button).
 */
export function BackToTop() {
  const [on, setOn] = useState(false);
  const bar = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setOn(y > window.innerHeight * 1.5);
      if (bar.current) bar.current.style.strokeDashoffset = String(1 - Math.min(1, max > 0 ? y / max : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button type="button" onClick={toTop} aria-label="Back to top" tabIndex={on ? 0 : -1} aria-hidden={!on} data-on={on} className="btt">
      <span className="btt-label" aria-hidden>Back to top</span>
      <span className="btt-dial">
        <svg className="btt-ring" viewBox="0 0 52 52" aria-hidden>
          <circle className="btt-track" cx="26" cy="26" r="24" />
          <circle ref={bar} className="btt-bar" cx="26" cy="26" r="24" pathLength={1} />
        </svg>
        <svg className="btt-arrow" viewBox="0 0 16 16" aria-hidden><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" /></svg>
      </span>
    </button>
  );
}
