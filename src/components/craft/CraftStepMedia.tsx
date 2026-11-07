"use client";

import Image from "next/image";
import { CraftLazyVideo } from "@/components/craft/CraftLazyVideo";
import { encodePublicAssetPath, isCraftVideoSrc } from "@/lib/craft-media";
import { cn } from "@/lib/cn";

type CraftStepMediaProps = {
  src: string;
  /** 视频步骤的静态封面；列表仅用封面，不拉取 MP4 */
  posterSrc?: string;
  stepId: string;
  className?: string;
  imageClassName?: string;
  /** 列表：静音循环；详情：控件 */
  variant: "thumbnail" | "detail";
  priority?: boolean;
};

export function CraftStepMedia({
  src,
  posterSrc,
  stepId,
  className,
  imageClassName,
  variant,
  priority = false,
}: CraftStepMediaProps) {
  const isDye = stepId === "dye";
  const isVideo = isCraftVideoSrc(src);
  const thumbSrc = isVideo ? (posterSrc ?? src) : src;

  if (isVideo && variant === "thumbnail") {
    return (
      <Image
        src={thumbSrc}
        alt=""
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        className={cn("absolute inset-0 h-full w-full", imageClassName)}
        role="presentation"
      />
    );
  }

  if (isVideo && variant === "detail") {
    const poster = posterSrc ?? "";
    return (
      <CraftLazyVideo
        videoSrc={src}
        posterSrc={poster}
        className={imageClassName}
        ariaLabel={
          isDye ? "蓝靛染色概念演示短片" : "工艺演示短片"
        }
      />
    );
  }

  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      className={cn("absolute inset-0 h-full w-full", imageClassName)}
      role="presentation"
    />
  );
}
