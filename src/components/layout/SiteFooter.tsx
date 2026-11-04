import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const footerNav = [
  { href: "/patterns", label: "纹样博物馆" },
  { href: "/craft", label: "工艺课堂" },
  { href: "/studio", label: "数字共创" },
  { href: "/gallery", label: "作品展厅" },
  { href: "/about", label: "关于纹语" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-primary/10 bg-brand-dark text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 md:px-8">
        <div className="lg:col-span-2">
          <Logo tone="light" />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-brand-gray">
            纹语 WENYU — 苗侗蜡染数字文化交互系统。让纹样有故事，让工艺可体验，让传统文化能够被重新理解和创造。
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-brand-gold">
            导航
          </h3>
          <ul className="mt-4 space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-brand-gray transition hover:text-brand-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-brand-gold">
            说明
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-gray">
            <li>演示纹样均为项目原创或标注来源的实验素材，不冒充非遗登记作品。</li>
            <li>文化释义未核实处均标注「待核实」。</li>
            <li>© {new Date().getFullYear()} 纹语 WENYU · 数字媒体设计作品</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-brand-gray">
        素材与版权详见{" "}
        <Link href="/about" className="text-brand-gold underline-offset-2 hover:underline">
          关于纹语
        </Link>
      </div>
    </footer>
  );
}
