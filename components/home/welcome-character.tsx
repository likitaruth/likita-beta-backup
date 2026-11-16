"use client";

import { animate } from "motion/react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { spring } from "@/lib/motion";

/** Module scope, not storage: survives client-side navigation back to the home page, resets on a real page load. */
let shown = false;

const HIDDEN: CSSProperties = { opacity: 0, transform: "translate3d(0, 36px, 0) scale(0.72)", transformOrigin: "50% 100%" };
const THRESHOLD = 24; // px of downward scroll that counts as intent (ignores jitter and scroll restoration)

/**
 * The illustrated character stays hidden until the user's first intentional downward scroll, then pops in once
 * (scale + rise on a lightly under-damped spring). If it is still off-screen at that moment (tablet/mobile) it pops
 * the first time it scrolls into view. Pure DOM + Motion `animate`: no React state, no re-renders.
 * Reduced motion: a 200 ms opacity fade, no scale or travel.
 */
export function WelcomeCharacter({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (animated: boolean) => {
      shown = true;
      el.removeAttribute("aria-hidden");
      if (animated) el.classList.add("is-in"); // starts the doodle's draw-on; a revisit shows it finished
      if (!animated) { el.style.opacity = "1"; el.style.transform = "none"; return; }
      if (reduced) { animate(el, { opacity: 1 }, { duration: 0.2 }).then(() => { el.style.transform = "none"; }); return; }
      animate(el, { opacity: 1 }, { duration: 0.18, ease: [0.23, 1, 0.32, 1] });
      animate(el, { y: [36, 0], scale: [0.72, 1] }, { ...spring.pop }).then(() => { el.style.transform = "none"; });
    };

    if (shown) { reveal(false); return; }

    let armed = false;
    let visible = false;
    let done = false;
    const base = window.scrollY;
    let last = base;

    const tryReveal = () => {
      if (done || !armed || !visible) return;
      done = true;
      cleanup();
      reveal(true);
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (!armed && y > last && y - base > THRESHOLD) armed = true; // intentional = moving down and past the threshold
      last = y;
      tryReveal();
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; tryReveal(); });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
    return cleanup;
  }, []);

  return (
    <>
      <div ref={ref} aria-hidden style={HIDDEN} className="welcome-char relative h-[272px] w-[240px] will-change-transform">
        {children}
      </div>
      {/* No JS: never leave the character hidden. */}
      <noscript><style>{".welcome-char{opacity:1!important;transform:none!important}"}</style></noscript>
    </>
  );
}
