"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Star } from "lucide-react";
import {
  filterBatikReferences,
  filterMuseumPatterns,
  museumCategoryFilters,
  museumEthnicityFilters,
  museumRegionFilters,
} from "@/lib/pattern-catalog";
import { VerificationBadge } from "@/components/patterns/VerificationBadge";
import { ArchiveStatusBadges } from "@/components/patterns/ArchiveStatusBadges";
import { Tag } from "@/components/ui/Tag";
import { getFavorites } from "@/lib/storage";
import { cn } from "@/lib/cn";
import {
  CoverImageWithHotspots,
  type CoverHotspot,
} from "@/components/ui/CoverImageWithHotspots";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { BatikDisplayFrame } from "@/components/ui/BatikDisplayFrame";

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
  const [partition, setPartition] = useState<
    "all" | "archive" | "reference" | "experimental"
  >("all");
  const [category, setCategory] = useState("全部");
  const [ethnicity, setEthnicity] = useState("全部");
  const [region, setRegion] = useState("全部");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(getFavorites());
  }, []);

  const results = useMemo(
    () =>
      filterMuseumPatterns({
        category,
        ethnicity,
        region,
        query,
        favoritesOnly,
        favoriteIds,
        partition: partition === "reference" ? "all" : partition,
      }),
    [category, ethnicity, region, query, favoritesOnly, favoriteIds, partition]
  );

  const referenceResults = useMemo(
    () => (partition === "reference" ? filterBatikReferences(query) : []),
    [partition, query]
  );

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        aria-label="纹样博物馆封面"
      >
        <div className="relative mx-auto w-full">
          <CoverImageWithHotspots
            src={MUSEUM_COVER_SRC}
            width={COVER_W}
            height={COVER_H}
            priority
            placeholder="lite"
            hotspots={MUSEUM_COVER_HOTSPOTS}
          />
        </div>
        <h1 className="sr-only">
          纹样博物馆 — 探索苗侗蜡染的纹样之美。在数字世界中，遇见千年传承的纹样艺术。
        </h1>
      </section>

      <BatikTextureSurface as="div" variant="band" className="w-full">
      <div
        id="pattern-archive"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14"
      >
      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="lg:w-56 shrink-0">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand-gray">
            分类
          </p>
          <div className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
            {museumCategoryFilters.map((cat) => (
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
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-brand-gray">
            民族
          </p>
          <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
            {["全部", ...museumEthnicityFilters].map((eth) => (
              <Tag
                key={eth}
                active={ethnicity === eth}
                onClick={() => setEthnicity(eth)}
                className="justify-center lg:justify-start"
              >
                {eth}
              </Tag>
            ))}
          </div>
          <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-brand-gray">
            地区·支系
          </p>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="wenyu-input mt-3 w-full text-sm"
            aria-label="按地区支系筛选"
          >
            <option value="全部">全部</option>
            {museumRegionFilters.map((r) => (
              <option key={r} value={r}>
                {r.length > 36 ? `${r.slice(0, 36)}…` : r}
              </option>
            ))}
          </select>
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
          <div className="flex flex-wrap gap-2 border-b border-brand-border pb-4">
            {(
              [
                ["all", "全部"],
                ["archive", "文化档案（15）"],
                ["reference", "实物参考图（24）"],
                ["experimental", "数字实验（9）"],
              ] as const
            ).map(([key, label]) => (
              <Tag
                key={key}
                active={partition === key}
                onClick={() => setPartition(key)}
              >
                {label}
              </Tag>
            ))}
          </div>
          <label className="relative mt-6 block">
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

          <p className="mt-4 text-sm text-brand-gray">
            {partition === "reference"
              ? `共 ${referenceResults.length} 张实物参考图（来自你整理的蜡染文件夹）`
              : `共 ${results.length} 条条目`}
          </p>

          {partition === "reference" ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {referenceResults.map((ref) => (
                <div
                  key={ref.id}
                  className="overflow-hidden border border-brand-border bg-brand-warm"
                >
                  <BatikDisplayFrame
                    mat="warm"
                    className="wenyu-batik-display-frame--lift aspect-[3/4] w-full"
                  >
                    <Image
                      src={ref.image}
                      alt={ref.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 z-10 bg-brand-dark/80 px-2 py-1 text-[10px] text-brand-warm">
                      实物参考 · 待配对档案
                    </span>
                  </BatikDisplayFrame>
                  <div className="px-4 py-3">
                    <h2 className="font-serif text-lg text-brand-primary">
                      {ref.title}
                    </h2>
                    <p className="mt-1 text-xs text-brand-muted">
                      {ref.sourceNote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {partition !== "reference" ? (
          <div className="mt-10 columns-1 gap-5 sm:columns-2 xl:columns-3">
            {results.map((p, i) => {
              const isPlaceholder =
                p.kind === "archive" &&
                p.imagePending &&
                !p.referencePreview;
              const isRefPreview =
                p.kind === "archive" && !!p.referencePreview;
              const isExperimental = p.kind === "experimental";
              const isArchiveShowcaseImage =
                isExperimental && p.image.startsWith("/images/patterns/");
              const isVortexDetail = p.id === "motif-spiral-type";
              return (
              <Link
                key={p.id}
                href={`/patterns/${p.id}`}
                className={cn(
                  "group mb-5 block break-inside-avoid bg-brand-warm transition duration-300",
                  i % 3 === 1 && "sm:mt-6"
                )}
              >
                <BatikDisplayFrame
                  mat="warm"
                  className={cn(
                    "wenyu-batik-display-frame--lift w-full",
                    isPlaceholder || isArchiveShowcaseImage
                      ? "aspect-[3/2]"
                      : i % 2 === 0
                        ? "aspect-[4/5]"
                        : "aspect-square"
                  )}
                >
                  <Image
                    src={p.image}
                    alt={
                      isPlaceholder ? `${p.name}（配图待补充）` : p.name
                    }
                    fill
                    className={cn(
                      "transition duration-700",
                      isPlaceholder
                        ? "object-contain p-6 bg-logo-surface"
                        : "object-cover",
                      isRefPreview && "brightness-[0.98] saturate-[0.95]",
                      isArchiveShowcaseImage
                        ? isVortexDetail
                          ? "object-[50%_56%] brightness-[0.97] saturate-[0.92] group-hover:scale-[1.02]"
                          : "object-center group-hover:scale-[1.02]"
                        : !isPlaceholder && "group-hover:scale-[1.03]"
                    )}
                  />
                  {isRefPreview ? (
                    <span className="absolute bottom-3 left-3 z-10 bg-brand-dark/85 px-2 py-1 text-[10px] text-brand-warm">
                      列表预览：实物参考（待核对）
                    </span>
                  ) : null}
                </BatikDisplayFrame>
                <div className="border-t border-brand-border px-4 py-3">
                  {p.kind === "archive" ? (
                    <ArchiveStatusBadges
                      sourceStatus={p.sourceStatus}
                      imageStatus={p.imageStatus}
                    />
                  ) : (
                    <VerificationBadge status={p.verificationStatus} />
                  )}
                  <h2 className="mt-2 font-serif text-lg text-brand-primary">
                    {p.name}
                  </h2>
                  <p className="mt-1 text-[10px] text-brand-gray">
                    {p.kind === "archive"
                      ? p.region.slice(0, 40)
                      : p.category}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-brand-muted">
                    {p.description}
                  </p>
                </div>
              </Link>
              );
            })}
          </div>
          ) : null}

          {partition === "reference" && referenceResults.length === 0 && (
            <p className="py-20 text-center text-brand-gray">未找到匹配参考图。</p>
          )}

          {partition !== "reference" && results.length === 0 && (
            <p className="py-20 text-center text-brand-gray">
              {favoritesOnly ? "收藏为空或未匹配筛选。" : "未找到匹配纹样。"}
            </p>
          )}
        </div>
      </div>
      </div>
      </BatikTextureSurface>
    </>
  );
}
