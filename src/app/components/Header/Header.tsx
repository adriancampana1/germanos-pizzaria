"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Header.module.css";
import { MENU_LINK } from "../../constants";

const NAV_LINKS = [
  { href: "#especialidades", label: "Especialidades" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#localizacao", label: "Localização" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLAnchorElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 100);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build GSAP timeline for menu animation
  useEffect(() => {
    if (!menuRef.current) return;

    const links = menuRef.current.querySelectorAll("a");

    tlRef.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        clipPath: "inset(0 0 0 0)",
        duration: 0.5,
        ease: "power3.inOut",
      })
      .from(links, {
        y: 60,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.15");

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      tlRef.current?.play();
      document.body.style.overflow = "hidden";
    } else {
      tlRef.current?.reverse();
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
      >
        <Image
          src="/images/germanos.webp"
          alt="Germano's Pizzaria"
          width={240}
          height={239}
          className={styles.logo}
          priority
          fetchPriority="high"
        />
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
          <a
            href={MENU_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navCta}
          >
            Peça Agora
          </a>
        </nav>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={styles.mobileMenu} ref={menuRef}>
        <div className={styles.mobileMenuInner}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMenu}
            >
              <span className={styles.mobileLinkNumber}>0{i + 1}</span>
              {link.label}
            </a>
          ))}
          <a
            href={MENU_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileCta}
            onClick={closeMenu}
          >
            Peça Agora
          </a>
        </div>
      </div>
    </>
  );
}
