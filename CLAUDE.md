# CLAUDE.md — Sonu Shahuji Personal Portfolio

## Project Overview

A personal portfolio website for Sonu Shahuji, a Full Stack Engineer with 6+ years of experience and the founding engineer at Aerem Solutions. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion. Deployed as a static export to GitHub Pages via GitHub Actions.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Static Export)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Animations**: Framer Motion
- **3D / book flip**: `react-pageflip`, `@react-three/fiber`, `@react-three/drei`, `three`
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (auto-deploy from `main` via GitHub Actions)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                     # Root layout: fonts, metadata, providers
│   ├── page.tsx                       # Home page — composes sections
│   ├── globals.css                    # Tailwind base + CSS custom properties
│   └── favicon.ico
├── components/
│   ├── layout/                        # Header, Footer
│   ├── ui/                            # Primitives: badge, section-heading, scroll-progress, theme-toggle
│   ├── common/                        # Shared: brand-logo, company-logo, motion-provider, theme-provider
│   └── sections/
│       ├── hero.tsx
│       ├── about.tsx
│       ├── experience.tsx
│       ├── projects/projects.tsx
│       ├── skills.tsx                 # + skill-circle.tsx
│       ├── growth-community.tsx       # Journey & Impact (book + platforms)
│       ├── education/                 # Flipbook rendered via growth-community
│       │   ├── education-phase-controller.tsx
│       │   ├── book-cover-3d.tsx
│       │   ├── education-book.tsx
│       │   ├── education.module.css
│       │   └── pages/{index-page,content-page,back-page}.tsx
│       ├── achievements.tsx           # Tabs: awards / certs / course certs / testimonials
│       ├── interests-strip.tsx        # Horizontal hobby icons
│       ├── contact.tsx
│       └── life-circle/               # HIDDEN — kept for future use; see page.tsx comment
├── data/                              # Typed content constants (no strings hardcoded in components)
│   ├── personal.ts  experience.ts  education.ts  skills.ts
│   ├── projects.ts  achievements.ts  platforms.ts  hobbies.ts
│   └── life-circle.ts                 # used only by hidden life-circle section
├── lib/
│   ├── utils.ts                       # cn() classname helper
│   └── constants.ts                   # SITE_CONFIG, SECTION_IDS, NAV_LINKS
└── types/
    ├── index.ts                       # Shared TS interfaces
    └── life-circle.ts                 # Types for hidden life-circle section
```

## Development Commands

```bash
npm run dev          # Dev server at http://localhost:3000
npm run build        # Static export to /out
npm run lint         # ESLint
npx tsc --noEmit     # Type check only
```

> **Node version**: requires Node 23 (via `nvm use 23`). The default macOS Node 16 is incompatible with Next.js 16.

## Sections (in page.tsx order)

1. **Hero** — Name, title, tagline, CTAs, social links
2. **About** — Summary, highlight cards, photo
3. **Experience** — Kou-Chan → Cimpress → Aerem with impact bullets
4. **Projects** — Featured card + carousel (professional + personal)
5. **Skills** — Categorized skill circles
6. **Journey & Impact** (`growth-community`) — Education flipbook + platform stats (LeetCode, CodeChef, GitHub, LinkedIn)
7. **Achievements** — Tabs for awards, certifications, course certs, testimonials
8. **Interests Strip** — Horizontal hobby icons
9. **Contact** — Email / phone / LinkedIn / GitHub / resume download

`LifeCircle` is imported but commented out in `page.tsx` ("Hidden for now — will use later"). Its files must be preserved.

## Architecture Rules

- Static export (`output: 'export'` in `next.config.ts`). No API routes, no SSR, no middleware.
- All images use `images.unoptimized = true`.
- All text content lives in `src/data/*.ts` — never hardcode strings in components.
- Each section is a self-contained component under `src/components/sections/`.
- UI primitives in `src/components/ui/` are generic and reusable.
- Use `'use client'` only on components that need hooks, state, or browser APIs.
- Never use `localStorage`, `sessionStorage`, `window`, or `document` at module top-level — always inside effects.
- Images/assets are served under `NEXT_PUBLIC_BASE_PATH` — respect it when hardcoding paths.

## Code Style

- ES module imports only. Destructure: `import { motion } from 'framer-motion'`.
- Functional components with arrow syntax and a single default export per file.
- File names: `kebab-case.tsx`. Component names: `PascalCase`.
- Data files export typed constants — never functions.
- Use `cn()` from `src/lib/utils.ts` for conditional classnames.

## Agents

Located in `.claude/agents/`:

| Agent | Role |
|---|---|
| `pm.md` | Product manager — strategic & UX feedback |
| `designer.md` | Senior designer — visual & interaction review |
| `reviewer.md` | Code reviewer — fresh-eyes principal engineer review |
| `qa.md` | QA — tests the live site, reports bugs |
| `fixer.md` | Senior engineer — fixes QA/review findings by severity |
| `book-simulator.md` | Specialist — builds/maintains the education flipbook |

## Slash Commands

Located in `.claude/commands/`:

| Command | Purpose |
|---|---|
| `build-section` | Build a section from its spec in `docs/sections/` |
| `eval-section` | Evaluate a completed section against its spec |
| `review-section` | Code review of a specific section |
| `design-loop` | Run PM → designer → fixer → QA → reviewer loop |
| `qa-loop` | Run reviewer → QA → fixer loop until clean |
| `status` | Report current build / section status |
| `setup-foundation` | Initialize project scaffolding (one-time) |

## Key Rules for Claude

1. Never touch `.next/`, `out/`, or `node_modules/` — these are generated.
2. Before building a section, read its spec in `docs/sections/<section>.md`.
3. Preserve the hidden `life-circle/` module — it is intentional.
4. Mobile overrides live inside `@media (max-width: 768px)` — do not remove "MOBILE FIX" comments.
5. After any change, run `npx tsc --noEmit` and `npm run lint` before declaring done.

## File Reference

- Full project spec: `docs/PROJECT_SPEC.md`
- Agent protocol: `docs/agents/protocol.md`
- Section specs: `docs/sections/*.md`
- Life-circle chapter content (for the hidden section): `docs/life-circle-chapters.md`
- Design tokens: `src/app/globals.css`
