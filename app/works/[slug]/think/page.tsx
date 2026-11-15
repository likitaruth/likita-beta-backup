import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case/case-study-view";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { projects } from "@/content/projects";
import { pageMeta, SITE_DESCRIPTION } from "@/lib/meta";

export function generateStaticParams() {
  return caseStudies.filter((c) => c.tabs.think).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? pageMeta(`${p.name} — think — Likita`, p.seo) : pageMeta("Likita", SITE_DESCRIPTION);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study?.tabs.think) notFound();
  return <CaseStudyView study={study} tab="think" />;
}
