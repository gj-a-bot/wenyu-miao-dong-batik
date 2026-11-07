/**
 * 压缩工艺课堂 MP4（需本机已安装 ffmpeg 且在 PATH 中）
 *
 *   node scripts/optimize-craft-video.mjs
 *
 * 输入 public/videos/蜡染.mp4 → 输出 public/videos/蜡染-optimized.mp4
 * 完成后在 src/data/craft.json 将 video 改为优化版路径并删除原片（可选）。
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "public/videos/蜡染.mp4");
const output = path.join(root, "public/videos/蜡染-optimized.mp4");

if (!fs.existsSync(input)) {
  console.error("未找到", input);
  process.exit(1);
}

const before = fs.statSync(input).size;
const args = [
  "-y",
  "-i",
  input,
  "-vf",
  "scale='min(1280,iw)':-2",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "28",
  "-movflags",
  "+faststart",
  "-c:a",
  "aac",
  "-b:a",
  "96k",
  "-ac",
  "1",
  output,
];

const r = spawnSync("ffmpeg", args, { stdio: "inherit" });
if (r.status !== 0) {
  console.error("ffmpeg 失败，请确认已安装 ffmpeg");
  process.exit(r.status ?? 1);
}

const after = fs.statSync(output).size;
console.log(
  `完成：${(before / 1e6).toFixed(1)}MB → ${(after / 1e6).toFixed(1)}MB\n输出：${output}`
);
