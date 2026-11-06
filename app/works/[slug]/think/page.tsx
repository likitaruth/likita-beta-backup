import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case/case-study-view";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

export function generateStaticParams() {
  return caseStudies.filter((c) => c.tabs.think).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getCaseStudy(slug);
  return { title: s ? `${s.title} — think — Likita` : "Likita" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study?.tabs.think) notFound();
  return <CaseStudyView study={study} tab="think" />;
}
