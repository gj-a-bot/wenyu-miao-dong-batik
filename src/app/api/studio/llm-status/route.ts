import { hasLiveLlmConfigured, resolveLlmProvider } from "@/lib/studio-ai";
import { checkOllamaReachable } from "@/lib/ollama";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const openAi = Boolean(process.env.OPENAI_API_KEY?.trim());
  const provider = resolveLlmProvider();
  let ollamaOk = false;
  let ollamaError: string | undefined;

  if (!openAi) {
    const check = await checkOllamaReachable();
    ollamaOk = check.ok;
    ollamaError = check.error;
  }

  return NextResponse.json({
    openAiConfigured: openAi,
    ollamaReachable: ollamaOk,
    ollamaError,
    provider: openAi ? "openai" : ollamaOk ? "ollama" : null,
    hasLiveLlm: openAi || ollamaOk,
    envConfigured: hasLiveLlmConfigured(),
    demoFallback: !openAi && !ollamaOk,
  });
}
