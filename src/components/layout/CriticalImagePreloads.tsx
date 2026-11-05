const CRITICAL_IMAGES = [
  "/images/brand/wenyu-logo.png",
  "/images/hero/hero-batik-main.png",
] as const;

/** 全站首屏常见资源预加载（配合 priority 图片） */
export function CriticalImagePreloads() {
  return (
    <>
      {CRITICAL_IMAGES.map((href) => (
        <link
          key={href}
          rel="preload"
          as="image"
          href={href}
          fetchPriority="high"
        />
      ))}
    </>
  );
}
