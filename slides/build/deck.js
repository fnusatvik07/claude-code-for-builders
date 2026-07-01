/*
 * Claude Code for Builders deck (Data Sense · Launchpad)
 * One-hour class. Theme: dark terminal + Claude coral, terminal-window motif.
 * No em/en dashes anywhere in visible text.
 */
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625
pres.author = "Data Sense · Launchpad";
pres.title = "Claude Code for Builders";

// ---- palette ---------------------------------------------------------------
const BG = "1A1916";
const PANEL = "242019";
const TITLEBAR = "2F2B24";
const CODE_BG = "171511";
const BORDER = "D97757";
const BORDER_DIM = "44403A";
const CORAL = "D97757";
const CORAL_BR = "E89B7C";
const CREAM = "F0EEE6";
const MUTED = "A59E94";
const FAINT = "726B61";
const GREEN = "84B07A";
const YELLOW = "E2B250";
const RED = "E0726B";
const BLUE = "7FA6C4";

const MONO = "Consolas";
const SANS = "Calibri";

const shadow = () => ({ type: "outer", color: "000000", blur: 7, offset: 3, angle: 135, opacity: 0.35 });

// ---- helpers ---------------------------------------------------------------
function bg(slide) { slide.background = { color: BG }; }

function frame(slide, filename) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.42, w: 9.3, h: 4.78, fill: { color: PANEL }, line: { type: "none" }, shadow: shadow() });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.42, w: 9.3, h: 0.4, fill: { color: TITLEBAR }, line: { type: "none" } });
  slide.addShape(pres.shapes.LINE, { x: 0.35, y: 0.82, w: 9.3, h: 0, line: { color: BORDER_DIM, width: 1 } });
  slide.addShape(pres.shapes.OVAL, { x: 0.58, y: 0.56, w: 0.12, h: 0.12, fill: { color: RED }, line: { type: "none" } });
  slide.addShape(pres.shapes.OVAL, { x: 0.76, y: 0.56, w: 0.12, h: 0.12, fill: { color: YELLOW }, line: { type: "none" } });
  slide.addShape(pres.shapes.OVAL, { x: 0.94, y: 0.56, w: 0.12, h: 0.12, fill: { color: GREEN }, line: { type: "none" } });
  slide.addText(filename, { x: 1.3, y: 0.45, w: 7.4, h: 0.34, align: "center", valign: "middle", fontFace: MONO, fontSize: 10.5, color: MUTED, margin: 0 });
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.42, w: 9.3, h: 4.78, fill: { color: BG, transparency: 100 }, line: { color: BORDER, width: 1.5 } });
  return 1.12;
}

function head(slide, kicker, title, titleColor) {
  slide.addText(kicker.toUpperCase(), { x: 0.75, y: 1.02, w: 8.5, h: 0.3, fontFace: MONO, fontSize: 12, bold: true, color: CORAL, charSpacing: 2, margin: 0 });
  slide.addText(title, { x: 0.72, y: 1.32, w: 8.55, h: 0.7, fontFace: SANS, fontSize: 27, bold: true, color: titleColor || CREAM, margin: 0 });
}

function promptBox(slide, x, y, w, h, lines, label, opts) {
  opts = opts || {};
  const fs = opts.fontSize || 13.5;
  const lsm = opts.lineSpacing || 1.35;
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h, fill: { color: CORAL }, line: { type: "none" } });
  if (label) slide.addText(label, { x: x + 0.2, y: y - 0.04, w: w - 0.4, h: 0.26, fontFace: MONO, fontSize: 9.5, color: FAINT, margin: 0 });
  const runs = [];
  lines.forEach((ln, i) => {
    const isLast = i === lines.length - 1;
    if (ln.prompt) {
      runs.push({ text: "> ", options: { color: CORAL, bold: true } });
      runs.push({ text: ln.text, options: { color: CREAM, breakLine: !isLast } });
    } else if (ln.out) {
      runs.push({ text: ln.text, options: { color: GREEN, breakLine: !isLast } });
    } else if (ln.cmd) {
      runs.push({ text: ln.text, options: { color: CORAL_BR, breakLine: !isLast } });
    } else {
      runs.push({ text: ln.text, options: { color: MUTED, breakLine: !isLast } });
    }
  });
  slide.addText(runs, { x: x + 0.22, y: y + (label ? 0.26 : 0.16), w: w - 0.42, h: h - (label ? 0.4 : 0.32), fontFace: MONO, fontSize: fs, valign: "top", lineSpacingMultiple: lsm, margin: 0 });
}

function card(slide, x, y, w, h, title, body, accent) {
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
  slide.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.055, fill: { color: accent || CORAL }, line: { type: "none" } });
  slide.addText(title, { x: x + 0.2, y: y + 0.16, w: w - 0.4, h: 0.34, fontFace: MONO, fontSize: 13.5, bold: true, color: CREAM, margin: 0 });
  slide.addText(body, { x: x + 0.2, y: y + 0.52, w: w - 0.4, h: h - 0.66, fontFace: SANS, fontSize: 12.5, color: MUTED, valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
}

function foot(slide, n) {
  slide.addText("claude-code-for-builders", { x: 0.4, y: 5.32, w: 5, h: 0.25, fontFace: MONO, fontSize: 8.5, color: FAINT, margin: 0 });
  slide.addText(String(n).padStart(2, "0"), { x: 9.1, y: 5.32, w: 0.5, h: 0.25, align: "right", fontFace: MONO, fontSize: 8.5, color: FAINT, margin: 0 });
}

let page = 0;
function content(filename) {
  const s = pres.addSlide();
  bg(s);
  frame(s, filename);
  page += 1;
  foot(s, page);
  return s;
}

function divider(part, title, sub) {
  const s = pres.addSlide();
  bg(s);
  page += 1;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.35, w: 9.3, h: 4.92, fill: { color: PANEL }, line: { color: BORDER, width: 1.5 }, shadow: shadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 2.05, w: 0.12, h: 1.5, fill: { color: CORAL }, line: { type: "none" } });
  s.addText(part.toUpperCase(), { x: 0.95, y: 2.05, w: 8, h: 0.4, fontFace: MONO, fontSize: 15, bold: true, color: CORAL, charSpacing: 3, margin: 0 });
  s.addText(title, { x: 0.92, y: 2.42, w: 8.3, h: 0.95, fontFace: SANS, fontSize: 36, bold: true, color: CREAM, margin: 0 });
  s.addText(sub, { x: 0.95, y: 3.45, w: 8.2, h: 0.5, fontFace: SANS, fontSize: 15, italic: true, color: MUTED, margin: 0 });
  foot(s, page);
}

// small row of key -> desc, used on several slides
function keyRows(slide, x, y, w, rows, keyW, accent) {
  rows.forEach((r, i) => {
    const yy = y + i * 0.5;
    slide.addShape(pres.shapes.RECTANGLE, { x, y: yy, w: keyW, h: 0.4, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    slide.addText(r[0], { x, y: yy, w: keyW, h: 0.4, align: "center", valign: "middle", fontFace: MONO, fontSize: 11.5, bold: true, color: accent || CORAL, margin: 0 });
    slide.addText(r[1], { x: x + keyW + 0.15, y: yy, w: w - keyW - 0.15, h: 0.4, valign: "middle", fontFace: SANS, fontSize: 12, color: CREAM, margin: 0 });
  });
}

// =====================================================================
// INTRO
// =====================================================================

// S1 TITLE
(() => {
  const s = pres.addSlide();
  bg(s);
  s.addShape(pres.shapes.RECTANGLE, { x: 0.9, y: 0.85, w: 8.2, h: 3.95, fill: { color: PANEL }, line: { color: BORDER, width: 2 }, shadow: shadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.9, y: 0.85, w: 8.2, h: 0.42, fill: { color: TITLEBAR }, line: { type: "none" } });
  s.addShape(pres.shapes.LINE, { x: 0.9, y: 1.27, w: 8.2, h: 0, line: { color: BORDER_DIM, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: 1.14, y: 1.0, w: 0.13, h: 0.13, fill: { color: RED }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 1.34, y: 1.0, w: 0.13, h: 0.13, fill: { color: YELLOW }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 1.54, y: 1.0, w: 0.13, h: 0.13, fill: { color: GREEN }, line: { type: "none" } });
  s.addText("claude · ~/taskflow · zsh", { x: 2.0, y: 0.88, w: 6.0, h: 0.36, align: "center", valign: "middle", fontFace: MONO, fontSize: 11, color: MUTED, margin: 0 });
  s.addText([{ text: "$ ", options: { color: GREEN, bold: true } }, { text: "claude", options: { color: CREAM } }], { x: 1.3, y: 1.5, w: 6, h: 0.4, fontFace: MONO, fontSize: 16, margin: 0 });
  s.addText("CLAUDE CODE", { x: 1.25, y: 1.95, w: 7.6, h: 0.85, fontFace: MONO, fontSize: 46, bold: true, color: CREAM, charSpacing: 1, margin: 0 });
  s.addText("FOR BUILDERS", { x: 1.25, y: 2.7, w: 7.6, h: 0.85, fontFace: MONO, fontSize: 46, bold: true, color: CORAL, charSpacing: 1, margin: 0 });
  s.addText("Your pair-programmer that lives in the terminal.", { x: 1.3, y: 3.62, w: 7.4, h: 0.4, fontFace: SANS, fontSize: 15, italic: true, color: MUTED, margin: 0 });
  s.addText("DATA SENSE", { x: 0.9, y: 4.95, w: 1.95, h: 0.34, align: "center", valign: "middle", fontFace: MONO, fontSize: 12, bold: true, color: BG, fill: { color: CORAL }, charSpacing: 1, margin: 0 });
  s.addText("Launchpad community  ·  The one-hour hands-on class", { x: 3.0, y: 4.95, w: 6.1, h: 0.34, valign: "middle", fontFace: SANS, fontSize: 13, color: MUTED, margin: 0 });
})();

// S2 AGENDA
(() => {
  const s = content("agenda.md");
  head(s, "The next hour", "What we'll cover");
  const items = [
    ["1", "Set up & get oriented", "install, log in, where things live", GREEN],
    ["2", "The core loop", "ask, edit, commit", CORAL],
    ["3", "Drive it", "slash commands, context, permissions", YELLOW],
    ["4", "Real work", "fix a bug, ship a feature", CORAL_BR],
    ["5", "Make it yours & track it", "CLAUDE.md, extensions, usage", BLUE],
    ["6", "Wrap & practice", "cheat sheet and homework", GREEN],
  ];
  items.forEach((it, i) => {
    const x = 0.72 + (i % 2) * 4.35;
    const y = 2.05 + Math.floor(i / 2) * 0.94;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.2, h: 0.8, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h: 0.8, fill: { color: it[3] }, line: { type: "none" } });
    s.addText(it[0], { x: x + 0.16, y, w: 0.5, h: 0.8, align: "center", valign: "middle", fontFace: MONO, fontSize: 20, bold: true, color: it[3], margin: 0 });
    s.addText(it[1], { x: x + 0.72, y: y + 0.13, w: 3.4, h: 0.3, fontFace: SANS, fontSize: 14.5, bold: true, color: CREAM, margin: 0 });
    s.addText(it[2], { x: x + 0.72, y: y + 0.44, w: 3.4, h: 0.28, fontFace: SANS, fontSize: 11.5, color: MUTED, margin: 0 });
  });
})();

// S3 WHAT IS CLAUDE CODE
(() => {
  const s = content("what-is-claude-code.md");
  head(s, "The big picture", "What is Claude Code?");
  s.addText("An AI coding agent that lives in your terminal. It reads your project, runs commands, and writes code, all by talking to it in plain English.", { x: 0.72, y: 2.05, w: 8.55, h: 0.7, fontFace: SANS, fontSize: 15, color: CREAM, valign: "top", lineSpacingMultiple: 1.1, margin: 0 });
  const outcomes = [
    ["Understand", "any codebase in minutes", GREEN],
    ["Build", "features from a description", CORAL],
    ["Debug", "and fix what's broken", YELLOW],
    ["Ship", "tests, docs, and commits", CORAL_BR],
  ];
  outcomes.forEach((o, i) => {
    const x = 0.72 + (i % 2) * 4.35;
    const y = 2.95 + Math.floor(i / 2) * 0.95;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.2, h: 0.82, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h: 0.82, fill: { color: o[2] }, line: { type: "none" } });
    s.addText(o[0], { x: x + 0.2, y: y + 0.13, w: 3.9, h: 0.3, fontFace: MONO, fontSize: 15, bold: true, color: CREAM, margin: 0 });
    s.addText(o[1], { x: x + 0.2, y: y + 0.46, w: 3.9, h: 0.28, fontFace: SANS, fontSize: 12.5, color: MUTED, margin: 0 });
  });
})();

// =====================================================================
// PART 1 — SET UP & GET ORIENTED
// =====================================================================
divider("Part 1", "Set up & get oriented", "Install, log in, and learn to read the screen and find your files.");

// S5 INSTALL
(() => {
  const s = content("install.sh");
  head(s, "Install", "One line and you're in");
  promptBox(s, 0.72, 2.05, 4.35, 1.05, [{ prompt: true, text: "curl -fsSL https://claude.ai/install.sh | bash" }], "macOS · Linux · WSL", { fontSize: 11 });
  promptBox(s, 5.12, 2.05, 4.16, 1.05, [{ prompt: true, text: "irm https://claude.ai/install.ps1 | iex" }], "Windows PowerShell", { fontSize: 11 });
  card(s, 0.72, 3.32, 4.35, 1.55, "Native install auto-updates", "It quietly stays on the latest version in the background. Homebrew and WinGet you upgrade by hand.", GREEN);
  card(s, 5.12, 3.32, 4.16, 1.55, "Available everywhere", "Not just the terminal: also VS Code, JetBrains, the desktop app, web, Slack, and CI/CD.", CORAL);
})();

// S6 LOGIN
(() => {
  const s = content("login.sh");
  head(s, "Log in & launch", "Start a session");
  promptBox(s, 0.72, 2.05, 4.35, 1.95, [
    { prompt: true, text: "cd my-project" },
    { prompt: true, text: "claude" },
    { text: "» opens browser to log in" },
    { prompt: true, text: "/login" },
    { text: "» switch / re-auth anytime" },
  ], "first run", { fontSize: 12.5, lineSpacing: 1.3 });
  const pts = [
    "Log in with Claude Pro, Max, Team, or a Console account.",
    "Credentials are stored, so you log in once.",
    "/help lists commands, /resume reopens a past chat.",
    "/status shows version, model, and account anytime.",
  ];
  s.addText(pts.map((t, i) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, color: CREAM, breakLine: i !== pts.length - 1, paraSpaceAfter: 10 } })), { x: 5.2, y: 2.1, w: 4.05, h: 2.7, fontFace: SANS, fontSize: 13.5, color: CREAM, valign: "top", margin: 0 });
})();

// S7 READING THE SCREEN
(() => {
  const s = content("the-interface.md");
  head(s, "Get oriented", "How to read the screen");
  promptBox(s, 0.72, 2.05, 5.15, 1.85, [
    { text: "Claude Code  v2.x" },
    { text: "model: claude-opus-4-8" },
    { text: "cwd:   ~/taskflow" },
    { prompt: true, text: "" },
    { text: "  accept edits on · shift+tab to change" },
  ], "what you see when it starts", { fontSize: 12, lineSpacing: 1.3 });
  const pts = [
    ["Model", "which Claude you're talking to"],
    ["cwd", "the folder it can read and edit"],
    ["The > prompt", "where you type, in plain English"],
    ["Mode line", "current permission mode"],
  ];
  s.addText("THE HEADER TELLS YOU", { x: 6.05, y: 2.02, w: 3.3, h: 0.28, fontFace: MONO, fontSize: 10.5, bold: true, color: FAINT, charSpacing: 1.5, margin: 0 });
  pts.forEach((p, i) => {
    const y = 2.36 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y, w: 3.23, h: 0.52, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.05, y, w: 0.05, h: 0.52, fill: { color: CORAL }, line: { type: "none" } });
    s.addText(p[0], { x: 6.22, y: y + 0.06, w: 3.0, h: 0.24, fontFace: MONO, fontSize: 11.5, bold: true, color: CORAL, margin: 0 });
    s.addText(p[1], { x: 6.22, y: y + 0.28, w: 3.0, h: 0.22, fontFace: SANS, fontSize: 10.5, color: MUTED, margin: 0 });
  });
})();

// S8 WHERE THINGS LIVE
(() => {
  const s = content("where-things-live.md");
  head(s, "Find your files", "Where everything lives");
  promptBox(s, 0.72, 2.05, 4.55, 2.95, [
    { prompt: true, text: "ls ~/.claude" },
    { text: "settings.json   your settings" },
    { text: "CLAUDE.md       your rules" },
    { text: "commands/       /commands" },
    { text: "agents/         subagents" },
    { text: "skills/         skills" },
    { text: "projects/       auto memory" },
  ], "your personal Claude Code folder", { fontSize: 11, lineSpacing: 1.3 });
  s.addText("THREE SCOPES", { x: 5.45, y: 2.02, w: 3.8, h: 0.28, fontFace: MONO, fontSize: 10.5, bold: true, color: FAINT, charSpacing: 1.5, margin: 0 });
  const sc = [
    ["User", "~/.claude/  ·  all your projects", GREEN],
    ["Project", "./.claude/  ·  commit it, team shares it", CORAL],
    ["Local", "settings.local.json  ·  just you, gitignored", YELLOW],
  ];
  sc.forEach((m, i) => {
    const y = 2.38 + i * 0.66;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.45, y, w: 3.83, h: 0.56, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.45, y, w: 0.055, h: 0.56, fill: { color: m[2] }, line: { type: "none" } });
    s.addText(m[0], { x: 5.62, y: y + 0.07, w: 3.55, h: 0.24, fontFace: MONO, fontSize: 12, bold: true, color: CREAM, margin: 0 });
    s.addText(m[1], { x: 5.62, y: y + 0.3, w: 3.6, h: 0.22, fontFace: MONO, fontSize: 9.5, color: MUTED, margin: 0 });
  });
  s.addText("Also in Cloud settings: your account, usage, and team controls (more on that later).", { x: 5.45, y: 4.5, w: 3.83, h: 0.5, fontFace: SANS, fontSize: 10.5, italic: true, color: FAINT, valign: "top", lineSpacingMultiple: 1.0, margin: 0 });
})();

// =====================================================================
// PART 2 — THE CORE LOOP
// =====================================================================
divider("Part 2", "The core loop", "Ask, edit, commit. The rhythm you'll use every single day.");

// S10 MENTAL MODEL
(() => {
  const s = content("how-it-works.md");
  head(s, "The big idea", "It's not ChatGPT in a terminal");
  const pts = [
    ["Reads your files", "It opens the code itself. You don't paste anything in."],
    ["Runs commands", "Tests, git, your build: it can actually run them."],
    ["Edits code", "It writes changes straight into your files."],
    ["Asks permission", "Nothing changes until you approve it."],
  ];
  pts.forEach((p, i) => {
    const y = 2.1 + i * 0.71;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.72, y, w: 4.55, h: 0.62, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addText(p[0], { x: 0.9, y: y + 0.06, w: 4.2, h: 0.28, fontFace: MONO, fontSize: 12.5, bold: true, color: CORAL, margin: 0 });
    s.addText(p[1], { x: 0.9, y: y + 0.31, w: 4.25, h: 0.28, fontFace: SANS, fontSize: 10.5, color: MUTED, margin: 0 });
  });
  s.addText("THE LOOP", { x: 5.45, y: 2.0, w: 3.8, h: 0.3, fontFace: MONO, fontSize: 11, bold: true, color: FAINT, charSpacing: 2, margin: 0 });
  const loop = ["You describe", "Claude explores", "It proposes", "You approve", "It acts"];
  loop.forEach((t, i) => {
    const y = 2.34 + i * 0.5;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.45, y, w: 3.55, h: 0.4, fill: { color: i % 2 ? PANEL : CODE_BG }, line: { color: i === 0 || i === 3 ? CORAL : BORDER_DIM, width: 1 } });
    s.addText([{ text: (i + 1) + "  ", options: { color: CORAL, bold: true } }, { text: t, options: { color: CREAM } }], { x: 5.6, y, w: 3.3, h: 0.4, valign: "middle", fontFace: SANS, fontSize: 13, margin: 0 });
    if (i < loop.length - 1) s.addText("↓", { x: 5.45, y: y + 0.37, w: 3.55, h: 0.16, align: "center", fontFace: MONO, fontSize: 11, bold: true, color: CORAL, margin: 0 });
  });
})();

// S11 ASK FIRST
(() => {
  const s = content("ask.md");
  head(s, "Ask", "Understand before you touch anything");
  promptBox(s, 0.72, 2.05, 5.0, 2.45, [
    { prompt: true, text: "what does this project do?" },
    { prompt: true, text: "what technologies does it use?" },
    { prompt: true, text: "where is the main entry point?" },
    { prompt: true, text: "explain the folder structure" },
    { prompt: true, text: "how do I create custom skills?" },
  ], "try these on the repo you just cloned");
  card(s, 5.9, 2.05, 3.38, 1.15, "No manual context", "Claude reads the files it needs on its own. You never attach anything.", CORAL);
  card(s, 5.9, 3.33, 3.38, 1.17, "Pro tip", "Always let Claude explore first. Understanding beats editing blind.", GREEN);
})();

// S12 FIRST CHANGE
(() => {
  const s = content("first-change.md");
  head(s, "Edit", "Your first code change");
  promptBox(s, 0.72, 2.05, 4.5, 0.95, [{ prompt: true, text: "add a hello world function to the main file" }], "the prompt");
  const steps = [["1", "Finds the right file"], ["2", "Shows you the proposed diff"], ["3", "Asks for your approval"], ["4", "Makes the edit"]];
  steps.forEach((p, i) => {
    const y = 3.18 + i * 0.44;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.78, y: y + 0.04, w: 0.32, h: 0.32, fill: { color: CORAL }, line: { type: "none" } });
    s.addText(p[0], { x: 0.78, y: y + 0.04, w: 0.32, h: 0.32, align: "center", valign: "middle", fontFace: MONO, fontSize: 14, bold: true, color: BG, margin: 0 });
    s.addText(p[1], { x: 1.24, y, w: 3.95, h: 0.4, valign: "middle", fontFace: SANS, fontSize: 13.5, color: CREAM, margin: 0 });
  });
  card(s, 5.42, 2.05, 3.86, 2.55, "You're always in control", "Claude never changes a file without asking. Approve one edit at a time, or press Shift+Tab to cycle into accept-edits for a session when you trust the flow.", CORAL);
})();

// S13 GIT
(() => {
  const s = content("git.md");
  head(s, "Commit", "Version control, in plain English");
  promptBox(s, 0.72, 2.05, 5.0, 2.5, [
    { prompt: true, text: "what files have I changed?" },
    { prompt: true, text: "commit my changes with a" },
    { text: "  descriptive message" },
    { prompt: true, text: "create a branch feature/quickstart" },
    { prompt: true, text: "show me the last 5 commits" },
    { prompt: true, text: "help me resolve merge conflicts" },
  ], "session prompts");
  card(s, 5.9, 2.05, 3.38, 2.5, "No commands to memorize", "It's the same Git underneath. You describe the outcome and Claude writes the commands and a clean commit message for you.", GREEN);
})();

// =====================================================================
// PART 3 — DRIVE IT
// =====================================================================
divider("Part 3", "Drive it", "Slash commands, context, and permissions. This is what makes you fast.");

// S15 THE / MENU
(() => {
  const s = content("slash-commands.md");
  head(s, "Type a slash", "The commands you'll use most");
  s.addText("SESSION", { x: 0.75, y: 2.02, w: 4, h: 0.26, fontFace: MONO, fontSize: 10.5, bold: true, color: FAINT, charSpacing: 1.5, margin: 0 });
  keyRows(s, 0.75, 2.32, 4.4, [
    ["/help", "list every command"],
    ["/clear", "start fresh, clear context"],
    ["/compact", "summarize to free context"],
    ["/resume", "reopen a past chat"],
    ["/status", "version, model, account"],
  ], 1.25, CORAL);
  s.addText("DOING WORK", { x: 5.35, y: 2.02, w: 4, h: 0.26, fontFace: MONO, fontSize: 10.5, bold: true, color: FAINT, charSpacing: 1.5, margin: 0 });
  keyRows(s, 5.35, 2.32, 3.95, [
    ["/init", "write a starter CLAUDE.md"],
    ["/model", "switch the model"],
    ["/plan", "explore before editing"],
    ["/permissions", "control what it can do"],
    ["/usage", "check cost and limits"],
  ], 1.55, GREEN);
  s.addText("Tip: just type  /  to see everything your version supports, then start typing to filter.", { x: 0.75, y: 4.92, w: 8.5, h: 0.3, fontFace: SANS, fontSize: 12, italic: true, color: CORAL_BR, margin: 0 });
})();

// S16 CONTEXT
(() => {
  const s = content("context.md");
  head(s, "Context is everything", "Keep Claude focused");
  s.addText("Claude only knows what's in its context window. Manage it and your results get sharper.", { x: 0.72, y: 2.02, w: 8.55, h: 0.4, fontFace: SANS, fontSize: 13.5, color: CREAM, margin: 0 });
  const g = [
    ["/clear", "new task? wipe the slate clean", CORAL],
    ["/compact", "keep going but free up room", GREEN],
    ["/context", "see how full the window is", YELLOW],
    ["/init", "generate a CLAUDE.md to load every time", CORAL_BR],
    ["@app.py", "pull a specific file into the prompt", BLUE],
    ["# use pytest", "tell Claude to remember a rule", GREEN],
  ];
  const w = 4.27, h = 0.8, x0 = 0.72, x1 = 5.07, y0 = 2.46, gap = 0.85;
  g.forEach((it, i) => {
    const x = i % 2 === 0 ? x0 : x1;
    const y = y0 + Math.floor(i / 2) * gap;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h, fill: { color: it[2] }, line: { type: "none" } });
    s.addText(it[0], { x: x + 0.2, y: y + 0.11, w: w - 0.4, h: 0.3, fontFace: MONO, fontSize: 13.5, bold: true, color: it[2], margin: 0 });
    s.addText(it[1], { x: x + 0.2, y: y + 0.44, w: w - 0.4, h: 0.3, fontFace: SANS, fontSize: 12, color: MUTED, margin: 0 });
  });
})();

// S17 PERMISSION MODES
(() => {
  const s = content("permissions.md");
  head(s, "Permissions", "Press Shift+Tab to change the mode");
  const modes = [
    ["default", "Asks before the first use of each tool. The safe starting point.", GREEN],
    ["accept edits", "Auto-accepts file edits in this folder. Fast once you trust it.", CORAL],
    ["plan", "Reads and explores only, no edits. Proposes a plan first.", YELLOW],
  ];
  modes.forEach((m, i) => {
    const y = 2.1 + i * 0.86;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.72, y, w: 5.35, h: 0.74, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.72, y, w: 0.06, h: 0.74, fill: { color: m[2] }, line: { type: "none" } });
    s.addText(m[0], { x: 0.9, y: y + 0.1, w: 5.0, h: 0.3, fontFace: MONO, fontSize: 14, bold: true, color: m[2], margin: 0 });
    s.addText(m[1], { x: 0.9, y: y + 0.42, w: 5.05, h: 0.28, fontFace: SANS, fontSize: 11.5, color: MUTED, margin: 0 });
  });
  card(s, 6.25, 2.1, 3.03, 1.4, "Stop the prompts", "Add allow rules in .claude/settings.json so trusted commands never ask again.", CORAL);
  card(s, 6.25, 3.6, 3.03, 1.36, "Plan mode is gold", "Use plan mode for anything big. Review the plan, then let it build.", GREEN);
})();

// S18 INPUT TRICKS
(() => {
  const s = content("input-tricks.md");
  head(s, "Speed", "Input & navigation tricks");
  keyRows(s, 0.75, 2.1, 4.35, [
    ["/", "the command and skill menu"],
    ["Tab", "autocomplete a command"],
    ["Up", "scroll through history"],
    ["Esc", "stop, or press twice to rewind"],
    ["Ctrl+D", "exit the session"],
  ], 1.15, CORAL);
  s.addText("PROMPT SYMBOLS", { x: 5.35, y: 2.02, w: 4, h: 0.26, fontFace: MONO, fontSize: 10.5, bold: true, color: FAINT, charSpacing: 1.5, margin: 0 });
  const sym = [
    ["@", "mention a file: @app.py", BLUE],
    ["!", "run a shell command inline", YELLOW],
    ["#", "save a rule to memory", GREEN],
  ];
  sym.forEach((p, i) => {
    const y = 2.34 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y, w: 3.93, h: 0.52, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addText(p[0], { x: 5.35, y, w: 0.55, h: 0.52, align: "center", valign: "middle", fontFace: MONO, fontSize: 18, bold: true, color: p[2], margin: 0 });
    s.addText(p[1], { x: 5.98, y, w: 3.2, h: 0.52, valign: "middle", fontFace: SANS, fontSize: 12.5, color: CREAM, margin: 0 });
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: 4.3, w: 3.93, h: 0.62, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.35, y: 4.3, w: 0.055, h: 0.62, fill: { color: CORAL }, line: { type: "none" } });
  s.addText([{ text: "Be specific.  ", options: { color: CORAL, bold: true } }, { text: "Break big asks into steps.", options: { color: CREAM } }], { x: 5.55, y: 4.3, w: 3.6, h: 0.62, valign: "middle", fontFace: SANS, fontSize: 12.5, margin: 0 });
})();

// =====================================================================
// PART 4 — REAL WORK
// =====================================================================
divider("Part 4", "Real work", "Fix a real bug, ship a feature, and see the full range of what it can do.");

// S20 BUG + FEATURE
(() => {
  const s = content("debug.md");
  head(s, "Build", "Fix a bug, ship a feature");
  promptBox(s, 0.72, 2.05, 5.0, 1.95, [
    { prompt: true, text: "there's a bug where users can" },
    { text: "  submit empty forms, fix it" },
    { prompt: true, text: "add input validation to the" },
    { text: "  registration form" },
  ], "describe the problem, not the solution");
  const steps = ["Locates the relevant code", "Understands the context", "Implements a solution", "Runs tests if they exist"];
  s.addText("WHAT CLAUDE DOES", { x: 5.9, y: 2.02, w: 3.4, h: 0.28, fontFace: MONO, fontSize: 10.5, bold: true, color: FAINT, charSpacing: 1.5, margin: 0 });
  s.addText(steps.map((t, i) => ({ text: t, options: { bullet: { code: "2192", indent: 16 }, color: CREAM, breakLine: i !== steps.length - 1, paraSpaceAfter: 10 } })), { x: 5.9, y: 2.36, w: 3.38, h: 2.1, fontFace: SANS, fontSize: 13.5, color: CREAM, valign: "top", margin: 0 });
})();

// S21 FOUR WORKFLOWS
(() => {
  const s = content("workflows.md");
  head(s, "More moves", "Four everyday workflows");
  const g = [
    ["Refactor", "refactor auth to use async/await instead of callbacks", CORAL],
    ["Write tests", "write unit tests for the calculator functions", GREEN],
    ["Update docs", "update the README with installation instructions", YELLOW],
    ["Code review", "review my changes and suggest improvements", CORAL_BR],
  ];
  const w = 4.27, h = 1.18, x0 = 0.72, x1 = 5.07, y0 = 2.12, gap = 1.32;
  g.forEach((it, i) => {
    const x = i % 2 === 0 ? x0 : x1;
    const y = y0 + Math.floor(i / 2) * gap;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h, fill: { color: it[2] }, line: { type: "none" } });
    s.addText(it[0], { x: x + 0.2, y: y + 0.14, w: w - 0.4, h: 0.3, fontFace: MONO, fontSize: 14, bold: true, color: CREAM, margin: 0 });
    s.addText([{ text: "> ", options: { color: it[2], bold: true } }, { text: it[1], options: { color: MUTED } }], { x: x + 0.2, y: y + 0.5, w: w - 0.4, h: 0.6, fontFace: MONO, fontSize: 11.5, valign: "top", lineSpacingMultiple: 1.1, margin: 0 });
  });
})();

// S22 MORE EXAMPLES
(() => {
  const s = content("more-examples.md");
  head(s, "Beyond the basics", "More things you can ask");
  const g = [
    ["Explore", "trace how a login request flows through the app", GREEN],
    ["Build", "build a dashboard of our top-returned UK products", CORAL],
    ["Data", "analyze data/tasks.csv and summarize the trends", YELLOW],
    ["Automate", "write a script to rename these 200 files", CORAL_BR],
    ["Explain", "explain this error and tell me how to fix it", BLUE],
    ["Improve", "find and fix the slowest part of this endpoint", CORAL],
  ];
  const w = 2.78, h = 1.3, xs = [0.72, 3.61, 6.5], y0 = 2.08, gap = 1.45;
  g.forEach((it, i) => {
    const x = xs[i % 3];
    const y = y0 + Math.floor(i / 3) * gap;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.05, fill: { color: it[2] }, line: { type: "none" } });
    s.addText(it[0], { x: x + 0.18, y: y + 0.14, w: w - 0.36, h: 0.3, fontFace: MONO, fontSize: 13.5, bold: true, color: CREAM, margin: 0 });
    s.addText([{ text: "> ", options: { color: it[2], bold: true } }, { text: it[1], options: { color: MUTED } }], { x: x + 0.18, y: y + 0.49, w: w - 0.34, h: 0.74, fontFace: MONO, fontSize: 10.5, valign: "top", lineSpacingMultiple: 1.15, margin: 0 });
  });
})();

// =====================================================================
// PART 5 — MAKE IT YOURS & TRACK IT
// =====================================================================
divider("Part 5", "Make it yours & track it", "Give Claude memory, extend it, and keep an eye on your usage.");

// S24 CLAUDE.md
(() => {
  const s = content("CLAUDE.md");
  head(s, "Project memory", "Teach Claude your project once");
  promptBox(s, 0.72, 2.05, 4.75, 2.85, [
    { text: "# TaskFlow" },
    { text: "" },
    { text: "## Commands" },
    { cmd: true, text: "- run:  python app.py" },
    { cmd: true, text: "- test: pytest" },
    { text: "" },
    { text: "## Conventions" },
    { text: "- 4-space indent, type hints" },
    { text: "- validate all form input" },
  ], "CLAUDE.md in your repo root", { fontSize: 11.5, lineSpacing: 1.25 });
  const pts = [
    "Claude reads it at the start of every session.",
    "Run /init to generate a starter, then trim it.",
    "Keep it under ~200 lines so it stays sharp.",
    "Type  # remember X  to append a rule live.",
    "Commit it so your whole team shares the context.",
  ];
  s.addText(pts.map((t, i) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, color: CREAM, breakLine: i !== pts.length - 1, paraSpaceAfter: 9 } })), { x: 5.7, y: 2.12, w: 3.6, h: 2.8, fontFace: SANS, fontSize: 12.5, color: CREAM, valign: "top", margin: 0 });
})();

// S25 EXTEND IT
(() => {
  const s = content("extend.md");
  head(s, "Make it yours", "Six ways to extend Claude Code");
  const g = [
    ["Skills / commands", "reusable workflows behind /name", CORAL],
    ["Subagents", "a helper with its own context", GREEN],
    ["Hooks", "run a script on an event", YELLOW],
    ["MCP", "connect outside tools and data", BLUE],
    ["Plugins", "bundle and share the above", CORAL_BR],
    ["CLAUDE.md", "always-on project rules", GREEN],
  ];
  const w = 2.78, h = 1.15, xs = [0.72, 3.61, 6.5], y0 = 2.15, gap = 1.32;
  g.forEach((it, i) => {
    const x = xs[i % 3];
    const y = y0 + Math.floor(i / 3) * gap;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.05, fill: { color: it[2] }, line: { type: "none" } });
    s.addText(it[0], { x: x + 0.18, y: y + 0.16, w: w - 0.36, h: 0.3, fontFace: MONO, fontSize: 12.5, bold: true, color: CREAM, margin: 0 });
    s.addText(it[1], { x: x + 0.18, y: y + 0.5, w: w - 0.34, h: 0.55, fontFace: SANS, fontSize: 11.5, color: MUTED, valign: "top", lineSpacingMultiple: 1.05, margin: 0 });
  });
  s.addText("These are your Part 5 topics for a future deep dive. Today: just know they exist.", { x: 0.72, y: 4.95, w: 8.5, h: 0.3, fontFace: SANS, fontSize: 11.5, italic: true, color: FAINT, margin: 0 });
})();

// S26 USAGE & COST
(() => {
  const s = content("usage.md");
  head(s, "Cloud settings", "Track your usage and cost");
  promptBox(s, 0.72, 2.05, 4.35, 0.95, [{ prompt: true, text: "/usage" }, { text: "  (alias: /cost)  see limits & spend" }], "run it inside a session", { fontSize: 12.5, lineSpacing: 1.25 });
  card(s, 0.72, 3.2, 4.35, 1.7, "Pro / Max subscription", "Shows plan limits and how much you've used (24h / 7d). Not a bill. Full view at claude.ai/settings under Account and Usage.", GREEN);
  card(s, 5.12, 2.05, 4.16, 1.42, "Console / API account", "Shows session cost and token breakdown. Authoritative billing and spend limits at console.anthropic.com/usage.", CORAL);
  card(s, 5.12, 3.6, 4.16, 1.3, "Good habits", "Check /usage now and then. Set a spend limit if you're on API. /status shows your account anytime.", YELLOW);
})();

// =====================================================================
// PART 6 — WRAP
// =====================================================================
divider("Part 6", "Wrap & practice", "The cheat sheet, the demo repo, and what to do next.");

// S28 CHEAT SHEET
(() => {
  const s = content("cheatsheet.md");
  head(s, "Keep this handy", "Command cheat sheet");
  const headerOpt = { fill: { color: TITLEBAR }, color: CORAL, bold: true, fontFace: MONO, fontSize: 11.5 };
  const cOpt = { color: CREAM, fontFace: MONO, fontSize: 11, fill: { color: CODE_BG } };
  const dOpt = { color: MUTED, fontFace: SANS, fontSize: 11, fill: { color: CODE_BG } };
  s.addText("SHELL · from your terminal", { x: 0.72, y: 2.0, w: 4.3, h: 0.26, fontFace: MONO, fontSize: 10, bold: true, color: FAINT, margin: 0 });
  s.addTable([
    [{ text: "command", options: headerOpt }, { text: "what it does", options: headerOpt }],
    [{ text: "claude", options: cOpt }, { text: "start a session", options: dOpt }],
    [{ text: "claude -c", options: cOpt }, { text: "continue last chat", options: dOpt }],
    [{ text: "claude -p \"q\"", options: cOpt }, { text: "one-off, then exit", options: dOpt }],
  ], { x: 0.72, y: 2.28, w: 4.3, colW: [1.7, 2.6], rowH: 0.33, border: { type: "solid", color: BORDER_DIM, pt: 1 }, valign: "middle", margin: [2, 4, 2, 4] });
  s.addText("SESSION · inside Claude Code", { x: 0.72, y: 3.68, w: 4.3, h: 0.26, fontFace: MONO, fontSize: 10, bold: true, color: FAINT, margin: 0 });
  s.addTable([
    [{ text: "command", options: headerOpt }, { text: "what it does", options: headerOpt }],
    [{ text: "/init", options: cOpt }, { text: "make a CLAUDE.md", options: dOpt }],
    [{ text: "/clear · /compact", options: cOpt }, { text: "manage context", options: dOpt }],
    [{ text: "/usage", options: cOpt }, { text: "cost and limits", options: dOpt }],
  ], { x: 0.72, y: 3.96, w: 4.3, colW: [1.9, 2.4], rowH: 0.33, border: { type: "solid", color: BORDER_DIM, pt: 1 }, valign: "middle", margin: [2, 4, 2, 4] });

  s.addText("SHORTCUTS", { x: 5.35, y: 2.0, w: 4, h: 0.26, fontFace: MONO, fontSize: 10, bold: true, color: FAINT, margin: 0 });
  keyRows(s, 5.35, 2.3, 3.93, [
    ["/", "command menu"],
    ["Shift+Tab", "permission mode"],
    ["@ file", "mention a file"],
    ["# rule", "save to memory"],
    ["Esc Esc", "rewind"],
  ], 1.5, CORAL);
})();

// S29 TASKFLOW REPO
(() => {
  const s = content("taskflow/");
  head(s, "The demo repo", "Meet TaskFlow, what we hacked on");
  promptBox(s, 0.72, 2.05, 4.55, 2.95, [
    { prompt: true, text: "git clone <your-repo>" },
    { text: "taskflow/" },
    { text: "├─ app.py            entry point" },
    { text: "├─ taskflow/" },
    { text: "│  ├─ calculator.py  stats" },
    { text: "│  ├─ auth.py        auth" },
    { text: "│  └─ registration.py  bug" },
    { text: "├─ data/tasks.csv    demo data" },
    { text: "└─ README.md         thin docs" },
  ], "the repo you'll clone", { fontSize: 11, lineSpacing: 1.25 });
  const map = [
    ["registration.py", "empty-form bug, add validation", RED],
    ["calculator.py", "pure funcs, write unit tests", GREEN],
    ["auth.py", "callbacks, refactor to async", CORAL],
    ["data/tasks.csv", "analyze and summarize", YELLOW],
  ];
  s.addText("EACH FILE FEEDS A DEMO", { x: 5.45, y: 2.02, w: 3.8, h: 0.28, fontFace: MONO, fontSize: 10.5, bold: true, color: FAINT, charSpacing: 1.5, margin: 0 });
  map.forEach((m, i) => {
    const y = 2.38 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.45, y, w: 3.83, h: 0.52, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.45, y, w: 0.055, h: 0.52, fill: { color: m[2] }, line: { type: "none" } });
    s.addText(m[0], { x: 5.62, y: y + 0.06, w: 3.55, h: 0.24, fontFace: MONO, fontSize: 11.5, bold: true, color: CREAM, margin: 0 });
    s.addText(m[1], { x: 5.62, y: y + 0.28, w: 3.6, h: 0.22, fontFace: SANS, fontSize: 10.5, color: MUTED, margin: 0 });
  });
})();

// S30 RECAP
(() => {
  const s = content("recap.md");
  head(s, "Lock it in", "Recap & practice");
  card(s, 0.72, 2.1, 4.2, 2.55, "You can now…", "• Install, log in, find your files\n• Ask a codebase about itself\n• Edit through the approval flow\n• Drive with slash commands\n• Manage context & permissions\n• Fix a bug, add a feature, ship it", GREEN);
  s.addShape(pres.shapes.RECTANGLE, { x: 5.08, y: 2.1, w: 4.2, h: 2.55, fill: { color: CODE_BG }, line: { color: CORAL, width: 1.5 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.08, y: 2.1, w: 4.2, h: 0.055, fill: { color: CORAL }, line: { type: "none" } });
  s.addText("TRY IT YOURSELF", { x: 5.28, y: 2.26, w: 3.8, h: 0.3, fontFace: MONO, fontSize: 12, bold: true, color: CORAL, charSpacing: 1.5, margin: 0 });
  s.addText([
    { text: "On your own project:", options: { color: CREAM, breakLine: true, paraSpaceAfter: 6 } },
    { text: "1  run /init to make a CLAUDE.md", options: { color: MUTED, breakLine: true, paraSpaceAfter: 4 } },
    { text: "2  ask it what the project does", options: { color: MUTED, breakLine: true, paraSpaceAfter: 4 } },
    { text: "3  fix one thing and commit it", options: { color: MUTED, breakLine: true, paraSpaceAfter: 4 } },
    { text: "4  check /usage", options: { color: MUTED, breakLine: true, paraSpaceAfter: 6 } },
    { text: "The reps are how it sticks.", options: { color: CORAL_BR, italic: true } },
  ], { x: 5.28, y: 2.62, w: 3.85, h: 2.0, fontFace: SANS, fontSize: 13, valign: "top", margin: 0 });
})();

// S31 CLOSE
(() => {
  const s = pres.addSlide();
  bg(s);
  page += 1;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.35, w: 9.3, h: 4.92, fill: { color: PANEL }, line: { type: "none" }, shadow: shadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.35, w: 9.3, h: 0.4, fill: { color: TITLEBAR }, line: { type: "none" } });
  s.addShape(pres.shapes.LINE, { x: 0.35, y: 0.75, w: 9.3, h: 0, line: { color: BORDER_DIM, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: 0.58, y: 0.49, w: 0.12, h: 0.12, fill: { color: RED }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 0.76, y: 0.49, w: 0.12, h: 0.12, fill: { color: YELLOW }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 0.94, y: 0.49, w: 0.12, h: 0.12, fill: { color: GREEN }, line: { type: "none" } });
  s.addText("go-further.md", { x: 1.3, y: 0.38, w: 7.4, h: 0.34, align: "center", valign: "middle", fontFace: MONO, fontSize: 10.5, color: MUTED, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.35, w: 9.3, h: 4.92, fill: { color: BG, transparency: 100 }, line: { color: BORDER, width: 1.5 } });
  s.addText("GO FURTHER", { x: 0.8, y: 0.98, w: 8, h: 0.3, fontFace: MONO, fontSize: 12, bold: true, color: CORAL, charSpacing: 2, margin: 0 });
  s.addText("Make Claude Code yours", { x: 0.77, y: 1.26, w: 8.4, h: 0.6, fontFace: SANS, fontSize: 28, bold: true, color: CREAM, margin: 0 });
  const nexts = [["CLAUDE.md", "project memory"], ["Skills", "reusable workflows"], ["Hooks", "automate on events"], ["MCP", "connect tools & data"]];
  nexts.forEach((n, i) => {
    const x = 0.8 + (i % 2) * 4.35;
    const y = 1.98 + Math.floor(i / 2) * 0.74;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.05, h: 0.64, fill: { color: CODE_BG }, line: { color: BORDER_DIM, width: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.055, h: 0.64, fill: { color: CORAL }, line: { type: "none" } });
    s.addText(n[0], { x: x + 0.2, y: y + 0.1, w: 3.7, h: 0.26, fontFace: MONO, fontSize: 13, bold: true, color: CORAL, margin: 0 });
    s.addText(n[1], { x: x + 0.2, y: y + 0.36, w: 3.7, h: 0.24, fontFace: SANS, fontSize: 11.5, color: MUTED, margin: 0 });
  });
  s.addShape(pres.shapes.LINE, { x: 0.8, y: 3.55, w: 8.4, h: 0, line: { color: BORDER_DIM, width: 1 } });
  s.addText([{ text: "$ ", options: { color: GREEN, bold: true } }, { text: "claude", options: { color: CREAM } }, { text: "   ", options: {} }, { text: "# now go build something.", options: { color: FAINT } }], { x: 0.8, y: 3.75, w: 8.4, h: 0.4, fontFace: MONO, fontSize: 16, margin: 0 });
  s.addText("Docs: code.claude.com/docs   ·   In-session help: /help   ·   Community: anthropic.com/discord", { x: 0.8, y: 4.35, w: 8.4, h: 0.3, fontFace: SANS, fontSize: 11.5, color: MUTED, margin: 0 });
  s.addText("DATA SENSE", { x: 0.8, y: 4.66, w: 1.95, h: 0.36, align: "center", valign: "middle", fontFace: MONO, fontSize: 12, bold: true, color: BG, fill: { color: CORAL }, charSpacing: 1, margin: 0 });
  s.addText("Launchpad community  ·  Keep building.", { x: 2.9, y: 4.66, w: 6.3, h: 0.36, valign: "middle", fontFace: SANS, fontSize: 13, italic: true, color: CORAL_BR, margin: 0 });
  foot(s, page);
})();

pres.writeFile({ fileName: process.argv[2] || "Claude-Code-for-Builders.pptx" }).then((f) => console.log("wrote", f, "·", page, "content pages"));
