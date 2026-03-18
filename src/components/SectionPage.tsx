import { ArrowRight, PhoneCall } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/Button";
import { ContentRenderer } from "@/components/ContentRenderer";
import { ImageGallery } from "@/components/ImageGallery";
import { ImageMosaic } from "@/components/ImageMosaic";
import { splitSectionBlocks, type SectionData } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/site";

interface SectionPageProps {
  title: string;
  section: SectionData;
  heroImages: string[];
  galleryImages?: string[];
  variant?: "default" | "cards" | "quotes";
  children?: ReactNode;
}

export function SectionPage({
  title,
  section,
  heroImages,
  galleryImages = [],
  variant = "default",
  children,
}: SectionPageProps) {
  const { intro, rest } = splitSectionBlocks(section.blocks, title);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10">
      <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold tracking-tight text-text-main shadow-sm">
            {title}
          </div>

          <div className="space-y-5">
            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] text-text-main sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <ContentRenderer blocks={intro} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              href={`tel:${PHONE_LINK}`}
              icon={<PhoneCall className="h-4 w-4" />}
            >
              Call Us: {PHONE_DISPLAY}
            </Button>

            {title !== "Contact Us" ? (
              <Button
                href="/contact"
                variant="secondary"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Contact Us
              </Button>
            ) : null}
          </div>
        </div>

        <ImageMosaic images={heroImages} />
      </section>

      {rest.length ? (
        <section className="mt-20">
          <ContentRenderer blocks={rest} variant={variant} />
        </section>
      ) : null}

      {children}

      {galleryImages.length ? (
        <section className="mt-20">
          <ImageGallery images={galleryImages} />
        </section>
      ) : null}
    </main>
  );
}

