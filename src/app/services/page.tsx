import { SectionPage } from "@/components/SectionPage";
import { getSection } from "@/lib/content";
import { HERO_IMAGES, PAGE_GALLERIES } from "@/lib/site";

export default function ServicesPage() {
  return (
    <SectionPage
      title="Services"
      section={getSection("services")}
      heroImages={HERO_IMAGES.services}
      galleryImages={PAGE_GALLERIES.services}
      variant="cards"
    />
  );
}

