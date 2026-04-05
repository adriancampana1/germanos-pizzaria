"use client";

import useLenis from "./hooks/useLenis";
import useFramePreloader from "./hooks/useFramePreloader";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Especialidades from "./components/Especialidades/Especialidades";
import PizzasDoces from "./components/PizzasDoces/PizzasDoces";
import SobreNos from "./components/SobreNos/SobreNos";
import Depoimentos from "./components/Depoimentos/Depoimentos";
import Localizacao from "./components/Localizacao/Localizacao";
import CtaSection from "./components/CtaSection/CtaSection";
import FloatingCta from "./components/FloatingCta/FloatingCta";
import Footer from "./components/Footer/Footer";

export default function Home() {
  useLenis();
  const { framesRef, progress, isLoaded, frameCount } = useFramePreloader();

  return (
    <>
      <Loader progress={progress} isLoaded={isLoaded} />
      <Header />
      <main>
        <Hero framesRef={framesRef} frameCount={frameCount} isLoaded={isLoaded} />
        <Especialidades />
        <PizzasDoces />
        <Depoimentos />
        <SobreNos />
        <Localizacao />
        <CtaSection />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
