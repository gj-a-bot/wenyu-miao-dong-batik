"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryCategories, galleryWorks } from "@/lib/data";
import { GalleryCoverHero } from "@/components/gallery/GalleryCoverHero";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

export function GalleryExhibition() {
  const [category, setCategory] = useState("全部");

  const items = useMemo(
    () =>
      category === "全部"
        ? galleryWorks
        : galleryWorks.filter((w) => w.category === category),
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
      <p className="max-w-2xl text-sm leading-relaxed text-brand-gray">
        展览式呈现项目演示作品，均标注为样例，非真实用户投稿。
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {galleryCategories.map((cat) => (
          <Tag key={cat} active={category === cat} onClick={() => setCategory(cat)}>
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
              "group grid gap-8 border-b border-brand-border pb-16 md:grid-cols-12 md:items-end",
              i % 2 === 1 && "md:[direction:rtl]"
            )}
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-brand-border bg-brand-dark md:col-span-7 md:[direction:ltr]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <span className="absolute left-4 top-4 border border-brand-warm/30 bg-brand-dark/85 px-2 py-1 text-[10px] uppercase tracking-wider text-brand-warm">
                演示作品
              </span>
            </div>
            <div className="md:col-span-5 md:[direction:ltr]">
              <p className="text-[10px] uppercase tracking-[0.35em] text-brand-goldInk">
                {work.category}
              </p>
              <h2 className="mt-3 font-serif text-3xl text-brand-primary group-hover:text-brand-goldInk">
                {work.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-ink/88">
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
