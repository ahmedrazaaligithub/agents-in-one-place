"use client";

import { Quote } from "lucide-react";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const stats = [
  { value: "500+", label: "AI tools listed" },
  { value: "11", label: "Categories" },
  { value: "50k+", label: "Monthly searches" },
  { value: "4.6", label: "Avg. tool rating" },
];

const testimonials = [
  {
    quote:
      "I used to have a dozen bookmarks and half of them were dead ends. Now I just check the category page and compare in one place.",
    name: "Priya Nair",
    role: "Product Designer",
  },
  {
    quote:
      "The category breakdown alone saved our team hours of research when we were picking a video generation tool.",
    name: "Marcus Webb",
    role: "Marketing Lead",
  },
  {
    quote:
      "Clean, fast, and it actually tells you what something costs before you click through. Rare for this space.",
    name: "Sofia Álvarez",
    role: "Indie Developer",
  },
];

export function SocialProof() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <RevealGroup className="grid grid-cols-2 gap-6 border-b border-border/60 pb-16 sm:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mx-auto mt-16 max-w-2xl text-center">
        <p className="text-sm font-medium text-primary">Loved by builders</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          What people are saying
        </h2>
      </Reveal>

      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3">
        {testimonials.map((t) => (
          <RevealItem
            key={t.name}
            className="flex flex-col rounded-xl bg-card p-6 ring-1 ring-foreground/10"
          >
            <Quote className="size-5 text-primary/40" />
            <p className="mt-3 flex-1 text-sm text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-primary to-violet-500 text-xs font-semibold text-primary-foreground">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
