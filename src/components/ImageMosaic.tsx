import Image from "next/image";

import { cn } from "@/lib/utils";

interface ImageMosaicProps {
  images: string[];
  className?: string;
}

const HERO_LAYOUT_CLASSES = [
  "md:col-span-2 md:row-span-2 aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "md:col-span-2 aspect-[16/9]",
];

export function ImageMosaic({ images, className }: ImageMosaicProps) {
  return (
    <div className={cn("grid gap-3 md:grid-cols-2", className)}>
      {images.map((src, index) => (
        <figure
          key={`${src}-${index}`}
          className={cn(
            "group relative overflow-hidden rounded-2xl bg-surface ring-1 ring-primary/[0.06]",
            "shadow-[0_2px_8px_rgb(26_122_76_/_0.06),0_12px_32px_-8px_rgb(26_122_76_/_0.08)]",
            HERO_LAYOUT_CLASSES[index] ?? "aspect-[4/3]",
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />
        </figure>
      ))}
    </div>
  );
}
