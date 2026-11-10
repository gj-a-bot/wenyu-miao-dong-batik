import patternsData from "@/data/patterns.json";
import craftData from "@/data/craft.json";
import galleryData from "@/data/gallery.json";
import { CraftStep, GalleryWork, Pattern } from "@/types";

export const patterns = patternsData as Pattern[];
export const craftSteps = [...(craftData as CraftStep[])].sort(
  (a, b) => a.order - b.order
);
export const galleryWorks = galleryData as GalleryWork[];

export function getPatternById(id: string): Pattern | undefined {
  return patterns.find((p) => p.id === id);
}

export function getCraftStepById(id: string): CraftStep | undefined {
  return craftSteps.find((s) => s.id === id);
}

export function getGalleryWorkById(id: string): GalleryWork | undefined {
  return galleryWorks.find((w) => w.id === id);
}

export const patternCategories = [
  "全部",
  ...Array.from(new Set(patterns.map((p) => p.category))),
];

export const galleryCategories = [
  "全部",
  ...Array.from(new Set(galleryWorks.map((w) => w.category))),
];

export function filterPatterns(options: {
  category?: string;
  query?: string;
  favoritesOnly?: boolean;
  favoriteIds?: string[];
}): Pattern[] {
  const {
    category = "全部",
    query = "",
    favoritesOnly = false,
    favoriteIds = [],
  } = options;
  const q = query.trim().toLowerCase();
  return patterns.filter((p) => {
    const matchCat = category === "全部" || p.category === category;
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q);
    const matchFav =
      !favoritesOnly || favoriteIds.includes(p.id);
    return matchCat && matchQuery && matchFav;
  });
}
