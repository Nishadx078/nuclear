# Nuclear Waste Management & Sustainable Solutions

An educational, single-page website explaining nuclear waste — what it is, how it is classified, where
it comes from, its environmental and health impact, and the full management cycle from reactor to long-term
disposal. It also covers waste minimisation, advanced reprocessing, recycling into industrial by-products,
and research-stage future technologies.

**This is educational content only. Not engineering, design, compliance or regulatory advice.**

## Stack

| Concern | Choice |
| --- | --- |
| Build tool | Vite 8 |
| UI | React 19 + TypeScript |
| Routing | React Router 7 (`BrowserRouter`) |
| Styling | Tailwind CSS v4 (`@theme` tokens + `@utility`) |
| Lint | oxlint |
| Data | Static typed modules, no CMS or runtime fetch |

There are zero runtime dependencies beyond React, React DOM and React Router, and the site makes no
external network requests.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run lint       # oxlint
npm run typecheck  # tsc --noEmit
```

## Routes

| Route | Page | Sections |
| --- | --- | --- |
| `/` | Home | Hero, contents index, system in numbers, closing disclaimer |
| `/fundamentals` | What It Is | Radioactivity, half-lives, dose pathways |
| `/types` | Waste Types | Six classes, filter + search, half-life explorer |
| `/origins` | Sources & Impact | Origins, environmental and health impact |
| `/cycle` | The Cycle | Interactive seven-stage SVG diagram |
| `/handling` | Safe Handling | Collection, treatment, transport, storage |
| `/solutions` | Solutions | Minimisation, reprocessing, by-products |
| `/disposal` | Long-Term Disposal | Multi-barrier system, repositories, interim storage |
| `/future` | Future Tech | Nine research-stage approaches with maturity labels |
| `/safety` | Safety & Sources | Disclaimer and references |
| `*` | Not found | 404 with suggested routes |

## Project layout

```
src/
├── App.tsx                 # router + route table
├── index.css               # Tailwind theme tokens, component classes, keyframes
├── components/
│   ├── ui.tsx              # Reveal, CountUp, Meter, ParticleField, Ring
│   ├── NavBar.tsx          # sticky nav, desktop flyouts, mobile drawer
│   ├── Footer.tsx          # sitemap footer
│   ├── PageHead.tsx        # page header, breadcrumbs, prev/next pager
│   ├── ScrollManager.tsx   # scroll-to-top and hash-anchor handling
│   ├── Hero.tsx            # animated reactor-core hero + counters
│   ├── WhatSection.tsx     # fundamentals
│   ├── TypesSection.tsx    # six waste classes + half-life explorer
│   ├── SourcesSection.tsx  # origins, relative-volume bars
│   ├── ImpactSection.tsx   # consequences and controls
│   ├── CycleSection.tsx    # interactive SVG management cycle
│   ├── TreatmentSection.tsx# collection → treatment → transport → storage
│   ├── InnovationSection.tsx# waste-minimisation levers
│   ├── ReprocessingSection.tsx # PUREX, closed fuel cycle, recycling
│   ├── ByProductsSection.tsx   # residues into by-products + mass-balance simulator
│   ├── DisposalSection.tsx # multi-barrier system and repository status
│   ├── FutureSection.tsx   # research-frontier technologies
│   └── SafetySection.tsx   # disclaimer + references
├── pages/
│   ├── HomePage.tsx
│   ├── FundamentalsPage.tsx
│   ├── TypesPage.tsx
│   ├── OriginsPage.tsx
│   ├── CyclePage.tsx
│   ├── HandlingPage.tsx
│   ├── SolutionsPage.tsx
│   ├── DisposalPage.tsx
│   ├── FuturePage.tsx
│   ├── SafetyPage.tsx
│   └── NotFoundPage.tsx
└── data/
    ├── content.ts          # all editorial content as typed data
    ├── nav.ts              # navigation map (drives nav, footer and pager)
    └── types.ts            # shared domain types
```

## Deployment

This is a client-routed SPA, so the host must fall back to `index.html` for unknown paths or deep links
will 404. `public/_redirects` covers Netlify-style hosts and `vercel.json` covers Vercel. For other hosts,
add an equivalent rewrite rule (Apache `FallbackResource`, Nginx `try_files $uri /index.html`, or a CDN
rule).

## Interactive features

- **Management cycle diagram** — seven-stage SVG flow. Select a node to see its controls and risk focus.
  Solid edges are the reprocessed route, the dashed edge is the once-through route, and an auto-tour steps
  through every stage.
- **Half-life explorer** — slider across seven isotopes with a live exponential decay curve.
- **Class filter and search** — filter the six waste classes by level, or search by material.
- **Minimisation levers** — expandable actions, filterable by design, operations, chemistry or fuel cycle.
- **By-product mass-balance simulator** — set a feed tonnage and see representative recovery fractions.
- **Scroll-reveal animations, count-up statistics and a canvas particle field**, all disabled under
  `prefers-reduced-motion`.

## Accessibility

Semantic landmarks and heading order, a skip link, breadcrumb navigation with `aria-current="page"`, visible
focus rings, `aria-expanded` / `aria-pressed` state on all toggles and flyouts, Escape-to-close on the
desktop menus, keyboard-operable diagram nodes, live regions for the detail panels, and `sr-only` labels on
icon controls. Colour is never the sole carrier of meaning — every status tag pairs its colour with a text
label.

## Accuracy note

Figures are illustrative teaching summaries drawn from public literature and rounded for clarity. They
should not be used for engineering or compliance decisions. See the on-page references for the primary
sources and always confirm current requirements with your national regulator.
