import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getCategoryIcon } from "@/lib/icon-map";
import type { Category } from "@/lib/types";

export function CategoryCard({
  category,
  toolCount,
}: {
  category: Category;
  toolCount?: number;
}) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group/cat relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:ring-primary/30"
    >
      <div className="flex items-center justify-between">
        <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors duration-300 group-hover/cat:bg-primary group-hover/cat:text-primary-foreground">
          {/* eslint-disable-next-line react-hooks/static-components -- Icon is a stable module-level lucide component from a lookup map, not created per render */}
          <Icon className="size-5" />
        </div>
        <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover/cat:translate-x-0 group-hover/cat:opacity-100" />
      </div>

      <div>
        <h3 className="font-heading font-medium text-foreground">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {category.description}
        </p>
        {typeof toolCount === "number" && (
          <p className="mt-3 text-xs font-medium text-muted-foreground">
            {toolCount} {toolCount === 1 ? "tool" : "tools"}
          </p>
        )}
      </div>
    </Link>
  );
}
