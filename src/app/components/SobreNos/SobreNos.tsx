"use client";

import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./SobreNos.module.css";

export default function SobreNos() {
  const sectionRef = useScrollAnimation();

  return (
    <section className={styles.section} id="sobre" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.imagePlaceholder} data-animate aria-label="Foto da pizzaria Germano's" />
        <div className={styles.content}>
          <span className="section-label" data-animate>002 / Nossa Hist&oacute;ria</span>
          <h2 className={styles.heading} data-animate>
            Tradi&ccedil;&atilde;o Que Se<br />Prova a Cada Fatia
          </h2>
          <p className={styles.body} data-animate>
            Desde a primeira fornada, a fam&iacute;lia Germano carrega o compromisso com a autenticidade.
            Massa artesanal, ingredientes selecionados e o calor do forno a lenha transformam cada
            pizza em uma experi&ecirc;ncia &uacute;nica.
          </p>
          <p className={styles.body} data-animate>
            Nosso forno de pedra &eacute; o cora&ccedil;&atilde;o da casa — onde a tradi&ccedil;&atilde;o italiana encontra o sabor
            paranaense. Venha conhecer nossa hist&oacute;ria, uma fatia de cada vez.
          </p>
        </div>
      </div>
    </section>
  );
}
