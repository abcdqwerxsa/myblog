import { HeroSection } from "@/components/layout/HeroSection";
import { BentoGrid } from "@/components/content/BentoGrid";
import { Newsletter } from "@/components/content/Newsletter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BentoGrid />
      <Newsletter />
    </>
  );
}
