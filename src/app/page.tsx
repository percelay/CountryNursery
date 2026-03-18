import { ArrowRight, PhoneCall } from "lucide-react";

import { Button } from "@/components/Button";
import { ContentRenderer } from "@/components/ContentRenderer";
import { ImageGallery } from "@/components/ImageGallery";
import { ImageMosaic } from "@/components/ImageMosaic";
import { RouteCard } from "@/components/RouteCard";
import { getSection, splitSectionBlocks } from "@/lib/content";
import {
  HERO_IMAGES,
  NAV_ITEMS,
  PAGE_GALLERIES,
  PHONE_DISPLAY,
  PHONE_LINK,
  ROUTE_CARD_IMAGES,
} from "@/lib/site";

export default function HomePage() {
  const section = getSection("home");
  const { intro, rest } = splitSectionBlocks(section.blocks, "Home");

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10">
      <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold tracking-tight text-text-main shadow-sm">
            Home
          </div>

          <div className="space-y-5">
            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-text-main sm:text-6xl lg:text-7xl">
              Home
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
            <Button
              href="/contact"
              variant="secondary"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Contact Us
            </Button>
          </div>
        </div>

        <ImageMosaic images={HERO_IMAGES.home} />
      </section>

      {rest.length ? (
        <section className="mt-20">
          <ContentRenderer blocks={rest} variant="cards" />
        </section>
      ) : null}

      <section className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {NAV_ITEMS.filter((item) => item.slug !== "home").map((item) => (
          <RouteCard
            key={item.href}
            href={item.href}
            image={ROUTE_CARD_IMAGES[item.slug as keyof typeof ROUTE_CARD_IMAGES]}
            label={item.label}
          />
        ))}
      </section>

      <section className="mt-20">
        <ImageGallery images={PAGE_GALLERIES.portfolio ?? []} />
      </section>
    </main>
  );
}

