"use client";

import { useEffect, useRef } from "react";

const COLOURS = ["#9aa23a", "#f1ebe4", "#c9cf7a", "#6e702c", "#e8dcc8"];

/**
 * One light confetti burst (about 70 pieces, about 2s) from a point inside the parent, then it stops and clears itself.
 * Canvas only, no layout work. Nothing renders under reduced motion. `originRef` marks where the burst starts.
 */
export function ConfettiBurst({ fire, originRef }: { fire: boolean; originRef: React.RefObject<HTMLElement | null> }) {
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = cv.current;
    const host = c?.parentElement;
    if (!fire || !c || !host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = host.clientWidth, H = host.clientHeight;
    c.width = W * dpr; c.height = H * dpr;
    const x = c.getContext("2d");
    if (!x) return;
    x.scale(dpr, dpr);
    const hr = host.getBoundingClientRect();
    const o = originRef.current?.getBoundingClientRect();
    const ox = o ? o.left - hr.left + o.width * 0.45 : W * 0.25;
    const oy = o ? o.top - hr.top + o.height * 0.45 : H * 0.4;
    const P = Array.from({ length: 70 }, () => {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4, v = 6 + Math.random() * 7;
      return { x: ox, y: oy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3,
        w: 5 + Math.random() * 5, h: 3 + Math.random() * 4, c: COLOURS[(Math.random() * COLOURS.length) | 0], dot: Math.random() < 0.3 };
    });
    const t0 = performance.now();
    let raf = 0;
    const step = () => {
      const t = (performance.now() - t0) / 1000;
      const fade = Math.max(0, 1 - Math.max(0, t - 1.1) / 0.7);
      x.clearRect(0, 0, W, H);
      if (fade <= 0) return;
      x.globalAlpha = fade;
      for (const q of P) {
        q.vy += 0.28; q.vx *= 0.985; q.vy *= 0.985; q.x += q.vx; q.y += q.vy; q.r += q.vr;
        x.fillStyle = q.c;
        x.save(); x.translate(q.x, q.y); x.rotate(q.r);
        if (q.dot) { x.beginPath(); x.arc(0, 0, q.w / 2.4, 0, 7); x.fill(); }
        else x.fillRect(-q.w / 2, -q.h / 2, q.w, q.h * Math.abs(Math.cos(q.r * 2)));
        x.restore();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); x.clearRect(0, 0, W, H); };
  }, [fire, originRef]);

  return <canvas ref={cv} aria-hidden className="pointer-events-none absolute inset-0 z-[5] h-full w-full" />;
}
