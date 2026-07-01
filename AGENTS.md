# AGENTS.md

工程 skill 配置 · Codex / Cursor / Aider 等通用入口。
本文档告诉所有 agent 在这个仓库里如何处理 issue / triage / 领域文档。

## Agent skills

### Issue tracker

GitHub Issues in the user fork `raawaa/guizang-ppt-skill` (default target for `gh`).
Upstream `op7418/guizang-ppt-skill` is read-only context. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles mapped 1:1 to default label names (`needs-triage` / `needs-info` / `ready-for-agent` / `ready-for-human` / `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` at the repo root + `docs/adr/`. See `docs/agents/domain.md`.

## Branch strategy

| 分支 | 角色 |
| --- | --- |
| `main` | 永远 = `upstream/main`,逐字节一致。不 commit fork-only 内容到这里。 |
| `codex/hongqiao-style` | fork 累积分支,所有自定义工作(Hongqiao style / ADR / CONTEXT / fork checklist / example)。 |
| `fix/...`(临时) | 上游 PR 分支,从 `main` 开,只装 upstream-safe 改动,用完即弃。 |

**给 agent 的硬规则:**
- 上游 PR 从 `main` 开,**绝不**从 `codex/hongqiao-style` 开。
- 以下路径是 fork-only,**绝不**进上游 PR:
  `docs/adr/`、`CONTEXT.md`、`assets/template-hongqiao.html`、
  `references/hongqiao-*.md`、`examples/虹桥*/`、
  `scripts/validate-hongqiao-deck.mjs`、`assets/source/<style>/`。
- 上游 PR 可改的文件(白名单):
  `assets/template.html` / `template-swiss.html`、
  `references/checklist.md` / `components.md` / `layouts*.md` / `themes*.md`、
  `SKILL.md`、`README*.md`、`scripts/validate-swiss-deck.mjs`。
