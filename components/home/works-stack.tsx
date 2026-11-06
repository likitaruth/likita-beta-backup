"use client";

import Image from "next/image";
import { ViewTransition } from "react";
import { useCallback, useEffect, useRef, useState, type MutableRefObject, type Ref } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useIsPresent,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
  type PanInfo,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { Pill } from "@/components/ui/pill";
import { CircleArrow } from "@/components/ui/icons";
import { ease, spring, useMotionPrefs } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

const MAX_PLATES = 4; // Figma: Peek + Rear 3 + Rear 2 + Rear 1
const COMMIT_DISTANCE = 110; // px dragged before a release commits
const COMMIT_VELOCITY = 300; // px/s flick that commits a shorter drag
const STEP_MS = 240; // minimum gap between scroll-driven card changes ("one at a time")
const HYSTERESIS = 0.6; // scroll progress (in cards) that must be crossed before the card changes

type Dir = 1 | -1;
/** How the change was requested. Each gets its own physical treatment (docs/MOTION.md §3). */
export type Source = "drag" | "button" | "key" | "scroll";
type Custom = { dir: Dir; source: Source };

/** Geometry of the pinned scroll track, measured by WorksSection. */
export type PinGeometry = { pinned: boolean; start: number; step: number; extra: number };

type Props = { projects: readonly Project[]; ctaLabel: string; geometry: MutableRefObject<PinGeometry> };

/**
 * "Reveal Stack" (Figma 2144:11901) as a physical object, driven by four inputs:
 *  - drag   → 1:1 tracking, tilt, thrown with release velocity
 *  - button → lighter, faster throw
 *  - key    → quick cross-fade (repeated action: almost no motion)
 *  - scroll → depth: the front card lifts away, the next rises from the plate (reverse when scrolling back)
 * Scroll is the source of truth while the section is pinned: manual input also moves the (invisible, pinned)
 * scroll position so the two never disagree. Thrown cards are independent elements, so input is never queued.
 */
export function WorksStack({ projects, ctaLabel, geometry }: Props) {
  const n = projects.length;
  const [state, setState] = useState<{ index: number; dir: Dir; source: Source }>({ index: 0, dir: 1, source: "button" });
  const { index, dir, source } = state;
  const prefs = useMotionPrefs();
  const groupRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const target = useRef(0); // card the scroll position currently asks for
  const timer = useRef<number | null>(null);
  const refocus = useRef<string | null>(null);
  const dragX = useMotionValue(0); // shared so the plates can lean with the front card

  const stop = () => { if (timer.current !== null) { window.clearTimeout(timer.current); timer.current = null; } };

  const go = useCallback(
    (delta: Dir, src: Source) => {
      const i = indexRef.current;
      const next = Math.min(n - 1, Math.max(0, i + delta));
      if (next === i) return;
      // Keyboard users: the focused button lives in the card that is about to leave; hand focus to its twin.
      const a = document.activeElement as HTMLElement | null;
      refocus.current = a && groupRef.current?.contains(a) ? a.getAttribute("data-focus") : null;
      indexRef.current = next;
      if (src !== "scroll") {
        stop();
        target.current = next;
        // While pinned, move the scroll position to match. Nothing else is visible, so the jump is invisible.
        const g = geometry.current;
        const y = window.scrollY;
        if (g.pinned && y >= g.start && y <= g.start + g.extra) window.scrollTo({ top: g.start + next * g.step, behavior: "instant" });
      }
      setState({ index: next, dir: delta, source: src });
    },
    [n, geometry],
  );

  useEffect(() => {
    const which = refocus.current;
    if (!which) return;
    refocus.current = null;
    requestAnimationFrame(() => {
      groupRef.current?.querySelector<HTMLElement>(`article:not([data-leaving]) [data-focus="${which}"]`)?.focus();
    });
  }, [index]);

  // Scroll → target card. Only inside the pinned range; outside it manual state is left alone.
  const { scrollY } = useScroll();
  const onScroll = useCallback(
    (y: number) => {
      const g = geometry.current;
      if (!g.pinned || g.extra <= 0) return;
      if (y < g.start - 2 || y > g.start + g.extra + 2) return;
      const f = Math.min(1, Math.max(0, (y - g.start) / g.extra)) * (n - 1);
      if (Math.abs(f - target.current) > HYSTERESIS) target.current = Math.round(f);
      const stepToward = () => {
        const i = indexRef.current;
        const t = target.current;
        if (i === t) { timer.current = null; return; }
        go(t > i ? 1 : -1, "scroll");
        timer.current = window.setTimeout(stepToward, STEP_MS); // one card at a time, even on a fast fling
      };
      if (timer.current === null) stepToward();
    },
    [geometry, go, n],
  );
  useMotionValueEvent(scrollY, "change", onScroll);
  useEffect(() => {
    const id = requestAnimationFrame(() => onScroll(window.scrollY)); // honour a restored scroll position
    return () => { cancelAnimationFrame(id); stop(); };
  }, [onScroll]);

  const project = projects[index];
  const remaining = n - 1 - index;

  return (
    <div
      ref={groupRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected works"
      onKeyDown={(e) => {
        if (e.repeat) return; // a held key advances once, not N times
        if (e.key === "ArrowRight") { e.preventDefault(); go(1, "key"); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1, "key"); }
      }}
      className="relative pb-[calc(var(--step)*4)] [--dx:7px] [--step:10px] md:[--dx:10px] md:[--step:14px] xl:pb-[80px] xl:[--dx:12px] xl:[--step:18px]"
    >
      <p className="sr-only" aria-live="polite">Project {index + 1} of {n}: {project.title}</p>

      <div className="relative mx-auto xl:max-w-[1195px]">
        {/* Plates deal in once when the section arrives, then settle per remaining card. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={prefs.reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: prefs.reduced ? 0.15 : 0.8, ease: ease.out } }}
          viewport={{ once: true, amount: 0.35 }}
        >
          {Array.from({ length: MAX_PLATES }, (_, i) => MAX_PLATES - i).map((k) => (
            <Plate key={k} k={k} visible={k <= remaining} dragX={dragX} />
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout" custom={{ dir, source } satisfies Custom} initial={false}>
          <StackCard
            key={project.slug}
            project={project}
            index={index}
            total={n}
            dir={dir}
            source={source}
            ctaLabel={ctaLabel}
            go={go}
            dragX={dragX}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

function Plate({ k, visible, dragX }: { k: number; visible: boolean; dragX: MotionValue<number> }) {
  const prefs = useMotionPrefs();
  const lean = useTransform(dragX, (v) => v * 0.08 * (1 / k)); // deeper plates lean less
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : prefs.d(-(k * 6)) }}
      transition={prefs.reduced ? { duration: 0.15 } : { ...spring.stack, delay: visible ? (MAX_PLATES - k) * 0.025 : 0 }}
      style={{
        x: prefs.reduced ? 0 : lean,
        top: `calc(var(--step) * ${k})`,
        bottom: `calc(var(--step) * ${-k})`,
        left: `calc(var(--dx) * ${k})`,
        right: `calc(var(--dx) * ${k})`,
        zIndex: MAX_PLATES - k,
      }}
      className="absolute rounded-lg border-[1.5px] border-plate-line bg-card shadow-plate"
    />
  );
}

const viewportW = () => (typeof window === "undefined" ? 1200 : window.innerWidth);

/** The leaving card. Drag keeps its release velocity; buttons are lighter; keys are almost instant; scroll lifts/sinks. */
function leave({ dir, source }: Custom, reduced: boolean): TargetAndTransition {
  if (reduced) return { opacity: 0, transition: { duration: 0.15 } };
  switch (source) {
    case "drag":
      return { x: -dir * Math.max(700, viewportW() * 0.85), opacity: 0, transition: { x: spring.throw, opacity: { delay: 0.08, duration: 0.2, ease: ease.out } } };
    case "button":
      return { x: -dir * 240, opacity: 0, transition: { x: spring.light, opacity: { duration: 0.2, ease: ease.out } } };
    case "key":
      return { x: -dir * 24, opacity: 0, transition: { duration: 0.12, ease: ease.out } };
    case "scroll":
      return dir === 1
        ? { y: -56, scale: 0.96, opacity: 0, transition: { y: spring.light, scale: spring.light, opacity: { duration: 0.22, ease: ease.out } } }
        : { y: 14, scale: 0.97, opacity: 0, transition: { opacity: { duration: 0.18, ease: ease.out }, y: spring.light, scale: spring.light } };
  }
}

/** The arriving card: it comes up out of the first plate (or, scrolling back, drops down onto the stack). */
function arrive({ dir, source }: Custom, reduced: boolean): { initial: TargetAndTransition; transition: Transition } {
  if (reduced) return { initial: { opacity: 0 }, transition: { duration: 0.15 } };
  if (source === "key") return { initial: { opacity: 0 }, transition: { duration: 0.14, ease: ease.out } };
  if (source === "scroll" && dir === -1) return { initial: { y: -56, scale: 0.96, opacity: 0 }, transition: spring.stack };
  return { initial: { y: 14, scale: 0.97 }, transition: source === "button" ? spring.light : spring.stack };
}

type CardProps = {
  project: Project;
  index: number;
  total: number;
  dir: Dir;
  source: Source;
  ctaLabel: string;
  go: (d: Dir, s: Source) => void;
  dragX: MotionValue<number>;
  ref?: Ref<HTMLElement>; // React 19: AnimatePresence(popLayout) hands the card its ref as a prop
};

function StackCard({ project, index, total, dir, source, ctaLabel, go, dragX, ref }: CardProps) {
  const { reduced } = useMotionPrefs();
  const isPresent = useIsPresent();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-600, 0, 600], [-9, 0, 9]); // clamps beyond ±600
  const suppressClick = useRef(false);
  const atStart = index === 0;
  const atEnd = index === total - 1;
  const counter = (v: number) => String(v).padStart(2, "0");
  const custom: Custom = { dir, source };
  const enter = arrive(custom, reduced);
  const contentDelay = reduced ? 0 : source === "key" ? 0.06 : 0.1;

  const onDrag = (_: PointerEvent, info: PanInfo) => dragX.set(info.offset.x);
  const onDragEnd = (_: PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const d: Dir = offset.x < 0 ? 1 : -1;
    const allowed = d === 1 ? !atEnd : !atStart;
    const commit = allowed && (Math.abs(offset.x) > COMMIT_DISTANCE || (Math.abs(velocity.x) > COMMIT_VELOCITY && Math.abs(offset.x) > 30));
    // A drag must never also click whatever was under the pointer when it ended.
    suppressClick.current = Math.abs(offset.x) > 5;
    window.setTimeout(() => { suppressClick.current = false; }, 80);
    animate(dragX, 0, spring.press);
    if (commit) go(d, "drag"); // exit continues from the card's current x and velocity
    else animate(x, 0, spring.press); // cancelled: spring back, tilt unwinds with x
  };

  return (
    <motion.article
      ref={ref}
      custom={custom}
      aria-label={`${project.title}, project ${index + 1} of ${total}`}
      aria-hidden={isPresent ? undefined : true}
      data-leaving={isPresent ? undefined : ""}
      drag="x"
      dragDirectionLock
      // 1:1 tracking toward a card that exists; rubber-band only where there is none.
      dragConstraints={{ left: atEnd ? 0 : -2000, right: atStart ? 0 : 2000 }}
      dragElastic={0.08}
      dragMomentum={false}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onClickCapture={(e) => { if (suppressClick.current) { e.preventDefault(); e.stopPropagation(); } }}
      style={{ x, rotate: reduced ? 0 : rotate, transformOrigin: "50% 100%" }}
      initial={enter.initial}
      animate={{ y: 0, scale: 1, opacity: 1, transition: enter.transition }}
      variants={{ leave: (c: Custom) => leave(c, reduced) }}
      exit="leave"
      className={cn(
        "relative flex touch-pan-y flex-col gap-6 overflow-hidden rounded-[20px] bg-card p-5 shadow-[inset_0_0_0_1.5px_var(--card-line),0_12px_12px_0_rgb(0_0_0/0.5)] md:p-8 xl:h-[480px] xl:flex-row xl:items-center xl:px-12 xl:py-[45px]",
        isPresent ? (source === "scroll" && dir === -1 ? "z-30" : "z-10") + " cursor-grab active:cursor-grabbing" : "pointer-events-none z-20",
      )}
    >
      {/* Content leaves in ~100 ms and arrives a beat after the card starts moving, so two texts never overlap. */}
      <motion.div
        className="flex w-full flex-col gap-6 xl:flex-row xl:items-center"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: contentDelay, duration: 0.22, ease: ease.out } }}
        exit={{ opacity: 0, transition: { duration: 0.1, ease: ease.out } }}
      >
        {/* Shared element: only the media morphs into the project page, and only when navigating forward. */}
        <ViewTransition name={`project-${project.slug}-media`} share={{ "nav-forward": "morph", default: "none" }} default="none">
          <div className="relative aspect-[500/390] w-full shrink-0 xl:w-[500px]">
            {project.image ? (
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                draggable={false}
                sizes="(min-width:1280px) 500px, (min-width:768px) 90vw, 100vw"
                className="select-none object-cover"
                priority={index === 0}
              />
            ) : (
              // FLAG: no approved artwork for this project yet.
              <div aria-hidden className="h-full w-full rounded-xl border border-card-line bg-black/20" />
            )}
          </div>
        </ViewTransition>

        {/* Text column (Figma 2144:11929: 575 × 290, vertically centred in the card) */}
        <div className="cq flex min-w-0 flex-1 flex-col gap-6 self-stretch xl:self-center">
          <div className="flex items-center justify-between xl:w-[564px] xl:max-w-full">
            <p className="text-[13px] font-medium leading-4 tabular-nums text-on-card-muted">
              <span className="font-bold text-accent">{counter(index + 1)} </span>
              <span>/ {counter(total)}</span>
            </p>
            <div className="flex items-center gap-4">
              {([-1, 1] as const).map((d) => {
                const disabled = d === -1 ? atStart : atEnd;
                return (
                  <button
                    key={d}
                    type="button"
                    data-focus={d === -1 ? "prev" : "next"}
                    aria-label={d === -1 ? "Previous project" : "Next project"}
                    aria-disabled={disabled}
                    onClick={() => !disabled && go(d, "button")}
                    className={cn("-m-2 rounded-full p-2 transition-colors duration-300", disabled ? "cursor-default text-accent" : "text-on-card")}
                  >
                    <CircleArrow direction={d === -1 ? "left" : "right"} tone={disabled ? "muted" : "active"} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="xl:min-h-[242px]">
            <div className="flex w-full flex-col gap-6">
              <h3 className="t-display w-fit text-[length:min(68px,calc(100cqw/8.1))] leading-[1.1765] text-mint">{project.title}</h3>
              <div className="flex flex-col gap-8">
                {(project.description ?? project.blurb) && (
                  <p className="max-w-[540px] text-[18px] leading-[1.6] text-on-card/90 xl:min-h-[86px]">{project.description ?? project.blurb}</p>
                )}
                <div><Pill variant="outline" href={project.href} transitionTypes={["nav-forward"]} data-focus="cta">{ctaLabel}</Pill></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
