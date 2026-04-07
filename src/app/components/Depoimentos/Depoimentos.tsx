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

function SketchElements() {
  return (
    <div className={styles.sketchBg} aria-hidden="true">
      {/* Pizza slice - top right */}
      <svg className={`${styles.sketchEl} ${styles.sketchSlice1}`} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 5 L110 130 L10 130 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2" />
        <path d="M15 125 Q60 95 105 125" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
        <circle cx="45" cy="85" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="70" cy="95" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="55" cy="110" r="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M38 70 Q42 65 46 70" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M65 75 Q68 71 72 76" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      </svg>

      {/* Basil leaf - left middle */}
      <svg className={`${styles.sketchEl} ${styles.sketchLeaf1}`} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 95 Q10 60 25 25 Q40 5 55 25 Q70 60 40 95Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 2" />
        <path d="M40 90 Q38 55 40 20" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 3" />
        <path d="M40 50 Q28 42 22 35" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M40 65 Q52 55 58 48" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M40 40 Q50 34 56 30" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      </svg>

      {/* Olive - bottom left */}
      <svg className={`${styles.sketchEl} ${styles.sketchOlive1}`} viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="25" cy="35" rx="18" ry="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
        <ellipse cx="25" cy="35" rx="6" ry="7" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 2" />
        <path d="M25 15 Q28 8 25 2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      </svg>

      {/* Small pizza slice - bottom right */}
      <svg className={`${styles.sketchEl} ${styles.sketchSlice2}`} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 8 L92 110 L8 110 Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 3" />
        <path d="M13 105 Q50 80 87 105" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="40" cy="75" r="6" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 2" />
        <circle cx="58" cy="85" r="5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 2" />
        <path d="M48 60 Q51 56 54 60" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      </svg>

      {/* Mushroom - top left */}
      <svg className={`${styles.sketchEl} ${styles.sketchMushroom}`} viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 45 Q10 15 35 12 Q60 15 60 45 Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
        <path d="M25 45 L25 72" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
        <path d="M45 45 L45 72" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
        <path d="M22 72 L48 72" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M25 30 Q30 25 35 30" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M40 35 Q44 31 48 36" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      </svg>

      {/* Pepper/chili - right middle */}
      <svg className={`${styles.sketchEl} ${styles.sketchPepper}`} viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10 Q35 30 30 55 Q25 80 15 95" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
        <path d="M20 10 Q5 30 10 55 Q15 75 15 95" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
        <path d="M18 5 Q20 0 22 5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M15 40 Q20 38 25 42" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      </svg>

      {/* Pizza slice - center left, tilted */}
      <svg className={`${styles.sketchEl} ${styles.sketchSlice3}`} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 5 L110 130 L10 130 Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />
        <path d="M15 125 Q60 95 105 125" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2 3" />
        <circle cx="50" cy="80" r="7" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" />
        <circle cx="65" cy="100" r="6" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" />
        <circle cx="42" cy="105" r="5.5" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" />
        <path d="M55 65 Q58 61 62 66" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      </svg>

      {/* Pizza slice - top center */}
      <svg className={`${styles.sketchEl} ${styles.sketchSlice4}`} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 L95 112 L5 112 Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
        <path d="M10 107 Q50 82 90 107" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="42" cy="72" r="6" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="56" cy="88" r="5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
        <path d="M48 55 Q51 51 55 56" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      </svg>

      {/* Pizza slice - bottom center */}
      <svg className={`${styles.sketchEl} ${styles.sketchSlice5}`} viewBox="0 0 130 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65 5 L120 140 L10 140 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2" />
        <path d="M15 135 Q65 100 115 135" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
        <circle cx="50" cy="90" r="8" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="72" cy="105" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="58" cy="118" r="6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M45 75 Q49 70 53 75" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
        <path d="M70 82 Q73 78 77 83" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      </svg>

      {/* Pizza slice - far left bottom */}
      <svg className={`${styles.sketchEl} ${styles.sketchSlice6}`} viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M45 5 L85 100 L5 100 Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 3" />
        <path d="M9 96 Q45 72 81 96" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="38" cy="62" r="5.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 2" />
        <circle cx="52" cy="76" r="5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 2" />
        <path d="M42 50 Q45 46 48 51" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      </svg>

      {/* Pizza slice - right top area */}
      <svg className={`${styles.sketchEl} ${styles.sketchSlice7}`} viewBox="0 0 110 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M55 5 L102 122 L8 122 Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 2" />
        <path d="M12 118 Q55 88 98 118" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeDasharray="2 3" />
        <circle cx="45" cy="78" r="7" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" />
        <circle cx="62" cy="92" r="6" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 2" />
        <path d="M50 62 Q53 58 57 63" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
      </svg>

      {/* Small dots scattered - like cheese/seasoning */}
      <svg className={`${styles.sketchEl} ${styles.sketchDots}`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="30" r="1.5" fill="currentColor" />
        <circle cx="60" cy="15" r="1" fill="currentColor" />
        <circle cx="100" cy="45" r="1.5" fill="currentColor" />
        <circle cx="140" cy="20" r="1" fill="currentColor" />
        <circle cx="180" cy="50" r="1.5" fill="currentColor" />
        <circle cx="40" cy="80" r="1" fill="currentColor" />
        <circle cx="90" cy="100" r="1.5" fill="currentColor" />
        <circle cx="150" cy="85" r="1" fill="currentColor" />
        <circle cx="30" cy="150" r="1.5" fill="currentColor" />
        <circle cx="80" cy="170" r="1" fill="currentColor" />
        <circle cx="130" cy="155" r="1.5" fill="currentColor" />
        <circle cx="170" cy="140" r="1" fill="currentColor" />
        <circle cx="55" cy="130" r="1" fill="currentColor" />
        <circle cx="110" cy="180" r="1.5" fill="currentColor" />
        <circle cx="160" cy="190" r="1" fill="currentColor" />
      </svg>
    </div>
  );
}

export default function Depoimentos() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="depoimentos" ref={sectionRef}>
      <SketchElements />
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
