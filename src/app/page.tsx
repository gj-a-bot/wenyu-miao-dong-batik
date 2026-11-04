import { HeroSection } from "@/components/home/HeroSection";
import { CultureSection } from "@/components/home/CultureSection";
import { FeaturedPatterns } from "@/components/home/FeaturedPatterns";
import { CraftTimeline } from "@/components/home/CraftTimeline";
import { StudioCTA } from "@/components/home/StudioCTA";
import { GalleryPreview } from "@/components/home/GalleryPreview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CultureSection />
      <FeaturedPatterns />
      <CraftTimeline />
      <StudioCTA />
      <GalleryPreview />
    </>
  );
}
