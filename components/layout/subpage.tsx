import { ViewTransition, type ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { Footer } from "./footer";
import { cn } from "@/lib/cn";

const pageSlide = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" } as const;

/**
 * Shared chrome for every non-home screen (Figma "hero-top" at 64,40 / 1312 wide + footer).
 * Owns the page-level view transition so each screen only supplies its content.
 */
export function Subpage({ children, className, compact }: { children: ReactNode; className?: string; /** Case studies sit the header 16px higher (Figma hero-top y=24 vs 40). */ compact?: boolean }) {
  return (
    <ViewTransition enter={pageSlide} exit={pageSlide} default="none">
      <main id="main" className={cn("bg-canvas", className)}>
        <div className={cn("page-shell", compact ? "pt-6" : "pt-10")}>
          <SiteNav />
        </div>
        {children}
      </main>
      <Footer />
    </ViewTransition>
  );
}
