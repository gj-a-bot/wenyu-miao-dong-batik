"use client";

import { cn } from "@/lib/cn";
import { ImageHotspot, ImageHotspotLayer } from "@/components/ui/ImageHotspot";
import { ProgressiveBlockImage } from "@/components/ui/ProgressiveBlockImage";

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
  placeholder?: "brand" | "lite";
  imageClassName?: string;
  blockClassName?: string;
};

/**
 * 主视觉按原图等比缩放，热区与画面对齐；加载阶段用占位 + 整图淡入。
 */
export function CoverImageWithHotspots({
  src,
  presentationAlt = "",
  width,
  height,
  priority = true,
  hotspots,
  className,
  placeholder,
  imageClassName,
  blockClassName,
}: CoverImageWithHotspotsProps) {
  return (
    <div className={cn("relative w-full bg-brand-primary", className)}>
      <ProgressiveBlockImage
        src={src}
        width={width}
        height={height}
        alt={presentationAlt}
        priority={priority}
        presentation={!presentationAlt}
        placeholder={placeholder}
        className={cn("bg-brand-primary", blockClassName)}
        imageClassName={imageClassName}
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
