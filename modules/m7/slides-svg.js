// Module 7 exact-SVG slides + S5 market-square composite.
const kit = require('../../scripts/svg-slides/slide-kit.js');
kit.cfg.pill = 'MODULE 7 OF 7';
const { C, F, esc } = kit;

function ic(t, cx, cy, c) {
  c = c || C.med;
  const s = `stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  switch (t) {
    case 'flatline': return `<polyline points="${cx-16},${cy+3} ${cx-4},${cy+2} ${cx+5},${cy} ${cx+16},${cy-1}" ${s}/><circle cx="${cx+16}" cy="${cy-1}" r="2.5" fill="${c}"/>`;
    case 'riseline': return `<polyline points="${cx-16},${cy+11} ${cx-4},${cy+3} ${cx+5},${cy-4} ${cx+14},${cy-13}" ${s}/><path d="M${cx+7} ${cy-13} h7 v7" ${s}/>`;
    case 'workbench': return `<line x1="${cx-16}" y1="${cy-6}" x2="${cx+16}" y2="${cy-6}" ${s}/><line x1="${cx-12}" y1="${cy-6}" x2="${cx-12}" y2="${cy+12}" ${s}/><line x1="${cx+12}" y1="${cy-6}" x2="${cx+12}" y2="${cy+12}" ${s}/><path d="M${cx-4} ${cy-14} l8 4 l-4 8 z" ${s}/>`;
    case 'gauge': return `<path d="M${cx-15} ${cy+8} a15 15 0 0 1 30 0" ${s}/><line x1="${cx}" y1="${cy+8}" x2="${cx+9}" y2="${cy-6}" ${s}/><circle cx="${cx}" cy="${cy+8}" r="2.5" fill="${c}"/>`;
    case 'notebook': return `<rect x="${cx-13}" y="${cy-15}" width="26" height="30" rx="3" ${s}/><line x1="${cx-13}" y1="${cy-15}" x2="${cx-13}" y2="${cy+15}" stroke="${c}" stroke-width="4"/><line x1="${cx-4}" y1="${cy-7}" x2="${cx+7}" y2="${cy-7}" ${s}/><line x1="${cx-4}" y1="${cy+1}" x2="${cx+7}" y2="${cy+1}" ${s}/>`;
    case 'leaf': return `<path d="M${cx-12} ${cy+12} C ${cx-12} ${cy-8}, ${cx+2} ${cy-14}, ${cx+14} ${cy-14} C ${cx+14} ${cy+6}, ${cx} ${cy+12}, ${cx-12} ${cy+12} Z" ${s}/><line x1="${cx-8}" y1="${cy+8}" x2="${cx+10}" y2="${cy-10}" ${s}/>`;
    case 'bus': return `<rect x="${cx-16}" y="${cy-11}" width="32" height="20" rx="3" ${s}/><line x1="${cx-16}" y1="${cy-2}" x2="${cx+16}" y2="${cy-2}" ${s}/><circle cx="${cx-9}" cy="${cy+11}" r="3" ${s}/><circle cx="${cx+9}" cy="${cy+11}" r="3" ${s}/><line x1="${cx-9}" y1="${cy-11}" x2="${cx-9}" y2="${cy-2}" ${s}/><line x1="${cx+1}" y1="${cy-11}" x2="${cx+1}" y2="${cy-2}" ${s}/>`;
    case 'seed': return `<path d="M${cx-12} ${cy-10} h24 l-3 24 a3 3 0 0 1 -3 3 h-12 a3 3 0 0 1 -3 -3 z" ${s}/><path d="M${cx-6} ${cy-10} l3 -6 M${cx+6} ${cy-10} l-3 -6" ${s}/><circle cx="${cx}" cy="${cy+6}" r="4" ${s}/>`;
    case 'tractor': return `<circle cx="${cx+8}" cy="${cy+7}" r="9" ${s}/><circle cx="${cx-12}" cy="${cy+9}" r="6" ${s}/><path d="M${cx-16} ${cy-2} h8 l3 -8 h8 v10 M${cx-4} ${cy} h6" ${s}/>`;
    case 'radio': return `<rect x="${cx-16}" y="${cy-6}" width="32" height="20" rx="3" ${s}/><circle cx="${cx+7}" cy="${cy+4}" r="5" ${s}/><line x1="${cx-11}" y1="${cy+1}" x2="${cx-3}" y2="${cy+1}" ${s}/><line x1="${cx-4}" y1="${cy-6}" x2="${cx+6}" y2="${cy-16}" ${s}/><circle cx="${cx+7}" cy="${cy-16}" r="2" fill="${c}"/>`;
    case 'chat': return `<path d="M${cx-15} ${cy-11} h30 a4 4 0 0 1 4 4 v11 a4 4 0 0 1 -4 4 h-17 l-8 7 v-7 h-5 a4 4 0 0 1 -4 -4 v-11 a4 4 0 0 1 4 -4 z" ${s}/><circle cx="${cx-6}" cy="${cy-1}" r="1.5" fill="${c}"/><circle cx="${cx}" cy="${cy-1}" r="1.5" fill="${c}"/><circle cx="${cx+6}" cy="${cy-1}" r="1.5" fill="${c}"/>`;
    case 'basket': return `<path d="M${cx-15} ${cy-2} h30 l-4 16 h-22 z" ${s}/><path d="M${cx-9} ${cy-2} a9 9 0 0 1 18 0" ${s}/><line x1="${cx-6}" y1="${cy+2}" x2="${cx-4}" y2="${cy+14}" ${s}/><line x1="${cx+6}" y1="${cy+2}" x2="${cx+4}" y2="${cy+14}" ${s}/>`;
    case 'moto': return `<circle cx="${cx-11}" cy="${cy+8}" r="6" ${s}/><circle cx="${cx+13}" cy="${cy+8}" r="6" ${s}/><path d="M${cx-11} ${cy+8} l6 -12 h8 l4 6 M${cx-4} ${cy-4} h10" ${s}/>`;
    case 'trophy': return `<path d="M${cx-9} ${cy-14} h18 v6 a9 9 0 0 1 -18 0 z" ${s}/><path d="M${cx-9} ${cy-11} h-5 a4 4 0 0 0 5 6 M${cx+9} ${cy-11} h5 a4 4 0 0 1 -5 6" ${s}/><line x1="${cx}" y1="${cy-2}" x2="${cx}" y2="${cy+7}" ${s}/><line x1="${cx-7}" y1="${cy+13}" x2="${cx+7}" y2="${cy+13}" ${s}/><line x1="${cx-4}" y1="${cy+7}" x2="${cx+4}" y2="${cy+7}" ${s}/>`;
    case 'stamp': return `<path d="M${cx-8} ${cy-3} v-4 a8 8 0 1 1 16 0 v4 h5 l-3 9 h-20 l-3 -9 z" ${s}/><rect x="${cx-15}" y="${cy+8}" width="30" height="6" rx="2" ${s}/>`;
    case 'rocket': return `<path d="M${cx} ${cy-16} c6 4 8 12 8 18 h-16 c0 -6 2 -14 8 -18 z" ${s}/><circle cx="${cx}" cy="${cy-5}" r="3" ${s}/><path d="M${cx-8} ${cy+2} l-5 8 M${cx+8} ${cy+2} l5 8 M${cx-4} ${cy+4} l-2 9 h12 l-2 -9" ${s}/>`;
    case 'person': return `<circle cx="${cx}" cy="${cy-8}" r="6" ${s}/><path d="M${cx-11} ${cy+13} c0-9 6-13 11-13 c5 0 11 4 11 13" ${s}/>`;
    default: return kit.ic(t, cx, cy, c);
  }
}

// S2 — product-market fit
function s2() {
  const chip=(y,fill,icon,ico_c,lines)=>{let r=`<rect x="100" y="${y}" width="700" height="150" rx="16" fill="${fill}" stroke="${C.sage}" stroke-width="2"/>${kit.circleIco(170,y+75,34)}${ic(icon,170,y+75,ico_c)}`;lines.forEach((l,i)=>r+=`<text x="235" y="${y+58+i*34}" font-family="${F}" font-size="21" font-weight="${i===0?700:500}" fill="${C.ink}">${esc(l)}</text>`);return r;};
  const left=chip(280,'#ECECE4','flatline',C.grey,['Without fit:','silent word of mouth, endless sales cycles'])+chip(460,'#E4EDD3','riseline',C.med,['With fit: demand outruns supply','BasiGo: 500 paid deposits waiting']);
  let myths=kit.panel(840,280,660,380)+kit.ptitle(880,338,'FOUR MYTHS, ALL FALSE');
  ['It arrives as one big event','It is obvious when you have it','It cannot be lost','It lets you ignore competition'].forEach((m,i)=>{const y=410+i*66;myths+=ic('cross',890,y,C.terra)+`<text x="935" y="${y+8}" font-family="${F}" font-size="22" font-weight="600" fill="${C.ink}">${esc(m)}</text>`;});
  return kit.frame(kit.head('PRODUCT-MARKET FIT')+left+myths+kit.banner(800,[{t:'FIT IS A STATE YOU '},{t:'DEFEND',c:'g'},{t:', NOT A TROPHY.'}]));
}

// S3 — build measure learn
function s3() {
  const cx=430,cy=480,r=175;
  const st=[['BUILD','the smallest test','workbench',-90],['MEASURE','real behaviour','gauge',30],['LEARN','keep or pivot','notebook',150]];
  let loop='';
  // arrows between stations (clockwise)
  [[-90,30],[30,150],[150,270]].forEach(a=>{const a1=Math.PI*(a[0]+22)/180,a2=Math.PI*(a[1]-22)/180;loop+=`<path d="M${(cx+Math.cos(a1)*r).toFixed(0)} ${(cy+Math.sin(a1)*r).toFixed(0)} A ${r} ${r} 0 0 1 ${(cx+Math.cos(a2)*r).toFixed(0)} ${(cy+Math.sin(a2)*r).toFixed(0)}" fill="none" stroke="${C.med}" stroke-width="2.5"/><path d="M${(cx+Math.cos(a2)*r).toFixed(0)} ${(cy+Math.sin(a2)*r).toFixed(0)} l${(Math.cos(a2+2.4)*11).toFixed(0)} ${(Math.sin(a2+2.4)*11).toFixed(0)} m0 0 l${(Math.cos(a2-2.0)*11).toFixed(0)} ${(Math.sin(a2-2.0)*11).toFixed(0)}" fill="none" stroke="${C.med}" stroke-width="2.5" stroke-linecap="round"/>`;});
  st.forEach(x=>{const a=Math.PI*x[3]/180,sx=cx+Math.cos(a)*r,sy=cy+Math.sin(a)*r;loop+=`<circle cx="${sx}" cy="${sy}" r="46" fill="${C.panel}" stroke="${C.sage}" stroke-width="2"/>${ic(x[2],sx,sy-6)}<text x="${sx}" y="${sy+22}" font-family="${F}" font-size="16" font-weight="800" fill="${C.dark}" text-anchor="middle">${x[0]}</text>`;
    loop+=`<text x="${sx}" y="${sy+ (x[3]===-90?-64:70)}" font-family="${F}" font-size="15" fill="${C.ink}" text-anchor="middle">${esc(x[1])}</text>`;});
  loop+=`<circle cx="${cx}" cy="${cy}" r="40" fill="${C.pale}"/><text x="${cx}" y="${cy+6}" font-family="${F}" font-size="20" font-weight="800" fill="${C.dark}" text-anchor="middle">MVP</text>`;
  loop+=`<g transform="translate(${cx+128},${cy-118})">${ic('leaf',0,0)}<text x="0" y="24" font-family="${F}" font-size="13" fill="${C.med}" text-anchor="middle">Measure impact too</text></g>`;
  const cases=[['lamp','Easy Solar: 200-customer pilot first'],['bus','BasiGo: 2 buses, 150,000 real km, then a factory'],['battery','Ampersand: a handful of retrofits, then a network']];
  let cc='';cases.forEach((c,i)=>{const y=310+i*115;cc+=kit.panel(850,y,650,96)+kit.circleIco(905,y+48,28)+ic(c[0],905,y+48)+`<text x="950" y="${y+55}" font-family="${F}" font-size="20" font-weight="600" fill="${C.ink}">${esc(c[1])}</text>`;});
  return kit.frame(kit.head('THE VALIDATION ENGINE')+loop+cc+kit.banner(800,[{t:'HUNT FOR '},{t:'DISPROOF',c:'g'},{t:'. YOUR IMPACT CLAIMS WILL BE AUDITED.'}]));
}

// S4 — distribution
function s4() {
  const top=`<rect x="100" y="250" width="1400" height="56" rx="28" fill="${C.pale}"/>${ic('person',148,278)}<text x="188" y="285" font-family="${F}" font-size="21" font-weight="700" fill="${C.dark}">Rule one: <tspan fill="${C.med}">founders sell first.</tspan> Never outsource early sales.</text>`;
  const P=[['AGENT NETWORKS','group',['M-KOPA: 30,000 agents','converting trust into sales']],['EMBEDDED CHANNELS','seed',['Pula: 15M farmers via','seed bags, loans, programmes']],['AGGREGATORS','tractor',["Hello Tractor's booking agents;",'BasiGo via the SACCOs']]];
  const cols=[100,560,1020];let b='';
  P.forEach((p,i)=>{const x=cols[i];b+=kit.panel(x,340,440,300);b+=`<text x="${x+220}" y="398" font-family="${F}" font-size="21" font-weight="800" fill="${C.med}" text-anchor="middle">${esc(p[0])}</text>`;b+=kit.circleIco(x+220,470,38)+ic(p[1],x+220,470);p[2].forEach((t,j)=>b+=`<text x="${x+220}" y="${548+j*30}" font-family="${F}" font-size="19" fill="${C.ink}" text-anchor="middle">${esc(t)}</text>`);});
  return kit.frame(kit.head('DISTRIBUTION IS HALF THE PRODUCT')+top+b+kit.banner(800,[{t:'SELL THROUGH THE STRUCTURES YOUR MARKET '},{t:'TRUSTS',c:'g'},{t:'.'}]));
}

// S5 — capture (composite)
function s5(dir) {
  const img=kit.readGpt(dir,'m7-s05.png');
  const rows=[['radio','Vernacular radio'],['chat','WhatsApp groups'],['basket','Market day'],['moto','The rider stage']];
  let pnl=kit.panel(850,235,650,360)+kit.ptitle(890,293,'MARKET WHERE THEY LIVE');
  rows.forEach((r,i)=>{const y=360+i*58;pnl+=kit.circleIco(905,y,27)+ic(r[0],905,y)+`<text x="950" y="${y+8}" font-family="${F}" font-size="22" font-weight="600" fill="${C.ink}">${esc(r[1])}</text>`;});
  const chip=`<rect x="850" y="622" width="650" height="52" rx="26" fill="${C.pale}"/>${ic('trophy',895,648)}<text x="935" y="655" font-family="${F}" font-size="19" font-weight="700" fill="${C.dark}">Hire against delivery bottlenecks, not sales</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${kit.W}" height="${kit.H}" viewBox="0 0 ${kit.W} ${kit.H}"><rect width="${kit.W}" height="${kit.H}" fill="${C.cream}"/>${kit.decor()}${kit.image(img,{id:'s5',x:0,y:210,w:800,h:600})}${kit.header()}${kit.head('CAPTURE THE BEACHHEAD')}${pnl}${chip}${kit.banner(800,[{t:'A '},{t:'WORKING INSTALLATION',c:'g'},{t:' OUTSELLS ANY ADVERTISEMENT.'}])}</svg>`;
}

// S6 — the chasm
function s6() {
  const base=610, x0=150, x1=1470;
  let m=`<path d="M${x0} ${base} C 370 ${base} 410 300 810 285 C 1210 300 1250 ${base} ${x1} ${base} Z" fill="#E7EFDD" stroke="${C.med}" stroke-width="2.5"/>`;
  const segs=[['INNOVATORS','2.5%',225],['EARLY','ADOPTERS','13.5%',318],['EARLY','MAJORITY','34%',585],['LATE','MAJORITY','34%',1030],['SKEPTICS','16%',1360]];
  [193,368,810,1252].forEach(x=>m+=`<line x1="${x}" y1="${base}" x2="${x}" y2="${base-40}" stroke="${C.sage}" stroke-width="1.5" stroke-dasharray="3 4"/>`);
  // labels below
  const lab=(x,name,pct,name2)=>`<text x="${x}" y="${base+34}" font-family="${F}" font-size="16" font-weight="800" fill="${C.dark}" text-anchor="middle">${name}</text>${name2?`<text x="${x}" y="${base+54}" font-family="${F}" font-size="16" font-weight="800" fill="${C.dark}" text-anchor="middle">${name2}</text>`:''}<text x="${x}" y="${base+(name2?76:56)}" font-family="${F}" font-size="15" fill="${C.med}" text-anchor="middle">${pct}</text>`;
  m+=lab(196,'INNOVATORS','2.5%')+lab(345,'EARLY','13.5%','ADOPTERS')+lab(585,'EARLY','34%','MAJORITY')+lab(1030,'LATE','34%','MAJORITY')+lab(1360,'SKEPTICS','16%');
  // chasm at x=368 (between early adopters and early majority)
  m+=`<line x1="368" y1="430" x2="368" y2="650" stroke="${C.terra}" stroke-width="2.5" stroke-dasharray="4 5"/>`;
  m+=`<text x="368" y="412" font-family="${F}" font-size="16" font-weight="800" fill="${C.terra}" text-anchor="middle">THE CHASM</text>`;
  // small rope bridge spanning the chasm
  m+=`<path d="M328 452 Q368 480 408 452" fill="none" stroke="${C.dark}" stroke-width="2"/><path d="M328 438 Q368 466 408 438" fill="none" stroke="${C.dark}" stroke-width="2"/>`;
  [0.15,0.35,0.5,0.65,0.85].forEach(tp=>{const tx=328+80*tp;const s=1-Math.pow((tp-0.5)*2,2);m+=`<line x1="${tx.toFixed(0)}" y1="${(438+28*s).toFixed(0)}" x2="${tx.toFixed(0)}" y2="${(452+28*s).toFixed(0)}" stroke="${C.dark}" stroke-width="1.4"/>`;});
  m+=`<circle cx="368" cy="450" r="5" fill="none" stroke="${C.med}" stroke-width="2"/><line x1="368" y1="455" x2="368" y2="468" stroke="${C.med}" stroke-width="2"/><circle cx="378" cy="462" r="3.5" fill="none" stroke="${C.terra}" stroke-width="1.8"/>`;
  const chip=`<rect x="150" y="700" width="1320" height="50" rx="25" fill="${C.pale}"/>${ic('group',196,725)}<text x="236" y="732" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Pragmatists only trust references from other pragmatists</text>`;
  return kit.frame(kit.head('THE CHASM')+m+chip+kit.banner(800,[{t:'SYSTEMIC IMPACT LIVES ON THE '},{t:'FAR SIDE',c:'g'},{t:' OF THE CHASM.'}]));
}

// S7 — how PAYG solar crossed
function s7() {
  const bricks=[['UPFRONT COST','removed by ~$0.50 a day'],['TRUST','removed by local agents & neighbours'],['INCOMPLETE','removed by whole kits + service'],['FRICTION','removed by mobile money']];
  const cols=[110,455,800,1145]; let g='';
  // crowd behind (faint)
  let crowd='';for(let i=0;i<9;i++)crowd+=ic('person',180+i*160,560,'#CBD6BB');
  g+=`<g opacity="0.5">${crowd}</g>`;
  bricks.forEach((b,i)=>{const x=cols[i],y=270,w=320,h=190;
    g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${C.panel}" stroke="${C.med}" stroke-width="2"/><line x1="${x}" y1="${y+h/2}" x2="${x+w}" y2="${y+h/2}" stroke="${C.sage}" stroke-width="1.5"/><line x1="${x+w/2}" y1="${y}" x2="${x+w/2}" y2="${y+h/2}" stroke="${C.sage}" stroke-width="1.5"/><line x1="${x+w/4}" y1="${y+h/2}" x2="${x+w/4}" y2="${y+h}" stroke="${C.sage}" stroke-width="1.5"/><line x1="${x+3*w/4}" y1="${y+h/2}" x2="${x+3*w/4}" y2="${y+h}" stroke="${C.sage}" stroke-width="1.5"/>`;
    g+=`<path d="M${x+w/2-20} ${y-6} q20 -20 40 0" fill="none" stroke="${C.med}" stroke-width="2.4" stroke-linecap="round"/>`; // lifting hand hint
    g+=`<text x="${x+w/2}" y="${y+80}" font-family="${F}" font-size="21" font-weight="800" fill="${C.dark}" text-anchor="middle">${esc(b[0])}</text><text x="${x+w/2}" y="${y+128}" font-family="${F}" font-size="17" fill="${C.med}" text-anchor="middle">${esc(b[1])}</text>`;});
  const stats=[['Sun King: ~50M people',210],['d.light: ~200M lives',630],['M-KOPA: 7M customers',1030]];
  let sc='';stats.forEach(x=>{const w=x[0].length*11+46;sc+=`<rect x="${x[1]}" y="500" width="${w}" height="50" rx="25" fill="${C.panel}" stroke="${C.sage}" stroke-width="2"/><text x="${x[1]+w/2}" y="531" font-family="${F}" font-size="19" font-weight="700" fill="${C.dark}" text-anchor="middle">${esc(x[0])}</text>`;});
  return kit.frame(kit.head('HOW PAYG SOLAR CROSSED')+g+sc+kit.banner(800,[{t:"SPEAK PRAGMATIST: CHEAPER, SAFER, NO RISK, EVERYONE'S DOING IT."}]));
}

// S8 — three expansion routes
function s8() {
  const px=250,py=440;
  let d=`<circle cx="${px}" cy="${py}" r="46" fill="#E7EFDD" stroke="${C.med}" stroke-width="2"/><text x="${px}" y="${py+5}" font-family="${F}" font-size="16" font-weight="800" fill="${C.dark}" text-anchor="middle">YOU</text>`;
  // route 1: bridge to bigger pond (top)
  d+=`<path d="M${px+40} ${py-20} Q 500 250 700 300" fill="none" stroke="${C.med}" stroke-width="2.5"/><circle cx="770" cy="310" r="60" fill="#E7EFDD" stroke="${C.med}" stroke-width="2"/>`;
  d+=`<path d="M560 268 l6 -14 m-6 14 l14 -6" stroke="${C.dark}" stroke-width="2"/>`; // little bridge marker
  d+=`<text x="820" y="285" font-family="${F}" font-size="19" font-weight="800" fill="${C.dark}">NEW SEGMENTS</text><text x="820" y="312" font-family="${F}" font-size="17" fill="${C.med}">the chasm route</text>`;
  // route 2: loop back same pond
  d+=`<path d="M${px+30} ${py+38} C 400 640 120 640 ${px-30} ${py+40}" fill="none" stroke="${C.med}" stroke-width="2.5"/><circle cx="250" cy="610" r="4" fill="${C.med}"/>`;
  d+=`<text x="420" y="628" font-family="${F}" font-size="19" font-weight="800" fill="${C.dark}">NEW OFFERINGS</text><text x="420" y="655" font-family="${F}" font-size="17" fill="${C.med}">M-KOPA way: solar → phones → loans</text>`;
  // route 3: border gate + stamp
  d+=`<path d="M${px+42} ${py+8} H 640" fill="none" stroke="${C.med}" stroke-width="2.5"/><line x1="655" y1="420" x2="655" y2="480" stroke="${C.dark}" stroke-width="3"/><line x1="705" y1="420" x2="705" y2="480" stroke="${C.dark}" stroke-width="3"/>${ic('stamp',680,510)}`;
  d+=`<text x="740" y="445" font-family="${F}" font-size="19" font-weight="800" fill="${C.dark}">NEW COUNTRIES</text><text x="740" y="472" font-family="${F}" font-size="17" fill="${C.med}">mind the national chasm</text>`;
  const warn=`<rect x="1080" y="280" width="420" height="360" rx="18" fill="#FBF3F0" stroke="${C.terra}" stroke-width="2"/><circle cx="1122" cy="335" r="22" fill="none" stroke="${C.terra}" stroke-width="2.4"/>${ic('bang',1122,335,C.terra)}<text x="1156" y="343" font-family="${F}" font-size="22" font-weight="800" fill="${C.terra}">THE TWIGA WARNING</text>${['$100M+ raised, scaled fast','Thin margins crushed the machine','Layoffs and retreat'].map((t,i)=>`<circle cx="1112" cy="${425+i*70}" r="5" fill="${C.terra}"/><text x="1134" y="${432+i*70}" font-family="${F}" font-size="20" fill="${C.ink}">${esc(t)}</text>`).join('')}`;
  return kit.frame(kit.head('EXPAND: ONE ROUTE AT A TIME')+d+warn+kit.banner(800,[{t:'EXPANSION IS EARNED BY '},{t:'UNIT ECONOMICS',c:'g'},{t:', NOT FUNDING ROUNDS.'}]));
}

// S9 — roadmap
function s9() {
  const x0=300, cw=298;
  let g=kit.panel(120,250,1420,398);
  ['Q1','Q2','Q3','Q4'].forEach((q,i)=>g+=`<text x="${x0+i*cw+cw/2}" y="292" font-family="${F}" font-size="20" font-weight="800" fill="${C.med}" text-anchor="middle">${q}</text>`);
  const rowY=[322,398,474,550];
  ['Experiments','Pilots & sales','Fit metrics','Expansion trigger'].forEach((r,j)=>{const y=rowY[j];g+=`<text x="150" y="${y+38}" font-family="${F}" font-size="17" font-weight="700" fill="${C.dark}">${esc(r)}</text>`;
    for(let i=0;i<4;i++){const skip=(j===3&&i<3)||(j===0&&i>1);if(!skip)g+=`<rect x="${x0+i*cw+16}" y="${y+16}" width="${cw-32}" height="44" rx="8" fill="${C.pale}" stroke="${C.sage}" stroke-width="1.5"/>`;}});
  g+=`<line x1="${x0-8}" y1="308" x2="${x0-8}" y2="630" stroke="${C.sage}" stroke-width="1.5"/>`;
  g+=`<g transform="translate(1478,300)">${ic('flag',0,0,C.med)}<text x="0" y="26" font-family="${F}" font-size="13" font-weight="700" fill="${C.med}" text-anchor="middle">Next pond</text></g>`;
  const chip=`<rect x="120" y="668" width="1420" height="50" rx="25" fill="#E4EDD3"/>${ic('rocket',168,693)}<text x="212" y="700" font-family="${F}" font-size="19" font-weight="700" fill="${C.dark}">Your Venture Workbook is complete: problem → value → market → competition → model → plan</text>`;
  return kit.frame(kit.head('YOUR 12-MONTH ROADMAP')+g+chip+kit.banner(760,[{t:'GO BUILD A COMPANY THAT '},{t:'MAKES MONEY BY MAKING AN IMPACT',c:'g'},{t:'.'}]));
}

const dir = process.argv[2];
const M = process.env.MODULE || 'm7';
const only = (process.env.ONLY || '').split(',').filter(Boolean);
const want = n => only.length === 0 || only.includes(n);
const slides = { '02': s2, '03': s3, '04': s4, '05': () => s5(dir), '06': s6, '07': s7, '08': s8, '09': s9 };
for (const [n, fn] of Object.entries(slides)) if (want(n)) kit.render(fn(), `${dir}/${M}-s${n}.png`);
