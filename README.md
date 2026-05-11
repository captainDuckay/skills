# Captain Duckay Skills

Distributes Pi skill bundles from **Codeberg**.

## Quick use

Install all bundled skills into `~/.pi/agent/skills`:

```bash
npx git+https://codeberg.org/captainDuckay/skills.git install
```

List bundled skills:

```bash
npx git+https://codeberg.org/captainDuckay/skills.git list
```

Install to a custom folder:

```bash
npx git+https://codeberg.org/captainDuckay/skills.git install ./skills
```

## NPM publish option

This repo is set up as the package `@captain-duckay/skills`.

If you publish it to npm, usage becomes:

```bash
npx @captain-duckay/skills@latest install
```

## Why not `npx skills@latest`?

The unscoped `skills` package name is already owned on npm by another project, so that exact command cannot point to this repo unless you control that package.
