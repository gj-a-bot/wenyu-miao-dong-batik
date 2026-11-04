"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import { filterPatterns, patternCategories } from "@/lib/data";
import { VerificationBadge } from "@/components/patterns/VerificationBadge";
import { getFavorites } from "@/lib/storage";
import { cn } from "@/lib/cn";

export function PatternsArchive() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const results = useMemo(
    () =>
      filterPatterns({
        category,
        query,
        favoritesOnly,
        favoriteIds,
      }),
    [category, query, favoritesOnly, favoriteIds]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-goldInk">
          纹样博物馆
        </p>
        <h1 className="mt-3 font-serif text-4xl text-brand-primary md:text-5xl">
          纹样档案
        </h1>
        <p className="mt-4 text-brand-muted">
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
                      : "text-brand-muted hover:bg-brand-primary/5"
                  )}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setFavoriteIds(getFavorites());
              setFavoritesOnly((v) => !v);
            }}
            className={cn(
              "mt-6 flex w-full items-center gap-2 rounded-sm border px-3 py-2 text-left text-sm transition",
              favoritesOnly
                ? "border-brand-gold bg-brand-gold/10 text-brand-primary"
                : "border-brand-primary/15 text-brand-muted hover:border-brand-primary"
            )}
            aria-pressed={favoritesOnly}
          >
            <Star
              size={16}
              className={favoritesOnly ? "fill-brand-gold text-brand-gold" : ""}
            />
            仅看收藏
          </button>
        </aside>

        <div className="flex-1">
          <label className="relative block">
            <span className="sr-only">搜索纹样</span>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
              size={18}
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索名称或关键词…"
              aria-label="搜索纹样"
              className="w-full border border-brand-primary/15 bg-white/60 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary"
            />
          </label>

          <p className="mt-4 text-sm text-brand-muted">
            共 {results.length} 条记录
            {favoritesOnly && favoriteIds.length === 0 && " · 你还没有收藏纹样"}
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
                  <p className="mt-1 line-clamp-2 text-sm text-brand-muted">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {results.length === 0 && (
            <p className="py-16 text-center text-brand-muted">
              {favoritesOnly ? "收藏列表为空或未匹配当前筛选。" : "未找到匹配的纹样。"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
