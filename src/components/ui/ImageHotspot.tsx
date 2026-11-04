"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import type { CSSProperties } from "react";

type ImageHotspotProps = {
  href: string;
  label: string;
  className?: string;
  style?: CSSProperties;
};

/** 覆盖在静态主视觉上的透明可点击区域，不改变画面外观 */
export function ImageHotspot({
  href,
  label,
  className,
  style,
}: ImageHotspotProps) {
  const router = useRouter();
  const isHash = href.startsWith("#");

  const classes = cn(
    "absolute z-[35] block cursor-pointer rounded-md",
    "bg-transparent [touch-action:manipulation]",
    "pointer-events-auto",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold focus-visible:outline-offset-2",
    className
  );

  const onNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHash) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      }
      return;
    }
    if (
      href.startsWith("/") &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      e.button === 0
    ) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <a
      href={href}
      aria-label={label}
      className={classes}
      style={style}
      onClick={onNavigate}
    >
      <span className="sr-only">{label}</span>
    </a>
  );
}

type ImageHotspotLayerProps = {
  children: React.ReactNode;
  className?: string;
};

export function ImageHotspotLayer({
  children,
  className,
}: ImageHotspotLayerProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-[30]", className)}>
      {children}
    </div>
  );
}
