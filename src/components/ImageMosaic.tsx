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
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {images.map((src, index) => (
        <figure
          key={`${src}-${index}`}
          className={cn(
            "group relative overflow-hidden rounded-2xl bg-surface shadow-md",
            HERO_LAYOUT_CLASSES[index] ?? "aspect-[4/3]",
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </figure>
      ))}
    </div>
  );
}

