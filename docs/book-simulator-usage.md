# Book Simulator Agent — Usage Guide
 
## What This Agent Does
 
Builds a **realistic book-flip simulation** for your education section:
- Cover with your graduation photo (hat + degree)
- Timeline index that's clickable
- One page per education entry (Scaler, DBIT, Don Bosco, etc.)
- Actual page-flip physics (not CSS transforms — real library)
- Works on desktop and mobile
- Next.js SSR safe
## Why Previous Attempts Failed
 
Based on research into common book-flip failures, these are the usual problems:
 
1. ❌ Trying to build flip physics from scratch with CSS (looks bad, lots of edge cases)
2. ❌ `window is not defined` errors on Next.js build
3. ❌ Missing `React.forwardRef` on page components (silent failure)
4. ❌ Putting the flipbook in a server component (crashes)
5. ❌ Mixing 3D CSS transforms on cover WITH the flip library (they fight)
6. ❌ Forgetting `data-density="hard"` on cover (cover flips like paper, looks wrong)
7. ❌ Missing TypeScript props (`style={{}}` required even if empty)
This agent has all the fixes baked in.
 
## Installation (Drop Into Your Repo)
 
```bash
# From your repo root (portfolio or moments)
mkdir -p .claude/agents
cp ~/Downloads/book-simulator.md .claude/agents/
```
 
## Invocation
 
In Claude Code, start a session and paste:
 
```
Use the book-simulator agent to build a realistic book-flip Education section.
 
Specifics:
- Cover page: my graduation photo (I'll add /public/graduation-photo.jpg) 
  with "My Education" title in gold foil style
- Index page: timeline with clickable entries
- Entries in chronological order:
  1. Scaler Academy — Apr 2023 to May 2025
  2. DBIT — Aug 2016 to Jun 2020
  3. Don Bosco Lonavala (HSC)
  4. St. Dominic Savio (SSC)
- Each entry gets its own page with degree, dates, description, highlights
- Back cover with optional note
- Integrate with existing education data at src/data/education.ts
- Keep consistent with existing portfolio design (dark theme with electric blue accent)
 
Run the agent, build the code, verify with type-check + lint + build.
```
 
## What The Agent Will Do
 
1. Read your existing CLAUDE.md and education data
2. Install `react-pageflip` if not present
3. Create 10 files in `src/components/sections/education/`:
   - `education.tsx` (server wrapper with dynamic import)
   - `education-book.tsx` (client component with HTMLFlipBook)
   - `pages/cover-page.tsx`
   - `pages/cover-back-page.tsx`
   - `pages/index-page.tsx`
   - `pages/content-page.tsx`
   - `book-skeleton.tsx`
   - `book-controls.tsx`
   - `education.module.css`
4. Update `src/data/education.ts` if needed
5. Run verification
6. Report success with file list
Expected time: **15-25 minutes** (not the 2-hour debugging loops you've been hitting)
 
## Prepare These Before Running
 
### 1. Your graduation photo
Place at: `public/graduation-photo.jpg`
- Recommended dimensions: 600x800 (portrait, 3:4 ratio)
- You with graduation hat, holding your degree
- Good lighting, professional-looking crop
If you don't have one yet, the agent will use a placeholder div with your initials in graduation-themed colors.
 
### 2. Your education data
The agent will use this structure. Update `src/data/education.ts` or let the agent generate it:
 
```typescript
export interface EducationEntry {
  id: string
  institution: string       // "Scaler Academy"
  degree: string            // "DSA + System Design + Full Stack"
  dates: string             // "Apr 2023 – May 2025"
  location?: string         // "Online"
  grade?: string            // "Distinction"
  description: string       // 2-3 sentence paragraph
  highlights?: string[]     // Bullet points
  image?: string            // Optional photo
  pageNumber: number        // Auto-calculated by agent
}
```
 
### 3. Descriptions for each entry
The agent will ask if descriptions are missing. Have these ready:
 
**Scaler:**
- Description: "Completed 16 modules covering advanced DSA, system design, and full stack web development while working full time at Aerem."
- Highlights: "624 LeetCode problems solved", "Knight rating 2059 (top 1.85%)", "Built 5 full stack projects"
**DBIT:**
- Description: "Four-year bachelor's in Computer Science. Graduated during COVID-19."
- Highlights: [Fill in]
**Don Bosco Lonavala (HSC):**
- Description: "Higher Secondary Certificate, Science stream"
- Highlights: [Fill in]
**St. Dominic Savio (SSC):**
- Description: "Secondary School Certificate"
- Highlights: [Fill in]
## After It's Built
 
### Test on localhost
1. Run `pnpm dev`
2. Navigate to `/` (or wherever Education section is)
3. Scroll to Education section
4. Cover should appear with your photo
5. Click cover edge → should flip open to index
6. Click an index entry → should jump to that chapter page
7. Click edge of page OR Next button → should flip normally
8. Open on your phone (same network) → test mobile swipe
### If something looks off
 
Paste back to me:
- Screenshot of what you see
- Browser console errors
- Terminal output from `pnpm dev`
I'll debug with you.
 
## Customization Options
 
Once built, you can easily adjust:
 
**Flip speed:** Change `flippingTime={1000}` in `education-book.tsx` (milliseconds)
 
**Shadow intensity:** `maxShadowOpacity={0.5}` — between 0 and 1
 
**Book dimensions:** `width={450} height={600}` + min/max ranges
 
**Cover colors:** Edit `.pageCover` in `education.module.css` (leather-bound default; change gradient colors for different feel)
 
**Page paper color:** `.page` background in CSS (cream default, can go pure white or aged yellow)
 
## Known Limitations
 
1. **No 3D opening swing animation** — the book opens via page-flip, not a separate 3D swing. If you want a 3D "book lifts up and opens" animation BEFORE the flip starts, that requires a second library (Three.js) and a different approach. The current agent focuses on the flip which is the harder, more impressive part.
2. **Photos must be optimized beforehand** — agent doesn't compress. Use next/image for automatic handling.
3. **Print styles not included** — this is a web book, not a PDF export. If you want "download as PDF of your education" later, that's a different agent.
## If You Want to Extend Later
 
Possible future improvements (separate agents / prompts):
- Sound effects on page flip
- Custom paper textures (SVG patterns)
- Photo galleries within pages
- Pinch-to-zoom on images
- Landscape-only mode for desktop premium feel
- Preloading for faster flips on mobile
But first get the basic version working. Build up from there.