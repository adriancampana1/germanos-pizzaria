"use client";

import { useState, useEffect } from "react";
import styles from "./FloatingCta.module.css";

const WHATSAPP_LINK = "https://wa.me/5543999990000?text=Ol\u00e1! Gostaria de fazer um pedido.";

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past the hero (roughly 300vh worth of scroll)
      const heroHeight = window.innerHeight * 3;
      setVisible(window.scrollY > heroHeight);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.floatingDesktop} ${!visible ? styles.hidden : ""}`}
        aria-label="Pedir pelo WhatsApp"
      >
        Pedir pelo WhatsApp
      </a>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.floatingMobile} ${!visible ? styles.hidden : ""}`}
        aria-label="Pedir pelo WhatsApp"
      >
        Pedir pelo WhatsApp
      </a>
    </>
  );
}
