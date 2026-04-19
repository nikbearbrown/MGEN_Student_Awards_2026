# Remotion × Claude Code

A video production workspace where you talk to [Remotion](https://remotion.dev) through [Claude Code](https://claude.ai/code) instead of writing React by hand.

## The idea

Remotion lets you build videos in React. Claude Code reads your brand files, project briefs, and reference materials — then writes the composition code for you. You describe what you want; Claude assembles it.

```
You: "Add a scene for Sarah — she built a fintech app, here's her bio."
Claude: reads the brand file, writes Scene-07-Sarah.tsx, registers it in Root.tsx
You: preview it in the studio, ask for tweaks, render when ready
```

No React knowledge required. No manually wiring up animations. Just conversation.

## What's in the box

- **Brand system** — define colors, fonts, and motion rules once in `brand/[BRAND]/[BRAND].md`. Claude reads it before writing any visual code.
- **Per-scene isolation** — every scene is its own `.tsx` file, independently previewable and renderable.
- **Full-reel sequencer** — one `MGENFullReel.tsx` (or equivalent) stitches scenes together with `Series`.
- **Scaffold** — shared components in `src/scaffold/` that Claude reuses across scenes.
- **CLAUDE.md** — workspace rules that Claude reads automatically, so every session starts with full context.

## Get started

See [QUICK-START.md](QUICK-START.md) for install and run instructions.

Open the folder in Claude Code and try:

> "Read CLAUDE.md and the brand file, then help me build a scene for [Name]."

## Stack

- [Remotion](https://remotion.dev) 4.0
- React 18 / TypeScript
- Claude Code (claude.ai/code)
