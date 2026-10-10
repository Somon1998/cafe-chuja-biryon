"use client";

import type { MenuFilter } from "@/constants/categories";
import type { MenuItem } from "@/types/menu";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { DeliveryNote } from "@/components/shared/DeliveryNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface MenuSectionProps {
  /** Позиции для вкладки «Все» (на главной — curated preview). */
  items: MenuItem[];
  /**
   * Полный каталог для фильтра по категории.
   * Если не передан, категории фильтруются из `items` (страница /menu).
   */
  allItems?: MenuItem[];
  showAllLink?: boolean;
}

export function MenuSection({
  items,
  allItems,
  showAllLink = true,
}: MenuSectionProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<MenuFilter>("all");
  const catalog = allItems ?? items;
  const gridItems = filter === "all" ? items : catalog;

  return (
    <section id="menu" className="section-y section-a">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.menu.eyebrow} title={t.menu.title} />
        <DeliveryNote className="mx-auto mb-5 max-w-2xl text-center" />
        <div className="mb-6">
          <ProductFilters active={filter} onChange={setFilter} />
        </div>
        <ProductGrid products={gridItems} filter={filter} />
        {showAllLink ? (
          <div className="mt-7 text-center sm:mt-8">
            <Link href="/menu">
              <Button variant="primary" size="lg" className="group">
                {t.menu.fullMenu}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
