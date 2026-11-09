import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArchivePatternById,
  getExperimentalPatternById,
  museumPatternList,
  ARCHIVE_IMAGE_PLACEHOLDER,
} from "@/lib/pattern-catalog";
import { getCraftStepById, galleryWorks } from "@/lib/data";
import { VerificationBadge } from "@/components/patterns/VerificationBadge";
import { ArchiveStatusBadges } from "@/components/patterns/ArchiveStatusBadges";
import { FavoriteButton } from "@/components/patterns/FavoriteButton";
import { PatternDetailHeroImage } from "@/components/patterns/PatternDetailHeroImage";
import { BatikDisplayFrame } from "@/components/ui/BatikDisplayFrame";
import { cn } from "@/lib/cn";
import { GalleryWorkFrame } from "@/components/gallery/GalleryWorkFrame";
import type { Metadata } from "next";

export function generateStaticParams() {
  return museumPatternList.map((p) => ({ id: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const item = museumPatternList.find((p) => p.id === params.id);
  if (!item) return { title: "纹样未找到" };
  return { title: item.name };
}

export default function PatternDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const archive = getArchivePatternById(params.id);
  const experimental = getExperimentalPatternById(params.id);
  if (!archive && !experimental) notFound();

  if (experimental) {
    const pattern = experimental;
    const isArchiveShowcaseImage = pattern.image.startsWith(
      "/images/patterns/"
    );
    const relatedWorks = galleryWorks.filter(
      (w) => w.sourcePatternId === pattern.id
    );
    return (
      <article className="wenyu-on-indigo mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <BatikDisplayFrame
              mat="warm"
              prominent
              className={cn(
                "wenyu-batik-display-frame--lift w-full",
                isArchiveShowcaseImage
                  ? "aspect-[3/2]"
                  : "aspect-square lg:aspect-[4/5]"
              )}
            >
              <PatternDetailHeroImage
                src={pattern.image}
                alt={pattern.name}
                contain={isArchiveShowcaseImage}
                className="absolute inset-0 h-full w-full bg-logo-surface"
              />
            </BatikDisplayFrame>
          </div>
          <div className="lg:col-span-5">
            <p className="wenyu-eyebrow text-[10px] uppercase tracking-[0.45em]">
              数字实验纹样
            </p>
            <VerificationBadge
              status={pattern.verificationStatus}
              className="mt-3"
            />
            <h1 className="mt-4 font-serif text-4xl">{pattern.name}</h1>
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
            </dl>
          </div>
        </div>
        {relatedWorks.length > 0 ? (
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
        ) : null}
        <div className="mt-12">
          <Link href="/patterns" className="wenyu-link text-sm">
            ← 返回纹样博物馆
          </Link>
        </div>
      </article>
    );
  }

  const p = archive!;
  const heroSrc = p.image ?? ARCHIVE_IMAGE_PLACEHOLDER;
  const imagePending = !p.image;

  return (
    <article className="wenyu-on-indigo mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <BatikDisplayFrame
            mat="warm"
            prominent
            className="wenyu-batik-display-frame--lift aspect-[3/2] w-full"
          >
            <PatternDetailHeroImage
              src={heroSrc}
              alt={imagePending ? `${p.name}（配图待补充）` : p.name}
              contain
              className="absolute inset-0 h-full w-full bg-logo-surface"
            />
            {imagePending ? (
              <span className="absolute bottom-3 left-3 z-10 bg-brand-dark/80 px-2 py-1 text-[10px] tracking-wide text-brand-warm">
                馆藏配图待补充 · 禁止沿用未审网络图
              </span>
            ) : null}
          </BatikDisplayFrame>
        </div>
        <div className="lg:col-span-5">
          <p className="wenyu-eyebrow text-[10px] uppercase tracking-[0.45em]">
            文化档案
          </p>
          <ArchiveStatusBadges
            sourceStatus={p.sourceStatus}
            imageStatus={p.imageStatus}
            className="mt-3"
          />
          <h1 className="mt-4 font-serif text-4xl">{p.name}</h1>
          <p className="wenyu-muted mt-2 text-sm">{p.region}</p>
          {p.subgroup ? (
            <p className="wenyu-muted mt-1 text-xs">支系：{p.subgroup}</p>
          ) : null}
          <p className="wenyu-muted mt-2 text-xs">
            民族：{p.ethnicity.join("、")}
          </p>
          <div className="mt-8">
            <FavoriteButton patternId={p.id} />
          </div>
          <dl className="wenyu-divider mt-10 space-y-8 border-t pt-8">
            {p.regionalDifferences ? (
              <div>
                <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  地域与支系差异
                </dt>
                <dd className="wenyu-body mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                  {p.regionalDifferences}
                </dd>
              </div>
            ) : null}
            {p.culturalMeaning ? (
              <div>
                <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  文化寓意
                </dt>
                <dd className="wenyu-body mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                  {p.culturalMeaning}
                </dd>
              </div>
            ) : null}
            {p.originStory ? (
              <div>
                <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  纹样由来
                </dt>
                <dd className="wenyu-body mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                  {p.originStory}
                </dd>
              </div>
            ) : null}
            {p.sources.length > 0 ? (
              <div>
                <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  检索来源
                </dt>
                <dd className="mt-2 space-y-2">
                  {p.sources.map((s) => (
                    <p key={s.url} className="text-sm">
                      <a
                        href={s.url}
                        className="wenyu-link break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {s.title || s.url}
                      </a>
                    </p>
                  ))}
                </dd>
              </div>
            ) : null}
            {p.notes ? (
              <div>
                <dt className="wenyu-muted text-[11px] uppercase tracking-[0.25em]">
                  核验备注
                </dt>
                <dd className="wenyu-muted mt-2 text-sm leading-relaxed">
                  {p.notes}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
      <div className="mt-12">
        <Link href="/patterns" className="wenyu-link text-sm">
          ← 返回纹样博物馆
        </Link>
      </div>
    </article>
  );
}
