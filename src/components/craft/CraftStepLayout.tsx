import Link from "next/link";
import { craftSteps } from "@/lib/data";
import { CraftStepNav } from "@/components/craft/CraftStepNav";
import { Button } from "@/components/ui/Button";

export function CraftStepLayout({
  stepId,
  children,
}: {
  stepId: string;
  children: React.ReactNode;
}) {
  const step = craftSteps.find((s) => s.id === stepId);
  const prev = craftSteps.find((s) => s.order === (step?.order ?? 0) - 1);
  const next = craftSteps.find((s) => s.order === (step?.order ?? 0) + 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside>
          <Link
            href="/craft"
            className="text-xs tracking-wide text-brand-muted hover:text-brand-primary"
          >
            ← 课堂首页
          </Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-brand-muted">
            工艺流程
          </p>
          <div className="mt-4">
            <CraftStepNav activeId={stepId} />
          </div>
        </aside>
        <div>{children}</div>
      </div>

      <nav className="mt-16 flex flex-wrap justify-between gap-4 border-t border-brand-border pt-8">
        {prev ? (
          <Button href={`/craft/${prev.id}`} variant="secondary" className="px-5 py-2.5 text-xs">
            ← {prev.name}
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button href={`/craft/${next.id}`} variant="primary" className="px-5 py-2.5 text-xs">
            {next.name} →
          </Button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
