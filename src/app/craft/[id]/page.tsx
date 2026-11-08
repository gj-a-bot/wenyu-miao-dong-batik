import { notFound } from "next/navigation";
import { craftSteps, getCraftStepById } from "@/lib/data";
import type { Metadata } from "next";
import { CraftStepLayout } from "@/components/craft/CraftStepLayout";
import { CraftStepMedia } from "@/components/craft/CraftStepMedia";
import { BatikDisplayFrame } from "@/components/ui/BatikDisplayFrame";
import { cn } from "@/lib/cn";
import { RouteImagePreload } from "@/components/layout/RouteImagePreload";
import { isCraftVideoSrc } from "@/lib/craft-media";

export function generateStaticParams() {
  return craftSteps.map((s) => ({ id: s.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const step = getCraftStepById(params.id);
  if (!step) return { title: "工艺步骤未找到" };
  return { title: `${step.name} · 工艺课堂` };
}

export default function CraftDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const step = getCraftStepById(params.id);
  if (!step) notFound();

  const mediaSrc = step.video ?? step.image;
  const isDye = step.id === "dye";
  const isVideo = isCraftVideoSrc(mediaSrc);

  return (
    <>
      {isDye && step.image ? <RouteImagePreload href={step.image} /> : null}
      <CraftStepLayout stepId={step.id}>
      <p className="wenyu-eyebrow text-[10px] uppercase tracking-[0.45em]">
        步骤 {String(step.order).padStart(2, "0")} /{" "}
        {String(craftSteps.length).padStart(2, "0")}
      </p>
      <h1 className="mt-3 font-serif text-4xl">{step.name}</h1>
      <p className="wenyu-body mt-4 max-w-2xl text-lg">{step.summary}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <BatikDisplayFrame
          mat="warm"
          prominent
          className={cn(
            "wenyu-batik-display-frame--lift w-full",
            isDye ? "aspect-video" : "aspect-[4/3]"
          )}
          innerClassName={isDye ? "bg-logo-surface" : undefined}
        >
          <CraftStepMedia
            src={mediaSrc}
            posterSrc={step.image}
            stepId={step.id}
            variant="detail"
            priority
            imageClassName={
              isDye && !isVideo
                ? "object-contain object-center"
                : "object-cover"
            }
          />
          <span
            className={
              isDye
                ? "absolute bottom-3 left-3 z-10 max-w-[85%] bg-brand-dark/70 px-2 py-1 text-[10px] tracking-wide text-brand-warm/95 backdrop-blur-sm"
                : "absolute left-3 top-3 z-10 bg-brand-warm/95 px-2 py-1 text-[10px] uppercase tracking-wider text-brand-muted"
            }
          >
            {isDye
              ? isVideo
                ? "概念演示短片 · 非实拍工艺记录"
                : "概念视觉素材 · 非实拍工艺记录"
              : isVideo
                ? "演示短片 · 非实拍"
                : "工艺示意图 · 非实拍"}
          </span>
        </BatikDisplayFrame>
        <div className="space-y-8">
          <section>
            <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
              操作介绍
            </h2>
            <p className="wenyu-body mt-3 leading-relaxed">
              {step.description}
            </p>
          </section>
          <section>
            <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
              工具与材料
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {step.tools.map((t) => (
                <li key={t} className="wenyu-chip">
                  {t}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
              注意事项
            </h2>
            <ul className="wenyu-muted mt-3 list-inside list-disc text-sm">
              {step.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="mt-4 border border-brand-gold/35 bg-brand-gold/10 p-4 text-sm text-brand-warm/95">
              {step.caution}
            </p>
          </section>
        </div>
      </div>
    </CraftStepLayout>
    </>
  );
}
