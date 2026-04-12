"use client";

import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./PizzasDoces.module.css";

function buildSrcSet(src: string) {
  const base = src.replace(/\.webp$/, "");
  return `${base}-sm.webp 1200w, ${src} 2048w`;
}

const IMG_FILL_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

const DOCES = [
  {
    name: "Confeti",
    desc: "Creme de leite, mussarela, chocolate ao leite e confeti",
    image: "/images/confeti.webp",
  },
  {
    name: "Dois amores",
    desc: "Chocolate ao leite, chocolate branco e morango",
    image: "/images/dois-amores.webp",
  },
  {
    name: "Ouro Branco",
    desc: "Creme de leite, mussarela, chocolate ao leite, chocolate branco, bombom ouro branco",
    image: "/images/ouro-branco.webp",
  },
];

const WHATSAPP_LINK =
  "https://wa.me/5543991593251?text=Olá! Vim pelo site e gostaria de fazer um pedido.";
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
                <img
                  src={pizza.image.replace(/\.webp$/, "-sm.webp")}
                  srcSet={buildSrcSet(pizza.image)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={`Pizza ${pizza.name}`}
                  className={styles.image}
                  loading="lazy"
                  decoding="async"
                  style={IMG_FILL_STYLE}
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
