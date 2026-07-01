# Claude Code Reference & Cheat Sheet

A handout for students. Everything shown in the "Claude Code for Builders" class,
in one place. Verified against the official docs at code.claude.com/docs.

> Note: some commands are version dependent. If one is missing, run `/help` to see
> what your version supports, and `/doctor` if something looks broken.

---

## 1. Starting out

| Shell command | What it does |
|---------------|--------------|
| `claude` | Start an interactive session in the current folder |
| `claude "task"` | Run a one time task, then drop into the session |
| `claude -p "query"` | Print a one off answer and exit (good for scripts) |
| `claude -c` | Continue the most recent conversation in this folder |
| `claude -r` | Resume and pick from previous conversations |

First session checklist:
1. `claude` and sign in on first run
2. `/init` to generate a starter `CLAUDE.md`
3. `/memory` to review what Claude remembers
4. `/permissions` to set what needs approval

---

## 2. Essential slash commands (inside a session)

Type `/` to see the full menu. Start typing to filter.

**Session & navigation**

| Command | What it does |
|---------|--------------|
| `/help` | Show help and available commands |
| `/clear` | Start a fresh conversation (clears context) |
| `/compact` | Summarize the conversation to free up context |
| `/context` | Show how much context is in use, as a grid |
| `/resume` | Reopen an earlier conversation |
| `/status` | Version, model, account, connectivity |
| `/exit` | Quit (or Ctrl+D) |

**Setup & control**

| Command | What it does |
|---------|--------------|
| `/init` | Analyze the project and write a starter `CLAUDE.md` |
| `/memory` | View and edit what Claude remembers |
| `/model` | Switch model |
| `/config` | Open the settings interface |
| `/permissions` | View and edit what Claude can do without asking |
| `/login`, `/logout` | Sign in or out |

**Doing work**

| Command | What it does |
|---------|--------------|
| `/plan` | Enter plan mode: explore and propose before editing |
| `/review` | Review a GitHub pull request |
| `/agents` | Manage subagents |
| `/mcp` | Manage connections to external tools (MCP) |
| `/hooks` | View hooks that run on events |
| `/doctor` | Diagnose and fix your install |
| `/usage` (alias `/cost`) | See usage, cost, and plan limits (see section 6) |

---

## 3. Keyboard & input tricks

| Input | What it does |
|-------|--------------|
| `/` | Open the command and skill menu |
| `Tab` | Autocomplete a command |
| `Up arrow` | Scroll back through your history |
| `Shift+Tab` | Cycle permission modes (see section 5) |
| `Esc` | Stop Claude mid response. Press twice to rewind |
| `@` | Mention a file, for example `@app.py`, to pull it in |
| `!` | Run a shell command directly from the prompt |
| `#` | Tell Claude to remember something, for example `# always use pytest` |
| `Shift+Enter` | New line in a multi line prompt (run `/terminal-setup` once to enable) |

---

## 4. Where everything lives on disk

| Scope | Location | Shared with the team? |
|-------|----------|-----------------------|
| User (you, all projects) | `~/.claude/` | No |
| Project (this repo) | `./.claude/` | Yes, commit it to git |
| Local (this repo, just you) | `./.claude/settings.local.json` | No, gitignored |

Inside `~/.claude/` you will find:

```
~/.claude/
  settings.json        your personal settings
  CLAUDE.md            your personal, always on instructions
  commands/            your custom slash commands
  agents/              your subagent definitions
  skills/              your skills
  projects/            per project memory that Claude writes automatically
```

Settings precedence, highest wins: managed (IT) > local > project > user.
If something is denied at any level, it stays denied.

---

## 5. Context and permissions

**CLAUDE.md is your project's memory.** Claude reads it at the start of every session.
Good things to put in it: build and test commands, coding conventions, project layout,
and "always do X / never do Y" rules. Keep it under ~200 lines. Generate a starter with
`/init`, then trim it.

**Managing context during a long session:**
- `/clear` when you switch to an unrelated task (starts clean)
- `/compact` when you want to keep going but free up room (summarizes)
- `/context` to see how full the window is

**Permission modes, cycle with Shift+Tab:**

| Mode | Behavior |
|------|----------|
| default | Ask before the first use of each tool |
| accept edits | Auto accept file edits in the working folder |
| plan | Read and explore only, no edits, propose a plan first |

There are more advanced modes (auto, bypass) for containers and power users, but these
three are what you use day to day. You can also write allow / deny rules in
`.claude/settings.json` so common commands stop asking.

---

## 6. Tracking your usage and cost

Run `/usage` (also aliased as `/cost`) inside a session. What it shows depends on your account:

- **Pro / Max / Team subscription:** shows your plan limits and how much you have used
  (24h and 7d). The dollar figure is not a bill, your usage is included in the plan.
  Also see **claude.ai/settings** under Account & Usage.
- **Console / API (pay as you go):** shows session cost and a token breakdown.
  The authoritative billing view is **console.anthropic.com/usage**, where you can also
  set spend limits.

`/status` shows your version, model, and account at any time.

---

## 7. Making Claude Code yours (what comes next)

| Feature | What it is | Reach for it when |
|---------|------------|-------------------|
| CLAUDE.md | Always on project instructions | You keep repeating the same context |
| Custom commands / Skills | Reusable prompts and workflows behind `/name` | You do the same task often |
| Subagents | A helper with its own context that reports back | Research or parallel work |
| Hooks | Shell commands that run on events | Lint on save, block risky commands |
| MCP | Connect Claude to outside tools and data | Databases, Slack, the browser, APIs |
| Plugins | A bundle of the above, shared as one unit | Sharing a setup across a team |

---

Docs: code.claude.com/docs  ·  In session help: `/help`  ·  Community: anthropic.com/discord
