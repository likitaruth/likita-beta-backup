"use client";

import { useEffect, useRef, type ComponentProps } from "react";

/**
 * Silent looping video with no visible controls: autoplays muted while on screen, pauses off screen.
 * With reduced motion it stays on its poster.
 */
export function AutoVideo(props: Omit<ComponentProps<"video">, "muted" | "loop" | "autoPlay" | "controls">) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} muted loop playsInline disablePictureInPicture {...props} />;
}
