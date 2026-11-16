# Engineering Case Studies

## Case 1: Routing a growing Skill collection

**Context.** The repository has 11 user-authored Skills covering documentation, code style, React, Electron, commit messages, Skill development, and requirement documents. A single all-purpose instruction file would make the reader scan unrelated rules for each task.

**Approach.** [`skill-router/SKILL.md`](https://github.com/jo4086/codex-workspace/blob/main/skills/skill-router/SKILL.md) defines a selection workflow. Its [map](https://github.com/jo4086/codex-workspace/blob/main/skills/skill-router/skill-map.md) states when each Skill applies and which responsibility it owns. A selected Skill then points to a reference index or focused reference files. For example, [`agent-doc-writer`](https://github.com/jo4086/codex-workspace/blob/main/skills/agent-doc-writer/SKILL.md) routes Markdown work to writing, README, and navigation guidance instead of embedding all details in one entrypoint.

**Decision worth discussing.** The router explicitly allows multiple Skills when a task crosses boundaries, while preserving one owner for each technical concern. This avoids duplicating React routing rules inside the UI styling Skill or Skill lifecycle rules inside the general documentation Skill. It also makes a routing mistake inspectable: the map and the selected entrypoints provide a reviewable trail.

**Practical limit.** Selection is instruction-driven, so a missed or ignored Skill remains possible. The repository defines the procedure and structure; it does not contain an automated test that measures routing decisions across representative user prompts.

## Case 2: Validating a Git commit subject across tool boundaries

**Context.** The [`git-commit` Skill](https://github.com/jo4086/codex-workspace/blob/main/skills/git-commit/SKILL.md) explains the desired message convention. Written guidance alone cannot reject a malformed commit message at Git's execution boundary.

**Approach.** The [Hook registry](https://github.com/jo4086/codex-workspace/blob/main/hooks/hooks.json) calls the [adapter](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/codex-pre-tool-use.mjs) before a Bash tool use. For a direct command beginning with `git commit`, the adapter inserts `git -c core.hooksPath="$HOME/.agents/hooks/git" commit` and preserves the remaining tool input. Git then invokes the [native `commit-msg` Hook](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/commit-msg), which reads the message file path provided by Git and checks the first line.

The validator accepts the defined lowercase types, an optional lowercase alphanumeric or hyphenated scope, optional `!`, the exact `: ` separator, and a nonempty description. It rejects a final period and warns when the subject exceeds 72 Unicode characters. The Hook leaves the message body untouched. The source implementation does **not** enforce the Skill's preference for a Korean description; the Skill [states that boundary](https://github.com/jo4086/codex-workspace/blob/main/skills/git-commit/SKILL.md).

**Decision worth discussing.** The adapter handles tool-specific event shapes, while the native Hook handles Git's message-file protocol. This keeps syntax validation close to the commit and gives the integration a small, testable seam. The [adapter tests](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/codex-pre-tool-use.test.mjs) cover Codex and Distill field shapes and ignored commands; the [Hook tests](https://github.com/jo4086/codex-workspace/blob/main/hooks/git/commit-msg.test.mjs) cover accepted, rejected, warning, and file-input cases. A [registry test](https://github.com/jo4086/codex-workspace/blob/main/hooks/hooks.json.test.mjs) checks that every `codex-*.mjs` handler is registered.

**Practical limit.** The adapter's pattern covers direct `git commit` commands at the beginning of supported tool input. It does not cover indirect commits, and the command-level `core.hooksPath` setting supersedes another Git Hook directory for that invocation. The [Hook README](https://github.com/jo4086/codex-workspace/blob/main/hooks/README.md) documents both limitations. Repository tests do not prove that a particular user's active Codex or Distill installation has discovered and trusted the Hook.

## What these examples demonstrate

Together, the cases show two different control mechanisms: declarative instruction routing for context-sensitive work, and executable validation for a narrow, objective rule. Their boundaries are intentional and observable in the sources. The [quality assessment](./quality-and-limitations.md) separates those design claims from what the existing tests actually establish.
