import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/5 bg-surface p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
