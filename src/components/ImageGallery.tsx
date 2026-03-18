import Image from "next/image";

import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

const GALLERY_LAYOUT_CLASSES = [
  "md:col-span-2 aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "md:col-span-2 aspect-[16/10]",
  "aspect-[4/5]",
];

export function ImageGallery({ images, className }: ImageGalleryProps) {
  if (!images.length) {
    return null;
  }

  return (
    <div className={cn("grid gap-3 md:grid-cols-3", className)}>
      {images.map((src, index) => (
        <figure
          key={`${src}-${index}`}
          className={cn(
            "group relative overflow-hidden rounded-2xl bg-surface ring-1 ring-primary/[0.06]",
            "shadow-[0_2px_8px_rgb(26_122_76_/_0.06),0_12px_32px_-8px_rgb(26_122_76_/_0.08)]",
            GALLERY_LAYOUT_CLASSES[index % GALLERY_LAYOUT_CLASSES.length],
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />
        </figure>
      ))}
    </div>
  );
}
