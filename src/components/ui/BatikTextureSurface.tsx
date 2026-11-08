import { cn } from "@/lib/cn";

/** 全站复用蜡染肌理：局部章节 / 分隔带 / 卡片一角点缀（见 globals.css） */
const VARIANT_CLASS = {
  /** 宽幅章节底：暖白遮罩 + 平铺肌理，适合 section */
  section: "wenyu-batik-section",
  /** 叠在现有底色上，伪元素承载肌理，不挡交互 */
  band: "wenyu-batik-band",
  /** 靛蓝底 + 蜡染肌理（首页共创等板块） */
  bandIndigo: "wenyu-batik-band-indigo",
  /** 数字共创工作台：整区密铺蜡染 */
  studioRich: "wenyu-batik-studio",
  /** 卡片右上淡角饰，主体仍为暖白底 */
  accent: "wenyu-batik-card-accent",
  /** 章节间细条分隔（3px） */
  divider: "wenyu-batik-divider",
} as const;

export type BatikTextureVariant = keyof typeof VARIANT_CLASS;

type BatikTextureSurfaceProps = {
  variant?: BatikTextureVariant;
  className?: string;
  children?: React.ReactNode;
  as?: "div" | "section" | "aside" | "article";
} & React.HTMLAttributes<HTMLElement>;

export function BatikTextureSurface({
  variant = "band",
  className,
  children,
  as: Tag = "div",
  ...rest
}: BatikTextureSurfaceProps) {
  return (
    <Tag
      className={cn(VARIANT_CLASS[variant], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
