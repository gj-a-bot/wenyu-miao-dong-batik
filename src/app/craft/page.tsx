import { CraftFlow } from "@/components/craft/CraftFlow";
import { RouteImagePreload } from "@/components/layout/RouteImagePreload";

export const metadata = { title: "工艺数字课堂" };

export default function CraftPage() {
  return (
    <>
      <RouteImagePreload href="/images/craft/craft-process-cover.png" />
      <CraftFlow />
    </>
  );
}
