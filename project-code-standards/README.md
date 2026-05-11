# project-code-standards

This skill enforces project conventions for:

- Approved icon usage
- Functional-first code organization

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
- Keep side effects (API calls, I/O, framework wiring) at boundaries.

## Files

- `SKILL.md` — primary skill instructions
- `README.md` — quick reference and install snippet
