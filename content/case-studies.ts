/**
 * Case-study content — Figma "Case-Study - Design / Think / Build" (2077:8377 / 8491 / 8623).
 * Only the CRM-agent study exists in Figma; every other project falls back to the simple project page.
 *
 * FLAGS for the designer (kept here so they travel with the data):
 *  1. Which project this study belongs to is not stated; it is attached to CRM AGENT ("A safe CRM action layer").
 *  2. Counter reads "01 / 05" in Figma; it is derived from the project list instead (see components/case).
 *  3. Several blocks repeat placeholder copy in Figma and are reproduced as-is: the RESEARCH paragraphs repeat the intro,
 *     "Rules before interface" repeats the MVP-constraints paragraphs, the five "Explicit scope…" cards are identical,
 *     the six "User Intent" cards are identical (numbered 01–06 here, all "01" in Figma) and the four "Adoption" cards are identical.
 *  4. "decison" in the Design heading is corrected to "decision". "authorising" keeps the author's British spelling.
 *  5. The Build tab's "Next" button reads "Think" (copy of the Think tab). Here: Design → Think, Think → Build, Build → next project.
 *  6. All screenshots/diagrams are placeholders until exported (the Figma asset host is not reachable from the build sandbox).
 */
export type TabKey = "design" | "think" | "build";

export type Block =
  | { type: "text"; eyebrow?: string; heading?: string; body: string[]; size?: 18 | 21; display?: boolean }
  | { type: "image"; alt: string; ratio: number; width?: number; src?: string; tone?: "photo" | "cut" | "dark" | "flow" | "screen" }
  | { type: "cards"; cols: 2 | 3; items: { n?: string; kicker?: string; title?: string; lines?: string[]; list?: string[] }[] }
  | { type: "pull"; text: string; heading?: string };

export type Tab = { intro: { eyebrow?: string; heading: string; body: string[] }; blocks: Block[] };

export type CaseStudy = {
  slug: string;
  title: string;
  lede: string | string[];
  heroAlt: string;
  /** Optional real hero image; falls back to the placeholder. heroRatio is width / height. */
  heroSrc?: string;
  heroRatio?: number;
  heroMax?: number;
  heroTone?: "photo" | "screen";
  /** Up to three label/value pairs shown under the hero (Figma: Role / Focus / Year). */
  meta: [string, string][];
  reflection?: { eyebrow: string; heading: string; body: string[]; pull: string };
  tabs: Partial<Record<TabKey, Tab>>;
};

const intro = (heading: string): Tab["intro"] => ({
  eyebrow: "Reframing the problem",
  heading,
  body: [
    "The initial idea was simple: place an AI chatbot inside the CRM and let it handle lead creation, tagging, password resets, and batch operations through natural language.",
    "The real design problem was more demanding. The assistant had to locate the correct records, respect user permissions, recover from errors, and make every change understandable before it was applied.",
  ],
});

const principle = {
  n: "01",
  title: "Explicit scope over assumed context",
  lines: ["Every action identifies the records being read or changed instead of relying on phrases such as “this record."],
};
const adoption = { title: "Adoption", list: ["Eligible users opening the assistant", "Weekly and repeat usage", "Quick-action versus free-text usage"] };

export const caseStudies: CaseStudy[] = [
  {
    slug: "crm-agent",
    title: "A safe CRM action layer",
    lede: "A conversational interface that helps teams search, ask questions, and perform common CRM operations without hiding the permissions, validation, and accountability behind every system change.",
    heroAlt: "CRM workspace with the AI assistant panel open",
    meta: [["Role", "Product design & Prototype"], ["Focus", "AI / SAAS / CRM"], ["Year", "2026"]],
    reflection: {
      eyebrow: "Reflection",
      heading: "Shared Responsibility in AI",
      body: [
        "This project reinforced that designing AI products requires more than shaping a conversation. The essential work is deciding how responsibility is divided between the model, the application, and the person authorising the result.",
        "When page awareness proved technically unrealistic, the answer was not to disguise the limitation. The interaction changed so users could provide explicit context and the application could validate it. That made the MVP more honest, safer, and easier to extend skill by skill.",
      ],
      pull: "The strongest AI experiences do not hide uncertainty. They turn it into a clear moment for context, validation, and control.",
    },
    tabs: {
      design: {
        intro: intro("A command bot."),
        blocks: [
          { type: "text", eyebrow: "Research", heading: "Clarity, designed into every decision.", body: intro("").body },
          { type: "image", alt: "CRM assistant: first concept", ratio: 1068 / 483 },
          { type: "image", alt: "CRM assistant: revised concept", ratio: 1066 / 485 },
          {
            type: "text",
            body: [
              "Early flows generated simulated responses for ambiguous requests, displayed disconnected confirmation cards, and used a generic “Thinking” state that gave users no insight into which records or values were being accessed.",
              "A normal chatbot primarily generates responses. This assistant needed to coordinate structured operations that could update records, notify users, or change account states. The project was therefore reframed around controlled CRM access rather than unrestricted conversation.",
            ],
          },
          {
            type: "text",
            eyebrow: "Entry experience",
            heading: "Show supported actions",
            body: [
              "“How can I help?” was familiar but too vague. The revised entry state exposes supported skills, gives users useful starting points, and states that records may need to be identified and changes are only applied after approval.",
              "Capability-led prompts remain consistent across the CRM because they are tied to supported skills, not whichever page happens to be open.",
            ],
          },
          { type: "image", alt: "Entry state listing supported skills", ratio: 1061 / 498.6 },
          {
            type: "text",
            eyebrow: "Explicit entity resolution",
            heading: "Resolve records with @ mentions",
            size: 21,
            body: ["Typing @ opens permission-aware search across leads, clients, affiliates, users, and business units. A selected result becomes a readable inline chip carrying structured CRM type and ID data, so the backend receives a validated identity instead of a name the model has to interpret."],
          },
          { type: "image", alt: "@ mention search with inline record chips", ratio: 1067 / 496.5 },
          {
            type: "text",
            eyebrow: "Natural-language extraction",
            heading: "Extract fields from natural language",
            size: 21,
            body: [
              "The assistant classifies intent, extracts the fields already present, resolves human-readable values to CRM entities, validates them against CRM rules, and asks only for details that are missing or ambiguous.",
              "This produces a hybrid interface: natural language provides speed, field-specific clarification provides precision, and review cards provide control before any mutation.",
            ],
          },
          { type: "image", alt: "Field extraction and clarification", ratio: 1064 / 484.5 },
          {
            type: "text",
            eyebrow: "From resolution to execution",
            heading: "Make execution visible",
            size: 21,
            body: ["Validation and execution are presented as a readable operational sequence instead of a generic thinking state. Users can see when the assistant is searching, validating, checking access, preparing a review, waiting for approval, or applying a change."],
          },
          { type: "image", alt: "Execution sequence: validating and applying", ratio: 1064 / 484.5 },
          { type: "image", alt: "Review card before applying a change", ratio: 1062 / 494.2 },
        ],
      },
      think: {
        intro: intro("A command BOT."),
        blocks: [
          {
            type: "text",
            eyebrow: "MVP constraints",
            heading: "Designing without page context",
            body: [
              "The early concept assumed the assistant could detect the current module, active filters, selected rows, and business unit. During technical alignment, the AI team confirmed that page-level context would not be available in the first release.",
              "That limitation changed the interaction model. Automatic context chips were removed, universal skill-based actions replaced page-specific shortcuts, and every record became something the user or assistant had to resolve explicitly.",
            ],
          },
          { type: "image", alt: "Context mapping: illusion versus MVP reality", ratio: 1038 / 772.4 },
          {
            type: "text",
            eyebrow: "Revised design principle",
            body: ["The assistant must not invent information that is not present in context. Every record, account, user, or data set must be identified in the conversation."],
          },
          {
            type: "text",
            eyebrow: "Product principles",
            heading: "Rules before interface",
            body: [
              "The early concept assumed the assistant could detect the current module, active filters, selected rows, and business unit. During technical alignment, the AI team confirmed that page-level context would not be available in the first release.",
              "That limitation changed the interaction model. Automatic context chips were removed, universal skill-based actions replaced page-specific shortcuts, and every record became something the user or assistant had to resolve explicitly.",
            ],
          },
          { type: "cards", cols: 2, items: [principle, principle, principle, principle, principle] },
          {
            type: "text",
            eyebrow: "Outcome",
            heading: "An implementation-ready model",
            body: ["The final design moved the assistant from a generic chatbot concept to an operational system that communicates what it knows, what it still needs, and exactly what it is about to change."],
          },
          { type: "cards", cols: 3, items: ["01", "02", "03", "04", "05", "06"].map((n) => ({ n, title: "User Intent" })) },
        ],
      },
      build: {
        intro: intro("Not a chatbot. A command layer."),
        blocks: [
          {
            type: "text",
            eyebrow: "Skill contracts",
            heading: "A shared skill contract",
            body: ["Each capability became a registered skill describing its entity types, required inputs, permission, confirmation, bulk-action, undo, and risk rules. The model could identify a request, but the contract determined what the application was allowed to do."],
          },
          { type: "image", alt: "Skill definition as a JSON contract", ratio: 1086 / 634 },
          {
            type: "text",
            eyebrow: "Capability model",
            heading: "Five executable skills",
            body: ["The MVP was deliberately constrained to querying CRM data, finding and summarising records, creating records, managing tags and supported fields, and restricted account operations. This converted an open-ended promise into a system the team could validate and ship."],
          },
          { type: "image", alt: "Structured CRM skill capability pipeline", ratio: 1032 / 407 },
          { type: "image", alt: "CRM AI assistant architecture", ratio: 1032 / 1028.8 },
          {
            type: "text",
            eyebrow: "Measuring the release",
            heading: "A Measurement Framework",
            body: ["Because the assistant was still at MVP stage, the case study does not present unverified performance claims. The measurement plan focuses on whether the product actually reduces work while preserving reliability and user control."],
          },
          { type: "cards", cols: 2, items: [adoption, adoption, adoption, adoption] },
        ],
      },
    },
  },
];

/*
 * ClientLens — copy and structure from the published ClientLens artifact (claude.ai/artifact/P57oksJpMxocZ6yDBhCzua).
 * Screens are the six exports bundled with that artifact, in /public/assets/case/clientlens.
 * FLAGS:
 *  1. The artifact marks several details as assumptions to verify before sharing (role, team size, timeline, pilot metrics,
 *     quotes, 1.4M records, 02:00 UTC batch, and similar). They are reproduced as written; check them before publishing.
 *  2. The artifact's numbered annotation pins are folded into the copy (the image block has no overlay). The diagram, quadrant,
 *     ownership split, trade-offs, pipeline and JSON contract are expressed as cards, since the shared blocks have no
 *     diagram/table/code type.
 *  3. Problem and Constraints open the Think tab, Outcomes closes the Build tab, and "What didn't work / What's next" plus the
 *     closing line become the Reflection block.
 *  4. The Figma file could not be reached when this was built, so no visuals were pulled from it.
 */
const CL = "/assets/case/clientlens";
const cl = (file: string, alt: string, ratio: number, width?: number): Block => ({ type: "image", src: `${CL}/${file}.webp`, tone: "screen", alt, ratio, width });
const clIntro: Tab["intro"] = {
  eyebrow: "the problem",
  heading: "Two clients with the same tags. Opposite strategies.",
  body: [
    "John and Lisa are both tagged VIP, Gold Trader and Micro Account. John is active and worth $8,400. Lisa has churned and is worth $400. In the CRM they looked identical, so they received the same deposit bonus campaign. For Lisa that campaign was the most common trigger of compliance complaints on churned accounts. The labels described who clients were when they signed up, not how they behave now.",
    "ClientLens answers the comparison and shows its reasons. The agent still decides. It makes the comparison explicit, explained and recorded.",
  ],
};
const clientlens: CaseStudy = {
  slug: "clientlens",
  title: "Knowing when a lookalike will mislead you",
  lede: [
    "ClientLens is an AI lookalike feature shipped inside TeamForce CRM. Finding lookalike clients is easy. The product is knowing when a lookalike will mislead you.",
    "Retention agents at online brokerages grouped clients by labels like “VIP” and “Gold Trader”, then sent the wrong campaigns to clients who only looked alike.",
  ],
  heroAlt: "ClientLens Intelligence Summary comparing John Doe (Active, LTV $8,400) with Lisa Doe (Churned, LTV $400): 29% match score, low similarity, 87% confidence, a recommendation not to treat them the same, similarity and difference cards, recommended actions, and a business impact panel",
  heroSrc: `${CL}/summary.webp`,
  heroRatio: 2000 / 1463,
  heroMax: 1068,
  heroTone: "photo",
  meta: [["Role", "Lead product designer, from discovery through launch"], ["Focus", "AI product design / Systems / Delivery"], ["Shipped", "Inside the existing lead record, CRM v1.84"]],
  reflection: {
    eyebrow: "honest read",
    heading: "What didn't work, and what's next",
    body: [
      "The radar is under-used: opened in 22% of comparisons, because most agents act from the summary. It earns its place as evidence, not as the default view. Overnight scores confused some agents, since a client who deposited that morning still showed as churned. The compare date helped, but not completely. Imported leads with little data produced cautious, unhelpful verdicts. Coverage on the record explained why, but didn't fix it.",
      "Next: Deep Dive by category, the view cut from v1, for retention leads who audit strategies. Intra-day re-scoring for clients with new deposits or tickets, so the most urgent cases aren't a day old. Close the loop by recording which recommended action an agent took and its result, so confidence learns from outcomes rather than only data coverage. And a “Disagree” option on each verdict, routed to data science as labelled training examples.",
    ],
    pull: "Similar isn't the same. ClientLens shows agents the difference before they act on it.",
  },
  tabs: {
    design: {
      intro: clIntro,
      blocks: [
        { type: "text", eyebrow: "the experience", heading: "From one lead to a confident decision about many.", body: ["The flow runs Lead record, Similar leads, Select, Intelligence Summary and Radar Preview. Each step answers one question, and every AI claim on screen carries its reason and how confident it is."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Shipped", list: ["Find Similar Leads on every lead record", "Ranked lookalikes with an AI summary per match", "Pairwise comparison: Intelligence Summary and Radar Preview"] },
          { kicker: "I owned", list: ["Framing the feature as a verdict, not a similarity search", "Separating confidence from similarity", "The insight card system and the “Do not recommend” pattern"] },
          { kicker: "Team decisions", list: ["Nightly batch scoring, not real-time (engineering)", "The 8-category feature model (data science)", "Hashed identities for other clients (compliance)"] },
          { kicker: "Measured", list: ["64% weekly use across pilot desks", "Segment build time 38 to 9 min", "41% fewer mis-targeted promotions"] },
        ] },
        { type: "cards", cols: 2, items: [
          { n: "1", kicker: "Intelligence Summary", title: "A verdict, not a score.", lines: ["The headline answers the agent's real question: can these two clients share a strategy?"] },
          { n: "2", kicker: "Intelligence Summary", title: "Confidence is separate from similarity.", lines: ["“29% similar, 87% confident” means the AI is sure they're different. Merging the two numbers would hide that."] },
          { n: "3", kicker: "Intelligence Summary", title: "What not to do.", lines: ["The campaigns that would backfire are named, next to the ones that would work."] },
          { n: "4", kicker: "Intelligence Summary", title: "The cost of ignoring it.", lines: ["The impact panel describes what goes wrong if the two are put in one segment."] },
        ] },
        { type: "text", eyebrow: "entry · lead record", heading: "One button in the row agents already use, and a signal of how much the AI can know.", body: [
          "Find Similar Leads sits next to Send push notification and Add to WhatsApp, in the action row agents use dozens of times a day. Nothing else on the record moved.",
          "Below it, Profile Data Coverage shows how complete the record is in each feature group. It answers a question agents ask before trusting any AI output: what does it actually know about this person? A client with 6 of 16 features filled gets weaker matches, and the agent can see that before clicking.",
        ] },
        cl("lead", "Lead record for Yılmaz Şahin with a Find Similar Leads button in the action row, KPI tiles, a Profile Data Coverage panel at 92% with Trading, Financial and Notes groups at 15 of 16, and a Trading detail panel showing call activity", 2000 / 909),
        { type: "text", body: ["The entry point sits in the existing action row. Data coverage is shown by feature group. Each group opens into the raw signals behind it, such as call count, answer rate and preferred call hour."] },
        { type: "text", eyebrow: "discover · AI read, explained", heading: "Before showing anyone else, tell the agent what ClientLens sees in this client.", body: [
          "The left column reads the client: risk flag, re-deposit chance, re-engagement likelihood and best channel. Underneath is the reason, written plainly: clients like this one responded to these actions.",
          "I put this before the list on purpose. In early sessions with 8 agents, people jumped straight to the top match and copied its playbook. Making them read the client first slowed that habit down.",
          "Risk is a coloured label and probability is a word plus a number, so neither is a bare percentage. “Medium” re-deposit chance is a judgment an agent can act on. 0.47 is not.",
        ] },
        cl("similar-anchor", "Anchor lead panel for John Doe: High Churn Risk, Medium redeposit chance, 76% re-engagement outreach, best channel Telegram, and a note explaining that similar clients had positive outcomes with these actions", 1562 / 2715, 360),
        { type: "text", body: ["Risk comes first, then the channel to use, then why ClientLens believes it."] },
        cl("similar", "Similar Leads list with 1,200 results, a Medium (30%) threshold dropdown, a Run Comparison button, and rows each showing a checkbox, a 76% match ring, client tags, an AI summary of the risk profile, and View Profile and Compare buttons", 2000 / 1296),
        { type: "text", body: ["The match threshold defaults to Medium (30%), with the tolerance written next to the label. Match strength is a ring with a number. Each match comes with an AI summary that leads with risk; here it warns that the client resembles previously restricted users. Agents tick the matches they want to examine, and Run Comparison works on the selected set."] },
        { type: "text", eyebrow: "compare · verdict, confidence, action", heading: "The comparison ends in a recommendation the agent can act on, or refuse.", body: [
          "The summary reads top to bottom like a decision. AI Summary gives the recommendation and its confidence. Similarities and Differences are scored by category, each labelled “Stronger driver”, “Significant difference” or “Completely different”. Recommended Actions are tagged by impact. Business Impact explains what goes wrong if the agent ignores the recommendation.",
          "The column I fought hardest for is Do not recommend. Positive recommendations alone kept leading agents to add the VIP playbook “just in case”. Naming the campaigns that would backfire, here a VIP upgrade, a high-value campaign and deposit incentives, turned a suggestion into a guardrail.",
        ] },
        cl("summary-actions", "Recommended Actions panel: primary action, high impact, use John's CRM engagement patterns to re-engage Lisa; secondary action, medium impact, a targeted retention journey instead of trading incentives; and a Do not recommend list of VIP upgrade promotion, high-value trader campaign and deposit-based incentives", 1600 / 1855, 560),
        { type: "text", body: [
          "A primary and a secondary action, each with an impact tag, and below them the Do not recommend list.",
          "Why actions instead of segments? The first version produced a segment, “clients like John”, and left the strategy to the agent. Agents read that as “treat them like John”. Writing the action, use John's engagement patterns, not his incentives, keeps what transfers (communication style, timing) apart from what doesn't (deposit behaviour).",
          "Why impact tags? Retention leads asked in the pilot how to prioritise when a desk has 40 comparisons open. High and medium impact gave them a triage order without another screen.",
        ] },
        { type: "text", eyebrow: "explain · evidence layer", heading: "One shape that shows where two clients overlap and where they come apart.", body: [
          "A 29% match is an abstraction. The radar plots both clients across the eight categories used for scoring: trading, financial, CRM notes psychology, communication, risk, marketing, lead source and lifecycle. The shaded overlap is where the strategies can be shared.",
          "Radar charts are easy to misread, so the help is built into the page rather than a tooltip. How to read the radar explains the centre, the edge and the overlap. What does this mean? turns the shape into a sentence.",
        ] },
        cl("radar", "Radar Preview tab: a radar chart comparing the active and churned client across eight categories, an Insights panel noting strong alignment in CRM psychology and communication habits, a What does this mean explanation, and a How to read the radar legend", 2000 / 1078),
        { type: "text", body: ["Two shapes, one overlap. Insights pick out the strongest alignment, a plain-language reading explains it, help is one click away, and a legend covers the three patterns that matter.", "Screens are from the shipped design. Client names and IDs are test data."] },
      ],
    },
    think: {
      intro: clIntro,
      blocks: [
        { type: "text", eyebrow: "before / after", heading: "Agents segmented by memory and tags. The CRM now answers the comparison and shows its reasons.", body: ["The decision that matters most, “is this client like that one?”, used to happen in someone's head."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Before ClientLens", title: "Agents segmented by memory and tags.", list: ["Open the lead record: 60+ fields across 7 panels (agent)", "Filter the leads list by tags and country (agent)", "Export to a spreadsheet and sort by deposits (agent)", "Guess which clients “behave like” a known good one (unrecorded)", "Apply the VIP playbook to the whole list (mis-targeted)"], lines: ["The decision that matters most, “is this client like that one?”, happened in someone's head."] },
          { kicker: "With ClientLens", title: "The CRM answers the comparison and shows its reasons.", list: ["Click Find Similar Leads on the record (agent)", "Rank lookalikes across 8 behaviour categories (AI)", "Read the lead's risk, re-deposit chance and best channel (AI)", "Compare a pair: verdict, confidence, do and don't (confidence)", "Choose the action and log it on the record (agent)"], lines: ["The agent still decides. ClientLens makes the comparison explicit, explained and recorded."] },
        ] },
        { type: "pull", heading: "Design challenge", text: "How might we help agents reuse what worked for one client on others, without letting surface similarity push them into the wrong strategy?" },
        { type: "text", eyebrow: "constraints", heading: "Shipped inside a CRM agents already used all day.", body: ["This wasn't a blank canvas. ClientLens had to live in a six-year-old lead record, on a fixed component library, with data that was often incomplete and scores that could not be computed live. Each constraint shaped a specific design decision."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Legacy system", title: "A crowded lead record we couldn't redesign", lines: ["The lead page carries Details, Advance Details, Device, Custom Fields, KYC, Marketing and Transactions. Three other teams own panels on it, so a page redesign was off the table.", "Design response: entry is one button in the existing action row. The results open in the page's existing AI insight tab slot rather than a new page."] },
          { kicker: "Technical limit", title: "Similarity is scored overnight, not live", lines: ["Scoring every lead against roughly 1.4M records in real time was too expensive for the database cluster. Engineering moved scoring to a nightly batch.", "Design response: every comparison shows its compare date. Results never look live, and agents can tell when a client changed after scoring."] },
          { kicker: "Technical limit", title: "AI summaries were slow and costly", lines: ["Generating a written summary took 4–6 seconds per lead. Doing it for 1,200 matches on page load was not an option.", "Design response: summaries are pre-generated for the top 50 matches and created on demand after that. The list never waits on the model."] },
          { kicker: "Data quality", title: "Many records were half empty", lines: ["Imported leads often lacked trading history or notes. A match built on thin data looks just as confident as one built on rich data unless you say otherwise.", "Design response: Profile Data Coverage (15 of 16 features, 92%) sits on the lead record, and confidence is shown on every verdict."] },
          { kicker: "Compliance", title: "Agents can't browse other clients' details", lines: ["Lookalikes can belong to other desks and regions. Compliance ruled that matched clients appear only with hashed IDs unless the agent has access to that record.", "Design response: match cards lead with the reasons for the match, not personal data. View Profile respects the agent's existing permissions."] },
          { kicker: "Business priority", title: "A retention target and a fixed date", lines: ["The retention desks had a quarterly re-deposit target, and the feature had to land before the Q2 campaign season.", "Design response: we cut the Deep Dive per-category view from v1 and shipped the decision path first: find, compare, act."] },
        ] },
        { type: "text", eyebrow: "iterations · v1 to v4", heading: "From a similarity badge to a verdict with guardrails.", body: ["ClientLens went through four versions. Each fixed a specific way agents misused the previous one."] },
        { type: "cards", cols: 2, items: [
          { n: "v1 · Badge", title: "A match % on the leads list", lines: ["A single similarity number next to each lead, sorted from highest to lowest.", "What we learned: in the first prototype test, 6 of 8 agents treated 70%+ as “same client, same campaign”."] },
          { n: "v2 · Breakdown", title: "Per-category scores", lines: ["The match split into categories, so a high overall score could show a 0% gap in trading behaviour.", "What we learned: agents saw the gap but still didn't know what to do differently. Information isn't a decision."] },
          { n: "v3 · Verdict", title: "Recommendation + confidence", lines: ["A plain answer, “treat as one segment or not”, with confidence shown as its own number.", "What we learned: engineering found that confidence followed data coverage. That is why coverage moved onto the lead record."] },
          { n: "v4 · Shipped", title: "Actions, anti-actions, impact", lines: ["Primary and secondary actions, a Do not recommend list, business impact and the radar as supporting evidence.", "What we learned: compliance review asked for the Do not recommend list after seeing deposit incentives offered to churned clients."] },
        ] },
        { type: "text", eyebrow: "model · two axes", heading: "Similarity and confidence are different questions. Merging them hides the dangerous case.", body: ["Early specs had one “match quality” number. I argued for two: how alike two clients are, and how sure ClientLens is about it. The John/Lisa case shows why. A low match with high confidence is the most useful thing the system can say, because it stops a mistake. A single number would show it as a weak result and agents would skip it."] },
        { type: "cards", cols: 2, items: [
          { kicker: "High confidence · low similarity", title: "Don't share a strategy", lines: ["ClientLens is sure they differ. The verdict says so and names what not to do.", "John vs Lisa · 29% · 87%"] },
          { kicker: "High confidence · high similarity", title: "Reuse what worked", lines: ["The primary action carries over, with the channel and timing from the better-performing client.", "Typical top matches · 76%"] },
          { kicker: "Low confidence · low similarity", title: "Treat as a hint", lines: ["No recommendation is shown as certain. The UI points to the missing data instead."] },
          { kicker: "Low confidence · high similarity", title: "Looks alike, unproven", lines: ["The most tempting case to over-trust. The confidence label keeps the agent careful."] },
        ] },
        { type: "text", eyebrow: "ownership · mine vs ours", heading: "Which decisions I made, and which ones the team made.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Decisions I owned", title: "Answer “should these share a strategy?”, not “how similar?”", lines: ["I reframed the brief from a similarity search into a decision aid. It changed the output from a ranked list into a verdict."] },
          { kicker: "Decisions I owned", title: "Two numbers: similarity and confidence", lines: ["I took this to the data scientist and the PM with the John/Lisa case as evidence."] },
          { kicker: "Decisions I owned", title: "Do not recommend as a first-class pattern", lines: ["A negative action list, styled the same as recommendations, so it isn't read as a footnote."] },
          { kicker: "Decisions I owned", title: "Read the client before the list", lines: ["The anchor panel comes before the matches to break the copy-the-top-match habit."] },
          { kicker: "Decisions I owned", title: "The insight card system", lines: ["One card anatomy for every AI claim, built in the existing Ant Design library."] },
        ] },
        { type: "cards", cols: 2, items: [
          { kicker: "Engineering lead", title: "Nightly batch scoring", lines: ["Infrastructure cost made live scoring infeasible. My response was to surface the compare date."] },
          { kicker: "Data science · co-designed labels", title: "Eight scoring categories, 16 features each", lines: ["The data science model. I named the categories with agents so the labels match how they talk."] },
          { kicker: "Compliance", title: "Hashed IDs for matched clients", lines: ["Required for cross-desk privacy. I designed the match card to work without personal data."] },
          { kicker: "PM", title: "Cutting Deep Dive from v1", lines: ["Scope trade-off for the Q2 date. I argued for the radar as the lighter evidence view instead."] },
          { kicker: "Data science + me", title: "Default threshold of 30%", lines: ["Picked from pilot data on which matches agents actually opened."] },
        ] },
        { type: "text", eyebrow: "boundaries · AI vs agent", heading: "ClientLens can recommend. It never acts on the client.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "AI may do", title: "Without asking", list: ["Score lookalikes across categories", "Summarise a match in plain language", "Recommend and rank actions", "Flag risk resemblance to restricted users"] },
          { kicker: "AI shows, with context", title: "Always qualified", list: ["Confidence beside every verdict", "Compare date for every score", "Data coverage for the source lead", "The reason behind each recommendation"] },
          { kicker: "Agent decides", title: "Human action", list: ["Which matches to compare", "Whether to follow a recommendation", "Which campaign or journey to use", "Opening a profile, within existing permissions"] },
          { kicker: "Must never", title: "Hard limits", list: ["Enrol a client in a campaign automatically", "Change tags, status or VIP level", "Reveal personal data across desks", "Recommend deposit incentives to high-risk profiles"] },
        ] },
        { type: "text", eyebrow: "trade-offs · what it cost", heading: "The trades we made to ship on time inside the existing CRM.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Chose", title: "Overnight scores with a visible date", lines: ["Over: live scoring on every click.", "Cost: a client who deposits at noon looks the same until tomorrow. The date makes that visible."] },
          { kicker: "Chose", title: "Fit into the existing tab slot", lines: ["Over: a dedicated ClientLens page.", "Cost: less room for the comparison. We accepted a two-column layout that scrolls."] },
          { kicker: "Chose", title: "A verdict", lines: ["Over: neutral data that lets agents decide.", "Cost: being wrong is more visible. Confidence and the radar keep the verdict open to challenge."] },
          { kicker: "Chose", title: "Radar as the evidence layer", lines: ["Over: the full per-category Deep Dive.", "Cost: less detail for power users. Deep Dive is on the roadmap."] },
          { kicker: "Chose", title: "Pre-generated summaries for top matches", lines: ["Over: a summary for every match, always.", "Cost: matches past the first 50 show “Generating…” briefly when opened."] },
        ] },
      ],
    },
    build: {
      intro: clIntro,
      blocks: [
        { type: "text", eyebrow: "system · pipeline", heading: "Designed as a system, delivered alongside engineering.", body: ["The screens are the visible part of a pipeline: CRM events become features, features become scores, scores become structured claims, and claims become one family of cards. I designed the card system and the data contract with the engineers who built them.", "Each layer answers one question, and the interface can always trace a claim back to its source."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Interface", list: ["Lead record · Find Similar Leads", "AI insight tab slot", "Intelligence Summary", "Radar Preview"], lines: ["Requests carry the agent's desk and permissions."] },
          { kicker: "Insight API", list: ["Permission + masking", "Structured insight contract", "Feedback capture"] },
          { kicker: "AI boundary", list: ["Summaries from structured scores only", "Rule check: no incentives to high-risk profiles", "Top 50 pre-generated, rest on demand"] },
          { kicker: "Scoring", list: ["Similarity per category", "Confidence from coverage", "Risk resemblance", "Nightly batch · 02:00 UTC"] },
          { kicker: "Features", list: ["8 categories × 16 features", "Trading · financial · calls · notes · marketing · lifecycle · lead source · risk"] },
        ] },
        { type: "text", eyebrow: "components · insight card", heading: "One card anatomy for every AI claim, so agents learn to read it once.", body: ["Similarities, differences, actions and risk flags all use the same five parts. Because the anatomy is fixed, engineers could build one Ant Design component with variants instead of six bespoke panels, and the next AI insight in the tab slot (the Fraud Risk Index team adopted it next) inherits the same reading pattern."] },
        { type: "cards", cols: 3, items: [
          { n: "1", title: "Category", lines: ["Named the way agents talk about it, not after the model's feature."] },
          { n: "2", title: "Verdict tag", lines: ["A fixed vocabulary: Stronger driver, Significant difference, Completely different, High or Medium impact."] },
          { n: "3", title: "Reason", lines: ["One sentence built from the structured scores. Never free-form model text."] },
          { n: "4", title: "Value", lines: ["Large, so it can be scanned across a row of cards."] },
          { n: "5", title: "Semantic bar", lines: ["Green for alike, red for different, amber for “act with care”. Colour always repeats the tag, never replaces it."] },
        ] },
        { type: "text", body: ["Variants: similarity, difference, primary action, secondary action, do not recommend and risk flag."] },
        { type: "text", eyebrow: "engineering · collaboration", heading: "How design and engineering shipped it together.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Weeks 1–3", title: "Contract before pixels", lines: ["The back-end lead and I wrote the insight response schema together, so every UI element had a field to come from and nothing was hard-coded."] },
          { kicker: "Weeks 4–8", title: "States as specs", lines: ["I delivered every state as a spec: loading, generating, low coverage, no matches, permission-masked and scoring stale. QA tested against those."] },
          { kicker: "Weeks 6–11", title: "Pilot behind a flag", lines: ["The feature shipped to 2 retention desks, 38 agents, behind a feature flag. We reviewed usage and feedback with data science every week."] },
          { kicker: "Weeks 12–14", title: "Tune, then roll out", lines: ["The threshold default, summary wording and the Do not recommend rules were tuned from pilot data, then rolled out to all desks."] },
        ] },
        { type: "cards", cols: 2, items: [
          { kicker: "The insight contract · GET /leads/{id}/compare/{otherId}", title: "One response drives the whole Intelligence Summary", list: ["matchScore: 29", "similarity: low", "confidence: 87", "comparedAt: 2026-05-12T11:24:00Z", "recommendation: separate_strategy", "categories: crm_notes_psychology 88 (stronger_driver), trading_behaviour 0 (completely_different)", "actions: primary, high impact, reuse_engagement_pattern", "doNotRecommend: vip_upgrade, high_value_campaign, deposit_incentive"] },
        ] },
        { type: "text", eyebrow: "outcomes", heading: "Results from the pilot and the first quarter after launch.", body: ["Measured over 6 weeks on two pilot desks against two comparable desks without ClientLens, then tracked for one quarter after general availability."] },
        { type: "cards", cols: 2, items: [
          { n: "64%", title: "Weekly use", lines: ["Of pilot agents used Find Similar Leads every week by week 6."] },
          { n: "38 → 9 min", title: "Segment build time", lines: ["Median time to build a re-engagement segment."] },
          { n: "−41%", title: "Mis-targeted promotions", lines: ["VIP and deposit promotions sent to churned or high-risk clients."] },
          { n: "11.8% vs 8.6%", title: "Re-deposit rate", lines: ["On ClientLens-guided outreach compared with control desks."] },
        ] },
        { type: "cards", cols: 3, items: [
          { kicker: "Feedback theme · agents", lines: ["“Do not recommend” was the most mentioned feature. Agents said it gave them a reason to refuse a manager's request to “just send the VIP offer”."] },
          { kicker: "Feedback theme · retention leads", lines: ["Leads used impact tags to plan the day's comparisons, which we hadn't designed for."] },
          { kicker: "Feedback theme · compliance", lines: ["Hashed matches and the deposit-incentive rule cleared review without changes."] },
        ] },
      ],
    },
  },
};


/*
 * Activepieces — copy and structure from the published Activepieces artifact (claude.ai/artifact/ENKUcpbMBztHDgV91H2j3c).
 * Visuals are the eight device mockups supplied with the request, web-sized in /public/assets/activepieces.
 * FLAGS:
 *  1. The artifact marks several details as assumptions to verify before sharing (release dates, team size, catalogue
 *     size, task limit, support and adoption metrics, Material, PR reviews). They are reproduced as written; check them
 *     before publishing.
 *  2. The artifact's numbered annotation pins are folded into the copy (the image block has no overlay). The step-state
 *     ladder, iterations, ownership split and trade-offs are expressed as cards, since the shared blocks have no
 *     diagram/table type.
 *  3. Problem and Constraints open the Think tab, Outcomes closes the Build tab, and "What didn't work / What I'd do next"
 *     plus the closing line become the Reflection block.
 */
const AP = "/assets/activepieces";
const apIntro: Tab["intro"] = {
  eyebrow: "the problem",
  heading: "Multi-app automations were hard to read and harder to set up.",
  body: [
    "An automation is a chain: something happens in one app, and several things happen in others. In the old builder, users couldn't see at a glance what a flow did, where to start, or why it wasn't running. Most of them weren't developers. When the builder didn't explain itself, they left before publishing their first flow, or asked in the community Discord.",
    "The redesign rests on one model: every step has a visible state, and the product never lets users move past a step it knows is broken.",
  ],
};
const ap = (file: string, alt: string, ratio: number, tone: "photo" | "cut" = "photo", width?: number): Block => ({ type: "image", src: `${AP}/${file}.webp`, tone, alt, ratio, width });
const activepieces: CaseStudy = {
  slug: "activepieces",
  title: "Automations fail where people lose their place",
  lede: [
    "Activepieces is an open-source, no-code tool that connects apps like Gmail, Slack and Discord into automated workflows. I redesigned the four moments where people kept losing their place.",
    "Scope: the flow builder, trigger selection, the step sidebar, the flows dashboard and the component library under them.",
  ],
  heroAlt: "Activepieces flow builder on a laptop at a night desk: a Code step followed by a Branch step marked Invalid Settings, with True and False paths below it and a side panel showing the Branch settings with First Value, Condition and Second Value fields, each flagged as required",
  heroSrc: `${AP}/branch.webp`,
  heroRatio: 1800 / 1102,
  heroMax: 1068,
  heroTone: "photo",
  meta: [["Role", "UI designer, working directly with the founder and a senior designer"], ["Focus", "UI design / Interaction / Design systems"], ["Shipped", "2023, used by the product's whole user base"]],
  reflection: {
    eyebrow: "honest read",
    heading: "What didn't work, and what I'd do next",
    body: [
      "The empty dashboard underperformed: new users saw three “Untitled” flows and nothing else, and names and last-run time would have said more than the creation date. Material showed through, too. Some defaults, like dense tables and ripples, made the product feel generic in places. And Branch was still hard: conditions with several “And/Or” groups stayed difficult for non-developers.",
      "Next: run history on the dashboard (last run, success or failure, and a link to the failing step). Name flows automatically from their trigger and first action, so the list is never a column of “Untitled”. A plain-language condition builder for Branch: “If email subject contains invoice”. And templates on the empty canvas for the most common app pairs.",
    ],
    pull: "Automation is easy until you lose your place. The redesign made sure nobody did.",
  },
  tabs: {
    design: {
      intro: apIntro,
      blocks: [
        { type: "text", eyebrow: "the experience", heading: "Build, trigger, extend, monitor: four moments, one clear path.", body: ["The redesign follows the life of a flow. Each moment gets one job: show the user where they are, what's missing, and what to do next."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Shipped", list: ["Redesigned flow builder and step cards", "Select Trigger and Select Step with search and categories", "Flows dashboard with status and task usage"] },
          { kicker: "I owned", list: ["Step card anatomy and validation states", "Sidebar information architecture", "Dashboard layout and the usage bar"] },
          { kicker: "Team decisions", list: ["Vertical, top-to-bottom canvas (founder)", "Building on Angular Material (engineering)", "Release order and scope (founder + senior designer)"] },
          { kicker: "Measured", list: ["Founder: users found the builder “VERY CLEAR” after release", "Time to first published flow 14 → 6 min", "“How do I start?” support questions down 52%"] },
        ] },
        { type: "cards", cols: 2, items: [
          { n: "1", kicker: "Flow builder", title: "The canvas says what's wrong.", lines: ["An Invalid Settings tag on the step card, visible without opening anything."] },
          { n: "2", kicker: "Flow builder", title: "Every step explains itself.", lines: ["“Decide what happens based on an if condition result”, in the panel header."] },
          { n: "3", kicker: "Flow builder", title: "Errors sit at the field.", lines: ["Each required value is flagged where the user fixes it, not in a toast."] },
          { n: "4", kicker: "Flow builder", title: "Paths are labelled.", lines: ["True and False are drawn and named, so a branch reads like a sentence."] },
        ] },
        { type: "text", eyebrow: "build · flow builder", heading: "A calm canvas with the next step always obvious.", body: [
          "The builder is a dotted canvas with a single header. Breadcrumbs (Uncategorized / Untitled) show where the flow lives and let users rename it in place. Feedback, Test Flow and Publish sit together on the right, in the order users need them.",
          "Publish stays disabled until the flow is valid. A greyed button that explains itself on hover beats a publish that fails afterwards.",
        ] },
        ap("builder-empty", "The redesigned Activepieces builder on a laptop: a dotted canvas, a breadcrumb reading Uncategorized / Untitled, and Feedback, Test Flow and a disabled Publish button in the header", 1800 / 994),
        { type: "text", body: ["The flow's location is editable in place, Feedback and Test Flow are always reachable, and Publish waits for a valid flow."] },
        { type: "text", eyebrow: "trigger · first step, guided", heading: "Every flow starts with one card that tells you what to do.", body: [
          "A new flow is never blank. It opens with a single Select Trigger card, purple and centred, where the user's eye lands first. Until a trigger is configured, the card carries an Invalid Settings tag. It's a clear to-do, not an error.",
          "The “+” connector below the card is where the second step goes. That's the whole model of the product, taught with two shapes.",
        ] },
        ap("trigger-invalid", "Builder with a Select Trigger card marked Invalid Settings and a plus connector beneath it", 1800 / 994),
        { type: "text", body: ["A single starting point, with the “+” connector beneath it for the next step. A status tag shows what's left to do."] },
        ap("trigger-float", "The Select Trigger card on an otherwise empty canvas, shown on a floating laptop in front of glowing light bars", 1800 / 1348),
        { type: "text", body: ["The empty state is one card and nothing else, so there's no question about where to begin."] },
        { type: "text", eyebrow: "extend · select step", heading: "A sidebar that scales with a catalogue that grows every week.", body: [
          "Choosing a trigger or an action opens Select Step in a side panel, so the canvas stays visible and the user keeps their place. Search comes first because most users already know the app they want. Tabs (All, Core, App Actions) separate built-in logic like Branch and Code from third-party apps.",
          "Each row leads with the app's own logo. People recognise Airtable's colours long before they read the word, which makes a long list easy to scan.",
        ] },
        ap("select-step", "Select Step side panel on a monitor with a search field, All, Core and App Actions tabs, and a list of Airtable, Amazon S3, Asana and Bannerbear, next to the canvas with a Select Trigger card", 1800 / 1179, "cut"),
        { type: "text", body: ["Search first, category tabs that split logic from apps, logo-led rows for fast scanning, and a canvas that stays visible while the user chooses."] },
        { type: "text", eyebrow: "configure · validation", heading: "Mistakes show up twice: on the canvas, and at the exact field.", body: [
          "Configuring a step happens in the same side panel. The header names the step and explains what it does in one line. Required fields that are still empty are outlined, with a plain message underneath: “Condition is required”.",
          "The same problem shows on the canvas as Invalid Settings on the step card. A user scanning a ten-step flow can see which steps need attention without opening each one.",
        ] },
        ap("branch", "Branch step selected on the canvas with Invalid Settings, and its settings panel showing three required fields outlined in red with messages beneath", 1800 / 1102),
        { type: "text", body: ["The canvas flags the step, the field explains what's missing, and “+ Add / + Or” extend a condition without leaving the panel."] },
        { type: "text", eyebrow: "monitor · flows dashboard", heading: "Which flows are on, and how much runway is left.", body: [
          "The flows table shows only what users check daily: name, creation date and a status toggle they can flip without opening the flow. Delete is a clear red icon at the end of the row, away from the toggle.",
          "The task usage bar is the most important change. “Tasks: 999/1000 (Resets in 11 days)” with View Plans beside it turns a silent limit into something users see coming and can plan for.",
        ] },
        ap("dashboard", "Flows dashboard on a laptop with a table of three flows, their creation dates, status toggles and delete icons, a New Collection button, page size control, and a dark task usage bar reading Tasks 999 of 1000, resets in 11 days, with a View Plans button", 1800 / 1180, "cut"),
        { type: "text", body: ["Status toggles inline, one primary action, usage with the reset date, and the upgrade path right next to the problem."] },
        { type: "text", body: ["Screens are from the shipped product, shown in device mockups."] },
      ],
    },
    think: {
      intro: apIntro,
      blocks: [
        { type: "text", eyebrow: "before / after", heading: "The user had to know automation to use it. Now the builder walks them through it.", body: ["Each step used to assume the user already knew what to do next. Now the interface carries the knowledge, so the user doesn't have to."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Before the redesign", title: "The user had to know automation to use it.", list: ["Open a blank canvas with no clear first step (stuck)", "Scroll a long, flat list of apps to find a trigger (user)", "Configure fields without knowing which are required (guessing)", "Try to publish and get a generic error (unclear)", "Check a list of flows with no sign of which are running (user)"], lines: ["Each step assumed the user already knew what to do next."] },
          { kicker: "After the redesign", title: "The builder walks the user through it.", list: ["Start from a single “Select Trigger” card (guided)", "Search or browse apps by category (user)", "See invalid steps on the canvas and errors at the field (validated)", "Test the flow, then publish when every step is valid (user)", "Track status and task usage from the dashboard (visible)"], lines: ["The interface carries the knowledge, so the user doesn't have to."] },
        ] },
        { type: "pull", heading: "Design challenge", text: "How might we make building, triggering and monitoring an automation clear enough that a non-developer stays confident from the first step to a running flow?" },
        { type: "text", eyebrow: "constraints", heading: "A fast-moving, open-source product with a small team.", body: ["Activepieces shipped in public, often weekly, with a team of fewer than ten people. The redesign had to land in pieces, on the existing front-end stack, without breaking flows people already relied on."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Technical limit", title: "An existing component library", lines: ["The app was built on Angular Material. Engineering couldn't afford a custom component layer during the redesign.", "Design response: I designed a theme and a small set of patterns on top of Material (tokens, step cards, status tags) instead of new components."] },
          { kicker: "Technical limit", title: "A fixed canvas model", lines: ["Flows render as a vertical tree, with no free-form dragging. Steps can't be placed anywhere.", "Design response: I leaned into the structure: top-to-bottom reading order, “+” connectors between steps, and labelled True/False paths for branches."] },
          { kicker: "Growing catalogue", title: "New apps every week", lines: ["The community kept contributing “pieces”. The catalogue grew from about 40 to over 80 during the project, so any list designed for today would break next month.", "Design response: search first, then category tabs (All, Core, App Actions), and logo-led rows that scale to any number of apps."] },
          { kicker: "Users", title: "Builders and non-builders", lines: ["Developers wanted Code steps. Operations people wanted Gmail-to-Slack in five minutes. Both used the same builder.", "Design response: plain-language step descriptions for newcomers, with Code and Branch kept one search away for power users."] },
          { kicker: "Business priority", title: "Free tier with a task limit", lines: ["Free users get 1,000 tasks a month. Hitting the limit silently stopped flows and generated support tickets.", "Design response: task usage moved onto the dashboard as a bar with the reset date and a link to plans, shown before the limit, not after."] },
          { kicker: "Process", title: "Ship without freezing the product", lines: ["The builder couldn't go offline for a big-bang redesign while users were mid-flow.", "Design response: we shipped in three releases: builder and trigger, then step sidebar and validation, then the dashboard."] },
        ] },
        { type: "text", eyebrow: "model · step states", heading: "Five states, each with a gate before the next.", body: ["Before this model, “working” and “not working” were the only states, and users found out which only after publishing. I mapped every state a step can be in and gave each one a look and a rule."] },
        { type: "cards", cols: 3, items: [
          { n: "01", kicker: "Empty", title: "Not chosen", lines: ["“Select Trigger” or a “+” connector waiting for an app.", "Next: pick an app."] },
          { n: "02", kicker: "Invalid settings", title: "Chosen, incomplete", lines: ["Tag on the card, errors at each field.", "Next: fill required fields."] },
          { n: "03", kicker: "Valid", title: "Configured", lines: ["The tag disappears. The card is a plain summary.", "Next: test the flow."] },
          { n: "04", kicker: "Tested", title: "Ran once", lines: ["Test Flow shows the sample output for each step.", "Next: publish."] },
          { n: "05", kicker: "Published", title: "Live", lines: ["Status toggle on in the dashboard. Uses tasks.", "Next: monitor usage."] },
        ] },
        { type: "text", body: ["The rule: Publish is disabled while any step is Empty or Invalid. Testing is allowed earlier, because seeing real output is the fastest way to learn what a field expects."] },
        { type: "text", eyebrow: "iterations · how it evolved", heading: "Three rounds with the founder and the community.", body: [] },
        { type: "cards", cols: 2, items: [
          { n: "Round 1 · Builder", title: "Start from a card, not a blank", lines: ["The first concept added an onboarding tooltip tour over the empty canvas.", "What we learned: users in the Discord skipped the tour. A single trigger card did the same job without interrupting anyone."] },
          { n: "Round 2 · Sidebar", title: "From a grid to a searchable list", lines: ["App tiles in a grid looked good with 20 apps.", "What we learned: at 60+ apps the grid became a wall. Search, tabs and logo-led rows held up as the catalogue grew."] },
          { n: "Round 3 · Validation", title: "From a publish error to step states", lines: ["Errors first appeared as one message when Publish failed.", "What we learned: users couldn't tell which step was wrong. Moving the error onto the step card and the field fixed it."] },
          { n: "Shipped · Dashboard", title: "Usage before the limit", lines: ["Task usage used to live on the billing page.", "What we learned: the founder prioritised it after a run of “my flow stopped” tickets. It moved onto the dashboard as a bar."] },
        ] },
        { type: "text", eyebrow: "ownership · mine vs ours", heading: "Which decisions I made, and which ones the team made.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Decisions I owned", title: "Step card anatomy", lines: ["Icon, name, step ID and status tag, the same on every step from Trigger to Branch."] },
          { kicker: "Decisions I owned", title: "Invalid Settings as a tag, not an alert", lines: ["Status lives on the card so a whole flow can be scanned at once."] },
          { kicker: "Decisions I owned", title: "Search-first Select Step", lines: ["The panel structure, the tab split, and logo-led rows."] },
          { kicker: "Decisions I owned", title: "Plain-language step descriptions", lines: ["One line under each step's name, written for non-developers."] },
          { kicker: "Decisions I owned", title: "Usage bar on the dashboard", lines: ["Its placement, reset-date copy and the View Plans pairing."] },
        ] },
        { type: "cards", cols: 2, items: [
          { kicker: "Founder · engineering", title: "Vertical tree canvas", lines: ["Kept from the existing engine. I designed within it."] },
          { kicker: "Engineering", title: "Building on Angular Material", lines: ["Speed over a custom library. I themed it."] },
          { kicker: "Founder + senior designer", title: "Release order", lines: ["Builder first, dashboard last."] },
          { kicker: "Senior designer · me", title: "Visual direction", lines: ["The purple brand and header treatment, reviewed with the senior designer."] },
        ] },
        { type: "text", eyebrow: "trade-offs · what it cost", heading: "The trades that let a small team ship it.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Chose", title: "Theme Material", lines: ["Over: a custom component library.", "Cost: some Material defaults stayed, such as ripple effects and dense tables. In return we shipped weeks sooner."] },
          { kicker: "Chose", title: "Disabled Publish", lines: ["Over: letting users publish and fail.", "Cost: a disabled button can feel blocking, so the hover text names the steps still invalid."] },
          { kicker: "Chose", title: "Side panel for steps", lines: ["Over: a full-screen modal.", "Cost: narrower forms, but the user never loses sight of the flow."] },
          { kicker: "Chose", title: "Three releases", lines: ["Over: one big redesign.", "Cost: for a few weeks the old dashboard sat beside the new builder."] },
        ] },
      ],
    },
    build: {
      intro: apIntro,
      blocks: [
        { type: "text", eyebrow: "system · components", heading: "A small system that engineers could ship and contributors could extend.", body: [
          "In an open-source product, community contributors add new apps. The system had to make a new piece look right without a designer in the loop.",
          "I set up colour, type and state tokens on Material's components (tabs, chips, toggles, dialogs, lists), then defined the product-specific patterns: the step card, the status tag, the step panel header and the usage bar. Every new piece inherits all of them.",
        ] },
        ap("design-system", "Component library on a monitor: purple themed tabs, app bars, chips in enabled, pressed and selected states, list items with checkboxes, a dialog asking Discard draft?, radio buttons, a slider and a floating action button", 1800 / 1079, "cut"),
        { type: "text", body: ["The themed component base: tabs, app bars, chip states, lists, dialogs and controls in the Activepieces purple."] },
        { type: "cards", cols: 2, items: [
          { n: "1", title: "App icon", lines: ["The contributor supplies a logo. The tile and size are fixed by the system."] },
          { n: "2", title: "Name", lines: ["The action in plain words: Branch, Code, Send Message."] },
          { n: "3", title: "Step ID", lines: ["step_1, step_2. Used to reference one step's output from another."] },
          { n: "4", title: "Status tag", lines: ["Shown only when something needs attention. A valid card stays quiet."] },
        ] },
        { type: "text", eyebrow: "engineering · collaboration", heading: "How it moved from Figma to production.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Weekly", title: "Founder reviews", lines: ["Direct reviews with the founder. Decisions and open questions went into the team's Discord thread, in public."] },
          { kicker: "Per release", title: "States, not screens", lines: ["Each component was handed off with all its states: empty, invalid, valid, hover, disabled. That way engineers didn't have to guess edge cases."] },
          { kicker: "During build", title: "Review in the PR", lines: ["I reviewed front-end pull requests with screenshots, catching spacing and state mismatches before release."] },
          { kicker: "After release", title: "Listen in Discord", lines: ["Community feedback after each release fed the next round. The sidebar and validation changes came from there."] },
        ] },
        { type: "text", eyebrow: "outcomes", heading: "Users understood the builder, and the founder said so.", body: [] },
        ap("feedback", "Discord conversation on a tablet, 9 May 2023. Ashraf asks if Likita saw the header on the app. Likita asks how users are interacting. Ashraf replies that the back is very clear to them now, then thanks Likita for the great work", 1000 / 1499, "photo", 340),
        { type: "pull", heading: "Ashraf, Activepieces founder · Discord, 9 May 2023", text: "“I can tell you the back is VERY CLEAR to them now.”" },
        { type: "text", body: ["This came after the builder and header shipped. When I asked how users were interacting with it, the answer was about clarity, which was the goal of the whole project."] },
        { type: "cards", cols: 2, items: [
          { n: "14 → 6 min", title: "Time to first published flow", lines: ["Median time from sign-up to first published flow."] },
          { n: "+31%", title: "First-week publishing", lines: ["New users who published a flow in their first week."] },
          { n: "−52%", title: "Fewer “where do I start” questions", lines: ["“Where do I start / why won't it publish” questions in the community Discord."] },
          { n: "2.4×", title: "View Plans clicks", lines: ["After the usage bar moved to the dashboard."] },
        ] },
      ],
    },
  },
};


/*
 * NORTHSTAR — content and screenshots from the published Northstar artifact (claude.ai/artifact/FXFcop4Kwh1KpCwuc5YmK7).
 * FLAGS: the artifact's numbered annotation pins are folded into the copy (the image block has no overlay). The decision
 * tree, role table, before/after lanes, recovery run and approval timeline are expressed as cards, since the shared blocks
 * have no diagram/table type. The artifact's "Limits & next" and closing line become the Reflection block.
 */
const NS = "/assets/northstar";
const nsIntro: Tab["intro"] = {
  heading: "A CRM that stays honest about what its AI doesn't know",
  body: [
    "Retention teams reactivating dormant enterprise clients work in tools built around modules, not outcomes. The judgment that decides who gets contacted lives outside the system, in exports and spreadsheets, where nobody can audit it.",
    "Northstar starts from a business outcome. The AI investigates and drafts, people keep authority over consequential decisions, and the handoffs between them are designed rather than left to chance.",
  ],
};
const ns = (file: string, alt: string, ratio = 1.6): Block => ({ type: "image", src: `${NS}/${file}.webp`, tone: "screen", alt, ratio });
const northstar: CaseStudy = {
  slug: "northstar",
  title: "An AI-native CRM that shows its uncertainty",
  lede: "Northstar is a working prototype of a goal-driven CRM for retention teams. I designed the journey from a stated goal to an audited action, then built it end to end as a React and TypeScript front end on synthetic data: 7 flows, 3 roles and 10 designed failure scenarios.",
  heroAlt: "Northstar investigation summary: 11 eligible clients, 14 needing review, a draft audience of 10, a recommended strategy marked Draft, and a Next decision panel",
  heroSrc: `${NS}/summary.webp`,
  heroRatio: 1.6,
  heroMax: 1068,
  heroTone: "photo",
  meta: [["Role", "Product design, systems thinking & front-end engineering"], ["Focus", "Explainable AI / Human control / Safe execution"], ["Status", "Working prototype on synthetic data"]],
  reflection: {
    eyebrow: "limits & next",
    heading: "What this is, and what it isn't yet",
    body: [
      "Still a prototype. The data is 36 invented clients built to exercise eligible, uncertain and excluded paths, and execution is simulated: no real email was sent and no live CRM or provider was connected. The design reasoning comes from the problem framing, not from studies with retention or compliance teams, and nothing here measures reactivation, conversion or time saved.",
      "Next: test the journey with real retention managers and approvers and watch where they hesitate at each seam. Measure time to a trusted decision, not clicks saved. Learn which conflicts teams resolve fastest and which they escalate. Then connect a real data source behind the same boundary, keeping execution simulated until approvals hold under load.",
    ],
    pull: "The AI does the investigating. People keep the authority. The space between them is designed, not left to chance.",
  },
  tabs: {
    design: {
      intro: nsIntro,
      blocks: [
        { type: "text", eyebrow: "the experience", heading: "From a goal to an audited action, in one connected thread", body: ["The journey runs Goal, Investigation, Evidence, Opportunities, Refinement, Approval, Execution and Recovery. Every screen belongs to one investigation, so a finding, the plan it led to and the approval it needed never lose their connection."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Designed", list: ["10 Figma screens across 7 flows", "States the screens didn't cover: running investigation, impact review, approval outcomes, execution recovery", "Role and autonomy boundaries"] },
          { kicker: "Implemented", list: ["A working prototype of every flow", "Plan versioning and approval of an exact version", "Role-based actions, audit log, simulated execution with safe retries"] },
          { kicker: "Validated", list: ["An end-to-end Fresh Start journey on synthetic data", "13 unit and component tests and a 10-step journey test", "WCAG 2.1 AA scan, zero violations across 9 screens"] },
          { kicker: "Still a prototype", list: ["Synthetic clients and simulated sends", "No user research or business metrics yet", "Never connected to a live CRM or email provider"] },
        ] },
        { type: "text", eyebrow: "goal · workspace", heading: "The home screen asks for an outcome, then shows the next decision", body: ["First-time users see a goal composer, three suggested goals and a short explanation of what happens next. There are no empty charts. Returning users see Needs attention and Continue work, ordered by the next useful decision rather than the last page they opened.", "The list depends on the role. A retention manager sees “Waiting for approval of plan v1”. An approver sees the same item as “Authorize plan v1”."] },
        ns("first-run", "First-run workspace with a welcome message, a Create your first business goal button, onboarding steps and suggested goals"),
        { type: "text", body: ["First run: one primary action, and suggested goals that fill in the composer and stay editable before anything runs."] },
        ns("home", "Returning workspace with a goal composer, a Needs attention list showing consent review, approval needed and findings ready, and a Continue work list"),
        { type: "text", body: ["Returning: a new goal is always one line away, pending decisions come first and are tagged by type, and Continue work links to the next decision, not the last screen."] },
        { type: "text", eyebrow: "investigation · seam 1", heading: "The AI shows its work while it runs, and reports findings, not verdicts", body: ["An investigation shows what it is checking as it goes: interpreting the goal, gathering evidence, verifying consent and KYC, classifying, drafting a plan. The progress screen states the boundary plainly: investigations only read evidence.", "When it finishes, the badge reads Investigation complete while the goal reads review ready. They are separate states on purpose. Finishing the analysis doesn't mean the business goal is met, and the interface never suggests otherwise."] },
        ns("running", "Investigation in progress, with five steps, two complete, a progress bar and a note that investigations only read evidence"),
        { type: "text", body: ["Progress is calculated from the start time, so it survives a page reload. The read-only boundary is stated where the user is waiting, which is when they wonder what the system is doing. This screen is not in the original Figma file. I designed it during the build to cover the gap between submitting a goal and seeing findings."] },
        { type: "text", eyebrow: "opportunities · seam 2", heading: "“Needs review” and “omitted by criteria” look alike. They are different problems", body: ["A client can be left out of outreach for two very different reasons. Held for review means the evidence conflicts, so a person must resolve it. Omitted by criteria means the client qualifies but the current plan rules leave them out, so the fix is a plan change. Each state has its own label, colour and next action.", "Inside a client record, each piece of evidence names its source and observation time, and is marked either Verified fact or Conflict. The AI never picks a side between conflicting records. It shows both."] },
        ns("opportunities", "Reactivation opportunities table with an amber banner saying 14 records need evidence review, and a Plan status column showing Omitted by criteria and In current plan"),
        { type: "text", body: ["The uncertain group is announced before the table, together with what is still safe: verified clients can continue. Plan status is its own column, separate from eligibility."] },
        ns("client-conflict", "Client sheet for Omar Haddad: Needs review, consent Unknown, held out of outreach until reviewed"),
        { type: "text", body: ["Conflict: the headline says why this client is held, and the uncertain field is flagged inside the facts, not hidden in a tooltip."] },
        ns("client-omitted", "Client sheet for Tariq Bello: eligible, omitted by criteria for plan v1, with a Refine current plan button and a verified last-trade fact"),
        { type: "text", body: ["Omitted: the status comes with its own fix, refine the plan or exclude the client explicitly in the next version. Facts carry their source and the time they were observed."] },
        { type: "text", eyebrow: "refinement · seam 3", heading: "You can't save a plan change until you've seen who it affects", body: ["Refining a plan always creates a new version. Plan v1 stays untouched. Save as new version stays locked until the user runs Review impact, which lists the audience before and after, by name, with the rule that removed each person.", "If the user edits anything after reviewing, the impact review is marked out of date and saving locks again. This is the same rule that governs approvals, applied one step earlier: a decision only counts for the exact inputs it was made on."] },
        ns("refine-impact", "Refine plan v2 drawer with an impact review showing the audience going from 10 to 5, with named clients removed and the reasons"),
        { type: "text", body: ["Reviewed: 10 to 5 clients, each removal explained, and saving unlocks only now."] },
        ns("refine-stale", "The same drawer after an edit: the impact review is labelled out of date and saving is disabled until it is reviewed again"),
        { type: "text", body: ["Stale: the old review fades and is labelled out of date, and the footer explains why saving locked and how to unlock it."] },
        { type: "text", eyebrow: "approval · seam 3", heading: "Requesting approval doesn't send anything. Approval covers one version", body: ["The campaign screen splits into the plan and an authorization rail. The rail names the executable candidate: plan version, audience size, channel. It says outright that requesting approval does not execute outreach, because people hesitate before buttons that might have side effects.", "The approver sees the same plan with different controls: approve this version, or request changes with a required note. The approval states that version number in writing."] },
        ns("campaign-draft", "Campaigns screen with plan v2 draft and a Prepare authorization rail with a Request approval button"),
        { type: "text", body: ["Manager view: the exact thing being authorized, and the side effects of the button, stated up front."] },
        ns("campaign-review", "Approver view with an awaiting approval badge, Approve plan v2 and Request changes buttons, and a note that approval applies only to version 2"),
        { type: "text", body: ["Approver view (labelled Compliance Reviewer in the build): the version is in the button label, and any later change needs a new approval."] },
        { type: "text", eyebrow: "execution · seam 4", heading: "Every consequential step leaves a record a person can read and a system can verify", body: ["Execution asks for one last confirmation with the real number of recipients. The Activity log then separates AI and system, human decisions and execution. Each event has a plain-language summary, the key numbers and the technical record underneath, so a compliance reviewer and an engineer can read the same event."] },
        ns("execute-confirm", "Confirmation dialog: Schedule outreach to 5 clients, using the approved plan v2 draft, recorded as an execution event"),
        { type: "text", body: ["The confirmation states the count, the version and that the step is recorded. It does not say “Are you sure?”."] },
        ns("activity", "Activity log filtered into AI and system, Human decisions and Execution, showing an Outreach scheduled event with its technical record expanded"),
        { type: "text", body: ["Filters by who acted, events that state the outcome in plain language, and the structured record behind a disclosure with a copy button."] },
        { type: "text", heading: "On phones", body: ["The Figma file was desktop only. On phones, tables become cards, side drawers go full screen, and the uncertainty banner stays above the list."] },
        { type: "image", src: `${NS}/phone-summary.webp`, tone: "screen", alt: "Investigation summary on a phone, awaiting approval", ratio: 780 / 1328, width: 340 },
        { type: "image", src: `${NS}/phone-opps.webp`, tone: "screen", alt: "Opportunities on a phone, filtered to records that need review, shown as cards", ratio: 780 / 1328, width: 340 },
      ],
    },
    think: {
      intro: nsIntro,
      blocks: [
        { type: "text", eyebrow: "the problem", heading: "A CRM asks which workflow you want. A retention team has a goal.", body: ["A retention manager doesn't want a dashboard. They want dormant enterprise clients to come back this month, without emailing someone who withdrew consent. In a traditional CRM, the judgment that decides who gets contacted lives outside the system, in exports and spreadsheets, where nobody can audit it."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Workflow-driven CRM", title: "The user does the investigation.", list: ["Open the dormant-accounts dashboard (human)", "Build filters for inactivity and deposits (human)", "Export a report to a spreadsheet (human)", "Check consent in another system (gap)", "Decide who is “probably fine” (unrecorded)", "Send the campaign (irreversible)"], lines: ["The riskiest decisions happen where the system can't see them."] },
          { kicker: "Northstar", title: "The user makes the decisions.", list: ["State the business goal (human)", "Investigate records against the goal (AI)", "Inspect evidence and resolve conflicts (uncertain)", "Refine the plan, preview its impact (human)", "Authorize one exact plan version (approver)", "Execute, reconcile, retry safely (system)"], lines: ["Each step leaves a record of who, or what, decided, and from which evidence."] },
        ] },
        { type: "pull", heading: "Design challenge", text: "How might we turn CRM work from manual task execution into goal-driven, AI-assisted decisions, without giving up transparency, safety or human control?" },
        { type: "text", eyebrow: "the core idea", heading: "Most AI products design the answer. Northstar designs the space around it.", body: ["An AI that reaches a conclusion is the easy part. Trust breaks in the handoffs: between what the model concluded and what it actually saw, between what it knows and what it can't know, between a human's approval and what gets executed, and between a failed send and a safe retry. I treated these four seams as the product."] },
        { type: "cards", cols: 2, items: [
          { n: "01", kicker: "Seam 1 · AI reasoning", title: "Show the evidence", lines: ["“What did it actually look at?”", "Findings link to the client records behind them. Evidence carries a freshness date. Every number opens its source."] },
          { n: "02", kicker: "Seam 2 · Uncertainty", title: "Keep the unknown visible", lines: ["“What doesn't it know?”", "Conflicting or missing evidence becomes its own state. Uncertain consent is never treated as permission."] },
          { n: "03", kicker: "Seam 3 · Human decision", title: "Bind approval to a version", lines: ["“Who decided, on what, exactly?”", "Edits create a new version. Approval covers one version. A change makes earlier reviews and approvals stale."] },
          { n: "04", kicker: "Seam 4 · Execution", title: "Design the recovery", lines: ["“What happened, and is it safe to retry?”", "Completed, failed and unknown outcomes stay distinct. Unknowns are reconciled before retrying. Completed actions are never repeated."] },
        ] },
        { type: "text", eyebrow: "classification · seam 2", heading: "Uncertain is a destination, not a rounding error", body: ["Every client record goes through the same questions. Only one path leads into an audience, and even that path ends at a person, not at a send."] },
        { type: "cards", cols: 3, items: [
          { kicker: "Evidence present? No", title: "Held · missing", lines: ["Says what is missing; no conclusion drawn."] },
          { kicker: "Sources agree? No", title: "Held · conflict", lines: ["Both records shown; a person resolves it."] },
          { kicker: "Consent unknown", title: "Held · review", lines: ["Never treated as permission."] },
          { kicker: "Consent withdrawn", title: "Excluded", lines: ["With the rule that excluded it."] },
          { kicker: "Matches plan? No", title: "Omitted", lines: ["Eligible; fixed by refining the plan."] },
          { kicker: "Matches plan? Yes", title: "Draft audience", lines: ["Still needs a human approval."] },
        ] },
        { type: "text", eyebrow: "autonomy", heading: "Four kinds of action, decided before any prompt was written", body: ["Autonomy is a design property, not a model setting. I sorted every action in the journey into one of four groups, and the interface follows from that sorting. A button lives where its group says it may."] },
        { type: "cards", cols: 2, items: [
          { kicker: "AI may do", title: "Without asking", list: ["Read CRM evidence against the goal", "Classify records as eligible, uncertain or excluded", "Draft a plan and outreach copy", "Calculate the impact of a proposed edit"] },
          { kicker: "AI does, then tells", title: "With notification", list: ["Investigation completed or stopped", "Plan version generated", "Evidence freshness and source gaps", "AI provider unavailable"] },
          { kicker: "Needs a person", title: "With approval", list: ["Resolving uncertain consent or eligibility", "Saving a changed plan version", "Authorizing a plan for execution", "Retrying an action whose outcome is unknown"] },
          { kicker: "Must never", title: "Hard limits", list: ["Treat unknown consent as permission", "Execute on a stale or unapproved version", "Answer follow-up questions without evidence to ground them", "Repeat an action that already completed"] },
        ] },
        { type: "cards", cols: 3, items: [
          { kicker: "Retention Manager", list: ["Set goals and run investigations", "Review opportunities and refine plans", "Request approval for a plan version", "Inspect evidence, plans and the audit log"] },
          { kicker: "Approver", list: ["Authorize or return a plan version", "Inspect evidence, plans and the audit log"] },
          { kicker: "Viewer", list: ["Inspect permitted items only"] },
        ] },
        { type: "text", eyebrow: "failure catalogue", heading: "Ten things that go wrong, designed before the happy path was finished", body: ["Each failure answers the same four questions in the interface: what happened, why, what is still safe, and what the user can do next. A failure that can't answer all four isn't designed yet."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Seam 2", title: "Missing evidence", lines: ["User sees which fact is missing, on the client record.", "Still safe: no conclusion is drawn from the gap.", "Next: held for review until the evidence arrives."] },
          { kicker: "Seam 2", title: "Conflicting evidence", lines: ["User sees both records, labelled Conflict, with their sources.", "Still safe: the AI never quietly chooses one.", "Next: a person resolves the conflict on the record."] },
          { kicker: "Seam 2", title: "Uncertain consent", lines: ["User sees “Held for review” in the plan status column.", "Still safe: the client is excluded from every audience.", "Next: human review before any outreach."] },
          { kicker: "Seam 1", title: "Invalid recommendation", lines: ["User sees the rule the plan breaks, at the field.", "Still safe: output is checked against business rules before display.", "Next: correct or revise it as a new version."] },
          { kicker: "Seam 3", title: "Restricted permissions", lines: ["User sees who can act, and how to hand off to them.", "Still safe: review, approval and execution are blocked for that role.", "Next: hand off to the right role."] },
          { kicker: "Seam 3", title: "Stale approval", lines: ["User sees that the approval belongs to an earlier version.", "Still safe: the changed plan cannot run on the old approval.", "Next: request approval for the new version."] },
          { kicker: "Seam 4", title: "Failed execution", lines: ["User sees exactly which actions failed.", "Still safe: completed actions are left alone.", "Next: a controlled retry of the failed actions only."] },
          { kicker: "Seam 4", title: "Unknown outcome", lines: ["User sees “Unknown”, not a guess of sent or failed.", "Still safe: no retry until the status is reconciled.", "Next: reconcile the status, then decide."] },
          { kicker: "Seam 1", title: "AI provider unavailable", lines: ["User sees “Grounded follow-ups are not available”, with the reason.", "Still safe: no made-up answers to fill the gap.", "Next: work continues from verified findings."] },
          { kicker: "Seam 4", title: "Duplicate action", lines: ["User sees completed actions marked as skipped on retry.", "Still safe: execution safeguards stop repeat sends.", "Next: nothing to do. The record shows why."] },
        ] },
        { type: "text", eyebrow: "recovery · seam 4", heading: "Ten sends. Eight complete, one failed, one unknown. Now what?", body: ["This is the run from the prototype's verification journey. The tempting design is a single “Retry” that sends to anyone not marked complete. That would resend to the unknown client, who may already have received the email. Northstar treats the three outcomes differently."] },
        { type: "cards", cols: 3, items: [
          { n: "01", kicker: "Outcomes reported", title: "Keep three states, not two", lines: ["8 completed, 1 failed, 1 unknown. “Unknown” is shown as it is. Showing it as failed invites a duplicate send. Showing it as sent hides a possible gap."] },
          { n: "02", kicker: "Reconcile", title: "Resolve the unknown first", lines: ["The unknown action's status is reconciled with the execution record before it can be retried."] },
          { n: "03", kicker: "Controlled retry", title: "Retry only what failed", lines: ["Safeguards on each action skip the eight completed sends. The retry covers only the failure, and the log records why each action was skipped."] },
        ] },
        { type: "text", body: ["Verified in the prototype: retrying did not duplicate the successful actions. The run used synthetic data and a simulated execution channel."] },
        { type: "text", eyebrow: "approval · staleness", heading: "An approval is a promise about one version. Edits break it, on purpose", body: ["Plan v1 is drafted: the AI proposes 10 verified clients. The approver authorizes v1, by number. Then the manager excludes a client, and v1's approval no longer describes what would run. Plan v2 is a new version, impact is reviewed again and v1 stays in history, unchanged. Only an approval of v2 can release v2.", "In the build, a plan that is awaiting approval can't be refined. The request must be withdrawn first, so nobody can change a plan while someone else is reviewing it."] },
        { type: "text", eyebrow: "trade-offs", heading: "Every safety rule costs some speed. These are the trades I chose", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Chose", title: "Outcome-first workspace", lines: ["Over module navigation: contacts, deals, reports.", "Cost: less familiar to people used to classic CRMs, who expect a module menu."] },
          { kicker: "Chose", title: "Evidence before recommendation", lines: ["Over a confident one-line answer.", "Cost: more to read before acting. Every number links to its source to keep that short."] },
          { kicker: "Chose", title: "Visible uncertainty", lines: ["Over a cleaner list that hides 14 open questions.", "Cost: the product looks less finished. That's accurate, so it stays."] },
          { kicker: "Chose", title: "Exact-version approval", lines: ["Over approving “the campaign”.", "Cost: small edits need re-approval. Impact review makes each one quick to judge."] },
          { kicker: "Chose", title: "Disabled follow-ups when ungrounded", lines: ["Over a chat box that always answers.", "Cost: the feature can look missing. The disabled state explains why."] },
          { kicker: "Chose", title: "Persistent decision threads", lines: ["Over disposable AI conversations.", "Cost: more structure to model, but findings, plans and approvals stay linked to their investigation."] },
          { kicker: "Chose", title: "Bounded execution", lines: ["Over end-to-end automation.", "Cost: slower than a fully automated send, and more explainable when something goes wrong."] },
        ] },
      ],
    },
    build: {
      intro: nsIntro,
      blocks: [
        { type: "text", eyebrow: "the implementation", heading: "The safety rules are in the system, not only in the UI", display: true, body: ["A disabled button is not a control. The rules from the Think section (versioning, approval scope, role checks, idempotent retries) are enforced below the interface, and the interface reflects them."] },
        { type: "text", eyebrow: "architecture", heading: "The AI provider sits behind a boundary. Nothing it returns is trusted by default", body: [] },
        { type: "cards", cols: 3, items: [
          { kicker: "Layer 1", title: "Interface", list: ["Workspace", "Investigation", "Opportunities", "Plan refinement", "Campaigns", "Activity"], lines: ["Requests carry the user's role."] },
          { kicker: "Layer 2", title: "Application", list: ["Permission checks", "Validation", "State persistence"] },
          { kicker: "Layer 3", title: "Domain services", list: ["Investigation", "Planning and versioning", "Approval (exact version)", "Execution (safe retries)", "Audit log, written by every service"] },
          { kicker: "Boundary", title: "AI provider", list: ["Structured responses only", "Checked against business rules", "Unavailable: follow-ups disabled"] },
          { kicker: "Layer 4", title: "Data and channels", list: ["Synthetic CRM records", "Simulated execution channel"] },
        ] },
        { type: "text", eyebrow: "mechanisms", heading: "How the rules hold", body: [] },
        { type: "cards", cols: 3, items: [
          { title: "Plan versioning", lines: ["Plans are never edited in place. A refinement writes version n+1 that records which version it came from. History is append-only."] },
          { title: "Exact-version approval", lines: ["An approval stores the version it covers. Execution only runs the version that was approved, so a newer version needs its own approval."] },
          { title: "Structured AI output", lines: ["The model returns structured data, not prose. Each response is checked against business rules before the user sees it, and fixed or rejected if it fails."] },
          { title: "Safe retries", lines: ["Execution safeguards track each action, so a retry skips the ones that already completed. Unknown outcomes are reconciled before they can be retried."] },
          { title: "Role permissions", lines: ["Restricted roles can't review, approve or execute. The check guards the action itself, so hiding a button is never the only safeguard."] },
          { title: "Audit log", lines: ["Every service writes events with a plain-language summary and a technical record. People and tools read the same history."] },
        ] },
        { type: "text", eyebrow: "front end", heading: "A front end rebuilt to match the Figma, with every state addressable by link", body: ["The Figma file was rebuilt as a React and TypeScript front end. Colour, type and spacing tokens were taken directly from the file. Filters, sorting, open drawers and the selected plan version all live in the URL, so any state can be shared, reloaded or opened from a link in the Activity log. Animations respect the reduced-motion setting, and drawers trap focus and return it on close."] },
        { type: "cards", cols: 2, items: [
          { n: "13", title: "Unit and component tests", lines: ["Audience rules, next-decision logic, goal validation."] },
          { n: "10/10", title: "Journey steps passed", lines: ["In the automated test that walks the whole journey."] },
          { n: "0", title: "WCAG 2.1 AA violations", lines: ["In an axe scan of 9 screens and drawers."] },
          { n: "3", title: "Widths checked", lines: ["375, 768 and 1440px, with no horizontal scrolling."] },
        ] },
        { type: "text", eyebrow: "validation", heading: "What the end-to-end prototype run verified", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Fresh Start run", list: ["First-time workspace and goal creation", "Investigation and supporting evidence review", "Uncertainty resolution", "Plan revision and impact preview", "Handoff to the approver and approval of the exact version", "Controlled, simulated execution", "Recovery from failed operations", "Returning workspace with investigation history"] },
          { kicker: "Results", list: ["11 clients initially eligible", "14 to 13 uncertain records after one resolution", "10 clients in the revised target audience", "8 completed, 1 failed, 1 unknown execution outcomes", "0 duplicated actions after retry"] },
        ] },
        { type: "text", body: ["Prototype verification on synthetic data. These numbers confirm the system behaved correctly. They are not customer results or business impact."] },
      ],
    },
  },
};

caseStudies.push(clientlens, activepieces, northstar);

export const tabLabels: Record<TabKey, string> = { design: "Design", think: "Think", build: "Build" };
export const tabOrder: TabKey[] = ["design", "think", "build"];
export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
