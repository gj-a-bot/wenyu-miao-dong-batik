"use client";

import { useState } from "react";
import {
  STUDIO_SCENES,
  STUDIO_STYLES,
  STUDIO_THEMES,
} from "@/data/studio-assets";
import type { StudioConfig, StudioDesignPlan, StudioDesignResponse } from "@/types";
import { cn } from "@/lib/cn";
import { Loader2, Sparkles } from "lucide-react";

type Props = {
  onApplyPlan: (config: StudioConfig, plan: StudioDesignPlan) => void;
  statusNotice?: string;
  isLive?: boolean;
};

export function StudioAiDesigner({ onApplyPlan, statusNotice, isLive }: Props) {
  const [prompt, setPrompt] = useState(
    "我想设计一款蝴蝶主题的苗侗蜡染风格帆布包。"
  );
  const [theme, setTheme] = useState<string>(STUDIO_THEMES[0]);
  const [scene, setScene] = useState<string>(STUDIO_SCENES[0]);
  const [style, setStyle] = useState<string>(STUDIO_STYLES[0]);
  const [palette, setPalette] = useState("靛蓝暖白蜡金");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<StudioDesignResponse | null>(null);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/studio/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, theme, scene, style, palette }),
      });
      const data = (await res.json()) as StudioDesignResponse & {
        error?: string;
      };
      if (!res.ok) throw new Error(data.error ?? "生成失败");
      setResponse(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header>
        <h2 className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.32em] text-brand-primary">
          <Sparkles size={14} className="text-brand-goldInk" />
          AI 纹样设计师
        </h2>
        <p className="mt-2 text-[11px] leading-relaxed text-brand-ink/90">
          {statusNotice ??
            "通过服务端大模型理解需求，匹配档案纹样并输出三套可渲染方案。"}
        </p>
        {isLive === false && (
          <p className="mt-2 rounded border border-dashed border-brand-gold/50 bg-brand-gold/5 px-2 py-1.5 text-[10px] text-brand-goldInk">
            当前为演示模式：未配置 OPENAI_API_KEY 且 Ollama 不可用时，方案由档案匹配生成（已标注，非伪装 AI）。
          </p>
        )}
        {isLive === true && (
          <p className="mt-2 text-[10px] text-brand-secondary">
            已检测到可用的 AI 服务（密钥仅在服务端使用）。
          </p>
        )}
      </header>

      <label className="mt-4 block text-[10px] uppercase tracking-[0.25em] text-brand-goldInk">
        创作需求
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="mt-1 w-full resize-none border border-brand-border bg-brand-paper/80 px-3 py-2 text-sm text-brand-ink outline-none focus:border-brand-gold"
          placeholder="描述主题、用途与想要的蜡染气质…"
        />
      </label>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
        <SelectField label="主题" value={theme} onChange={setTheme} options={[...STUDIO_THEMES]} />
        <SelectField label="场景" value={scene} onChange={setScene} options={[...STUDIO_SCENES]} />
        <SelectField label="风格" value={style} onChange={setStyle} options={[...STUDIO_STYLES]} />
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-secondary">配色</span>
          <input
            value={palette}
            onChange={(e) => setPalette(e.target.value)}
            className="mt-0.5 w-full border border-brand-border bg-brand-paper/80 px-2 py-1.5 text-brand-ink"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={generate}
        disabled={loading || !prompt.trim()}
        className="mt-4 w-full bg-brand-primary py-3 text-xs tracking-[0.2em] text-brand-warm hover:bg-brand-primary/90 disabled:opacity-60"
      >
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 size={14} className="animate-spin" /> 生成三套方案…
          </span>
        ) : (
          "生成设计方案"
        )}
      </button>

      {error && (
        <p className="mt-3 text-xs text-red-800" role="alert">
          {error}
        </p>
      )}

      {response && (
        <div className="mt-4 flex-1 space-y-3 overflow-y-auto pb-2">
          <p
            className={cn(
              "text-[10px] leading-relaxed",
              response.mode === "demo" ? "text-brand-goldInk" : "text-brand-secondary"
            )}
          >
            {response.notice}
          </p>
          {response.plans.map((plan) => (
            <article
              key={plan.id}
              className="border border-brand-border bg-brand-paper/60 p-3"
            >
              <h3 className="font-serif text-sm text-brand-primary">{plan.title}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-brand-ink">
                {plan.composition}
              </p>
              {plan.matchedPatternIds.length > 0 && (
                <p className="mt-1 text-[10px] text-brand-secondary">
                  档案匹配：{plan.matchedPatternIds.join(" · ")}
                </p>
              )}
              <button
                type="button"
                onClick={() => onApplyPlan(plan.config, plan)}
                className="mt-2 w-full border border-brand-primary py-2 text-[11px] text-brand-primary hover:bg-brand-primary hover:text-brand-warm"
              >
                应用到画布
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-brand-secondary">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full border border-brand-border bg-brand-paper/80 px-2 py-1.5 text-brand-ink"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
