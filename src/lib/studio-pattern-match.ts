import { patterns } from "@/lib/data";
import type { Pattern, StudioDesignBrief } from "@/types";

export function matchPatternsForBrief(brief: StudioDesignBrief, limit = 4): Pattern[] {
  const haystack = [brief.prompt, brief.theme, brief.scene, brief.style, brief.palette]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const scored = patterns.map((p) => {
    let score = 0;
    for (const kw of p.keywords) {
      if (haystack.includes(kw.toLowerCase())) score += 3;
    }
    if (brief.theme && p.name.includes(brief.theme)) score += 4;
    if (brief.prompt && p.name.toLowerCase().includes(brief.theme?.toLowerCase() ?? "__")) {
      score += 2;
    }
    for (const f of p.features) {
      if (haystack.includes(f.slice(0, 2))) score += 1;
    }
    if (haystack.includes("蝴蝶") && p.id.includes("butterfly")) score += 5;
    if (haystack.includes("鱼") && p.id.includes("fish")) score += 5;
    if (haystack.includes("涡") && p.id.includes("spiral")) score += 5;
    if (haystack.includes("菱") && p.id.includes("rhombus")) score += 5;
    if (
      haystack.includes("花") &&
      (p.id.includes("flower") || p.id.includes("petal"))
    ) {
      score += 4;
    }
    return { p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}
