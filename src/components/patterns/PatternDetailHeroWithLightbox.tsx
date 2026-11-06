"use client";

import { useState } from "react";
import { PatternDetailHeroImage } from "@/components/patterns/PatternDetailHeroImage";
import { ImageLightboxDialog } from "@/components/ui/ImageLightboxDialog";
import type { Pattern } from "@/types";

type PatternDetailHeroWithLightboxProps = {
  pattern: Pattern;
  isButterflyShowcase: boolean;
  imageClassName: string;
};

export function PatternDetailHeroWithLightbox({
  pattern,
  isButterflyShowcase,
  imageClassName,
}: PatternDetailHeroWithLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <PatternDetailHeroImage
          src={pattern.image}
          alt={pattern.name}
          contain={isButterflyShowcase}
          className={imageClassName}
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute bottom-3 right-3 z-10 border border-brand-primary/25 bg-brand-warm/95 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-brand-primary shadow-sm backdrop-blur-sm transition hover:border-brand-gold/50 hover:bg-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60"
        >
          放大预览
        </button>
      </div>
      <ImageLightboxDialog
        open={open}
        onOpenChange={setOpen}
        items={[
          {
            src: pattern.image,
            alt: pattern.name,
            caption: pattern.description,
          },
        ]}
        index={0}
        onIndexChange={() => undefined}
      />
    </>
  );
}
