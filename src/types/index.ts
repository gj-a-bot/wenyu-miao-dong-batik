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
  image: string;
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
}
