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

The skills are published as the School of the Captain's Chest at https://captains-chest.com/school. The site itself
lives in [captains-chest/site](https://github.com/captains-chest/site), which pulls this repo's `main` at build time.

### Adding a skill

1. Create a root folder named after the skill (kebab-case) with a `SKILL.md` whose front matter `name` matches the
   folder name and whose `description` says what it does and when to use it.
2. Add any supporting `.md` files next to it; they're shown on the skill's page.
3. Merge to `main`. The skill appears at `captains-chest.com/school/skills/<name>` after the next site build.
   Tenets and curated principles are editorial content in the site repo (`src/content/tenets.json` and
   `skill-notes.json`).
