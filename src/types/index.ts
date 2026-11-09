export type VerificationStatus = "verified" | "pending" | "experimental";

/** 文化档案纹样核验状态（patterns.archive.json）— 兼容旧字段 */
export type ArchiveVerificationStatus =
  | "verified"
  | "needs_review"
  | "image_pending"
  | "source_pending"
  | "experimental";

/** 文化来源核验（与配图审核分离） */
export type PatternArchiveSourceStatus =
  | "needs_review"
  | "partially_verified"
  | "verified"
  | "source_pending";

/** 纹样配图审核 */
export type PatternArchiveImageStatus =
  | "image_pending"
  | "matched_pending"
  | "approved"
  | "restricted";

export type PatternArchiveSource = {
  title: string;
  url: string;
  publisher?: string;
};

export interface PatternArchive {
  id: string;
  name: string;
  ethnicity: string[];
  region: string;
  subgroup?: string;
  regionalDifferences?: string;
  culturalMeaning?: string;
  originStory?: string;
  image?: string | null;
  imageSource?: string | null;
  sources: PatternArchiveSource[];
  /** @deprecated 兼容旧消费方；请优先使用 sourceStatus + imageStatus */
  verificationStatus: ArchiveVerificationStatus;
  sourceStatus: PatternArchiveSourceStatus;
  imageStatus: PatternArchiveImageStatus;
  notes?: string | null;
  tags: string[];
  needsReviewMarkers?: {
    regionalDifferences?: boolean;
    culturalMeaning?: boolean;
    originStory?: boolean;
  };
}

export type CraftReferenceParameter = {
  name: string;
  range: string;
  unit?: string | null;
  basis: string;
  sourceNote: string;
};

export type CraftMiaoStepSource = {
  title: string;
  publisher?: string;
  url?: string;
  localPath?: string;
};

export interface CraftMiaoStep {
  id: string;
  order: number;
  name: string;
  optional?: boolean;
  optionalNote?: string | null;
  applicableScope: string;
  workingConditions?: string | null;
  toolsAndMaterials?: string | null;
  operationSteps: string[];
  qualityCheck?: string | null;
  abnormalHandling?: string | null;
  referenceParameters?: CraftReferenceParameter[];
  images: string[];
  videos: string[];
  sources: CraftMiaoStepSource[];
  rawSection?: string | null;
}

export interface CraftMiao12Document {
  meta: {
    title: string;
    ethnicScope: string;
    regionScope: string;
    dongNationalityNote: string;
    ichReference: string;
    referenceParametersDisclaimer?: string;
    supplementaryContent?: {
      id: string;
      name: string;
      type: string;
      note: string;
      publicAssets?: Record<string, string>;
    }[];
  };
  steps: CraftMiaoStep[];
}

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
