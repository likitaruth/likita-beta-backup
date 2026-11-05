import localFont from "next/font/local";

/**
 * Self-hosted from @fontsource packages (no runtime request to Google).
 * Unbounded, Montserrat and Happy Monkey are the exact Figma families.
 * "Figma Hand" ships only inside Figma (it is not on npm / Google Fonts — verified: @fontsource/figma-hand → 404),
 * so Caveat is a TEMPORARY stand-in. --font-hand tries a locally installed "Figma Hand" first.
 */
export const unbounded = localFont({
  src: "../node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2",
  weight: "200 900",
  variable: "--font-unbounded",
  display: "swap",
});

export const montserrat = localFont({
  src: [
    { path: "../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2", style: "normal" },
    { path: "../node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

export const happyMonkey = localFont({
  src: "../node_modules/@fontsource/happy-monkey/files/happy-monkey-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-happy-monkey",
  display: "swap",
});

// TEMPORARY stand-in for Figma Hand. Remove once the real font is licensed/available.
export const handFallback = localFont({
  src: "../node_modules/@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2",
  weight: "400 700",
  variable: "--font-hand-fallback",
  display: "swap",
});

export const fontVariables = [unbounded.variable, montserrat.variable, happyMonkey.variable, handFallback.variable].join(" ");
