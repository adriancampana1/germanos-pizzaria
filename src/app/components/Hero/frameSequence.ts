export type Frame = ImageBitmap | HTMLImageElement;

export const FRAME_COUNT = 61;

export function frameSrc(index: number): string {
  return `/frames/frame_${String(index + 1).padStart(4, "0")}.webp`;
}

/**
 * Load order that spreads coverage over the whole sequence first (every 8th
 * frame, then every 4th, ...), so scrubbing works across the full range long
 * before every frame has arrived.
 */
function coarseToFineOrder(count: number): number[] {
  const order: number[] = [];
  const seen = new Set<number>();
  const push = (i: number) => {
    if (i < count && !seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  push(0);
  push(count - 1);
  for (let step = 8; step >= 1; step /= 2) {
    for (let i = 0; i < count; i += step) push(i);
  }
  return order;
}

async function loadFrame(src: string): Promise<Frame> {
  // Decoding from a blob keeps the decode off the main thread.
  if (typeof createImageBitmap === "function") {
    try {
      const res = await fetch(src);
      if (res.ok) return await createImageBitmap(await res.blob());
    } catch {
      // fall through to <img> decoding
    }
  }
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  return img;
}

const CONCURRENCY = 4;

/**
 * Progressively fills `frames` (sparse until loading completes) and calls
 * `onFrame` as each one becomes drawable. Returns a cancel function that also
 * releases the decoded bitmaps.
 */
export function loadFrameSequence(
  frames: (Frame | undefined)[],
  onFrame: (index: number) => void,
): () => void {
  let cancelled = false;
  const queue = coarseToFineOrder(FRAME_COUNT);

  async function worker() {
    while (!cancelled) {
      const index = queue.shift();
      if (index === undefined) return;
      try {
        const frame = await loadFrame(frameSrc(index));
        if (cancelled) {
          if ("close" in frame) frame.close();
          return;
        }
        frames[index] = frame;
        onFrame(index);
      } catch {
        // A missing frame is skipped; the renderer falls back to its nearest neighbour.
      }
    }
  }

  for (let i = 0; i < CONCURRENCY; i++) void worker();

  return () => {
    cancelled = true;
    frames.forEach((f) => {
      if (f && "close" in f) f.close();
    });
    frames.length = 0;
  };
}
