"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/shared/category-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { Category } from "@/lib/types";

export function CategoriesExplorer({
  categories,
}: {
  categories: (Category & { toolCount: number })[];
}) {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(q) ||
        category.description.toLowerCase().includes(q)
    );
  }, [categories, query]);

  return (
    <div>
      <div className="relative mx-auto max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search categories…"
          className="h-10 pl-9"
          aria-label="Search categories"
        />
      </div>

      {filtered.length > 0 ? (
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((category) => (
            <RevealItem key={category.slug}>
              <CategoryCard category={category} toolCount={category.toolCount} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No categories match &ldquo;{query}&rdquo;.
        </p>
      )}
    </div>
  );
}
