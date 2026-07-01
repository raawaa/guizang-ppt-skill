# Layouts · 虹桥公司风(Style C)

6 个核心版式 · 严格对应虹桥公司 PPT 原模板的「五段式」结构(封面 / 目录 / 章节 / 内容 / 致谢)+ 1 个数据专用版式。继承 Style B 的工程骨架(16 列 Carbon 2x Grid + Motion tokens),保留虹桥 PPT 的中式商务审美(深蓝主 + 温和字号 + 直角无阴影)。

> ⚠️ 本套版式与 Style A(电子杂志/电子墨水)、Style B(瑞士国际主义)**不通用**。同名的 class(如 `canvas-card` / `card-fill` / `grid-12`)**从 Style B 继承**,但视觉权重、字号字重、accent 用法全部按虹桥中式补丁重定义(见 `themes-hongqiao.md`)。
> 一份 deck 只能选一套风格。

---

## Pre-flight 类名清单(**动手前必读**)

下列 class 全部在 `assets/template-hongqiao.html` 的 `<style>` 块里有定义。**写 slide 之前先打开模板**确认。

### 画布与容器
- `canvas-card` — 100vw × 100vh,直角无圆角,padding `5.6vh 5vw 4.4vh`(从 Style B 继承,二次叠加 padding 是 P0 错误)
- `chrome-min` — 页眉(顶部 meta 行)
- `chrome-foot` — 页脚(页码 / 章节)
- `slide.light` / `slide.dark` / `slide.hero.light` / `slide.hero.dark` — 主题节奏类

### 排版(从 Style B 继承,**字重已重定义**)
- `h-cover` — 封面大标题(原 S03 `h-hero` 的虹桥变体,4-5vw / 500)
- `h-xl` — 章节大标题(3.6-4.6vw / 500)
- `h-md` — 中型标题(1.8-2.6vw / 500)
- `h-thanks` — 致谢大字(8vw / 500,单字/双字)
- `lead` — 副标题/lead(1.4-1.8vw / 400)
- `t-cat` — SemiBold 600 小标(同 Style B)
- `t-meta` — mono uppercase label(同 Style B)
- `kpi-num` — 巨号 KPI 数字(8-12vw / 500,带 `--accent` 或 `--alert-amber` 颜色)
- `kpi-unit` — KPI 单位(2vw / 500)

### 卡片(四类互斥,继承自 Style B)
- `card-ink` — 虹桥深蓝填充 + 暖白文字(强主色块)
- `card-accent` — 标准蓝填充 + 白字(主 accent 色块)
- `card-fill` — 灰底 + 深蓝文字(默认中性卡)
- `card-outlined` — 白底 + 1px 描边 + 深蓝文字(轻量卡)

### 网格(继承自 Style B)
- `grid-12` — 12 等分列
- `grid-16` — 16 等分列(更细)
- `grid-2-9` / `grid-2-9-5` — 不对称网格

### 装饰
- `dot-mat` / `ring-mat` / `cross-mat` — 点阵 / 描边圆 / 网格装饰(从 Style B 继承)
- `hr-hairline` — 1px 发丝线
- `alert-bar` — 4-8px 警示色边条(虹桥新增,用在卡片左侧)
- `section-num` — 章节编号(0X / 01 / 第一部分)

### 主题节奏(强制规则)

- 每页 `<section>` 必须带 `light` / `dark` / `hero light` / `hero dark` 之一,**不要只写 `hero`**
- 连续 3 页以上同主题 = 视觉疲劳,不允许
- 8 页以上必须有 ≥1 个 `hero dark` + ≥1 个 `hero light`
- 每 3-4 页插入 1 个 hero 页(封面/章节/致谢)
- 暗页(`dark` / `hero dark`)比例 ≤ 25%
- **生成后自检**:`grep 'class="slide' index.html` 列出所有主题,人工确认节奏合理再交付

---

## 版式清单(6 个)

| # | ID | 名称 | 用途 | 比例(页) |
|---|---|---|---|---|
| 1 | `HQ-01` | 封面 Cover | 第 1 页 | 1 张 |
| 2 | `HQ-02` | 目录 TOC | 第 2 页(可选) | 0-1 张 |
| 3 | `HQ-03` | 章节过渡 Section Break | 每幕开场 | 1-3 张 |
| 4 | `HQ-04` | 内容/图文 Content | 主要承载页 | 大部分 |
| 5 | `HQ-05` | 数据展示 Data / KPI | 抛硬数据 | 1-3 张 |
| 6 | `HQ-06` | 致谢 Thanks | 最后 1 页 | 1 张 |

---

## HQ-01 封面(Cover)

**用途**:第 1 页,公司名 + 报告标题 + 副标题 + 日期;深蓝暗底,视觉冲击强,定调全场。
**对应原 PPTX**:`slideLayout1.xml`(封面)+ `slide1.xml` 实例(虹桥公司PPT模板16比9-蓝色版.pptx)。

**PPTX 几何参考**(16:9 投影比例换算):
- LOGO 位置:`x=0.66in / y=0.50in / w=3.28in / h=0.60in`(左上,白底反白)
- 标题:水平居中(`text-align:center`),字重 700
- 副标:水平居中,色值 `var(--alert-amber)`(警示黄,定调)
- 日期:独立居中底部(`bottom:5vh;text-align:center`),与正文/作者解耦
- 弧形:底部横跨整宽(`width:100vw;left:0;bottom:0`),由 `cover-arc.png` 承载
- 装饰小方块(`deco-dot`)**在暗底上不可见**,由 arc 弧形代替;**不要**再放 3 个 deco-dot

**骨架**(完整可粘贴):

```html
<section class="slide hero dark" data-layout="HQ-01" data-animate="hero">
  <!-- 左上 LOGO(PPTX 0.66in/0.50in/3.28in/0.60in) -->
  <img class="logo-hq" src="../assets/source/hongqiao/logo-white.png" alt="上海机场 · 虹桥机场">
  <header class="chrome-min">
    <span class="t-meta">HONGQIAO</span>
    <span class="t-meta">2026 · Q1</span>
  </header>

  <div class="canvas-card" style="text-align:center;align-items:center">
    <div class="t-cat" style="color:var(--accent)">[必填] · 部门 / 副标</div>
    <h1 class="h-cover" style="margin-top:1.2vh;font-weight:700">[必填] 主标题</h1>
    <p class="lead" style="margin-top:3.2vh;max-width:60%;color:var(--alert-amber)">[必填] 副标 / 引子,定调全场.</p>
  </div>

  <!-- 居中日期(独立于正文,放在底部) -->
  <div class="t-meta" style="position:absolute;left:0;right:0;bottom:5vh;text-align:center">[必填] 日期 · 部门</div>

  <!-- 底部弧形(横跨整宽) -->
  <img class="cover-arc" src="../assets/source/hongqiao/cover-arc.png" alt="">
</section>
```

**关键 class**:`h-cover` / `t-cat` / `lead` / `t-meta` / `chrome-min` / `canvas-card` / `logo-hq` / `cover-arc`
**动效 recipe**:`hero` — LOGO 淡入 0.6s,标题从下淡入 0.8s,lead 延迟 0.2s,arc 从下滑入 1.0s。
**主题类**:`hero dark`(深蓝暗底,跟原 PPTX slide 1 一致;`hero light` 已废弃)。
**注意**:
- `h-cover` 字重 **700**(PPTX 大字视觉,中式稳重;非 Swiss 200,非 Style C 默认 500)
- 标题/副标在 `canvas-card` 内水平+垂直居中(`text-align:center; align-items:center`)
- 副标强制 `color:var(--alert-amber)` ——这是「中式正装」封面的核心暖色锚点
- 日期从原 meta 行抽出,独立居中放在底部 5vh,**不要**和正文混排
- **不要**再用 `deco-dot`(暗底上不可见);`border-radius > 0` / `box-shadow` 仍 P0 禁用
- 5 条 validator P0 自动检查(对应 `scripts/validate-hongqiao-deck.mjs`):logo img / arc img / `hero dark` / `text-align:center` + `font-weight:700` / 副标 `color:var(--alert-amber)`

---

## HQ-02 目录(TOC)

**用途**:第 2 页(可选),列出一份 4-7 个章节的目录。
**对应原 PPTX**:`slideLayout2.xml`(目录样式一)— 取 4 种目录变体中最简洁的一种。

**骨架**:

```html
<section class="slide light" data-layout="HQ-02" data-animate="grid-reveal">
  <header class="chrome-min">
    <span class="t-meta">CONTENTS</span>
    <span class="t-meta">目录</span>
  </header>

  <div class="canvas-card">
    <div style="display:grid;grid-template-columns:30% 1fr;gap:5vw;align-items:start">
      <!-- 左:大章节标题 -->
      <div>
        <div class="t-cat" style="color:var(--accent)">CONTENTS</div>
        <h2 class="h-xl" style="margin-top:1.2vh">目 录</h2>
        <hr class="hr-hairline" style="margin-top:2vh;width:60%">
      </div>
      <!-- 右:章节列表(4-7 项) -->
      <ol style="list-style:none;padding:0;display:flex;flex-direction:column;gap:2.4vh">
        <li style="display:grid;grid-template-columns:48px 1fr 60px;align-items:baseline;gap:2vw;padding-bottom:1.6vh;border-bottom:1px solid var(--border-subtle)">
          <span class="t-meta" style="color:var(--accent)">01</span>
          <span style="font-size:1.8vw;font-weight:500">第一章 章节标题</span>
          <span class="t-meta" style="text-align:right">P.03</span>
        </li>
        <li style="display:grid;grid-template-columns:48px 1fr 60px;align-items:baseline;gap:2vw;padding-bottom:1.6vh;border-bottom:1px solid var(--border-subtle)">
          <span class="t-meta" style="color:var(--accent)">02</span>
          <span style="font-size:1.8vw;font-weight:500">第二章 章节标题</span>
          <span class="t-meta" style="text-align:right">P.08</span>
        </li>
        <li style="display:grid;grid-template-columns:48px 1fr 60px;align-items:baseline;gap:2vw;padding-bottom:1.6vh;border-bottom:1px solid var(--border-subtle)">
          <span class="t-meta" style="color:var(--accent)">03</span>
          <span style="font-size:1.8vw;font-weight:500">第三章 章节标题</span>
          <span class="t-meta" style="text-align:right">P.14</span>
        </li>
        <li style="display:grid;grid-template-columns:48px 1fr 60px;align-items:baseline;gap:2vw;padding-bottom:1.6vh;border-bottom:1px solid var(--border-subtle)">
          <span class="t-meta" style="color:var(--accent)">04</span>
          <span style="font-size:1.8vw;font-weight:500">第四章 章节标题</span>
          <span class="t-meta" style="text-align:right">P.20</span>
        </li>
      </ol>
    </div>
  </div>
</section>
```

**关键 class**:`h-xl` / `t-cat` / `t-meta` / `hr-hairline`
**动效 recipe**:`grid-reveal` — 列表项依次 stagger 淡入(每项延迟 0.1s)。
**主题类**:`light`(亮底正文页)。
**注意**:
- 章节数 4-7,超过 7 必须拆 deck
- 章节标题字号 1.8vw(中等,比主标题小但比正文大)
- 编号 `01 / 02 / 03` 用 `--accent` 颜色(标准蓝)
- 整页色彩以深蓝主 + 标准蓝 accent 为主,**不出现警示色**

---

## HQ-03 章节过渡(Section Break)

**用途**:每幕开场页,1-2 张用于分章。
**对应原 PPTX**:`slideLayout6.xml`(章节页样式一)+ `slide6.xml` 实例——含「01」大编号 + 标题 + 副标。

**骨架**:

```html
<section class="slide hero light" data-layout="HQ-03" data-animate="manifesto">
  <header class="chrome-min">
    <span class="t-meta">PART 01</span>
    <span class="t-meta">第一章</span>
  </header>

  <div class="canvas-card" style="display:flex;flex-direction:column;justify-content:flex-end;padding-bottom:8vh">
    <!-- 大编号 + 标题(原 PPT 的「01 + 标题编辑区域」结构) -->
    <div style="display:grid;grid-template-columns:auto 1fr;gap:3vw;align-items:baseline">
      <span style="font-size:min(7.2vw,12.8vh);font-weight:500;color:var(--accent);line-height:.9;letter-spacing:-.04em">01</span>
      <div>
        <h2 class="h-xl">标题编辑区域位置</h2>
        <p class="lead" style="margin-top:2.4vh">此处为副标题编辑区域</p>
      </div>
    </div>
    <!-- 底部 4px 警示色边条(可选用,只放一种) -->
    <div style="margin-top:6vh;display:flex;align-items:center;gap:1.2vw">
      <span style="width:48px;height:4px;background:var(--alert-amber);display:inline-block"></span>
      <span class="t-meta" style="color:var(--grey-3)">CHAPTER · 01 OF 04</span>
    </div>
  </div>
</section>
```

**关键 class**:`h-xl` / `lead` / `t-meta` / `canvas-card`
**动效 recipe**:`manifesto` — 大编号 scale 弹入,标题从左滑入,边条 scaleX 拉起。
**主题类**:`hero light`(亮底 hero,跟原 PPTX 一致)。
**注意**:
- 大编号 7.2vw,字号比主标题略大(同原 PPTX 的 54pt 章节编号)
- 底部边条是**可选的**——只用一种警示色,默认 `--alert-amber`
- **不要**让 `01` 编号跟主标题垂直居中(原 PPTX 是基线对齐,不是居中对齐)

---

## HQ-04 内容/图文(Content)

**用途**:主要承载页,左文右图 / 上文下图 / 全文 + caption 三种变体。
**对应原 PPTX**:`slideLayout8.xml`(内容页)+ `slide15.xml` / `slide20.xml` 实例。

**骨架(左文右图变体 · 最常用)**:

```html
<section class="slide light" data-layout="HQ-04" data-animate="progression">
  <header class="chrome-min">
    <span class="t-meta">PART 02</span>
    <span class="t-meta">[必填] 章节小标</span>
  </header>

  <div class="canvas-card">
    <h2 class="h-md">大标题编辑区域位置</h2>
    <p class="lead" style="margin-top:1.6vh;color:var(--grey-4)">此处为副标题编辑区域</p>
    <hr class="hr-hairline" style="margin-top:2.4vh;width:40%">

    <div style="display:grid;grid-template-columns:1.1fr 1fr;gap:4vw;margin-top:4vh;align-items:start">
      <!-- 左:正文 -->
      <div style="font-size:18px;line-height:1.7;color:var(--ink);font-weight:400">
        <p>用户可以在投影仪或者计算机上进行演示也可以将演示文稿打印出来制作成胶片以便应用到更广泛的领域中。</p>
        <p style="margin-top:1.6vh">用户可以在投影仪或者计算机上进行演示也可以将演示文稿打印出来制作成胶片以便应用到更广泛的领域中。</p>
        <ul style="margin-top:2vh;padding-left:1.4em;list-style:square;color:var(--accent)">
          <li style="margin-bottom:.6em"><span style="color:var(--ink)">要点一:关键结论或论据</span></li>
          <li style="margin-bottom:.6em"><span style="color:var(--ink)">要点二:关键结论或论据</span></li>
          <li><span style="color:var(--ink)">要点三:关键结论或论据</span></li>
        </ul>
      </div>
      <!-- 右:图片 / 配图 / 示意 -->
      <div class="card-fill" style="aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;color:var(--grey-3);font-size:14px">
        [图片槽位 · 16:10 · max-height:56vh]
      </div>
    </div>
  </div>
</section>
```

**关键 class**:`h-md` / `lead` / `hr-hairline` / `canvas-card` / `card-fill`
**动效 recipe**:`progression` — 标题淡入,正文/图片 stagger 横向滑入。
**主题类**:`light`(亮底正文页)。
**注意**:
- 正文 18px / 400(中式温和,比 Swiss 的 16px 略大)
- 行高 1.7(中文正装标准,不能压到 1.4)
- 图片槽位用 `card-fill` 灰底占位(填充时替换为 `<img class="frame-img r-16x10" src="images/xxx.png">`)
- 列表项 bullet 用 `var(--accent)` 标准蓝,文字用 `var(--ink)` 深蓝
- **不要**用 emoji(中式正装,违和)
- 整页**不出现警示色**(警示色只用在 HQ-05 数据页)

---

## HQ-05 数据展示(Data / KPI)

**用途**:抛硬数据 — KPI 大字、对比表格、进度条、状态徽章。
**对应原 PPTX**:**新增版式**(原 PPTX 没有专门的 KPI 排版,数据是散在内容页里);从 Style B 的 KPI Tower 改造。

**骨架(KPI Tower · 3-4 个并列 KPI)**:

```html
<section class="slide light" data-layout="HQ-05" data-animate="measure-up">
  <header class="chrome-min">
    <span class="t-meta">DATA · 2026 Q1</span>
    <span class="t-meta">[必填] 数据来源</span>
  </header>

  <div class="canvas-card">
    <h2 class="h-md">关键数据指标</h2>
    <p class="lead" style="margin-top:1.2vh;color:var(--grey-4)">本季度核心 KPI 完成情况</p>
    <hr class="hr-hairline" style="margin-top:2vh;width:40%">

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:2.4vw;margin-top:5vh">
      <!-- KPI 1:主色 accent -->
      <div class="card-fill" style="padding:2.4vh 1.6vw;border-left:4px solid var(--accent)">
        <div class="t-meta" style="color:var(--grey-3)">充电桩总数</div>
        <div style="margin-top:1.6vh;display:flex;align-items:baseline;gap:6px">
          <span class="kpi-num" style="color:var(--ink)">2,847</span>
          <span class="kpi-unit" style="color:var(--grey-4)">台</span>
        </div>
        <div class="t-meta" style="margin-top:1.2vh;color:var(--accent)">↑ 18.2%</div>
      </div>
      <!-- KPI 2:警示色 amber(重点数据) -->
      <div class="card-fill" style="padding:2.4vh 1.6vw;border-left:4px solid var(--alert-amber)">
        <div class="t-meta" style="color:var(--grey-3)">日均充电量</div>
        <div style="margin-top:1.6vh;display:flex;align-items:baseline;gap:6px">
          <span class="kpi-num" style="color:var(--ink)">38.6</span>
          <span class="kpi-unit" style="color:var(--grey-4)">万 kWh</span>
        </div>
        <div class="t-meta" style="margin-top:1.2vh;color:var(--alert-amber)">↑ 24.7%</div>
      </div>
      <!-- KPI 3:主色 accent -->
      <div class="card-fill" style="padding:2.4vh 1.6vw;border-left:4px solid var(--accent)">
        <div class="t-meta" style="color:var(--grey-3)">故障率</div>
        <div style="margin-top:1.6vh;display:flex;align-items:baseline;gap:6px">
          <span class="kpi-num" style="color:var(--ink)">1.2</span>
          <span class="kpi-unit" style="color:var(--grey-4)">%</span>
        </div>
        <div class="t-meta" style="margin-top:1.2vh;color:var(--accent)">↓ 0.4 pp</div>
      </div>
      <!-- KPI 4:警示色 red(风险/异常) -->
      <div class="card-fill" style="padding:2.4vh 1.6vw;border-left:4px solid var(--alert-red)">
        <div class="t-meta" style="color:var(--grey-3)">未处理告警</div>
        <div style="margin-top:1.6vh;display:flex;align-items:baseline;gap:6px">
          <span class="kpi-num" style="color:var(--alert-red)">7</span>
          <span class="kpi-unit" style="color:var(--grey-4)">起</span>
        </div>
        <div class="t-meta" style="margin-top:1.2vh;color:var(--alert-red)">需关注</div>
      </div>
    </div>

    <p style="margin-top:5vh;font-size:14px;color:var(--grey-3);font-weight:500;text-transform:uppercase;letter-spacing:.08em">
      数据来源:虹桥公司运营管理平台 · 统计周期 2026-01-01 至 2026-03-31
    </p>
  </div>
</section>
```

**关键 class**:`h-md` / `lead` / `kpi-num` / `kpi-unit` / `card-fill` / `t-meta`
**动效 recipe**:`measure-up` — KPI 数字 scale 弹入(每列延迟 0.15s),边条 scaleY 拉起。
**主题类**:`light`(亮底正文页)。
**注意**:
- KPI 数量 3-4 个,超过 4 必须分两行或拆 deck
- 4px 左侧边条是**必备的语义指示**——主数据用 `--accent`,重点数据用 `--alert-amber`,风险/异常用 `--alert-red`
- **单页内 amber 和 red 可同时出现**(因为这是「数据展示」页,语义就是「区分主次风险」),但**不能超过 2 种警示色混搭**(允许 amber+red 是 P0 例外)
- KPI 数字字重 500,字号统一
- ↑ ↓ 符号用 `↑` / `↓` Unicode 字符,不用 emoji
- 底部数据来源 mono 字体,14px,500 字重,uppercase + letter-spacing(中式正装常见)

---

## HQ-06 致谢(Thanks)

**用途**:最后 1 页,大字"谢谢"或类似闭幕。
**对应原 PPTX**:`slideLayout9.xml`(感谢页)+ `slide31.xml` 实例——80pt 巨号"谢谢!"。

**骨架**:

```html
<section class="slide hero dark" data-layout="HQ-06" data-animate="manifesto">
  <!-- 不需要 chrome-min:hero dark 页让装饰极简 -->
  <div class="canvas-card" style="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;height:100%">
    <span class="t-meta" style="color:var(--grey-3)">END · 2026 Q1</span>
    <h1 class="h-thanks" style="margin-top:2vh">谢 谢</h1>
    <p class="lead" style="margin-top:3vh;color:var(--grey-2)">感谢聆听 · 欢迎提问</p>
    <div style="margin-top:auto;display:flex;gap:3vw;padding-top:8vh">
      <span class="t-meta" style="color:var(--grey-3)">[必填] 报告人</span>
      <span class="t-meta" style="color:var(--grey-3)">[必填] 部门</span>
      <span class="t-meta" style="color:var(--grey-3)">[必填] 日期</span>
    </div>
  </div>
  <!-- 右下 8x8 装饰方块(同 HQ-01 配色) -->
  <div style="position:absolute;right:5vw;bottom:5vh;display:flex;gap:8px">
    <span style="width:8px;height:8px;background:var(--ink-3);display:inline-block"></span>
    <span style="width:8px;height:8px;background:var(--accent-bright);display:inline-block"></span>
    <span style="width:8px;height:8px;background:var(--alert-amber);display:inline-block"></span>
  </div>
</section>
```

**关键 class**:`h-thanks` / `t-meta` / `lead` / `canvas-card`
**动效 recipe**:`manifesto` — 大字 fade 慢入 1.2s,sub 文字延迟 0.4s。
**主题类**:`hero dark`(暗底 hero,跟原 PPTX 一致)。
**注意**:
- 主题类必须是 `hero dark`——`HQ-06` 是全 deck 唯一允许用 `dark` 的页
- 巨号字 8vw,字重 500,**不要**用 Swiss 的 200(中文大字用 200 不可读)
- 装饰方块在右下(跟封面 HQ-01 左下对称)
- 暗底用 `var(--ink-3)` 接近白的方块,亮底用 `var(--ink)` 深蓝方块

---

## 动效 Recipe 速查(template 现有 21 个 recipe,按 HQ-0X 映射)

> **关键修正**:`<section>` 上的 recipe 触发属性是 **`data-animate`**(不是 `data-anim`);`data-anim` 是子元素入场动画的标记(配合 `[data-anim]` 容器)。
> 写法:`<section class="slide ..." data-layout="HQ-0X" data-animate="RECIPE_NAME">`。
> Recipe 是从 `assets/template-hongqiao.html` 里的 `RECIPES` 字典继承的(共 21 个),不要发明新名字。

| HQ 版式 | Recipe 名 | 触发属性 | 效果 |
|---|---|---|---|
| HQ-01 封面 | `hero` | `data-animate="hero"` | 标题从下淡入 0.8s,lead 延迟 0.2s,装饰方块 scaleY 弹起 |
| HQ-02 目录 | `grid-reveal` | `data-animate="grid-reveal"` | 列表项 stagger 淡入(每项 0.1s 延迟) |
| HQ-03 章节 | `manifesto` | `data-animate="manifesto"` | 大编号 scale 弹入,标题左滑入,边条 scaleX 拉起 |
| HQ-04 内容 | `progression` | `data-animate="progression"` | 标题淡入,正文/图片 stagger 横向滑入 |
| HQ-04 内容(变体) | `field-notes` | `data-animate="field-notes"` | 备选:图文页用,左右滑入更明显 |
| HQ-05 数据 | `measure-up` | `data-animate="measure-up"` | KPI 数字 scale 弹入(每列 0.15s 延迟),边条 scaleY |
| HQ-06 致谢 | `manifesto` | `data-animate="manifesto"` | 大字 fade 慢入 1.2s |

**硬规则**:
- 一份 deck 里每页 recipe **应尽量不同**(同 Style B 硬规则);HQ-03 和 HQ-06 复用 `manifesto` 是允许的(都属「仪式感」章节)
- 不要所有页都用 `progression` 偷懒(视觉单调)
- 子元素入场用 `data-anim="left"` / `"right"` / `"line"` 等(配合 CSS 预设的 opacity 0 + translate)
- **不允许发明新 recipe 名**(template 里没注册就 fallback 到普通 fade-up)

**完整 recipe 名清单**(21 个,来自 template 的 RECIPES 字典):

`hero` · `progression` · `statement` · `grid-reveal` · `stack-build` · `measure-up` · `bar-grow` · `duo-mirror` · `split-statement` · `timeline-walk` · `manifesto` · `three-forces` · `loop-form` · `matrix-fill` · `field-notes` · `system-diagram` · `why-now` · `four-cards` · `stacked-ledger` · `tech-spec` · `image-hero`

每个 recipe 的具体效果可以在 `assets/template-hongqiao.html` 搜 `const RECIPES` 查看实现。

---

## 不允许的版式(违反 = validator P0 错误)

- ❌ 不允许使用 S01-S22(Style B 瑞士版式)
- ❌ 不允许使用 1-10(A1-A10,Style A 杂志版式)
- ❌ 不允许临时发明 HQ-07 / HQ-08……**6 个版式封顶**
- ❌ 不允许用 `data-layout` 留空(每页必须标注 HQ-01 ~ HQ-06)
- ❌ 不允许重复同一种 recipe > 3 次
- ❌ 不允许 HQ-06 用 `light`(致谢页必须 `hero dark`)
- ❌ 不允许 HQ-01 跟 HQ-06 之间 < 8 页正文(中间的正文页必须有节奏)
