"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { briefArt } from "./brief-art";
import { cn } from "@/lib/cn";

export type BriefItem = { n: string; title: string; sub: string; note: string; href: string };

const ART = [null, briefArt.how, briefArt.why, briefArt.audience] as const;
const COLLAPSED = "128px";

/**
 * Me in Brief — "sketchbook strip". Four colour slabs; the open one shows its title, a typed sentence and a taped sketch page.
 * Who pins the About video with a handwritten Likita signature across the top; the others hold line sketches that draw themselves.
 * Tabs pattern (arrow keys move, Enter/Space open). Reduced motion: no typing, no looping, sketches static, video stays on its poster.
 */
export function AboutBrief({ items, label, defaultOpen = 0 }: { items: readonly BriefItem[]; label: string; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const [typed, setTyped] = useState(items[defaultOpen].sub);
  const [reduced, setReduced] = useState(true); // assume reduced until measured, so SSR output is the calm state
  const [wide, setWide] = useState(true);
  const heads = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const w = window.matchMedia("(min-width: 900px)");
    const sync = () => { setReduced(m.matches); setWide(w.matches); };
    sync();
    m.addEventListener("change", sync); w.addEventListener("change", sync);
    return () => { m.removeEventListener("change", sync); w.removeEventListener("change", sync); };
  }, []);

  // Typewriter for the open item's sentence.
  useEffect(() => {
    const text = items[open].sub;
    if (reduced) { setTyped(text); return; }
    let n = 0;
    setTyped("");
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      tick = setInterval(() => { n += 1; setTyped(text.slice(0, n)); if (n >= text.length && tick) clearInterval(tick); }, 28);
    }, 1000);
    return () => { clearTimeout(start); if (tick) clearInterval(tick); };
  }, [open, reduced, items]);

  const onKey = useCallback((e: React.KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % (last + 1)
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i + last) % (last + 1)
      : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setOpen(next);
    heads.current[next]?.focus();
  }, [items.length]);

  const cols = wide ? items.map((_, k) => (k === open ? "1fr" : COLLAPSED)).join(" ") : "1fr";

  return (
    <div role="tablist" aria-label="Me in brief" className="mb-strip" style={{ "--cols": cols } as React.CSSProperties}>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <article key={it.n} data-i={i} className={cn("mb-pn", on && "on is-on")}>
            <button
              ref={(el) => { heads.current[i] = el; }}
              type="button" role="tab" id={`mb-t${i}`} aria-selected={on} aria-controls={`mb-p${i}`} tabIndex={on ? 0 : -1}
              onClick={() => setOpen(i)} onKeyDown={(e) => onKey(e, i)}
              className="mb-head"
            >
              <span className="mb-head-n">{it.n}</span>
              <span className="mb-head-t">{it.title}</span>
              <span aria-hidden className="mb-plus">+</span>
            </button>

            <div id={`mb-p${i}`} role="tabpanel" aria-labelledby={`mb-t${i}`} className="mb-body">
              <div>
                <p className="mb-num">{it.n} / {String(items.length).padStart(2, "0")}</p>
                <h3 className="mb-h">{it.title}</h3>
                <p className="mb-sent" aria-label={it.sub}>
                  <span aria-hidden>{on ? typed : it.sub}{on && typed.length < it.sub.length && <span className="mb-caret" />}</span>
                </p>
                <span aria-hidden className="mb-hand">{it.note}</span>
                <Link href={it.href} tabIndex={on ? 0 : -1} className="mb-more">Read more</Link>
              </div>
              {on && <Sheet i={i} label={label} reduced={reduced} />}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** Taped sketch page. Mounted only while open, so the sketch animations replay on every open. */
function Sheet({ i, label, reduced }: { i: number; label: string; reduced: boolean }) {
  const art = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Sketches draw on (after the page has dropped in).
  useEffect(() => {
    const svg = art.current?.querySelector("svg");
    if (!svg || reduced) return;
    const t = setTimeout(() => {
      svg.querySelectorAll<SVGGeometryElement>(".mb-ink").forEach((el, n) => {
        el.setAttribute("pathLength", "1");
        el.style.setProperty("--d", `${Math.min(n * 0.022, 1.5)}s`);
      });
      svg.classList.add("draw");
    }, 500);
    return () => clearTimeout(t);
  }, [reduced]);

  // Video: plays only while on screen; with reduced motion it waits for the viewer.
  useEffect(() => {
    const v = video.current;
    if (!v || reduced) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  }, [reduced]);

  if (i === 0) {
    return (
      <div className="mb-sheetwrap">
        <i aria-hidden className="mb-tape" /><i aria-hidden className="mb-tape mb-tape--b" />
        <div className="mb-sheet mb-sheet--video">
          <video
            ref={video} src="/assets/about-video.mp4" poster="/assets/about-video-poster.jpg" aria-label={label}
            muted loop playsInline preload="metadata"
            onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          />
          <div aria-hidden className="mb-likita">
            <span className="mb-hi">hi, I’m</span>
            <span className="mb-name">Likita</span>
            <svg viewBox="0 0 150 20"><path pathLength={1} d="M2 12 C 40 4 90 18 148 6" /><path className="p2" pathLength={1} d="M30 18 C 70 12 110 20 134 14" /></svg>
          </div>
          <button type="button" className="mb-pause" aria-label={playing ? "Pause video" : "Play video"}
            onClick={() => { const v = video.current; if (!v) return; if (v.paused) v.play().catch(() => {}); else v.pause(); }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
              {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M3 1l8 5-8 5z" />}
            </svg>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-sheetwrap">
      <i aria-hidden className="mb-tape" /><i aria-hidden className="mb-tape mb-tape--b" />
      <div className="mb-sheet" ref={art} dangerouslySetInnerHTML={{ __html: ART[i]!() }} />
    </div>
  );
}
