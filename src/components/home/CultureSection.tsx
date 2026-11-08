import Image from "next/image";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { BatikDisplayFrame } from "@/components/ui/BatikDisplayFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CultureSection() {
  return (
    <BatikTextureSurface
      as="section"
      variant="band"
      className="w-full border-b border-brand-warm/10"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="Culture"
              title="一针一线之间，记录文化的记忆。"
              subtitle="蜡染以蜡防染、以蓝入布，在布面上留下线条与留白的对话。纹语提供数字档案与交互工具，帮助公众以可参与的方式接近这门工艺的结构之美。"
              dark
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <BatikDisplayFrame
              mat="warm"
              className="wenyu-batik-display-frame--lift aspect-[3/4] sm:col-span-1 sm:mt-10"
            >
              <Image
                src="/images/patterns/pattern-geometric-diamond-grid-detail.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </BatikDisplayFrame>
            <BatikDisplayFrame
              mat="warm"
              className="wenyu-batik-display-frame--lift aspect-square"
            >
              <Image
                src="/images/patterns/pattern-fog-detail.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover"
              />
            </BatikDisplayFrame>
            <BatikDisplayFrame
              mat="warm"
              className="wenyu-batik-display-frame--lift aspect-[4/5] sm:col-span-2 lg:col-span-1 lg:mt-16"
            >
              <Image
                src="/images/patterns/pattern-butterfly-detail.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover"
              />
            </BatikDisplayFrame>
          </div>
        </div>
      </div>
    </BatikTextureSurface>
  );
}
