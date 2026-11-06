import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** Footer — Figma "footer" (2144:12018), 1440×389, brand olive. */
export function Footer() {
  const { footer } = site;
  return (
    <footer className="bg-footer text-on-card">
      <div className="page-shell flex flex-col gap-12 pb-14 pt-[72px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex w-[164px] flex-col gap-5">
            <Logo width={67.2} />
            <p className="text-[16px] leading-6">
              {footer.quote.map((q, i) => (<span key={i} className={cn("em" in q && q.em && "font-medium italic")}>{q.t}</span>))}
            </p>
          </div>

          <nav aria-label="Footer" className="group/nav flex flex-col gap-3 text-[clamp(32px,6vw,48px)] font-normal leading-[1.1667] md:text-[48px] md:leading-[56px]">
            {footer.nav.map((n) => (
              <Link key={n.label} href={n.href} className={cn("w-fit transition-[opacity,transform] duration-200 ease-out-quint group-hover/nav:opacity-60 hover:translate-x-1 hover:opacity-100!", n.style === "display" ? "font-display" : "italic")}>
                {n.label}
              </Link>
            ))}
          </nav>

          <ul className="flex flex-row flex-wrap gap-3 md:flex-col">
            {/* FLAG: LinkedIn has no URL in Figma, so it is left out rather than shown as a dead control; "Mail" duplicated "Gmail". */}
            {footer.socials
              .filter((s, i, all) => s.href && all.findIndex((o) => o.href === s.href) === i)
              .map((s) => (
                <li key={s.label}><Pill variant="footer" href={s.href!}>{s.label}</Pill></li>
              ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-white">
          <p className="text-[16px] font-medium italic leading-[21px]">
            <span className="font-display font-normal not-italic">{footer.credit.a}</span>
            {footer.credit.b}
            <span className="font-display font-normal not-italic">{footer.credit.c}</span>
          </p>
          <p className="t-eyebrow !tracking-[0.1em]">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
