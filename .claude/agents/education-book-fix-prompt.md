Completely rebuild the Education section. The current implementation looks flat and broken. I want a 3D open book that looks like these real references: a leather-bound book open on a table, viewed from front, with visible spine, page curl, warm lighting, and depth.
 
READ FIRST:
- .claude/agents/book-simulator.md (the agent with all critical rules)
- CLAUDE.md (project conventions)
- src/data/education.ts (existing education data)
- src/components/sections/education/ (current broken implementation — DELETE and rebuild)
## THE VISION
 
Two phases:
 
**Phase 1 (Closed Book):** A 3D closed book sits on the page. My graduation photo on the cover with gold border frame. Title "A Journey of Learning". Click to open.
 
**Phase 2 (Open Book):** The book opens and you see it from the front — like the reference photos of an open Bible/Quran on a table. Two pages visible (left and right). The spine curves in the center. Pages have depth. Warm lighting from above. Flip pages with arrows, swipe, or click the index.
 
The KEY difference from the current broken version: the book should look 3D even when open — not flat cards being flipped. The 3D perspective comes from CSS, the page flipping comes from react-pageflip.
 
## PHASE 1: THE CLOSED BOOK (3D Cover)
 
A leather-bound book sitting on the dark page, slightly angled in 3D perspective.
 
### Cover design:
- Dark leather texture background (CSS gradients, not an image)
- Gold ornamental border (4px solid #c9a961 with inner border)
- My graduation photo centered (public/graduation-photo.jpg)
  - Photo inside a gold frame: border 3px solid #c9a961
  - Aspect ratio 3:4 portrait
  - Size: ~60% of the cover width
- Title below photo: "A Journey of Learning" in gold serif font
- Subtitle: "FLIP TO READ →" small, faded gold
- The whole book has:
  - perspective: 1200px on parent
  - rotateY(-20deg) for 3D angle
  - Visible spine on the left (dark gradient, 16px wide)
  - Visible page edges on the right (repeating lines simulating stacked pages)
  - Drop shadow underneath
  - Hover: slight lift (translateY(-4px))
### Interaction:
- Click the cover OR click "Open the book" button below → cover swings open (rotateY -160deg, 1.8s)
- After opening animation: crossfade to Phase 2 (the flipbook)
- Use AnimatePresence mode="wait" for the crossfade
### CRITICAL: The crossfade
Do NOT nest the HTMLFlipBook inside a CSS perspective parent. The library's internal transforms will break. Instead:
- Phase 1 (3D cover) fades out over 0.5s
- Phase 2 (HTMLFlipBook) fades in over 0.6s
- They are sibling divs controlled by a state machine: 'closed' | 'opening' | 'open'
## PHASE 2: THE OPEN BOOK (3D Flipbook)
 
This is where the magic happens. The HTMLFlipBook from react-pageflip renders the page flipping, but we ADD 3D context around it to make it look like a real open book.
 
### The 3D book wrapper (around HTMLFlipBook):
 
```
┌────────────────────────────────────────────────┐
│                  perspective: 1200px            │
│  ┌──────────────────────────────────────────┐  │
│  │          transformStyle: preserve-3d      │  │
│  │          rotateX(2deg)  ← looking down    │  │
│  │                                           │  │
│  │   [Spine]  ┌─────────┐ ┌─────────┐      │  │
│  │   (dark    │  LEFT   │ │  RIGHT  │      │  │
│  │   gradient │  PAGE   │ │  PAGE   │      │  │
│  │   3px wide)│         │ │         │      │  │
│  │            └─────────┘ └─────────┘      │  │
│  │                                           │  │
│  │   [Page edge stacks visible on sides]     │  │
│  │   [Shadow beneath the whole book]         │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```
 
CSS for the 3D wrapper:
```css
/* The perspective container */
.book-perspective {
  perspective: 1200px;
  perspective-origin: 50% 40%; /* slightly above center — looking down */
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
 
/* The 3D book body */
.book-3d-body {
  transform-style: preserve-3d;
  transform: rotateX(3deg); /* slight tilt — like looking at a book on a table */
  position: relative;
}
 
/* Center spine (visible between the two pages) */
.book-spine {
  position: absolute;
  left: 50%;
  top: 3px;
  transform: translateX(-50%);
  width: 6px;
  height: calc(100% - 6px);
  background: linear-gradient(90deg, 
    rgba(60,40,20,0.6), 
    rgba(30,20,10,0.8), 
    rgba(60,40,20,0.6)
  );
  border-radius: 1px;
  z-index: 10;
  box-shadow: 0 0 8px rgba(0,0,0,0.3);
}
 
/* Left page edge stack (visible on left side) */
.book-pages-left {
  position: absolute;
  left: -3px;
  top: 4px;
  width: 5px;
  height: calc(100% - 8px);
  background: repeating-linear-gradient(
    to bottom,
    #f5f0e6 0px, #e8e0d0 1px, #f5f0e6 2px
  );
  border-radius: 2px 0 0 2px;
  z-index: -1;
}
 
/* Right page edge stack */
.book-pages-right {
  position: absolute;
  right: -3px;
  top: 4px;
  width: 5px;
  height: calc(100% - 8px);
  background: repeating-linear-gradient(
    to bottom,
    #f5f0e6 0px, #e8e0d0 1px, #f5f0e6 2px
  );
  border-radius: 0 2px 2px 0;
  z-index: -1;
}
 
/* Warm lighting gradient overlay on pages */
.book-lighting {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255,240,200,0.03) 0%,
    transparent 40%,
    rgba(0,0,0,0.02) 100%
  );
  pointer-events: none;
  z-index: 5;
  border-radius: 4px;
}
 
/* Shadow under the book (on the "table") */
.book-table-shadow {
  width: 90%;
  height: 20px;
  margin: -8px auto 0;
  background: radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%);
  filter: blur(6px);
}
```
 
### IMPORTANT: The perspective wrapper goes AROUND the HTMLFlipBook but does NOT use transform-style: preserve-3d on the HTMLFlipBook's direct parent. The 3D props go on a wrapper one level above. This prevents the library's transforms from conflicting.
 
Structure:
```tsx
<div className="book-perspective">       {/* perspective: 1200px */}
  <div className="book-3d-body">          {/* rotateX(3deg), preserve-3d */}
    <div className="book-spine" />
    <div className="book-pages-left" />
    <div className="book-pages-right" />
    <div className="book-lighting" />
    <div className="flipbook-wrapper">     {/* NO 3D transforms here */}
      <HTMLFlipBook ...>
        {/* pages */}
      </HTMLFlipBook>
    </div>
  </div>
  <div className="book-table-shadow" />
</div>
```
 
The `flipbook-wrapper` div is a plain div with NO CSS transforms. The 3D effect comes entirely from `.book-3d-body`. This way, react-pageflip's internal transform calculations aren't affected.
 
## PAGE CONTENT RULES (FIX THE OVERFLOW BUGS)
 
### Contents/Index page (PAGE 1 after cover):
 
USE SHORT NAMES ONLY. The current build overflows because full degree titles are too long.
 
```
Contents
─────────
 
I.   St. Dominic Savio ........... p.2
     SSC · 2006–2014
 
II.  Don Bosco Lonavala .......... p.3
     HSC Science · 2014–2016
 
III. DBIT Mumbai ................. p.4
     B.E. Computer Science · 2016–2020
 
IV.  Scaler Academy .............. p.5
     DSA & System Design · 2023–2025
```
 
Font sizes:
- "Contents" title: 18px bold
- Institution name: 13px bold
- Subtitle (degree + dates): 10px italic muted
- Page number: 10px right-aligned
- Each entry is a clickable button with e.stopPropagation()
- Total height must fit in the page — max 4 entries with this spacing
### Content pages (one per institution):
 
MUST use overflow: hidden and constrained content:
- Institution: 15px bold
- Degree: 12px, colored
- Dates: 11px italic muted
- Description: 11px, max 4 lines (use -webkit-line-clamp: 4)
- Highlights: 10px, max 4 items (.slice(0, 4))
- Page number in footer: 9px
ALL page content divs get: `overflow: hidden; height: 100%; box-sizing: border-box;`
 
### Page count (MUST BE EVEN):
1. Contents/Index (page 0)
2. St. Dominic Savio (page 1)
3. Don Bosco Lonavala (page 2)
4. DBIT Mumbai (page 3)
5. Scaler Academy (page 4)
6. Summary / Back page (page 5)
That's 6 pages = even. Good. showCover={false} because the cover is handled by Phase 1.
 
### Page styling (cream paper look):
```css
.page {
  background: linear-gradient(to right, #f0ead8, #f5f0e6);
  font-family: Georgia, 'Times New Roman', serif;
  color: #2a2520;
}
```
 
## HTMLFlipBook EXACT CONFIG
 
```tsx
<HTMLFlipBook
  ref={bookRef}
  width={400}
  height={540}
  size="stretch"
  minWidth={280}
  maxWidth={480}
  minHeight={380}
  maxHeight={620}
  maxShadowOpacity={0.5}
  showCover={false}
  mobileScrollSupport={true}
  flippingTime={800}
  drawShadow={true}
  usePortrait={true}
  startZIndex={0}
  autoSize={true}
  clickEventForward={true}
  useMouseEvents={true}
  swipeDistance={30}
  showPageCorners={true}
  disableFlipByClick={false}
  startPage={0}
  onFlip={handleFlip}
  className=""
  style={{}}
>
```
 
## CONTROLS BELOW THE BOOK
 
```
     ◀ Prev    ● ● ● ● ● ●    Next ▶
              Page 1 of 6
       Drag page edges · Click arrows
```
 
- Prev/Next buttons styled as dark leather with gold text (matching the book theme)
- Page dots showing current position
- Page counter text
- Helper text in small muted italic
## SOUND (optional but nice)
 
Page flip sound on each flip:
```typescript
function playPageFlip() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.02, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  } catch(e) {}
}
```
 
## FILE STRUCTURE
 
```
src/components/sections/education/
├── education-section.tsx           # Server entry, dynamic imports Phase controller
├── education-phase-controller.tsx  # 'use client' — closed/opening/open state
├── book-cover-3d.tsx               # 'use client' — Phase 1 closed book
├── education-book.tsx              # 'use client' — Phase 2 HTMLFlipBook + 3D wrapper
├── pages/
│   ├── index-page.tsx              # Contents with SHORT names
│   ├── content-page.tsx            # Reusable, overflow-safe
│   └── back-page.tsx               # Summary/closing page
├── book-controls.tsx               # Prev/Next + dots + counter
├── book-skeleton.tsx               # Loading fallback
└── education.module.css            # All styling
```
 
## EVERY FORWARDREF PAGE
 
```tsx
const IndexPage = React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  <div className="page" ref={ref}>
    {/* content */}
  </div>
))
IndexPage.displayName = 'IndexPage'
```
 
EVERY page component MUST use forwardRef. This is the #1 cause of silent failures.
 
## DYNAMIC IMPORT CHAIN
 
```tsx
// education-section.tsx (server component)
import dynamic from 'next/dynamic'
const PhaseController = dynamic(
  () => import('./education-phase-controller'),
  { ssr: false, loading: () => <BookSkeleton /> }
)
export default function Education() {
  return (
    <section id="education">
      <SectionHeading title="Education" subtitle="..." />
      <PhaseController />
    </section>
  )
}
```
 
## REDUCED MOTION
 
If prefers-reduced-motion: reduce:
- Skip Phase 1 entirely → go straight to open flipbook
- No flip animations (instant page switch)
- No 3D transforms (flatten everything)
## MOBILE
 
- Portrait mode (single page at a time)
- Book fills width with 16px padding
- Swipe to flip
- No 3D rotation on mobile (flatten rotateX to 0)
## VERIFICATION CHECKLIST
 
1. `npx tsc --noEmit` — PASS
2. `npm run lint` — PASS  
3. `npm run build` — PASS
4. Visual:
   - [ ] Phase 1: 3D closed book with graduation photo visible
   - [ ] Phase 1: Gold border frame around photo
   - [ ] Phase 1: Book has visible spine and page edges
   - [ ] Phase 1: Hover lifts the book slightly
   - [ ] Phase 1: Click opens with 3D rotation animation
   - [ ] Transition: smooth crossfade from Phase 1 to Phase 2
   - [ ] Phase 2: Book looks 3D (visible spine in center, page edges on sides)
   - [ ] Phase 2: Slight rotateX giving "looking at book on table" angle
   - [ ] Phase 2: Warm lighting gradient on pages
   - [ ] Phase 2: Shadow underneath the book
   - [ ] Phase 2: Contents page fits ALL entries without overflow
   - [ ] Phase 2: Content pages never overflow (text truncated if too long)
   - [ ] Phase 2: Clicking contents entry flips to that page
   - [ ] Phase 2: Prev/Next buttons work
   - [ ] Phase 2: Page flip animation has realistic shadow
   - [ ] Phase 2: Page corner fold visible on hover
   - [ ] Mobile: single page, swipe works, no 3D rotation
   - [ ] No "window is not defined" errors on build
## DO NOT
 
- Use Three.js or WebGL (pure CSS for 3D)
- Nest HTMLFlipBook inside a CSS transform parent (transforms go on wrapper above)
- Put long degree titles on the contents page
- Allow content to overflow any page
- Forget forwardRef on ANY page component
- Forget data-density="hard" on covers (if using showCover=true)
- Use images for textures (use CSS gradients)
- Skip the spine element (it's what makes it look like a real book)
- Skip the page edge stacks (they add physical depth)
- Skip the table shadow (grounds the book)
GO.