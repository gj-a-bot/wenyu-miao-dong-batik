import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "纹语 WENYU · 苗侗蜡染数字文化交互系统",
    template: "%s · 纹语 WENYU",
  },
  description:
    "探索苗侗蜡染的纹样之美、工艺之韵与数字创作的无限可能。数字纹样档案、工艺课堂、共创实验室与作品展厅。",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
