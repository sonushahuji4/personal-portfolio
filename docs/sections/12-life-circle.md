# Section Spec: Life Circle

## Purpose

A distinctive, interactive circular timeline that tells Sonu's life as 12 chapters — each a "surprise box" that opens to reveal a personal story. The final chapter is "unknown," inviting visitors to be part of what comes next.

**Position in page:** Between About and Experience sections (section 3 in order).

## Visual Design

### The Main Visual
- A large SVG circle (viewBox 1000x1000) centered in the viewport
- 12 chapter "nodes" positioned evenly around the circle perimeter (every 30 degrees, starting from 12 o'clock going clockwise)
- Connecting line (the "timeline") that traces from node to node around the circle
- The line appears progressively filled as you scroll/progress through chapters
- Center of circle displays: "SONU" in display font, with active chapter title below it
- Each node is a colored dot with an icon inside

### Node States
- **Default:** Muted color dot with faint glow, icon visible
- **Hover:** Scale up 1.15x, icon brightens, subtle radial glow, tooltip with teaser
- **Active (current in scroll):** Full saturation, pulsing glow animation, icon animated
- **Opened:** Ring appears around the dot showing it's been explored

### Chapter Modal (when clicked)
- Full-viewport modal with the era's mood color as background gradient
- Backdrop blur over the rest of the page
- Modal content:
  - Large chapter number: "01" in display font
  - Icon centered at top
  - Chapter title
  - Era subtitle  
  - Story content (the 150-250 word narrative)
  - Navigation: ← previous chapter | close | next chapter →
  - ESC to close, arrow keys to navigate

### Chapter 12 (The Unknown)
- Pulsing white/rainbow gradient orb (not a solid color)
- Shimmer animation
- Teaser: "The next chapter is unwritten."
- When clicked: special modal with the "Write Chapter 12 with me" CTA button linking to contact

## Files to Create

### 1. Types — `src/types/life-circle.ts`
```typescript
export type ChapterMood = 
  | 'warm-sepia'      // Childhood
  | 'playful-green'   // School
  | 'blue-hour'       // Junior College  
  | 'electric-neon'   // Engineering
  | 'eager-yellow'    // First Job
  | 'muted-gray'      // COVID
  | 'warm-amber'      // Cimpress
  | 'red-orange'      // The Leap
  | 'solar-gold'      // Zero to One
  | 'midnight-blue'   // Scaler
  | 'morning-light'   // Today
  | 'shimmer'         // Unknown

export interface Chapter {
  id: number
  number: string           // "01", "02", ..., "12"
  title: string            // "The Beginning", "School Days", etc.
  era: string              // "Childhood" / "2006–2014"
  mood: ChapterMood
  icon: string             // Lucide icon name
  teaser: string           // Short line shown on hover/preview
  story: string            // The 150-250 word narrative (markdown-style paragraphs with \n\n)
  accentColor: string      // Hex for the mood
  isUnknown?: boolean      // Only true for Chapter 12
}
```

### 2. Data — `src/data/life-circle.ts`

Use the content from `docs/life-circle-chapters.md` verbatim. Each chapter gets a full Chapter object with the teaser and story text exactly as written.

Mapping of accent colors (hex):
- Chapter 1 (warm-sepia): `#d4a574`
- Chapter 2 (playful-green): `#7bc47f`
- Chapter 3 (blue-hour): `#6b8cae`
- Chapter 4 (electric-neon): `#00d9ff`
- Chapter 5 (eager-yellow): `#f4c430`
- Chapter 6 (muted-gray): `#8a9590`
- Chapter 7 (warm-amber): `#e89547`
- Chapter 8 (red-orange): `#ff5b35`
- Chapter 9 (solar-gold): `#ffb300`
- Chapter 10 (midnight-blue): `#3a4a7a`
- Chapter 11 (morning-light): `#e8d5b7`
- Chapter 12 (shimmer): `#c0a0ff` (base, but render as gradient)

Lucide icon mapping:
- Chapter 1: `Sparkles` (childhood wonder)
- Chapter 2: `BookOpen` (school)
- Chapter 3: `Mountain` (Lonavala hills)
- Chapter 4: `Cpu` (engineering)
- Chapter 5: `Smartphone` (Android internship)
- Chapter 6: `CloudRain` (COVID isolation)
- Chapter 7: `Globe` (global platform)
- Chapter 8: `DoorOpen` (the leap)
- Chapter 9: `Sun` (solar, zero to one)
- Chapter 10: `Brain` (learning)
- Chapter 11: `Coffee` (present day)
- Chapter 12: `Infinity` (unknown / unlimited)

### 3. Main Component — `src/components/sections/life-circle/life-circle.tsx`

Client component ('use client'). Orchestrates the whole section:
- Renders the section heading "The Life Circle"
- Subtitle: "A journey in twelve chapters — click any to open"
- Renders the CircleVisual component
- Manages active chapter state (0–11, null if none)
- Manages modal open state
- Handles keyboard navigation (arrows, escape)
- Renders ChapterModal when a chapter is selected

### 4. Circle SVG Component — `src/components/sections/life-circle/circle-visual.tsx`

- SVG with viewBox="0 0 1000 1000"
- Background: faint concentric circles for depth
- Main ring: full circle path, stroke with dashed "progress" 
- 12 chapter nodes positioned at angles: 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330 degrees (0 = top)
- Radius: 380 (leaves room for glow)
- Center text: "SONU" + active chapter title
- Uses Framer Motion for:
  - Initial draw animation on scroll-into-view
  - Node stagger entrance
  - Hover state (via `whileHover`)

### 5. Chapter Node — `src/components/sections/life-circle/chapter-node.tsx`

Individual dot on the circle:
- Props: chapter (Chapter), position ({x, y}), isActive, isOpened, onClick
- Renders an SVG circle (radius 28) + foreign object for the Lucide icon
- Tooltip showing teaser on hover
- Different rendering for Chapter 12 (shimmer gradient, animated)
- Click triggers onClick with chapter id

### 6. Chapter Modal — `src/components/sections/life-circle/chapter-modal.tsx`

Full-screen modal:
- Props: chapter, isOpen, onClose, onPrev, onNext, hasPrev, hasNext
- Backdrop with blur + mood-colored gradient
- Content card (max-width 680px, centered)
- Displays chapter number, icon, title, era, story
- Story renders with \n\n split into <p> elements
- Navigation arrows (disabled for first/last)
- Close button (top right) + ESC key
- Focus trap when open
- Animates in with scale + fade (Framer Motion)
- Special variant for Chapter 12: shows the "Write Chapter 12 with me" CTA button

### 7. Unknown Chapter Component — `src/components/sections/life-circle/unknown-chapter-cta.tsx`

Used inside the modal when Chapter 12 is opened:
- The text content
- A prominent CTA button: "Write Chapter 12 with me →"
- Clicking it scrolls to #contact section and closes the modal

## Mobile Fallback

On screens smaller than 768px:
- SVG circle becomes a **vertical timeline rail** (left-aligned, stacked chapter nodes)
- Each node is still clickable and opens the same modal
- Same content, no rotation, no SVG math

Detect via a hook `useMediaQuery('(min-width: 768px)')` or Tailwind's responsive classes.

## Accessibility

- Section uses `<section id="life-circle" aria-labelledby="life-circle-heading">`
- Chapter nodes are `<button>` elements with descriptive aria-labels
- Modal uses `role="dialog"` with `aria-modal="true"` and `aria-labelledby`
- Focus trap when modal is open
- Keyboard nav: Tab through nodes, Enter to open, Arrow keys for prev/next in modal, Esc to close
- Respects `prefers-reduced-motion`:
  - No scroll-triggered rotation
  - Fade instead of scale/draw
  - Instant modal transitions

## Animations (Framer Motion)

**On scroll-into-view:**
- Circle draws in (stroke-dasharray animation, 1.2s ease-out)
- Nodes appear with stagger (100ms apart, each scales from 0 to 1)
- Center text fades in after nodes (0.8s delay)

**On hover over node:**
- Scale 1.0 → 1.15
- Glow opacity 0.3 → 0.8
- Tooltip fade in

**On modal open:**
- Backdrop fade in (0.2s)
- Content: scale 0.9 → 1, opacity 0 → 1 (0.3s ease-out)

**On modal close:**
- Reverse of open

**Chapter 12 ambient:**
- Shimmer: hue-rotate animation on loop (4s infinite)
- Pulse: scale 1 → 1.05 → 1 (2s infinite)

## Page Integration

Update `src/app/page.tsx`:
```tsx
<Hero />
<About />
<LifeCircle />  {/* NEW — between About and Experience */}
<Experience />
<Projects />
...
```

Update `src/lib/constants.ts` SECTION_IDS and NAV_LINKS to include:
```typescript
LIFE_CIRCLE: 'life-circle'
```
And add nav link: `{ label: 'Journey', href: '#life-circle' }` between About and Experience.

## Done Condition

- [ ] Section renders between About and Experience
- [ ] Circle displays 12 nodes in correct positions
- [ ] Each node shows correct icon and color
- [ ] Hover shows teaser tooltip
- [ ] Click opens modal with full story
- [ ] Modal nav (prev/next/close) works
- [ ] Keyboard nav works (Tab, Enter, Arrows, Esc)
- [ ] Chapter 12 has special visual treatment and CTA
- [ ] Mobile fallback to vertical timeline works
- [ ] Reduced motion preference respected
- [ ] tsc + lint pass
- [ ] npm run build passes (static export compatible)

## Content Source

All 12 chapter stories are in `docs/life-circle-chapters.md`. Copy each story **verbatim** into the data file. Placeholder `[brackets]` should remain as-is — Sonu will fill them in later.
