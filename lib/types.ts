export type PricingType = "free" | "freemium" | "paid" | "open-source";

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categorySlugs: string[];
  pricing: PricingType;
  priceFrom?: string;
  website: string;
  features: string[];
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
};
