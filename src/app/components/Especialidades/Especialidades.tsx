"use client";

import Image from "next/image";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./Especialidades.module.css";

const PIZZAS = [
  {
    name: "Marguerita",
    desc: "Molho, mussarela, tomate em rodelas, manjericão fresco e orégano.",
    image: "/images/marguerita.webp",
    featured: true,
  },
  {
    name: "Bolonhesa",
    desc: "Molho, mussarela, carne moida, Parmesão, molho e orégano.",
    image: "/images/bolonhesa.webp",
  },
  {
    name: "Bacon Especial",
    desc: "Molho, mussarela, bacon, tomate, ovos, requeijão cremoso e orégano.",
    image: "/images/bacon.webp",
  },
];

const WHATSAPP_LINK =
  "https://wa.me/5543991593251?text=Olá! Vim pelo site e gostaria de fazer um pedido.";
const MENU_LINK = "https://pedido.anota.ai/loja/germanos-pizzaria-ibipora";

export default function Especialidades() {
  const sectionRef = useScrollAnimation();
  const featured = PIZZAS.find((p) => p.featured)!;
  const others = PIZZAS.filter((p) => !p.featured);

  return (
    <section className={styles.section} id="especialidades" ref={sectionRef}>
      <div className={styles.header}>
        <span className="section-label" data-animate>
          001 / Especialidades
        </span>
        <h2 className={styles.heading} data-animate>
          Nossas
          <br />
          <em>Favoritas</em>
        </h2>
      </div>

      <div className={styles.editorial}>
        {/* Featured pizza — large cinematic card */}
        <div className={styles.featured} data-animate>
          <div className={styles.featuredImage}>
            <Image
              src={featured.image}
              alt={`Pizza ${featured.name}`}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className={styles.featuredOverlay} />
          </div>
          <div className={styles.featuredInfo}>
            <span className={styles.featuredLabel}>Destaque da Casa</span>
            <h3 className={styles.featuredName}>{featured.name}</h3>
            <p className={styles.featuredDesc}>{featured.desc}</p>
            <div className={styles.featuredFooter}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.orderBtn}
              >
                Pedir Agora
              </a>
            </div>
          </div>
        </div>

        {/* Secondary pizzas — compact editorial cards */}
        <div className={styles.secondary}>
          {others.map((pizza, i) => (
            <div key={pizza.name} className={styles.card} data-animate>
              <div className={styles.cardImageWrap}>
                <Image
                  src={pizza.image}
                  alt={`Pizza ${pizza.name}`}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 30vw"
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
