import { VerificationStatus } from "@/types";
import { cn } from "@/lib/cn";

const labels: Record<VerificationStatus, string> = {
  verified: "已核实",
  pending: "待核实",
  experimental: "数字实验素材",
};

const styles: Record<VerificationStatus, string> = {
  verified: "border-brand-secondary/40 bg-brand-secondary/10 text-brand-primary",
  pending: "border-brand-gold/40 bg-brand-gold/10 text-brand-ink",
  experimental: "border-brand-border bg-brand-warm text-brand-muted",
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
        "inline-block border px-2 py-0.5 text-[10px] uppercase tracking-wider",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}
