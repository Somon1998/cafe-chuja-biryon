"use client";

import type { MenuItem } from "@/types/menu";
import type { MenuFilter } from "@/constants/categories";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatePresence } from "framer-motion";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

interface ProductGridProps {
  products: MenuItem[];
  filter: MenuFilter;
  loading?: boolean;
  error?: string | null;
  titleLevel?: "h2" | "h3";
}

function filterProducts(products: MenuItem[], filter: MenuFilter): MenuItem[] {
  if (filter === "all") return products;
  return products.filter((p) => p.category === filter);
}

export function ProductGrid({
  products,
  filter,
  loading,
  error,
  titleLevel = "h3",
}: ProductGridProps) {
  const { t } = useLanguage();
  const filtered = filterProducts(products, filter);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/50">
        <p className="font-medium text-red-800 dark:text-red-200">
          {t.menu.loadError}
        </p>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {t.menu.loadErrorHint}
        </p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] p-12 text-center">
        <p className="text-lg font-medium text-foreground">{t.menu.emptyTitle}</p>
        <p className="mt-2 text-sm text-muted">{t.menu.emptyHint}</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {filtered.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            titleLevel={titleLevel}
          />
        ))}
      </div>
    </AnimatePresence>
  );
}
