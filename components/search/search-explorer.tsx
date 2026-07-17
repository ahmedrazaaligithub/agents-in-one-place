"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/shared/tool-card";
import { getCategoryIcon } from "@/lib/icon-map";
import { pricingLabels } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { Category, PricingType, Tool } from "@/lib/types";

const pricingOptions = Object.keys(pricingLabels) as PricingType[];

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function SearchExplorer({
  tools,
  categories,
}: {
  tools: Tool[];
  categories: Category[];
}) {
  const [query, setQuery] = React.useState("");
  const [activeCategories, setActiveCategories] = React.useState<string[]>([]);
  const [activePricing, setActivePricing] = React.useState<PricingType[]>([]);

  const toggleCategory = (slug: string) =>
    setActiveCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );

  const togglePricing = (pricing: PricingType) =>
    setActivePricing((prev) =>
      prev.includes(pricing)
        ? prev.filter((p) => p !== pricing)
        : [...prev, pricing]
    );

  const clearFilters = () => {
    setQuery("");
    setActiveCategories([]);
    setActivePricing([]);
  };

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q);
      const matchesCategory =
        activeCategories.length === 0 ||
        tool.categorySlugs.some((c) => activeCategories.includes(c));
      const matchesPricing =
        activePricing.length === 0 || activePricing.includes(tool.pricing);
      return matchesQuery && matchesCategory && matchesPricing;
    });
  }, [tools, query, activeCategories, activePricing]);

  const hasActiveFilters =
    query.length > 0 || activeCategories.length > 0 || activePricing.length > 0;

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, task, or feature…"
          className="h-11 pl-9 text-base"
          aria-label="Search tools"
        />
      </div>

      <div className="mx-auto mt-6 flex max-w-4xl flex-col gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.icon);
            const active = activeCategories.includes(category.slug);
            return (
              <FilterPill
                key={category.slug}
                active={active}
                onClick={() => toggleCategory(category.slug)}
              >
                <Icon className="size-3.5" />
                {category.name}
              </FilterPill>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {pricingOptions.map((pricing) => (
            <FilterPill
              key={pricing}
              active={activePricing.includes(pricing)}
              onClick={() => togglePricing(pricing)}
            >
              {pricingLabels[pricing]}
            </FilterPill>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "tool" : "tools"} found
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <motion.div
          layout
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence initial={false}>
            {filtered.map((tool) => (
              <motion.div
                key={tool.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No tools match your search. Try a different keyword or clear your
          filters.
        </p>
      )}
    </div>
  );
}
