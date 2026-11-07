import { CriticalImagePreloads } from "@/components/layout/CriticalImagePreloads";

/** 仅首页预加载首屏大图，避免拖累工艺课堂等内页 */
export function HomeCriticalPreloads() {
  return <CriticalImagePreloads />;
}
