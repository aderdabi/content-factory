#!/usr/bin/env bash
#
# build-module.sh — one command to turn a module folder of prompts + scripts
# into slides, voiceovers, and a narrated video.
#
# Usage: scripts/build-module.sh <module-dir> [flags]
#
# Expected module folder layout (see modules/_template):
#   <module-dir>/
#   ├── config.env         # MODULE=m4  REF=raw/brand-refs/slide1.png  [DATE=YYYY-MM-DD]
#   ├── slides/            # 01-title.txt, 02-...txt   (one gpt-image-2 PROMPT per slide)
#   ├── voiceovers/        # 01-title.txt, 02-...txt   (one voiceover SCRIPT per slide)
#   └── slides-svg.js      # OPTIONAL: node script that overrides data slides with exact SVG
#
# Files in slides/ and voiceovers/ are paired by sorted order (name them 01-, 02-, ...).
# Outputs:
#   output/<DATE>-<MODULE>-slides/<MODULE>-sNN.png
#   output/<DATE>-<MODULE>-voiceovers/<MODULE>-vo-NN.mp3
#   output/<DATE>-course-videos/<MODULE>-module.mp4
#
# Flags: --slides-only  --vo-only  --no-video  --skip-slides  --skip-vo
#
# Every paid call is governed by budget-check.sh (Factory §4).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

# --- Arguments ---------------------------------------------------------------
if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <module-dir> [--slides-only|--vo-only|--no-video|--skip-slides|--skip-vo]" >&2
  exit 1
fi
MODDIR="$1"; shift
DO_SLIDES=1; DO_VO=1; DO_VIDEO=1
for f in "$@"; do case "$f" in
  --slides-only) DO_VO=0; DO_VIDEO=0 ;;
  --vo-only) DO_SLIDES=0; DO_VIDEO=0 ;;
  --no-video) DO_VIDEO=0 ;;
  --skip-slides) DO_SLIDES=0 ;;
  --skip-vo) DO_VO=0 ;;
  *) echo "Unknown flag: $f" >&2; exit 1 ;;
esac; done

[[ -d "$MODDIR" ]] || { echo "Error: module dir not found: $MODDIR" >&2; exit 1; }

# --- Config ------------------------------------------------------------------
MODULE=""; REF="raw/brand-refs/slide1.png"; DATE="$(date +%Y-%m-%d)"
# shellcheck disable=SC1091
[[ -f "$MODDIR/config.env" ]] && source "$MODDIR/config.env"
MODULE="${MODULE:-$(basename "$MODDIR")}"
[[ -f "$REF" ]] || { echo "Error: cover reference not found: $REF" >&2; exit 1; }

SLIDES_OUT="$REPO_ROOT/output/${DATE}-${MODULE}-slides"
VO_OUT="$REPO_ROOT/output/${DATE}-${MODULE}-voiceovers"
VIDEO="$REPO_ROOT/output/${DATE}-course-videos/${MODULE}-module.mp4"

echo "[build] module=$MODULE  date=$DATE  ref=$REF"

# --- Slides (gpt-image-2, then optional SVG override) ------------------------
if [[ $DO_SLIDES -eq 1 ]]; then
  mkdir -p "$SLIDES_OUT"
  PROMPTS=(); while IFS= read -r f; do PROMPTS+=("$f"); done < <(find "$MODDIR/slides" -maxdepth 1 -type f -name '*.txt' 2>/dev/null | sort)
  [[ ${#PROMPTS[@]} -gt 0 ]] || { echo "Error: no slide prompts in $MODDIR/slides" >&2; exit 1; }
  echo "[build] generating ${#PROMPTS[@]} slides via gpt-image-2 ..."
  i=0
  for p in "${PROMPTS[@]}"; do
    i=$((i+1)); nn=$(printf '%02d' "$i")
    echo "  slide $nn  ($(basename "$p"))"
    ok=0
    for attempt in 1 2 3; do
      if OUT_DIR="$SLIDES_OUT" "$SCRIPT_DIR/gen-image-gpt.sh" "$(cat "$p")" "${MODULE}-s${nn}.png" "$REF" < /dev/null > /tmp/build-slide.log 2>&1; then
        ok=1; break
      else
        echo "    attempt $attempt failed: $(grep -iE 'error|not created|budget' /tmp/build-slide.log | head -1)"; sleep 8
      fi
    done
    [[ $ok -eq 1 ]] || echo "    !! slide $nn FAILED after 3 attempts"
  done
  # Optional exact-SVG override for data-heavy slides.
  if [[ -f "$MODDIR/slides-svg.js" ]]; then
    echo "[build] applying SVG overrides (slides-svg.js) ..."
    MODULE="$MODULE" node "$MODDIR/slides-svg.js" "$SLIDES_OUT"
  fi
  echo "[build] slides -> $SLIDES_OUT"
fi

# --- Voiceovers (ElevenLabs) -------------------------------------------------
if [[ $DO_VO -eq 1 ]]; then
  mkdir -p "$VO_OUT"
  VOS=(); while IFS= read -r f; do VOS+=("$f"); done < <(find "$MODDIR/voiceovers" -maxdepth 1 -type f -name '*.txt' 2>/dev/null | sort)
  [[ ${#VOS[@]} -gt 0 ]] || { echo "Error: no voiceover scripts in $MODDIR/voiceovers" >&2; exit 1; }
  echo "[build] generating ${#VOS[@]} voiceovers via ElevenLabs ..."
  i=0
  for v in "${VOS[@]}"; do
    i=$((i+1)); nn=$(printf '%02d' "$i")
    echo "  vo $nn  ($(basename "$v"))"
    OUT_DIR="$VO_OUT" "$SCRIPT_DIR/gen-voiceover.sh" "$(cat "$v")" "${MODULE}-vo-${nn}.mp3" < /dev/null 2>&1 | grep -E 'Booked|Error' || true
  done
  echo "[build] voiceovers -> $VO_OUT"
fi

# --- Video -------------------------------------------------------------------
if [[ $DO_VIDEO -eq 1 ]]; then
  echo "[build] stitching narrated video ..."
  "$SCRIPT_DIR/stitch-module.sh" "$SLIDES_OUT" "$VO_OUT" "$VIDEO"
fi

echo "[build] done: $MODULE"