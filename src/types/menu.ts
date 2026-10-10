/**
 * Доменная модель меню.
 *
 * Публичный UI (ProductCard, ProductGrid, MenuSection, /menu) работает только
 * с этими типами и ничего не знает об источнике данных.
 *
 * Поля в snake_case соответствуют текущему статическому каталогу.
 * Варианты (`variants`) описывают несколько объёмов или размеров позиции.
 */

export type MenuCategory =
  | "first_courses"
  | "salads"
  | "main_courses"
  | "shashlik"
  | "drinks";

/** Единица продажи, если цена указана не за стандартную порцию. */
export type MenuItemUnit = "piece" | "kg";

export interface MenuItemVariant {
  /** Стабильный идентификатор варианта. */
  id: string;
  label_ru: string;
  label_tg: string;
  label_en: string;
  /** Цена варианта в сомони. */
  price: number;
}

export interface MenuItem {
  /** Стабильный идентификатор позиции. */
  id: string;
  /** Человекочитаемый уникальный ключ (для URL, SEO и импорта/экспорта). */
  slug: string;
  category: MenuCategory;

  name_ru: string;
  name_tg: string;
  name_en: string;

  description_ru: string | null;
  description_tg: string | null;
  description_en: string | null;

  /**
   * Базовая цена в сомони.
   * `null`, если позиция продаётся только через `variants`
   * (нельзя показывать фиктивную основную цену).
   */
  price: number | null;
  /**
   * Варианты объёма/размера. Одна карточка — несколько цен.
   * `null`, если у позиции одна цена.
   */
  variants: MenuItemVariant[] | null;
  /** Единица продажи (`1 шт.`, `1 кг`). `null` — обычная порция. */
  unit: MenuItemUnit | null;
  /** Путь к изображению (локальный `/images/...` или абсолютный URL). */
  image: string | null;

  /** Опубликовано на сайте. Неактивные позиции публичный UI не получает. */
  is_active: boolean;
  /** В наличии прямо сейчас (показывается, но заказать нельзя). */
  is_available: boolean;
  /** Показывать в блоке меню на главной. */
  is_featured: boolean;
  /** Порядок сортировки внутри категории (меньше — выше). */
  sort_order: number;
}
