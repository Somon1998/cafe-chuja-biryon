import { IMAGES } from "@/constants/images";
import { SITE } from "@/constants/site";

const WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

/** Только подтверждённые данные кафе. priceRange не указан: в меню нет одного диапазона. */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE.url}/#restaurant`,
    name: SITE.shortName,
    url: SITE.url,
    telephone: SITE.phone,
    image: [`${SITE.url}${IMAGES.hero}`, `${SITE.url}${IMAGES.logo}`],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.city,
      addressCountry: "TJ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    hasMap: SITE.googleMapsUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: WEEK,
      opens: SITE.opensAt,
      closes: SITE.closesAt,
    },
    servesCuisine: ["Шашлыки", "Горячие блюда"],
    hasMenu: `${SITE.url}/menu`,
    areaServed: {
      "@type": "City",
      name: SITE.city,
    },
    sameAs: [SITE.instagramUrl],
  };
}
