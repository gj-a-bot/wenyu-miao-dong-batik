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
import { GalleryWorkFrame } from "@/components/gallery/GalleryWorkFrame";
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

  const isArchiveShowcaseImage = pattern.image.startsWith(
    "/images/patterns/"
  );
  const isVortexShowcase = pattern.id === "motif-spiral-type";

  const relatedWorks = galleryWorks.filter(
    (w) => w.sourcePatternId === pattern.id
  );

  return (
    <article className="wenyu-on-indigo mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <PatternDetailHeroImage
            src={pattern.image}
            alt={pattern.name}
            contain={isArchiveShowcaseImage}
            className={
              isArchiveShowcaseImage
                ? isVortexShowcase
                  ? "aspect-[3/2] rounded-lg border border-brand-secondary/25 bg-[#eef1ed] shadow-sm ring-1 ring-brand-border/70"
                  : "aspect-[3/2] rounded-lg border border-brand-primary/20 shadow-sm ring-1 ring-brand-gold/15"
                : "aspect-square border border-brand-border lg:aspect-[4/5]"
            }
            imageClassName={
              isVortexShowcase
                ? "object-contain object-[50%_52%] brightness-[0.98] saturate-[0.9]"
                : undefined
            }
          />
        </div>
        <div className="lg:col-span-5">
          <p className="wenyu-eyebrow text-[10px] uppercase tracking-[0.45em]">
            Archive Record
          </p>
          <VerificationBadge status={pattern.verificationStatus} className="mt-3" />
          <h1 className="mt-4 font-serif text-4xl">
            {pattern.name}
          </h1>
          <p className="wenyu-muted mt-2 text-sm">{pattern.category}</p>
          <p className="wenyu-body mt-6 leading-relaxed">
            {pattern.description}
          </p>
          <div className="mt-8">
            <FavoriteButton patternId={pattern.id} />
          </div>

          <dl className="wenyu-divider mt-10 space-y-8 border-t pt-8">
            <div>
              <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                图案特征
              </dt>
              <dd className="mt-2">
                <ul className="wenyu-muted list-inside list-disc text-sm">
                  {pattern.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                资料来源
              </dt>
              <dd className="wenyu-muted mt-2 text-sm">{pattern.source}</dd>
            </div>
            <div>
              <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                文化说明
              </dt>
              <dd className="wenyu-muted mt-2 text-sm leading-relaxed">
                {pattern.culturalNote}
              </dd>
            </div>
            <div>
              <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
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
        <section className="wenyu-divider mt-20 border-t pt-16">
          <h2 className="font-serif text-2xl">相关演示作品</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedWorks.map((w) => (
              <Link key={w.id} href={`/gallery/${w.id}`} className="group">
                <GalleryWorkFrame
                  work={w}
                  sizes="(min-width: 768px) 22vw, 80vw"
                />
                <p className="mt-3 text-sm text-brand-warm group-hover:text-brand-gold">
                  {w.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link href="/patterns" className="wenyu-link text-sm">
          ← 返回纹样博物馆
        </Link>
      </div>
    </article>
  );
}
