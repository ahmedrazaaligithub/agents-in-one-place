import type { Metadata } from "next";

import { CategoriesExplorer } from "@/components/categories/categories-explorer";
import { AnimatedBackground } from "@/components/motion/animated-background";
import { getCategoriesWithCounts } from "@/lib/data";
import { getTools } from "@/lib/data/tools";

export const metadata: Metadata = {
  title: "Categories — Agentory",
  description:
    "Browse every AI tool category, from writing and coding to image generation, video, and productivity.",
};

export default async function CategoriesPage() {
  const [categories, tools] = await Promise.all([
    getCategoriesWithCounts(),
    getTools(),
  ]);

  return (
    <div className="relative">
      <AnimatedBackground className="opacity-60" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Directory</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            Browse every category
          </h1>
          <p className="mt-3 text-muted-foreground">
            {categories.length} categories covering {tools.length}+ AI tools
            — find the kind of tool you need, then compare the options
            inside.
          </p>
        </div>

        <div className="mt-10">
          <CategoriesExplorer categories={categories} />
        </div>
      </div>
    </div>
  );
}
