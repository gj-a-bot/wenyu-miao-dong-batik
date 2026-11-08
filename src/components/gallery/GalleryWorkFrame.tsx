import Image from "next/image";
import type { GalleryWork } from "@/types";
import { cn } from "@/lib/cn";
import {
  galleryAspectStyle,
  galleryImagePosition,
} from "@/lib/gallery-frame";
import { BatikDisplayFrame } from "@/components/ui/BatikDisplayFrame";

type GalleryWorkFrameProps = {
  work: GalleryWork;
  src?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
};

export function GalleryWorkFrame({
  work,
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "(min-width: 768px) 45vw, 92vw",
  children,
}: GalleryWorkFrameProps) {
  return (
    <BatikDisplayFrame
      mat="dark"
      prominent
      className={cn(
        "wenyu-batik-display-frame--lift relative w-full overflow-hidden",
        className
      )}
      innerClassName="bg-brand-dark"
      style={galleryAspectStyle(work)}
    >
      <Image
        src={src ?? work.thumbnail}
        alt={alt ?? work.title}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition duration-700 group-hover:scale-[1.02]",
          imageClassName
        )}
        style={{ objectPosition: galleryImagePosition(work) }}
      />
      {children}
    </BatikDisplayFrame>
  );
}
