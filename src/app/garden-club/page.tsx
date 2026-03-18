import { SectionPage } from "@/components/SectionPage";
import { getSection } from "@/lib/content";
import { HERO_IMAGES, PAGE_GALLERIES } from "@/lib/site";

export default function GardenClubPage() {
  return (
    <SectionPage
      title="Garden Club"
      section={getSection("garden-club")}
      heroImages={HERO_IMAGES["garden-club"]}
      galleryImages={PAGE_GALLERIES["garden-club"]}
      variant="cards"
    />
  );
}

