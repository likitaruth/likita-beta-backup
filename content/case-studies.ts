/**
 * Case-study content for the portfolio. Each study is written from its published artifact; see the FLAGS above each entry.
 */
export type TabKey = "design" | "think" | "build";

export type Block =
  | { type: "text"; eyebrow?: string; heading?: string; body: string[]; size?: 18 | 21; display?: boolean }
  | { type: "image"; alt: string; ratio: number; width?: number; src?: string; tone?: "photo" | "cut" | "dark" | "flow" | "screen" | "mockup" }
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
  heroTone?: "photo" | "screen" | "mockup";
  /** Up to three label/value pairs shown under the hero (Figma: Role / Focus / Year). */
  meta: [string, string][];
  reflection?: { eyebrow: string; heading: string; body: string[]; pull: string };
  tabs: Partial<Record<TabKey, Tab>>;
};

/*
 * CRM Agent — copy and structure from the published CRM Agent artifact (claude.ai/artifact/VVHt1zSBB8NHJCRxyCHf91).
 * Screens are the eight exports bundled with that artifact, in /public/assets/case/crm-agent. The hero and the three
 * "pair" images are those panels placed side by side, with each panel's bottom edge extended so the pair share a height.
 * FLAGS:
 *  1. The artifact marks several details as assumptions to verify before sharing (team, 16-week timeline, pilot size and
 *     metrics, 2–5 s latency, security rollout request, page context in v1.1, 1-in-3 unsupported first messages). They are
 *     reproduced as written; check them before publishing.
 *  2. The artifact's numbered annotation pins are folded into the copy (the image block has no overlay). The decision
 *     sequence, status vocabulary, iterations, ownership split, trade-offs, architecture and skill contract are expressed
 *     as cards, since the shared blocks have no diagram/table/code type. The "context in action" conversation was an HTML
 *     illustration in the artifact (not a screenshot) and is written out as cards.
 *  3. Problem and Constraints open the Think tab, Outcomes closes the Build tab, and "What didn't work / What's next" plus
 *     the closing line become the Reflection block.
 */
const CR = "/assets/case/crm-agent";
// Screens are delivered as browser / iPhone mockups on a 1.6 canvas; the original ratio/width args are kept at call sites but no longer used.
const cr = (file: string, alt: string, _ratio?: number, _width?: number): Block => ({ type: "image", src: `${CR}/mock/${file}.webp`, tone: "mockup", alt, ratio: 1.6 });
const crIntro: Tab["intro"] = {
  eyebrow: "the problem",
  heading: "The request was a chatbot. The real problem was trust.",
  body: [
    "The brief asked for an in-CRM chatbot that could create leads, add tags, reset passwords and run batch updates. A chatbot that talks is easy to build. The hard part is making sure it finds the right record, respects permissions, recovers when something fails, and shows the user what will change before it changes. In a CRM, a wrong tag on the wrong “Manar Alshami” is a real mistake with a real client.",
  ],
};
const crmAgent: CaseStudy = {
  slug: "crm-agent",
  title: "Chat is the easy part",
  lede: [
    "The product is everything between “add a tag” and the CRM actually changing.",
    "CRM Agent is a conversational action layer inside Teamforce CRM. Agents search, ask and run common CRM tasks in plain language.",
  ],
  heroAlt: "The CRM Assistant open full width over the Monetary transactions page of Teamforce CRM, asking What would you like to do? with four popular actions and a message box, on an angled MacBook Pro against a dark gradient",
  heroSrc: `${CR}/mock/hero.webp`,
  heroRatio: 1.6,
  heroMax: 1068,
  heroTone: "mockup",
  meta: [["Role", "UX/Product designer and builder: the experience, the skill model and the front-end prototype. Team: 1 PM, 2 back-end engineers, 1 ML engineer, with security review"], ["Focus", "Enterprise AI / Conversational UX / Product design & build"], ["Shipped", "MVP to two sales desks, then all Teamforce desks, over 16 weeks"]],
  reflection: {
    eyebrow: "honest read",
    heading: "What didn't work, and what's next",
    body: [
      "@ mentions felt slow for power users until page context arrived. Batch operations needed a better review: a list of 40 records doesn't fit a chat card. “Summarize view” was popular, but useful only once page context shipped.",
      "Next: a batch review table that opens beside the chat for large changes. Saved skills for each desk's most repeated requests. And an audit view in the assistant: “what did I change today?”",
    ],
    pull: "Responsibility is shared between the model, the application and the person approving. The design makes each one's part visible.",
  },
  tabs: {
    design: {
      intro: crIntro,
      blocks: [
        { type: "text", eyebrow: "the experience", heading: "Every state tells the user where the request is, and who it's waiting on.", body: ["A request moves through a visible sequence: understand, resolve, validate, check access, review, approve, execute. The status under “CRM Assistant” changes at each step, so the user always knows whether the assistant is working or waiting for them."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Shipped", list: ["Assistant panel inside the CRM", "Five skill groups, from search to restricted account operations", "Review-before-change, undo and permission recovery"] },
          { kicker: "I owned", list: ["Reframing a chatbot into a command layer", "The skill contract and execution sequence", "Every state of the assistant, and the front-end build"] },
          { kicker: "Team decisions", list: ["No page context in the first release (engineering)", "CRM stays the system of record (architecture)", "Which operations count as restricted (security)"] },
          { kicker: "Measured", list: ["Tagging time 74 s → 19 s", "0 wrong-record updates in the pilot", "58% weekly use on pilot desks"] },
        ] },
        { type: "text", eyebrow: "entry · smart empty state", heading: "Replace “How can I help?” with what it can actually do.", body: [
          "An open prompt invites requests the assistant can't handle, and every failed first attempt costs trust. The empty state lists the skills it supports as tappable starters: Create a lead, Tag selected leads, Find a record, Summarize view.",
          "The subtitle sets the contract before the first message: “You'll review all changes before they're applied.” The same line sits under the composer for the whole conversation.",
        ] },
        cr("entry", "Full desktop CRM view of Monetary transactions with the CRM Assistant open at the side: How can I help you today? A short explanation that all changes are reviewed, four popular actions (Create a lead, Tag selected leads, Find a record, Summarize view), and a note that changes are applied only after approval"),
        { type: "text", body: ["Status is always visible in the header. Supported skills are the starting points. The approval promise sits under every message."] },
        { type: "text", eyebrow: "understand · resolve & validate", heading: "Never guess which record. Ask, with the details that tell them apart.", body: [
          "The assistant pulls the intent and the details already given (“Warm lead”, “Manar Alshami”), then searches only records the user is allowed to see. Two matches share a name and an email, so the assistant shows both with their lead IDs and waits. Search again is there if neither is right.",
          "Once the user chooses, the assistant restates the selection and checks the tag and the user's permission before preparing anything. It asks only for what's missing or unclear.",
        ] },
        cr("request", "Desktop CRM view with the CRM Assistant open: the user asks to add the Warm lead tag to Manar Alshami, the header reads Thinking, and a Searching CRM records progress card is shown"),
        cr("resolve", "Desktop CRM view with the CRM Assistant open: two Manar Alshami leads with IDs LD-1042 and LD-1187, a Needs your choice status and a Search again button"),
        { type: "text", body: ["Request: “Thinking…” in the header, and what it's searching for, named. Resolve: “Needs your choice” tells the user the assistant is waiting for them. The lead ID is the deciding detail, and there is a way out."] },
        { type: "text", eyebrow: "approve · review", heading: "The user sees the exact change before anything runs.", body: [
          "Review change works like a receipt before paying: Will change (lead with ID, tag), then Impact (“The tag will be added”, “This lead does not already have this tag”). The duplicate check prevents a no-op that would still clutter the audit log. Nothing runs until Add tag is clicked.",
        ] },
        cr("validate", "Desktop CRM view with the CRM Assistant open: a You selected card for Manar Alshami LD-1042 with an Add tag Warm lead line and a Validating tag and permissions progress card"),
        cr("review", "Desktop CRM view with the CRM Assistant open: a Review change card showing the lead, the tag, the impact checks and Cancel and Add tag buttons"),
        { type: "text", body: ["Validate: the choice is restated with its ID, and permission is checked before the review, not after. Review: what will change, the checks already run, and approval as one explicit click."] },
        { type: "text", eyebrow: "execute · complete", heading: "An honest result, with undo first.", body: [
          "Progress is real, with a percentage and “Please don't close this panel.” The result card offers Undo, Open lead and Add another: reverse it, verify it, or keep going.",
        ] },
        cr("progress", "Desktop CRM view with the CRM Assistant open: an Updating CRM progress bar at 80 percent with Please don't close this panel"),
        cr("done", "Desktop CRM view with the CRM Assistant open: Tag added successfully, with Undo, Open lead and Add another buttons"),
        { type: "text", body: ["Execute: “Adding tag” names the action, and progress matches the work. Complete: stated plainly, with Undo as the first option offered."] },
        { type: "text", eyebrow: "recover · denied state", heading: "A permission error that tells you what to do next.", body: [
          "The status reads Incomplete, because the request is unfinished, not broken. The card explains why in plain language and offers What you can do: request update permission, or choose a different lead.",
          "The assistant never retries with elevated access and never hints at a workaround. The same rule holds for every failure: say what happened, say what's still safe, and offer a next step.",
        ] },
        cr("denied", "Desktop CRM view with the CRM Assistant open: Couldn't complete the change. You don't have permission to update this lead. What you can do: Request update permission, Choose a different lead"),
        { type: "text", eyebrow: "context awareness", heading: "What the assistant knows, and how it shows its work.", body: [
          "The assistant answers from layers of context, and each layer has a rule. The guiding principle: context can fill in a blank, but it can never pick a record or approve a change on its own. Anything the assistant infers appears on screen for the user to confirm.",
        ] },
        { type: "cards", cols: 2, items: [
          { kicker: "Account", title: "Role, permissions, business unit and desk", lines: ["Limits what search returns and which skills are offered. Checked again before every review."] },
          { kicker: "Record", title: "The resolved record's current data", lines: ["Tags, owner, status. Drives the impact checks, e.g. “This lead does not already have this tag.”"] },
          { kicker: "Conversation", title: "Earlier turns in this session", lines: ["Records already chosen, tags already used. Resolves follow-ups like “the same tag” or “her”, and powers Add another."] },
          { kicker: "Page · v1.1", title: "Current module and selected rows", lines: ["Once the CRM exposed them. Ranks “Popular actions on this page” and pre-fills “Tag selected leads”. It's shown as a chip the user can remove, never applied silently."] },
        ] },
        { type: "text", body: ["Why page context came later: the first release couldn't read page state, so it relied on explicit @ mentions. Page context shipped in v1.1 as visible, removable chips, so the same “explicit scope” rule still applied."] },
        { type: "text", eyebrow: "example · context in action", heading: "A follow-up request, resolved from context and shown for review.", body: ["After tagging Manar, the agent types a short follow-up. The assistant fills the gaps from context and shows which context it used, so the user can check it before approving. This is an illustrative conversation built for this case study, not a screenshot."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Agent", title: "“Add the same tag to Omar too”", lines: ["The assistant replies: “Using Warm lead from earlier. I found one Omar you can update.” Context used: tag from this chat, Omar → 1 match in your unit, leads.update ✓."] },
          { kicker: "Review change", title: "Lead Omar Haddad (LD-2210) · Tag Warm lead", lines: ["✓ Omar doesn't have this tag yet. Cancel / Add tag. Changes are applied only after your approval."] },
          { kicker: "Conversation context", lines: ["“The same tag” is resolved from the previous turn and named back to the user, not assumed silently."] },
          { kicker: "Account context", lines: ["The search is limited to records in the agent's business unit. Exactly one match, so no choice is needed. Two matches would bring back the “Needs your choice” step."] },
          { kicker: "Permission context", lines: ["Checked before the review appears, so the user never approves something that will fail."] },
          { kicker: "Record context · still the user's call", lines: ["Omar's current tags power the impact check. Context shortened the conversation from four turns to one. It didn't remove the review."] },
        ] },
      ],
    },
    think: {
      intro: crIntro,
      blocks: [
        { type: "text", eyebrow: "before / after", heading: "Small tasks, many screens. Now one sentence, one review, one click.", body: ["Changing CRM data used to mean hunting across screens with no safety net."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Without the agent", title: "Small tasks, many screens.", list: ["Open Leads, search by name (agent)", "Guess which of two same-name records is right (risk)", "Open the record, find the tags field (agent)", "Hit a permission error with no next step (dead end)", "No easy way to undo a wrong change (irreversible)"], lines: ["A single tag took six clicks across three screens."] },
          { kicker: "With CRM Agent", title: "One sentence, one review, one click.", list: ["Type “Add the Warm lead tag to Manar Alshami” (agent)", "Find matching records the agent may see (AI)", "Ask which one when names collide (clarify)", "Show exactly what will change, then wait (approve)", "Execute, report truthfully, offer undo (system)"], lines: ["The model interprets. The CRM decides what's allowed. The person approves."] },
        ] },
        { type: "pull", heading: "Design challenge", text: "How might we let agents change CRM data in plain language, without ever changing the wrong record, skipping a permission or hiding what happened?" },
        { type: "text", eyebrow: "constraints", heading: "Designed for what the system could actually guarantee.", body: ["The biggest constraint reshaped the product: the first release couldn't see what the user was looking at. Every other decision followed from being honest about that."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Technical limit", title: "No page context in the first release", lines: ["The assistant couldn't read the current module, filters, selected rows or business unit. Assuming them would mean guessing.", "Design response: context chips were dropped. Every record is named explicitly with @ mentions, and shortcuts became universal skills."] },
          { kicker: "Data", title: "Duplicate names everywhere", lines: ["Brokerage CRMs hold many records with the same name, sometimes the same email, across business units.", "Design response: the assistant never picks. With more than one match it shows each record with its lead ID and asks the user to choose."] },
          { kicker: "Security", title: "Permissions can't be bypassed by chat", lines: ["A chat box is a new door into the CRM. It must not let anyone do what the normal UI wouldn't.", "Design response: search only returns records the user can see. Every skill names its permission, and access is checked before the review step."] },
          { kicker: "Architecture", title: "The CRM is the system of record", lines: ["The model can't write to the database. Only existing CRM APIs can.", "Design response: skills map to CRM operations. The model fills in a structured request, and the application executes it."] },
          { kicker: "Technical limit", title: "Model latency", lines: ["Understanding and resolving a request took 2–5 seconds. Silence for that long feels broken.", "Design response: truthful progress. Each stage (searching, validating, updating) is named while it runs."] },
          { kicker: "Business priority", title: "Start safe, then expand", lines: ["Leadership wanted batch operations and password resets. Security asked for a slower rollout.", "Design response: the MVP launched with low-risk skills first. Restricted operations need extra confirmation and carry a risk level."] },
        ] },
        { type: "text", eyebrow: "principles", heading: "The rules every screen had to follow.", body: [] },
        { type: "cards", cols: 3, items: [
          { n: "01", title: "Explicit scope", lines: ["Name the record. Don't assume context the system can't see."] },
          { n: "02", title: "Structured execution", lines: ["Skills with contracts, not free-form automation."] },
          { n: "03", title: "Review first", lines: ["No change happens without seeing it first."] },
          { n: "04", title: "Truthful status", lines: ["Say what's happening, including “Incomplete”."] },
          { n: "05", title: "Built-in recovery", lines: ["Undo and next steps are part of the flow, not an afterthought."] },
        ] },
        { type: "text", eyebrow: "sequence · execution model", heading: "Seven steps, each visible, two of them owned by the user.", body: [
          "Understand → Resolve → Validate → Check access → Review → Approve → Execute. Review and Approve belong to the user.",
          "The header status is one vocabulary for the whole system: Available, Thinking…, Needs your choice, Review details, Ready for your review, Adding tag, Complete, Incomplete. Blue means the user's turn or active work, amber means waiting or unfinished, green means done.",
        ] },
        { type: "text", eyebrow: "iterations · three shifts", heading: "Three shifts that shaped the shipped product.", body: [] },
        { type: "cards", cols: 3, items: [
          { n: "Shift 1", title: "Chatbot → command layer", lines: ["The first concept answered anything and acted on anything.", "What we learned: free-form actions couldn't be validated or audited. Skills with contracts could."] },
          { n: "Shift 2", title: "Assumed context → explicit scope", lines: ["Early designs showed automatic context chips (“on: Leads, 3 selected”).", "What we learned: the first release couldn't read page state, so chips were dropped and @ mentions became the source of truth."] },
          { n: "Shift 3 · shipped", title: "Open prompt → skills", lines: ["“How can I help?” on an empty panel.", "What we learned: in pilot logs, 1 in 3 first messages asked for something unsupported. Listing skills fixed that."] },
        ] },
        { type: "text", eyebrow: "ownership · mine vs ours", heading: "Which decisions I made, and which ones the team made.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Decisions I owned", title: "Reframe to a command layer", lines: ["I moved the brief from “a chatbot” to structured operations people could review."] },
          { kicker: "Decisions I owned", title: "The skill contract shape", lines: ["Inputs, permission, confirmation, undo and risk for each skill, written with engineering."] },
          { kicker: "Decisions I owned", title: "Review card and impact checks", lines: ["What will change, and what's already been verified."] },
          { kicker: "Decisions I owned", title: "Status vocabulary and recovery states", lines: ["Every header state, plus “Incomplete” with next steps."] },
          { kicker: "Decisions I owned", title: "Front-end build", lines: ["I built the assistant panel and its states as a working prototype."] },
          { kicker: "Engineering", title: "No page context in v1", lines: ["The CRM didn't expose page state yet."] },
          { kicker: "Security", title: "Restricted operations list", lines: ["Password resets and batch updates need extra confirmation."] },
          { kicker: "PM", title: "Rollout order", lines: ["Two pilot desks first."] },
          { kicker: "ML engineer", title: "Model and prompt setup", lines: ["Intent and field extraction."] },
        ] },
        { type: "text", eyebrow: "trade-offs · what it cost", heading: "Safety over speed, on purpose.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Chose", title: "Review every change", lines: ["Over: one-shot execution.", "Cost: one extra click per task, in return for zero silent mistakes."] },
          { kicker: "Chose", title: "Ask on duplicates", lines: ["Over: picking the most likely match.", "Cost: an extra turn when names collide."] },
          { kicker: "Chose", title: "Explicit @ mentions", lines: ["Over: inferring from the page.", "Cost: more typing until page context arrived."] },
          { kicker: "Chose", title: "A small set of skills", lines: ["Over: an assistant that tries anything.", "Cost: some requests get “not supported yet”, but nothing fails silently."] },
        ] },
      ],
    },
    build: {
      intro: crIntro,
      blocks: [
        { type: "text", eyebrow: "system · architecture", heading: "The model interprets. The contract decides. The CRM executes.", body: ["Conversation, orchestration, permissions and execution are kept separate."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Conversation", list: ["Assistant panel", "@ mention search", "Review & result cards"], lines: ["User message plus explicit entities go down to the model."] },
          { kicker: "Model", list: ["Intent", "Field extraction", "Asks only for missing details"], lines: ["Returns a structured request."] },
          { kicker: "Orchestration", list: ["Skill registry", "Validation", "Confirmation rules", "Context layers"] },
          { kicker: "Permissions", list: ["Per-skill permission check", "Visible-records-only search"], lines: ["Nothing runs until the user approves."] },
          { kicker: "CRM execution", list: ["Existing CRM APIs", "Audit log", "Undo"] },
        ] },
        { type: "text", eyebrow: "contract · skill registry", heading: "Every skill declares what it needs before the model can use it.", body: ["The MVP covered five skill groups: query data, find and summarize records, create records, manage tags and supported fields, and restricted account operations. Each registers its entity types, required inputs, permission, confirmation rules, bulk and undo support, and risk level."] },
        { type: "cards", cols: 2, items: [
          { kicker: "skill: lead.tag.add · the contract behind the screens above", title: "One contract drives the whole flow", list: ["entities: lead", "inputs: recordIds (required), tagId (required)", "permission: leads.update", "confirmation: always", "bulk: true", "undo: true", "risk: low"] },
        ] },
        { type: "text", eyebrow: "delivery · collaboration", heading: "Designed and built alongside engineering.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Weeks 1–4", title: "Contract first", lines: ["The skill schema was agreed with back-end before any UI, so every screen field had a source."] },
          { kicker: "Weeks 5–9", title: "States as code", lines: ["I built the panel and all its states in the front end, so engineering integrated real components rather than mockups."] },
          { kicker: "Weeks 10–13", title: "Pilot", lines: ["Two sales desks, 31 agents, low-risk skills only, with weekly log reviews."] },
          { kicker: "Weeks 14–16", title: "Expand", lines: ["Restricted skills added behind extra confirmation, then rolled out to all desks."] },
        ] },
        { type: "text", eyebrow: "outcomes", heading: "Measured on adoption, speed, reliability and trust.", body: ["Pilot of 6 weeks on two desks, then 8 weeks after full rollout."] },
        { type: "cards", cols: 2, items: [
          { n: "58%", title: "Adoption", lines: ["Pilot agents using the assistant weekly. 64% of tasks started from a skill starter, not free text."] },
          { n: "74 → 19 s", title: "Efficiency", lines: ["Median time to tag a lead, at 1.8 turns per task."] },
          { n: "0", title: "Reliability", lines: ["Updates to the wrong record. 96% of approved changes completed in full."] },
          { n: "7%", title: "Trust", lines: ["Reviews cancelled or edited, a sign people read the card rather than click through. Undo was used 1.2% of the time."] },
        ] },
      ],
    },
  },
};

export const caseStudies: CaseStudy[] = [crmAgent];

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
// Screens are delivered as MacBook mockups on a 1.6 canvas; the original ratio/width args are kept at call sites but no longer used.
const cl = (file: string, alt: string, _ratio?: number, _width?: number): Block => ({ type: "image", src: `${CL}/mock/${file}.webp`, tone: "mockup", alt, ratio: 1.6 });
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
  heroSrc: `${CL}/mock/summary.webp`,
  heroRatio: 1.6,
  heroMax: 1068,
  heroTone: "mockup",
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
const ns = (file: string, alt: string, ratio = 1.6): Block => ({ type: "image", src: `${NS}/mock/${file}.webp`, tone: "mockup", alt, ratio });
const northstar: CaseStudy = {
  slug: "northstar",
  title: "An AI-native CRM that shows its uncertainty",
  lede: "Northstar is a working prototype of a goal-driven CRM for retention teams. I designed the journey from a stated goal to an audited action, then built it end to end as a React and TypeScript front end on synthetic data: 7 flows, 3 roles and 10 designed failure scenarios.",
  heroAlt: "Northstar investigation summary: 11 eligible clients, 14 needing review, a draft audience of 10, a recommended strategy marked Draft, and a Next decision panel",
  heroSrc: `${NS}/mock/summary.webp`,
  heroRatio: 1.6,
  heroMax: 1068,
  heroTone: "mockup",
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
        { type: "image", src: `${NS}/mock/phones.webp`, tone: "mockup", alt: "Two phones: the investigation summary awaiting approval, and opportunities filtered to records that need review, shown as cards", ratio: 1.6 },
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
