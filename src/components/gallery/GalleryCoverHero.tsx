"use client";

import {
  CoverImageWithHotspots,
  type CoverHotspot,
} from "@/components/ui/CoverImageWithHotspots";

const GALLERY_HERO_SRC = "/images/gallery/gallery-exhibition.png";
const COVER_W = 1920;
const COVER_H = 1080;

const GALLERY_COVER_HOTSPOTS: CoverHotspot[] = [
  { href: "/", label: "纹语 WENYU 首页", x: 0.01, y: 0.028, w: 0.28, h: 0.23 },
  {
    href: "#gallery-works",
    label: "浏览展厅作品",
    x: 0.038,
    y: 0.678,
    w: 0.2,
    h: 0.14,
  },
  {
    href: "/studio",
    label: "开始创作",
    x: 0.205,
    y: 0.678,
    w: 0.17,
    h: 0.14,
  },
];

/** 作品展厅封面 — 与首页 Hero 同布局与尺寸策略 */
export function GalleryCoverHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="数字作品展厅主视觉"
    >
      <div className="relative mx-auto w-full">
        <CoverImageWithHotspots
          src={GALLERY_HERO_SRC}
          width={COVER_W}
          height={COVER_H}
          priority
          placeholder="lite"
          hotspots={GALLERY_COVER_HOTSPOTS}
        />
      </div>
      <h1 className="sr-only">
        纹语 WENYU — 数字作品展厅。让传统纹样，在新的媒介中继续生长。
      </h1>
      <p className="sr-only">
        本页主图为数字展厅概念视觉，非实拍展览现场；下方为可浏览的演示作品列表。
      </p>
    </section>
  );
}
