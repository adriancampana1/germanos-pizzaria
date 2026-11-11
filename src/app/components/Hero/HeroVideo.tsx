"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export const HERO_VIDEO_SRC = "/video/hero-mobile.mp4";

/**
 * Portrait clip of the slice being lifted. Plays once and rests on its last
 * frame. Stays invisible until it is actually playing, so when autoplay is
 * blocked (e.g. low power mode) the poster underneath simply remains.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reveal = () => {
      video.dataset.ready = "true";
    };
    video.addEventListener("playing", reveal, { once: true });
    // React does not reliably reflect `muted` as an attribute; autoplay needs it.
    video.muted = true;
    video.play().catch(() => {});
    return () => video.removeEventListener("playing", reveal);
  }, []);

  return (
    <video
      ref={ref}
      className={styles.video}
      src={HERO_VIDEO_SRC}
      muted
      playsInline
      autoPlay
      preload="auto"
      disablePictureInPicture
      aria-hidden
      tabIndex={-1}
    />
  );
}
