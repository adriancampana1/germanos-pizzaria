"use client";

import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./Depoimentos.module.css";

const TESTIMONIALS = [
  {
    name: "Lucas de Souza",
    text: "Pizzas deliciosas e beeem recheadas, com certeza 5 estrelas.",
    rating: 5,
    source: "Google",
  },
  {
    name: "Jo Jo",
    text: "Muito boa mesmo eu achei a melhor da cidade. Excelente",
    rating: 5,
    source: "Google",
  },
  {
    name: "Vinicius Leite",
    text: "Pizza com ótimo recheio, na medida certa, massa gostosa!! Ótima qualidade, parabéns.",
    rating: 5,
    source: "Google",
  },
];

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

export default function Depoimentos() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="depoimentos" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className="section-label" data-animate>
              004 / Depoimentos
            </span>
            <h2 className={styles.heading} data-animate>
              O Que Nossos
              <br />
              <em>Clientes Dizem</em>
            </h2>
          </div>

          <div className={styles.googleRating} data-animate>
            <div className={styles.ratingScore}>4.9</div>
            <div className={styles.ratingMeta}>
              <Stars count={5} />
              <span className={styles.ratingCount}>+40 avaliacoes</span>
              <span className={styles.ratingSource}>Google Reviews</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={styles.card} data-animate>
              <div className={styles.cardQuote}>
                <svg
                  className={styles.quoteIcon}
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className={styles.cardText}>{t.text}</p>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.cardAuthor}>
                  <div className={styles.avatar}>{t.name.charAt(0)}</div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{t.name}</span>
                    <Stars count={t.rating} />
                  </div>
                </div>
                <span className={styles.cardSource}>{t.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
