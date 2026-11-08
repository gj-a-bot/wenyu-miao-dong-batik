import type { GalleryWork } from "@/types";

export function galleryAspectStyle(work: GalleryWork): { aspectRatio: string } {
  const raw = work.frameAspect ?? "3/4";
  const [w, h] = raw.split("/").map((n) => Number(n.trim()));
  if (w > 0 && h > 0) return { aspectRatio: `${w} / ${h}` };
  return { aspectRatio: "3 / 4" };
}

export function galleryImagePosition(work: GalleryWork): string {
  return work.objectPosition ?? "center";
}
