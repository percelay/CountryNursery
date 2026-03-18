import Image from "next/image";
import { ArrowRight, PhoneCall, Quote } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { getSection, splitSectionBlocks } from "@/lib/content";
import { HERO_IMAGES, PHONE_DISPLAY, PHONE_LINK } from "@/lib/site";

export default function TestimonialsPage() {
  const section = getSection("testimonials");
  const { intro, rest } = splitSectionBlocks(section.blocks, "Testimonials");

  const quotes = [...intro, ...rest].filter((b) => b.type === "quote");
  const paragraphs = [...intro, ...rest].filter((b) => b.type === "paragraph");

  return (
    <main className="mx-auto max-w-7xl px-6 pb-28 sm:px-8 lg:px-10">
      {/* Hero */}
      <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Testimonials
          </div>

          <div className="space-y-6">
            <h1 className="max-w-xl text-4xl font-bold tracking-[-0.04em] text-text-main sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              What Our{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Clients Say
              </span>
            </h1>
            {paragraphs.map((block, i) => (
              <p key={i} className="max-w-xl text-lg leading-8 text-text-muted">
                {block.type === "paragraph" ? block.text : ""}
              </p>
            ))}
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

        <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface ring-1 ring-primary/[0.06] shadow-[0_2px_8px_rgb(26_122_76_/_0.06),0_12px_32px_-8px_rgb(26_122_76_/_0.08)] sm:aspect-[4/5] lg:aspect-[3/4]">
          <Image
            src={HERO_IMAGES.testimonials[0]}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      </section>

      {/* Testimonial quotes */}
      {quotes.length > 0 && (
        <section className="mt-24">
          <div className="grid gap-6 md:grid-cols-2">
            {quotes.map((block, index) => {
              if (block.type !== "quote") return null;

              const parts = block.text.match(/^"?([\s\S]*?)"?\s*—\s*(.+)$/);
              const quoteText = parts ? parts[1].replace(/^"|"$/g, "") : block.text;
              const attribution = parts ? parts[2] : null;

              return (
                <Card key={index} className="flex h-full flex-col justify-between">
                  <div>
                    <Quote className="mb-4 h-6 w-6 text-primary/40" />
                    <p className="text-lg leading-8 text-text-main">
                      {quoteText}
                    </p>
                  </div>
                  {attribution && (
                    <p className="mt-6 text-sm font-semibold text-primary">
                      — {attribution}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
