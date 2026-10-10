import { resolveSiteUrl } from "@/lib/site-url";

const LATITUDE = 37.8360456;
const LONGITUDE = 68.7767506;

export const SITE = {
  name: "Chuja Biryon",
  shortName: "Чуча Бирён",
  tagline: "кафе в Бохтаре",
  description:
    "Чуча Бирён — кафе в Бохтаре. Меню, блюда, фотографии, контакты, адрес и режим работы.",
  url: resolveSiteUrl(),
  phone: "+992 8888-99-311",
  /** E.164 для ссылок tel:, без пробелов и дефисов. */
  phoneTel: "+992888899311",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "992888899311",
  instagramUrl: "https://www.instagram.com/chuja_biryon_bohtar/",
  instagramUsername: "@chuja_biryon_bohtar",
  streetAddress: "ул. Айни 51",
  address: "ул. Айни 51, Бохтар, Таджикистан",
  city: "Бохтар",
  country: "Таджикистан",
  opensAt: "09:00",
  closesAt: "23:00",
  workingHours: "09:00–23:00",
  latitude: LATITUDE,
  longitude: LONGITUDE,
  googleMapsUrl:
    "https://www.google.com/maps/place/%D0%A7%D1%83%D2%B7%D0%B0%D0%B1%D0%B8%D1%80%D1%91%D0%BD/@37.8360456,68.7741757,688m/data=!3m2!1e3!4b1!4m6!3m5!1s0x38ca1b47a8986845:0xbbe4ce01e4d287e!8m2!3d37.8360456!4d68.7767506!16s%2Fg%2F11h_5m8vkn?entry=ttu&g_ep=EgoyMDI2MTAwNi4wIKXMDSoASAFQAw%3D%3D",
  googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${LATITUDE},${LONGITUDE}&travelmode=driving`,
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450!2d68.7767506!3d37.8360456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ca1b47a8986845%3A0xbbe4ce01e4d287e!2z0KfRg9K30LDQsdC40YDRkdC9!5e0!3m2!1sru!2s",
} as const;
