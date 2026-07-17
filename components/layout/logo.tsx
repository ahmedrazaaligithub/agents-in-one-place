import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2 font-semibold tracking-tight ${className ?? ""}`}
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-12">
        <Sparkles className="size-4" />
      </span>
      <span className="text-base">Agentory</span>
    </Link>
  );
}
