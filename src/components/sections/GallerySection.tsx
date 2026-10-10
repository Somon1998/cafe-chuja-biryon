"use client";

import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { Reveal } from "@/components/animations/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { GALLERY_ITEMS } from "@/data/gallery";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

const GALLERY_SIZES =
  "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw";

export function GallerySection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const galleryImages = useMemo(
    () =>
      GALLERY_ITEMS.map((item) => ({
        ...item,
        alt: t.gallery.alts[item.id],
        // Replaced in place: use the same original in grid and lightbox,
        // without independently cached Next Image size/quality variants.
        unoptimized: item.id === "exteriorNight",
      })),
    [t],
  );

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current - 1 + galleryImages.length) % galleryImages.length;
    });
  }, [galleryImages.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + 1) % galleryImages.length;
    });
  }, [galleryImages.length]);

  return (
    <section
      id="gallery"
      className="section-b section-edge-soft py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>{t.gallery.eyebrow}</SectionEyebrow>
          <h2 className="font-display text-[36px] font-medium leading-[1.05] tracking-tight text-[#E7DED2] md:text-[48px] lg:text-[56px]">
            {t.gallery.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-[#A99B8B] md:text-[18px]">
            {t.gallery.subtitle}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 min-[430px]:gap-[18px] md:mt-12 md:grid-cols-2 md:gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-[22px] xl:gap-6">
          {galleryImages.map((img, i) => (
            <Reveal key={img.id} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={t.gallery.openPhoto(img.alt)}
                className={cn(
                  "group relative w-full cursor-zoom-in overflow-hidden",
                  "rounded-[18px] min-[430px]:rounded-[20px] md:rounded-[22px] xl:rounded-[24px]",
                  "border border-white/[0.06] bg-[#15110d]",
                  "shadow-[0_12px_40px_rgba(0,0,0,0.28)]",
                  "transition-all duration-500 ease-out",
                  "hover:-translate-y-1 hover:border-[#D8A23A]/40",
                  "hover:shadow-[0_18px_55px_rgba(0,0,0,0.38)]",
                  "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:content-['']",
                  "after:ring-1 after:ring-inset after:ring-[#D8A23A]/0",
                  "after:transition duration-500",
                  "hover:after:ring-[#D8A23A]/20",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8A23A]",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0907]",
                )}
              >
                <span className="relative block h-[240px] w-full overflow-hidden min-[430px]:h-[270px] md:h-[300px] lg:h-[300px] xl:h-[360px]">
                  <Image
                    src={img.src}
                    unoptimized={img.unoptimized}
                    alt={img.alt}
                    fill
                    sizes={GALLERY_SIZES}
                    quality={85}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    style={{ objectPosition: img.position }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <GalleryLightbox
        items={galleryImages}
        index={activeIndex}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
      />
    </section>
  );
}
