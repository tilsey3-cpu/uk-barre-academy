# CLAUDE.MD — UK Barre Academy (UBA)

## Project Overview

UK Barre Academy (UBA) is a premium training platform that certifies the next generation of barre instructors in the UK, built on ballet technique, strength training, and intelligent movement.

The live site is currently a **coming-soon landing page** (Founding Instructor Programme 2026 signup) while the full site is built. It ships as compiled static output at the repo root, built from a React + Tailwind source in `app/`. The original full multi-section site is archived at `full-site.html` (reachable directly, not linked from nav) and will eventually be rebuilt to match the current direction below — see **Legacy pages**.

**This is a separate brand and a separate codebase from VAKS Tutoring** (`../vaks`). Do not apply VAKS's violet/editorial-tutoring palette, tone, or components here. If you're ever unsure which brand applies, check which repo/folder you're in.

---

## Brand Positioning

The brand sits closer to **high-end health tech** than fitness — think Apple meets Oura meets a luxury wearable. Precision over hype, calm over loud. Movement is treated as **craft**, not workout.

### Brand keywords
Precision · Control · Strength · Alignment · Discipline · Refinement · Performance · Calm authority · Modern luxury

### Audience
Studios, health clubs, and independent trainers in the UK who want a refined, technically-sound, commercially-relevant teaching method. Founder: Maggie Paterson, 40+ years teaching experience.

---

## Copy & Voice

- **Calm authority.** Never cheerleader, never coach-shouty, never "let's crush it."
- **States, never sells.** Assumes the reader is a professional.
- **"You" is functional only** ("Your enrolment", "What you'll learn") — editorial copy is impersonal, about the method.
- **Technical but not jargon-heavy.** "Alignment", "control", "form" are fine. Avoid clinical Latinates and gym slang ("burn", "shred", "tone").
- **No emoji. Ever. No exceptions.**
- **No exclamation marks. Ever.**
- **Title-case** for product names (UK Barre Academy, The Method, The Programme). **Sentence case** everywhere else (buttons, labels, body). **UPPERCASE** only for eyebrows/kickers with wide tracking.
- **Numerals over words** for figures (8 weeks, not "eight weeks").
- Buttons: sentence case — `Register your interest`, not `Register Your Interest` or `REGISTER YOUR INTEREST`.

**Example — yes:** "A new standard for Barre education, starting with its instructors."
**Example — no:** "🔥 Get certified! Become the BEST barre instructor 💪"

---

## Colour

Current tokens live in `app/tailwind.config.js` / `app/src/index.css`. Full reference table in `project/colors_and_type.css`.

| Role | Hex | Notes |
|---|---|---|
| Ground (light) | `#FFFFFF` | Pure white — the default canvas. Deliberate, not a fallback. |
| Ground (inverted) | `#000000` | Pure black — impact sections (hero, method, curriculum, register). |
| Body text | `#000000` on white / `#FFFFFF` on black | High contrast, no soft-black compromise. |
| Muted text | `#525252` | Secondary copy, captions, eyebrows on light |
| Muted text (inverted) | `#999999` | Eyebrows on black sections |
| Hairline / card border | `#E5E5E5` | Card borders, dividers |
| Featured surface | `#F5F5F5` | Fill for the one "featured" card per page (pricing) |
| Check / included | `#16A34A` (green-600) light · `#22C55E` (green-500) dark | **Semantic only** — included-item confirmation, never a brand accent |

**No accent hue.** This is a pure black/white system — there is no equivalent to the old sand/gold accent. Do not introduce a colour accent without discussing it first; the only colour in the palette is the semantic green check.

---

## Typography

- **Primary:** Avenir (system font on macOS) → **Nunito Sans** → **Montserrat** → sans-serif. Loaded via Google Fonts for the two fallbacks (Avenir isn't webfont-licensable, so real Avenir only appears on devices that already have it).
- **Headings are weight 400** (regular, not light/thin) — geometric and confident, not whisper-quiet. `h-display`: `clamp(32px, 5vw, 48px)`, line-height 1, letter-spacing -0.01em.
- **Eyebrows:** 12px, weight **800**, uppercase, tracked +0.14em, `#525252` (`#999` on black).
- **Body:** weight 400, relaxed leading, ~65ch measure.
- No monospace family in the current build (JetBrains Mono / index numerals were part of the previous direction — see Legacy).

---

## Layout & Components

- **Container:** max-width 1080px, centred. Section padding: `py-24` (96px vertical) as the standard rhythm.
- **Grid sections** (stats, checklists, curriculum cards on mobile): responsive 1/2/3/4-column Tailwind grids, symmetric and centred — not the old asymmetric 5/6-column editorial split.
- **Storytelling sections keep asymmetry:** "How It Works" (3 alternating image/text rows) and "The Curriculum" (vertical timeline: centred spine, numbered circular badges, alternating card/text rows, mobile falls back to a left-aligned stacked spine) are the exception — alternation is reserved for sections that are genuinely sequential.
- **Cards:** 16px radius, 24px padding, 1px `#E5E5E5` border, white fill. Featured variant (pricing): 2px solid black border, `#F5F5F5` fill. Checklist items and curriculum-timeline cards both use this card language — it's now a core, load-bearing pattern, not an occasional accent.
- **Buttons are fully-rounded pills** (`border-radius: 9999px`) by default now — this is a deliberate reversal of the old "pills are for status only" rule. Primary = black fill / white text (or white fill / black text on dark grounds); ghost/ghost-outline variants use a white/30–60% border on photography.
- **Photography:** full-bleed hero, tall crops for inline editorial (unchanged from before) — studio photography, calm mood, form over faces.

## Iconography

- **Lucide icons, used functionally.** The old "restraint, zero icons per section" rule is retired for list content: every checklist item (Method, Who Is It For, What Will I Receive) carries a green `CheckCircle2` icon — this is now expected, not decorative.
- Mobile nav uses a simple `Menu` / `X` toggle icon.
- Still: no emoji, no icons as pure ornament. A single `→` remains fine inside button/link text.
- Logo: `assets/UBA-logo-black.png` (light surfaces) / `UBA-logo-white.png` (dark surfaces).

## Motion

- **GSAP + ScrollTrigger** power scroll-driven moments: a `<Reveal>` wrapper (`app/src/components/Reveal.jsx`) fades/slides section content up on scroll-into-view (used once per section, with `stagger` for list/grid children); the hero runs a load-time entrance timeline instead of a scroll trigger. The Curriculum section additionally scrubs a vertical progress line to the scroll position (`scrollTrigger: { scrub: true }`).
- **`prefers-reduced-motion` is respected everywhere** — `Reveal` and the hero/Curriculum animations check `prefersReducedMotion()` (`app/src/lib/gsapSetup.js`) and skip straight to the final state if it's set. Any new GSAP animation must do the same — never leave content at `opacity: 0` for reduced-motion users.
- Simple CSS transitions still cover everything else — colour/background/border/opacity, 200–300ms ease (header solidify-on-scroll, `.pill` hover).
- Hover: opacity or fill/border colour change, or a small `-translate-y` card lift — never a saturated colour shift (there's no saturated colour to shift to) and never bounce/spring.

## Shadows

- Effectively none in the current build — depth comes from the black/white contrast and card borders, not elevation. If a shadow is ever needed, keep it barely-there and neutral-tinted, never pure black.

---

## Technical Notes

- **Source:** `app/` — a React + Tailwind (Vite) project. Components in `app/src/components/`, one file per page section. GSAP (+ ScrollTrigger) drives scroll/entrance animation; Radix UI (`@radix-ui/react-dialog`) backs the accessible mobile-nav Dialog. Not Next.js — see the tech-stack decision in `chats/` if that's ever revisited.
- **Deploy model:** the site is **not** built by GitHub Pages or Vercel. Compile locally and copy the output over the repo root — commit both the `app/` source changes and the compiled output together. GitHub Pages and Vercel then serve the repo root exactly as before, with zero pipeline changes.
  1. **First, delete any stale hashed bundle from the repo root:** `rm assets/index-*.css assets/index-*.js`. This step is mandatory, not optional — `app/public/assets` is a symlink to the repo-root `assets/` folder, so any previous build's hashed JS/CSS still sitting there gets silently re-copied into the *next* `dist/assets/` via Vite's publicDir step, and from there right back into the repo root. Skipping this step means old and new bundles pile up together and stale JS can end up live.
  2. `cd app && npm run build`
  3. `cp app/dist/index.html index.html && rsync -a app/dist/assets/ assets/` from the repo root.
  4. Sanity check: `ls assets | grep '^index-'` should show exactly the two files referenced in `index.html` — nothing else.
- **Base path:** `vite.config.js` sets `base: './'` (relative) — required because GitHub Pages serves this repo under `/uk-barre-academy/`, not domain root. Do not change this to an absolute `/` path without re-testing both GitHub Pages and Vercel.
- **Assets:** `app/public/assets` is a symlink to the repo-root `assets/` folder, so `npm run dev`/`build` both resolve images from the single shared asset directory. Reference images in components via the `asset()` helper (`app/src/asset.js`, wraps `import.meta.env.BASE_URL`) — never a hardcoded `/assets/...` absolute path, which breaks under the GitHub Pages subpath.
- The registration form and date picker are fully interactive client-side but **not wired to a backend** — submitting logs to the console and shows a client-side thank-you state. Replace with a real endpoint/Typeform when ready (see TODO comment in `app/src/components/RegisterForm.jsx`).

---

## Legacy pages (pre-rebrand — not yet migrated)

`full-site.html`, `training-manual.html`, and `founding-instructor-programme.html` still use the **previous** ink/bone/sand, Inter Tight, hairline-and-rectangle system (near-black `#0A0A0A`, off-white `#F7F7F5`, sand accent `#C8B79A`, 4px-radius rectangular buttons, zero-icon restraint). That system is documented in `project/README.md` and `project/colors_and_type.css`'s legacy block. Don't mix the two systems within one page. When these pages are eventually brought in line with the current direction, update this section and fold their tokens/components into the rules above.

## Reference

- `app/` — current live implementation (React + Tailwind source + compiled output at repo root).
- `project/README.md` — original design-system brief for the *previous* direction (now superseded by this file for new work; kept for the legacy pages above).
- `project/colors_and_type.css` — token reference, updated to the current palette/type with the previous system kept in a clearly marked legacy block.
- `chats/` — original design handoff conversation transcripts; read these for intent history behind the legacy pages.
