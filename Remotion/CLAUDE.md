# Nik's Remotion Workspace

A conversational Remotion workspace for producing any kind of video. The official Remotion agent skill (installed via `npx skills add remotion-dev/skills`) handles framework conventions — composition patterns, Sequence/Series, interpolate/spring, font loading, render commands. This file only covers workspace-level rules beyond that.

## Folder layout

- `brand/[BRAND]/[BRAND].md` — visual systems (colors, fonts, motion, component patterns). Reusable across clients and projects. Example: `brand/NEU/NEU.md`.
- `clients/[CLIENT]/[PROJECT]/` — a specific deliverable for a specific client. Holds the project brief, content reference, scenes, and rendered output. Everything that's unique to this project lives here.
- `src/scaffold/` — cross-project Remotion primitives (reusable components, helpers).
- `saves/[NAME]/` — named checkpoints of work worth preserving independent of any client or project.
- `out/` — rendered MP4s from quick tests and one-offs that aren't tied to a project. Project-specific renders go in the project's own folder.

## Brand vs. client vs. project

Keep these separate. They get conflated easily.

- A **brand** is a visual system. NEU is a brand. A brand applies to many projects over many years. Brand files change rarely.
- A **client** is who the work is for. College of Engineering (COE) is a client. A client usually has a preferred brand but may have several projects.
- A **project** is a specific deliverable. MGEN Awards 2026 is a project under COE. Projects have content, a deadline, and a rendered output. Projects come and go.

Example path: `clients/COE/MGEN-Awards-2026/` for the project; `brand/NEU/NEU.md` for the visual system it applies; student HTMLs for this project live at `clients/COE/MGEN-Awards-2026/reference/students/` — not in brand, because they're content specific to this deliverable.

## Project layout

A project subfolder follows this shape:

```
clients/[CLIENT]/[PROJECT]/
├── PROJECT.md       Brief, status, deadline, contacts, which brand it uses
├── reference/       Content reference materials (HTMLs, mood boards, source docs)
├── src/
│   ├── Root.tsx     Composition registry for this project
│   ├── scenes/      One file per scene
│   └── [top-level compositions like Intro.tsx, Outro.tsx, FullReel.tsx]
└── out/             Rendered MP4s for this project
```

## Brand lookup

When the user references a brand by name — "use NEU," "apply the Acme brand" — read `brand/[BRAND]/[BRAND].md` before writing any visual code. That file is the source of truth for colors, fonts, motion, component patterns. Don't invent values it doesn't specify.

If the referenced brand file doesn't exist, ask before creating one.

## Project lookup

When the user mentions a project by name — "the MGEN awards video," "the COE reel" — look in `clients/*/[PROJECT]/` and read its `PROJECT.md` before generating code. The project folder and PROJECT.md are the source of truth for this project's content, scope, and which brand to apply.

Don't invent content (names, titles, statistics, project descriptions) that isn't grounded in the project's `reference/` materials. If grounding data is missing for a specific element, ask.

## Saves

When the user wants to preserve work independent of a client or project, put it in `saves/[kebab-name]/` along with a `NOTES.md`. NOTES.md is the interface between the current session and a future session that may have no chat history — write it with that reader in mind.

Saves are for reusable patterns and one-offs worth keeping. Project work lives in its project folder, not in `saves/`.

## Workspace defaults

- Video dimensions default to 1920×1080 at 30fps.
- Scenes are silent by default. Add audio only when the user asks.
- Don't install npm packages or modify `package.json` / `tsconfig.json` / `remotion.config.ts` without asking first.
- One font family per visual system, unless a brand file specifies otherwise.

## Scene file convention

Multi-scene videos always follow this structure — no exceptions:

- **One file per scene** — `Scene-NN-[Firstname].tsx` (zero-padded number, kebab-case first name). Each file exports one named React component and is independently renderable.
- **Shared helpers in `src/scaffold/`** — components used by more than one scene live there. Scene files import from scaffold; they never import from each other.
- **Sequencer is a separate file** — the full-reel composition (e.g. `FullReel.tsx`) imports all scenes and uses `Series` / `Series.Sequence` to play them in order. It contains no scene content.
- **Never build a monolithic composition** — do not put multiple scenes inside a single `.tsx` file. If asked to add a scene, create a new file and wire it into the sequencer.

Each scene is registered individually in `Root.tsx` so it can be rendered in isolation:
```
npx remotion render Scene03Paramjeet out/scene-03.mp4
```

## Three principles

1. **Brand and reference are contract.** When a brand file exists, follow it. When project reference materials exist, they are the ground truth for that project's content.
2. **Human creates, Claude assembles.** The user sources external content (images, reference material, copy). Claude Code writes the composition code that assembles it.
3. **Per-composition isolation.** Cross-composition imports only from `src/scaffold/` and the relevant brand folder.
