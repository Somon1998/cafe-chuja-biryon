import type { MenuCategory } from "@/types/menu";

export type MenuFilter = "all" | MenuCategory;

export const MENU_CATEGORIES: MenuCategory[] = [
  "first_courses",
  "salads",
  "main_courses",
  "shashlik",
  "drinks",
];

export const MENU_FILTERS: MenuFilter[] = ["all", ...MENU_CATEGORIES];
