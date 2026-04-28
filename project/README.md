# UK Barre Academy — Design System

A premium, editorial, performance-grade design system for **UK Barre Academy (UBA)** — a training platform that develops the next generation of barre instructors.

> The brand sits closer to **high-end health tech** than fitness. Precision over hype. Calm over loud.

---

## Brand at a glance

UK Barre Academy is a **premium training platform for barre instructors**, built on ballet technique, strength training, and intelligent movement. The audience is studios, health clubs, and independent trainers in the UK who want a refined, technically-sound, commercially-relevant teaching method.

The brand voice is the opposite of "gym energy". Think **Apple meets Oura meets a luxury wearable**: considered, controlled, intentional. Movement is treated as **craft**, not workout.

### Brand keywords
Precision · Control · Strength · Alignment · Discipline · Refinement · Performance · Calm authority · Modern luxury

### Products represented
- **Marketing website** (`ui_kits/website/`) — the public face of UBA, communicating the method, programmes, and how to enrol. This is the only product surface in scope right now.

> No mobile app, learning portal, or admin product was provided. If/when those exist, add them as additional UI kits under `ui_kits/<product>/`.

### Source materials provided
| File | Purpose |
|---|---|
| `uploads/UBA logo_Black.png` | Primary wordmark on light surfaces |
| `uploads/UBA logo_White.png` | Primary wordmark on dark surfaces |
| `uploads/UBA Colour reference.png` | Mood inspiration (Aesop, Glowwell, etc) — **inspirational, not literal** |
| `uploads/Images reference.png` | Photography mood — barre studio, real practice, controlled movement |
| Brand brief | Pasted directly into the chat — see below |

> No Figma, no codebase, no live website. Everything below is derived from the brief + uploaded references.

---

## Content fundamentals

UBA copy is **quiet, declarative, and confident**. It assumes the reader is a professional. It never sells. It states.

### Voice
- **Calm authority.** Never cheerleader. Never coach-shouty. Never "let's crush it."
- **Direct address — "you", but sparingly.** "You" appears in functional copy ("Your enrolment", "What you'll learn"). Editorial copy is impersonal — about the method, not the reader.
- **Technical, but not jargon-heavy.** "Alignment", "control", "form" are at home. Avoid clinical Latinates ("musculoskeletal optimization") and avoid gym slang ("burn", "shred", "tone").
- **Emoji: never.** No exceptions.
- **Exclamation marks: never.**
- **Title-case for product names** (UK Barre Academy, The Method, The Programme). **Sentence case for everything else** — buttons, labels, body. UPPERCASE only for **eyebrows / kickers** with wide tracking.
- **Headlines are short and complete.** No trailing ellipses. No "..." in body.
- **Numerals over words** for figures (8 weeks, not "eight weeks") — feels more product, less prose.

### Casing & typography rules
- Buttons: sentence case — `Apply now`, not `Apply Now` and not `APPLY NOW`.
- Eyebrows: uppercase, tracked +0.22em — `THE METHOD`, `01 — FOUNDATION`.
- Section titles: sentence case, weight 300–400, tightly tracked.
- Numerals in editorial lists: monospace `01 / 02 / 03 / 04` — feels engineered.

### Sample copy
**Hero (yes):**
> A new standard for barre education in the UK.
> Train with intent. Teach with authority.

**Hero (no):**
> 🔥 Get certified! Become the BEST barre instructor 💪

**Section opener (yes):**
> The Method.
> Built on ballet technique, strength training, and intelligent movement.

**CTA (yes):** `Apply now` · `Request the syllabus` · `Begin enrolment`
**CTA (no):** `Get started!` · `Sign up today!!` · `Join the family 💃`

**Programme description (yes):**
> An eight-week, in-person training. Small cohorts. Live assessment. Designed for instructors who already teach — and want their teaching to hold up.

The vibe is **the placard next to a museum exhibit**, not a Facebook ad.

---

## Visual foundations

### Colour
- **Ink** (`#0A0A0A` / `#111111`) and **bone** (`#F7F7F5`) are the entire brand 90% of the time.
- **Warm greys** (`#D1D1D1`, `#A8A8A8`) build hierarchy on light surfaces.
- **Sand** (`#C8B79A`) and **ballet bone** (`#E8DCD0`) are the only accents — used at the rate of a single piece of jewellery per outfit. Never as a flood. Often as a 1px line, a small chip, a hover state, or a specimen swatch.
- **Never** bright, neon, gradient-heavy, or "energetic" palettes.

See `colors_and_type.css` for the full token set.

### Typography
- **Single family**: clean modern sans (`Inter Tight` as a Google Fonts substitute for Söhne / NB International / GT America — see "Font substitution" below).
- **Display weights are light (200–300)**. Body is 400. We almost never bold body text.
- **Headlines are tightly tracked** (-0.025em to -0.04em). Body uses normal tracking with **generous leading (1.6)**.
- A **monospace** (`JetBrains Mono`) is reserved for indices, captions, and microcopy — it adds an editorial / engineered feel without touching the main voice.

### Layout & grid
- **Generous margins.** Container max ~1320px on desktop, with 96–160px section padding vertically.
- **Strict 12-column grid.** Content lives in 6–8 cols; the surrounding whitespace is intentional, not "we ran out of content".
- **Asymmetric editorial layouts** are encouraged: text in a 5-col column with a single image filling the next 6 cols and one column of breathing room. Avoid centred-everything.
- **Hairlines, not heavy borders.** A 1px `--line` is the workhorse. Never a 2–3px bordered card.
- **Sections are modular and repeatable.** Eyebrow → headline → lede → CTA / supporting block. Each section earns its place.

### Imagery
- **Studio photography only.** Soft, directional light. Slight shadow, calm mood.
- **Body parts and form, not faces.** Close-ups of feet, posture, alignment, hands at the barre. When faces appear, they're in motion — not smiling at the camera.
- **No group "fitness class" energy.** No high-fives, no contagious-grin shots.
- **Tonally warm**, slightly desaturated. Never high-contrast or neon-graded.
- **Full-bleed images** for heroes. **Tall portrait crops** for inline editorial. **Generous white space** around inline imagery — never edge-to-edge cards.

### Backgrounds
- **Bone (`#F7F7F5`) is the default.** Pure white feels clinical; bone feels like paper.
- **Ink (`#0A0A0A`) for impact sections** — heroes, programme intros, brand statements.
- **No gradients.** No textures. No patterns. No grain. The image carries the mood.
- Section transitions are achieved by **swapping bg + fg pairs**, not by gradient bridges.

### Motion
- **Effortless, not energetic.** Everything is fade + soft scale + parallax — never bounce, spring, or staggered-letters.
- **Default ease**: `cubic-bezier(0.16, 1, 0.3, 1)` (quart-out).
- **Default duration**: 280ms for UI, 520–900ms for content reveals.
- **Hover**: opacity drop to 0.7, or a 1px underline reveal. **Never** colour-shift to a saturated hue.
- **Press**: subtle inset (0.98 scale) on buttons. No colour change.
- **Scroll-in**: 24px upward translate + fade, soft ease, ~600ms. Stagger by 60ms.
- **No looping animations.** Once it lands, it's still.

### Borders, shadows, radii, depth
- **Radii**: 0, 2, 4, 8, 12px and `999px` for pills. **Default is 4–8px**. Cards never exceed 12px.
- **Shadows are barely-there**: `0 4px 18px rgba(10,10,10,0.06)`. Often **no shadow at all** — depth comes from a 1px line and bone-vs-white surface change.
- **No "protection gradients".** Text on imagery sits on a solid scrim block (ink @ 60%) in a corner, or uses a ballet/sand caption strip.
- **Capsules** (pills) are reserved for **status / metadata**, never for buttons.
- **Buttons** are rectangles with radius-2 (4px) — minimal, rounded but not playful.

### Layout rules in practice
- Sticky nav: 64px tall, transparent over imagery, bone solid over content (no shadow, just a 1px ink line on scroll).
- Footer: bone or ink, 4-column grid, no decoration.
- Cards: bone-2 background, no shadow, radius-3 (8px), 1px line — or sometimes only the line.
- **Transparency / blur**: used on the nav (`backdrop-filter: blur(20px)` on transparent-ink) when over imagery. Otherwise avoid.
- **Imagery is never tinted with brand colour**. Keep it natural.

---

## Iconography

UBA does not use a heavy icon system. **Restraint is the rule.**

- **No icon font, no Lucide-everywhere.** A typical UBA section has zero icons.
- **Where icons are needed** (programme cards, navigation accents, footer social, form states), use **Lucide** (`https://unpkg.com/lucide@latest`) at **1.25–1.5px stroke weight, current colour, 16–20px**. Lucide is linked from CDN — flagged as a closest-match substitute since the brief specifies no icon system.
- **Logo is the hero.** The UBA wordmark with the integrated triangle (the "A" doubling as a barre / studio motif) is the only consistent graphic mark.
- **No emoji. Ever.** Not in product, not in marketing, not in social copy.
- **No unicode glyphs as decoration** (no ★, ✓, →) — except in functional contexts: a single `→` is permitted as the only directional cue inside text links.
- **Numerals as iconography**: monospace indices (`01`, `02`, `03`) carry the visual weight icons usually would. This is intentional — it reads as engineered, not decorated.

### Logo files
- `assets/UBA-logo-black.png` — for light surfaces.
- `assets/UBA-logo-white.png` — for dark surfaces.
- Always include the © symbol and `UK BARRE ACADEMY` typeset block when at full lockup.
- Minimum width: **96px** for the wordmark-only version.

---

## Font substitution — please review

The brief specifies an "Apple / Oura / Superpower level" sans-serif. The closest **licensed-free** Google Fonts match is **Inter Tight** (200–700). Mono is **JetBrains Mono**.

**If you have license to** Söhne, NB International Pro, GT America, or Neue Haas Grotesk Display — **please send the font files** and we'll swap them into `fonts/` and update `colors_and_type.css`. The current substitute is close in metrics but the real article will lift the brand another 15%.

---

## Index

```
/
├── README.md                  ← you are here
├── SKILL.md                   ← portable Claude Skill manifest
├── colors_and_type.css        ← all design tokens (colors, type, spacing, motion)
├── assets/                    ← logos, reference imagery
│   ├── UBA-logo-black.png
│   ├── UBA-logo-white.png
│   ├── colour-reference.png
│   └── imagery-reference.png
├── preview/                   ← Design System tab cards
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── components-*.html
│   └── brand-*.html
└── ui_kits/
    └── website/               ← UK Barre Academy marketing site
        ├── index.html
        ├── README.md
        └── *.jsx              ← per-component recreations
```

### What lives where
- **`colors_and_type.css`** — drop this in any HTML file to get the full UBA system. Contains both raw tokens (`--uba-ink`, `--uba-sand`) and semantic vars (`--bg`, `--fg`, `--accent`).
- **`assets/`** — copy these into your project; do not hot-link.
- **`preview/`** — small specimen cards shown in the Design System tab. Browse there for visual reference.
- **`ui_kits/website/`** — high-fidelity recreation of the marketing site. Open `index.html` to click through.
