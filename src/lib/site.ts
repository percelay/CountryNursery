export type SectionSlug =
  | "home"
  | "testimonials"
  | "garden-center"
  | "garden-club"
  | "services"
  | "portfolio"
  | "contact";

export const PHONE_DISPLAY = "908.879.5471";
export const PHONE_LINK = "9088795471";

export const NAV_ITEMS = [
  { slug: "home", label: "Home", title: "Home", href: "/" },
  {
    slug: "testimonials",
    label: "Testimonials",
    title: "Testimonials",
    href: "/testimonials",
  },
  {
    slug: "garden-center",
    label: "Garden Center",
    title: "The Garden Center",
    href: "/garden-center",
  },
  {
    slug: "garden-club",
    label: "Garden Club",
    title: "Garden Club",
    href: "/garden-club",
  },
  {
    slug: "services",
    label: "Services",
    title: "Services",
    href: "/services",
  },
  {
    slug: "portfolio",
    label: "Portfolio",
    title: "Portfolio",
    href: "/portfolio",
  },
  {
    slug: "contact",
    label: "Contact Us",
    title: "Contact Us",
    href: "/contact",
  },
] as const;

export const SECTION_ALIASES: Record<SectionSlug, string[]> = {
  home: ["home"],
  testimonials: ["testimonials"],
  "garden-center": ["the garden center", "garden center"],
  "garden-club": ["garden club"],
  services: ["services"],
  portfolio: ["portfolio"],
  contact: ["contact us", "contact"],
};

export const HERO_IMAGES: Record<SectionSlug, string[]> = {
  home: [
    "/images/Annuals_1nuals.jpg",
    "/images/Landscape_design-_65.jpg",
    "/images/Outdoor-Livingl-_12.jpg",
    "/images/Seasonal_decor-_34.jpg",
  ],
  testimonials: [
    "/images/Seasonal_decor-_34.jpg",
    "/images/gifts garden accents.jpg",
    "/images/garden-accents.jpg",
    "/images/Seasonal_decor-_26.jpg",
  ],
  "garden-center": [
    "/images/Annuals_0nn.jpg",
    "/images/perenials_10833.jpg",
    "/images/perrnials.jpg",
    "/images/Annuals_2mg_0809.jpg",
  ],
  "garden-club": [
    "/images/Seasonal_decor-_0.jpg",
    "/images/Seasonal_decor-_19.jpg",
    "/images/Seasonal_decor-_21.jpg",
    "/images/Seasonal_decor-_26.jpg",
  ],
  services: [
    "/images/Landscape_design-_14.jpg",
    "/images/Outdoor-Livingl-_1.jpg",
    "/images/Retainer_wall-_6.jpg",
    "/images/walland-steps.jpg",
  ],
  portfolio: [
    "/images/Landscape_design-_42.jpg",
    "/images/Landscape_design-_43.jpg",
    "/images/deck-and-walkway.jpg",
    "/images/deck-1.jpg",
  ],
  contact: [
    "/images/walland-steps.jpg",
    "/images/stones.jpg",
    "/images/Outdoor-Livingl-_0.jpg",
    "/images/Retainer_wall-_12.jpg",
  ],
};

export const PAGE_GALLERIES: Partial<Record<SectionSlug, string[]>> = {
  testimonials: [
    "/images/Seasonal_decor-_0.jpg",
    "/images/Seasonal_decor-_19.jpg",
    "/images/Seasonal_decor-_21.jpg",
  ],
  "garden-center": [
    "/images/garden-accents.jpg",
    "/images/gifts garden accents.jpg",
    "/images/Seasonal_decor-_19.jpg",
  ],
  "garden-club": [
    "/images/Seasonal_decor-_21.jpg",
    "/images/Seasonal_decor-_26.jpg",
    "/images/Seasonal_decor-_34.jpg",
  ],
  services: [
    "/images/Retainer_wall-_1.jpg",
    "/images/Retainer_wall-_2.jpg",
    "/images/Retainer_wall-_4.jpg",
  ],
  portfolio: [
    "/images/Landscape_design-_1.jpg",
    "/images/Landscape_design-_21.jpg",
    "/images/Landscape_design-_22.jpg",
    "/images/Landscape_design-_24.jpg",
    "/images/Landscape_design-_57.jpg",
    "/images/Landscape_design-_63.jpg",
    "/images/Outdoor-Livingl-_0.jpg",
    "/images/Outdoor-Livingl-_3.jpg",
    "/images/Retainer_wall-_1.jpg",
    "/images/Retainer_wall-_2.jpg",
    "/images/Retainer_wall-_4.jpg",
    "/images/stones.jpg",
  ],
};

export const ROUTE_CARD_IMAGES: Record<Exclude<SectionSlug, "home">, string> = {
  testimonials: "/images/Seasonal_decor-_34.jpg",
  "garden-center": "/images/perenials_10833.jpg",
  "garden-club": "/images/Seasonal_decor-_0.jpg",
  services: "/images/Outdoor-Livingl-_12.jpg",
  portfolio: "/images/Landscape_design-_65.jpg",
  contact: "/images/walland-steps.jpg",
};

