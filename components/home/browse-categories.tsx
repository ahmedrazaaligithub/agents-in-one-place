"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CategoryCard } from "@/components/shared/category-card";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import type { Category } from "@/lib/types";

export function BrowseCategories({
  categories,
}: {
  categories: (Category & { toolCount: number })[];
}) {
  return (
    <section className="border-y border-border/60 bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-primary">Directory</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Browse by category
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Jump straight to the kind of tool you need, from writing
              assistants to video generators.
            </p>
          </div>
          <Button variant="ghost" nativeButton={false} render={<Link href="/categories" />}>
            All categories
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <RevealItem key={category.slug}>
              <CategoryCard category={category} toolCount={category.toolCount} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
