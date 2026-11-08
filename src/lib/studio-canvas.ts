import { DEFAULT_STUDIO_CONFIG, studioAssets } from "@/data/studio-assets";
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

function drawWaxSimulation(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  crackle: number,
  bleed: number
) {
  if (crackle <= 0 && bleed <= 0) return;

  if (bleed > 0) {
    const g = ctx.createRadialGradient(
      w * 0.35,
      h * 0.4,
      w * 0.08,
      w * 0.5,
      h * 0.5,
      w * 0.72
    );
    g.addColorStop(0, `rgba(23, 59, 80, ${bleed * 0.22})`);
    g.addColorStop(1, "rgba(23, 59, 80, 0)");
    ctx.save();
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  if (crackle > 0) {
    ctx.save();
    ctx.strokeStyle = "rgba(250, 248, 242, 0.85)";
    ctx.lineWidth = Math.max(0.6, w / 520);
    ctx.globalAlpha = crackle * 0.55;
    const lines = Math.floor(18 + crackle * 36);
    for (let i = 0; i < lines; i++) {
      const t = (i * 97) % 360;
      const x0 = (w * ((i * 41) % 100)) / 100;
      const y0 = (h * ((i * 59) % 100)) / 100;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x0 + Math.cos(t) * w * 0.08, y0 + Math.sin(t) * h * 0.06);
      ctx.stroke();
    }
    ctx.restore();
  }
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

  drawWaxSimulation(
    ctx,
    w,
    h,
    c.waxCrackle ?? 0,
    c.waxBleed ?? 0
  );
}

export function normalizeStudioConfig(
  partial: Partial<StudioConfig> | StudioConfig
): StudioConfig {
  return {
    ...DEFAULT_STUDIO_CONFIG,
    ...partial,
  };
}
