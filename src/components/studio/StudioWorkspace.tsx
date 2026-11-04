"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_STUDIO_CONFIG,
  layoutPresets,
  presetPalettes,
  studioAssets,
} from "@/data/studio-assets";
import { SavedStudioWork, StudioConfig } from "@/types";
import { saveStudioWork } from "@/lib/storage";
import {
  drawStudio,
  scaleStudioConfigForCanvas,
  STUDIO_CANVAS_SIZE,
  STUDIO_EXPORT_SIZE,
} from "@/lib/studio-canvas";
import { StudioSavedWorksList } from "@/components/studio/StudioSavedWorksList";
import { ColorField, RangeField } from "@/components/ui/Field";
import { Logo } from "@/components/brand/Logo";
import { Download, RotateCcw, Save, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

function createPreviewThumbnail(
  source: HTMLCanvasElement,
  maxSize = 128
): string | undefined {
  const scale = Math.min(1, maxSize / Math.max(source.width, source.height));
  const tw = Math.max(1, Math.round(source.width * scale));
  const th = Math.max(1, Math.round(source.height * scale));
  const thumb = document.createElement("canvas");
  thumb.width = tw;
  thumb.height = th;
  const tctx = thumb.getContext("2d");
  if (!tctx) return undefined;
  tctx.drawImage(source, 0, 0, tw, th);
  try {
    return thumb.toDataURL("image/jpeg", 0.72);
  } catch {
    return undefined;
  }
}

export function StudioWorkspace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config, setConfig] = useState<StudioConfig>(DEFAULT_STUDIO_CONFIG);
  const [title, setTitle] = useState("未命名实验");
  const [assistMsg, setAssistMsg] = useState("");
  const [worksRefresh, setWorksRefresh] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawStudio(ctx, canvas.width, canvas.height, config);
  }, [config]);

  const update = (partial: Partial<StudioConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const reset = () => {
    setConfig({ ...DEFAULT_STUDIO_CONFIG });
    setAssistMsg("");
  };

  const exportPng = () => {
    const off = document.createElement("canvas");
    off.width = STUDIO_EXPORT_SIZE;
    off.height = STUDIO_EXPORT_SIZE;
    const ctx = off.getContext("2d");
    if (!ctx) return;
    const scaled = scaleStudioConfigForCanvas(
      config,
      STUDIO_CANVAS_SIZE,
      STUDIO_EXPORT_SIZE
    );
    drawStudio(ctx, STUDIO_EXPORT_SIZE, STUDIO_EXPORT_SIZE, scaled);
    const link = document.createElement("a");
    link.download = `${title || "wenyu-studio"}.png`;
    link.href = off.toDataURL("image/png");
    link.click();
  };

  const saveWork = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setAssistMsg("无法读取画布，保存失败。");
      return;
    }
    const previewDataUrl = createPreviewThumbnail(canvas);
    const ok = saveStudioWork({
      id: `local-${Date.now()}`,
      title,
      createdAt: new Date().toISOString().slice(0, 10),
      config,
      previewDataUrl,
    });
    setAssistMsg(
      ok
        ? "已保存到浏览器本地存储（含缩略图预览）。"
        : "保存失败：浏览器存储不可用或空间已满，请导出 PNG 备份。"
    );
    if (ok) setWorksRefresh((k) => k + 1);
  };

  const loadSavedWork = (work: SavedStudioWork) => {
    setConfig({ ...DEFAULT_STUDIO_CONFIG, ...work.config });
    setTitle(work.title);
    setAssistMsg(`已加载：${work.title}`);
  };

  const applyPalette = (p: (typeof presetPalettes)[0]) => {
    update({
      primaryColor: p.primary,
      backgroundColor: p.background,
      accentColor: p.accent,
    });
    setAssistMsg(`已应用配色方案：${p.name}（规则驱动，非 AI 生成）。`);
  };

  const applyLayout = (l: (typeof layoutPresets)[0]) => {
    update({
      repeatX: l.repeatX,
      repeatY: l.repeatY,
      scale: l.scale,
      spacing: l.spacing,
    });
    setAssistMsg(`已应用排列方案：${l.name}（规则驱动）。`);
  };

  const aiAssistPlaceholder = () => {
    setAssistMsg(
      "AI 模型接口尚未配置。当前提供配色与排列预设；接入后可通过 storageApiExtension 同步。"
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-brand-paper">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border bg-brand-warm px-4 py-4 md:px-8">
        <div className="flex items-center gap-6">
          <Logo compact />
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-muted">
              数字共创实验室
            </p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full max-w-xs border-b border-transparent bg-transparent font-serif text-xl text-brand-primary outline-none focus:border-brand-gold"
              aria-label="项目名称"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={reset} className="wenyu-chip gap-2">
            <RotateCcw size={15} /> 重置
          </button>
          <button type="button" onClick={saveWork} className="wenyu-chip gap-2">
            <Save size={15} /> 保存
          </button>
          <button
            type="button"
            onClick={exportPng}
            className="inline-flex items-center gap-2 bg-brand-primary px-5 py-2.5 text-sm tracking-wide text-brand-warm"
          >
            <Download size={15} /> 导出 PNG
          </button>
        </div>
      </div>

      <div className="grid flex-1 lg:grid-cols-[260px_1fr_300px]">
        <aside className="border-b border-brand-border bg-brand-warm/80 p-5 lg:border-b-0 lg:border-r overflow-y-auto max-h-[42vh] lg:max-h-none">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-brand-muted">素材库</h2>
          <ul className="mt-4 space-y-2">
            {studioAssets.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => update({ assetId: a.id })}
                  className={cn(
                    "w-full border px-3 py-3 text-left transition",
                    config.assetId === a.id
                      ? "border-brand-primary bg-brand-primary text-brand-warm"
                      : "border-brand-border bg-brand-paper hover:border-brand-secondary"
                  )}
                >
                  <span className="block text-sm">{a.name}</span>
                  <span className="text-[10px] opacity-80">{a.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-[11px] uppercase tracking-[0.3em] text-brand-muted">
            我的作品
          </h2>
          <StudioSavedWorksList refreshKey={worksRefresh} onLoad={loadSavedWork} />
        </aside>

        <div className="flex items-center justify-center p-6 md:p-10 bg-[#EBE6DC]">
          <div className="border border-brand-border bg-brand-warm p-3 shadow-archive">
            <canvas
              ref={canvasRef}
              width={640}
              height={640}
              className="max-w-full"
              aria-label="创作画布"
            />
          </div>
        </div>

        <aside className="border-t border-brand-border bg-brand-warm/80 p-5 lg:border-t-0 lg:border-l overflow-y-auto">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-brand-muted">设计参数</h2>
          <div className="mt-5 space-y-5">
            <ColorField label="主色" value={config.primaryColor} onChange={(v) => update({ primaryColor: v })} />
            <ColorField label="点缀色" value={config.accentColor} onChange={(v) => update({ accentColor: v })} />
            <ColorField label="背景色" value={config.backgroundColor} onChange={(v) => update({ backgroundColor: v })} />
            <RangeField label="尺度" value={config.scale} min={0.2} max={1.5} step={0.05} onChange={(v) => update({ scale: v })} format={(v) => v.toFixed(2)} />
            <RangeField label="旋转" value={config.rotation} min={0} max={360} onChange={(v) => update({ rotation: v })} format={(v) => `${v}°`} />
            <RangeField label="横向重复" value={config.repeatX} min={1} max={8} onChange={(v) => update({ repeatX: v })} />
            <RangeField label="纵向重复" value={config.repeatY} min={1} max={8} onChange={(v) => update({ repeatY: v })} />
            <RangeField label="间距" value={config.spacing} min={0} max={40} onChange={(v) => update({ spacing: v })} format={(v) => `${v}px`} />
            <RangeField label="水平偏移" value={config.offsetX} min={-120} max={120} onChange={(v) => update({ offsetX: v })} format={(v) => `${v}px`} />
            <RangeField label="垂直偏移" value={config.offsetY} min={-120} max={120} onChange={(v) => update({ offsetY: v })} format={(v) => `${v}px`} />
          </div>

          <div className="mt-8 border-t border-brand-border pt-6">
            <h3 className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-brand-goldInk">
              <Sparkles size={14} /> 规则辅助（非 AI）
            </h3>
            <p className="mt-2 text-[11px] leading-relaxed text-brand-muted">
              预设配色与排列由本地规则生成；未接入大模型 API。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {presetPalettes.map((p) => (
                <button key={p.name} type="button" onClick={() => applyPalette(p)} className="wenyu-chip text-[11px]">
                  {p.name}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {layoutPresets.map((l) => (
                <button key={l.name} type="button" onClick={() => applyLayout(l)} className="wenyu-chip text-[11px]">
                  {l.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={aiAssistPlaceholder}
              className="mt-4 w-full border border-dashed border-brand-border py-2.5 text-[11px] text-brand-muted hover:border-brand-gold hover:text-brand-primary"
            >
              AI 辅助入口（接口预留）
            </button>
            {assistMsg && (
              <p
                className={cn(
                  "mt-3 text-xs leading-relaxed",
                  assistMsg.includes("失败") ? "text-red-800" : "text-brand-goldInk"
                )}
                role="status"
              >
                {assistMsg}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
