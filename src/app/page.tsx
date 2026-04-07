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
