# Agent Protocol — Less Slop, More Craft

> Adapted from the SEED → QUESTION → RESEARCH → DESIGN → PLAN → EXECUTE → EVAL → REVIEW → PR framework.

## Protocol Overview

```
SEED → QUESTION → RESEARCH → DESIGN → PLAN → EXECUTE → EVAL → REVIEW → PR
 (H)    (A+H)       (A)      (A+H)   (A+H)    (A)     (Auto)  (A+H)   (A+H)

H = Human decides    A = Agent executes    A+H = Agent proposes, Human approves
```

### Hard Gates (human MUST approve before proceeding)
- DESIGN → PLAN
- PLAN → EXECUTE

### Soft Gates (human reviews)
- RESEARCH → DESIGN
- REVIEW → PR

### Auto Gates (score determines passage)
- EXECUTE → EVAL → REVIEW

---

## Stage Definitions for This Portfolio Project

### Stage 1: SEED (Complete)
The seed is the full set of data Sonu shared: resumes, LinkedIn, GitHub, LeetCode, CodeChef profiles, plus requirements for sections, design preferences, and deployment target. All captured in `docs/PROJECT_SPEC.md`.

### Stage 2: QUESTION (Complete)
Clarifying questions asked and answered: hobbies, courses, deployment preference, domain, photo, resume version.

### Stage 3: RESEARCH (Complete)
Researched: Claude Code best practices, Next.js static export for GitHub Pages, GitHub Actions deployment, portfolio design patterns.

### Stage 4: DESIGN
Before building any section:
1. Read the section spec from `docs/sections/<section>.md`
2. Propose the component structure, data shape, and visual approach
3. List rejected alternatives with reasons
4. Get human approval before proceeding

### Stage 5: PLAN
For each section, the plan is pre-defined in its spec file:
- Which files to create/modify
- Data types needed
- Component hierarchy
- Testable done condition

### Stage 6: EXECUTE
Rules for implementation:
- Read the section spec FIRST — never code without reading the spec
- One section at a time — complete it fully before moving to next
- Each section touches max 3-4 files (data file, component file, types, page.tsx import)
- After each section: run `npx tsc --noEmit` and `npm run lint`
- If a type check fails 3x on the same error, stop and ask for human input

### Stage 7: EVAL
After completing a section, self-check:
- [ ] TypeScript strict mode passes (`npx tsc --noEmit`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Component renders without errors (`npm run dev` → check browser)
- [ ] Mobile responsive (check at 375px, 768px, 1024px, 1440px)
- [ ] All data comes from `src/data/` — no hardcoded strings in components
- [ ] Animations are smooth, not janky
- [ ] Section is self-contained — can be removed from page.tsx without breaking anything

### Stage 8: REVIEW
After eval passes:
- Review the diff for the section
- Check: does it match the spec?
- Check: does it follow the code style in CLAUDE.md?
- Check: is there any "slop" (decorative error handling, unused code, generic patterns)?

### Stage 9: PR
Each section gets its own commit with a clear message:
```
feat(section): add <section-name> section

- Components: <list of components created>
- Data: <data file created/modified>
- Spec: docs/sections/<section>.md
```

---

## Agent Roles

### Orchestrator (Primary Claude Code session)
- Reads CLAUDE.md and section specs
- Decides which section to build next
- Manages the build order
- Coordinates across sections

### Builder (Same session, focused mode)
- Receives: section spec + relevant type definitions + existing patterns
- Produces: component code, data file, type definitions
- Constraint: only touch files listed in the section spec
- Exit condition: tsc + lint pass, component renders

### Reviewer (Fresh context after build)
- Receives: diff of changes + section spec
- Reports: issues only, no compliments
- Checks: spec compliance, code style, accessibility, responsiveness

---

## Build Order

Sections should be built in this order (dependencies flow downward):

```
1. Project Foundation (types, utils, constants, layout, globals.css)
2. UI Primitives (Button, Card, Badge, SectionHeading, Timeline)
3. Data Files (all src/data/*.ts files)
4. Hero Section
5. About Section
6. Experience Section (uses Timeline)
7. Projects Section (uses Card)
8. Skills Section
9. Education Section (uses Timeline)
10. Platforms Section (uses Card)
11. Achievements Section
12. Courses Section
13. Hobbies Section
14. Contact / Footer
15. Navigation (Header with section links)
16. Final Assembly (page.tsx imports all sections)
17. GitHub Actions workflow
18. Final QA + Deploy
```

---

## Friction Signals

Stop and ask for human input if:
- Same file read 3+ times without progress → confused, need clearer brief
- TypeScript error persists after 3 fix attempts → design issue, not implementation issue
- Component grows beyond 200 lines → needs decomposition
- Modifying files outside the current section's scope → scope creep
- Animation causing layout shift or jank → simplify

---

## Slash Commands

Use these custom commands during the build:

- `/project:build-section <name>` — Build a specific section following the protocol
- `/project:eval-section <name>` — Run eval checks on a completed section
- `/project:review-section <name>` — Review a section's diff against its spec
- `/project:status` — Show which sections are complete, in-progress, or pending
