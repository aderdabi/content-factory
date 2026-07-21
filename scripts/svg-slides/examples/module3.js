// Module 3 slides: exact SVG for data/diagram slides + composite for S7/S8.
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const W=1672,H=941;
const CREAM='#F2F1E8',DARK='#1B3A26',MED='#5E7D3A',INK='#26331F',GREY='#8A8F82';
const PANEL='#FBFBF6',SAGE='#C9D3B4',PALE='#E4EACF',DIV='#DBE0C8',BANNER='#EBEEDD',TERRA='#B8543A',RED='#B8543A';
const F='Helvetica, Arial, sans-serif';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const PILL='MODULE 3 OF 7';

function header(){return `
  <circle cx="92" cy="92" r="36" fill="none" stroke="${MED}" stroke-width="3"/>
  <path d="M92 72 C 80 82,80 104,92 114 C 104 104,104 82,92 72 Z" fill="none" stroke="${MED}" stroke-width="2.5"/>
  <line x1="92" y1="72" x2="92" y2="118" stroke="${MED}" stroke-width="2.5"/>
  <line x1="134" y1="58" x2="134" y2="132" stroke="${DARK}" stroke-width="2"/>
  <text x="150" y="79" font-family="${F}" font-size="20" font-weight="700" fill="${GREY}" letter-spacing="1.5">SUSTAINABLE</text>
  <text x="150" y="105" font-family="${F}" font-size="20" font-weight="800" fill="${DARK}" letter-spacing="1">BUSINESS</text>
  <text x="150" y="131" font-family="${F}" font-size="20" font-weight="800" fill="${DARK}" letter-spacing="1">MODELS</text>
  <rect x="1452" y="58" width="168" height="44" rx="22" fill="${DARK}"/>
  <text x="1536" y="86" font-family="${F}" font-size="18" font-weight="700" fill="${CREAM}" text-anchor="middle" letter-spacing="1">${PILL}</text>`;}
function decor(){return `
  <circle cx="1740" cy="500" r="250" fill="${PALE}" opacity="0.6"/>
  <path d="M1636 300 C 1648 460,1636 640,1600 800" fill="none" stroke="${MED}" stroke-width="3" stroke-linecap="round"/>
  <g fill="${MED}" opacity="0.9">
   <path d="M1636 360 C 1600 350,1576 372,1580 404 C 1616 412,1640 392,1636 360 Z"/>
   <path d="M1632 452 C 1668 442,1692 466,1686 498 C 1650 504,1628 484,1632 452 Z"/>
   <path d="M1626 548 C 1590 540,1566 564,1572 596 C 1608 602,1630 580,1626 548 Z"/>
   <path d="M1618 644 C 1654 636,1678 660,1670 692 C 1634 698,1614 676,1618 644 Z"/>
   <path d="M1606 738 C 1572 732,1550 756,1558 786 C 1592 790,1612 768,1606 738 Z"/></g>`;}
function head(main,sub,cx){cx=cx||780;let s=`<text x="${cx}" y="150" font-family="${F}" font-size="54" font-weight="800" fill="${DARK}" text-anchor="middle" letter-spacing="1">${esc(main)}</text>`;
  if(sub)s+=`<text x="${cx}" y="192" font-family="${F}" font-size="24" font-style="italic" fill="${MED}" text-anchor="middle">${esc(sub)}</text>`;
  s+=`<rect x="${cx-52}" y="${sub?205:168}" width="104" height="4" rx="2" fill="${MED}"/>`;return s;}
function circleIco(cx,cy,r){return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PALE}"/>`;}
function panel(x,y,w,h){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${PANEL}" stroke="${SAGE}" stroke-width="2"/>`;}
function ptitle(x,y,t){return `<text x="${x}" y="${y}" font-family="${F}" font-size="24" font-weight="800" fill="${MED}" letter-spacing="0.5">${esc(t)}</text>`;}
function banner(y,segs,w){w=w||1482;let t=segs.map(g=>`<tspan fill="${g.c==='t'?TERRA:(g.c==='g'?MED:INK)}">${esc(g.t)}</tspan>`).join('');
 return `<rect x="80" y="${y}" width="${w}" height="86" rx="16" fill="${BANNER}" stroke="${SAGE}" stroke-width="2"/>
  <circle cx="150" cy="${y+43}" r="27" fill="none" stroke="${MED}" stroke-width="2.6"/>${ic('bang',150,y+43)}
  <text x="210" y="${y+53}" font-family="${F}" font-size="28" font-weight="700">${t}</text>`;}
function frame(inner){return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${CREAM}"/>${decor()}${header()}${inner}</svg>`;}

function ic(t,cx,cy,c){c=c||MED;const s=`stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
 switch(t){
  case 'bang':return `<line x1="${cx}" y1="${cy-13}" x2="${cx}" y2="${cy+4}" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/><circle cx="${cx}" cy="${cy+13}" r="2.4" fill="${c}"/>`;
  case 'phone':return `<rect x="${cx-9}" y="${cy-16}" width="18" height="32" rx="3" ${s}/><line x1="${cx-4}" y1="${cy-12}" x2="${cx+4}" y2="${cy-12}" ${s}/><circle cx="${cx}" cy="${cy+11}" r="1.6" fill="${c}"/>`;
  case 'seed':return `<path d="M${cx-12} ${cy-10} h24 l-3 24 a3 3 0 0 1 -3 3 h-12 a3 3 0 0 1 -3 -3 z" ${s}/><path d="M${cx-6} ${cy-10} l3 -6 M${cx+6} ${cy-10} l-3 -6" ${s}/><circle cx="${cx}" cy="${cy+6}" r="4" ${s}/>`;
  case 'drop':return `<path d="M${cx} ${cy-15} c 8 10 12 15 12 22 a12 12 0 0 1 -24 0 c 0 -7 4 -12 12 -22 z" ${s}/>`;
  case 'sat':return `<rect x="${cx-6}" y="${cy-6}" width="12" height="12" rx="2" transform="rotate(45 ${cx} ${cy})" ${s}/><rect x="${cx-20}" y="${cy-4}" width="10" height="8" transform="rotate(45 ${cx} ${cy})" ${s}/><rect x="${cx+10}" y="${cy-4}" width="10" height="8" transform="rotate(45 ${cx} ${cy})" ${s}/><path d="M${cx+6} ${cy+6} q10 0 10 10" ${s}/>`;
  case 'hands':return `<path d="M${cx-17} ${cy+2} l8 -6 l6 4 l6 -4 l8 6" ${s}/><path d="M${cx-17} ${cy+2} l-2 7 M${cx+17} ${cy+2} l2 7" ${s}/>`;
  case 'tag':return `<path d="M${cx-14} ${cy-14} h14 l14 14 l-14 14 l-14 -14 z" ${s}/><circle cx="${cx-6}" cy="${cy-6}" r="2.5" fill="${c}"/>`;
  case 'cal':return `<rect x="${cx-15}" y="${cy-13}" width="30" height="26" rx="3" ${s}/><line x1="${cx-15}" y1="${cy-4}" x2="${cx+15}" y2="${cy-4}" ${s}/><line x1="${cx-8}" y1="${cy-18}" x2="${cx-8}" y2="${cy-9}" ${s}/><line x1="${cx+8}" y1="${cy-18}" x2="${cx+8}" y2="${cy-9}" ${s}/>`;
  case 'sunrise':return `<line x1="${cx-18}" y1="${cy+10}" x2="${cx+18}" y2="${cy+10}" ${s}/><path d="M${cx-11} ${cy+10} a11 11 0 0 1 22 0" ${s}/><line x1="${cx}" y1="${cy-14}" x2="${cx}" y2="${cy-6}" ${s}/><line x1="${cx-15}" y1="${cy-6}" x2="${cx-11}" y2="${cy-2}" ${s}/><line x1="${cx+15}" y1="${cy-6}" x2="${cx+11}" y2="${cy-2}" ${s}/>`;
  case 'sun':return `<circle cx="${cx}" cy="${cy}" r="8" ${s}/><g ${s}>${[0,45,90,135,180,225,270,315].map(a=>{const r=Math.PI*a/180;return `<line x1="${(cx+Math.cos(r)*12).toFixed(1)}" y1="${(cy+Math.sin(r)*12).toFixed(1)}" x2="${(cx+Math.cos(r)*17).toFixed(1)}" y2="${(cy+Math.sin(r)*17).toFixed(1)}"/>`}).join('')}</g>`;
  case 'pricedown':return `<line x1="${cx}" y1="${cy-14}" x2="${cx}" y2="${cy+12}" ${s}/><path d="M${cx-9} ${cy+3} l9 10 l9 -10" ${s}/><text x="${cx}" y="${cy-4}" font-family="${F}" font-size="15" font-weight="700" fill="${c}" text-anchor="middle">$</text>`;
  case 'trash':return `<path d="M${cx-13} ${cy-8} h26 l-2 24 a3 3 0 0 1 -3 3 h-16 a3 3 0 0 1 -3 -3 z" ${s}/><line x1="${cx-16}" y1="${cy-8}" x2="${cx+16}" y2="${cy-8}" ${s}/><path d="M${cx-6} ${cy-8} v-4 h12 v4" ${s}/>`;
  case 'lamp':return `<path d="M${cx-8} ${cy-14} h16" ${s}/><path d="M${cx-9} ${cy-2} q0 -12 9 -12 q9 0 9 12 v14 h-18 z" ${s}/><line x1="${cx}" y1="${cy-18}" x2="${cx}" y2="${cy-14}" ${s}/>`;
  case 'flag':return `<line x1="${cx-9}" y1="${cy-15}" x2="${cx-9}" y2="${cy+15}" ${s}/><path d="M${cx-9} ${cy-14} h20 l-6 7 l6 7 h-20 z" ${s}/>`;
  case 'fuel':return `<rect x="${cx-12}" y="${cy-12}" width="22" height="26" rx="2" ${s}/><path d="M${cx+10} ${cy-6} h6 v8" ${s}/><line x1="${cx-6}" y1="${cy-12}" x2="${cx-2}" y2="${cy-16}" ${s}/><line x1="${cx-8}" y1="${cy-4}" x2="${cx+4}" y2="${cy-4}" ${s}/>`;
  case 'sack':return `<path d="M${cx-12} ${cy-12} q12 6 24 0 l-2 22 a4 4 0 0 1 -4 4 h-12 a4 4 0 0 1 -4 -4 z" ${s}/><line x1="${cx-8}" y1="${cy-9}" x2="${cx+8}" y2="${cy-9}" ${s}/>`;
  case 'solarp':return `<rect x="${cx-16}" y="${cy-10}" width="32" height="20" rx="2" ${s}/><line x1="${cx-16}" y1="${cy}" x2="${cx+16}" y2="${cy}" ${s}/><line x1="${cx-5}" y1="${cy-10}" x2="${cx-5}" y2="${cy+10}" ${s}/><line x1="${cx+6}" y1="${cy-10}" x2="${cx+6}" y2="${cy+10}" ${s}/><line x1="${cx}" y1="${cy+10}" x2="${cx}" y2="${cy+15}" ${s}/>`;
  case 'battery':return `<rect x="${cx-15}" y="${cy-9}" width="28" height="18" rx="3" ${s}/><rect x="${cx+13}" y="${cy-4}" width="4" height="8" rx="1" ${s}/><path d="M${cx-2} ${cy-5} l-4 6 h6 l-4 6" ${s}/>`;
  case 'brick':return `<rect x="${cx-16}" y="${cy-9}" width="32" height="18" rx="2" ${s}/><line x1="${cx}" y1="${cy-9}" x2="${cx}" y2="${cy+9}" ${s}/>`;
  case 'scale':return `<line x1="${cx}" y1="${cy-15}" x2="${cx}" y2="${cy+13}" ${s}/><line x1="${cx-15}" y1="${cy-11}" x2="${cx+15}" y2="${cy-11}" ${s}/><path d="M${cx-15} ${cy-11} l-5 10 h10 z" ${s}/><path d="M${cx+15} ${cy-11} l-5 10 h10 z" ${s}/><line x1="${cx-8}" y1="${cy+13}" x2="${cx+8}" y2="${cy+13}" ${s}/>`;
  case 'target':return `<circle cx="${cx}" cy="${cy}" r="15" ${s}/><circle cx="${cx}" cy="${cy}" r="9" ${s}/><circle cx="${cx}" cy="${cy}" r="3" fill="${c}"/>`;
  case 'canvas':return `<rect x="${cx-16}" y="${cy-11}" width="20" height="22" rx="2" ${s}/><circle cx="${cx+8}" cy="${cy}" r="9" ${s}/>`;
  case 'path':return `<path d="M${cx-4} ${cy+15} q-14 -6 0 -14 q14 -8 0 -16" ${s}/><circle cx="${cx-4}" cy="${cy+15}" r="2" fill="${c}"/>`;
  case 'sauce':return `<path d="M${cx-2} ${cy-17} h4 v3 h-4 z" ${s}/><path d="M${cx-8} ${cy-11} h16 v4 l-2 4 v14 a3 3 0 0 1 -3 3 h-6 a3 3 0 0 1 -3 -3 v-14 l-2 -4 z" ${s}/><ellipse cx="${cx}" cy="${cy+3}" rx="4" ry="6" ${s}/>`;
  case 'crown':return `<path d="M${cx-15} ${cy+8} l-2 -18 l8 7 l6 -12 l6 12 l8 -7 l-2 18 z" ${s}/>`;
  case 'plus':return `<line x1="${cx-9}" y1="${cy}" x2="${cx+9}" y2="${cy}" stroke="${c}" stroke-width="3" stroke-linecap="round"/><line x1="${cx}" y1="${cy-9}" x2="${cx}" y2="${cy+9}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;
  case 'check':return `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${MED}" stroke-width="2.4"/><path d="M${cx-7} ${cy} l5 6 l9 -11" stroke="${MED}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  default:return `<circle cx="${cx}" cy="${cy}" r="4" fill="${c}"/>`;}}

// ---- S2 target ----
function s2(){
 const cx=490,cy=460;const R=[248,186,124,66];
 let rings=`<circle cx="${cx}" cy="${cy}" r="${R[0]}" fill="#EFF1E4" stroke="${SAGE}" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${R[1]}" fill="#E6EBD6" stroke="${SAGE}" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${R[2]}" fill="#DAE2C4" stroke="${SAGE}" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="${R[3]}" fill="${MED}"/>`;
 const labs=[['WHO: customer',cy-R[0]+32,DARK],['WHAT: product',cy-R[1]+30,DARK],['HOW: value proposition',cy-R[2]+28,DARK],['WHY: vision',cy+6,CREAM]];
 labs.forEach(l=>rings+=`<text x="${cx}" y="${l[1]}" font-family="${F}" font-size="20" font-weight="800" fill="${l[2]}" text-anchor="middle">${esc(l[0])}</text>`);
 // PMF pill below the target, clear of the banner, with a small circular-arrow icon
 const py=cy+R[0]+28;
 rings+=`<rect x="${cx-135}" y="${py}" width="270" height="40" rx="20" fill="${TERRA}"/>
  <path d="M${cx-98} ${py+13} a9 9 0 1 0 3 -7" fill="none" stroke="#FFF" stroke-width="2.2" stroke-linecap="round"/><path d="M${cx-95} ${py+4} l1 6 l6 -1" fill="none" stroke="#FFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${cx+12}" y="${py+27}" font-family="${F}" font-size="18" font-weight="800" fill="#FFF" text-anchor="middle">PRODUCT-MARKET FIT</text>`;
 const warn=`<rect x="1020" y="330" width="540" height="360" rx="18" fill="#FBF3F0" stroke="${TERRA}" stroke-width="2"/>
  <circle cx="1065" cy="390" r="22" fill="none" stroke="${TERRA}" stroke-width="2.4"/>${ic('bang',1065,390,TERRA)}
  <text x="1100" y="398" font-family="${F}" font-size="22" font-weight="800" fill="${TERRA}">THE CLASSIC FAILURE</text>
  <text x="1055" y="480" font-family="${F}" font-size="24" font-weight="600" fill="${INK}">Start at WHAT:</text>
  <text x="1055" y="520" font-family="${F}" font-size="24" font-weight="600" fill="${INK}">a technology in search</text>
  <text x="1055" y="556" font-family="${F}" font-size="24" font-weight="600" fill="${INK}">of a market.</text>`;
 return frame(`${head('HOLD FOUR QUESTIONS IN ORDER',null,780)}${rings}${warn}
  ${banner(800,[{t:'THE PRODUCT IS '},{t:'QUESTION THREE',c:'g'},{t:', NOT QUESTION ONE.'}])}`);
}

// ---- S3 secret sauce table ----
function s3(){
 const rows=[['phone','M-KOPA','Credit rails + 30,000 agents'],['seed','PULA','Insurance embedded where farmers already buy'],['drop','SUNCULTURE','Payments matched to harvests'],['sat','APOLLO','Credit scored from satellite images'],['hands','SANERGY','1,200 community franchisees']];
 const px=100,py=250,pw=1400,ph=490;const first=py+55,step=(ph-90)/4;
 let tbl=panel(px,py,pw,ph);
 rows.forEach((r,i)=>{const cy=first+i*step;tbl+=circleIco(180,cy,28)+ic(r[0],180,cy);
  tbl+=`<text x="245" y="${cy+8}" font-family="${F}" font-size="27" font-weight="800" fill="${DARK}">${esc(r[1])}</text>`;
  tbl+=`<text x="620" y="${cy+8}" font-family="${F}" font-size="24" font-weight="500" fill="${INK}">${esc(r[2])}</text>`;
  if(i<rows.length-1)tbl+=`<line x1="150" y1="${cy+step/2}" x2="1450" y2="${cy+step/2}" stroke="${DIV}" stroke-width="1.5"/>`;});
 return frame(`${head('YOUR SECRET SAUCE','What can nobody copy in two years?',780)}${tbl}
  ${banner(800,[{t:'WORKING HARD IS '},{t:'NOT A COMPETENCE',c:'t'},{t:'. EVERYONE CLAIMS THAT.'}])}`);
}

// ---- S4 VPC ----
function s4(){
 const sq=`<rect x="120" y="300" width="360" height="360" rx="24" fill="${PANEL}" stroke="${MED}" stroke-width="2.5"/>
  <text x="300" y="285" font-family="${F}" font-size="22" font-weight="800" fill="${DARK}" text-anchor="middle">VALUE MAP</text>
  <line x1="120" y1="420" x2="480" y2="420" stroke="${SAGE}" stroke-width="1.5"/><line x1="120" y1="540" x2="480" y2="540" stroke="${SAGE}" stroke-width="1.5"/>
  <text x="300" y="368" font-family="${F}" font-size="19" font-weight="700" fill="${INK}" text-anchor="middle">PRODUCTS &amp; SERVICES</text>
  <text x="300" y="488" font-family="${F}" font-size="19" font-weight="700" fill="${INK}" text-anchor="middle">PAIN RELIEVERS</text>
  <text x="300" y="608" font-family="${F}" font-size="19" font-weight="700" fill="${INK}" text-anchor="middle">GAIN CREATORS</text>`;
 const cirC=830,cirY=480,cr=180;
 let cir=`<circle cx="${cirC}" cy="${cirY}" r="${cr}" fill="${PANEL}" stroke="${MED}" stroke-width="2.5"/>
  <text x="${cirC}" y="285" font-family="${F}" font-size="22" font-weight="800" fill="${DARK}" text-anchor="middle">CUSTOMER PROFILE</text>`;
 [30,150,270].forEach(a=>{const r=Math.PI*a/180;cir+=`<line x1="${cirC}" y1="${cirY}" x2="${(cirC+Math.cos(r)*cr).toFixed(1)}" y2="${(cirY+Math.sin(r)*cr).toFixed(1)}" stroke="${SAGE}" stroke-width="1.5"/>`;});
 [['JOBS',-90],['PAINS',30],['GAINS',150]].forEach(p=>{const r=Math.PI*p[1]/180;const lx=cirC+Math.cos(r)*105,ly=cirY+Math.sin(r)*105;cir+=`<text x="${lx.toFixed(0)}" y="${(ly+6).toFixed(0)}" font-family="${F}" font-size="20" font-weight="800" fill="${DARK}" text-anchor="middle">${p[0]}</text>`;});
 const arrow=`<path d="M500 480 h120 m-14 -12 l14 12 l-14 12" fill="none" stroke="${MED}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><text x="560" y="455" font-family="${F}" font-size="20" font-weight="800" fill="${MED}" text-anchor="middle">FIT</text>`;
 const match=`${panel(1070,320,490,360)}${ptitle(1100,375,"SUNCULTURE'S MATCH")}
  ${circleIco(1130,450,27)}${ic('tag',1130,450)}<text x="1170" y="445" font-family="${F}" font-size="21" font-weight="700" fill="${DARK}">Killer pain:</text><text x="1170" y="472" font-family="${F}" font-size="20" fill="${INK}">the upfront price</text>
  ${circleIco(1130,560,27)}${ic('cal',1130,560)}<text x="1170" y="555" font-family="${F}" font-size="21" font-weight="700" fill="${DARK}">Killer reliever:</text><text x="1170" y="582" font-family="${F}" font-size="20" fill="${INK}">pay-as-you-grow</text>`;
 return frame(`${head('THE VALUE PROPOSITION CANVAS',null,780)}${sq}${arrow}${cir}${match}
  ${banner(800,[{t:'ONE CANVAS '},{t:'PER SEGMENT',c:'g'},{t:'. ALWAYS.'}])}`);
}

// ---- S5 workflow ----
function s5(){
 const steps=[[300,'sunrise','Buy at dawn'],[640,'sun','Display in heat'],[980,'pricedown','Discount by noon'],[1320,'trash','Discard at dusk']];
 let tl=`<line x1="300" y1="320" x2="1320" y2="320" stroke="${SAGE}" stroke-width="3"/>`;
 steps.forEach(st=>{tl+=circleIco(st[0],320,44)+ic(st[1],st[0],320)+`<text x="${st[0]}" y="405" font-family="${F}" font-size="21" font-weight="700" fill="${INK}" text-anchor="middle">${esc(st[2])}</text>`;});
 tl+=`<circle cx="810" cy="320" r="22" fill="${MED}"/>${ic('plus',810,320,'#FFF')}<text x="810" y="255" font-family="${F}" font-size="18" font-weight="800" fill="${MED}" text-anchor="middle">COLD ROOM ENTERS HERE</text>`;
 const tiles=[['2 → 21',['days of','shelf life'],290],['×2',['user','incomes'],600],['-80%',['food waste for','stored produce'],910],['$0.25-0.50',['per crate','per day'],1220]];
 let ts='';tiles.forEach(t=>{ts+=`<rect x="${t[2]-135}" y="470" width="270" height="200" rx="16" fill="${PANEL}" stroke="${SAGE}" stroke-width="2"/>`;
  ts+=`<text x="${t[2]}" y="560" font-family="${F}" font-size="${t[0].length>7?42:54}" font-weight="800" fill="${MED}" text-anchor="middle">${esc(t[0])}</text>`;
  ts+=`<text x="${t[2]}" y="608" font-family="${F}" font-size="20" fill="${INK}" text-anchor="middle">${esc(t[1][0])}</text><text x="${t[2]}" y="634" font-family="${F}" font-size="20" fill="${INK}" text-anchor="middle">${esc(t[1][1])}</text>`;});
 return frame(`${head("WALK THE CUSTOMER'S DAY",null,780)}${tl}${ts}
  ${banner(710,[{t:'THE WORKFLOW TELLS YOU WHERE TO '},{t:'BUILD',c:'g'},{t:' AND WHAT TO '},{t:'CHARGE',c:'g'},{t:'.'}])}`);
}

// ---- S6 status quo vs offer ----
function s6(){
 const L=[['lamp','Kerosene: daily coins'],['fuel','Petrol: 3 litres a day'],['sack','Cement walls']];
 const R=[['solarp','Solar: ~$0.50 a day'],['battery','Swap: cheaper per km'],['brick','Walls: 40% cheaper']];
 let cols=`${panel(110,300,640,430)}${panel(922,300,640,430)}
  ${ic('crown',430,285,TERRA)}
  <text x="430" y="360" font-family="${F}" font-size="26" font-weight="800" fill="${TERRA}" text-anchor="middle">THE STATUS QUO</text>
  <text x="1242" y="360" font-family="${F}" font-size="26" font-weight="800" fill="${MED}" text-anchor="middle">YOUR OFFER</text>
  <line x1="150" y1="392" x2="710" y2="392" stroke="${DIV}" stroke-width="1.5"/><line x1="962" y1="392" x2="1522" y2="392" stroke="${DIV}" stroke-width="1.5"/>`;
 L.forEach((r,i)=>{const y=460+i*90;cols+=circleIco(200,y,27)+ic(r[0],200,y,TERRA)+`<text x="245" y="${y+8}" font-family="${F}" font-size="23" font-weight="600" fill="${INK}">${esc(r[1])}</text>`;});
 R.forEach((r,i)=>{const y=460+i*90;cols+=circleIco(1012,y,27)+ic(r[0],1012,y)+`<text x="1057" y="${y+8}" font-family="${F}" font-size="23" font-weight="600" fill="${INK}">${esc(r[1])}</text>`;});
 cols+=`<circle cx="836" cy="490" r="42" fill="${DARK}"/><text x="836" y="500" font-family="${F}" font-size="28" font-weight="800" fill="${CREAM}" text-anchor="middle">VS</text>`;
 return frame(`${head('YOUR REAL COMPETITOR',null,780)}${cols}
  ${banner(800,[{t:'CUSTOMERS BUY '},{t:'PAINKILLERS',c:'g'},{t:', NOT VITAMIN PILLS.'}])}`);
}

// ---- S9 assignment ----
function s9(){
 const rows=[['sauce','1. Core competence in one sentence, 2-year copy test'],['canvas','2. Value Proposition Canvas for your top 2 segments'],['path','3. Workflow map + social & ecological checks'],['scale',"4. Beat the status quo's daily cost, in their arithmetic"],['flag','5. Shortlist your beachhead, pros and cons']];
 let list=panel(180,250,1320,540);
 rows.forEach((r,i)=>{const y=320+i*100;list+=circleIco(270,y,30)+ic(r[0],270,y);const num=r[1].slice(0,2),rest=r[1].slice(2);
  list+=`<text x="330" y="${y+9}" font-family="${F}" font-size="26" fill="${INK}"><tspan font-weight="800" fill="${MED}">${num}</tspan><tspan font-weight="600">${esc(rest)}</tspan></text>`;
  if(i<rows.length-1)list+=`<line x1="240" y1="${y+50}" x2="1440" y2="${y+50}" stroke="${DIV}" stroke-width="1.5"/>`;});
 const foot=`<line x1="0" y1="835" x2="${W}" y2="835" stroke="${SAGE}" stroke-width="1.5"/>
  ${circleIco(150,882,26)}${ic('canvas',150,882)}<text x="190" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${DARK}">Artefact #3</text><text x="190" y="901" font-family="${F}" font-size="18" fill="${INK}">of your Venture Workbook</text>
  <path d="M560 882 h40 m-10 -7 l10 7 l-10 7" fill="none" stroke="${MED}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  ${circleIco(690,882,26)}${ic('target',690,882)}<text x="730" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${DARK}">Next:</text><text x="730" y="901" font-family="${F}" font-size="18" fill="${INK}">sizing the market</text>`;
 return frame(`${head('YOUR ASSIGNMENT',null,780)}${list}${foot}`);
}

// ---- composite S7 ----
function s7(dir){
 const img=fs.readFileSync(dir+'/m3-s7.png').toString('base64');
 const tiles=[['3 L',['petrol burned','per rider per day'],970,300],['+35%',['rider income','after switching'],1290,300],['20,000+',['battery swaps','every day'],970,540],['400M km',['proven','riding data'],1290,540]];
 let ts='';tiles.forEach(t=>{ts+=`<rect x="${t[2]-140}" y="${t[3]-70}" width="280" height="210" rx="16" fill="${PANEL}" stroke="${SAGE}" stroke-width="2"/>`;
  ts+=`<text x="${t[2]}" y="${t[3]+10}" font-family="${F}" font-size="${t[0].length>6?40:50}" font-weight="800" fill="${MED}" text-anchor="middle">${esc(t[0])}</text>`;
  ts+=`<text x="${t[2]}" y="${t[3]+52}" font-family="${F}" font-size="19" fill="${INK}" text-anchor="middle">${esc(t[1][0])}</text><text x="${t[2]}" y="${t[3]+78}" font-family="${F}" font-size="19" fill="${INK}" text-anchor="middle">${esc(t[1][1])}</text>`;});
 const chips=['Concentrated','Organised','High-frequency','Loud word of mouth'];
 let cr='';let x=830;chips.forEach(ch=>{const w=ch.length*11+40;cr+=`<rect x="${x}" y="700" width="${w}" height="40" rx="20" fill="${PALE}"/><text x="${x+w/2}" y="726" font-family="${F}" font-size="17" font-weight="700" fill="${DARK}" text-anchor="middle">${esc(ch)}</text>`;x+=w+14;});
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><clipPath id="c7"><rect x="0" y="210" width="790" height="600"/></clipPath></defs>
  <rect width="${W}" height="${H}" fill="${CREAM}"/>${decor()}
  <image href="data:image/png;base64,${img}" x="0" y="0" width="${W}" height="${H}" clip-path="url(#c7)"/>
  ${header()}${head('CASE STUDY: AMPERSAND','One segment first: Kigali moto-taxi riders',780)}
  ${ts}${cr}
  ${banner(820,[{t:'WIN ONE NARROW SEGMENT WHERE YOUR '},{t:'MATHS WINS DAILY',c:'g'},{t:'.'}])}</svg>`;
}

// ---- composite S8 ----
function s8(dir){
 const img=fs.readFileSync(dir+'/m3-s8.png').toString('base64');
 const rules=['Has the problem','Knows they have it','Actively searching','Has money to pay','Shares your vision'];
 let pnl=`${panel(850,235,650,520)}${ptitle(890,295,'ALL FIVE MUST HOLD')}`;
 rules.forEach((r,i)=>{const y=360+i*76;pnl+=ic('check',895,y)+`<text x="940" y="${y+8}" font-family="${F}" font-size="24" font-weight="600" fill="${INK}">${esc(r)}</text>`;
  if(i<rules.length-1)pnl+=`<line x1="890" y1="${y+38}" x2="1460" y2="${y+38}" stroke="${DIV}" stroke-width="1.3"/>`;});
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><clipPath id="c8"><rect x="0" y="205" width="810" height="610"/></clipPath></defs>
  <rect width="${W}" height="${H}" fill="${CREAM}"/>${decor()}
  <image href="data:image/png;base64,${img}" x="0" y="0" width="${W}" height="${H}" clip-path="url(#c8)"/>
  ${header()}${head('FIND THE EARLYVANGELISTS',null,780)}
  ${pnl}
  ${banner(810,[{t:'ONE EARLYVANGELIST IS WORTH '},{t:'TEN LUKEWARM PROSPECTS',c:'t'},{t:'.'}])}</svg>`;
}

function render(svg,out){const r=new Resvg(svg,{fitTo:{mode:'width',value:W},font:{loadSystemFonts:true,defaultFontFamily:'Helvetica'}});fs.writeFileSync(out,r.render().asPng());console.log('wrote',out);}
const dir=process.argv[2];
render(s2(),dir+'/m3-s2.png');
render(s3(),dir+'/m3-s3.png');
render(s4(),dir+'/m3-s4.png');
render(s5(),dir+'/m3-s5.png');
render(s6(),dir+'/m3-s6.png');
render(s7(dir),dir+'/m3-s7.png');
render(s8(dir),dir+'/m3-s8.png');
render(s9(),dir+'/m3-s9.png');
