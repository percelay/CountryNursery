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
    <main className="mx-auto max-w-7xl px-6 pb-28 sm:px-8 lg:px-10">
      {/* Hero */}
      <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Welcome
          </div>

          <div className="space-y-6">
            <h1 className="max-w-xl text-5xl font-bold tracking-[-0.04em] text-text-main sm:text-6xl lg:text-[4.25rem] lg:leading-[1.08]">
              Your Garden
              <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Oasis Awaits
              </span>
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

      {/* Content */}
      {rest.length ? (
        <section className="mt-24">
          <ContentRenderer blocks={rest} variant="cards" />
        </section>
      ) : null}

      {/* Section divider */}
      <div className="divider-gradient mx-auto mt-24 max-w-md" />

      {/* Route cards */}
      <section className="mt-24">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-[-0.03em] text-text-main sm:text-4xl">
          Explore Our{" "}
          <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            World
          </span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {NAV_ITEMS.filter((item) => item.slug !== "home").map((item) => (
            <RouteCard
              key={item.href}
              href={item.href}
              image={ROUTE_CARD_IMAGES[item.slug as keyof typeof ROUTE_CARD_IMAGES]}
              label={item.label}
            />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mt-24">
        <ImageGallery images={PAGE_GALLERIES.portfolio ?? []} />
      </section>
    </main>
  );
}
