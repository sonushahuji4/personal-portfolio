Rebuild the Projects section as an interactive vintage radio where each project is a "station" you tune to. The radio must look and feel like a real physical vintage radio — wood cabinet, glass dial, speaker grille, rotary knobs, and sound effects.
 
READ FIRST:
- CLAUDE.md (project conventions)
- src/data/projects.ts (current project data)
- src/components/sections/projects.tsx (current implementation — you will REPLACE this entirely)
- src/app/globals.css (design tokens)
## THE CONCEPT
 
A realistic vintage radio sits in the Projects section. Each project is a "radio station" at a different frequency. The user tunes between stations by:
- Clicking frequency numbers on the dial
- Clicking the rotary knobs (left = previous, right = next)
- Swiping on mobile
When tuning between stations:
- The red needle slides across the dial
- Visual static (canvas noise) appears over the speaker area
- Audio static plays (Web Audio API generated white noise)
- A knob click sound fires
- Content fades out, static clears, new project content fades in
## THE RADIO ANATOMY (EVERY DETAIL MATTERS)
 
### 1. The Cabinet (outermost container)
 
```
Structure (top to bottom):
┌──────────────────────────────────────┐
│          Wood Cabinet Body           │
│  ┌──────────────────────────────┐   │
│  │        Dial Window           │   │
│  │  88.1  92.5  97.3  101.7    │   │
│  │  ──────|─────────────────    │   │  ← needle on track
│  │  AM    FM stereo      SW    │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │      Speaker Grille          │   │
│  │  ┌ Now playing · engineer ┐  │   │
│  │  │ Aerem Solar Monitoring │  │   │
│  │  │ Production SaaS · 2023 │  │   │
│  │  │ Description text ...   │  │   │
│  │  │ 500+  2M+  200+  -60% │  │   │
│  │  │ React Node.js TS PG   │  │   │
│  │  └────────────────────────┘  │   │
│  └──────────────────────────────┘   │
│  ○ Tune    Sonu S. Eng Co.   ○ Sel │  ← knobs + brand
│(screw)                      (screw)│
└──────────────────────────────────────┘
     ┘                            └       ← feet
```
 
CSS for the cabinet:
```css
/* Wood body */
background: #2a1c0f;
border-radius: 18px;
position: relative;
 
/* Wood grain texture (TWO layers for realism) */
.cabinet::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.06;
  background-image: repeating-linear-gradient(
    82deg,
    transparent, transparent 3px,
    rgba(200,160,100,0.4) 3px,
    rgba(200,160,100,0.4) 3.5px,
    transparent 3.5px, transparent 8px,
    rgba(180,140,80,0.2) 8px,
    rgba(180,140,80,0.2) 8.3px
  );
}
 
/* Top highlight + bottom shadow (3D depth) */
.cabinet::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.04) 0%,
    transparent 8%,
    transparent 92%,
    rgba(0,0,0,0.15) 100%
  );
}
 
/* Double bevel border */
.cabinet-bevel {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  border: 1px solid rgba(160,120,60,0.12); /* outer light edge */
}
.cabinet-bevel::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 17px;
  border: 1px solid rgba(0,0,0,0.2); /* inner shadow groove */
}
```
 
**Four brass screws** in the corners:
```css
.screw {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%,
    rgba(180,160,120,0.2),
    rgba(100,80,50,0.15)
  );
  border: 0.5px solid rgba(140,120,80,0.1);
}
/* Position: top-left, top-right, bottom-left, bottom-right at 8px inset */
```
 
**Two feet** at the bottom:
```css
.foot {
  width: 24px;
  height: 8px;
  background: linear-gradient(180deg, #2a1c0f, #1a1008);
  border-radius: 0 0 6px 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
/* Two feet, spaced with justify-content: space-between, padding: 0 50px */
```
 
### 2. The Dial Window
 
Recessed dark panel with glass effect:
 
```css
/* Outer recess */
.dial-recess {
  background: rgba(0,0,0,0.4);
  border-radius: 10px;
  padding: 2px;
}
 
/* Inner dial */
.dial-inner {
  background: linear-gradient(180deg, #110e08, #0a0806);
  border-radius: 8px;
  padding: 14px 16px 8px;
  position: relative;
}
 
/* Warm amber backlight glow */
.dial-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 70%,
    rgba(255,190,60,0.05), transparent 65%
  );
  pointer-events: none;
}
 
/* Glass panel */
.dial-glass {
  border: 0.5px solid rgba(180,150,90,0.08);
  border-radius: 4px;
  padding: 10px 12px 6px;
  background: rgba(255,240,200,0.008);
}
 
/* Glass top-edge reflection */
.dial-glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 0.5px;
  background: linear-gradient(90deg, transparent, rgba(255,240,200,0.06), transparent);
}
```
 
**Frequency numbers** on the dial:
- 5 stations: 88.1 (Aerem), 92.5 (Cimpress), 97.3 (Eventos), 101.7 (Chat), 106.2 (Comments)
- Font: monospace, 10px
- Default: rgba(255,225,160,0.25) — barely visible, like faded print
- Active: rgba(255,230,170,0.9) with text-shadow glow
- Station name below each number in 7px sans-serif, very faint
- Clickable — each number tunes to that station
**The needle track:**
- A 0.5px horizontal line
- Tick marks alternating major (6px tall) and minor (3px tall)
- The RED NEEDLE: 2px wide, 10px tall, gradient red, with red box-shadow glow
- Needle position: slides via CSS transition `left` with cubic-bezier(0.3, 0, 0.2, 1) over 0.8s
- Positions: [4%, 25.5%, 47%, 68.5%, 91%] for the 5 stations
**Band labels** at bottom of dial: "AM", "FM stereo", "SW" in 6.5px uppercase
 
### 3. The Speaker Grille (where project content lives)
 
```css
/* Outer frame */
.speaker-frame {
  background: rgba(0,0,0,0.25);
  border-radius: 10px;
  padding: 2px;
}
 
/* Speaker cloth with cross-hatch pattern */
.speaker-cloth {
  border-radius: 8px;
  min-height: 200px;
  background: #0c0a06;
  position: relative;
  overflow: hidden;
}
 
/* The woven cloth texture */
.speaker-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.12;
  background-image:
    repeating-linear-gradient(0deg,
      rgba(180,150,100,0.3) 0px, rgba(180,150,100,0.3) 1px,
      transparent 1px, transparent 4px),
    repeating-linear-gradient(90deg,
      rgba(180,150,100,0.15) 0px, rgba(180,150,100,0.15) 1px,
      transparent 1px, transparent 4px);
}
```
 
**Static overlay** (for tuning transitions):
- A `<canvas>` element absolutely positioned over the speaker area
- Renders random pixel noise at 25fps during transition
- Fades in/out with opacity transition
**Project content** overlaid on the speaker cloth:
 
Layout:
```
[Power dot ●] Now playing · founding engineer     [EQ bars |||||||]
Aerem Solar Monitoring                (title, 20px, warm white)
Production SaaS · 2023 — present      (subtitle, 11px, muted)
 
Real-time solar plant monitoring...   (description, 11.5px, warm muted)
 
500+    2M+     200+    -60%          (stats, 18px bold)
Plants  Daily   B2B     Tickets       (labels, 7.5px uppercase)
 
React  Node.js  TypeScript  PostgreSQL  AWS  Redis    (tech tags)
```
 
Colors — all in the warm amber family:
- Title: rgba(255,240,210,0.88)
- Subtitle: rgba(255,225,160,0.3)
- Description: rgba(255,230,180,0.38)
- Stat values: rgba(255,220,150,0.82)
- Stat labels: rgba(255,225,160,0.28)
- Tags: rgba(255,225,160,0.25) with 0.5px border at rgba(255,225,160,0.06)
- "Now playing": rgba(255,225,160,0.35) with green power dot
**Equalizer bars** (7 bars, animated):
```css
.eq-bar {
  width: 2.5px;
  border-radius: 1px;
  background: rgba(255,200,80,0.45);
}
/* Each bar gets a different animation-delay (0s, 0.12s, 0.24s, etc.) */
/* Animation: height oscillates between 3px and 15px */
@keyframes eq {
  0% { height: 3px; }
  100% { height: 15px; }
}
/* ease-in-out, infinite, alternate */
```
 
**Green power indicator dot:**
```css
.power-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(80,200,80,0.7);
  box-shadow: 0 0 6px rgba(80,200,80,0.3);
  animation: pulse 1.5s infinite; /* opacity 0.5 → 1 → 0.5 */
}
```
 
### 4. The Knobs
 
Two knobs: left = "Tune" (previous station), right = "Select" (next station)
 
```css
.knob {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 32%,
    #50392a, #2e1e10 55%, #1a1008 100%
  );
  border: 1.5px solid rgba(160,130,80,0.12);
  cursor: pointer;
  position: relative;
  box-shadow:
    0 3px 10px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,255,255,0.04),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  transition: transform 0.12s;
}
 
.knob:hover { transform: scale(1.03); }
.knob:active {
  transform: scale(0.97);
  box-shadow: 0 1px 4px rgba(0,0,0,0.5), /* pressed in */
    inset 0 1px 0 rgba(255,255,255,0.04);
}
```
 
**Knob indicator dot** on top:
```css
.knob-dot {
  position: absolute;
  top: 7px;
  left: 50%;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(200,170,100,0.35);
  transform: translateX(-50%);
  transition: transform 0.6s; /* rotates when knob is clicked */
}
```
 
The dot ROTATES each time the knob is clicked (accumulating rotation).
 
**Knob rings** (grip ring + outer ring):
```css
.knob-grip { /* inner circle indent */
  position: absolute;
  inset: 6px;
  border-radius: 50%;
  border: 0.5px solid rgba(200,170,100,0.04);
}
.knob-outer { /* outer shadow ring */
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 0.5px solid rgba(100,80,50,0.1);
}
```
 
**Brand badge** between the knobs:
```
font-size: 7.5px
letter-spacing: 0.35em
text-transform: uppercase
color: rgba(200,170,100,0.12)
font-family: serif
Content: "Sonu S. Engineering Co."
```
 
### 5. Sound Effects (Web Audio API — NO audio files)
 
**CRITICAL: All sounds are generated programmatically. No MP3/WAV files needed.**
 
```typescript
// Initialize AudioContext on first user interaction
let audioCtx: AudioContext | null = null
 
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
}
 
// SOUND 1: Knob click (fires on every station change)
function playClick() {
  initAudio()
  if (!audioCtx) return
  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()
  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.frequency.value = 2400
  osc.type = 'square'
  gain.gain.setValueAtTime(0.015, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04)
  osc.start()
  osc.stop(audioCtx.currentTime + 0.04)
}
 
// SOUND 2: Radio static (plays during tuning transition, 0.5s)
function playStatic(duration: number = 0.5) {
  initAudio()
  if (!audioCtx) return
  const bufferSize = audioCtx.sampleRate * duration
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.06 // low volume white noise
  }
  const source = audioCtx.createBufferSource()
  const gain = audioCtx.createGain()
  source.buffer = buffer
  source.connect(gain)
  gain.connect(audioCtx.destination)
  gain.gain.setValueAtTime(0.06, audioCtx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
  source.start()
  source.stop(audioCtx.currentTime + duration)
}
```
 
**AudioContext rules for Next.js:**
- AudioContext must be created inside a user gesture (click handler), NOT at module scope
- Guard with `typeof window !== 'undefined'` if needed
- The `initAudio()` function handles lazy initialization
- Wrap in try/catch — some browsers block audio
### 6. The Tuning Transition (EXACT SEQUENCE)
 
When user clicks a station or knob:
 
```
T+0ms     → playClick() fires
T+0ms     → Needle starts sliding (0.8s CSS transition)
T+0ms     → Knob dot rotates to new position
T+0ms     → Content area fades out (opacity → 0, 0.25s)
T+50ms    → Static canvas starts rendering (setInterval 40ms)
T+50ms    → Static overlay fades in (opacity → 0.5)
T+50ms    → playStatic(0.5) fires
T+550ms   → Static canvas stops rendering (clearInterval)
T+550ms   → Static overlay fades out
T+550ms   → New content is set (DOM updates)
T+550ms   → Content area fades in (opacity → 1, 0.3s)
T+550ms   → Lock released (can tune again)
```
 
Total transition: 0.55 seconds. Fast enough to feel snappy, slow enough to hear the static.
 
**The visual static (canvas rendering):**
```typescript
function drawStatic(ctx: CanvasRenderingContext2D) {
  const imageData = ctx.createImageData(400, 200)
  for (let i = 0; i < imageData.data.length; i += 4) {
    const v = Math.random() * 255
    imageData.data[i] = v      // R
    imageData.data[i+1] = v    // G
    imageData.data[i+2] = v    // B
    imageData.data[i+3] = 255  // A
  }
  ctx.putImageData(imageData, 0, 0)
}
```
 
Canvas size: 400x200. Render at 25fps (setInterval 40ms). The canvas element has `width:100%; height:100%` CSS to fill the speaker area.
 
## DATA STRUCTURE
 
Update src/data/projects.ts:
 
```typescript
export interface RadioStation {
  id: string
  frequency: string           // "88.1"
  stationName: string         // "Aerem" (short name for dial)
  nowPlaying: string          // "Now playing · founding engineer"
  title: string               // "Aerem Solar Monitoring"
  subtitle: string            // "Production SaaS · 2023 — present"
  description: string         // Full description
  stats: { value: string; label: string }[]
  tags: string[]
  category: 'professional' | 'personal'
  url?: string                // link to project/github
}
 
export const radioStations: RadioStation[] = [
  {
    id: 'aerem',
    frequency: '88.1',
    stationName: 'Aerem',
    nowPlaying: 'Now playing · founding engineer',
    title: 'Aerem Solar Monitoring',
    subtitle: 'Production SaaS · 2023 — present',
    description: 'Real-time solar plant monitoring platform. Built the IoT pipeline processing 2M+ daily readings, energy dashboards, automated alerting, and unified auth as the founding engineer.',
    stats: [
      { value: '500+', label: 'Plants' },
      { value: '2M+', label: 'Daily' },
      { value: '200+', label: 'B2B' },
      { value: '-60%', label: 'Tickets' }
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Redis'],
    category: 'professional'
  },
  {
    id: 'cimpress',
    frequency: '92.5',
    stationName: 'Cimpress',
    nowPlaying: 'Now playing · senior sde',
    title: 'National Pen E-Commerce',
    subtitle: 'Global platform · 2020 — 2023',
    description: 'E-commerce serving millions across 20+ countries. Built product features driving 30-40% revenue, payment workflows, 15+ APIs with Redis caching, and storefronts with 95+ Lighthouse.',
    stats: [
      { value: '30-40%', label: 'Revenue' },
      { value: '15+', label: 'APIs' },
      { value: '99.9%', label: 'Uptime' },
      { value: '95+', label: 'Lighthouse' }
    ],
    tags: ['React', 'Angular', 'Node.js', 'Express', 'Python', 'PostgreSQL'],
    category: 'professional'
  },
  {
    id: 'eventos',
    frequency: '97.3',
    stationName: 'Eventos',
    nowPlaying: 'Now playing · personal project',
    title: 'Eventos',
    subtitle: 'Social events platform',
    description: 'A platform for event enthusiasts to discover, track, and engage with events. Features media sharing, stories, live streams, and connecting with friends.',
    stats: [],
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'personal',
    url: 'https://github.com/sonushahuji4/eventos'
  },
  {
    id: 'chat',
    frequency: '101.7',
    stationName: 'Chat',
    nowPlaying: 'Now playing · personal project',
    title: 'Chat Application',
    subtitle: 'Real-time messaging with rooms',
    description: 'Instant messaging application with room support, delivery indicators, and live WebSocket communication.',
    stats: [],
    tags: ['React', 'Node.js', 'Express', 'Socket.io'],
    category: 'personal'
  },
  {
    id: 'comments',
    frequency: '106.2',
    stationName: 'Comments',
    nowPlaying: 'Now playing · personal project',
    title: 'Comment System',
    subtitle: 'Nested threaded discussions',
    description: 'Reddit-style nested comment system with recursive rendering, real-time updates, and clean architecture.',
    stats: [],
    tags: ['React', 'Node.js', 'PostgreSQL'],
    category: 'personal'
  }
]
```
 
## FILE STRUCTURE
 
```
src/components/sections/projects/
├── projects.tsx              # Main section component ('use client')
├── radio-cabinet.tsx         # The wood cabinet wrapper
├── radio-dial.tsx            # Dial window with frequencies and needle
├── radio-speaker.tsx         # Speaker grille with content overlay
├── radio-knobs.tsx           # The two rotary knobs + brand badge
├── radio-static.tsx          # Canvas static overlay component
├── use-radio-audio.ts        # Custom hook for Web Audio sounds
└── projects.module.css       # All radio styling
 
src/data/projects.ts          # Updated with RadioStation data
```
 
## ANIMATIONS (Framer Motion)
 
**Section scroll-in:**
- The entire radio fades in + scales from 0.95 to 1.0 when scrolling into view
- Subtle, 0.6s duration
**Content transitions (inside the speaker):**
- Use Framer Motion AnimatePresence for content swap
- Exit: opacity 0, translateY 3px (0.25s)
- Enter: opacity 1, translateY 0 (0.3s, 0.1s delay)
**Equalizer bars:**
- CSS keyframes animation (not Framer Motion — runs continuously)
- 7 bars, each with different animation-delay
- height oscillates 3px → 15px, ease-in-out, infinite alternate
**Needle:**
- Pure CSS transition on `left` property
- cubic-bezier(0.3, 0, 0.2, 1) — smooth acceleration then deceleration like a real mechanical slider
**Knob rotation:**
- The indicator dot accumulates rotation (e.g., +40deg per next, -40deg per prev)
- CSS transition on transform, 0.6s
## RESPONSIVE BEHAVIOR
 
**Desktop (>768px):**
- Radio max-width: 600px, centered
- Full layout as described
**Mobile (<768px):**
- Radio fills width with 16px side padding
- Frequency numbers: 9px font (slightly smaller)
- Speaker content: 10px description, 16px title
- Knobs: 40px instead of 48px
- Stats: 3 per row max, wrap if needed
- Touch: swipe left/right on the radio to change stations
**Mobile swipe:**
```typescript
let touchStartX = 0
onTouchStart = (e) => { touchStartX = e.touches[0].clientX }
onTouchEnd = (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 40) {
    dx < 0 ? nextStation() : prevStation()
  }
}
```
 
## REDUCED MOTION
 
If `prefers-reduced-motion: reduce`:
- Disable EQ bar animations (set to static height)
- Disable power dot pulse
- Needle jumps instantly (no CSS transition)
- No static visual effect (skip canvas rendering)
- No static audio (skip playStatic)
- Keep knob click sound (it's feedback, not decoration)
- Content swaps instantly (no fade)
## WHAT TO REMOVE FROM CURRENT IMPLEMENTATION
 
- The All / Professional / Personal filter toggle
- The card grid layout
- The top colored borders on cards
- The "Proprietary" / source code link indicators
The radio replaces ALL of this. The "professional vs personal" distinction is communicated by the "Now playing" badge text ("founding engineer" vs "personal project").
 
## VERIFICATION
 
After building:
1. `npx tsc --noEmit` — PASS
2. `npm run lint` — PASS
3. `npm run build` — PASS
4. Visual checks:
   - [ ] Radio looks like a real vintage radio (wood grain, brass screws, beveled edges)
   - [ ] Dial window has amber backlight glow
   - [ ] 5 frequency numbers visible, active one glows
   - [ ] Red needle slides smoothly when tuning
   - [ ] Tick marks visible on the dial track (major and minor)
   - [ ] Speaker grille has woven cloth texture
   - [ ] Project content readable inside speaker area
   - [ ] Green power dot pulses
   - [ ] EQ bars animate continuously
   - [ ] Knobs have 3D appearance (radial gradient, shadow)
   - [ ] Knobs depress on click
   - [ ] Knob indicator dot rotates on each click
   - [ ] "Sonu S. Engineering Co." badge visible between knobs
   - [ ] Four screws in corners
   - [ ] Two feet at bottom
5. Sound checks (TURN SOUND ON):
   - [ ] Click sound on every station change (crisp, short)
   - [ ] Static noise during tuning transition (0.5s, fades out)
   - [ ] No sound plays on page load (only on user interaction)
   - [ ] No console errors about AudioContext
6. Transition checks:
   - [ ] Visual static appears on speaker during tuning
   - [ ] Content fades out before static, fades in after
   - [ ] Needle slides in sync with the transition
   - [ ] Cannot spam-click to break transitions (lock mechanism)
7. Mobile checks:
   - [ ] Radio fills width on mobile
   - [ ] Swipe left/right changes stations
   - [ ] Touch targets large enough (knobs, frequencies)
   - [ ] Content doesn't overflow
8. Accessibility:
   - [ ] Keyboard: Tab to frequencies, Enter to select
   - [ ] Reduced motion: animations disabled, sounds mostly disabled
   - [ ] Screen reader: section heading "Projects", aria-labels on knobs
## DO NOT
 
- Use any audio files (generate ALL sounds with Web Audio API)
- Use images for the radio (everything is CSS)
- Use Three.js or any 3D library (pure CSS + canvas for static)
- Import any new heavy dependencies
- Break the section ID (keep id="projects" for nav scrolling)
- Make the radio wider than 600px on desktop
- Forget the canvas static effect (this is the signature moment)
- Forget the click sound (tactile feedback matters)
- Use setTimeout for the static audio — use Web Audio scheduling
- Access AudioContext at module scope (must be inside click handler)
- Skip the wood grain texture (it's what makes it look real vs generic)
- Make the speaker content too small to read
- Forget mobile swipe support
GO.