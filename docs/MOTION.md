# Motion choreography — Likita portfolio

Status: spec written before implementation. Layout, type, colour and copy stay exactly as in Figma; motion only
changes transform / opacity / clip-path, never layout.

## Principles (applied everywhere)

1. **One orchestrated moment per view, quiet everywhere else.** The hero intro is the signature moment. Scroll
   reveals are limited to the three places where something is genuinely *arriving* (stack, about rows, contact
   headline). No blanket fade-up on every block.
2. **Respond to people fast, let ambient motion take its time.** UI feedback ≤ 200 ms. Reveals 600–900 ms.
3. **Transform, opacity and clip-path only.** No width/height/top/left animation → no layout shift, 60 fps.
4. **Everything is interruptible.** Springs retarget from current velocity; no animation is awaited before input is
   accepted; no queues.
5. **Asymmetric timing.** Enter slower and softer than exit (exit ≈ 60 % of enter).
6. **Never animate from scale 0 or opacity-only for things that physically move.** Start from ≥ 0.94 scale with offset.
7. **Reduced motion** (`prefers-reduced-motion: reduce`): no translation, scale, rotation, parallax, magnetism or
   clip wipes. State changes become a 150 ms opacity cross-fade; reveals show immediately (opacity only).
   Hover colour changes remain. Scroll-linked effects are disabled.
8. **Touch / coarse pointers:** no magnetic pull, no hover-dependent motion; tap states use the press spring.

## Tokens (`lib/motion.ts`)

| Token | Value | Used for |
|---|---|---|
| `ease.out` | `cubic-bezier(.22,1,.36,1)` | all reveals, hovers |
| `ease.inOut` | `cubic-bezier(.65,0,.35,1)` | clip wipes, overlay panels |
| `dur.micro / ui / reveal / hero` | 0.18 / 0.3 / 0.8 / 1.0 s | |
| `spring.press` | stiffness 520, damping 34 | button press, toggles |
| `spring.magnet` | stiffness 200, damping 17, mass 0.6 | magnetic pull + release (slight overshoot) |
| `spring.stack` | stiffness 260, damping 27, mass 0.9 | card promote / plate settle |
| `spring.throw` | stiffness 150, damping 21 | card leaving the stack |
| `spring.soft` | stiffness 120, damping 24 | parallax, tilt |
| stagger | 0.07 s (lines) / 0.045 s (words) | |

## Sections

### 1. Navigation (coordinated)
- **Load:** logo → Customize pill → menu icon rise 8 px + fade, 0.08 s stagger, `ease.out` 0.6 s, starting 0.05 s
  before the hero headline so the page "wakes up" top-down.
- **Customize popover:** opens with scale 0.96→1, y −6→0, opacity, origin top-right, `spring.press`; exits in 0.12 s.
  Options stagger 0.025 s. Escape / outside click close; interruptible (reopen mid-exit retargets).
- **Menu overlay:** scrim fades 0.25 s; panel slides from right (x 24→0) + opacity with `spring.stack`; links stagger
  0.05 s from y 12. Exit 0.18 s fade/slide. Focus trap + scroll lock unchanged.
- **Hamburger ↔ close:** icon cross-rotates (rotate ±45° → 0, opacity) 0.2 s.
- **Reduced:** opacity only, 0.15 s.

### 2. Hero — the single orchestrated moment
Sequence (t = seconds after hydration):
- 0.00 olive rule scales X 0→1 from left (0.6 s `ease.inOut`).
- 0.05 ethos lines (DESIGNER. / THINKER. / BUILDER) fade in, 0.07 stagger.
- 0.10 headline line 1 **wipe-up** (clip-path top inset 100 % → −10 % + y 38 %→0, 0.9 s `ease.out`).
- 0.19 headline line 2 same, +0.09 s.
- 0.55 purpose line + CTA rise 12 px + fade (0.6 s), 0.08 stagger.
- 0.45 welcome illustration: scale 0.94→1, y 16→0, opacity, `spring.stack`; caption fades 0.3 s later.
- Letter-spacing and line boxes are untouched (line-level reveal, not per-glyph) so Figma tracking/kerning is exact.
- **Scroll:** headline block drifts up ≤ 48 px and fades to 0.4 over the first 70 % of the hero (scroll-linked,
  `spring.soft` smoothing). Illustration drifts at ~0.5× that.
- **Interrupt:** scrolling during the intro just continues; no scroll lock.
- **Reduced:** everything visible immediately; opacity 150 ms only.

### 3. Selected Works — physical stack
Model: the front card is a real object; plates behind are the next cards.
- **Idle depth:** plates sit at `--step` / `--dx` offsets exactly as Figma.
- **Pointer drag (x):** the front card follows the finger/cursor 1:1, `rotate = x/60` (max ±6°), plates beneath
  parallax 8 % of drag. Rubber-band (elastic 0.2) at the first/last project.
- **Commit:** distance > 110 px **or** velocity > 450 px/s (either direction of travel), or arrow key, or button.
- **Throw:** leaving card keeps its release velocity; exits with `spring.throw` to x ±1.1 × card width, rotate ±9°,
  opacity → 0 in the last 40 %. It stays above the stack (z-index) with `pointer-events: none`.
- **Promote:** the new front card starts at the plate-1 pose (y +`--step`, scale 0.97), content opacity 0, then
  springs to rest with `spring.stack`; content fades in 0.12 s later. Remaining plates shift up one slot (spring,
  0.025 s stagger). Counter digits cross-slide vertically (5 px).
- **Interruption:** a second input mid-throw leaves the first card flying (independent element), promotes
  the next card immediately from its *current* in-flight pose. Rapid arrow-key repeats are not queued — each
  press advances once; held keys are ignored (`e.repeat`).
- **Cancel:** release under threshold → spring back (`spring.press`) with rotation unwinding.
- **Keyboard / SR:** ArrowLeft/Right, labelled buttons, `aria-live` status; no motion dependence.
- **Reduced:** no drag rotation or throw; cards cross-fade 150 ms; swipe still navigates.
- **Section entry (scroll):** plates "deal" in once: each plate y −10 px→0 + opacity, 0.06 s stagger, when 35 % in view.

### 4. Shared-element + page transitions
- Uses React `<ViewTransition>` (View Transitions API, documented Next.js pattern — no extra dependency).
- Selected Works card **media** and **title** carry `name="project-{slug}-media|title"`; the project page hero
  carries the same names → they morph (0.5 s, `ease.out`, slight blur at mid-flight).
- Page root: shared fade/slide-up of 12 px (enter 0.3 s delayed 0.1 s after exit 0.15 s). Back navigation reverses.
- Non-supporting browsers: instant navigation, nothing breaks. Reduced motion: transitions disabled (CSS).
- Note: the case-study pages are **not designed** in the homepage scope. A minimal, clearly marked stub route
  (`/works/[slug]`: title + approved description only) exists solely as the transition target.

### 5. About — rows + character
- **Scroll:** row dividers draw (scaleX 0→1, origin left, 0.7 s, 0.08 s stagger) while numbers/titles fade up 10 px.
- **Row hover/focus:** number colour (existing), title shifts x +6 px (`spring.press`), arrow button fills and
  travels 2 px up-right (existing), 180 ms.
- **Character:** the portrait frame tilts toward the pointer (±4° rotateX/Y, `spring.soft`, perspective 800) and the
  "Likita" scribble label parallaxes 6 px. Hovering a row **cross-fades the character to that row's state**
  (`CharacterSwap`, 0.45 s, scale 1.02→1, `ease.out`, interruptible). Figma currently contains **only one**
  character illustration, so every row maps to the same image until alternate poses are supplied (see flags).
- **Reduced / touch:** no tilt; swap is a plain cross-fade.

### 6. Contact — cinematic type
- **Scroll (35 % in view):** headline reveals line-by-line with the same wipe-up as the hero (so the page feels
  like one system), 0.08 stagger, then body copy + button fade-rise 12 px.
- **Image:** scroll-linked parallax y ±24 px inside its frame (clipped) + 1.06→1 scale settle.
- **Email pill:** magnetic (see below).

### 7. Magnetic buttons & micro-interactions
- **Magnetic:** pointer within 1.4× the button bounds pulls it ≤ 8 px (strength 0.28 of offset) with `spring.magnet`;
  release springs back with slight overshoot. Inner label/arrow follows at 0.5× for a parallax feel. Applies to
  solid pills, the card CTA, circle arrows (0.18) and menu button (0.2). Disabled on touch + reduced motion.
- **Press:** `scale 0.97`, `spring.press`, on pointerdown; release returns.
- **Hover arrows:** existing 2 px nudges stay (CSS, 300 ms).
- **Footer links:** underline-free; hover shifts x 4 px and dims siblings to 0.6 opacity (180 ms).
- **Focus-visible:** unchanged ring; never animated away.

## Performance & verification budget
- Only transform/opacity/clip-path; `will-change` applied by Motion only during animation.
- Scroll effects use `useScroll` + `useTransform` (no React re-renders).
- Verification in Chromium via Playwright: sampled frames during hero intro, drag/throw, hover, mid-transition;
  no horizontal overflow at 1440/820/390; layout geometry identical to the static build after intro; reduced-motion
  run with `reducedMotion: 'reduce'`; console free of errors.

## As built — deviations from the plan above (verified in Chromium)

- **Customize popover:** panel springs in/out as one unit (no per-option stagger — 5 short rows did not earn it).
- **Menu overlay:** scrim + panel + staggered links as specified; the hamburger→close icon rotation was dropped
  because they are two separate Figma controls, not one morphing icon.
- **Counter:** each card carries its own counter, so it travels with the card instead of a separate digit slide.
- **About row hover:** title shift + arrow are CSS (300 ms `ease-out-quint`), not a spring — cheaper and equally smooth.
- **Character swap:** wired and keyed by image `src`; Figma has one portrait only, so every row shows it and the swap is
  inert until alternate poses are supplied. Tilt/parallax are live.
- **Reduced motion:** states are identical on server and client; the preference is read hydration-safely and every
  property then jumps instantly except a 150 ms opacity fade.
- **Hit-me-up headline split** (Figma "Contact/On Hover" frames) belongs to the separate Contact page and is not built.
- **Shared-element target** `/works/[slug]` is a marked stub (title, image, approved copy only).

## As built — interaction pass 2 (supersedes conflicting items above)

- **Hero:** pure server component; intro is CSS-only (`intro-*` keyframes, `--d` delays, backwards fill) so it plays from first paint with no hydration wait. Headline masks are a static `clip-path` (no layout shift). Scroll drift uses CSS `animation-timeline: scroll()` (no JS).
- **Character:** hidden at load; one-time spring pop (`spring.pop`, scale .72→1, y 36→0) after the first downward scroll >24px, gated on visibility. Reduced motion: 200ms opacity only.
- **Selected Works:** sticky scroll track (section height = card + (n−1)·step; step = clamp(.55vh, 360, 640)). Scroll position maps to a card with hysteresis (.6) and one card per 240ms; scrolling back revisits cards; after the last card the page continues to About. Disabled (static stack, drag/buttons only) on short viewports and for reduced motion.
- **Input-specific transitions:** drag = throw spring with release velocity; button = `light`; keyboard = near-instant; scroll = stack spring.
- **Drag:** 1:1 with `dragDirectionLock`, rotation from x, commit at 110px or 300px/s, edge resistance, click suppressed 80ms after drag.
- **Shared element:** only the card media morphs, forward navigation only; titles never morph; root cross-fade disabled.
- **Magnetic:** primary solid CTAs only (hero, contact). Arrows/menu are plain press feedback.
- **About:** title shift and label parallax removed; portrait tilt ±2.5°; character swap keyed by src (inert until alternate poses exist).

## As built — Me in Brief + Reach out (updated Figma)

- **Me in Brief** (Figma 2153:6075 default / 2153:6294 hover): full-width rows (no side portrait). Row 01 is active by default and shows its arrow only. Pointer hover, keyboard focus, or — on touch — the row containing the viewport midline makes that row active *and engaged*: its arrow and character thumbnail reveal; every other row hides both. Pointer leave / blur returns to row 01 (unless keyboard focus is still inside a row).
- Reveal is CSS-only, driven by `data-active` / `data-shown` on the row: arrow 300 ms in / 150 ms out (opacity, x 8→0, scale .9→1); thumbnail 380 ms in after 40 ms / 150 ms out (opacity, x 12→0, scale .95→1). Thumbnail slot is fixed-width and zero layout height, so rows stay 114 px in every state. Reduced motion: opacity only, 150 ms. Thumbnails hidden below `md` (arrow only).
- **Reach out** (Figma 2153:6038): full-bleed 1440×594 section; photo in the right 61.88 % under an 80 % black scrim, bleeding to the viewport edge above 1440. Pins dark tokens (`data-theme="dark"`) because it sits on a photograph. Headline keeps the word-wipe reveal; the coffee note + squiggle sit at Figma coordinates from `xl`, and drop under the CTA below it.

## Subpages (as built)

Shared: `components/layout/subpage.tsx` (nav + page-level view transition + footer). Reveals reuse `Stage`/`Item`; all
reduced-motion handling is inherited (opacity-only).

- **Projects `/works`** — header wipes in on mount; ghost "2023 - 2026" drifts ±3% horizontally with a CSS `view()` timeline
  (compositor only, off for reduced motion). Rows reveal once at 25% in view. Row hover / keyboard focus-within: cover zooms to
  1.04 over 600ms ease-out-quint and the 20% black scrim lifts; sibling rows drop to 60% opacity (150-300ms). The pill is the real
  link, stretched over the whole row. Cover morphs into the case-study hero on forward navigation (`project-<slug>-media`).
- **About `/about`** — title wipes, photo `settle`s, copy rises; game band and Me in Brief reveal on view. Me in Brief is the
  homepage component (its own interaction spec above).
- **Case studies `/works/<slug>[/think|/build]`** — header, hero and tab bar stay; tab links use `transitionTypes=["nav-tab"]`
  and only `case-body` cross-fades (120ms out, 240ms in with 10px rise). Tabs are links (`aria-current="page"`), so they work
  without JS and are keyboard reachable. "Next" advances Design → Think → Build → next project.
- **Contact `/contact`** — pure CSS "HIT ME UP" split. Open offsets are Figma's (line 1 +17px, line 2 +100px at 154px type, in em).
  Closed state exists only for fine pointer + no reduced-motion; it opens on hover or focus-within (the email link lives in the
  revealed row). Touch, coarse pointers and reduced motion always see the open state. 520ms ease-out-quint on `translate`,
  260ms opacity on the email row.
- **Menu** — rows are square; hover/focus = cream fill, Unbounded 900 label, dark arrow disc (Figma 2090:9921 right panel).
  Header now sits at `z-50` so the menu and Customize popover stay above page content on every screen.
