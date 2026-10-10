import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";
import type { Metadata } from "next";

const OG_IMAGE = {
  url: IMAGES.hero,
  width: 1298,
  height: 1212,
  alt: "Вечерний фасад кафе Чуча Бирён в Бохтаре",
} as const;

export const HOME_TITLE = `${SITE.shortName} — кафе в Бохтаре | Меню, доставка и VIP-зал`;
export const HOME_DESCRIPTION = `Кафе «${SITE.shortName}», ${SITE.address}: шашлыки, горячие блюда, VIP-зал и доставка по городу. Ежедневно ${SITE.workingHours}.`;

export const MENU_TITLE = `Меню ${SITE.shortName} — шашлыки, горячие блюда и напитки в Бохтаре`;
export const MENU_DESCRIPTION = `Меню кафе «${SITE.shortName}» в Бохтаре: первые блюда, салаты, горячее, шашлыки и напитки. Доставка по городу и заказ в WhatsApp.`;

export const CONTACT_TITLE = `Контакты ${SITE.shortName} — адрес, телефон и маршрут в Бохтаре`;
export const CONTACT_DESCRIPTION = `${SITE.shortName}, ${SITE.address}. Телефон ${SITE.phone}, ежедневно ${SITE.workingHours}. Маршрут — в Google Maps.`;

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: "/" | "/menu" | "/contact";
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.shortName,
      locale: "ru_RU",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: IMAGES.hero, alt: OG_IMAGE.alt }],
    },
  };
}
