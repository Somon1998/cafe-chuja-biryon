"use client";

import { NAV_LINKS } from "@/constants/navigation";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  sectionIdFromHref,
  type NavSectionId,
} from "@/hooks/useActiveSection";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeSection: NavSectionId;
  onNavigate: (sectionId: NavSectionId) => void;
}

export function MobileMenu({
  open,
  onClose,
  activeSection,
  onNavigate,
}: MobileMenuProps) {
  const { t } = useLanguage();

  const navLinks = useMemo(
    () => NAV_LINKS.map(({ href, labelKey }) => ({ href, label: t.nav[labelKey] })),
    [t],
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#080706]/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-label={t.mobileMenu.closeOverlay}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed right-0 top-0 z-50 flex h-full w-[min(320px,85vw)] flex-col border-l border-[var(--border)] bg-surface p-6 shadow-2xl lg:hidden",
            )}
            aria-label={t.mobileMenu.mobileNav}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <BrandLogo alt={t.site.name} size={32} className="h-8 w-8" />
                {t.site.name}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 hover:bg-gold/10"
                aria-label={t.mobileMenu.close}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <LanguageSwitcher className="mb-6 w-full justify-center" />

            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const sectionId = sectionIdFromHref(link.href);
                const active =
                  sectionId !== null && activeSection === sectionId;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        if (sectionId) onNavigate(sectionId);
                        onClose();
                      }}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-lg font-medium text-foreground transition-colors hover:bg-gold/10 hover:text-gold",
                        active && "bg-gold/10 text-gold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}
