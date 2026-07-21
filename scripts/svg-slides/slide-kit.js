// slide-kit.js — shared helpers for building exact, on-brand course slides as
// SVG -> PNG. Use this for DATA-HEAVY slides (tables, stats, diagrams) where
// gpt-image-2 fabricates numbers. Illustrations stay on gpt-image-2.
//
// Author a module generator like examples/module3.js, then wire it into a
// module via build-module.sh's optional slides-svg.js hook.
//
// Requires @resvg/resvg-js:  cd scripts/svg-slides && npm install
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

const W = 1672, H = 941;
const C = {
  cream:'#F2F1E8', dark:'#1B3A26', med:'#5E7D3A', ink:'#26331F', grey:'#8A8F82',
  panel:'#FBFBF6', sage:'#C9D3B4', pale:'#E4EACF', div:'#DBE0C8', banner:'#EBEEDD', terra:'#B8543A',
};
const F = 'Helvetica, Arial, sans-serif';
// Set cfg.pill per module, e.g. cfg.pill = 'MODULE 4 OF 7'
const cfg = { pill: 'MODULE 1 OF 7', brand: ['SUSTAINABLE','BUSINESS','MODELS'] };

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function header() {
  const b = cfg.brand;
  return `
  <circle cx="92" cy="92" r="36" fill="none" stroke="${C.med}" stroke-width="3"/>
  <path d="M92 72 C 80 82,80 104,92 114 C 104 104,104 82,92 72 Z" fill="none" stroke="${C.med}" stroke-width="2.5"/>
  <line x1="92" y1="72" x2="92" y2="118" stroke="${C.med}" stroke-width="2.5"/>
  <line x1="134" y1="58" x2="134" y2="132" stroke="${C.dark}" stroke-width="2"/>
  <text x="150" y="79" font-family="${F}" font-size="20" font-weight="700" fill="${C.grey}" letter-spacing="1.5">${esc(b[0])}</text>
  <text x="150" y="105" font-family="${F}" font-size="20" font-weight="800" fill="${C.dark}" letter-spacing="1">${esc(b[1])}</text>
  <text x="150" y="131" font-family="${F}" font-size="20" font-weight="800" fill="${C.dark}" letter-spacing="1">${esc(b[2])}</text>
  <rect x="1452" y="58" width="168" height="44" rx="22" fill="${C.dark}"/>
  <text x="1536" y="86" font-family="${F}" font-size="18" font-weight="700" fill="${C.cream}" text-anchor="middle" letter-spacing="1">${esc(cfg.pill)}</text>`;
}

function decor() {
  return `
  <circle cx="1740" cy="500" r="250" fill="${C.pale}" opacity="0.6"/>
  <path d="M1636 300 C 1648 460,1636 640,1600 800" fill="none" stroke="${C.med}" stroke-width="3" stroke-linecap="round"/>
  <g fill="${C.med}" opacity="0.9">
   <path d="M1636 360 C 1600 350,1576 372,1580 404 C 1616 412,1640 392,1636 360 Z"/>
   <path d="M1632 452 C 1668 442,1692 466,1686 498 C 1650 504,1628 484,1632 452 Z"/>
   <path d="M1626 548 C 1590 540,1566 564,1572 596 C 1608 602,1630 580,1626 548 Z"/>
   <path d="M1618 644 C 1654 636,1678 660,1670 692 C 1634 698,1614 676,1618 644 Z"/>
   <path d="M1606 738 C 1572 732,1550 756,1558 786 C 1592 790,1612 768,1606 738 Z"/></g>`;
}

function head(main, sub, cx = 780) {
  let s = `<text x="${cx}" y="150" font-family="${F}" font-size="54" font-weight="800" fill="${C.dark}" text-anchor="middle" letter-spacing="1">${esc(main)}</text>`;
  if (sub) s += `<text x="${cx}" y="192" font-family="${F}" font-size="24" font-style="italic" fill="${C.med}" text-anchor="middle">${esc(sub)}</text>`;
  s += `<rect x="${cx-52}" y="${sub?205:168}" width="104" height="4" rx="2" fill="${C.med}"/>`;
  return s;
}
function circleIco(cx, cy, r) { return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.pale}"/>`; }
function panel(x, y, w, h) { return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${C.panel}" stroke="${C.sage}" stroke-width="2"/>`; }
function ptitle(x, y, t) { return `<text x="${x}" y="${y}" font-family="${F}" font-size="24" font-weight="800" fill="${C.med}" letter-spacing="0.5">${esc(t)}</text>`; }

// banner segments: [{t, c}] where c = 'g' (green) | 't' (terracotta) | undefined (ink)
function banner(y, segs, w = 1482) {
  const t = segs.map(g => `<tspan fill="${g.c==='t'?C.terra:(g.c==='g'?C.med:C.ink)}">${esc(g.t)}</tspan>`).join('');
  return `<rect x="80" y="${y}" width="${w}" height="86" rx="16" fill="${C.banner}" stroke="${C.sage}" stroke-width="2"/>
  <circle cx="150" cy="${y+43}" r="27" fill="none" stroke="${C.med}" stroke-width="2.6"/>${ic('bang',150,y+43)}
  <text x="210" y="${y+53}" font-family="${F}" font-size="28" font-weight="700">${t}</text>`;
}

function frame(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${C.cream}"/>${decor()}${header()}${inner}</svg>`;
}

// Thin-line icons drawn to fit ~ r=27 sage circle. color defaults to med.
function ic(t, cx, cy, c) {
  c = c || C.med;
  const s = `stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  switch (t) {
    case 'bang': return `<line x1="${cx}" y1="${cy-13}" x2="${cx}" y2="${cy+4}" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/><circle cx="${cx}" cy="${cy+13}" r="2.4" fill="${c}"/>`;
    case 'check': return `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${C.med}" stroke-width="2.4"/><path d="M${cx-7} ${cy} l5 6 l9 -11" stroke="${C.med}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    case 'cross': return `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${C.terra}" stroke-width="2.4"/><path d="M${cx-6} ${cy-6} l12 12 M${cx+6} ${cy-6} l-12 12" stroke="${C.terra}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    case 'clipboard': return `<rect x="${cx-14}" y="${cy-16}" width="28" height="32" rx="3" ${s}/><rect x="${cx-6}" y="${cy-20}" width="12" height="8" rx="2" ${s}/><line x1="${cx-8}" y1="${cy-6}" x2="${cx+8}" y2="${cy-6}" ${s}/><line x1="${cx-8}" y1="${cy+2}" x2="${cx+8}" y2="${cy+2}" ${s}/><line x1="${cx-8}" y1="${cy+10}" x2="${cx+4}" y2="${cy+10}" ${s}/>`;
    case 'people': return `<circle cx="${cx-8}" cy="${cy-6}" r="5" ${s}/><circle cx="${cx+8}" cy="${cy-6}" r="5" ${s}/><path d="M${cx-17} ${cy+12} c0-8 6-11 9-11 c3 0 9 3 9 11" ${s}/>`;
    case 'group': return `<circle cx="${cx-11}" cy="${cy-4}" r="5" ${s}/><circle cx="${cx+11}" cy="${cy-4}" r="5" ${s}/><circle cx="${cx}" cy="${cy-7}" r="5.5" ${s}/><path d="M${cx-20} ${cy+13} c0-7 5-9 9-9 M${cx+20} ${cy+13} c0-7 -5-9 -9-9 M${cx-9} ${cy+13} c0-8 5-10 9-10 c4 0 9 2 9 10" ${s}/>`;
    case 'coin': return `<circle cx="${cx}" cy="${cy}" r="15" ${s}/><text x="${cx}" y="${cy+7}" font-family="${F}" font-size="20" font-weight="700" fill="${c}" text-anchor="middle">$</text>`;
    case 'coins': return `<ellipse cx="${cx}" cy="${cy+8}" rx="15" ry="5" ${s}/><ellipse cx="${cx}" cy="${cy}" rx="15" ry="5" ${s}/><ellipse cx="${cx}" cy="${cy-8}" rx="15" ry="5" ${s}/>`;
    case 'flag': return `<line x1="${cx-9}" y1="${cy-15}" x2="${cx-9}" y2="${cy+15}" ${s}/><path d="M${cx-9} ${cy-14} h20 l-6 7 l6 7 h-20 z" ${s}/>`;
    case 'pentagon': return `<path d="M${cx} ${cy-16} l15 11 l-6 18 h-18 l-6 -18 z" ${s}/>`;
    case 'phone': return `<rect x="${cx-9}" y="${cy-16}" width="18" height="32" rx="3" ${s}/><line x1="${cx-4}" y1="${cy-12}" x2="${cx+4}" y2="${cy-12}" ${s}/><circle cx="${cx}" cy="${cy+11}" r="1.6" fill="${c}"/>`;
    case 'drop': return `<path d="M${cx} ${cy-15} c 8 10 12 15 12 22 a12 12 0 0 1 -24 0 c 0 -7 4 -12 12 -22 z" ${s}/>`;
    case 'hands': return `<path d="M${cx-17} ${cy+2} l8 -6 l6 4 l6 -4 l8 6" ${s}/><path d="M${cx-17} ${cy+2} l-2 7 M${cx+17} ${cy+2} l2 7" ${s}/>`;
    case 'tag': return `<path d="M${cx-14} ${cy-14} h14 l14 14 l-14 14 l-14 -14 z" ${s}/><circle cx="${cx-6}" cy="${cy-6}" r="2.5" fill="${c}"/>`;
    case 'cal': return `<rect x="${cx-15}" y="${cy-13}" width="30" height="26" rx="3" ${s}/><line x1="${cx-15}" y1="${cy-4}" x2="${cx+15}" y2="${cy-4}" ${s}/><line x1="${cx-8}" y1="${cy-18}" x2="${cx-8}" y2="${cy-9}" ${s}/><line x1="${cx+8}" y1="${cy-18}" x2="${cx+8}" y2="${cy-9}" ${s}/>`;
    case 'sun': return `<circle cx="${cx}" cy="${cy}" r="8" ${s}/><g ${s}>${[0,45,90,135,180,225,270,315].map(a=>{const r=Math.PI*a/180;return `<line x1="${(cx+Math.cos(r)*12).toFixed(1)}" y1="${(cy+Math.sin(r)*12).toFixed(1)}" x2="${(cx+Math.cos(r)*17).toFixed(1)}" y2="${(cy+Math.sin(r)*17).toFixed(1)}"/>`}).join('')}</g>`;
    case 'sunrise': return `<line x1="${cx-18}" y1="${cy+10}" x2="${cx+18}" y2="${cy+10}" ${s}/><path d="M${cx-11} ${cy+10} a11 11 0 0 1 22 0" ${s}/><line x1="${cx}" y1="${cy-14}" x2="${cx}" y2="${cy-6}" ${s}/><line x1="${cx-15}" y1="${cy-6}" x2="${cx-11}" y2="${cy-2}" ${s}/><line x1="${cx+15}" y1="${cy-6}" x2="${cx+11}" y2="${cy-2}" ${s}/>`;
    case 'storm': return `<path d="M${cx-16} ${cy} a9 9 0 0 1 3 -17 a11 11 0 0 1 21 -2 a8 8 0 0 1 -1 19 z" ${s}/><path d="M${cx-2} ${cy+2} l-6 8 h6 l-4 8" ${s}/>`;
    case 'gift': return `<rect x="${cx-15}" y="${cy-4}" width="30" height="20" rx="2" ${s}/><rect x="${cx-17}" y="${cy-12}" width="34" height="8" rx="2" ${s}/><line x1="${cx}" y1="${cy-12}" x2="${cx}" y2="${cy+16}" ${s}/><path d="M${cx} ${cy-12} c-8 -10 -16 -2 0 0 c8 -10 16 -2 0 0" ${s}/>`;
    case 'trash': return `<path d="M${cx-13} ${cy-8} h26 l-2 24 a3 3 0 0 1 -3 3 h-16 a3 3 0 0 1 -3 -3 z" ${s}/><line x1="${cx-16}" y1="${cy-8}" x2="${cx+16}" y2="${cy-8}" ${s}/><path d="M${cx-6} ${cy-8} v-4 h12 v4" ${s}/>`;
    case 'pricedown': return `<line x1="${cx}" y1="${cy-14}" x2="${cx}" y2="${cy+12}" ${s}/><path d="M${cx-9} ${cy+3} l9 10 l9 -10" ${s}/><text x="${cx}" y="${cy-4}" font-family="${F}" font-size="15" font-weight="700" fill="${c}" text-anchor="middle">$</text>`;
    case 'lamp': return `<path d="M${cx-8} ${cy-14} h16" ${s}/><path d="M${cx-9} ${cy-2} q0 -12 9 -12 q9 0 9 12 v14 h-18 z" ${s}/><line x1="${cx}" y1="${cy-18}" x2="${cx}" y2="${cy-14}" ${s}/>`;
    case 'fuel': return `<rect x="${cx-12}" y="${cy-12}" width="22" height="26" rx="2" ${s}/><path d="M${cx+10} ${cy-6} h6 v8" ${s}/><line x1="${cx-6}" y1="${cy-12}" x2="${cx-2}" y2="${cy-16}" ${s}/><line x1="${cx-8}" y1="${cy-4}" x2="${cx+4}" y2="${cy-4}" ${s}/>`;
    case 'sack': return `<path d="M${cx-12} ${cy-12} q12 6 24 0 l-2 22 a4 4 0 0 1 -4 4 h-12 a4 4 0 0 1 -4 -4 z" ${s}/><line x1="${cx-8}" y1="${cy-9}" x2="${cx+8}" y2="${cy-9}" ${s}/>`;
    case 'solarp': return `<rect x="${cx-16}" y="${cy-10}" width="32" height="20" rx="2" ${s}/><line x1="${cx-16}" y1="${cy}" x2="${cx+16}" y2="${cy}" ${s}/><line x1="${cx-5}" y1="${cy-10}" x2="${cx-5}" y2="${cy+10}" ${s}/><line x1="${cx+6}" y1="${cy-10}" x2="${cx+6}" y2="${cy+10}" ${s}/><line x1="${cx}" y1="${cy+10}" x2="${cx}" y2="${cy+15}" ${s}/>`;
    case 'battery': return `<rect x="${cx-15}" y="${cy-9}" width="28" height="18" rx="3" ${s}/><rect x="${cx+13}" y="${cy-4}" width="4" height="8" rx="1" ${s}/><path d="M${cx-2} ${cy-5} l-4 6 h6 l-4 6" ${s}/>`;
    case 'brick': return `<rect x="${cx-16}" y="${cy-9}" width="32" height="18" rx="2" ${s}/><line x1="${cx}" y1="${cy-9}" x2="${cx}" y2="${cy+9}" ${s}/>`;
    case 'wall': return `<rect x="${cx-16}" y="${cy-12}" width="32" height="24" rx="2" ${s}/><line x1="${cx-16}" y1="${cy}" x2="${cx+16}" y2="${cy}" ${s}/><line x1="${cx}" y1="${cy-12}" x2="${cx}" y2="${cy}" ${s}/><line x1="${cx-8}" y1="${cy}" x2="${cx-8}" y2="${cy+12}" ${s}/><line x1="${cx+8}" y1="${cy}" x2="${cx+8}" y2="${cy+12}" ${s}/>`;
    case 'scale': return `<line x1="${cx}" y1="${cy-15}" x2="${cx}" y2="${cy+13}" ${s}/><line x1="${cx-15}" y1="${cy-11}" x2="${cx+15}" y2="${cy-11}" ${s}/><path d="M${cx-15} ${cy-11} l-5 10 h10 z" ${s}/><path d="M${cx+15} ${cy-11} l-5 10 h10 z" ${s}/><line x1="${cx-8}" y1="${cy+13}" x2="${cx+8}" y2="${cy+13}" ${s}/>`;
    case 'target': return `<circle cx="${cx}" cy="${cy}" r="15" ${s}/><circle cx="${cx}" cy="${cy}" r="9" ${s}/><circle cx="${cx}" cy="${cy}" r="3" fill="${c}"/>`;
    case 'canvas': return `<rect x="${cx-16}" y="${cy-11}" width="20" height="22" rx="2" ${s}/><circle cx="${cx+8}" cy="${cy}" r="9" ${s}/>`;
    case 'path': return `<path d="M${cx-4} ${cy+15} q-14 -6 0 -14 q14 -8 0 -16" ${s}/><circle cx="${cx-4}" cy="${cy+15}" r="2" fill="${c}"/>`;
    case 'sauce': return `<path d="M${cx-2} ${cy-17} h4 v3 h-4 z" ${s}/><path d="M${cx-8} ${cy-11} h16 v4 l-2 4 v14 a3 3 0 0 1 -3 3 h-6 a3 3 0 0 1 -3 -3 v-14 l-2 -4 z" ${s}/><ellipse cx="${cx}" cy="${cy+3}" rx="4" ry="6" ${s}/>`;
    case 'crown': return `<path d="M${cx-15} ${cy+8} l-2 -18 l8 7 l6 -12 l6 12 l8 -7 l-2 18 z" ${s}/>`;
    case 'plus': return `<line x1="${cx-9}" y1="${cy}" x2="${cx+9}" y2="${cy}" stroke="${c}" stroke-width="3" stroke-linecap="round"/><line x1="${cx}" y1="${cy-9}" x2="${cx}" y2="${cy+9}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
    case 'building': return `<rect x="${cx-14}" y="${cy-14}" width="28" height="28" rx="2" ${s}/><line x1="${cx-6}" y1="${cy-14}" x2="${cx-6}" y2="${cy+14}" ${s}/><line x1="${cx+4}" y1="${cy-14}" x2="${cx+4}" y2="${cy+14}" ${s}/><line x1="${cx-14}" y1="${cy-4}" x2="${cx+14}" y2="${cy-4}" ${s}/>`;
    case 'tree': return `<circle cx="${cx}" cy="${cy-6}" r="12" ${s}/><line x1="${cx}" y1="${cy+4}" x2="${cx}" y2="${cy+16}" ${s}/><path d="M${cx} ${cy+16} l-8 4 M${cx} ${cy+16} l8 4" ${s}/>`;
    case 'mic': return `<rect x="${cx-6}" y="${cy-16}" width="12" height="22" rx="6" ${s}/><path d="M${cx-11} ${cy-2} a11 11 0 0 0 22 0" ${s}/><line x1="${cx}" y1="${cy+9}" x2="${cx}" y2="${cy+16}" ${s}/>`;
    default: return `<circle cx="${cx}" cy="${cy}" r="4" fill="${c}"/>`;
  }
}

// Embed a raster (e.g. a gpt illustration) clipped to a rect, for composites.
function image(b64, clip) {
  return `<defs><clipPath id="clip_${clip.id}"><rect x="${clip.x}" y="${clip.y}" width="${clip.w}" height="${clip.h}"/></clipPath></defs>
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="${W}" height="${H}" clip-path="url(#clip_${clip.id})"/>`;
}

function render(svg, out) {
  const r = new Resvg(svg, { fitTo: { mode:'width', value: W }, font: { loadSystemFonts:true, defaultFontFamily:'Helvetica' } });
  fs.writeFileSync(out, r.render().asPng());
  console.log('  svg ->', out);
}

module.exports = { W, H, C, F, cfg, esc, header, decor, head, circleIco, panel, ptitle, banner, frame, ic, image, render, fs };
