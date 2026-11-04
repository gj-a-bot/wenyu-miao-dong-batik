import { StudioAsset } from "@/types";

export const studioAssets: StudioAsset[] = [
  {
    id: "asset-rhombus",
    name: "菱格单元",
    type: "geometric",
    label: "数字设计实验素材",
    svgPath: "M50 5 L95 50 L50 95 L5 50 Z M50 25 L75 50 L50 75 L25 50 Z",
    viewBox: "0 0 100 100",
  },
  {
    id: "asset-wave",
    name: "波纹线",
    type: "line",
    label: "数字设计实验素材",
    svgPath: "M0 50 Q25 20 50 50 T100 50",
    viewBox: "0 0 100 100",
  },
  {
    id: "asset-petal",
    name: "对称瓣形",
    type: "symmetry",
    label: "数字设计实验素材",
    svgPath: "M50 10 C70 30 70 70 50 90 C30 70 30 30 50 10 Z",
    viewBox: "0 0 100 100",
  },
  {
    id: "asset-blob",
    name: "抽象块面",
    type: "abstract",
    label: "数字设计实验素材",
    svgPath: "M20 40 C40 10 80 20 85 55 C75 85 35 90 20 40 Z",
    viewBox: "0 0 100 100",
  },
  {
    id: "asset-cross",
    name: "经纬十字",
    type: "original",
    label: "纹语原创图形",
    svgPath: "M45 5 H55 V45 H95 V55 H55 V95 H45 V55 H5 V45 H45 Z",
    viewBox: "0 0 100 100",
  },
];

export const presetPalettes = [
  { name: "经典靛蓝", primary: "#183B56", background: "#F4F0E6" },
  { name: "深夜蓝", primary: "#0B1F33", background: "#E8E4DA" },
  { name: "暖金点缀", primary: "#183B56", background: "#F4F0E6", accent: "#C69B5D" },
  { name: "雾灰研究", primary: "#5B7C99", background: "#F4F0E6" },
];

export const layoutPresets = [
  { name: "单点聚焦", repeatX: 1, repeatY: 1, scale: 1.2, spacing: 0 },
  { name: "三联重复", repeatX: 3, repeatY: 1, scale: 0.55, spacing: 12 },
  { name: "密集平铺", repeatX: 4, repeatY: 4, scale: 0.35, spacing: 8 },
  { name: "纵向节奏", repeatX: 2, repeatY: 5, scale: 0.45, spacing: 16 },
];

export const DEFAULT_STUDIO_CONFIG = {
  assetId: "asset-rhombus",
  primaryColor: "#183B56",
  backgroundColor: "#F4F0E6",
  scale: 0.8,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  repeatX: 3,
  repeatY: 3,
  spacing: 10,
};
