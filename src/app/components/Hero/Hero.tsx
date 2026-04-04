"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasRenderer from "./CanvasRenderer";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  framesRef: React.RefObject<HTMLImageElement[]>;
  frameCount: number;
  isLoaded: boolean;
}

export default function Hero({ framesRef, frameCount, isLoaded }: HeroProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [frameProgress, setFrameProgress] = useState(0);

  useEffect(() => {
    if (!isLoaded || !outerRef.current || !contentRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setFrameProgress(self.progress);

        // Parallax: text moves up faster than scroll
        if (contentRef.current) {
          const yOffset = self.progress * -30; // vh units
          const opacity = Math.max(0, 1 - self.progress * 1.5);
          contentRef.current.style.transform = `translateY(${yOffset}vh)`;
          contentRef.current.style.opacity = String(opacity);
        }
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
          framesRef={framesRef}
          frameCount={frameCount}
          progress={frameProgress}
        />
        <div className={styles.overlay} />
        <div className={styles.content} ref={contentRef}>
          <h1 className={styles.heading}>
            Germano&apos;s<br />Pizzaria
          </h1>
          <p className={styles.tagline}>
            Pizza artesanal assada no forno a lenha, com amor e tradi&ccedil;&atilde;o desde a primeira fatia.
          </p>
          <a href="#cta" className={styles.ctaButton}>
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
