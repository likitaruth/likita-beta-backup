import Image from "next/image";
import { ViewTransition } from "react";
import { Item, Stage } from "@/components/motion/stage";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

/** Figma title text-box widths (px at 1440) — they differ per row and decide where "NORTH/STAR" etc. break. */
const TITLE_W: Record<string, number> = { northstar: 710, clientlens: 706, "crm-agent": 697, activepieces: 545 };

/**
 * One Projects-page row (Figma 2077:9176 / 9182 …): 1312×670, copy left, 656×670 cover right.
 * Whole row is one target: the pill is the real link, stretched over the row with ::after.
 * Hover / keyboard focus: cover zooms and brightens, sibling rows recede (see .works-list in globals.css).
 */
export function ProjectRow({ project, cta, priority }: { project: Project; cta: string; priority?: boolean }) {
  return (
    <Stage as="li" amount={0.25} gap={0.09} className="cq group/row relative list-none">
      <div className="flex flex-col gap-8 md:h-[670px] md:flex-row md:gap-0 [.works-list:has(.group\/row:hover)_&:not(:hover)]:opacity-60 transition-opacity duration-300 ease-out-quint">
        <div className="relative z-10 flex flex-col gap-8 md:w-1/2 md:pb-[75px] md:pt-[73px]">
          <Item as="h2" kind="wipe" style={{ "--tw": `${TITLE_W[project.slug] ?? 706}` } as React.CSSProperties} className="md:w-[calc(var(--tw)/656*100%)] t-display break-words uppercase leading-[1.065] text-[#eee6de] underline decoration-[0.078em] underline-offset-[0.1em] text-[clamp(30px,11cqw,154px)] md:text-[11.74cqw]">
            {project.title}
          </Item>
          <div className="flex flex-col gap-8 md:mt-auto md:gap-[77px]">
            {(project.description ?? project.blurb) && (
              <Item as="p" className="max-w-[593px] text-[18px] font-medium uppercase leading-[19px] text-white">{project.description ?? project.blurb}</Item>
            )}
            <Item className="w-fit">
              <Pill
                variant="ghost"
                href={project.href}
                transitionTypes={["nav-forward"]}
                aria-label={`${cta}: ${project.title}`}
                className="after:absolute after:inset-0 after:content-[''] group-has-[:focus-visible]/row:[&:not(:focus-visible)]:border-white/60"
              >
                {cta}
              </Pill>
            </Item>
          </div>
        </div>

        <ViewTransition name={`project-${project.slug}-media`} share={{ "nav-forward": "morph", default: "none" }} default="none">
          <Item kind="fade" className="relative order-first aspect-[656/670] w-full overflow-hidden md:order-none md:w-1/2">
            <Image src={project.cover} alt="" fill priority={priority} sizes="(min-width:1024px) 656px, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[600ms] ease-out-quint group-hover/row:scale-[1.04] group-has-[:focus-visible]/row:scale-[1.04]" />
            <div aria-hidden className={cn("absolute inset-0 bg-black/20 transition-opacity duration-300 ease-out-quint group-hover/row:opacity-0 group-has-[:focus-visible]/row:opacity-0")} />
          </Item>
        </ViewTransition>
      </div>
    </Stage>
  );
}
