# Hero Section Mobile Performance Fix

## Problem

The hero section uses a scroll-linked canvas animation rendering 61 frames of 1280x718px. On low-end Android devices (Redmi Note 12S), this causes severe stuttering due to:

- ~215MB GPU memory from 61 uncompressed ImageBitmaps
- Canvas redraws of large images on every scroll tick
- Lenis smooth scroll adding JS overhead on top of scroll events

The rest of the site performs well — the issue is isolated to the hero.

## Approach

**Optimized mobile frames + reduced frame count + Lenis removal.**

Keep the canvas + frames architecture (video scrubbing doesn't work on mobile browsers), but optimize for low-end devices by serving smaller, fewer frames on mobile and removing Lenis smooth scroll entirely.

## Design

### 1. Generate mobile frames

- Use ffmpeg to extract ~31 frames from the original video at 480x270 resolution, webp format, quality ~75
- Store in `public/frames/xs/`
- Preserve first and last frames; pick alternating frames from the 61-frame set
- Desktop frames (1280x718, 61 frames) remain unchanged in `public/frames/`

### 2. Remove Lenis smooth scroll

- Delete `src/app/hooks/useLenis.ts`
- Remove Lenis usage from `HomeClient.tsx`
- Remove `lenis` package dependency
- GSAP ScrollTrigger works with native scroll — no adaptation needed
- Native scroll on mobile is more performant and responsive than JS smooth scroll

### 3. Conditional frame loading by breakpoint

- `useFramePreloader` detects screen width on mount (one-time, no resize reactivity)
- `<= 768px`: Load from `public/frames/xs/`, 31 frames
- `> 768px`: Load from `public/frames/`, 61 frames (current behavior)
- `frameCount` and frame path determined at mount time
- `CanvasRenderer` already receives `frameCount` as prop — adapts automatically

### 4. CanvasRenderer mobile adjustments

- Reduce DPR cap on mobile from 1.5 to 1.0 (480x270 frames don't need high DPR)
- Remove `willChange: "transform"` from canvas inline styles (forces extra GPU compositing layer, counterproductive on low-end devices)
- Keep existing optimizations: rAF batching, `alpha: false`, `ImageBitmap` pre-decode

## Expected impact

| Metric | Desktop (unchanged) | Mobile (before) | Mobile (after) |
|--------|-------------------|-----------------|----------------|
| Frame count | 61 | 61 | 31 |
| Frame size | 1280x718 | 1280x718 | 480x270 |
| GPU memory (approx) | ~215MB | ~215MB | ~8MB |
| Download size | ~5.6MB | ~5.6MB | ~0.8-1MB |
| Smooth scroll JS | Lenis removed | Lenis | Native |
| Canvas DPR | max 2.0 | max 1.5 | max 1.0 |

## Files to modify

- `src/app/hooks/useFramePreloader.ts` — conditional path/count by screen width
- `src/app/hooks/useLenis.ts` — delete
- `src/app/components/HomeClient.tsx` — remove Lenis usage
- `src/app/components/Hero/CanvasRenderer.tsx` — DPR cap, remove willChange
- `public/frames/xs/` — new mobile frames (generated via ffmpeg)
- `package.json` — remove lenis dependency
