# 纹语视觉素材引用审计（第二轮）

> 静态审计 + 代码引用核对。更新日期：以 Git 历史为准。

## 重点封面 / 主视觉

| 资源路径 | 引用位置 | 渲染方式 | 备注 |
|----------|----------|----------|------|
| `/images/hero/hero-batik-main.png` | `HeroSection.tsx`、`HomeCriticalPreloads`（经 `CriticalImagePreloads`） | `CoverImageWithHotspots`，`object-contain` | **仓库内文件缺失时需补入 `public/images/hero/`** |
| `/images/museum/pattern-museum-cover.png` | `PatternsArchive.tsx`、`patterns/page.tsx` preload | 封面 + 热区 | **同上 `public/images/museum/`** |
| `/images/craft/craft-process-cover.png` | `CraftCoverHero.tsx`、`craft/page.tsx` preload | 封面 + 热区，`placeholder: lite` | 文件存在 |
| `/images/studio/studio-editor-visual.png` | `StudioHeroVisual.tsx` | 桌面 `contain`；移动裁切 | 桌面 `max-h` 限制，避免挤占工作台 |
| `/images/gallery/gallery-exhibition.png` | `GalleryCoverHero.tsx`、`gallery/page.tsx` preload | 桌面 `contain` / 移动 `cover` + 热区 | 文件存在 |
| `/images/textures/batik-texture-bg.png` | `globals.css`（`wenyu-batik-*`） | CSS 局部遮罩 | 非整站铺满 |
| `/images/brand/wenyu-logo.png` | `Logo.tsx`、首页 preload | `next/image` | **仓库内文件缺失时需补入** |

## 纹样 PNG（博物馆档案）

`patterns.json` → `PatternsArchive` / 详情页 / `FeaturedPatterns`：

- `pattern-butterfly / fish / vortex / geometric-diamond-grid / flower / fog / folded-bone / longitude-latitude` — 均已指向 `public/images/patterns/`
- `line-spiral-flow` 仍为 `/patterns/line-spiral-flow.svg`（刻意保留）

## 工艺 / 展厅 / 其它

| 资源 | 用途 |
|------|------|
| `craft-process-cover.png` | 工艺课堂 Hero |
| `craft-indigo-dye.png` | 染色步骤封面 + 视频 poster |
| `craft-wax-prep.png` | 蜡液准备列表封面 + 视频 poster |
| `craft-wax-dot.png` | 点蜡列表封面 + 视频 poster |
| `videos/蜡染.mp4` | 染色详情懒加载视频 |
| `gallery/*.svg`（JSON） | 演示作品卡片 — **若 `public/gallery/` 缺文件需补全** |
| `craft/*.svg`（JSON） | 六步示意图 — **若 `public/craft/` 缺文件需补全** |
| `public/patterns/*.svg` | 流线旋纹档案、早期演示；部分首页已改用 PNG |

## 逐页结论（设计）

1. **首页**：Hero 仅热区 + `sr-only`，不叠标题；区块标题保留在文化/精选等区域。
2. **纹样博物馆**：封面与档案区用 `bg-brand-paper` + 顶部分隔线区分层次。
3. **工艺课堂**：封面 + 步骤卡片（SVG/PNG/视频分流）。
4. **数字共创**：Hero 高度受限，下接完整三栏工作台。
5. **作品展厅**：Hero + `#gallery-works` 暖纸白内容区。

## 可能未使用或低使用 SVG（勿删，除非确认）

`motif-*-type.svg`、`geo-rhombus-weave.svg`、`abstract-indigo-mist.svg`、`symmetry-eight-petal.svg`、`geo-fish-bone.svg`、`line-cross-stitch.svg` — 档案已以 PNG 为主后，主要作备用或历史路径。
