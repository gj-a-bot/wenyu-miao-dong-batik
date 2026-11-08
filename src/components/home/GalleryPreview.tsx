import Link from "next/link";
import { galleryWorks } from "@/lib/data";
import { GalleryWorkFrame } from "@/components/gallery/GalleryWorkFrame";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GalleryPreview() {
  return (
    <BatikTextureSurface as="section" variant="band" className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Exhibition"
          title="作品展厅"
          subtitle="项目演示级数字再创作，均标注为样例作品。"
          dark
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3 md:items-start">
          {galleryWorks.map((work, i) => (
            <Link
              key={work.id}
              href={`/gallery/${work.id}`}
              className={`group block ${i === 1 ? "md:mt-12" : ""}`}
            >
              <GalleryWorkFrame
                work={work}
                sizes="(min-width: 768px) 28vw, 88vw"
                imageClassName="group-hover:scale-[1.03]"
              >
                <span className="absolute left-3 top-3 border border-brand-warm/30 bg-brand-dark/80 px-2 py-1 text-[10px] uppercase tracking-wider text-brand-warm">
                  演示
                </span>
              </GalleryWorkFrame>
              <h3 className="mt-4 font-serif text-xl text-brand-warm group-hover:text-brand-gold">
                {work.title}
              </h3>
            </Link>
          ))}
        </div>
        <Link
          href="/gallery"
          className="mt-10 inline-block text-sm text-brand-gold hover:underline"
        >
          进入展厅 →
        </Link>
      </div>
    </BatikTextureSurface>
  );
}
