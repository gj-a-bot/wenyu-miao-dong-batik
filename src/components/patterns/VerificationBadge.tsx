import { VerificationStatus } from "@/types";
import { cn } from "@/lib/cn";

const labels: Record<VerificationStatus, string> = {
  verified: "已核实",
  pending: "待核实",
  experimental: "数字实验素材",
};

const styles: Record<VerificationStatus, string> = {
  verified: "bg-emerald-900/10 text-emerald-900 border-emerald-900/20",
  pending: "bg-amber-900/10 text-amber-900 border-amber-900/20",
  experimental: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
};

export function VerificationBadge({
  status,
  className,
}: {
  status: VerificationStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border px-2 py-0.5 text-[11px] tracking-wide",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}
