import type { GalleryWork } from "@/types";

export type GalleryExhibitKind =
  | "traditional"
  | "craft-record"
  | "digital-remix";

const CATEGORY_KIND: Record<string, GalleryExhibitKind> = {
  数字再创作: "digital-remix",
  研究稿: "digital-remix",
  视觉设计: "digital-remix",
};

const KIND_LABEL: Record<GalleryExhibitKind, string> = {
  traditional: "传统实物参考",
  "craft-record": "工艺记录",
  "digital-remix": "数字再创作",
};

export function galleryExhibitKind(work: GalleryWork): GalleryExhibitKind {
  return CATEGORY_KIND[work.category] ?? "digital-remix";
}

export function galleryExhibitLabel(work: GalleryWork): string {
  return KIND_LABEL[galleryExhibitKind(work)];
}

export const galleryExhibitFilters = [
  "全部",
  "数字再创作",
  "工艺记录",
  "传统实物参考",
] as const;

export function matchGalleryExhibitFilter(
  work: GalleryWork,
  filter: string
): boolean {
  if (filter === "全部") return true;
  if (filter === "数字再创作") return galleryExhibitKind(work) === "digital-remix";
  if (filter === "工艺记录") return galleryExhibitKind(work) === "craft-record";
  if (filter === "传统实物参考")
    return galleryExhibitKind(work) === "traditional";
  return work.category === filter;
}
