import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({
  href,
  children,
  className,
  icon,
  variant = "primary",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-tight transition duration-300 hover:-translate-y-0.5",
    variant === "primary"
      ? "bg-gradient-to-b from-primary-light to-primary text-white shadow-[0_2px_12px_-2px_rgb(26_122_76_/_0.4)] hover:shadow-[0_4px_20px_-2px_rgb(26_122_76_/_0.5)]"
      : "border border-primary/15 bg-white text-text-main shadow-sm hover:border-primary/30 hover:text-primary hover:shadow-md",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="shrink-0">{icon}</span> : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
