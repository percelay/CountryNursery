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
        "rounded-2xl border border-primary/[0.06] bg-white p-6 shadow-[0_1px_3px_rgb(26_122_76_/_0.06),0_8px_24px_-8px_rgb(26_122_76_/_0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_2px_8px_rgb(26_122_76_/_0.08),0_16px_40px_-8px_rgb(26_122_76_/_0.1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
