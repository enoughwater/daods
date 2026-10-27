
/* ─────────────────────────────
   State
───────────────────────────── */
const DAYS = ['Segunda','Terça','Quarta','Quinta','Sexta'];
let cols = [...DAYS];
let rows = 6;
let bgColors  = {};   // "r:c" => hex  (fundo)
let txtColors = {};   // "r:c" => hex  (texto)

// modes: 'edit' | 'bg' | 'txt' | 'erase'
// 'erase' is a sub-mode that remembers previous (bg or txt)
let mode = 'edit';
let prevPaintMode = 'bg';  // what we return to after erase
let paintColor = '#bbf7d0';
let sideHeader = 'Horário';

function isDark(){ return document.documentElement.getAttribute('data-theme')==='dark'; }

/* ─────────────────────────────
   Dark mode
───────────────────────────── */
function toggleDark(){
  document.documentElement.setAttribute('data-theme', isDark()?'light':'dark');
}

/* ─────────────────────────────
   Mode management
───────────────────────────── */
// Cycle: edit → bg → txt → edit  (erase is entered via button)
function cycleMode(){
  if(mode === 'edit')        setMode('bg');
  else if(mode === 'bg')     setMode('txt');
  else if(mode === 'txt')    setMode('edit');
  else if(mode === 'erase')  setMode(prevPaintMode); // toggle off erase
}

function setMode(m){
  mode = m;
  if(m === 'bg' || m === 'txt') prevPaintMode = m;

  // body class
  document.body.className = m === 'edit' ? '' : `mode-${m}`;

  // dot color
  const dot = document.getElementById('mode-dot');
  dot.style.background = m === 'edit'  ? 'transparent' :
                         m === 'bg'    ? paintColor :
                         m === 'txt'   ? paintColor :
                         /* erase */    '#e53e3e';
  dot.style.borderColor = m === 'edit'  ? 'var(--bdr2)' :
                          m === 'erase' ? '#e53e3e' : paintColor;

  // toggle button label
  const lbl = document.getElementById('mode-toggle-lbl');
  lbl.textContent = m === 'edit'  ? 'Modo: Edição' :
                    m === 'bg'    ? 'Modo: Pintar Fundo' :
                    m === 'txt'   ? 'Modo: Pintar Texto' :
                    /* erase */    'Modo: Borracha';

  // paint controls
  const pc = document.getElementById('paint-controls');
  pc.classList.toggle('visible', m !== 'edit');

  // eraser active state
  document.getElementById('eraser-btn').classList.toggle('active', m === 'erase');

  // badge
  const badge = document.getElementById('mode-badge');
  const tip   = document.getElementById('mode-tip');
  if(m === 'edit'){
    badge.className = 'mode-badge badge-edit';
    badge.textContent = '✏️ Edição';
    tip.textContent = 'Clique no botão para entrar no modo pintura';
  } else if(m === 'bg'){
    badge.className = 'mode-badge badge-bg';
    badge.textContent = '🎨 Fundo';
    tip.textContent = 'Clique nas células para pintar o fundo · 🧹 para apagar';
  } else if(m === 'txt'){
    badge.className = 'mode-badge badge-txt';
    badge.textContent = '🖊️ Texto';
    tip.textContent = 'Clique nas células para colorir o texto · 🧹 para apagar';
  } else {
    badge.className = 'mode-badge badge-erase';
    badge.textContent = '🧹 Borracha';
    tip.textContent = prevPaintMode === 'bg'
      ? 'Clique para remover a cor de fundo · clique no botão para voltar'
      : 'Clique para remover a cor do texto · clique no botão para voltar';
  }
}

function toggleErase(){
  if(mode === 'erase') setMode(prevPaintMode);
  else                 setMode('erase');
}

function onColorChange(hex){
  paintColor = hex;
  document.getElementById('hex-tag').textContent = hex;
  document.getElementById('color-picker').value = hex;
  // update dot if in paint mode
  if(mode === 'bg' || mode === 'txt'){
    const dot = document.getElementById('mode-dot');
    dot.style.background = hex;
    dot.style.borderColor = hex;
  }
}

/* ─────────────────────────────
   Apply styles to a td
───────────────────────────── */
function applyBg(td, hex){
  if(hex){ td.classList.add('bg-painted'); td.style.setProperty('--cell-bg', hex); }
  else   { td.classList.remove('bg-painted'); td.style.removeProperty('--cell-bg'); }
}
function applyTxt(td, hex){
  if(hex){ td.classList.add('txt-painted'); td.style.setProperty('--cell-txt', hex); }
  else   { td.classList.remove('txt-painted'); td.style.removeProperty('--cell-txt'); }
}

/* ─────────────────────────────
   Build table
───────────────────────────── */
function buildTable(){ buildHeader(); buildBody(); updateStat(); }

function buildHeader(){
  const row = document.getElementById('thead-row');
  row.innerHTML = '';
  const thS = document.createElement('th');
  thS.className = 'th-side';
  const lbl = document.createElement('span');
  lbl.className = 'th-lbl'; lbl.id = 'side-hdr';
  lbl.contentEditable = 'true'; lbl.spellcheck = false;
  lbl.textContent = sideHeader;
  lbl.oninput = ()=>{ sideHeader = lbl.textContent; };
  thS.appendChild(lbl);
  row.appendChild(thS);
  cols.forEach((day, ci)=>{
    const th = document.createElement('th');
    const inner = document.createElement('div'); inner.className = 'th-inner';
    const span = document.createElement('span');
    span.className = 'th-lbl'; span.contentEditable = 'true'; span.spellcheck = false;
    span.textContent = day;
    span.oninput = ()=>{ cols[ci] = span.textContent; };
    const del = document.createElement('button');
    del.className = 'del-col'; del.textContent = '✕'; del.title = 'Remover coluna';
    del.onclick = ()=> delCol(ci);
    inner.appendChild(span); inner.appendChild(del);
    th.appendChild(inner); row.appendChild(th);
  });
}

function buildBody(){
  const tbody = document.getElementById('tbody');
  const saved = {};
  tbody.querySelectorAll('input[data-ikey]').forEach(i=>{ saved[i.dataset.ikey] = i.value; });
  tbody.innerHTML = '';

  for(let r = 0; r < rows; r++){
    const tr = document.createElement('tr');

    // side cell
    const sideTd = document.createElement('td'); sideTd.className = 'side';
    const si = document.createElement('div'); si.className = 'side-inner';
    const num = document.createElement('div'); num.className = 'row-num'; num.textContent = r+1;
    const li = document.createElement('input'); li.type = 'text'; li.className = 'lbl-inp';
    li.placeholder = '—'; li.dataset.r = r; li.dataset.c = -1; li.dataset.ikey = `${r}:-1`;
    if(saved[`${r}:-1`]) li.value = saved[`${r}:-1`];
    li.addEventListener('input', updateStat); li.addEventListener('keydown', navigate);
    si.appendChild(num); si.appendChild(li); sideTd.appendChild(si); tr.appendChild(sideTd);

    // data cells
    cols.forEach((_,ci)=>{
      const key = `${r}:${ci}`;
      const td = document.createElement('td');
      td.dataset.ckey = key;
      applyBg(td, bgColors[key]||null);
      applyTxt(td, txtColors[key]||null);

      const handleClick = e=>{
        if(mode === 'edit') return;
        e.preventDefault();
        if(mode === 'bg'){
          bgColors[key] = paintColor;
          applyBg(td, paintColor);
        } else if(mode === 'txt'){
          txtColors[key] = paintColor;
          applyTxt(td, paintColor);
        } else if(mode === 'erase'){
          if(prevPaintMode === 'bg'){ delete bgColors[key]; applyBg(td, null); }
          else                      { delete txtColors[key]; applyTxt(td, null); }
        }
      };

      td.addEventListener('mousedown', handleClick);

      const inp = document.createElement('input');
      inp.type = 'text'; inp.className = 'cell-inp'; inp.placeholder = '—';
      inp.dataset.r = r; inp.dataset.c = ci; inp.dataset.ikey = key;
      if(saved[key]) inp.value = saved[key];
      inp.addEventListener('input', updateStat);
      inp.addEventListener('keydown', navigate);
      inp.addEventListener('mousedown', handleClick);
      td.appendChild(inp); tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
}

/* ─────────────────────────────
   Keyboard navigation
───────────────────────────── */
function navigate(e){
  const r = +this.dataset.r, c = +this.dataset.c;
  let nr = r, nc = c;
  if(e.key === 'Tab'){
    e.preventDefault();
    if(c === -1){ nc = 0; }
    else { nc = c+1; if(nc >= cols.length){ nc = -1; nr = Math.min(r+1, rows-1); } }
  } else if(e.key === 'Enter')    { e.preventDefault(); nr = Math.min(r+1, rows-1); }
  else if(e.key === 'ArrowDown')  { e.preventDefault(); nr = Math.min(r+1, rows-1); }
  else if(e.key === 'ArrowUp')    { e.preventDefault(); nr = Math.max(r-1, 0); }
  else return;
  const sel = document.querySelector(`input[data-r="${nr}"][data-c="${nc===-1?'-1':nc}"]`);
  if(sel) sel.focus();
}

/* ─────────────────────────────
   Toolbar actions
───────────────────────────── */
function addRow()   { rows++; syncInput(); rebuildKeep(); }
function removeRow(){ if(rows < 2) return; rows--; syncInput(); rebuildKeep(); }
function setRows(v) { rows = Math.max(1, Math.min(50, +v||1)); syncInput(); rebuildKeep(); }
function syncInput(){ document.getElementById('nrows').value = rows; }
function addCol()   { cols.push(`Dia ${cols.length+1}`); rebuildKeep(); }
function delCol(ci) { if(cols.length < 2) return; cols.splice(ci,1); rebuildKeep(); }
function rebuildKeep(){
  buildTable();
  const h = document.getElementById('side-hdr');
  if(h) h.textContent = sideHeader;
}
function clearAll(){
  document.querySelectorAll('input[data-ikey]').forEach(i => i.value = '');
  bgColors = {}; txtColors = {};
  document.querySelectorAll('td[data-ckey]').forEach(td => { applyBg(td, null); applyTxt(td, null); });
  updateStat();
}
function updateStat(){
  const n = [...document.querySelectorAll('input[data-ikey]')].filter(i => i.value.trim()).length;
  document.getElementById('stat').textContent =
    `${n} célula${n!==1?'s':''} preenchida${n!==1?'s':''}`;
}

/* ─────────────────────────────
   Init
───────────────────────────── */
buildTable();
