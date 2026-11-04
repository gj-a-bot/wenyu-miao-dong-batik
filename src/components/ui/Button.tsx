import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "outline-light";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-brand-warm border border-brand-primary hover:bg-brand-dark",
  secondary:
    "bg-transparent text-brand-primary border border-brand-border hover:border-brand-primary hover:bg-brand-warm",
  ghost: "bg-transparent text-brand-primary hover:bg-brand-border/40 border border-transparent",
  gold: "bg-brand-gold text-brand-ink border border-brand-gold hover:brightness-105",
  "outline-light":
    "bg-transparent text-brand-warm border border-brand-warm/40 hover:border-brand-warm hover:bg-brand-warm/10",
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-[0.12em] transition-all duration-300 rounded-sm disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper";

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
