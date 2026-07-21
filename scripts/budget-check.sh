#!/usr/bin/env bash
#
# budget-check.sh — gate a paid call against the monthly budget (Factory §4).
#
# Usage: scripts/budget-check.sh <tool> <estimated_cost_usd>
#
# Reads runs/cost-tracker.json. If the tracked month is not the current month,
# the tracker is reset (spent_usd -> 0, by_tool -> {}) before checking.
# Passes (exit 0) if spent_usd + estimated_cost_usd <= limit_usd; otherwise
# prints the shortfall and fails (exit 1).
#
# This is a CHECK only — it does not record spend. The caller books the cost
# after a successful call.

set -euo pipefail

# --- Arguments ---------------------------------------------------------------
if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <tool> <estimated_cost_usd>" >&2
  exit 1
fi

TOOL="$1"
ESTIMATE="$2"

# Estimate must be a non-negative number.
if ! jq -e -n --arg e "$ESTIMATE" '($e | tonumber) >= 0' >/dev/null 2>&1; then
  echo "Error: estimated_cost_usd must be a non-negative number. Got: $ESTIMATE" >&2
  exit 1
fi

# --- Locate tracker ----------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TRACKER="$REPO_ROOT/runs/cost-tracker.json"
MONTH="$(date +%Y-%m)"

# Initialize if missing.
if [[ ! -f "$TRACKER" ]]; then
  jq -n --arg m "$MONTH" '{month: $m, limit_usd: 30, spent_usd: 0, by_tool: {}}' > "$TRACKER"
fi

# --- Reset on month rollover -------------------------------------------------
TRACKED_MONTH="$(jq -r '.month // ""' "$TRACKER")"
if [[ "$TRACKED_MONTH" != "$MONTH" ]]; then
  TMP="$(mktemp)"
  # Keep the configured limit; zero out the spend for the new month.
  jq --arg m "$MONTH" '{month: $m, limit_usd: (.limit_usd // 30), spent_usd: 0, by_tool: {}}' \
    "$TRACKER" > "$TMP" && mv "$TMP" "$TRACKER"
  echo "Budget: month rolled over to ${MONTH} — tracker reset." >&2
fi

# --- Check -------------------------------------------------------------------
LIMIT="$(jq -r '.limit_usd' "$TRACKER")"
SPENT="$(jq -r '.spent_usd' "$TRACKER")"
PROJECTED="$(jq -n --argjson s "$SPENT" --arg e "$ESTIMATE" '$s + ($e | tonumber)')"

if jq -e -n --argjson p "$PROJECTED" --argjson l "$LIMIT" '$p <= $l' >/dev/null; then
  REMAIN="$(jq -n --argjson l "$LIMIT" --argjson s "$SPENT" '$l - $s')"
  echo "Budget OK [${TOOL}]: spent \$${SPENT} + est \$${ESTIMATE} = \$${PROJECTED} <= limit \$${LIMIT} (remaining \$${REMAIN})."
  exit 0
else
  echo "Budget STOP [${TOOL}]: spent \$${SPENT} + est \$${ESTIMATE} = \$${PROJECTED} > limit \$${LIMIT}. Refusing." >&2
  exit 1
fi
