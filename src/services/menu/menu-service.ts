import { MENU_ITEMS } from "@/data/menu";
import type { MenuItem } from "@/types/menu";

/**
 * Сервис меню — единственная точка входа для публичного UI.
 *
 * Правила публичного сайта (только активные позиции, порядок сортировки)
 * живут здесь. Источник данных — статический каталог в data/menu.ts.
 */

function sortMenuItems(items: MenuItem[]): MenuItem[] {
  return [...items].sort((a, b) => a.sort_order - b.sort_order);
}

/** Все опубликованные позиции меню (для /menu). */
export async function getMenuItems(): Promise<MenuItem[]> {
  return sortMenuItems(MENU_ITEMS.filter((item) => item.is_active));
}

/** Опубликованные позиции для блока меню на главной. */
export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter((item) => item.is_featured);
}
