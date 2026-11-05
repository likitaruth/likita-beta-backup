import Image from "next/image";
import { Scribble } from "@/components/ui/icons";

/**
 * Row thumbnail — Figma "Group 1000001479" (89.02 × 59.33): framed character (83.02 × 52.67 at 6 / 6.67),
 * hand-drawn arrow at the top-left and the "Likita" label. Purely decorative: the row title carries the meaning.
 */
export function CharacterThumb({ src, label }: { src: string; label: string }) {
  return (
    <span aria-hidden className="relative block h-[59.33px] w-[89.02px]">
      <span className="absolute left-[6px] top-[6.67px] block h-[52.67px] w-[83.02px] rounded-[6.227px] border-[0.259px] border-line bg-surface p-[3.113px]">
        <span className="relative block size-full overflow-hidden rounded-[5.189px] border-[0.259px] border-line bg-inset p-[3.113px]">
          <span className="relative block size-full">
            <Image src={src} alt="" fill sizes="71px" className="object-cover object-[50%_30%]" />
          </span>
        </span>
      </span>
      <Scribble width={19.458} height={25.166} style={{ margin: 0 }} className="absolute left-0 top-0 text-fg" />
      <span className="absolute left-[22.05px] top-[20.24px] hand-text [--hand-size:4.67px] font-bold leading-[4.93px] text-fg-muted">{label}</span>
    </span>
  );
}
