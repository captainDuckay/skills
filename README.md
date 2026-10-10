# Captain Duckay Skills

This repository is a **skills source** for the `skills@latest` manager.

## Use with skills manager

List available skills from this repo:

```bash
npx skills@latest add captains-chest/skills -l
```

Install all skills from this repo:

```bash
npx skills@latest add captains-chest/skills --all -y
```

Install a specific skill:

```bash
npx skills@latest add captains-chest/skills \
  --skill project-code-standards -y
```

## Important

- `npx skills@latest` is the package/skill manager (kept as-is).
- Shorthand source format `owner/repo` resolves to GitHub (this repo).
- Full clone URL also works: `https://github.com/captains-chest/skills.git`.

## Website

The skills are published as the School of the Captain's Chest at https://school.captains-chest.com. The site lives in
[`site/`](site/README.md); any new skill folder with a `SKILL.md` shows up there automatically.
