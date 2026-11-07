import Image from "next/image";
import { Pill } from "@/components/ui/pill";
import { ArrowRight, CoffeeSquiggle } from "@/components/ui/icons";
import { Item, Stage } from "@/components/motion/stage";
import { SplitWords } from "@/components/motion/split-words";
import { site } from "@/content/site";

/**
 * Reach out — Figma "Frame 1618869295" (2153:6038), 1440×594.
 * A full-bleed photo panel (right 61.88 %) under an 80 % black scrim, copy block at (64, 91), coffee note + squiggle.
 * The section sits on a photograph, so it pins the dark theme tokens regardless of the Customize theme.
 */
export function Contact() {
  const { contact, email } = site;
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-theme="dark"
      className="relative isolate overflow-hidden bg-[var(--base-surface)] text-fg"
    >
      {/* Scrim spans the whole viewport width; the photo is anchored to the 1440 frame and bleeds to the right edge on wider screens. */}
      <div aria-hidden className="absolute inset-0 z-[1] bg-[rgb(0_0_0/0.8)]" />

      <div className="page-shell relative flex flex-col pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[77px] lg:pt-[91px]">
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 z-0 lg:left-[38.14%]"
          style={{ right: "min(0px, calc((1440px - 100vw) / 2))" }}
        >
          <Image
            src="/assets/contact-coffee.png"
            alt=""
            fill
            sizes="(min-width:1024px) 62vw, 100vw"
            className="object-cover"
          />
        </div>

        <Stage amount={0.35} gap={0.05} className="relative z-[2] flex w-full flex-col gap-7 lg:w-[760px] lg:max-w-full">
          <Item as="p" kind="fade" className="t-eyebrow text-fg-muted">{contact.eyebrow}</Item>
          <div className="cq">
            <h2 id="contact-title" className="t-display text-[length:calc(100cqw/8.95)] leading-[1.0118] text-fg-contact">
              <SplitWords text={contact.headlineLead} />{" "}
              <span className="text-accent-display"><SplitWords text={contact.headlineEmphasis} /></span>
            </h2>
          </div>
          <Item as="p" kind="fade" className="text-[18px] leading-[1.6] text-fg/90">{contact.body}</Item>
          <Item kind="fade" className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Pill variant="solid" href={`mailto:${email}`} className="group px-5" magnetic>
              {contact.cta}
              <ArrowRight className="transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5" />
            </Pill>
          </Item>
        </Stage>

        {/* Figma: left 1186 / top 383.73 / w 205. Below xl it drops under the button instead of overlapping the copy. */}
        <p className="relative z-[2] mt-7 font-note text-[16px] leading-[18px] text-[rgb(193_193_193/0.8)] xl:absolute xl:left-[82.36%] xl:top-[383.73px] xl:mt-0 xl:w-[205px]">
          {contact.note}
        </p>
        <CoffeeSquiggle aria-hidden className="absolute left-[87.8%] top-[268px] z-[2] hidden text-[rgb(230_230_230/0.9)] xl:block" />
      </div>
    </section>
  );
}
