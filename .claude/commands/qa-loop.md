Run the complete Quality Assurance loop until all bugs are fixed. Follow this exact cycle:
 
## CYCLE PROTOCOL
 
### ROUND 1: Review
Call @reviewer to review the entire codebase. Capture the full review report. Save it to docs/reports/review-round-1.md
 
### ROUND 2: QA  
Call @qa to test the live site (must be running at localhost:3000). Capture the full QA report. Save it to docs/reports/qa-round-1.md
 
### ROUND 3: Fix
Call @fixer with BOTH reports (review findings + QA bugs). The fixer resolves every issue by severity. Capture the fix report. Save it to docs/reports/fix-round-1.md
 
### ROUND 4: Verify
After fixes are applied:
1. Run npx tsc --noEmit — must PASS
2. Run npm run lint — must PASS  
3. Run npm run build — must PASS
4. Call @qa again for regression testing — save to docs/reports/qa-round-2.md
5. Call @reviewer again on the changed files only — save to docs/reports/review-round-2.md
### ROUND 5: Decision
If QA report shows 0 Critical + 0 Major bugs AND Reviewer shows 0 Critical findings:
  → SHIP IT. Report "✅ All clear — ready to deploy"
  
If new bugs found:
  → Increment round number, go back to ROUND 3 (Fix) with new findings
  → Maximum 3 rounds. After 3 rounds, report remaining issues for human decision.
 
## Output
 
After the loop completes, produce a final summary:
 
```
QUALITY GATE SUMMARY
━━━━━━━━━━━━━━━━━━━
Rounds completed: X
Total bugs found: X
Total bugs fixed: X
Remaining issues: X
 
Review Verdict: [from reviewer]
QA Verdict: [SHIP / FIX FIRST / BLOCK]
 
Final: ✅ READY TO DEPLOY / ⚠️ NEEDS HUMAN DECISION / 🚫 BLOCKED
```
 
Create docs/reports/ directory if it doesn't exist.