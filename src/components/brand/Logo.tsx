import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

const LOGO_SRC = "/images/brand/wenyu-logo.png";

type LogoTone = "default" | "light";

export function Logo({
  compact = false,
  tone = "default",
}: {
  compact?: boolean;
  tone?: LogoTone;
}) {
  const onDark = tone === "light";

  return (
    <Link
      href="/"
      className={cn(
        "group relative z-[60] inline-flex shrink-0 items-center",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2",
        onDark
          ? "focus-visible:ring-offset-brand-dark"
          : "focus-visible:ring-offset-brand-paper",
        compact ? "h-9" : "h-10 md:h-11"
      )}
      aria-label="纹语 WENYU 首页"
    >
      <Image
        src={LOGO_SRC}
        alt=""
        width={360}
        height={96}
        className={cn(
          "h-full w-auto object-contain object-left transition-opacity duration-300 group-hover:opacity-90",
          compact ? "max-w-[9.5rem]" : "max-w-[11.5rem] md:max-w-[13rem]"
        )}
        priority
      />
    </Link>
  );
}
