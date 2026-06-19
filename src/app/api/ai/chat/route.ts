import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { COCO_SYSTEM_PROMPT, buildCocoMessage } from "@/lib/ai/prompts";
import { checkRateLimit } from "@/lib/ai/rate-limiter";
import { filterResponse } from "@/lib/ai/output-filter";

const FALLBACK_RESPONSES = [
  "Great job working on that! Keep trying, you're doing amazing! 🌟",
  "Hmm, that's a tricky one! Try looking at your blocks from the top down, like reading a story!",
  "You're becoming such a great coder! Want to try adding another block?",
  "I love how you're experimenting! That's what real coders do!",
  "Coding is like building with blocks — one piece at a time! You've got this!",
];

function getRandomFallback(): string {
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      childMessage,
      workspaceDescription,
      lessonTitle,
      lessonConcepts,
      executionResult,
    } = body;

    if (!sessionId || !childMessage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const rateLimit = checkRateLimit(sessionId);
    if (!rateLimit.allowed) {
      return NextResponse.json({
        message: getRandomFallback(),
        rateLimited: true,
        resetInMs: rateLimit.resetInMs,
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        message: getRandomFallback(),
        fallback: true,
      });
    }

    const client = new Anthropic({ apiKey });
    const userMessage = buildCocoMessage({
      workspaceDescription: workspaceDescription || "empty workspace",
      lessonTitle,
      lessonConcepts,
      executionResult,
      childMessage,
    });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6-20250619",
      max_tokens: 200,
      system: COCO_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const rawText =
      response.content[0].type === "text" ? response.content[0].text : "";
    const { filtered } = filterResponse(rawText);

    return NextResponse.json({
      message: filtered,
      remaining: rateLimit.remaining,
    });
  } catch {
    return NextResponse.json({
      message: getRandomFallback(),
      fallback: true,
    });
  }
}
