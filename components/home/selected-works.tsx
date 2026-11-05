import { WorksSection } from "./works-section";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/** Selected Works — Figma "selected-work" (2144:11897), 1440×731, raised surface (#121212). */
export function SelectedWorks() {
  return <WorksSection projects={projects} eyebrow={site.works.eyebrow} ctaLabel={site.works.cta} />;
}
