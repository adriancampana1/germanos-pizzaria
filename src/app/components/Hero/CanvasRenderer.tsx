"use client";

import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";

interface CanvasRendererProps {
  framesRef: React.RefObject<ImageBitmap[]>;
  frameCount: number;
}

export interface CanvasRendererHandle {
  setProgress: (progress: number) => void;
}

// Cap DPR to reduce GPU workload on mobile
function getCappedDpr(): number {
  const dpr = window.devicePixelRatio || 1;
  // On mobile (small screens), cap at 1 to avoid rendering massive canvas buffers
  if (window.innerWidth <= 768) return 1;
  return Math.min(dpr, 2);
}

const CanvasRenderer = forwardRef<CanvasRendererHandle, CanvasRendererProps>(
  function CanvasRenderer({ framesRef, frameCount }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentFrameRef = useRef(-1);
    const rafRef = useRef<number>(0);
    const pendingFrameRef = useRef<number | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const dprRef = useRef(1);

    const drawFrame = useCallback(
      (index: number) => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        const img = framesRef.current?.[index];
        if (!canvas || !ctx || !img) return;

        const dpr = dprRef.current;
        const vw = canvas.width / dpr;
        const vh = canvas.height / dpr;

        // ImageBitmap uses .width/.height, not .naturalWidth/.naturalHeight
        const iw = img.width;
        const ih = img.height;
        const scale = Math.max(vw / iw, vh / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (vw - dw) / 2;
        const dy = (vh - dh) / 2;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "#F5F5DC";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        ctx.drawImage(img, dx, dy, dw, dh);
      },
      [framesRef]
    );

    // Imperative progress setter — no React re-render
    useImperativeHandle(ref, () => ({
      setProgress(progress: number) {
        const index = Math.max(0, Math.min(Math.floor(progress * frameCount), frameCount - 1));
        if (index === currentFrameRef.current) return;
        if (!framesRef.current?.[index]) return;

        pendingFrameRef.current = index;
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0;
            const idx = pendingFrameRef.current;
            if (idx !== null && idx !== currentFrameRef.current) {
              currentFrameRef.current = idx;
              drawFrame(idx);
            }
            pendingFrameRef.current = null;
          });
        }
      },
    }), [frameCount, framesRef, drawFrame]);

    // Resize canvas — debounced to avoid excessive recalculation
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctxRef.current = ctx;

      let resizeTimer: ReturnType<typeof setTimeout>;

      function resize() {
        const dpr = getCappedDpr();
        dprRef.current = dpr;
        canvas!.width = window.innerWidth * dpr;
        canvas!.height = window.innerHeight * dpr;
        canvas!.style.width = window.innerWidth + "px";
        canvas!.style.height = window.innerHeight + "px";
        ctx!.setTransform(1, 0, 0, 1, 0, 0);
        ctx!.scale(dpr, dpr);
        if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
      }

      resize();

      function onResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
      }

      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(resizeTimer);
      };
    }, [drawFrame]);

    // Draw first frame as soon as it's available
    useEffect(() => {
      if (currentFrameRef.current >= 0) return;
      const checkFirst = setInterval(() => {
        if (framesRef.current?.[0]) {
          currentFrameRef.current = 0;
          drawFrame(0);
          clearInterval(checkFirst);
        }
      }, 50);
      return () => clearInterval(checkFirst);
    }, [framesRef, drawFrame]);

    // Cleanup pending rAF on unmount
    useEffect(() => {
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: "-1px",
          left: "-1px",
          width: "calc(100% + 2px)",
          height: "calc(100% + 2px)",
          display: "block",
        }}
      />
    );
  }
);

export default CanvasRenderer;
