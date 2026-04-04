"use client";

import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./Localizacao.module.css";

const WHATSAPP_LINK = "https://wa.me/5543999990000";
const PHONE = "(43) 99999-0000";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.5!2d-51.048!3d-23.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE2JzEyLjAiUyA1McKwMDInNTMuMCJX!5e0!3m2!1spt-BR!2sbr!4v1";

export default function Localizacao() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="localizacao" ref={sectionRef}>
      <div className={styles.inner}>
        <iframe
          className={styles.map}
          src={MAPS_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localiza\u00e7\u00e3o da Germano's Pizzaria"
          data-animate
        />
        <div className={styles.info}>
          <span className="section-label" data-animate>003 / Visite-nos</span>
          <h2 className={styles.heading} data-animate>Localiza&ccedil;&atilde;o<br />&amp; Contato</h2>

          <div className={styles.block} data-animate>
            <span className={styles.blockTitle}>Endere&ccedil;o</span>
            <span className={styles.blockText}>
              Av. Senador Souza Naves, 685<br />
              Ibipor&atilde; — PR
            </span>
          </div>

          <div className={styles.block} data-animate>
            <span className={styles.blockTitle}>Hor&aacute;rio</span>
            <span className={styles.blockText}>
              Ter&ccedil;a a Domingo — 18h &agrave;s 23h<br />
              Segunda — Fechado
            </span>
          </div>

          <div className={styles.block} data-animate>
            <span className={styles.blockTitle}>Contato</span>
            <a href="tel:+5543999990000" className={styles.blockLink}>{PHONE}</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.blockLink}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
