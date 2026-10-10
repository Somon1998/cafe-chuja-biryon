/** Локальные изображения в public/images (без внешних 404). */
export const CAFE_IMAGES = {
  exteriorNight: "/images/cafe/exterior-night.png",
  mainHallLeft: "/images/cafe/main-hall-left.png",
  mainHallRight: "/images/cafe/main-hall-right.png",
  vipRoom: "/images/cafe/vip-room.png",
  vipRoom2: "/images/cafe/vip-room-2.png",
  hookahLounge: "/images/cafe/hookah-lounge.png",
  grillShowcase: "/images/cafe/grill-showcase.png",
  cabin01: "/images/cafe/cabin-01.png",
  cabin02: "/images/cafe/cabin-02.png",
  cabin03: "/images/cafe/cabin-03.png",
  cabin04: "/images/cafe/cabin-04.png",
  cabin05: "/images/cafe/cabin-05.png",
} as const;

export const IMAGES = {
  logo: "/images/brand/chuja-biryon-emblem.png",
  hero: CAFE_IMAGES.exteriorNight,
  vip: CAFE_IMAGES.vipRoom2,
} as const;
