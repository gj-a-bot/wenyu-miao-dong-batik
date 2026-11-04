"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryCategories, galleryWorks } from "@/lib/data";
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
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <header>
        <h1 className="font-serif text-4xl text-brand-primary md:text-5xl">
          数字作品展厅
        </h1>
        <p className="mt-4 max-w-xl text-brand-muted">
          展览式呈现项目演示作品。所有条目均标注为样例，非真实用户投稿。
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-2">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "px-4 py-2 text-sm transition",
              category === cat
                ? "bg-brand-primary text-brand-cream"
                : "border border-brand-primary/15 text-brand-muted hover:text-brand-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-16 space-y-24">
        {items.map((work, i) => (
          <Link
            key={work.id}
            href={`/gallery/${work.id}`}
            className={cn(
              "group grid gap-8 md:grid-cols-12 md:items-center",
              i % 2 === 1 && "md:[direction:rtl]"
            )}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-dark md:col-span-7 md:[direction:ltr]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <span className="absolute left-4 top-4 bg-brand-dark/80 px-2 py-1 text-[10px] text-brand-cream">
                演示作品
              </span>
            </div>
            <div className="md:col-span-5 md:[direction:ltr]">
              <p className="text-xs uppercase tracking-widest text-brand-gold">
                {work.category}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-brand-primary group-hover:text-brand-gold">
                {work.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                {work.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
