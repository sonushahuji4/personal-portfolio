# Fix Report — Round 1

## Date: 2026-04-15

```
╔══════════════════════════════════════╗
║        FIX REPORT                    ║
╠══════════════════════════════════════╣
║ Total Issues Received:   8           ║
║ Fixed:                   8           ║
║ Could Not Fix:           0           ║
╠══════════════════════════════════════╣
║ TypeScript:    PASS                  ║
║ Lint:          PASS                  ║
║ Build:         PASS                  ║
╚══════════════════════════════════════╝
```

## Fixes Applied

FIX-001: Missing resume PDF
  File: public/resume.pdf (created)
  Root Cause: No resume file existed in public/
  Fix: Created placeholder resume.pdf
  Verified: tsc PASS | lint PASS

FIX-002: Contact section hardcoded strings
  File: src/components/sections/contact.tsx:25-43
  Root Cause: CONTACT_ITEMS duplicated strings
  Fix: Derived from imported CONTACT_INFO
  Verified: tsc PASS | lint PASS

FIX-003: Footer year freezes at build time
  File: src/components/layout/footer.tsx:1
  Root Cause: Server Component in static export
  Fix: Added 'use client'
  Verified: tsc PASS | lint PASS

FIX-004: No prefers-reduced-motion support
  File: src/components/common/motion-provider.tsx (new), src/app/layout.tsx
  Root Cause: No MotionConfig wrapper
  Fix: Created MotionProvider with reducedMotion="user"
  Verified: tsc PASS | lint PASS

FIX-005: Unused ExternalLink import in hero
  File: src/components/sections/hero.tsx:4,10-14
  Root Cause: Dead import/mapping
  Fix: Removed ExternalLink from import and ICON_MAP
  Verified: tsc PASS | lint PASS

FIX-006: Project filter buttons missing aria-pressed
  File: src/components/sections/projects.tsx:87
  Root Cause: No ARIA state on toggle buttons
  Fix: Added aria-pressed={activeFilter === filter.value}
  Verified: tsc PASS | lint PASS

FIX-007: Leftover template SVGs in public/
  File: public/{file,globe,next,vercel,window}.svg (deleted)
  Root Cause: Create Next App defaults never cleaned up
  Fix: Deleted 5 SVGs
  Verified: tsc PASS | lint PASS

FIX-008: Courses badge ignores status field (from review)
  File: src/components/sections/courses.tsx:39-41
  Root Cause: Hardcoded "Completed" text ignoring course.status
  Fix: Replaced with {course.status.replace('-', ' ')} + capitalize CSS
  Verified: tsc PASS | lint PASS
