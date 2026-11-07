"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ease, useMotionPrefs } from "@/lib/motion";
import { ArrowUpRight, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { site } from "@/content/site";

/** Hamburger button + full-screen menu (Figma "Menu" frame 2090:9921). */
export function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const prefs = useMotionPrefs();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const focusables = () => panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [];
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const els = Array.from(focusables());
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const trigger = triggerRef.current;
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.button
        ref={triggerRef}
        style={{ "--d": 120 } as React.CSSProperties}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(true)}
        className="intro-rise grid size-[35.2px] place-items-center text-fg transition-opacity hover:opacity-70"
      >
        <MenuIcon />
      </motion.button>

      <AnimatePresence>
      {open && (
        <div id={id} role="dialog" aria-modal="true" aria-label="Site menu" className="fixed inset-0 z-50">
          <motion.button
            type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setOpen(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0, transition: { duration: 0.18 } }}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
          />
          <motion.div
            ref={panelRef}
            initial={prefs.reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0, transition: prefs.reduced ? { duration: 0.15 } : { ...prefs.spring("stack"), opacity: { duration: 0.2 } } }}
            exit={{ opacity: 0, x: prefs.d(16), transition: { duration: 0.18, ease: ease.out } }}
            className="absolute inset-y-3 right-3 flex w-[min(679px,calc(100vw-24px))] flex-col rounded-xl bg-card px-4 pb-4 pt-20 shadow-[inset_0_0_0_1px_var(--card-line),0_24px_48px_rgb(0_0_0/0.45)] md:inset-y-6 md:right-8 md:px-8 md:pb-8 md:pt-24">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-cream/25 text-cream transition-[background-color,color] duration-200 hover:bg-cream hover:text-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream md:right-8 md:top-6"
            >
              <CloseIcon />
            </button>
            <motion.nav
              aria-label="Primary"
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: prefs.reduced ? 0 : 0.05, delayChildren: prefs.reduced ? 0 : 0.08 } } }}
            >
              {site.nav.menu.map((item) => (
                <motion.div key={item.label} variants={prefs.variants("rise")} className="flex min-h-[72px] flex-1 border-t border-cream/10 first:border-t-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.href === pathname ? "page" : undefined}
                  className="group flex w-full items-center justify-between gap-4 rounded-md px-4 font-display text-[clamp(26px,5.4vw,42px)] font-normal leading-tight text-cream transition-colors duration-200 ease-out-quint hover:bg-cream hover:font-black hover:text-card focus-visible:bg-cream focus-visible:font-black focus-visible:text-card focus-visible:outline-none md:px-6"
                >
                  <span className="flex items-center gap-4">
                    {item.label}
                    {item.href === pathname && <span aria-hidden className="size-2 rounded-full bg-accent-soft group-hover:bg-card" />}
                  </span>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/30 text-cream transition-[transform,background-color,color] duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-card group-hover:bg-card group-hover:text-cream group-focus-visible:border-card group-focus-visible:bg-card group-focus-visible:text-cream">
                    <ArrowUpRight />
                  </span>
                </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </>
  );
}
