import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/meta";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/works", "/about", "/contact", ...projects.map((p) => `/works/${p.slug}`)];
  return pages.map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
