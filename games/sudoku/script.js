// TriLevel Sudoku — generator, solver, UI and victory confetti
(() => {
  // DOM
  const screens = {
    landing: document.getElementById('landing'),
    menu: document.getElementById('menu'),
    game: document.getElementById('game'),
    victory: document.getElementById('victory')
  };
  const btnStart = document.getElementById('btn-start');
  const btnHow = document.getElementById('btn-how');
  const btnBackLanding = document.getElementById('btn-back-landing');
  const btnNew = document.getElementById('btn-newgame');
  const boardEl = document.getElementById('sudoku-board');
  const numPad = document.getElementById('num-pad');
  const btnMenu = document.getElementById('btn-menu');
  const btnNote = document.getElementById('btn-note');
  const btnHint = document.getElementById('btn-hint');
  const btnErase = document.getElementById('btn-erase');
  const btnValidate = document.getElementById('btn-validate');
  const diffLabel = document.getElementById('diff-label');
  const timerEl = document.getElementById('timer');
  const hintsEl = document.getElementById('hints');
  const victoryTitle = document.getElementById('victory-title');
  const victoryDetails = document.getElementById('victory-details');
  const btnPlayAgain = document.getElementById('btn-playagain');
  const btnBackMenu = document.getElementById('btn-backmenu');
  const confettiCanvas = document.getElementById('confetti');

  // state
  let solution = null;
  let puzzle = null;
  let pencil = true;
  let selected = null;
  let difficulty = 'easy';
  let startTime = null;
  let timerInterval = null;
  let hintsLeft = 3;
  const highs = JSON.parse(localStorage.getItem('sudoku_highs')||'{}');

  // utility helpers
  function show(screen){
    Object.values(screens).forEach(s=>s.classList.remove('active'));
    screens[screen].classList.add('active');
  }

  // Navigation
  btnStart.addEventListener('click', ()=> show('menu'));
  btnHow.addEventListener('click', ()=> { alert('Tap a cell and use the keypad or keyboard. Use Notes to add pencil marks.'); });
  btnBackLanding.addEventListener('click', ()=> show('landing'));
  btnMenu.addEventListener('click', ()=> show('menu'));

  // settings toggles
  document.getElementById('toggle-notes').addEventListener('change', (e)=> pencil = e.target.checked);
  document.getElementById('toggle-sound').addEventListener('change', (e)=> {/* stub for sound */});

  // generate keypad
  for(let i=1;i<=9;i++){
    const b = document.createElement('div');
    b.className = 'num';
    b.textContent = i;
    b.dataset.val = i;
    b.addEventListener('click', ()=> onPad(Number(b.dataset.val)));
    numPad.appendChild(b);
  }
  const eraseBtn = document.createElement('div'); eraseBtn.className='num'; eraseBtn.textContent='⌫'; eraseBtn.addEventListener('click', ()=> onErase()); numPad.appendChild(eraseBtn);

  function onPad(val){
    if(!selected) return;
    const idx = Number(selected.dataset.idx);
    if(puzzle.fixed[idx]) return;
    if(val === 0) return;
    if(pencil){
      // toggle note
      const notes = puzzle.notes[idx] || new Set();
      if(notes.has(val)) notes.delete(val);
      else notes.add(val);
      puzzle.notes[idx] = notes;
    } else {
      setCell(idx, val);
    }
    renderBoard();
    checkWinAuto();
  }
  function onErase(){
    if(!selected) return;
    const idx = Number(selected.dataset.idx);
    if(puzzle.fixed[idx]) return;
    puzzle.values[idx] = 0;
    puzzle.notes[idx] = new Set();
    renderBoard();
  }

  function setCell(idx, val){
    puzzle.values[idx] = val;
    puzzle.notes[idx] = new Set();
    playTick();
  }

  function playTick(){ /* stub sound */ }

  // New game workflow
  btnNew.addEventListener('click', ()=> {
    const sel = document.querySelector('input[name="diff"]:checked');
    difficulty = sel ? sel.value : 'easy';
    startNewGame(difficulty);
  });

  btnPlayAgain.addEventListener('click', ()=> {
    startNewGame(difficulty);
    show('game');
  });
  btnBackMenu.addEventListener('click', ()=> show('menu'));

  btnNote.addEventListener('click', ()=> { pencil = !pencil; btnNote.classList.toggle('active', pencil); });
  btnErase.addEventListener('click', ()=> { if(selected){ onErase(); } });
  btnHint.addEventListener('click', ()=> { if(hintsLeft>0){ giveHint(); } });

  btnValidate.addEventListener('click', ()=> validateBoard(true));

  // keyboard input
  window.addEventListener('keydown', (e)=>{
    if(!puzzle) return;
    if(e.key >= '1' && e.key <= '9') onPad(Number(e.key));
    if(e.key === 'Backspace' || e.key === 'Delete') onErase();
    if(e.key === 'n') { pencil = !pencil; btnNote.classList.toggle('active', pencil); }
  });

  // Board rendering & interactivity
  function renderBoard(){
    boardEl.innerHTML = '';
    const size = 9;
    for(let i=0;i<81;i++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.idx = i;
      // thick borders for 3x3 boxes
      const r = Math.floor(i/9), c = i%9;
      const style = [];
      if(c % 3 === 0) style.push('border-left:2px solid rgba(255,255,255,0.04)');
      if(r % 3 === 0) style.push('border-top:2px solid rgba(255,255,255,0.04)');
      if(c === 8) style.push('border-right:2px solid rgba(255,255,255,0.04)');
      if(r === 8) style.push('border-bottom:2px solid rgba(255,255,255,0.04)');
      cell.style = style.join(';');
      const val = puzzle.values[i];
      if(puzzle.fixed[i]){
        cell.classList.add('prefilled');
        cell.textContent = val || '';
      } else {
        if(val){
          cell.textContent = val;
        } else {
          // notes
          const notes = puzzle.notes[i];
          if(notes && notes.size){
            cell.classList.add('small');
            const frag = document.createDocumentFragment();
            for(let n=1;n<=9;n++){
              const s = document.createElement('div');
              s.textContent = notes.has(n)? n : '';
              frag.appendChild(s);
            }
            cell.appendChild(frag);
          } else {
            cell.textContent = '';
          }
        }
      }
      // click handler
      cell.addEventListener('click', ()=> onCellClick(cell));
      boardEl.appendChild(cell);
    }
    // update hints and timer
    hintsEl.textContent = hintsLeft;
  }

  function onCellClick(cell){
    // select
    document.querySelectorAll('.cell').forEach(c=>c.classList.remove('selected'));
    cell.classList.add('selected');
    selected = cell;
  }

  // Timer
  function startTimer(){
    startTime = Date.now();
    if(timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(()=>{
      const s = Math.floor((Date.now() - startTime)/1000);
      timerEl.textContent = formatTime(s);
    }, 500);
  }
  function stopTimer(){ if(timerInterval) clearInterval(timerInterval); }
  function formatTime(sec){
    const m = Math.floor(sec/60).toString().padStart(2,'0');
    const s = (sec%60).toString().padStart(2,'0');
    return `${m}:${s}`;
  }

  // Hints
  function giveHint(){
    // find an empty cell and fill with solution
    const empties = [];
    for(let i=0;i<81;i++) if(!puzzle.values[i]) empties.push(i);
    if(!empties.length) return;
    const idx = empties[Math.floor(Math.random()*empties.length)];
    setCell(idx, solution[idx]);
    hintsLeft--;
    renderBoard();
    checkWinAuto();
  }

  // Validation / win check
  function validateBoard(showErrors=false){
    let ok = true;
    for(let i=0;i<81;i++){
      const val = puzzle.values[i];
      if(val){
        if(!isValidPlacement(puzzle.values, i, val)){
          ok = false;
          if(showErrors){
            const el = boardEl.querySelector(`.cell[data-idx="${i}"]`);
            if(el) el.classList.add('error');
          }
        }
      }
    }
    return ok;
  }

  function checkWinAuto(){
    if(puzzle.values.every(v=>v)) {
      if(JSON.stringify(puzzle.values) === JSON.stringify(solution)){
        // win!
        onWin();
      } else {
        // wrong entries exist, highlight if validate called
      }
    }
  }

  // Win flow
  function onWin(){
    stopTimer();
    const timeTaken = Math.floor((Date.now() - startTime)/1000);
    const prev = highs[difficulty] || Infinity;
    const isRecord = timeTaken < prev;
    if(isRecord) highs[difficulty] = timeTaken;
    localStorage.setItem('sudoku_highs', JSON.stringify(highs));
    victoryTitle.textContent = isRecord ? 'New Record!' : 'Victory!';
    victoryDetails.textContent = `Time: ${formatTime(timeTaken)} — Difficulty: ${difficulty}`;
    show('victory');
    runConfetti();
  }

  // Confetti
  function runConfetti(){
    const canvas = confettiCanvas;
    canvas.width = innerWidth; canvas.height = innerHeight;
    const ctx = canvas.getContext('2d');
    const pieces = [];
    for(let i=0;i<120;i++){
      pieces.push({
        x: Math.random()*canvas.width,
        y: -Math.random()*canvas.height,
        vx: (Math.random()-0.5)*4,
        vy: 2+Math.random()*6,
        size: 6+Math.random()*8,
        rot: Math.random()*360,
        color: `hsl(${Math.random()*360} 80% 60%)`,
        life: 200+Math.random()*200
      });
    }
    let raf;
    function update(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(const p of pieces){
        p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life--;
        ctx.save();
        ctx.translate(p.x,p.y);
        ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
        ctx.restore();
      }
      if(pieces.some(p=>p.life>0)) raf = requestAnimationFrame(update);
      else { ctx.clearRect(0,0,canvas.width,canvas.height); cancelAnimationFrame(raf); }
    }
    update();
  }

  // --- Sudoku generation & solver ---
  // Backtracking solver / generator, ensures unique solution by counting up to 2.
  function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]] } return arr; }

  function solve(board){
    // returns a solved array or null
    const b = board.slice();
    const empties = b.map((v,i)=>v?null:i).filter(v=>v!==null);
    function helper(){
      const idx = b.findIndex(v=>!v);
      if(idx === -1) return true;
      for(let n=1;n<=9;n++){
        if(isValidPlacement(b, idx, n)){
          b[idx]=n;
          if(helper()) return true;
          b[idx]=0;
        }
      }
      return false;
    }
    if(helper()) return b;
    return null;
  }

  function countSolutions(board, limit=2){
    const b = board.slice();
    let count = 0;
    function helper(){
      if(count>=limit) return;
      const idx = b.findIndex(v=>!v);
      if(idx === -1){ count++; return; }
      for(let n=1;n<=9;n++){
        if(isValidPlacement(b, idx, n)){
          b[idx]=n;
          helper();
          b[idx]=0;
          if(count>=limit) return;
        }
      }
    }
    helper();
    return count;
  }

  function isValidPlacement(b, idx, val){
    const r = Math.floor(idx/9), c = idx%9;
    // row
    for(let i=0;i<9;i++){ if(b[r*9+i] === val && (r*9+i)!==idx) return false; }
    // col
    for(let i=0;i<9;i++){ if(b[i*9+c] === val && (i*9+c)!==idx) return false; }
    // box
    const br = Math.floor(r/3)*3, bc = Math.floor(c/3)*3;
    for(let rr=0;rr<3;rr++) for(let cc=0;cc<3;cc++){
      const id = (br+rr)*9 + (bc+cc);
      if(b[id] === val && id !== idx) return false;
    }
    return true;
  }

  function generateFullSolution(){
    const b = Array(81).fill(0);
    const order = [...Array(81).keys()];
    function helper(){
      const idx = b.findIndex(v=>!v);
      if(idx === -1) return true;
      const nums = shuffle([1,2,3,4,5,6,7,8,9]);
      for(const n of nums){
        if(isValidPlacement(b, idx, n)){
          b[idx]=n;
          if(helper()) return true;
          b[idx]=0;
        }
      }
      return false;
    }
    helper();
    return b;
  }

  function makePuzzleFromSolution(sol, removals){
    const p = sol.slice();
    const fixed = new Array(81).fill(true);
    // remove cells randomly ensuring unique solution
    const indices = shuffle([...Array(81).keys()]);
    let removed = 0;
    for(const idx of indices){
      if(removed >= removals) break;
      const backup = p[idx];
      p[idx]=0;
      const cnt = countSolutions(p, 2);
      if(cnt === 1){
        fixed[idx] = false;
        removed++;
      } else {
        p[idx]=backup; // keep it
      }
    }
    // if not enough removed (rare), try again more aggressively (allow non-unique) - fallback
    if(removed < removals){
      for(const idx of indices){
        if(removed >= removals) break;
        if(p[idx]!==0) { p[idx]=0; fixed[idx]=false; removed++; }
      }
    }
    return {values: p, fixed};
  }

  function startNewGame(diff){
    difficulty = diff;
    diffLabel.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
    // difficulty -> number of removals (approx)
    const target = diff === 'easy' ? 34 : diff === 'medium' ? 44 : 54;
    // create full solution and puzzle
    solution = generateFullSolution();
    puzzle = makePuzzleFromSolution(solution, target);
    // initialize notes as sets
    puzzle.notes = Array(81).fill(null).map(()=> new Set());
    // ensure fixed array present
    puzzle.fixed = puzzle.fixed || new Array(81).fill(false);
    // hints
    hintsLeft = diff === 'hard' ? 1 : diff === 'medium' ? 2 : 3;
    hintsEl.textContent = hintsLeft;
    // start timer
    startTimer();
    show('game');
    renderBoard();
  }

  // initialize main menu highs display
  function refreshHighs(){
    const el = document.getElementById('highscores');
    el.innerHTML = '';
    const d = ['easy','medium','hard'];
    d.forEach(k=>{
      const t = highs[k] ? formatTime(highs[k]) : '—';
      const row = document.createElement('div');
      row.textContent = `${k.toUpperCase()}: ${t}`;
      el.appendChild(row);
    });
  }
  refreshHighs();

  // expose for debugging
  window.__sudoku = { startNewGame, puzzle, solution };

  // auto-start an easy board to show template
  // startNewGame('easy');
})();