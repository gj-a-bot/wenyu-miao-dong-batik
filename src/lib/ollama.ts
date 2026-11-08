import type { StudioConfig } from "@/types";

const DEFAULT_BASE = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "qwen2.5:7b";

export function getOllamaConfig() {
  const baseUrl = (process.env.OLLAMA_BASE_URL ?? DEFAULT_BASE).replace(/\/$/, "");
  const model = process.env.OLLAMA_MODEL ?? DEFAULT_MODEL;
  return { baseUrl, model };
}

type OllamaMessage = { role: "system" | "user" | "assistant"; content: string };

export async function ollamaChat(messages: OllamaMessage[]): Promise<string> {
  const { baseUrl, model } = getOllamaConfig();
  const res = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, stream: false }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(
      `Ollama 请求失败 (${res.status})${errText ? `：${errText.slice(0, 200)}` : ""}`
    );
  }

  const data = (await res.json()) as { message?: { content?: string } };
  const content = data.message?.content?.trim();
  if (!content) throw new Error("Ollama 未返回有效内容");
  return content;
}

export async function checkOllamaReachable(): Promise<{
  ok: boolean;
  model?: string;
  models?: string[];
  error?: string;
}> {
  const { baseUrl, model } = getOllamaConfig();
  try {
    const res = await fetch(`${baseUrl}/api/tags`, { cache: "no-store" });
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as {
      models?: { name: string }[];
    };
    const models = data.models?.map((m) => m.name) ?? [];
    const hasModel =
      models.length === 0 ||
      models.some((n) => n === model || n.startsWith(`${model}:`));
    return {
      ok: true,
      model,
      models,
      error: hasModel ? undefined : `未找到模型「${model}」，请先 ollama pull ${model}`,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "无法连接 Ollama",
    };
  }
}

export function buildStudioAssistMessages(
  config: StudioConfig,
  title: string
): OllamaMessage[] {
  const userBlock = [
    `作品名称：${title || "未命名"}`,
    `素材 ID：${config.assetId}`,
    `主色 ${config.primaryColor}，点缀 ${config.accentColor}，背景 ${config.backgroundColor}`,
    `尺度 ${config.scale}，旋转 ${config.rotation}°`,
    `重复 ${config.repeatX}×${config.repeatY}，间距 ${config.spacing}px，偏移 (${config.offsetX}, ${config.offsetY})`,
    "",
    "请用中文简短回答（3～6 条要点即可）：",
    "1. 针对蜡染/苗侗纹样意境的配色或排列微调建议",
    "2. 如何增强留白与靛蓝对比",
    "3. 若适合做展览标题，给 1 个命名备选",
    "不要编造非遗史实；说明这是数字创作实验。",
  ].join("\n");

  return [
    {
      role: "system",
      content:
        "你是纹语 WENYU 数字纹样共创实验室的辅助顾问，熟悉蜡染靛蓝、留白与对称纹样。回答简洁、可执行，面向界面上的参数调整。",
    },
    { role: "user", content: userBlock },
  ];
}
