"use client";

import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./Localizacao.module.css";

const WHATSAPP_LINK =
  "https://wa.me/5543991593251?text=Olá! Vim pelo site e gostaria de fazer um pedido.";
const PHONE = "(43) 99159-3251";
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.5!2d-51.048!3d-23.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE2JzEyLjAiUyA1McKwMDInNTMuMCJX!5e0!3m2!1spt-BR!2sbr!4v1";

export default function Localizacao() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="localizacao" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.mapWrapper} data-animate>
          <iframe
            className={styles.map}
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Germano's Pizzaria"
          />
        </div>
        <div className={styles.info}>
          <span className="section-label" data-animate>
            006 / Visite-nos
          </span>
          <h2 className={styles.heading} data-animate>
            Localização
            <br />
            <em>&amp; Contato</em>
          </h2>

          <div className={styles.divider} data-animate />

          <div className={styles.block} data-animate>
            <span className={styles.blockTitle}>Endereço</span>
            <span className={styles.blockText}>
              Av. Senador Souza Naves, 685
              <br />
              Ibiporã — PR
            </span>
          </div>

          <div className={styles.block} data-animate>
            <span className={styles.blockTitle}>Horário</span>
            <span className={styles.blockText}>
              Segunda a Sábado — 18h às 23h
              <br />
              Domingo — Fechado
            </span>
          </div>

          <div className={styles.block} data-animate>
            <span className={styles.blockTitle}>Contato</span>
            <a href="tel:+5543999990000" className={styles.blockLink}>
              {PHONE}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.blockLink}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
