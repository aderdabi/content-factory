#!/usr/bin/env bash
#
# stitch-module.sh — combine a folder of slide images with a folder of
# voiceover clips into one narrated MP4 (each slide held for its clip length).
#
# Usage: scripts/stitch-module.sh <slides-dir> <voiceovers-dir> <output.mp4>
#
# Pairing: slide images and voiceover clips are each sorted by filename; the
# Nth slide is paired with the Nth clip. Both folders must hold the same count.
# Output is upscaled to 1920x1080 (H.264 + AAC). Local ffmpeg only, no API cost.

set -euo pipefail

if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <slides-dir> <voiceovers-dir> <output.mp4>" >&2
  exit 1
fi

SLIDES_DIR="$1"
VO_DIR="$2"
OUT="$3"
FPS="${FPS:-25}"

command -v ffmpeg >/dev/null 2>&1 || { echo "Error: ffmpeg not found." >&2; exit 1; }

# Collect and sort inputs (portable to bash 3.2 — no mapfile).
SLIDES=(); while IFS= read -r f; do SLIDES+=("$f"); done < <(find "$SLIDES_DIR" -maxdepth 1 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | sort)
CLIPS=();  while IFS= read -r f; do CLIPS+=("$f");  done < <(find "$VO_DIR"     -maxdepth 1 -type f -iname '*.mp3' | sort)

if [[ ${#SLIDES[@]} -eq 0 || ${#CLIPS[@]} -eq 0 ]]; then
  echo "Error: no slides (${#SLIDES[@]}) or clips (${#CLIPS[@]}) found." >&2
  exit 1
fi
if [[ ${#SLIDES[@]} -ne ${#CLIPS[@]} ]]; then
  echo "Error: slide count (${#SLIDES[@]}) != clip count (${#CLIPS[@]}). Cannot pair." >&2
  printf '  slide: %s\n' "${SLIDES[@]}" >&2
  printf '  clip:  %s\n' "${CLIPS[@]}" >&2
  exit 1
fi

WORK="$(mktemp -d "${TMPDIR:-/tmp}/stitch.XXXXXX")"
trap 'rm -rf "$WORK"' EXIT
LIST="$WORK/list.txt"; : > "$LIST"

mkdir -p "$(dirname "$OUT")"

for i in "${!SLIDES[@]}"; do
  seg="$WORK/seg$(printf '%03d' "$i").mp4"
  echo "  [$((i+1))/${#SLIDES[@]}] $(basename "${SLIDES[$i]}")  +  $(basename "${CLIPS[$i]}")"
  ffmpeg -hide_banner -loglevel error -y \
    -loop 1 -framerate "$FPS" -i "${SLIDES[$i]}" -i "${CLIPS[$i]}" \
    -vf "scale=1920:1080:flags=lanczos,format=yuv420p" -r "$FPS" \
    -c:v libx264 -preset medium -crf 20 -tune stillimage \
    -c:a aac -b:a 192k -shortest -movflags +faststart "$seg"
  echo "file '$seg'" >> "$LIST"
done

ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i "$LIST" -c copy "$OUT"
DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT" | cut -d. -f1)"
echo "Video saved: $OUT  (${DUR}s, $(ls -lh "$OUT" | awk '{print $5}'))"
