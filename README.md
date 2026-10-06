# Nuclear Waste Management & Sustainable Solutions

An educational **multi-page** website explaining nuclear waste — what it is, how it is classified,
where it comes from, its environmental and health impact, and the full management cycle from reactor
to long-term disposal — with minimisation, reprocessing, recycling and research-stage future
technologies. It ships as a gamified learning experience: reading modules earns points, a 12-question
quiz and an 8-day management simulator award badges, and a dashboard tracks everything locally.

**This is educational/demo content only. Not engineering, design, compliance or regulatory advice.**

## Stack

| Concern | Choice |
| --- | --- |
| Build tool | Vite 8 |
| UI | React 19 + TypeScript |
| Routing | React Router 7 (`BrowserRouter`) |
| Styling | Tailwind CSS v4 (`@theme` tokens + `@utility`) |
| 3D | three + @react-three/fiber + @react-three/drei (lazy-loaded) |
| State | React context + `localStorage` (`nwm.progress.v1`) |
| Lint / typecheck | oxlint / `tsc -b` |

The site makes no network requests at runtime — all content, questions, scenarios and leaderboard rows
are static typed modules. The only storage write is the learner's own progress in `localStorage`.

## Getting started

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run lint       # oxlint
npm run typecheck  # tsc --noEmit
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/fundamentals` | What It Is — radioactivity, half-lives, dose pathways |
| `/types` | Waste Types — six classes, filter + search, half-life explorer |
| `/origins` | Sources & Environmental Impact |
| `/cycle` | The Management Cycle — interactive seven-stage diagram |
| `/handling` | Safe Handling — collection, treatment, transport, storage |
| `/solutions` | Solutions — minimisation, reprocessing, by-products |
| `/disposal` | Long-Term Disposal — multi-barrier system, repositories |
| `/future` | Future Tech — nine research-stage approaches |
| `/quiz` | Environmental Education Quiz (gamified) |
| `/simulator` | Management Simulator (gamified) |
| `/model3d` | Interactive 3D deep-repository cutaway |
| `/dashboard` | Learning dashboard: points, badges, roadmap, leaderboard |
| `/safety` | Disclaimer and references |
| `*` | 404 with navigation suggestions |

## Gamification

- **Points.** Reading a module (+15/article +10), completing the quiz (+20, +25 bonus for a perfect
  run) and finishing the simulator (+30). Points never double-award: each rule/topic has one key and
  every write path is guarded.
- **Badges.** 🌱 Environment Explorer (100 pts), ☢️ Radiation Awareness Learner, ♻️ Waste Management
  Champion, 🏆 Nuclear Safety Scholar (quiz ≥ 80%), 💯 Perfect Quiz Run, ⚙️ Repository Operator,
  🎓 Environmental Studies Graduate. Badges unlock automatically from points and completed modules.
- **Learning roadmap.** Modules unlock along a dependency graph (e.g. *Advanced Recovery Concepts* is
  locked until *Safe Handling* and *Management Journey* are done) shown on the dashboard.
- **Simulator.** Eight daily events with three choices each; decay-heat, containment-risk and budget
  meters end the run instantly at their limits. Final score is saved and classified
  success/partial/failure.
- **Persistence.** Everything is kept in the learner's browser under `nwm.progress.v1`. Press
  *Reset my progress* on the dashboard to start over.

## Project layout

```
src/
├── App.tsx                  # router + route table + <ProgressProvider>
├── index.css                # Tailwind theme tokens, component classes, keyframes
├── components/
│   ├── ui.tsx               # Reveal, CountUp, Meter, ParticleField, Ring
│   ├── NavBar.tsx           # sticky nav, desktop flyouts, mobile drawer
│   ├── Footer.tsx           # sitemap footer (driven by src/data/nav.ts)
│   ├── PageHead.tsx         # page header, breadcrumbs, prev/next pager
│   ├── ScrollManager.tsx    # scroll-to-top and hash-anchor handling
│   ├── TopicMarker.tsx      # marks a module complete when its page mounts
│   ├── SiteModel.tsx        # R3F canvas + cutaway scene (lazy-loaded)
│   └── Hero.tsx             # animated reactor-core hero + counters
├── pages/
│   ├── HomePage.tsx
│   ├── FundamentalsPage.tsx · TypesPage · OriginsPage · CyclePage
│   ├── HandlingPage.tsx · SolutionsPage · DisposalPage · FuturePage
│   ├── QuizPage.tsx         # three-phase quiz UI
│   ├── SimulatorPage.tsx    # turn-based repository game
│   ├── Model3DPage.tsx      # 3D stage + barrier info panel
│   ├── DashboardPage.tsx    # profile, badges, roadmap, leaderboard, activity
│   ├── SafetyPage.tsx
│   └── NotFoundPage.tsx
├── hooks/
│   └── useProgress.tsx      # ProgressProvider context + localStorage store
└── data/
    ├── content.ts           # article content as typed data
    ├── nav.ts               # navigation map (drives nav, footer, pager)
    ├── gamification.ts      # points rules, topics graph, badges, demo leaderboard
    ├── quiz.ts              # 12 quiz questions (mcq + true/false)
    ├── simulator.ts         # 8 simulator events and scoring bands
    ├── siteModel.ts         # 3D part metadata (kept out of the WebGL chunk)
    └── types.ts             # shared domain types
```

## Interactive features

- **Management cycle diagram** — seven-stage SVG flow with hover/active nodes, solid (reprocessed)
  and dashed (once-through) routes, and an auto-tour.
- **Half-life explorer** — slider across seven isotopes with a live exponential decay curve.
- **Waste-class filter and search** — filter the six classes by level or search by material.
- **By-product mass-balance simulator** — set feed tonnage and read representative recovery fractions.
- **3D repository cutaway** (lazy-loaded) — clickable barrier layers, depth ruler, label toggle,
  WebGL-failure fallback.
- **Quiz** — shuffled question order, per-question explanations, full answer review, retry, score
  saved as best.
- **Management simulator** — decision cards, live heat/risk/budget meters, decision log, end-screen
  classification.
- **Dashboard** — computed rank against a demo class, badge wall, roadmap with lock state, activity
  feed.
- **Scroll-reveal animations, count-up statistics and a canvas particle field**, all disabled under
  `prefers-reduced-motion`.

## 3D model

`SiteModel.tsx` is code-split: the ~950 kB (250 kB gzip) WebGL chunk only loads on `/model3d`, so the
rest of the site stays ~450 kB. The scene is built from primitives — no external asset downloads. If
WebGL cannot start, the page shows a fallback panel while the barrier descriptions stay usable.

## Deployment

This is a client-routed SPA, so the host must fall back to `index.html` for unknown paths or deep
links will 404. `public/_redirects` covers Netlify-style hosts and `vercel.json` covers Vercel. For
other hosts, add an equivalent rewrite rule (Apache `FallbackResource`, Nginx
`try_files $uri /index.html`, or a CDN rule).

## Putting real data in place of the demo data

Everything a grader or developer might want to replace lives in `src/data/`:

- **Article content** — `content.ts` (page text, numbers, references). Edit the typed arrays; the
  pages render whatever is there.
- **Navigation** — `nav.ts`. Add a group or child, and the navbar, footer and prev/next pagers
  update automatically; add its route in `App.tsx`.
- **Quiz questions** — `quiz.ts`. Append to `QUIZ_QUESTIONS` — progress maths (
  `score/total → %`) is derived, so the pass band updates automatically. Keep `answer` as an index
  into `options`; `0`/`1` for true/false.
- **Simulator events** — `simulator.ts`. Append to `SIM_EVENTS`; the game reads `SIM_EVENTS.length`
  for the day count and scoring bands come from `SIM_BANDS`.
- **Leaderboard & badges** — `gamification.ts`. Replace `LEADERBOARD_DEMO` with rows from your real
  backend; edit `BADGES`/`TOPICS`/`POINT_RULES` freely.

**Connecting a real account system:** the whole auth seam is `src/hooks/useProgress.tsx`. It already
separates reading (`read()`), writing (`write()`) and the `ProgressApi` surface (award / completeTopic
/ saveQuiz / saveSimulator / setProfile / reset). Swap `read`/`write` for API calls and keep the same
`ProgressState` shape — no UI component changes needed.

## Accessibility

Semantic landmarks and heading order, a skip link, breadcrumb navigation with `aria-current="page"`,
visible focus rings, `aria-expanded` / `aria-pressed` state on toggles, Escape-to-close on the desktop
menus, keyboard-operable diagram nodes and quiz options, live regions for quiz/simulator feedback, and
`sr-only` labels on icon controls. Colour is never the sole carrier of meaning — status tags pair
colour with text, and meters pair colour with numbers and labels.

## Accuracy note

Figures are illustrative teaching summaries drawn from public literature and rounded for clarity. They
should not be used for engineering or compliance decisions. See the on-page references for the primary
sources and always confirm current requirements with your national regulator.