import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "gold";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-primary text-brand-cream hover:bg-brand-dark border border-transparent",
  secondary:
    "bg-transparent text-brand-primary border border-brand-primary/30 hover:border-brand-primary hover:bg-brand-primary/5",
  ghost: "bg-transparent text-brand-primary hover:bg-brand-primary/10",
  gold: "bg-brand-gold text-brand-dark hover:brightness-105 border border-brand-gold",
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
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wide transition-all duration-300 rounded-sm disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2";

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
