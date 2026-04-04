"use client";

import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./CtaSection.module.css";

const WHATSAPP_LINK = "https://wa.me/5543999990000?text=Ol\u00e1! Gostaria de fazer um pedido.";
const PHONE_LINK = "tel:+5543999990000";
const IFOOD_LINK = "https://www.ifood.com.br";

export default function CtaSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="cta" ref={sectionRef}>
      <div className={styles.inner}>
        <span className="section-label" data-animate>004 / Pe&ccedil;a Agora</span>
        <h2 className={styles.heading} data-animate>
          Sua Pizza<br />Est&aacute; Esperando.
        </h2>
        <p className={styles.body} data-animate>
          Pe&ccedil;a pelo WhatsApp, ligue ou acesse nosso card&aacute;pio digital.
        </p>
        <p className={styles.proof} data-animate>
          + de 10 mil pizzas entregues com amor
        </p>
        <div className={styles.buttons} data-animate>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            WhatsApp
          </a>
          <a href={PHONE_LINK} className={styles.btnSecondary}>
            Ligar Agora
          </a>
          <a
            href={IFOOD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            iFood
          </a>
        </div>
      </div>
    </section>
  );
}
