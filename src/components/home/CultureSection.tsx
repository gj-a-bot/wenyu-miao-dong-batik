import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CultureSection() {
  return (
    <section className="border-b border-brand-border bg-brand-warm">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="Culture"
              title="一针一线之间，记录文化的记忆。"
              subtitle="蜡染以蜡防染、以蓝入布，在布面上留下线条与留白的对话。纹语提供数字档案与交互工具，帮助公众以可参与的方式接近这门工艺的结构之美。"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div className="relative aspect-[3/4] overflow-hidden border border-brand-border sm:col-span-1 sm:mt-10">
              <Image src="/patterns/geo-rhombus-weave.svg" alt="" fill className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden border border-brand-border">
              <Image src="/patterns/abstract-indigo-mist.svg" alt="" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden border border-brand-border sm:col-span-2 lg:col-span-1 lg:mt-16">
              <Image src="/patterns/motif-butterfly-type.svg" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
