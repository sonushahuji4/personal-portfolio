# Build Instruction: Life Circle Section

Copy-paste this entire prompt into Claude Code terminal.

---

**PROMPT:**

```
Read docs/sections/12-life-circle.md and docs/life-circle-chapters.md completely before writing any code. Then build the Life Circle section following the spec precisely.

This is a DISTINCTIVE, interactive circular timeline section that sits BETWEEN the About and Experience sections. It renders 12 chapters as nodes on an SVG circle, each opening as a modal with a personal story.

CRITICAL REQUIREMENTS:
- Copy all 12 chapters from docs/life-circle-chapters.md VERBATIM into src/data/life-circle.ts. Do not edit, trim, or "improve" any story text. Keep [bracketed placeholders] exactly as they are — they are intentional for Sonu to fill in.
- All chapter story text lives in src/data/life-circle.ts — zero hardcoded strings in components.
- Section must work with static export (output: 'export'). No server-only features.
- Must respect prefers-reduced-motion.
- Must be accessible (aria-labels, focus trap in modal, keyboard navigation).

FILES TO CREATE:

1. src/types/life-circle.ts
   - Export ChapterMood type (union of 12 mood strings)
   - Export Chapter interface with: id, number, title, era, mood, icon, teaser, story, accentColor, isUnknown?

2. src/data/life-circle.ts
   - Export lifeCircleChapters: Chapter[] with all 12 chapters from docs/life-circle-chapters.md
   - Each story must preserve paragraph breaks (use \n\n between paragraphs)
   - Use the mood-to-color mapping and icon names specified in the spec

3. src/components/sections/life-circle/life-circle.tsx
   - Main section component with 'use client'
   - Section heading: "The Life Circle"
   - Subtitle: "A journey in twelve chapters — click any to open"
   - Manages active chapter state and modal open state
   - Handles keyboard shortcuts (Arrow keys for prev/next, Esc to close)
   - Renders CircleVisual on desktop, VerticalTimeline on mobile (use CSS classes for breakpoint switch)
   - Renders ChapterModal when a chapter is active

4. src/components/sections/life-circle/circle-visual.tsx
   - SVG (viewBox="0 0 1000 1000")
   - Center point at (500, 500), node radius 380
   - 12 ChapterNode components positioned at angles starting from top (0°) and going clockwise in 30° increments
   - Use this formula for position: x = 500 + 380*sin(angle), y = 500 - 380*cos(angle), where angle is in radians
   - Faint concentric background circles for depth
   - Main connecting ring with dashed progress animation on scroll-into-view
   - Center text: "SONU" large + "Click a chapter to open" small below
   - Framer Motion initial draw on scroll-into-view

5. src/components/sections/life-circle/chapter-node.tsx
   - SVG group element with circle (r=28) + Lucide icon
   - Hover state: scale 1.15, glow intensifies, tooltip appears above with teaser
   - Onclick calls parent's setActiveChapter
   - Chapter 12 (isUnknown): gradient fill instead of solid color, continuous shimmer animation
   - Accessible: wrapped in button with aria-label describing chapter

6. src/components/sections/life-circle/chapter-modal.tsx
   - Full-viewport modal with backdrop blur
   - Background gradient using chapter.accentColor with low opacity
   - Content card (max-width 680px, centered)
   - Layout:
     * Large chapter.number at top (e.g., "01")
     * Lucide icon with accent color
     * chapter.title (display font, large)
     * chapter.era (smaller, muted)
     * chapter.story split by \n\n into <p> tags with prose styling
   - Prev/Next nav buttons at bottom (disabled when hasPrev=false or hasNext=false)
   - Close button top-right (X icon)
   - Uses Framer Motion AnimatePresence for enter/exit animations
   - Focus trap when open (first focusable element on open, Tab cycles inside)
   - Esc closes, Left/Right arrows navigate
   - SPECIAL for Chapter 12: render <UnknownChapterCta /> below the story text

7. src/components/sections/life-circle/unknown-chapter-cta.tsx
   - Prominent button: "Write Chapter 12 with me →"
   - On click: close modal, then smooth scroll to #contact section
   - Shimmer/gradient styling matching chapter 12 mood

8. src/components/sections/life-circle/vertical-timeline.tsx
   - Mobile-only alternative layout
   - Vertical list of chapter nodes with connecting line down the middle-left
   - Each node is clickable and opens the same ChapterModal
   - Simpler visual treatment, same functionality

INTEGRATION:

9. Update src/lib/constants.ts:
   - Add LIFE_CIRCLE: 'life-circle' to SECTION_IDS
   - Add { label: 'Journey', href: '#life-circle' } to NAV_LINKS, between About and Experience

10. Update src/app/page.tsx:
    - Import LifeCircle from '@/components/sections/life-circle/life-circle'
    - Add <LifeCircle /> between <About /> and <Experience />

11. Update src/components/layout/header.tsx if needed to pick up the new nav link from constants

ANIMATIONS (using Framer Motion):
- Circle stroke draws in on scroll-into-view (1.2s)
- Nodes stagger in (100ms apart, scale from 0 to 1)
- Center "SONU" text fades in 0.8s after
- Node hover: scale 1 → 1.15, glow opacity up
- Modal open: backdrop fade (0.2s), content scale 0.9 → 1 + fade (0.3s ease-out)
- Chapter 12 nodes: continuous shimmer (hue-rotate 4s loop) + pulse (scale 1 → 1.05 → 1 over 2s loop)
- Wrap all animations so prefers-reduced-motion disables them gracefully

DATA MAPPING:

Mood → accentColor:
- warm-sepia: #d4a574
- playful-green: #7bc47f
- blue-hour: #6b8cae
- electric-neon: #00d9ff
- eager-yellow: #f4c430
- muted-gray: #8a9590
- warm-amber: #e89547
- red-orange: #ff5b35
- solar-gold: #ffb300
- midnight-blue: #3a4a7a
- morning-light: #e8d5b7
- shimmer: #c0a0ff

Chapter → Lucide icon:
1. Sparkles
2. BookOpen
3. Mountain
4. Cpu
5. Smartphone
6. CloudRain
7. Globe
8. DoorOpen
9. Sun
10. Brain
11. Coffee
12. Infinity

VERIFICATION AFTER BUILD:
Run these and report results:
- npx tsc --noEmit
- npm run lint
- npm run build

If any fail, fix and retry until all three pass.

DO NOT ASK FOR CLARIFICATION. Every decision has been made. Execute. If ambiguity arises, pick the option most consistent with the existing codebase style and note it in your final report.
```

---

## After Claude Code Finishes

1. Open the site: `npm run dev` → http://localhost:3000
2. Scroll to the Life Circle section
3. Click each chapter node to verify the modal opens
4. Test keyboard navigation (Tab, Enter, Arrow keys, Esc)
5. Resize browser to mobile width — verify vertical timeline layout
6. Test Chapter 12 — should have special shimmer styling and CTA button

## Then Run the Design Loop

Once the section renders correctly:
```
/design-loop
```

This will send the section through PM → Designer → Fixer → QA → Reviewer until polished.
