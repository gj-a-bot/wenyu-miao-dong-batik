import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AppProviders } from "@/components/providers/AppProviders";
import { PageFade } from "@/components/layout/PageFade";

const notoSans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

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
    <html lang="zh-CN" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <body className="min-h-screen flex flex-col paper-texture font-sans">
        <AppProviders>
          <SiteHeader />
          <main className="flex-1">
            <PageFade>{children}</PageFade>
          </main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
