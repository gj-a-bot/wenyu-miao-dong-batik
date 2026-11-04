"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { filterPatterns, patternCategories } from "@/lib/data";
import { VerificationBadge } from "@/components/patterns/VerificationBadge";
import { cn } from "@/lib/cn";

export function PatternsArchive() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => filterPatterns({ category, query }),
    [category, query]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">
          纹样数字博物馆
        </p>
        <h1 className="mt-3 font-serif text-4xl text-brand-primary md:text-5xl">
          纹样档案
        </h1>
        <p className="mt-4 text-brand-gray">
          分类浏览、搜索与收藏。实验素材与传统资料将明确区分标注。
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-64 shrink-0">
          <p className="text-xs font-medium uppercase tracking-wider text-brand-primary">
            分类
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {patternCategories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "w-full rounded-sm px-3 py-2 text-left text-sm transition",
                    category === cat
                      ? "bg-brand-primary text-brand-cream"
                      : "text-brand-gray hover:bg-brand-primary/5"
                  )}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          <label className="relative block">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray"
              size={18}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索名称或关键词…"
              className="w-full border border-brand-primary/15 bg-white/60 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary"
            />
          </label>

          <p className="mt-4 text-sm text-brand-gray">
            共 {results.length} 条记录
          </p>

          <div className="mt-8 columns-1 gap-4 sm:columns-2 xl:columns-3">
            {results.map((p, i) => (
              <Link
                key={p.id}
                href={`/patterns/${p.id}`}
                className={cn(
                  "mb-4 block break-inside-avoid overflow-hidden border border-brand-primary/10 bg-brand-cream transition hover:shadow-lg",
                  i % 3 === 1 && "sm:mt-8"
                )}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden bg-brand-primary/5",
                    i % 2 === 0 ? "aspect-[4/5]" : "aspect-square"
                  )}
                >
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <VerificationBadge status={p.verificationStatus} />
                  <h2 className="mt-2 font-serif text-lg text-brand-primary">
                    {p.name}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-brand-gray">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {results.length === 0 && (
            <p className="py-16 text-center text-brand-gray">未找到匹配的纹样。</p>
          )}
        </div>
      </div>
    </div>
  );
}
