# Content Factory

Operating manual for this repository. Read it in full at the start of every task and follow it exactly.

## 1. Brand OS

The brand governs every output. Before writing or generating anything, load:

- [Voice](../brand-os/voice.md) — tone, vocabulary, forbidden words, buyer.
- [Design](../brand-os/design.md) — visual system, formats, layout rules.

> Note: `brand-os/` is a sibling repository at `~/Projects/brand-os/`, not part of this repo.

## 2. Folder structure

```
content-factory/
├── scripts/      # Executable pipeline steps (ffmpeg, Replicate calls, transcription)
├── prompts/      # Reusable prompt templates
├── workflows/    # Multi-step orchestration definitions
├── raw/          # Source inputs (video, audio, transcripts) — never leaves the machine
├── output/       # Finished deliverables, one folder per run
└── runs/         # Run metadata, logs, and cost tracking
```

## 3. Output naming convention

Every deliverable lives in its own dated, topic-named folder:

```
output/YYYY-MM-DD-topic/
```

Example: `output/2026-07-07-diagnostic-launch/`

Use the run date, lowercase kebab-case for the topic, no spaces.

## 4. Budget rule

Cost is governed, not assumed.

- Before **every** Replicate call, read `runs/cost-tracker.json`.
- If the current-month total is **at or above €30**, refuse the call and report the remaining budget. Do not run it.
- After each Replicate call, record the cost in `runs/cost-tracker.json`.

The €30/month ceiling is a hard limit, not a target.

## 5. Anti-patterns

Non-negotiable. These protect the asset.

- **Never commit `.env`** (or any secret: `.env.local`, `*.key`). They are gitignored — keep it that way.
- **Never upload `raw/` to Replicate.** Raw source material stays local. Send only the specific processed clip a step requires.
