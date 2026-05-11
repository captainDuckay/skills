# Captain Duckay Skills (Codeberg)

This repository is a **skills source** for the `skills@latest` manager.

## Use with skills manager

List available skills from this repo:

```bash
npx skills@latest add https://codeberg.org/captainDuckay/skills.git -l
```

Install all skills from this repo:

```bash
npx skills@latest add https://codeberg.org/captainDuckay/skills.git --all -y
```

Install a specific skill:

```bash
npx skills@latest add https://codeberg.org/captainDuckay/skills.git \
  --skill project-code-standards -y
```

## Important

- `npx skills@latest` is the package/skill manager (kept as-is).
- Shorthand source format like `owner/repo` currently resolves to GitHub.
- For Codeberg, use the full `.git` URL as shown above.
