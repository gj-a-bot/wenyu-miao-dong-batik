export type VerificationStatus = "verified" | "pending" | "experimental";

export interface Pattern {
  id: string;
  name: string;
  image: string;
  category: string;
  keywords: string[];
  description: string;
  features: string[];
  source: string;
  verificationStatus: VerificationStatus;
  relatedCraftIds: string[];
  culturalNote: string;
}

export interface CraftStep {
  id: string;
  order: number;
  name: string;
  summary: string;
  description: string;
  tools: string[];
  /** 列表缩略与静态封面；可为 PNG/SVG */
  image: string;
  /** 可选：详情页主区播放的演示短片（public 路径 .mp4），列表仍用 image */
  video?: string;
  notes: string[];
  caution: string;
}

export interface GalleryWork {
  id: string;
  title: string;
  category: string;
  image: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  isDemo: boolean;
  sourcePatternId?: string;
  palette: string[];
  /** 展示框宽高比，如 "480/648" */
  frameAspect?: string;
  objectPosition?: string;
}

export interface StudioAsset {
  id: string;
  name: string;
  type: "geometric" | "line" | "symmetry" | "abstract" | "original";
  label: string;
  svgPath: string;
  viewBox: string;
}

export interface SavedStudioWork {
  id: string;
  title: string;
  createdAt: string;
  config: StudioConfig;
  previewDataUrl?: string;
}

export interface StudioConfig {
  assetId: string;
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  scale: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  repeatX: number;
  repeatY: number;
  spacing: number;
  /** 蜡染冰裂纹模拟强度 0–1 */
  waxCrackle?: number;
  /** 靛蓝渗染/雾感 0–1 */
  waxBleed?: number;
}

export type CreativeProductId = "tote" | "poster" | "bookmark" | "wallpaper";

export type StudioDesignBrief = {
  prompt: string;
  theme?: string;
  scene?: string;
  style?: string;
  palette?: string;
};

export type StudioDesignPlan = {
  id: string;
  title: string;
  composition: string;
  matchedPatternIds: string[];
  config: StudioConfig;
};

export type StudioDesignResponse = {
  mode: "live" | "demo";
  provider?: "ollama" | "openai";
  notice: string;
  plans: StudioDesignPlan[];
};
