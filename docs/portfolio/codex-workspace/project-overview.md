# Project Overview

## The problem

Agent instructions tend to accumulate in one large prompt or in unrelated local files. As the number of workflows grows, that makes it harder to find the right guidance, keep ownership clear, and distinguish a proposed behavior from a working one. This repository addresses that maintenance problem for a personal Codex setup by keeping reusable instructions, automation, and drafts in one source workspace.

## What the project delivers

The current source tree contains 11 user-authored Skills in [`skills/`](https://github.com/jo4086/codex-workspace/tree/main/skills/), a Git commit Hook integration in [`hooks/`](https://github.com/jo4086/codex-workspace/tree/main/hooks/), and planned components and change requests in [`TBD/`](https://github.com/jo4086/codex-workspace/tree/main/TBD/). The root [README](https://github.com/jo4086/codex-workspace/blob/main/README.md) also names agents, configuration, templates, and scripts as possible future component types; their inclusion in the project scope does not mean each has a standalone implementation here.

The repository separates three states:

1. **Implemented source:** Skill entrypoints, references, Hook scripts, registry, and tests in `skills/` and `hooks/`.
2. **Proposed or historical design:** specifications and numbered requests in `TBD/`; some link to implemented Skills, while others remain open.
3. **Active environment:** the user's `~/.codex` and shared `~/.agents` locations. Deployment is a separate, explicit step described in the [Hook README](https://github.com/jo4086/codex-workspace/blob/main/hooks/README.md) and constrained by [project instructions](https://github.com/jo4086/codex-workspace/blob/main/AGENTS.md).

## Design goals visible in the repository

| Goal | Concrete mechanism | Evidence |
| --- | --- | --- |
| Select only relevant guidance | `skill-router` maps task responsibilities to specialized Skills | [Router](https://github.com/jo4086/codex-workspace/blob/main/skills/skill-router/SKILL.md), [Skill map](https://github.com/jo4086/codex-workspace/blob/main/skills/skill-router/skill-map.md) |
| Keep instructions maintainable | Short `SKILL.md` entrypoints route to focused references and indexes | [Authoring rules](https://github.com/jo4086/codex-workspace/blob/main/skills/AGENTS.md), [documentation Skill](https://github.com/jo4086/codex-workspace/blob/main/skills/agent-doc-writer/SKILL.md) |
| Keep plans distinct from implementation | `TBD/` holds specifications and requests, with links to implemented components where applicable | [TBD index](https://github.com/jo4086/codex-workspace/blob/main/TBD/README.md) |
| Add deterministic checks where text guidance is insufficient | A native Git `commit-msg` Hook validates subject syntax, connected by a tool-use adapter | [Hook source](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/commit-msg), [adapter](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/codex-pre-tool-use.mjs) |
| Avoid changing the user's live setup as a side effect | Repository sources and active `~/.codex` / `~/.agents` files are treated separately | [Project instructions](https://github.com/jo4086/codex-workspace/blob/main/AGENTS.md), [Hook deployment guide](https://github.com/jo4086/codex-workspace/blob/main/hooks/README.md) |

## Portfolio interpretation

This is an example of **developer workflow infrastructure**: the main artifact is a set of versioned rules and small automation units that guide later work. Its strongest demonstration is the connection between responsibility-based instruction selection, reference-driven documentation, and an executable validation boundary for commits. The project does not provide a user-facing application or measured productivity gains, so its value should be discussed through design decisions, maintainability, and observable checks rather than usage metrics.

For the internal structure behind these claims, continue with [System architecture](./system-architecture.md). For specific implementation decisions, see [Engineering case studies](./engineering-case-studies.md).
