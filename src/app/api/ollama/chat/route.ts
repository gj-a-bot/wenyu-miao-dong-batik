import { NextResponse } from "next/server";
import { buildStudioAssistMessages, ollamaChat } from "@/lib/ollama";
import type { StudioConfig } from "@/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ChatBody = {
  /** 共创实验室：传当前画布参数 */
  studio?: { config: StudioConfig; title?: string };
  /** 通用对话（可选） */
  messages?: { role: "user" | "assistant"; content: string }[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatBody;

    let messages;
    if (body.studio?.config) {
      messages = buildStudioAssistMessages(
        body.studio.config,
        body.studio.title ?? ""
      );
    } else if (body.messages?.length) {
      messages = [
        {
          role: "system" as const,
          content:
            "你是纹语 WENYU 苗侗蜡染数字文化项目的助手，回答简洁准确，不捏造文献与非遗认证信息。",
        },
        ...body.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ];
    } else {
      return NextResponse.json(
        { error: "请提供 studio 或 messages 参数" },
        { status: 400 }
      );
    }

    const reply = await ollamaChat(messages);
    return NextResponse.json({ reply });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Ollama 调用失败";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
