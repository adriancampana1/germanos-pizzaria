# Hero Mobile Performance Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix hero section stuttering on low-end Android by serving smaller/fewer frames on mobile and removing Lenis smooth scroll.

**Architecture:** Conditional frame loading based on screen width at mount. Mobile gets 31 frames at 480x270 from `public/frames/xs/`, desktop keeps 61 frames at 1280x718. Lenis is removed entirely — GSAP ScrollTrigger uses native scroll.

**Tech Stack:** Next.js, GSAP ScrollTrigger, ffmpeg (build-time asset generation), Canvas API

---

### Task 1: Generate mobile frames with ffmpeg

**Files:**
- Create: `public/frames/xs/frame_0001.webp` through `frame_0031.webp`

The desktop set has 61 frames (frame_0001 to frame_0061). We pick every other frame (1, 3, 5, … 61) to get 31 frames, then renumber them sequentially as frame_0001–frame_0031 for the mobile set.

- [ ] **Step 1: Generate mobile frames**

Run from project root:

```bash
# Create output dir
mkdir -p public/frames/xs

# Pick every 2nd frame from the desktop set (1,3,5,...,61), resize to 480x270, webp q75
i=1
for src_idx in $(seq 1 2 61); do
  src=$(printf "public/frames/frame_%04d.webp" "$src_idx")
  dst=$(printf "public/frames/xs/frame_%04d.webp" "$i")
  ffmpeg -y -i "$src" -vf "scale=480:270" -quality 75 "$dst"
  i=$((i + 1))
done
```

- [ ] **Step 2: Verify output**

Run:
```bash
ls public/frames/xs/ | wc -l
identify public/frames/xs/frame_0001.webp
identify public/frames/xs/frame_0031.webp
du -sh public/frames/xs/
```

Expected: 31 files, each 480x270, total ~0.8–1MB.

- [ ] **Step 3: Commit**

```bash
git add public/frames/xs/
git commit -m "assets: add 31 mobile frames at 480x270 for hero section"
```

---

### Task 2: Remove Lenis smooth scroll

**Files:**
- Delete: `src/app/hooks/useLenis.ts`
- Modify: `src/app/components/HomeClient.tsx`
- Modify: `src/app/globals.css:68-79`

- [ ] **Step 1: Remove Lenis CSS from globals.css**

In `src/app/globals.css`, delete the Lenis block (lines 68-79):

```css
/* DELETE THIS ENTIRE BLOCK */
/* Smooth scrolling */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
```

- [ ] **Step 2: Remove useLenis from HomeClient.tsx**

Replace the entire file `src/app/components/HomeClient.tsx` with:

```tsx
"use client";

import useFramePreloader from "../hooks/useFramePreloader";
import Loader from "./Loader/Loader";
import Hero from "./Hero/Hero";
import FloatingCta from "./FloatingCta/FloatingCta";

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { framesRef, progress, isLoaded, frameCount } = useFramePreloader();

  return (
    <>
      <Loader progress={progress} isLoaded={isLoaded} />
      <Hero framesRef={framesRef} frameCount={frameCount} isLoaded={isLoaded} />
      {children}
      <FloatingCta />
    </>
  );
}
```

- [ ] **Step 3: Delete useLenis.ts**

```bash
rm src/app/hooks/useLenis.ts
```

- [ ] **Step 4: Uninstall lenis package**

```bash
npm uninstall lenis
```

- [ ] **Step 5: Verify dev server starts without errors**

```bash
npm run dev
```

Open the site, confirm scroll still works (now native). Check console for no import errors.

- [ ] **Step 6: Commit**

```bash
git add -u
git commit -m "perf: remove Lenis smooth scroll in favor of native scroll"
```

---

### Task 3: Make useFramePreloader responsive to screen size

**Files:**
- Modify: `src/app/hooks/useFramePreloader.ts`

- [ ] **Step 1: Update useFramePreloader.ts**

Replace the entire file with:

```ts
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
```

Key changes:
- `getFrameConfig()` runs once via `useState(initializer)` — determines mobile vs desktop at mount
- `frameSrc` now takes a path parameter
- `frameCount` comes from config (31 on mobile, 61 on desktop)
- Preload logic is identical, just uses the right path and count

- [ ] **Step 2: Verify on desktop**

```bash
npm run dev
```

Open in desktop browser. Confirm all 61 frames load and scroll animation works as before.

- [ ] **Step 3: Verify on mobile viewport**

Open browser DevTools, toggle device toolbar to a mobile width (e.g., 393px). Reload. Confirm:
- Network tab shows requests to `/frames/xs/frame_NNNN.webp`
- Only 31 frames are loaded
- Animation plays through the scroll

- [ ] **Step 4: Commit**

```bash
git add src/app/hooks/useFramePreloader.ts
git commit -m "perf: load smaller mobile frames (480x270, 31 frames) on screens <= 768px"
```

---

### Task 4: Optimize CanvasRenderer for mobile

**Files:**
- Modify: `src/app/components/Hero/CanvasRenderer.tsx`

- [ ] **Step 1: Update getCappedDpr function**

In `src/app/components/Hero/CanvasRenderer.tsx`, replace the `getCappedDpr` function (lines 15-20):

```ts
// OLD
function getCappedDpr(): number {
  const dpr = window.devicePixelRatio || 1;
  if (window.innerWidth <= 768) return Math.min(dpr, 1.5);
  return Math.min(dpr, 2);
}
```

```ts
// NEW
function getCappedDpr(): number {
  const dpr = window.devicePixelRatio || 1;
  if (window.innerWidth <= 768) return 1;
  return Math.min(dpr, 2);
}
```

- [ ] **Step 2: Remove willChange from canvas styles**

In the same file, replace the canvas inline styles (lines 145-152):

```tsx
// OLD
style={{
  position: "absolute",
  top: "-1px",
  left: "-1px",
  width: "calc(100% + 2px)",
  height: "calc(100% + 2px)",
  display: "block",
  willChange: "transform",
}}
```

```tsx
// NEW
style={{
  position: "absolute",
  top: "-1px",
  left: "-1px",
  width: "calc(100% + 2px)",
  height: "calc(100% + 2px)",
  display: "block",
}}
```

- [ ] **Step 3: Verify on mobile viewport**

Open in DevTools mobile viewport. Confirm:
- Canvas renders correctly (no visual glitches)
- Scroll animation is smooth
- No console errors

- [ ] **Step 4: Commit**

```bash
git add src/app/components/Hero/CanvasRenderer.tsx
git commit -m "perf: reduce canvas DPR to 1 on mobile and remove willChange"
```

---

### Task 5: Final verification and cleanup

- [ ] **Step 1: Full desktop test**

```bash
npm run dev
```

Open on desktop (wide viewport). Verify:
- 61 frames load from `/frames/frame_NNNN.webp`
- Scroll animation is smooth and complete
- No Lenis-related console errors
- Scroll behavior feels natural

- [ ] **Step 2: Full mobile test**

Open DevTools mobile viewport (393px wide) or test on actual device. Verify:
- 31 frames load from `/frames/xs/frame_NNNN.webp`
- Scroll animation plays through without stuttering
- Canvas renders at DPR 1 (check canvas.width in console — should equal viewport width, not 1.5x)
- Page scrolls with native behavior

- [ ] **Step 3: Build test**

```bash
npm run build
```

Ensure no build errors related to removed Lenis imports or missing files.

- [ ] **Step 4: Commit any remaining changes**

If the build revealed any issues that needed fixing, commit those fixes.
