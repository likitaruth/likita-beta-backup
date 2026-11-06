"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
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
            className="absolute inset-0 cursor-default bg-black/60"
          />
          <motion.div
            ref={panelRef}
            initial={prefs.reduced ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0, transition: prefs.reduced ? { duration: 0.15 } : { ...prefs.spring("stack"), opacity: { duration: 0.2 } } }}
            exit={{ opacity: 0, x: prefs.d(16), transition: { duration: 0.18, ease: ease.out } }}
            className="absolute right-3 top-3 w-[min(679px,calc(100vw-24px))] rounded-xl bg-card px-4 py-6 md:right-8 md:top-6 md:px-8 md:py-[54px]">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-cream transition-opacity hover:opacity-70 md:right-6 md:top-3"
            >
              <CloseIcon />
            </button>
            <motion.nav
              aria-label="Primary"
              className="flex flex-col gap-4"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: prefs.reduced ? 0 : 0.05, delayChildren: prefs.reduced ? 0 : 0.08 } } }}
            >
              {site.nav.menu.map((item) => (
                <motion.div key={item.label} variants={prefs.variants("rise")}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-start justify-between p-4 font-display text-[clamp(24px,5vw,40px)] font-normal leading-6 text-cream transition-colors duration-200 ease-out-quint hover:bg-cream hover:font-black hover:text-card focus-visible:bg-cream focus-visible:font-black focus-visible:text-card focus-visible:outline-none md:p-6"
                >
                  {item.label}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-cream text-ink transition-[transform,background-color,color] duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-card group-hover:text-cream group-focus-visible:bg-card group-focus-visible:text-cream">
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
