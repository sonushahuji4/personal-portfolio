Build the portfolio section specified by: $ARGUMENTS

Follow this protocol strictly:

1. FIRST read the section spec file at `docs/sections/<section-number>-<section-name>.md`
2. Read `src/types/index.ts` to understand existing types
3. Check what data files already exist in `src/data/`
4. Check what UI components exist in `src/components/ui/` and `src/components/common/`

Then execute in order:
a) Add/update types in `src/types/index.ts`
b) Create/update the data file in `src/data/`
c) Create the section component in `src/components/sections/`
d) Import and add the section to `src/app/page.tsx`

After building:
- Run `npx tsc --noEmit` to type check
- Run `npm run lint` to lint
- Report any issues

Do NOT proceed without reading the spec file first. If the spec file is missing, stop and report.
