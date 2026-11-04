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
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-brand-dark text-brand-cream">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-4 py-4 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">
            数字共创实验室
          </p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 bg-transparent font-serif text-xl outline-none border-b border-transparent focus:border-brand-gold"
            aria-label="项目名称"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
          >
            <RotateCcw size={16} /> 重置
          </button>
          <button
            type="button"
            onClick={saveWork}
            className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
          >
            <Save size={16} /> 保存
          </button>
          <button
            type="button"
            onClick={exportPng}
            className="inline-flex items-center gap-2 bg-brand-gold px-4 py-2 text-sm text-brand-dark"
          >
            <Download size={16} /> 导出 PNG
          </button>
        </div>
      </div>

      <div className="grid flex-1 lg:grid-cols-[240px_1fr_280px]">
        <aside className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r overflow-y-auto max-h-[40vh] lg:max-h-none">
          <h2 className="text-xs uppercase tracking-wider text-brand-gray">素材</h2>
          <ul className="mt-3 space-y-2">
            {studioAssets.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => update({ assetId: a.id })}
                  className={cn(
                    "w-full border px-3 py-2 text-left text-sm transition",
                    config.assetId === a.id
                      ? "border-brand-gold bg-brand-gold/10"
                      : "border-white/10 hover:border-white/30"
                  )}
                >
                  <span className="block text-brand-cream">{a.name}</span>
                  <span className="text-[10px] text-brand-gray">{a.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 text-xs uppercase tracking-wider text-brand-gray">
            我的作品
          </h2>
          <StudioSavedWorksList
            refreshKey={worksRefresh}
            onLoad={loadSavedWork}
          />
        </aside>

        <div className="flex items-center justify-center p-4 bg-brand-primary/20">
          <canvas
            ref={canvasRef}
            width={640}
            height={640}
            className="max-w-full shadow-2xl"
            aria-label="创作画布"
          />
        </div>

        <aside className="border-t border-white/10 p-4 lg:border-t-0 lg:border-l overflow-y-auto">
          <h2 className="text-xs uppercase tracking-wider text-brand-gray">参数</h2>
          <div className="mt-4 space-y-4 text-sm">
            <label className="block">
              <span className="text-brand-gray">主色</span>
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => update({ primaryColor: e.target.value })}
                className="mt-1 h-10 w-full cursor-pointer"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">点缀色</span>
              <input
                type="color"
                value={config.accentColor}
                onChange={(e) => update({ accentColor: e.target.value })}
                className="mt-1 h-10 w-full cursor-pointer"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">背景色</span>
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => update({ backgroundColor: e.target.value })}
                className="mt-1 h-10 w-full cursor-pointer"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">尺度 {config.scale.toFixed(2)}</span>
              <input
                type="range"
                min={0.2}
                max={1.5}
                step={0.05}
                value={config.scale}
                onChange={(e) => update({ scale: parseFloat(e.target.value) })}
                className="mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">旋转 {config.rotation}°</span>
              <input
                type="range"
                min={0}
                max={360}
                value={config.rotation}
                onChange={(e) => update({ rotation: parseInt(e.target.value, 10) })}
                className="mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">横向重复 {config.repeatX}</span>
              <input
                type="range"
                min={1}
                max={8}
                value={config.repeatX}
                onChange={(e) => update({ repeatX: parseInt(e.target.value, 10) })}
                className="mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">纵向重复 {config.repeatY}</span>
              <input
                type="range"
                min={1}
                max={8}
                value={config.repeatY}
                onChange={(e) => update({ repeatY: parseInt(e.target.value, 10) })}
                className="mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">间距 {config.spacing}px</span>
              <input
                type="range"
                min={0}
                max={40}
                value={config.spacing}
                onChange={(e) => update({ spacing: parseInt(e.target.value, 10) })}
                className="mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">水平偏移 {config.offsetX}px</span>
              <input
                type="range"
                min={-120}
                max={120}
                value={config.offsetX}
                onChange={(e) => update({ offsetX: parseInt(e.target.value, 10) })}
                className="mt-1 w-full"
              />
            </label>
            <label className="block">
              <span className="text-brand-gray">垂直偏移 {config.offsetY}px</span>
              <input
                type="range"
                min={-120}
                max={120}
                value={config.offsetY}
                onChange={(e) => update({ offsetY: parseInt(e.target.value, 10) })}
                className="mt-1 w-full"
              />
            </label>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand-gold">
              <Sparkles size={14} /> 规则辅助（非 AI）
            </h3>
            <p className="mt-2 text-[11px] text-brand-gray">
              预设配色与排列由本地规则生成；未接入大模型 API。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {presetPalettes.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => applyPalette(p)}
                  className="border border-white/15 px-2 py-1 text-xs hover:border-brand-gold"
                >
                  {p.name}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {layoutPresets.map((l) => (
                <button
                  key={l.name}
                  type="button"
                  onClick={() => applyLayout(l)}
                  className="border border-white/15 px-2 py-1 text-xs hover:border-brand-gold"
                >
                  {l.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={aiAssistPlaceholder}
              className="mt-4 w-full border border-dashed border-brand-gray/40 py-2 text-xs text-brand-gray hover:border-brand-gold hover:text-brand-cream"
            >
              AI 辅助入口（接口预留）
            </button>
            {assistMsg && (
              <p className="mt-3 text-xs leading-relaxed text-brand-gold/90">{assistMsg}</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
