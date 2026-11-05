"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useEffect, useState, type ElementType } from "react";
import { stagger, useMotionPrefs, type RevealKind } from "@/lib/motion";

type Tag = "div" | "span" | "p" | "h1" | "h2" | "h3" | "ul" | "li" | "header" | "nav" | "section";

/**
 * Orchestrates a group of <Item>s. `trigger="mount"` plays on hydration (hero),
 * `trigger="view"` plays once when `amount` of it is in view (everything below the fold).
 * Children inherit the "hidden" / "show" variant labels, so one Stage = one choreography.
 */
export function Stage({
  as = "div",
  trigger = "view",
  amount = 0.3,
  delay = 0,
  gap = stagger.items,
  ...rest
}: { as?: Tag; trigger?: "mount" | "view"; amount?: number; delay?: number; gap?: number } & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView">) {
  const M = motion[as] as ElementType;
  const { reduced } = useMotionPrefs();
  // Wait one commit so the (hydration-safe) reduced-motion preference is settled before any animation starts.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const variants = { hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : gap, delayChildren: reduced ? 0 : delay } } };
  return trigger === "mount" ? (
    <M variants={variants} initial="hidden" animate={ready ? "show" : "hidden"} {...rest} />
  ) : (
    <M variants={variants} initial="hidden" whileInView={ready ? "show" : undefined} viewport={{ once: true, amount }} {...rest} />
  );
}

/** One animated element inside a <Stage>. `kind` picks the reveal from docs/MOTION.md. */
export function Item({
  as = "div",
  kind = "rise",
  ...rest
}: { as?: Tag; kind?: RevealKind } & Omit<HTMLMotionProps<"div">, "variants">) {
  const M = motion[as] as ElementType;
  const prefs = useMotionPrefs();
  return <M variants={prefs.variants(kind)} {...rest} />;
}
