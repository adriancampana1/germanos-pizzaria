"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import styles from "./SobreNos.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function SobreNos() {
  const sectionRef = useScrollAnimation();
  const imageRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !parallaxImgRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(
      parallaxImgRef.current,
      { yPercent: -10 },
      { yPercent: 10, ease: "none" },
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.section} id="sobre" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.imageCol} ref={imageRef} data-animate>
          <div className={styles.imageWrapper}>
            <div className={styles.parallaxInner} ref={parallaxImgRef}>
              <Image
                src="/images/frente-pizzaria.png"
                alt="Fachada da pizzaria Germano's"
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
          <div className={styles.imageAccent} />
        </div>

        <div className={styles.content}>
          <span className="section-label" data-animate>
            002 / Nossa História
          </span>
          <h2 className={styles.heading} data-animate>
            Tradição Que Se
            <br />
            <em>Prova a Cada Fatia</em>
          </h2>
          <div className={styles.divider} data-animate />
          <p className={styles.body} data-animate>
            Desde a nossa primeira fornada, carregamos o compromisso com a
            autenticidade. Nossa massa artesanal e ingredientes criteriosamente
            selecionados transformam cada pizza em uma experiência única e
            inesquecível.
          </p>
          <p className={styles.body} data-animate>
            Somos uma pizzaria tradicional com mais de 5 anos de história — onde
            a excelência e o sabor se encontram. Venha conhecer nossa história,
            uma fatia de cada vez.
          </p>
          <div className={styles.stats} data-animate>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>
                Ingredientes Selecionados
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Anos de tradição</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
