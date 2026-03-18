import { ArrowRight, Clock3, Mail, MapPin, PhoneCall } from "lucide-react";

import Image from "next/image";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ContentRenderer } from "@/components/ContentRenderer";
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
      label: "Phone",
      lines: [meta.primaryPhone],
    },
    {
      key: "email",
      icon: Mail,
      label: "Email",
      lines: meta.emails,
    },
    {
      key: "address",
      icon: MapPin,
      label: "Address",
      lines: meta.addresses,
    },
    {
      key: "hours",
      icon: Clock3,
      label: "Hours",
      lines: meta.hours,
    },
  ].filter((item) => item.lines.length);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-28 sm:px-8 lg:px-10">
      {/* Hero */}
      <section className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Contact Us
          </div>

          <div className="space-y-6">
            <h1 className="max-w-xl text-4xl font-bold tracking-[-0.04em] text-text-main sm:text-5xl lg:text-6xl lg:leading-[1.1]">
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

        <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface ring-1 ring-primary/[0.06] shadow-[0_2px_8px_rgb(26_122_76_/_0.06),0_12px_32px_-8px_rgb(26_122_76_/_0.08)] sm:aspect-[4/5] lg:aspect-[3/4]">
          <Image
            src={HERO_IMAGES.contact[0]}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      </section>

      {/* Contact cards */}
      {contactCards.length ? (
        <section className="mt-24 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.key} className="h-full">
                <div className="mb-4 inline-flex rounded-xl bg-surface-alt p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-main">
                  {item.label}
                </h3>
                <div className="space-y-2 text-base leading-7 text-text-muted">
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </Card>
            );
          })}
        </section>
      ) : null}

      {/* Additional content */}
      {rest.length ? (
        <section className="mt-24">
          <ContentRenderer blocks={rest} />
        </section>
      ) : null}
    </main>
  );
}
