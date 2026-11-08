import { studioAssets } from "@/data/studio-assets";
import {
  drawStudio,
  scaleStudioConfigForCanvas,
  STUDIO_CANVAS_SIZE,
  STUDIO_EXPORT_SIZE,
} from "@/lib/studio-canvas";
import type { StudioConfig } from "@/types";

export function renderStudioToCanvas(
  config: StudioConfig,
  size: number
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("无法创建画布");
  const scaled = scaleStudioConfigForCanvas(
    config,
    STUDIO_CANVAS_SIZE,
    size
  );
  drawStudio(ctx, size, size, scaled);
  return canvas;
}

export function downloadStudioPng(config: StudioConfig, filename: string) {
  const canvas = renderStudioToCanvas(config, STUDIO_EXPORT_SIZE);
  const link = document.createElement("a");
  link.download = `${filename || "wenyu-studio"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function buildStudioSvg(config: StudioConfig, size = STUDIO_EXPORT_SIZE): string {
  const asset = studioAssets.find((a) => a.id === config.assetId);
  if (!asset) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"/>`;

  const scaled = scaleStudioConfigForCanvas(
    config,
    STUDIO_CANVAS_SIZE,
    size
  );
  const [, , vw, vh] = asset.viewBox.split(" ").map(Number);
  const n = Math.max(scaled.repeatX, scaled.repeatY);
  const cell = ((Math.min(size, size) - (n - 1) * scaled.spacing) / n) * scaled.scale;
  const startX =
    (size - (scaled.repeatX * cell + (scaled.repeatX - 1) * scaled.spacing)) / 2 +
    scaled.offsetX;
  const startY =
    (size - (scaled.repeatY * cell + (scaled.repeatY - 1) * scaled.spacing)) / 2 +
    scaled.offsetY;

  const paths: string[] = [];
  for (let r = 0; r < scaled.repeatY; r++) {
    for (let col = 0; col < scaled.repeatX; col++) {
      const cx = startX + col * (cell + scaled.spacing) + cell / 2;
      const cy = startY + r * (cell + scaled.spacing) + cell / 2;
      const sx = cell / vw;
      const sy = cell / vh;
      const rot = scaled.rotation;
      paths.push(
        `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${sx} ${sy}) translate(${-vw / 2} ${-vh / 2})"><path d="${asset.svgPath}" fill="none" stroke="${scaled.primaryColor}" stroke-width="2"/></g>`
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="${scaled.backgroundColor}"/>
  ${paths.join("\n  ")}
</svg>`;
}

export function downloadStudioSvg(config: StudioConfig, filename: string) {
  const svg = buildStudioSvg(config);
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename || "wenyu-studio"}.svg`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
