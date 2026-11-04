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
    <footer className="border-t border-brand-border/80 bg-brand-dark text-brand-warm">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-brand-gray">
            纹语 WENYU — 苗侗蜡染数字文化交互系统。数字纹样档案、工艺可视化与共创工具，面向当代阅读与再创作。
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-brand-gray/80">
            Digital Batik Heritage Platform
          </p>
        </div>
        <div className="md:col-span-3">
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-brand-gold">
            导航
          </h3>
          <ul className="mt-5 space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-brand-gray transition hover:text-brand-warm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-brand-gold">
            声明
          </h3>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-brand-gray">
            <li>演示纹样标注来源或「数字实验素材」，不冒充非遗登记作品。</li>
            <li>文化释义未核实处均标注状态，详见各档案条目。</li>
            <li>© {new Date().getFullYear()} 纹语 WENYU</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-warm/10 py-6 text-center text-xs text-brand-gray">
        <Link href="/about" className="text-brand-gold underline-offset-4 hover:underline">
          素材与版权说明
        </Link>
      </div>
    </footer>
  );
}
