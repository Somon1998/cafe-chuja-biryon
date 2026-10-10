import { MenuSection } from "@/components/sections/MenuSection";
import { SITE } from "@/constants/site";
import { getMenuItems } from "@/services/menu/menu-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Меню",
  description: `Меню кафе ${SITE.shortName} в Бохтаре.`,
};

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div className="pt-28">
      <MenuSection items={items} showAllLink={false} />
    </div>
  );
}
