import { notFound, permanentRedirect } from "next/navigation";
import { craftSteps, getCraftStepById } from "@/lib/data";
import type { Metadata } from "next";
import { CraftStepLayout } from "@/components/craft/CraftStepLayout";
import { CraftStepMedia } from "@/components/craft/CraftStepMedia";
import { BatikDisplayFrame } from "@/components/ui/BatikDisplayFrame";
import { cn } from "@/lib/cn";
import { RouteImagePreload } from "@/components/layout/RouteImagePreload";
import { isCraftVideoSrc } from "@/lib/craft-media";
import {
  craftAuxiliaryDraft,
  craftMiaoStepSummary,
  getCraftMiaoStepMedia,
  legacyCraftStepRedirect,
  resolveCraftStepId,
} from "@/lib/craft-miao";

export function generateStaticParams() {
  const ids = new Set(craftSteps.map((s) => s.id));
  Object.keys(legacyCraftStepRedirect).forEach((legacy) => ids.add(legacy));
  return Array.from(ids).map((id) => ({ id }));
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
  const resolvedId = resolveCraftStepId(params.id);
  if (params.id !== resolvedId) {
    permanentRedirect(`/craft/${resolvedId}`);
  }

  const step = getCraftStepById(resolvedId);
  if (!step) notFound();

  const media = getCraftMiaoStepMedia(step);
  const mediaSrc = media.video ?? media.image;
  const isVideo = isCraftVideoSrc(mediaSrc);
  const showDraftAux =
    step.id === "miao-craft-05-hua-la" && craftAuxiliaryDraft?.publicAssets;

  return (
    <>
      <RouteImagePreload href={media.image} />
      <CraftStepLayout stepId={step.id}>
        <p className="wenyu-eyebrow text-[10px] uppercase tracking-[0.45em]">
          步骤 {String(step.order).padStart(2, "0")} /{" "}
          {String(craftSteps.length).padStart(2, "0")}
        </p>
        {step.optional ? (
          <p className="mt-2 inline-block border border-brand-gold/50 bg-brand-gold/10 px-2 py-0.5 text-[10px] tracking-wider text-brand-ink">
            {step.optionalNote ?? "可选工序"}
          </p>
        ) : null}
        <h1 className="mt-3 font-serif text-4xl">{step.name}</h1>
        <p className="wenyu-body mt-4 max-w-2xl text-lg">
          {craftMiaoStepSummary(step)}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <BatikDisplayFrame
            mat="warm"
            prominent
            className={cn(
              "wenyu-batik-display-frame--lift w-full aspect-[4/3]",
              isVideo && "aspect-video"
            )}
          >
            <CraftStepMedia
              src={mediaSrc}
              posterSrc={media.image}
              stepId={step.id}
              variant="detail"
              priority
              imageClassName="object-cover"
            />
            <span className="absolute left-3 top-3 z-10 bg-brand-warm/95 px-2 py-1 text-[10px] uppercase tracking-wider text-brand-muted">
              {isVideo ? "工序相关演示" : "工艺示意图 · 非全套实拍"}
            </span>
          </BatikDisplayFrame>
          <div className="space-y-8">
            {step.workingConditions ? (
              <section>
                <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  作业条件
                </h2>
                <p className="wenyu-body mt-3 leading-relaxed">
                  {step.workingConditions}
                </p>
              </section>
            ) : null}
            <section>
              <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                操作步骤
              </h2>
              <ol className="wenyu-body mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
                {step.operationSteps.map((line) => (
                  <li key={line.slice(0, 40)}>{line}</li>
                ))}
              </ol>
            </section>
            {step.toolsAndMaterials ? (
              <section>
                <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  工具与材料
                </h2>
                <p className="wenyu-body mt-3 text-sm leading-relaxed">
                  {step.toolsAndMaterials}
                </p>
              </section>
            ) : null}
            {step.qualityCheck ? (
              <section>
                <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  质量检查
                </h2>
                <p className="wenyu-body mt-3 text-sm leading-relaxed">
                  {step.qualityCheck}
                </p>
              </section>
            ) : null}
            {step.abnormalHandling ? (
              <section>
                <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  异常处置
                </h2>
                <p className="mt-4 border border-brand-gold/35 bg-brand-gold/10 p-4 text-sm text-brand-warm/95">
                  {step.abnormalHandling}
                </p>
              </section>
            ) : null}
            {step.referenceParameters && step.referenceParameters.length > 0 ? (
              <section>
                <h2 className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  参考参数（经验归纳）
                </h2>
                <ul className="mt-3 space-y-3 text-sm">
                  {step.referenceParameters.map((p) => (
                    <li
                      key={p.name}
                      className="border border-brand-border bg-brand-warm/5 p-3"
                    >
                      <p className="font-medium text-brand-primary">
                        {p.name}
                        {p.unit ? `（${p.unit}）` : ""}
                      </p>
                      <p className="mt-1 text-brand-muted">{p.range}</p>
                      <p className="mt-1 text-xs text-brand-gray">
                        判断：{p.basis}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

        {showDraftAux ? (
          <section className="wenyu-divider mt-16 border-t pt-12">
            <h2 className="font-serif text-2xl">辅助示意：起稿</h2>
            <p className="wenyu-body mt-2 max-w-2xl text-sm">
              {craftAuxiliaryDraft?.note}
            </p>
            {craftAuxiliaryDraft?.publicAssets?.video ? (
              <BatikDisplayFrame
                mat="warm"
                className="wenyu-batik-display-frame--lift mt-6 aspect-video max-w-3xl"
              >
                <CraftStepMedia
                  src={craftAuxiliaryDraft.publicAssets.video}
                  posterSrc={
                    craftAuxiliaryDraft.publicAssets.image ??
                    "/images/craft/craft-draft.png"
                  }
                  stepId="draft-sketch-auxiliary"
                  variant="detail"
                  imageClassName="object-cover"
                />
                <span className="absolute left-3 top-3 z-10 bg-brand-warm/95 px-2 py-1 text-[10px] uppercase tracking-wider text-brand-muted">
                  画蜡前辅助 · 非正式第十三工序
                </span>
              </BatikDisplayFrame>
            ) : null}
          </section>
        ) : null}

        <p className="wenyu-muted mt-12 text-xs leading-relaxed">
          适用范围：{step.applicableScope}
        </p>
      </CraftStepLayout>
    </>
  );
}
