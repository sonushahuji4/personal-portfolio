# Consolidated Findings — Round 4 (Life Circle + Design)

## 🔴 Critical
1. **Chapters have [bracketed placeholders]** — unfinished look kills credibility. Can't fix (user needs to fill in), but flag.
2. **Light mode: 3D canvas hardcoded dark** — jarring dark rectangle in light theme.

## 🟡 Major
3. **Section order: Life Circle before Experience** — delays professional signal. Move after Skills.
4. **No loading fallback** — blank void during WebGL init.
5. **Planet geometry pops on hover** — recreates geometry instead of scaling mesh.
6. **Comets have no tail** — just two spheres, not visually a comet.
7. **"Click to explore" blocks interaction** — confusing UX.
8. **Instruction text below canvas conflicts with overlay inside canvas.**

## 🟠 Minor
9. **Sun emissiveIntensity too high** — clips to white with ACES tone mapping.
10. **Stars all same size/color** — no depth variation.
11. **autoRotateSpeed too slow** — scene barely moves.
12. **max-w-170 may not be defined** — modal width issue.

## 🔵 Polish
13. **Chapter 12 story ends with no link** to contact.
14. **Canvas height 70vh cramped on short screens.**
