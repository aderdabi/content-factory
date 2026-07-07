#!/usr/bin/env bash
#
# clip-pipeline.sh — vertical short-form clip factory
#
# Pipeline: cut (frame-accurate) -> extract audio -> transcribe (Whisper EN)
#           -> vertical reframe with blurred pillarbox -> burn subtitles.
#
# Usage:
#   ./clip-pipeline.sh <input-file> <start-timestamp> <duration-seconds>
#
# Example:
#   ./clip-pipeline.sh talk.mp4 00:01:30 45
#
set -euo pipefail

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
WHISPER_BIN="${WHISPER_BIN:-whisper-cli}"
WHISPER_MODEL="${WHISPER_MODEL:-$HOME/whisper-models/ggml-medium.bin}"
WHISPER_QUEUE="${WHISPER_QUEUE:-15}"   # compute queue -> whisper -t (threads)

TARGET_W=1080                          # vertical output width  (9:16)
TARGET_H=1920                          # vertical output height (9:16)
SUB_FONT="Helvetica"
SUB_SIZE=24

# ---------------------------------------------------------------------------
# Arguments
# ---------------------------------------------------------------------------
if [[ $# -ne 3 ]]; then
  echo "Usage: $0 <input-file> <start-timestamp HH:MM:SS> <duration-seconds>" >&2
  exit 1
fi

INPUT="$1"
START="$2"
DURATION="$3"

if [[ ! -f "$INPUT" ]]; then
  echo "Error: input file not found: $INPUT" >&2
  exit 1
fi

if [[ ! "$START" =~ ^[0-9]{1,2}:[0-9]{2}:[0-9]{2}(\.[0-9]+)?$ ]]; then
  echo "Error: start timestamp must be HH:MM:SS (got '$START')" >&2
  exit 1
fi

if [[ ! "$DURATION" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
  echo "Error: duration must be a number of seconds (got '$DURATION')" >&2
  exit 1
fi

for bin in ffmpeg ffprobe "$WHISPER_BIN"; do
  command -v "$bin" >/dev/null 2>&1 || { echo "Error: '$bin' not found in PATH" >&2; exit 1; }
done
[[ -f "$WHISPER_MODEL" ]] || { echo "Error: Whisper model not found: $WHISPER_MODEL" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Working directories
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
OUT_DIR="$ROOT_DIR/output/$(date +%Y-%m-%d)"
mkdir -p "$OUT_DIR"

WORK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/clip-pipeline.XXXXXX")"
trap 'rm -rf "$WORK_DIR"' EXIT

CUT_VIDEO="$WORK_DIR/cut.mp4"
AUDIO_MP3="$WORK_DIR/audio.mp3"
SUB_PREFIX="$WORK_DIR/subs"       # whisper appends .srt
SUB_SRT="$SUB_PREFIX.srt"
REFRAMED="$WORK_DIR/reframed.mp4"
FINAL="$OUT_DIR/clip-final.mp4"

echo "==> Working dir : $WORK_DIR"
echo "==> Output      : $FINAL"

# ---------------------------------------------------------------------------
# Step 1 — Frame-accurate cut (re-encode; -ss after -i for exact frames)
# ---------------------------------------------------------------------------
echo "==> [1/5] Cutting clip (frame-accurate) ..."
ffmpeg -hide_banner -loglevel error -y \
  -i "$INPUT" \
  -ss "$START" -t "$DURATION" \
  -c:v libx264 -preset medium -crf 18 \
  -c:a aac -b:a 192k \
  -avoid_negative_ts make_zero \
  "$CUT_VIDEO"

# ---------------------------------------------------------------------------
# Step 2 — Extract audio to MP3
# ---------------------------------------------------------------------------
echo "==> [2/5] Extracting audio (mp3) ..."
ffmpeg -hide_banner -loglevel error -y \
  -i "$CUT_VIDEO" \
  -vn -acodec libmp3lame -q:a 2 \
  "$AUDIO_MP3"

# ---------------------------------------------------------------------------
# Step 3 — Transcribe with Whisper (English, SRT output)
# ---------------------------------------------------------------------------
echo "==> [3/5] Transcribing (Whisper EN, queue=$WHISPER_QUEUE) ..."
"$WHISPER_BIN" \
  -m "$WHISPER_MODEL" \
  -f "$AUDIO_MP3" \
  -l en \
  -t "$WHISPER_QUEUE" \
  -osrt \
  -of "$SUB_PREFIX"

[[ -f "$SUB_SRT" ]] || { echo "Error: transcription did not produce $SUB_SRT" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Step 4 — Vertical reframe with blurred pillarbox background
# ---------------------------------------------------------------------------
echo "==> [4/5] Vertical reframe (blurred pillarbox ${TARGET_W}x${TARGET_H}) ..."
ffmpeg -hide_banner -loglevel error -y \
  -i "$CUT_VIDEO" \
  -filter_complex "\
    [0:v]split=2[bg][fg]; \
    [bg]scale=${TARGET_W}:${TARGET_H}:force_original_aspect_ratio=increase,\
crop=${TARGET_W}:${TARGET_H},boxblur=luma_radius=40:luma_power=2[blurred]; \
    [fg]scale=${TARGET_W}:${TARGET_H}:force_original_aspect_ratio=decrease[front]; \
    [blurred][front]overlay=(W-w)/2:(H-h)/2[v]" \
  -map "[v]" -map 0:a? \
  -c:v libx264 -preset medium -crf 18 \
  -c:a copy \
  "$REFRAMED"

# ---------------------------------------------------------------------------
# Step 5 — Burn subtitles (Helvetica, size 24)
# ---------------------------------------------------------------------------
echo "==> [5/5] Burning subtitles ($SUB_FONT $SUB_SIZE) ..."
# Escape the subtitle path for the ffmpeg filtergraph parser.
ESCAPED_SRT="${SUB_SRT//\\/\\\\}"
ESCAPED_SRT="${ESCAPED_SRT//:/\\:}"
ffmpeg -hide_banner -loglevel error -y \
  -i "$REFRAMED" \
  -vf "subtitles='${ESCAPED_SRT}':force_style='FontName=${SUB_FONT},FontSize=${SUB_SIZE}'" \
  -c:v libx264 -preset medium -crf 18 \
  -c:a copy \
  "$FINAL"

echo "==> Done: $FINAL"
