"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";
import { filterPatterns, patternCategories } from "@/lib/data";
import { VerificationBadge } from "@/components/patterns/VerificationBadge";
import { Tag } from "@/components/ui/Tag";
import { getFavorites } from "@/lib/storage";
import { cn } from "@/lib/cn";
import {
  CoverImageWithHotspots,
  type CoverHotspot,
} from "@/components/ui/CoverImageWithHotspots";
import {
  ImageLightboxDialog,
  type LightboxItem,
} from "@/components/ui/ImageLightboxDialog";

const MUSEUM_COVER_SRC = "/images/museum/pattern-museum-cover.png";
const COVER_W = 1920;
const COVER_H = 1080;

const MUSEUM_COVER_HOTSPOTS: CoverHotspot[] = [
  { href: "/", label: "纹语 WENYU 首页", x: 0.01, y: 0.028, w: 0.28, h: 0.23 },
  {
    href: "#pattern-archive",
    label: "探索纹样",
    x: 0.042,
    y: 0.675,
    w: 0.2,
    h: 0.14,
  },
];

export function PatternsArchive() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      results.map((p) => ({
        src: p.image,
        alt: p.name,
        caption: p.description,
      })),
    [results]
  );

  const openLightboxAt = (patternId: string) => {
    const idx = results.findIndex((p) => p.id === patternId);
    if (idx < 0) return;
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-logo-surface"
        aria-label="纹样博物馆封面"
      >
        <CoverImageWithHotspots
          src={MUSEUM_COVER_SRC}
          width={COVER_W}
          height={COVER_H}
          priority
          hotspots={MUSEUM_COVER_HOTSPOTS}
        />
        <h1 className="sr-only">
          纹样博物馆 — 探索苗侗蜡染的纹样之美。在数字世界中，遇见千年传承的纹样艺术。
        </h1>
      </section>

      <div
        id="pattern-archive"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14"
      >
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="lg:w-56 shrink-0">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand-muted">
              分类
            </p>
            <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
              {patternCategories.map((cat) => (
                <Tag
                  key={cat}
                  active={category === cat}
                  onClick={() => setCategory(cat)}
                  className="justify-center lg:justify-start"
                >
                  {cat}
                </Tag>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setFavoriteIds(getFavorites());
                setFavoritesOnly((v) => !v);
              }}
              className={cn(
                "mt-6 flex w-full items-center gap-2 border px-3 py-2.5 text-left text-sm transition",
                favoritesOnly
                  ? "border-brand-gold bg-brand-gold/10 text-brand-primary"
                  : "border-brand-border bg-brand-warm text-brand-muted hover:border-brand-secondary"
              )}
            >
              <Star
                size={15}
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
                className="wenyu-input pl-11"
              />
            </label>

            <p className="mt-4 text-sm text-brand-muted">
              共 {results.length} 条档案
            </p>

            <LayoutGroup id="pattern-archive-grid">
              <div className="mt-10 columns-1 gap-5 sm:columns-2 xl:columns-3">
                {results.map((p, i) => {
                  const isButterflyShowcase = p.id === "motif-butterfly-type";
                  return (
                    <motion.article
                      key={p.id}
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 34,
                      }}
                      className={cn(
                        "group/card mb-5 break-inside-avoid overflow-hidden border bg-brand-warm transition-shadow duration-300",
                        isButterflyShowcase
                          ? "rounded-lg border-brand-primary/15 shadow-sm hover:border-brand-primary/45 hover:shadow-[0_12px_40px_-18px_rgba(196,154,98,0.28)]"
                          : "border-brand-border hover:border-brand-primary/35 hover:shadow-[0_14px_44px_-20px_rgba(23,59,80,0.14)]",
                        i % 3 === 1 && "sm:mt-6"
                      )}
                    >
                      <div className="relative">
                        <Link
                          href={`/patterns/${p.id}`}
                          className="relative block outline-none ring-inset ring-brand-gold/0 transition-[box-shadow] duration-300 focus-visible:ring-2 group-hover/card:ring-1 group-hover/card:ring-brand-gold/30"
                          aria-label={`查看 ${p.name} 详情`}
                        >
                          <div
                            className={cn(
                              "relative w-full overflow-hidden bg-brand-primary/[0.04]",
                              isButterflyShowcase
                                ? "aspect-[3/2]"
                                : i % 2 === 0
                                  ? "aspect-[4/5]"
                                  : "aspect-square"
                            )}
                          >
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              className={cn(
                                "object-cover transition duration-300",
                                isButterflyShowcase
                                  ? "object-center group-hover/card:scale-[1.03]"
                                  : "group-hover/card:scale-[1.03]"
                              )}
                            />
                          </div>
                        </Link>
                        <button
                          type="button"
                          className="absolute bottom-3 right-3 z-20 border border-brand-primary/25 bg-brand-warm/95 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-brand-primary shadow-sm backdrop-blur-sm transition hover:border-brand-gold/50 hover:bg-brand-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openLightboxAt(p.id);
                          }}
                        >
                          预览
                        </button>
                      </div>
                      <Link
                        href={`/patterns/${p.id}`}
                        className="block border-t border-brand-border px-4 py-3 transition-colors duration-300 group-hover/card:border-brand-primary/20"
                      >
                        <VerificationBadge status={p.verificationStatus} />
                        <h2 className="mt-2 font-serif text-lg text-brand-primary transition-colors group-hover/card:text-brand-goldInk">
                          {p.name}
                        </h2>
                        <p className="mt-1 line-clamp-2 text-xs text-brand-muted">
                          {p.description}
                        </p>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            </LayoutGroup>

            {results.length === 0 && (
              <p className="py-20 text-center text-brand-muted">
                {favoritesOnly ? "收藏为空或未匹配筛选。" : "未找到匹配纹样。"}
              </p>
            )}
          </div>
        </div>
      </div>

      <ImageLightboxDialog
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        items={lightboxItems}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
