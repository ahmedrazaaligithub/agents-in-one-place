import { NextResponse } from "next/server";

import { recommendTools } from "@/lib/ai/recommend";
import type { ChatMessage } from "@/lib/ai/types";

const MAX_HISTORY = 12;

export async function POST(request: Request) {
  let body: { history?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY) : [];
  const lastMessage = history[history.length - 1];

  if (!lastMessage || lastMessage.role !== "user" || !lastMessage.content?.trim()) {
    return NextResponse.json(
      { error: "A user message is required." },
      { status: 400 }
    );
  }

  try {
    const result = await recommendTools(history);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[/api/recommend] failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
