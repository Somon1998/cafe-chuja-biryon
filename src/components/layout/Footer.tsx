"use client";

import { SITE } from "@/constants/site";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { useLanguage } from "@/hooks/useLanguage";
import { getWhatsAppGeneralLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Phone } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export function Footer() {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  const footerLinks = useMemo(
    () => [
      { href: "/menu", label: t.nav.fullMenu },
      { href: "/#about", label: t.nav.aboutCafe },
      { href: "/#contact", label: t.nav.contact },
    ],
    [t],
  );

  return (
    <footer className="overflow-visible border-t border-[var(--border)] bg-[#0a0807] text-[#e7ded2]">
      <div className="mx-auto max-w-7xl overflow-visible px-4 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] pt-10 sm:px-6 sm:pt-11 md:pb-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:items-start lg:gap-10">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0807]"
            >
              <BrandLogo
                alt={t.site.name}
                size={96}
                className="h-10 w-10 shrink-0 shadow-sm ring-1 ring-white/10 md:h-[42px] md:w-[42px] lg:h-[45px] lg:w-[45px]"
              />
              <span className="whitespace-nowrap text-base font-semibold">
                {t.site.name}
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#a99b8b]">
              {t.footer.description}
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#e7ded2]/90">
              {t.footer.navigation}
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a99b8b] transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0807]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#e7ded2]/90">
              {t.footer.contacts}
            </p>
            <ul className="space-y-2.5 text-sm text-[#a99b8b]">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>{t.site.address}</li>
              <li>{t.site.workingHours}</li>
            </ul>
          </div>

          <div className="overflow-visible pb-8 md:pb-0">
            <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#e7ded2]/90 md:mb-3">
              {t.footer.socials}
            </p>
            <div className="flex flex-row items-center gap-3 overflow-visible md:gap-2.5">
              <a
                href={getWhatsAppGeneralLink(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center overflow-visible max-sm:h-11 max-sm:w-11 rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors duration-200 hover:bg-[#25D366] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
                aria-label={t.common.whatsapp}
              >
                <WhatsAppIcon className="h-[18px] w-[18px] md:h-5 md:w-5" />
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center overflow-visible max-sm:h-11 max-sm:w-11 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-amber-400 text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-[18px] w-[18px] md:h-5 md:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-0 border-t border-white/8 pt-5 text-center text-xs text-[#a99b8b] sm:text-sm md:mt-8">
          © {year} {t.site.name}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
