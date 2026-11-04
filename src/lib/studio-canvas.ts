import { studioAssets } from "@/data/studio-assets";
import { StudioConfig } from "@/types";

export const STUDIO_CANVAS_SIZE = 640;
export const STUDIO_EXPORT_SIZE = 2048;

export function scaleStudioConfigForCanvas(
  config: StudioConfig,
  baseSize: number,
  targetSize: number
): StudioConfig {
  const ratio = targetSize / baseSize;
  return {
    ...config,
    spacing: config.spacing * ratio,
    offsetX: config.offsetX * ratio,
    offsetY: config.offsetY * ratio,
  };
}

export function drawStudio(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  c: StudioConfig
) {
  const asset = studioAssets.find((a) => a.id === c.assetId);
  if (!asset) return;

  ctx.fillStyle = c.backgroundColor;
  ctx.fillRect(0, 0, w, h);

  const [, , vw, vh] = asset.viewBox.split(" ").map(Number);
  const path = new Path2D(asset.svgPath);
  const n = Math.max(c.repeatX, c.repeatY);
  const cell = ((Math.min(w, h) - (n - 1) * c.spacing) / n) * c.scale;
  const startX =
    (w - (c.repeatX * cell + (c.repeatX - 1) * c.spacing)) / 2 + c.offsetX;
  const startY =
    (h - (c.repeatY * cell + (c.repeatY - 1) * c.spacing)) / 2 + c.offsetY;

  for (let r = 0; r < c.repeatY; r++) {
    for (let col = 0; col < c.repeatX; col++) {
      ctx.save();
      ctx.translate(
        startX + col * (cell + c.spacing) + cell / 2,
        startY + r * (cell + c.spacing) + cell / 2
      );
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.scale(cell / vw, cell / vh);
      ctx.translate(-vw / 2, -vh / 2);
      ctx.strokeStyle = c.primaryColor;
      ctx.lineWidth = 2;
      ctx.stroke(path);
      if (c.accentColor !== c.primaryColor) {
        ctx.strokeStyle = c.accentColor;
        ctx.lineWidth = 1.25;
        ctx.stroke(path);
      }
      ctx.restore();
    }
  }
}
