# 素材来源

## 原则

不伪装 AI 或网络抓取素材为非遗原作；未核实文化释义标注「待核实」。

## 当前仓库素材

| 路径 | 性质 | 说明 |
|------|------|------|
| `public/patterns/*.svg` | 原创 | 数字设计实验纹样，用于交互演示 |
| `public/craft/*.svg` | 原创 | 工艺环节示意图，非实拍 |
| `public/gallery/*.svg` | 原创 | 项目演示展厅作品 |
| `public/hero/batik-visual.svg` | 原创 | 首页主视觉 |
| `public/icon.svg` | 原创 | 站点图标 |

## 数据标注

`patterns.json` 中 `verificationStatus: experimental`，`source` 字段说明「纹语项目原创 · 数字设计实验素材」。

## 待替换项（建议）

- [ ] 团队授权拍摄的蜡染过程照片/短视频
- [ ] 经文献或传承人确认的纹样影像与说明
- [ ] 竞赛提交用高清 Hero 摄影

替换步骤：更新 `public/` 文件路径与 JSON 字段，并将核实条目改为 `verified`。

## 第三方

当前未引入 Unsplash 等外部 CDN 图片，避免版权不确定。
