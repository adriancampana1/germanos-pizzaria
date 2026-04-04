"use client";

import { useRef, useEffect, useCallback } from "react";

interface CanvasRendererProps {
  framesRef: React.RefObject<HTMLImageElement[]>;
  frameCount: number;
  progress: number;
}

export default function CanvasRenderer({ framesRef, frameCount, progress }: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(-1);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current?.[index];
      if (!canvas || !ctx || !img) return;

      const dpr = window.devicePixelRatio || 1;
      const vw = canvas.width / dpr;
      const vh = canvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
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

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
      ctx!.scale(dpr, dpr);
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // Draw frame based on progress
  useEffect(() => {
    const index = Math.min(Math.floor(progress * frameCount), frameCount - 1);
    if (index >= 0 && index !== currentFrameRef.current && framesRef.current?.[index]) {
      currentFrameRef.current = index;
      requestAnimationFrame(() => drawFrame(index));
    }
  }, [progress, frameCount, framesRef, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
