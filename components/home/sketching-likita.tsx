import type { CSSProperties, ReactNode } from "react";

/**
 * Hero doodle: Likita pops up behind a ledge, pencil in hand, sketching a smaller version of herself ("still sketching myself…").
 * Same sketch vocabulary as the Me in Brief pages (ink outline + grey fill, curl circles, hand-lettered note), recoloured with the
 * theme tokens so it reads on both the dark and the light canvas. Pure SVG, no state; `WelcomeCharacter` adds `.is-in` when it reveals,
 * which plays the draw-on (see "Welcome doodle" in globals.css). Once the sketch is done the note changes to "Hi, I'm Likita", the pencil
 * drops away and the same hand waves. Without `.is-in` (revisit, reduced motion, no JS) it is simply in that finished state.
 */

const FACE = "#ece8e2";
const FEAT = "#161616";
const OLIVE = "#6e702c";
const HAIR = "color-mix(in oklab, var(--fg) 11%, var(--canvas))";
const HAIR2 = "color-mix(in oklab, var(--fg) 24%, var(--canvas))";

/** Seeded RNG: the curls are identical on every render (server and client markup match). */
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const dly = (s: number): CSSProperties => ({ "--d": `${s.toFixed(2)}s` }) as CSSProperties;

function Circ({ x, y, r, fill, d, k }: { x: number; y: number; r: number; fill: string; d: number; k: string }) {
  return <circle key={k} className="wc-ink" pathLength={1} cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(1)} fill={fill} style={dly(d)} />;
}

function hairBack(d0: number) {
  const r = rng(7);
  const pcs: [number, number, number][] = [];
  for (let i = 0; i < 30; i++) {
    const th = ((-200 + i * (260 / 29) + (r() - 0.5) * 6) * Math.PI) / 180;
    const R = 1 + (r() - 0.5) * 0.16;
    pcs.push([Math.cos(th) * 62 * R, Math.sin(th) * 60 * R - 8, 10 + r() * 7]);
  }
  for (let k = 0; k < 9; k++) {
    const y = 10 + k * 10 + (r() - 0.5) * 4;
    pcs.push([-(58 + (r() - 0.5) * 8 - k * 1.2), y, 10 + r() * 5]);
    pcs.push([56 + (r() - 0.5) * 8 - k * 1.2, y + 4, 10 + r() * 5]);
  }
  pcs.sort((a, b) => a[1] - b[1]);
  return pcs.map(([x, y, rr], n) => <Circ key={n} k={`h${n}`} x={x} y={y} r={rr} fill={n % 5 === 2 ? HAIR2 : HAIR} d={d0 + n * 0.025} />);
}

function curls(d0: number) {
  const r = rng(21);
  const spots = [[-52, -30], [-30, -52], [0, -58], [30, -52], [52, -30], [-62, 20], [-58, 50], [-52, 76], [60, 24], [56, 52], [50, 78], [-24, -36], [26, -38]];
  return spots.map(([x, y], i) => {
    const k = r() > 0.5 ? 1 : -1;
    return <path key={i} className="wc-ink" pathLength={1} d={`M${x} ${y} q${8 * k} -10 ${15 * k} -2 q${5 * k} 10 ${-5 * k} 13`} strokeWidth={2.2} style={dly(d0 + i * 0.04)} />;
  });
}

/** Origin = face centre. */
function Likita({ d0 = 0, look, blink = true, sw = 3 }: { d0?: number; look?: string; blink?: boolean; sw?: number }) {
  const b = blink ? "wc-blink" : undefined;
  const feat = { stroke: FEAT } as const;
  return (
    <g strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <g className="wc-bob">{hairBack(d0)}</g>
      <ellipse className="wc-ink" pathLength={1} cx={0} cy={4} rx={43} ry={47} fill={FACE} style={dly(d0 + 0.8)} />
      <Circ k="a" x={-40} y={16} r={12} fill={HAIR} d={d0 + 1} /><Circ k="b" x={-44} y={36} r={11} fill={HAIR} d={d0 + 1.05} />
      <Circ k="c" x={41} y={18} r={12} fill={HAIR} d={d0 + 1} /><Circ k="d" x={43} y={38} r={10} fill={HAIR} d={d0 + 1.05} />
      <Circ k="e" x={-22} y={-36} r={14} fill={HAIR} d={d0 + 1} /><Circ k="f" x={-4} y={-42} r={14} fill={HAIR} d={d0 + 1.04} />
      <Circ k="g" x={16} y={-40} r={14} fill={HAIR} d={d0 + 1.08} /><Circ k="h" x={32} y={-30} r={12} fill={HAIR} d={d0 + 1.1} /><Circ k="i" x={-36} y={-24} r={12} fill={HAIR} d={d0 + 1} />
      <g className="wc-bob">{curls(d0 + 1.2)}</g>
      <g {...feat}>
        <g className={look}>
          <g className={b}><path d="M-21 3 q7 -7 14 0 q-7 6 -14 0Z" fill={FACE} /><circle cx={-14} cy={3} r={2.4} fill={FEAT} stroke="none" /></g>
          <g className={b}><path d="M7 3 q7 -7 14 0 q-7 6 -14 0Z" fill={FACE} /><circle cx={14} cy={3} r={2.4} fill={FEAT} stroke="none" /></g>
        </g>
        <path d="M-20 -9 q6 -4 12 -1 M8 -10 q6 -3 12 1" strokeWidth={2.4} />
        <path d="M-3 13 q4 4 8 0" strokeWidth={2.4} />
        <path d="M-13 24 q13 11 26 0" strokeWidth={3} />
      </g>
    </g>
  );
}

function Sparkle({ x, y, s = 1, d }: { x: number; y: number; s?: number; d: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="wc-spark"><path className="wc-ink" pathLength={1} d="M0 -12 V12 M-12 0 H12 M-8 -8 L8 8 M8 -8 L-8 8" strokeWidth={2.6} style={dly(d)} /></g>
    </g>
  );
}

function Hand({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} strokeLinejoin="round" strokeLinecap="round" strokeWidth={3} fill={FACE}>
      <rect x={-15} y={-26} width={9} height={22} rx={4.5} /><rect x={-4.5} y={-30} width={9} height={26} rx={4.5} /><rect x={6} y={-26} width={9} height={22} rx={4.5} />
      <path d="M-16 -8 h32 q1 12 -6 20 h-20 q-7 -8 -6 -20Z" />
    </g>
  );
}

export function SketchingLikita({ label }: { label: string }): ReactNode {
  return (
    <svg viewBox="0 0 300 340" role="img" aria-label={label} className="wc-art" xmlns="http://www.w3.org/2000/svg">
      <g stroke="var(--fg)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* the note */}
        <g className="wc-note-a">
          <text x={12} y={40} fontSize={25} transform="rotate(-3 12 40)" className="wc-hand">still sketching</text>
          <text x={12} y={70} fontSize={25} transform="rotate(-3 12 70)" className="wc-hand">myself…</text>
        </g>
        <g className="wc-note-b">
          <text x={12} y={40} fontSize={25} transform="rotate(-3 12 40)" className="wc-hand">Hi, I’m</text>
          <text x={12} y={70} fontSize={25} transform="rotate(-3 12 70)" className="wc-hand">Likita!</text>
        </g>
        <path className="wc-ink" pathLength={1} d="M98 80 q34 4 44 28" strokeWidth={2.6} style={dly(1.1)} />
        <path className="wc-ink" pathLength={1} d="M130 100 l12 10 l12 -10" strokeWidth={2.6} style={dly(1.3)} />

        {/* the drawing she is making */}
        <g transform="translate(208 118) scale(.52)"><Likita blink={false} d0={1.6} sw={4.2} /></g>
        <Sparkle x={262} y={48} s={0.7} d={2.2} />
        <Sparkle x={26} y={150} s={0.55} d={2.4} />

        {/* Likita, behind the ledge */}
        <clipPath id="wc-clip"><rect x={0} y={0} width={300} height={312} /></clipPath>
        <g clipPath="url(#wc-clip)">
          <g className="wc-rise">
            <g transform="translate(120 284) scale(.95)"><Likita d0={0.5} look="wc-glance" /></g>
            <g className="wc-pencil">
              <g transform="translate(206 262) rotate(18) scale(.66)">
                <g className="wc-pen">
                  <path d="M0 -4 L0 -116" stroke="var(--fg)" strokeWidth={15} />
                  <path d="M0 -4 L0 -108" stroke={OLIVE} strokeWidth={9} />
                  <path d="M-7 -116 L0 -136 L7 -116Z" fill={FACE} strokeWidth={3} />
                  <path d="M-2.6 -128 L0 -136 L2.6 -128Z" fill={FEAT} stroke="none" />
                </g>
                <g className="wc-wave"><Hand x={0} y={24} /></g>
              </g>
            </g>
          </g>
        </g>
        {/* the ledge she peeks over */}
        <path className="wc-ink" pathLength={1} d="M10 314 H290 M10 322 H290" strokeWidth={3} style={dly(0.2)} />
      </g>
    </svg>
  );
}
