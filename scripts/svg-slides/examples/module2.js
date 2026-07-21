// Module 2 slide rebuilds as exact SVG -> PNG. Numbers/text hard-coded.
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');

const W = 1672, H = 941;
const CREAM='#F2F1E8', DARK='#1B3A26', MED='#5E7D3A', INK='#26331F', GREY='#8A8F82';
const PANEL='#FBFBF6', SAGE='#C9D3B4', PALE='#E4EACF', DIV='#DBE0C8', BANNER='#EBEEDD';
const TERRA='#B8543A', RED='#B8543A';
const F='Helvetica, Arial, sans-serif';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function header(pill){pill=pill||'MODULE 2 OF 7';return `
  <circle cx="92" cy="92" r="36" fill="none" stroke="${MED}" stroke-width="3"/>
  <path d="M92 72 C 80 82,80 104,92 114 C 104 104,104 82,92 72 Z" fill="none" stroke="${MED}" stroke-width="2.5"/>
  <line x1="92" y1="72" x2="92" y2="118" stroke="${MED}" stroke-width="2.5"/>
  <line x1="134" y1="58" x2="134" y2="132" stroke="${DARK}" stroke-width="2"/>
  <text x="150" y="79" font-family="${F}" font-size="20" font-weight="700" fill="${GREY}" letter-spacing="1.5">SUSTAINABLE</text>
  <text x="150" y="105" font-family="${F}" font-size="20" font-weight="800" fill="${DARK}" letter-spacing="1">BUSINESS</text>
  <text x="150" y="131" font-family="${F}" font-size="20" font-weight="800" fill="${DARK}" letter-spacing="1">MODELS</text>
  <rect x="${1620-Math.max(168,pill.length*11)}" y="58" width="${Math.max(168,pill.length*11)}" height="44" rx="22" fill="${DARK}"/>
  <text x="${1620-Math.max(168,pill.length*11)/2}" y="86" font-family="${F}" font-size="18" font-weight="700" fill="${CREAM}" text-anchor="middle" letter-spacing="1">${pill}</text>`;}

function decor(){return `
  <circle cx="1740" cy="500" r="250" fill="${PALE}" opacity="0.6"/>
  <path d="M1636 300 C 1648 460,1636 640,1600 800" fill="none" stroke="${MED}" stroke-width="3" stroke-linecap="round"/>
  <g fill="${MED}" opacity="0.9">
   <path d="M1636 360 C 1600 350,1576 372,1580 404 C 1616 412,1640 392,1636 360 Z"/>
   <path d="M1632 452 C 1668 442,1692 466,1686 498 C 1650 504,1628 484,1632 452 Z"/>
   <path d="M1626 548 C 1590 540,1566 564,1572 596 C 1608 602,1630 580,1626 548 Z"/>
   <path d="M1618 644 C 1654 636,1678 660,1670 692 C 1634 698,1614 676,1618 644 Z"/>
   <path d="M1606 738 C 1572 732,1550 756,1558 786 C 1592 790,1612 768,1606 738 Z"/></g>`;}

function head(main,sub,cx,color){cx=cx||780;let s=`<text x="${cx}" y="150" font-family="${F}" font-size="54" font-weight="800" fill="${DARK}" text-anchor="middle" letter-spacing="1">${esc(main)}</text>`;
  if(sub)s+=`<text x="${cx}" y="192" font-family="${F}" font-size="24" font-style="italic" fill="${MED}" text-anchor="middle">${esc(sub)}</text>`;
  s+=`<rect x="${cx-52}" y="${sub?205:168}" width="104" height="4" rx="2" fill="${MED}"/>`;return s;}

function circleIco(cx,cy,r){return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PALE}"/>`;}
function ic(t,cx,cy,c){c=c||MED;const s=`stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
 switch(t){
  case 'clipboard':return `<rect x="${cx-14}" y="${cy-16}" width="28" height="32" rx="3" ${s}/><rect x="${cx-6}" y="${cy-20}" width="12" height="8" rx="2" ${s}/><line x1="${cx-8}" y1="${cy-6}" x2="${cx+8}" y2="${cy-6}" ${s}/><line x1="${cx-8}" y1="${cy+2}" x2="${cx+8}" y2="${cy+2}" ${s}/><line x1="${cx-8}" y1="${cy+10}" x2="${cx+4}" y2="${cy+10}" ${s}/>`;
  case 'lantern':return `<line x1="${cx-9}" y1="${cy-14}" x2="${cx+9}" y2="${cy-14}" ${s}/><path d="M${cx} ${cy-18} v4" ${s}/><rect x="${cx-11}" y="${cy-12}" width="22" height="28" rx="4" ${s}/><line x1="${cx} " y1="${cy-8}" x2="${cx}" y2="${cy+12}" ${s}/><path d="M${cx-4} ${cy-2} q4 -6 8 0" ${s}/>`;
  case 'group':return `<circle cx="${cx-11}" cy="${cy-4}" r="5" ${s}/><circle cx="${cx+11}" cy="${cy-4}" r="5" ${s}/><circle cx="${cx}" cy="${cy-7}" r="5.5" ${s}/><path d="M${cx-20} ${cy+13} c0-7 5-9 9-9 M${cx+20} ${cy+13} c0-7 -5-9 -9-9 M${cx-9} ${cy+13} c0-8 5-10 9-10 c4 0 9 2 9 10" ${s}/>`;
  case 'coin':return `<circle cx="${cx}" cy="${cy}" r="15" ${s}/><text x="${cx}" y="${cy+7}" font-family="${F}" font-size="20" font-weight="700" fill="${c}" text-anchor="middle">$</text>`;
  case 'coins':return `<ellipse cx="${cx}" cy="${cy+8}" rx="15" ry="5" ${s}/><ellipse cx="${cx}" cy="${cy}" rx="15" ry="5" ${s}/><ellipse cx="${cx}" cy="${cy-8}" rx="15" ry="5" ${s}/>`;
  case 'heart':return `<path d="M${cx} ${cy+13} C ${cx-20} ${cy-2}, ${cx-14} ${cy-16}, ${cx} ${cy-6} C ${cx+14} ${cy-16}, ${cx+20} ${cy-2}, ${cx} ${cy+13} Z" ${s}/><path d="M${cx} ${cy-6} l-5 8 l6 4 l-4 6" stroke="${CREAM}" stroke-width="2.2" fill="none"/>`;
  case 'glasses':return `<circle cx="${cx-11}" cy="${cy}" r="8" ${s}/><circle cx="${cx+11}" cy="${cy}" r="8" ${s}/><path d="M${cx-3} ${cy} h6" ${s}/><path d="M${cx-19} ${cy-3} l-4 -3 M${cx+19} ${cy-3} l4 -3" ${s}/>`;
  case 'thermo':return `<path d="M${cx-4} ${cy-14} a4 4 0 0 1 8 0 v14 a7 7 0 1 1 -8 0 z" ${s}/><line x1="${cx}" y1="${cy-8}" x2="${cx}" y2="${cy+6}" ${s}/><circle cx="${cx}" cy="${cy+10}" r="4" fill="${c}"/>`;
  case 'gear':return `<circle cx="${cx}" cy="${cy}" r="8" ${s}/><g ${s}>${[0,45,90,135,180,225,270,315].map(a=>{const r=Math.PI*a/180;return `<line x1="${(cx+Math.cos(r)*12).toFixed(1)}" y1="${(cy+Math.sin(r)*12).toFixed(1)}" x2="${(cx+Math.cos(r)*17).toFixed(1)}" y2="${(cy+Math.sin(r)*17).toFixed(1)}"/>`}).join('')}</g>`;
  case 'box':return `<path d="M${cx-16} ${cy-4} l16 -8 l16 8 l-16 8 z" ${s}/><path d="M${cx-16} ${cy-4} v12 l16 8 v-12 M${cx+16} ${cy-4} v12 l-16 8" ${s}/>`;
  case 'speech':return `<path d="M${cx-15} ${cy-12} h30 a4 4 0 0 1 4 4 v12 a4 4 0 0 1 -4 4 h-16 l-8 7 v-7 h-6 a4 4 0 0 1 -4 -4 v-12 a4 4 0 0 1 4 -4 z" ${s}/>`;
  case 'qspeech':return `<path d="M${cx-15} ${cy-12} h30 a4 4 0 0 1 4 4 v12 a4 4 0 0 1 -4 4 h-16 l-8 7 v-7 h-6 a4 4 0 0 1 -4 -4 v-12 a4 4 0 0 1 4 -4 z" ${s}/><text x="${cx}" y="${cy+3}" font-family="${F}" font-size="16" font-weight="700" fill="${c}" text-anchor="middle">?</text>`;
  case 'tomato':return `<circle cx="${cx}" cy="${cy+3}" r="13" ${s}/><path d="M${cx} ${cy-10} q-6 -6 -12 -4 q4 6 12 4 q8 2 12 -4 q-6 -2 -12 4" ${s}/>`;
  case 'cloud':return `<path d="M${cx-16} ${cy+6} a9 9 0 0 1 3 -17 a11 11 0 0 1 21 -2 a8 8 0 0 1 -1 19 z" ${s}/>`;
  case 'storm':return `<path d="M${cx-16} ${cy} a9 9 0 0 1 3 -17 a11 11 0 0 1 21 -2 a8 8 0 0 1 -1 19 z" ${s}/><path d="M${cx-2} ${cy+2} l-6 8 h6 l-4 8" ${s}/>`;
  case 'arrowup':return `<line x1="${cx}" y1="${cy+14}" x2="${cx}" y2="${cy-12}" ${s}/><path d="M${cx-9} ${cy-4} l9 -10 l9 10" ${s}/>`;
  case 'recycle':return `<g ${s}><path d="M${cx-2} ${cy-14} l-8 12 l6 2"/><path d="M${cx+14} ${cy+2} l-4 13 l-7 -3"/><path d="M${cx-16} ${cy+6} l6 12 l7 -2"/></g>`;
  case 'moto':return `<circle cx="${cx-11}" cy="${cy+8}" r="6" ${s}/><circle cx="${cx+13}" cy="${cy+8}" r="6" ${s}/><path d="M${cx-11} ${cy+8} l6 -12 h8 l4 6 M${cx-4} ${cy-4} h10" ${s}/>`;
  case 'basket':return `<path d="M${cx-15} ${cy-2} h30 l-4 16 h-22 z" ${s}/><path d="M${cx-9} ${cy-2} a9 9 0 0 1 18 0" ${s}/><line x1="${cx-6}" y1="${cy+2}" x2="${cx-4}" y2="${cy+14}" ${s}/><line x1="${cx+6}" y1="${cy+2}" x2="${cx+4}" y2="${cy+14}" ${s}/>`;
  case 'gift':return `<rect x="${cx-15}" y="${cy-4}" width="30" height="20" rx="2" ${s}/><rect x="${cx-17}" y="${cy-12}" width="34" height="8" rx="2" ${s}/><line x1="${cx}" y1="${cy-12}" x2="${cx}" y2="${cy+16}" ${s}/><path d="M${cx} ${cy-12} c-8 -10 -16 -2 0 0 c8 -10 16 -2 0 0" ${s}/>`;
  case 'sun':return `<circle cx="${cx}" cy="${cy}" r="8" ${s}/><g ${s}>${[0,45,90,135,180,225,270,315].map(a=>{const r=Math.PI*a/180;return `<line x1="${(cx+Math.cos(r)*12).toFixed(1)}" y1="${(cy+Math.sin(r)*12).toFixed(1)}" x2="${(cx+Math.cos(r)*17).toFixed(1)}" y2="${(cy+Math.sin(r)*17).toFixed(1)}"/>`}).join('')}</g>`;
  case 'mic':return `<rect x="${cx-6}" y="${cy-16}" width="12" height="22" rx="6" ${s}/><path d="M${cx-11} ${cy-2} a11 11 0 0 0 22 0" ${s}/><line x1="${cx}" y1="${cy+9}" x2="${cx}" y2="${cy+16}" ${s}/>`;
  case 'puzzle':return `<path d="M${cx-14} ${cy-14} h10 a4 4 0 0 1 8 0 h10 v10 a4 4 0 0 1 0 8 v10 h-28 z" ${s}/>`;
  case 'pentagon':return `<path d="M${cx} ${cy-16} l15 11 l-6 18 h-18 l-6 -18 z" ${s}/>`;
  case 'temple':return `<path d="M${cx-16} ${cy-8} l16 -10 l16 10 z" ${s}/><line x1="${cx-14}" y1="${cy-6}" x2="${cx-14}" y2="${cy+12}" ${s}/><line x1="${cx-5}" y1="${cy-6}" x2="${cx-5}" y2="${cy+12}" ${s}/><line x1="${cx+5}" y1="${cy-6}" x2="${cx+5}" y2="${cy+12}" ${s}/><line x1="${cx+14}" y1="${cy-6}" x2="${cx+14}" y2="${cy+12}" ${s}/><line x1="${cx-17}" y1="${cy+13}" x2="${cx+17}" y2="${cy+13}" ${s}/>`;
  case 'tree':return `<circle cx="${cx}" cy="${cy-6}" r="12" ${s}/><line x1="${cx}" y1="${cy+4}" x2="${cx}" y2="${cy+16}" ${s}/><path d="M${cx} ${cy+16} l-8 4 M${cx} ${cy+16} l8 4" ${s}/>`;
  case 'mag':return `<circle cx="${cx-4}" cy="${cy-4}" r="10" ${s}/><line x1="${cx+4}" y1="${cy+4}" x2="${cx+13}" y2="${cy+13}" ${s}/>`;
  case 'file':return `<path d="M${cx-11} ${cy-15} h14 l8 8 v22 h-22 z" ${s}/><path d="M${cx+3} ${cy-15} v8 h8" ${s}/>`;
  case 'check':return `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${MED}" stroke-width="2.4"/><path d="M${cx-7} ${cy} l5 6 l9 -11" stroke="${MED}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  case 'cross':return `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${RED}" stroke-width="2.4"/><path d="M${cx-6} ${cy-6} l12 12 M${cx+6} ${cy-6} l-12 12" stroke="${RED}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  case 'people':return `<circle cx="${cx-8}" cy="${cy-6}" r="5" ${s}/><circle cx="${cx+8}" cy="${cy-6}" r="5" ${s}/><path d="M${cx-17} ${cy+12} c0-8 6-11 9-11 c3 0 9 3 9 11" ${s}/>`;
  case 'flag':return `<line x1="${cx-9}" y1="${cy-15}" x2="${cx-9}" y2="${cy+15}" ${s}/><path d="M${cx-9} ${cy-14} h20 l-6 7 l6 7 h-20 z" ${s}/>`;
  case 'building':return `<rect x="${cx-14}" y="${cy-14}" width="28" height="28" rx="2" ${s}/><line x1="${cx-6}" y1="${cy-14}" x2="${cx-6}" y2="${cy+14}" ${s}/><line x1="${cx+4}" y1="${cy-14}" x2="${cx+4}" y2="${cy+14}" ${s}/><line x1="${cx-14}" y1="${cy-4}" x2="${cx+14}" y2="${cy-4}" ${s}/>`;
  case 'eye':return `<path d="M${cx-15} ${cy} q15 -12 30 0 q-15 12 -30 0 z" ${s}/><circle cx="${cx}" cy="${cy}" r="4.5" ${s}/>`;
  case 'bang':return `<line x1="${cx}" y1="${cy-13}" x2="${cx}" y2="${cy+4}" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/><circle cx="${cx}" cy="${cy+13}" r="2.4" fill="${c}"/>`;
  case 'flask':return `<path d="M${cx-4} ${cy-14} v8 l-8 16 a2 2 0 0 0 2 3 h20 a2 2 0 0 0 2 -3 l-8 -16 v-8" ${s}/><line x1="${cx-6}" y1="${cy-14}" x2="${cx+6}" y2="${cy-14}" ${s}/>`;
  case 'hands':return `<path d="M${cx-16} ${cy+2} l8 -6 l6 4 l6 -4 l8 6" ${s}/><path d="M${cx-16} ${cy+2} l-2 6 M${cx+16} ${cy+2} l2 6" ${s}/>`;
  default:return `<circle cx="${cx}" cy="${cy}" r="4" fill="${c}"/>`;}}

function banner(y,segs,w){w=w||1482;let t=segs.map(g=>`<tspan fill="${g.c==='t'?TERRA:(g.c==='g'?MED:INK)}">${esc(g.t)}</tspan>`).join('');
 return `<rect x="80" y="${y}" width="${w}" height="86" rx="16" fill="${BANNER}" stroke="${SAGE}" stroke-width="2"/>
  <circle cx="150" cy="${y+43}" r="27" fill="none" stroke="${MED}" stroke-width="2.6"/>${ic('bang',150,y+43)}
  <text x="210" y="${y+53}" font-family="${F}" font-size="28" font-weight="700">${t}</text>`;}

function frame(inner){return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${CREAM}"/>${decor()}${header()}${inner}</svg>`;}
function panel(x,y,w,h){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${PANEL}" stroke="${SAGE}" stroke-width="2"/>`;}
function ptitle(x,y,t){return `<text x="${x}" y="${y}" font-family="${F}" font-size="24" font-weight="800" fill="${MED}" letter-spacing="0.5">${esc(t)}</text>`;}

// ---------- S2 ----------
function s2(){
 const cx=300,cy=470,C=2*Math.PI*115,dash=C*0.9;
 const donut=`
  <circle cx="${cx}" cy="${cy}" r="115" fill="none" stroke="${PALE}" stroke-width="52"/>
  <circle cx="${cx}" cy="${cy}" r="115" fill="none" stroke="${MED}" stroke-width="52" stroke-dasharray="${dash} ${C-dash}" transform="rotate(-90 ${cx} ${cy})"/>
  <text x="${cx}" y="${cy+6}" font-family="${F}" font-size="64" font-weight="800" fill="${DARK}" text-anchor="middle">90%</text>
  <text x="${cx}" y="${cy+40}" font-family="${F}" font-size="22" fill="${INK}" text-anchor="middle">of startups fail</text>`;
 const bar=`<rect x="140" y="648" width="320" height="8" rx="4" fill="${PALE}"/>
  <circle cx="209" cy="652" r="8" fill="${DARK}"/><circle cx="300" cy="652" r="8" fill="${DARK}"/>
  <text x="209" y="688" font-family="${F}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">Year 1: <tspan fill="${MED}">21.5%</tspan></text>
  <text x="360" y="688" font-family="${F}" font-size="20" font-weight="700" fill="${INK}" text-anchor="middle">Year 5: <tspan fill="${MED}">50%</tspan></text>`;
 return frame(`${head('WHY STARTUPS REALLY FAIL',null,780)}
  ${panel(80,270,660,480)}${donut}${bar}
  ${panel(770,270,810,250)}${ptitle(950,335,'THE #1 ROOT CAUSE')}
  ${circleIco(860,430,40)}${ic('heart',860,430)}
  <text x="930" y="420" font-family="${F}" font-size="30" font-weight="700" fill="${INK}">Nobody needs it</text>
  <text x="930" y="460" font-family="${F}" font-size="30" font-weight="700" fill="${INK}">badly enough to pay</text>
  ${panel(770,545,810,205)}${circleIco(860,647,40)}${ic('glasses',860,647)}
  <text x="930" y="657" font-family="${F}" font-size="27" font-weight="600" fill="${INK}">Even <tspan fill="${MED}" font-weight="700">Google Glass</tspan> died of this</text>
  ${banner(775,[{t:'THE IDEA IS THE '},{t:'MOST OVERRATED',c:'t'},{t:' ELEMENT OF A STARTUP.'}])}`);
}

// ---------- S3 ----------
function s3(){
 const cx=520,cy=520,r=205;
 const verts=[[-90,'BASIC STATEMENT','speech'],[-18,'CLIMATE','thermo'],[54,'TECHNICAL','gear'],[126,'SOCIAL','people'],[198,'RESOURCE GAPS','box']];
 let poly=verts.map(v=>{const a=Math.PI*v[0]/180;return `${(cx+Math.cos(a)*r).toFixed(1)},${(cy+Math.sin(a)*r).toFixed(1)}`}).join(' ');
 let nodes='';
 verts.forEach(v=>{const a=Math.PI*v[0]/180;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
   const lx=cx+Math.cos(a)*(r+70), ly=cy+Math.sin(a)*(r+70);
   const anchor = Math.abs(Math.cos(a))<0.3?'middle':(Math.cos(a)>0?'start':'end');
   nodes+=circleIco(x,y,30)+ic(v[2],x,y);
   nodes+=`<text x="${lx.toFixed(0)}" y="${(ly-2).toFixed(0)}" font-family="${F}" font-size="20" font-weight="700" fill="${DARK}" text-anchor="${anchor}">${v[1]}</text>`;});
 const cold=`${panel(1080,290,480,450)}${ptitle(1105,340,'THE PROBLEM BEHIND')}${ptitle(1105,368,'COLDHUBS')}
  ${circleIco(1140,435,28)}${ic('tomato',1140,435)}
  ${['40–50% of produce spoils','$4 billion lost in grains yearly','No cold chain in markets'].map((t,i)=>`<circle cx="1120" cy="${520+i*58}" r="5" fill="${MED}"/><text x="1140" y="${527+i*58}" font-family="${F}" font-size="22" font-weight="600" fill="${INK}">${esc(t)}</text>`).join('')}`;
 return frame(`${head('ONE PROBLEM, FIVE FACES',null,780)}
  <polygon points="${poly}" fill="none" stroke="${MED}" stroke-width="2.5"/>
  <circle cx="${cx}" cy="${cy}" r="58" fill="${PALE}"/><text x="${cx}" y="${cy-2}" font-family="${F}" font-size="17" font-weight="800" fill="${DARK}" text-anchor="middle">WHO</text><text x="${cx}" y="${cy+18}" font-family="${F}" font-size="17" font-weight="800" fill="${DARK}" text-anchor="middle">ARE WE?</text>
  ${nodes}${cold}
  ${banner(800,[{t:'FILL ALL '},{t:'FIVE FACES',c:'g'},{t:', THEN RESTATE YOUR PROBLEM.'}])}`);
}

// ---------- S4 ----------
function s4(){
 const tx=520, top=300;
 const cols=['TECHNOLOGY','REGULATIONS','USER VALUES','INSTITUTIONS'];
 let temple=`<path d="M${tx-230} ${top+70} L${tx} ${top} L${tx+230} ${top+70} Z" fill="none" stroke="${MED}" stroke-width="2.5"/>
  <text x="${tx}" y="${top+55}" font-family="${F}" font-size="24" font-weight="800" fill="${DARK}" text-anchor="middle">STATUS QUO</text>
  <rect x="${tx-235}" y="${top+70}" width="470" height="22" fill="none" stroke="${MED}" stroke-width="2.5"/>`;
 cols.forEach((c,i)=>{const x=tx-180+i*120;temple+=`<rect x="${x-22}" y="${top+95}" width="44" height="250" rx="3" fill="${PANEL}" stroke="${MED}" stroke-width="2"/>
   <text x="${x}" y="${top+225}" font-family="${F}" font-size="19" font-weight="700" fill="${DARK}" text-anchor="middle" transform="rotate(-90 ${x} ${top+225})">${c}</text>`;});
 temple+=`<rect x="${tx-250}" y="${top+348}" width="500" height="26" fill="none" stroke="${MED}" stroke-width="2.5"/>
  <path d="M${tx} ${top+470} l0 -70 M${tx-16} ${top+420} l16 -20 l16 20" fill="none" stroke="${MED}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${tx}" y="${top+495}" font-family="${F}" font-size="19" font-weight="700" fill="${MED}" text-anchor="middle">INNOVATIONS (you)</text>
  <path d="M${tx-70} ${top-30} a26 26 0 0 1 8 -50 a30 30 0 0 1 58 -4 a22 22 0 0 1 -2 54 z" fill="none" stroke="${SAGE}" stroke-width="2.5"/>
  <text x="${tx-30}" y="${top-40}" font-family="${F}" font-size="16" font-weight="700" fill="${GREY}" text-anchor="middle">ENVIRONMENT</text>
  <text x="120" y="${top+230}" font-family="${F}" font-size="16" font-weight="700" fill="${GREY}" text-anchor="middle" transform="rotate(-90 120 ${top+230})">ECONOMIC TRENDS</text>
  <text x="905" y="${top+230}" font-family="${F}" font-size="16" font-weight="700" fill="${GREY}" text-anchor="middle" transform="rotate(-90 905 ${top+230})">SOCIAL TRENDS</text>`;
 const koko=`<rect x="1010" y="290" width="550" height="450" rx="18" fill="#FBF3F0" stroke="${TERRA}" stroke-width="2"/>
  <circle cx="1055" cy="345" r="22" fill="none" stroke="${TERRA}" stroke-width="2.4"/>${ic('bang',1055,345,TERRA)}
  <text x="1090" y="353" font-family="${F}" font-size="24" font-weight="800" fill="${TERRA}">THE KOKO LESSON</text>
  ${['1.5 million households served','One carbon authorisation denied','Company gone in weeks'].map((t,i)=>`<circle cx="1050" cy="${430+i*70}" r="5" fill="${TERRA}"/><text x="1072" y="${437+i*70}" font-family="${F}" font-size="23" font-weight="600" fill="${INK}">${esc(t)}</text>`).join('')}`;
 return frame(`${head('MAP THE SYSTEM AROUND IT',null,780)}${temple}${koko}
  ${banner(795,[{t:'THE REGULATIONS COLUMN IS '},{t:'SURVIVAL',c:'t'},{t:', NOT HOMEWORK.'}])}`);
}

// ---------- S5 ----------
function s5(){
 const roots=[['Users','people'],['Suppliers','box'],['Financiers','coins'],['Authorities','building'],['Researchers','flask'],['Cooperatives','hands'],['Competitors','flag'],['Hidden actors','eye']];
 const baseX=560, baseY=560;
 let tree=`<ellipse cx="${baseX}" cy="330" rx="250" ry="120" fill="${PALE}" opacity="0.5" stroke="${MED}" stroke-width="2"/>
  <text x="${baseX}" y="300" font-family="${F}" font-size="22" font-weight="800" fill="${DARK}" text-anchor="middle">THE CONTEXT</text>
  <rect x="${baseX-34}" y="420" width="68" height="150" rx="6" fill="${PANEL}" stroke="${MED}" stroke-width="2.5"/>
  <text x="${baseX}" y="500" font-family="${F}" font-size="17" font-weight="800" fill="${DARK}" text-anchor="middle" transform="rotate(-90 ${baseX} 500)">YOUR CHALLENGE</text>`;
 roots.forEach((rt,i)=>{const x=150+i*126;const y=720;
   tree+=`<path d="M${baseX} ${baseY} C ${baseX} ${baseY+50}, ${x} ${y-90}, ${x} ${y-30}" fill="none" stroke="${SAGE}" stroke-width="2.5"/>`;
   tree+=circleIco(x,y,26)+ic(rt[1],x,y);
   tree+=`<text x="${x}" y="${y+46}" font-family="${F}" font-size="17" font-weight="700" fill="${INK}" text-anchor="middle">${rt[0]}</text>`;});
 const hidden=`${panel(1130,300,440,470)}${ptitle(1155,350,'THE HIDDEN ONES DECIDE')}
  ${[['recycle',"6,000 waste pickers","recycle Nairobi's plastic"],['moto',"Rider associations","pick the bikes"],['basket',"Market women","govern the markets"]].map((r,i)=>{const y=420+i*115;return circleIco(1180,y,27)+ic(r[0],1180,y)+`<text x="1220" y="${y-4}" font-family="${F}" font-size="20" font-weight="700" fill="${DARK}">${esc(r[1])}</text><text x="1220" y="${y+22}" font-family="${F}" font-size="19" fill="${INK}">${esc(r[2])}</text>`}).join('')}`;
 return frame(`${head('MAP THE PEOPLE',null,780)}${tree}${hidden}
  ${banner(800,[{t:'WHO BENEFITS IF YOU '},{t:'SUCCEED',c:'g'},{t:'?  WHO BENEFITS IF YOU '},{t:'FAIL',c:'t'},{t:'?'}])}`);
}

// ---------- S7 ----------
function s7(){
 const nodes=[[360,'clipboard','2,000','household interviews first'],[790,'lantern','200','customer pilot'],[1220,'group','1 million','people served in Sierra Leone & Liberia']];
 let tl=`<line x1="360" y1="440" x2="1220" y2="440" stroke="${SAGE}" stroke-width="3"/>`;
 nodes.forEach(n=>{tl+=`<text x="${n[0]}" y="360" font-family="${F}" font-size="46" font-weight="800" fill="${MED}" text-anchor="middle">${n[2]}</text>`;
   tl+=circleIco(n[0],440,55)+ic(n[1],n[0],440);
   const words=n[3];const lines=words.length>26?words.split(' ').reduce((a,w)=>{if(!a.length||(a[a.length-1]+' '+w).length>26)a.push(w);else a[a.length-1]+=' '+w;return a},[]):[words];
   lines.forEach((ln,i)=>{tl+=`<text x="${n[0]}" y="${535+i*28}" font-family="${F}" font-size="21" font-weight="600" fill="${INK}" text-anchor="middle">${esc(ln)}</text>`;});});
 const hl=`<rect x="180" y="620" width="1200" height="96" rx="16" fill="${PALE}" stroke="${SAGE}" stroke-width="2"/>
  ${circleIco(255,668,30)}${ic('coin',255,668)}
  <text x="315" y="678" font-family="${F}" font-size="27" font-weight="700" fill="${DARK}">The discovery was not about light. <tspan fill="${MED}">It was about money.</tspan></text>`;
 return frame(`${head('CASE STUDY: EASY SOLAR',null,780)}${tl}${hl}
  ${banner(760,[{t:'MATCH PAYMENTS TO '},{t:'DAILY CASH FLOW',c:'g'},{t:'.'}])}`);
}

// ---------- S8 ----------
function s8(){
 const cx=420,cy=490,r=205;
 const segs=[[-90-60,'JOBS','clipboard'],[-90+60,'PAINS','storm'],[150,'GAINS','gift']];
 // dividers at angles 30,150,270
 let wheel=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${PANEL}" stroke="${MED}" stroke-width="2.5"/>`;
 [30,150,270].forEach(a=>{const rad=Math.PI*a/180;wheel+=`<line x1="${cx}" y1="${cy}" x2="${(cx+Math.cos(rad)*r).toFixed(1)}" y2="${(cy+Math.sin(rad)*r).toFixed(1)}" stroke="${MED}" stroke-width="2"/>`;});
 const pos=[[-90,'JOBS','clipboard'],[30,'PAINS','storm'],[150,'GAINS','gift']];
 pos.forEach(p=>{const a=Math.PI*p[0]/180;const lx=cx+Math.cos(a)*118, ly=cy+Math.sin(a)*118;
   wheel+=`<text x="${lx.toFixed(0)}" y="${(ly-18).toFixed(0)}" font-family="${F}" font-size="24" font-weight="800" fill="${DARK}" text-anchor="middle">${p[1]}</text>`;
   wheel+=circleIco(lx,ly+18,26)+ic(p[2],lx,ly+18);});
 wheel+=`<circle cx="${cx}" cy="${cy}" r="52" fill="${PALE}" stroke="${MED}" stroke-width="2"/><text x="${cx}" y="${cy-2}" font-family="${F}" font-size="15" font-weight="800" fill="${DARK}" text-anchor="middle">YOUR</text><text x="${cx}" y="${cy+16}" font-family="${F}" font-size="15" font-weight="800" fill="${DARK}" text-anchor="middle">CUSTOMER</text>`;
 const ex=`${panel(790,270,790,470)}${ptitle(830,330,'EXAMPLE: THE FARMER')}
  ${[['clipboard','Job:','harvest twice a year'],['storm','Pain:','fuel costs and drought risk'],['sun','Gain:','year-round income and status']].map((r,i)=>{const y=420+i*105;return circleIco(860,y,28)+ic(r[0],860,y)+`<text x="915" y="${y+8}" font-family="${F}" font-size="24" fill="${INK}"><tspan font-weight="800" fill="${DARK}">${r[1]}</tspan> ${esc(r[2])}</text>`}).join('')}`;
 return frame(`${head('STRUCTURE WHAT YOU HEARD',null,780)}${wheel}${ex}
  ${banner(795,[{t:'USE '},{t:'THEIR WORDS',c:'g'},{t:', NOT YOURS.'}])}`);
}

// ---------- S9 ----------
function s9(){
 const rows=[['pentagon','1. Fill the Pentagon: all five faces'],['temple','2. Sketch the Context Map, name your critical regulation'],['tree','3. Draw the Actor Tree with 2 hidden stakeholders'],['mic','4. Run 5 real interviews in their setting'],['coin','5. Build the Jobs-Pains-Gains profile from quotes']];
 let list=panel(180,250,1320,540);
 rows.forEach((r,i)=>{const y=320+i*100;list+=circleIco(270,y,30)+ic(r[0],270,y);
   const num=r[1].slice(0,2), rest=r[1].slice(2);
   list+=`<text x="330" y="${y+9}" font-family="${F}" font-size="27" fill="${INK}"><tspan font-weight="800" fill="${MED}">${num}</tspan><tspan font-weight="600">${esc(rest)}</tspan></text>`;
   if(i<rows.length-1)list+=`<line x1="240" y1="${y+50}" x2="1440" y2="${y+50}" stroke="${DIV}" stroke-width="1.5"/>`;});
 const foot=`<line x1="0" y1="835" x2="${W}" y2="835" stroke="${SAGE}" stroke-width="1.5"/>
  ${circleIco(150,882,26)}${ic('pentagon',150,882)}<text x="190" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${DARK}">Artefact #2</text><text x="190" y="901" font-family="${F}" font-size="18" fill="${INK}">of your Venture Workbook</text>
  <path d="M560 882 h40 m-10 -7 l10 7 l-10 7" fill="none" stroke="${MED}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  ${circleIco(690,882,26)}${ic('puzzle',690,882)}<text x="730" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${DARK}">Next:</text><text x="730" y="901" font-family="${F}" font-size="18" fill="${INK}">from problem to solution</text>`;
 return frame(`${head('YOUR ASSIGNMENT',null,780)}${list}${foot}`);
}

// ---------- S6 composite (gpt illustration + correct rules panel) ----------
function s6(dir){
 const img=fs.readFileSync(dir+'/m2-s6.png').toString('base64');
 const rules=[['check','Ask about the last time, not the future',MED],['check','Hunt for disproof, not confirmation',MED],['check','Their language, their setting',MED],['cross','Never pitch your solution',RED],['cross','Never ask: would you buy this?',RED]];
 let panelR=`${panel(850,250,650,500)}${ptitle(890,310,'THE INTERVIEW RULES')}`;
 rules.forEach((r,i)=>{const y=375+i*72;panelR+=ic(r[0],890,y)+`<text x="930" y="${y+8}" font-family="${F}" font-size="23" font-weight="600" fill="${INK}">${esc(r[1])}</text>`;
   if(i<rules.length-1)panelR+=`<line x1="885" y1="${y+36}" x2="1465" y2="${y+36}" stroke="${DIV}" stroke-width="1.3"/>`;});
 const chip=`<rect x="850" y="765" width="360" height="44" rx="22" fill="${PALE}"/><text x="875" y="793" font-family="${F}" font-size="19" font-weight="700" fill="${DARK}">5-10 interviews per customer group</text>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><clipPath id="ill"><rect x="128" y="234" width="694" height="560" rx="6"/></clipPath></defs>
  <rect width="${W}" height="${H}" fill="${CREAM}"/>${decor()}
  <image href="data:image/png;base64,${img}" x="0" y="0" width="${W}" height="${H}" clip-path="url(#ill)"/>
  ${header()}${head('LEAVE THE BUILDING',null,780)}
  ${panelR}${chip}
  ${banner(820,[{t:'A BROKEN ASSUMPTION IN WEEK TWO IS A '},{t:'GIFT',c:'g'},{t:'.'}])}
  </svg>`;
}

function render(svg,out){const r=new Resvg(svg,{fitTo:{mode:'width',value:W},font:{loadSystemFonts:true,defaultFontFamily:'Helvetica'}});fs.writeFileSync(out,r.render().asPng());console.log('wrote',out);}
const dir=process.argv[2];
render(s2(),dir+'/m2-s2.png');
render(s3(),dir+'/m2-s3.png');
render(s4(),dir+'/m2-s4.png');
render(s5(),dir+'/m2-s5.png');
render(s6(dir),dir+'/m2-s6.png');
render(s7(),dir+'/m2-s7.png');
render(s8(),dir+'/m2-s8.png');
render(s9(),dir+'/m2-s9.png');
