import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";
import { SITE } from "@/constants/site";
import { HOME_DESCRIPTION, HOME_TITLE } from "@/lib/page-metadata";
import { isPreviewDeployment } from "@/lib/site-url";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE.shortName}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE.shortName,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: SITE.shortName,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/cafe/exterior-night.png",
        width: 1298,
        height: 1212,
        alt: "Вечерний фасад кафе Чуча Бирён в Бохтаре",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/images/cafe/exterior-night.png",
        alt: "Вечерний фасад кафе Чуча Бирён в Бохтаре",
      },
    ],
  },
  robots: isPreviewDeployment()
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`dark ${dmSans.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen antialiased">
        <RestaurantJsonLd />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
