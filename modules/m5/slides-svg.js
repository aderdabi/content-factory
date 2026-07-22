// Module 5 exact-SVG slides + S8 composite over the gpt seascape.
const kit = require('../../scripts/svg-slides/slide-kit.js');
kit.cfg.pill = 'MODULE 5 OF 7';
const { C, F, esc } = kit;

function ic(t, cx, cy, c) {
  c = c || C.med;
  const s = `stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const rays = r => [0,45,90,135,180,225,270,315].map(a=>{const q=Math.PI*a/180;return `<line x1="${(cx+Math.cos(q)*12).toFixed(1)}" y1="${(cy+Math.sin(q)*12).toFixed(1)}" x2="${(cx+Math.cos(q)*17).toFixed(1)}" y2="${(cy+Math.sin(q)*17).toFixed(1)}"/>`}).join('');
  switch (t) {
    case 'gear': return `<circle cx="${cx}" cy="${cy}" r="8" ${s}/><g ${s}>${rays()}</g>`;
    case 'mag': return `<circle cx="${cx-4}" cy="${cy-4}" r="10" ${s}/><line x1="${cx+4}" y1="${cy+4}" x2="${cx+13}" y2="${cy+13}" ${s}/>`;
    case 'eye': return `<path d="M${cx-15} ${cy} q15 -12 30 0 q-15 12 -30 0 z" ${s}/><circle cx="${cx}" cy="${cy}" r="4.5" ${s}/>`;
    case 'pump': return `<rect x="${cx-15}" y="${cy-15}" width="18" height="30" rx="2" ${s}/><line x1="${cx-15}" y1="${cy-5}" x2="${cx+3}" y2="${cy-5}" ${s}/><path d="M${cx+3} ${cy-9} h9 v16 a3 3 0 0 0 6 0 v-9 l-4 -4" ${s}/>`;
    case 'bolt': return `<path d="M${cx+2} ${cy-16} l-12 18 h8 l-4 14 l14 -18 h-8 z" ${s}/>`;
    case 'star': return `<path d="M${cx} ${cy-15} l4.5 9 l10 1.5 l-7 7 l1.7 10 l-9 -4.7 l-9 4.7 l1.7 -10 l-7 -7 l10 -1.5 z" ${s}/>`;
    case 'pin': return `<path d="M${cx} ${cy-15} c-8 0-13 6-13 13 c0 9 13 17 13 17 c0 0 13-8 13-17 c0-7-5-13-13-13 z" ${s}/><circle cx="${cx}" cy="${cy-2}" r="4.5" ${s}/>`;
    case 'shop': return `<path d="M${cx-16} ${cy-8} l3 -9 h26 l3 9 z" ${s}/><path d="M${cx-16} ${cy-8} a5 5 0 0 0 10 0 a5 5 0 0 0 10 0 a5 5 0 0 0 10 0" ${s}/><path d="M${cx-13} ${cy-2} v16 h26 v-16" ${s}/>`;
    case 'arrow': return `<line x1="${cx-14}" y1="${cy}" x2="${cx+12}" y2="${cy}" ${s}/><path d="M${cx+4} ${cy-9} l9 9 l-9 9" ${s}/>`;
    case 'bars': return `<line x1="${cx-15}" y1="${cy+14}" x2="${cx+15}" y2="${cy+14}" ${s}/><rect x="${cx-13}" y="${cy+2}" width="7" height="12" ${s}/><rect x="${cx-3}" y="${cy-6}" width="7" height="20" ${s}/><rect x="${cx+7}" y="${cy-14}" width="7" height="28" ${s}/>`;
    case 'bank': return `<path d="M${cx-16} ${cy-4} l16 -12 l16 12 z" ${s}/><line x1="${cx-12}" y1="${cy-1}" x2="${cx-12}" y2="${cy+12}" ${s}/><line x1="${cx-4}" y1="${cy-1}" x2="${cx-4}" y2="${cy+12}" ${s}/><line x1="${cx+4}" y1="${cy-1}" x2="${cx+4}" y2="${cy+12}" ${s}/><line x1="${cx+12}" y1="${cy-1}" x2="${cx+12}" y2="${cy+12}" ${s}/><line x1="${cx-17}" y1="${cy+14}" x2="${cx+17}" y2="${cy+14}" ${s}/>`;
    case 'platform': return `<rect x="${cx-15}" y="${cy-14}" width="12" height="12" rx="2" ${s}/><rect x="${cx+3}" y="${cy-14}" width="12" height="12" rx="2" ${s}/><rect x="${cx-15}" y="${cy+2}" width="12" height="12" rx="2" ${s}/><rect x="${cx+3}" y="${cy+2}" width="12" height="12" rx="2" ${s}/>`;
    case 'swords': return `<path d="M${cx-15} ${cy-15} l18 18 M${cx+15} ${cy-15} l-18 18" ${s}/><path d="M${cx-17} ${cy-15} h6 M${cx-15} ${cy-17} v6 M${cx+17} ${cy-15} h-6 M${cx+15} ${cy-17} v6" ${s}/>`;
    case 'warn': return `<path d="M${cx} ${cy-15} l15 27 h-30 z" ${s}/><line x1="${cx}" y1="${cy-4}" x2="${cx}" y2="${cy+5}" ${s}/><circle cx="${cx}" cy="${cy+10}" r="1.6" fill="${c}"/>`;
    case 'wrench': return `<path d="M${cx+9} ${cy-13} a7 7 0 1 0 -5 12 l-13 13 l4 4 l13 -13 a7 7 0 0 0 1 -16 l-4 5 l-1 4 l-4 1 l-4 -4 l1 -4 l4 -1 z" ${s}/>`;
    case 'rocket': return `<path d="M${cx} ${cy-16} c6 4 8 12 8 18 h-16 c0 -6 2 -14 8 -18 z" ${s}/><circle cx="${cx}" cy="${cy-5}" r="3" ${s}/><path d="M${cx-8} ${cy+2} l-5 8 M${cx+8} ${cy+2} l5 8 M${cx-4} ${cy+4} l-2 9 h12 l-2 -9" ${s}/>`;
    case 'clock': return `<circle cx="${cx}" cy="${cy}" r="14" ${s}/><path d="M${cx} ${cy-8} v8 l6 4" ${s}/>`;
    case 'refresh': return `<path d="M${cx+13} ${cy+2} a13 13 0 1 1 -3 -9" ${s}/><path d="M${cx+13} ${cy-12} v10 h-10" ${s}/>`;
    case 'ban': return `<circle cx="${cx}" cy="${cy}" r="14" ${s}/><line x1="${cx-10}" y1="${cy-10}" x2="${cx+10}" y2="${cy+10}" ${s}/>`;
    case 'plug': return `<path d="M${cx-8} ${cy-15} v9 M${cx+8} ${cy-15} v9" ${s}/><path d="M${cx-12} ${cy-6} h24 v3 a12 12 0 0 1 -24 0 z" ${s}/><path d="M${cx} ${cy+9} v7" ${s}/>`;
    case 'stamp': return `<path d="M${cx-8} ${cy-3} v-4 a8 8 0 1 1 16 0 v4 h5 l-3 9 h-20 l-3 -9 z" ${s}/><rect x="${cx-15}" y="${cy+8}" width="30" height="6" rx="2" ${s}/>`;
    case 'grid': return `<rect x="${cx-14}" y="${cy-14}" width="28" height="28" rx="2" ${s}/><line x1="${cx}" y1="${cy-14}" x2="${cx}" y2="${cy+14}" ${s}/><line x1="${cx-14}" y1="${cy}" x2="${cx+14}" y2="${cy}" ${s}/>`;
    case 'radar': return `<circle cx="${cx}" cy="${cy}" r="15" ${s}/><circle cx="${cx}" cy="${cy}" r="8" ${s}/><line x1="${cx}" y1="${cy}" x2="${cx+11}" y2="${cy-10}" ${s}/><circle cx="${cx+8}" cy="${cy-7}" r="2" fill="${c}"/>`;
    case 'doc': return `<path d="M${cx-11} ${cy-15} h14 l8 8 v22 h-22 z" ${s}/><path d="M${cx+3} ${cy-15} v8 h8" ${s}/><line x1="${cx-6}" y1="${cy-1}" x2="${cx+6}" y2="${cy-1}" ${s}/><line x1="${cx-6}" y1="${cy+6}" x2="${cx+6}" y2="${cy+6}" ${s}/>`;
    case 'map': return `<path d="M${cx-14} ${cy-10} l9 -3 l10 3 l9 -3 v20 l-9 3 l-10 -3 l-9 3 z" ${s}/><line x1="${cx-5}" y1="${cy-13}" x2="${cx-5}" y2="${cy+7}" ${s}/><line x1="${cx+5}" y1="${cy-10}" x2="${cx+5}" y2="${cy+10}" ${s}/>`;
    case 'list': return `<circle cx="${cx-11}" cy="${cy-9}" r="2" fill="${c}"/><circle cx="${cx-11}" cy="${cy}" r="2" fill="${c}"/><circle cx="${cx-11}" cy="${cy+9}" r="2" fill="${c}"/><line x1="${cx-4}" y1="${cy-9}" x2="${cx+14}" y2="${cy-9}" ${s}/><line x1="${cx-4}" y1="${cy}" x2="${cx+14}" y2="${cy}" ${s}/><line x1="${cx-4}" y1="${cy+9}" x2="${cx+14}" y2="${cy+9}" ${s}/>`;
    default: return kit.ic(t, cx, cy, c);
  }
}
const check = (x,y) => `<path d="M${x-7} ${y} l5 6 l10 -12" fill="none" stroke="${C.med}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;

// S2 — parody charts
function s2() {
  const P=(x,title,inner)=>kit.panel(x,245,650,350)+`<text x="${x+325}" y="290" font-family="${F}" font-size="22" font-weight="800" fill="${C.med}" text-anchor="middle">${title}</text>`+inner;
  let t1='';const tx=180,ty=330,cw=100,rw=42;
  for(let r=0;r<5;r++)for(let col=0;col<5;col++)t1+=`<rect x="${tx+col*cw}" y="${ty+r*rw}" width="${cw}" height="${rw}" fill="none" stroke="${C.sage}" stroke-width="1.5"/>`;
  for(let r=0;r<5;r++)t1+=check(tx+4*cw+cw/2,ty+r*rw+rw/2);
  t1+=`<line x1="${tx}" y1="${ty}" x2="${tx+5*cw}" y2="${ty+5*rw}" stroke="${C.terra}" stroke-width="9" stroke-linecap="round" opacity="0.85"/><line x1="${tx+5*cw}" y1="${ty}" x2="${tx}" y2="${ty+5*rw}" stroke="${C.terra}" stroke-width="9" stroke-linecap="round" opacity="0.85"/>`;
  const qx=1125,qy=330,qs=200;
  let t2=`<line x1="${qx-qs/2}" y1="${qy}" x2="${qx-qs/2}" y2="${qy+qs}" stroke="${C.sage}" stroke-width="2"/><line x1="${qx-qs/2}" y1="${qy+qs}" x2="${qx+qs/2}" y2="${qy+qs}" stroke="${C.sage}" stroke-width="2"/>`;
  [[0.3,0.6],[0.5,0.45],[0.25,0.35],[0.6,0.7],[0.4,0.8]].forEach(d=>t2+=`<circle cx="${qx-qs/2+d[0]*qs}" cy="${qy+qs-d[1]*qs}" r="6" fill="${C.grey}"/>`);
  t2+=`<circle cx="${qx-qs/2+0.85*qs}" cy="${qy+qs-0.85*qs}" r="8" fill="${C.med}"/>`;
  t2+=`<line x1="${qx-qs/2}" y1="${qy}" x2="${qx+qs/2}" y2="${qy+qs}" stroke="${C.terra}" stroke-width="9" stroke-linecap="round" opacity="0.85"/><line x1="${qx+qs/2}" y1="${qy}" x2="${qx-qs/2}" y2="${qy+qs}" stroke="${C.terra}" stroke-width="9" stroke-linecap="round" opacity="0.85"/>`;
  const chip=`<rect x="110" y="620" width="1340" height="54" rx="27" fill="${C.pale}"/>${ic('eye',152,647)}<text x="188" y="654" font-family="${F}" font-size="21" font-weight="700" fill="${C.dark}">Investors have seen thousands. They harvest the names and move on.</text>`;
  return kit.frame(kit.head('THE SLIDE INVESTORS SKIP')+P(110,'THE FEATURE TABLE',t1)+P(800,'THE MAGIC QUADRANT',t2)+chip+kit.banner(800,[{t:'CUSTOMERS BUY '},{t:'SOLUTIONS',c:'g'},{t:', NOT FEATURES.'}]));
}

// S3 — three hidden rivals
function s3() {
  const cols=[100,560,1020];
  const panels=[
    ['INDIRECT COMPETITION','pump',[['The financier who adds','an e-model'],['The fuel chain that','adds swaps']],C.med],
    ['THE STATUS QUO','lamp',[['Familiar, paid for,','good enough'],['Put it on the map','with its cost']],C.med],
    ['INDUSTRY SHIFTS','bolt',[['KOKO: 1.5M households'],['One authorisation denied'],['Gone in weeks']],C.terra],
  ];
  let b='';
  panels.forEach((p,i)=>{const x=cols[i];b+=kit.panel(x,250,440,430);
    b+=`<text x="${x+220}" y="310" font-family="${F}" font-size="20" font-weight="800" fill="${p[3]}" text-anchor="middle">${esc(p[0])}</text>`;
    b+=kit.circleIco(x+220,385,38)+ic(p[1],x+220,385,p[3]);
    if(p[1]==='lamp')b+=ic('crown',x+220,352,C.terra);
    p[2].forEach((ln,j)=>{const y=470+j*58;b+=`<circle cx="${x+40}" cy="${y-6}" r="5" fill="${p[3]}"/>`;ln.forEach((t,k)=>b+=`<text x="${x+60}" y="${y+k*24}" font-family="${F}" font-size="20" font-weight="600" fill="${C.ink}">${esc(t)}</text>`);});
  });
  return kit.frame(kit.head('THE THREE RIVALS OFF YOUR CHART')+b+kit.banner(800,[{t:'WHAT ENDS YOUR BUSINESS MAY '},{t:'NOT BE A COMPANY',c:'t'},{t:' AT ALL.'}]));
}

// S4 — eight criteria (2x4)
function s4() {
  const cards=[['Capabilities','gear',0],['Real USP','star',0],['Target markets','pin',0],['Sales model','shop',0],['Partnerships','hands',1],['Next moves','arrow',0],['Size','bars',0],['Funding & investors','coin',0]];
  const cols=[100,452,804,1156], rows=[248,406], cw=322, ch=142;
  let g='';
  cards.forEach((c,i)=>{const x=cols[i%4], y=rows[Math.floor(i/4)];
    g+=`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="14" fill="${c[2]?'#E9EFDD':C.panel}" stroke="${C.sage}" stroke-width="2"/>`;
    g+=kit.circleIco(x+cw/2,y+48,28)+ic(c[1],x+cw/2,y+48);
    g+=`<text x="${x+cw/2}" y="${y+108}" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}" text-anchor="middle">${esc(c[0])}</text>`;});
  const chip=`<rect x="100" y="588" width="1378" height="52" rx="26" fill="${C.pale}"/>${ic('arrow',150,614)}<text x="188" y="621" font-family="${F}" font-size="21" font-weight="700" fill="${C.dark}">Distribution beats product. <tspan fill="${C.med}">Second-time founders worry about distribution.</tspan></text>`;
  return kit.frame(kit.head('EIGHT QUESTIONS PER RIVAL')+g+chip+kit.banner(800,[{t:'WHO INVESTED TELLS YOU THEIR STRATEGY AND STAYING POWER.'}]));
}

// S5 — five games table
function s5() {
  const rows=[['sun','SUN KING','Volume: ~38% share, agent army'],['bank','D.LIGHT','Finance: $1B+ securitised'],['phone','M-KOPA','Fintech: from solar to phones & loans'],['platform','BBOXX','Utility platform + government deals'],['map','EASY SOLAR','Frontier markets others ignored']];
  const px=100,py=248,pw=1400,ph=470, first=py+50, step=(ph-80)/4;
  let tbl=kit.panel(px,py,pw,ph);
  tbl+=`<g transform="translate(1240,430) scale(3.6)" opacity="0.10">${ic('lamp',0,0,C.med)}</g><text x="1240" y="560" font-family="${F}" font-size="15" fill="${C.grey}" text-anchor="middle">The incumbent: kerosene</text>`;
  rows.forEach((r,i)=>{const cy=first+i*step;tbl+=kit.circleIco(180,cy,28)+ic(r[0],180,cy);
    tbl+=`<text x="250" y="${cy+8}" font-family="${F}" font-size="26" font-weight="800" fill="${C.dark}">${esc(r[1])}</text>`;
    tbl+=`<text x="520" y="${cy+8}" font-family="${F}" font-size="23" font-weight="500" fill="${C.ink}">${esc(r[2])}</text>`;
    if(i<rows.length-1)tbl+=`<line x1="150" y1="${cy+step/2}" x2="${px+pw-30}" y2="${cy+step/2}" stroke="${C.div}" stroke-width="1.5"/>`;});
  return kit.frame(kit.head('ONE MARKET, FIVE GAMES','Pay-as-you-go solar')+tbl+kit.banner(800,[{t:'NO FEATURE TABLE SEPARATES THEM. '},{t:'STRATEGY',c:'g'},{t:' DOES.'}]));
}

// S6 — overlap matrix
function s6() {
  const x0=120,y0=252,S=430,cx=x0+S/2,cy=y0+S/2;
  let m=`<rect x="${x0}" y="${y0}" width="${S}" height="${S}" rx="10" fill="#E9EFE7" stroke="${C.sage}" stroke-width="2"/><line x1="${cx}" y1="${y0}" x2="${cx}" y2="${y0+S}" stroke="${C.sage}" stroke-width="1.5"/><line x1="${x0}" y1="${cy}" x2="${x0+S}" y2="${cy}" stroke="${C.sage}" stroke-width="1.5"/>`;
  m+=`<text x="${cx}" y="${y0+S+30}" font-family="${F}" font-size="16" font-weight="800" fill="${C.med}" text-anchor="middle">SOLUTION OVERLAP: low → high</text>`;
  m+=`<text x="${x0-26}" y="${cy}" font-family="${F}" font-size="16" font-weight="800" fill="${C.med}" text-anchor="middle" transform="rotate(-90 ${x0-26} ${cy})">MARKET OVERLAP: low → high</text>`;
  const quad=(qx,qy,label,icon)=>ic(icon,qx,qy)+`<text x="${qx}" y="${qy+40}" font-family="${F}" font-size="20" font-weight="800" fill="${C.dark}" text-anchor="middle">${label}</text>`;
  m+=quad(x0+S*0.25,y0+S*0.28,'PARTNER','hands')+quad(x0+S*0.75,y0+S*0.28,'THREAT','swords')+quad(x0+S*0.25,y0+S*0.72,'OBSERVE','eye')+quad(x0+S*0.75,y0+S*0.72,'RISK','warn');
  m+=`<g transform="translate(${x0+S*0.75+2},${y0+S*0.28-58})">${ic('lamp',0,0,C.terra)}<text x="0" y="24" font-family="${F}" font-size="13" fill="${C.terra}" text-anchor="middle">Status quo</text></g>`;
  const p=kit.panel(640,300,850,380)+kit.ptitle(680,358,'HOW THEY COMPETE MATTERS')
    +kit.circleIco(700,450,28)+ic('wrench',700,450)+`<text x="745" y="444" font-family="${F}" font-size="22" font-weight="700" fill="${C.dark}">Ampersand:</text><text x="745" y="472" font-family="${F}" font-size="21" fill="${C.ink}">unit economics first</text>`
    +kit.circleIco(700,560,28)+ic('rocket',700,560)+`<text x="745" y="554" font-family="${F}" font-size="22" font-weight="700" fill="${C.dark}">Spiro:</text><text x="745" y="582" font-family="${F}" font-size="21" fill="${C.ink}">$330M blitzscale, 6 countries</text>`;
  return kit.frame(kit.head('MAP EVERYONE ON TWO AXES')+m+p+kit.banner(800,[{t:'A DIFFERENT GAME DEMANDS A DIFFERENT RESPONSE.'}]));
}

// S7 — one page per player (dossier)
function s7() {
  const cx=100,cy=240,cw=830,chh=530;
  let card=kit.panel(cx,cy,cw,chh);
  card+=`<rect x="${cx}" y="${cy}" width="${cw}" height="60" rx="18" fill="${C.med}"/><rect x="${cx}" y="${cy+30}" width="${cw}" height="30" fill="${C.med}"/><text x="${cx+35}" y="${cy+40}" font-family="${F}" font-size="24" font-weight="800" fill="${C.cream}">COMPETITOR NAME</text>`;
  const secs=['Core competence','Value propositions vs segments','Business model','Strengths','Weaknesses','OUR RESPONSE: 3 actions'];
  secs.forEach((sec,i)=>{const y=cy+95+i*70;const tint=i===5;
    if(tint)card+=`<rect x="${cx+20}" y="${y-26}" width="${cw-40}" height="62" rx="8" fill="#E9EFDD"/>`;
    card+=`<text x="${cx+35}" y="${y-2}" font-family="${F}" font-size="19" font-weight="800" fill="${tint?C.med:C.dark}">${esc(sec)}</text>`;
    card+=`<line x1="${cx+35}" y1="${y+16}" x2="${cx+cw-40}" y2="${y+16}" stroke="${C.div}" stroke-width="1.5"/>`;});
  const chips=kit.panel(1000,290,480,150)+kit.circleIco(1050,365,26)+ic('clock',1050,365)+`<text x="1090" y="358" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Takes real time.</text><text x="1090" y="384" font-family="${F}" font-size="19" fill="${C.ink}">Budget for it.</text>`
    +kit.panel(1000,470,480,150)+kit.circleIco(1050,545,26)+ic('refresh',1050,545)+`<text x="1090" y="538" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Never ends.</text><text x="1090" y="564" font-family="${F}" font-size="19" fill="${C.ink}">Review quarterly.</text>`;
  return kit.frame(kit.head('ONE PAGE PER PLAYER')+card+chips+kit.banner(800,[{t:'A '},{t:'LIVING',c:'g'},{t:' DOCUMENT, NOT A PITCH SLIDE.'}]));
}

// S8 — red/blue ocean (composite over gpt seascape)
function s8(dir) {
  const img=kit.readGpt(dir, 'm5-s08.png');
  const label=(x,t)=>`<rect x="${x-140}" y="616" width="280" height="40" rx="20" fill="${C.cream}" opacity="0.94"/><text x="${x}" y="643" font-family="${F}" font-size="18" font-weight="800" fill="${C.dark}" text-anchor="middle">${esc(t)}</text>`;
  const chips=[['ban','Plastic bans opened new markets',230],['plug','E-mobility incentives opening now',680],['cross',"One denial closed KOKO's ocean",1150]];
  let cr='';chips.forEach(c=>{const w=c[1].length*10.5+80;cr+=`<rect x="${c[2]}" y="700" width="${w}" height="46" rx="23" fill="${C.panel}" stroke="${C.sage}" stroke-width="2"/>${ic(c[0],c[2]+30,723,c[0]==='cross'?C.terra:C.med)}<text x="${c[2]+56}" y="729" font-family="${F}" font-size="18" font-weight="700" fill="${C.dark}">${esc(c[1])}</text>`;});
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${kit.W}" height="${kit.H}" viewBox="0 0 ${kit.W} ${kit.H}"><rect width="${kit.W}" height="${kit.H}" fill="${C.cream}"/>${kit.decor()}${kit.image(img,{id:'s8',x:80,y:225,w:1420,h:453})}${kit.header()}${kit.head('WATCH THE REGULATORY TIDE')}${label(430,'RED OCEAN: price war')}${label(1160,'BLUE OCEAN: open water')}${cr}${kit.banner(792,[{t:'REGULATION '},{t:'OPENS',c:'g'},{t:' OCEANS, AND '},{t:'CLOSES',c:'t'},{t:' THEM.'}])}</svg>`;
}

// S9 — assignment
function s9() {
  const rows=[['list','1. Identify: 3 direct, 3 indirect, 2 entrants + the status quo with its cost'],['stamp','2. Name the regulation your model depends on'],['mag','3. Analyse your top 4 players on the 8 criteria'],['grid','4. Map everyone on the overlap matrix'],['doc','5. One deep-dive profile ending in 3 actions']];
  let list=kit.panel(150,246,1380,520);
  rows.forEach((r,i)=>{const y=318+i*100;list+=kit.circleIco(230,y,30)+ic(r[0],230,y);const num=r[1].slice(0,2),rest=r[1].slice(2);
    list+=`<text x="290" y="${y+8}" font-family="${F}" font-size="22" fill="${C.ink}"><tspan font-weight="800" fill="${C.med}">${num}</tspan><tspan font-weight="600">${esc(rest)}</tspan></text>`;
    if(i<rows.length-1)list+=`<line x1="205" y1="${y+50}" x2="1470" y2="${y+50}" stroke="${C.div}" stroke-width="1.5"/>`;});
  const foot=`<line x1="0" y1="835" x2="${kit.W}" y2="835" stroke="${C.sage}" stroke-width="1.5"/>${kit.circleIco(150,882,26)}${ic('radar',150,882)}<text x="190" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Artefact #5</text><text x="190" y="901" font-family="${F}" font-size="18" fill="${C.ink}">of your Venture Workbook</text><path d="M560 882 h40 m-10 -7 l10 7 l-10 7" fill="none" stroke="${C.med}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>${kit.circleIco(690,882,26)}${ic('coins',690,882)}<text x="730" y="877" font-family="${F}" font-size="20" font-weight="700" fill="${C.dark}">Next:</text><text x="730" y="901" font-family="${F}" font-size="18" fill="${C.ink}">the business model</text>`;
  return kit.frame(kit.head('YOUR ASSIGNMENT')+list+foot);
}

const dir = process.argv[2];
const M = process.env.MODULE || 'm5';
const only = (process.env.ONLY || '').split(',').filter(Boolean);
const want = n => only.length === 0 || only.includes(n);
const slides = { '02': s2, '03': s3, '04': s4, '05': s5, '06': s6, '07': s7, '08': () => s8(dir), '09': s9 };
for (const [n, fn] of Object.entries(slides)) if (want(n)) kit.render(fn(), `${dir}/${M}-s${n}.png`);
