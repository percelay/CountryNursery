import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, PhoneCall } from "lucide-react";

import { Button } from "@/components/Button";
import { getSiteMeta } from "@/lib/content";
import { NAV_ITEMS } from "@/lib/site";

export function Footer() {
  const meta = getSiteMeta();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-6">
            <Link href="/" aria-label="Home" className="inline-flex">
              <Image
                src="/images/logo-nursery.png"
                alt=""
                width={96}
                height={66}
                className="h-auto w-24"
              />
            </Link>

            <Button
              href={`tel:${meta.primaryPhoneLink}`}
              icon={<PhoneCall className="h-4 w-4" />}
              className="w-full sm:w-auto"
            >
              Call Us: {meta.primaryPhone}
            </Button>
          </div>

          <div className="space-y-4">
            {meta.hours.length ? (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-text-main">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <span>Hours</span>
                </div>
                <div className="space-y-2 text-sm leading-6 text-text-muted">
                  {meta.hours.map((hour) => (
                    <p key={hour}>{hour}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-text-main">
                <PhoneCall className="h-4 w-4 text-primary" />
                <span>{meta.primaryPhone}</span>
              </div>

              {meta.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-text-muted transition duration-300 hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{email}</span>
                </a>
              ))}

              {meta.addresses.map((address) => (
                <p key={address} className="flex items-start gap-2 text-sm leading-6 text-text-muted">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{address}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-black/10 pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year}
            {meta.businessName ? ` ${meta.businessName}` : ""}
          </p>

          {meta.credits.length ? (
            <p>{meta.credits[0]}</p>
          ) : (
            <nav className="flex flex-wrap gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition duration-300 hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
