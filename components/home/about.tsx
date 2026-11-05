import { AboutBody } from "./about-body";
import { site } from "@/content/site";

/** Me in Brief — Figma "Default" (2153:6075) + "On hover" (2153:6294), 1440×639. */
export function About() {
  const { about } = site;
  // FLAG: Figma has a single character illustration, so every row maps to it until alternate states are supplied.
  const portrait = { src: "/assets/portrait.png" };
  return (
    <section id="about" aria-labelledby="about-eyebrow" className="bg-canvas">
      <div className="page-shell flex flex-col gap-10 py-12 md:py-16">
        <h2 id="about-eyebrow" className="t-eyebrow text-fg-muted">{about.eyebrow}</h2>
        <AboutBody rows={about.rows} characters={about.rows.map(() => portrait)} label={about.label} />
      </div>
    </section>
  );
}
