"use client";

import { NAV_LINKS } from "@/constants/navigation";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  sectionIdFromHref,
  useActiveSection,
} from "@/hooks/useActiveSection";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeSection, activateSection } = useActiveSection();
  const overHero = pathname === "/" && !scrolled;

  const navLinks = useMemo(
    () => NAV_LINKS.map(({ href, labelKey }) => ({ href, label: t.nav[labelKey] })),
    [t],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-40 w-full border-b backdrop-blur-xl transition-[background-color,border-color,padding] duration-300",
          overHero
            ? "border-white/6 bg-[#080706]/28 py-3.5"
            : scrolled
              ? "border-[var(--border)]/70 bg-[color-mix(in_srgb,var(--section-a)_92%,transparent)] py-2.5"
              : "border-[var(--border)]/50 bg-[color-mix(in_srgb,var(--section-a)_68%,transparent)] py-3.5",
        )}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 justify-self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2"
            aria-label={`${t.site.name}${t.header.homeAria}`}
            onClick={() => activateSection("hero")}
          >
            <BrandLogo
              alt="Логотип кафе Чуча Бирён"
              size={96}
              className="h-[43px] w-[43px] shrink-0 lg:h-[51px] lg:w-[51px]"
              priority
            />
            <span className="flex flex-col justify-center leading-none">
              <span
                className={cn(
                  "text-[1.05rem] font-semibold leading-tight sm:text-lg",
                  overHero ? "text-white" : "text-foreground",
                )}
              >
                {t.site.name}
              </span>
              <span
                className={cn(
                  "mt-0.5 hidden text-[11px] leading-tight sm:block",
                  overHero ? "text-white/65" : "text-muted",
                )}
              >
                {t.header.tagline}
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label={t.header.mainNav}
          >
            {navLinks.map((link) => {
              const sectionId = sectionIdFromHref(link.href);
              const active = sectionId !== null && activeSection === sectionId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    if (sectionId) activateSection(sectionId);
                  }}
                  className={cn(
                    "group relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2",
                    overHero
                      ? "text-white/85 hover:text-white"
                      : "text-muted hover:text-gold",
                    active && (overHero ? "text-white" : "text-gold"),
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 bottom-0.5 h-px origin-left bg-gold/80 transition-transform duration-200",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-2 justify-self-end sm:gap-3">
            <LanguageSwitcher className="hidden lg:inline-flex" />
            <button
              type="button"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2",
                overHero
                  ? "border-white/25 text-white"
                  : "border-[var(--border)] text-foreground",
              )}
              onClick={() => setMenuOpen(true)}
              aria-label={t.header.openMenu}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={activateSection}
      />
    </>
  );
}
