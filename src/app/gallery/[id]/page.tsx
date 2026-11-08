import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  galleryWorks,
  getGalleryWorkById,
  getPatternById,
} from "@/lib/data";
import { galleryAspectStyle, galleryImagePosition } from "@/lib/gallery-frame";
import type { Metadata } from "next";

export function generateStaticParams() {
  return galleryWorks.map((w) => ({ id: w.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const work = getGalleryWorkById(params.id);
  if (!work) return { title: "作品未找到" };
  return { title: work.title };
}

export default function GalleryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const work = getGalleryWorkById(params.id);
  if (!work) notFound();

  const source = work.sourcePatternId
    ? getPatternById(work.sourcePatternId)
    : undefined;

  return (
    <article className="wenyu-on-indigo mx-auto max-w-7xl px-4 py-16 md:px-8">
      <p className="wenyu-eyebrow text-xs uppercase tracking-[0.35em]">
        {work.isDemo ? "项目演示作品" : "作品"}
      </p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">{work.title}</h1>
      <p className="wenyu-muted mt-2 text-sm">{work.createdAt}</p>

      <div
        className="relative mt-12 w-full max-h-[min(82vh,920px)] overflow-hidden border border-brand-warm/15 bg-brand-dark shadow-lift"
        style={galleryAspectStyle(work)}
      >
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-contain"
          style={{ objectPosition: galleryImagePosition(work) }}
          sizes="(min-width: 1024px) 80vw, 96vw"
          priority
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="wenyu-eyebrow text-sm font-medium uppercase tracking-wider">
            创作说明
          </h2>
          <p className="wenyu-body mt-4 leading-relaxed">{work.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {work.palette.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 border border-brand-warm/20 bg-brand-dark/40 px-2 py-1 text-xs text-brand-warm/90"
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/10"
                  style={{ background: c }}
                />
                {c}
              </span>
            ))}
          </div>
        </section>

        {source && (
          <section className="wenyu-panel p-6">
            <h2 className="wenyu-eyebrow text-sm font-medium uppercase tracking-wider">
              原始纹样参考
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden border border-brand-warm/10 bg-brand-dark/60">
                <Image
                  src={source.image}
                  alt={source.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden border border-brand-warm/10 bg-brand-dark/60">
                <Image
                  src={work.image}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: galleryImagePosition(work) }}
                />
              </div>
            </div>
            <p className="wenyu-muted mt-4 text-sm">
              左：档案纹样「{source.name}」 · 右：本演示再设计
            </p>
            <Link href={`/patterns/${source.id}`} className="wenyu-link mt-4 inline-block text-sm">
              查看纹样档案 →
            </Link>
          </section>
        )}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <a
          href={work.image}
          download
          className="inline-flex border border-brand-gold/50 px-6 py-3 text-sm text-brand-gold transition hover:border-brand-gold hover:bg-brand-gold/10 hover:text-brand-warm"
        >
          下载演示文件
        </a>
        <Link href="/gallery" className="wenyu-link inline-flex items-center px-6 py-3 text-sm">
          ← 返回展厅
        </Link>
      </div>
    </article>
  );
}
