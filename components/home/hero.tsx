"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Search, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/motion/animated-background";

const EASE = [0.22, 1, 0.36, 1] as const;

const previewRows = [
  { name: "Claude", tag: "Chatbots", color: "from-primary to-violet-500" },
  { name: "Midjourney", tag: "Image Generation", color: "from-violet-500 to-fuchsia-500" },
  { name: "Runway", tag: "Video", color: "from-violet-600 to-primary" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AnimatedBackground />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-28 lg:pb-32 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-primary/15"
          >
            <Sparkles className="size-3.5" />
            500+ AI tools, organized in one place
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
          >
            Find the right{" "}
            <span className="bg-linear-to-r from-primary via-violet-500 to-primary bg-clip-text text-transparent">
              AI tool
            </span>{" "}
            for the job.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg"
          >
            Agentory is a curated directory of AI agents and tools — writing,
            coding, image and video generation, productivity, and more — so
            you can stop searching and start building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="h-11 px-6" nativeButton={false} render={<Link href="/search" />}>
              <Search className="size-4" />
              Explore tools
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6"
              nativeButton={false}
              render={<Link href="/categories" />}
            >
              Browse categories
              <ArrowRight className="size-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          >
            <div>
              <span className="font-heading text-lg font-semibold text-foreground">
                500+
              </span>{" "}
              tools
            </div>
            <div>
              <span className="font-heading text-lg font-semibold text-foreground">
                11
              </span>{" "}
              categories
            </div>
            <div>
              <span className="font-heading text-lg font-semibold text-foreground">
                50k+
              </span>{" "}
              monthly searches
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl bg-card p-3 shadow-2xl shadow-primary/10 ring-1 ring-foreground/10"
          >
            <div className="flex items-center gap-1.5 px-2 pt-1 pb-3">
              <span className="size-2.5 rounded-full bg-destructive/50" />
              <span className="size-2.5 rounded-full bg-amber-400/60" />
              <span className="size-2.5 rounded-full bg-emerald-400/60" />
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground ring-1 ring-border">
              <Search className="size-4" />
              Search 500+ AI tools…
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {previewRows.map((row, i) => (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE }}
                  className="flex items-center gap-3 rounded-lg p-2.5 ring-1 ring-foreground/5 hover:bg-muted/50"
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-md bg-linear-to-br ${row.color} text-xs font-semibold text-white`}
                  >
                    {row.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {row.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {row.tag}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    4.{7 - i}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-6 -right-4 hidden rounded-xl bg-card px-3 py-2 text-xs font-medium shadow-lg ring-1 ring-foreground/10 sm:flex sm:items-center sm:gap-1.5"
          >
            <Sparkles className="size-3.5 text-primary" />
            Updated weekly
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
