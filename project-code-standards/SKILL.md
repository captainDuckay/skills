---
name: project-code-standards
description: Enforces project coding conventions for icon usage, functional-first and declarative code organization, class member style, readable constants, and opportunistic cleanup discipline. Use when users mention standards, conventions, refactoring, declarative vs imperative patterns, magic numbers, readability, boy scout rule, cleanup commits, icons, class property visibility, readonly enforcement, functional programming, pure functions, or ask for implementation in a codebase.
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

### 4) Declarative-over-imperative style

- Prefer declarative constructs over imperative control flow.
- Express intent with transformations/composition (`map`, `filter`, `reduce`, `some`, `every`, derived state, config objects) before reaching for manual loops and mutation.
- Prefer data-driven mappings/tables over long conditional chains when behavior is selectable.
- Use imperative flow only at boundaries or where required for clarity/performance.
- If imperative code is kept, add a short comment explaining why a declarative form was not appropriate.
- See [EXAMPLES.md](EXAMPLES.md) §6 for declarative vs imperative patterns and allowed exceptions.

### 5) No magic numbers (favor readability)

- Do not leave unexplained numeric literals in business logic.
- Extract numbers into well-named constants that explain intent and units.
- Prefer domain-local constants near usage; promote to shared constants only when truly reused.
- Include units in names when relevant (`SESSION_TIMEOUT_MS`, `MAX_RETRY_COUNT`, `TAX_RATE_PERCENT`).
- Allowed inline literals without extraction: only `0`, `1`, and `-1` when intent is obvious.
- Apply this rule in production code and tests.
- For any other inline numeric literal, extract to a named constant; if extraction is impossible (e.g., generated code or external API contract), add a short inline comment with rationale.
- See [EXAMPLES.md](EXAMPLES.md) §7 for magic-number replacements and allowed exceptions.

### 6) Boy Scout Rule (leave the area cleaner)

- If you touch a file and notice nearby code that violates this skill's standards, you may fix it opportunistically.
- Keep Boy Scout cleanup scoped to the same domain/area you are already modifying; avoid broad drive-by refactors.
- Do not mix Boy Scout cleanup into the feature/fix commit.
- Put cleanup changes in a separate explicit commit with a clear message indicating standards cleanup.
- In PR/summary output, list Boy Scout changes separately from the primary task changes.
- See [EXAMPLES.md](EXAMPLES.md) §8 for commit-separation examples.

### 7) Exceptions (strict but practical)

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
8. Prefer declarative expressions over imperative loops/branching for business logic.
9. If imperative code remains, ensure it is boundary-focused or justified inline.
10. Replace inline numeric literals (except obvious `0`/`1`/`-1`) with named constants and unit-aware names.
11. Apply the magic-number rule to tests as strictly as production code.
12. If any other inline number remains, justify it with a short comment.
13. While editing, scan nearby touched code for standards violations and apply scoped Boy Scout cleanup when safe.
14. Keep Boy Scout cleanup in a separate explicit commit from the main feature/fix commit.
15. If `#` cannot be used, apply a documented exception with minimal visibility.
16. If custom icons seem needed, ask for explicit approval first.

## Output expectations

When relevant, briefly note in the response:

- Which approved icon package was used (if any)
- Which logic was extracted to `functions.ts`
- Which class members were enforced as `#private`, `_protected`, and `readonly`
- Where declarative patterns were chosen over imperative flow
- Which magic numbers were replaced with named constants
- Any Boy Scout cleanups made outside the primary task scope
- Confirmation that Boy Scout cleanups were isolated in their own commit
- Any class member exceptions used, and why
- Why any remaining side effects, imperative sections, or inline numeric literals could not be made declarative/readable

## Advanced features

- See [EXAMPLES.md](EXAMPLES.md) for good/bad patterns and file placement guidance.
- See [README.md](README.md) for install commands and quick reference.
