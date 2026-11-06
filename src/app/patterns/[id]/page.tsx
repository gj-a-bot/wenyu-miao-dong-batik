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
import { PatternDetailHeroImage } from "@/components/patterns/PatternDetailHeroImage";
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

  const isButterflyShowcase = pattern.id === "motif-butterfly-type";

  const relatedWorks = galleryWorks.filter(
    (w) => w.sourcePatternId === pattern.id
  );

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <PatternDetailHeroImage
            src={pattern.image}
            alt={pattern.name}
            contain={isButterflyShowcase}
            className={
              isButterflyShowcase
                ? "aspect-[3/2] rounded-lg border border-brand-primary/20 shadow-sm ring-1 ring-brand-gold/15"
                : "aspect-square border border-brand-border lg:aspect-[4/5]"
            }
          />
        </div>
        <div className="lg:col-span-5">
          <p className="text-[10px] uppercase tracking-[0.45em] text-brand-muted">
            Archive Record
          </p>
          <VerificationBadge status={pattern.verificationStatus} className="mt-3" />
          <h1 className="mt-4 font-serif text-4xl text-brand-primary">
            {pattern.name}
          </h1>
          <p className="mt-2 text-sm text-brand-muted">{pattern.category}</p>
          <p className="mt-6 leading-relaxed text-brand-ink/85">
            {pattern.description}
          </p>
          <div className="mt-8">
            <FavoriteButton patternId={pattern.id} />
          </div>

          <dl className="mt-10 space-y-8 border-t border-brand-border pt-8">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-brand-muted">
                图案特征
              </dt>
              <dd className="mt-2">
                <ul className="list-inside list-disc text-sm text-brand-muted">
                  {pattern.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-brand-muted">
                资料来源
              </dt>
              <dd className="mt-2 text-sm text-brand-muted">{pattern.source}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-brand-muted">
                文化说明
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-brand-muted">
                {pattern.culturalNote}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.25em] text-brand-muted">
                相关工艺
              </dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {pattern.relatedCraftIds.map((cid) => {
                  const step = getCraftStepById(cid);
                  if (!step) return null;
                  return (
                    <Link
                      key={cid}
                      href={`/craft/${cid}`}
                      className="wenyu-chip hover:border-brand-secondary"
                    >
                      {step.name}
                    </Link>
                  );
                })}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {relatedWorks.length > 0 && (
        <section className="mt-20 border-t border-brand-border pt-16">
          <h2 className="font-serif text-2xl text-brand-primary">相关演示作品</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedWorks.map((w) => (
              <Link key={w.id} href={`/gallery/${w.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden border border-brand-border">
                  <Image
                    src={w.thumbnail}
                    alt={w.title}
                    fill
                    className="object-cover transition group-hover:scale-[1.02]"
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
