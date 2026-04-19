# Northeastern University — Brand System for Motion Graphics

Use this document when the user asks for NEU-branded scenes. Apply everything here. When uncertain about a specific pattern, pattern-match against the AutoInsight and A*-PO reference HTML pages (if saved under `brand/_reference/`).

---

## Core colors

All colors are defined as CSS hex. Use these exact values.

- **Black** `#000000` — primary background for hero and data sections
- **White** `#FFFFFF` — primary background for breakdown/detail sections; primary foreground on black
- **Red** `#C8102E` — Pantone 186 U — brand reinforcement. Use in every scene. Reserved for: accent bars, key-word emphasis in headlines, pull-quote numerals, section dividers
- **Gold** `#A4804A` — Pantone 871 Metallic C — secondary accent. Use for eyebrow labels on dark sections, subtle uppercase metadata
- **Light** `#f5f5f5` — soft background for non-hero sections
- **Mid** `#e8e8e8` — subtle borders on light backgrounds
- **Slate** `#555555` — body text on light backgrounds

**Hierarchy rule (from the Northeastern brand center):** Black and white are roughly 35% each of any composition. Red is 27% — always present, never dominant. Gold is 3% — used sparingly as metadata accent only.

---

## Typography

Two families. Use both. Never introduce a third.

- **Lato** — headlines, body, UI labels. Weights used: 300, 400, 700, 900; italic 400. Google Fonts import: `family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400`
- **JetBrains Mono** — technical labels, stat numerals, eyebrows, chips, tags. Weights used: 400, 500, 600. Google Fonts import: `family=JetBrains+Mono:wght@400;500;600`

### Headlines (Lato 900)
- Size: `clamp(38px, 6vw, 88px)` for hero h1
- Letter-spacing: `-0.03em` (tight)
- Line-height: `0.95` to `1.1`
- Color white on dark backgrounds, black on light
- Headlines may contain ONE key word in red — wrap in an `<em>` tag, keep font-style normal, color `#C8102E`

### Section headings (Lato 900)
- Size: `clamp(24px, 3vw, 40px)`
- Letter-spacing: `-0.025em`
- Line-height: `1.1`
- Color: black on light sections, white on dark

### Body (Lato 300/400)
- Hero subtitles: weight 300, 18px, line-height 1.65, color `rgba(255,255,255,0.55)` on dark / `#555` on light
- Regular body: weight 400, 13-16px, line-height 1.6-1.7, color `#555` on light / `rgba(255,255,255,0.45)` on dark

### Eyebrow labels (JetBrains Mono, 600) — signature NEU pattern
Appears above every section heading. This is the most distinctive element of the system.
- Font: JetBrains Mono, 10px, 600 weight
- Letter-spacing: `0.22em`
- Transform: uppercase
- Color: gold `#A4804A` on dark / red `#C8102E` on light
- **Always preceded by a horizontal bar** — 18-22px wide × 2px tall, same color as the text, gap 10px between bar and text

### Chips / tags (JetBrains Mono, 600-700)
- Font: JetBrains Mono, 10-12px, weight 600-700
- Letter-spacing: `0.05em`
- Padding: `6px 16px` (standard) or `3px 10px` (compact)
- Border-radius: 2px (subtle square corners)
- **Dark variant:** bg `rgba(255,255,255,0.06)`, border `1px solid rgba(255,255,255,0.12)`, color `rgba(255,255,255,0.7)`
- **Red variant (dark):** bg `rgba(200,16,46,0.15)`, border `1px solid rgba(200,16,46,0.35)`, color `#ff6b7a`
- **Light variant:** bg `#ffebee`, border `1px solid rgba(200,16,46,0.3)`, color `#C8102E`

### Stat blocks (JetBrains Mono numerals, Lato labels)
Used in hero stats bars and metric card sections.
- Container: bordered grid, `1px solid rgba(255,255,255,0.1)`, no gap between blocks, 1px borders between
- Number: JetBrains Mono, 24-54px, weight 900, letter-spacing `-0.03em` to `-0.04em`, line-height 1, color white
- **Number accent:** wrap the unit or last part in a `<span>` with color red `#C8102E` (e.g., the `%` in `33%`, the `K+` in `224K+`)
- Label: JetBrains Mono, 9-10px, color `rgba(255,255,255,0.3)`, uppercase, letter-spacing `0.12em`, margin-top 4-5px, text stays on 1-2 lines

---

## Component patterns

### Hero (opens every video or major section)
- Black background
- **Subtle grid overlay:** repeating lines at `rgba(255,255,255,0.025)` opacity, `1px` stroke, 48-52px × 48-52px grid
- Content layers, top to bottom: eyebrow label → h1 (with red em word) → subtitle → chips row → stats bar
- Red accent bar at the bottom: full-width, 3px tall
- Padding: generous (80px+ vertical, 6vw horizontal)

### Section structure (general)
1. Eyebrow label (gold on dark / red on light, with leading bar)
2. Section heading (Lato 900, tight letter-spacing)
3. Section subtitle (Lato 300, slate on light / 0.4 white on dark)
4. Content grid below

### Metric card (on dark sections)
- Background: `#111` (almost-black)
- Top border: 3px, colored (red / gold / white alpha)
- Padding: 36px 28px
- Large JetBrains Mono number with red `<span>` accents
- Small label below (13px, 0.45 white, line-height 1.5)

### Feature card (on light sections)
- Background: white
- Border: `1px solid #e8e8e8`
- Left border accent: 4px, colored (red for "before/bad", black for "after/good")
- Padding: 28px 30px
- Inner: h4 (Lato 900, 15px), body (13.5px, slate, line-height 1.65)

### Card grids
- Typically 2, 3, or 4 columns
- **Gap: 2px between cards** — this tight gap is intentional and creates the industrial look. Do not use wider gaps.
- Background sections often use light gray (`#f5f5f5`) with card backgrounds white

---

## Layout conventions

- Section padding: 80px vertical, 6vw horizontal
- **Section alternation:** dark (hero) → light (breakdown) → dark (data/metrics) → light (tech details) → red (conclusion). This alternation gives the pacing.
- Max content width: hero 760-820px, sections 580-800px
- Grid gap in card sections: 2px (tight, industrial)
- Horizontal rules: 2-3px tall, red, short (~72px) — never full-width except at hero bottom

---

## Motion conventions (Remotion idiom)

These are what "NEU motion graphics" should feel like. Use these defaults unless the user overrides.

### Scene opener pattern
Approximate frame budget for a scene opener: 40-60 frames.

1. **Black background establishes** — hold for 6-8 frames before any content appears
2. **Eyebrow enters from left** — the gold bar grows from width 0 to target width (22px) over 12 frames using `spring({ damping: 200 })`, then the eyebrow label text fades in (10 frames, opacity 0→1)
3. **Section heading enters by word** — each word wrapped in overflow-hidden span, child translates from `translateY(110%)` to `translateY(0)` using spring damping 200, 14-18 frames per word, staggered 6-8 frames between words
4. **Red accent bar below heading** — width animates from 0 to 72px over 18 frames, ease-out
5. **Subtitle fades in** — opacity 0→1 over 12 frames, starting 10 frames after heading completes
6. **Stats/chips pop in staggered** — each using spring damping 200, 10-12 frames, stagger 4-6 frames between

### Number reveal
- Integer stats count up via `interpolate(frame, [start, start+24], [0, targetValue])`
- Non-integer / string stats fade-reveal instead (opacity 0→1, 12 frames)
- Red `<span>` unit inside the number appears 2 frames AFTER the counting finishes (fade 6 frames)

### Transitions between scenes
- **Default:** crossfade, 12 frames
- **Hard cut on red:** for dramatic moments, cut to a 2-frame full-red interstitial, then cut to next scene
- **Bar-wipe:** red bar grows across frame (left to right) over 18 frames; next scene appears behind it; or bar covers then shrinks to reveal

### Stylistic rules
- Every spring uses `damping: 200` unless specified otherwise
- Every interpolate uses `extrapolateLeft: 'clamp', extrapolateRight: 'clamp'`
- **No bouncy springs.** This is an industrial, corporate-adjacent system. Motion is controlled, confident, not playful.
- Entries use translate + opacity combined. Exits use opacity alone (simple fades).
- No rotation on text or key elements. Rotation reserved for decorative background motion.

---

## What to AVOID when building NEU motion graphics

- Do NOT use bouncy or playful spring configs (damping below 100)
- Do NOT introduce a third typeface
- Do NOT use colors outside the defined palette
- Do NOT center-align body text (left-align is default; center is reserved for conclusion sections)
- Do NOT use rounded corners larger than 2px on containers
- Do NOT introduce gradients outside of subtle section transitions
- Do NOT stamp the NEU logo into every scene — brand reinforcement happens via the red accent bar, the red key-word emphasis, and the eyebrow system

---

## Signature elements (must appear somewhere in any NEU video)

- Red accent bar (bottom of hero, or growing under headings)
- At least one red `<em>` word in a headline
- Gold eyebrow label on at least one section
- JetBrains Mono for all numerals and technical labels
- Grid-aligned layouts (no floating freeform elements)

---

## Reference artifacts

The AutoInsight and A*-PO student project HTML pages are the canonical example of this design system applied to the web. They are the source of truth for the visual language. When building motion graphics, translate their static patterns into frame-based animations following the motion conventions above.

If you save the HTML reference pages to `brand/_reference/`, you can inspect them directly. Otherwise, this document is self-contained.
