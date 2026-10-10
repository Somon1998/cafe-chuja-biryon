import type { MenuCategory, MenuItemUnit } from "@/types/menu";

export interface Dictionary {
  common: {
    whatsapp: string;
    orderWhatsApp: string;
  };
  lang: {
    switcherLabel: string;
    ru: string;
    tg: string;
    en: string;
  };
  nav: {
    home: string;
    menu: string;
    about: string;
    gallery: string;
    contact: string;
    fullMenu: string;
    aboutCafe: string;
  };
  header: {
    homeAria: string;
    mainNav: string;
    tagline: string;
    openMenu: string;
  };
  mobileMenu: {
    closeOverlay: string;
    close: string;
    mobileNav: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subheadline: string;
    description: string;
  };
  menu: {
    eyebrow: string;
    title: string;
    subtitle: string;
    fullMenu: string;
    pageTitle: string;
    pageDescription: string;
    filterAria: string;
    emptyTitle: string;
    emptyHint: string;
    loadError: string;
    loadErrorHint: string;
  };
  categories: Record<MenuCategory | "all", string>;
  product: {
    available: string;
    unavailable: string;
    unavailableShort: string;
    order: string;
    showMore: string;
    showLess: string;
    units: Record<MenuItemUnit, string>;
    variantsAria: string;
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    imageAlt: string;
    facts: {
      hours: { title: string; description: string };
      vip: { title: string; description: string };
      delivery: { title: string; description: string };
      freeDelivery: { title: string; description: string };
    };
  };
  vip: {
    eyebrow: string;
    title: string;
    description: string;
    imageAlt: string;
    points: {
      privateRoom: string;
      gatherings: string;
    };
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    openPhoto: (alt: string) => string;
    alts: {
      exteriorNight: string;
      mainHallLeft: string;
      cabin01: string;
      cabin02: string;
      cabin03: string;
      cabin04: string;
      cabin05: string;
      hookahLounge: string;
      grillShowcase: string;
      mainHallRight: string;
      vipRoom: string;
      vipRoom2: string;
    };
    lightbox: {
      label: string;
      close: string;
      previous: string;
      next: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    whatsappWrite: string;
    workingHours: string;
    mapTitle: string;
    openInMaps: string;
    getDirections: string;
  };
  delivery: {
    title: string;
    fee: (amount: number) => string;
    freeFrom: (amount: number) => string;
  };
  footer: {
    navigation: string;
    contacts: string;
    socials: string;
    rights: string;
    tagline: string;
    description: string;
  };
  site: {
    name: string;
    tagline: string;
    description: string;
    workingHours: string;
    address: string;
  };
  whatsapp: {
    order: (name: string, price: number, variantLabel?: string) => string;
    general: string;
  };
  orderModal: {
    title: string;
    whatsapp: string;
    instagram: string;
    close: string;
    selectVariant: string;
  };
}
