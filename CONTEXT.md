# Domain Glossary · guizang-ppt-skill

> Active discipline: terms get pinned here as the conversation resolves them.
> Implementation details, scripts, and CSS live elsewhere — this file is *only*
> a glossary. See `docs/adr/` for resolved architectural decisions.

## Render modes (the two visual / interaction states)

| 用户面术语 | 代码标识 | CSS 钩子 | 触发键 | localStorage key |
| --- | --- | --- | --- | --- |
| 静态模式 / 静态 / 低功耗 | `window.__lowPowerMode = true` | `body.low-power` | `B` | `guizang-ppt-low-power` |
| 动效模式 / 动效 (默认) | `window.__lowPowerMode = false` | (无 body 类) | `B` | `guizang-ppt-low-power` |

约定:
- 提示文案 `B 静态` / `B 动态` 表示 "按 B 会切到哪一边",不是"当前在哪边"。
- 初始值:localStorage 里有 `1` → 静态;localStorage 为空 + `prefers-reduced-motion: reduce` → 静态;否则 → 动效。
- "静态" 在 deck 层面指 `#deck { transition: none !important }` 且所有 `[data-anim]` 强制 `opacity: 1`。

## Deck navigation

| 概念 | 定义 |
| --- | --- |
| `go(n)` | 翻页主函数。clamp `idx` 到 `[0, total-1]`,应用 `transform: translateX(-idx*100vw)`,调度当前页的 recipe 动画。 |
| `lock` 锁 | `go()` 顶部的 `if(lock) return;` 防抖。在 700ms 内连按会被吞。 |
| recipe | 每个 `<section class="slide">` 通过 `data-animate` 指定的一组入场动画(rHero / rProgression / rStatement / rGridReveal / rManifesto / rThreeForces / rLoopForm / ...)。 |

## Key / mouse surface

| 输入 | 处理位置 |
| --- | --- |
| ← → / PageUp PageDown / Space / ↑ ↓ | 全局 `keydown` 监听 → go(idx±1)(管线图先走 __pipeAdvance()) |
| Home / End | go(0) / go(total-1) |
| B | 切换 __lowPowerMode(无修饰键) |
| Esc | 切换 ESC 索引视图(overview grid) |
| wheel | 累加 wheelAcc 超过 50 触发翻页,150ms 后重置 |
| 触屏 swipe | touchend 计算 dx/dy,|dx| > 50 且 |dx| > |dy| 触发翻页 |
| 底部 dot 点击 | go(i) |
| ESC 索引卡点击 | 关闭 overview + go(i) |

## Style systems (single deck, pick one)

- Style A — 电子杂志 / 电子墨水 (Monocle-style)
- Style B — 瑞士国际主义 (Swiss international)
- Style C — 虹桥公司风 (Hongqiao company, fork of B)

## 关键 bug 沉淀

- 静态模式下 → 要按两次: 根因是 go() 的 700ms lock 跟 #deck 的 CSS 过渡时长没有联动。详见 docs/adr/0001-deck-lock-follows-transition.md(草稿中)。
