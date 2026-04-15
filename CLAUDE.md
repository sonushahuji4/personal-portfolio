# Sonu Shahuji — Personal Portfolio

## Project Overview

A personal portfolio website for Sonu Shahuji, a Full Stack Engineer with 6 years of experience. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Deployed as a static site on GitHub Pages.

## Tech Stack

- **Framework**: Next.js 14 (App Router, Static Export)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages via GitHub Actions
- **CI/CD**: GitHub Actions (auto-deploy on push to main)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Home page — assembles all sections
│   └── globals.css         # Tailwind base + custom CSS variables
├── components/
│   ├── ui/                 # Reusable UI primitives (Button, Card, Badge, etc.)
│   ├── sections/           # Page sections (Hero, About, Experience, etc.)
│   ├── layout/             # Header, Footer, Navigation
│   └── common/             # Shared components (SectionHeading, Timeline, etc.)
├── data/                   # All portfolio content as typed constants
│   ├── personal.ts         # Name, bio, links, contact
│   ├── experience.ts       # Work history with impacts
│   ├── education.ts        # School → B.Tech → Scaler
│   ├── skills.ts           # Categorized skills
│   ├── projects.ts         # Professional + personal projects
│   ├── achievements.ts     # Awards, certifications, courses
│   ├── platforms.ts        # LeetCode, CodeChef, GitHub stats
│   └── hobbies.ts          # Interests and hobbies
├── lib/
│   ├── utils.ts            # Helper functions (cn, formatDate, etc.)
│   └── constants.ts        # Site-wide constants (URLs, metadata)
└── types/
    └── index.ts            # All TypeScript interfaces and types
```

## Key Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Build static export to /out
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without emitting
```

## Code Style

- Use ES module imports, not CommonJS
- Destructure imports: `import { motion } from 'framer-motion'`
- Use `cn()` utility (clsx) for conditional classnames
- Components are functional with arrow syntax and default exports
- Every component file exports exactly one component
- File names use kebab-case: `section-heading.tsx`
- Component names use PascalCase: `SectionHeading`
- Data files export typed constants, not functions
- All text content lives in `src/data/` — never hardcode strings in components

## Design System

- **Theme**: Dark techy developer portfolio with accent color
- **Font**: Use a distinctive display font (not Inter/Arial/Roboto)
- **Colors**: Defined as CSS variables in globals.css
- **Spacing**: Consistent section padding using Tailwind spacing scale
- **Animations**: Framer Motion for scroll reveals, staggered children, hover effects
- **Responsive**: Mobile-first, breakpoints at sm/md/lg/xl

## Architecture Rules

- IMPORTANT: This is a static export (`output: 'export'` in next.config.ts). No server-side features (no API routes, no SSR, no middleware).
- IMPORTANT: Images must use `unoptimized: true` in next.config.ts
- IMPORTANT: All data is in `src/data/` as TypeScript constants — no API calls, no database
- Each section is a self-contained component in `src/components/sections/`
- Sections are composable — can be added/removed from page.tsx independently
- UI primitives in `src/components/ui/` are generic and reusable
- Never use `localStorage`, `sessionStorage`, or browser-only APIs at module level
- Use `'use client'` directive only on components that need interactivity (animations, state)

## GitHub Pages Constraints

- Base path will be set dynamically via env var for repo subpath hosting
- All asset references must respect basePath
- Place `.nojekyll` in public/ to prevent Jekyll processing
- The `images.unoptimized = true` config is required

## Sections (in page order)

1. **Hero** — Name, title, tagline, CTA buttons, social links
2. **About** — Professional summary, photo placeholder, key highlights
3. **Experience** — Timeline: Kou-Chan → Cimpress → Aerem with impacts
4. **Projects** — Professional projects + personal (Comment System, Eventos, etc.)
5. **Skills** — Categorized: Frontend, Backend, Database, Cloud, Architecture, Domain
6. **Education** — Timeline: School → HSC → B.E. (DBIT) → Scaler
7. **Platforms** — LeetCode, CodeChef, GitHub, LinkedIn stats
8. **Achievements** — Awards, certifications, recommendations
9. **Courses** — Namaste JS, Namaste React, Namaste Node, Scaler
10. **Hobbies** — Guitar, Piano, Football, Hockey, Basketball, etc.
11. **Contact** — Email, phone, LinkedIn, GitHub, resume download

## Agent Protocol (Less Slop, More Craft)

Follow the staged protocol defined in `docs/agents/protocol.md`. Key rules:
- Read the section spec in `docs/sections/<section>.md` BEFORE building any section
- Never build without reading the spec first
- Each section must be self-contained and independently testable
- After building a section, run `npx tsc --noEmit` and `npm run lint` to verify
- When compacting, preserve: current section being built, list of completed sections, any open issues

## File Reference

- Full project spec: `docs/PROJECT_SPEC.md`
- Agent protocol: `docs/agents/protocol.md`
- Section specs: `docs/sections/*.md`
- Design tokens: defined in `src/app/globals.css`
