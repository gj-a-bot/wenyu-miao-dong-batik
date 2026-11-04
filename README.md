# 纹语 WENYU

**苗侗蜡染数字文化交互系统** — 华灿奖数字媒体设计赛道参赛原型

让纹样有故事，让工艺可体验，让传统文化能够被重新理解和创造。

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Canvas / SVG（数字共创实验室）
- 本地 JSON 数据 + localStorage（可选扩展 Supabase）

## 安装与启动

```bash
npm install
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)

生产构建：

```bash
npm run build
npm start
```

## 目录说明

```
src/
  app/              # 页面路由
  components/       # UI 与业务组件
  data/             # 纹样、工艺、展厅 JSON
  lib/              # 数据访问、存储工具
  types/            # TypeScript 类型
public/
  patterns/         # 纹样 SVG（原创实验素材）
  craft/            # 工艺示意图
  gallery/          # 展厅演示作品
  hero/             # 首页视觉
docs/               # 项目文档
```

## 核心功能

| 模块 | 路径 | 能力 |
|------|------|------|
| 首页 | `/` | Hero、文化介绍、纹样精选、工艺时间轴、共创与展厅入口 |
| 纹样博物馆 | `/patterns` | 分类、搜索、瀑布流、收藏、详情 |
| 工艺课堂 | `/craft` | 七步流程、步骤详情与前后导航 |
| 数字共创 | `/studio` | 素材、配色、排列、Canvas 实时预览、保存、PNG 导出 |
| 作品展厅 | `/gallery` | 分类、展览式列表、详情与对比 |
| 关于 | `/about` | 背景、理念、技术、版权说明 |

## 素材说明

当前仓库内纹样与展厅视觉均为 **项目原创 SVG 实验素材**，界面标注「数字实验素材」或「待核实」。替换为团队实拍/授权素材时，请更新 `src/data/*.json` 与 `docs/ASSET_SOURCES.md`。

## 后续扩展

- 接入 Supabase 同步收藏与用户作品
- 替换/增补经核实的非遗纹样与工艺参数
- 配置真实 AI 模型 API（`StudioWorkspace` 已预留入口）
- 补充摄影级 Hero 与工艺视频

## 文档

- [项目概览](docs/PROJECT_OVERVIEW.md)
- [功能架构](docs/FUNCTION_ARCHITECTURE.md)
- [设计规范](docs/DESIGN_GUIDELINES.md)
- [素材来源](docs/ASSET_SOURCES.md)
- [测试报告](docs/TEST_REPORT.md)
