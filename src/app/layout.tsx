import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://germanospizzaria.com.br"),
  alternates: {
    canonical: "/",
  },
  title: "Germano's Pizzaria — Pizza Artesanal em Ibiporã, PR",
  description:
    "A melhor pizza artesanal de Ibiporã, Paraná. Forno a lenha, massa artesanal e ingredientes selecionados. Peça pelo WhatsApp ou iFood. Av. Senador Souza Naves, 685.",
  keywords: [
    "pizzaria Ibiporã",
    "pizza artesanal",
    "Germano's Pizzaria",
    "pizza forno a lenha",
    "delivery pizza Ibiporã",
    "pizzaria Paraná",
    "melhor pizza Ibiporã",
    "pizzaria perto de mim",
  ],
  openGraph: {
    title: "Germano's Pizzaria — Pizza Artesanal em Ibiporã, PR",
    description:
      "A melhor pizza artesanal de Ibiporã. Forno a lenha, massa artesanal e ingredientes selecionados.",
    url: "https://germanospizzaria.com.br",
    siteName: "Germano's Pizzaria",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Germano's Pizzaria — Pizza Artesanal em Ibiporã",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Germano's Pizzaria — Pizza Artesanal em Ibiporã, PR",
    description:
      "A melhor pizza artesanal de Ibiporã. Forno a lenha, massa artesanal e ingredientes selecionados.",
    images: ["/images/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Germano's Pizzaria",
  description:
    "A melhor pizza artesanal de Ibiporã, Paraná. Forno a lenha, massa artesanal e ingredientes selecionados.",
  servesCuisine: ["Pizza", "Italian"],
  image: "https://germanospizzaria.com.br/images/og-image.jpg",
  url: "https://germanospizzaria.com.br",
  telephone: "+55-43-99999-0000",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Senador Souza Naves, 685",
    addressLocality: "Ibiporã",
    addressRegion: "PR",
    postalCode: "86200-000",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.27,
    longitude: -51.048,
  },
  hasMap: "https://maps.google.com/?q=Germanos+Pizzaria+Ibipora",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "18:00",
      closes: "23:00",
    },
  ],
  menu: "https://pedido.anota.ai/loja/germanos-pizzaria-ibipora",
  acceptsReservations: "No",
  paymentAccepted: "Cash, Credit Card, Debit Card, Pix",
  currenciesAccepted: "BRL",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "40",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${outfit.variable}`}>
      <meta name="theme-color" content="#F5F5DC"></meta>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
