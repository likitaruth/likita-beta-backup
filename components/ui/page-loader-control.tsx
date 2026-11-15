"use client";

import { useEffect } from "react";

/** Skip handling and clean-up for the first-visit loader. Everything visual lives in CSS; this only ends it early or marks it done. */
export function PageLoaderControl() {
  useEffect(() => {
    const html = document.documentElement;
    const mode = html.dataset.ld;
    if (mode !== "on" && mode !== "reduce") return;

    let finish = 0;
    const done = () => { html.dataset.ld = "done"; };
    finish = window.setTimeout(done, mode === "on" ? 3300 : 1100);

    const skip = () => {
      if (html.dataset.ld !== "on") return;
      html.dataset.ld = "skip"; // CSS fades the loader out and pulls the hero's entrance forward
      window.clearTimeout(finish);
      finish = window.setTimeout(done, 320);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip(); };
    addEventListener("pointerdown", skip, { passive: true });
    addEventListener("keydown", onKey);
    return () => { window.clearTimeout(finish); removeEventListener("pointerdown", skip); removeEventListener("keydown", onKey); };
  }, []);
  return null;
}
