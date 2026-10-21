# CLAUDE.MD — UK Barre Academy (UBA)

## Project Overview

UK Barre Academy (UBA) is a premium training platform that certifies the next generation of barre instructors in the UK, built on ballet technique, strength training, and intelligent movement.

The site is a long homepage selling the Founding Instructor Programme 2026 (dates, fee, Stripe booking) plus three policy pages (`/privacy-policy`, `/complaints-policy`, `/terms-and-conditions`). It ships as compiled, pre-rendered static output at the repo root, built from a React + Vite source in `app/`. The current design ("homepage v5") was handed off in `design/homepage-v5/` (local-only, gitignored, never published); its `DESIGN.md` is the design system and wins over everything else in this file on visual questions. The original full multi-section site is archived at `full-site.html` — see **Legacy pages**.

**This repo is UK Barre Academy only.** Use only the UBA design system, tone and identity described here, and commit as the UBA identity (set in this repo's local git config).

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
- **No exclamation marks** in our own copy. Approved testimonials are quoted exactly as given (one ends "…practise at home!").
- **Title-case** for product names (UK Barre Academy, Founding Instructor Programme). **Sentence case** everywhere else, including tags and status pills ("Sold out", "Booking now"). No uppercase labels and no eyebrows above headings.
- **CIMSPA:** never describe the CIMSPA partnership as "approved" or "endorsed". The Complaints Policy wording has passed CIMSPA review and must not change.
- **Numerals over words** for figures (8 weeks, not "eight weeks").
- Buttons: sentence case — `Show your interest`, `Book this date →`.

**Example — yes:** "A new standard for Barre education."
**Example — no:** "🔥 Get certified! Become the BEST barre instructor 💪"

---

## Design system

`design/homepage-v5/DESIGN.md` is the design system (colour and type tokens, components, house rules). If that folder isn't present, the implementation is the record:

- **Colour tokens** are CSS variables on `:root` in `app/src/home.css` (`--ink`, `--paper`, `--cream`, `--warm`, `--warm2`, `--line`, `--muted`, `--muted-cream`, `--quiet`, `--success`, `--success-on-dark`, `--gold`, `--gold-deep`). Use `var(--token)` in component styles, never the hex. `--quiet` is for dark grounds only (it fails contrast on white or cream). All text must meet 4.5:1 (checked with axe).
- **Type:** Inter only, self-hosted variable font (`app/public/media/fonts/`), with a metric-matched Arial fallback so the swap doesn't shift layout. Scale classes in `home.css`: `.t-hero`, `.t-h2`, `.t-h3`, `.t-stat`, `.t-body`, `.t-lead`, `.t-small`, `.t-label`. Tabular numerals for prices, dates and stats.
- **House rules:** every heading fits in two lines at every width from 360px; headings in one colour; no small uppercase labels above headings; no frosted glass or backdrop blur; gradients only as scrims on photos and on the gold CPD badge.
- **Breakpoints:** 1180px (header switches to compact Book + menu), 1080px (tablet), 760px (phone), 520px (footer single column), 400px (smaller headings).
- **Motion** is CSS-first (`.ln`, `.rise`, `.rv`, `.mq`/`.mqr`); JS handles the stats count-up (`Invitation.jsx`), the scroll-zoom promo film (`Film.jsx`, maths ported verbatim from the reference; don't "tidy" it) and the floating booking bar (`BookingBar.jsx`, takes no space). `prefers-reduced-motion` is respected everywhere.

---

## Technical Notes

- **Source:** `app/` — React 18 + Vite. One component per section in `app/src/components/`; `HomePage.jsx` and `PolicyPage.jsx` are the two page types. Inline styles are written as CSS strings via `sx()` (`app/src/lib/sx.js`). No Tailwind.
- **Booking:** every Book button is a `<BookLink>`, which opens the "Before you book" terms dialog (`BookDialog.jsx`, a CIMSPA requirement); only its "Continue to secure payment" goes to Stripe, and only after the terms checkbox is ticked. Never link a Book button straight to Stripe.
- **Dates, prices and links live in `app/src/site.js`** (`NEXT_DATE` including `startISO`/`endISO`, `SOLD_OUT`, `COURSE_DATES`, `PRICE`, `MODULES`, `NEXT_YEAR`, `STRIPE_URL`, `TYPEFORM_URL`). Change a date there and every mention updates (hero card, film card, dates strip, CTA, booking bar, terms dialog, menu, footer, meta description, structured data, `llms.txt`). `NEXT_YEAR` is the "New 2027 dates coming soon · Register your interest" announcement (Typeform): second hero card, a row under the dates strip, a line under the closing CTA, the booking dialog, the mobile menu and the footer. The prerender guard rejects any other "coming soon" copy. Testimonials are in `app/src/testimonials.js`. FAQs (Maggie's answers, house style: no exclamation marks) are in `app/src/faqs.js`; they render as native `<details>` rows in `Faq.jsx` and are published as FAQPage structured data and in `llms.txt`, so the page and the data always match. Policy wording is in `app/src/policies.js`, extracted verbatim from the approved pages: don't edit it by hand.
- **Pre-rendering:** `npm run build` = client build → SSR build of `src/entry-server.jsx` → `scripts/prerender.mjs`, which writes one HTML file per route in `src/pages.js` (`index.html`, `privacy-policy.html`, …) with its title, description and canonical URL. `entry-client.jsx` hydrates the page named in `#root[data-page]`. GitHub Pages and Vercel (`cleanUrls`) serve `/privacy-policy` from `privacy-policy.html`.
- **SEO and AI search:** titles and descriptions are in `src/pages.js` (keep titles under 60 characters, descriptions under 155). `src/seo.js` builds the homepage's schema.org JSON-LD (EducationalOrganization, Person for Maggie, WebSite, Course with Offer and CourseInstance) and `llms.txt` from `site.js`; the prerender also writes `sitemap.xml` with the build date. Only facts shown on the page go in; never describe the CIMSPA partnership there.
- **Image sharpness:** every `<Picture sizes>` must describe the width the photo is really shown at on each breakpoint (phones included), or phones download a smaller file and it looks soft. Anything rendered must be SSR-safe (no `window` during render — use effects).
- **Media:** `app/public/media/` (videos, photos, logos, fonts). Responsive AVIF/WebP variants are in `media/opt/` with `src/media-manifest.json`, generated by `npm run images` (uses `sharp`; commit the output). Use `<Picture name="…" sizes="…" />` for photos. `asset()` returns relative `./` paths so server and client HTML match.
- `app/public/assets` is still a symlink to the repo-root `assets/` folder (favicons live there).
- **Favicons:** `npm run favicons` (`scripts/favicons.mjs`) generates the set from the original logo artwork (`project/assets/UBA-logo-black.png` / `-white.png`, resized only, never redrawn): an adaptive `favicon.svg` (black logo in light mode, white logo in dark mode), light/dark PNGs at 32 and 96, `public/favicon.ico` (16/32/48), the 180px Apple icon, 192/512/maskable app icons and `public/site.webmanifest`.

### Deploying to production (GitHub Pages)

Production is GitHub Pages serving the repo root of `main` (custom domain `ukbarreacademy.com`). **Never push to `main` and never deploy unless the user says "merge to main".** Work on branches; Vercel builds preview links for every branch except `main` (`app/vercel.json`, Root Directory `app`).

When the user says "merge to main":
1. `rm assets/index-*.css assets/index-*.js` (mandatory — the `public/assets` symlink otherwise re-copies stale bundles).
2. `cd app && npm run build`
3. From the repo root: `cp app/dist/*.html . && rsync -a app/dist/assets/ assets/ && rsync -a --delete app/dist/media/ media/ && cp app/dist/robots.txt app/dist/sitemap.xml app/dist/llms.txt app/dist/favicon.ico app/dist/site.webmanifest .` (this copies the homepage, the three policy pages, the SEO files and the favicon/manifest).
4. Sanity check: `ls assets | grep '^index-'` shows exactly the two files referenced in `index.html`.
5. Merge the branch into `main`, commit the compiled output, push.

---

## Legacy pages (pre-rebrand — not yet migrated)

`full-site.html`, `training-manual.html`, and `founding-instructor-programme.html` still use the **previous** ink/bone/sand, Inter Tight, hairline-and-rectangle system (near-black `#0A0A0A`, off-white `#F7F7F5`, sand accent `#C8B79A`, 4px-radius rectangular buttons, zero-icon restraint). That system is documented in `project/README.md` and `project/colors_and_type.css`'s legacy block. Don't mix the two systems within one page.

## Reference

- `app/` — current implementation (React + Vite source; compiled output at repo root).
- `design/homepage-v5/` — local-only handoff for homepage v5: reference pages, `DESIGN.md`, `CURSOR-HANDOFF.md` (gitignored).
- `.claude/skills/` — the Impeccable and Taste Skill design skills, installed for this project.
- `project/README.md`, `project/colors_and_type.css` — earlier design-system briefs, kept for the legacy pages.
