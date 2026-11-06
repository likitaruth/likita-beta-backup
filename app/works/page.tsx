import type { Metadata } from "next";
import { Subpage } from "@/components/layout/subpage";
import { ProjectRow } from "@/components/works/project-row";
import { Stage, Item } from "@/components/motion/stage";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Selected works — Likita" };

/** Projects — Figma 2077:9170. Header 154px olive, ghost year range, four 670px rows (120px apart). */
export default function WorksPage() {
  const { projectsPage: p } = site;
  return (
    <Subpage>
      <div className="page-shell cq flex flex-col pb-24 pt-[70px] md:pb-[120px]">
        <Stage trigger="mount" gap={0.1}>
          <h1 className="t-display text-accent text-[clamp(44px,11.74cqw,154px)] leading-[1.065]">
            <Item as="span" kind="wipe" className="block">{p.titleLead}<em className="font-sans font-medium italic">{p.titleEmphasis}</em></Item>
          </h1>
          <Item as="p" kind="fade" className="ghost-drift -mx-4 mt-6 whitespace-nowrap font-medium italic leading-[1.26] text-[rgba(63,62,62,0.6)] text-[17.5cqw] md:mt-[43px]">
            {p.years}
          </Item>
        </Stage>
        <ol className="works-list mt-6 flex flex-col gap-16 md:mt-[39px] md:gap-[120px]" aria-label="Projects">
          {projects.map((pr, i) => (
            <ProjectRow key={pr.slug} project={pr} cta={p.cta} priority={i === 0} />
          ))}
        </ol>
      </div>
    </Subpage>
  );
}
