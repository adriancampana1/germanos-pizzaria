"use client";

import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./CtaSection.module.css";

const WHATSAPP_LINK =
  "https://wa.me/5543999990000?text=Olá! Gostaria de fazer um pedido.";
const PHONE_LINK = "tel:+5543999990000";
const MENU_LINK = "https://pedido.anota.ai/loja/germanos-pizzaria-ibipora";

export default function CtaSection() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="cta" ref={sectionRef}>
      <div className={styles.bg} />
      <div className={styles.inner}>
        <span className={styles.label} data-animate>
          006 / Peça Agora
        </span>
        <h2 className={styles.heading} data-animate>
          Sua Pizza
          <br />
          <em>Está Esperando.</em>
        </h2>

        <div className={styles.paths} data-animate>
          {/* Path 1: Direct order */}
          <div className={styles.pathCard}>
            <span className={styles.pathLabel}>Faça seu pedido</span>
            <p className={styles.pathDesc}>
              Ligue ou mande mensagem — a gente cuida do resto.
            </p>
            <div className={styles.pathButtons}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.126 1.528 5.862L.06 23.574a.5.5 0 00.612.612l5.712-1.468A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.81-.546-5.382-1.492l-.386-.23-3.384.87.87-3.384-.23-.386A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
              <a href={PHONE_LINK} className={styles.btnOutline}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                (43) 99999-0000
              </a>
            </div>
          </div>

          <div className={styles.pathDivider}>
            <span>ou</span>
          </div>

          {/* Path 2: Browse menu */}
          <div className={styles.pathCard}>
            <span className={styles.pathLabel}>Explore o cardápio</span>
            <p className={styles.pathDesc}>
              Veja todas as opções, monte seu pedido e peça online.
            </p>
            <div className={styles.pathButtons}>
              <a
                href={MENU_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondary}
              >
                Ver Menu Digital
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
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
          </div>
        </div>

        <div className={styles.payment} data-animate>
          <span className={styles.paymentLabel}>Formas de pagamento</span>
          <div className={styles.paymentMethods}>
            <span className={styles.paymentBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h20v13a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" />
                <path d="M16 3l-4 4-4-4" />
                <path d="M12 7V3" />
              </svg>
              Pix
            </span>
            <span className={styles.paymentBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Cr&eacute;dito
            </span>
            <span className={styles.paymentBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              D&eacute;bito
            </span>
            <span className={styles.paymentBadge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
              Dinheiro
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
