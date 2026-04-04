import styles from "./Footer.module.css";

const WHATSAPP_LINK = "https://wa.me/5543999990000";
const PHONE_LINK = "tel:+5543999990000";
const IFOOD_LINK = "https://www.ifood.com.br";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.brand}>Germano&apos;s</div>
          <p className={styles.footerText}>
            Av. Senador Souza Naves, 685<br />
            Ibipor&atilde; — PR<br />
            Ter&ccedil;a a Domingo — 18h &agrave;s 23h
          </p>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Pe&ccedil;a Agora</span>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            WhatsApp
          </a>
          <a href={PHONE_LINK} className={styles.footerLink}>
            (43) 99999-0000
          </a>
          <a href={IFOOD_LINK} target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
            iFood
          </a>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Redes Sociais</span>
          <a href="#" className={styles.footerLink}>Instagram</a>
          <a href="#" className={styles.footerLink}>Facebook</a>
        </div>
      </div>

      <div className={styles.copyright}>
        &copy; 2026 Germano&apos;s Pizzaria. Todos os direitos reservados.
      </div>
    </footer>
  );
}
