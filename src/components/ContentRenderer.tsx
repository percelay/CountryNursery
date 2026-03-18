import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Quote } from "lucide-react";

import { Card } from "@/components/Card";
import type { Block } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ContentRendererProps {
  blocks: Block[];
  variant?: "default" | "cards" | "quotes";
  className?: string;
}

function renderFormatting(text: string, keyPrefix: string) {
  const parts: ReactNode[] = [];
  const emphasisPattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = emphasisPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const value = match[0];
    const inner = value.replace(/^\*{1,2}|\*{1,2}$/g, "");

    if (value.startsWith("**")) {
      parts.push(
        <strong key={`${keyPrefix}-strong-${match.index}`} className="font-semibold text-text-main">
          {inner}
        </strong>,
      );
    } else {
      parts.push(
        <em key={`${keyPrefix}-em-${match.index}`} className="italic">
          {inner}
        </em>,
      );
    }

    lastIndex = match.index + value.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : [text];
}

function renderInlineMarkdown(text: string, keyPrefix: string) {
  const parts: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...renderFormatting(text.slice(lastIndex, match.index), `${keyPrefix}-${match.index}`));
    }

    const href = match[2];
    const label = match[1];
    const external = !href.startsWith("/");

    parts.push(
      external ? (
        <a
          key={`${keyPrefix}-link-${match.index}`}
          href={href}
          className="inline-flex items-center gap-1 font-medium text-primary transition duration-300 hover:text-primary-dark"
        >
          <span>{label}</span>
          <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : (
        <Link
          key={`${keyPrefix}-link-${match.index}`}
          href={href}
          className="inline-flex items-center gap-1 font-medium text-primary transition duration-300 hover:text-primary-dark"
        >
          <span>{label}</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      ),
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(...renderFormatting(text.slice(lastIndex), `${keyPrefix}-tail`));
  }

  return parts.length ? parts : [text];
}

function ListContent({
  ordered,
  items,
  variant,
}: {
  ordered: boolean;
  items: string[];
  variant: "default" | "cards" | "quotes";
}) {
  if (variant === "cards") {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <Card key={`${item}-${index}`} className="h-full">
            <div className="text-base leading-7 text-text-muted">
              {renderInlineMarkdown(item, `card-${index}`)}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (variant === "quotes") {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <Card key={`${item}-${index}`} className="h-full">
            <Quote className="h-5 w-5 text-primary" />
            <p className="mt-4 text-base leading-7 text-text-main">
              {renderInlineMarkdown(item, `quote-${index}`)}
            </p>
          </Card>
        ))}
      </div>
    );
  }

  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag
      className={cn(
        "space-y-3 pl-6 text-base leading-7 text-text-muted marker:text-primary",
        ordered ? "list-decimal" : "list-disc",
      )}
    >
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{renderInlineMarkdown(item, `list-${index}`)}</li>
      ))}
    </ListTag>
  );
}

export function ContentRenderer({
  blocks,
  variant = "default",
  className,
}: ContentRendererProps) {
  if (!blocks.length) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level <= 2 ? "h2" : "h3";

          return (
            <Tag
              key={`${block.text}-${index}`}
              className="max-w-3xl text-2xl font-bold tracking-[-0.03em] text-text-main sm:text-3xl"
            >
              {renderInlineMarkdown(block.text, `heading-${index}`)}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={`${block.text}-${index}`}
              className="max-w-3xl text-lg leading-8 text-text-muted"
            >
              {renderInlineMarkdown(block.text, `paragraph-${index}`)}
            </p>
          );
        }

        if (block.type === "quote") {
          if (variant === "quotes") {
            return (
              <Card key={`${block.text}-${index}`} className="max-w-3xl">
                <Quote className="h-5 w-5 text-primary" />
                <p className="mt-4 text-lg leading-8 text-text-main">
                  {renderInlineMarkdown(block.text, `blockquote-${index}`)}
                </p>
              </Card>
            );
          }

          return (
            <blockquote
              key={`${block.text}-${index}`}
              className="max-w-3xl rounded-2xl border-l-4 border-primary bg-surface px-6 py-5 text-lg leading-8 text-text-main shadow-sm"
            >
              {renderInlineMarkdown(block.text, `blockquote-${index}`)}
            </blockquote>
          );
        }

        return (
          <ListContent
            key={`${block.items.join("-")}-${index}`}
            ordered={block.ordered}
            items={block.items}
            variant={variant}
          />
        );
      })}
    </div>
  );
}
