"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { LeiboxDotGridLoader } from "@/components/leibox/LeiboxDotGridLoader";

type PatternDetailHeroImageProps = {
  src: string;
  alt: string;
  contain?: boolean;
  className?: string;
  imageClassName?: string;
};

export function PatternDetailHeroImage({
  src,
  alt,
  contain,
  className,
  imageClassName,
}: PatternDetailHeroImageProps) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-logo-surface",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 z-[1] transition-opacity duration-300",
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        aria-hidden={ready}
      >
        <LeiboxDotGridLoader />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        sizes="(min-width: 1024px) 58vw, 100vw"
        onLoadingComplete={() => setReady(true)}
        className={cn(
          "relative z-[2] transition-opacity duration-500 ease-out",
          ready ? "opacity-100" : "opacity-0",
          contain ? "object-contain object-center p-1" : "object-cover",
          imageClassName
        )}
      />
    </div>
  );
}
