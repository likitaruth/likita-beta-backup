"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dice3D } from "./dice-3d";
import { cn } from "@/lib/cn";
import { gameCopy as C, gameRounds, gameTiers, gameWins } from "@/content/game";

type Phase = "intro" | "play" | "final";
const PIPS: Record<number, number[]> = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
const FACES: [string, number][] = [["front", 1], ["back", 6], ["right", 3], ["left", 4], ["top", 2], ["bottom", 5]];

const Arrow = () => (
  <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
);
const Check = () => (
  <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.2 3.2L13 4.8" /></svg>
);
const Cross = () => (
  <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
);

/** Decorative dice: realistic 3D die (drag to turn, click to roll). Falls back to the CSS cube without WebGL. Hidden from assistive tech. */
function Dice() {
  const [rolls, setRolls] = useState(0);
  const [css, setCss] = useState(false);
  const fail = useCallback(() => setCss(true), []);
  return (
    <div aria-hidden className="tt-stage" onPointerDown={() => css && setRolls((n) => n + 1)}>
      <span className="tt-ring tt-ring-1" /><span className="tt-ring tt-ring-2" />
      {css ? (
        <div className="tt-float">
          <div key={rolls} className={cn("tt-cube", rolls > 0 && "tt-tumble")}>
            {FACES.map(([f, n]) => (
              <div key={f} className={`tt-face tt-${f}`}>
                {Array.from({ length: 9 }, (_, i) => {
                  const on = PIPS[n].includes(i);
                  return <i key={i} className={on ? (i === PIPS[n][PIPS[n].length - 1] ? "on lie" : "on") : ""} />;
                })}
              </div>
            ))}
          </div>
        </div>
      ) : <Dice3D onFail={fail} />}
      <span className="tt-chip tt-chip-a">Truth</span>
      <span className="tt-chip tt-chip-b">Choose</span>
      <span className="tt-chip tt-chip-c">Lie</span>
    </div>
  );
}

export function TwoTruthsGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [r, setR] = useState(0);
  const [hist, setHist] = useState<boolean[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [shown, setShown] = useState(0); // how many rows have been revealed (lie first)
  const [verdict, setVerdict] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [count, setCount] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const againBtn = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);
  const visible = useRef(false);

  const round = gameRounds[r];
  const score = hist.filter(Boolean).length;
  const order = [round.lie, ...[0, 1, 2].filter((k) => k !== round.lie)];
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const startRound = (n: number) => {
    setR(n); setPicked(null); setShown(0); setVerdict(false); setLeaving(false);
    later(() => rows.current[0]?.focus({ preventScroll: true }), 60);
  };
  const start = () => { setHist([]); setPhase("play"); startRound(0); };

  const pick = useCallback((i: number) => {
    if (picked !== null) return;
    const good = i === round.lie;
    setPicked(i);
    order.forEach((_, n) => later(() => setShown(n + 1), 120 + n * 170));
    later(() => {
      setHist((h) => [...h, good]);
      setVerdict(true);
      later(() => nextBtn.current?.focus({ preventScroll: true }), 80);
    }, 760);
  }, [picked, round.lie]); // eslint-disable-line react-hooks/exhaustive-deps

  const next = () => {
    setLeaving(true);
    later(() => {
      if (r === gameRounds.length - 1) {
        setPhase("final"); setCount(0);
        later(() => againBtn.current?.focus({ preventScroll: true }), 80);
      } else startRound(r + 1);
    }, 320);
  };

  // 1 / 2 / 3 choose while the game is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "play" || !visible.current || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (["1", "2", "3"].includes(e.key)) pick(Number(e.key) - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, pick]);

  // Score count-up on the final screen.
  useEffect(() => {
    if (phase !== "final") return;
    if (score === 0) return;
    const id = window.setInterval(() => setCount((c) => { if (c >= score) { clearInterval(id); return c; } return c + 1; }), 170);
    return () => clearInterval(id);
  }, [phase, score]);

  const good = picked !== null && picked === round.lie;

  return (
    <div ref={root} className="tt-panel">
      <div className="flex justify-end text-[12px] font-semibold tabular-nums text-[#a9a49d]" aria-live="off">
        Score <b className="ml-1.5 font-semibold text-fg">{score} / {gameRounds.length}</b>
      </div>

      {phase === "intro" && (
        <div className="tt-intro">
          <div className="max-w-[34rem]">
            <p className="tt-cap">{C.meta}</p>
            <h3 className="t-display mt-4 mb-5 text-[clamp(30px,4vw,48px)] font-semibold uppercase leading-[1.05]">{C.title}</h3>
            <p className="mb-8 text-[16px] leading-[1.6] text-[#a9a49d]">{C.blurb}</p>
            <button type="button" className="tt-btn tt-btn-p" onClick={start}>{C.start} <Arrow /></button>
          </div>
          <Dice />
        </div>
      )}

      {phase === "play" && (
        <div className="mt-2 flex flex-1 flex-col">
          <p className="tt-cap">Round {r + 1} of {gameRounds.length} · {round.category}</p>
          <h3 className="mt-2.5 mb-9 text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.15] tracking-[-0.01em]">{C.prompt}</h3>
          <div role="group" aria-label={C.prompt} className="tt-rows" data-leaving={leaving}>
            {round.items.map(([text, why], i) => {
              const k = order.indexOf(i);
              const rev = picked !== null && shown > k;
              const lie = i === round.lie;
              return (
                <button
                  key={`${r}-${i}`}
                  ref={(el) => { rows.current[i] = el; }}
                  type="button"
                  aria-disabled={picked !== null}
                  onClick={() => pick(i)}
                  style={{ "--i": i } as React.CSSProperties}
                  className={cn("tt-row", picked !== null && "done", rev && "rev", rev && (lie ? "lie" : "truth"))}
                >
                  <span className="tt-n">0{i + 1}</span>
                  <span className="tt-t">&ldquo;{text}&rdquo;</span>
                  <span className="tt-mk">
                    {!rev && <><span>Choose</span><svg aria-hidden viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg></>}
                    {rev && <b className="tt-tag">{lie ? "Lie" : "Truth"}</b>}
                  </span>
                  <span className="tt-why"><span><p>{why}</p></span></span>
                </button>
              );
            })}
          </div>
          <div className="tt-verdict" data-on={verdict}>
            {!verdict && <span className="text-[13px] text-[#7d7872]">{C.hint} <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd></span>}
            <div role="status" className={cn(!verdict && "sr-only")}>
              {verdict && (
                <>
                  <h4 className="text-[20px] font-semibold leading-[1.2]">{good ? "You spotted it." : `Not this one. It was #${round.lie + 1}.`}</h4>
                  <p className="mt-1.5 text-[14px] text-[#a9a49d]">{good ? gameWins[r] : "The olive marker shows the lie."}</p>
                </>
              )}
            </div>
            {verdict && (
              <button ref={nextBtn} type="button" className="tt-btn tt-btn-p tt-in" onClick={next}>
                {r === gameRounds.length - 1 ? C.seeScore : C.next} <kbd>Enter</kbd>
              </button>
            )}
          </div>
        </div>
      )}

      {phase === "final" && (
        <div className="tt-final">
          <div>
            <p className="tt-cap">{C.final}</p>
            <div className="tt-big" aria-label={`${score} out of ${gameRounds.length}`}>{Math.min(count, score)}<span>/{gameRounds.length}</span></div>
            <p className="my-5 max-w-[24rem] text-[18px] leading-[1.5]">{gameTiers[score]}</p>
            <button ref={againBtn} type="button" className="tt-btn tt-btn-p" onClick={start}>{C.again}</button>
          </div>
          <ol className="tt-rec">
            {gameRounds.map((g, i) => (
              <li key={g.category} className={hist[i] ? "h" : ""} style={{ animationDelay: `${0.15 + i * 0.09}s` }}>
                <b>0{i + 1}</b>{g.category}<em>{hist[i] ? <Check /> : <Cross />}<span className="sr-only">{hist[i] ? "Correct" : "Missed"}</span></em>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
