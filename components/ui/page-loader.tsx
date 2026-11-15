import { PageLoaderControl } from "./page-loader-control";

/**
 * First-visit page loader: a pixel face assembles, glances around, blinks, smiles, holds its breath and bursts, then a pixel mosaic
 * dissolves outward from the centre while the hero's own entrance plays underneath (~3.1 s in all).
 *
 * Everything is CSS (see "Page loader" in globals.css), server-rendered so it covers the page from the very first paint with no
 * hydration dependency. A tiny inline script in <head> (`loaderScript`) decides whether it runs and sets `data-ld` on <html>:
 *   on      first load of "/" in this session
 *   reduce  same, but the visitor prefers reduced motion: a still face, then a short fade
 *   (none)  every later visit, other routes, or no JS: the loader is `display: none`
 * `PageLoaderControl` adds skip (click, tap, Esc, Enter, Space) and marks it done. If JS never runs, a CSS animation still hides it.
 *
 * The stagger order is fixed (seeded) so server and client markup always match.
 */

const BODY = ["...#####...", ".#########.", "###########", "###########", "###########", "###########", "###########", "###########", "###########", ".#########.", "...#####..."];
const CELLS = BODY.flatMap((r, y) => [...r].flatMap((c, x) => (c === "#" ? [[x, y] as const] : [])));
const SMILE = [[3, 7], [4, 8], [5, 8], [6, 8], [7, 7]] as const;

/** Seeded shuffle → each body cell gets a fixed, scattered pop-in delay (0–700 ms). */
const DELAY = (() => {
  let s = 20260611;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const ids = CELLS.map((_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  const out: number[] = [];
  ids.forEach((id, rank) => { out[id] = Math.round((rank / ids.length) * 700); });
  return out;
})();

/** Mosaic: one grid per orientation so the squares stay square; delay grows with distance from the centre. */
const mosaic = (cols: number, rows: number, ms: number) => {
  const out: number[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out.push(Math.round(Math.hypot(c - (cols - 1) / 2, (r - (rows - 1) / 2) * 1.05) * ms));
  return out;
};
const LANDSCAPE = mosaic(20, 12, 34);
const PORTRAIT = mosaic(12, 22, 32);

const SPARKS = Array.from({ length: 8 }, (_, k) => {
  const a = (k / 8) * Math.PI * 2 + 0.4, d = 6.2 + (k % 2) * 2.5;
  return { x: +(Math.cos(a) * d * 1.5).toFixed(2), y: +(Math.sin(a) * d).toFixed(2) };
});

export const loaderScript = `(function(){var d=document.documentElement;try{if(location.pathname!=='/'||sessionStorage.getItem('likita:ld'))return;sessionStorage.setItem('likita:ld','1');d.dataset.ld=matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'on';}catch(e){}})();`;

export function PageLoader() {
  return (
    <div id="ld" aria-hidden="true">
      <div className="ld-grid ld-gl" style={{ gridTemplate: "repeat(12, 1fr) / repeat(20, 1fr)" }}>
        {LANDSCAPE.map((d, i) => <i key={i} style={{ "--cd": d } as React.CSSProperties} />)}
      </div>
      <div className="ld-grid ld-gp" style={{ gridTemplate: "repeat(22, 1fr) / repeat(12, 1fr)" }}>
        {PORTRAIT.map((d, i) => <i key={i} style={{ "--cd": d } as React.CSSProperties} />)}
      </div>
      <div className="ld-stage">
        <span className="ld-ring" />
        {SPARKS.map((s, i) => <span key={i} className="ld-spark" style={{ "--x": s.x, "--y": s.y } as React.CSSProperties} />)}
        <div className="ld-face">
          {CELLS.map(([x, y], i) => <b key={i} style={{ gridColumn: x + 1, gridRow: y + 1, "--d": `${DELAY[i]}ms` } as React.CSSProperties} />)}
          <span className="ld-eye" />
          <span className="ld-eye ld-eye-r" />
          {SMILE.map(([x, y]) => <i key={`${x}${y}`} className="ld-sm" style={{ left: `${(x / 11) * 100}%`, top: `${(y / 11) * 100}%` }} />)}
        </div>
      </div>
      <PageLoaderControl />
    </div>
  );
}
