"use client";

import { useSyncExternalStore } from "react";
import type { Transition, Variants } from "motion/react";

/**
 * One motion language (see docs/MOTION.md).
 * Transform / opacity / clip-path only. Springs retarget from current velocity, so everything is interruptible.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const dur = { micro: 0.18, ui: 0.3, reveal: 0.8, hero: 0.9 } as const;

export const spring = {
  press: { type: "spring", stiffness: 520, damping: 34 },
  magnet: { type: "spring", stiffness: 200, damping: 17, mass: 0.6 },
  stack: { type: "spring", stiffness: 260, damping: 27, mass: 0.9 },
  throw: { type: "spring", stiffness: 170, damping: 22, restDelta: 1, restSpeed: 20 },
  soft: { type: "spring", stiffness: 120, damping: 24 },
  /** Character pop: ~12 % overshoot, settles in ~0.6 s. */
  pop: { type: "spring", stiffness: 260, damping: 16, mass: 0.9 },
  /** Button-driven card move: quick, barely under-damped. */
  light: { type: "spring", duration: 0.36, bounce: 0.08, restDelta: 0.5, restSpeed: 20 },
} satisfies Record<string, Transition>;

export const stagger = { lines: 0.09, words: 0.04, items: 0.08 } as const;

/** Wipe-up used by the hero and contact headlines: the line rises while its clip opens from the top. */
const CLIP_HIDDEN = "inset(100% -10% -25% -10%)";
const CLIP_SHOWN = "inset(-10% -10% -25% -10%)";

export const variants = {
  wipe: {
    hidden: { clipPath: CLIP_HIDDEN, y: "38%", opacity: 0 },
    show: { clipPath: CLIP_SHOWN, y: "0%", opacity: 1, transition: { duration: 0.7, ease: ease.out, opacity: { duration: 0.25 } } },
  },
  rise: {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
  },
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5, ease: ease.out } },
  },
  grow: {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.6, ease: ease.inOut } },
  },
  settle: {
    hidden: { opacity: 0, y: 16, scale: 0.94 },
    show: { opacity: 1, y: 0, scale: 1, transition: { ...spring.stack, opacity: { duration: 0.4, ease: ease.out } } },
  },
} satisfies Record<string, Variants>;

/**
 * Reduced motion keeps the exact same hidden/show states (so server HTML and first client render agree) but every
 * property jumps to its final value instantly, except opacity which fades over 150 ms. No translation, scale or clip wipe is seen.
 */
function reduce(v: Variants): Variants {
  return { hidden: v.hidden, show: { ...(v.show as object), transition: { default: { duration: 0 }, opacity: { duration: 0.15 } } } };
}

export type RevealKind = keyof typeof variants;

const RM = "(prefers-reduced-motion: reduce)";
/** Hydration-safe: `false` on the server and during hydration, then the real preference (avoids SSR style mismatches). */
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(RM);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(RM).matches,
    () => false,
  );
}

export function useMotionPrefs() {
  const reduced = useReducedMotionSafe();
  return {
    reduced,
    spring: (t: keyof typeof spring): Transition => (reduced ? { duration: 0.01 } : spring[t]),
    /** Variants that collapse to an opacity fade for reduced motion. */
    variants: (kind: RevealKind): Variants => (reduced ? reduce(variants[kind]) : variants[kind]),
    fade: { duration: reduced ? 0.15 : 0.45, ease: ease.out } as Transition,
    d: (px: number) => (reduced ? 0 : px),
  };
}

/** True when the primary input can hover (mouse/trackpad). Magnetic + tilt only make sense there. */
export function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
