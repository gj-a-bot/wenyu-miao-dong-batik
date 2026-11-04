"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";
import { cn } from "@/lib/cn";

export function FavoriteButton({ patternId }: { patternId: string }) {
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActive(getFavorites().includes(patternId));
  }, [patternId]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setError(null);
          const { ok, favorites } = toggleFavorite(patternId);
          if (!ok) {
            setError("收藏失败：浏览器存储不可用。");
            return;
          }
          setActive(favorites.includes(patternId));
        }}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-sm transition",
        active
          ? "border-brand-gold bg-brand-gold/10 text-brand-primary"
          : "border-brand-primary/20 text-brand-gray hover:border-brand-primary"
      )}
      aria-pressed={active}
    >
      <Heart size={16} className={active ? "fill-brand-gold text-brand-gold" : ""} />
      {active ? "已收藏" : "收藏纹样"}
    </button>
      {error && (
        <p className="mt-2 text-xs text-amber-800">{error}</p>
      )}
    </div>
  );
}
