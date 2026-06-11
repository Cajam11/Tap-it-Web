# Tap-it Web

Marketing site for **Tap-it** — a web studio offering website building, page redesigns, custom software development, and e-shops. The studio's own product, **Tap-it Fitness OS** (a gym check-in/membership SaaS), is featured as the flagship case study. All site copy is in Slovak.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, fully static prerender — no API routes or server actions)
- React 19 + TypeScript (strict)
- Tailwind CSS 3 (design tokens in `tailwind.config.ts`)
- framer-motion (scroll reveals, parallax, micro-interactions)
- lucide-react (icons)
- qrcode (the rotating easter-egg QR code in the case study)

## Getting started

```bash
npm install
npm run dev     # dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build (also the de-facto type check)
npm run start   # serve the production build
npm run lint    # next lint
```

There are no tests — verify changes with `npm run build` and by eyeballing `npm run dev`.

## The page

A single-page site (`app/page.tsx`) with a dark editorial "digital atelier" design: Fraunces serif display type, ivory headlines with italic blue accents, film-grain overlay, and a floating "dynamic island" glass navbar.

Sections, top to bottom:

1. **Hero** — pinned full-screen opener with giant "Weby & kód" display type; the rest of the page slides over it as a rounded sheet on scroll
2. **Intro** — studio pitch, CTAs, stats, and an interactive before/after redesign slider
3. **Manifesto** — multi-layer parallax statement (giant outlined backdrop word, floating service tags at different scroll depths)
4. **Služby** — four numbered editorial rows: tvorba webov, redizajn, vývoj na mieru, e-shopy
5. **Projekt** — Tap-it Fitness OS case study with a live QR demo that refreshes every 15 seconds
6. **Proces** — four-step workflow from consultation to launch
7. **Kontakt** — inquiry form (currently a stub — submissions only set local state; no backend yet)

## Project layout

```
app/
  page.tsx        # the entire landing page (all sections + interactive widgets)
  layout.tsx      # metadata, fonts (Fraunces + Manrope, latin-ext for Slovak diacritics)
  globals.css     # Tailwind layers, shared component classes, background helpers
tailwind.config.ts  # design tokens (colors, shadows, font families)
```

See [AGENTS.md](AGENTS.md) for the full design system, tokens, and contribution conventions.
