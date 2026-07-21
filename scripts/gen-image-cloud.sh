#!/usr/bin/env bash
#
# gen-image-cloud.sh — generate an image via Replicate (black-forest-labs/flux-schnell).
#
# Usage: scripts/gen-image-cloud.sh "<prompt>" <output-filename>
#
# Reads REPLICATE_API_TOKEN from .env.
# Enforces the Factory budget rule (§4): refuses if the current month's
# Replicate spend is at or above the €30 ceiling, and records the cost after.
# Saves to output/YYYY-MM-DD/<output-filename>.

set -euo pipefail

# --- Arguments ---------------------------------------------------------------
if [[ $# -ne 2 ]]; then
  echo "Usage: $0 \"<prompt>\" <output-filename>" >&2
  exit 1
fi

PROMPT="$1"
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

: "${REPLICATE_API_TOKEN:?REPLICATE_API_TOKEN is not set in .env}"

# --- Budget guard (Factory §4) -----------------------------------------------
TRACKER="$REPO_ROOT/runs/cost-tracker.json"
TOOL="flux-schnell"
# flux-schnell list price: ~$0.003/image.
ESTIMATE=0.003

"$SCRIPT_DIR/budget-check.sh" "$TOOL" "$ESTIMATE" || exit 1

# --- Create the prediction ---------------------------------------------------
# Official model → model-scoped predictions endpoint (no version hash needed).
CREATE_RESP="$(curl -sS -X POST \
  "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions" \
  -H "Authorization: Bearer ${REPLICATE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg p "$PROMPT" '{input: {prompt: $p}}')")"

PRED_ID="$(jq -r '.id // empty' <<<"$CREATE_RESP")"
if [[ -z "$PRED_ID" ]]; then
  echo "Error: prediction was not created." >&2
  echo "$CREATE_RESP" >&2
  exit 1
fi

echo "Prediction created: $PRED_ID — polling..."

# --- Poll until terminal state -----------------------------------------------
STATUS=""
GET_RESP=""
for _ in $(seq 1 120); do
  GET_RESP="$(curl -sS \
    "https://api.replicate.com/v1/predictions/${PRED_ID}" \
    -H "Authorization: Bearer ${REPLICATE_API_TOKEN}")"
  STATUS="$(jq -r '.status // empty' <<<"$GET_RESP")"
  case "$STATUS" in
    succeeded) break ;;
    failed|canceled)
      echo "Error: prediction $STATUS." >&2
      jq -r '.error // "no error message"' <<<"$GET_RESP" >&2
      exit 1
      ;;
  esac
  sleep 2
done

if [[ "$STATUS" != "succeeded" ]]; then
  echo "Error: prediction did not succeed in time (last status: ${STATUS:-unknown})." >&2
  exit 1
fi

# --- Download the image ------------------------------------------------------
# flux-schnell returns output as an array of image URLs.
IMG_URL="$(jq -r 'if (.output | type) == "array" then .output[0] else .output end' <<<"$GET_RESP")"
if [[ -z "$IMG_URL" || "$IMG_URL" == "null" ]]; then
  echo "Error: no output URL in prediction." >&2
  echo "$GET_RESP" >&2
  exit 1
fi

OUT_DIR="$REPO_ROOT/output/$(date +%Y-%m-%d)"
mkdir -p "$OUT_DIR"
OUT_PATH="$OUT_DIR/$OUTPUT_NAME"

curl -sS -L -o "$OUT_PATH" "$IMG_URL"

# --- Record the actual cost (Factory §4) -------------------------------------
TMP="$(mktemp)"
jq --arg t "$TOOL" --argjson cost "$ESTIMATE" \
   '.spent_usd = ((.spent_usd // 0) + $cost)
    | .by_tool[$t] = ((.by_tool[$t] // 0) + $cost)' \
   "$TRACKER" > "$TMP" && mv "$TMP" "$TRACKER"

NEW_TOTAL="$(jq -r '.spent_usd' "$TRACKER")"
echo "Image saved: $OUT_PATH"
echo "Booked \$${ESTIMATE} to ${TOOL}. Month total: \$${NEW_TOTAL} / \$$(jq -r '.limit_usd' "$TRACKER")."
