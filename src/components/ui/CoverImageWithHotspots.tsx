"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { ImageHotspot, ImageHotspotLayer } from "@/components/ui/ImageHotspot";

export type CoverHotspot = {
  href: string;
  label: string;
  /** 相对原图宽高的比例 0–1 */
  x: number;
  y: number;
  w: number;
  h: number;
};

type CoverImageWithHotspotsProps = {
  src: string;
  presentationAlt?: string;
  width: number;
  height: number;
  priority?: boolean;
  hotspots: CoverHotspot[];
  className?: string;
};

/**
 * 主视觉按原图等比缩放（w-full h-auto），热区与画面始终对齐，缩放窗口也有效。
 */
export function CoverImageWithHotspots({
  src,
  presentationAlt = "",
  width,
  height,
  priority,
  hotspots,
  className,
}: CoverImageWithHotspotsProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Image
        src={src}
        alt={presentationAlt}
        width={width}
        height={height}
        priority={priority}
        className="pointer-events-none block h-auto w-full max-w-full select-none"
        sizes="100vw"
        role={presentationAlt ? undefined : "presentation"}
      />
      <ImageHotspotLayer>
        {hotspots.map((spot) => (
          <ImageHotspot
            key={`${spot.href}-${spot.label}-${spot.x}`}
            href={spot.href}
            label={spot.label}
            style={{
              left: `${spot.x * 100}%`,
              top: `${spot.y * 100}%`,
              width: `${spot.w * 100}%`,
              height: `${spot.h * 100}%`,
            }}
          />
        ))}
      </ImageHotspotLayer>
    </div>
  );
}
