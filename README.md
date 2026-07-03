# Esports World Cup on Thamanya — Landing Page

Bilingual (AR default / EN) landing page for the Esports World Cup streaming on the Thamanya app. Built with Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Run

```sh
bun install
bun --bun run dev   # or: npm install && npm run dev (if Node is installed)
```

Routes: `/ar` (default, RTL) and `/en` (LTR). The root `/` redirects to `/ar`.

## Structure

- `app/[locale]/` — layout (sets `lang`/`dir` per locale) + page
- `components/` — one component per section
- `locales/ar.json`, `locales/en.json` — all copy
- `lib/tournaments.ts` — schedule data + live-status logic (Riyadh time)
- `lib/players.ts` — player carousel data
- `app/fonts/` — Thmanyah Sans (loaded via `next/font/local`)

## Design source

The hero is implemented from the Figma file "تصميم صفحة كأس العالم للرياضات الإلكترونية 2026" (node 1-15); downloaded assets (logo SVGs, QR code, duotone character strip) live in `public/figma/`. Art direction (orange blocks, purple `#5600CC` pills, black scoreboard cards) follows the social media poster set.

## TODOs (pending assets)

- **QR code**: `public/figma/qr.png` came from the Figma mock — replace with the real app-download QR.
- **Player photos**: `lib/players.ts` cards currently use ghosted monograms — replace with real photos + `next/image` when provided.
- **FAQ copy**: drafted placeholder Q&As in `locales/*.json` — replace with final copy.
- **Store links**: badge `href`s in `components/Footer.tsx` point to `#`.
- Stretch goal (live results ticker/table) not built yet — needs a results data source.
