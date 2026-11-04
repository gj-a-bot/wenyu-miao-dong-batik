import Link from "next/link";
import Image from "next/image";
import { galleryWorks } from "@/lib/data";

export function GalleryPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-serif text-3xl text-brand-primary">作品展厅</h2>
          <p className="mt-2 text-sm text-brand-gray">
            展示项目演示级数字再创作，均标注为样例作品。
          </p>
        </div>
        <Link href="/gallery" className="text-sm text-brand-primary hover:text-brand-gold">
          进入展厅 →
        </Link>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {galleryWorks.map((work, i) => (
          <Link
            key={work.id}
            href={`/gallery/${work.id}`}
            className={`group ${i === 1 ? "md:mt-10" : ""}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-brand-dark">
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute left-3 top-3 bg-brand-dark/70 px-2 py-1 text-[10px] text-brand-cream">
                演示作品
              </span>
            </div>
            <h3 className="mt-4 font-serif text-lg text-brand-primary">
              {work.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
