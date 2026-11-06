import Image from "next/image";
import type { Metadata } from "next";
import { Subpage } from "@/components/layout/subpage";
import { About } from "@/components/home/about";
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
        <Stage trigger="mount" gap={0.1} className="relative flex flex-col gap-8 lg:block lg:h-[46.3cqw]">
          <h1 id="who" className="t-display scroll-mt-24 text-accent text-[clamp(44px,11.74cqw,154px)] leading-[1.065]">
            <Item as="span" kind="wipe" className="block">{a.titleLead}</Item>
            <span className="flex flex-wrap items-baseline justify-between gap-x-4">
              <Item as="span" kind="wipe" className="block">THE</Item>
              <Item as="span" kind="wipe" className="block font-sans font-medium italic">{a.titleEmphasis}</Item>
            </span>
          </h1>

          <Item kind="settle" className="relative aspect-[431.6/383] w-full max-w-[431px] overflow-hidden rounded-[9px] lg:absolute lg:left-[21.6%] lg:top-[19.5cqw] lg:z-10 lg:w-[32.9%] lg:max-w-none">
            <Image src="/assets/about-photo.jpg" alt={a.photoAlt} fill priority sizes="(min-width:1024px) 432px, 100vw" className="object-cover" />
          </Item>

          <div className="flex flex-col gap-5 text-[18px] leading-[19px] text-[#b3b3b3] lg:absolute lg:left-[56.4%] lg:top-[26.2cqw] lg:w-[43.1%]">
            <Item as="p" id="how" className="scroll-mt-24">{a.paragraphs[0]}</Item>
            <Item as="p" id="why" className="scroll-mt-24">{a.paragraphs[1]}</Item>
          </div>
        </Stage>
      </div>

      <section id="audience" aria-label={a.gameLabel} className="mt-12 scroll-mt-24 lg:mt-[69px]">
        <Stage amount={0.2}>
          <Item as="p" kind="fade" className="page-shell t-eyebrow !tracking-normal text-[#958e8e] lg:!pl-[118px]">{a.gameLabel}</Item>
          {/* FLAG: Figma ships this as one flattened raster (2780×1068); it is not interactive. Export "image 116885" over this placeholder. */}
          <Item kind="fade" className="relative mt-5 aspect-[2780/1068] w-full">
            <Image src="/assets/about-game.png" alt="Preview of the Two Truths and a Lie game" fill sizes="100vw" className="object-cover" />
          </Item>
        </Stage>
      </section>

      <div className="mt-12 lg:mt-[0px]"><About /></div>
    </Subpage>
  );
}
