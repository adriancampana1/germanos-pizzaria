#!/bin/bash
# Rebuilds public/video/hero-mobile.mp4 (+ poster) from public/frames/*.webp.
#
# The landscape frames are cropped to a portrait window centred on the slice,
# upscaled 4x with Real-ESRGAN (realesr-general-x4v3, run on CPU through
# onnxruntime), scaled to 1080x1436 and encoded as H.264.
#
# Requires: ffmpeg, ImageMagick (convert), python3 with venv, curl.
# Run from the repo root: bash scripts/hero-mobile-video/build.sh
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
WORK="${WORK:-$(mktemp -d)}"
CROP_X=594   # left edge of the portrait window in the 1280px-wide frames
CROP_W=540   # 540x718 = 3:4, wide enough for tablets in portrait
MODEL_URL="https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesr-general-x4v3.pth"

mkdir -p "$WORK/png" "$WORK/sr" public/video
python3 -m venv "$WORK/venv"
"$WORK/venv/bin/pip" install -q onnx onnxruntime numpy pillow
curl -sSL -o "$WORK/model.pth" "$MODEL_URL"
"$WORK/venv/bin/python" "$HERE/build_onnx.py" "$WORK/model.pth" "$WORK/model.onnx"

for f in public/frames/frame_*.webp; do
  convert "$f" "$WORK/png/$(basename "$f" .webp).png"
done
"$WORK/venv/bin/python" "$HERE/upscale.py" "$WORK/model.onnx" "$CROP_X" "$CROP_W" "$WORK/sr" "$WORK"/png/frame_*.png

ffmpeg -v error -y -framerate 24 -i "$WORK/sr/frame_%04d.png" \
  -vf "scale=1080:1436:flags=lanczos" \
  -c:v libx264 -profile:v high -level 4.1 -crf 27 -preset veryslow \
  -pix_fmt yuv420p -movflags +faststart -an public/video/hero-mobile.mp4
convert "$WORK/sr/frame_0001.png" -filter Lanczos -resize 810x -quality 78 \
  public/video/hero-mobile-poster.webp

ls -la public/video
