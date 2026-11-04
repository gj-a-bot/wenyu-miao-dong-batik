import Link from "next/link";
import { craftSteps } from "@/lib/data";
import { cn } from "@/lib/cn";

export function CraftStepNav({
  activeId,
  vertical = true,
}: {
  activeId?: string;
  vertical?: boolean;
}) {
  return (
    <ol className={cn(vertical ? "space-y-1" : "flex flex-wrap gap-2")}>
      {craftSteps.map((step) => {
        const active = step.id === activeId;
        return (
          <li key={step.id}>
            <Link
              href={`/craft/${step.id}`}
              className={cn(
                "flex items-center gap-3 border px-3 py-2.5 text-sm transition",
                active
                  ? "border-brand-primary bg-brand-primary text-brand-warm"
                  : "border-brand-border bg-brand-warm text-brand-muted hover:border-brand-secondary hover:text-brand-primary"
              )}
            >
              <span className="font-serif text-xs tabular-nums">
                {String(step.order).padStart(2, "0")}
              </span>
              <span>{step.name}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
