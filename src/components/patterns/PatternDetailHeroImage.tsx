"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type PatternDetailHeroImageProps = {
  src: string;
  alt: string;
  contain?: boolean;
  className?: string;
};

export function PatternDetailHeroImage({
  src,
  alt,
  contain,
  className,
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
          "absolute inset-0 bg-gradient-to-br from-brand-paper via-logo-surface to-brand-primary/[0.06]",
          "transition-opacity duration-300",
          ready ? "opacity-0" : "opacity-100"
        )}
        aria-hidden
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        sizes="(min-width: 1024px) 58vw, 100vw"
        onLoadingComplete={() => setReady(true)}
        className={cn(
          "transition-opacity duration-500 ease-out",
          ready ? "opacity-100" : "opacity-0",
          contain ? "object-contain object-center p-1" : "object-cover"
        )}
      />
    </div>
  );
}
