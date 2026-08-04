# project-kickoff-grill

Direct, challenging project-start alignment skill.

## What it does

Runs a structured grilling session to force shared understanding, then produces a decision-ready `PROJECT_BRIEF.md` with a helicopter perspective for future scope and implementation decisions.

## When to use

- Starting a new project
- Starting a major initiative/feature with unclear direction
- You want ambiguity challenged early
- You want explicit in/out scope and milestone alignment before implementation

## Core alignment areas

1. Problem Statement
2. Goals / Success Metrics
3. Stakeholders
4. Scope (In / Out)
5. Requirements
6. Constraints
7. Risks & Assumptions
8. User Workflow
9. MVP Definition
10. Solution Options
11. Architecture Decision
12. Milestones

## Example prompts

- "Use `project-kickoff-grill` for this new idea. Be direct and challenge vagueness."
- "Run kickoff grill mode and don’t move on until all 12 areas are aligned."
- "Create/update `PROJECT_BRIEF.md` from this conversation using the kickoff grill workflow."

## Install (from this repo)

```bash
npx skills@latest add captainDuckay/skills \
  --skill project-kickoff-grill -y
```

## Notes

- This skill is intentionally high-pressure on clarity.
- It should call out contradictions and untestable goals directly.
- It should not finish until all 12 areas meet the quality bar in `SKILL.md`.
