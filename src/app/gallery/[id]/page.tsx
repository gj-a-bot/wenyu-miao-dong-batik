import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  galleryWorks,
  getGalleryWorkById,
  getPatternById,
} from "@/lib/data";
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
    <article className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">
        {work.isDemo ? "项目演示作品" : "作品"}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-brand-primary md:text-5xl">
        {work.title}
      </h1>
      <p className="mt-2 text-sm text-brand-muted">{work.createdAt}</p>

      <div className="mt-12 relative aspect-[3/4] max-h-[80vh] w-full overflow-hidden bg-brand-dark md:aspect-auto md:h-[70vh]">
        <Image src={work.image} alt={work.title} fill className="object-contain" />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
            创作说明
          </h2>
          <p className="mt-4 leading-relaxed text-brand-muted">{work.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {work.palette.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 border border-brand-primary/10 px-2 py-1 text-xs"
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
          <section className="border border-brand-primary/10 bg-white/40 p-6">
            <h2 className="text-sm font-medium uppercase tracking-wider text-brand-primary">
              原始纹样参考
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-brand-primary/5">
                <Image src={source.image} alt={source.name} fill className="object-cover" />
              </div>
              <div className="relative aspect-square bg-brand-primary/5 opacity-90">
                <Image src={work.image} alt="" fill className="object-cover" />
              </div>
            </div>
            <p className="mt-4 text-sm text-brand-muted">
              左：档案纹样「{source.name}」 · 右：本演示再设计
            </p>
            <Link
              href={`/patterns/${source.id}`}
              className="mt-4 inline-block text-sm text-brand-primary hover:underline"
            >
              查看纹样档案 →
            </Link>
          </section>
        )}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <a
          href={work.image}
          download
          className="inline-flex border border-brand-primary px-6 py-3 text-sm text-brand-primary hover:bg-brand-primary hover:text-brand-cream"
        >
          下载 SVG 演示文件
        </a>
        <Link href="/gallery" className="inline-flex items-center px-6 py-3 text-sm text-brand-muted hover:text-brand-primary">
          ← 返回展厅
        </Link>
      </div>
    </article>
  );
}
