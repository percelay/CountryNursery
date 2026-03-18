import { ArrowRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/Button";
import { ContentRenderer } from "@/components/ContentRenderer";
import { ImageGallery } from "@/components/ImageGallery";
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
    <main className="mx-auto max-w-7xl px-6 pb-28 sm:px-8 lg:px-10">
      {/* Hero */}
      <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            {title}
          </div>

          <div className="space-y-6">
            <h1 className="max-w-xl text-4xl font-bold tracking-[-0.04em] text-text-main sm:text-5xl lg:text-6xl lg:leading-[1.1]">
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

        <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface ring-1 ring-primary/[0.06] shadow-[0_2px_8px_rgb(26_122_76_/_0.06),0_12px_32px_-8px_rgb(26_122_76_/_0.08)] sm:aspect-[4/5] lg:aspect-[3/4]">
          <Image
            src={heroImages[0]}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      </section>

      {/* Content */}
      {rest.length ? (
        <section className="mt-24">
          <ContentRenderer blocks={rest} variant={variant} />
        </section>
      ) : null}

      {children}

      {/* Gallery */}
      {galleryImages.length ? (
        <section className="mt-24">
          <ImageGallery images={galleryImages} />
        </section>
      ) : null}
    </main>
  );
}
