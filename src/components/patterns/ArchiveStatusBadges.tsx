import {
  PatternArchiveImageStatus,
  PatternArchiveSourceStatus,
} from "@/types";
import { cn } from "@/lib/cn";

const sourceLabels: Record<PatternArchiveSourceStatus, string> = {
  needs_review: "文化来源·待核验",
  partially_verified: "文化来源·部分核实",
  verified: "文化来源·已核实",
  source_pending: "文化来源·缺链",
};

const imageLabels: Record<PatternArchiveImageStatus, string> = {
  image_pending: "配图·待补充",
  matched_pending: "配图·候选待审",
  approved: "配图·已核准",
  restricted: "配图·受限",
};

export function ArchiveStatusBadges({
  sourceStatus,
  imageStatus,
  className,
}: {
  sourceStatus: PatternArchiveSourceStatus;
  imageStatus: PatternArchiveImageStatus;
  className?: string;
}) {
  return (
    <span className={cn("flex flex-wrap gap-2", className)}>
      <Badge tone="source">{sourceLabels[sourceStatus]}</Badge>
      <Badge tone="image">{imageLabels[imageStatus]}</Badge>
    </span>
  );
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "source" | "image";
}) {
  return (
    <span
      className={cn(
        "inline-block border px-2 py-0.5 text-[10px] tracking-wider",
        tone === "source"
          ? "border-brand-gold/40 bg-brand-gold/10 text-brand-ink"
          : "border-brand-secondary/35 bg-brand-secondary/10 text-brand-primary"
      )}
    >
      {children}
    </span>
  );
}
