"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
      <Reveal className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-violet-600 to-fuchsia-600 px-8 py-16 text-center text-primary-foreground sm:px-16">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]"
          animate={{
            backgroundPosition: ["50% 0%", "60% 20%", "40% 10%", "50% 0%"],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-1/2 opacity-40"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.15) 20%, transparent 40%)",
          }}
        />
        <h2 className="relative text-2xl font-semibold tracking-tight sm:text-3xl">
          Stop searching. Start building.
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/80">
          Browse the full directory of AI tools and find the one that fits
          your workflow today.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant="secondary"
            className="h-11 px-6"
            nativeButton={false}
            render={<Link href="/search" />}
          >
            Explore all tools
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
