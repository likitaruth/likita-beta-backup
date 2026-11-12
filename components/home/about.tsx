import { AboutBrief } from "./about-brief";
import { site } from "@/content/site";

/** Me in Brief — four-slab sketchbook strip (client component owns the interaction). */
export function About() {
  const { about } = site;
  return (
    <section id="about" aria-labelledby="about-eyebrow" className="bg-canvas">
      <div className="page-shell flex flex-col gap-10 py-12 md:py-16">
        <h2 id="about-eyebrow" className="t-eyebrow text-fg-muted">{about.eyebrow}</h2>
        <AboutBrief items={about.rows} label={about.videoLabel} />
      </div>
    </section>
  );
}
