import { PatternsArchive } from "@/components/patterns/PatternsArchive";
import { RouteImagePreload } from "@/components/layout/RouteImagePreload";

export const metadata = { title: "纹样博物馆" };

export default function PatternsPage() {
  return (
    <>
      <RouteImagePreload href="/images/museum/pattern-museum-cover.png" />
      <PatternsArchive />
    </>
  );
}
