import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function StudioCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-primary">
      <div className="paper-texture absolute inset-0 opacity-[0.06]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 md:grid-cols-2 md:items-center md:px-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-brand-gold">
            Digital Studio
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-snug text-brand-warm md:text-4xl">
            传统纹样不止于欣赏，也可以成为现代设计的灵感。
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-brand-gray">
            在浏览器中调整色彩、排列与尺度，导出 PNG 保存实验作品。规则驱动预设已内置；AI 接口预留。
          </p>
          <div className="mt-10">
            <Button href="/studio" variant="gold">
              进入数字共创
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border border-brand-warm/15 shadow-lift">
          <Image
            src="/patterns/symmetry-eight-petal.svg"
            alt=""
            fill
            className="object-cover opacity-95"
          />
        </div>
      </div>
    </section>
  );
}
