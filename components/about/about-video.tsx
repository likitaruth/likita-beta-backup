"use client";

import { useEffect, useRef, useState } from "react";

/**
 * About hero video. Silent (no audio track, `muted`), looping, plays only while on screen.
 * No visible controls. With reduced motion it stays on the poster.
 */
export function AboutVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [sec, setSec] = useState(0);
  const [dur, setDur] = useState(8);

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

  const mm = (n: number) => `00:${String(Math.floor(n)).padStart(2, "0")}`;

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
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration || 8)}
          onTimeUpdate={(e) => { const s = Math.floor(e.currentTarget.currentTime); setSec((p) => (p === s ? p : s)); }}
          className="absolute inset-0 size-full object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent from-[55%] to-black/55" />
      </div>
      <p aria-hidden className="ab-cap"><i />{mm(sec)} / {mm(dur)}</p>
    </div>
  );
}
