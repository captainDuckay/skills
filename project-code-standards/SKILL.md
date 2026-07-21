---
name: project-code-standards
description: Applies stack-aware project coding conventions. Use for implementation and refactoring in any codebase; map affected work areas, apply general standards everywhere, load TypeScript conventions only for TypeScript work, and load Angular conventions only for Angular component structure, artifact naming, or icon changes.
---

# Project Code Standards

Apply standards through an **applicability map** so conventions stay within their matching work areas.

## 1. Map affected work areas

Before implementation, identify every project or work area the task will affect. Determine each area's language and framework from this evidence, in order:

1. The files being changed or created.
2. The nearest project manifests and configuration.
3. Conventions in neighboring code.
4. Repository-wide configuration as a fallback.

Treat mixed repositories as multiple work areas. Update the map if implementation expands into additional files or projects.

This step is complete when every anticipated file belongs to a work area with an identified language and, when relevant, framework.

## 2. Load matching standards

- Always read [GENERAL.md](GENERAL.md) and apply it to every work area.
- For TypeScript work areas, read [TYPESCRIPT.md](TYPESCRIPT.md). Apply it only to those work areas.
- For Angular work that creates components, names framework artifacts, or modifies icons, read [ANGULAR.md](ANGULAR.md). Apply it only to that Angular work area.

A branch applies only when the affected work area matches its condition. The presence of a technology elsewhere in the repository does not activate that branch.

This step is complete when every work area has the general branch and all matching technology branches, with no unmatched branch selected.

## 3. Implement and verify

Implement using the selected standards. Keep each branch scoped to its matching files, including during nearby cleanup.

Before finishing, account for every modified file in the applicability map and verify that all standards selected for its work area were applied. Resolve any file that does not fit the map before completion.
