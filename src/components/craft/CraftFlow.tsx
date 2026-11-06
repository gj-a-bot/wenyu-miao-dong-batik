import Link from "next/link";
import { craftSteps } from "@/lib/data";
import { cn } from "@/lib/cn";
import { CraftStepMedia } from "@/components/craft/CraftStepMedia";
import { CraftStepNav } from "@/components/craft/CraftStepNav";
import { CraftCoverHero } from "@/components/craft/CraftCoverHero";

export function CraftFlow() {
  return (
    <>
      <CraftCoverHero />

      <div
        id="craft-steps"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14"
      >
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand-muted">
              步骤索引
            </p>
            <div className="mt-4">
              <CraftStepNav />
            </div>
          </aside>

          <div className="grid gap-6 sm:grid-cols-2">
            {craftSteps.map((step, i) => {
              const mediaSrc = step.video ?? step.image;
              return (
              <Link
                key={step.id}
                href={`/craft/${step.id}`}
                className={cn(
                  "group overflow-hidden border border-brand-border bg-brand-warm transition hover:shadow-archive",
                  i === 0 && "sm:col-span-2 sm:grid sm:grid-cols-2"
                )}
              >
                <div
                  className={cn(
                    "relative bg-brand-primary/[0.04]",
                    i === 0
                      ? "aspect-video sm:aspect-auto sm:min-h-[220px]"
                      : "aspect-video"
                  )}
                >
                  <CraftStepMedia
                    src={mediaSrc}
                    stepId={step.id}
                    variant="thumbnail"
                    imageClassName="object-cover"
                  />
                  <span className="absolute left-3 top-3 z-10 bg-brand-warm/90 px-2 py-0.5 text-[10px] uppercase tracking-wider text-brand-muted">
                    {step.video ? "演示短片" : "示意图"}
                  </span>
                </div>
                <div className="border-t border-brand-border p-5">
                  <span className="text-xs text-brand-goldInk">
                    步骤 {String(step.order).padStart(2, "0")}
                  </span>
                  <h2 className="mt-1 font-serif text-2xl text-brand-primary group-hover:text-brand-goldInk">
                    {step.name}
                  </h2>
                  <p className="mt-2 text-sm text-brand-muted">{step.summary}</p>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
