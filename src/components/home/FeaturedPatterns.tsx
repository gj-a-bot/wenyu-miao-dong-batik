import Link from "next/link";
import Image from "next/image";
import { patterns } from "@/lib/data";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VerificationBadge } from "@/components/patterns/VerificationBadge";
import { ArrowUpRight } from "lucide-react";

export function FeaturedPatterns() {
  const featured = patterns.slice(0, 4);

  return (
    <BatikTextureSurface
      as="section"
      variant="band"
      className="w-full bg-brand-paper"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-brand-border pb-8">
        <SectionHeading
          index="02"
          eyebrow="Pattern Archive"
          title="纹样精选"
          subtitle="档案式呈现形态与节奏，悬停查看条目信息。"
        />
        <Link
          href="/patterns"
          className="inline-flex items-center gap-1 text-sm tracking-wide text-brand-primary hover:text-brand-goldInk"
        >
          进入博物馆 <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Link
            key={p.id}
            href={`/patterns/${p.id}`}
            className={`group block overflow-hidden border border-brand-border bg-brand-warm transition duration-500 hover:shadow-archive ${
              i === 1 ? "lg:translate-y-8" : i === 3 ? "lg:-translate-y-6" : ""
            }`}
          >
            <div className="relative aspect-square overflow-hidden bg-brand-primary/5">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                <VerificationBadge status={p.verificationStatus} />
                <p className="mt-2 line-clamp-2 text-xs text-brand-warm/90">
                  {p.description}
                </p>
              </div>
            </div>
            <div className="border-t border-brand-border px-4 py-3">
              <p className="text-[10px] uppercase tracking-widest text-brand-muted">
                {p.category}
              </p>
              <h3 className="mt-1 font-serif text-lg text-brand-primary">{p.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </BatikTextureSurface>
  );
}
