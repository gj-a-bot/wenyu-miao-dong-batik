/** 当前路由主视觉预加载 */
export function RouteImagePreload({ href }: { href: string }) {
  return (
    <link rel="preload" as="image" href={href} fetchPriority="high" />
  );
}
