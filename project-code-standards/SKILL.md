---
name: project-code-standards
description: Enforces project coding conventions for icon usage, functional-first code organization, and class member style. Use when users mention standards, conventions, refactoring, icons, class property visibility, readonly enforcement, functional programming, pure functions, or ask for implementation in a codebase.
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

### 3) Class member visibility and immutability

- Use `#` private fields/methods for all private class members.
- Do not use TypeScript `private` keyword when `#` can be used.
- Prefix protected class members with `_`.
- Mark class properties as `readonly` whenever they are not reassigned after initialization.
- Prefer `readonly` constructor-initialized fields by default; make fields mutable only when mutation is required by behavior.

### 4) Exceptions (strict but practical)

Use exceptions only when `#` private members are not viable due to framework/tooling constraints. Common allowed cases:

- Reflection/decorator-based libraries that require string-addressable properties (e.g., serialization/ORM metadata).
- Test or instrumentation tooling that must spy on/patch internals and cannot operate on `#` members.
- Interop boundaries where property names must be externally accessible at runtime.

When using an exception:

- Prefer the narrowest alternative (`private` over wider visibility).
- Keep `readonly` wherever possible.
- Add a short inline comment explaining why `#` was not used.

## Workflow checklist

For each coding task:

1. Check whether icons are being added or modified.
2. Ensure only approved icon packages are used.
3. Detect logic that can be pure.
4. Extract/refactor pure logic into nearest appropriate `functions.ts`.
5. Keep impure operations at boundaries.
6. Enforce `#` private members and `_` protected member naming in classes.
7. Add `readonly` to class properties unless mutation is required.
8. If `#` cannot be used, apply a documented exception with minimal visibility.
9. If custom icons seem needed, ask for explicit approval first.

## Output expectations

When relevant, briefly note in the response:

- Which approved icon package was used (if any)
- Which logic was extracted to `functions.ts`
- Which class members were enforced as `#private`, `_protected`, and `readonly`
- Any class member exceptions used, and why
- Why any remaining side effects could not be made pure

## Advanced features

- See [EXAMPLES.md](EXAMPLES.md) for good/bad patterns and file placement guidance.
- See [README.md](README.md) for install commands and quick reference.
