"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasRenderer, { type CanvasRendererHandle } from "./CanvasRenderer";
import HeroVideo from "./HeroVideo";
import useHeroMode from "./useHeroMode";
import styles from "./Hero.module.css";
import { MENU_LINK } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function Hero() {
  const mode = useHeroMode();
  const outerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<CanvasRendererHandle>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    const indicator = indicatorRef.current;
    if (!outer || !content || !overlay || !indicator) return;
    if (mode !== "scrub" && mode !== "video") return;

    const setContentY = gsap.quickSetter(content, "y", "px") as (v: number) => void;
    const setContentOpacity = gsap.quickSetter(content, "opacity") as (v: number) => void;
    const setOverlayOpacity = gsap.quickSetter(overlay, "opacity") as (v: number) => void;
    const setIndicatorOpacity = gsap.quickSetter(indicator, "opacity") as (v: number) => void;

    const state = { p: 0 };
    let tween: gsap.core.Tween;

    if (mode === "scrub") {
      // Pinned (sticky) hero: scroll drives the frame sequence. The copy and
      // the dark overlay clear out early so the pizza is seen in full colour.
      tween = gsap.to(state, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          // Smoothed: frames ease towards the scroll position instead of
          // jumping with every wheel notch.
          scrub: 0.6,
        },
        onUpdate() {
          const p = state.p;
          canvasRef.current?.setProgress(clamp01(p / 0.9));
          const out = clamp01((p - 0.04) / 0.3);
          setContentY(out * -60);
          setContentOpacity(1 - out);
          setOverlayOpacity(1 - out);
          setIndicatorOpacity(1 - clamp01(p / 0.08));
        },
      });
    } else {
      // Video hero scrolls away normally; the copy just drifts and fades.
      tween = gsap.to(state, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        onUpdate() {
          const p = state.p;
          setContentY(p * -80);
          setContentOpacity(1 - clamp01(p * 1.6));
          setIndicatorOpacity(1 - clamp01(p * 6));
        },
      });
    }

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set([content, overlay, indicator], { clearProps: "transform,opacity" });
    };
  }, [mode]);

  return (
    <section className={styles.heroOuter} ref={outerRef} id="hero">
      <div className={styles.heroSticky}>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/video/hero-mobile-poster.webp"
          />
          <img
            className={styles.poster}
            src="/frames/frame_0001.webp"
            alt="Pizza artesanal de pepperoni com manjericão da Germano's Pizzaria"
            fetchPriority="high"
            decoding="sync"
          />
        </picture>
        {mode === "scrub" && <CanvasRenderer ref={canvasRef} />}
        {mode === "video" && <HeroVideo />}
        <div className={styles.overlay} ref={overlayRef} />
        <div className={styles.content} ref={contentRef}>
          <h1 className={styles.heading}>
            Germano&apos;s Pizzaria
            <span className={styles.headingSub}>
              Pizza Artesanal em Ibipor&atilde;
            </span>
          </h1>
          <p className={styles.tagline}>
            Ingredientes de alta qualidade, preparados com cuidado e
            paix&atilde;o desde a primeira fatia.
          </p>
          <a
            href={MENU_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Pe&ccedil;a Agora
          </a>
        </div>
        <div className={styles.scrollIndicator} ref={indicatorRef}>
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
