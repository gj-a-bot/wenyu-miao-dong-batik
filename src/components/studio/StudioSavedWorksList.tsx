"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    setWorks(getStudioWorks<SavedStudioWork>());
  }, [refreshKey]);

  if (works.length === 0) {
    return (
      <p className="mt-4 text-[11px] leading-relaxed text-brand-ink/85">
        暂无本地保存。保存后在此加载或删除。
      </p>
    );
  }

  return (
    <ul className="mt-3 space-y-2">
      {works.map((w) => (
        <li
          key={w.id}
          className="flex items-start gap-2 border border-brand-border bg-brand-paper p-2"
        >
          {w.previewDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={w.previewDataUrl}
              alt=""
              className="h-10 w-10 shrink-0 object-cover border border-brand-border"
            />
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand-border text-[10px] text-brand-secondary">
              无预览
            </span>
          )}
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => onLoad(w)}
              className="block w-full truncate text-left text-xs text-brand-primary hover:text-brand-goldInk"
            >
              {w.title || "未命名"}
            </button>
            <p className="text-[10px] text-brand-secondary">{w.createdAt}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              deleteStudioWork(w.id);
              setWorks(getStudioWorks<SavedStudioWork>());
            }}
            className="shrink-0 p-1 text-brand-secondary hover:text-red-700"
            aria-label={`删除 ${w.title}`}
          >
            <Trash2 size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
}
