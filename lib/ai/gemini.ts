const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
// gemini-3.5-flash is frequently overloaded ("high demand") on the free tier;
// flash-lite is a smaller/cheaper model in the same family with far more free headroom.
const DEFAULT_MODEL = "gemini-3.1-flash-lite";
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1500;

type JsonSchema = Record<string, unknown>;

type GenerateJsonOptions = {
  systemInstruction: string;
  input: string;
  schema: JsonSchema;
  temperature?: number;
};

type InteractionStep = {
  type: string;
  content?: { type: string; text?: string }[];
};

type InteractionsApiResponse = {
  steps?: InteractionStep[];
};

/**
 * Thin wrapper around Gemini's Interactions API (generateContent's successor).
 * This is the ONLY file that should know about Gemini's request/response shape —
 * swapping providers later means rewriting this file, not its callers.
 */
export async function generateJson<T>({
  systemInstruction,
  input,
  schema,
  temperature = 0.4,
}: GenerateJsonOptions): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to .env.local (see .env.local.example)."
    );
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const requestBody = JSON.stringify({
    model,
    system_instruction: systemInstruction,
    input,
    generation_config: { temperature },
    response_format: {
      type: "text",
      mime_type: "application/json",
      schema,
    },
  });

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "x-goog-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        const retryable = res.status === 500 || res.status === 503;
        if (retryable && attempt < MAX_ATTEMPTS) {
          await sleep(RETRY_DELAY_MS * attempt);
          continue;
        }
        throw new Error(`Gemini API error ${res.status}: ${errorText}`);
      }

      const data: InteractionsApiResponse = await res.json();
      const raw = extractOutputText(data);
      if (!raw) {
        throw new Error("Gemini response did not include a text output");
      }

      return JSON.parse(stripMarkdownFences(raw)) as T;
    } catch (error) {
      lastError = error;
      if (attempt >= MAX_ATTEMPTS) break;
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function extractOutputText(data: InteractionsApiResponse): string | undefined {
  const modelOutput = data.steps?.find((step) => step.type === "model_output");
  return modelOutput?.content
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripMarkdownFences(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenceMatch ? fenceMatch[1].trim() : trimmed;
}
