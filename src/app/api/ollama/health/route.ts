import { NextResponse } from "next/server";
import { checkOllamaReachable, getOllamaConfig } from "@/lib/ollama";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** 检测本机 / 配置的 Ollama 是否可达 */
export async function GET() {
  const { baseUrl, model } = getOllamaConfig();
  const result = await checkOllamaReachable();
  return NextResponse.json({
    ...result,
    baseUrl,
    configuredModel: model,
  });
}
