import { GalleryExhibition } from "@/components/gallery/GalleryExhibition";
import { RouteImagePreload } from "@/components/layout/RouteImagePreload";

export const metadata = { title: "作品展厅" };

export default function GalleryPage() {
  return (
    <>
      <RouteImagePreload href="/images/gallery/gallery-exhibition.png" />
      <GalleryExhibition />
    </>
  );
}
