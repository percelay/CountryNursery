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
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {images.map((src, index) => (
        <figure
          key={`${src}-${index}`}
          className={cn(
            "group relative overflow-hidden rounded-2xl bg-surface shadow-md",
            GALLERY_LAYOUT_CLASSES[index % GALLERY_LAYOUT_CLASSES.length],
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </figure>
      ))}
    </div>
  );
}

