#!/usr/bin/env bash
#
# factory-run.sh — one-command content kit builder.
#
# Usage: ./scripts/factory-run.sh <preset> <input> "<topic>"
#
#   preset : kit-ig | kit-linkedin | kit-podcast
#   input  : source media, e.g. raw/episode.mp4
#   topic  : free text; becomes the output folder slug
#
# Presets:
#   kit-ig        vertical clip + brand cover + intro voiceover
#   kit-linkedin  square cover + 60s teaser
#   kit-podcast   loudness-normalized episode + cover + transcript SRT
#
# Each preset writes to output/YYYY-MM-DD-<slug>/ (Factory §3) and orchestrates
# the existing step scripts. Those scripts write into output/YYYY-MM-DD/; this
# wrapper relocates each result into the run folder with a stable name.

set -euo pipefail

# --- Locate repo root (run from anywhere) ------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

# Whisper config — mirrors clip-pipeline.sh so the whole Factory is consistent.
WHISPER_BIN="${WHISPER_BIN:-whisper-cli}"
WHISPER_MODEL="${WHISPER_MODEL:-$HOME/whisper-models/ggml-medium.bin}"
WHISPER_QUEUE="${WHISPER_QUEUE:-15}"
WHISPER_LANG="${WHISPER_LANG:-en}"   # brand default is English; override e.g. WHISPER_LANG=fr

# Clip window for the clip-based presets. Override per run, e.g.
#   CLIP_START=00:30:00 ./scripts/factory-run.sh kit-ig ...
CLIP_START="${CLIP_START:-00:01:00}"

# Covers are generated with OpenAI gpt-image-2 (via gen-image-gpt.sh), which is
# an image-EDIT model: it conditions on a brand reference to stay on-style.
# Override with COVER_REF=<path> (must live under raw/brand-refs/, cleared for
# upload per §6). Default is the reference that produced the approved look.
COVER_REF="${COVER_REF:-raw/brand-refs/slide1.png}"

# --- Arguments ---------------------------------------------------------------
if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <kit-ig|kit-linkedin|kit-podcast> <input> \"<topic>\"" >&2
  exit 1
fi

PRESET="$1"
INPUT="$2"
TOPIC="$3"

case "$PRESET" in
  kit-ig|kit-linkedin|kit-podcast) ;;
  *)
    echo "[factory] Error: unknown preset '$PRESET' (expected kit-ig | kit-linkedin | kit-podcast)." >&2
    exit 1
    ;;
esac

if [[ ! -f "$INPUT" ]]; then
  echo "[factory] Error: input file not found: $INPUT" >&2
  exit 1
fi

if [[ ! -f "$COVER_REF" ]]; then
  echo "[factory] Error: cover reference not found: $COVER_REF" >&2
  echo "[factory] Set COVER_REF to a file under raw/brand-refs/." >&2
  exit 1
fi

DATE="$(date +%Y-%m-%d)"
# Slug: transliterate FR/DE accents to ASCII, lowercase, non-alnum -> single
# dash, trim leading/trailing dashes. Keeps French/German topics readable.
SLUG="$(printf '%s' "$TOPIC" \
  | sed 'y/ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÌÍÎÏìíîïÒÓÔÕÖØòóôõöøÙÚÛÜùúûüÝýÿÇçÑñ/AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOOooooooUUUUuuuuYyyCcNn/' \
  | sed -e 's/ß/ss/g; s/[Œœ]/oe/g; s/[Ææ]/ae/g' \
  | tr '[:upper:]' '[:lower:]' \
  | tr -cs 'a-z0-9' '-' \
  | sed -e 's/^-*//' -e 's/-*$//')"
if [[ -z "$SLUG" ]]; then
  echo "[factory] Error: topic produced an empty slug." >&2
  exit 1
fi

OUTDIR="output/$DATE-$SLUG"
DAYDIR="output/$DATE"          # where the step scripts write before relocation
mkdir -p "$OUTDIR"

echo "[factory] $DATE — $PRESET — $TOPIC"
echo "[factory] output: $OUTDIR"

# --- Helper: relocate a step-script output into the run folder ---------------
place() {
  local src="$1" dst="$2"
  if [[ ! -f "$src" ]]; then
    echo "[factory] Error: expected output missing: $src" >&2
    exit 1
  fi
  mv -f "$src" "$dst"
  echo "[factory] -> $dst"
}

# --- Inline step: loudness normalization (no dedicated script yet) ------------
normalize_episode() {
  command -v ffmpeg >/dev/null 2>&1 || { echo "[factory] Error: ffmpeg not found." >&2; exit 1; }
  local ext="${INPUT##*.}"
  local out="$OUTDIR/episode-normalized.${ext}"
  echo "[factory] normalizing loudness (EBU R128, I=-16) ..."
  ffmpeg -hide_banner -loglevel error -y \
    -i "$INPUT" \
    -map 0 -c:v copy -c:a aac -b:a 192k \
    -af "loudnorm=I=-16:TP=-1.5:LRA=11" \
    "$out"
  echo "[factory] -> $out"
}

# --- Inline step: full-episode transcript SRT (no dedicated script yet) -------
transcribe_srt() {
  command -v ffmpeg >/dev/null 2>&1 || { echo "[factory] Error: ffmpeg not found." >&2; exit 1; }
  command -v "$WHISPER_BIN" >/dev/null 2>&1 || { echo "[factory] Error: '$WHISPER_BIN' not found." >&2; exit 1; }
  [[ -f "$WHISPER_MODEL" ]] || { echo "[factory] Error: Whisper model not found: $WHISPER_MODEL" >&2; exit 1; }

  local work; work="$(mktemp -d "${TMPDIR:-/tmp}/factory-srt.XXXXXX")"
  # shellcheck disable=SC2064
  trap "rm -rf '$work'" RETURN

  echo "[factory] extracting audio for transcription ..."
  ffmpeg -hide_banner -loglevel error -y -i "$INPUT" -vn -acodec libmp3lame -q:a 2 "$work/audio.mp3"

  echo "[factory] transcribing (Whisper, lang=$WHISPER_LANG) ..."
  "$WHISPER_BIN" -m "$WHISPER_MODEL" -f "$work/audio.mp3" \
    -l "$WHISPER_LANG" -t "$WHISPER_QUEUE" -osrt -of "$OUTDIR/chapters"
  [[ -f "$OUTDIR/chapters.srt" ]] || { echo "[factory] Error: transcription produced no SRT." >&2; exit 1; }
  echo "[factory] -> $OUTDIR/chapters.srt"
}

# --- Presets -----------------------------------------------------------------
case "$PRESET" in
  kit-ig)
    # Vertical short-form clip (1080x1920, burned subs), 30s from CLIP_START.
    ./scripts/clip-pipeline.sh "$INPUT" "$CLIP_START" "${CLIP_DURATION:-30}"
    place "$DAYDIR/clip-final.mp4" "$OUTDIR/clip.mp4"

    ./scripts/gen-image-gpt.sh "$TOPIC, in brand style" cover.png "$COVER_REF"
    place "$DAYDIR/cover.png" "$OUTDIR/cover.png"

    ./scripts/gen-voiceover.sh "In this episode: $TOPIC" intro.mp3
    place "$DAYDIR/intro.mp3" "$OUTDIR/intro.mp3"
    ;;

  kit-linkedin)
    ./scripts/gen-image-gpt.sh "$TOPIC, square cover" cover.png "$COVER_REF"
    place "$DAYDIR/cover.png" "$OUTDIR/cover.png"

    # 60s teaser via the same clip pipeline, from CLIP_START.
    ./scripts/clip-pipeline.sh "$INPUT" "$CLIP_START" "${CLIP_DURATION:-60}"
    place "$DAYDIR/clip-final.mp4" "$OUTDIR/teaser.mp4"
    ;;

  kit-podcast)
    normalize_episode

    ./scripts/gen-image-gpt.sh "$TOPIC, podcast cover" cover.png "$COVER_REF"
    place "$DAYDIR/cover.png" "$OUTDIR/cover.png"

    transcribe_srt
    ;;

  *)
    echo "[factory] Error: unknown preset '$PRESET' (expected kit-ig | kit-linkedin | kit-podcast)." >&2
    exit 1
    ;;
esac

echo "[factory] done. Output: $OUTDIR"
