#!/usr/bin/env bash
#
# gen-video.sh — generate a video via Replicate (kwaivgi/kling-v2.1).
#
# Usage: scripts/gen-video.sh "<prompt>" <duration> <start-image>
#
#   duration     : 5 or 10 (the only values kling-v2.1 accepts)
#   start-image  : local image file — REQUIRED. kling-v2.1 is image-to-video;
#                  it will not run without a start frame.
#
# Reads REPLICATE_API_TOKEN from .env.
# Prints a cost estimate and waits for y/N confirmation before the paid call.
# Enforces the Factory budget rule (§4): refuses if the current month's spend
# is at or above the €30 ceiling, and records the cost after.
# Saves to output/YYYY-MM-DD/video-<prediction-id>.mp4.

set -euo pipefail

# --- Arguments ---------------------------------------------------------------
if [[ $# -ne 3 ]]; then
  echo "Usage: $0 \"<prompt>\" <duration:5|10> <start-image>" >&2
  exit 1
fi

PROMPT="$1"
DURATION="$2"
START_IMAGE="$3"

if [[ "$DURATION" != "5" && "$DURATION" != "10" ]]; then
  echo "Error: duration must be 5 or 10 (kling-v2.1 accepts no other value). Got: $DURATION" >&2
  exit 1
fi

if [[ ! -f "$START_IMAGE" ]]; then
  echo "Error: start image not found: $START_IMAGE" >&2
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

: "${REPLICATE_API_TOKEN:?REPLICATE_API_TOKEN is not set in .env}"

# --- Cost estimate -----------------------------------------------------------
# kling-v2.1 standard (720p) list price ~ $0.062/second of output (estimate).
PRICE_PER_SEC=0.062
COST="$(jq -n --argjson r "$PRICE_PER_SEC" --argjson d "$DURATION" '($r * $d)')"
COST_FMT="$(printf '%.2f' "$COST")"

# --- Budget guard (Factory §4) -----------------------------------------------
TRACKER="$REPO_ROOT/runs/cost-tracker.json"
TOOL="kling"

"$SCRIPT_DIR/budget-check.sh" "$TOOL" "$COST" || exit 1

# --- Confirmation ------------------------------------------------------------
printf 'Cost estimate: $%s for %ss — continue? (y/N) ' "$COST_FMT" "$DURATION"
read -r REPLY
if [[ ! "$REPLY" =~ ^[Yy]$ ]]; then
  echo "Aborted. No call made."
  exit 0
fi

# --- Build the request body --------------------------------------------------
# The start image is inlined as a base64 data URI. It is far too large for the
# command line (ARG_MAX), so the base64 is written to a file and read by jq via
# --rawfile, and the assembled JSON body is POSTed with curl -d @file.
MIME="$(file --mime-type -b "$START_IMAGE")"
B64_FILE="$(mktemp)"
BODY_FILE="$(mktemp)"
trap 'rm -f "$B64_FILE" "$BODY_FILE"' EXIT

base64 < "$START_IMAGE" | tr -d '\n' > "$B64_FILE"

jq -n --arg p "$PROMPT" --argjson d "$DURATION" --arg mime "$MIME" \
  --rawfile b64 "$B64_FILE" \
  '{input: {prompt: $p, duration: $d,
            start_image: ("data:" + $mime + ";base64," + ($b64 | rtrimstr("\n")))}}' \
  > "$BODY_FILE"

# --- Create the prediction ---------------------------------------------------
CREATE_RESP="$(curl -sS -X POST \
  "https://api.replicate.com/v1/models/kwaivgi/kling-v2.1/predictions" \
  -H "Authorization: Bearer ${REPLICATE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @"$BODY_FILE")"

PRED_ID="$(jq -r '.id // empty' <<<"$CREATE_RESP")"
if [[ -z "$PRED_ID" ]]; then
  echo "Error: prediction was not created." >&2
  echo "$CREATE_RESP" >&2
  exit 1
fi

echo "Prediction created: $PRED_ID — polling (video can take a few minutes)..."

# --- Poll until terminal state (up to ~15 min) -------------------------------
STATUS=""
GET_RESP=""
for _ in $(seq 1 180); do
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
  sleep 5
done

if [[ "$STATUS" != "succeeded" ]]; then
  echo "Error: prediction did not succeed in time (last status: ${STATUS:-unknown})." >&2
  echo "Check it later: https://replicate.com/p/${PRED_ID}" >&2
  exit 1
fi

# --- Download the video ------------------------------------------------------
VID_URL="$(jq -r 'if (.output | type) == "array" then .output[0] else .output end' <<<"$GET_RESP")"
if [[ -z "$VID_URL" || "$VID_URL" == "null" ]]; then
  echo "Error: no output URL in prediction." >&2
  echo "$GET_RESP" >&2
  exit 1
fi

OUT_DIR="$REPO_ROOT/output/$(date +%Y-%m-%d)"
mkdir -p "$OUT_DIR"
OUT_PATH="$OUT_DIR/video-${PRED_ID}.mp4"
curl -sS -L -o "$OUT_PATH" "$VID_URL"

# --- Record the actual cost (Factory §4) -------------------------------------
TMP="$(mktemp)"
jq --arg t "$TOOL" --argjson cost "$COST" \
   '.spent_usd = ((.spent_usd // 0) + $cost)
    | .by_tool[$t] = ((.by_tool[$t] // 0) + $cost)' \
   "$TRACKER" > "$TMP" && mv "$TMP" "$TRACKER"

NEW_TOTAL="$(jq -r '.spent_usd' "$TRACKER")"
echo "Video saved: $OUT_PATH"
echo "Booked ~\$${COST_FMT} to ${TOOL}. Month total: \$${NEW_TOTAL} / \$$(jq -r '.limit_usd' "$TRACKER")."
