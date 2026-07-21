# Course module pipeline

Turn a folder of **slide prompts** + **voiceover scripts** into finished slides,
narrated audio, and a stitched video — with one command.

## 1. Create a module folder

Copy the template:

```bash
cp -r modules/_template modules/m4
```

Then fill it in:

```
modules/m4/
├── config.env          # MODULE=m4  REF=raw/brand-refs/slide1.png  [DATE=YYYY-MM-DD]
├── slides/             # one gpt-image-2 PROMPT per slide: 01-title.txt, 02-....txt, ...
├── voiceovers/         # one voiceover SCRIPT per slide:   01-title.txt, 02-....txt, ...
└── slides-svg.js       # OPTIONAL — overrides data slides with exact SVG (see §4)
```

- Name files with a leading number (`01-`, `02-`, …). Files are paired by sorted order:
  slide `01` ↔ voiceover `01`.
- `slides/` and `voiceovers/` must have the **same number of files**.

## 2. Build it

```bash
./scripts/build-module.sh modules/m4
```

This runs, in order:

1. **Slides** — each `slides/*.txt` prompt → gpt-image-2 → `output/<DATE>-m4-slides/m4-sNN.png`
2. **SVG override** (if `slides-svg.js` exists) — overwrites data slides with exact SVG
3. **Voiceovers** — each `voiceovers/*.txt` script → ElevenLabs → `output/<DATE>-m4-voiceovers/m4-vo-NN.mp3`
4. **Video** — stitched to `output/<DATE>-course-videos/m4-module.mp4`

Flags: `--slides-only`, `--vo-only`, `--no-video`, `--skip-slides`, `--skip-vo`.

Every paid call passes through `budget-check.sh` (Factory §4): gpt-image-2, ElevenLabs,
and Replicate are all tracked in `runs/cost-tracker.json`.

## 3. The gpt-image-2 caveat (important)

gpt-image-2 is excellent for **title slides and illustrations**, but it **fabricates
numbers and drops panels** on data-heavy slides (tables, stat tiles, multi-panel
diagrams). It also tends to revert the brand block to the reference slide's text.

**Rule of thumb:**
- **Illustration / title slides** → let gpt-image-2 do them (the prompt path above).
- **Data / diagram slides** → build them as exact SVG (§4). Numbers can't drift.

Always review gpt slides before shipping. Modules 1–3 needed most data slides rebuilt in SVG.

## 4. Exact SVG slides (data-heavy)

For slides that must be pixel-exact and numerically correct, write an SVG generator
using the shared kit at [`scripts/svg-slides/slide-kit.js`](../scripts/svg-slides/slide-kit.js).

Setup once:

```bash
cd scripts/svg-slides && npm install    # installs @resvg/resvg-js
```

Author `modules/m4/slides-svg.js` (see the worked examples in
`scripts/svg-slides/examples/module2.js` and `module3.js`). Pattern:

```js
const kit = require('../../scripts/svg-slides/slide-kit.js');
kit.cfg.pill = 'MODULE 4 OF 7';
const dir = process.argv[2];            // build-module passes the slides output dir
const MOD = process.env.MODULE || 'm4';

function s3() {                          // one function per data slide
  return kit.frame(
    kit.head('YOUR SECRET SAUCE', 'What can nobody copy in two years?') +
    /* ... tables/tiles/diagrams via kit.panel, kit.ic, kit.banner ... */ ''
  );
}
kit.render(s3(), `${dir}/${MOD}-s3.png`);   // overwrites the gpt slide 3
```

For **composites** (keep a gpt illustration, add a correct SVG panel), read the gpt
PNG, embed it with `kit.image(base64, {id, x, y, w, h})` clipped to the illustration
region, then draw your panel on top — see `module3.js` `s7()`/`s8()`.

`build-module.sh` runs `slides-svg.js` automatically after the gpt pass, so a single
`build-module.sh modules/m4` produces the full hybrid deck.
