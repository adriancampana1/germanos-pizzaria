import styles from "./Footer.module.css";

const WHATSAPP_LINK = "https://wa.me/5543999990000";
const PHONE_LINK = "tel:+5543999990000";
const IFOOD_LINK = "https://www.ifood.com.br";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <div className={styles.brand}>Germano&apos;s</div>
          <p className={styles.brandTagline}>
            Ingredientes de alta qualidade,
            <br />
            cuidado e paixão desde a primeira fatia.
          </p>
        </div>

        <div className={styles.columns}>
          <div className={styles.column}>
            <span className={styles.columnTitle}>Visite-nos</span>
            <p className={styles.columnText}>
              Av. Senador Souza Naves, 685
              <br />
              Ibiporã — PR
            </p>
            <p className={styles.columnText}>
              Segunda a Sábado
              <br />
              18:00 — 23:00
            </p>
          </div>

          <div className={styles.column}>
            <span className={styles.columnTitle}>Peça Agora</span>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              WhatsApp
            </a>
            <a href={PHONE_LINK} className={styles.footerLink}>
              (43) 99999-0000
            </a>
            <a
              href={IFOOD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              iFood / Menu Digital
            </a>
          </div>

          <div className={styles.column}>
            <span className={styles.columnTitle}>Redes Sociais</span>
            <a href="#" className={styles.footerLink}>
              Instagram
            </a>
            <a href="#" className={styles.footerLink}>
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.copyright}>
            &copy; 2026 Germano&apos;s Pizzaria
          </span>
          <span className={styles.copyright}>
            Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
