import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import type { MenuItem, MenuItemVariant } from "@/types/menu";

type NameField = "name_ru" | "name_tg" | "name_en";
type DescriptionField = "description_ru" | "description_tg" | "description_en";
type VariantLabelField = "label_ru" | "label_tg" | "label_en";

const NAME_FIELDS: Record<Locale, NameField> = {
  ru: "name_ru",
  tg: "name_tg",
  en: "name_en",
};

const DESCRIPTION_FIELDS: Record<Locale, DescriptionField> = {
  ru: "description_ru",
  tg: "description_tg",
  en: "description_en",
};

/** Название для отображения: выбранный язык → русский. */
export function getProductName(item: MenuItem, locale: Locale): string {
  const localized = item[NAME_FIELDS[locale]]?.trim();
  return localized || item.name_ru.trim();
}

/** Описание для отображения: выбранный язык → русский. */
export function getProductDescription(
  item: MenuItem,
  locale: Locale,
): string | null {
  const localized = item[DESCRIPTION_FIELDS[locale]]?.trim();
  if (localized) return localized;

  const fallback = item.description_ru?.trim();
  return fallback || null;
}

const VARIANT_LABEL_FIELDS: Record<Locale, VariantLabelField> = {
  ru: "label_ru",
  tg: "label_tg",
  en: "label_en",
};

/** Подпись варианта: выбранный язык → русский. */
export function getVariantLabel(
  variant: MenuItemVariant,
  locale: Locale,
): string {
  const localized = variant[VARIANT_LABEL_FIELDS[locale]]?.trim();
  return localized || variant.label_ru.trim();
}

/** Единица продажи из словаря, если у позиции задан unit. */
export function getProductUnitLabel(
  item: MenuItem,
  t: Dictionary,
): string | null {
  if (!item.unit) return null;
  return t.product.units[item.unit];
}
