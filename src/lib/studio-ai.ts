import {
  DEFAULT_STUDIO_CONFIG,
  layoutPresets,
  presetPalettes,
  studioAssets,
} from "@/data/studio-assets";
import { patterns } from "@/lib/data";
import { matchPatternsForBrief } from "@/lib/studio-pattern-match";
import { normalizeStudioConfig } from "@/lib/studio-canvas";
import { checkOllamaReachable, ollamaChat } from "@/lib/ollama";
import type { StudioDesignBrief, StudioDesignPlan, StudioDesignResponse } from "@/types";

export type LlmProvider = "openai" | "ollama" | null;

export function resolveLlmProvider(): LlmProvider {
  if (process.env.OPENAI_API_KEY?.trim()) return "openai";
  if (process.env.OLLAMA_BASE_URL || process.env.OLLAMA_MODEL) return "ollama";
  return "ollama";
}

export function hasLiveLlmConfigured(): boolean {
  if (process.env.OPENAI_API_KEY?.trim()) return true;
  return Boolean(process.env.OLLAMA_BASE_URL);
}

const ASSET_BY_PATTERN: Record<string, string> = {
  "motif-butterfly-type": "asset-petal",
  "motif-fish-type": "asset-wave",
  "motif-spiral-type": "asset-wave",
  "geo-rhombus-weave": "asset-rhombus",
  "symmetry-eight-petal": "asset-petal",
  "line-spiral-flow": "asset-wave",
  "abstract-indigo-mist": "asset-blob",
  "geo-fish-bone": "asset-cross",
  "line-cross-stitch": "asset-cross",
};

function configFromLayout(
  layoutIndex: number,
  paletteIndex: number,
  assetId: string,
  waxBoost = 0
): StudioDesignPlan["config"] {
  const layout = layoutPresets[layoutIndex % layoutPresets.length];
  const palette = presetPalettes[paletteIndex % presetPalettes.length];
  return normalizeStudioConfig({
    assetId,
    primaryColor: palette.primary,
    backgroundColor: palette.background,
    accentColor: palette.accent,
    repeatX: layout.repeatX,
    repeatY: layout.repeatY,
    scale: layout.scale,
    spacing: layout.spacing,
    rotation: layoutIndex === 1 ? 12 : layoutIndex === 2 ? -8 : 0,
    waxCrackle: 0.22 + waxBoost,
    waxBleed: 0.28 + waxBoost * 0.5,
  });
}

export function generateDemoDesignPlans(
  brief: StudioDesignBrief
): StudioDesignResponse {
  const matched = matchPatternsForBrief(brief);
  const fallbackIds = ["motif-butterfly-type", "geo-rhombus-weave", "symmetry-eight-petal"];
  const patternIds =
    matched.length > 0
      ? matched.map((p) => p.id)
      : fallbackIds.filter((id) => patterns.some((p) => p.id === id));

  const plans: StudioDesignPlan[] = [
    {
      id: "demo-a",
      title: "方案 A · 聚焦中心",
      composition: "单点放大，适合海报与手机壁纸，强调主纹样与大量留白。",
      matchedPatternIds: patternIds.slice(0, 2),
      config: configFromLayout(
        0,
        0,
        ASSET_BY_PATTERN[patternIds[0]] ?? "asset-rhombus",
        0.05
      ),
    },
    {
      id: "demo-b",
      title: "方案 B · 三联节奏",
      composition: "横向重复，适合帆布包与围巾，纹样沿肩带方向延展。",
      matchedPatternIds: patternIds.slice(0, 3),
      config: configFromLayout(
        1,
        2,
        ASSET_BY_PATTERN[patternIds[1] ?? patternIds[0]] ?? "asset-wave",
        0.1
      ),
    },
    {
      id: "demo-c",
      title: "方案 C · 细密蜡染",
      composition: "矩阵平铺并提高蜡纹模拟，适合书签与包装纸。",
      matchedPatternIds: patternIds,
      config: configFromLayout(
        2,
        1,
        ASSET_BY_PATTERN[patternIds[2] ?? patternIds[0]] ?? "asset-petal",
        0.18
      ),
    },
  ];

  return {
    mode: "demo",
    notice:
      "【演示模式】未检测到可用的 OPENAI_API_KEY 或 Ollama 服务，以下为基于档案匹配与布局预设的规则方案，非大模型生成。配置密钥后即可使用真实 AI。",
    plans,
  };
}

function buildDesignPrompt(brief: StudioDesignBrief): string {
  const matched = matchPatternsForBrief(brief);
  const assetList = studioAssets.map((a) => `${a.id}:${a.name}`).join(", ");
  const patternList = matched.map((p) => `${p.id}:${p.name}`).join("; ") || "无";

  return `用户需求：${brief.prompt}
主题：${brief.theme ?? "未指定"}
场景：${brief.scene ?? "未指定"}
风格：${brief.style ?? "苗侗蜡染"}
配色倾向：${brief.palette ?? "靛蓝暖白蜡金"}

可用画布素材 ID：${assetList}
匹配的纹样档案：${patternList}

请以 JSON 返回，不要 markdown，格式：
{
  "plans": [
    {
      "id": "plan-1",
      "title": "方案标题",
      "composition": "构图说明",
      "matchedPatternIds": ["pattern-id"],
      "config": {
        "assetId": "asset-rhombus",
        "primaryColor": "#173B50",
        "backgroundColor": "#F5F1E8",
        "accentColor": "#C49A62",
        "scale": 0.8,
        "rotation": 0,
        "repeatX": 3,
        "repeatY": 3,
        "spacing": 10,
        "waxCrackle": 0.3,
        "waxBleed": 0.3
      }
    }
  ]
}
必须正好 3 个方案。assetId 只能从可用列表中选择。`;
}

async function callOpenAiDesign(prompt: string): Promise<string> {
  const key = process.env.OPENAI_API_KEY!;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content:
            "你是纹语 WENYU 纹样设计师，输出严格 JSON，方案需可映射到 Canvas 参数。",
        },
        { role: "user", content: prompt },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`OpenAI ${res.status}: ${t.slice(0, 200)}`);
  }
  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

function parsePlansJson(raw: string): StudioDesignPlan[] {
  const cleaned = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "");
  const parsed = JSON.parse(cleaned) as {
    plans?: StudioDesignPlan[];
  };
  if (!parsed.plans?.length) throw new Error("模型未返回 plans");
  return parsed.plans.slice(0, 3).map((p, i) => ({
    id: p.id || `live-${i + 1}`,
    title: p.title || `方案 ${i + 1}`,
    composition: p.composition || "",
    matchedPatternIds: p.matchedPatternIds ?? [],
    config: normalizeStudioConfig(p.config),
  }));
}

export async function generateStudioDesigns(
  brief: StudioDesignBrief
): Promise<StudioDesignResponse> {
  const useOpenAi = Boolean(process.env.OPENAI_API_KEY?.trim());

  if (!useOpenAi) {
    const reachable = await checkOllamaReachable();
    if (!reachable.ok) {
      return generateDemoDesignPlans(brief);
    }
  }

  const prompt = buildDesignPrompt(brief);
  let raw: string;

  try {
    if (useOpenAi) {
      raw = await callOpenAiDesign(prompt);
    } else {
      raw = await ollamaChat([
        {
          role: "system",
          content: "只输出 JSON，不要解释文字。",
        },
        { role: "user", content: prompt },
      ]);
    }
    const plans = parsePlansJson(raw);
    return {
      mode: "live",
      provider: useOpenAi ? "openai" : "ollama",
      notice: useOpenAi
        ? "由 OpenAI 模型生成设计方案（服务端调用）。"
        : "由本机 Ollama 生成设计方案（服务端调用）。",
      plans,
    };
  } catch {
    const demo = generateDemoDesignPlans(brief);
    demo.notice = `模型调用失败，已回退演示模式。${demo.notice}`;
    return demo;
  }
}
