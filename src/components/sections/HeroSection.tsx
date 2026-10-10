"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#080706] px-5 pb-14 pt-20 min-[430px]:px-6 md:px-8 md:pb-16 md:pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(216,162,58,0.08)_0%,rgba(216,162,58,0.03)_28%,transparent_58%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[800px] -translate-y-3 text-center">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mx-auto text-balance text-[11px] font-semibold uppercase tracking-[0.18em] text-gold min-[430px]:text-xs md:text-[13px] md:tracking-[0.2em] lg:text-[14px]"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="mt-5 font-display text-[44px] font-medium leading-[1] text-[#F4EFE6] min-[430px]:text-[50px] md:mt-6 md:text-[64px] md:leading-[0.98] lg:text-[76px] lg:leading-[0.96] xl:text-[88px]"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mt-6 text-[16px] font-normal leading-snug tracking-[0.01em] text-[#EFE6D8] min-[430px]:text-[17px] md:mt-7 md:text-[18.5px] lg:text-[19.5px]"
        >
          {t.hero.subheadline}
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mx-auto mt-5 max-w-[732px] text-pretty text-[15px] leading-[1.65] text-[#CDBEAD] min-[430px]:text-base md:mt-6 md:text-[17px] lg:text-[18px]"
        >
          {t.hero.description}
        </motion.p>
      </div>
    </section>
  );
}
