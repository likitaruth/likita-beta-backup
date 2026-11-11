"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useMotionPrefs } from "@/lib/motion";
import type { Project } from "@/content/projects";

/**
 * Project thumbnail: an image, or a muted looping video (with a poster).
 * Videos only play while `active` and on screen, and stay on the poster under reduced motion.
 */
export function ProjectMedia({ media, sizes, priority, active = true, className }: {
  media: Project["media"]; sizes: string; priority?: boolean; active?: boolean; className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const { reduced } = useMotionPrefs();
  const isVideo = media.type === "video";

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // some browsers ignore the attribute for autoplay
    if (reduced || !active) { v.pause(); return; }
    let visible = true;
    const sync = () => { if (visible) v.play().catch(() => {}); else v.pause(); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.1 });
    io.observe(v);
    sync();
    return () => io.disconnect();
  }, [reduced, active]);

  if (!isVideo) {
    return <Image src={media.src} alt="" fill priority={priority} sizes={sizes} draggable={false} className={className} />;
  }
  return (
    <>
      <Image src={media.poster} alt="" fill priority={priority} sizes={sizes} draggable={false} className={className} />
      {!reduced && (
        <video
          ref={ref} src={media.src} poster={media.poster} muted loop playsInline autoPlay={active}
          preload={priority ? "auto" : "metadata"} aria-hidden tabIndex={-1} disablePictureInPicture disableRemotePlayback
          className={`absolute inset-0 size-full ${className ?? ""}`}
        />
      )}
    </>
  );
}
