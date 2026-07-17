import type { PricingType } from "@/lib/types";

export const pricingLabels: Record<PricingType, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  "open-source": "Open source",
};

export const pricingClasses: Record<PricingType, string> = {
  free: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  freemium: "bg-primary/10 text-primary",
  paid: "bg-muted text-muted-foreground",
  "open-source": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};
