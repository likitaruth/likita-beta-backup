import type { Metadata } from "next";

export const SITE_TITLE = "Likita — Product Designer for AI-native CRM & B2B SaaS";
export const SITE_DESCRIPTION =
  "Product designer for AI-native CRM and B2B SaaS. I design and build AI workflows enterprise teams can trust, from shipped features to working prototypes.";

/** One place to set <title>, description and the Open Graph / Twitter text together, so they never drift apart. */
export function pageMeta(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { type: "website", title, description, siteName: "Likita" },
    twitter: { card: "summary", title, description },
  };
}
