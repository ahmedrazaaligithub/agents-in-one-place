import { motion } from "framer-motion";

import { RecommendationCard } from "@/components/chat/recommendation-card";
import type { ChatEntry } from "@/lib/ai/types";
import { cn } from "@/lib/utils";

export function ChatMessageBubble({ entry }: { entry: ChatEntry }) {
  const isUser = entry.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div className={cn("max-w-[85%]", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
            isUser
              ? "rounded-br-sm bg-primary text-primary-foreground"
              : entry.isError
                ? "rounded-bl-sm bg-destructive/10 text-destructive"
                : "rounded-bl-sm bg-muted text-foreground"
          )}
        >
          {entry.content}
        </div>

        {entry.recommendations && entry.recommendations.length > 0 && (
          <div className="mt-2 flex w-full flex-col gap-2">
            {entry.recommendations.map((rec) => (
              <RecommendationCard key={rec.toolSlug} recommendation={rec} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
