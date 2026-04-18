Evaluate the completed section: $ARGUMENTS

Run this checklist:

1. **Type Safety**: Run `npx tsc --noEmit` — report pass/fail
2. **Lint**: Run `npm run lint` — report pass/fail  
3. **Spec Compliance**: Read `docs/sections/<section>.md` and verify every content item is rendered
4. **Data Separation**: Verify all text content comes from `src/data/` — no hardcoded strings in components
5. **Responsiveness**: Check component uses responsive Tailwind classes (sm:, md:, lg:)
6. **Accessibility**: Check for semantic HTML, alt attributes, ARIA labels where needed
7. **Animation**: Verify Framer Motion animations are present and use scroll triggers
8. **Self-Contained**: Verify the section can be commented out from page.tsx without breaking the build

Report a score out of 8 and list any issues found.
