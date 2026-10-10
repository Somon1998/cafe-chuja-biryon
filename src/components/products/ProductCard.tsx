"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OrderMethodModal } from "@/components/products/OrderMethodModal";
import { useLanguage } from "@/hooks/useLanguage";
import { hasVariants } from "@/lib/menu-item";
import {
  getProductDescription,
  getProductName,
  getProductUnitLabel,
  getVariantLabel,
} from "@/lib/product-i18n";
import { cn, formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/types/menu";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { ProductDescription } from "./ProductDescription";
import { CATEGORY_TONE, FULL_DESCRIPTION_SLUGS, getMenuImageFitClass } from "./product-presentation";

interface ProductCardProps {
  product: MenuItem;
  index?: number;
}

function AvailabilityBadge({ available, label }: { available: boolean; label: string }) {
  return (
    <Badge
      variant={available ? "success" : "danger"}
      className="px-2 py-0 text-[10px] font-medium normal-case tracking-normal opacity-80"
    >
      {label}
    </Badge>
  );
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t, locale } = useLanguage();
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const hasImage = Boolean(product.image);
  const orderDisabled = !product.is_available;
  const displayName = getProductName(product, locale);
  const displayDescription = getProductDescription(product, locale);
  const descriptionKey = `${product.id}-${locale}`;
  const unitLabel = getProductUnitLabel(product, t);
  const categoryLabel = t.categories[product.category];
  const availabilityLabel = product.is_available
    ? t.product.available
    : t.product.unavailable;
  const toneClass = CATEGORY_TONE[product.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.28) }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[#12100E]",
        "shadow-[inset_0_1px_0_rgba(229,184,84,0.06),0_10px_28px_rgba(0,0,0,0.14)]",
        "transition-[border-color,box-shadow,transform] duration-300",
        "motion-safe:hover:-translate-y-[3px]",
        "hover:border-gold/45 hover:shadow-[inset_0_1px_0_rgba(229,184,84,0.12),0_14px_32px_rgba(216,162,58,0.12)]",
        hasImage ? "h-full" : "menu-card-no-image",
        !product.is_available && "opacity-80",
      )}
    >
      {hasImage && product.image ? (
        <div className="menu-card-image-zone">
          <div className={getMenuImageFitClass(product.slug)}>
            <Image
              src={product.image}
              alt={displayName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={90}
              className="object-contain object-center transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
            />
          </div>
        </div>
      ) : null}

      {!hasImage ? (
        <>
          <div
            aria-hidden
            className={cn("pointer-events-none absolute inset-0", toneClass)}
          />
          <div
            aria-hidden
            className="menu-card-glow pointer-events-none absolute inset-0 opacity-70"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-5 h-8 w-px bg-gradient-to-b from-gold/35 via-gold/15 to-transparent"
          />
        </>
      ) : null}

      <div
        className={cn(
          "relative flex flex-1 flex-col px-5 pb-5 sm:px-6",
          hasImage ? "pt-5" : "pt-4",
        )}
      >
        <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
          <Badge
            variant="default"
            className="border-gold/15 bg-gold/8 px-2 text-[10px] font-medium opacity-85"
          >
            {categoryLabel}
          </Badge>
          <AvailabilityBadge
            available={product.is_available}
            label={availabilityLabel}
          />
        </div>

        <h3 className="line-clamp-2 break-words font-display text-[1.2rem] font-medium leading-snug tracking-tight text-foreground sm:text-[1.3rem]">
          {displayName}
        </h3>
        {displayDescription ? (
          <ProductDescription
            key={descriptionKey}
            text={displayDescription}
            showMoreLabel={t.product.showMore}
            showLessLabel={t.product.showLess}
            grow={hasImage}
            allowExpand={!FULL_DESCRIPTION_SLUGS.has(product.slug)}
          />
        ) : hasImage ? (
          <div className="flex-1" />
        ) : null}
        <div
          className={cn(
            "flex shrink-0 flex-col gap-3 border-t border-[var(--border)]/70 pt-3.5",
            hasImage ? "mt-4" : "mt-auto",
          )}
        >
          {hasVariants(product) ? (
            <ul className="space-y-1.5" aria-label={t.product.variantsAria}>
              {product.variants.map((variant) => (
                <li
                  key={variant.id}
                  className="flex items-baseline justify-between gap-3 text-sm"
                >
                  <span className="min-w-0 break-words text-muted">
                    {getVariantLabel(variant, locale)}
                  </span>
                  <span className="shrink-0 font-semibold text-gold">
                    {formatPrice(variant.price)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex min-w-0 items-baseline gap-1.5">
              <span className="text-[1.2rem] font-semibold tracking-tight text-gold sm:text-[1.25rem]">
                {product.price != null ? formatPrice(product.price) : "—"}
              </span>
              {unitLabel ? (
                <span className="text-sm text-muted">/ {unitLabel}</span>
              ) : null}
            </div>
          )}
          {orderDisabled ? (
            <Button size="sm" variant="outline" disabled className="w-full sm:w-auto">
              {t.product.unavailableShort}
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="secondary"
                className="mx-auto h-11 w-[75%] max-w-[250px] border-gold/40 bg-[#171310] text-[#e7ded2] shadow-[inset_0_1px_0_rgba(229,184,84,0.1)] transition-[background-color,color,border-color,box-shadow,transform] duration-200 hover:border-gold hover:bg-gold hover:text-[#1a140c] hover:shadow-[0_8px_22px_rgba(216,162,58,0.28)] active:scale-[0.98] sm:h-[46px] sm:w-[65%]"
                onClick={() => setOrderModalOpen(true)}
              >
                {t.product.order}
              </Button>
              <OrderMethodModal
                key={product.id}
                open={orderModalOpen}
                onClose={() => setOrderModalOpen(false)}
                product={product}
              />
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[22px] border border-[var(--border)] bg-[#12100E]">
      <div className="space-y-3 p-5">
        <div className="h-5 w-24 rounded-full bg-gold/10" />
        <div className="h-6 w-3/4 rounded bg-gold/10" />
        <div className="h-4 w-full rounded bg-gold/10" />
        <div className="h-4 w-5/6 rounded bg-gold/10" />
        <div className="h-9 w-28 rounded-full bg-gold/10" />
      </div>
    </div>
  );
}
