"use client";

import { Item } from "./stage";

/** Word-level wipe-up for display type. Words stay inline-block so wrapping, tracking and line-height are unchanged. */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <Item as="span" kind="wipe" className="inline-block">{w}</Item>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
