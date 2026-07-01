# 虹桥公司风自检清单(Hongqiao Checklist · Style C)

**生成后必做**。P0 = 必须 100% 通过;P1 = 强烈建议;P2 = 可选润色。

---

## P0 · 必须通过(validator 自动检查 + 人工核验)

### 主题与配色
1. **整套 deck 只用 1 套主题**——从 `themes-hongqiao.md` 的 3 套(虹桥蓝/浅蓝/深蓝)里选一套;**不要中途换色**
2. **`--ink` 必须用虹桥深蓝 `#001A70`**——这是品牌色,绝对不能换成 #0a0a0a 或其他
3. **每页警示色不超过 1 种**——`HQ-05` KPI 页例外(允许 amber + red 同页)
4. **警示色只作点状高亮**——数字、icon、4-8px 边条、tag;**禁止**作大色块(> 80×80px)
5. **整 deck 警示色面积 ≤ 15%**——validator 粗略估算

### 字体与字重
6. **没有衬线字体**——`grep -E 'Playfair|Source Serif|Noto Serif|serif"' index.html` 必须 0 命中
7. **大标题字重 500**——`grep -A 3 '^.h-cover' index.html` 应见 `font-weight:500`
8. **正文字号 ≥ 18px**——`grep 'font-size:max(18px' index.html` 必须命中 `.body`
9. **大标题字号 ≤ 5.5vw**——`grep -E 'font-size:\s*min\(5\.[0-9]vw' index.html` 验证

### 排版与节奏
10. **每页 `<section>` 必须有 `data-layout="HQ-0X"`**——`grep -c 'data-layout="HQ-' index.html` 应等于 `grep -c '<section' index.html`
11. **`data-layout` 必须是 HQ-01~06 之一**——不能用 S01-S22(B 风格)或留空
12. **每页必须带 `light` / `dark` / `hero light` / `hero dark`**——`grep -E 'class="slide(\s|.*?)(light|dark|hero)' index.html` 必须 100% 命中
13. **连续 3 页以上同主题 = 视觉疲劳,不允许**——人工核验
14. **8 页以上必须有 ≥ 1 个 `hero dark` + ≥ 1 个 `hero light`**

### 几何与视觉
15. **`border-radius` 全为 0**——`grep -E 'border-radius\s*:\s*[^0]' index.html` 必须 0 命中
16. **没有 `box-shadow`**——`grep -E 'box-shadow' index.html` 必须 0 命中
17. **没有渐变**——`grep -E 'linear-gradient|radial-gradient' index.html` 必须 0 命中(原 PPTX 也没有)
18. **图片槽位用标准比例**——`16:10 / 4:3 / 3:2 / 1:1 / 16:9`,**不要** `21:9`(Swiss 专属)

### 内容
19. **没有 emoji**——`grep -P '[\x{1F300}-\x{1FAFF}]' index.html` 必须 0 命中
20. **所有 `[必填]` 必须替换**——`grep -c '\[必填\]' index.html` 必须 = 0
21. **`<title>` 已改**——不能是 `\[必填\] 替换为 PPT 标题 · Deck Title`

---

## P1 · 强烈建议(人工核验)

### 视觉
22. **打开网页逐页看**——等入场动效稳定(1-2s)再看
23. **大标题字重看起来是中等粗细**——500 而非 200(瑞士极细不适合中文)
24. **正文行高 1.7**——中文正装标准,不要压到 1.4
25. **章节编号 0X 用 `--accent` 颜色**——不是 `--ink`
26. **封面装饰方块顺序:ink → accent → amber**——3 个 8×8 方块,左下角
27. **致谢页装饰方块顺序:ink-3 → accent-bright → amber**——暗底用近白方块

### 动效
28. **每页 recipe 不同**——`HQ-01~06` 6 个 recipe,不允许 ≥ 3 页用同一种 recipe
29. **动效时长 ≤ 1.5s**——`recipe-thanks` 除外(允许 1.2s 慢入)
30. **首屏入场无白屏**——检查 `[data-anim]` 容器初始 opacity

### 数据展示页(HQ-05)
31. **KPI 数字 3-4 个并列**——不超过 4 个,不超过 1 行
32. **↑ ↓ 符号用 Unicode,不用 emoji**——`↑` / `↓` 字符
33. **数据来源 footer 必须有**——14px / 500 / mono / uppercase
34. **amber + red 可同页**(本风格 KPI 页唯一例外)

---

## P2 · 可选润色

35. **章节大编号字号统一**——`section-num` 用 7.2vw,所有章节一致
36. **卡片左侧 4px 边条**——KPI 卡片必备,普通内容卡片可选
37. **底部脚注对齐**——`chrome-foot` 用 mono 字体,右上角时间戳
38. **导出 PDF 留白检查**——单页边距 ≥ 5vw,内容不贴底

---

## 生成前必读

1. 先打开 `assets/template-hongqiao.html` 读 `<style>` 块末尾——确认你要用的每个 class 都在
2. 对照 `layouts-hongqiao.md` 顶部 Pre-flight 类名清单
3. 选主题(`themes-hongqiao.md` 3 套里挑一)→ 替换 `:root` 块
4. 写 slides → 用 `data-layout="HQ-0X"` 标注每页
5. 生成后跑 `node scripts/validate-hongqiao-deck.mjs index.html`
6. 跑完按 P0 列表逐条勾
7. P0 全过后开浏览器逐页看视觉

---

## 与 Style A/B 的差异(自检时容易踩的坑)

| 项 | Style A | Style B | 虹桥 Style C |
|---|---|---|---|
| 字体 | 衬线(Noto Serif SC) | 无衬线极细 200(Inter) | **无衬线中等 500(Arial + 微软雅黑)** |
| 主色 | 5 套中性暖调 | 4 套浅底 + 单 accent | **1 主色 + 2 警示色(蓝主 + 橙黄红)** |
| 字号对比 | 5:1 | ≥ 8:1 | **3:1(中式温和)** |
| 圆角 | 无 | 无 | **无** |
| 阴影 | 无 | 无 | **无** |
| 装饰元素 | WebGL 流体 | WebGL 网格 | **8×8 直角小方块(无 WebGL)** |
| 数据展示 | 1 个数据大字报 | 22 版式里多个 KPI | **1 个专用 HQ-05 数据页(4 KPI)** |
| 目录/章节/致谢 | 无专门版式 | 无专门版式 | **HQ-02/03/06 三个中式结构版式** |
| 暗页比例 | 灵活 | 灵活 | **≤ 25%** |
| WebGL 背景 | 有(流体) | 有(网格) | **无(中式正装不要)——可以未来加上** |
| 必杀技 | Monocle 杂志感 | Swiss 极简 | **中式深蓝商务正装** |
