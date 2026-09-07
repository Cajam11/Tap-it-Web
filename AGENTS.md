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

The homepage is one long scroller; four commercial pages sit alongside it as
real routes. Shared chrome lives in `app/components/` so no route duplicates it.

- `app/page.tsx` — server wrapper for `/`: emits the homepage JSON-LD, renders `HomeContent`
- `app/home-content.tsx` — the whole landing page as one client component (hero, `ValueSection`, `BoxVsTapitSection`, `AuditSection`, `MigrationHardwareSection`, `OperationsSection`, `PilotSection`, `ProofSection`, the app roadmap and `SeoAnswersSection`), plus the scroll-driven admin gallery and product tour
- `app/{cena,produkt,migracia,bezobsluzne-fitko}/page.tsx` — the commercial pages. Deliberately **server** components with static markup and CSS reveals (`.hero-reveal`), not framer-motion: their copy must be readable in the prerendered HTML without hydration
- `app/components/` — `site-navigation`, `site-footer`, `contact-section` (client; shared by every route), `page-chrome` (server layout primitives: `SubPage`, `PageHero`, `PageSection`, `CardGrid`, `NumberedSteps`, `CheckList`, `FaqSection`, `RelatedPages`), `site-links` (nav data + cross-route anchor handling), `brand-mark` (the logo tile used by the nav and footer; SVG sources live in `public/brand/`, the favicons are `app/icon.png` + `app/apple-icon.png`), `json-ld`, `motion-variants`
- `app/seo-content.ts` — site constants plus `pageMetadata()` / `pageStructuredData()`. **`globalStructuredData` (Organization + WebSite) is the only graph safe to emit sitewide**; anything page-specific belongs to the route that owns it
- `app/site-pages.ts` — one `PageSeo` per route (title, description, breadcrumb, FAQ, Service). The sitemap, JSON-LD and visible FAQ blocks all read from here. Paths carry **no trailing slash** — `trailingSlash` is false, so `/cena/` 308s to `/cena`
- `app/og-card.tsx` — shared og:image artwork; each route has its own `opengraph-image.tsx`. Satori's bundled font covers Latin-1 but **not** č/š/ž/ť/ň/ľ/ď, so card copy must stay on á/ä/é/í/ó/ô/ú/ý
- `app/layout.tsx` — sitewide metadata, fonts via `next/font` (Fraunces = display serif, Manrope = body; both need the `latin-ext` subset for Slovak diacritics)
- `app/globals.css` — Tailwind layers, shared component classes (`.primary-button`, `.secondary-button`, `.editorial-input`, `.field-label`, `.section-kicker`), background helpers (`.hero-grid`, `.grain-overlay`), CSS-only reveals (`.hero-reveal`)
- `tailwind.config.ts` — design tokens (see below)
- `declarations.d.ts` — `declare module "*.css"` so TS accepts the side-effect CSS import

Light mode is driven by `.theme-light section:not(#platforma) …` overrides in
`globals.css`, so **all page content must live inside `<section>` elements** or
it will stay dark when the user flips the theme.

## Design system

Dark editorial "digital atelier" theme: near-black ink backgrounds, warm ivory headlines, red accent, film-grain overlay, pill-shaped buttons. Always use the theme tokens, never raw hex in class names:

- Backgrounds: `base` (#09090D, page) → `surface` (#0E0F15, sections/cards) → `raised` (#14161F, elevated cards)
- Headlines: `text-ivory` (#ECEAE2); italic `<em>`/`italic` spans in `text-accent-soft` are the signature accent inside serif headings
- Accent scale: `accent` (#EF2428, buttons/fills) · `accent-bright` (hover, highlights) · `accent-soft` (text accents) · `accent-deep` / `accent-faint` (muted fills, chips)
- Type: `font-display` (Fraunces, serif) for headings/numbers, default `font-sans` (Manrope) for body; headings are `font-semibold tracking-tight` — avoid heavier weights
- Body/muted text: `text-slate-400` / `text-slate-500`; borders `border-white/5` or `/10`; radii `rounded-xl`–`rounded-3xl`, buttons/chips `rounded-full`

## Conventions

- Animations: framer-motion `whileInView` with the shared `revealContainer`/`revealItem` variants for section reveals; scroll parallax via `useScroll` + `useTransform`. Every animation must respect reduced motion (`useReducedMotion` for parallax values; CSS in `globals.css` kills the rest).
- The contact form is a stub (`submitInquiry` just sets local state) — no backend exists yet.
- Nav scroll-spy: section ids must match the hrefs in `navItems`.
- Mobile-first: every section must work at 320px width; test the hero, redesign slider, and services rows at small sizes.
