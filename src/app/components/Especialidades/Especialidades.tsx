"use client";

import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./Especialidades.module.css";

const PIZZAS = [
  {
    name: "Margherita",
    desc: "Molho San Marzano, fior di latte, manjeric\u00e3o fresco e azeite extra virgem.",
    price: "R$ 49,90",
  },
  {
    name: "Diavola",
    desc: "Salame picante calabr\u00eas, molho de tomate, mussarela e pimenta.",
    price: "R$ 54,90",
  },
  {
    name: "Quattro Formaggi",
    desc: "Mussarela, gorgonzola, parmes\u00e3o e provolone com mel trufado.",
    price: "R$ 59,90",
  },
];

const WHATSAPP_LINK = "https://wa.me/5543999990000?text=Ol\u00e1! Gostaria de fazer um pedido.";

export default function Especialidades() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="especialidades" ref={sectionRef}>
      <span className="section-label" data-animate>001 / Especialidades</span>
      <h2 className={styles.heading} data-animate>Nossas Favoritas</h2>
      <div className={styles.grid}>
        {PIZZAS.map((pizza) => (
          <div key={pizza.name} className={styles.card} data-animate>
            <div className={styles.cardImage} aria-label={`Foto da pizza ${pizza.name}`} />
            <div className={styles.cardBody}>
              <h3 className={styles.cardName}>{pizza.name}</h3>
              <p className={styles.cardDesc}>{pizza.desc}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardPrice}>{pizza.price}</span>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardCta}
                >
                  Pedir
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
