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
  const menuId = useId();

  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

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
      <header className="sticky top-0 z-50 border-b border-brand-primary/10 bg-brand-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
            {navItems.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-sm px-4 py-2 text-sm tracking-wide transition-colors",
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
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-brand-dark/40 lg:hidden"
            aria-label="关闭导航"
            onClick={closeMenu}
          />
          <nav
            id={menuId}
            className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-brand-primary/10 bg-brand-cream px-4 py-6 shadow-lg lg:hidden md:top-20"
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
                        "block rounded-sm border-b border-brand-primary/5 py-3 text-base",
                        active
                          ? "bg-brand-primary/5 font-medium text-brand-primary"
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
