import { ViewTransition } from "react";
import { Hero } from "@/components/home/hero";
import { SelectedWorks } from "@/components/home/selected-works";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Footer } from "@/components/layout/footer";

const pageSlide = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" } as const;

export default function HomePage() {
  return (
    <ViewTransition enter={pageSlide} exit={pageSlide} default="none">
      <main id="main">
        <Hero />
        <SelectedWorks />
        <About />
        <Contact />
      </main>
      <Footer />
    </ViewTransition>
  );
}
