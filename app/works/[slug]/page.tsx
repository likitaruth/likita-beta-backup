import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { SiteNav } from "@/components/layout/site-nav";
import { Footer } from "@/components/layout/footer";
import { ArrowRight } from "@/components/ui/icons";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const pageSlide = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" } as const;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — Likita` : "Likita" };
}

/**
 * STUB. The case-study layout is not part of the approved homepage scope. This route exists so the shared-element
 * transition (card media + title morph) has a real destination. It shows only approved homepage copy.
 * FLAG: replace with the Figma case-study pages (Design / Think / Build frames) when that phase starts.
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <ViewTransition enter={pageSlide} exit={pageSlide} default="none">
      <main id="main" className="bg-canvas">
        <div className="page-shell pt-10">
          <SiteNav />
        </div>
        <div className="page-shell flex flex-col gap-10 py-12 md:py-16">
          <Link href="/#selected-work" transitionTypes={["nav-back"]} className="group inline-flex w-fit items-center gap-2 text-[14px] font-medium text-fg-muted transition-colors hover:text-fg">
            <ArrowRight className="rotate-180 transition-transform duration-300 ease-out-quint group-hover:-translate-x-0.5" />
            {site.works.eyebrow}
          </Link>
          <div className="cq">
            <h1 className="t-display w-fit text-[length:min(120px,calc(100cqw/7))] leading-[1.1] text-mint">{project.title}</h1>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <ViewTransition name={`project-${project.slug}-media`} share={{ "nav-forward": "morph", default: "none" }} default="none">
              <div className="relative aspect-[500/390] w-full max-w-[640px] shrink-0 overflow-hidden rounded-[20px] bg-card">
                {project.image ? (
                  <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width:1024px) 640px, 100vw" className="object-cover" priority />
                ) : (
                  <div aria-hidden className="h-full w-full border border-card-line bg-black/20" />
                )}
              </div>
            </ViewTransition>
            {project.description && <p className="max-w-[570px] text-[18px] leading-7 text-fg">{project.description}</p>}
          </div>
        </div>
      </main>
      <Footer />
    </ViewTransition>
  );
}
