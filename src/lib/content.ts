import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

import {
  NAV_ITEMS,
  PHONE_DISPLAY,
  PHONE_LINK,
  SECTION_ALIASES,
  type SectionSlug,
} from "@/lib/site";

export type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string };

export interface SectionData {
  slug: SectionSlug;
  title: string;
  blocks: Block[];
}

export interface SiteMeta {
  businessName?: string;
  phones: string[];
  emails: string[];
  hours: string[];
  addresses: string[];
  credits: string[];
  primaryPhone: string;
  primaryPhoneLink: string;
}

const SOURCE_PATH = path.join(process.cwd(), "sourcematerial.md");
const PHONE_PATTERN =
  /(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}/g;
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const HOURS_PATTERN =
  /\b(mon(day)?|tue(s(day)?)?|wed(nesday)?|thu(r(s|sday)?)?|fri(day)?|sat(urday)?|sun(day)?)\b/i;
const ADDRESS_PATTERN =
  /\b\d{1,6}\s+[\w.'-]+(?:\s+[\w.'-]+){0,6}\s+(street|st|road|rd|avenue|ave|lane|ln|drive|dr|boulevard|blvd|way|route|rt|circle|cir|court|ct)\b/i;

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function stripFrontmatter(raw: string) {
  if (!raw.startsWith("---")) {
    return raw;
  }

  const endIndex = raw.indexOf("\n---", 3);
  if (endIndex === -1) {
    return raw;
  }

  return raw.slice(endIndex + 4).trimStart();
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function digitsFromPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }
  return digits;
}

function formatPhone(value: string) {
  const digits = digitsFromPhone(value);
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  return value.trim();
}

function getTitleForSlug(slug: SectionSlug) {
  return NAV_ITEMS.find((item) => item.slug === slug)?.title ?? "Home";
}

function matchSectionHeading(text: string) {
  const normalized = normalizeText(text);

  return (
    (Object.entries(SECTION_ALIASES) as Array<[SectionSlug, string[]]>).find(
      ([, aliases]) => aliases.includes(normalized),
    ) ?? null
  );
}

function ensureSection(
  sections: Map<SectionSlug, SectionData>,
  slug: SectionSlug,
  title: string,
) {
  const existing = sections.get(slug);
  if (existing) {
    return existing;
  }

  const section = { slug, title, blocks: [] };
  sections.set(slug, section);
  return section;
}

function parseMarkdown(raw: string) {
  const sections = new Map<SectionSlug, SectionData>();
  let currentSlug: SectionSlug = "home";
  let paragraphBuffer: string[] = [];
  let listBuffer: { ordered: boolean; items: string[] } | null = null;

  ensureSection(sections, "home", getTitleForSlug("home"));

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }

    ensureSection(sections, currentSlug, getTitleForSlug(currentSlug)).blocks.push(
      {
        type: "paragraph",
        text: paragraphBuffer.join(" "),
      },
    );
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer) {
      return;
    }

    ensureSection(sections, currentSlug, getTitleForSlug(currentSlug)).blocks.push(
      {
        type: "list",
        ordered: listBuffer.ordered,
        items: [...listBuffer.items],
      },
    );
    listBuffer = null;
  };

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      flushParagraph();
      flushList();

      const headingText = headingMatch[2].trim();
      const matchedSection = matchSectionHeading(headingText);

      if (matchedSection) {
        const [slug] = matchedSection;
        currentSlug = slug;
        ensureSection(sections, slug, getTitleForSlug(slug));
        continue;
      }

      ensureSection(sections, currentSlug, getTitleForSlug(currentSlug)).blocks.push(
        {
          type: "heading",
          level: headingMatch[1].length,
          text: headingText,
        },
      );
      continue;
    }

    const quoteMatch = /^>\s?(.*)$/.exec(trimmed);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      ensureSection(sections, currentSlug, getTitleForSlug(currentSlug)).blocks.push(
        {
          type: "quote",
          text: quoteMatch[1].trim(),
        },
      );
      continue;
    }

    const unorderedMatch = /^[-*+]\s+(.*)$/.exec(trimmed);
    const orderedMatch = /^\d+\.\s+(.*)$/.exec(trimmed);

    if (unorderedMatch || orderedMatch) {
      flushParagraph();
      const ordered = Boolean(orderedMatch);
      const item = (orderedMatch?.[1] ?? unorderedMatch?.[1] ?? "").trim();

      if (!listBuffer || listBuffer.ordered !== ordered) {
        flushList();
        listBuffer = { ordered, items: [] };
      }

      listBuffer.items.push(item);
      continue;
    }

    flushList();
    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  flushList();

  return sections;
}

function extractSiteMeta(raw: string, sections: Map<SectionSlug, SectionData>): SiteMeta {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const phones = unique((raw.match(PHONE_PATTERN) ?? []).map(formatPhone));
  const emails = unique(raw.match(EMAIL_PATTERN) ?? []);
  const hours = unique(
    lines.filter((line) => HOURS_PATTERN.test(line) || /^hours\b/i.test(line)),
  );
  const addresses = unique(
    lines.filter(
      (line) =>
        ADDRESS_PATTERN.test(line) ||
        (/,/.test(line) && /\b[A-Z]{2}\b/.test(line)) ||
        /\b\d{5}(?:-\d{4})?\b/.test(line),
    ),
  );
  const credits = unique(
    lines.filter((line) =>
      /^(credits?|photo credits?|image credits?)\b/i.test(line),
    ),
  );
  const firstHeading = sections
    .get("home")
    ?.blocks.find((block) => block.type === "heading");
  const businessName =
    firstHeading && firstHeading.type === "heading" ? firstHeading.text : undefined;
  const primaryPhone = phones[0] ?? PHONE_DISPLAY;

  return {
    businessName,
    phones: phones.length ? phones : [PHONE_DISPLAY],
    emails,
    hours,
    addresses,
    credits,
    primaryPhone,
    primaryPhoneLink: digitsFromPhone(primaryPhone) || PHONE_LINK,
  };
}

const getParsedContent = cache(() => {
  const raw = stripFrontmatter(readFileSync(SOURCE_PATH, "utf8"));
  const sections = parseMarkdown(raw);

  return {
    raw,
    sections,
    meta: extractSiteMeta(raw, sections),
  };
});

export function getSection(slug: SectionSlug): SectionData {
  const { sections } = getParsedContent();

  return sections.get(slug) ?? {
    slug,
    title: getTitleForSlug(slug),
    blocks: [],
  };
}

export function getSiteMeta() {
  return getParsedContent().meta;
}

export function splitSectionBlocks(
  blocks: Block[],
  title: string,
  introLimit = 2,
) {
  let remaining = [...blocks];

  if (
    remaining[0]?.type === "heading" &&
    normalizeText(remaining[0].text) === normalizeText(title)
  ) {
    remaining = remaining.slice(1);
  }

  return {
    intro: remaining.slice(0, introLimit),
    rest: remaining.slice(introLimit),
  };
}

