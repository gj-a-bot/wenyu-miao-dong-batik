"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { AiImageGeneration } from "@/components/leibox/ai-generating/AiImageGeneration";
import { cn } from "@/lib/cn";

const TITLE_ZH = "正在载入视觉内容";

type LeiboxDotGridLoaderProps = {
  className?: string;
  /** 相对容器的视觉高度（组件内卡片会随 motion 高度缩放） */
  height?: number;
};

const useIsomorphicLayout =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * LeiBox「点阵加载」占位（ai-generating）。
 * 来源：LeiBox https://leibox.pantoria.cn — 保留源码署名，见组件包内说明。
 */
export function LeiboxDotGridLoader({
  className,
  height = 220,
}: LeiboxDotGridLoaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayout(() => {
    let frame = 0;
    const patchTitle = () => {
      const surface = wrapRef.current?.querySelector("[data-motion-surface]");
      const root = surface?.shadowRoot;
      const title = root?.querySelector(".title");
      if (title) {
        title.textContent = TITLE_ZH;
        return;
      }
      frame = requestAnimationFrame(patchTitle);
    };
    patchTitle();
    return () => cancelAnimationFrame(frame);
  }, []);

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-paper via-logo-surface to-brand-primary/[0.06]",
          className
        )}
        role="status"
        aria-label={TITLE_ZH}
      >
        <span
          className="inline-block h-8 w-8 rounded-full border-2 border-brand-primary/20 border-t-brand-gold"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={cn(
        "flex h-full w-full items-center justify-center overflow-hidden bg-logo-surface",
        className
      )}
      role="status"
      aria-label={TITLE_ZH}
    >
      <div className="flex origin-center scale-[0.42] sm:scale-[0.48] md:scale-[0.52]">
        <AiImageGeneration options={{ height }} />
      </div>
    </div>
  );
}
