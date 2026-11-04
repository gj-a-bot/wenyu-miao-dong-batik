import Image from "next/image";

export function CultureSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="font-serif text-3xl text-brand-primary md:text-4xl">
            一针一线之间，记录文化的记忆。
          </h2>
          <div className="mt-2 h-1 w-16 bg-brand-gold" />
        </div>
        <div className="space-y-6 text-base leading-relaxed text-brand-primary/80 lg:col-span-7">
          <p>
            蜡染以蜡防染、以蓝入布，在布面上留下线条与留白的对话。苗侗地区的蜡染实践承载着地方审美与生活记忆，也在当代设计语境中被不断重新阅读。
          </p>
          <p>
            「纹语」并非替代田野与传承，而是提供数字化的纹样档案、工艺可视化与共创工具，帮助公众以可交互的方式接近这门工艺的结构之美。
          </p>
          <p className="text-sm text-brand-muted">
            本站文化叙述以可核实资料为准；未获确证的内容不会写定为传统定说。
          </p>
        </div>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-3">
        <div className="relative aspect-[3/4] overflow-hidden md:col-span-1 md:mt-12">
          <Image
            src="/patterns/geo-rhombus-weave.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden md:-mt-4">
          <Image
            src="/patterns/abstract-indigo-mist.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden md:mt-8">
          <Image
            src="/patterns/line-spiral-flow.svg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
