# School of the Captain's Chest (site)

The website at https://school.captains-chest.com, built from the skills in this repository. Angular (standalone,
zoneless, strict TypeScript), prerendered to static files, built with pnpm.

## Adding a skill

1. Add a folder at the repo root named after the skill, with a `SKILL.md` whose front matter has `name` (the same
   as the folder name) and `description`. Put supporting `.md` files next to it.
2. That's it: the next build picks it up and generates `/skills/<name>`. The description's first sentence becomes
   the purpose and its "Use when…" part becomes "When to use it"; every `.md` file is shown in full.
3. Optional: write curated principles in `src/content/skill-notes.json`, and cite the skill from a tenet in
   `src/content/tenets.json`. Without curated principles the page lists the documents' section headings.

The build fails if a tenet or a note cites a skill folder that doesn't exist, or if a `SKILL.md` lacks front matter.

## Build and deploy

    cd site
    pnpm install --frozen-lockfile
    pnpm build                     # reads ../*/SKILL.md, writes src/content/generated, output: dist/site/browser
    CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… pnpm dlx wrangler@4 pages deploy dist/site/browser --project-name school --branch main

Requires Node 22+.
