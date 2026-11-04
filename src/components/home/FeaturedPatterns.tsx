import Link from "next/link";
import Image from "next/image";
import { patterns } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export function FeaturedPatterns() {
  const featured = patterns.slice(0, 4);

  return (
    <section className="bg-white/40 py-24 pattern-grid-bg">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-brand-goldInk uppercase">
              纹样精选
            </p>
            <h2 className="mt-2 font-serif text-3xl text-brand-primary">
              数字档案中的形态与节奏
            </h2>
          </div>
          <Link
            href="/patterns"
            className="inline-flex items-center gap-1 text-sm text-brand-primary hover:text-brand-gold"
          >
            查看全部 <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              href={`/patterns/${p.id}`}
              className={`group block overflow-hidden bg-brand-cream shadow-sm transition hover:shadow-lg ${
                i === 1 ? "lg:translate-y-6" : i === 3 ? "lg:-translate-y-4" : ""
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-brand-primary/5">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="border border-brand-primary/10 p-5">
                <p className="text-xs text-brand-muted">{p.category}</p>
                <h3 className="mt-1 font-serif text-lg text-brand-primary">
                  {p.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-brand-muted">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
