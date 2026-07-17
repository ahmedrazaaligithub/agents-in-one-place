import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getCategories, getCategoryBySlug } from "@/lib/data/categories";
import { getToolsByCategory } from "@/lib/data/tools";
import { getCategoryIcon } from "@/lib/icon-map";
import { ToolCard } from "@/components/shared/tool-card";
import { Badge } from "@/components/ui/badge";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} AI tools — Agentory`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const [categoryTools, allCategories] = await Promise.all([
    getToolsByCategory(slug),
    getCategories(),
  ]);
  const Icon = getCategoryIcon(category.icon);
  const otherCategories = allCategories.filter((c) => c.slug !== slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All categories
      </Link>

      <Reveal className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {/* eslint-disable-next-line react-hooks/static-components -- Icon is a stable module-level lucide component from a lookup map, not created per render */}
            <Icon className="size-7" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {category.name}
            </h1>
            <p className="mt-1 max-w-xl text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="h-6 w-fit shrink-0 px-3 text-sm">
          {categoryTools.length} {categoryTools.length === 1 ? "tool" : "tools"}
        </Badge>
      </Reveal>

      {categoryTools.length > 0 ? (
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool) => (
            <RevealItem key={tool.slug}>
              <ToolCard tool={tool} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No tools listed in this category yet.
        </p>
      )}

      <div className="mt-16 border-t border-border/60 pt-8">
        <h2 className="text-sm font-medium text-muted-foreground">
          Explore other categories
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {otherCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-full bg-muted px-3.5 py-1.5 text-sm text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
