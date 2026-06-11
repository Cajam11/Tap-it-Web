# Tap-it Web

Marketing/landing page for **Tap-it** — a web studio offering website building, page redesigns, custom software development, and e-shops. The Tap-it Fitness OS (gym check-in SaaS) is showcased as a flagship case study. All site copy is in **Slovak**; keep new user-facing text in Slovak too.

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

- `app/page.tsx` — entire landing page; one client component file containing all sections (`Hero` — pinned full-screen opener with giant display type; the rest of the page is wrapped in a z-10 "sheet" that slides over it, `IntroSection`, `ManifestoParallax`, `ServicesSection`, `CaseStudySection`, `ProcessSection`, `ContactSection`, `Footer`) plus interactive widgets (`RedesignSlider` — the before/after hero slider, `LiveQrCard` — the rotating easter-egg QR in the case study)
- `app/layout.tsx` — metadata (Slovak), fonts via `next/font` (Fraunces = display serif, Manrope = body; both need the `latin-ext` subset for Slovak diacritics)
- `app/globals.css` — Tailwind layers, shared component classes (`.primary-button`, `.secondary-button`, `.editorial-input`, `.field-label`, `.section-kicker`), background helpers (`.hero-glow`, `.hero-grid`, `.panel-grid`, `.grain-overlay`), text helpers (`.text-outline` stroked text)
- `tailwind.config.ts` — design tokens (see below)
- `declarations.d.ts` — `declare module "*.css"` so TS accepts the side-effect CSS import

## Design system

Dark editorial "digital atelier" theme: near-black ink backgrounds, warm ivory serif headlines, electric-blue accent, film-grain overlay, pill-shaped buttons. Always use the theme tokens, never raw hex in class names:

- Backgrounds: `base` (#09090D, page) → `surface` (#0E0F15, sections/cards) → `raised` (#14161F, elevated cards)
- Headlines: `text-ivory` (#ECEAE2); italic `<em>`/`italic` spans in `text-accent-soft` are the signature accent inside serif headings
- Accent scale: `accent` (#3E63DD, buttons/fills) · `accent-bright` (hover, highlights) · `accent-soft` (text accents) · `accent-deep` / `accent-faint` (muted fills, chips)
- Type: `font-display` (Fraunces, serif) for headings/numbers, default `font-sans` (Manrope) for body; headings are `font-semibold tracking-tight` — avoid heavier weights
- Body/muted text: `text-slate-400` / `text-slate-500`; borders `border-white/5` or `/10`; radii `rounded-xl`–`rounded-3xl`, buttons/chips `rounded-full`

## Conventions

- Animations: framer-motion `whileInView` with the shared `revealContainer`/`revealItem` variants for section reveals; scroll parallax via `useScroll` + `useTransform`. Every animation must respect reduced motion (`useReducedMotion` for parallax values; CSS in `globals.css` kills the rest).
- The contact form is a stub (`submitInquiry` just sets local state) — no backend exists yet.
- Nav scroll-spy: section ids must match the hrefs in `navItems`.
- Mobile-first: every section must work at 320px width; test the hero, redesign slider, and services rows at small sizes.
