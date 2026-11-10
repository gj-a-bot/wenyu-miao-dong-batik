import patternsData from "@/data/patterns.json";
import archiveData from "@/data/patterns.archive.json";
import batikReferenceData from "@/data/batik-reference.json";
import type {
  Pattern,
  PatternArchive,
  PatternArchiveImageStatus,
  PatternArchiveSourceStatus,
} from "@/types";

export const ARCHIVE_IMAGE_PLACEHOLDER =
  "/images/patterns/archive-image-pending.svg";

export const experimentalPatterns = patternsData as Pattern[];
export const archivePatterns = archiveData as PatternArchive[];

export type BatikReferenceItem = {
  id: string;
  title: string;
  image: string;
  sourceNote: string;
  reviewStatus: string;
};

export const batikReferenceItems = batikReferenceData as BatikReferenceItem[];

/** 仅用名称/标签关键词匹配团队实物图作列表预览，不写入 archive.image */
export function findBatikReferencePreview(
  archive: PatternArchive
): BatikReferenceItem | undefined {
  const keys = [...archive.tags, archive.name.replace(/[（(].*$/, "")];
  for (const key of keys) {
    if (!key || key.length < 1) continue;
    const hit = batikReferenceItems.find((r) => r.title.includes(key));
    if (hit) return hit;
  }
  return undefined;
}

export type MuseumPatternKind = "experimental" | "archive";

export type MuseumPatternListItem =
  | {
      kind: "experimental";
      id: string;
      name: string;
      image: string;
      description: string;
      keywords: string[];
      category: string;
      verificationStatus: Pattern["verificationStatus"];
      regionLabel?: string;
      ethnicities?: string[];
    }
  | {
      kind: "archive";
      id: string;
      name: string;
      image: string;
      imagePending: boolean;
      description: string;
      keywords: string[];
      category: string;
      region: string;
      subgroup?: string;
      ethnicities: string[];
      sourceStatus: PatternArchiveSourceStatus;
      imageStatus: PatternArchiveImageStatus;
      verificationStatus: PatternArchive["verificationStatus"];
      referencePreview?: BatikReferenceItem | null;
    };

function archiveKeywords(p: PatternArchive): string[] {
  return [...p.tags, p.region, ...(p.ethnicity ?? [])].filter(Boolean);
}

function archiveDescription(p: PatternArchive): string {
  const meaning = p.culturalMeaning?.trim();
  if (meaning) return meaning.slice(0, 160);
  return p.region || p.name;
}

export function mapArchiveToListItem(p: PatternArchive): MuseumPatternListItem {
  const imagePending = !p.image;
  const refPreview = imagePending ? findBatikReferencePreview(p) : undefined;
  const displayImage = p.image ?? refPreview?.image ?? ARCHIVE_IMAGE_PLACEHOLDER;
  return {
    kind: "archive",
    id: p.id,
    name: p.name,
    image: displayImage,
    imagePending,
    referencePreview: refPreview ?? null,
    description: archiveDescription(p),
    keywords: archiveKeywords(p),
    category: "文化档案",
    region: p.region,
    subgroup: p.subgroup,
    ethnicities: p.ethnicity ?? [],
    sourceStatus: p.sourceStatus,
    imageStatus: p.imageStatus,
    verificationStatus: p.verificationStatus,
  };
}

export function mapExperimentalToListItem(p: Pattern): MuseumPatternListItem {
  return {
    kind: "experimental",
    id: p.id,
    name: p.name,
    image: p.image,
    description: p.description,
    keywords: p.keywords,
    category: p.category,
    verificationStatus: p.verificationStatus,
    regionLabel: "数字实验",
    ethnicities: [],
  };
}

export const museumPatternList: MuseumPatternListItem[] = [
  ...archivePatterns.map(mapArchiveToListItem),
  ...experimentalPatterns.map(mapExperimentalToListItem),
];

export function getArchivePatternById(id: string): PatternArchive | undefined {
  return archivePatterns.find((p) => p.id === id);
}

export function getExperimentalPatternById(id: string): Pattern | undefined {
  return experimentalPatterns.find((p) => p.id === id);
}

export function getMuseumListItemById(
  id: string
): MuseumPatternListItem | undefined {
  return museumPatternList.find((p) => p.id === id);
}

export const museumEthnicityFilters = Array.from(
  new Set(archivePatterns.flatMap((p) => p.ethnicity ?? []))
).sort();

export const museumRegionFilters = Array.from(
  new Set(archivePatterns.map((p) => p.region).filter(Boolean))
).sort();

export const museumCategoryFilters = [
  "全部",
  "文化档案",
  "数字实验纹样",
  ...Array.from(new Set(experimentalPatterns.map((p) => p.category))),
] as const;

export function filterBatikReferences(query: string): BatikReferenceItem[] {
  const q = query.trim().toLowerCase();
  return batikReferenceItems.filter(
    (r) => !q || r.title.toLowerCase().includes(q)
  );
}

export function filterMuseumPatterns(options: {
  category?: string;
  query?: string;
  ethnicity?: string;
  region?: string;
  favoritesOnly?: boolean;
  favoriteIds?: string[];
  partition?: "all" | "archive" | "experimental" | "reference";
}): MuseumPatternListItem[] {
  const {
    category = "全部",
    query = "",
    ethnicity = "全部",
    region = "全部",
    favoritesOnly = false,
    favoriteIds = [],
    partition = "all",
  } = options;
  const q = query.trim().toLowerCase();

  return museumPatternList.filter((p) => {
    if (partition === "reference") return false;
    if (partition === "archive" && p.kind !== "archive") return false;
    if (partition === "experimental" && p.kind !== "experimental") return false;
    const matchCat =
      category === "全部" ||
      p.category === category ||
      (category === "数字实验纹样" && p.kind === "experimental");
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q);
    const matchFav = !favoritesOnly || favoriteIds.includes(p.id);

    if (p.kind === "experimental") {
      const matchEth = ethnicity === "全部";
      const matchReg = region === "全部";
      return matchCat && matchQuery && matchFav && matchEth && matchReg;
    }

    const matchEth =
      ethnicity === "全部" || p.ethnicities.includes(ethnicity);
    const matchReg = region === "全部" || p.region.includes(region);
    return matchCat && matchQuery && matchFav && matchEth && matchReg;
  });
}
