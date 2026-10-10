import type { MenuCategory } from "@/types/menu";
import { cn } from "@/lib/utils";

/** Карточки, где описание всегда полностью, без show more. */
export const FULL_DESCRIPTION_SLUGS = new Set(["birinjoba"]);

export const CATEGORY_TONE: Record<MenuCategory, string> = {
  first_courses: "menu-card-tone-first_courses",
  salads: "menu-card-tone-salads",
  main_courses: "menu-card-tone-main_courses",
  shashlik: "menu-card-tone-shashlik",
  drinks: "menu-card-tone-drinks",
};

/**
 * Visual normalization for menu photos inside a fixed image-zone.
 * Groups share one scale; only unusual PNG framing gets a slug override.
 */
type MenuImageFit =
  | "plate-small"
  | "plate-medium"
  | "plate-large"
  | "soup"
  | "skewer"
  | "bottle"
  | "can"
  | "carton"
  | "dum-shurbo"
  | "trout"
  | "achabsan"
  | "farsh";

const MENU_IMAGE_FIT: Record<string, MenuImageFit> = {
  // Soups
  "shurbo-govi": "plate-medium",
  "shurbo-gusfandi": "plate-large",
  "pocha-shurbo": "plate-large",
  "dum-shurbo": "dum-shurbo",
  plemen: "soup",
  birinjoba: "soup",

  // Salads
  "salad-ovoshnoy": "plate-medium",
  "salad-caesar": "plate-medium",
  shakarob: "plate-medium",
  "salad-arabic": "plate-large",
  "salad-thai": "plate-large",
  "salad-green": "plate-large",

  // Mains
  "ribeye-steak": "plate-small",
  "korona-cutlet": "plate-medium",
  "trout-mangal": "plate-medium",
  "chuja-biryon": "plate-medium",
  "chuja-mangal": "plate-medium",
  "miral-cutlet": "plate-medium",
  "kazan-kebab": "plate-medium",
  "chuja-foil": "plate-medium",
  qaburga: "plate-medium",
  "kfc-style": "plate-medium",
  "french-style-meat": "plate-large",
  "qaylai-gusfandi": "plate-large",
  "qaylai-govi": "plate-large",
  "meat-with-mushrooms": "plate-large",
  "chiz-biz": "plate-large",
  "french-style-chop": "plate-large",
  trout: "trout",

  // Shashlik
  "shashlik-sharikvi": "skewer",
  "shashlik-rulet": "skewer",
  "shashlik-kuskovoy-govi": "skewer",
  "shashlik-chicken": "skewer",
  "shashlik-napoleon": "skewer",
  "shashlik-nezhnuy": "skewer",
  "shashlik-dumba": "skewer",
  "shashlik-qaburga": "skewer",
  "shashlik-farsh": "farsh",
  "shashlik-liver": "plate-large",
  "shashlik-achabsan": "achabsan",

  // Drinks
  "rc-cola": "bottle",
  "mineral-water": "bottle",
  mojito: "bottle",
  gorilla: "can",
  "coca-cola": "can",
  "dobry-juice": "carton",
};

const MENU_IMAGE_FIT_CLASS: Record<MenuImageFit, string> = {
  "plate-small": "menu-card-image-fit--plate-small",
  "plate-medium": "menu-card-image-fit--plate-medium",
  "plate-large": "menu-card-image-fit--plate-large",
  soup: "menu-card-image-fit--soup",
  skewer: "menu-card-image-fit--skewer",
  bottle: "menu-card-image-fit--bottle",
  can: "menu-card-image-fit--can",
  carton: "menu-card-image-fit--carton",
  "dum-shurbo": "menu-card-image-fit--dum-shurbo",
  trout: "menu-card-image-fit--trout",
  achabsan: "menu-card-image-fit--achabsan",
  farsh: "menu-card-image-fit--farsh",
};

export function getMenuImageFitClass(slug: string): string {
  const fit = MENU_IMAGE_FIT[slug] ?? "plate-medium";
  return cn("menu-card-image-fit", MENU_IMAGE_FIT_CLASS[fit]);
}

