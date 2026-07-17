import { getSupabaseClient } from "@/lib/supabase/client";
import type { PricingType, Tool } from "@/lib/types";

type ToolRow = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category_slugs: string[];
  pricing: PricingType;
  price_from: string | null;
  website: string;
  features: string[];
  featured: boolean | null;
  rating: number | null;
  review_count: number | null;
};

function mapToolRow(row: ToolRow): Tool {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    categorySlugs: row.category_slugs,
    pricing: row.pricing,
    priceFrom: row.price_from ?? undefined,
    website: row.website,
    features: row.features,
    featured: row.featured ?? undefined,
    rating: row.rating ?? undefined,
    reviewCount: row.review_count ?? undefined,
  };
}

export async function getTools(): Promise<Tool[]> {
  const { data, error } = await getSupabaseClient()
    .from("tools")
    .select("*")
    .order("name");

  if (error) throw new Error(`Failed to load tools: ${error.message}`);
  return (data as ToolRow[]).map(mapToolRow);
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const { data, error } = await getSupabaseClient()
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to load tool "${slug}": ${error.message}`);
  return data ? mapToolRow(data as ToolRow) : undefined;
}

export async function getToolsByCategory(categorySlug: string): Promise<Tool[]> {
  const { data, error } = await getSupabaseClient()
    .from("tools")
    .select("*")
    .contains("category_slugs", [categorySlug])
    .order("name");

  if (error)
    throw new Error(
      `Failed to load tools for category "${categorySlug}": ${error.message}`
    );
  return (data as ToolRow[]).map(mapToolRow);
}

export async function getFeaturedTools(): Promise<Tool[]> {
  const { data, error } = await getSupabaseClient()
    .from("tools")
    .select("*")
    .eq("featured", true)
    .order("name");

  if (error) throw new Error(`Failed to load featured tools: ${error.message}`);
  return (data as ToolRow[]).map(mapToolRow);
}

export async function searchTools(query: string): Promise<Tool[]> {
  const tools = await getTools();
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(q) ||
      tool.tagline.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.categorySlugs.some((slug) => slug.includes(q))
  );
}
