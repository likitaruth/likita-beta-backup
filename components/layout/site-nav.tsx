import Link from "next/link";
import type { CSSProperties } from "react";
import { Logo } from "@/components/ui/logo";
import { CustomizeMenu } from "./customize-menu";
import { MenuOverlay } from "./menu-overlay";

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

/** Figma "Navigation" (2144:11231): 1312×44 — signature left, controls right. Items rise top-down on load (CSS only). */
export function SiteNav() {
  return (
    <header style={{ viewTransitionName: "site-header" }} className="flex h-11 items-center justify-between">
      <div style={d(0)} className="intro-rise">
        <Link href="/" aria-label="Likita — home" className="text-fg"><Logo /></Link>
      </div>
      <div className="flex items-center gap-8">
        <div style={d(60)} className="intro-rise"><CustomizeMenu /></div>
        <MenuOverlay />
      </div>
    </header>
  );
}
