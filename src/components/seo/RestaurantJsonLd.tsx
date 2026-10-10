import { restaurantJsonLd } from "@/lib/restaurant-jsonld";

/**
 * Статический JSON-LD. `<` экранируется, чтобы значение не закрыло тег script.
 */
export function RestaurantJsonLd() {
  const json = JSON.stringify(restaurantJsonLd()).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
