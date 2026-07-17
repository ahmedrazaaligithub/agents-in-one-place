"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ToolCard } from "@/components/shared/tool-card";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/reveal";
import type { Tool } from "@/lib/types";

export function FeaturedTools({ tools }: { tools: Tool[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Trending now</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Featured AI tools
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            A snapshot of what builders are using right now, hand-picked
            across categories.
          </p>
        </div>
        <Button variant="ghost" nativeButton={false} render={<Link href="/search" />}>
          View all tools
          <ArrowRight className="size-4" />
        </Button>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <RevealItem key={tool.slug}>
            <ToolCard tool={tool} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
