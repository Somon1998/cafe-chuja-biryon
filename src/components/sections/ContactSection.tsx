"use client";

import { SITE } from "@/constants/site";
import { Reveal } from "@/components/animations/Reveal";
import { DeliveryNote } from "@/components/shared/DeliveryNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { getWhatsAppGeneralLink } from "@/lib/whatsapp";
import { Clock, MapPin, Navigation, Phone, Truck } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

export function ContactSection({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const { t, locale } = useLanguage();

  return (
    <section
      id="contact"
      className="section-y section-a section-edge-soft"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          className="mb-8"
          level={headingLevel}
        />

        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal className="h-full">
            <div className="flex h-full flex-col justify-between gap-5 rounded-2xl border border-[var(--border)] bg-surface p-5 sm:gap-5 sm:p-6">
              <div className="space-y-4">
                <ContactItem
                  icon={MapPin}
                  title={t.contact.address}
                  value={t.site.address}
                />
                <ContactItem
                  icon={Phone}
                  title={t.contact.phone}
                  value={SITE.phone}
                  href={`tel:${SITE.phoneTel}`}
                />
                <ContactItem
                  icon={WhatsAppIcon}
                  title={t.common.whatsapp}
                  value={t.contact.whatsappWrite}
                  href={getWhatsAppGeneralLink(locale)}
                  external
                />
                <ContactItem
                  icon={InstagramIcon}
                  title="Instagram"
                  value={SITE.instagramUsername}
                  href={SITE.instagramUrl}
                  external
                />
                <ContactItem
                  icon={Clock}
                  title={t.contact.workingHours}
                  value={t.site.workingHours}
                />
                <ContactItem
                  icon={Truck}
                  title={t.delivery.title}
                  value={
                    <DeliveryNote
                      compact
                      className="font-semibold text-foreground"
                    />
                  }
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] lg:min-h-0">
              <iframe
                title={t.contact.mapTitle}
                src={SITE.mapEmbedUrl}
                className="min-h-[280px] w-full flex-1 border-0 lg:min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="space-y-2.5 border-t border-[var(--border)] bg-surface p-3 sm:p-3.5">
                <a
                  href={SITE.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-gold/90 transition-colors duration-200 hover:bg-gold/8 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-inset"
                >
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                  {t.contact.openInMaps}
                </a>
                <a
                  href={SITE.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gold px-3 text-sm font-semibold text-[#1a140c] shadow-[0_10px_24px_rgba(216,162,58,0.22)] transition-colors duration-200 hover:bg-gold-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  <Navigation className="h-4 w-4 shrink-0" aria-hidden />
                  {t.contact.getDirections}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  title,
  value,
  href,
  external,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: ReactNode;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex gap-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
        <Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted sm:text-sm">{title}</p>
        {typeof value === "string" ? (
          <p className="text-sm font-semibold text-foreground sm:text-base">
            {value}
          </p>
        ) : (
          value
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block rounded-lg transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2"
      >
        {content}
      </a>
    );
  }

  return content;
}
