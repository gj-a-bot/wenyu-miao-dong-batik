import craftMiaoDoc from "@/data/craft.miao-12.json";
import type { CraftMiao12Document, CraftMiaoStep } from "@/types";

export const craftMiaoDocument = craftMiaoDoc as CraftMiao12Document;

export const craftMiaoSteps = [...craftMiaoDocument.steps].sort(
  (a, b) => a.order - b.order
);

/** 仅与实际工序匹配的演示媒资；禁止为凑满 12 步乱配视频 */
const STEP_MEDIA: Partial<
  Record<string, { image: string; video?: string; mediaNote?: string }>
> = {
  "miao-craft-05-hua-la": {
    image: "/images/craft/craft-draft.png",
    mediaNote: "主图：画蜡示意图。起稿短片见本页「辅助示意」。",
  },
};

const DEFAULT_STEP_IMAGE = "/images/craft/craft-process-cover.png";

export function getCraftMiaoStepById(id: string): CraftMiaoStep | undefined {
  return craftMiaoSteps.find((s) => s.id === id);
}

export function getCraftMiaoStepMedia(step: CraftMiaoStep) {
  const extra = STEP_MEDIA[step.id];
  return {
    image: extra?.image ?? DEFAULT_STEP_IMAGE,
    video: extra?.video,
    mediaNote: extra?.mediaNote,
  };
}

export const craftAuxiliaryDraft =
  craftMiaoDocument.meta.supplementaryContent?.find(
    (c) => c.id === "draft-sketch-auxiliary"
  ) ?? null;

/** 旧 7 步课堂 id → 新十二工序（保留 patterns.json 内链） */
export const legacyCraftStepRedirect: Record<string, string> = {
  draft: "miao-craft-05-hua-la",
  "wax-prep": "miao-craft-04-rong-la",
  "wax-dot": "miao-craft-05-hua-la",
  dye: "miao-craft-07-jinran",
  oxidize: "miao-craft-07-jinran",
  "de-wax": "miao-craft-09-zhu-la",
  finish: "miao-craft-12-hou-zhengli",
};

export function resolveCraftStepId(id: string): string {
  return legacyCraftStepRedirect[id] ?? id;
}

export function craftMiaoStepSummary(step: CraftMiaoStep): string {
  return (
    step.workingConditions ??
    step.operationSteps[0] ??
    `${step.name}（苗族蜡染十二工序）`
  );
}
