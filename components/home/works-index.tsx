"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition, useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Pill } from "@/components/ui/pill";
import { CircleArrow } from "@/components/ui/icons";
import { useReducedMotionSafe } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Selected Works — "Index + stage".
 * Left: every project title at once (a vertical tablist). Right: one stage that wipes between covers, with the
 * description and CTA in a glass panel. Below xl the stage sits on top and the list follows.
 *
 * Behaviour
 *  - Hover (mouse only, 80 ms intent delay), click/tap, ↑/↓/Home/End and the arrow buttons all select.
 *  - Autoplay: only for fine-pointer users without reduced motion, only while the section is on screen, paused on
 *    hover/focus, and switched off for good after the first manual selection. The active title's progress line *is*
 *    the timer (its animationend advances), so what you see is what drives it.
 *  - Reduced motion: no autoplay; covers cross-fade instead of wiping.
 */
export function WorksIndex({ projects, ctaLabel }: { projects: readonly Project[]; ctaLabel: string }) {
  const n = projects.length;
  const uid = useId();
  const reduced = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [auto, setAuto] = useState(false);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const select = useCallback((i: number, manual = true) => {
    if (manual) setAuto(false);
    setIndex((cur) => {
      if (cur === i) return cur;
      setPrev(cur);
      return i;
    });
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setAuto(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!root.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const running = auto && inView && !paused;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const k = e.key;
    const next = k === "ArrowDown" || k === "ArrowRight" ? Math.min(n - 1, index + 1) : k === "ArrowUp" || k === "ArrowLeft" ? Math.max(0, index - 1) : k === "Home" ? 0 : k === "End" ? n - 1 : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  const p = projects[index];
  const text = p.description ?? p.blurb ?? null;

  return (
    <div
      ref={root}
      data-running={running}
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
      className="mx-auto grid w-full gap-6 xl:max-w-[1195px] xl:grid-cols-[430px_minmax(0,1fr)] xl:gap-12"
    >
      {/* Stage */}
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${index}`}
        className="relative overflow-hidden rounded-[20px] bg-card shadow-[inset_0_0_0_1.5px_var(--card-line),0_36px_70px_-20px_rgb(0_0_0/0.6)] xl:order-2 xl:h-[500px]"
      >
        <div className="relative h-[250px] sm:h-[340px] xl:absolute xl:inset-0 xl:h-auto">
          {projects.map((pr, i) => {
            const state = i === index ? "in" : i === prev ? "out" : "pre";
            return (
              <div key={pr.slug} data-state={state} aria-hidden={i !== index} className="works-layer absolute inset-0">
                <ViewTransition name={`project-${pr.slug}-media`} share={{ "nav-forward": "morph", default: "none" }} default="none">
                  <div className="absolute inset-0">
                    <Image
                      src={pr.cover}
                      alt=""
                      fill
                      draggable={false}
                      sizes="(min-width:1280px) 720px, 100vw"
                      priority={i === 0}
                      className="select-none object-cover"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-card/70 via-card/25 to-card/50" />
                    {pr.image && (
                      <Image
                        src={pr.image.src}
                        alt={pr.image.alt}
                        width={pr.image.width}
                        height={pr.image.height}
                        draggable={false}
                        sizes="(min-width:1280px) 520px, 80vw"
                        className="absolute left-1/2 top-[42%] h-[72%] w-auto max-w-[80%] -translate-x-1/2 -translate-y-1/2 select-none object-contain drop-shadow-[0_30px_40px_rgb(0_0_0/0.5)] xl:top-[40%] xl:h-[68%]"
                      />
                    )}
                  </div>
                </ViewTransition>
              </div>
            );
          })}

          {/* Whole cover is a link too (the CTA remains the accessible one) */}
          <Link href={p.href} transitionTypes={["nav-forward"]} aria-hidden tabIndex={-1} className="absolute inset-0 z-[3]" />

          {/* HUD */}
          <div className="pointer-events-none absolute inset-x-4 top-4 z-[4] flex items-center justify-between xl:inset-x-6 xl:top-6">
            <p className="rounded-full border border-cream/15 bg-card/70 px-3 py-2 text-[13px] font-medium leading-4 tabular-nums text-on-card-muted backdrop-blur-sm">
              <span className="font-bold text-accent-soft">{pad(index + 1)} </span>
              <span>/ {pad(n)}</span>
            </p>
            <div className="pointer-events-auto flex items-center">
              {([-1, 1] as const).map((d) => {
                const disabled = d === -1 ? index === 0 : index === n - 1;
                return (
                  <button
                    key={d}
                    type="button"
                    aria-label={d === -1 ? "Previous project" : "Next project"}
                    aria-disabled={disabled}
                    onClick={() => !disabled && select(index + d)}
                    className={cn("grid size-11 place-items-center rounded-full transition-colors duration-300", disabled ? "cursor-default text-accent-soft" : "text-on-card hover:text-mint")}
                  >
                    <CircleArrow direction={d === -1 ? "left" : "right"} tone={disabled ? "muted" : "active"} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Glass panel */}
        <div className="relative z-[4] mx-3 -mt-7 mb-3 xl:absolute xl:bottom-6 xl:left-6 xl:m-0 xl:w-[440px]">
          <div key={p.slug} className="works-panel flex flex-col gap-5 rounded-2xl border border-cream/20 bg-card/85 p-5 shadow-[0_30px_40px_rgb(0_0_0/0.4)] backdrop-blur-md sm:p-6 xl:p-7">
            <p className="t-display text-[22px] leading-tight text-mint xl:sr-only">{p.title}</p>
            {text && <p className="text-[16px] leading-[1.6] text-on-card/90">{text}</p>}
            <div><Pill variant="outline" href={p.href} transitionTypes={["nav-forward"]} data-focus="cta">{ctaLabel}</Pill></div>
          </div>
        </div>
      </div>

      {/* Index */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Selected works"
        onKeyDown={onKeyDown}
        className="flex flex-col xl:order-1 xl:h-[500px]"
      >
        {projects.map((pr, i) => {
          const on = i === index;
          return (
            <button
              key={pr.slug}
              id={`${uid}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                clearTimeout(hoverTimer.current);
                hoverTimer.current = setTimeout(() => select(i), 80);
              }}
              onPointerLeave={() => clearTimeout(hoverTimer.current)}
              className={cn(
                "group/tab relative flex min-h-[64px] items-center border-t border-line py-4 pl-[22px] text-left transition-colors duration-500 last:border-b focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg xl:min-h-0 xl:flex-1",
                on ? "text-fg" : "text-fg/35 hover:text-fg/70",
              )}
            >
              <span className={cn("flex items-center gap-[18px] transition-[translate] duration-500 ease-out-quint", on && "xl:translate-x-2.5")}>
                <span aria-hidden className={cn("w-[22px] shrink-0 text-[12px] font-bold tracking-[0.1em] transition-colors duration-300", on ? "text-accent-soft" : "text-fg-subtle")}>{pad(i + 1)}</span>
                <span className="t-display text-[clamp(20px,5.4vw,32px)] leading-[1.15] tracking-[-0.01em]">{pr.title}</span>
              </span>
              {on && (
                <span
                  aria-hidden
                  data-run={auto}
                  onAnimationEnd={() => auto && select((i + 1) % n, false)}
                  className="works-progress absolute -top-px left-0 h-0.5 bg-accent-soft"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
