"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_STUDIO_CONFIG,
  studioAssets,
  studioLicensedAssets,
} from "@/data/studio-assets";
import { SavedStudioWork, StudioConfig, StudioDesignPlan, CreativeProductId } from "@/types";
import { saveStudioWork } from "@/lib/storage";
import {
  drawStudio,
  normalizeStudioConfig,
  STUDIO_CANVAS_SIZE,
} from "@/lib/studio-canvas";
import {
  downloadStudioPng,
  downloadStudioSvg,
  renderStudioToCanvas,
} from "@/lib/studio-export";
import { StudioHeroVisual } from "@/components/studio/StudioHeroVisual";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { StudioSavedWorksList } from "@/components/studio/StudioSavedWorksList";
import { StudioAdvancedPanel } from "@/components/studio/StudioAdvancedPanel";
import { StudioAiDesigner } from "@/components/studio/StudioAiDesigner";
import { StudioMockupPreview } from "@/components/studio/StudioMockupPreview";
import { Download, Layers, Palette, RotateCcw, Save, Shapes, ShoppingBag } from "lucide-react";
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

type LeftTab = "assets" | "advanced" | "works" | "mockup";

export function StudioWorkspace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [config, setConfig] = useState<StudioConfig>(
    normalizeStudioConfig(DEFAULT_STUDIO_CONFIG)
  );
  const [title, setTitle] = useState("未命名实验");
  const [worksRefresh, setWorksRefresh] = useState(0);
  const [leftTab, setLeftTab] = useState<LeftTab>("assets");
  const [stageMode, setStageMode] = useState<"canvas" | "mockup">("canvas");
  const [product, setProduct] = useState<CreativeProductId>("tote");
  const [statusMsg, setStatusMsg] = useState("");
  const [hasLiveLlm, setHasLiveLlm] = useState<boolean | null>(null);
  const [llmProvider, setLlmProvider] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/studio/llm-status")
      .then((r) => r.json())
      .then(
        (data: {
          hasLiveLlm?: boolean;
          provider?: string | null;
          demoFallback?: boolean;
        }) => {
          if (cancelled) return;
          setHasLiveLlm(Boolean(data.hasLiveLlm));
          setLlmProvider(data.provider ?? null);
        }
      )
      .catch(() => {
        if (!cancelled) setHasLiveLlm(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || stageMode !== "canvas") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawStudio(ctx, canvas.width, canvas.height, config);
  }, [config, stageMode]);

  const update = (partial: Partial<StudioConfig>) => {
    setConfig((prev) => normalizeStudioConfig({ ...prev, ...partial }));
  };

  const reset = () => {
    setConfig(normalizeStudioConfig(DEFAULT_STUDIO_CONFIG));
    setStatusMsg("");
  };

  const saveWork = () => {
    const off = renderStudioToCanvas(config, STUDIO_CANVAS_SIZE);
    const previewDataUrl = createPreviewThumbnail(off);
    const ok = saveStudioWork({
      id: `local-${Date.now()}`,
      title,
      createdAt: new Date().toISOString().slice(0, 10),
      config,
      previewDataUrl,
    });
    setStatusMsg(
      ok
        ? "已保存到浏览器本地（含缩略图与设计参数）。"
        : "保存失败：请尝试导出 PNG 备份。"
    );
    if (ok) setWorksRefresh((k) => k + 1);
  };

  const loadSavedWork = (work: SavedStudioWork) => {
    setConfig(normalizeStudioConfig(work.config));
    setTitle(work.title);
    setStatusMsg(`已加载：${work.title}`);
    setStageMode("canvas");
  };

  const applyPlan = (next: StudioConfig, plan: StudioDesignPlan) => {
    setConfig(normalizeStudioConfig(next));
    setStatusMsg(`已应用 ${plan.title}。`);
    setStageMode("canvas");
  };

  const tabs: { id: LeftTab; label: string; icon: React.ReactNode }[] = [
    { id: "assets", label: "素材", icon: <Shapes size={14} /> },
    { id: "advanced", label: "高级", icon: <Palette size={14} /> },
    { id: "works", label: "作品", icon: <Layers size={14} /> },
    { id: "mockup", label: "文创", icon: <ShoppingBag size={14} /> },
  ];

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col">
      <StudioHeroVisual />

      <BatikTextureSurface
        as="div"
        variant="studioRich"
        className="flex w-full flex-1 flex-col"
      >
        <div
          id="studio-workspace"
          className="flex min-h-0 flex-1 flex-col scroll-mt-24"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border/80 bg-brand-warm/92 px-4 py-4 backdrop-blur-[2px] md:px-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-brand-goldInk">
                数字共创实验室 2.0
              </p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full max-w-md border-b border-transparent bg-transparent font-serif text-xl text-brand-primary outline-none focus:border-brand-gold"
                aria-label="作品名称"
              />
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
                onClick={() => downloadStudioSvg(config, title)}
                className="wenyu-chip gap-2"
              >
                <Download size={15} /> SVG
              </button>
              <button
                type="button"
                onClick={() => downloadStudioPng(config, title)}
                className="inline-flex items-center gap-2 bg-brand-primary px-5 py-2.5 text-sm tracking-wide text-brand-warm"
              >
                <Download size={15} /> PNG
              </button>
            </div>
          </div>

          {statusMsg && (
            <p className="border-b border-brand-border/60 bg-brand-paper/90 px-4 py-2 text-xs text-brand-ink md:px-8">
              {statusMsg}
            </p>
          )}

          <div className="grid flex-1 lg:grid-cols-[minmax(240px,280px)_1fr_minmax(280px,320px)]">
            <aside className="flex max-h-[40vh] flex-col border-b border-brand-border/80 bg-brand-warm/90 backdrop-blur-[2px] lg:max-h-none lg:border-b-0 lg:border-r">
              <nav className="flex border-b border-brand-border/80">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setLeftTab(t.id);
                      if (t.id === "mockup") setStageMode("mockup");
                    }}
                    className={cn(
                      "flex flex-1 flex-col items-center gap-0.5 py-3 text-[10px] tracking-widest",
                      leftTab === t.id
                        ? "bg-brand-primary text-brand-warm"
                        : "text-brand-secondary hover:bg-brand-paper"
                    )}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </nav>
              <div className="flex-1 overflow-y-auto p-5">
                {leftTab === "assets" && (
                  <>
                    <h2 className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-primary">
                      纹样素材库
                    </h2>
                    <p className="mt-2 text-[10px] leading-relaxed text-brand-muted">
                      实验几何纹样可随时使用；外部授权 SVG 须审核通过后才会出现在下方列表。
                    </p>
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
                            <span
                              className={cn(
                                "text-[10px]",
                                config.assetId === a.id
                                  ? "text-brand-warm/85"
                                  : "text-brand-secondary"
                              )}
                            >
                              {a.label}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {studioLicensedAssets.length > 0 ? (
                      <>
                        <h3 className="mt-8 text-[11px] font-medium uppercase tracking-[0.28em] text-brand-primary">
                          授权纹样
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {studioLicensedAssets.map((a) => (
                            <li key={a.id}>
                              <button
                                type="button"
                                onClick={() => update({ assetId: a.id })}
                                className={cn(
                                  "w-full border px-3 py-3 text-left transition",
                                  config.assetId === a.id
                                    ? "border-brand-primary bg-brand-primary text-brand-warm"
                                    : "border-brand-gold/40 bg-brand-gold/5 hover:border-brand-gold"
                                )}
                              >
                                <span className="block text-sm">{a.name}</span>
                                <span className="text-[10px] text-brand-goldInk">
                                  已审核授权素材
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="mt-6 border border-dashed border-brand-border px-3 py-2 text-[10px] text-brand-muted">
                        暂无通过审核的授权 SVG（8 项均在台账 pending）。
                      </p>
                    )}
                  </>
                )}
                {leftTab === "advanced" && (
                  <StudioAdvancedPanel
                    config={config}
                    onChange={update}
                    onPalette={(p) => {
                      update({
                        primaryColor: p.primary,
                        backgroundColor: p.background,
                        accentColor: p.accent,
                      });
                      setStatusMsg(`已应用配色：${p.name}`);
                    }}
                    onLayout={(l) => {
                      update({
                        repeatX: l.repeatX,
                        repeatY: l.repeatY,
                        scale: l.scale,
                        spacing: l.spacing,
                      });
                      setStatusMsg(`已应用排列：${l.name}`);
                    }}
                  />
                )}
                {leftTab === "works" && (
                  <>
                    <h2 className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-primary">
                      本地作品
                    </h2>
                    <p className="mt-2 text-[10px] text-brand-secondary">
                      加载历史作品将恢复全部设计参数与蜡染模拟强度。
                    </p>
                    <StudioSavedWorksList
                      refreshKey={worksRefresh}
                      onLoad={loadSavedWork}
                    />
                  </>
                )}
                {leftTab === "mockup" && (
                  <StudioMockupPreview
                    config={config}
                    product={product}
                    onProductChange={setProduct}
                  />
                )}
              </div>
            </aside>

            <div className="flex flex-col items-center justify-center bg-brand-primary/[0.04] p-4 md:p-8">
              <div className="mb-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStageMode("canvas")}
                  className={cn(
                    "wenyu-chip text-[11px]",
                    stageMode === "canvas" && "border-brand-gold bg-brand-primary text-brand-warm"
                  )}
                >
                  创作画布
                </button>
                <button
                  type="button"
                  onClick={() => setStageMode("mockup")}
                  className={cn(
                    "wenyu-chip text-[11px]",
                    stageMode === "mockup" && "border-brand-gold bg-brand-primary text-brand-warm"
                  )}
                >
                  文创预览
                </button>
              </div>
              {stageMode === "canvas" ? (
                <div className="border border-brand-border bg-brand-warm p-3 shadow-archive">
                  <canvas
                    ref={canvasRef}
                    width={STUDIO_CANVAS_SIZE}
                    height={STUDIO_CANVAS_SIZE}
                    className="max-w-[min(100vw-2rem,640px)]"
                    aria-label="创作画布"
                  />
                </div>
              ) : (
                <StudioMockupPreview
                  config={config}
                  product={product}
                  onProductChange={setProduct}
                  className="w-full"
                />
              )}
            </div>

            <aside className="max-h-[50vh] overflow-y-auto border-t border-brand-border/80 bg-brand-warm/92 p-5 backdrop-blur-[2px] lg:max-h-none lg:border-t-0 lg:border-l">
              <StudioAiDesigner
                onApplyPlan={applyPlan}
                isLive={hasLiveLlm ?? undefined}
                statusNotice={
                  hasLiveLlm === null
                    ? undefined
                    : hasLiveLlm
                      ? llmProvider === "openai"
                        ? "OpenAI 已配置，设计方案由服务端 API 生成。"
                        : "Ollama 可访问，设计方案由本机模型经服务端转发。"
                      : undefined
                }
              />
            </aside>
          </div>
        </div>
      </BatikTextureSurface>
    </div>
  );
}
