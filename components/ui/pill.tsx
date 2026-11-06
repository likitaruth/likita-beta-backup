import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/cn";

const variants = {
  /** "Scroll to explore" / "Email me" — 45px tall (14 + 17 + 14) */
  solid: "bg-pill text-pill-fg font-semibold text-[14px] leading-[normal] h-[45px] gap-3 px-[18px] hover:-translate-y-px active:translate-y-0",
  /** "Button / greys" on the project card */
  outline: "h-9 w-32 border border-mint text-mint font-medium text-[14px] leading-[1.45] px-3 hover:bg-mint hover:text-card",
  /** "Button / greys" on subpages (white label, divider border) */
  ghost: "h-9 w-32 border border-divider text-white font-medium text-[14px] leading-[1.45] px-3 hover:bg-white hover:text-ink",
  /** Footer social pills */
  footer: "h-9 w-32 border border-divider text-on-card font-medium text-[14px] leading-[1.45] px-3 hover:bg-white hover:text-footer",
} as const;

type Variant = keyof typeof variants;
type Common = { variant: Variant; className?: string; children: ReactNode; /** Primary CTAs only. */ magnetic?: boolean };
type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Pill(props: AsLink | AsButton) {
  const { variant, className, children, magnetic = false, ...rest } = props;
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full transition-[background-color,color,transform] duration-300 ease-out-quint",
    variants[variant],
    className,
  );
  let node;
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as AsLink;
    const external = /^(mailto:|https?:)/.test(href);
    node = external ? (
      <a href={href} className={classes} {...(linkRest as object)}>{children}</a>
    ) : (
      <Link href={href} className={classes} {...linkRest}>{children}</Link>
    );
  } else {
    node = <button type="button" className={classes} {...(rest as ComponentProps<"button">)}>{children}</button>;
  }
  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}
