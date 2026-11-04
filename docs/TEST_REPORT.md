# 测试报告

**日期**：2026-11-04  
**Node**：≥ 18.17（见 `package.json` engines 与 `.nvmrc`）

## 自动化

| 命令 | 结果 | 说明 |
|------|------|------|
| `npm run build` | 每次发版前执行 | 含 TypeScript 与 Next 编译 |
| `npm run lint` | 每次发版前执行 | ESLint（next/core-web-vitals） |
| 链接检查 | 未纳入 CI | `next build` **不会**验证站内链接有效性；建议用 Playwright 冒烟或 link checker 补测 |

## 页面路由（构建后人工冒烟建议）

| 页面 | 构建 | 人工 |
|------|------|------|
| `/` | SSG | 首屏、导航 |
| `/patterns` | SSG | 搜索、分类、**仅看收藏** |
| `/patterns/[id]` | SSG（9 条） | 收藏、独立 `<title>` |
| `/craft` | SSG | |
| `/craft/[id]` | SSG | 步骤导航、独立 `<title>` |
| `/studio` | SSG | 画布、**我的作品**、2048 导出 |
| `/gallery` | SSG | |
| `/gallery/[id]` | SSG | 独立 `<title>` |
| `/about` | SSG | |

## 功能

| 功能 | 说明 |
|------|------|
| 收藏 | localStorage + 博物馆「仅看收藏」 |
| 共创保存 | 侧栏列表加载/删除 + 缩略图 |
| 导出 PNG | 2048×2048 离屏 canvas |
| 移动导航 | 全屏层、Esc、当前页高亮 |

## 已知限制

- 共创作品尚未自动发布到 `/gallery`
- 部分纹样仍为实验/待核实 SVG，需团队替换实拍与馆藏来源
- Supabase / AI 未接入
