import { generateJson } from "@/lib/ai/gemini";
import { getCategories } from "@/lib/data/categories";
import { getTools } from "@/lib/data/tools";
import type { ChatMessage, RecommendResponse } from "@/lib/ai/types";
import type { Category, Tool } from "@/lib/types";

const RECOMMENDATION_SCHEMA = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description:
        "A short, friendly 1-2 sentence reply to the user, written before the recommendation list.",
    },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          toolSlug: {
            type: "string",
            description: "Must exactly match a slug from the provided dataset.",
          },
          toolName: { type: "string" },
          reason: {
            type: "string",
            description:
              "One short sentence on why this tool fits the user's specific request.",
          },
        },
        required: ["toolSlug", "toolName", "reason"],
      },
    },
  },
  required: ["message", "recommendations"],
};

function buildDatasetContext(tools: Tool[]): string {
  return tools
    .map((tool) => {
      const cats = tool.categorySlugs.join(", ");
      return `- slug: ${tool.slug} | name: ${tool.name} | categories: ${cats} | pricing: ${tool.pricing} | tagline: ${tool.tagline}`;
    })
    .join("\n");
}

function buildSystemInstruction(categories: Category[], tools: Tool[]): string {
  return [
    "You are the recommendation assistant for Agentory, a directory of AI tools.",
    "You must ONLY recommend tools from the dataset below. Never invent a tool, slug, or name that isn't listed — an unrecognized slug will be silently dropped before the user sees it, so inventing one just makes your answer worse.",
    "Recommend 2-3 tools that best fit what the user is trying to do. Each reason must be one short sentence tied specifically to their request, not a generic description.",
    "If nothing in the dataset is a good fit, return an empty recommendations array and say so in `message`.",
    `Categories available: ${categories.map((c) => c.name).join(", ")}.`,
    "Dataset (one tool per line):",
    buildDatasetContext(tools),
  ].join("\n");
}

export async function recommendTools(
  history: ChatMessage[]
): Promise<RecommendResponse> {
  const [categories, tools] = await Promise.all([getCategories(), getTools()]);

  const conversation = history
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const result = await generateJson<RecommendResponse>({
    systemInstruction: buildSystemInstruction(categories, tools),
    input: conversation,
    schema: RECOMMENDATION_SCHEMA,
  });

  const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

  const safeRecommendations = (result.recommendations ?? [])
    .filter((rec) => toolBySlug.has(rec.toolSlug))
    .slice(0, 3)
    .map((rec) => {
      const tool = toolBySlug.get(rec.toolSlug)!;
      return { toolSlug: tool.slug, toolName: tool.name, reason: rec.reason };
    });

  return {
    message: result.message ?? "",
    recommendations: safeRecommendations,
  };
}
