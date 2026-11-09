"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { galleryWorks } from "@/lib/data";
import {
  galleryExhibitFilters,
  galleryExhibitLabel,
  matchGalleryExhibitFilter,
} from "@/lib/gallery-exhibit";
import { GalleryCoverHero } from "@/components/gallery/GalleryCoverHero";
import { GalleryWorkFrame } from "@/components/gallery/GalleryWorkFrame";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

export function GalleryExhibition() {
  const [category, setCategory] = useState("全部");

  const items = useMemo(
    () =>
      galleryWorks.filter((w) => matchGalleryExhibitFilter(w, category)),
    [category]
  );

  return (
    <>
      <GalleryCoverHero />

      <BatikTextureSurface as="div" variant="band" className="w-full">
        <div
          id="gallery-works"
          className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14"
        >
          <p className="max-w-2xl text-sm leading-relaxed text-brand-warm/90">
            展厅区分传统实物、工艺记录与数字再创作；当前条目均为项目演示样例。
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {galleryExhibitFilters.map((cat) => (
              <Tag
                key={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Tag>
            ))}
          </div>

          <div className="mt-16 space-y-20">
            {items.map((work, i) => (
              <Link
                key={work.id}
                href={`/gallery/${work.id}`}
                className={cn(
                  "group grid gap-8 border-b border-brand-warm/12 pb-16 md:grid-cols-12 md:items-center",
                  i % 2 === 1 && "md:[direction:rtl]"
                )}
              >
                <GalleryWorkFrame
                  work={work}
                  className={cn(
                    "md:col-span-7 md:[direction:ltr]",
                    i % 2 === 1 ? "md:justify-self-end" : ""
                  )}
                  sizes="(min-width: 768px) 55vw, 92vw"
                >
                  <span className="absolute left-4 top-4 border border-brand-warm/30 bg-brand-dark/85 px-2 py-1 text-[10px] uppercase tracking-wider text-brand-warm">
                    {galleryExhibitLabel(work)}
                    {work.isDemo ? " · 演示" : ""}
                  </span>
                </GalleryWorkFrame>
                <div className="md:col-span-5 md:[direction:ltr]">
                  <p className="wenyu-eyebrow text-[10px] uppercase tracking-[0.35em] text-brand-gold">
                    {work.category}
                  </p>
                  <h2 className="mt-3 font-serif text-3xl text-brand-warm group-hover:text-brand-gold">
                    {work.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-brand-warm/88">
                    {work.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </BatikTextureSurface>
    </>
  );
}
