/* Hand-drawn sketches for "Me in Brief" (inline SVG strings, static + trusted). Black line + grey fill, like the hero. */
/* Sketch illustrations for "Me in Brief" — black line + grey fill, like the hero. viewBox 400x500. */

  const INK = "#161616", G1 = "#e6e6e2", G2 = "#cfcfca", W = "#ffffff", OLIVE = "#6e702c", MINT = "#cdd9ca";
  const defs = `<defs>
    <filter id="mb-rough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/>
    </filter></defs>`;
  const S = (inner: string, cls = "") => `<svg class="mb-art ${cls}" viewBox="0 0 400 500" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${defs}<g filter="url(#mb-rough)" class="mb-sk" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">${inner}</g></svg>`;
  const ink = (d: string, extra = "") => `<path class="mb-ink" d="${d}" ${extra}/>`;

  function hair(cx: number, cy: number, r: number, n: number, rr: number, fill = G1, start = 0, span = 360) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = ((start + (span * i) / n) * Math.PI) / 180;
      s += `<circle class="mb-ink" cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" r="${rr}" fill="${fill}"/>`;
    }
    return s;
  }

  /* ---------- HOW: support agent typing, screen morphs from chat to wireframe ---------- */
  const keys = Array.from({ length: 9 }, (_, i) => `<path class="mb-key" style="--k:${(i * 0.37) % 1.1}s" d="M${178 + i * 13.5} 398 v-1"/>`).join("");
  const how = () => S(`
    <!-- desk + chair -->
    <rect class="mb-ink" x="10" y="410" width="380" height="14" rx="3" fill="${G1}"/>
    ${ink("M44 424 V478")}${ink("M356 424 V478")}
    ${ink("M56 236 C28 296 34 360 62 398", `stroke-width="5"`)}
    ${ink("M40 400 H150")}${ink("M96 400 V474")}${ink("M58 476 H134")}
    <!-- agent: torso, head, hair -->
    <path class="mb-ink" d="M64 306 C54 346 64 384 76 400 H152 C154 366 146 332 132 304 Z" fill="${G2}"/>
    ${hair(110, 250, 33, 12, 15, G1, 120, 300)}
    <circle class="mb-ink" cx="112" cy="252" r="34" fill="${W}"/>
    ${hair(112, 238, 24, 7, 13, G1, 190, 160)}
    <!-- face (looking right) -->
    ${ink("M133 248 l7 1")}${ink("M136 256 q3 5 -1 8")}${ink("M124 270 q10 8 22 -2")}
    <!-- headset -->
    ${ink("M80 244 C80 202 142 200 146 240", `stroke-width="4"`)}
    <ellipse class="mb-ink" cx="82" cy="262" rx="8" ry="13" fill="${INK}"/>
    ${ink("M84 275 C90 300 120 302 142 284")}<circle class="mb-ink" cx="144" cy="283" r="4" fill="${INK}"/>
    <!-- arm + hand -->
    ${ink("M116 322 C150 338 172 366 196 384", `stroke-width="12" stroke="${G2}"`)}
    ${ink("M110 316 C146 332 168 360 192 378")}${ink("M122 330 C152 350 172 374 198 390")}
    <ellipse class="mb-ink" cx="202" cy="388" rx="12" ry="8" fill="${W}"/>
    <!-- keyboard -->
    <rect class="mb-ink" x="168" y="392" width="132" height="16" rx="4" fill="${W}"/>
    <g class="mb-keys" stroke-width="3">${keys}</g>
    <!-- monitor -->
    ${ink("M280 316 V392", `stroke-width="6"`)}${ink("M246 392 H312")}
    <rect class="mb-ink" x="170" y="160" width="214" height="156" rx="10" fill="${W}"/>
    <rect class="mb-ink" x="182" y="172" width="190" height="132" rx="4" fill="#f5f5f2" stroke-width="2.2"/>
    <g class="mb-scr mb-scr-a" stroke-width="2.4">
      <rect class="mb-ink" x="194" y="184" width="104" height="26" rx="8" fill="${W}"/>
      ${ink("M204 194 h60")}${ink("M204 202 h40")}
      <rect class="mb-ink" x="254" y="218" width="106" height="26" rx="8" fill="${MINT}"/>
      ${ink("M264 228 h70")}${ink("M264 236 h46")}
      <rect class="mb-ink" x="194" y="252" width="62" height="24" rx="8" fill="${W}"/>
      <g class="mb-dots" fill="${INK}" stroke="none"><circle cx="208" cy="264" r="3"/><circle cx="222" cy="264" r="3"/><circle cx="236" cy="264" r="3"/></g>
    </g>
    <g class="mb-scr mb-scr-b" stroke-width="2.4">
      <rect class="mb-ink" x="194" y="184" width="166" height="14" rx="3" fill="${G1}"/>
      <rect class="mb-ink" x="194" y="206" width="100" height="62" rx="4" stroke-dasharray="5 5"/>
      ${ink("M194 206 L294 268 M294 206 L194 268", `stroke-width="1.6"`)}
      <rect class="mb-ink" x="302" y="206" width="58" height="28" rx="4" fill="${MINT}"/>
      <rect class="mb-ink" x="302" y="240" width="58" height="28" rx="4" fill="${W}"/>
      <rect class="mb-ink" x="194" y="276" width="52" height="18" rx="9" fill="${OLIVE}" stroke="${INK}"/>
      <path class="mb-cursor" d="M0 0 l0 16 l5 -4 l4 9 l4 -2 l-4 -9 l7 0 z" fill="${INK}" stroke="${W}" stroke-width="1.5"/>
    </g>
    <!-- sticky note, mug, steam -->
    <g transform="rotate(6 372 150)"><rect class="mb-ink" x="352" y="130" width="40" height="36" fill="#f3e9a6" stroke-width="2.4"/></g>
    <text x="360" y="153" style="font-family:var(--font-hand)" font-size="17" font-weight="700" fill="${INK}" stroke="none" transform="rotate(6 372 150)">#4021</text>
    <path class="mb-ink" d="M326 380 h34 v30 h-34 z" fill="${W}"/>${ink("M360 388 q16 4 0 18")}
    <path class="mb-steam mb-s1" d="M336 372 q-6 -10 0 -18 t0 -18"/><path class="mb-steam mb-s2" d="M348 372 q-6 -10 0 -18 t0 -18"/>
    <text x="36" y="86" style="font-family:var(--font-hand)" font-size="34" font-weight="700" fill="${INK}" stroke="none" transform="rotate(-5 36 86)">tickets</text>
    ${ink("M130 80 C 170 62 210 70 232 100", `stroke-width="2.6"`)}${ink("M222 92 l12 10 l-16 4")}
    <text x="222" y="60" style="font-family:var(--font-hand)" font-size="34" font-weight="700" fill="${INK}" stroke="none" transform="rotate(-3 222 60)">→ flows</text>
  `, "mb-art-how");

  /* ---------- WHY: curiosity → meaningful ---------- */
  const tangle = "M70 330 C 40 280 120 250 110 310 C 100 360 170 330 150 280 C 140 250 210 240 200 290 C 190 340 260 350 250 300 C 240 260 300 250 290 300 C 285 335 320 340 330 300";
  const heart = "M200 372 C 120 318 112 252 160 244 C 184 240 196 256 200 268 C 204 256 216 240 240 244 C 288 252 280 318 200 372 Z";
  const why = () => S(`
    <!-- floating questions -->
    <text class="mb-q mb-q1" x="60" y="120" style="font-family:var(--font-hand)" font-size="64" font-weight="700" fill="${INK}" stroke="none">?</text>
    <text class="mb-q mb-q2" x="160" y="84" style="font-family:var(--font-hand)" font-size="48" font-weight="700" fill="${INK}" stroke="none">?</text>
    <text class="mb-q mb-q3" x="300" y="130" style="font-family:var(--font-hand)" font-size="72" font-weight="700" fill="${INK}" stroke="none">?</text>
    <text class="mb-q mb-q4" x="236" y="60" style="font-family:var(--font-hand)" font-size="40" font-weight="700" fill="${INK}" stroke="none">?</text>
    <!-- page of tangles -->
    <rect class="mb-ink" x="40" y="170" width="320" height="250" rx="10" fill="${W}"/>
    <g class="mb-tangle" stroke-width="2.6"><path class="mb-ink" d="${tangle}" transform="translate(0 -70)"/><path class="mb-ink" d="${tangle}" transform="translate(10 -20)"/><path class="mb-ink" d="${tangle}" transform="translate(-10 30)"/></g>
    <!-- revealed under the lens -->
    <g class="mb-reveal-clip"><g class="mb-reveal">
      <rect x="40" y="170" width="320" height="250" rx="10" fill="${W}" stroke="none"/>
      <path class="mb-ink" d="${heart}" fill="${MINT}" stroke-width="3.2" transform="translate(0 -20)"/>
      <g transform="translate(0 -20)">${ink("M170 296 l20 20 l40 -44", `stroke-width="5"`)}</g>
    </g></g>
    <!-- magnifier -->
    <g class="mb-lens">
      <circle class="mb-ink" cx="0" cy="0" r="62" fill="${W}" fill-opacity="0.12" stroke-width="5"/>
      ${ink("M44 44 L104 104", `stroke-width="12"`)}${ink("M44 44 L104 104", `stroke-width="5" stroke="${G1}"`)}
      ${ink("M-34 -30 q10 -18 30 -22", `stroke-width="3" opacity="0.5"`)}
    </g>
    <g class="mb-spark mb-sp1" transform="translate(330 220)">${ink("M0 -14 V14 M-14 0 H14 M-9 -9 L9 9 M9 -9 L-9 9", `stroke-width="2.6"`)}</g>
    <g class="mb-spark mb-sp2" transform="translate(70 380)">${ink("M0 -10 V10 M-10 0 H10", `stroke-width="2.6"`)}</g>
    <text x="40" y="468" style="font-family:var(--font-hand)" font-size="32" font-weight="700" fill="${INK}" stroke="none" transform="rotate(-2 40 468)">what if…? → why it matters</text>
  `, "mb-art-why");

  /* ---------- AUDIENCE: design for all ---------- */
  const faceBase = (cx: number, cy: number, r = 30) => `
    <circle class="mb-ink" cx="${cx}" cy="${cy}" r="${r}" fill="${W}"/>
    <circle cx="${cx - 10}" cy="${cy - 3}" r="2.6" fill="${INK}" stroke="none"/><circle cx="${cx + 10}" cy="${cy - 3}" r="2.6" fill="${INK}" stroke="none"/>
    ${ink(`M${cx - 9} ${cy + 10} q9 8 18 0`, `stroke-width="2.6"`)}`;
  const faces: ((x: number, y: number) => string)[] = [
    // curly
    (x, y) => `${hair(x, y - 4, 30, 11, 13, G1, 130, 280)}${faceBase(x, y)}${hair(x, y - 18, 17, 5, 9, G1, 195, 150)}`,
    // hijab
    (x, y) => `<ellipse class="mb-ink" cx="${x}" cy="${y + 6}" rx="42" ry="46" fill="${MINT}"/>${faceBase(x, y + 2, 26)}`,
    // glasses + bald + stubble
    (x, y) => `${faceBase(x, y)}<circle class="mb-ink" cx="${x - 10}" cy="${y - 3}" r="8.5" stroke-width="2.4"/><circle class="mb-ink" cx="${x + 10}" cy="${y - 3}" r="8.5" stroke-width="2.4"/>${ink(`M${x - 1.5} ${y - 3} h3`, `stroke-width="2.4"`)}`,
    // braids
    (x, y) => `${ink(`M${x - 26} ${y - 6} C${x - 40} ${y + 20} ${x - 30} ${y + 40} ${x - 36} ${y + 54}`, `stroke-width="9" stroke="${INK}"`)}${ink(`M${x + 26} ${y - 6} C${x + 40} ${y + 20} ${x + 30} ${y + 40} ${x + 36} ${y + 54}`, `stroke-width="9" stroke="${INK}"`)}<path class="mb-ink" d="M${x - 32} ${y - 8} C${x - 30} ${y - 46} ${x + 30} ${y - 46} ${x + 32} ${y - 8} C${x + 14} ${y - 22} ${x - 14} ${y - 22} ${x - 32} ${y - 8} Z" fill="${INK}"/>${faceBase(x, y + 2, 28)}`,
    // cap
    (x, y) => `${faceBase(x, y + 2)}<path class="mb-ink" d="M${x - 33} ${y - 6} C${x - 30} ${y - 40} ${x + 30} ${y - 40} ${x + 33} ${y - 6} Z" fill="${OLIVE}"/>${ink(`M${x + 2} ${y - 6} h44`, `stroke-width="6"`)}`,
    // headphones / afro
    (x, y) => `<circle class="mb-ink" cx="${x}" cy="${y - 6}" r="40" fill="${G2}"/>${faceBase(x, y + 2, 27)}`,
  ];
  const pos: [number, number][] = [[74, 132], [326, 132], [52, 300], [348, 300], [122, 430], [278, 430]];
  const people = pos.map(([x, y], i) => `<g class="mb-face" style="--i:${i};transform-origin:${x}px ${y}px">${faces[i](x, y)}</g>`).join("");
  const links = pos.map(([x, y], i) => `<path class="mb-link" d="M${x + (x < 200 ? 34 : -34)} ${y + (y > 300 ? -26 : y < 200 ? 26 : 0)} Q ${(x + 200) / 2} ${(y + 276) / 2 + (i % 2 ? 16 : -16)} ${x < 200 ? 142 : 258} ${y < 200 ? 220 : y > 300 ? 330 : 276}" stroke-width="2.2" stroke-dasharray="3 7"/>`).join("");
  const audience = () => S(`
    ${links}
    <!-- the one screen everybody shares -->
    <rect class="mb-ink" x="140" y="196" width="120" height="160" rx="16" fill="${W}" stroke-width="3.4"/>
    ${ink("M184 206 h32", `stroke-width="3"`)}
    <g class="mb-ic mb-ic1" transform="translate(200 276)"><text x="0" y="14" text-anchor="middle" style="font-family:var(--font-sans)" font-weight="800" font-size="52" fill="${INK}" stroke="none">Aa</text></g>
    <g class="mb-ic mb-ic2" transform="translate(200 276)"><circle class="mb-ink" r="26"/><path d="M0 -26 A26 26 0 0 1 0 26 Z" fill="${INK}"/></g>
    <g class="mb-ic mb-ic3" transform="translate(200 276)">${ink("M-26 -8 v16 M-13 -20 v40 M0 -30 v60 M13 -20 v40 M26 -8 v16", `stroke-width="5"`)}</g>
    <g class="mb-ic mb-ic4" transform="translate(200 276)"><circle class="mb-ink" r="26"/><circle cx="0" cy="-12" r="4" fill="${INK}"/>${ink("M-14 -4 h28 M0 -4 v12 l-9 16 M0 8 l9 16", `stroke-width="3.4"`)}</g>
    ${people}
    <text x="70" y="488" style="font-family:var(--font-hand)" font-size="32" font-weight="700" fill="${INK}" stroke="none" transform="rotate(-2 70 488)">one design, every body</text>
  `, "mb-art-aud");



export const briefArt = { how, why, audience };
