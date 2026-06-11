# Tap-it Web

Marketing/landing page for **Tap-it** — a B2B SaaS "operating system" for fitness gyms (digital memberships, QR entry, bookings, payments, real-time occupancy). All site copy is in **Slovak**; keep new user-facing text in Slovak too.

## Stack

- **Next.js 15** (App Router, static prerender — no API routes or server actions yet)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS 3** — theme tokens in `tailwind.config.ts`
- **framer-motion** — scroll reveals, parallax, micro-interactions
- **lucide-react** — icons
- **qrcode** — generates the rotating easter-egg QR code as a data URL

## Commands

```bash
npm run dev     # dev server at localhost:3000
npm run build   # production build (also the de-facto type check)
npm run start   # serve production build
npm run lint    # next lint
```

There are no tests. Verify changes with `npm run build` and by eyeballing `npm run dev`.

## Layout

The whole site is a single page:

- `app/page.tsx` — entire landing page; one client component file containing all sections (`Hero`, `ModulesMarquee`, `FeaturesBento`, `RolesSection`, `AdminSection`, `SecuritySection`, `DemoSection`, `Footer`) plus interactive widgets (`LiveQrCard`, `SyncActivityPanel`, `InteractiveCalendar`)
- `app/layout.tsx` — metadata (Slovak), fonts via `next/font` (Sora = display, Manrope = body; both need the `latin-ext` subset for Slovak diacritics)
- `app/globals.css` — Tailwind layers, shared component classes (`.primary-button`, `.secondary-button`, `.minimal-input`, `.section-kicker`), background helpers (`.hero-glow`, `.hero-grid`, `.panel-grid`), marquee keyframes
- `tailwind.config.ts` — design tokens (see below)
- `declarations.d.ts` — `declare module "*.css"` so TS accepts the side-effect CSS import

## Design system

Dark theme with a muted denim-blue accent. Always use the theme tokens, never raw hex in class names:

- Backgrounds: `base` (#0A0E16, page) → `surface` (#0F141E, sections/cards) → `raised` (#141B28, elevated cards)
- Accent scale: `accent` (#3A5BA8, buttons/fills) · `accent-bright` (hover, highlights) · `accent-soft` (text accents) · `accent-deep` / `accent-faint` (muted fills, chips)
- Type: `font-display` (Sora) for headings/numbers, default `font-sans` (Manrope) for body; headings are `font-semibold tracking-tight` — avoid heavier weights
- Body/muted text: `text-slate-400` / `text-slate-500`; borders `border-white/5` or `/10`; radii `rounded-xl`–`rounded-3xl`

## Conventions

- Animations: framer-motion `whileInView` with the shared `revealContainer`/`revealItem` variants for section reveals; scroll parallax via `useScroll` + `useTransform`. Every animation must respect reduced motion (`useReducedMotion` for parallax values; CSS in `globals.css` kills the rest).
- The demo form is a stub (`submitDemo` just sets local state) — no backend exists yet.
- Nav scroll-spy: section ids must match the hrefs in `navItems`.
- Mobile-first: every section must work at 320px width; test the hero, bento grid, and calendar at small sizes.
