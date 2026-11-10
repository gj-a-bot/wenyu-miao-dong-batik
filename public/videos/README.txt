蜡液准备.mp4 — 步骤 wax-prep（蜡液准备）
点蜡.mp4 — 步骤 wax-dot（点蜡）
蜡染.mp4 — 步骤 dye（染色）

蜡染.mp4

染色步骤（craft id: dye）的演示视频，路径：
  /videos/蜡染.mp4
对应 src/data/craft.json 中该步骤的 "video" 字段。

若重命名或更换文件，请同步修改 JSON 中的路径。
旧占位文件 craft-indigo-dye.mp4 若不再需要可删除。

性能建议（原片较大时）：
  node scripts/optimize-craft-video.mjs
  生成 蜡染-optimized.mp4 后在 craft.json 的 dye 步骤改 video 路径；
  -movflags +faststart 有利于边下边播。
