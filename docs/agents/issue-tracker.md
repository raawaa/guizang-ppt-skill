# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues in the **user fork** `raawaa/guizang-ppt-skill`.
The upstream `op7418/guizang-ppt-skill` is read-only reference — do not post issues or PRs there
unless the user explicitly asks to engage the upstream maintainer.

## Conventions

- **Default repo**: `raawaa/guizang-ppt-skill` is set via `gh repo set-default`. Inside this clone, plain `gh issue create` goes to the fork.
- **Create an issue**: `gh issue create --title "..." --body "..."` (or `--body-file` for multi-line).
- **Read an issue**: `gh issue view <number> --comments`, filter by label with `--json labels`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments`.
- **Comment / label / close**: `gh issue comment` / `gh issue edit --add-label` / `gh issue close --comment "..."`.
- **Cross-check fork ↔ upstream**: `gh repo set-default --view` should print `raawaa/guizang-ppt-skill`. If it prints upstream or is empty, run `gh repo set-default raawaa/guizang-ppt-skill` before any `gh` call.

## Pull requests as a triage surface

**PRs as a request surface: no.** This repo accepts PRs from the fork back to upstream as part of the contribution flow, but external PRs from strangers are not a triage surface. The user controls the fork; triage stays in-house.

## When a skill says "publish to the issue tracker"

Create a GitHub issue in the **fork** (`raawaa/guizang-ppt-skill`). Do not default to upstream.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments` against the fork.

## Why this is explicit

This skill was previously confused by a hardcoded `--repo op7418/...` flag. The rule
fork-first / upstream-only-on-explicit-request is now codified in this file.
