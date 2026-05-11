---
name: project-code-standards
description: Enforces project coding conventions for icon usage and functional-first code organization. Use when users mention standards, conventions, refactoring, icons, functional programming, pure functions, or ask for implementation in a codebase.
---

# Project Code Standards

## Quick start

Apply these standards to all implementation and refactor tasks unless the user explicitly overrides them.

## Standards

### 1) Icons

- Use only these icon packages:
  - `@captains-chest/material-symbols-rounded-icons`
  - `@captains-chest/material-symbols-rounded-icons-filled`
- Do not introduce custom icon artwork or custom icon sets.
- If a task appears to require custom icons, pause and ask for explicit user confirmation before proceeding.

### 2) Functional-first code

- Prefer pure functions whenever possible.
- Move logic that can be pure into the nearest domain `functions.ts` file.
- If no local `functions.ts` exists, use or create the most appropriate shared `functions.ts` in that domain.
- Keep side effects at boundaries (framework hooks, API calls, I/O, UI wiring).
- Avoid embedding business logic in components/classes when it can be extracted to pure functions.

## Workflow checklist

For each coding task:

1. Check whether icons are being added or modified.
2. Ensure only approved icon packages are used.
3. Detect logic that can be pure.
4. Extract/refactor pure logic into nearest appropriate `functions.ts`.
5. Keep impure operations at boundaries.
6. If custom icons seem needed, ask for explicit approval first.

## Output expectations

When relevant, briefly note in the response:

- Which approved icon package was used (if any)
- Which logic was extracted to `functions.ts`
- Why any remaining side effects could not be made pure

## Advanced features

- See [EXAMPLES.md](EXAMPLES.md) for good/bad patterns and file placement guidance.
- See [README.md](README.md) for install commands and quick reference.
