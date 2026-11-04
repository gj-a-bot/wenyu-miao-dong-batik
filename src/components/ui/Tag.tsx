import { cn } from "@/lib/cn";

export function Tag({
  children,
  active,
  onClick,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "wenyu-chip",
        active && "wenyu-chip-active",
        className
      )}
    >
      {children}
    </Comp>
  );
}
