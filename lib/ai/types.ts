export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ToolRecommendation = {
  toolSlug: string;
  toolName: string;
  reason: string;
};

export type RecommendResponse = {
  message: string;
  recommendations: ToolRecommendation[];
};

export type ChatEntry = {
  id: string;
  role: ChatRole;
  content: string;
  recommendations?: ToolRecommendation[];
  isError?: boolean;
};
