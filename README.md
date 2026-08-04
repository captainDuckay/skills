# Captain Duckay Skills

This repository is a **skills source** for the `skills@latest` manager.

## Use with skills manager

List available skills from this repo:

```bash
npx skills@latest add captainDuckay/skills -l
```

Install all skills from this repo:

```bash
npx skills@latest add captainDuckay/skills --all -y
```

Install a specific skill:

```bash
npx skills@latest add captainDuckay/skills \
  --skill project-code-standards -y
```

## Important

- `npx skills@latest` is the package/skill manager (kept as-is).
- Shorthand source format `owner/repo` resolves to GitHub (this repo).
- Full clone URL also works: `https://github.com/captainDuckay/skills.git`.
