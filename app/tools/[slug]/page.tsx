import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Star } from "lucide-react";

import { getTools, getToolBySlug, getToolsByCategory } from "@/lib/data/tools";
import { getCategoryBySlug } from "@/lib/data/categories";
import { pricingLabels, pricingClasses } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/shared/tool-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const tools = await getTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — Agentory`,
    description: tool.tagline,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) notFound();

  const toolCategories = (
    await Promise.all(tool.categorySlugs.map((catSlug) => getCategoryBySlug(catSlug)))
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const primaryCategory = toolCategories[0];
  const relatedTools = primaryCategory
    ? (await getToolsByCategory(primaryCategory.slug))
        .filter((t) => t.slug !== tool.slug)
        .slice(0, 3)
    : [];

  const websiteHost = (() => {
    try {
      return new URL(tool.website).hostname.replace(/^www\./, "");
    } catch {
      return tool.website;
    }
  })();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href={primaryCategory ? `/category/${primaryCategory.slug}` : "/categories"}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {primaryCategory ? primaryCategory.name : "Categories"}
      </Link>

      <Reveal className="mt-6 grid gap-8 lg:grid-cols-[1fr_18rem]">
        <div>
          <div className="flex items-start gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-violet-500 text-2xl font-semibold text-primary-foreground">
              {tool.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight">
                  {tool.name}
                </h1>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    pricingClasses[tool.pricing]
                  )}
                >
                  {pricingLabels[tool.pricing]}
                </span>
              </div>
              <p className="mt-1 text-muted-foreground">{tool.tagline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {tool.rating && (
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-foreground">
                      {tool.rating.toFixed(1)}
                    </span>
                    {tool.reviewCount && (
                      <span>({tool.reviewCount.toLocaleString()} reviews)</span>
                    )}
                  </span>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {toolCategories.map((c) => (
                    <Link key={c.slug} href={`/category/${c.slug}`}>
                      <Badge variant="outline" className="hover:bg-muted">
                        {c.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-heading text-lg font-medium">About {tool.name}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {tool.description}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-heading text-lg font-medium">Key features</h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {tool.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-fit rounded-xl bg-card p-5 ring-1 ring-foreground/10 lg:sticky lg:top-24">
          <p className="text-xs font-medium text-muted-foreground">Pricing</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold tracking-tight">
              {tool.priceFrom ?? pricingLabels[tool.pricing]}
            </span>
            {tool.priceFrom && tool.pricing !== "free" && tool.pricing !== "open-source" && (
              <span className="text-sm text-muted-foreground">starting</span>
            )}
          </p>
          <span
            className={cn(
              "mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
              pricingClasses[tool.pricing]
            )}
          >
            {pricingLabels[tool.pricing]}
          </span>

          <Button
            className="mt-5 w-full"
            nativeButton={false}
            render={
              <a href={tool.website} target="_blank" rel="noopener noreferrer" />
            }
          >
            Visit website
            <ArrowUpRight className="size-4" />
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {websiteHost}
          </p>
        </div>
      </Reveal>

      {relatedTools.length > 0 && (
        <div className="mt-16 border-t border-border/60 pt-10">
          <h2 className="text-xl font-semibold tracking-tight">
            More in {primaryCategory?.name}
          </h2>
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((t) => (
              <RevealItem key={t.slug}>
                <ToolCard tool={t} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      )}
    </div>
  );
}
