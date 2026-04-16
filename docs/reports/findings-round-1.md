# Consolidated Findings — Round 1

## 🔴 Critical (must fix)

1. **Hero: "Founding Engineer" signal buried as muted text** — PM says this is the #1 conversion killer. Elevate to styled badge/pill in accent color.
2. **Hero: rotating title dilutes with weak phrases** — "Problem Solver"/"System Designer" are generic. Pin "Founding Engineer" as primary, or remove rotation.
3. **Hero: photo gradient uses hardcoded #09090B** — Breaks on light theme. Use CSS variable.
4. **Recommendations buried 3 clicks deep** — Google SWE endorsement needs visibility without clicking tabs.
5. **Courses section redundant with Achievements tab** — Same content appears twice. Remove standalone Courses section.

## 🟡 Major (should fix)

6. **Three-accent color chaos** — Violet+cyan+mint compete. Pick one primary, use others only for data context.
7. **SectionHeading identical everywhere** — Same layout 11 times flattens rhythm. Vary alignment and scale.
8. **Button: no lift/scale on hover** — Add translate-y + active:scale for tactile feedback.
9. **Timeline line is static** — Needs progressive draw animation on scroll.
10. **No resume CTA in header** — Recruiters on mobile can't find resume without scrolling.
11. **About section opens with resume language** — Should lead with founding story narrative.
12. **Hero title has no exit animation** — Title vanishes instead of animating out.

## 🟠 Minor (nice to fix)

13. **Card transition 400ms → 250ms** — Feels sluggish.
14. **Hero name tracking too loose** — Use tracking-[-0.04em] at display sizes.
15. **Light theme card shadow too subtle** — Bump shadow opacity.
16. **Hobby icons use text-accent regardless of zone color** — Should use zone's accent.
17. **Achievements tab active color mismatches section accent**
18. **About highlight: "5 Engineers Mentored" is weak** — Reframe as growth metric.

## 🔵 Polish (time permitting)

19. **Name letter-by-letter reveal animation**
20. **Vary scroll reveal directions per section**
21. **Hero entrance: add AnimatePresence for title cycling**
