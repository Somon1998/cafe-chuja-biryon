"use client";

import { DeliveryNote } from "@/components/shared/DeliveryNote";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { useLanguage } from "@/hooks/useLanguage";
import { hasVariants, resolveOrderSelection } from "@/lib/menu-item";
import {
  getProductName,
  getVariantLabel,
} from "@/lib/product-i18n";
import { cn, formatPrice } from "@/lib/utils";
import { getWhatsAppOrderLink } from "@/lib/whatsapp";
import type { MenuItem } from "@/types/menu";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface OrderMethodModalProps {
  open: boolean;
  onClose: () => void;
  product: MenuItem;
}

export function OrderMethodModal({
  open,
  onClose,
  product,
}: OrderMethodModalProps) {
  const { t, locale } = useLanguage();
  const [selectedVariantId, setSelectedVariantId] = useState(
    () => product.variants?.[0]?.id ?? "",
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const displayName = getProductName(product, locale);
  const selection = resolveOrderSelection(product, selectedVariantId);
  const variantLabel = selection?.variant
    ? getVariantLabel(selection.variant, locale)
    : undefined;
  const whatsappHref =
    selection != null
      ? getWhatsAppOrderLink(
          displayName,
          selection.price,
          locale,
          variantLabel,
        )
      : undefined;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] max-sm:h-dvh"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-method-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-label={t.orderModal.close}
      />

      <div className="absolute inset-0 flex items-end sm:items-center sm:justify-center">
        <div
          className={cn(
            "relative z-10 mb-0 w-full max-w-none touch-manipulation",
            "max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain",
            "rounded-t-3xl border border-b-0 border-[var(--border)] bg-surface px-4 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl",
            "sm:w-full sm:max-w-md sm:rounded-2xl sm:border sm:p-6",
          )}
        >
          <div
            className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-gold/30 sm:hidden"
            aria-hidden="true"
          />

          <div className="mb-5 flex items-start justify-between gap-3 max-sm:sticky max-sm:top-0 max-sm:z-20 max-sm:bg-surface">
            <div className="min-w-0">
              <h2
                id="order-method-title"
                className="text-xl font-bold leading-snug text-foreground sm:text-lg"
              >
                {t.orderModal.title}
              </h2>
              <p className="mt-1 break-words text-sm text-muted">
                {displayName}
                {variantLabel ? ` · ${variantLabel}` : ""}
                {selection ? ` · ${formatPrice(selection.price)}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              aria-label={t.orderModal.close}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {hasVariants(product) ? (
            <fieldset className="mb-5 min-w-0">
              <legend className="mb-2 text-sm font-semibold text-foreground">
                {t.orderModal.selectVariant}
              </legend>
              <div
                className="flex flex-col gap-2"
                role="radiogroup"
                aria-label={t.product.variantsAria}
              >
                {product.variants.map((variant) => {
                  const isSelected = variant.id === selectedVariantId;
                  const label = getVariantLabel(variant, locale);
                  return (
                    <label
                      key={variant.id}
                      className={cn(
                        "flex min-h-[48px] cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                        "focus-within:ring-2 focus-within:ring-gold/50",
                        isSelected
                          ? "border-gold bg-gold/10 text-foreground"
                          : "border-[var(--border)] text-foreground hover:border-gold/50",
                      )}
                    >
                      <input
                        type="radio"
                        name={`order-variant-${product.id}`}
                        value={variant.id}
                        checked={isSelected}
                        onChange={() => setSelectedVariantId(variant.id)}
                        className="sr-only"
                      />
                      <span>{label}</span>
                      <span className="shrink-0 font-bold text-gold">
                        {formatPrice(variant.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={cn(
                "flex min-h-[64px] w-full items-center gap-4 rounded-2xl px-4 text-base font-semibold transition-colors duration-200",
                "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white focus-visible:ring-[#25D366]/50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              )}
              aria-label={t.orderModal.whatsapp}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80 dark:bg-stone-950/40">
                <WhatsAppIcon className="h-8 w-8" />
              </span>
              <span>{t.orderModal.whatsapp}</span>
            </a>
          ) : null}

          <DeliveryNote compact className="mt-4 text-center" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
