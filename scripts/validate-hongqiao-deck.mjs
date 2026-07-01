#!/usr/bin/env node
/**
 * 虹桥公司风(Style C)deck 校验器
 * 从 validate-swiss-deck.mjs fork,改写规则:
 *   - data-layout 允许值: HQ-01 ~ HQ-06(S01-S22 禁用)
 *   - 标题字重 ≤ 500(中式温和,不允许 200/300 极细)
 *   - 多 accent 互斥: 单页 alert-red 和 alert-amber 不可同时出现
 *     (HQ-05 数据页允许 amber+red 共存,P0 例外)
 *   - 字号 ≤ 5.5vw(中式温和,不允许 8vw Swiss-style 巨号)
 *   - 必填占位符 [必填] 必须替换
 */
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const allowExperimental = process.argv.includes('--allow-experimental');

if (!file) {
  console.error('Usage: node scripts/validate-hongqiao-deck.mjs <index.html>');
  process.exit(2);
}

const html = readFileSync(file, 'utf8');
const htmlForSlides = html.replace(/<!--[\s\S]*?-->/g, '');
const errors = [];
const warnings = [];

const allowedLayouts = new Set([
  'HQ-01', // 封面
  'HQ-02', // 目录
  'HQ-03', // 章节过渡
  'HQ-04', // 内容/图文
  'HQ-05', // 数据/KPI
  'HQ-06', // 致谢
]);

const slideRe = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>[\s\S]*?<\/section>/g;
const slides = [...htmlForSlides.matchAll(slideRe)].map((m, idx) => ({ idx: idx + 1, html: m[0], tag: m[0].match(/<section\b[^>]*>/)?.[0] ?? '' }));

if (!slides.length) {
  errors.push('No <section class="slide"> pages found.');
}

slides.forEach((slide) => {
  const layout = slide.tag.match(/\bdata-layout="([^"]+)"/)?.[1];

  if (!layout) {
    errors.push(`Slide ${slide.idx}: missing data-layout. Hongqiao style requires HQ-01 ~ HQ-06.`);
  } else if (!allowedLayouts.has(layout)) {
    errors.push(`Slide ${slide.idx}: data-layout="${layout}" is not registered. Hongqiao allows only HQ-01 ~ HQ-06..`);
  }

  if (!allowExperimental && /\bdata-layout="P2[34]\b|Swiss Image Split|Swiss Evidence Grid|swiss-img-split|swiss-img-grid/.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses P23/P24. P23/P24 is Style B experimental, not allowed in Hongqiao.`);
  }

  const isStatement = layout === 'S03' || layout === 'S09' || layout === 'S10' || layout === 'SWISS-COVER-ASCII' || layout === 'SWISS-CLOSING-ASCII';
  const topChunk = slide.html.slice(0, 1800);

  if (!isStatement && /text-align\s*:\s*center/i.test(topChunk)) {
    errors.push(`Slide ${slide.idx}: top title area contains text-align:center. Hongqiao titles should stay left aligned.`);
  }

  if (!isStatement && /align-self\s*:\s*center/i.test(topChunk) && /<h[12]\b/i.test(topChunk)) {
    errors.push(`Slide ${slide.idx}: top heading appears vertically/centrally aligned. Use the original left-top title skeleton.`);
  }

  if (!isStatement && /grid-template-columns\s*:\s*[0-9.]+fr\s+[0-9.]+fr/i.test(topChunk) && /<h[12]\b/i.test(topChunk)) {
    warnings.push(`Slide ${slide.idx}: heading inside a custom fr/fr grid. Confirm this is copied from the original HQ-0X skeleton, not a centered title hack (Hongqiao uses left-aligned titles).`);
  }

  if (/<svg\b[\s\S]*?<text\b/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: SVG contains visible <text>. Put labels in HTML grid/captions, keep SVG for geometry only.`);
  }

  const localImages = [...slide.html.matchAll(/<img\b[^>]*src="images\//g)];
  localImages.forEach((_, imageIndex) => {
    const imgTag = slide.html.slice(_.index, slide.html.indexOf('>', _.index) + 1);
    if (!/\bdata-image-slot="/.test(imgTag)) {
      errors.push(`Slide ${slide.idx}: local image ${imageIndex + 1} missing data-image-slot. Bind every image to a layout slot such as s22-hero-21x9 or s15-grid-21x9.`);
    }
  });

  const frameImageRe = /<div\b(?=[^>]*\bclass="([^"]*\bframe-img\b[^"]*)")[^>]*>\s*<img\b(?=[^>]*\bdata-image-slot="([^"]+)")[^>]*>/g;
  const frameImages = [...slide.html.matchAll(frameImageRe)];
  frameImages.forEach((match) => {
    const className = match[1];
    const slot = match[2];
    const frameTag = match[0].match(/^<div\b[^>]*>/)?.[0] ?? '';
    if (/^s1[56]-(?:grid|brief)-21x9$/.test(slot)) {
      if (/\bfit-contain\b/.test(className)) {
        errors.push(`Slide ${slide.idx}: ${slot} uses fit-contain. Regenerated S15/S16 21:9 images should fill the slot with .frame-img.r-21x9.`);
      }
      if (!/\br-21x9\b/.test(className)) {
        errors.push(`Slide ${slide.idx}: ${slot} must use .frame-img.r-21x9 so the image slot controls the visible size.`);
      }
      if (/height\s*:\s*\d+(?:\.\d+)?vh/i.test(frameTag)) {
        errors.push(`Slide ${slide.idx}: ${slot} frame has a fixed vh height. Use aspect-ratio .r-21x9 instead of shrinking long images into a short slot.`);
      }
    }
  });

});


// ============ 虹桥专属检查(插入位置) ============
let pageCount = 0;
let heroLightCount = 0;
let heroDarkCount = 0;
let darkPageCount = 0;
let totalAlertRed = 0;
let totalAlertAmber = 0;
slides.forEach((slide) => {
  pageCount++;
  const sectionOpen = slide.tag;
  if (/\bhero\s+light\b/.test(sectionOpen)) heroLightCount++;
  if (/\bhero\s+dark\b/.test(sectionOpen)) heroDarkCount++;
  if (/\b(dark|hero\s+dark)\b/.test(sectionOpen)) darkPageCount++;

  // 1) 标题字重 200/300 警告(虹桥用 500)
  if (/<h[12]\b[^>]*style="[^"]*font-weight:\s*(200|300)\b/i.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: title font-weight 200/300 detected. Hongqiao recommends 500 for readability.`);
  }

  // 2) 标题字号 ≥ 7vw 警告(虹桥封顶 5.5vw)
  if (/<h[12]\b[^>]*style="[^"]*font-size:\s*min\(\s*([7-9]\.\d|\d{2,})/i.test(slide.html) ||
      /<h[12]\b[^>]*style="[^"]*font-size:\s*([7-9]\.\d)vw/i.test(slide.html)) {
    warnings.push(`Slide ${slide.idx}: title font-size >= 7vw. Hongqiao caps at 5.5vw.`);
  }

  // 3) 多 accent 互斥: alert-red + alert-amber 单页不能共存(HQ-05 例外)
  const hasAlertRed = /var\(--alert-red\)|#DA291C|srgb\(218,\s*41,\s*28\)/i.test(slide.html);
  const hasAlertAmber = /var\(--alert-amber\)|#FFB81C|srgb\(255,\s*184,\s*28\)/i.test(slide.html);
  const isKpiPage = /data-layout="HQ-05"/.test(sectionOpen);
  if (hasAlertRed && hasAlertAmber && !isKpiPage) {
    errors.push(`Slide ${slide.idx}: mixes --alert-red and --alert-amber. Hongqiao allows only one alert per page (HQ-05 excepted).`);
  }

  // 4) [必填] 占位符必须替换
  if (/\[必填\]/.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: contains unreplaced [必填] placeholder.`);
  }

  // 5) 衬线字体禁止
  if (/Noto\s+Serif\s+SC|Playfair|Source\s+Serif|font-family:[^;"]*"?[^"]*serif/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses serif font. Hongqiao is sans-serif only.`);
  }

  // 6) 圆角禁止
  if (/border-radius\s*:\s*[^0]/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses border-radius > 0. Hongqiao inherits sharp-corner aesthetic.`);
  }

  // 7) 阴影禁止
  if (/box-shadow/i.test(slide.html)) {
    errors.push(`Slide ${slide.idx}: uses box-shadow. Hongqiao inherits flat aesthetic.`);
  }

  // 8) HQ-06 致谢页必须含 LOGO + 至少一个双圆 PNG(issue #8)
  if (/data-layout="HQ-06"/.test(sectionOpen)) {
    const hasLogo = /<img\b[^>]*src="[^"]*logo-white\.png"/i.test(slide.html);
    const hasCircle = /<img\b[^>]*src="[^"]*(?:circle-large|circle-small)\.png"/i.test(slide.html);
    if (!hasLogo || !hasCircle) {
      errors.push(`Slide ${slide.idx}: HQ-06 must include <img> for logo-white.png and at least one circle PNG (circle-large.png or circle-small.png) — issue #8.`);
    }
  }

  // 9) HQ-06 必须保持 class="slide hero dark"(issue #8)
  if (/data-layout="HQ-06"/.test(sectionOpen) && !/\bhero\s+dark\b/.test(sectionOpen)) {
    errors.push(`Slide ${slide.idx}: HQ-06 must keep class="slide hero dark" — issue #8.`);
  }

  // 累计警示色次数
  totalAlertRed += (slide.html.match(/var\(--alert-red\)/g) || []).length;
  totalAlertAmber += (slide.html.match(/var\(--alert-amber\)/g) || []).length;
});

// 全 deck 统计
if (pageCount >= 8) {
  if (heroLightCount === 0) errors.push(`Total: deck with >=8 pages must have >=1 hero light page.`);
  if (heroDarkCount === 0) errors.push(`Total: deck with >=8 pages must have >=1 hero dark page.`);
}
if (pageCount > 0 && darkPageCount / pageCount > 0.25) {
  warnings.push(`Total: dark page ratio is ${(darkPageCount/pageCount*100).toFixed(1)}% (>25% cap).`);
}
const totalAlerts = totalAlertRed + totalAlertAmber;
if (totalAlerts > pageCount * 4) {
  warnings.push(`Total: alert color usage is high (${totalAlerts} occurrences / ${pageCount} pages). Consider trimming.`);
}

if (warnings.length) {
  console.warn('Warnings:');
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error('Hongqiao deck validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Hongqiao deck validation passed: ${slides.length} slide(s).`);
