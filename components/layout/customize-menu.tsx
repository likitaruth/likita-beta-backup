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

  const onRadioKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const els = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]'));
    const next = els[(els.indexOf(document.activeElement as HTMLElement) + dir + els.length) % els.length];
    next?.focus(); next?.click();
  };

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
        className="flex h-11 items-center gap-3 rounded-full bg-chip px-5 text-[12px] font-medium leading-[normal] tracking-[0.08em] text-chip-fg transition-colors duration-300 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
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
        className="absolute right-0 top-[calc(100%+8px)] z-40 w-[216px] rounded-xl bg-card p-2 text-on-card shadow-[inset_0_0_0_1px_var(--card-line),0_16px_32px_rgb(0_0_0/0.4)]"
      >
        <button
          type="button"
          aria-expanded={bgOpen}
          onClick={() => setBgOpen((v) => !v)}
          className="flex h-10 w-full items-center justify-between rounded-md bg-cream px-3 text-[13px] font-semibold leading-[13px] text-ink"
        >
          Change BG
          <Chevron12 direction={bgOpen ? "up" : "down"} />
        </button>

        <div role="radiogroup" aria-label="Background style" hidden={!bgOpen} className="py-1" onKeyDown={onRadioKey}>
          {BG_STYLES.map((s) => {
            const selected = bg === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setBg(s.id)}
                tabIndex={selected ? 0 : -1}
                className="flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-[13px] font-semibold leading-[13px] transition-colors duration-150 hover:bg-cream/10 focus-visible:bg-cream/10 focus-visible:outline-none"
              >
                <span aria-hidden className={cn("size-4 shrink-0 rounded-full border transition-shadow", selected ? "border-cream shadow-[0_0_0_2px_var(--card),0_0_0_3px_var(--cream)]" : "border-[#413f3f]")} style={{ background: s.swatch }} />
                <span className="flex flex-1 items-center justify-between gap-2">{s.label}{selected && <Check />}</span>
              </button>
            );
          })}
        </div>

        <div aria-hidden className="mx-1 h-px bg-cream/20" />
        <button
          type="button"
          role="switch"
          aria-checked={theme === "light"}
          onClick={toggleTheme}
          className="mt-1 flex h-11 w-full items-center justify-between rounded-md px-3 text-left text-[13px] font-medium leading-[13px] text-cream transition-colors duration-150 hover:bg-cream/10 focus-visible:bg-cream/10 focus-visible:outline-none"
        >
          Change Theme
          <span aria-hidden className="relative h-5 w-9 shrink-0 rounded-full border border-cream/40 bg-black/30">
            <span className={cn("absolute top-0.5 size-3.5 rounded-full transition-[left,background-color] duration-300 ease-out-quint", theme === "light" ? "left-[18px] bg-cream" : "left-0.5 bg-cream/60")} />
          </span>
          <span className="sr-only">{theme === "dark" ? "Dark theme active" : "Light theme active"}</span>
        </button>
      </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
