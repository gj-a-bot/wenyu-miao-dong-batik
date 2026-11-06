"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageLightboxDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: LightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
};

export function ImageLightboxDialog({
  open,
  onOpenChange,
  items,
  index,
  onIndexChange,
}: ImageLightboxDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  const len = items.length;
  const safeIndex = len > 0 ? Math.min(Math.max(0, index), len - 1) : 0;
  const item = len > 0 ? items[safeIndex] : null;

  const go = useCallback(
    (delta: -1 | 1) => {
      if (len <= 1) return;
      onIndexChange((safeIndex + delta + len) % len);
    },
    [len, onIndexChange, safeIndex]
  );

  useEffect(() => {
    if (!open || len === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, len, go, onOpenChange]);

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "image-lightbox-dialog fixed inset-0 z-[200] m-0 flex h-full max-h-none w-full max-w-none flex-col border-0 bg-brand-deep/92 p-0 text-brand-warm shadow-none backdrop:bg-brand-deep/90"
      )}
      onClose={() => onOpenChange(false)}
      onClick={(e) => {
        if (e.target === dialogRef.current) onOpenChange(false);
      }}
      aria-modal="true"
      aria-label="纹样大图预览"
    >
      <div
        className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-16 md:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-sm border border-brand-warm/25 bg-brand-dark/60 p-2 text-brand-warm transition hover:border-brand-gold/50 hover:bg-brand-primary/40"
          aria-label="关闭预览"
        >
          <X size={20} strokeWidth={1.75} />
        </button>

        {len > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm border border-brand-warm/20 bg-brand-dark/50 p-2.5 text-brand-warm transition hover:border-brand-gold/45 md:left-6 md:block"
              aria-label="上一张"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-sm border border-brand-warm/20 bg-brand-dark/50 p-2.5 text-brand-warm transition hover:border-brand-gold/45 md:right-6 md:block"
              aria-label="下一张"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </>
        )}

        <div className="relative h-[min(82vh,800px)] w-full max-w-5xl">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority={open}
          />
        </div>

        <div className="mt-6 max-w-2xl text-center">
          <p className="font-serif text-lg text-brand-warm">{item.alt}</p>
          {item.caption ? (
            <p className="mt-2 text-sm leading-relaxed text-brand-gray">
              {item.caption}
            </p>
          ) : null}
          {len > 1 ? (
            <p className="mt-3 text-xs text-brand-gray/90">
              {safeIndex + 1} / {len} · 方向键切换 · Esc 关闭
            </p>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
