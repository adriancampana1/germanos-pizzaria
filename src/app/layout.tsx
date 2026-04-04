import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Germano's Pizzaria — Pizza Artesanal em Ibipor\u00e3, PR",
  description:
    "A melhor pizza artesanal de Ibipor\u00e3, Paran\u00e1. Forno a lenha, massa artesanal e ingredientes selecionados. Pe\u00e7a pelo WhatsApp ou iFood. Av. Senador Souza Naves, 685.",
  keywords: [
    "pizzaria Ibipor\u00e3",
    "pizza artesanal",
    "Germano's Pizzaria",
    "pizza forno a lenha",
    "delivery pizza Ibipor\u00e3",
    "pizzaria Paran\u00e1",
  ],
  openGraph: {
    title: "Germano's Pizzaria — Pizza Artesanal em Ibipor\u00e3, PR",
    description:
      "A melhor pizza artesanal de Ibipor\u00e3. Forno a lenha, massa artesanal e ingredientes selecionados.",
    type: "website",
    locale: "pt_BR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Germano's Pizzaria",
  servesCuisine: ["Pizza", "Italian"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Senador Souza Naves, 685",
    addressLocality: "Ibipor\u00e3",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  telephone: "+55-43-99999-0000",
  url: "https://germanospizzaria.com.br",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${outfit.variable}`}>
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
