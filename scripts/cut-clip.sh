#!/usr/bin/env bash
#
# cut-clip.sh — cut a clip from a video without re-encoding.
#
# Usage: ./cut-clip.sh <input_file> <start_timestamp> <duration>
#   input_file       Source media file (e.g. video.mp4)
#   start_timestamp  Start point, HH:MM:SS or seconds (e.g. 00:01:30)
#   duration         Clip length, HH:MM:SS or seconds (e.g. 00:00:15 or 15)
#
# Example: ./cut-clip.sh video.mp4 00:01:30 15

set -euo pipefail

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <input_file> <start_timestamp> <duration>" >&2
  exit 1
fi

input="$1"
start="$2"
duration="$3"

if [ ! -f "$input" ]; then
  echo "Error: input file not found: $input" >&2
  exit 1
fi

# Build output name: <name>_clip.<ext>
dir=$(dirname "$input")
base=$(basename "$input")
name="${base%.*}"
ext="${base##*.}"
output="${dir}/${name}_clip.${ext}"

ffmpeg -ss "$start" -i "$input" -t "$duration" -c copy "$output"

echo "Clip saved to: $output"
