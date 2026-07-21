#!/usr/bin/env bash
#
# gen-voiceover.sh — synthesize a voiceover from text via ElevenLabs.
#
# Usage: scripts/gen-voiceover.sh "text to speak" output-filename.mp3
#
# Reads ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID from .env.
# Model: eleven_multilingual_v2 · Format: mp3_44100_128
# Saves to output/YYYY-MM-DD/<output-filename>.

set -euo pipefail

# --- Arguments ---------------------------------------------------------------
if [[ $# -ne 2 ]]; then
  echo "Usage: $0 \"<text>\" <output-filename>" >&2
  exit 1
fi

TEXT="$1"
OUTPUT_NAME="$2"

# --- Locate repo root and load .env ------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$REPO_ROOT/.env"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: .env not found at $ENV_FILE" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

: "${ELEVENLABS_API_KEY:?ELEVENLABS_API_KEY is not set in .env}"
: "${ELEVENLABS_VOICE_ID:?ELEVENLABS_VOICE_ID is not set in .env}"

# --- Budget guard (Factory §4) -----------------------------------------------
TRACKER="$REPO_ROOT/runs/cost-tracker.json"
TOOL="elevenlabs"
# ElevenLabs bills per character. Rough per-character USD estimate (adjust to
# your plan): 100k credits for ~$22 → ~$0.00022/char.
RATE_PER_CHAR=0.00022
CHARS=${#TEXT}
ESTIMATE="$(jq -n --argjson n "$CHARS" --argjson r "$RATE_PER_CHAR" '(($n * $r) * 1000 | round) / 1000')"

"$SCRIPT_DIR/budget-check.sh" "$TOOL" "$ESTIMATE" || exit 1

# --- Prepare output path -----------------------------------------------------
# Honors OUT_DIR override (used by build-module.sh); defaults to today's folder.
OUT_DIR="${OUT_DIR:-$REPO_ROOT/output/$(date +%Y-%m-%d)}"
mkdir -p "$OUT_DIR"
OUT_PATH="$OUT_DIR/$OUTPUT_NAME"

# --- Build JSON payload (jq for safe escaping) -------------------------------
PAYLOAD="$(jq -n --arg text "$TEXT" \
  '{text: $text, model_id: "eleven_multilingual_v2"}')"

# --- Call ElevenLabs ---------------------------------------------------------
HTTP_CODE="$(curl -sS -w '%{http_code}' -o "$OUT_PATH" \
  -X POST "https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}?output_format=mp3_44100_128" \
  -H "xi-api-key: ${ELEVENLABS_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")"

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "Error: ElevenLabs API returned HTTP $HTTP_CODE" >&2
  # The body written to OUT_PATH is an error payload, not audio.
  if [[ -f "$OUT_PATH" ]]; then
    echo "Response:" >&2
    cat "$OUT_PATH" >&2
    echo >&2
    rm -f "$OUT_PATH"
  fi
  exit 1
fi

# --- Record the actual cost (Factory §4) -------------------------------------
TMP="$(mktemp)"
jq --arg t "$TOOL" --argjson cost "$ESTIMATE" \
   '.spent_usd = ((.spent_usd // 0) + $cost)
    | .by_tool[$t] = ((.by_tool[$t] // 0) + $cost)' \
   "$TRACKER" > "$TMP" && mv "$TMP" "$TRACKER"

NEW_TOTAL="$(jq -r '.spent_usd' "$TRACKER")"
echo "Voiceover saved: $OUT_PATH"
echo "Booked ~\$${ESTIMATE} (${CHARS} chars) to ${TOOL}. Month total: \$${NEW_TOTAL} / \$$(jq -r '.limit_usd' "$TRACKER")."
