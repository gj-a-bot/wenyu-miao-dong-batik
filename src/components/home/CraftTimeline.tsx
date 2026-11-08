"use client";

import Link from "next/link";
import { craftSteps } from "@/lib/data";
import { motion } from "framer-motion";
import { BatikTextureSurface } from "@/components/ui/BatikTextureSurface";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CraftTimeline() {
  return (
    <BatikTextureSurface
      as="section"
      variant="band"
      className="border-y border-brand-warm/10 pattern-grid-bg"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeading
          index="03"
          eyebrow="Craft Process"
          title="工艺体验"
          subtitle="从起稿到成品，每个阶段都在塑造最终的纹样对比。"
          dark
        />
        <div className="mt-14 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-0 md:min-w-0 md:justify-between">
            {craftSteps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative flex flex-col items-center px-3 md:flex-1"
              >
                {i < craftSteps.length - 1 && (
                  <span className="absolute left-[calc(50%+20px)] top-4 hidden h-px w-[calc(100%-40px)] bg-brand-warm/20 md:block" />
                )}
                <Link
                  href={`/craft/${step.id}`}
                  className="group flex flex-col items-center text-center"
                >
                  <span className="flex h-9 w-9 items-center justify-center border border-brand-border bg-brand-warm font-serif text-sm text-brand-primary transition group-hover:border-brand-gold group-hover:bg-brand-primary group-hover:text-brand-warm">
                    {String(step.order).padStart(2, "0")}
                  </span>
                  <span className="mt-3 max-w-[5rem] text-xs leading-snug text-brand-gray group-hover:text-brand-warm">
                    {step.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <Link
          href="/craft"
          className="mt-10 inline-block text-sm tracking-wide text-brand-gold underline-offset-4 hover:underline"
        >
          进入工艺数字课堂 →
        </Link>
      </div>
    </BatikTextureSurface>
  );
}
