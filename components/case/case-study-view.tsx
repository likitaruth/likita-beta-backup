import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { Subpage } from "@/components/layout/subpage";
import { Item, Stage } from "@/components/motion/stage";
import { CaseTabs } from "./case-tabs";
import { cn } from "@/lib/cn";
import { projects } from "@/content/projects";
import { tabLabels, tabOrder, type Block, type CaseStudy, type TabKey } from "@/content/case-studies";

const PLACEHOLDER = "/assets/case/placeholder.jpg";
const label = "text-[12px] font-semibold uppercase leading-[28px] text-fg-subtle";
const body = "text-[18px] leading-[1.15] text-fg";

/** Case-study screen — Figma 2077:8377 / 8491 / 8623. Header + tab bar are shared; the tab body is what changes. */
export function CaseStudyView({ study, tab }: { study: CaseStudy; tab: TabKey }) {
  const data = study.tabs[tab]!;
  const index = projects.findIndex((p) => p.slug === study.slug);
  const project = projects[index];
  const available = tabOrder.filter((t) => study.tabs[t]);
  const next = nextUp(study, tab, index);

  return (
    <Subpage compact>
      <article className="page-shell cq flex flex-col gap-10 pb-24 pt-[72px] md:pb-[120px]">
        <Stage trigger="mount" gap={0.08} className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-start justify-between">
                <Item as="div" kind="fade">
                  <Link href="/works" transitionTypes={["nav-back"]} className={cn(label, "group inline-flex items-center gap-2 transition-colors hover:text-fg")}>
                    <span aria-hidden className="transition-transform duration-300 ease-out-quint group-hover:-translate-x-1">←</span>
                    Back to works
                  </Link>
                </Item>
                <Item as="p" kind="fade" className={label} aria-label={`Project ${index + 1} of ${projects.length}`}>
                  <b className="font-bold text-accent">{String(index + 1).padStart(2, "0")} </b>/ {String(projects.length).padStart(2, "0")}
                </Item>
              </div>
              <Item as="h1" kind="wipe" className="t-display font-medium uppercase text-fg text-[clamp(28px,7.5vw,56px)] leading-none md:max-w-[1088px]">{study.title}</Item>
            </div>
            <Item className={cn(body, "flex max-w-[1312px] flex-col gap-4")}>
              {[study.lede].flat().map((t) => <p key={t}>{t}</p>)}
            </Item>
          </div>

          <ViewTransition name={`project-${study.slug}-media`} share={{ "nav-forward": "morph", default: "none" }} default="none">
            {study.heroSrc ? (
              <Item kind="fade" className={cn("cs-ex mx-auto w-full", study.heroTone === "screen" ? "cs-ex--screen" : "cs-ex--photo")} style={{ aspectRatio: study.heroRatio ?? 1068 / 600, maxWidth: study.heroMax ?? 1068 }}>
                <div className="cs-ex-in">
                  <Image src={study.heroSrc} alt={study.heroAlt} fill priority sizes="(min-width:1100px) 1068px, 100vw" className="object-cover" />
                </div>
              </Item>
            ) : (
              <Item kind="fade" className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-surface md:aspect-[1312/500]">
                <Image src={PLACEHOLDER} alt={study.heroAlt} fill priority sizes="(min-width:1440px) 1312px, 100vw" className="object-cover" />
              </Item>
            )}
          </ViewTransition>

          <Item><dl className="cs-meta grid grid-cols-1 gap-6 sm:grid-cols-3">
            {study.meta.map(([k, v], i) => (
              <div key={k} className={cn("flex flex-col gap-4 text-[12px] font-semibold uppercase leading-[14px] text-fg-subtle", i === 1 && "sm:items-center sm:text-center", i === 2 && "sm:items-end sm:text-right")}>
                <dt>{k}</dt>
                <dd className="text-fg-muted">{v}</dd>
              </div>
            ))}
          </dl></Item>
        </Stage>

        <Stage amount={0.2} className="mx-auto flex w-full max-w-[1068px] flex-col gap-10 pt-4 md:pt-[40px]">
          <div className="flex flex-col gap-1">
            {data.intro.eyebrow && <Item as="p" className={label}>{data.intro.eyebrow}</Item>}
            <Item as="h2" kind="wipe" className="t-display font-medium uppercase text-fg text-[clamp(28px,7.5vw,56px)] leading-none">{data.intro.heading}</Item>
          </div>
          <Item className={cn(body, "flex flex-col gap-5")}>
            {data.intro.body.map((t) => <p key={t}>{t}</p>)}
          </Item>
        </Stage>

        <div className="mx-auto flex w-full max-w-[1068px] flex-col gap-10">
          <CaseTabs slug={study.slug} tabs={available} active={tab} />
          <ViewTransition name="case-body" enter={{ "nav-tab": "case-swap", default: "none" }} exit={{ "nav-tab": "case-swap", default: "none" }} default="none">
            <div className="flex flex-col gap-10 md:gap-[64px]">
              {data.blocks.map((b, i) => <BlockView key={i} block={b} />)}
              {study.reflection && <Reflection study={study} />}
            </div>
          </ViewTransition>
        </div>

        <Stage amount={0.6} className="relative mt-16 flex flex-col items-center gap-6 overflow-hidden py-10 text-center md:mt-[100px]">
          <span aria-hidden className="cs-ghost">NEXT</span>
          <div className="relative flex flex-col items-center gap-1">
            <Item as="p" className={label}>Informative Nudge</Item>
            <Item as="p" kind="wipe" className="t-display text-[clamp(36px,9vw,56px)] font-medium uppercase leading-none text-fg">Next</Item>
          </div>
          <Item>
            <Link
              href={next.href}
              transitionTypes={[next.type]}
              scroll={next.type !== "nav-tab"}
              className="group inline-flex h-9 min-w-[173px] items-center justify-center gap-2 rounded-full border border-[#b3b3b3] px-3 text-[14px] font-medium leading-[1.45] text-[#b3b3b3] transition-[background-color,color] duration-300 ease-out-quint hover:bg-[#b3b3b3] hover:text-ink"
            >
              {next.label}
              <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 ease-out-quint group-hover:translate-x-0.5">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" />
                <path d="M5.5 8h5M8.5 6l2 2-2 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Item>
        </Stage>
      </article>
    </Subpage>
  );
}

function nextUp(study: CaseStudy, tab: TabKey, index: number) {
  const tabs = tabOrder.filter((t) => study.tabs[t]);
  const i = tabs.indexOf(tab);
  if (i < tabs.length - 1) {
    const t = tabs[i + 1];
    return { href: `/works/${study.slug}/${t}`, label: tabLabels[t], type: "nav-tab" as const };
  }
  const p = projects[(index + 1) % projects.length];
  return { href: p.href, label: p.title, type: "nav-forward" as const };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <Stage amount={0.25} gap={0.07} className="flex flex-col gap-6">
          {(block.eyebrow || block.heading) && (
            <div className="flex flex-col">
              {block.eyebrow && <Item as="p" className="text-[12px] font-semibold uppercase leading-[28px] text-fg-subtle">{block.eyebrow}</Item>}
              {block.heading && (block.display
                ? <Item as="h3" kind="wipe" className="t-display text-[clamp(28px,7.5vw,56px)] font-medium uppercase leading-none text-fg">{block.heading}</Item>
                : <Item as="h3" className="text-[clamp(22px,4vw,28px)] font-medium leading-[1.04] text-fg">{block.heading}</Item>)}
            </div>
          )}
          <Item className={cn("flex flex-col gap-5 text-fg", block.size === 21 ? "text-[19px] leading-[1.38] md:text-[21px]" : "text-[18px] leading-[1.15]")}>
            {block.body.map((t) => <p key={t}>{t}</p>)}
          </Item>
        </Stage>
      );
    case "image": {
      const tone = block.tone ?? "photo";
      const src = block.src ?? PLACEHOLDER;
      const sizes = "(min-width:1100px) 1068px, 100vw";
      if (tone === "flow") {
        return (
          <Stage amount={0.15}>
            <Item kind="fade" className="cs-ex cs-ex--flow mx-auto w-full p-3 md:p-5" style={{ maxWidth: 1077 }}>
              <Image src={src} alt={block.alt} width={2136} height={Math.round(2136 / block.ratio)} sizes={sizes} className="h-auto w-full" />
            </Item>
          </Stage>
        );
      }
      return (
        <Stage amount={0.15}>
          <Item kind="fade" className={cn("cs-ex mx-auto w-full", `cs-ex--${block.src ? tone : "photo"}`, !block.src && "bg-surface")} style={{ aspectRatio: block.ratio, maxWidth: 1068 }}>
            <div className="cs-ex-in">
              <Image src={src} alt={block.alt} fill sizes={sizes} className={tone === "photo" || !block.src ? "object-cover" : "object-contain"} />
            </div>
          </Item>
        </Stage>
      );
    }
    case "cards":
      return (
        <Stage amount={0.2} gap={0.08} className={cn("grid gap-4 sm:grid-cols-2", block.cols === 3 && "lg:grid-cols-3")}>
          {block.items.map((c, i) => (
            <Item as="div" key={i} kind="settle" className="cs-card text-[18px] leading-[1.3] text-fg">
              {c.kicker && <p className="mb-3 text-[12px] font-semibold uppercase leading-[14px] text-accent-soft">{c.kicker}</p>}
              {c.n && <p className="mb-3 text-[12px] font-bold leading-[14px] tracking-[0.08em] text-accent-soft">{c.n}</p>}
              {c.title && <p className={cn(!c.kicker && c.lines && "mb-3 font-medium", c.list && "mb-5")}>{c.title}</p>}
              {c.lines?.map((l) => <p key={l} className="text-[16px] leading-[1.5] text-fg-muted">{l}</p>)}
              {c.list && <ul className="list-disc pl-[27px]">{c.list.map((l) => <li key={l}>{l}</li>)}</ul>}
            </Item>
          ))}
        </Stage>
      );
    case "pull":
      return (
        <Stage amount={0.3} gap={0.07} className="cs-quote mx-auto mt-6 flex max-w-[860px] flex-col items-center gap-3 pt-10 text-center">
          {block.heading && <Item as="p" className={label}>{block.heading}</Item>}
          <Item as="p" className="text-[19px] leading-[1.45] text-fg md:text-[21px]">{block.text}</Item>
        </Stage>
      );
  }
}

function Reflection({ study }: { study: CaseStudy }) {
  const r = study.reflection!;
  return (
    <Stage amount={0.25} gap={0.07} className="mt-6 flex flex-col gap-10 md:mt-[40px]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Item as="p" className="text-[12px] font-semibold uppercase leading-[28px] text-fg-subtle">{r.eyebrow}</Item>
          <Item as="h3" className="text-[clamp(22px,4vw,28px)] font-medium leading-[1.04] text-fg">{r.heading}</Item>
        </div>
        <Item className="flex flex-col gap-5 text-[18px] leading-[1.15] text-fg">{r.body.map((t) => <p key={t}>{t}</p>)}</Item>
      </div>
      <Item as="p" className="mx-auto flex max-w-[560px] gap-3 text-[16px] leading-[1.2] text-fg">
        <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
        {r.pull}
      </Item>
    </Stage>
  );
}
