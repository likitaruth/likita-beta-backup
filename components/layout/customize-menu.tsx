"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ease, useMotionPrefs } from "@/lib/motion";
import { BG_STYLES, useCustomize } from "@/lib/customize";
import { Check, Chevron12, ChevronSmall } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** "CUSTOMIZE" pill + popover (Figma 2100:10236 / 2100:10259): BG styles + theme. */
export function CustomizeMenu() {
  const [open, setOpen] = useState(false);
  const [bgOpen, setBgOpen] = useState(true);
  const { bg, setBg, theme, toggleTheme } = useCustomize();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const prefs = useMotionPrefs();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-full bg-chip px-4 py-3 text-[12px] font-medium leading-[normal] text-chip-fg transition-colors duration-300 hover:text-fg"
      >
        <span>{site.nav.customize}</span>
        <span aria-hidden className="h-4 w-px bg-current" />
        <ChevronSmall className={cn("transition-transform duration-300 ease-out-quint", open && "rotate-180")} />
      </button>

      <AnimatePresence>
      {open && (
      <motion.div
        id={panelId}
        initial={prefs.reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0, transition: prefs.reduced ? { duration: 0.15 } : { ...prefs.spring("press"), opacity: { duration: 0.15 } } }}
        exit={{ opacity: 0, scale: prefs.reduced ? 1 : 0.98, y: prefs.d(-4), transition: { duration: 0.12, ease: ease.out } }}
        style={{ transformOrigin: "top right" }}
        className="absolute right-0 top-[calc(100%+8px)] z-40 w-[158px] rounded-lg bg-card p-3 text-on-card shadow-popover"
      >
        <button
          type="button"
          aria-expanded={bgOpen}
          onClick={() => setBgOpen((v) => !v)}
          className="flex h-[34px] w-[136px] items-center justify-between bg-cream p-2 text-[12px] font-semibold leading-[13px] text-ink"
        >
          Change BG
          <Chevron12 direction={bgOpen ? "up" : "down"} />
        </button>

        <div role="radiogroup" aria-label="Background style" hidden={!bgOpen}>
          {BG_STYLES.map((s, i) => {
            const selected = bg === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setBg(s.id)}
                className={cn("flex w-[136px] items-center gap-2 px-2 text-left text-[12px] font-semibold leading-[13px]", i === 2 ? "h-[46px] py-3" : "h-[34px] py-2")}
              >
                <span aria-hidden className="size-3 shrink-0 rounded-full border border-[#413f3f]" style={{ background: s.swatch }} />
                <span className="flex items-center gap-2">{s.label}{selected && <Check />}</span>
              </button>
            );
          })}
        </div>

        <div aria-hidden className="h-px w-[136px] bg-cream" />
        <button
          type="button"
          role="switch"
          aria-checked={theme === "light"}
          onClick={toggleTheme}
          className="flex w-[136px] items-center gap-[14px] pb-2 pl-2 pr-6 pt-4 text-left text-[12px] font-normal leading-[13px] text-cream"
        >
          Change Theme
          <span aria-hidden className="size-3 shrink-0 rounded-full border border-[#413f3f]" style={{ background: "linear-gradient(90deg, #0f0f0e 50%, #f1ebe4 50%)" }} />
          <span className="sr-only">{theme === "dark" ? "Dark theme active" : "Light theme active"}</span>
        </button>
      </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
