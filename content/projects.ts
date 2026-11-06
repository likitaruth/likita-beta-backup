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
  image: { src: string; alt: string; width: number; height: number } | null;
  href: string;
  /** Projects-page cover (656×670 slot). PLACEHOLDER art until the Figma bitmaps are exported. */
  cover: string;
};

export const projects: Project[] = [
  {
    slug: "northstar",
    title: "NORTHSTAR",
    description:
      "An AI-native CRM workspace designed to turn fragmented customer data into evidence-backed recommendations and human-controlled actions.",
    image: { src: "/assets/northstar-laptop.png", alt: "Northstar CRM workspace displayed on a laptop", width: 1000, height: 780 },
    href: "/works/northstar", cover: "/assets/projects/northstar.jpg",
  },
  { slug: "clientlens", title: "CLIENTLENS", description: null, image: null, href: "/works/clientlens", cover: "/assets/projects/clientlens.jpg", },
  { slug: "crm-agent", title: "CRM AGENT", description: null, image: null, href: "/works/crm-agent", cover: "/assets/projects/crm-agent.jpg", },
  { slug: "activepieces", title: "ACTIVEPIECES", description: null, image: null, href: "/works/activepieces", cover: "/assets/projects/activepieces.jpg", },
];
