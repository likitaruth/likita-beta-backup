"use client";

import Link from "next/link";
import { ViewTransition, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { tabLabels, type TabKey } from "@/content/case-studies";

/**
 * Design / Think / Build switcher. Sits in normal flow until it reaches the top of the screen, then sticks and
 * condenses into a glass pill with a reading-progress line. It sticks inside its section wrapper, so it lets go
 * before the "Next" nudge. Only `transform`/`opacity` animate, except one max-width tween on the pill itself.
 */
export function CaseTabs({ slug, tabs, active }: { slug: string; tabs: TabKey[]; active: TabKey }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);

  // Measure before paint so a tab switch (which remounts this) never flashes the resting state.
  useLayoutEffect(() => {
    const s = sentinel.current;
    if (s) setStuck(s.getBoundingClientRect().top < 12);
  }, []);

  useEffect(() => {
    const s = sentinel.current;
    const el = bar.current;
    if (!s || !el) return;
    const section = el.parentElement!;
    let raf = 0;
    const tick = () => {
      raf = 0;
      setStuck(s.getBoundingClientRect().top < 12);
      const r = section.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-0" />
      <nav
        ref={bar}
        aria-label="Case study sections"
        data-stuck={stuck}
        className="cs-tabs sticky top-3 z-40 mx-auto -mt-10 flex w-full justify-center md:top-4"
      >
        <div className="cs-tabs-pill relative flex w-full gap-1 overflow-hidden rounded-full p-1">
          {tabs.map((t, i) => {
            const on = t === active;
            return (
              <Link
                key={t}
                href={t === "design" ? `/works/${slug}` : `/works/${slug}/${t}`}
                scroll={false}
                transitionTypes={["nav-tab"]}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "cs-tab relative z-10 flex h-11 flex-1 items-center justify-center gap-2 rounded-full font-['Inter',var(--font-sans)] text-[14px] font-medium transition-colors duration-300 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-soft",
                  on ? "text-ink" : "text-[#9a9a96] hover:text-white",
                )}
              >
                {on && (
                  <ViewTransition name="case-tab-ind" share={{ "nav-tab": "case-ind", default: "none" }} default="none">
                    <span aria-hidden className="cs-ind absolute inset-0 -z-10 rounded-full bg-cream" />
                  </ViewTransition>
                )}
                <small aria-hidden className="text-[10px] font-bold tracking-[0.08em] opacity-55">{String(i + 1).padStart(2, "0")}</small>
                {tabLabels[t]}
              </Link>
            );
          })}
          <span aria-hidden className="cs-prog absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent-soft" />
        </div>
      </nav>
    </>
  );
}
