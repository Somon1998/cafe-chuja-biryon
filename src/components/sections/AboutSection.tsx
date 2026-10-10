"use client";

import { Reveal } from "@/components/animations/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useLanguage } from "@/hooks/useLanguage";
import { Clock, Sparkles, Truck, BadgeCheck } from "lucide-react";
import { useMemo } from "react";

const ICONS = {
  hours: Clock,
  vip: Sparkles,
  delivery: Truck,
  freeDelivery: BadgeCheck,
} as const;

export function AboutSection() {
  const { t } = useLanguage();

  const facts = useMemo(
    () => [
      { key: "hours" as const, ...t.about.facts.hours },
      { key: "vip" as const, ...t.about.facts.vip },
      { key: "delivery" as const, ...t.about.facts.delivery },
      { key: "freeDelivery" as const, ...t.about.facts.freeDelivery },
    ],
    [t],
  );

  return (
    <section
      id="about"
      className="py-16 md:py-20 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{t.about.eyebrow}</SectionEyebrow>
          <h2
            id="about-heading"
            className="font-display text-[1.65rem] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[2rem] lg:text-[2.4rem]"
          >
            {t.about.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t.about.subtitle}
          </p>
        </Reveal>

        <div className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-12 md:gap-5 lg:grid-cols-4">
          {facts.map((fact, i) => {
            const Icon = ICONS[fact.key];
            return (
              <Reveal key={fact.key} delay={i * 0.05}>
                <div className="flex h-full min-h-[130px] flex-col rounded-[20px] border border-[#D8A23A]/15 bg-[#15110D] p-5 transition-colors duration-300 hover:border-[#D8A23A]/30 md:p-6">
                  <span className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="text-[0.95rem] font-semibold leading-snug text-foreground">
                    {fact.title}
                  </h3>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-muted">
                    {fact.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
