# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root (does not exist yet — create lazily via `/domain-modeling` when terms actually need pinning).
- **`docs/adr/`** (does not exist yet — create lazily when architectural decisions are made).

If these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

Single-context repo (this repo):

```
/
├── AGENTS.md
├── CONTEXT.md                  ← to be created lazily
├── docs/
│   ├── adr/                    ← to be created lazily
│   └── agents/                 ← created by this setup
│       ├── issue-tracker.md
│       ├── triage-labels.md
│       └── domain.md (this file)
├── references/                 ← Style A/B/C design docs (existing)
│   ├── hongqiao-checklist.md
│   ├── layouts-hongqiao.md
│   ├── themes-hongqiao.md
│   ├── layouts.md
│   ├── layouts-swiss.md
│   ├── themes.md
│   ├── themes-swiss.md
│   ├── checklist.md
│   ├── components.md
│   └── ... (image-prompts, swiss-*, etc.)
├── assets/                     ← templates + screenshot backgrounds + brand source (gitignored)
│   ├── template.html           (Style A)
│   ├── template-swiss.html     (Style B)
│   ├── template-hongqiao.html  (Style C)
│   └── source/                 (gitignored: brand assets)
├── scripts/                    ← validators
│   ├── validate-swiss-deck.mjs
│   └── validate-hongqiao-deck.mjs
└── examples/                   ← working decks per style
```

## Project domain vocabulary (curated from `references/`)

These are the in-use terms. Engineering skills must use them as-is in issues / proposals / tests:

### Style system
- **Style A** — 电子杂志 / 电子墨水 (editorial magazine, Monocle-style)
- **Style B** — 瑞士国际主义 (Swiss international, single-accent, hairline grid)
- **Style C** — 虹桥公司风 (Hongqiao Company Style, fork of B with deep-blue ink + 500-weight Chinese typography)
- **HQ-01..06** — the 6 core layouts in Style C (Cover / TOC / Section / Content / Data / Thanks)
- **S01..S22** — the 22 core layouts in Style B (deprecated aliases may exist; check before use)

### Theme tokens (Style C `themes-hongqiao.md`)
- `--ink: #001A70` — 虹桥深蓝 (primary ink; ABSOLUTELY DO NOT replace with #0a0a0a)
- `--paper: #fafaf8` — warm-white background
- `--accent: #003DA5` — standard blue
- `--alert-amber: #FFB81C` — 警示黄 (key data / TODO highlight)
- `--alert-red: #DA291C` — 警示红 (error / risk; do not co-occur with amber on a single page)

### Layout class names (Style C `layouts-hongqiao.md`)
- `canvas-card` / `chrome-min` / `chrome-foot` — frame
- `h-cover` / `h-xl` / `h-md` / `h-thanks` — title scale
- `t-cat` / `t-meta` / `lead` — text roles
- `kpi-num` / `kpi-unit` — KPI
- `card-ink` / `card-accent` / `card-fill` / `card-outlined` — card variants (mutually exclusive)
- `grid-12` / `grid-16` / `grid-2-9` / `grid-2-9-5` — grid systems
- `dot-mat` / `ring-mat` / `cross-mat` / `hr-hairline` / `alert-bar` / `section-num` — decoration

### Slide theme classes
- `slide.light` / `slide.dark` — base tone
- `slide.hero.light` / `slide.hero.dark` — hero tone (used by cover, section break, manifesto thanks)
- Rule: dark pages ≤ 50% of deck (Style C, updated 2026-07)
- Rule: every 3-4 slides insert one hero page
- Rule: 8+ pages must have ≥1 hero light + ≥1 hero dark

### Animation recipes
- `hero` / `manifesto` / `grid-reveal` / `progression` / `measure-up` / `bar-grow` / `field-notes` — animation recipes referenced by `data-animate="..."`
- Same recipe may not repeat ≥3 consecutive times

### Validator terms
- **P0 / P1 / P2** — priority levels in `references/hongqiao-checklist.md` and `references/checklist.md`
- **validator** — `scripts/validate-hongqiao-deck.mjs` and `scripts/validate-swiss-deck.mjs`
- Run before any PR: `node scripts/validate-<style>-deck.mjs path/to/index.html` must exit 0

### Fork vs upstream terms
- **fork** = `raawaa/guizang-ppt-skill` (working copy; issues + PRs land here)
- **upstream** = `op7418/guizang-ppt-skill` (original repo, read-only)
- `git remote -v` confirms: `origin` = fork, `upstream` = upstream

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined above. Don't drift to synonyms. For example, write "Style C HQ-01" not "虹桥 cover slide"; write "hero dark" not "深色底" (Chinese is fine in conversational summaries, but the canonical class name in code/issue is `hero dark`).

## Flag ADR conflicts

If your output contradicts an existing ADR in `docs/adr/`, surface it explicitly:

> _Contradicts ADR-NNNN (<title>) — but worth reopening because…_

This repo has no ADRs yet; the first one will be written when an actual architectural decision is made.
