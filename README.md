# Sonu Shahuji — Personal Portfolio

> Full Stack Engineer · Founding Engineer at Aerem Solutions · 6+ years shipping production systems.

A bespoke portfolio that tells the story of my engineering journey — from school in Lonavala to founding engineer at a Series A solar-finance startup in Mumbai. Not a template. Every section is handcrafted in Next.js with an emphasis on impact, craft, and a distinctive visual voice.

---

## Live Demo

https://sonushahuji4.github.io/personal-portfolio/

---

## About This Project

The portfolio is a single-page static site structured around nine sections: a hero, an about card, a work-history timeline, a projects gallery, a skills grid, a combined "Journey & Impact" section featuring an interactive 3D-to-2D flipbook for education plus platform-presence stats (LeetCode, CodeChef, GitHub, LinkedIn), a tabbed achievements section, a horizontal strip of hobby interests, and a contact block.

Design-wise, the site leans into a dark techy aesthetic with accent colours per section, generous whitespace, Framer Motion scroll reveals, and small custom interactions — a draggable 3D book cover, corner-fold page flipping, hover tray on the interests strip, and responsive motion that degrades gracefully on mobile.

Technically, the project ships as a fully static export deployed to GitHub Pages via GitHub Actions. `react-pageflip` drives the education book; `@react-three/fiber` powers the (currently hidden) "Life Circle" 3D scene. Browser-only libraries are kept off the server render path with `next/dynamic` + `ssr: false`. All content lives in typed constants under `src/data/` — no API, no database, no backend.

---

## Tech Stack

| Category        | Technology                                                      |
|-----------------|-----------------------------------------------------------------|
| Framework       | Next.js 16 (App Router · Static Export)                         |
| Language        | TypeScript (strict)                                             |
| Styling         | Tailwind CSS v4 (via `@tailwindcss/postcss`)                    |
| Animation       | Framer Motion                                                   |
| 3D / Book flip  | `react-pageflip`, `@react-three/fiber`, `@react-three/drei`     |
| Icons           | Lucide React                                                    |
| Deployment      | GitHub Pages (auto-deploy from `prd` branch via GitHub Actions) |
| Package Manager | npm                                                             |

---

## Project Structure

```
src/
├── app/                                  Next.js App Router
│   ├── layout.tsx                        Root layout: fonts, metadata, providers
│   ├── page.tsx                          Home page — composes all sections
│   └── globals.css                       Tailwind base + CSS custom properties
├── components/
│   ├── layout/                           Header, Footer
│   ├── ui/                               Primitives: badge, section-heading, scroll-progress, theme-toggle
│   ├── common/                           Shared: brand-logo, company-logo, motion/theme providers
│   └── sections/
│       ├── hero.tsx  about.tsx  experience.tsx
│       ├── projects/projects.tsx
│       ├── skills.tsx  skill-circle.tsx
│       ├── growth-community.tsx          Journey & Impact (book + platforms)
│       ├── education/                    Flipbook (phase controller, book, pages)
│       ├── achievements.tsx              Tabs: awards / certs / course certs / testimonials
│       ├── interests-strip.tsx
│       ├── contact.tsx
│       └── life-circle/                  Hidden — kept for future use
├── data/                                 Typed content constants
├── lib/                                  utils, constants, SECTION_IDS, NAV_LINKS
└── types/                                Shared TS interfaces
```

---

## Sections

### Hero
Full-viewport landing with name, title, one-line tagline, primary CTAs (View My Work · Download Resume), and social links.

### About
Professional summary with highlight cards (6+ years, 500+ plants, 624 LeetCode problems, founding engineer) and a profile photo.

### Experience
Vertical timeline: Kou-Chan (intern) → Cimpress → Aerem Solutions. Each entry carries role, duration, location, impact bullets with metrics, and a tech stack.

### Projects
Featured card plus a carousel spanning professional work (Aerem SaaS, National Pen e-commerce) and personal builds (comment system, Eventos, WhatsApp clone, chat app, machine-coding solutions).

### Skills
Categorised skill circles across frontend, backend, database, cloud, architecture, and domain knowledge.

### Journey & Impact
An interactive 3D book cover that opens into a flippable education timeline (`react-pageflip`) — St. Dominic Savio, Don Bosco HSC, DBIT, Scaler — beside platform-presence cards (LeetCode, CodeChef, GitHub, LinkedIn) with live stats.

### Achievements
Tabbed display of awards (Star of the Sprint, Certificate of Appreciation), Scaler certifications (LLD, JS Specialist, DSA), course certificates (Namaste JS/React/Node), and testimonial quotes.

### Interests Strip
Horizontal icon strip for hobbies — music (guitar, piano), sport (football, hockey, basketball), and tech interests — with a hover tray.

### Contact
Direct contact block with email, phone, LinkedIn, GitHub, and a resume download.

---

## Getting Started

### Prerequisites

- **Node.js 23+** (Next.js 16 requires modern Node; the default macOS `v16` won't work — use `nvm use 23`)
- **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/sonushahuji4/personal-portfolio.git

# Enter the project
cd personal-portfolio

# Use the correct Node version
nvm use 23

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production (Static Export)

```bash
npm run build
# Output written to ./out — ready to upload to any static host
```

### Lint and Type-check

```bash
npm run lint
npx tsc --noEmit
```

---

## Deployment

The site auto-deploys to GitHub Pages via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) whenever the `prd` branch is updated. The workflow installs dependencies, builds with `NEXT_PUBLIC_BASE_PATH` set to the Pages base path, and uploads `./out` as the Pages artifact.

---

## Claude Code Setup

This project is developed with [Claude Code](https://docs.anthropic.com/en/docs/claude-code/) using a multi-agent workflow. Agents live in `.claude/agents/`:

| Agent                 | Purpose                                                                          |
|-----------------------|----------------------------------------------------------------------------------|
| `pm.md`               | Product manager — strategic and UX feedback                                      |
| `designer.md`         | Senior designer — visual and interaction review                                  |
| `reviewer.md`         | Principal-engineer code review with fresh eyes                                   |
| `qa.md`               | QA — tests the live site, reports bugs with repro steps                          |
| `fixer.md`            | Senior engineer — applies fixes from reviewer / QA findings by severity          |
| `book-simulator.md`   | Specialist — builds / maintains the education flipbook                           |

Slash commands live in `.claude/commands/` (`build-section`, `eval-section`, `review-section`, `design-loop`, `qa-loop`, `status`, `setup-foundation`). See [`CLAUDE.md`](./CLAUDE.md) for full project instructions and the agent protocol in [`docs/agents/protocol.md`](./docs/agents/protocol.md).

---

## Contributing

This is a personal portfolio, so external contributions aren't expected. If you spot a typo or bug, feel free to open an issue.

---

## License

See [LICENSE](./LICENSE).

---

*Built with Next.js · Designed and developed by Sonu Shahuji.*
