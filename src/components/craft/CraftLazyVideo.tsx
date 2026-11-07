"use client";

import { useEffect, useRef, useState } from "react";
import { encodePublicAssetPath } from "@/lib/craft-media";
import { cn } from "@/lib/cn";

type CraftLazyVideoProps = {
  videoSrc: string;
  posterSrc: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * 详情页视频：先展示 poster，进入视口后再挂载 src，避免工艺列表/首屏抢带宽。
 */
export function CraftLazyVideo({
  videoSrc,
  posterSrc,
  className,
  ariaLabel,
}: CraftLazyVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const encoded = encodePublicAssetPath(videoSrc);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={cn("absolute inset-0", className)}>
      {!active && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt=""
          className="h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
        />
      )}
      {active && (
        <video
          ref={videoRef}
          src={encoded}
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="none"
          poster={posterSrc}
          aria-label={ariaLabel}
        />
      )}
    </div>
  );
}
