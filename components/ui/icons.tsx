import type { SVGProps } from "react";

/**
 * Exact vector sources exported from Figma, hardcoded colours replaced with currentColor
 * so they follow the theme tokens. Stroke bleed is handled with negative margins so layout boxes
 * match the Figma frames.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;
const base = { fill: "none", "aria-hidden": true, focusable: false } as const;

/** Customize-pill chevron — frame 8×4, SVG 10×6 */
export function ChevronSmall(props: IconProps) {
  return (
    <svg width={10} height={6} viewBox="0 0 10 6" {...base} {...props} style={{ margin: "-1px", ...props.style }}>
      <path d="M0.699219 0.699219L4.69922 4.69922L8.69922 0.699219" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg width={35.2} height={35.2} viewBox="0 0 36 36" {...base} {...props}>
      <path d="M5.86719 11.7344H29.3339" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.86719 23.4648H29.3339" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Close (menu overlay; same stroke language as MenuIcon) */
export function CloseIcon(props: IconProps) {
  return (
    <svg width={35.2} height={35.2} viewBox="0 0 36 36" {...base} {...props}>
      <path d="M9 9L27 27M27 9L9 27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Hero "Scroll to explore" arrow — frame 12×12, SVG 14×15 */
export function ScrollArrow(props: IconProps) {
  return (
    <svg width={14} height={15} viewBox="0 0 14 15" {...base} {...props} style={{ margin: "-1px -1px -1.4px", ...props.style }}>
      <path d="M7 1V13M1 7L7 13L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" {...base} {...props}>
      <path d="M11.3336 11.3336V4.66797H4.66797M11.3336 4.66797L4.66797 11.3336" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" {...base} {...props}>
      <path d="M3.33203 7.99923H12.6664M7.99923 12.6664L12.6664 7.99923L7.99923 3.33203" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Coffee(props: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...base} {...props}>
      <path
        d="M10 2V4M14 2V4M16 8C16.2652 8 16.5196 8.10536 16.7071 8.29289C16.8946 8.48043 17 8.73478 17 9V17C17 18.0609 16.5786 19.0783 15.8284 19.8284C15.0783 20.5786 14.0609 21 13 21H7C5.93913 21 4.92172 20.5786 4.17157 19.8284C3.42143 19.0783 3 18.0609 3 17V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H18C19.0609 8 20.0783 8.42143 20.8284 9.17157C21.5786 9.92172 22 10.9391 22 12C22 13.0609 21.5786 14.0783 20.8284 14.8284C20.0783 15.5786 19.0609 16 18 16H17M6 2V4"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn arrow pointing at the portrait label — frame 75×97, SVG 77×99 */
export function Scribble(props: IconProps) {
  return (
    <svg width={77} height={99} viewBox="0 0 77 99" {...base} {...props} style={{ margin: "-1px", ...props.style }}>
      <path
        d="M1 1C12.0768 7.6097 36.7144 23.4399 44.9005 32.5599C50.6713 38.9891 52.1015 49.6934 53.0116 77.8427C53.4276 90.7072 70.05 89.038 75.4058 93.9993C76.5642 95.0724 75.8569 87.4168 74.7517 82.6759C74.4355 81.3196 73.6028 82.6921 73.211 84.0038C72.4381 86.5912 72.4442 90.1229 71.8909 93.5741C66.6711 96.4331 61.0948 97.5552 60.0794 98C59.7274 97.3226 59.7069 94.8115 59.6857 92.2244"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" {...base} {...props}>
      <path d="M2.5 6L5 8.5L10 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron12({ direction = "down", ...props }: IconProps & { direction?: "up" | "down" }) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" {...base} {...props}>
      <path d={direction === "up" ? "M9 7.5L6 4.5L3 7.5" : "M3 4.5L6 7.5L9 4.5"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Circle arrow 24×24. Figma: muted/disabled = brand olive, heavier (2); active = white, lighter (1.5 ring / 1 arrow). */
export function CircleArrow({ direction, tone, ...props }: IconProps & { direction: "left" | "right"; tone: "active" | "muted" }) {
  const muted = tone === "muted";
  const arrow = direction === "left" ? ["M12 8L8 12", "M16 12H8", "M12 16L8 12"] : ["M12 16L16 12", "M8 12H16", "M12 8L16 12"];
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...base} {...props}>
      <path
        d="M8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13737 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13737 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508Z"
        stroke="currentColor" strokeWidth={muted ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      {arrow.map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth={muted ? 2 : 1} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}

/**
 * Hand-drawn squiggle beside the Reach-out coffee note (Figma Vector 751, 24.7×92.3 + stroke bleed).
 * FLAG: Figma's asset host is unreachable from the build sandbox, so this path is traced by eye from the frame
 * screenshot — swap in the exported SVG when available (same 27×95 box).
 */
export function CoffeeSquiggle(props: IconProps) {
  return (
    <svg width={27} height={95} viewBox="0 0 27 95" {...base} {...props}>
      <path
        d="M19 2C6 8 4 14 14 19C24 24 25 30 12 36C2 41 4 47 15 52C25 57 24 63 11 69C3 73 5 79 14 83C19 86 20 89 15 92"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
