import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60"
      aria-label="纹语 WENYU 首页"
    >
      <svg
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-500 group-hover:rotate-3"
        aria-hidden
      >
        <rect
          x="4"
          y="4"
          width="40"
          height="40"
          rx="2"
          className="stroke-brand-primary"
          strokeWidth="1.2"
        />
        <path
          d="M8 24 H40 M24 8 V40 M14 14 L34 34 M34 14 L14 34"
          className="stroke-brand-gold"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="3" className="fill-brand-primary" />
      </svg>
      <div className="leading-tight">
        <span className="block font-serif text-lg tracking-[0.2em] text-brand-primary md:text-xl">
          纹语
        </span>
        {!compact && (
          <span className="block text-[10px] uppercase tracking-[0.35em] text-brand-gray">
            WENYU
          </span>
        )}
      </div>
    </Link>
  );
}
