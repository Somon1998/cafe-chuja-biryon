"use client";

import { Reveal } from "@/components/animations/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { IMAGES } from "@/constants/images";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";

export function VipSection() {
  const { t } = useLanguage();
  const points = [t.vip.points.privateRoom, t.vip.points.gatherings];

  return (
    <section id="vip" className="section-c py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal className="w-full">
            <div className="relative mx-auto h-[290px] w-full max-w-[720px] overflow-hidden rounded-[24px] border border-gold/25 shadow-[0_18px_48px_rgba(0,0,0,0.32)] min-[430px]:h-[310px] md:h-[320px] lg:aspect-[16/11] lg:h-auto">
              <Image
                src={IMAGES.vip}
                alt={t.vip.imageAlt}
                fill
                sizes="(max-width: 1023px) 100vw, 720px"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          <Reveal
            delay={0.08}
            className="mx-auto w-full max-w-[620px] text-center md:text-left lg:max-w-[460px] lg:justify-self-center"
          >
            <SectionEyebrow>{t.vip.eyebrow}</SectionEyebrow>
            <h2 className="font-display text-[40px] font-medium leading-[1.05] tracking-tight text-foreground lg:text-[56px]">
              {t.vip.title}
            </h2>
            <p className="mt-5 text-lg leading-[1.7] text-muted lg:text-xl">
              {t.vip.description}
            </p>
            <ul className="mx-auto mt-7 w-fit space-y-4 text-left md:mx-0 md:w-auto">
              {points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 text-[17px] text-foreground sm:text-lg"
                >
                  <span className="h-px w-5 shrink-0 bg-gold" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
