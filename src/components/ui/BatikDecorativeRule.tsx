import { cn } from "@/lib/cn";

type BatikDecorativeRuleProps = {
  /** 取图顶部或底部中心装饰线 */
  edge?: "top" | "bottom";
  /** indigo：靛蓝章节；paper：暖白/卡片邻近处，弱化底色铺陈 */
  tone?: "indigo" | "paper";
  wide?: boolean;
  className?: string;
};

/**
 * 蜡染框饰图局部切片 — 仅展示顶/底装饰线，非整张铺底。
 * 路径：/images/decorations/batik-decorative-border.png
 */
export function BatikDecorativeRule({
  edge = "top",
  tone = "indigo",
  wide = false,
  className,
}: BatikDecorativeRuleProps) {
  return (
    <hr
      aria-hidden
      className={cn(
        "wenyu-batik-border-rule",
        edge === "bottom" && "wenyu-batik-border-rule--bottom",
        tone === "paper" && "wenyu-batik-border-rule--on-paper",
        wide && "wenyu-batik-border-rule--wide",
        className
      )}
    />
  );
}
