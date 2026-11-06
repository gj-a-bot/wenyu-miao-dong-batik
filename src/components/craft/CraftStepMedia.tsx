"use client";

import Image from "next/image";
import { isCraftVideoSrc } from "@/lib/craft-media";
import { cn } from "@/lib/cn";

type CraftStepMediaProps = {
  src: string;
  stepId: string;
  className?: string;
  imageClassName?: string;
  /** 列表：静音循环；详情：控件 */
  variant: "thumbnail" | "detail";
};

export function CraftStepMedia({
  src,
  stepId,
  className,
  imageClassName,
  variant,
}: CraftStepMediaProps) {
  const isDye = stepId === "dye";
  const isVideo = isCraftVideoSrc(src);

  if (isVideo) {
    return (
      <video
        src={src}
        className={cn("absolute inset-0 h-full w-full", imageClassName)}
        muted={variant === "thumbnail"}
        loop={variant === "thumbnail"}
        playsInline
        controls={variant === "detail"}
        preload="metadata"
        aria-label={
          variant === "detail"
            ? isDye
              ? "蓝靛染色概念演示短片"
              : "工艺演示短片"
            : undefined
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
      className={imageClassName}
      role="presentation"
    />
  );
}
