"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { canHover, spring, useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Magnetic hover. Within `reach` px of the element it is pulled toward the pointer (strength × offset, capped at
 * `max` px) on a slightly under-damped spring, and settles back with a small overshoot. The label follows at an extra
 * 40 % for parallax. Disabled for touch / coarse pointers and reduced motion; press feedback stays.
 */
export function Magnetic({
  children,
  strength = 0.28,
  max = 8,
  reach = 40,
  className,
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
  reach?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionPrefs();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.magnet);
  const sy = useSpring(y, spring.magnet);
  const ix = useTransform(sx, (v) => v * 0.4);
  const iy = useTransform(sy, (v) => v * 0.4);

  useEffect(() => {
    if (reduced || !canHover()) return;
    const clamp = (v: number) => Math.max(-max, Math.min(max, v));
    // Measure lazily and cache: pointermove fires at display rate, layout reads should not.
    let box: { l: number; t: number; w: number; h: number } | null = null;
    const invalidate = () => { box = null; };
    const measure = () => {
      const el = ref.current;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      // Rect includes the current transform; subtract it so the pull does not feed back into itself.
      return (box = { l: r.left - sx.get(), t: r.top - sy.get(), w: r.width, h: r.height });
    };
    const onMove = (e: PointerEvent) => {
      const b = box ?? measure();
      if (!b) return;
      const cx = b.l + b.w / 2;
      const cy = b.t + b.h / 2;
      const inside = e.clientX > b.l - reach && e.clientX < b.l + b.w + reach && e.clientY > b.t - reach && e.clientY < b.t + b.h + reach;
      x.set(inside ? clamp((e.clientX - cx) * strength) : 0);
      y.set(inside ? clamp((e.clientY - cy) * strength) : 0);
    };
    const reset = () => { x.set(0); y.set(0); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [reduced, strength, max, reach, x, y, sx, sy]);

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={spring.press}
      className={cn("inline-flex", className)}
    >
      <motion.span style={{ x: ix, y: iy }} className="inline-flex">{children}</motion.span>
    </motion.span>
  );
}
