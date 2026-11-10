/** "Two truths and a lie" — copy transcribed from the reference video. `lie` is the index of the false statement. */
export type Round = { category: string; lie: 0 | 1 | 2; items: [string, string][] };

export const gameRounds: Round[] = [
  { category: "Portfolio Lore", lie: 0, items: [
    ["This portfolio was designed and built by a friend.", "This one is mine end to end, from interface direction to the final shipped details."],
    ["My design was featured on Product Hunt at Activepieces.", "A small moment, but a very real confidence boost."],
    ["I have used more than five different design tools.", "Curiosity has a way of turning every tool into a tiny playground."],
  ] },
  { category: "Origin Story", lie: 1, items: [
    ["I have never watched an episode of Game of Thrones.", "Somehow, yes. I have dodged every major spoiler by accident and stubbornness."],
    ["I have always worked only in design-related roles.", "I started in customer support, and that listening muscle still shapes my design work."],
    ["I enjoy solving the same problem in different ways.", "The first answer is rarely the richest one."],
  ] },
  { category: "Working Style", lie: 2, items: [
    ["I take inspiration from everyday things like street signs, apps, and awkward flows.", "Everyday friction is basically free research."],
    // FLAG: the video shows a game-style "Mission failed" tile here instead of text; this line is a text stand-in.
    ["I do not play multiplayer games.", "Mission failed. Backup may be required."],
    ["I have never changed a design after getting feedback.", "Feedback is where the work usually gets sharper."],
  ] },
  { category: "Design Tools", lie: 1, items: [
    ["I can spend a surprising amount of time refining one line of interface copy.", "A tiny sentence can carry a lot of trust."],
    ["I skip low-fidelity thinking and go straight to polished screens every time.", "Structure comes first, even when the final thing needs to feel beautiful."],
    ["I notice spacing issues faster than I notice my own notifications.", "Occupational hazard, but honestly useful."],
  ] },
  { category: "Personal Operating System", lie: 1, items: [
    ["My best ideas often start as messy notes before they become polished systems.", "The mess is part of the thinking, not a failure of it."],
    ["I only share work when every detail feels completely finished.", "I value thoughtful iteration, especially when the feedback can still improve the outcome."],
    ["I care most about making digital experiences feel clear, useful, and human.", "That is the through-line."],
  ] },
];

// FLAG: only the 3/5 line comes from the video; the rest are written in the same voice. Confirm wording.
export const gameTiers = [
  "Zero this time. The lies here are well dressed.",
  "One right. Worth a rematch.",
  "Two right. Some truths are designed to sound suspicious.",
  "A respectable read. Some of the best truths are designed to sound suspicious.",
  "Four right. You read between the frames.",
  "Five for five. Nothing gets past you.",
];
export const gameWins = ["Nice read.", "Sharp.", "Clean catch.", "Good eye.", "That one fooled most people."];

export const gameCopy = {
  meta: "5 rounds · about a minute",
  title: "Two Truths and a Lie",
  blurb: "Spot the lie to score. Each round has two truths and one lie.",
  start: "Start playing",
  prompt: "Which one is the lie?",
  hint: "Pick a statement.",
  next: "Next round",
  seeScore: "See your score",
  again: "Play again",
  final: "Final score",
};
