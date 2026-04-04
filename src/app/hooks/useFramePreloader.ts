"use client";

import { useState, useRef, useEffect } from "react";

const FRAME_COUNT = 192;
const FRAME_PATH = "/frames/frame_";
const FRAME_EXT = ".webp";

function frameSrc(index: number): string {
  return FRAME_PATH + String(index + 1).padStart(4, "0") + FRAME_EXT;
}

export default function useFramePreloader() {
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadedCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    function loadImage(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          framesRef.current[index] = img;
          loadedCountRef.current++;
          if (!cancelled) {
            setProgress(Math.round((loadedCountRef.current / FRAME_COUNT) * 100));
          }
          resolve();
        };
        img.onerror = () => {
          loadedCountRef.current++;
          resolve();
        };
        img.src = frameSrc(index);
      });
    }

    async function preload() {
      // Phase 1: first 10 frames for fast first paint
      const phase1: Promise<void>[] = [];
      for (let i = 0; i < Math.min(10, FRAME_COUNT); i++) {
        phase1.push(loadImage(i));
      }
      await Promise.all(phase1);
      if (cancelled) return;

      // Phase 2: remaining frames in batches of 20
      const batchSize = 20;
      for (let start = 10; start < FRAME_COUNT; start += batchSize) {
        const batch: Promise<void>[] = [];
        for (let i = start; i < Math.min(start + batchSize, FRAME_COUNT); i++) {
          batch.push(loadImage(i));
        }
        await Promise.all(batch);
        if (cancelled) return;
      }

      if (!cancelled) {
        setIsLoaded(true);
      }
    }

    preload();
    return () => { cancelled = true; };
  }, []);

  return { framesRef, progress, isLoaded, frameCount: FRAME_COUNT };
}
