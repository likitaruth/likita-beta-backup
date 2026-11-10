/** Inline "Frame 3523" styled like a selected Figma frame: dashed blue outline, corner handles, name label above. */
export function FigmaFrame({ children }: { children: string }) {
  return (
    <span className="fig-frame">
      <span aria-hidden className="fig-label">{children}</span>
      <i aria-hidden className="fig-h fig-h-tl" /><i aria-hidden className="fig-h fig-h-tr" />
      <i aria-hidden className="fig-h fig-h-bl" /><i aria-hidden className="fig-h fig-h-br" />
      {children}
    </span>
  );
}
