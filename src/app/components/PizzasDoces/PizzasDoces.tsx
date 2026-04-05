"use client";

import Image from "next/image";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./PizzasDoces.module.css";

const DOCES = [
  {
    name: "Confeti",
    desc: "Creme de leite, mussarela, chocolate ao leite e confeti",
    price: "R$ 44,90",
    image: "/images/confeti.png",
  },
  {
    name: "Dois amores",
    desc: "Chocolate ao leite, chocolate branco e morango",
    price: "R$ 42,90",
    image: "/images/dois-amores.png",
  },
  {
    name: "Ouro Branco",
    desc: "Creme de leite, mussarela, chocolate ao leite, chocolate branco, bombom ouro branco",
    price: "R$ 46,90",
    image: "/images/ouro-branco.png",
  },
];

const WHATSAPP_LINK =
  "https://wa.me/5543999990000?text=Olá! Gostaria de fazer um pedido.";
const MENU_LINK = "https://pedido.anota.ai/loja/germanos-pizzaria-ibipora";

export default function PizzasDoces() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="pizzas-doces" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className="section-label" data-animate>
            002 / Pizzas Doces
          </span>
          <h2 className={styles.heading} data-animate>
            Para Adoçar
            <br />
            <em>Sua Noite</em>
          </h2>
          <p className={styles.subtitle} data-animate>
            Finalize a experiência com nossas pizzas doces artesanais — a
            sobremesa perfeita direto do forno.
          </p>
        </div>

        <div className={styles.grid}>
          {DOCES.map((pizza) => (
            <div key={pizza.name} className={styles.card} data-animate>
              <div className={styles.cardImageWrap}>
                <Image
                  src={pizza.image}
                  alt={`Pizza ${pizza.name}`}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className={styles.cardOverlay}>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardOrderBtn}
                  >
                    Pedir
                  </a>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <h3 className={styles.cardName}>{pizza.name}</h3>
                  <span className={styles.cardPrice}>{pizza.price}</span>
                </div>
                <p className={styles.cardDesc}>{pizza.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Full menu CTA */}
      <div className={styles.menuCta} data-animate>
        <div className={styles.menuCtaDivider} />
        <p className={styles.menuCtaText}>Quer ver todas as opções?</p>
        <a
          href={MENU_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.menuCtaLink}
        >
          Ver cardápio completo
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10H16M16 10L11 5M16 10L11 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
