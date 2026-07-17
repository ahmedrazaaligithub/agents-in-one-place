import { Hero } from "@/components/home/hero";
import { FeaturedTools } from "@/components/home/featured-tools";
import { BrowseCategories } from "@/components/home/browse-categories";
import { HowItWorks } from "@/components/home/how-it-works";
import { SocialProof } from "@/components/home/social-proof";
import { CtaBand } from "@/components/home/cta-band";
import { getFeaturedTools } from "@/lib/data/tools";
import { getCategoriesWithCounts } from "@/lib/data";

export default async function Home() {
  const [featuredTools, categories] = await Promise.all([
    getFeaturedTools(),
    getCategoriesWithCounts(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedTools tools={featuredTools} />
      <BrowseCategories categories={categories} />
      <HowItWorks />
      <SocialProof />
      <CtaBand />
    </>
  );
}
