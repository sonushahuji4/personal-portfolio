# Code Review — Round 1

## Date: 2026-04-15

## Findings

### Fixed (from prior QA bugs)
All 7 fixes verified correct:
- contact.tsx: Uses CONTACT_INFO, no hardcoded strings
- footer.tsx: 'use client' added for dynamic year
- layout.tsx: MotionProvider wraps children
- motion-provider.tsx: Correct client component with reducedMotion="user"
- hero.tsx: ExternalLink removed
- projects.tsx: aria-pressed added
- public/: Template SVGs removed, resume.pdf added

### New findings addressed
- courses.tsx: "Completed" badge was hardcoded — fixed to use course.status field

### Deferred (acceptable trade-offs)
- Section heading strings ("Let's Connect", "View My Work") are inline in components. These are UI labels, not user data — acceptable per CLAUDE.md which says "All text content lives in src/data/" referring to portfolio content, not UI chrome.
- footer.tsx 'use client' is intentional — needed because static export freezes server-side Date() at build time.

## Verdict: PASS (1 minor fix applied)
