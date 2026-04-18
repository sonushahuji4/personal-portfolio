Review the section: $ARGUMENTS

You are a fresh reviewer with no knowledge of the implementation reasoning. You only see the diff and the spec.

1. Read the section spec at `docs/sections/<section>.md`
2. Read the actual component code in `src/components/sections/`
3. Read the data file in `src/data/`

Report ONLY concerns (no compliments):
- Does the code match the spec?
- Is there any hardcoded text that should be in data files?
- Is there decorative error handling (catch-log-rethrow)?
- Are there unused imports or dead code?
- Is the component over 200 lines? If yes, suggest decomposition.
- Are animations meaningful or gratuitous?
- Does the responsive layout work at all breakpoints?
- Is the code consistent with the style guide in CLAUDE.md?

List issues as actionable items. If no issues found, say "Clean — ready for commit."
