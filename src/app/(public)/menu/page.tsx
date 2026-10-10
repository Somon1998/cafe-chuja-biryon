import { MenuSection } from "@/components/sections/MenuSection";
import {
  createPageMetadata,
  MENU_DESCRIPTION,
  MENU_TITLE,
} from "@/lib/page-metadata";
import { getMenuItems } from "@/services/menu/menu-service";

export const metadata = createPageMetadata({
  title: MENU_TITLE,
  description: MENU_DESCRIPTION,
  path: "/menu",
});

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div className="pt-28">
      <MenuSection items={items} showAllLink={false} headingLevel="h1" />
    </div>
  );
}
