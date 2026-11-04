"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-brand-cream">
      <div className="pattern-grid-bg absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-primary/40 to-brand-dark" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:items-center md:px-8 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-brand-gold">
            纹语 WENYU
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-snug text-balance md:text-4xl lg:text-5xl">
            让古老纹样，在数字时代重新生长。
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-gray md:text-lg">
            探索苗侗蜡染的纹样之美、工艺之韵与数字创作的无限可能。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/patterns" variant="gold">
              探索纹样
            </Button>
            <Button
              href="/studio"
              variant="secondary"
              className="border-brand-cream/30 text-brand-cream hover:border-brand-cream hover:bg-white/10"
            >
              开始创作
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="relative aspect-[4/5] max-h-[520px] w-full justify-self-end md:max-w-md lg:max-w-lg"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
        >
          <div className="absolute -left-6 top-8 h-full w-full border border-brand-gold/30" />
          <div className="relative h-full overflow-hidden bg-brand-primary shadow-2xl">
            <Image
              src="/hero/batik-visual.svg"
              alt="苗侗蜡染风格视觉演示（原创数字图形）"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="absolute -bottom-8 right-0 text-[11px] text-brand-gray">
            视觉演示 · 原创数字图形
          </p>
        </motion.div>
      </div>
    </section>
  );
}
