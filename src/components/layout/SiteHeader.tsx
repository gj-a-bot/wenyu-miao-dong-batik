"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useId, useCallback } from "react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/patterns", label: "纹样博物馆" },
  { href: "/craft", label: "工艺课堂" },
  { href: "/studio", label: "数字共创" },
  { href: "/gallery", label: "作品展厅" },
  { href: "/about", label: "关于纹语" },
];

function isNavActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-brand-border bg-brand-warm/95 shadow-sm backdrop-blur-md"
            : "border-transparent bg-brand-paper/95 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 md:h-[4.75rem] md:px-8">
          <Logo />
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="主导航">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-[13px] tracking-wide transition-colors",
                    active
                      ? "text-brand-primary"
                      : "text-brand-muted hover:text-brand-primary"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-brand-gold" />
                  )}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm p-2 text-brand-primary lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "关闭菜单" : "打开菜单"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-brand-dark/50 lg:hidden"
            aria-label="关闭导航"
            onClick={closeMenu}
          />
          <nav
            id={menuId}
            className="fixed inset-x-0 top-[4.25rem] z-50 max-h-[calc(100vh-4.25rem)] overflow-y-auto border-b border-brand-border bg-brand-warm px-4 py-8 shadow-archive md:top-[4.75rem] lg:hidden"
            aria-label="移动导航"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isNavActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "block border-b border-brand-border/60 py-3.5 font-serif text-lg",
                        active
                          ? "text-brand-primary"
                          : "text-brand-muted hover:text-brand-primary"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      )}
    </>
  );
}
