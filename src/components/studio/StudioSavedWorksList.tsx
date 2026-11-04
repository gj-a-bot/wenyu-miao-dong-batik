"use client";

import { useCallback, useEffect, useState } from "react";
import { deleteStudioWork, getStudioWorks } from "@/lib/storage";
import { SavedStudioWork } from "@/types";
import { Trash2 } from "lucide-react";

export function StudioSavedWorksList({
  onLoad,
  refreshKey,
}: {
  onLoad: (work: SavedStudioWork) => void;
  refreshKey: number;
}) {
  const [works, setWorks] = useState<SavedStudioWork[]>([]);

  const reload = useCallback(() => {
    setWorks(getStudioWorks<SavedStudioWork>());
  }, []);

  useEffect(() => {
    reload();
  }, [reload, refreshKey]);

  if (works.length === 0) {
    return (
      <p className="mt-4 text-[11px] leading-relaxed text-brand-gray">
        暂无本地保存。保存后在此加载或删除。
      </p>
    );
  }

  return (
    <ul className="mt-3 space-y-2">
      {works.map((w) => (
        <li
          key={w.id}
          className="flex items-start gap-2 border border-white/10 p-2 text-left"
        >
          {w.previewDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={w.previewDataUrl}
              alt=""
              className="h-10 w-10 shrink-0 object-cover"
            />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/5 text-[10px] text-brand-gray">
              无预览
            </span>
          )}
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => onLoad(w)}
              className="block w-full truncate text-left text-xs text-brand-cream hover:text-brand-gold"
            >
              {w.title || "未命名"}
            </button>
            <p className="text-[10px] text-brand-gray">{w.createdAt}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              deleteStudioWork(w.id);
              reload();
            }}
            className="shrink-0 p-1 text-brand-gray hover:text-red-300"
            aria-label={`删除 ${w.title}`}
          >
            <Trash2 size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
}
