import type { Metadata } from "next";
import { Subpage } from "@/components/layout/subpage";
import { About } from "@/components/home/about";
import { AboutVideo } from "@/components/about/about-video";
import { TwoTruthsGame } from "@/components/about/two-truths-game";
import { FigmaFrame } from "@/components/about/figma-frame";
import { Item, Stage } from "@/components/motion/stage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About me — Likita" };

/**
 * About Me — Figma 2077:9103.
 * Title (154px) → photo overlapping the title's second line → two paragraphs → game band → Me in Brief.
 * From lg up the composition is placed in container-width units so it scales exactly with the 1312 Figma column;
 * below lg it stacks.
 * Me in Brief reuses the homepage section (the About frame still shows the pre-update version of that block).
 * Its rows link to #who / #how / #why / #audience; the targets below are the nearest content blocks — FLAG: confirm mapping.
 */
export default function AboutPage() {
  const a = site.aboutPage;
  return (
    <Subpage>
      <div className="page-shell cq pt-[70px]">
        <Stage trigger="mount" gap={0.1} className="relative flex flex-col gap-8 lg:block lg:h-[60cqw]">
          <h1 id="who" className="t-display scroll-mt-24 text-accent text-[clamp(44px,11.74cqw,154px)] leading-[1.065]">
            <Item as="span" kind="wipe" className="block">{a.titleLead}</Item>
            <span className="flex flex-wrap items-baseline justify-between gap-x-4">
              <Item as="span" kind="wipe" className="block">THE</Item>
              <Item as="span" kind="wipe" className="block font-sans font-medium italic">{a.titleEmphasis}</Item>
            </span>
          </h1>

          <Item kind="fade" className="relative aspect-[4/5] w-[82%] max-w-[360px] lg:absolute lg:left-[21.6%] lg:top-[21cqw] lg:z-10 lg:w-[30.5%] lg:max-w-none">
            <AboutVideo src="/assets/about-video.mp4" poster="/assets/about-video-poster.jpg" label={a.photoAlt} />
          </Item>

          <div className="flex max-w-[30rem] flex-col gap-7 text-[17px] leading-[1.65] text-[#b3b3b3] lg:absolute lg:left-[58.5%] lg:top-[30cqw] lg:w-[41.5%]">
            <span aria-hidden className="ab-tick block h-0.5 w-10 bg-accent-soft" />
            {a.paragraphs.map((t, i) => (
              <Item as="p" key={i} id={i === 0 ? "how" : "why"} className="scroll-mt-24">
                {t.split("Frame 3523").flatMap((part, j, all) => (j < all.length - 1 ? [part, <FigmaFrame key={j}>Frame 3523</FigmaFrame>] : [part]))}
              </Item>
            ))}
          </div>
        </Stage>
      </div>

      <section id="audience" aria-label={a.gameLabel} className="mt-12 scroll-mt-24 lg:mt-[69px]">
        <Stage amount={0.2}>
          <Item as="p" kind="fade" className="page-shell t-eyebrow flex items-center gap-3.5 !tracking-normal text-[#958e8e]"><span aria-hidden className="h-0.5 w-7 bg-accent-soft" />{a.gameLabel}</Item>
          {/* Rebuilt as a playable game from the reference video (the Figma frame is a flat raster). */}
          <Item kind="fade" className="page-shell mt-5">
            <TwoTruthsGame />
          </Item>
        </Stage>
      </section>

      <div className="mt-12 lg:mt-[0px]"><About defaultOpen={1} /></div>
    </Subpage>
  );
}
