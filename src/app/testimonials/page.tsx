import { SectionPage } from "@/components/SectionPage";
import { getSection } from "@/lib/content";
import { HERO_IMAGES, PAGE_GALLERIES } from "@/lib/site";

export default function TestimonialsPage() {
  return (
    <SectionPage
      title="Testimonials"
      section={getSection("testimonials")}
      heroImages={HERO_IMAGES.testimonials}
      galleryImages={PAGE_GALLERIES.testimonials}
      variant="quotes"
    />
  );
}

