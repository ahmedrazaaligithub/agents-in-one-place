"use client";

import { Search, SlidersHorizontal, Rocket } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const steps = [
  {
    icon: Search,
    title: "Search or browse",
    description:
      "Look up a task or explore categories like writing, coding, or video to see what's available.",
  },
  {
    icon: SlidersHorizontal,
    title: "Compare tools",
    description:
      "Check pricing, features, and ratings side by side to see what actually fits your workflow.",
  },
  {
    icon: Rocket,
    title: "Start building",
    description:
      "Head straight to the tool's site with a clear picture of what it does and what it costs.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-primary">How it works</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Three steps to your next favorite tool
        </h2>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <RevealItem key={step.title} className="relative text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <step.icon className="size-5" />
            </div>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">
                Step {i + 1}
              </span>
            </div>
            <h3 className="mt-2 font-heading font-medium">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
              {step.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
