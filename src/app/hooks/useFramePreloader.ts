"use client";

import { useState, useRef, useEffect } from "react";

const DESKTOP_FRAME_COUNT = 61;
const MOBILE_FRAME_COUNT = 31;
const MOBILE_BREAKPOINT = 768;

const DESKTOP_PATH = "/frames/frame_";
const MOBILE_PATH = "/frames/xs/frame_";
const FRAME_EXT = ".webp";

function getFrameConfig() {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT;
  return {
    frameCount: isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT,
    framePath: isMobile ? MOBILE_PATH : DESKTOP_PATH,
  };
}

function frameSrc(path: string, index: number): string {
  return path + String(index + 1).padStart(4, "0") + FRAME_EXT;
}

export default function useFramePreloader() {
  const [config] = useState(getFrameConfig);
  const framesRef = useRef<ImageBitmap[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadedCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const { frameCount, framePath } = config;

    function loadImage(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = async () => {
          try {
            const bitmap = await createImageBitmap(img);
            framesRef.current[index] = bitmap;
          } catch {
            framesRef.current[index] = img as unknown as ImageBitmap;
          }
          loadedCountRef.current++;
          if (!cancelled) {
            setProgress(
              Math.round((loadedCountRef.current / frameCount) * 100),
            );
          }
          resolve();
        };
        img.onerror = () => {
          loadedCountRef.current++;
          resolve();
        };
        img.src = frameSrc(framePath, index);
      });
    }

    async function preload() {
      const phase1: Promise<void>[] = [];
      for (let i = 0; i < Math.min(10, frameCount); i++) {
        phase1.push(loadImage(i));
      }
      await Promise.all(phase1);
      if (cancelled) return;

      const batchSize = 10;
      for (let start = 10; start < frameCount; start += batchSize) {
        const batch: Promise<void>[] = [];
        for (let i = start; i < Math.min(start + batchSize, frameCount); i++) {
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
    return () => {
      cancelled = true;
    };
  }, [config]);

  return { framesRef, progress, isLoaded, frameCount: config.frameCount };
}
