"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/storage";
import { cn } from "@/lib/cn";

export function FavoriteButton({ patternId }: { patternId: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(getFavorites().includes(patternId));
  }, [patternId]);

  return (
    <button
      type="button"
      onClick={() => {
        const next = toggleFavorite(patternId);
        setActive(next.includes(patternId));
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
  );
}
