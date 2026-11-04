"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <div className="paper-texture absolute inset-0 opacity-[0.07]" />
      <div className="pattern-grid-bg absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-12 md:items-end md:gap-6 md:px-8 md:py-24 lg:py-28">
        <motion.div
          className="md:col-span-6 lg:col-span-5 lg:pb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-[0.55em] text-brand-gold">
            WENYU / DIGITAL BATIK ARCHIVE
          </p>
          <h1 className="mt-6 font-serif text-[2rem] leading-[1.15] text-brand-warm md:text-4xl lg:text-[2.75rem] text-balance">
            让古老纹样，在数字时代重新生长。
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-brand-gray md:text-lg">
            探索苗侗蜡染的纹样之美、工艺之韵与数字创作的无限可能。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/patterns" variant="gold">
              探索纹样
            </Button>
            <Button href="/studio" variant="outline-light">
              开始创作
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative md:col-span-6 lg:col-span-7"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="relative ml-auto aspect-[4/5] max-w-lg md:max-w-none">
            <div className="absolute -left-4 top-8 hidden h-[88%] w-[42%] overflow-hidden border border-brand-gold/25 md:block">
              <Image
                src="/patterns/motif-fish-type.svg"
                alt=""
                fill
                className="object-cover opacity-90"
              />
            </div>
            <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden border border-brand-warm/10 shadow-lift md:max-w-lg">
              <Image
                src="/hero/batik-visual.svg"
                alt="蜡染风格数字视觉（原创演示）"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="absolute -bottom-6 right-0 text-[10px] tracking-wide text-brand-gray">
              原创数字视觉 · 非实拍藏品
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
