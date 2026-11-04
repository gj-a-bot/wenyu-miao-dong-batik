import Link from "next/link";
import Image from "next/image";
import { craftSteps } from "@/lib/data";
import { cn } from "@/lib/cn";

export function CraftFlow() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-goldInk">
          工艺数字课堂
        </p>
        <h1 className="mt-3 font-serif text-4xl text-brand-primary md:text-5xl text-balance">
          一场关于蜡与蓝的创作。
        </h1>
        <p className="mt-6 text-brand-muted">
          以下步骤为交互式导读，内容以可核实资料为准，不构成唯一标准工艺流程。
        </p>
      </header>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {craftSteps.map((step, i) => {
          const href = `/craft/${step.id}`;
          return (
            <Link
              key={step.id}
              href={href}
              className={cn(
                "group flex flex-col overflow-hidden border border-brand-primary/10 bg-brand-cream transition hover:shadow-xl",
                i === 0 && "lg:col-span-2 lg:flex-row"
              )}
            >
              <div
                className={cn(
                  "relative bg-brand-primary/5",
                  i === 0
                    ? "aspect-video lg:w-1/2 lg:aspect-auto lg:min-h-[240px]"
                    : "aspect-video"
                )}
              >
                <Image
                  src={step.image}
                  alt={step.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className={cn("p-6", i === 0 && "lg:flex lg:flex-col lg:justify-center")}
              >
                <span className="text-xs text-brand-goldInk">步骤 {step.order}</span>
                <h2 className="mt-1 font-serif text-2xl text-brand-primary group-hover:text-brand-gold">
                  {step.name}
                </h2>
                <p className="mt-2 text-sm text-brand-muted">{step.summary}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
