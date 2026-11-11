"use client";

import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { FRAME_COUNT, loadFrameSequence, type Frame } from "./frameSequence";
import styles from "./Hero.module.css";

export interface CanvasRendererHandle {
  /** 0..1 position in the frame sequence. Cheap to call on every tick. */
  setProgress: (progress: number) => void;
}

// The source frames are 1280px wide; a bigger backing store only adds fill cost.
const MAX_BACKING_WIDTH = 1920;

function nearestLoaded(frames: (Frame | undefined)[], target: number): number {
  for (let d = 0; d < FRAME_COUNT; d++) {
    if (frames[target - d]) return target - d;
    if (frames[target + d]) return target + d;
  }
  return -1;
}

const CanvasRenderer = forwardRef<CanvasRendererHandle>(
  function CanvasRenderer(_props, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const apiRef = useRef<CanvasRendererHandle>({ setProgress: () => {} });

    useImperativeHandle(
      ref,
      () => ({ setProgress: (p) => apiRef.current.setProgress(p) }),
      [],
    );

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d", { alpha: false });
      if (!canvas || !ctx) return;

      const frames: (Frame | undefined)[] = [];
      let target = 0;
      let drawn = -1;
      let raf = 0;

      function draw() {
        raf = 0;
        const index = nearestLoaded(frames, target);
        if (index < 0 || index === drawn) return;
        const img = frames[index]!;
        const iw = "naturalWidth" in img ? img.naturalWidth : img.width;
        const ih = "naturalHeight" in img ? img.naturalHeight : img.height;
        const scale = Math.max(canvas!.width / iw, canvas!.height / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        ctx!.drawImage(
          img,
          (canvas!.width - dw) / 2,
          (canvas!.height - dh) / 2,
          dw,
          dh,
        );
        if (drawn < 0) canvas!.dataset.ready = "true";
        drawn = index;
      }

      function schedule() {
        if (!raf) raf = requestAnimationFrame(draw);
      }

      function resize() {
        const cssW = canvas!.clientWidth;
        const cssH = canvas!.clientHeight;
        if (!cssW || !cssH) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const ratio = Math.min(dpr, MAX_BACKING_WIDTH / cssW);
        const w = Math.round(cssW * ratio);
        const h = Math.round(cssH * ratio);
        if (canvas!.width === w && canvas!.height === h) return;
        canvas!.width = w;
        canvas!.height = h;
        ctx!.imageSmoothingEnabled = true;
        ctx!.imageSmoothingQuality = "high";
        drawn = -1;
        draw();
      }

      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      resize();

      apiRef.current = {
        setProgress(progress) {
          const index = Math.max(
            0,
            Math.min(Math.round(progress * (FRAME_COUNT - 1)), FRAME_COUNT - 1),
          );
          if (index === target) return;
          target = index;
          schedule();
        },
      };

      const cancelLoading = loadFrameSequence(frames, schedule);

      return () => {
        observer.disconnect();
        if (raf) cancelAnimationFrame(raf);
        apiRef.current = { setProgress: () => {} };
        cancelLoading();
      };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} aria-hidden />;
  },
);

export default CanvasRenderer;
