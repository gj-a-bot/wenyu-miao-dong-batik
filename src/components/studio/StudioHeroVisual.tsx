"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { LeiboxDotGridLoader } from "@/components/leibox/LeiboxDotGridLoader";
import { ProgressiveBlockImage } from "@/components/ui/ProgressiveBlockImage";

const STUDIO_HERO_SRC = "/images/studio/studio-editor-visual.png";
const HERO_W = 1920;
const HERO_H = 1080;

/**
 * 数字共创实验室顶部主视觉（图内已含品牌与界面示意，不再叠加文案或假按钮）。
 */
export function StudioHeroVisual() {
  const [mobileReady, setMobileReady] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden border-b border-brand-border bg-logo-surface"
      aria-label="数字共创实验室主视觉"
    >
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div
          className="relative aspect-[5/4] w-full overflow-hidden md:hidden"
          style={{ maxHeight: "min(72vw, 420px)" }}
        >
          <div
            className={cn(
              "absolute inset-0 z-[1] transition-opacity duration-300",
              mobileReady ? "pointer-events-none opacity-0" : "opacity-100"
            )}
            aria-hidden={mobileReady}
          >
            <LeiboxDotGridLoader className="min-h-[120px]" />
          </div>
          <Image
            src={STUDIO_HERO_SRC}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            role="presentation"
            onLoadingComplete={() => setMobileReady(true)}
            className={cn(
              "object-cover object-[56%_46%] transition-opacity duration-500 ease-out",
              mobileReady ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        <div className="hidden md:block">
          <ProgressiveBlockImage
            src={STUDIO_HERO_SRC}
            width={HERO_W}
            height={HERO_H}
            priority
            presentation
            sizes="100vw"
            imageClassName="object-contain object-center"
          />
        </div>
      </div>
      <h1 className="sr-only">纹语 WENYU — 数字共创实验室</h1>
    </section>
  );
}
