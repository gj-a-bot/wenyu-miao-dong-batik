"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";

type ProgressiveBlockImageProps = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  presentation?: boolean;
};

/** 加载完成前显示品牌色占位，整图一次性淡入，避免 PNG 逐行刷出 */
export function ProgressiveBlockImage({
  src,
  width,
  height,
  alt = "",
  priority,
  sizes = "100vw",
  className,
  imageClassName,
  presentation,
}: ProgressiveBlockImageProps) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-logo-surface", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-brand-paper via-logo-surface to-brand-primary/[0.06]",
          "transition-opacity duration-300 motion-reduce:transition-none",
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        aria-hidden
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        role={presentation ? "presentation" : undefined}
        onLoadingComplete={() => setReady(true)}
        className={cn(
          "object-contain object-center transition-opacity duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100",
          ready ? "opacity-100" : "opacity-0",
          imageClassName
        )}
      />
    </div>
  );
}

type ProgressiveInlineImageProps = Omit<
  ImageProps,
  "onLoadingComplete" | "className"
> & {
  wrapperClassName?: string;
  imageClassName?: string;
};

export function ProgressiveInlineImage({
  wrapperClassName,
  imageClassName,
  priority,
  alt = "",
  ...props
}: ProgressiveInlineImageProps) {
  const [ready, setReady] = useState(false);

  return (
    <span className={cn("relative inline-block", wrapperClassName)}>
      {!ready && (
        <span
          className="absolute inset-0 rounded-sm bg-brand-primary/[0.06] motion-reduce:hidden"
          aria-hidden
        />
      )}
      <Image
        {...props}
        alt={alt}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        onLoadingComplete={() => setReady(true)}
        className={cn(
          "transition-opacity duration-300 ease-out motion-reduce:opacity-100",
          ready ? "opacity-100" : "opacity-0",
          imageClassName
        )}
      />
    </span>
  );
}
