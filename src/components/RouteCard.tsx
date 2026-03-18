import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface RouteCardProps {
  href: string;
  image: string;
  label: string;
  className?: string;
}

export function RouteCard({ href, image, label, className }: RouteCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 48vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="text-lg font-semibold tracking-[-0.02em] text-text-main">
          {label}
        </span>
        <ArrowRight className="h-5 w-5 text-primary transition duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
