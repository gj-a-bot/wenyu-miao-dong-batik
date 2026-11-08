"use client";

import {
  CoverImageWithHotspots,
  type CoverHotspot,
} from "@/components/ui/CoverImageWithHotspots";

const STUDIO_HERO_SRC = "/images/studio/studio-editor-visual.png";
const COVER_W = 1920;
const COVER_H = 1080;

const STUDIO_HERO_HOTSPOTS: CoverHotspot[] = [
  { href: "/", label: "纹语 WENYU 首页", x: 0.01, y: 0.028, w: 0.28, h: 0.23 },
  { href: "#studio-workspace", label: "进入工作台", x: 0.038, y: 0.678, w: 0.2, h: 0.14 },
];

/**
 * 数字共创顶部主视觉 — 与首页同比例宽幅 contain 展示，封面区不加额外底色。
 */
export function StudioHeroVisual() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="数字共创实验室主视觉"
    >
      <div className="relative mx-auto w-full">
        <CoverImageWithHotspots
          src={STUDIO_HERO_SRC}
          width={COVER_W}
          height={COVER_H}
          priority
          placeholder="lite"
          hotspots={STUDIO_HERO_HOTSPOTS}
        />
      </div>
      <h1 className="sr-only">纹语 WENYU — 数字共创实验室</h1>
    </section>
  );
}
