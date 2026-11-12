"use client";

import Image from "next/image";
import { animate } from "motion/react";
import { useEffect, useRef, type CSSProperties } from "react";
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
export function WelcomeCharacter({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (animated: boolean) => {
      shown = true;
      el.removeAttribute("aria-hidden");
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
      <div ref={ref} aria-hidden style={HIDDEN} className="welcome-char relative h-[183px] w-[197px] will-change-transform">
        <Image
          src={src}
          alt={alt}
          width={197}
          height={183}
          priority
          unoptimized
          className="absolute left-0 top-0 h-[183px] w-[197px] max-w-none"
        />
        <p className="absolute left-[74px] top-[155px] w-[122px] hand-text [--hand-size:11px] font-bold leading-[18px] text-fg-muted">{caption}</p>
      </div>
      {/* No JS: never leave the character hidden. */}
      <noscript><style>{".welcome-char{opacity:1!important;transform:none!important}"}</style></noscript>
    </>
  );
}
