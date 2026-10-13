# Shiftmap · UI/UX & Visual Design (Assignment 2)

**Live:** https://moodboard-yixiaoh.vercel.app/

Shiftmap is a country-of-origin research tool for an own-brand apparel team: where a category is
made today, how that compares with retail peers and industry imports, and where volume should move.
This repo explores it in three visual styles and builds a static mock in the one that fits best.

*Shiftmap, Northfold and all figures are fictional.*

## Pages

| Route | What it is |
|---|---|
| [`/`](https://moodboard-yixiaoh.vercel.app/) | Hub |
| [`/mood-boards/manifest`](https://moodboard-yixiaoh.vercel.app/mood-boards/manifest) | Mood board: a bill of lading on a sourcing desk |
| [`/mood-boards/pink-paper`](https://moodboard-yixiaoh.vercel.app/mood-boards/pink-paper) | Mood board: the Monday business pages |
| [`/mood-boards/night-port`](https://moodboard-yixiaoh.vercel.app/mood-boards/night-port) | Mood board: a port control room at 3 a.m. |
| [`/design-systems/manifest`](https://moodboard-yixiaoh.vercel.app/design-systems/manifest) | Design system built from the Manifest board |
| [`/design-systems/pink-paper`](https://moodboard-yixiaoh.vercel.app/design-systems/pink-paper) | Design system built from the Pink Paper board |
| [`/design-systems/night-port`](https://moodboard-yixiaoh.vercel.app/design-systems/night-port) | Design system built from the Night Port board |
| [`/shiftmap`](https://moodboard-yixiaoh.vercel.app/shiftmap) | The site, in Manifest |

Each mood board has 28 artifacts; ones drawn in code rather than collected are marked ✦.
Each design system covers color roles with computed WCAG contrast, type roles, spacing and shape,
live components, a control-state matrix (rest, hover, focus, pressed, selected, disabled) and the
empty, loading, error and success states.

## Why Manifest

Sourcing managers read numbers fast and distrust decoration. Manifest borrows from the bill of
lading, the shipment record Shiftmap's industry data comes from: boxed, labeled fields hold dense
figures and group them; monospaced, tabular numbers scan in columns; a recommendation reads as a
stamp on the document. Filled red is kept for the one primary action on each page.

## The site

Everything is faked in the browser; nothing is saved.

- Brand-line chips filter the category list.
- **Generate report** runs a four-step progress sequence, then shows the report.
- Lens tabs (own brand, retail peers, industry imports) switch the origin mix.
- Origin rows open a detail dialog (Esc or × closes it).
- Vendor search, with an empty result when nothing matches.

The page works by keyboard throughout and is checked at 390px and 1440px.

## Stack and code map

Next.js 16 (App Router, all pages static) and Tailwind CSS 4, deployed on Vercel's Hobby plan.
No database, accounts or external APIs.

- `app/`: one folder per route.
- `components/manifest`, `components/pink-paper`, `components/night-port`: a component library
  per style. Design system pages show them; the site imports `components/manifest`.
- `lib/shiftmap-data.ts`: the fictional data. `lib/contrast.ts`: the WCAG ratios.

```bash
npm install
npm run dev   # http://localhost:3000
```

## Process

Built by directing a coding agent one page at a time; the commit history records each round and
the reason for it. Photos are free-license stock images (Unsplash, Pexels), cropped, resized and toned to each
palette, with any real company names cropped or blurred out.
