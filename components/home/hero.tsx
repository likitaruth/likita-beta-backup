import { SiteNav } from "@/components/layout/site-nav";
import { Pill } from "@/components/ui/pill";
import { ScrollArrow } from "@/components/ui/icons";
import { WelcomeCharacter } from "./welcome-character";
import { site } from "@/content/site";
import type { CSSProperties } from "react";

/** Intro delay in ms, consumed by the `.intro-*` CSS keyframes (no JS, plays from first paint). */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

/**
 * Hero — Figma "Direction 01 — Typographic editorial" (2144:11230), 1440×648.
 * xl: 176px margin column + headline column, welcome illustration pinned right.
 * Below xl the composition re-flows (margin block above, illustration after the CTA).
 * Display type is sized from its container (cqw) so the headline keeps Figma's proportions at any width.
 * Motion: server-rendered CSS intro (rule → ethos → headline lines → purpose → CTA) finishing in ~0.9 s;
 * the character is deliberately absent until the first downward scroll (see WelcomeCharacter).
 */
export function Hero() {
  const { hero } = site;
  return (
    <section aria-label="Introduction" className="bg-canvas">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="px-5 pt-10 md:px-8 lg:px-16">
          <SiteNav />
        </div>

        <div className="px-5 pb-14 pt-10 md:px-8 md:pb-16 md:pt-14 lg:px-16 xl:grid xl:grid-cols-[176px_auto] xl:gap-x-10 xl:pb-[95px] xl:pt-[76px]">
          {/* Editorial margin */}
          <div className="mb-10 flex flex-col gap-[30px] xl:mb-0">
            <span aria-hidden style={d(40)} className="intro-grow block h-[5px] w-10 bg-accent" />
            <p style={d(100)} className="intro-fade t-eyebrow !leading-[2] text-fg-muted">
              {hero.ethos.map((l) => (<span key={l} className="block">{l}</span>))}
            </p>
          </div>

          {/* Typographic statement */}
          <div className="hero-drift flex flex-col gap-8 xl:w-[min(836px,calc((min(100vw,1440px)_-_653px)*1.22))]">
            <div className="cq">
              <h1 className="t-display text-fg" aria-label="Product design">
                <span aria-hidden className="mask-line block whitespace-nowrap leading-[1.0566] tracking-[-0.09em] text-[length:calc(100cqw/6.7)] xl:text-[length:calc(100cqw/7.8868)]">
                  <span style={d(60)} className="intro-wipe block"><span className="text-accent">/</span>{hero.line1}</span>
                </span>
                <span aria-hidden className="mask-line block whitespace-nowrap leading-[1.0492] tracking-[-0.09em] text-[length:calc(100cqw/5.82)] xl:text-[length:calc(100cqw/6.8525)]">
                  <span style={d(140)} className="intro-wipe block">{hero.line2}<span className="text-accent">.</span></span>
                </span>
              </h1>
            </div>

            <p style={d(340)} className="intro-rise font-display text-[clamp(14px,3.6vw,21px)] font-semibold leading-[1.6] text-accent md:h-[34px] md:text-[21px]">
              {hero.purpose.lead}
              <span className="text-fg">{hero.purpose.strong}</span>
              <span className="font-sans font-normal italic text-fg">{hero.purpose.italic}</span>
              <span className="font-sans font-normal italic">{hero.purpose.end}</span>
            </p>

            <div style={d(400)} className="intro-rise flex flex-wrap items-center gap-3 pt-[10px]">
              <Pill variant="solid" href="#selected-work" className="group" magnetic>
                {hero.cta}
                <ScrollArrow className="transition-transform duration-300 ease-out-quint group-hover:translate-y-0.5" />
              </Pill>
            </div>
          </div>

          {/* Welcome illustration (xl: pinned like Figma; below: flows after the CTA). Hidden until first downward scroll. */}
          <div className="relative mt-10 h-[183px] w-[197px] md:ml-auto xl:absolute xl:right-[88px] xl:top-[250px] xl:mt-0">
            <WelcomeCharacter src="/assets/welcome-illustration.webp" alt="Illustration of Likita peeking around a pole with curly hair, smiling" caption={hero.welcome} />
          </div>
        </div>
      </div>
    </section>
  );
}
