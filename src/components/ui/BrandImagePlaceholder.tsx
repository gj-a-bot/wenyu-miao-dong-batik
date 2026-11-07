import { cn } from "@/lib/cn";

/** 轻量占位，避免在列表/封面路由挂载重型 LeiBox 动画 */
export function BrandImagePlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[120px] w-full items-center justify-center bg-gradient-to-br from-brand-paper via-logo-surface to-brand-primary/[0.06]",
        className
      )}
      role="status"
      aria-label="正在载入图片"
    >
      <span
        className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-brand-primary/15 border-t-brand-gold motion-reduce:animate-none"
        aria-hidden
      />
    </div>
  );
}
