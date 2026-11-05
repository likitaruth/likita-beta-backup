"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";
export type BgStyle = "1" | "2" | "3";
const KEY = "likita:prefs";

/** Swatch previews only — the real surface values live in globals.css ([data-bg]). */
export const BG_STYLES: ReadonlyArray<{ id: BgStyle; label: string; swatch: string }> = [
  { id: "1", label: "BG Style 1", swatch: "#0f0f0e" },
  { id: "2", label: "BG Style 2", swatch: "color-mix(in oklab, #0f0f0e, #18231b 42%)" },
  { id: "3", label: "BG Style 3", swatch: "color-mix(in oklab, #0f0f0e, #5b6414 14%)" },
];

/** Blocking inline script: applies saved prefs before first paint (no theme flash). */
export const prefsScript = `(function(){var d=document.documentElement;try{var p=JSON.parse(localStorage.getItem('${KEY}')||'{}');d.dataset.theme=p.theme==='light'?'light':'dark';d.dataset.bg=/^[123]$/.test(p.bg)?p.bg:'1';}catch(e){d.dataset.theme='dark';d.dataset.bg='1';}})();`;

type Ctx = { theme: Theme; bg: BgStyle; setTheme: (t: Theme) => void; setBg: (b: BgStyle) => void; toggleTheme: () => void };
const CustomizeContext = createContext<Ctx | null>(null);

export function CustomizeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [bg, setBgState] = useState<BgStyle>("1");

  useEffect(() => {
    const d = document.documentElement;
    setThemeState(d.dataset.theme === "light" ? "light" : "dark");
    setBgState(/^[123]$/.test(d.dataset.bg ?? "") ? (d.dataset.bg as BgStyle) : "1");
  }, []);

  const persist = useCallback((next: { theme?: Theme; bg?: BgStyle }) => {
    const d = document.documentElement;
    if (next.theme) d.dataset.theme = next.theme;
    if (next.bg) d.dataset.bg = next.bg;
    try { localStorage.setItem(KEY, JSON.stringify({ theme: d.dataset.theme, bg: d.dataset.bg })); } catch { /* storage unavailable */ }
  }, []);

  const setTheme = useCallback((t: Theme) => { setThemeState(t); persist({ theme: t }); }, [persist]);
  const setBg = useCallback((b: BgStyle) => { setBgState(b); persist({ bg: b }); }, [persist]);
  const toggleTheme = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme, setTheme]);

  const value = useMemo(() => ({ theme, bg, setTheme, setBg, toggleTheme }), [theme, bg, setTheme, setBg, toggleTheme]);
  return <CustomizeContext.Provider value={value}>{children}</CustomizeContext.Provider>;
}

export function useCustomize() {
  const ctx = useContext(CustomizeContext);
  if (!ctx) throw new Error("useCustomize must be used inside <CustomizeProvider>");
  return ctx;
}
