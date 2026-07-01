# 0001 · deck 翻页锁时长跟 CSS 过渡时长联动 (60ms 下限)

- 状态: 已采纳
- 日期: 2026-07-01
- 影响文件:
  - `assets/template.html`
  - `assets/template-swiss.html`
  - `assets/template-hongqiao.html`
  - `examples/虹桥-2026-Q1汇报/index.html`
  - `references/checklist.md`
  - `references/hongqiao-checklist.md`

## 背景

`go(n)` 顶部有一个 `if(lock) return;` 防抖,锁时长硬编码为 700ms。

但 `#deck` 的 CSS 过渡时长是模式相关的:
- 动效模式 (默认): `transition: transform .9s cubic-bezier(.77,0,.175,1);` — 900ms
- 静态模式 (`body.low-power`): `transition: none !important;` — 0ms

JS 锁 (固定 700ms) 跟 CSS 过渡时长 (0 / 900ms) 没有联动,出现两类后果:

1. **静态模式被吞键**: 页面瞬切,用户接着按 →,所有 700ms 内的按键被锁挡掉。用户感觉 "要按两下才能翻页"。
2. **动效模式锁比动画短**: 动画 900ms,锁 700ms。用户可以按 → 在 700-900ms 之间打断当前动画(但既然已经修了,这层在意;主要问题是 (1))。

## 决策

引入一个 `deckLockMs()` 工具函数,读 `#deck` 的 `transitionDuration`(`getComputedStyle`),取所有 transition 分量中的最大值,然后跟 60ms 取大:

```js
function deckLockMs() {
  const deckEl = document.getElementById('deck');
  if (!deckEl) return 60;
  const cs = getComputedStyle(deckEl);
  const d = cs.transitionDuration || '0s';
  let max = 0;
  for (const p of d.split(',')) {
    const t = p.trim();
    if (!t) continue;
    if (t.endsWith('ms')) max = Math.max(max, parseFloat(t));
    else if (t.endsWith('s')) max = Math.max(max, parseFloat(t) * 1000);
  }
  return Math.max(60, max);
}
```

`go()` 把 `setTimeout(()=>lock=false, 700)` 改为 `setTimeout(()=>lock=false, deckLockMs())`。

## 取舍

- **为什么跟 CSS 而不是跟 mode 标志读 `__lowPowerMode`**: CSS 是过渡时长的单一真实源。未来如果有人把过渡改成 600ms 或加一个 will-change,锁会自动跟上;读 JS 标志得手动同步两份配置。
- **为什么 60ms 下限**: 防止静态模式下按住 → 不放,键盘 auto-repeat (~30ms 一次) 暴翻 N 页。60ms ≈ double-tap 下限,既挡 auto-repeat,又不影响正常手动连按 (>120ms 没事)。
- **为什么 60ms 而不是 120ms**: 120ms 开始影响正常快速连按 (150-250ms 一发的键盘党)。60ms 之后还可以做 `prefers-reduced-motion` 的可访问性兜底 (锁自然为 60ms)。
- **为什么不动 `setTimeout(__playSlide, 450)` 这个 recipe 触发**: 这是 recipe 动画的 "在 deck 过渡中段触发" 启发式,跟 lock 是两个独立的时间常数。当前 900ms 过渡下 450ms 正好是中段;如果以后过渡时长变了,recipe 触发也应该改成 `transitionMs / 2`,但那是另一个 ADR 的事 — 不在本次 bug 修复范围。

## 不变量

- `go()` 行为对外不变 (clamp idx、设 transform、调度 recipe);只改锁时长。
- ESC / B / Home / End / 滚轮 / 触屏 / dot 点击 行为不变。
- `__lowPowerMode` / `body.low-power` 仍然只控制视觉/动画,不参与锁时长决策。

## 验证

- `references/hongqiao-checklist.md` 加 P1 自检: "静态模式下连按 → 不应被吞,锁时长 ≤ 100ms"
- `references/checklist.md` 加 P0 自检: "go() 的 lock 时长来自 deckLockMs(),不出现 700 字面量"
- 手动用 agent-browser 在 `examples/虹桥-2026-Q1汇报/index.html` 上回归: 静态模式连按 4 次 → 4 次,无被吞。

## 拒绝的反方案

- **C: 取消锁,改用 isPlaying 标志**: 实现复杂,且与 motion recipe 生命周期耦合。
- **D: 保留 700ms + 加 80ms 抖动**: 没修根因,动效加速时还会爆。
- **A2 之外的 60ms**: 0 锁会触发 auto-repeat 暴翻;120ms 起开始影响手动连按手感。
