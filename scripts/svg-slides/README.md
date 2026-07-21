# svg-slides

Exact **SVG → PNG** course-slide generator. Use this for **data-heavy slides**
(tables, stat tiles, diagrams) where gpt-image-2 fabricates numbers or drops
content. Illustrations and title slides stay on gpt-image-2.

## Setup (once)

```bash
cd scripts/svg-slides && npm install     # @resvg/resvg-js
```

## Files

- `slide-kit.js` — shared library: brand palette, `header()`, `decor()`, `head()`,
  `panel()`, `banner()`, a large `ic()` icon set, `image()` for composites, and
  `render(svg, outPath)`. Set the module pill with `kit.cfg.pill = 'MODULE 4 OF 7'`.
- `examples/` — the actual generators used for Modules 1–3 (self-contained,
  runnable references):
  - `module1-s4-s7.js` — M-KOPA table + Waste stat tiles
  - `module2.js` — pentagon, temple, actor tree, JPG wheel, composite S6
  - `module3.js` — target rings, VPC, workflow, VS, composites S7/S8

## Run a generator directly

```bash
node scripts/svg-slides/examples/module3.js output/2026-07-21-m3-slides
```

## Wire into a module

Name it `modules/<mod>/slides-svg.js`; `build-module.sh` runs it automatically
after the gpt pass, overwriting the data slides. See `../../modules/README.md` §4.

`node_modules/` here is gitignored — run `npm install` after a fresh clone.
