Design loop · MD
Copy

Run the complete Design & UX quality loop. Follow this exact cycle until the portfolio reaches 100% quality.
 
## GOAL
The portfolio should have: refined typography, polished hover effects, smooth transitions, scroll-triggered animations, timeline effects, logo/name microinteractions, sliding/scrolling effects, and a distinctive aesthetic that doesn't feel like a template.
 
## CYCLE PROTOCOL
 
Create `docs/reports/` directory if it doesn't exist.
 
### ROUND N — Run all agents in sequence:
 
**Step 1: Product Manager Review**
Call @pm to evaluate from a business/user perspective.
Save full report to: `docs/reports/pm-round-N.md`
Focus: Does this site convert visitors into interviews? Is the value proposition clear?
 
**Step 2: Product Designer Review**
Call @designer to evaluate visual design and UX details.
Save full report to: `docs/reports/designer-round-N.md`
Focus: Typography, color, spacing, motion, microinteractions, distinctiveness.
 
**Step 3: Consolidate Findings**
Merge both reports into a single priority-ordered list:
- 🔴 Critical (must fix)
- 🟡 Major (should fix)
- 🟠 Minor (nice to fix)
- 🔵 Polish (time permitting)
Save to: `docs/reports/findings-round-N.md`
**Step 4: Fix Everything**
Call @fixer with the consolidated findings.
The fixer resolves every issue by severity.
Specifically address:
- Hover effects on buttons, cards, links, icons
- Transition timing and easing on all state changes
- Scroll-triggered animations (fade-in, slide-up, stagger)
- Timeline effects with drawing line animation and pulsing dots
- Logo/name animations (letter reveal, gradient shift, hover effect)
- Page load orchestration
- Typography refinements (weights, scale, letter-spacing)
- Color system usage (accent restraint, hierarchy)
- Spacing consistency
- Theme toggle (if PM/Designer recommend it)
- Custom cursor, scrollbar, focus states, selection color
- Reduced motion preference support
Save fix report to: `docs/reports/fix-round-N.md`
**Step 5: Verify Build**
Run:
```bash
npx tsc --noEmit
npm run lint  
npm run build
```
ALL must pass. If any fail, fix and retry.
 
**Step 6: QA Verification**
Call @qa for functional regression testing.
Save to: `docs/reports/qa-round-N.md`
 
**Step 7: Code Review**
Call @reviewer to check the fix quality.
Save to: `docs/reports/review-round-N.md`
 
### DECISION GATE
 
After each round, check:
- PM report: No 🔴 Critical issues remaining?
- Designer report: No 🔴 Critical issues remaining?
- QA report: 0 Critical + 0 Major bugs?
- Reviewer: 0 Critical findings?
- Build: All green?
If ALL YES → ✅ **SHIPPED. Design loop complete.**
If ANY NO → Increment N, go back to Step 1 of next round.
 
**Maximum 5 rounds.** After 5 rounds, report remaining issues for human decision.
 
## OUTPUT
 
After the full loop completes, produce:
 
```
╔══════════════════════════════════════════╗
║    DESIGN LOOP — FINAL REPORT            ║
╠══════════════════════════════════════════╣
║ Rounds completed:        N               ║
║ PM Issues fixed:         XX              ║
║ Designer Issues fixed:   XX              ║
║ QA Bugs fixed:           XX              ║
║ Reviewer findings fixed: XX              ║
╠══════════════════════════════════════════╣
║ PM Final Verdict:        [verdict]       ║
║ Designer Final Verdict:  [verdict]       ║
║ QA Final Verdict:        [verdict]       ║
║ Reviewer Final Verdict:  [verdict]       ║
╠══════════════════════════════════════════╣
║ Build Status:            ✅/❌           ║
║ Overall: READY TO DEPLOY / NEEDS WORK    ║
╚══════════════════════════════════════════╝
```
 
## IMPORTANT RULES
 
1. DO NOT skip agents. Every round runs PM → Designer → Fix → QA → Review.
2. DO NOT proceed with new fixes if the build is broken.
3. DO NOT change content/data — only design, UX, motion, and presentation.
4. DO NOT break existing functionality while improving UX.
5. Preserve all 11 sections — improvements only.
6. The dev server must be running (localhost:3000) for QA to work.
## PREREQUISITES
 
Before starting, verify:
```bash
# Dev server is running
curl -s http://localhost:3000 > /dev/null && echo "dev server OK" || echo "START npm run dev FIRST"
 
# Agents exist
ls .claude/agents/pm.md .claude/agents/designer.md .claude/agents/qa.md .claude/agents/reviewer.md .claude/agents/fixer.md
 
# Reports directory
mkdir -p docs/reports
```
 
GO.