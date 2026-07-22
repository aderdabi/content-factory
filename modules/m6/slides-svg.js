// Module 6 exact-SVG slides + S8 Pula composite.
const kit = require('../../scripts/svg-slides/slide-kit.js');
kit.cfg.pill = 'MODULE 6 OF 7';
const { C, F, esc } = kit;

function ic(t, cx, cy, c) {
  c = c || C.med;
  const s = `stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  switch (t) {
    case 'clock': return `<circle cx="${cx}" cy="${cy}" r="14" ${s}/><path d="M${cx} ${cy-8} v8 l6 4" ${s}/>`;
    case 'crate': return `<rect x="${cx-15}" y="${cy-11}" width="30" height="22" rx="2" ${s}/><line x1="${cx-15}" y1="${cy-3}" x2="${cx+15}" y2="${cy-3}" ${s}/><line x1="${cx-6}" y1="${cy-11}" x2="${cx-6}" y2="${cy+11}" ${s}/><line x1="${cx+6}" y1="${cy-11}" x2="${cx+6}" y2="${cy+11}" ${s}/>`;
    case 'shield': return `<path d="M${cx} ${cy-15} l13 5 v9 c0 8 -6 13 -13 17 c-7 -4 -13 -9 -13 -17 v-9 z" ${s}/><path d="M${cx-6} ${cy-1} l4 5 l8 -9" ${s}/>`;
    case 'razor': return `<rect x="${cx-14}" y="${cy-14}" width="28" height="12" rx="2" ${s}/><line x1="${cx-9}" y1="${cy-8}" x2="${cx-9}" y2="${cy-8}" ${s}/><line x1="${cx}" y1="${cy-2}" x2="${cx}" y2="${cy+6}" ${s}/><rect x="${cx-3}" y="${cy+6}" width="6" height="10" rx="2" ${s}/><g fill="${c}"><circle cx="${cx-8}" cy="${cy-8}" r="1"/><circle cx="${cx}" cy="${cy-8}" r="1"/><circle cx="${cx+8}" cy="${cy-8}" r="1"/></g>`;
    case 'exchange': return `<path d="M${cx-14} ${cy-5} h26 l-6 -6 M${cx+14} ${cy+5} h-26 l6 6" ${s}/>`;
    case 'map': return `<path d="M${cx-14} ${cy-10} l9 -3 l10 3 l9 -3 v20 l-9 3 l-10 -3 l-9 3 z" ${s}/><line x1="${cx-5}" y1="${cy-13}" x2="${cx-5}" y2="${cy+7}" ${s}/><line x1="${cx+5}" y1="${cy-10}" x2="${cx+5}" y2="${cy+10}" ${s}/>`;
    case 'puzzle': return `<path d="M${cx-14} ${cy-13} h9 a3 3 0 0 1 6 0 h9 v9 a3 3 0 0 1 0 6 v9 h-24 z" ${s}/><path d="M${cx+10} ${cy-2} a3 3 0 0 0 0 6" ${s}/>`;
    case 'loop': return `<path d="M${cx-13} ${cy+3} a13 13 0 1 1 4 8" ${s}/><path d="M${cx-15} ${cy-9} l2 12 l11 -3" ${s}/>`;
    case 'tractor': return `<circle cx="${cx+8}" cy="${cy+7}" r="9" ${s}/><circle cx="${cx-12}" cy="${cy+9}" r="6" ${s}/><path d="M${cx-16} ${cy-2} h8 l3 -8 h8 v10 M${cx-4} ${cy} h6" ${s}/>`;
    case 'snowflake': return `<g ${s}>${[0,60,120].map(a=>{const r=Math.PI*a/180,dx=Math.cos(r)*15,dy=Math.sin(r)*15;return `<line x1="${cx-dx}" y1="${cy-dy}" x2="${cx+dx}" y2="${cy+dy}"/>`}).join('')}</g><g ${s}>${[0,60,120,180,240,300].map(a=>{const r=Math.PI*a/180;return `<path d="M${(cx+Math.cos(r)*11).toFixed(1)} ${(cy+Math.sin(r)*11).toFixed(1)} l${(Math.cos(r+0.6)*4).toFixed(1)} ${(Math.sin(r+0.6)*4).toFixed(1)} M${(cx+Math.cos(r)*11).toFixed(1)} ${(cy+Math.sin(r)*11).toFixed(1)} l${(Math.cos(r-0.6)*4).toFixed(1)} ${(Math.sin(r-0.6)*4).toFixed(1)}"/>`}).join('')}</g>`;
    case 'signal': return `<line x1="${cx-12}" y1="${cy+10}" x2="${cx-12}" y2="${cy+4}" ${s}/><line x1="${cx-4}" y1="${cy+10}" x2="${cx-4}" y2="${cy-2}" ${s}/><line x1="${cx+4}" y1="${cy+10}" x2="${cx+4}" y2="${cy-8}" ${s}/><line x1="${cx+12}" y1="${cy+10}" x2="${cx+12}" y2="${cy-14}" ${s}/>`;
    case 'bank': return `<path d="M${cx-16} ${cy-4} l16 -12 l16 12 z" ${s}/><line x1="${cx-12}" y1="${cy-1}" x2="${cx-12}" y2="${cy+12}" ${s}/><line x1="${cx-4}" y1="${cy-1}" x2="${cx-4}" y2="${cy+12}" ${s}/><line x1="${cx+4}" y1="${cy-1}" x2="${cx+4}" y2="${cy+12}" ${s}/><line x1="${cx+12}" y1="${cy-1}" x2="${cx+12}" y2="${cy+12}" ${s}/><line x1="${cx-17}" y1="${cy+14}" x2="${cx+17}" y2="${cy+14}" ${s}/>`;
    case 'seed': return `<path d="M${cx-12} ${cy-10} h24 l-3 24 a3 3 0 0 1 -3 3 h-12 a3 3 0 0 1 -3 -3 z" ${s}/><path d="M${cx-6} ${cy-10} l3 -6 M${cx+6} ${cy-10} l-3 -6" ${s}/><circle cx="${cx}" cy="${cy+6}" r="4" ${s}/>`;
    case 'wallet': return `<rect x="${cx-16}" y="${cy-12}" width="32" height="24" rx="4" ${s}/><path d="M${cx+4} ${cy-2} h10 v8 h-10 z" ${s}/>`;
    case 'cards': return `<rect x="${cx-14}" y="${cy-10}" width="18" height="26" rx="2" transform="rotate(-14 ${cx-5} ${cy})" ${s}/><rect x="${cx-2}" y="${cy-12}" width="18" height="26" rx="2" transform="rotate(10 ${cx+7} ${cy})" ${s}/>`;
    case 'blueprint': return `<rect x="${cx-15}" y="${cy-14}" width="30" height="28" rx="2" ${s}/><line x1="${cx-15}" y1="${cy-5}" x2="${cx+15}" y2="${cy-5}" ${s}/><line x1="${cx-6}" y1="${cy-14}" x2="${cx-6}" y2="${cy+14}" ${s}/><line x1="${cx-6}" y1="${cy+3}" x2="${cx+8}" y2="${cy+3}" ${s}/>`;
    case 'rocket': return `<path d="M${cx} ${cy-16} c6 4 8 12 8 18 h-16 c0 -6 2 -14 8 -18 z" ${s}/><circle cx="${cx}" cy="${cy-5}" r="3" ${s}/><path d="M${cx-8} ${cy+2} l-5 8 M${cx+8} ${cy+2} l5 8 M${cx-4} ${cy+4} l-2 9 h12 l-2 -9" ${s}/>`;
    case 'wrench': return `<path d="M${cx+9} ${cy-13} a7 7 0 1 0 -5 12 l-13 13 l4 4 l13 -13 a7 7 0 0 0 1 -16 l-4 5 l-1 4 l-4 1 l-4 -4 l1 -4 l4 -1 z" ${s}/>`;
    case 'arrow': return `<line x1="${cx-14}" y1="${cy}" x2="${cx+12}" y2="${cy}" ${s}/><path d="M${cx+4} ${cy-9} l9 9 l-9 9" ${s}/>`;
    default: return kit.ic(t, cx, cy, c);
  }
}

// S2 — four blocks, three levers
function s2() {
  let left=`<ellipse cx="350" cy="450" rx="270" ry="235" fill="none" stroke="${C.sage}" stroke-width="3" stroke-dasharray="3 8"/>`;
  ['VALUE PROPOSITION','VALUE CREATION','VALUE DELIVERY','VALUE CAPTURE'].forEach((t,i)=>{const y=280+i*94;left+=`<rect x="180" y="${y}" width="340" height="76" rx="14" fill="${C.panel}" stroke="${C.med}" stroke-width="2"/><text x="350" y="${y+47}" font-family="${F}" font-size="23" font-weight="800" fill="${C.dark}" text-anchor="middle">${t}</text>`;});
  const blk=(x,y,w,h,label,fill,tc)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${C.med}" stroke-width="2"/><text x="${x+w/2}" y="${y+h/2+8}" font-family="${F}" font-size="24" font-weight="800" fill="${tc}" text-anchor="middle">${label}</text>`;
  const eq=blk(700,430,180,95,'PROD COST',C.panel,C.dark)+`<text x="905" y="490" font-family="${F}" font-size="40" font-weight="800" fill="${C.med}" text-anchor="middle">+</text>`+blk(930,430,120,95,'CAC',C.panel,C.dark)+`<text x="1080" y="490" font-family="${F}" font-size="40" font-weight="800" fill="${C.terra}" text-anchor="middle">&lt;</text>`+blk(1110,350,180,255,'CLV',C.med,C.cream);
  const chip=`<rect x="700" y="640" width="770" height="52" rx="26" fill="${C.pale}"/>${ic('clock',740,666)}<text x="778" y="673" font-family="${F}" font-size="19" font-weight="700" fill="${C.dark}">M-KOPA: 13 years to first profit. Know your model's shape.</text>`;
  return kit.frame(kit.head('FOUR BLOCKS, THREE LEVERS')+left+eq+chip+kit.banner(800,[{t:'LIFETIME VALUE',c:'g'},{t:' MUST COMFORTABLY BEAT CAC PLUS COST.'}]));
}

// S3 — pattern deck
function s3() {
  const cards=[['tag','PRODUCT SALE','Gjenge, Kubik'],['crate','PAY-PER-USE','ColdHubs, Ampersand'],['phone','ASSET FINANCING','M-KOPA, SunCulture'],['shield','THIRD PARTY PAYS','Pula'],['razor','RAZOR & BLADE','KOKO'],['exchange','MARKETPLACE','Hello Tractor']];
  const cols=[110,585,1060], rows=[242,455], cw=430, ch=200;
  let g='';
  cards.forEach((c,i)=>{const x=cols[i%3], y=rows[Math.floor(i/3)];
    g+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="16" fill="${C.panel}" stroke="${C.sage}" stroke-width="2"/>`;
    g+=kit.circleIco(x+70,y+ch/2,34)+ic(c[0],x+70,y+ch/2);
    g+=`<text x="${x+130}" y="${y+90}" font-family="${F}" font-size="24" font-weight="800" fill="${C.dark}">${esc(c[1])}</text>`;
    g+=`<text x="${x+130}" y="${y+125}" font-family="${F}" font-size="19" fill="${C.med}">${esc(c[2])}</text>`;});
  const chip=`<rect x="110" y="672" width="1380" height="48" rx="24" fill="${C.pale}"/><text x="140" y="702" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">55 patterns in the Business Model Navigator. <tspan fill="${C.med}">Winners combine them.</tspan></text>`;
  return kit.frame(kit.head("YOU DON'T HAVE TO INVENT YOUR MODEL")+g+chip+kit.banner(800,[{t:'DEAL THE CARDS AGAINST YOUR VENTURE.'}]));
}

// S4 — three moves
function s4() {
  const P=[['1. SIMILARITY','map',[['Map the dominant model','and its change drivers']]],['2. CONFRONTATION','puzzle',[['Consumer credit → energy','= PAYG'],['Power-by-the-hour → buses','= BasiGo']]],['3. TESTING','loop',[['Pilot customers.','Test, learn, adapt, repeat']]]];
  const cols=[100,560,1020];
  let b='';
  P.forEach((p,i)=>{const x=cols[i];b+=kit.panel(x,250,440,370);
    b+=`<text x="${x+220}" y="308" font-family="${F}" font-size="22" font-weight="800" fill="${C.med}" text-anchor="middle">${esc(p[0])}</text>`;
    b+=kit.circleIco(x+220,380,38)+ic(p[1],x+220,380);
    p[2].forEach((ln,j)=>ln.forEach((t,k)=>b+=`<text x="${x+40}" y="${470+j*54+k*26}" font-family="${F}" font-size="20" font-weight="${k===0?600:600}" fill="${C.ink}">${esc(t)}</text>`));
  });
  const q=['What would Apple do?','What would Safaricom do?','What would IKEA do?'];
  let cr='';let cx=210;q.forEach(t=>{const w=t.length*11+50;cr+=`<rect x="${cx}" y="650" width="${w}" height="46" rx="23" fill="${C.pale}"/><text x="${cx+w/2}" y="679" font-family="${F}" font-size="19" font-weight="700" fill="${C.dark}" text-anchor="middle">${esc(t)}</text>`;cx+=w+30;});
  return kit.frame(kit.head('DESIGN IN THREE MOVES')+b+cr+kit.banner(800,[{t:'DISRUPTION = A '},{t:'FOREIGN PATTERN',c:'g'},{t:' FORCED ONTO YOUR MARKET.'}]));
}

// S5 — single point of failure (bridges)
function s5() {
  const deck=(x,w,y)=>`<rect x="${x}" y="${y}" width="${w}" height="14" rx="4" fill="${C.med}"/>`;
  // left: one cracked pillar
  let L=deck(140,560,332);
  L+=`<rect x="410" y="346" width="20" height="126" fill="${C.panel}" stroke="${C.terra}" stroke-width="2.5"/><path d="M420 370 l-8 14 l8 12 l-8 14" stroke="${C.terra}" stroke-width="2.5" fill="none"/>`;
  L+=`<line x1="420" y1="346" x2="420" y2="316" stroke="${C.terra}" stroke-width="2"/><path d="M420 316 h22 l-6 7 l6 7 h-22 z" fill="${C.terra}"/>`;
  L+=`<text x="420" y="500" font-family="${F}" font-size="16" font-weight="800" fill="${C.terra}" text-anchor="middle">CARBON CREDITS ONLY</text>`;
  L+=kit.panel(140,520,560,150)+`<text x="170" y="558" font-family="${F}" font-size="22" font-weight="800" fill="${C.dark}">KOKO</text><text x="170" y="600" font-family="${F}" font-size="19" fill="${C.ink}">Stoves at 90% subsidy, fuel below cost</text><text x="170" y="632" font-family="${F}" font-size="19" fill="${C.ink}">One denial ended 1.5M households' service</text>`;
  // right: three pillars
  let R=deck(800,560,332);
  ['Sanitation','Fertiliser','Insect protein'].forEach((lab,i)=>{const x=900+i*230;R+=`<rect x="${x-8}" y="346" width="16" height="126" fill="${C.panel}" stroke="${C.med}" stroke-width="2.5"/><text x="${x}" y="500" font-family="${F}" font-size="15" font-weight="700" fill="${C.dark}" text-anchor="middle">${esc(lab)}</text>`;});
  R+=kit.panel(800,520,560,150)+`<text x="830" y="558" font-family="${F}" font-size="22" font-weight="800" fill="${C.med}">SANERGY</text><text x="830" y="602" font-family="${F}" font-size="19" fill="${C.ink}">Split architecture:</text><text x="830" y="632" font-family="${F}" font-size="19" fill="${C.ink}">no single switch-off</text>`;
  return kit.frame(kit.head('THE SINGLE-POINT-OF-FAILURE TEST')+L+R+kit.banner(800,[{t:'IF ONE REGULATOR OR BUYER CAN SWITCH YOU OFF, '},{t:'REDESIGN',c:'t'},{t:'.'}]));
}

// S6 — value hill + nine Rs
function s6() {
  // hill path (left two-thirds)
  let h=`<path d="M120 640 L520 300 L820 600 L900 600 L900 660 L960 660" fill="none" stroke="${C.med}" stroke-width="2.5"/>`;
  h+=`<path d="M120 640 L520 300 L820 600 Z" fill="#EAF0E1" opacity="0.7"/>`;
  const upPts=[['RAW MATERIAL',210,568],['COMPONENT',330,466],['PRODUCT',440,373]];
  upPts.forEach(p=>{h+=`<circle cx="${p[1]}" cy="${p[2]}" r="6" fill="${C.med}"/><text x="${p[1]-14}" y="${p[2]+4}" font-family="${F}" font-size="17" font-weight="700" fill="${C.dark}" text-anchor="end">${p[0]}</text>`;});
  h+=`<circle cx="520" cy="300" r="8" fill="${C.med}"/><text x="520" y="285" font-family="${F}" font-size="20" font-weight="800" fill="${C.dark}" text-anchor="middle">USE</text>`;
  const dnPts=[['REUSE',600,382],['REPAIR',680,454],['REMANUFACTURE',740,508],['RECYCLE',800,562]];
  dnPts.forEach(p=>{h+=`<circle cx="${p[1]}" cy="${p[2]}" r="6" fill="${C.med}"/><text x="${p[1]+16}" y="${p[2]+4}" font-family="${F}" font-size="17" font-weight="700" fill="${C.dark}">${p[0]}</text>`;});
  h+=`<path d="M900 660 l24 40" stroke="${C.terra}" stroke-width="2.5" fill="none" stroke-dasharray="3 5"/><rect x="915" y="700" width="26" height="26" rx="3" fill="none" stroke="${C.terra}" stroke-width="2.5" transform="rotate(20 928 713)"/><text x="960" y="705" font-family="${F}" font-size="15" fill="${C.terra}">LINEAR: value to zero</text>`;
  // nine-R ladder
  const rs=['Refuse','Rethink','Reduce','Reuse','Repair','Refurbish','Remanufacture','Repurpose','Recycle'];
  let lad='';const lx=1130,lw=340,rh=44,ly=250;
  rs.forEach((r,i)=>{const y=ly+i*rh;lad+=`<rect x="${lx}" y="${y}" width="${lw}" height="${rh-6}" rx="6" fill="${i<3?'#E4EDD3':C.panel}" stroke="${C.sage}" stroke-width="1.5"/><text x="${lx+18}" y="${y+26}" font-family="${F}" font-size="19" font-weight="${i<3?800:600}" fill="${i<3?C.med:C.ink}">${r}</text>`;});
  lad+=`<text x="${lx+lw+8}" y="${ly+64}" font-family="${F}" font-size="15" font-weight="700" fill="${C.med}" transform="rotate(90 ${lx+lw+8} ${ly+64})">Most value kept</text>`;
  return kit.frame(kit.head('KEEP VALUE ON THE HILL')+h+lad+kit.banner(800,[{t:'RECYCLING IS THE LAST RESORT, NOT THE FIRST IDEA.'}]));
}

// S7 — three circular revenue logics
function s7() {
  const P=[['LONG-LIFE','wrench',[['Sell durability,','monetise the lifetime']]],['ACCESS','tractor',[['Keep ownership,','rent the use']]],['PERFORMANCE','snowflake',[['Sell the outcome itself'],['A crate-day, a kilometre,','a swap']]]];
  const cols=[100,560,1020];
  let b='';
  P.forEach((p,i)=>{const x=cols[i];b+=kit.panel(x,250,440,360);
    b+=`<text x="${x+220}" y="306" font-family="${F}" font-size="22" font-weight="800" fill="${C.med}" text-anchor="middle">${esc(p[0])}</text>`;
    b+=kit.circleIco(x+220,378,38)+ic(p[1],x+220,378);
    let yy=468;p[2].forEach(ln=>{ln.forEach((t,k)=>{b+=`<text x="${x+40}" y="${yy+k*26}" font-family="${F}" font-size="20" fill="${C.ink}">${esc(t)}</text>`;});yy+=ln.length*26+10;});
  });
  const chip=`<rect x="100" y="646" width="1378" height="50" rx="25" fill="${C.pale}"/>${ic('signal',146,671)}${ic('phone',196,671)}<text x="236" y="678" font-family="${F}" font-size="19" font-weight="700" fill="${C.dark}">Enabled by remote monitoring + mobile money: tiny, frequent, enforceable payments</text>`;
  return kit.frame(kit.head('THREE CIRCULAR REVENUE LOGICS')+b+chip+kit.banner(800,[{t:'SELL OUTCOMES, AND '},{t:'DURABILITY BECOMES YOUR PROFIT',c:'g'},{t:'.'}]));
}

// S8 — Pula (composite)
function s8(dir) {
  const img = kit.readGpt(dir, 'm6-s08.png');
  const rows=[['building','Governments pay via subsidy programmes'],['bank','Lenders pay to protect their loans'],['seed','Seed firms pay as a replanting guarantee'],['wallet','The farmer pays no visible premium']];
  let tbl=kit.panel(850,230,650,330);
  rows.forEach((r,i)=>{const y=290+i*78;tbl+=kit.circleIco(895,y,27)+ic(r[0],895,y,i===3?C.terra:C.med);
    if(i===3)tbl+=`<line x1="880" y1="${y+13}" x2="910" y2="${y-13}" stroke="${C.terra}" stroke-width="2.4"/>`;
    tbl+=`<text x="940" y="${y+7}" font-family="${F}" font-size="21" font-weight="600" fill="${C.ink}">${esc(r[1])}</text>`;});
  let sc='';[['15.4M farmers',850],['22 countries',1120],['$40M paid out',1320]].forEach(x=>{const w=x[0].length*11+40;sc+=`<rect x="${x[1]}" y="590" width="${w}" height="52" rx="26" fill="${C.panel}" stroke="${C.sage}" stroke-width="2"/><text x="${x[1]+w/2}" y="623" font-family="${F}" font-size="20" font-weight="800" fill="${C.med}" text-anchor="middle">${esc(x[0])}</text>`;});
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${kit.W}" height="${kit.H}" viewBox="0 0 ${kit.W} ${kit.H}"><rect width="${kit.W}" height="${kit.H}" fill="${C.cream}"/>${kit.decor()}${kit.image(img,{id:'s8',x:0,y:210,w:800,h:600})}${kit.header()}${kit.head('CASE STUDY: PULA','The masterpiece of who-pays design')}${tbl}${sc}${kit.banner(800,[{t:'WHEN THE USER CANNOT PAY, CHARGE WHOEVER '},{t:'CAPTURES THE VALUE',c:'g'},{t:'.'}])}</svg>`;
}

// S9 — assignment
function s9() {
  const rows=[['cards','1. Deal 5 foreign pattern cards against your venture'],['blueprint','2. Design 2 candidate models: who pays, how often, what you own'],['scale','3. Score both on the three levers, note the shape in time'],['loop','4. Run the circular check and the single-point-of-failure test'],['cal','5. Doughnut check, then book your first pilot conversation']];
  let list=kit.panel(150,246,1380,520);
  rows.forEach((r,i)=>{const y=318+i*100;list+=kit.circleIco(230,y,30)+ic(r[0],230,y);const num=r[1].slice(0,2),rest=r[1].slice(2);
    list+=`<text x="290" y="${y+8}" font-family="${F}" font-size="22" fill="${C.ink}"><tspan font-weight="800" fill="${C.med}">${num}</tspan><tspan font-weight="600">${esc(rest)}</tspan></text>`;
    if(i<rows.length-1)list+=`<line x1="205" y1="${y+50}" x2="1470" y2="${y+50}" stroke="${C.div}" stroke-width="1.5"/>`;});
  const foot=`<line x1="0" y1="835" x2="${kit.W}" y2="835" stroke="${C.sage}" stroke-width="1.5"/>${kit.circleIco(150,882,26)}${ic('coins',150,882)}<text x="190" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Artefact #6</text><text x="190" y="901" font-family="${F}" font-size="18" fill="${C.ink}">of your Venture Workbook</text><path d="M560 882 h40 m-10 -7 l10 7 l-10 7" fill="none" stroke="${C.med}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>${kit.circleIco(690,882,26)}${ic('rocket',690,882)}<text x="730" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Next:</text><text x="730" y="901" font-family="${F}" font-size="18" fill="${C.ink}">go-to-market</text>`;
  return kit.frame(kit.head('YOUR ASSIGNMENT')+list+foot);
}

const dir = process.argv[2];
const M = process.env.MODULE || 'm6';
const only = (process.env.ONLY || '').split(',').filter(Boolean);
const want = n => only.length === 0 || only.includes(n);
const slides = { '02': s2, '03': s3, '04': s4, '05': s5, '06': s6, '07': s7, '08': () => s8(dir), '09': s9 };
for (const [n, fn] of Object.entries(slides)) if (want(n)) kit.render(fn(), `${dir}/${M}-s${n}.png`);
