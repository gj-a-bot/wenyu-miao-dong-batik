import Link from "next/link";
import Image from "next/image";
import { galleryWorks } from "@/lib/data";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GalleryPreview() {
  return (
    <BatikTextureSurface as="section" variant="band" className="w-full bg-brand-paper">
    <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <SectionHeading
        index="04"
        eyebrow="Exhibition"
        title="作品展厅"
        subtitle="项目演示级数字再创作，均标注为样例作品。"
      />
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {galleryWorks.map((work, i) => (
          <Link
            key={work.id}
            href={`/gallery/${work.id}`}
            className={`group ${i === 1 ? "md:mt-12" : ""}`}
          >
            <div className="relative aspect-[3/4] overflow-hidden border border-brand-border bg-brand-dark shadow-archive">
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 border border-brand-warm/30 bg-brand-dark/80 px-2 py-1 text-[10px] uppercase tracking-wider text-brand-warm">
                演示
              </span>
            </div>
            <h3 className="mt-4 font-serif text-xl text-brand-primary group-hover:text-brand-goldInk">
              {work.title}
            </h3>
          </Link>
        ))}
      </div>
      <Link
        href="/gallery"
        className="mt-10 inline-block text-sm text-brand-primary hover:underline"
      >
        进入展厅 →
      </Link>
    </div>
    </BatikTextureSurface>
  );
}
