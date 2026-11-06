import type { Metadata } from "next";
import { Subpage } from "@/components/layout/subpage";
import { Item, Stage } from "@/components/motion/stage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Hit me up — Likita" };

/**
 * Contact — Figma "Before Hover" (2077:9240) and "On Hover" (2077:9215).
 * Closed: "HIT ME / UP" stacked tight. Open: the two lines split and the email line rises into the gap.
 * Pure CSS (see .hit in globals.css): opens on pointer hover or keyboard focus inside the block; on touch and for
 * reduced motion the open state is simply shown, so nothing is ever hidden behind a hover.
 */
export default function ContactPage() {
  const c = site.contactPage;
  return (
    <Subpage>
      <div className="page-shell cq pb-[120px] pt-[60px] md:pb-[229px] md:pt-[118px]">
        <Stage trigger="mount" gap={0.12} className="hit mx-auto flex w-full max-w-[760px] flex-col items-center gap-[0.156em] text-center text-accent text-[clamp(44px,11.74cqw,154px)]">
          <h1 className="contents">
            <span className="sr-only">Hit me up</span>
            <Item as="span" kind="wipe" aria-hidden className="hit-line-1 block t-display leading-[1.065]">
              <span className="hit-shift block">{c.first}<span className="font-medium">{c.firstEmphasis}</span></span>
            </Item>
          </h1>
          <Item as="p" kind="fade" className="relative z-10 text-[clamp(15px,1.45cqw,19px)] font-medium leading-[27px] text-fg">
            <span className="hit-mid block">
              {c.lead}
              <a href={`mailto:${site.email}`} className="underline underline-offset-[3px] decoration-from-font hover:no-underline focus-visible:no-underline">{site.email}</a>
            </span>
          </Item>
          <Item as="span" kind="wipe" aria-hidden className="hit-line-2 block t-display font-medium leading-[1.065]">
            <span className="hit-shift block">{c.second}</span>
          </Item>
        </Stage>
      </div>
    </Subpage>
  );
}
