// Renders M1-S4 (M-KOPA) and M1-S7 (Waste) as brand-styled SVG -> PNG.
// Numbers are hard-coded and exact (no model hallucination).
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

const W = 1672, H = 941;
const CREAM = '#F2F1E8';
const DARK = '#1B3A26';     // dark forest green
const MED = '#5E7D3A';      // medium green
const INK = '#26331F';      // near-black green text
const GREY = '#8A8F82';
const PANEL = '#FBFBF6';
const SAGE = '#C9D3B4';     // panel border
const PALE = '#E4EACF';     // pale sage circle
const DIV = '#DBE0C8';
const BANNER = '#EBEEDD';
const FONT = 'Helvetica, Arial, sans-serif';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function header() {
  return `
  <!-- brand block -->
  <circle cx="92" cy="92" r="36" fill="none" stroke="${MED}" stroke-width="3"/>
  <path d="M92 72 C 80 82, 80 104, 92 114 C 104 104, 104 82, 92 72 Z" fill="none" stroke="${MED}" stroke-width="2.5"/>
  <line x1="92" y1="72" x2="92" y2="118" stroke="${MED}" stroke-width="2.5"/>
  <line x1="134" y1="58" x2="134" y2="132" stroke="${DARK}" stroke-width="2"/>
  <text x="150" y="79" font-family="${FONT}" font-size="20" font-weight="700" fill="${GREY}" letter-spacing="1.5">SUSTAINABLE</text>
  <text x="150" y="105" font-family="${FONT}" font-size="20" font-weight="800" fill="${DARK}" letter-spacing="1">BUSINESS</text>
  <text x="150" y="131" font-family="${FONT}" font-size="20" font-weight="800" fill="${DARK}" letter-spacing="1">MODELS</text>
  <!-- module pill -->
  <rect x="1452" y="58" width="168" height="44" rx="22" fill="${DARK}"/>
  <text x="1536" y="86" font-family="${FONT}" font-size="18" font-weight="700" fill="${CREAM}" text-anchor="middle" letter-spacing="1">MODULE 1 OF 7</text>`;
}

function decor() {
  // pale corner circle + simple leaf sprig on the right edge
  return `
  <circle cx="1740" cy="500" r="250" fill="${PALE}" opacity="0.65"/>
  <g stroke="${MED}" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M1636 300 C 1648 460, 1636 640, 1600 800"/>
  </g>
  <g fill="${MED}" opacity="0.9">
    <path d="M1636 360 C 1600 350, 1576 372, 1580 404 C 1616 412, 1640 392, 1636 360 Z"/>
    <path d="M1632 452 C 1668 442, 1692 466, 1686 498 C 1650 504, 1628 484, 1632 452 Z"/>
    <path d="M1626 548 C 1590 540, 1566 564, 1572 596 C 1608 602, 1630 580, 1626 548 Z"/>
    <path d="M1618 644 C 1654 636, 1678 660, 1670 692 C 1634 698, 1614 676, 1618 644 Z"/>
    <path d="M1606 738 C 1572 732, 1550 756, 1558 786 C 1592 790, 1612 768, 1606 738 Z"/>
  </g>`;
}

function headline(main, sub, cx) {
  let s = `<text x="${cx}" y="182" font-family="${FONT}" font-size="60" font-weight="800" fill="${DARK}" text-anchor="middle" letter-spacing="1">${esc(main)}</text>`;
  if (sub) s += `<text x="${cx}" y="226" font-family="${FONT}" font-size="26" font-style="italic" fill="${MED}" text-anchor="middle">${esc(sub)}</text>`;
  s += `<rect x="${cx - 55}" y="244" width="110" height="4" rx="2" fill="${MED}"/>`;
  return s;
}

function iconCircle(cx, cy, r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PALE}"/>`;
}
// small line icons drawn inside a ~ r=27 circle
function ico(type, cx, cy) {
  const s = `stroke="${MED}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  switch (type) {
    case 'wallet': return `<rect x="${cx-16}" y="${cy-12}" width="32" height="24" rx="4" ${s}/><path d="M${cx+4} ${cy-2} h10 v8 h-10 z" ${s}/>`;
    case 'calendar': return `<rect x="${cx-15}" y="${cy-13}" width="30" height="26" rx="3" ${s}/><line x1="${cx-15}" y1="${cy-4}" x2="${cx+15}" y2="${cy-4}" ${s}/><line x1="${cx-8}" y1="${cy-18}" x2="${cx-8}" y2="${cy-9}" ${s}/><line x1="${cx+8}" y1="${cy-18}" x2="${cx+8}" y2="${cy-9}" ${s}/>`;
    case 'people': return `<circle cx="${cx-8}" cy="${cy-6}" r="5" ${s}/><circle cx="${cx+8}" cy="${cy-6}" r="5" ${s}/><path d="M${cx-17} ${cy+12} c0-8 6-11 9-11 c3 0 9 3 9 11" ${s}/>`;
    case 'pin': return `<path d="M${cx} ${cy-15} c-8 0-13 6-13 13 c0 9 13 17 13 17 c0 0 13-8 13-17 c0-7-5-13-13-13 z" ${s}/><circle cx="${cx}" cy="${cy-2}" r="4.5" ${s}/>`;
    case 'coins': return `<ellipse cx="${cx}" cy="${cy+8}" rx="15" ry="5" ${s}/><ellipse cx="${cx}" cy="${cy}" rx="15" ry="5" ${s}/><ellipse cx="${cx}" cy="${cy-8}" rx="15" ry="5" ${s}/>`;
    case 'flag': return `<line x1="${cx-9}" y1="${cy-15}" x2="${cx-9}" y2="${cy+15}" ${s}/><path d="M${cx-9} ${cy-14} h20 l-6 7 l6 7 h-20 z" ${s}/>`;
    case 'brick': return `<rect x="${cx-16}" y="${cy-9}" width="32" height="18" rx="2" ${s}/><line x1="${cx}" y1="${cy-9}" x2="${cx}" y2="${cy+9}" ${s}/>`;
    case 'wall': return `<rect x="${cx-16}" y="${cy-12}" width="32" height="24" rx="2" ${s}/><line x1="${cx-16}" y1="${cy}" x2="${cx+16}" y2="${cy}" ${s}/><line x1="${cx}" y1="${cy-12}" x2="${cx}" y2="${cy}" ${s}/><line x1="${cx-8}" y1="${cy}" x2="${cx-8}" y2="${cy+12}" ${s}/><line x1="${cx+8}" y1="${cy}" x2="${cx+8}" y2="${cy+12}" ${s}/>`;
    case 'bang': return `<line x1="${cx}" y1="${cy-13}" x2="${cx}" y2="${cy+4}" stroke="${MED}" stroke-width="3.2" stroke-linecap="round"/><circle cx="${cx}" cy="${cy+13}" r="2.4" fill="${MED}"/>`;
    default: return '';
  }
}

function banner(y, segments) {
  // segments: [{t, green}]
  let x = 210;
  let tspans = segments.map(seg => `<tspan fill="${seg.green ? MED : INK}">${esc(seg.t)}</tspan>`).join('');
  return `
  <rect x="80" y="${y}" width="1482" height="88" rx="16" fill="${BANNER}" stroke="${SAGE}" stroke-width="2"/>
  <circle cx="150" cy="${y+44}" r="28" fill="none" stroke="${MED}" stroke-width="2.6"/>
  ${ico('bang', 150, y+44)}
  <text x="${x}" y="${y+54}" font-family="${FONT}" font-size="29" font-weight="700">${tspans}</text>`;
}

// ---------------- SLIDE 4: M-KOPA ----------------
function slide4() {
  const rows = [
    ['wallet', 'Deposit', '~$35'],
    ['calendar', 'Daily payment', '~$0.50'],
    ['people', 'Customers', '7 million'],
    ['pin', 'Countries', '5'],
    ['coins', 'Credit extended', '$1.6 billion+'],
    ['flag', 'First profit', 'After 13 years'],
  ];
  const px = 792, pw = 770, py = 280, ph = 470;
  const first = py + 55, step = (ph - 90) / 5;
  let table = '';
  rows.forEach((r, i) => {
    const cy = first + i * step;
    table += iconCircle(852, cy, 27) + ico(r[0], 852, cy);
    table += `<text x="908" y="${cy+8}" font-family="${FONT}" font-size="24" font-weight="600" fill="${INK}">${esc(r[1])}</text>`;
    table += `<text x="1528" y="${cy+9}" font-family="${FONT}" font-size="26" font-weight="700" fill="${DARK}" text-anchor="end">${esc(r[2])}</text>`;
    if (i < rows.length - 1) table += `<line x1="812" y1="${cy + step/2}" x2="1544" y2="${cy + step/2}" stroke="${DIV}" stroke-width="1.5"/>`;
  });

  // left illustration: sun, house w/ solar roof, phone w/ check
  const ill = `
  <g stroke="${MED}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="235" cy="380" r="24"/>
    ${[0,45,90,135,180,225,270,315].map(a=>{const r=Math.PI*a/180;const x1=235+Math.cos(r)*34,y1=380+Math.sin(r)*34,x2=235+Math.cos(r)*44,y2=380+Math.sin(r)*44;return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`}).join('')}
    <rect x="340" y="450" width="230" height="170" rx="4"/>
    <path d="M330 450 L455 380 L580 450 Z"/>
    <g><rect x="392" y="404" width="96" height="44" rx="2" transform="rotate(-8 440 426)"/>
       <line x1="416" y1="402" x2="410" y2="446" transform="rotate(-8 440 426)"/>
       <line x1="440" y1="402" x2="434" y2="446" transform="rotate(-8 440 426)"/>
       <line x1="464" y1="402" x2="458" y2="446" transform="rotate(-8 440 426)"/>
       <line x1="392" y1="426" x2="488" y2="426" transform="rotate(-8 440 426)"/></g>
    <rect x="430" y="540" width="50" height="80" rx="3"/>
    <rect x="360" y="500" width="44" height="40" rx="3"/>
    <rect x="150" y="500" width="110" height="200" rx="14"/>
    <line x1="150" y1="530" x2="260" y2="530"/>
    <circle cx="205" cy="620" r="26"/>
    <path d="M193 620 l9 9 l16 -18" />
  </g>
  <text x="420" y="712" font-family="${FONT}" font-size="20" font-weight="600" fill="${INK}" text-anchor="middle">Solar home system, repaid over mobile money</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  ${decor()}
  ${header()}
  ${headline('CASE STUDY: M-KOPA', 'The unit of sale is the unit of impact', 810)}
  <rect x="80" y="${280}" width="680" height="470" rx="18" fill="${PANEL}" stroke="${SAGE}" stroke-width="2"/>
  ${ill}
  <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="18" fill="${PANEL}" stroke="${SAGE}" stroke-width="2"/>
  ${table}
  ${banner(800, [
    {t:'EVERY PAYMENT = '}, {t:'REVENUE', green:true}, {t:' + '}, {t:'AVOIDED KEROSENE', green:true}, {t:' + '}, {t:'A CREDIT HISTORY', green:true}, {t:'.'}
  ])}
</svg>`;
}

// ---------------- SLIDE 7: WASTE ----------------
function slide7() {
  const tiles = [
    ['4%', ['of urban African', 'waste is recycled'], 300],
    ['80%', ['of a product’s impact', 'is fixed at design'], 780],
    ['×3', ['waste growth', 'expected by 2050'], 1260],
  ];
  let tileSvg = '';
  tiles.forEach(([num, caps, cx]) => {
    tileSvg += `<rect x="${cx-220}" y="268" width="440" height="238" rx="18" fill="${PANEL}" stroke="${SAGE}" stroke-width="2"/>`;
    tileSvg += `<text x="${cx}" y="388" font-family="${FONT}" font-size="88" font-weight="800" fill="${MED}" text-anchor="middle">${esc(num)}</text>`;
    tileSvg += `<text x="${cx}" y="446" font-family="${FONT}" font-size="22" font-weight="500" fill="${INK}" text-anchor="middle">${esc(caps[0])}</text>`;
    tileSvg += `<text x="${cx}" y="476" font-family="${FONT}" font-size="22" font-weight="500" fill="${INK}" text-anchor="middle">${esc(caps[1])}</text>`;
  });

  function card(x, title, icon, l1, l2) {
    const w = 700;
    return `
    <rect x="${x}" y="540" width="${w}" height="212" rx="18" fill="${PANEL}" stroke="${SAGE}" stroke-width="2"/>
    <text x="${x+40}" y="600" font-family="${FONT}" font-size="26" font-weight="800" fill="${DARK}" letter-spacing="0.5">${esc(title)}</text>
    ${iconCircle(x+w-56, 596, 27)}${ico(icon, x+w-56, 596)}
    <circle cx="${x+52}" cy="655" r="6" fill="${MED}"/><text x="${x+72}" y="663" font-family="${FONT}" font-size="24" font-weight="600" fill="${INK}">${esc(l1)}</text>
    <circle cx="${x+52}" cy="702" r="6" fill="${MED}"/><text x="${x+72}" y="710" font-family="${FONT}" font-size="24" font-weight="600" fill="${INK}">${esc(l2)}</text>`;
  }

  const banner7 = `
  <rect x="80" y="780" width="1400" height="86" rx="16" fill="${BANNER}" stroke="${SAGE}" stroke-width="2"/>
  <text x="780" y="835" font-family="${FONT}" font-size="34" font-weight="800" text-anchor="middle"><tspan fill="${INK}">EVERY WASTE STREAM IS A </tspan><tspan fill="${MED}">BUSINESS PLAN</tspan><tspan fill="${INK}">.</tspan></text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  ${decor()}
  ${header()}
  ${headline('WASTE IS A DESIGN FLAW', null, 780)}
  ${tileSvg}
  ${card(80, 'GJENGE MAKERS, KENYA', 'brick', '7× stronger than concrete', 'Cheaper per square metre')}
  ${card(800, 'KUBIK, ETHIOPIA', 'wall', 'Walls from plastic waste', '40% cheaper than cement')}
  ${banner7}
</svg>`;
}

function render(svg, out) {
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: W }, font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' } });
  fs.writeFileSync(out, r.render().asPng());
  console.log('wrote', out);
}

const dir = process.argv[2];
render(slide4(), dir + '/m1-s4.png');
render(slide7(), dir + '/m1-s7.png');
