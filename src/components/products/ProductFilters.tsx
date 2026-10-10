"use client";

import { MENU_FILTERS, type MenuFilter } from "@/constants/categories";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductFiltersProps {
  active: MenuFilter;
  onChange: (filter: MenuFilter) => void;
}

export function ProductFilters({ active, onChange }: ProductFiltersProps) {
  const { t } = useLanguage();

  return (
    <div
      className="-mx-4 flex flex-wrap justify-center gap-x-2.5 gap-y-2 px-4 pb-0.5 sm:mx-0 sm:gap-2 sm:px-0"
      role="tablist"
      aria-label={t.menu.filterAria}
    >
      {MENU_FILTERS.map((filter) => {
        const isActive = active === filter;
        const label = t.categories[filter];
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={cn(
              "relative shrink-0 whitespace-nowrap max-sm:min-h-10 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-200 sm:px-4 sm:py-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive
                ? "text-[#1a140c]"
                : "bg-transparent text-muted hover:bg-gold/8 hover:text-gold",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="menu-filter-pill"
                className="absolute inset-0 rounded-full bg-gold shadow-[0_6px_16px_rgba(216,162,58,0.2)]"
                transition={{ type: "spring", bounce: 0.16, duration: 0.4 }}
              />
            ) : null}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
