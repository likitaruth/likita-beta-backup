/**
 * Case-study content for the portfolio. Each study is written from its published artifact; see the FLAGS above each entry.
 */
export type TabKey = "design" | "think" | "build";

export type Block =
  | { type: "text"; eyebrow?: string; heading?: string; body: string[]; size?: 18 | 21; display?: boolean }
  | { type: "image"; alt: string; ratio: number; width?: number; src?: string; tone?: "photo" | "cut" | "dark" | "flow" | "screen" | "mockup" }
  | { type: "cards"; cols: 2 | 3; items: { n?: string; kicker?: string; title?: string; lines?: string[]; list?: string[] }[] }
  | { type: "video"; src: string; poster: string; alt: string; ratio: number; width?: number }
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
  heroAlt: "The CRM Assistant open full width over the Monetary transactions page of Teamforce CRM, asking What would you like to do? with four popular actions and a message box, in a browser window on a teal backdrop",
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
  heading: "Same tags but different strategies",
  body: [
    "John and Lisa have the same tags: VIP, Gold Trader and Micro Account. However, John is an active client worth $8,400, whereas Lisa is a churned client worth $400. In the CRM they appeared identical, so both were targeted with the same deposit bonus campaign. For churned clients, this was the most common reason for compliance issues. The tags show what type of client someone was at sign-up, not how they behave now.",
    "ClientLens shows a comparison and gives the reasons. The agent makes the decision. This makes comparisons clear, and gives clarity and auditability.",
  ],
};
const clientlens: CaseStudy = {
  slug: "clientlens",
  title: "When is the client a bad match?",
  lede: [
    "ClientLens, an AI feature within TeamForce CRM, lets agents easily identify lookalike clients. It also shows them when a client is a poor match.",
    "Retention agents were sending the wrong campaigns to clients with similar tags.",
  ],
  heroAlt: "ClientLens Intelligence Summary comparing John Doe (Active, LTV $8,400) with Lisa Doe (Churned, LTV $400): 29% match score, low similarity, 87% confidence, a recommendation not to treat them the same, similarity and difference cards, recommended actions, and a business impact panel",
  heroSrc: `${CL}/mock/summary.webp`,
  heroRatio: 1.6,
  heroMax: 1068,
  heroTone: "mockup",
  meta: [["Role", "Lead product designer"], ["Focus", "AI product design / Systems / Delivery"], ["Shipped", "Inside the existing lead record, CRM v1.84"]],
  reflection: {
    eyebrow: "looking back",
    heading: "Lessons learned and next steps",
    body: [
      "The radar is under-used: only 22% of comparisons opened it, because most agents used the summary. It's useful as evidence, but it shouldn't be the primary view.",
      "Overnight scores caused some confusion. Clients who deposited in the morning were still marked as churned. The compare date helped, but it wasn't a complete fix.",
      "Leads imported with little data got vague conclusions. The coverage on the record made the reason clear, but it didn't resolve the issue.",
      "Next steps: a deep dive by category (cut from v1) for retention leads auditing strategies. Rescoring during the day for clients with new deposits or tickets, so the most pressing cases aren't a day old. A feedback loop that logs which action was taken on a recommendation and what the outcome was, so confidence comes from outcomes, not just coverage. And a Disagree option on each conclusion, logged as labelled examples to improve the model.",
    ],
    pull: "Similar isn't the same. ClientLens shows agents the difference before they act on it.",
  },
  tabs: {
    design: {
      intro: clIntro,
      blocks: [
        { type: "text", eyebrow: "the experience", heading: "Confident decision making", body: ["Lead → Similar leads → Select → Intelligence Summary → Radar Preview. At each stage of this flow, every AI decision on screen comes with its reasoning and level of confidence."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Shipped", list: ["Ranking of similar leads", "An AI summary for each similar lead", "Comparing pairs of leads with Intelligence Summary and Radar Preview"] },
          { kicker: "I owned", list: ["The verdict", "Separating confidence from similarity", "Insight cards and the Do not recommend pattern"] },
          { kicker: "Team decisions", list: ["Not real time: nightly batch processing (engineering)", "8 categories (feature model)", "Hashed identities (compliance)"] },
          { kicker: "Measured", list: ["5 of 7 pilot agents used it weekly", "Segment build time down from 38 to 9 min", "41% fewer incorrectly targeted promotions"] },
        ] },
        { type: "cards", cols: 2, items: [
          { n: "1", kicker: "Intelligence Summary", title: "Verdict", lines: ["Can we apply the same strategy to both clients?"] },
          { n: "2", kicker: "Intelligence Summary", title: "Confidence", lines: ["These two customers have a similarity score of 29% and a confidence score of 87%. This means we can be very confident that they are very different."] },
          { n: "3", kicker: "Intelligence Summary", title: "Don't", lines: ["Do not apply the same strategy to these clients."] },
          { n: "4", kicker: "Intelligence Summary", title: "Cost", lines: ["This shows the negative effect on the campaign of putting these two customers in the same segment."] },
        ] },
        { type: "text", eyebrow: "entry · lead record", heading: "AI knowledge on the lead", body: [
          "Find Similar Leads sits next to Send push notification and Add to WhatsApp, in the action row agents use dozens of times a day. Nothing else on the record moved.",
          "Profile Data Coverage shows how complete the data is in each category, so the agent understands how much the AI knows about the lead. 6 of 16 data points means lower-quality matches, and the agent can see this before they click.",
        ] },
        cl("lead", "Lead record for Yılmaz Şahin with a Find Similar Leads button in the action row, KPI tiles, a Profile Data Coverage panel at 92% with Trading, Financial and Notes groups at 15 of 16, and a Trading detail panel showing call activity", 2000 / 909),
        { type: "text", body: ["The entry point sits in the action bar. Coverage is shown for each feature category, and clicking a category reveals the underlying data, such as number of calls, answer rate and best call time."] },
        { type: "text", heading: "AI information", body: [
          "This includes risk status, likelihood of re-deposit, likelihood of re-engagement and best channel. Below it is the reasoning, stating simply that clients of this type have had success with these actions.",
          "I put this before the list on purpose. In early sessions with 6 agents, users went straight to the best match and copied its strategy. Making them read the client information first reduced this.",
          "Risk has a colour, and probabilities are given in words and numbers, so the information is easy to understand. A “Medium” re-deposit probability is something an agent can act on. 0.47 isn't.",
        ] },
        cl("similar-anchor", "Anchor lead panel for John Doe: High Churn Risk, Medium redeposit chance, 76% re-engagement outreach, best channel Telegram, and a note explaining that similar clients had positive outcomes with these actions", 1562 / 2715, 360),
        { type: "text", body: ["Risk comes first, then the channel to use, then why ClientLens believes it."] },
        cl("similar", "Similar Leads list with 1,200 results, a Medium (30%) threshold dropdown, a Run Comparison button, and rows each showing a checkbox, a 76% match ring, client tags, an AI summary of the risk profile, and View Profile and Compare buttons", 2000 / 1296),
        { type: "text", body: ["The match threshold is set to Medium (30%) by default. Match strength is shown by the ring and value. Each match has an AI summary that notes risk, in this case a warning that the client is similar to previously restricted users. The agent selects which matches to investigate and uses Run Comparison."] },
        { type: "text", heading: "Verdict, confidence, action", body: [
          "The comparison ends in a recommendation the agent can act on or refuse.",
          "The summary reads top to bottom like a decision. AI Summary gives the recommendation and its confidence. Similarities and Differences are scored by category, each labelled “Stronger driver”, “Significant difference” or “Completely different”. Recommended Actions are tagged by impact. Business Impact explains what goes wrong if the agent ignores the recommendation.",
          "I was very keen to include the Do not recommend category. Without it, top agents were suggesting adding the VIP playbook as an extra precaution. Naming specific campaigns that would be counterproductive (here: a VIP upgrade, a high-value campaign and deposit incentives) turned the suggestion into a safeguard.",
        ] },
        cl("summary-actions", "Recommended Actions panel: primary action, high impact, use John's CRM engagement patterns to re-engage Lisa; secondary action, medium impact, a targeted retention journey instead of trading incentives; and a Do not recommend list of VIP upgrade promotion, high-value trader campaign and deposit-based incentives", 1600 / 1855, 560),
        { type: "text", body: [
          "Actions with impact tags, and the Do not recommend list.",
          "Why actions? The first version created a segment and left agents to decide how to act on it. Agents read “treat them like John” as “act exactly like John”. Specifying actions based on how a client engages with the business, rather than their motivation, makes clear what transfers (communication style and timing) and what doesn't (deposit behaviour).",
          "Why impact tags? Retention managers in the pilot asked which comparisons to prioritise in a list of 40. High and medium impact tags gave them an order without an extra screen.",
        ] },
        { type: "text", heading: "Evidence layer", body: [
          "This view shows at a glance where clients are similar and where they differ. A 29% similarity means the clients were scored in 8 categories (trading, financial, CRM notes psychology, communication, risk, marketing, lead source and lifecycle) and compared with each other.",
          "Radar charts can be confusing, so the explanation sits on the screen rather than in a tooltip. How to read the radar compares the inner area, the outer area and the overlap, and What does this mean? turns the shape into a sentence.",
        ] },
        cl("radar", "Radar Preview tab: a radar chart comparing the active and churned client across eight categories, an Insights panel noting strong alignment in CRM psychology and communication habits, a What does this mean explanation, and a How to read the radar legend", 2000 / 1078),
        { type: "text", body: ["Two shapes, one overlap. Insights pick out the strongest alignment, a plain-language reading explains it, help is one click away, and a legend covers the three patterns that matter.", "Screens are from the shipped design. Client names and IDs are test data."] },
      ],
    },
    think: {
      intro: clIntro,
      blocks: [
        { type: "text", eyebrow: "before / after", heading: "The most important decision used to happen in the agent's head.", body: ["“Is this client like that one?” never touched the CRM. It was answered from memory, tags and a spreadsheet, and nobody could see how."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Before ClientLens", title: "Tags, exports and memory.", list: ["Open the lead record: 60+ fields across 7 panels (agent)", "Filter the leads list by tags and country (agent)", "Export to a spreadsheet and sort by deposits (agent)", "Guess which clients “behave like” a known good one (unrecorded)", "Apply the VIP playbook to the whole list (mis-targeted)"], lines: ["The judgment that mattered most left no trace."] },
          { kicker: "With ClientLens", title: "The CRM compares and shows its working.", list: ["Click Find Similar Leads on the record (agent)", "Rank lookalikes across 8 behaviour categories (AI)", "Read the lead's risk, re-deposit chance and best channel (AI)", "Compare a pair: verdict, confidence, do and don't (AI)", "Choose the action and log it on the record (agent)"], lines: ["The agent still decides. Now the comparison is explained and on record."] },
        ] },
        { type: "pull", heading: "Design challenge", text: "How might we help agents reuse what worked for one client on others, without letting surface similarity push them into the wrong strategy?" },
        { type: "text", eyebrow: "constraints", heading: "What I couldn't change, and what each limit forced.", body: ["ClientLens had to fit into a six-year-old lead record, use the existing component library, cope with data that was often incomplete, and live with scores that couldn't be computed on the fly. Each of these led to a specific decision."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Legacy system", title: "A crowded lead record we couldn't redesign", lines: ["The page carries Details, Advance Details, Device, Custom Fields, KYC, Marketing and Transactions, and three other teams own panels on it.", "So: one button in the existing action row, with results opening in the page's existing AI insight tab instead of a new page."] },
          { kicker: "Technical limit", title: "Scores are computed overnight", lines: ["Scoring every lead against roughly 1.4M records in real time was too expensive for the database cluster, so engineering moved it to a nightly batch.", "So: every comparison shows its compare date. Nothing pretends to be live, and agents can tell when a client changed after scoring."] },
          { kicker: "Technical limit", title: "Summaries were slow and expensive", lines: ["A written summary took 4–6 seconds per lead. Generating one for 1,200 matches on page load wasn't realistic.", "So: summaries are pre-generated for the top 50 matches and created on demand after that. The list never waits on the model."] },
          { kicker: "Data quality", title: "Many records were half empty", lines: ["Imported leads often had no trading history or notes. Unless you say otherwise, a match built on thin data looks as solid as one built on rich data.", "So: Profile Data Coverage (15 of 16 features, 92%) sits on the lead record, and every verdict shows its confidence."] },
          { kicker: "Compliance", title: "Agents can't browse other clients' details", lines: ["Lookalikes can belong to other desks and regions. Compliance ruled that matched clients only appear as hashed IDs unless the agent already has access to that record.", "So: match cards lead with the reasons for the match, not personal data, and View Profile follows existing permissions."] },
          { kicker: "Business priority", title: "A quarterly target and a fixed date", lines: ["The retention desks had a re-deposit target, and the feature had to land before the Q2 campaign season.", "So: we cut the per-category Deep Dive from v1 and shipped the decision path first: find, compare, act."] },
        ] },
        { type: "text", eyebrow: "iterations · v1 to v4", heading: "Four versions, each fixing how agents misused the last one.", body: ["None of these versions was wrong on paper. Each one failed in a specific way once agents used it, and the next version was a response to that."] },
        { type: "cards", cols: 2, items: [
          { n: "v1 · Badge", title: "A match % on the leads list", lines: ["One similarity number per lead, sorted high to low.", "What happened: in the first prototype test, 5 of 6 agents read 70%+ as “same client, same campaign”."] },
          { n: "v2 · Breakdown", title: "Scores per category", lines: ["The match split into categories, so a high overall score could reveal a 0% gap in trading behaviour.", "What happened: agents spotted the gap but still didn't know what to do differently. More information didn't produce a decision."] },
          { n: "v3 · Verdict", title: "A recommendation plus confidence", lines: ["A plain answer, share a strategy or don't, with confidence as its own number.", "What happened: engineering found that confidence tracked data coverage, which is why coverage moved onto the lead record."] },
          { n: "v4 · Shipped", title: "Actions, anti-actions and impact", lines: ["Primary and secondary actions, a Do not recommend list, business impact, and the radar as supporting evidence.", "What happened: compliance asked for the Do not recommend list after seeing deposit incentives offered to churned clients."] },
        ] },
        { type: "text", eyebrow: "model · two axes", heading: "Splitting one match score into similarity and confidence.", body: ["Early specs had a single match quality number. I argued for two: how alike two clients are, and how sure ClientLens is about that. John and Lisa made the case for me. A low match with high confidence is the most useful thing the system can say, because it stops a mistake. Folded into one number, it would look like a weak result and agents would scroll past it."] },
        { type: "cards", cols: 2, items: [
          { kicker: "High confidence · low similarity", title: "Don't share a strategy", lines: ["ClientLens is sure they differ, says so and names what not to do.", "John vs Lisa · 29% · 87%"] },
          { kicker: "High confidence · high similarity", title: "Reuse what worked", lines: ["The primary action carries over, with the channel and timing from the client who responded better.", "Typical top matches · 76%"] },
          { kicker: "Low confidence · low similarity", title: "Treat it as a hint", lines: ["Nothing is presented as certain. The screen points to the missing data instead."] },
          { kicker: "Low confidence · high similarity", title: "Looks alike, not proven", lines: ["The easiest case to over-trust. The confidence label is there to keep the agent careful."] },
        ] },
        { type: "text", eyebrow: "ownership · mine vs ours", heading: "What I decided, and what I designed around.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "My call", title: "Answer “should these share a strategy?”, not “how similar are they?”", lines: ["Reframing the brief changed the output from a ranked list into a verdict."] },
          { kicker: "My call", title: "Similarity and confidence as two numbers", lines: ["I took the John and Lisa case to the CTO and the PM as the argument."] },
          { kicker: "My call", title: "Do not recommend, styled like a recommendation", lines: ["Same weight as the positive actions, so nobody reads it as a footnote."] },
          { kicker: "My call", title: "Read the client before the list", lines: ["The anchor panel comes first to break the copy-the-top-match habit."] },
          { kicker: "My call", title: "One insight card for every AI claim", lines: ["One anatomy, built in the existing Ant Design library."] },
        ] },
        { type: "cards", cols: 2, items: [
          { kicker: "Engineering lead", title: "Nightly batch scoring", lines: ["Live scoring cost too much. My part was making the compare date visible."] },
          { kicker: "CTO, labels with me", title: "Eight categories, 16 features each", lines: ["The model was the CTO's. I named the categories with agents so the labels match how they talk."] },
          { kicker: "Compliance", title: "Hashed IDs for matched clients", lines: ["Required for privacy across desks. I designed the match card to work without personal data."] },
          { kicker: "PM", title: "Cutting Deep Dive from v1", lines: ["A scope call for the Q2 date. I argued for the radar as a lighter evidence view instead."] },
          { kicker: "CTO and me", title: "A 30% default threshold", lines: ["Picked from pilot data on which matches agents actually opened."] },
        ] },
        { type: "text", eyebrow: "working with the team", heading: "Who I worked with, and on what.", body: [
          "Day to day, I worked with the back-end lead on the insight contract, so every element on screen had a field to come from. With the CTO I shaped the eight scoring categories and their names. With compliance I worked through hashed IDs and the rules behind Do not recommend.",
        ] },
        { type: "text", eyebrow: "boundaries · AI vs agent", heading: "Where the AI stops and the agent takes over.", body: ["ClientLens can recommend. It never acts on a client."] },
        { type: "cards", cols: 2, items: [
          { kicker: "AI may do", title: "Without asking", list: ["Score lookalikes across categories", "Summarise a match in plain language", "Recommend and rank actions", "Flag a resemblance to restricted users"] },
          { kicker: "AI shows, with context", title: "Always qualified", list: ["Confidence beside every verdict", "A compare date on every score", "Data coverage for the source lead", "The reason behind each recommendation"] },
          { kicker: "Agent decides", title: "A person's call", list: ["Which matches to compare", "Whether to follow a recommendation", "Which campaign or journey to use", "Opening a profile, within existing permissions"] },
          { kicker: "Must never", title: "Hard limits", list: ["Enrol a client in a campaign automatically", "Change tags, status or VIP level", "Reveal personal data across desks", "Recommend deposit incentives to high-risk profiles"] },
        ] },
        { type: "text", eyebrow: "trade-offs · what it cost", heading: "What we gave up to ship on time.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Chose", title: "Overnight scores with a visible date", lines: ["Over: live scoring on every click.", "Cost: a client who deposits at noon looks unchanged until tomorrow. The date makes that visible, but it doesn't fix it."] },
          { kicker: "Chose", title: "The existing tab slot", lines: ["Over: a dedicated ClientLens page.", "Cost: less room for the comparison. We settled for a two-column layout that scrolls."] },
          { kicker: "Chose", title: "A verdict", lines: ["Over: neutral data and letting agents decide.", "Cost: when it's wrong, it's visibly wrong. Confidence and the radar keep it open to challenge."] },
          { kicker: "Chose", title: "The radar as evidence", lines: ["Over: the full per-category Deep Dive.", "Cost: less detail for power users. Deep Dive is on the roadmap."] },
          { kicker: "Chose", title: "Pre-generated summaries for the top 50", lines: ["Over: a summary for every match, every time.", "Cost: anything past the first 50 shows “Generating…” for a moment when opened."] },
        ] },
      ],
    },
    build: {
      intro: clIntro,
      blocks: [
        { type: "text", eyebrow: "system · pipeline", heading: "How a CRM event becomes a card on screen.", body: ["The screens sit on top of a pipeline. CRM events become features, features become scores, scores become structured claims, and claims become cards. I designed the card system and the data contract with the engineers who built them.", "Each layer answers one question, so any claim on screen can be traced back to where it came from."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Interface", list: ["Lead record · Find Similar Leads", "AI insight tab slot", "Intelligence Summary", "Radar Preview"], lines: ["Every request carries the agent's desk and permissions."] },
          { kicker: "Insight API", list: ["Permissions and masking", "Structured insight contract", "Feedback capture"] },
          { kicker: "AI boundary", list: ["Summaries written only from structured scores", "Rule check: no incentives to high-risk profiles", "Top 50 pre-generated, the rest on demand"] },
          { kicker: "Scoring", list: ["Similarity per category", "Confidence from coverage", "Risk resemblance", "Nightly batch · 02:00 UTC"] },
          { kicker: "Features", list: ["8 categories × 16 features", "Trading · financial · calls · notes · marketing · lifecycle · lead source · risk"] },
        ] },
        { type: "text", eyebrow: "components · insight card", heading: "Why every AI claim uses the same card.", body: ["Similarities, differences, actions and risk flags all share the same five parts. Agents learn to read the card once. Engineers built one Ant Design component with variants instead of six separate panels, and the next AI insight in the tab slot, the Fraud Risk Index, picked up the same pattern."] },
        { type: "cards", cols: 3, items: [
          { n: "1", title: "Category", lines: ["Named the way agents talk about it, not after the model's feature."] },
          { n: "2", title: "Verdict tag", lines: ["A fixed vocabulary: Stronger driver, Significant difference, Completely different, High or Medium impact."] },
          { n: "3", title: "Reason", lines: ["One sentence built from the structured scores, never free-form model text."] },
          { n: "4", title: "Value", lines: ["Large enough to scan across a row of cards."] },
          { n: "5", title: "Semantic bar", lines: ["Green for alike, red for different, amber for act with care. The colour always repeats the tag and never replaces it."] },
        ] },
        { type: "text", body: ["Variants: similarity, difference, primary action, secondary action, do not recommend and risk flag."] },
        { type: "text", eyebrow: "engineering · collaboration", heading: "Fourteen weeks, from data contract to full rollout.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Weeks 1–3", title: "The contract before the pixels", lines: ["The back-end lead and I wrote the insight response schema together, so every element on screen had a field behind it and nothing was hard-coded."] },
          { kicker: "Weeks 4–8", title: "Every state written down", lines: ["I specced each state: loading, generating, low coverage, no matches, permission-masked and stale scores. QA tested against those specs."] },
          { kicker: "Weeks 6–11", title: "A pilot behind a flag", lines: ["One retention desk of 7 agents, behind a feature flag. We went through usage and feedback with the CTO every week."] },
          { kicker: "Weeks 12–14", title: "Tune, then roll out", lines: ["We tuned the default threshold, the summary wording and the Do not recommend rules from pilot data, then rolled out to all desks."] },
        ] },
        { type: "cards", cols: 2, items: [
          { kicker: "The insight contract · GET /leads/{id}/compare/{otherId}", title: "One response drives the whole Intelligence Summary", list: ["matchScore: 29", "similarity: low", "confidence: 87", "comparedAt: 2026-05-12T11:24:00Z", "recommendation: separate_strategy", "categories: crm_notes_psychology 88 (stronger_driver), trading_behaviour 0 (completely_different)", "actions: primary, high impact, reuse_engagement_pattern", "doNotRecommend: vip_upgrade, high_value_campaign, deposit_incentive"] },
        ] },
        { type: "text", eyebrow: "outcomes", heading: "What changed on the pilot desk.", body: ["Measured over 6 weeks on one pilot desk against a comparable desk without ClientLens, then tracked for one quarter after general availability."] },
        { type: "cards", cols: 2, items: [
          { n: "5 of 7", title: "Weekly use", lines: ["Pilot agents were using Find Similar Leads every week by week 6."] },
          { n: "38 → 9 min", title: "Segment build time", lines: ["Median time to build a re-engagement segment."] },
          { n: "−41%", title: "Mis-targeted promotions", lines: ["VIP and deposit promotions sent to churned or high-risk clients."] },
          { n: "11.8% vs 8.6%", title: "Re-deposit rate", lines: ["On ClientLens-guided outreach compared with the control desk."] },
        ] },
        { type: "text", body: ["The pilot covered 7 agents on one retention desk. Segment build time is a median, and the re-deposit rate compares ClientLens-guided outreach with the control desk."] },
        { type: "cards", cols: 3, items: [
          { kicker: "What agents said", lines: ["Do not recommend was the most mentioned feature. Agents said it gave them a reason to push back when a manager asked them to “just send the VIP offer”."] },
          { kicker: "What retention leads did", lines: ["They used the impact tags to plan the day's comparisons, which we hadn't designed for."] },
          { kicker: "What compliance said", lines: ["Hashed matches and the deposit-incentive rule passed review without changes."] },
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
const ns = (file: string, alt: string, ratio = 2880 / 2516): Block => ({ type: "image", src: `${NS}/mock/${file}.webp`, tone: "mockup", alt, ratio });
const northstar: CaseStudy = {
  slug: "northstar",
  title: "An AI-native CRM that shows its uncertainty",
  lede: "A working prototype that asks how far a retention team can trust an AI with its accounts. Northstar turns a stated goal into findings, a recommended action and an audit trail, and is honest about what it doesn’t know along the way. Grounded in research on today’s AI-native CRMs, it covers 7 flows, 3 roles and 10 designed failure scenarios.",
  heroAlt: "Northstar investigation summary: 11 eligible clients, 14 needing review, a draft audience of 10, a recommended strategy marked Draft, and a Next decision panel",
  heroSrc: `${NS}/mock/summary.webp`,
  heroRatio: 2880 / 2516,
  heroMax: 1068,
  heroTone: "mockup",
  meta: [["Role", "Product design, systems thinking & front-end engineering"], ["Focus", "Explainable AI / Human control / Safe execution"], ["Status", "Prototype"]],
  reflection: {
    eyebrow: "limits & next",
    heading: "What this is, and what it isn't yet",
    body: [
      "Still a prototype. The data is 36 invented clients built to exercise eligible, uncertain and excluded paths, and execution is simulated: no real email was sent and no live CRM or provider was connected. The design reasoning comes from the problem framing, not from studies with retention or compliance teams, and nothing here measures reactivation, conversion or time saved.",
      "Next: test the journey with real retention managers and compliance reviewers and watch where they hesitate at each seam. Measure time to a trusted decision, not clicks saved. Learn which conflicts teams resolve fastest and which they escalate. Then connect a real data source behind the same boundary, keeping execution simulated until approvals hold under load.",
    ],
    pull: "The AI does the investigating. People keep the authority. The space between them is designed, not left to chance.",
  },
  tabs: {
    design: {
      intro: nsIntro,
      blocks: [
        { type: "text", eyebrow: "the experience", heading: "From a goal to an audited action, in one connected thread", body: ["The journey runs Goal, Investigation, Evidence, Opportunities, Refinement, Approval, Execution and Recovery. Every screen belongs to one investigation, so a finding, the plan it led to and the approval it needed never lose their connection."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Designed", list: ["10 Figma screens across 7 flows", "Role and autonomy boundaries"] },
          { kicker: "Implemented", list: ["A working prototype of every flow", "Plan versioning and approval of an exact version", "Role-based actions, audit log, simulated execution with safe retries"] },
          { kicker: "Validated", list: ["An end-to-end Fresh Start journey on synthetic data", "13 unit and component tests and a 10-step journey test", "WCAG 2.1 AA scan, zero violations across 9 screens"] },
          { kicker: "Still a prototype", list: ["Synthetic clients and simulated sends", "Grounded in competitive research on AI-native CRMs, not yet tested with retention or compliance teams. No business metrics yet.", "Never connected to a live CRM or email provider"] },
        ] },
        { type: "text", eyebrow: "goal · workspace", heading: "The home screen asks for an outcome, then shows the next decision", body: ["First-time users see a goal composer, three suggested goals and a short explanation of what happens next. There are no empty charts. Returning users see Needs attention and Continue work, ordered by the next useful decision rather than the last page they opened.", "The list depends on the role. A retention manager sees “Waiting for approval of plan v1”. A compliance reviewer sees the same item as “Authorize plan v1”."] },
        ns("first-run", "First-run workspace with a welcome message, a Create your first business goal button, onboarding steps and suggested goals"),
        { type: "text", body: ["First run: one primary action, and suggested goals that fill in the composer and stay editable before anything runs."] },
        ns("home", "Returning workspace with a goal composer, a Needs attention list showing consent review, approval needed and findings ready, and a Continue work list"),
        { type: "text", body: ["Returning: a new goal is always one line away, pending decisions come first and are tagged by type, and Continue work links to the next decision, not the last screen."] },
        { type: "text", eyebrow: "investigation · seam 1", heading: "The AI shows its work while it runs, and reports findings, not verdicts", body: ["An investigation shows what it is checking as it goes: interpreting the goal, gathering evidence, verifying consent and KYC, classifying, drafting a plan. The progress screen states the boundary plainly: investigations only read evidence.", "When it finishes, the badge reads Investigation complete while the goal reads review ready. They are separate states on purpose. Finishing the analysis doesn't mean the business goal is met, and the interface never suggests otherwise."] },
        ns("running", "Investigation in progress, with five steps, two complete, a progress bar and a note that investigations only read evidence"),
        { type: "text", body: ["Progress is calculated from the start time, so it survives a page reload. The read-only boundary is stated where the user is waiting, which is when they wonder what the system is doing."] },
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
        { type: "text", eyebrow: "approval · seam 3", heading: "Requesting approval doesn't send anything. Approval covers one version", body: ["The campaign screen splits into the plan and an authorization rail. The rail names the executable candidate: plan version, audience size, channel. It says outright that requesting approval does not execute outreach, because people hesitate before buttons that might have side effects.", "The compliance reviewer sees the same plan with different controls: approve this version, or request changes with a required note. The approval states that version number in writing."] },
        ns("campaign-draft", "Campaigns screen with plan v2 draft and a Prepare authorization rail with a Request approval button"),
        { type: "text", body: ["Manager view: the exact thing being authorized, and the side effects of the button, stated up front."] },
        ns("campaign-review", "Compliance Reviewer view with an awaiting approval badge, Approve plan v2 and Request changes buttons, and a note that approval applies only to version 2"),
        { type: "text", body: ["Compliance Reviewer view: the version is in the button label, and any later change needs a new approval."] },
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
          { kicker: "Northstar", title: "The user makes the decisions.", list: ["State the business goal (human)", "Investigate records against the goal (AI)", "Inspect evidence and resolve conflicts (uncertain)", "Refine the plan, preview its impact (human)", "Authorize one exact plan version (compliance reviewer)", "Execute, reconcile, retry safely (system)"], lines: ["Each step leaves a record of who, or what, decided, and from which evidence."] },
        ] },
        { type: "text", eyebrow: "research", body: [
          "While researching AI-native CRMs, I noticed a recurring pattern: a lot of attention goes into what AI can do, but less into helping users understand why it makes certain recommendations. The reasoning isn't always clear, conflicting information can be easy to miss, and users may not know when they're expected to act.",
          "Northstar was designed to address these gaps. Every recommendation is grounded in traceable evidence, uncertainty and conflicting information are surfaced rather than silently resolved, and execution requires explicit, human approval. The goal wasn't simply to make AI more capable, but to make its decisions understandable, accountable, and safe to act on.",
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
          { kicker: "Compliance Reviewer", list: ["Authorize or return a plan version", "Inspect evidence, plans and the audit log"] },
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
        { type: "text", eyebrow: "approval · staleness", heading: "An approval is a promise about one version. Edits break it, on purpose", body: ["Plan v1 is drafted: the AI proposes 10 verified clients. The compliance reviewer authorizes v1, by number. Then the manager excludes a client, and v1's approval no longer describes what would run. Plan v2 is a new version, impact is reviewed again and v1 stays in history, unchanged. Only an approval of v2 can release v2.", "In the build, a plan that is awaiting approval can't be refined. The request must be withdrawn first, so nobody can change a plan while someone else is reviewing it."] },
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
        { type: "video", src: "/assets/northstar/prototype.mp4", poster: "/assets/northstar/prototype-poster.webp", ratio: 1920 / 920, alt: "Screen recording of the Northstar prototype: setting a goal, the investigation, reviewing uncertain evidence, refining a plan, approving an exact version and the audited execution with recovery" },
        { type: "text", eyebrow: "validation", heading: "What the end-to-end prototype run verified", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Fresh Start run", list: ["First-time workspace and goal creation", "Investigation and supporting evidence review", "Uncertainty resolution", "Plan revision and impact preview", "Handoff to the compliance reviewer and approval of the exact version", "Controlled, simulated execution", "Recovery from failed operations", "Returning workspace with investigation history"] },
          { kicker: "Results", list: ["11 clients initially eligible", "14 to 13 uncertain records after one resolution", "10 clients in the revised target audience", "8 completed, 1 failed, 1 unknown execution outcomes", "0 duplicated actions after retry"] },
        ] },
        { type: "text", body: ["Prototype verification on synthetic data. These numbers confirm the system behaved correctly. They are not customer results or business impact."] },
      ],
    },
  },
};

/*
 * ClientZone — copy and structure from the published ClientZone artifact (claude.ai/artifact/4wpKHsMy4NcJeMEmLdziQC).
 * Visuals are six of the supplied ClientZone screens (dashboard, create account demo and real, withdrawal, deposit history,
 * deposit modal), each fitted to the same angled desktop display on a dark plinth. Where a screen was not 16:9 it was cropped to
 * the display's 16:9 ratio from the top of the page, so every screen fills the glass with no letterboxing. The dashboard's lower
 * table rows and the tall modal screens are cropped by that window.
 * FLAGS:
 *  1. The artifact marks several details as assumptions to verify before sharing (the "Product designer" role, the team
 *     inputs from operations, compliance and engineering, the out-of-scope list, and per-brokerage logo and colour theming).
 *     They are reproduced as written; check them before publishing.
 *  2. The artifact makes no outcome claims, so this study has none. Its measurement plan sits at the end of the Build tab, and
 *     "what I'd refine / what I'd test" plus the closing line become the Reflection block.
 *  3. The artifact's numbered annotation pins are folded into the copy (the image block has no overlay). Its before/after
 *     structure diagram, scope, ownership split, trade-offs and page anatomy are expressed as cards.
 *  4. The deposit modal screen has no section in the artifact; its text is a plain description of what the screen shows.
 *  5. The "Documents" screen, the internal transfer modal and the dropdown and form-container crops were supplied but left
 *     out: the artifact puts KYC and onboarding outside this phase, and the brief asked for key flows only.
 */
const CZ = "/assets/case/clientzone";
const cz = (file: string, alt: string): Block => ({ type: "image", src: `${CZ}/mock/${file}.webp`, tone: "mockup", alt, ratio: 4 / 3 });
const czIntro: Tab["intro"] = {
  eyebrow: "the problem",
  heading: "The portal was shaped like the CRM behind it.",
  body: [
    "ClientZone had grown module by module, following the internal system's structure. For a client trying to answer “how much do I have, and what can I do with it?”, that structure got in the way.",
    "The redesign starts from one rule: a client portal should reflect the client's world, not mirror the internal CRM's modules.",
  ],
};
const clientzone: CaseStudy = {
  slug: "clientzone",
  title: "Clients don't think in CRM modules",
  lede: [
    "ClientZone is the client-facing portal of the Teamforce CRM platform, where brokerage clients manage trading accounts, deposits and withdrawals.",
    "A client portal should reflect the client's world, not mirror the internal CRM's modules. I redesigned its structure, dashboard and money journeys around that principle.",
  ],
  heroAlt: "Redesigned ClientZone dashboard on an angled desktop display: a greeting banner with a help card, four summary cards (total balance, wallet balance, real accounts, demo accounts), quick actions for deposits, account creation, wallet and accounts, an accounts overview table, a recent activity feed and a support card",
  heroSrc: `${CZ}/mock/hero.webp`,
  heroRatio: 4 / 3,
  heroMax: 1068,
  heroTone: "mockup",
  meta: [["Role", "Product designer, leading the redesign of the portal's structure, dashboard and money journeys"], ["Focus", "Information architecture / Fintech UX / Design systems"], ["Built as", "A template inside the platform, deployed by each brokerage under its own brand"]],
  reflection: {
    eyebrow: "honest read",
    heading: "What I'd refine, and what I'd test",
    body: [
      "I'm not claiming outcome metrics for this redesign. The problems come from design reviews and proposals, not formal usability testing, and the original screens weren't archived, so the before state is shown as a structural diagram rather than a screenshot.",
      "What I'd refine: distinct figure cards, because balance, equity, credit, margin and free margin deserve their own icons and emphasis, and free margin is the one that matters for withdrawals. One help entry, because the dashboard shows help twice and one persistent entry is enough. Clearer page naming across deposit and withdrawal views.",
      "What I'd test: a five-second test on the dashboard to see what clients remember. Task tests: find a deposit, create a demo account, withdraw from a specific account. And a support ticket review before and after rollout.",
    ],
    pull: "Clients don't think in CRM modules. The portal now starts from their questions.",
  },
  tabs: {
    design: {
      intro: czIntro,
      blocks: [
        { type: "text", eyebrow: "the experience", heading: "Summarise first, then let clients act and check.", body: ["The redesign covers three areas: the dashboard, trading-account management, and the wallet. Each opens with what the client most needs to know, then what they can do next."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Redesigned", list: ["A client-first dashboard", "Real and demo account management", "Connected wallet journeys"] },
          { kicker: "I owned", list: ["The “client's world” principle and new structure", "Dashboard hierarchy and quick actions", "The shared wallet page pattern"] },
          { kicker: "Team input", list: ["Which account fields must appear (operations)", "2FA and free-margin rules (compliance)", "Template constraints (engineering)"] },
          { kicker: "Evidence", list: ["Problems come from design reviews, not usability testing", "No outcome metrics claimed", "Measurement plan in Build"] },
        ] },
        { type: "cards", cols: 2, items: [
          { n: "1", kicker: "Dashboard", title: "Starts with the client.", lines: ["A greeting and “an overview of your trading accounts and activity today”."] },
          { n: "2", kicker: "Dashboard", title: "Their situation in four numbers.", lines: ["Total balance, wallet balance, real accounts and demo accounts."] },
          { n: "3", kicker: "Dashboard", title: "What they can do next.", lines: ["Quick actions grouped by intent, not by module."] },
          { n: "4", kicker: "Dashboard", title: "What changed recently.", lines: ["Deposits, new accounts and password changes, newest first."] },
        ] },
        { type: "text", eyebrow: "dashboard · prioritisation", heading: "A homepage that explains the client's situation before offering navigation.", body: [
          "The dashboard reads top to bottom as four questions. Where do I stand? Summary cards show total balance (with change versus last week), wallet balance, and how many real and demo accounts the client holds. What can I do? Quick actions cover funding, creating an account, opening the wallet and viewing accounts. What do I have? An accounts overview lists each MT5 account with balance, currency, credit, leverage and type. What changed? A recent-activity feed shows deposits, new accounts, wallet updates and password changes.",
          "Help is always within reach, in the header and on the dashboard. Money questions are often urgent, so support shouldn't be hidden behind a menu.",
        ] },
        { type: "text", eyebrow: "trading accounts · clear choices", heading: "Creating an account without leaving the page.", body: [
          "New accounts open in a side drawer over the accounts page, so clients keep their context. The first choice is the one that matters most: Demo or Real, as two large options rather than a dropdown. The form then asks only what's needed for that type: a demo group or a real group, marked required.",
          "The accounts structure had to hold account numbers, balances, leverage, groups, names and management actions without turning into a wall of fields. The overview shows the essentials, and details live one click deeper.",
        ] },
        cz("create-demo", "Create New Account drawer open over a blurred trading accounts page, with Demo Account selected and a required Select a demo group dropdown above a Submit button"),
        { type: "text", body: ["The drawer keeps the accounts page visible behind it. Account type comes first, then only the field that type needs."] },
        cz("create-real", "Create New Account drawer with Real Account selected and a required Select a real group dropdown above a Submit button"),
        { type: "text", body: ["Switching to Real swaps the group list in place, with no new page."] },
        { type: "text", eyebrow: "wallet · trust in money flows", heading: "Deposits, withdrawals and history that work as one journey.", body: [
          "Wallet screens share one structure, so learning one teaches the rest. Each page starts by choosing an account, shows that account's figures, puts the main action in the same place, and ends with a history table.",
          "Money moments get an explanation where people need it. The withdrawal page explains in plain words that the eligible amount is your free margin, and why it can be lower than net worth when positions are open. Person-to-person withdrawals carry a visible 2FA Required chip before the client starts, not as a surprise halfway through.",
        ] },
        cz("withdraw", "Wallet withdrawal page: a note explaining that the eligible amount is the free margin, an account selector, a Create a withdrawal request button, five account figure cards (balance, equity, credit, margin, free margin), and a person-to-person withdrawal panel marked 2FA Required above a history table"),
        { type: "text", body: ["The rule is explained before the action. The client chooses the account first, there is one primary action, always top right, and extra security is flagged up front."] },
        cz("history", "Deposit history page with the breadcrumb Go back / Wallet / Deposit History, the balance, account and filter selectors, a Download button, and a table row of a 10,000 USD deposit marked Approved with View and Update Receipt actions"),
        { type: "text", body: ["A breadcrumb leads back to the wallet. Clients filter by account and status, see a status chip instead of plain text, and get follow-up actions on each transaction."] },
        cz("deposit", "Deposit with Kora modal over the blurred wallet page: a form with MT5 account number, currency, amount, payment method and description, and a Deposit Detail panel with card name, account number, card number and a QR code to scan"),
        { type: "text", body: ["The deposit modal keeps the form and the payment details side by side, so the client sees where the money goes before they submit."] },
      ],
    },
    think: {
      intro: czIntro,
      blocks: [
        { type: "text", eyebrow: "problems · three gaps", heading: "Three design problems the redesign set out to fix.", body: ["These come from design reviews and proposals during the redesign, not formal usability testing."] },
        { type: "cards", cols: 3, items: [
          { n: "01", kicker: "Structure", title: "Fragmented information architecture", lines: ["Account management, wallet activity, trading information and utilities lived in separate areas, with little connecting them."] },
          { n: "02", kicker: "Priority", title: "Weak prioritisation", lines: ["The homepage helped clients navigate to modules, but not understand their own account situation."] },
          { n: "03", kicker: "Hierarchy", title: "Inconsistent interaction hierarchy", lines: ["Primary actions, account details, financial figures and supporting tools looked too alike to tell apart quickly."] },
        ] },
        { type: "text", eyebrow: "structure · before / after", heading: "From the CRM's modules to the client's questions.", body: ["The original screens weren't archived, so the before state is shown as a structural diagram rather than a screenshot."] },
        { type: "cards", cols: 2, items: [
          { kicker: "Before · mirrors the CRM", title: "Separate areas the client had to piece together themselves.", list: ["Account management (internal module)", "Wallet activities (internal module)", "Trading information (internal module)", "Utility functions (internal module)", "No summary, no shared patterns"] },
          { kicker: "After · reflects the client", title: "One summary first, then connected areas.", list: ["Dashboard: my balances, my accounts, my next actions, my recent activity", "Accounts: real and demo", "Wallet: deposit, withdraw and history", "Tools: supporting"] },
        ] },
        { type: "pull", heading: "Design challenge", text: "How might we turn a set of CRM modules into one portal that tells clients where they stand and what they can do next?" },
        { type: "text", eyebrow: "principle & scope", heading: "One principle, three areas.", body: [
          "The client portal should reflect the client's world, not mirror the internal CRM's modules.",
          "Every layout decision was checked against it. Does this screen answer a client question (“how much do I have?”, “what happened to my deposit?”), or does it expose how the system is organised internally?",
        ] },
        { type: "cards", cols: 2, items: [
          { kicker: "In scope", list: ["Dashboard: a summary of balances, accounts, actions and activity", "Trading accounts: real and demo accounts, creation and account details", "Wallet: deposits, withdrawals, transfers, history and transaction details as one journey", "Shared patterns: header, page anatomy, tables, status chips"] },
          { kicker: "Out of scope · this phase", list: ["Trading platform itself (MT5)", "KYC and onboarding flows", "Tools section content", "Brand theming per broker beyond logo and primary colour"] },
        ] },
        { type: "text", eyebrow: "ownership · mine vs ours", heading: "Which decisions I made, and which ones the team made.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Decisions I owned", title: "“Client's world, not CRM modules”", lines: ["The principle that reorganised the portal around client questions."] },
          { kicker: "Decisions I owned", title: "Dashboard as a summary", lines: ["Balances, actions, accounts and activity, in that order."] },
          { kicker: "Decisions I owned", title: "Demo/Real as the first choice", lines: ["Large options in a drawer, with a type-specific form."] },
          { kicker: "Decisions I owned", title: "One wallet page anatomy", lines: ["The same structure for deposits, withdrawals and history."] },
        ] },
        { type: "cards", cols: 2, items: [
          { kicker: "Operations", title: "Which account fields are mandatory", lines: ["Number, balance, currency, credit, leverage, type."] },
          { kicker: "Compliance", title: "Free-margin and 2FA rules", lines: ["The wording explains rules the business set."] },
          { kicker: "Engineering", title: "Template limits", lines: ["What each brokerage can change."] },
        ] },
        { type: "text", eyebrow: "trade-offs · what it cost", heading: "What each choice gave up.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Chose", title: "Summary dashboard", lines: ["Over: a dashboard of shortcuts to every module.", "Cost: some modules are one click further away."] },
          { kicker: "Chose", title: "Drawer for account creation", lines: ["Over: a separate page.", "Cost: less room, which works only while the form stays short."] },
          { kicker: "Chose", title: "One wallet pattern", lines: ["Over: a layout tailored to each transaction type.", "Cost: some pages carry sections they barely need, in return for predictability."] },
          { kicker: "Chose", title: "Explain rules inline", lines: ["Over: help articles.", "Cost: more text on screen, but fewer “why can't I withdraw?” moments."] },
        ] },
      ],
    },
    build: {
      intro: czIntro,
      blocks: [
        { type: "text", eyebrow: "system · template", heading: "A template, not a one-off.", body: ["ClientZone ships as part of the platform, so the design had to be a set of reusable parts rather than a set of pages. Each brokerage applies its own logo and primary colour; structure and patterns stay the same."] },
        { type: "text", eyebrow: "pattern · page anatomy", heading: "Every wallet page follows the same five parts.", body: [] },
        { type: "cards", cols: 3, items: [
          { n: "01", title: "Context", lines: ["Page title, or a breadcrumb back to Wallet."] },
          { n: "02", title: "Rule note", lines: ["A plain-language explanation when money rules apply (free margin, open positions)."] },
          { n: "03", title: "Account selector", lines: ["Choose the trading account. Everything below follows that choice."] },
          { n: "04", title: "Figures + primary action", lines: ["Account figures as cards, with the main action top right."] },
          { n: "05", title: "History", lines: ["A table with status chips, filters, pagination and row actions."] },
        ] },
        { type: "text", eyebrow: "components · shared parts", heading: "Reusable parts, grouped by job.", body: [] },
        { type: "cards", cols: 2, items: [
          { kicker: "Shell", list: ["Header with Add Deposit and Support", "Brand slot", "Notifications, help and profile"] },
          { kicker: "Summary", list: ["Stat card", "Quick action card", "Activity row"] },
          { kicker: "Data", list: ["Accounts table", "History table", "Status chip", "Filters and pagination"] },
          { kicker: "Trust", list: ["Rule note", "2FA chip", "Required-field marker"] },
          { kicker: "Overlay", list: ["Side drawer", "Segmented choice (Demo / Real)"] },
        ] },
        { type: "text", eyebrow: "evidence · what I'd measure", heading: "How the redesign's success should be judged.", body: ["I'm not claiming outcome metrics for this redesign. These are the signals I'd use."] },
        { type: "cards", cols: 2, items: [
          { title: "Comprehension", lines: ["Can a client state their balance and account count from the dashboard alone?"] },
          { title: "Findability", lines: ["Time to reach a specific transaction or account detail."] },
          { title: "Completion", lines: ["Deposit and withdrawal requests started vs submitted."] },
          { title: "Support load", lines: ["Tickets about balances, free margin or “where is my deposit?”"] },
        ] },
        { type: "text", body: ["Screens are from the redesigned template, shown with test data."] },
      ],
    },
  },
};

caseStudies.push(clientlens, clientzone, northstar);

export const tabLabels: Record<TabKey, string> = { design: "Design", think: "Think", build: "Build" };
export const tabOrder: TabKey[] = ["design", "think", "build"];
export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
