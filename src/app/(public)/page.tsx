import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { VipSection } from "@/components/sections/VipSection";
import { getFeaturedMenuItems, getMenuItems } from "@/services/menu/menu-service";
import type { MenuItem } from "@/types/menu";

/** Сбалансированный набор featured-позиций для главной (без изменения данных меню). */
const HOME_FEATURED_SLUGS = [
  "shurbo-govi",
  "salad-caesar",
  "shakarob",
  "chuja-biryon",
  "chuja-mangal",
  "ribeye-steak",
  "shashlik-farsh",
  "shashlik-achabsan",
  "coca-cola",
] as const;

function selectHomeFeatured(items: MenuItem[]): MenuItem[] {
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  return HOME_FEATURED_SLUGS.flatMap((slug) => {
    const item = bySlug.get(slug);
    return item ? [item] : [];
  });
}

export default async function HomePage() {
  const [featuredPool, allItems] = await Promise.all([
    getFeaturedMenuItems(),
    getMenuItems(),
  ]);
  const featuredItems = selectHomeFeatured(featuredPool);

  return (
    <>
      <HeroSection />
      <MenuSection items={featuredItems} allItems={allItems} showAllLink />
      <AboutSection />
      <VipSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
