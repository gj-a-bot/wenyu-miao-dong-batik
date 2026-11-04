import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPatternById,
  patterns,
  getCraftStepById,
  galleryWorks,
} from "@/lib/data";
import { VerificationBadge } from "@/components/patterns/VerificationBadge";
import { FavoriteButton } from "@/components/patterns/FavoriteButton";
import type { Metadata } from "next";

export function generateStaticParams() {
  return patterns.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const pattern = getPatternById(params.id);
  if (!pattern) return { title: "纹样未找到" };
  return { title: pattern.name };
}

export default function PatternDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pattern = getPatternById(params.id);
  if (!pattern) notFound();

  const relatedWorks = galleryWorks.filter(
    (w) => w.sourcePatternId === pattern.id
  );

  return (
    <article className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-brand-primary/5 lg:aspect-[4/5]">
          <Image
            src={pattern.image}
            alt={pattern.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div>
          <VerificationBadge status={pattern.verificationStatus} />
          <h1 className="mt-4 font-serif text-4xl text-brand-primary">
            {pattern.name}
          </h1>
            <p className="mt-2 text-sm text-brand-muted">{pattern.category}</p>
          <p className="mt-6 leading-relaxed text-brand-primary/85">
            {pattern.description}
          </p>
          <div className="mt-8">
            <FavoriteButton patternId={pattern.id} />
          </div>
          <section className="mt-10 border-t border-brand-primary/10 pt-8">
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
              图案特征
            </h2>
            <ul className="mt-3 list-inside list-disc text-sm text-brand-muted">
              {pattern.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
          <section className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
              资料来源
            </h2>
            <p className="mt-2 text-sm text-brand-muted">{pattern.source}</p>
          </section>
          <section className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
              文化说明
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              {pattern.culturalNote}
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
              相关工艺
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pattern.relatedCraftIds.map((cid) => {
                const step = getCraftStepById(cid);
                if (!step) return null;
                return (
                  <li key={cid}>
                    <Link
                      href={`/craft/${cid}`}
                      className="inline-block border border-brand-primary/20 px-3 py-1 text-sm hover:border-brand-gold"
                    >
                      {step.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      {relatedWorks.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl text-brand-primary">相关演示作品</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedWorks.map((w) => (
              <Link key={w.id} href={`/gallery/${w.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-dark">
                  <Image
                    src={w.thumbnail}
                    alt={w.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-sm text-brand-primary">{w.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link href="/patterns" className="text-sm text-brand-primary hover:underline">
          ← 返回纹样博物馆
        </Link>
      </div>
    </article>
  );
}
