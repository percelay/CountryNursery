import { SectionPage } from "@/components/SectionPage";
import { getSection } from "@/lib/content";
import { HERO_IMAGES, PAGE_GALLERIES } from "@/lib/site";

export default function PortfolioPage() {
  return (
    <SectionPage
      title="Portfolio"
      section={getSection("portfolio")}
      heroImages={HERO_IMAGES.portfolio}
      galleryImages={PAGE_GALLERIES.portfolio}
      variant="default"
    />
  );
}

