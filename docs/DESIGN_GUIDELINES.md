# 设计规范

## 品牌色

| 名称 | 色值 | 用途 |
|------|------|------|
| 主色靛蓝 | `#183B56` | 标题、主按钮、深色区块 |
| 深色 | `#0B1F33` | Hero、Footer、画布区背景 |
| 米白 | `#F4F0E6` | 阅读背景 |
| 暖金 | `#C69B5D` | 强调线、次要 CTA |
| 辅助灰 | `#9AA6AD` | 深色背景说明文字 |
| 正文灰 | `#5F6B73` | 米白背景正文（WCAG AA 约 4.7:1） |

## 字体

系统中文栈：`PingFang SC`, `Microsoft YaHei`, `Noto Sans SC`, sans-serif  
标题可选用 serif 栈（Songti SC / SimSun）营造展览感。

## 布局

- 最大内容宽度 `max-w-7xl`
- 首页采用全宽 Hero + 模块节奏（24px 纵向间距基准）
- 博物馆：侧栏分类 + 多列瀑布
- 展厅：左右交替大图叙事

## 组件

- 按钮：小圆角 (`rounded-sm`)，避免过度圆角卡片堆叠
- 导航：PC 顶栏 + 移动全屏折叠
- 标签：`VerificationBadge` 区分核实状态

## 动效

Framer Motion 用于首屏与工艺时间轴入场；时长约 0.8s，ease 自定义曲线。避免粒子背景等廉价科技特效。

## Logo

蜡染冰裂纹 + 经纬线抽象图形，见 `components/brand/Logo.tsx` 与 `public/icon.svg`。
