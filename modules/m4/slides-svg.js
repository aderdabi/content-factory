// Module 4 exact-SVG slides (data-heavy) + composites over gpt illustrations.
// Run by build-module.sh after the gpt pass:  node slides-svg.js <slides-dir>
const kit = require('../../scripts/svg-slides/slide-kit.js');
kit.cfg.pill = 'MODULE 4 OF 7';
const { C, F, esc } = kit;

// M4-specific icons; fall back to the shared kit for the rest.
function ic(t, cx, cy, c) {
  c = c || C.med;
  const s = `stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  switch (t) {
    case 'bus': return `<rect x="${cx-16}" y="${cy-11}" width="32" height="20" rx="3" ${s}/><line x1="${cx-16}" y1="${cy-2}" x2="${cx+16}" y2="${cy-2}" ${s}/><circle cx="${cx-9}" cy="${cy+11}" r="3" ${s}/><circle cx="${cx+9}" cy="${cy+11}" r="3" ${s}/><line x1="${cx-9}" y1="${cy-11}" x2="${cx-9}" y2="${cy-2}" ${s}/><line x1="${cx+1}" y1="${cy-11}" x2="${cx+1}" y2="${cy-2}" ${s}/>`;
    case 'moto': return `<circle cx="${cx-11}" cy="${cy+8}" r="6" ${s}/><circle cx="${cx+13}" cy="${cy+8}" r="6" ${s}/><path d="M${cx-11} ${cy+8} l6 -12 h8 l4 6 M${cx-4} ${cy-4} h10" ${s}/>`;
    case 'id': return `<rect x="${cx-16}" y="${cy-12}" width="32" height="24" rx="3" ${s}/><circle cx="${cx-6}" cy="${cy-2}" r="4" ${s}/><line x1="${cx+2}" y1="${cy-5}" x2="${cx+11}" y2="${cy-5}" ${s}/><line x1="${cx+2}" y1="${cy+1}" x2="${cx+11}" y2="${cy+1}" ${s}/><line x1="${cx-12}" y1="${cy+7}" x2="${cx+11}" y2="${cy+7}" ${s}/>`;
    case 'heart': return `<path d="M${cx} ${cy+12} C ${cx-18} ${cy-2}, ${cx-13} ${cy-15}, ${cx} ${cy-6} C ${cx+13} ${cy-15}, ${cx+18} ${cy-2}, ${cx} ${cy+12} Z" ${s}/>`;
    case 'basket': return `<path d="M${cx-15} ${cy-2} h30 l-4 16 h-22 z" ${s}/><path d="M${cx-9} ${cy-2} a9 9 0 0 1 18 0" ${s}/><line x1="${cx-6}" y1="${cy+2}" x2="${cx-4}" y2="${cy+14}" ${s}/><line x1="${cx+6}" y1="${cy+2}" x2="${cx+4}" y2="${cy+14}" ${s}/>`;
    case 'radio': return `<rect x="${cx-16}" y="${cy-6}" width="32" height="20" rx="3" ${s}/><circle cx="${cx+7}" cy="${cy+4}" r="5" ${s}/><line x1="${cx-11}" y1="${cy+1}" x2="${cx-3}" y2="${cy+1}" ${s}/><line x1="${cx-4}" y1="${cy-6}" x2="${cx+6}" y2="${cy-16}" ${s}/><circle cx="${cx+7}" cy="${cy-16}" r="2" fill="${c}"/>`;
    case 'box': return `<path d="M${cx-16} ${cy-6} l16 -8 l16 8 l-16 8 z" ${s}/><path d="M${cx-16} ${cy-6} v12 l16 8 v-12 M${cx+16} ${cy-6} v12 l-16 8" ${s}/>`;
    case 'leaf': return `<path d="M${cx-12} ${cy+12} C ${cx-12} ${cy-8}, ${cx+2} ${cy-14}, ${cx+14} ${cy-14} C ${cx+14} ${cy+6}, ${cx} ${cy+12}, ${cx-12} ${cy+12} Z" ${s}/><line x1="${cx-8}" y1="${cy+8}" x2="${cx+10}" y2="${cy-10}" ${s}/>`;
    case 'calc': return `<rect x="${cx-13}" y="${cy-16}" width="26" height="32" rx="3" ${s}/><rect x="${cx-9}" y="${cy-12}" width="18" height="7" rx="1" ${s}/><g fill="${c}">${[-6,0,6].map(dx=>[2,9].map(dy=>`<circle cx="${cx+dx}" cy="${cy+dy}" r="1.6"/>`).join('')).join('')}</g>`;
    case 'grid': return `<rect x="${cx-14}" y="${cy-14}" width="28" height="28" rx="2" ${s}/><line x1="${cx}" y1="${cy-14}" x2="${cx}" y2="${cy+14}" ${s}/><line x1="${cx-14}" y1="${cy}" x2="${cx+14}" y2="${cy}" ${s}/>`;
    case 'chess': return `<path d="M${cx-8} ${cy+14} h16 l-2 -6 h-12 z" ${s}/><path d="M${cx-6} ${cy+8} h12 l-2 -10 h-8 z" ${s}/><path d="M${cx-7} ${cy-6} a7 5 0 0 0 14 0" ${s}/><circle cx="${cx}" cy="${cy-10}" r="4" ${s}/>`;
    case 'signal': return `<line x1="${cx-12}" y1="${cy+10}" x2="${cx-12}" y2="${cy+4}" ${s}/><line x1="${cx-4}" y1="${cy+10}" x2="${cx-4}" y2="${cy-2}" ${s}/><line x1="${cx+4}" y1="${cy+10}" x2="${cx+4}" y2="${cy-8}" ${s}/><line x1="${cx+12}" y1="${cy+10}" x2="${cx+12}" y2="${cy-14}" ${s}/>`;
    case 'foot': return `<ellipse cx="${cx-3}" cy="${cy+5}" rx="7" ry="10" ${s}/><circle cx="${cx+7}" cy="${cy-7}" r="2.4" ${s}/><circle cx="${cx+9}" cy="${cy-1}" r="2.4" ${s}/><circle cx="${cx+8}" cy="${cy+5}" r="2.4" ${s}/>`;
    default: return kit.ic(t, cx, cy, c);
  }
}

const svgWrap = inner => `<svg xmlns="http://www.w3.org/2000/svg" width="${kit.W}" height="${kit.H}" viewBox="0 0 ${kit.W} ${kit.H}"><rect width="${kit.W}" height="${kit.H}" fill="${C.cream}"/>${inner}</svg>`;

// S2 — Big Fish, Small Pond (composite: gpt fish + SVG panel)
function s2(dir) {
  const img = kit.fs.readFileSync(`${dir}/m4-s02.png`).toString('base64');
  const rows = [['moto','Ampersand:',"one city's riders first"],['bus','BasiGo:',"Nairobi's existing operators"],['lamp','Easy Solar:','the market giants ignored']];
  let pnl = kit.panel(850,235,650,470) + kit.ptitle(890,295,'THE DISCIPLINE IN ACTION');
  rows.forEach((r,i)=>{const y=375+i*100;pnl+=kit.circleIco(895,y,28)+ic(r[0],895,y)+`<text x="945" y="${y-4}" font-family="${F}" font-size="23" font-weight="800" fill="${C.dark}">${esc(r[1])}</text><text x="945" y="${y+22}" font-family="${F}" font-size="21" fill="${C.ink}">${esc(r[2])}</text>`;});
  return svgWrap(`${kit.decor()}${kit.image(img,{id:'s2',x:0,y:210,w:790,h:600})}${kit.header()}${kit.head('BIG FISH, SMALL POND')}${pnl}${kit.banner(820,[{t:'DOMINATE',c:'g'},{t:' THE POND. THEN JUMP.'}])}`);
}

// S3 — Nine questions grid
function s3() {
  const q=[['1','Well-funded?','coin',0],['2','Accessible?','signal',0],['3','Reason to buy now?','bang',0],['4','Complete product?','box',0],['5','Incumbents?','crown',0],['6','Springboard?','path',0],['7','Your passion?','heart',0],['8','Social impact?','leaf',1],['9','Footprint cut?','foot',1]];
  const cols=[100,560,1020], rows=[232,357,482], cw=420, ch=112;
  let g='';
  q.forEach((c,i)=>{const x=cols[i%3], y=rows[Math.floor(i/3)];
    g+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="14" fill="${c[3]?'#E9EFDD':C.panel}" stroke="${C.sage}" stroke-width="2"/>`;
    g+=kit.circleIco(x+48,y+ch/2,25)+ic(c[2],x+48,y+ch/2);
    g+=`<text x="${x+86}" y="${y+ch/2+10}" font-family="${F}" font-size="30" font-weight="800" fill="${C.med}">${c[0]}</text>`;
    g+=`<text x="${x+124}" y="${y+ch/2+8}" font-family="${F}" font-size="22" font-weight="700" fill="${C.dark}">${esc(c[1])}</text>`;});
  const chip=`<rect x="100" y="628" width="1340" height="52" rx="26" fill="${C.pale}"/><text x="130" y="661" font-family="${F}" font-size="21" font-weight="700" fill="${C.dark}">Well-funded = the money <tspan fill="${C.med}">ALREADY flows</tspan>: $17B on kerosene, 3L of petrol a day</text>`;
  return kit.frame(kit.head('NINE QUESTIONS, NO SHORTCUTS')+g+chip+kit.banner(800,[{t:'SCORE EVERY SEGMENT WITH '},{t:'EVIDENCE',c:'g'},{t:', NOT GUT FEEL.'}]));
}

// S4 — Meet Amina (composite: gpt portrait clipped to a circle + 4 quadrants)
function s4(dir) {
  const img = kit.fs.readFileSync(`${dir}/m4-s04.png`).toString('base64');
  const pcx=836, pcy=490, pr=150;
  const portrait=`<defs><clipPath id="pc"><circle cx="${pcx}" cy="${pcy}" r="${pr}"/></clipPath></defs>
   <image href="data:image/png;base64,${img}" x="0" y="0" width="${kit.W}" height="${kit.H}" clip-path="url(#pc)"/>
   <circle cx="${pcx}" cy="${pcy}" r="${pr}" fill="none" stroke="${C.med}" stroke-width="4"/>`;
  const quad=(x,y,title,icon,l1,l2)=>kit.panel(x,y,430,185)+kit.circleIco(x+44,y+40,24)+ic(icon,x+44,y+40)+`<text x="${x+82}" y="${y+48}" font-family="${F}" font-size="20" font-weight="800" fill="${C.med}">${esc(title)}</text><text x="${x+30}" y="${y+100}" font-family="${F}" font-size="19" fill="${C.ink}">${esc(l1)}</text><text x="${x+30}" y="${y+132}" font-family="${F}" font-size="19" fill="${C.ink}">${esc(l2)}</text>`;
  const quads=quad(100,262,'DEMOGRAPHICS','id','38, farms 1.5 acres','~$150 a month, spikes at harvest')
    +quad(1140,262,'MOTIVATIONS','heart','School fees','Respected commercial farmer')
    +quad(100,500,'PROXY PRODUCTS','basket','Seed, fertiliser, airtime','Pays via M-Pesa, saves weekly')
    +quad(1140,500,'WATERING HOLES','radio','Vernacular radio, WhatsApp','Agro-dealer, cooperative meeting');
  return svgWrap(`${kit.decor()}${kit.header()}${kit.head('MEET AMINA','Your beachhead is a person, not a segment')}${portrait}${quads}${kit.banner(800,[{t:'WOULD '},{t:'AMINA',c:'g'},{t:' BUY THIS?'}])}`);
}

// S5 — B2B buying centre
function s5() {
  const bx=440, by=490;
  const roles=[['DIRECTORS','risk',-90],['INVESTORS','cost per km',0],['DRIVERS','reliability',90],['REGULATORS','control',180]];
  let dia=kit.circleIco(bx,by,50)+ic('bus',bx,by);
  roles.forEach(r=>{const a=Math.PI*r[2]/180;const x=bx+Math.cos(a)*185, y=by+Math.sin(a)*185;
    dia+=`<line x1="${(bx+Math.cos(a)*58).toFixed(0)}" y1="${(by+Math.sin(a)*58).toFixed(0)}" x2="${(x-Math.cos(a)*40).toFixed(0)}" y2="${(y-Math.sin(a)*40).toFixed(0)}" stroke="${C.sage}" stroke-width="2"/>`;
    dia+=kit.circleIco(x,y,32)+ic('people',x,y);
    dia+=`<text x="${x}" y="${y+54}" font-family="${F}" font-size="19" font-weight="800" fill="${C.dark}" text-anchor="middle">${r[0]}</text><text x="${x}" y="${y+76}" font-family="${F}" font-size="18" fill="${C.terra}" text-anchor="middle">${esc(r[1])}</text>`;});
  const p=kit.panel(1030,300,530,410)+kit.ptitle(1065,355,"BASIGO'S ANSWER")
    +kit.circleIco(1080,430,28)+ic('bus',1080,430)+`<text x="1125" y="424" font-family="${F}" font-size="21" font-weight="700" fill="${C.dark}">Bus without battery</text><text x="1125" y="451" font-family="${F}" font-size="23" font-weight="800" fill="${C.med}">~$35,600</text>`
    +kit.circleIco(1080,530,28)+ic('battery',1080,530)+`<text x="1125" y="524" font-family="${F}" font-size="21" font-weight="700" fill="${C.dark}">Battery leased: ~$0.16/km</text><text x="1125" y="551" font-family="${F}" font-size="18" fill="${C.ink}">charging + maintenance included</text>`
    +`<rect x="1065" y="612" width="380" height="46" rx="23" fill="${C.pale}"/><text x="1085" y="641" font-family="${F}" font-size="19" font-weight="700" fill="${C.dark}">500 paid deposits waiting</text>`;
  return kit.frame(kit.head('B2B MEANS PERSONAS, PLURAL')+dia+p+kit.banner(800,[{t:'TRANSLATE RISK INTO '},{t:'THE UNIT THE BUYER THINKS IN',c:'g'},{t:'.'}]));
}

// S6 — TAM/SAM/SOM + staircase
function s6() {
  const cx=420, cy=490, R=[210,158,106,56];
  let rings=`<circle cx="${cx}" cy="${cy}" r="${R[0]}" fill="#EFF1E4" stroke="${C.sage}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${R[1]}" fill="#E6EBD6" stroke="${C.sage}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${R[2]}" fill="#DAE2C4" stroke="${C.sage}" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${R[3]}" fill="${C.med}"/>`;
  [['TAM',cy-R[0]+30],['SAM',cy-R[1]+28],['SOM',cy-R[2]+26]].forEach(l=>rings+=`<text x="${cx}" y="${l[1]}" font-family="${F}" font-size="22" font-weight="800" fill="${C.dark}" text-anchor="middle">${l[0]}</text>`);
  rings+=`<text x="${cx}" y="${cy-2}" font-family="${F}" font-size="13" font-weight="800" fill="${C.cream}" text-anchor="middle">EARLY-</text><text x="${cx}" y="${cy+14}" font-family="${F}" font-size="13" font-weight="800" fill="${C.cream}" text-anchor="middle">VANGELISTS</text>`;
  const steps=[['$360K','400 riders you can name'],['$2.7M','10 more stations'],['$27M','three cities'],['Billions','3M moto-taxis']];
  let st='';const sx=790, sy=700, sw=175, sh=68;
  steps.forEach((sT,i)=>{const x=sx+i*sw, h=(i+1)*sh, y=sy-h;
    st+=`<rect x="${x}" y="${y}" width="${sw}" height="${h}" fill="${i===3?C.med:C.panel}" stroke="${C.sage}" stroke-width="2"/>`;
    st+=`<text x="${x+sw/2}" y="${y+40}" font-family="${F}" font-size="26" font-weight="800" fill="${i===3?C.cream:C.med}" text-anchor="middle">${esc(sT[0])}</text>`;
    st+=`<text x="${x+sw/2}" y="${y-8}" font-family="${F}" font-size="15" fill="${C.ink}" text-anchor="middle">${esc(sT[1])}</text>`;});
  return kit.frame(kit.head('SIZE IT FROM THE BOTTOM UP')+rings+st+kit.banner(800,[{t:'TOP-DOWN FLATTERS. '},{t:'BOTTOM-UP',c:'g'},{t:' CONVINCES.'}]));
}

// S7 — value-based sizing
function s7() {
  const big=`<text x="620" y="322" font-family="${F}" font-size="66" font-weight="800" fill="${C.med}" text-anchor="middle">$17 BILLION A YEAR</text><text x="620" y="364" font-family="${F}" font-size="22" font-style="italic" fill="${C.ink}" text-anchor="middle">already spent on bad energy, in daily coins</text>`;
  let illo=kit.circleIco(380,480,44)+ic('lamp',380,480,C.terra)
    +`<path d="M432 470 q120 -55 236 0" fill="none" stroke="${C.med}" stroke-width="2.5" stroke-dasharray="2 9"/>`;
  [0.25,0.5,0.75].forEach(t=>{const x=432+236*t, y=470-55*Math.sin(Math.PI*t); illo+=ic('coin',x,y-8);});
  illo+=kit.circleIco(700,480,44)+ic('solarp',700,480);
  const chips=[['Sun King: ~50M people',210],['d.light: ~200M lives',610],['M-KOPA: 7M customers',1010]];
  let cr='';chips.forEach(c=>{const w=c[0].length*11+46;cr+=`<rect x="${c[1]}" y="596" width="${w}" height="48" rx="24" fill="${C.panel}" stroke="${C.sage}" stroke-width="2"/><text x="${c[1]+w/2}" y="627" font-family="${F}" font-size="19" font-weight="700" fill="${C.dark}" text-anchor="middle">${esc(c[0])}</text>`;});
  return kit.frame(kit.head("THE MARKET THAT WASN'T IN ANY REPORT")+big+illo+cr+kit.banner(800,[{t:'PRICE THE IMPROVEMENT. COUNT WHO WOULD PAY. THAT IS THE MARKET.'}]));
}

// S8 — Ocean of opportunities (2x2)
function s8() {
  const x0=170, y0=252, S=486, cx=x0+S/2, cy=y0+S/2;
  let m=`<rect x="${x0}" y="${y0}" width="${S}" height="${S}" rx="12" fill="#E6EEEC" stroke="${C.sage}" stroke-width="2"/>
   <line x1="${cx}" y1="${y0}" x2="${cx}" y2="${y0+S}" stroke="${C.sage}" stroke-width="1.5"/><line x1="${x0}" y1="${cy}" x2="${x0+S}" y2="${cy}" stroke="${C.sage}" stroke-width="1.5"/>
   <text x="${x0-24}" y="${cy+6}" font-family="${F}" font-size="19" font-weight="800" fill="${C.med}" text-anchor="middle" transform="rotate(-90 ${x0-24} ${cy})">FOSSIL</text>
   <text x="${x0+S+24}" y="${cy+6}" font-family="${F}" font-size="19" font-weight="800" fill="${C.med}" text-anchor="middle" transform="rotate(90 ${x0+S+24} ${cy})">ELECTRIC</text>
   <text x="${cx}" y="${y0-14}" font-family="${F}" font-size="19" font-weight="800" fill="${C.med}" text-anchor="middle">PAY-PER-USE</text>
   <text x="${cx}" y="${y0+S+30}" font-family="${F}" font-size="19" font-weight="800" fill="${C.med}" text-anchor="middle">OWNED</text>`;
  const dot=(x,y,t)=>`<circle cx="${x}" cy="${y}" r="4" fill="${C.dark}"/><text x="${x+14}" y="${y+6}" font-family="${F}" font-size="19" fill="${C.ink}">${esc(t)}</text>`;
  m+=dot(x0+34,cy+70,'Petrol motos')+dot(x0+34,cy+112,'Matatus')+dot(x0+34,cy+154,'Fuel stations');
  m+=dot(cx+34,y0+64,'E-motos + swaps')+dot(cx+34,y0+106,'E-buses on lease');
  m+=`<circle cx="${cx+S/4}" cy="${cy+S/4-10}" r="46" fill="none" stroke="${C.terra}" stroke-width="2.5" stroke-dasharray="4 6"/><text x="${cx+S/4}" y="${cy+S/4-5}" font-family="${F}" font-size="16" font-weight="800" fill="${C.terra}" text-anchor="middle">OPPORTUNITY?</text>`;
  return kit.frame(kit.head('FIND THE EMPTY CELLS')+m+kit.banner(800,[{t:'EMPTY CELLS ARE CANDIDATE '},{t:'BLUE OCEANS',c:'g'},{t:'.'}]));
}

// S9 — Assignment
function s9() {
  const rows=[['clipboard','1. Score both segments on all 9 questions, declare your beachhead'],['id','2. Build the persona, or map the full buying centre'],['calc','3. Size the market 3 ways, show every assumption'],['grid','4. Draw one ocean map with 8+ real solutions']];
  let list=kit.panel(180,260,1320,470);
  rows.forEach((r,i)=>{const y=340+i*106;list+=kit.circleIco(270,y,30)+ic(r[0],270,y);const num=r[1].slice(0,2),rest=r[1].slice(2);
    list+=`<text x="330" y="${y+9}" font-family="${F}" font-size="26" fill="${C.ink}"><tspan font-weight="800" fill="${C.med}">${num}</tspan><tspan font-weight="600">${esc(rest)}</tspan></text>`;
    if(i<rows.length-1)list+=`<line x1="240" y1="${y+53}" x2="1440" y2="${y+53}" stroke="${C.div}" stroke-width="1.5"/>`;});
  const foot=`<line x1="0" y1="835" x2="${kit.W}" y2="835" stroke="${C.sage}" stroke-width="1.5"/>${kit.circleIco(150,882,26)}${ic('target',150,882)}<text x="190" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Artefact #4</text><text x="190" y="901" font-family="${F}" font-size="18" fill="${C.ink}">of your Venture Workbook</text><path d="M560 882 h40 m-10 -7 l10 7 l-10 7" fill="none" stroke="${C.med}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>${kit.circleIco(690,882,26)}${ic('chess',690,882)}<text x="730" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Next:</text><text x="730" y="901" font-family="${F}" font-size="18" fill="${C.ink}">the real competition</text>`;
  return kit.frame(kit.head('YOUR ASSIGNMENT')+list+foot);
}

const dir = process.argv[2];
const M = process.env.MODULE || 'm4';
// ONLY=07,08 re-renders just those slides (composites s02/s04 read the gpt
// illustration, so don't re-run them once composited unless the source is intact).
const only = (process.env.ONLY || '').split(',').filter(Boolean);
const want = n => only.length === 0 || only.includes(n);
const slides = { '02': () => s2(dir), '03': s3, '04': () => s4(dir), '05': s5, '06': s6, '07': s7, '08': s8, '09': s9 };
for (const [n, fn] of Object.entries(slides)) {
  if (want(n)) kit.render(fn(), `${dir}/${M}-s${n}.png`);
}
