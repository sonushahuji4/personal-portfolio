# Life Circle v3 — Living Universe
 
## What Changed From v2
 
v2 was a solar system. v3 is a **living universe**. Three zoom levels. Real orbital speed. Ambient life everywhere. Depth of field. Planet approach cinematics.
 
## The Three Views
 
### View 1: UNIVERSE (default, zoomed out)
- Camera at [0, 15, 35] — you see the whole solar system from above-ish
- Sun and 12 planets in elliptical orbits
- **Slow, meditative motion** — inner planet completes an orbit in ~45 seconds, outer planet in ~3 minutes
- Auto-rotate at 0.08 rad/sec (half of current)
- Background: deep starfield + 2-3 tiny distant galaxies (colored smudges)
- Ambient life: 1 comet visible at any time, arcing slowly; occasional shooting stars (every 15-30s)
- 5-10 slow-drifting asteroid clusters in empty regions
- Overlay text: *"A universe in twelve chapters. Click any planet to enter."*
### View 2: APPROACH (mid-zoom, on planet click)
- User clicks a planet → camera smoothly flies toward it (3-4 seconds, eased)
- Mid-flight: camera tilts down, begins to orbit the target
- Destination: camera at ~3 units from planet, looking at it
- At this distance, you see:
  - Planet's **own rotation** (spin on axis clearly visible)
  - Planet's **atmosphere glow** (faint colored sphere around it)
  - **Orbital path** of the planet visible as a thin arc ahead/behind
  - **Nearby satellites/artifacts** spawn around it (chapter-specific)
- Ambient overlay shows: chapter number, title, era in corner
### View 3: CONTEXT (close, optional — only if user clicks the planet AGAIN at approach)
- Camera enters planet's own "bubble" — closer still
- Around the planet, 3-5 small objects drift and orbit the planet itself
- Each object is a tiny metaphor for a life detail from that chapter
- Clicking the planet NOW opens the story modal
- Pressing Esc zooms back out to UNIVERSE view
---
 
## Ambient Universe Elements
 
### Comets
- 2-3 always present, arcing across the background
- Long glowing tail (particle trail with alpha gradient)
- Each comet has a path that takes 30-60 seconds to complete
- Respawn with new random trajectory after exiting view
- Slight color variation (blue-white, green-white, amber)
### Asteroids / Asteroid Belt
- Small gray rock-like geometry (icosahedron, radius 0.05-0.15)
- 30-50 of them
- Some drift individually through space
- A loose "belt" between chapter 6 and 7 orbits — scattered clump rotating slowly
- Low-poly, tumbling randomly
### Meteoroids / Shooting Stars
- Rare, appear every 15-30 seconds
- Streak across screen in 1-2 seconds with bright trail
- Adds "alive" feel without constant motion
### Distant Galaxies
- 2-3 in the far background
- Just colored elliptical sprites (subtle, low opacity)
- Slowly rotate in place
- Colors: deep purple, soft pink, blue-white
### Human-made Objects (Easter egg)
- 1 satellite orbiting the sun between planets
- Optional: a tiny "ISS-like" wireframe shape
- When hovered: tooltip says "Probe 07 — Still listening."
- Pure decoration, but a nice detail
### Nebula Clouds
- Large, translucent volumetric-looking fog clouds in distant space
- 3-4 of them, very faint
- Adds atmospheric depth
- Use `<Cloud>` from drei, or sprite-based
---
 
## Planet-Specific Context Objects (on approach)
 
When camera approaches a specific planet, spawn 3-5 objects that drift around it. These are metaphors for the chapter's story:
 
| Chapter | Approach Objects |
|---------|-----------------|
| 1. Beginning | Paper plane, small toy cube, spinning top |
| 2. School Days | Pencil, paper book, small bell |
| 3. Junior College | Book stack, mountain shard, tiny bicycle |
| 4. Engineer | Circuit ring, laptop silhouette, small server rack |
| 5. First Job | Smartphone, coffee mug, briefcase |
| 6. COVID | Mask shape, cloud wisps, grayed-out orb |
| 7. Cimpress | Pen, globe wire, award ribbon |
| 8. The Leap | Open door frame, glowing arrow |
| 9. Zero to One | Solar panel, blueprint grid, code brackets |
| 10. Scaler | Book stack, neural network lines, trophy |
| 11. Today | Coffee cup, keyboard, guitar silhouette |
| 12. Unknown | Shifting iridescent shards, question mark hologram |
 
These are LOW-POLY geometries (cubes, tori, icos) tinted in the chapter color. Not detailed 3D models — simple shapes that suggest the metaphor.
 
**Implementation:** Only render these when `approachTarget === chapter.id`. Unload when user exits approach view. Keeps scene lean.
 
---
 
## Speed Corrections
 
| Element | v2 (wrong) | v3 (right) |
|---------|-----------|-----------|
| Inner planet orbit (ch 1) | ~4s per revolution | ~45s per revolution |
| Outer planet orbit (ch 12) | ~18s | ~3 minutes |
| Sun rotation | 0.001 rad/frame | 0.0002 rad/frame |
| Planet self-rotation | 0.005 rad/frame | 0.001 rad/frame |
| Camera auto-rotate | 0.3 rad/sec | 0.08 rad/sec |
| Approach camera transition | 1.5s | 3-4s with easing |
 
Use a global `TIME_SCALE` constant (default 0.2 = 20% of v2) so you can tune it in one place.
 
---
 
## Zoom Controls
 
Update OrbitControls:
```tsx
<OrbitControls
  enablePan={false}
  enableZoom={true}
  minDistance={5}          // can zoom VERY close
  maxDistance={80}         // can zoom WAY out (see whole universe)
  zoomSpeed={0.8}
  enableDamping={true}
  dampingFactor={0.08}
  autoRotate={true}
  autoRotateSpeed={0.08}   // very slow
  rotateSpeed={0.5}
/>
```
 
- **Scroll wheel zooms** (but must not hijack page scroll — see below)
- **Drag rotates** the camera around the scene
- **Double-click a planet** → triggers APPROACH view
- **Esc** → returns to UNIVERSE view
### Scroll Wheel Conflict (Important!)
The canvas shouldn't eat page scroll. Solution:
- Only activate zoom when user has **interacted with the canvas first** (clicked or dragged)
- Or: require **Shift+Wheel** to zoom
- Or: show a small "Click to explore" hint and only enable interactions after first click
- Pick one — I recommend "click to enter" pattern: canvas is passive until clicked, then becomes interactive until user clicks outside or presses Esc
---
 
## Depth of Field (DoF) — Cinematic Polish
 
Use `@react-three/postprocessing`:
 
```tsx
<EffectComposer>
  <DepthOfField
    focusDistance={0}
    focalLength={0.02}
    bokehScale={2}
  />
  <Bloom
    intensity={0.6}
    luminanceThreshold={0.3}
    luminanceSmoothing={0.9}
  />
</EffectComposer>
```
 
- In UNIVERSE view: focal point is center (sun) — distant objects slightly soft
- In APPROACH view: focal point is the target planet — everything else soft-blurred
- Creates the cinematic "camera lens" feeling
**Warning:** DoF is expensive. Make it optional based on device performance. Toggle with a setting or auto-disable on mobile.
 
---
 
## Scene Structure
 
```tsx
<Canvas>
  <Suspense>
    {/* Core */}
    <SceneLights />
    <Starfield />
    <Nebulae />
    <DistantGalaxies />
    
    {/* Solar System */}
    <Sun />
    <OrbitRings />
    <Planets onDoubleClick={handleApproach} />
    
    {/* Ambient Life */}
    <Comets count={2} />
    <AsteroidBelt count={40} />
    <ShootingStars interval={[15, 30]} />
    <Satellite />  {/* the easter egg */}
    
    {/* Approach Context (conditional) */}
    {approachTarget && <PlanetContext chapter={approachTarget} />}
    
    {/* Camera */}
    <CameraController 
      mode={viewMode}           // "universe" | "approach"
      target={approachTarget}
    />
    
    {/* Post-processing */}
    <EffectComposer>
      <DepthOfField />
      <Bloom />
    </EffectComposer>
  </Suspense>
</Canvas>
```
 
---
 
## File Structure (additions to v2)
 
```
src/components/sections/life-circle/solar-system/
├── (existing v2 files)
├── comets.tsx              # NEW: arcing comets with trails
├── asteroid-belt.tsx       # NEW: drifting asteroids
├── shooting-stars.tsx      # NEW: occasional bright streaks  
├── nebulae.tsx             # NEW: distant fog clouds
├── distant-galaxies.tsx    # NEW: faint background sprites
├── satellite.tsx           # NEW: the easter egg human-made object
├── planet-context.tsx      # NEW: chapter-specific objects on approach
└── time-scale.ts           # NEW: global speed constant
```
 
---
 
## Instructions for Claude Code
 
Copy this entire prompt into Claude Code:
 
```
Upgrade the Life Circle 3D solar system to a LIVING UNIVERSE simulation.
 
READ FIRST:
- docs/sections/12-life-circle-v3.md (this spec)
- Current implementation in src/components/sections/life-circle/solar-system/
 
CRITICAL FIXES:
1. SLOW DOWN EVERYTHING. Create src/components/sections/life-circle/solar-system/time-scale.ts exporting TIME_SCALE = 0.2. Multiply ALL orbital speeds, rotations, and camera auto-rotate by this constant. Planets should take 45+ seconds to orbit, not 4.
 
2. Zoom range: update OrbitControls minDistance to 5, maxDistance to 80, zoomSpeed 0.8.
 
3. Canvas interaction guard: By default, OrbitControls should NOT respond to scroll wheel (to avoid hijacking page scroll). Only activate after user clicks inside the canvas. Add a small "Click to explore" overlay that disappears after first click. Add Esc handler to "exit" canvas (blur it, re-enable page scroll).
 
ADD THESE NEW FEATURES:
 
FEATURE 1: COMETS
Create comets.tsx:
- Render 2 comets simultaneously, each with:
  - A small bright sphere (radius 0.1)
  - A trail made of a Line with gradient opacity (bright at head, transparent at tail)
  - Trail is ~80 points long, updated each frame to trail behind the head
  - Curved path (parameterized by clock.elapsedTime) that arcs across distant space (distance 40-60 units from center)
  - Takes 30-60 seconds to traverse
  - Respawn with new random path after completion
  - Colors: random among #E8F4FF, #CFFFD8, #FFE8B5
- Use useFrame with Catmull-Rom curve for smooth paths
 
FEATURE 2: ASTEROID BELT  
Create asteroid-belt.tsx:
- Render 40 asteroids as instanced mesh for performance
- Geometry: icosahedronGeometry args=[0.08, 0]
- Material: meshStandardMaterial color="#555" roughness=0.9
- Positions: generate once in useMemo, clustered loosely between orbit radii 7.3 and 7.7 (between chapters 6 and 7)
- Each asteroid rotates at its own random rate (store rotation offsets in useMemo)
- Use useFrame to update instance matrices for rotation + slight orbital drift
 
FEATURE 3: SHOOTING STARS
Create shooting-stars.tsx:
- Randomly triggered every 15-30 seconds (use setTimeout recursively)
- Each shooting star:
  - Short bright line streak across a random section of visible space
  - Lasts 1-2 seconds (fades in then out)
  - Fast linear motion
- Only one active at a time
- Use Framer Motion or manual state for opacity timing
 
FEATURE 4: NEBULAE
Create nebulae.tsx:
- 3 large translucent sprites positioned far in background (distance 60-80)
- Soft circular gradient textures (generate with canvas at init or use sprite material with alphaMap)
- Colors: deep purple #4A1F7A at 15% opacity, soft pink #C94A7A at 12%, blue-white #6B8ACF at 10%
- Very slow rotation (0.00005 rad/frame each)
- Barely noticeable but adds atmospheric depth
 
FEATURE 5: DISTANT GALAXIES
Create distant-galaxies.tsx:
- 3 tiny elliptical sprites at distances 70-90 units
- Each: a small disc with slight glow, tilted randomly
- Very low opacity (8-12%)
- Each rotates in place at different slow rates
 
FEATURE 6: SATELLITE (Easter egg)
Create satellite.tsx:
- Small wireframe geometry (boxGeometry or custom) at orbit radius 4.3 (between chapters 3 and 4)
- Orbit speed similar to nearby planets but slightly different inclination
- On hover: HTML tooltip "Probe 07 — Still listening."
- Subtle blinking light (emissive pulse)
- Does NOT trigger modal — purely decorative
 
FEATURE 7: PLANET CONTEXT (Approach view objects)
Create planet-context.tsx:
- Props: chapter (Chapter)
- Renders 3-5 small themed objects that orbit the given planet at close range
- Use the object mapping from the spec (paper plane for ch1, circuit ring for ch4, etc.)
- Implement as simple low-poly geometries (not 3D models):
  - Ch 1: paper plane = triangle, toy cube, spinning top (cone)
  - Ch 2: pencil (cylinder), book (box), bell (cone)
  - Ch 4: torus (circuit ring), box (laptop), small box (server)
  - Ch 9: flat plane (solar panel), grid lines (blueprint), text sprite "{ }"
  - Ch 12: 4 iridescent shards (tetrahedrons) with shifting material
  - For others: pick simple shapes
- Objects orbit the planet at radius 0.8-1.2 from planet surface
- Only rendered when in APPROACH mode for this specific chapter
- Smooth fade-in when approach begins, fade-out when leaving
 
FEATURE 8: APPROACH MODE  
Update camera-controller.tsx:
- Add viewMode prop: "universe" | "approach"
- Add approachTarget prop: Chapter | null
- When viewMode === "approach":
  - Disable autoRotate
  - Lerp camera over 3-4 seconds (NOT 1.5s) from current position to:
    - position: planet.currentPosition + offset [0, 0.5, 3] (camera floats near planet)
    - target (lookAt): planet.currentPosition
  - Use Easing.easeInOutCubic
  - Ongoing: camera follows the planet as it continues orbiting
- When viewMode === "universe":
  - Lerp camera back to [0, 15, 35] looking at [0, 0, 0]
  - Re-enable autoRotate after transition
 
FEATURE 9: INTERACTION FLOW
Update life-circle.tsx:
- State: viewMode ("universe" | "approach"), approachTarget (Chapter | null), activeChapter (for modal)
- Planet interactions:
  - Single click → enter approach mode for that planet (do NOT open modal yet)
  - Double click on approached planet → open modal with story
  - Click elsewhere or Esc while in approach mode → return to universe view
  - Add small overlay HUD during approach: chapter number, title, "double-click for story"
 
FEATURE 10: POST-PROCESSING
Update solar-system/index.tsx:
- Add DepthOfField effect from @react-three/postprocessing
- focusDistance: 0 in universe mode, 0.01 (focus on approached planet) in approach mode  
- focalLength 0.02, bokehScale 2
- Keep Bloom (already there)
- IMPORTANT: Detect mobile via useMediaQuery; disable DepthOfField on mobile (too expensive)
 
PERFORMANCE:
- Wrap Canvas in dynamic import with ssr: false
- Use Suspense for all loaders
- Instanced meshes for asteroids
- Set Canvas dpr={[1, 2]} (limit device pixel ratio)
- Use gl.toneMapping = THREE.ACESFilmicToneMapping for better colors
 
MOBILE:
- Detect viewport < 768px
- Skip DepthOfField
- Reduce asteroid count to 15
- Reduce star count to 1500
- Disable nebulae
- Keep 1 comet instead of 2
- Disable approach mode on mobile — fall back to direct modal open on tap
 
AFTER BUILDING:
- Run: npx tsc --noEmit
- Run: npm run lint
- Run: npm run build
- Start dev server and verify:
  - Universe view feels calm and cinematic
  - Can zoom in/out smoothly
  - Comets visible in background
  - Asteroids visible between orbits
  - Shooting stars occasionally visible
  - Clicking a planet smoothly transitions to approach view
  - Double-clicking approached planet opens modal
  - Esc returns to universe view
  - Page scroll NOT hijacked by canvas
  - No console errors
 
DO NOT:
- Keep the current fast speeds — everything must slow down
- Break existing modal content or chapter data
- Load 3D model files — use only primitives (spheres, cubes, etc.)
- Forget the scroll hijack fix
 
GO.
```
 
---
 
## Expected Performance
 
With all features:
- Desktop: 60fps easily on a 2020+ Mac/PC
- Mid-range phone: 30-40fps (with mobile optimizations)
- Bundle size: +25KB over v2 (the new features are small)
- Total Three.js payload: ~150KB gzipped
If performance drops below 30fps anywhere, the first thing to disable is DepthOfField, then reduce star/asteroid counts, then disable nebulae.
 
---
 
## Visual Reference (what it should feel like)
 
Think of these references:
- **No Man's Sky** universe view (but simpler)
- **Apple TV's macOS screensaver** with galaxies and stars
- **Interstellar** movie's space scenes (the slow, meditative ones)
- **Celestia** (open-source astronomy software)
- **Space Engine** 
The goal: a viewer should feel like they've opened a window into space, not a web page.
 
---
 
## Ready to Build
 
Save this spec as `docs/sections/12-life-circle-v3.md`, commit it, then paste the build instruction (big code block above) into Claude Code.
 
Expected build time: 15-25 minutes (many new components). Let it run. Share the result.