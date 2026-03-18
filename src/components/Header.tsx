"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/Button";
import { NAV_ITEMS, PHONE_DISPLAY, PHONE_LINK } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5 sm:px-8 lg:px-10">
        <div
          className={cn(
            "rounded-2xl border border-primary/[0.08] bg-white/[0.92] px-5 py-3.5 backdrop-blur-xl transition-all duration-500",
            scrolled
              ? "shadow-[0_4px_24px_-4px_rgb(26_122_76_/_0.08)]"
              : "shadow-sm",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <Link href="/" aria-label="Home" className="shrink-0">
              <Image
                src="/images/logo-nursery.png"
                alt=""
                width={68}
                height={46}
                priority
                className="h-auto w-[68px]"
              />
            </Link>

            <nav className="hidden items-center gap-0.5 lg:flex">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-4 py-2 text-sm font-medium tracking-tight transition duration-300",
                      isActive
                        ? "bg-primary/[0.08] text-primary"
                        : "text-text-muted hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:block">
              <Button
                href={`tel:${PHONE_LINK}`}
                icon={<PhoneCall className="h-4 w-4" />}
                className="whitespace-nowrap"
              >
                Call Us: {PHONE_DISPLAY}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex rounded-xl border border-primary/10 bg-white p-3 text-text-main shadow-sm transition duration-300 hover:border-primary/20 hover:text-primary lg:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div
            className={cn(
              "overflow-hidden transition-all duration-300 lg:hidden",
              menuOpen ? "max-h-[32rem] pt-4 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="space-y-1 border-t border-primary/10 pt-4">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium tracking-tight transition duration-300",
                      isActive
                        ? "bg-primary/[0.08] text-primary"
                        : "text-text-muted hover:bg-surface hover:text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Button
                href={`tel:${PHONE_LINK}`}
                icon={<PhoneCall className="h-4 w-4" />}
                className="mt-2 w-full"
              >
                Call Us: {PHONE_DISPLAY}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
