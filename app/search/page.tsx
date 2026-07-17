import type { Metadata } from "next";

import { SearchExplorer } from "@/components/search/search-explorer";
import { getTools } from "@/lib/data/tools";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Explore tools — Agentory",
  description:
    "Search and filter every AI tool in the directory by category and pricing.",
};

export default async function SearchPage() {
  const [tools, categories] = await Promise.all([getTools(), getCategories()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-primary">Explore</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Find your next AI tool
        </h1>
        <p className="mt-3 text-muted-foreground">
          Search {tools.length}+ tools, or filter by category and pricing.
        </p>
      </div>

      <div className="mt-10">
        <SearchExplorer tools={tools} categories={categories} />
      </div>
    </div>
  );
}
