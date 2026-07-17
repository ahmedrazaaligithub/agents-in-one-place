import Link from "next/link";
import { Star } from "lucide-react";

import type { Tool } from "@/lib/types";
import { pricingLabels, pricingClasses } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group/tool-card relative flex flex-col overflow-hidden rounded-xl bg-card p-5 text-sm ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:ring-primary/30"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary to-violet-500 text-sm font-semibold text-primary-foreground">
            {tool.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-heading font-medium text-foreground">
              {tool.name}
            </h3>
            {tool.rating && (
              <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <span>{tool.rating.toFixed(1)}</span>
                {tool.reviewCount && (
                  <span>· {tool.reviewCount.toLocaleString()} reviews</span>
                )}
              </div>
            )}
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-medium whitespace-nowrap",
            pricingClasses[tool.pricing]
          )}
        >
          {pricingLabels[tool.pricing]}
        </span>
      </div>

      <p className="mt-3 text-muted-foreground">{tool.tagline}</p>

      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover/tool-card:opacity-100">
        View details
        <span className="transition-transform duration-300 group-hover/tool-card:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  );
}
