import { cn } from "@/lib/cn";

export type BatikDisplayMat = "warm" | "dark" | "none";

type BatikDisplayFrameProps = {
  children: React.ReactNode;
  /** 画芯底色：暖白展墙 / 深色展厅 / 透明（媒体铺满） */
  mat?: BatikDisplayMat;
  /** 加宽外圈框线，用于详情主图 / 主视频 */
  prominent?: boolean;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
};

/**
 * 蜡染框饰展示框 — 使用 /images/decorations/batik-decorative-border.png
 * 仅外圈框线露出，画芯区域由子内容或 mat 色承担，避免整图铺满卡片正文区。
 */
export function BatikDisplayFrame({
  children,
  mat = "dark",
  prominent = false,
  className,
  innerClassName,
  style,
}: BatikDisplayFrameProps) {
  return (
    <div
      className={cn(
        "wenyu-batik-display-frame",
        mat === "warm" && "wenyu-batik-display-frame--mat-warm",
        mat === "dark" && "wenyu-batik-display-frame--mat-dark",
        mat === "none" && "wenyu-batik-display-frame--mat-none",
        prominent && "wenyu-batik-display-frame--prominent",
        className
      )}
      style={style}
    >
      <div className={cn("wenyu-batik-display-frame__inner", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
