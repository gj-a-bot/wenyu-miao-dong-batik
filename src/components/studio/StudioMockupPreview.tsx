"use client";

import { useEffect, useState } from "react";
import { renderStudioToCanvas } from "@/lib/studio-export";
import { STUDIO_CANVAS_SIZE } from "@/lib/studio-canvas";
import type { CreativeProductId, StudioConfig } from "@/types";
import { cn } from "@/lib/cn";

const PRODUCTS: { id: CreativeProductId; label: string }[] = [
  { id: "tote", label: "帆布包" },
  { id: "poster", label: "海报" },
  { id: "bookmark", label: "书签" },
  { id: "wallpaper", label: "手机壁纸" },
];

type Props = {
  config: StudioConfig;
  product: CreativeProductId;
  onProductChange: (id: CreativeProductId) => void;
  className?: string;
};

export function StudioMockupPreview({
  config,
  product,
  onProductChange,
  className,
}: Props) {
  const [artUrl, setArtUrl] = useState("");

  useEffect(() => {
    const canvas = renderStudioToCanvas(config, STUDIO_CANVAS_SIZE);
    setArtUrl(canvas.toDataURL("image/png"));
  }, [config]);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="flex flex-wrap justify-center gap-2">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onProductChange(p.id)}
            className={cn(
              "wenyu-chip text-[11px]",
              product === p.id && "border-brand-gold bg-brand-primary text-brand-warm"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="relative w-full max-w-md">
        {product === "tote" && <MockupTote artUrl={artUrl} />}
        {product === "poster" && <MockupPoster artUrl={artUrl} />}
        {product === "bookmark" && <MockupBookmark artUrl={artUrl} />}
        {product === "wallpaper" && <MockupWallpaper artUrl={artUrl} />}
      </div>
      <p className="text-center text-[10px] text-brand-secondary">
        文创预览保留当前画布参数，仅切换载体比例与构图。
      </p>
    </div>
  );
}

function PatternFill({ artUrl, className }: { artUrl: string; className?: string }) {
  return (
    <div
      className={cn("bg-cover bg-center", className)}
      style={{ backgroundImage: artUrl ? `url(${artUrl})` : undefined }}
    />
  );
}

function MockupTote({ artUrl }: { artUrl: string }) {
  return (
    <div className="mx-auto w-[280px]">
      <div className="relative rounded-sm bg-[#d4cfc4] p-6 shadow-archive">
        <div className="absolute left-4 right-4 top-0 h-14 rounded-b-full border-2 border-[#8a857a] bg-transparent" />
        <PatternFill
          artUrl={artUrl}
          className="mt-8 aspect-square w-full border border-brand-border/60"
        />
        <div className="mt-3 h-2 w-full bg-[#b8b3a8]/60" />
      </div>
    </div>
  );
}

function MockupPoster({ artUrl }: { artUrl: string }) {
  return (
    <div className="mx-auto w-[240px] border-[10px] border-brand-primary bg-brand-warm p-2 shadow-archive">
      <PatternFill artUrl={artUrl} className="aspect-[3/4] w-full" />
      <p className="mt-2 text-center font-serif text-xs text-brand-primary">
        纹语 · 蜡染纹样展
      </p>
    </div>
  );
}

function MockupBookmark({ artUrl }: { artUrl: string }) {
  return (
    <div className="mx-auto flex w-[120px] flex-col items-center">
      <div className="relative w-full overflow-hidden border border-brand-border bg-brand-warm shadow-archive">
        <PatternFill artUrl={artUrl} className="aspect-[1/3.8] w-full" />
        <div className="absolute bottom-0 left-0 right-0 bg-brand-primary/90 py-2 text-center text-[9px] tracking-widest text-brand-warm">
          WENYU
        </div>
      </div>
      <div className="mt-1 h-3 w-12 rounded-full bg-brand-gold/40" />
    </div>
  );
}

function MockupWallpaper({ artUrl }: { artUrl: string }) {
  return (
    <div className="mx-auto w-[200px] rounded-[1.75rem] border-[6px] border-brand-primary bg-brand-ink p-1 shadow-archive">
      <div className="relative overflow-hidden rounded-[1.35rem] bg-brand-warm">
        <PatternFill artUrl={artUrl} className="aspect-[9/19] w-full" />
        <div className="pointer-events-none absolute left-1/2 top-6 h-5 w-20 -translate-x-1/2 rounded-full bg-brand-ink/75" />
      </div>
    </div>
  );
}
