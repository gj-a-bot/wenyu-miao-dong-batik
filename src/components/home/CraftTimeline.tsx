"use client";

import Link from "next/link";
import { craftSteps } from "@/lib/data";
import { motion } from "framer-motion";

export function CraftTimeline() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <h2 className="font-serif text-3xl text-brand-primary md:text-4xl">
        工艺体验
      </h2>
      <p className="mt-4 max-w-2xl text-brand-muted">
        从起稿到成品，蜡染的每个阶段都在塑造最终的纹样对比。点击下方步骤进入数字课堂。
      </p>
      <div className="mt-12 overflow-x-auto pb-4">
        <div className="flex min-w-max gap-0 md:min-w-0 md:flex-wrap md:justify-between">
          {craftSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex flex-col items-center px-4 md:flex-1"
            >
              {i < craftSteps.length - 1 && (
                <span className="absolute left-[calc(50%+24px)] top-5 hidden h-px w-[calc(100%-48px)] bg-brand-gold/40 md:block" />
              )}
              <Link
                href={`/craft/${step.id}`}
                className="group flex flex-col items-center text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/20 bg-brand-cream text-sm text-brand-primary transition group-hover:border-brand-gold group-hover:bg-brand-primary group-hover:text-brand-cream">
                  {i + 1}
                </span>
                <span className="mt-3 text-sm font-medium text-brand-primary group-hover:text-brand-gold">
                  {step.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <Link
          href="/craft"
          className="text-sm text-brand-primary underline-offset-4 hover:underline"
        >
          进入工艺数字课堂 →
        </Link>
      </div>
    </section>
  );
}
