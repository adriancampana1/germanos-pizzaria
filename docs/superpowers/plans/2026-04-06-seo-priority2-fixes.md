# SEO Priority 2 Fixes + Server/Client Component Separation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all Priority 2 SEO improvements (expanded JSON-LD, improved H1, robots.txt, sitemap.xml, canonical URL, OG image) and separate Server/Client Components so content is in the static HTML output.

**Architecture:** The site uses Next.js 16 with `output: "export"` (static site generation). Server Components run at build time and produce static HTML — perfect for SEO. The current problem is that `page.tsx` is entirely `"use client"`, meaning all text content is only available after JavaScript execution. We'll make `page.tsx` a Server Component that renders static HTML content and wraps interactive parts (Hero canvas animation, scroll animations, Lenis smooth scroll) in small Client Component wrappers. Metadata (robots, sitemap, canonical, OG) will be added using Next.js file conventions and the `Metadata` API.

**Tech Stack:** Next.js 16, React 19, TypeScript, GSAP, Lenis

---

## File Structure

### Files to Create
- `src/app/robots.txt` — static robots file (Next.js file convention)
- `src/app/sitemap.xml` — static sitemap file (Next.js file convention)
- `src/app/components/HomeClient.tsx` — client wrapper for interactive hooks and hero

### Files to Modify
- `src/app/layout.tsx` — add metadataBase, canonical, expanded OG, expanded JSON-LD
- `src/app/page.tsx` — convert to Server Component, delegate interactivity to HomeClient
- `src/app/components/Hero/Hero.tsx` — accept H1 text as prop for server-rendered fallback

### Files Unchanged
- All CSS modules, hooks, Loader, CanvasRenderer, FloatingCta — these remain `"use client"` and work as-is

---

### Task 1: Add robots.txt

**Files:**
- Create: `src/app/robots.txt`

- [ ] **Step 1: Create robots.txt**

Create file `src/app/robots.txt`:

```txt
User-Agent: *
Allow: /

Sitemap: https://germanospizzaria.com.br/sitemap.xml
```

- [ ] **Step 2: Build and verify**

Run: `cd /home/adrian-campana/Documents/projetos/trabalho/germano-pizzeria && npx next build`

Verify: `cat out/robots.txt`

Expected: The robots.txt content appears in the `out/` directory.

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.txt
git commit -m "feat: add robots.txt for search engine crawlers"
```

---

### Task 2: Add sitemap.xml

**Files:**
- Create: `src/app/sitemap.xml`

- [ ] **Step 1: Create sitemap.xml**

Create file `src/app/sitemap.xml`:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://germanospizzaria.com.br</loc>
    <lastmod>2026-04-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Build and verify**

Run: `cd /home/adrian-campana/Documents/projetos/trabalho/germano-pizzeria && npx next build`

Verify: `cat out/sitemap.xml`

Expected: The sitemap.xml content appears in the `out/` directory.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.xml
git commit -m "feat: add sitemap.xml for search engine indexing"
```

---

### Task 3: Expand metadata — canonical URL, metadataBase, improved OG

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update metadata object in layout.tsx**

In `src/app/layout.tsx`, replace the existing `metadata` export (lines 20-38) with:

```ts
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
```

- [ ] **Step 2: Build and verify**

Run: `cd /home/adrian-campana/Documents/projetos/trabalho/germano-pizzeria && npx next build`

Verify: `grep -E "canonical|og:" out/index.html | head -10`

Expected: canonical link tag and og: meta tags appear in the HTML head.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add canonical URL, metadataBase, expanded OG and Twitter cards"
```

---

### Task 4: Expand JSON-LD schema with full Restaurant data

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace jsonLd object in layout.tsx**

In `src/app/layout.tsx`, replace the existing `jsonLd` const (lines 41-56) with:

```ts
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
```

- [ ] **Step 2: Build and verify**

Run: `cd /home/adrian-campana/Documents/projetos/trabalho/germano-pizzeria && npx next build`

Verify: `grep "application/ld+json" out/index.html`

Expected: JSON-LD script tag with the expanded schema appears in HTML.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: expand JSON-LD Restaurant schema with hours, geo, rating, menu"
```

---

### Task 5: Improve H1 with target keywords

**Files:**
- Modify: `src/app/components/Hero/Hero.tsx`

- [ ] **Step 1: Update H1 in Hero component**

In `src/app/components/Hero/Hero.tsx`, replace the h1 (lines 58-62):

```tsx
<h1 className={styles.heading}>
  Germano&apos;s
  <br />
  Pizzaria
</h1>
```

With:

```tsx
<h1 className={styles.heading}>
  Germano&apos;s Pizzaria
  <br />
  <span className={styles.headingSub}>
    Pizza Artesanal em Ibipor&atilde;
  </span>
</h1>
```

- [ ] **Step 2: Add .headingSub style**

Check existing Hero.module.css and add a `.headingSub` class. Read the file first to determine exact styling pattern, then add a class that uses a slightly smaller font size (around 60-70% of the h1 size) to differentiate the subtitle line while keeping it within the H1 for SEO value.

- [ ] **Step 3: Build and verify**

Run: `cd /home/adrian-campana/Documents/projetos/trabalho/germano-pizzeria && npx next build`

Verify: `grep -i "h1" out/index.html` should show the keyword-rich H1.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/Hero/Hero.tsx src/app/components/Hero/Hero.module.css
git commit -m "feat: improve H1 with target keywords (pizza artesanal, Ibiporã)"
```

---

### Task 6: Create placeholder OG image

**Files:**
- Create: `public/images/og-image.jpg`

- [ ] **Step 1: Create OG image placeholder**

Since we can't generate a designed 1200x630 image programmatically, create a temporary placeholder. Use ImageMagick if available, otherwise note that the user needs to provide a real OG image.

Run: `convert -size 1200x630 xc:'#1a1a1a' -fill '#F5F5DC' -gravity center -pointsize 60 -annotate 0 "Germano's Pizzaria\nPizza Artesanal em Ibiporã" /home/adrian-campana/Documents/projetos/trabalho/germano-pizzeria/public/images/og-image.jpg`

If ImageMagick is not available, skip image generation and just note the OG image path is referenced in metadata. The user will need to provide a real 1200x630 image at `public/images/og-image.jpg`.

- [ ] **Step 2: Commit**

```bash
git add public/images/og-image.jpg
git commit -m "feat: add OG image placeholder for social sharing"
```

---

### Task 7: Separate Server and Client Components

This is the most complex task. The goal is to make `page.tsx` a Server Component so all text content (headings, paragraphs, alt texts, section labels) is in the static HTML. Interactive behavior (GSAP animations, Lenis scroll, frame preloading) is delegated to a Client Component wrapper.

**Files:**
- Create: `src/app/components/HomeClient.tsx` — client-only wrapper for hooks + Hero
- Modify: `src/app/page.tsx` — remove `"use client"`, import HomeClient and static sections

**Key architectural decision:** Components that use `useScrollAnimation` (Especialidades, PizzasDoces, Depoimentos, SobreNos, Localizacao, CtaSection) are currently `"use client"` because they call a custom hook. However, their HTML content is what matters for SEO. The approach:

1. `page.tsx` becomes a Server Component
2. A new `HomeClient` component wraps all the interactive pieces (Lenis, frame preloader, Hero, Loader, FloatingCta)
3. The section components (Especialidades, PizzasDoces, etc.) keep `"use client"` because they use `useScrollAnimation` hook — they're imported by the server page but automatically become client boundaries. Their HTML content IS still rendered in the static export because `output: "export"` prerenders everything at build time.

The critical win here is that `page.tsx` being a Server Component means its `metadata` export (if we move it here later) and the static HTML structure are generated without JS. With `output: "export"`, even client components are prerendered, but having a Server Component page is the correct pattern and ensures the HTML structure is SEO-optimized.

- [ ] **Step 1: Create HomeClient.tsx**

Create `src/app/components/HomeClient.tsx`:

```tsx
"use client";

import useLenis from "../hooks/useLenis";
import useFramePreloader from "../hooks/useFramePreloader";
import Loader from "./Loader/Loader";
import Hero from "./Hero/Hero";
import FloatingCta from "./FloatingCta/FloatingCta";

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  const { framesRef, progress, isLoaded, frameCount } = useFramePreloader();

  return (
    <>
      <Loader progress={progress} isLoaded={isLoaded} />
      <Hero framesRef={framesRef} frameCount={frameCount} isLoaded={isLoaded} />
      {children}
      <FloatingCta />
    </>
  );
}
```

- [ ] **Step 2: Convert page.tsx to Server Component**

Replace entire `src/app/page.tsx` with:

```tsx
import Header from "./components/Header/Header";
import HomeClient from "./components/HomeClient";
import Especialidades from "./components/Especialidades/Especialidades";
import PizzasDoces from "./components/PizzasDoces/PizzasDoces";
import SobreNos from "./components/SobreNos/SobreNos";
import Depoimentos from "./components/Depoimentos/Depoimentos";
import Localizacao from "./components/Localizacao/Localizacao";
import CtaSection from "./components/CtaSection/CtaSection";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeClient>
          <Especialidades />
          <PizzasDoces />
          <Depoimentos />
          <SobreNos />
          <Localizacao />
          <CtaSection />
        </HomeClient>
      </main>
      <Footer />
    </>
  );
}
```

Note: `"use client"` is removed. The page is now a Server Component. All imported client components (Header, HomeClient, section components) create client boundaries — this is correct and expected. With `output: "export"`, they are all prerendered to static HTML at build time.

- [ ] **Step 3: Build and verify**

Run: `cd /home/adrian-campana/Documents/projetos/trabalho/germano-pizzeria && npx next build`

Expected: Build succeeds without errors.

Verify content is in HTML: `grep "Especialidades" out/index.html && grep "Marguerita" out/index.html && grep "Germano" out/index.html`

Expected: All text content appears in the static HTML.

- [ ] **Step 4: Verify site works in browser**

Run: `cd /home/adrian-campana/Documents/projetos/trabalho/germano-pizzeria && npx serve out -l 3333` (or just open the built `out/index.html`)

Verify: The page loads correctly with all sections, animations, and scroll behavior working as before.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/components/HomeClient.tsx
git commit -m "refactor: separate Server/Client Components for better SEO HTML output"
```

---

## Verification Checklist

After all tasks are complete:

- [ ] `out/robots.txt` exists with correct content
- [ ] `out/sitemap.xml` exists with correct content
- [ ] `out/index.html` contains canonical link tag
- [ ] `out/index.html` contains og:image, og:url, og:site_name meta tags
- [ ] `out/index.html` contains twitter:card meta tags
- [ ] `out/index.html` contains expanded JSON-LD with openingHoursSpecification, geo, aggregateRating
- [ ] `out/index.html` H1 contains "Pizza Artesanal" and "Ibiporã"
- [ ] `out/index.html` contains all section text content (Especialidades, Marguerita, etc.)
- [ ] Site loads and works correctly (scroll animations, hero, navigation)
