import { cn } from "@/lib/cn";

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <header
      className={cn(
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {index && (
        <p
          className={cn(
            "font-serif text-sm tracking-[0.35em]",
            dark ? "text-brand-gold" : "text-brand-goldInk"
          )}
        >
          {index}
        </p>
      )}
      {eyebrow && (
        <p
          className={cn(
            "mt-2 text-[11px] uppercase tracking-[0.4em]",
            dark ? "text-brand-gray" : "text-brand-muted"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 font-serif text-3xl leading-snug md:text-4xl text-balance",
          dark ? "text-brand-warm" : "text-brand-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-brand-gray" : "text-brand-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
