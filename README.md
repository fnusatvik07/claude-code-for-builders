# Claude Code for Builders

The one-hour class deck for the **Data Sense · Launchpad** community.

## What to open in class

**`slides/Claude-Code-for-Builders.pptx`** — this is the deck you present. That's it.
31 slides, dark terminal theme, covering install to fixing a real bug, slash commands,
context, permissions, and usage tracking.

## Also here

- `REFERENCE.md` — a one-page cheat sheet you can hand out to students.
- `slides/build/deck.js` — the source that builds the deck, if you ever want to edit it.

The demo project students clone lives in a separate repo: **taskflow**.

## Rebuilding the deck (only if you edit it)

```
cd slides
NODE_PATH=/opt/homebrew/lib/node_modules node build/deck.js Claude-Code-for-Builders.pptx
```
