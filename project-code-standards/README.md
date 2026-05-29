# project-code-standards

This skill enforces project conventions for:

- Approved icon usage
- Functional-first and declarative code organization
- Strict readable constants (no magic numbers)
- Boy Scout cleanup discipline with separate commits

## Approved icon packages

Install:

```bash
npm i @captains-chest/material-symbols-rounded-icons
npm i @captains-chest/material-symbols-rounded-icons-filled
```

## Usage notes

- Use only the approved icon packages above.
- Do not add custom icon artwork unless the user explicitly asks for it.
- Prefer extracting pure logic into the nearest domain `functions.ts` (or shared domain `functions.ts` when local is not appropriate).
- Prefer declarative patterns over imperative control flow.
- Avoid magic numbers: only inline `0`, `1`, `-1` when obvious; extract other numbers to named constants (including in tests).
- Keep side effects (API calls, I/O, framework wiring) at boundaries.

## Boy Scout commit template

When opportunistic cleanup is made while doing a task, keep it in a separate explicit commit.

Example commit pair:

```text
feat(<scope>): <primary change>
refactor(<scope>): boy scout cleanup to align with project-code-standards
```

Suggested body for the cleanup commit:

```text
- extracted pure helpers to nearest functions.ts
- replaced magic numbers with named constants
- applied declarative transformations where appropriate
- enforced class member standards (#private/_protected/readonly)
```

PR/summary callout format:

```text
Primary change:
- <feature/fix summary>

Boy Scout cleanup (separate commit):
- <cleanup summary>
```

Copy/paste git command flow:

```bash
# 1) Commit primary feature/fix work
git add <feature-files>
git commit -m "feat(<scope>): <primary change>"

# 2) Commit Boy Scout cleanup separately
git add <cleanup-files>
git commit -m "refactor(<scope>): boy scout cleanup to align with project-code-standards"
```

## Files

- `SKILL.md` — primary skill instructions
- `README.md` — quick reference and install snippet
