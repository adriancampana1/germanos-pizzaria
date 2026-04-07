"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasRenderer from "./CanvasRenderer";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  framesRef: React.RefObject<ImageBitmap[]>;
  frameCount: number;
  isLoaded: boolean;
}

export default function Hero({ framesRef, frameCount, isLoaded }: HeroProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const canvasRendererRef = useRef<{ setProgress: (p: number) => void }>(null);

  useEffect(() => {
    if (!isLoaded || !outerRef.current || !contentRef.current) return;

    const contentEl = contentRef.current;

    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        canvasRendererRef.current?.setProgress(self.progress);

        // Parallax: text moves up faster than scroll
        const yOffset = self.progress * -30;
        const opacity = Math.max(0, 1 - self.progress * 1.5);
        contentEl.style.transform = `translateY(${yOffset}vh)`;
        contentEl.style.opacity = String(opacity);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isLoaded]);

  return (
    <section className={styles.heroOuter} ref={outerRef} id="hero">
      <div className={styles.heroSticky}>
        <CanvasRenderer
          ref={canvasRendererRef}
          framesRef={framesRef}
          frameCount={frameCount}
        />
        <div className={styles.overlay} />
        <div className={styles.content} ref={contentRef}>
          <h1 className={styles.heading}>
            Germano&apos;s Pizzaria
            <br />
            <span className={styles.headingSub}>
              Pizza Artesanal em Ibiporã
            </span>
          </h1>
          <p className={styles.tagline}>
            Ingredientes de alta qualidade, preparados com cuidado e
            paix&atilde;o desde a primeira fatia.
          </p>
          <a
            href="https://pedido.anota.ai/loja/germanos-pizzaria-ibipora"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Pe&ccedil;a Agora
          </a>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Role para explorar</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4L10 16M10 16L4 10M10 16L16 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
