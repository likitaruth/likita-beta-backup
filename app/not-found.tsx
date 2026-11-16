import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
import { Pill } from "@/components/ui/pill";
import { FaceZero } from "@/components/not-found/face-zero";

export const metadata: Metadata = { title: "Page not found — Likita", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="nf">
      <div className="page-shell pt-10">
        <SiteNav />
      </div>

      <div className="nf-stage">
        <div className="nf-digits" aria-hidden="true">
          <span>4</span>
          <FaceZero />
          <span>4</span>
        </div>
        <p className="nf-note" aria-hidden="true">Wait, where did everyone go?</p>
      </div>

      <div className="page-shell nf-copy">
        <h1 className="nf-h">
          <span className="sr-only">404. </span>Page not found
        </h1>
        <p className="nf-body">The page you followed doesn&rsquo;t exist or has moved. No worries, the work is still here</p>
        <div className="nf-cta">
          <Pill variant="solid" href="/" magnetic>Back to home</Pill>
          <Pill variant="quiet" href="/works">See my work</Pill>
        </div>
      </div>
    </main>
  );
}
