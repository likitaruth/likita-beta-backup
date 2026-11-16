"use client";

import { useEffect, useRef } from "react";

/**
 * About hero video. Silent (no audio track, `muted`), looping, plays only while on screen.
 * No visible controls. With reduced motion it stays on the poster.
 */
export function AboutVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);


  return (
    <div className="ab-vid relative size-full">
      <i aria-hidden className="ab-br ab-br-a" /><i aria-hidden className="ab-br ab-br-b" />
      <i aria-hidden className="ab-br ab-br-c" /><i aria-hidden className="ab-br ab-br-d" />
      <div aria-hidden className="ab-plate" />
      <div className="ab-frame">
        <video
          ref={ref}
          src={src}
          poster={poster}
          aria-label={label}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
}
