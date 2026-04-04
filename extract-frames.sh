#!/bin/bash
set -e

VIDEO="/home/adrian-campana/Documents/projetos/trabalho/hero.mp4"
OUTPUT_DIR="public/frames"

mkdir -p "$OUTPUT_DIR"

# Get frame count using ffprobe
FRAME_COUNT=$(ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 "$VIDEO")
echo "Video has $FRAME_COUNT frames"

# Extract all frames as webp
ffmpeg -i "$VIDEO" -vf "scale=-1:-1" -quality 80 -y "$OUTPUT_DIR/frame_%04d.webp"

EXTRACTED=$(ls "$OUTPUT_DIR"/*.webp | wc -l)
echo "Extracted $EXTRACTED frames to $OUTPUT_DIR/"
