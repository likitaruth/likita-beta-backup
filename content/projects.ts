/**
 * Selected-work data: the single source for the homepage "Selected Works", the Works page, the "0X / 0Y" counters on case
 * studies, the "Next project" links and page metadata. Order here is the order everywhere.
 * `title` is the display title (rendered uppercase by the design); `name` is the proper spelling used in <title> and meta tags.
 */
export type Project = {
  slug: string;
  title: string;
  /** Proper-cased name for <title> and social tags. */
  name: string;
  /** Meta / social description for the case study. */
  seo: string;
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
  { slug: "clientlens", name: "ClientLens", seo: "An AI lookalike feature shipped inside an enterprise CRM: 64% weekly use, segment build time from 38 to 9 minutes, 41% fewer mis-targeted promotions.", title: "CLIENTLENS", description: null, blurb: "Finds the clients that look alike, then says when the match will mislead you. A verdict, not just a score.", media: { type: "image", src: "/assets/clientlens-thumbnail.webp" }, href: "/works/clientlens" },
  {
    slug: "northstar",
    name: "Northstar",
    seo: "A working prototype of an AI-native CRM that shows its uncertainty: evidence-backed plans, versioned approvals and audited execution.",
    title: "NORTHSTAR",
    description:
      "An AI-native CRM workspace designed to turn fragmented customer data into evidence-backed recommendations and human-controlled actions.",
    media: { type: "video", src: "/assets/northstar-thumbnail.mp4", poster: "/assets/northstar-thumbnail-poster.webp" },
    worksMedia: { type: "video", src: "/assets/northstar-thumbnail-works.mp4", poster: "/assets/northstar-thumbnail-works-poster.webp" },
    blurb: "A goal-driven CRM for retention teams that shows its uncertainty, so every action is backed by evidence and approved by a person.",
    href: "/works/northstar",
  },
  { slug: "clientzone", name: "ClientZone", seo: "Redesigning a brokerage client portal around the client's questions instead of the CRM's modules.", title: "CLIENTZONE", description: null, blurb: "A client portal rebuilt around the questions clients ask, not the modules of the CRM behind it.", media: { type: "image", src: "/assets/clientzone-thumbnail.webp" }, href: "/works/clientzone" },
  { slug: "crm-agent", name: "CRM Agent", seo: "A safe CRM action layer: natural-language requests become validated, reviewed changes that a person approves.", title: "CRM AGENT", description: null, blurb: "A chat assistant that turns one sentence into a reviewed CRM change. Nothing runs until a person approves it.", media: { type: "image", src: "/assets/crm-agent-thumbnail.webp" }, href: "/works/crm-agent" },
];
