import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const META: Record<string, { title: string; description: string; lang: string }> = {
  en: {
    title: "Dev Portfolio | Fullstack Developer",
    description: "I create modern websites and powerful custom scripts that save you time and money.",
    lang: "en",
  },
  de: {
    title: "Dev Portfolio | Fullstack-Entwickler",
    description: "Ich erstelle moderne Websites und leistungsstarke Skripte, die Ihnen Zeit und Geld sparen.",
    lang: "de",
  },
  ka: {
    title: "Dev Portfolio | Fullstack დეველოპერი",
    description: "ვქმნი თანამედროვე ვებსაიტებს და მძლავრ სკრიპტებს, რომლებიც დაზოგავს თქვენს დროსა და ფულს.",
    lang: "ka",
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.en;
  const base = "https://yourportfolio.dev";

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        "en": `${base}/en`,
        "de": `${base}/de`,
        "ka": `${base}/ka`,
        "x-default": `${base}/en`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: meta.lang,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="scanline-wrapper grid-bg min-h-screen">
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
