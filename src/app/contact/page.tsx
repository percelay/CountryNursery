import { ArrowRight, Clock3, Mail, MapPin, PhoneCall } from "lucide-react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ContentRenderer } from "@/components/ContentRenderer";
import { ImageMosaic } from "@/components/ImageMosaic";
import { getSection, getSiteMeta, splitSectionBlocks } from "@/lib/content";
import { HERO_IMAGES } from "@/lib/site";

export default function ContactPage() {
  const section = getSection("contact");
  const meta = getSiteMeta();
  const { intro, rest } = splitSectionBlocks(section.blocks, "Contact Us");
  const contactCards = [
    {
      key: "phone",
      icon: PhoneCall,
      lines: [meta.primaryPhone],
    },
    {
      key: "email",
      icon: Mail,
      lines: meta.emails,
    },
    {
      key: "address",
      icon: MapPin,
      lines: meta.addresses,
    },
    {
      key: "hours",
      icon: Clock3,
      lines: meta.hours,
    },
  ].filter((item) => item.lines.length);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8 lg:px-10">
      <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold tracking-tight text-text-main shadow-sm">
            Contact Us
          </div>

          <div className="space-y-5">
            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] text-text-main sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <ContentRenderer blocks={intro} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              href={`tel:${meta.primaryPhoneLink}`}
              icon={<PhoneCall className="h-4 w-4" />}
            >
              Call Us: {meta.primaryPhone}
            </Button>
            <Button
              href="/services"
              variant="secondary"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Services
            </Button>
          </div>
        </div>

        <ImageMosaic images={HERO_IMAGES.contact} />
      </section>

      {contactCards.length ? (
        <section className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.key} className="h-full">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-4 space-y-2 text-base leading-7 text-text-muted">
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </Card>
            );
          })}
        </section>
      ) : null}

      {rest.length ? (
        <section className="mt-20">
          <ContentRenderer blocks={rest} />
        </section>
      ) : null}
    </main>
  );
}
