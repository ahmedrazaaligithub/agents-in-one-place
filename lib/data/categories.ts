import { getSupabaseClient } from "@/lib/supabase/client";
import type { Category } from "@/lib/types";

type CategoryRow = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

function mapCategoryRow(row: CategoryRow): Category {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    icon: row.icon,
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await getSupabaseClient()
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw new Error(`Failed to load categories: ${error.message}`);
  return (data as CategoryRow[]).map(mapCategoryRow);
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const { data, error } = await getSupabaseClient()
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to load category "${slug}": ${error.message}`);
  return data ? mapCategoryRow(data as CategoryRow) : undefined;
}
