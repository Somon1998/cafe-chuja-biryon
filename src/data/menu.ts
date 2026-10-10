import type {
  MenuCategory,
  MenuItem,
  MenuItemUnit,
  MenuItemVariant,
} from '@/types/menu'

/**
 * Статический источник данных меню Chuja Biryon.
 *
 * Не импортируйте этот файл напрямую в компоненты —
 * используйте `@/services/menu/menu-service`.
 */

type LocaleText = {
  ru: string
  tg: string
  en: string
}

function variant(
  id: string,
  label: LocaleText,
  price: number,
): MenuItemVariant {
  return {
    id,
    label_ru: label.ru,
    label_tg: label.tg,
    label_en: label.en,
    price,
  }
}

function item(input: {
  slug: string
  category: MenuCategory
  name: LocaleText
  description: LocaleText
  price?: number | null
  variants?: MenuItemVariant[]
  unit?: MenuItemUnit
  sort_order: number
  is_featured?: boolean
  image?: string | null
}): MenuItem {
  const variants = input.variants?.length ? input.variants : null

  return {
    id: input.slug,
    slug: input.slug,
    category: input.category,
    name_ru: input.name.ru,
    name_tg: input.name.tg,
    name_en: input.name.en,
    description_ru: input.description.ru,
    description_tg: input.description.tg,
    description_en: input.description.en,
    price: variants ? null : (input.price ?? null),
    variants,
    unit: input.unit ?? null,
    image: input.image ?? null,
    is_active: true,
    is_available: true,
    is_featured: input.is_featured ?? false,
    sort_order: input.sort_order,
  }
}

const LITER = { ru: '1 л', tg: '1 л', en: '1 L' } as const
const LITER_15 = { ru: '1.5 л', tg: '1.5 л', en: '1.5 L' } as const
const LITER_05 = { ru: '0.5 л', tg: '0.5 л', en: '0.5 L' } as const

export const MENU_ITEMS: MenuItem[] = [
  // --- Таомҳои якум / Первые блюда ---
  item({
    slug: 'shurbo-govi',
    category: 'first_courses',
    name: {
      tg: 'Шӯрбои говӣ',
      ru: 'Шурпа из говядины',
      en: 'Beef Shurpa',
    },
    description: {
      ru: 'Сытный традиционный суп с нежной говядиной, отборным картофелем и свежими овощами в ароматном прозрачном бульоне.',
      tg: 'Шӯрбои серғизои суннатӣ бо гӯшти мулоими гов, картошка ва сабзавоти тару тоза дар шӯрбои шаффофи хушбӯй.',
      en: 'Hearty traditional soup with tender beef cuts, potatoes, and fresh vegetables simmered in a rich, aromatic broth.',
    },
    price: 25,
    sort_order: 10,
    is_featured: true,
    image: '/images/menu/beef-soup.png',
  }),
  item({
    slug: 'shurbo-gusfandi',
    category: 'first_courses',
    name: {
      tg: 'Шӯрбои гӯсфандӣ',
      ru: 'Шурпа из баранины',
      en: 'Lamb Shurpa',
    },
    description: {
      ru: 'Наваристый ароматный суп из отборной баранины со сладким перцем, картофелем и восточными специями.',
      tg: 'Шӯрбои болаззат ва хушбӯй бо гӯшти ширини барра, нахӯд ва сабзавот бо маззаи нотакрори шарқӣ.',
      en: 'Rich and savory traditional soup made with tender lamb, potatoes, sweet peppers, and oriental herbs.',
    },
    price: 25,
    sort_order: 20,
    image: '/images/menu/shurpa-lamb.png',
  }),
  item({
    slug: 'pocha-shurbo',
    category: 'first_courses',
    name: {
      tg: 'Почашӯрбо',
      ru: 'Хаш (Почашурпа)',
      en: 'Pacha Shurpa (Khash)',
    },
    description: {
      ru: 'Традиционное целебное и наваристое блюдо из говяжьих ножек, томлёное на медленном огне до бархатистой плотности.',
      tg: 'Хӯроки миллии серғизо ва шифобахш бо почаи гов, ки дар оташи паст муддати тӯлонӣ ҷӯшонида шудааст.',
      en: 'Traditional revitalizing bone broth slow-cooked with beef shanks and tendons to rich perfection.',
    },
    price: 40,
    sort_order: 30,
    is_featured: true,
    image: '/images/menu/pacha-beef.png',
  }),
  item({
    slug: 'dum-shurbo',
    category: 'first_courses',
    name: {
      tg: 'Думшӯрбо',
      ru: 'Суп из говяжьих хвостов (Думшурпа)',
      en: 'Oxtail Soup (Dumshurpa)',
    },
    description: {
      ru: 'Наваристый и питательный деликатесный суп из томлёных говяжьих хвостов с нежнейшим отделяющимся мясом.',
      tg: 'Шӯрбои бой ва серғизо аз думи гов, ки дар оби оҳиста ҷӯшида, мулоим ва ниҳоят бомазза гаштааст.',
      en: 'Rich, flavorful, and nutrient-dense broth slow-simmered with tender braised oxtail.',
    },
    price: 40,
    sort_order: 40,
    image: '/images/menu/dum-shurpa.png',
  }),
  item({
    slug: 'plemen',
    category: 'first_courses',
    name: {
      tg: 'Тӯшбера (Пелменӣ)',
      ru: 'Тушбера (Домашние пельмени)',
      en: 'Tushbera (Handmade Dumpling Soup)',
    },
    description: {
      ru: 'Нежные домашние пельмени с сочной мясной начинкой в горячем прозрачном бульоне со свежей зеленью.',
      tg: 'Тӯшбераҳои болаззати хонагӣ бо қимаи гӯшти тоза дар шӯрбои гарму хушбӯй бо кабудӣ ва сабзавот.',
      en: 'Delicate handmade meat dumplings served in piping-hot aromatic broth with fresh garden herbs.',
    },
    price: 20,
    sort_order: 50,
    image: '/images/menu/plemen-bulon.jpg',
  }),
  item({
    slug: 'birinjoba',
    category: 'first_courses',
    name: {
      tg: 'Биринҷоба',
      ru: 'Бринджоба',
      en: 'Brinjoba (Rice & Herb Soup)',
    },
    description: {
      ru: 'Густой традиционный рисовый суп со свежими овощами и душистой зеленью. Подаётся с чаккой или каймаком.',
      tg: 'Шӯрбои ғафси миллӣ аз биринҷ ва сабзавот бо кабудии тару тоза. Бо чакка ё қаймоқ пешкаш карда мешавад.',
      en: 'Thick traditional rice soup with garden vegetables and aromatic herbs, served with chakki or sour cream.',
    },
    price: 15,
    sort_order: 60,
    image: '/images/menu/birinchoba.png',
  }),

  // --- Хӯришҳо / Салаты ---
  item({
    slug: 'salad-ovoshnoy',
    category: 'salads',
    name: {
      tg: 'Салати сабзавотӣ',
      ru: 'Овощной салат',
      en: 'Fresh Garden Salad',
    },
    description: {
      ru: 'Хрустящие огурцы, сочные сладкие помидоры, болгарский перец и свежая зелень под лёгкой заправкой.',
      tg: 'Бодиринги тару тоза, помидори ширин, қаламфури рангоранг ва кабудии хушбӯй бо равғани зайтун.',
      en: 'Crisp cucumbers, ripe sweet tomatoes, bell peppers, and fresh herbs tossed with light dressing.',
    },
    price: 25,
    sort_order: 110,
    image: '/images/menu/salad-vegetable.png',
  }),
  item({
    slug: 'salad-caesar',
    category: 'salads',
    name: {
      tg: 'Салати «Сезар»',
      ru: 'Салат «Цезарь»',
      en: 'Caesar Salad',
    },
    description: {
      ru: 'Хрустящие листья салата, сочное обжаренное куриное филе, сыр пармезан, чесночные сухарики и фирменный соус цезарь.',
      tg: 'Баргҳои тару тозаи салат, синаи мурғи нарми бирён, панири пармезан, нони хушккарда ва соуси хоси сезар.',
      en: 'Crisp salad greens, tender grilled chicken breast, parmesan cheese, crunchy croutons, and signature Caesar dressing.',
    },
    price: 30,
    sort_order: 120,
    is_featured: true,
    image: '/images/menu/salad-caesar.png',
  }),
  item({
    slug: 'shakarob',
    category: 'salads',
    name: {
      tg: 'Шакароб',
      ru: 'Шакароб',
      en: 'Shakarob Salad',
    },
    description: {
      ru: 'Национальный салат из спелых местных томатов, тонко нарезанного лука и душистого свежего базилика (райхона).',
      tg: 'Хӯриши классикии миллӣ аз помидорҳои ширини маҳаллӣ, пиёзи борик резакарда ва райҳони тоза.',
      en: 'Authentic local salad made with ripe sweet tomatoes, thinly shaved onions, and fresh fragrant basil.',
    },
    price: 20,
    sort_order: 130,
    is_featured: true,
    image: '/images/menu/salad-shakarob.png',
  }),
  item({
    slug: 'salad-arabic',
    category: 'salads',
    name: {
      tg: 'Салати арабӣ (Фаттуш)',
      ru: 'Арабский салат (Фаттуш)',
      en: 'Fattoush (Arabic Salad)',
    },
    description: {
      ru: 'Освежающий салат со спелыми овощами, хрустящими кусочками поджаренного лаваша, мятой и пряным сумахом.',
      tg: 'Хӯриши сабук аз сабзавоти тару тоза, нони бирёнкардаи хурӯсӣ, пудина ва сумоқи туршмазза.',
      en: 'Refreshing Mediterranean salad with crisp garden vegetables, toasted flatbread chips, mint, and tangy sumac.',
    },
    price: 35,
    sort_order: 140,
    image: '/images/menu/salad-arabic.png',
  }),
  item({
    slug: 'salad-thai',
    category: 'salads',
    name: {
      tg: 'Салати таиландӣ',
      ru: 'Тайский салат с говядиной',
      en: 'Thai Beef Salad',
    },
    description: {
      ru: 'Нежные полоски сочной говядины со свежими хрустящими овощами, кинзой и кунжутом в пикантном кисло-сладком соусе.',
      tg: 'Буридаҳои гӯшти гови мулоим бо сабзавоти тару тоза, қаламфур ва кашнич дар соуси махсуси туршу ширин.',
      en: 'Slices of tender beef tossed with crunchy vegetables, fresh cilantro, sesame, and zesty sweet-and-sour dressing.',
    },
    price: 30,
    sort_order: 150,
    image: '/images/menu/salad-thai.png',
  }),
  item({
    slug: 'salad-green',
    category: 'salads',
    name: {
      tg: 'Салати сабз',
      ru: 'Зеленый салат с авокадо',
      en: 'Green Detox Salad',
    },
    description: {
      ru: 'Микс хрустящей зелени, спелый авокадо, огурцы, оливки и тыквенные семечки под лёгкой цитрусовой заправкой.',
      tg: 'Омехтаи баргҳои сабз, авокадо, бодиринг, нахӯди сабз ва тухми каду бо соуси равғани зайтун.',
      en: 'Fresh mixed salad greens, ripe avocado, crisp cucumbers, olives, and pumpkin seeds with extra virgin olive oil.',
    },
    price: 25,
    sort_order: 160,
    image: '/images/menu/salad-green.png',
  }),

  // --- Таомҳои дуюм / Вторые блюда ---
  item({
    slug: 'qaylai-govi',
    category: 'main_courses',
    name: {
      tg: 'Қайлаи говӣ',
      ru: 'Кайла из говядины',
      en: 'Braised Beef (Kayla)',
    },
    description: {
      ru: 'Нежная говядина, долго томленая в собственном соку со сладким луком.',
      tg: 'Гӯшти мулоими гов, ки дар дег бо шарбати худ ва пиёзи ширин муддати дароз дам партофта шудааст.',
      en: 'Tender cuts of beef slow-braised in a traditional cauldron with sweet onions in its own savory juices.',
    },
    price: 65,
    sort_order: 210,
    is_featured: true,
    image: '/images/menu/qaylai-gov.png',
  }),
  item({
    slug: 'qaylai-gusfandi',
    category: 'main_courses',
    name: {
      tg: 'Қайлаи гӯсфандӣ',
      ru: 'Кайла из баранины',
      en: 'Braised Lamb (Kayla)',
    },
    description: {
      ru: 'Нежнейшая баранина, томлёная в собственном соку с луком и ароматными восточными пряностями.',
      tg: 'Гӯшти лазизи гӯсфандӣ бо пиёз ва адвиёти хушбӯи шарқӣ, ки дар дами паст мулоим ва обшуда пухта шудааст.',
      en: 'Succulent lamb gently stewed with sweet onions and oriental spices until melt-in-your-mouth tender.',
    },
    price: 65,
    sort_order: 220,
    image: '/images/menu/qaylai-gusfandi.png',
  }),
  item({
    slug: 'kazan-kebab',
    category: 'main_courses',
    name: {
      tg: 'Қозон кабоб',
      ru: 'Казан-кабоб',
      en: 'Kazan Kabob',
    },
    description: {
      ru: 'Обжаренное до румяной корочки мясо с золотистым картофелем и маринованным луком прямо из казана.',
      tg: 'Гӯшти бирёни лазиз ва картошкаи зардтоби тиллоӣ бо пиёзи бурида ва адвиёт аз қозони тафсон.',
      en: 'Crispy golden-fried meat paired with tender whole potatoes and seasoned onions prepared in a cast-iron cauldron.',
    },
    price: 65,
    sort_order: 230,
    image: '/images/menu/qozon-kabob.png',
  }),
  item({
    slug: 'meat-with-mushrooms',
    category: 'main_courses',
    name: {
      tg: 'Гӯшт бо занбӯруғ',
      ru: 'Мясо с грибами',
      en: 'Beef with Mushrooms',
    },
    description: {
      ru: 'Сочные кусочки говядины, обжаренные со свежими шампиньонами и луком в ароматном бархатистом соусе.',
      tg: 'Буридаҳои гӯшти нарми гов бо занбӯруғҳои тару тоза ва пиёз дар соуси хушбӯй ва қаймоқӣ.',
      en: 'Tender beef medallions pan-seared with fresh mushrooms and onions in a rich savory sauce.',
    },
    price: 60,
    sort_order: 240,
    image: '/images/menu/meat-with-mushrooms.png',
  }),
  item({
    slug: 'chiz-biz',
    category: 'main_courses',
    name: {
      tg: 'Ҷиз-биз',
      ru: 'Джиз-быз',
      en: 'Jiz-Byz',
    },
    description: {
      ru: 'Традиционное горячее блюдо из обжаренного до хруста мяса с румяным картофелем и кольцами маринованного лука.',
      tg: 'Хӯроки серғизои суннатӣ: гӯшти пухташуда ва картошкаи бирён бо пиёзи хушбӯй дар тобаи оҳанин.',
      en: 'Traditional skillet dish of sizzling roasted meat served with crispy country-style potatoes and onions.',
    },
    price: 60,
    sort_order: 250,
    image: '/images/menu/jiz-biz.png',
  }),
  item({
    slug: 'french-style-meat',
    category: 'main_courses',
    name: {
      tg: 'Гӯшти фаронсавӣ',
      ru: 'Мясо по-французски',
      en: 'Meat a la French',
    },
    description: {
      ru: 'Сочное отбивное мясо, запечённое со спелыми томатами и луком под аппетитной золотистой сырной корочкой.',
      tg: 'Гӯшти мулоими кӯфта бо қабати помидор ва пиёз, ки зери пардаи панири заррини гудохташуда пухта шудааст.',
      en: 'Tender meat cutlet baked with sliced tomatoes and onions beneath a rich, bubbling crust of melted cheese.',
    },
    price: 70,
    sort_order: 260,
    image: '/images/menu/meat-french-style.png',
  }),
  item({
    slug: 'french-style-chop',
    category: 'main_courses',
    name: {
      tg: 'Гӯшти кӯфтаи фаронсавӣ',
      ru: 'Филе по-французски (с сыром и овощами)',
      en: 'French-Style Baked Cutlet',
    },
    description: {
      ru: 'Нежнейшее отбивное филе, запечённое с овощами под щедрым слоем аппетитного тягучего сыра.',
      tg: 'Буридаҳои синаи мурғ/гӯшти мулоим бо сабзавот зери пӯшиши ғафси панири пухташудаи тафдонӣ.',
      en: 'Tender seasoned cutlet slow-baked with layered vegetables under a thick blanket of golden melted cheese.',
    },
    price: 70,
    sort_order: 270,
    image: '/images/menu/french-style-chop.png',
  }),
  item({
    slug: 'ribeye-steak',
    category: 'main_courses',
    name: {
      tg: 'Стейки рибай',
      ru: 'Стейк Рибай',
      en: 'Ribeye Steak',
    },
    description: {
      ru: 'Премиальный стейк из мраморной говядины идеальной прожарки, с насыщенным мясным соком и веточкой розмарина.',
      tg: 'Стейки мармарии гов бо бирёнкунии бенуқсон, ки шарбати табиӣ ва маззаи гӯшти ҳақиқиро нигоҳ медорад.',
      en: 'Premium marbled beef ribeye grilled to perfection, succulent and infused with rosemary and natural juices.',
    },
    price: 90,
    sort_order: 280,
    is_featured: true,
    image: '/images/menu/steak-ribeye.png',
  }),
  item({
    slug: 'chuja-biryon',
    category: 'main_courses',
    name: {
      tg: 'Ҷӯҷаи бирён',
      ru: 'Жареный цыпленок',
      en: 'Roasted Spring Chicken',
    },
    description: {
      ru: 'Фирменный цыпленок с хрустящей золотистой корочкой, сочным нежным мясом, свежими огурцами и долькой лимона.',
      tg: 'Ҷӯҷаи бирёни махсуси фирменӣ бо пӯсти заррини хурӯсӣ ва гӯшти ниҳоят мулоиму сершира.',
      en: 'Signature crispy roasted spring chicken featuring golden crackling skin and tender, juicy meat.',
    },
    price: 55,
    sort_order: 290,
    is_featured: true,
    image: '/images/menu/chuja-biryon.png',
  }),
  item({
    slug: 'chuja-mangal',
    category: 'main_courses',
    name: {
      tg: 'Ҷӯҷа дар манқал',
      ru: 'Цыпленок на мангале',
      en: 'Charcoal Grilled Chicken',
    },
    description: {
      ru: 'Цыпленок, запеченный на углях с ароматом дымка, золотистой корочкой, спелыми томатами и свежим луком.',
      tg: 'Ҷӯҷаи хуштаъми бархӯрда дар оташи ангишт, бо бӯи хуши дуд, помидор ва пиёзи кӯфта.',
      en: 'Spiced whole spring chicken charred over natural glowing coals with delicious smoky aromas.',
    },
    price: 55,
    sort_order: 300,
    is_featured: true,
    image: '/images/menu/chuja-mangal.png',
  }),
  item({
    slug: 'chuja-foil',
    category: 'main_courses',
    name: {
      tg: 'Ҷӯҷа дар фолга',
      ru: 'Цыпленок в фольге',
      en: 'Foil-Baked Chicken',
    },
    description: {
      ru: 'Нежнейший цыпленок, запеченный в фольге с печеным картофелем, чесноком и травами в собственном соку.',
      tg: 'Ҷӯҷаи нарму обдор бо сабзавот, картошка ва сирпиёз, ки дар зарварақи фолга дар тафдон пухта шудааст.',
      en: 'Oven-roasted spring chicken baked inside foil with baby potatoes, garlic, and herbs to lock in ultimate tenderness.',
    },
    price: 60,
    sort_order: 310,
    image: '/images/menu/chicken-foil.png',
  }),
  item({
    slug: 'trout',
    category: 'main_courses',
    name: {
      tg: 'Гулмоҳии яклухти тафдонӣ',
      ru: 'Запеченная форель целиком',
      en: 'Whole Oven-Baked Trout',
    },
    description: {
      ru: 'Цельная речная форель, запеченная в печи с лимоном, пряными травами, печеным чесноком и томатами черри.',
      tg: 'Моҳии форел (гулмоҳӣ)-и яклухт бо лиму, гиёҳҳои кӯҳӣ ва помидорҳои чери дар тафдон пухташуда.',
      en: 'Whole freshwater mountain trout baked with lemon wedges, rosemary herbs, garlic, and cherry tomatoes.',
    },
    price: 150,
    unit: 'piece',
    sort_order: 320,
    image: '/images/menu/whole-baked-trout.png',
  }),
  item({
    slug: 'trout-mangal',
    category: 'main_courses',
    name: {
      tg: 'Гулмоҳӣ дар манқал',
      ru: 'Форель на мангале',
      en: 'Charcoal Grilled Trout',
    },
    description: {
      ru: 'Аппетитные стейки форели на решетке с характерным ароматом дымка, подаются с лимоном и овощным гарниром.',
      tg: 'Стейкҳои гулмоҳии хуштаъм дар панҷараи ангишт бо изи оташ, лимуи тоза ва сабзавот.',
      en: 'Tender trout steaks flame-grilled over open coals, served with lemon slices, peppers, and fresh greens.',
    },
    price: 150,
    unit: 'piece',
    sort_order: 330,
    is_featured: true,
    image: '/images/menu/trout-mangal.png',
  }),
  item({
    slug: 'korona-cutlet',
    category: 'main_courses',
    name: {
      tg: 'Котлети Корона',
      ru: 'Котлеты «Корона»',
      en: '"Crown" Homemade Cutlets',
    },
    description: {
      ru: 'Пышные и сочные домашние мясные котлеты с аппетитной поджаристой корочкой из отборного фарша.',
      tg: 'Котлетҳои хонагии сершира ва хушбӯй бо қимаи гӯшти аъло, ки бо қабати заррини бирён пухта шудаанд.',
      en: 'Tender and juicy pan-seared minced meat patties seasoned with classic herbs and spices.',
    },
    price: 30,
    sort_order: 340,
    image: '/images/menu/korona-cutlet.png',
  }),
  item({
    slug: 'miral-cutlet',
    category: 'main_courses',
    name: {
      tg: 'Котлети Мирал',
      ru: 'Котлеты «Мирал»',
      en: '"Miral" Signature Cutlets',
    },
    description: {
      ru: 'Крупные, сочные фирменные мясные котлеты с богатым вкусом и свежей зеленью.',
      tg: 'Котлетҳои сергӯшти болаззат ва мулоим аз рӯи ретсепти махсус барои дӯстдорони таъми ҳақиқии гӯшт.',
      en: "Savory and plump minced cutlets handcrafted using our chef's signature recipe with aromatic herbs.",
    },
    price: 35,
    sort_order: 350,
    image: '/images/menu/miral-cutlet.png',
  }),
  item({
    slug: 'qaburga',
    category: 'main_courses',
    name: {
      tg: 'Қабургаи гӯсфандӣ',
      ru: 'Баранинные ребрышки («Корона»)',
      en: 'Lamb Ribs ("Crown")',
    },
    description: {
      ru: 'Сочные баранинные ребрышки на косточке с поджаристой хрустящей корочкой, запеченные по-королевски со специями.',
      tg: 'Қабургаҳои лазизи гӯсфандӣ дар шакли шоҳона, бо бӯи хуши оташ ва адвиёт то пухтарасии комил бирёнкарда.',
      en: 'Tender roasted lamb ribs seasoned with mountain herbs and char-broiled to perfection.',
    },
    price: 60,
    sort_order: 360,
    image: '/images/menu/qaburga.png',
  }),
  item({
    slug: 'kfc-style',
    category: 'main_courses',
    name: {
      tg: 'К.Ф.С. (Мурғ бирён)',
      ru: 'Курочка КФС (Хрустящее ведерко)',
      en: 'Crispy Fried Chicken & Fries Combo',
    },
    description: {
      ru: 'Щедрая порция золотистых кусочков курицы в суперхрустящей панировке с аппетитным картофелем фри и соусами.',
      tg: 'Порсияи бузурги буридаҳои мурғи тиллоӣ бо пӯсти қирқ-қирқ ҳамроҳ бо картошкаи фри ва соусҳо.',
      en: 'Generous platter of golden extra-crispy fried chicken wings and drums topped with hot french fries.',
    },
    price: 150,
    unit: 'kg',
    sort_order: 370,
    image: '/images/menu/kfc-style.png',
  }),

  // --- Сихкабобҳо ---
  item({
    slug: 'shashlik-farsh',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби Фарши',
      ru: 'Шашлык из фарша',
      en: 'Minced Skewer',
    },
    description: {
      ru: 'Сочный шашлык из мясного фарша со специями, приготовленный на раскаленных углях мангала.',
      tg: 'Сихкабоби фарши дарози мулоим аз қимаи тоза, ки дар манқал пухта шудааст.',
      en: 'Seasoned minced meat skewered and grilled over glowing charcoal embers until succulent and tender.',
    },
    price: 26,
    sort_order: 410,
    is_featured: true,
    image: '/images/menu/shashlik-farsh.png',
  }),
  item({
    slug: 'shashlik-sharikvi',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби шарикви',
      ru: 'Шашлык шарикви',
      en: 'Sharikvi Shashlik',
    },
    description: {
      ru: 'Сочный шашлык на мангале с насыщенным вкусом.',
      tg: 'Сихкабоби сероб дар манқал бо таъми пурра.',
      en: 'Juicy mangal shashlik with a rich flavour.',
    },
    price: 28,
    sort_order: 420,
    image: '/images/menu/shashlik-sharikvi.png',
  }),
  item({
    slug: 'shashlik-napoleon',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби Наполеон',
      ru: 'Шашлык «Наполеон»',
      en: '"Napoleon" Layered Kebab',
    },
    description: {
      ru: 'Фирменный слоёный шашлык из чередующихся пластин отборной мякоти и курдюка, тающий во рту. Подается на лаваше.',
      tg: 'Гӯшти баргузида бо қабатҳои дунбаи мулоим ба шакли шоҳона, ки дар лаваш бо пиёз ва соус пешкаш мегардад.',
      en: 'Gourmet skewered layers of premium tender meat and tail fat, grilled over hot charcoal and served on lavash.',
    },
    price: 28,
    sort_order: 430,
    image: '/images/menu/napoleon.png',
  }),
  item({
    slug: 'shashlik-nezhnuy',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби маҳин бо сабзавот',
      ru: 'Шашлык «Нежный» с овощами',
      en: '"Tender" Skewer with Veggies',
    },
    description: {
      ru: 'Мягчайшие кусочки маринованного мяса, чередующиеся с кольцами кабачка, помидора и лука с ароматными травами.',
      tg: 'Гӯшти мулоими бодиққат маринадшуда бо доираҳои помидор, каду ва пиёз бо бӯи хуши гиёҳҳо.',
      en: 'Extra-tender marinated meat cubes skewered with fresh zucchini, sweet tomato slices, onions, and herbs.',
    },
    price: 28,
    sort_order: 440,
    image: '/images/menu/shashlik-nezhnuy.png',
  }),
  item({
    slug: 'shashlik-rulet',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби рулет',
      ru: 'Шашлык-рулет с курдюком',
      en: 'Rolled Meat Skewers with Tail Fat',
    },
    description: {
      ru: 'Аппетитные мясные спирали-рулеты, нанизанные на шампуры вперемешку с золотистым сочным курдюком.',
      tg: 'Рулетҳои печондашудаи гӯштӣ дар якҷоягӣ бо пораҳои дунбаи заррин, ки таъми беназири суннатиро эҷод мекунанд.',
      en: 'Spiraled meat rolls alternated with tender pieces of rendered tail fat, grilled to a crispy perfection.',
    },
    price: 30,
    sort_order: 450,
    image: '/images/menu/shashlik-rulet.png',
  }),
  item({
    slug: 'shashlik-kuskovoy-govi',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби пора-пора аз гӯшти гов',
      ru: 'Шашлык кусковой гови',
      en: 'Beef Chunk Shashlik',
    },
    description: {
      ru: 'Кусковой шашлык из говядины на мангале — сочный и сытный.',
      tg: 'Сихкабоби пора-пора аз гӯшти гов дар манқал — сероб ва серғизо.',
      en: 'Chunky beef shashlik on the mangal — juicy and filling.',
    },
    price: 30,
    sort_order: 460,
    image: '/images/menu/shashlik-kuskovoy-govi.png',
  }),
  item({
    slug: 'shashlik-qaburga',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби қабурга (Антрекот)',
      ru: 'Шашлык из антрекота (ребрышек)',
      en: 'Lamb Ribs & Entrecôte Skewer',
    },
    description: {
      ru: 'Сочные кусочки мяса на реберной косточке с хрустящей корочкой, паприкой, лучком и томатным соусом.',
      tg: 'Қабургаҳои лазизи устухондор бо адвиёти сурх ва соуси махсус дар табақи зебо.',
      en: 'Succulent bone-in chops and ribs roasted over hot coals, dusted with paprika and served with tomato dip.',
    },
    price: 40,
    sort_order: 470,
    image: '/images/menu/shashlyk-rebra-baraniny.png',
  }),
  item({
    slug: 'shashlik-dumba',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби думба',
      ru: 'Шашлык думба',
      en: 'Dumba Shashlik',
    },
    description: {
      ru: 'Шашлык думба на мангале — сытное блюдо с характерным вкусом.',
      tg: 'Сихкабоби думба дар манқал — таоми серғизо бо таъми хос.',
      en: 'Dumba shashlik on the mangal — a hearty dish with a distinctive flavour.',
    },
    price: 30,
    sort_order: 480,
    image: '/images/menu/shashlik-dumba.png',
  }),
  item({
    slug: 'shashlik-achabsan',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби Ачабсан',
      ru: 'Шашлык Ачабсан',
      en: 'Achabsan Shashlik',
    },
    description: {
      ru: 'Сочный шашлык из мясного фарша с жирной бараниной, приготовленный на мангале.',
      tg: 'Сихкабоби сероб аз гӯшти қимашуда бо гӯсфанди равғандор, дар манқал пухташуда.',
      en: 'Juicy minced-meat shashlik with fatty lamb, cooked on the mangal.',
    },
    price: 30,
    sort_order: 490,
    is_featured: true,
    image: '/images/menu/shashlik-achabsan.png',
  }),
  item({
    slug: 'shashlik-liver',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби ҷигарӣ',
      ru: 'Шашлык из печени',
      en: 'Liver Shashlik',
    },
    description: {
      ru: 'Шашлык из печени на мангале — с насыщенным вкусом.',
      tg: 'Сихкабоби ҷигар дар манқал — бо таъми пурра.',
      en: 'Liver shashlik on the mangal — with a rich flavour.',
    },
    price: 25,
    sort_order: 500,
    image: '/images/menu/shashlik-liver.png',
  }),
  item({
    slug: 'shashlik-chicken',
    category: 'shashlik',
    name: {
      tg: 'Сихкабоби мурғӣ',
      ru: 'Куриный шашлык',
      en: 'Chicken Shashlik',
    },
    description: {
      ru: 'Куриный шашлык на мангале — сочный и ароматный.',
      tg: 'Сихкабоби мурғ дар манқал — сероб ва хушбӯй.',
      en: 'Chicken shashlik on the mangal — juicy and aromatic.',
    },
    price: 23,
    sort_order: 510,
    image: '/images/menu/shashlik-chicken.png',
  }),

  // --- Нӯшокиҳо / Напитки ---
  item({
    slug: 'rc-cola',
    category: 'drinks',
    name: {
      tg: 'RC Cola',
      ru: 'RC Cola',
      en: 'RC Cola',
    },
    description: {
      ru: 'Освежающая газировка к шашлыку и горячим блюдам.',
      tg: 'Нӯшокии газдори тозабахш барои сихкабоб ва таомҳои гарм.',
      en: 'A refreshing soda to go with shashlik and hot dishes.',
    },
    variants: [
      variant('rc-cola-1l', LITER, 13),
      variant('rc-cola-1-5l', LITER_15, 15),
    ],
    sort_order: 610,
    image: '/images/menu/rc-cola.png',
  }),
  item({
    slug: 'coca-cola',
    category: 'drinks',
    name: {
      tg: 'Coca-Cola',
      ru: 'Coca-Cola',
      en: 'Coca-Cola',
    },
    description: {
      ru: 'Классическая Coca-Cola — холодное дополнение к заказу.',
      tg: 'Coca-Cola-и классикӣ — нӯшокии хунук барои фармоиш.',
      en: 'Classic Coca-Cola — a cold complement to your order.',
    },
    variants: [
      variant('coca-cola-1l', LITER, 10),
      variant('coca-cola-1-5l', LITER_15, 13),
    ],
    sort_order: 620,
    is_featured: true,
    image: '/images/menu/coca-cola.png',
  }),
  item({
    slug: 'gorilla',
    category: 'drinks',
    name: {
      tg: 'Gorilla',
      ru: 'Gorilla',
      en: 'Gorilla',
    },
    description: {
      ru: 'Энергетический напиток Gorilla — бодрый акцент к заказу.',
      tg: 'Нӯшокии энергетикии Gorilla — барои нерӯ ва тароват.',
      en: 'Gorilla energy drink — a lively addition to your order.',
    },
    price: 15,
    sort_order: 630,
    image: '/images/menu/gorilla.png',
  }),
  item({
    slug: 'mojito',
    category: 'drinks',
    name: {
      tg: 'Mojito',
      ru: 'Mojito',
      en: 'Mojito',
    },
    description: {
      ru: 'Освежающий мохито — лёгкий напиток к еде.',
      tg: 'Мохитои тозабахш — нӯшокии сабук барои хӯрок.',
      en: 'A refreshing mojito — a light drink with your meal.',
    },
    price: 10,
    sort_order: 640,
    image: '/images/menu/mojito.png',
  }),
  item({
    slug: 'dobry-juice',
    category: 'drinks',
    name: {
      tg: 'Шарбати Добрый',
      ru: 'Добрый сок',
      en: 'Dobry Juice',
    },
    description: {
      ru: 'Сок «Добрый» — сладкое освежающее дополнение к блюдам.',
      tg: 'Шарбати «Добрый» — ҳамроҳи ширин ва тозабахш ба таомҳо.',
      en: 'Dobry juice — a sweet, refreshing complement to the meal.',
    },
    price: 30,
    sort_order: 650,
    image: '/images/menu/dobry-juice.png',
  }),
  item({
    slug: 'mineral-water',
    category: 'drinks',
    name: {
      tg: 'Оби минералӣ',
      ru: 'Минеральная вода',
      en: 'Mineral Water',
    },
    description: {
      ru: 'Минеральная вода — простое освежающее дополнение к еде.',
      tg: 'Оби минералӣ — ҳамроҳи содда ва тозабахш ба хӯрок.',
      en: 'Mineral water — a simple, refreshing complement to the meal.',
    },
    variants: [
      variant('mineral-water-0-5l', LITER_05, 5),
      variant('mineral-water-1l', LITER, 10),
    ],
    sort_order: 660,
    image: '/images/menu/mineral-water.png',
  }),
]
