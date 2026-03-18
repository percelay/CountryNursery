import { SectionPage } from "@/components/SectionPage";
import { getSection } from "@/lib/content";
import { HERO_IMAGES, PAGE_GALLERIES } from "@/lib/site";

export default function GardenCenterPage() {
  return (
    <SectionPage
      title="The Garden Center"
      section={getSection("garden-center")}
      heroImages={HERO_IMAGES["garden-center"]}
      galleryImages={PAGE_GALLERIES["garden-center"]}
      variant="cards"
    />
  );
}

