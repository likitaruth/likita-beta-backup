import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { Subpage } from "@/components/layout/subpage";
import { CaseStudyView } from "@/components/case/case-study-view";
import { ArrowRight } from "@/components/ui/icons";
import { projects } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — Likita` : "Likita" };
}

/** Case study (Design tab) when one exists in Figma; otherwise the minimal project page. */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const study = getCaseStudy(slug);
  if (study) return <CaseStudyView study={study} tab="design" />;

  return (
    <Subpage>
      <div className="page-shell flex flex-col gap-10 py-12 md:py-16">
        <Link href="/works" transitionTypes={["nav-back"]} className="group inline-flex w-fit items-center gap-2 text-[14px] font-medium text-fg-muted transition-colors hover:text-fg">
          <ArrowRight className="rotate-180 transition-transform duration-300 ease-out-quint group-hover:-translate-x-0.5" />
          {site.works.eyebrow}
        </Link>
        <div className="cq">
          <h1 className="t-display w-fit text-[length:min(120px,calc(100cqw/7))] leading-[1.1] text-mint">{project.title}</h1>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <ViewTransition name={`project-${project.slug}-media`} share={{ "nav-forward": "morph", default: "none" }} default="none">
            <div className="relative aspect-[500/390] w-full max-w-[640px] shrink-0 overflow-hidden rounded-[20px] bg-card">
              <Image src={project.cover} alt="" fill sizes="(min-width:1024px) 640px, 100vw" className="object-cover" priority />
            </div>
          </ViewTransition>
          {project.description && <p className="max-w-[570px] text-[18px] leading-7 text-fg">{project.description}</p>}
        </div>
        {/* FLAG: no Figma case study exists for this project yet. */}
      </div>
    </Subpage>
  );
}
