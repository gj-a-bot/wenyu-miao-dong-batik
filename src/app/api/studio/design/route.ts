import { generateStudioDesigns } from "@/lib/studio-ai";
import type { StudioDesignBrief } from "@/types";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as StudioDesignBrief;
    if (!body?.prompt?.trim()) {
      return NextResponse.json(
        { error: "请填写创作需求描述。" },
        { status: 400 }
      );
    }
    const brief: StudioDesignBrief = {
      prompt: body.prompt.trim(),
      theme: body.theme,
      scene: body.scene,
      style: body.style,
      palette: body.palette,
    };
    const result = await generateStudioDesigns(brief);
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "设计生成失败";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
