Set up the project foundation. This must be run BEFORE building any sections.

Read CLAUDE.md and docs/PROJECT_SPEC.md first.

Then create the following files in order:

## 1. Types (`src/types/index.ts`)
Define all TypeScript interfaces needed across the project:
- SocialLink (name, url, icon)
- HighlightCard (value, label)
- ExperienceEntry (id, company, role, type, duration, location, impacts, tech, companyUrl?)
- Impact (text, metric?)
- Project (id, title, description, tech, category, links, highlight?)
- ProjectLink (label, url)
- SkillCategory (name, icon, skills)
- Skill (name)
- EducationEntry (id, institution, credential, duration, activities?, description?)
- Platform (name, username, stats, url, color)
- PlatformStat (label, value)
- Award (title, issuer, date)
- Certification (name, issuer, date)
- Recommendation (name, title, company, quote)
- Course (name, platform, instructor, status, url, topics)
- Hobby (name, icon, category)
- ContactInfo (email, phone, location, linkedin, github, resumeUrl)

## 2. Utility functions (`src/lib/utils.ts`)
```typescript
import { clsx, type ClassValue } from 'clsx';
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

## 3. Constants (`src/lib/constants.ts`)
- SITE_CONFIG: title, description, url, author
- SECTION_IDS: record of section anchor IDs
- SOCIAL_LINKS: array of social links

## 4. Global CSS (`src/app/globals.css`)
Set up CSS variables for the design system:
- Dark theme colors (background, foreground, accent, muted, card, border)
- Font definitions
- Tailwind imports
- Custom utility classes

## 5. Layout (`src/app/layout.tsx`)
- Import fonts (a distinctive display font + body font from Google Fonts)
- Set metadata (title, description, Open Graph)
- Dark theme body class

## 6. UI Primitives
Create reusable components in `src/components/ui/`:
- `button.tsx` — Button with variants (primary, secondary, outline, ghost)
- `badge.tsx` — Tech tag badge
- `card.tsx` — Generic card wrapper
- `section-heading.tsx` — Section title with optional subtitle and accent underline

## 7. Common Components
Create in `src/components/common/`:
- `timeline.tsx` — Reusable vertical timeline (used by Experience and Education)

## 8. Layout Components
Create in `src/components/layout/`:
- `header.tsx` — Fixed top nav with section links + hamburger on mobile
- `footer.tsx` — Copyright footer

## 9. Clean page.tsx
Set up `src/app/page.tsx` as the assembly point:
- Import Header, Footer
- Add placeholder comments for each section in order
- Sections will be added one by one later

## 10. next.config.ts
Configure for GitHub Pages static export:
- output: 'export'
- images: { unoptimized: true }
- basePath and assetPrefix from env vars

After creating all files:
- Run `npx tsc --noEmit`
- Run `npm run lint`
- Run `npm run build` to verify static export works
- Report results
