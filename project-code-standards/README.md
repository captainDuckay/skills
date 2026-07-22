# project-code-standards

Stack-aware project conventions for implementation and refactoring. The skill maps affected work areas before selecting standards, preventing conventions from one language or framework from leaking into another.

## Branches

- `GENERAL.md` — conventions shared across languages
- `TYPESCRIPT.md` — TypeScript-specific conventions
- `ANGULAR.md` — Angular structure, naming, Signal Forms, reactive resources, and icons

`SKILL.md` is the authoritative selection process. Each branch file is the authoritative source for its own conventions.

## Install

```bash
npx skills@latest add https://codeberg.org/captainDuckay/skills.git \
  --skill project-code-standards -y
```

## Extending the skill

Add a technology branch only when the project has deliberate conventions for that technology. Give it a precise applicability condition in `SKILL.md`; do not use a technology's presence elsewhere in a repository as sufficient activation.
