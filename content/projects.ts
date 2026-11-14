/**
 * Selected-work data. Source: homepage "Reveal Stack" (2144:11901) + "Projects" page (2077:9170).
 * FLAGS for the designer:
 *  1. Figma's counter reads "01 / 05" but only FOUR project titles exist (NORTHSTAR, CLIENTLENS, CRM AGENT,
 *     ACTIVEPIECES). The fifth is missing, so the counter derives from this array and reads "/ 04".
 *  2. Only NORTHSTAR has approved homepage copy + artwork. The others render title-only with an empty media slot.
 *     (The Projects page repeats a "booking travel platform" paragraph under every title — clearly pasted
 *     placeholder copy, so it was NOT used.)
 *  3. Order follows the Projects page top-to-bottom; please confirm.
 */
export type Project = {
  slug: string;
  title: string;
  description: string | null;
  /** Thumbnail shown on the homepage stage and the Works page (image, or a muted looping video with a poster). */
  media: { type: "image"; src: string } | { type: "video"; src: string; poster: string };
  href: string;
  /** Projects-page line. Preferred over `description` on the Works page, which has its own, shorter copy. */
  blurb?: string;
  /** Works-page-only thumbnail, when the 1:1 cover needs different framing from the homepage stage. */
  worksMedia?: Project["media"];
};

export const projects: Project[] = [
  {
    slug: "northstar",
    title: "NORTHSTAR",
    description:
      "An AI-native CRM workspace designed to turn fragmented customer data into evidence-backed recommendations and human-controlled actions.",
    media: { type: "video", src: "/assets/northstar-thumbnail.mp4", poster: "/assets/northstar-thumbnail-poster.webp" },
    worksMedia: { type: "video", src: "/assets/northstar-thumbnail-works.mp4", poster: "/assets/northstar-thumbnail-works-poster.webp" },
    blurb: "A goal-driven CRM for retention teams that shows its uncertainty, so every action is backed by evidence and approved by a person.",
    href: "/works/northstar",
  },
  { slug: "clientlens", title: "CLIENTLENS", description: null, blurb: "Finds the clients that look alike, then says when the match will mislead you. A verdict, not just a score.", media: { type: "image", src: "/assets/clientlens-thumbnail.webp" }, href: "/works/clientlens" },
  { slug: "crm-agent", title: "CRM AGENT", description: null, blurb: "A chat assistant that turns one sentence into a reviewed CRM change. Nothing runs until a person approves it.", media: { type: "image", src: "/assets/crm-agent-thumbnail.webp" }, href: "/works/crm-agent" },
  { slug: "activepieces", title: "ACTIVEPIECES", description: null, blurb: "Four moments where people lost their place in a no-code automation tool, redesigned so they don't.", media: { type: "image", src: "/assets/activepieces-thumbnail.webp" }, href: "/works/activepieces" },
];
