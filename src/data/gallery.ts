import { CAFE_IMAGES } from "@/constants/images";

/**
 * Gallery: ровная premium grid (1 / 2 / 3 колонки).
 * position — CSS object-position для корректного кадрирования.
 */
export const GALLERY_ITEMS = [
  {
    id: "exteriorNight",
    src: CAFE_IMAGES.exteriorNight,
    position: "center 40%",
  },
  {
    id: "mainHallLeft",
    src: CAFE_IMAGES.mainHallLeft,
    position: "42% 48%",
  },
  {
    id: "mainHallRight",
    src: CAFE_IMAGES.mainHallRight,
    position: "38% 46%",
  },
  {
    id: "grillShowcase",
    src: CAFE_IMAGES.grillShowcase,
    position: "58% 42%",
  },
  {
    id: "vipRoom",
    src: CAFE_IMAGES.vipRoom,
    position: "center 48%",
  },
  {
    id: "cabin01",
    src: CAFE_IMAGES.cabin01,
    position: "72% 44%",
  },
  {
    id: "cabin02",
    src: CAFE_IMAGES.cabin02,
    position: "center 42%",
  },
  {
    id: "cabin03",
    src: CAFE_IMAGES.cabin03,
    position: "48% 40%",
  },
  {
    id: "hookahLounge",
    src: CAFE_IMAGES.hookahLounge,
    position: "52% 58%",
  },
  {
    id: "cabin04",
    src: CAFE_IMAGES.cabin04,
    position: "center 38%",
  },
  {
    id: "cabin05",
    src: CAFE_IMAGES.cabin05,
    position: "center 36%",
  },
  {
    id: "vipRoom2",
    src: CAFE_IMAGES.vipRoom2,
    position: "center 48%",
  },
] as const;

