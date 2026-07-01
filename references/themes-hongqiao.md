# 虹桥公司主题色预设(Hongqiao Themes · Style C)

3 套基于虹桥公司 PPT 模板(16:9 蓝色版)提炼的主题色。**保留原模板的多功能色策略**(蓝主 + 橙黄警示),同时在每页内强制单 accent 互斥——这是对 Style B「瑞士单 accent」硬规则的中式商务补丁。

> 模板:`assets/template-hongqiao.html` · 版式:`references/layouts-hongqiao.md` · 自检:`references/hongqiao-checklist.md` · 校验器:`scripts/validate-hongqiao-deck.mjs`
> 与 Style A/B 的关系:本风格 fork 自 Style B 的工程骨架(IBM Carbon 2x Grid + Motion tokens + 16 列 grid),但保留原虹桥 PPT 的视觉语言(深蓝主色 + 多功能警示色 + 中式五段结构 + 温和字号对比)。

---

## 使用方法

1. 问用户选哪套主题(或基于内容推荐一套;不知道就选「🔵 虹桥蓝(主)」)
2. 打开 `assets/template-hongqiao.html` 的 `<style>` 块
3. 找到开头的 `:root{` 块,整体替换标有「主题色」注释的所有变量
4. 其他 CSS 都走 `var(--...)`,无需任何其他改动
5. **不要在单页内混用多个 `--alert-*` 警示色**——见下文「多 accent 互斥规则」

---

## 🔵 虹桥蓝(默认 · Hongqiao Blue)

**适合**:任何场景都安全的默认;汇报、年度总结、项目立项、客户提案、内部 OKR review。
**调性**:虹桥深蓝主色 + 暖白底 + 橙黄警示,典型中式正装汇报风。**像中国国企/事业单位的标准 PPT 外壳**——稳重、克制、信息密度中等。

```css
--paper:#fafaf8;
--paper-rgb:250,250,248;
--ink:#001A70;
--ink-rgb:0,26,112;
--ink-2:#141B4D;
--ink-3:#0a0a0a;

--grey-1:#f0f0ee;
--grey-2:#d4d4d2;
--grey-3:#838495;
--grey-4:#525252;
--grey-5:#a3a3a3;

--accent:#003DA5;
--accent-rgb:0,61,165;
--accent-bright:#2D68C4;
--accent-pale:#489FDF;
--accent-on:#ffffff;

--alert-red:#DA291C;
--alert-red-rgb:218,41,28;
--alert-amber:#FFB81C;
--alert-amber-rgb:255,184,28;
--alert-on:#ffffff;
--link:#FA4616;
--link-visited:#FFCD00;
```

**使用要点**:
- `--ink` 用作主标题、强调色块、深底背景
- `--accent` 用作次级高亮、KPI 数字、链接色块
- 警示色 **必须** 单页单用——一页里只能出现 `--alert-red` 或 `--alert-amber` 其中一个,**不能同时出现两个警示色**;`--alert-on` 是警示色上的反白文字
- 警示色不能用作页面底色或大面积色块,**只能作为点状高亮**(数字、icon、标签、卡片左侧 4px 边条)

---

## 🔷 虹桥浅蓝(浅色场景 · Hongqiao Light)

**适合**:需要更柔和观感的场景——客户提案、品牌叙事、合作介绍、培训课件。
**调性**:浅蓝调(几乎接近 Swiss 默认) + 虹桥深蓝点缀。比默认更轻盈,适合长时间观看。

```css
--paper:#f4f6fa;
--paper-rgb:244,246,250;
--ink:#001A70;
--ink-rgb:0,26,112;
--ink-2:#141B4D;
--ink-3:#0a0a0a;

--grey-1:#eef1f6;
--grey-2:#c8d2e0;
--grey-3:#6b7891;
--grey-4:#3e4a63;
--grey-5:#9aa5bc;

--accent:#003DA5;
--accent-rgb:0,61,165;
--accent-bright:#2D68C4;
--accent-pale:#489FDF;
--accent-on:#ffffff;

--alert-red:#DA291C;
--alert-red-rgb:218,41,28;
--alert-amber:#FFB81C;
--alert-amber-rgb:255,184,28;
--alert-on:#ffffff;
--link:#FA4616;
--link-visited:#FFCD00;
```

**使用要点**:浅蓝底 + 深蓝文字 → 阅读疲劳低;但**对比度比默认主题低**,正文字号必须 ≥ 18px,小字 ≥ 16px(同 Swiss 演示字号规则)。

---

## 🌃 虹桥深蓝(暗色场景 · Hongqiao Dark)

**适合**:发布演讲、年度大屏演示、夜场活动;**作为 hero 页或章节过渡页使用,不要全程用**。
**调性**:虹桥深蓝反转为底 + 暖白文字 + 警示色高亮。**像发布会 keynote 的暗场章节**——视觉冲击强,信息量低,适合 1-2 页大图或大引用。

```css
--paper:#001A70;
--paper-rgb:0,26,112;
--ink:#fafaf8;
--ink-rgb:250,250,248;
--ink-2:#e4e8f0;
--ink-3:#ffffff;

--grey-1:#0a2470;
--grey-2:#1a3a8c;
--grey-3:#7a8ab0;
--grey-4:#a0aec8;
--grey-5:#5a6783;

--accent:#FFB81C;
--accent-rgb:255,184,28;
--accent-bright:#FFD45A;
--accent-pale:#FFE9A8;
--accent-on:#001A70;

--alert-red:#FF6B5A;
--alert-red-rgb:255,107,90;
--alert-amber:#FFB81C;
--alert-amber-rgb:255,184,28;
--alert-on:#001A70;
--link:#FFB81C;
--link-visited:#FFD45A;
```

**使用要点**:暗底用警示黄作主 accent(蓝压蓝看不见),所有强调色都要走 `var(--accent)` / `var(--alert-*)`,**不要**用 `--ink` 做高亮(底色和文字都是蓝系,会糊)。**整份 deck 的暗页比例 ≤ 50%**(封面/封底/章节过渡可大胆用,中式正装允许大节奏),眼睛不累。

---

## 多 accent 互斥规则(中式补丁 · 最重要)

**Style B 硬规则**:一份 deck 只能有 1 个 accent。
**虹桥中式补丁**:允许 1 个主 accent(`--accent`)+ 1 个警示色(`--alert-red` 或 `--alert-amber`,**不能同时两个**),合计 2 个功能色。

### 强制规则(违反 = validator P0 错误)

| # | 规则 | 说明 |
|---|---|---|
| 1 | **一页一警示** | 单页内 `--alert-red` 和 `--alert-amber` **不能同时出现**;默认只用 `--alert-amber`(更温和),仅在「错误/风险/红色 KPI」场景切到 `--alert-red` |
| 2 | **警示色不混搭正文** | 警示色不能用于普通正文/标题,**只允许**用于:数字、icon、4-8px 边条、tag 标签、状态徽章 |
| 3 | **警示色不作大色块** | 警示色不能作 `card-fill` / `accent-block` 大色块,只作点状高亮;**唯一例外**:作 hero 页的极小装饰元素(≤ 80×80px) |
| 4 | **链接色单用** | `--link` / `--link-visited` 仅在需要 URL 跳转时使用(单文件 HTML 几乎用不到) |
| 5 | **整 deck 警示色比例 ≤ 15%** | 警示色总像素占比 ≤ 15%(由 validator 粗略估算——统计 `srgb(218,41,28)` 和 `srgb(255,184,28)` 的出现次数,vs. 全部色块面积) |

### 警示色用法速查

| 场景 | 推荐 token | 备注 |
|---|---|---|
| 重点数据/关键指标 | `--alert-amber` | 数字 + `font-weight:500`,背景留 paper |
| 风险/错误/问题 | `--alert-red` | 红色 KPI、风险等级标签 |
| 待办/进行中 | `--alert-amber` | 状态徽章、icon |
| 成功/达成 | `--accent` | 不用警示色,蓝色表示 |
| 链接 | `--link` | 仅在有 URL 时使用 |

---

## 字号与字重阶梯(中式温和 · 区别于 Swiss 极细)

> **Style B 灵魂**:主标题 8vw、字重 200、正文 18px、字号对比 ≥ 8:1。
> **虹桥中式灵魂**:主标题 4-5vw(对应原 PPT 36-54pt)、字重 500、正文 16-18px、字号对比约 3:1。
> **理由**:Swiss 的 8vw / 200 字重在中文投屏场景容易看不清(中文方块字视觉面积大,200 字重在低分辨率屏上会糊);虹桥模板的字号比例是「中式正装」经过多年试错的最优解。

### 主标题字号分档(中文)

| 标题形态 | 推荐字号 | 字重 |
|---|---|---|
| 1 行,≤ 6 个中文字符(封面大标题) | `min(5.2vw,9.2vh)` | **500** |
| 2 行,每行 ≤ 6 个字符 | `min(4.6vw,8.2vh)` | 500 |
| 1-2 行,7-10 个中文字符(章节过渡) | `min(4.2vw,7.6vh)` | 500 |
| 3 行或更长 | 改写标题;不得已 `min(3.6vw,6.4vh)` | 500 |
| 致谢页(80pt 大字) | `min(8vw,12vh)` | 500(单字/双字) |

### 演示最小字号与字重

| 文本类型 | 最小字号 | 字重 |
|---|---|---|
| 封面/章节大标题 | 36pt(≈ 4vw) | 500 |
| 副标题 | 24pt(≈ 2.6vw) | 500 |
| 正文段落 | **18px** | 400 |
| 卡片描述/列表/caption | **16px** | 400 |
| meta / kicker / mono label | **14px** | 500 |
| 致谢大字(单字/双字) | 80pt(≈ 8vw) | 500 |

**硬规则**:
- 同一页内,字号越小的元素字重必须 ≥ 字号越大的元素(同 Swiss)
- 16px 正文字重 ≥ 400,推荐 400(瑞士是 500;中文 16px 用 500 偏粗,我们降到 400)
- 大标题字重 **500**(Swiss 是 200;中文 500 比 200 在 4-5vw 字号下更清晰)
- 致谢大字字重 500(同主标题)

---

## 字体(中文商务标准)

```css
--sans:"Arial","Inter","Helvetica Neue","Helvetica","Segoe UI",system-ui,-apple-system,sans-serif;
--sans-zh:"微软雅黑","Microsoft YaHei","PingFang SC","Hiragino Sans GB","Source Han Sans SC","Noto Sans SC","Microsoft YaHei UI",sans-serif;
--mono:"JetBrains Mono","IBM Plex Mono","SF Mono","Cascadia Code","Consolas","Courier New",ui-monospace,monospace;
```

**字体策略**:
- 英文优先 `Arial`(系统字体,零延迟、零 CDN 依赖,跟原 PPTX 一致)
- 中文优先 `微软雅黑`(Windows 自带;macOS 通过 `Microsoft YaHei` alias 或回退到 `PingFang SC`)
- `Inter` / `Noto Sans SC` 是 web 降级——Arial 在 Linux 上不存在,自动切到 Inter;`Noto Sans SC` 是中文兜底
- **不要**用衬线字体(Playfair / Noto Serif SC),跟 Style A 区别开

---

## 切换原则(同 Style B)

- 一份 deck 只用一套主题,**不要中途换色**;如果想用暗色页面,整份 deck 选「深蓝」主题,正文用 `light` 类页,hero/章节用 `dark` 类页
- 不要混搭(例如 ink 取虹桥蓝,paper 取虹桥浅蓝)——会违和
- 不要接受用户给的任意 hex 值——委婉拒绝并展示 3 套让选
- 不要直接修改 `template-hongqiao.html` 其他地方的颜色——所有散落 `rgba()` 都走 `var(--*-rgb)`,改 `:root` 一处即可

---

## ❌ 不要做的事

- ❌ 不要在同一页同时使用 `--alert-red` 和 `--alert-amber`(validator P0 错误)
- ❌ 不要用警示色做大面积色块(只能点状高亮)
- ❌ 不要把主标题字重降到 200-300(Swiss 极细哲学不适合中文商务)
- ❌ 不要把主标题放大到 8vw(原 PPT 是 4-5vw;8vw 中文会糊)
- ❌ 不要用衬线字体
- ❌ 不要用圆角 `border-radius > 0`(保留 Swiss 直角美学)
- ❌ 不要用 `box-shadow`(保留 Swiss 平面美学)
- ❌ 不要在整份 deck 全程用「深蓝」暗主题(眼睛累,限制 ≤ 50% 页)
