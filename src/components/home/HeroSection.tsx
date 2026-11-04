"use client";

import { motion } from "framer-motion";
import {
  CoverImageWithHotspots,
  type CoverHotspot,
} from "@/components/ui/CoverImageWithHotspots";

const HERO_SRC = "/images/hero/hero-batik-main.png";
const COVER_W = 1920;
const COVER_H = 1080;

const HOME_COVER_HOTSPOTS: CoverHotspot[] = [
  { href: "/", label: "纹语 WENYU 首页", x: 0.01, y: 0.028, w: 0.28, h: 0.23 },
  { href: "/patterns", label: "探索纹样", x: 0.038, y: 0.678, w: 0.18, h: 0.14 },
  { href: "/studio", label: "开始创作", x: 0.205, y: 0.678, w: 0.17, h: 0.14 },
];

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-logo-surface"
      aria-label="首页主视觉"
    >
      <motion.div
        className="relative mx-auto w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <CoverImageWithHotspots
          src={HERO_SRC}
          width={COVER_W}
          height={COVER_H}
          priority
          hotspots={HOME_COVER_HOTSPOTS}
        />
      </motion.div>

      <div className="sr-only">
        <h1>纹语 WENYU — 让古老纹样，在数字时代重新生长</h1>
        <p>探索苗侗蜡染的纹样之美、工艺之韵与数字创作的无限可能。</p>
      </div>
    </section>
  );
}
