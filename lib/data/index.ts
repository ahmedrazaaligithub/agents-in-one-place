export * from "@/lib/types";
export * from "@/lib/data/categories";
export * from "@/lib/data/tools";

import { getCategories } from "@/lib/data/categories";
import { getTools } from "@/lib/data/tools";
import type { Category, Tool } from "@/lib/types";

export function getCategoryToolCount(categorySlug: string, tools: Tool[]): number {
  return tools.filter((tool) => tool.categorySlugs.includes(categorySlug)).length;
}

export async function getCategoriesWithCounts(): Promise<
  (Category & { toolCount: number })[]
> {
  const [categories, tools] = await Promise.all([getCategories(), getTools()]);
  return categories.map((category) => ({
    ...category,
    toolCount: getCategoryToolCount(category.slug, tools),
  }));
}
