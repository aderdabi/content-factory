#!/usr/bin/env bash
#
# gen-image-gpt.sh — generate an image from a text prompt + a reference image
# via OpenAI's GPT Image edits endpoint (gpt-image-2).
#
# Usage: scripts/gen-image-gpt.sh "<prompt>" <output-filename> <reference-image>
#
# Reads OPENAI_API_KEY from .env.
# Model: gpt-image-2 (override with OPENAI_IMAGE_MODEL)
# Endpoint: POST /v1/images/edits — reference image passed as multipart image[].
# Saves to output/YYYY-MM-DD/<output-filename>.

set -euo pipefail

# --- Arguments ---------------------------------------------------------------
if [[ $# -ne 3 ]]; then
  echo "Usage: $0 \"<prompt>\" <output-filename> <reference-image>" >&2
  exit 1
fi

PROMPT="$1"
OUTPUT_NAME="$2"
REF_IMAGE="$3"

if [[ ! -f "$REF_IMAGE" ]]; then
  echo "Error: reference image not found: $REF_IMAGE" >&2
  exit 1
fi

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

: "${OPENAI_API_KEY:?OPENAI_API_KEY is not set in .env}"
MODEL="${OPENAI_IMAGE_MODEL:-gpt-image-2}"

# --- Budget guard (Factory §4) -----------------------------------------------
TOOL="gpt-image"
# gpt-image-2 list price estimate per image (override with OPENAI_IMAGE_COST).
ESTIMATE="${OPENAI_IMAGE_COST:-0.17}"
"$SCRIPT_DIR/budget-check.sh" "$TOOL" "$ESTIMATE" || exit 1

# --- Prepare output path -----------------------------------------------------
# Honors OUT_DIR override (used by build-module.sh); defaults to today's folder.
OUT_DIR="${OUT_DIR:-$REPO_ROOT/output/$(date +%Y-%m-%d)}"
mkdir -p "$OUT_DIR"
OUT_PATH="$OUT_DIR/$OUTPUT_NAME"

# --- Call OpenAI images/edits (multipart) ------------------------------------
RESP_FILE="$(mktemp)"
trap 'rm -f "$RESP_FILE"' EXIT

HTTP_CODE="$(curl -sS -w '%{http_code}' -o "$RESP_FILE" \
  -X POST "https://api.openai.com/v1/images/edits" \
  -H "Authorization: Bearer ${OPENAI_API_KEY}" \
  -F "model=${MODEL}" \
  -F "image[]=@${REF_IMAGE}" \
  -F "prompt=${PROMPT}")"

if [[ "$HTTP_CODE" != "200" ]]; then
  echo "Error: OpenAI API returned HTTP $HTTP_CODE" >&2
  echo "Response:" >&2
  cat "$RESP_FILE" >&2
  echo >&2
  exit 1
fi

# --- Decode the base64 image payload -----------------------------------------
B64="$(jq -r '.data[0].b64_json // empty' "$RESP_FILE")"
if [[ -z "$B64" ]]; then
  echo "Error: no image data in response." >&2
  cat "$RESP_FILE" >&2
  echo >&2
  exit 1
fi

echo "$B64" | base64 --decode > "$OUT_PATH"

# --- Record the cost (Factory §4) --------------------------------------------
TRACKER="$REPO_ROOT/runs/cost-tracker.json"
if [[ -f "$TRACKER" ]]; then
  TMP="$(mktemp)"
  jq --arg t "$TOOL" --argjson cost "$ESTIMATE" \
     '.spent_usd = ((.spent_usd // 0) + $cost) | .by_tool[$t] = ((.by_tool[$t] // 0) + $cost)' \
     "$TRACKER" > "$TMP" && mv "$TMP" "$TRACKER"
fi

echo "Image saved: $OUT_PATH"
echo "Booked ~\$${ESTIMATE} to ${TOOL}."
