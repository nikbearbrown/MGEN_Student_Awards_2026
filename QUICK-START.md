# Quick Start

## Requirements

- Node.js 18+ — [nodejs.org](https://nodejs.org)
- Claude Code (optional but recommended) — [claude.ai/code](https://claude.ai/code)

## Install & run

```bash
npm install
npm start
```

This opens the Remotion Studio at `http://localhost:3000`. Leave it running while you work.

## If the studio is already running and you need to restart it

```bash
pkill -f "remotion studio" && npm start
```

## Folder layout

```
brand/          Visual systems (colors, fonts, motion rules)
clients/        Client projects — each has scenes, reference, and renders
src/
  compositions/ One .tsx file per scene
  scaffold/     Shared components used across scenes
  Root.tsx      Composition registry — register new scenes here
out/            Quick-render outputs not tied to a specific project
```

## Adding a scene

1. Create `src/compositions/Scene-NN-Firstname.tsx` — export one named component.
2. Register it in `src/Root.tsx` with a `<Composition>` entry.
3. The scene appears in Remotion Studio automatically on save.

## Removing a scene

1. Delete the import and `<Composition>` line from `src/Root.tsx`.
2. Optionally delete the `.tsx` file.

## Render a single scene

```bash
npx remotion render Scene01Naimisha out/scene-01.mp4
```

## Render the full reel

```bash
npx remotion render MGENFullReel out/full-reel.mp4
```

## Working with Claude Code

Open this folder in Claude Code. The `CLAUDE.md` file gives Claude the workspace rules — brand lookup, scene conventions, folder layout. A good opening prompt:

> "Read CLAUDE.md and the brand file, then help me add a scene for [Name]."
