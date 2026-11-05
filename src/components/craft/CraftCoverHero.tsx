"use client";

import {
  CoverImageWithHotspots,
  type CoverHotspot,
} from "@/components/ui/CoverImageWithHotspots";

const CRAFT_COVER_SRC = "/images/craft/craft-process-cover.png";
const COVER_W = 1920;
const COVER_H = 1080;

const CRAFT_COVER_HOTSPOTS: CoverHotspot[] = [
  { href: "/", label: "纹语 WENYU 首页", x: 0.01, y: 0.028, w: 0.28, h: 0.23 },
  {
    href: "#craft-steps",
    label: "走进工艺课堂",
    x: 0.038,
    y: 0.68,
    w: 0.22,
    h: 0.14,
  },
];

export function CraftCoverHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-logo-surface"
      aria-label="工艺课堂主视觉"
    >
      <CoverImageWithHotspots
        src={CRAFT_COVER_SRC}
        width={COVER_W}
        height={COVER_H}
        priority
        hotspots={CRAFT_COVER_HOTSPOTS}
      />
      <h1 className="sr-only">
        一场关于蜡与蓝的创作 — 探索苗侗蜡染的制作工艺，感受千年传承的手工之美
      </h1>
    </section>
  );
}
