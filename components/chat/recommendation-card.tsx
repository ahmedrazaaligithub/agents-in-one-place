import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ToolRecommendation } from "@/lib/ai/types";

export function RecommendationCard({
  recommendation,
}: {
  recommendation: ToolRecommendation;
}) {
  return (
    <Link
      href={`/tools/${recommendation.toolSlug}`}
      className="group/rec flex items-start gap-2.5 rounded-lg bg-background p-3 ring-1 ring-foreground/10 transition-colors hover:ring-primary/30"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-primary to-violet-500 text-xs font-semibold text-primary-foreground">
        {recommendation.toolName.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">
          {recommendation.toolName}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {recommendation.reason}
        </p>
      </div>
      <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/rec:opacity-100" />
    </Link>
  );
}
