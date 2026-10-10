import type { MenuItem, MenuItemVariant } from "@/types/menu";

export function hasVariants(
  item: MenuItem,
): item is MenuItem & { variants: MenuItemVariant[] } {
  return Boolean(item.variants && item.variants.length > 0);
}

export function getVariantById(
  item: MenuItem,
  variantId: string | null | undefined,
): MenuItemVariant | null {
  if (!hasVariants(item) || !variantId) return null;
  return item.variants.find((variant) => variant.id === variantId) ?? null;
}

export function getDefaultVariant(item: MenuItem): MenuItemVariant | null {
  return hasVariants(item) ? item.variants[0] : null;
}

/** Цена и вариант, которые уйдут в WhatsApp. */
export function resolveOrderSelection(
  item: MenuItem,
  variantId?: string | null,
): { price: number; variant: MenuItemVariant | null } | null {
  if (hasVariants(item)) {
    const variant =
      getVariantById(item, variantId) ?? getDefaultVariant(item);
    if (!variant) return null;
    return { price: variant.price, variant };
  }

  if (item.price == null) return null;
  return { price: item.price, variant: null };
}
