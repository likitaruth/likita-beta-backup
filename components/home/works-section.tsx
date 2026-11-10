import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { WorksIndex } from "./works-index";
import type { Project } from "@/content/projects";

/**
 * Selected Works section shell (raised surface). The header row aligns to the 1195px content column used by the
 * index + stage below it. All interaction lives in WorksIndex.
 */
export function WorksSection({ projects, eyebrow, ctaLabel, allLabel }: { projects: readonly Project[]; eyebrow: string; ctaLabel: string; allLabel: string }) {
  return (
    <section id="selected-work" aria-labelledby="works-eyebrow" className="overflow-x-clip bg-raised">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-14 md:px-8 md:py-16 xl:px-[77px] xl:pb-[88px] xl:pt-[72px]">
        <div className="mx-auto flex w-full items-center justify-between xl:max-w-[1195px]">
          <h2 id="works-eyebrow" className="t-eyebrow text-fg-muted">{eyebrow}</h2>
          <Link href="/works" transitionTypes={["nav-forward"]} className="group/all -my-2 inline-flex items-center gap-2 py-2 text-[13px] font-semibold text-fg transition-colors duration-200 hover:text-accent-soft">
            <span className="underline decoration-line decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-200 group-hover/all:decoration-current">{allLabel}</span>
            <ArrowRight className="size-4 transition-transform duration-300 ease-out-quint group-hover/all:translate-x-0.5" />
          </Link>
        </div>
        <WorksIndex projects={projects} ctaLabel={ctaLabel} />
      </div>
    </section>
  );
}
