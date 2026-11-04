import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { craftSteps, getCraftStepById } from "@/lib/data";
import type { Metadata } from "next";

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

  const prev = craftSteps.find((s) => s.order === step.order - 1);
  const next = craftSteps.find((s) => s.order === step.order + 1);

  return (
    <article className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-goldInk">
        步骤 {step.order} / {craftSteps.length}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-brand-primary">{step.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-brand-muted">{step.summary}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-video overflow-hidden bg-brand-primary/5 lg:aspect-[4/3]">
          <Image src={step.image} alt={step.name} fill className="object-cover" />
        </div>
        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
              操作介绍
            </h2>
            <p className="mt-3 leading-relaxed text-brand-primary/80">
              {step.description}
            </p>
          </section>
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
              工具与材料
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {step.tools.map((t) => (
                <li
                  key={t}
                  className="border border-brand-primary/15 px-3 py-1 text-sm text-brand-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
              注意事项
            </h2>
            <ul className="mt-3 list-inside list-disc text-sm text-brand-muted">
              {step.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="mt-4 rounded-sm border border-amber-900/20 bg-amber-900/5 p-4 text-sm text-amber-950">
              {step.caution}
            </p>
          </section>
        </div>
      </div>

      <nav className="mt-16 flex flex-wrap justify-between gap-4 border-t border-brand-primary/10 pt-8">
        {prev ? (
          <Link href={`/craft/${prev.id}`} className="text-sm text-brand-primary hover:underline">
            ← {prev.name}
          </Link>
        ) : (
          <Link href="/craft" className="text-sm text-brand-muted hover:text-brand-primary">
            ← 课堂首页
          </Link>
        )}
        {next ? (
          <Link href={`/craft/${next.id}`} className="text-sm text-brand-primary hover:underline">
            {next.name} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
