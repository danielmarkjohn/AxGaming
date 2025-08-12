// Triad — polished Tic Tac Toe with minimax AI, undo, themes, score persistence
(() => {
  const boardEl = document.getElementById('board');
  const turnEl = document.getElementById('turn-player');
  const msgEl = document.getElementById('message');
  const modeSelect = document.getElementById('mode');
  const symbolSelect = document.getElementById('symbol');
  const btnRestart = document.getElementById('btn-restart');
  const btnUndo = document.getElementById('btn-undo');
  const btnTheme = document.getElementById('btn-theme');
  const scoreX = document.getElementById('score-x');
  const scoreO = document.getElementById('score-o');
  const scoreT = document.getElementById('score-tie');

  let board = Array(9).fill(null); // 0..8
  let history = [];
  let currentPlayer = 'X';
  let humanSymbol = 'X';
  let mode = 'pvp';
  let scores = {X:0, O:0, T:0};
  const WIN_COMBOS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  // init
  function init(){
    loadScores();
    renderBoard();
    bindEvents();
    updateUI();
  }

  function loadScores(){
    try{
      const s = JSON.parse(localStorage.getItem('triad_scores') || '{}');
      scores = {...scores, ...s};
    }catch(e){}
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreT.textContent = scores.T;
  }

  function saveScores(){ localStorage.setItem('triad_scores', JSON.stringify(scores)); }

  function renderBoard(){
    boardEl.innerHTML = '';
    for(let i=0;i<9;i++){
      const cell = document.createElement('div');
      cell.className = 'cell fade-in';
      cell.dataset.index = i;
      cell.setAttribute('role','gridcell');
      cell.addEventListener('click', onCellClick);
      const mark = board[i];
      if(mark) {
        const span = document.createElement('span');
        span.textContent = mark;
        span.className = mark === 'X' ? 'mark-x' : 'mark-o';
        cell.appendChild(span);
      }
      boardEl.appendChild(cell);
    }
  }

  function onCellClick(e){
    const idx = Number(e.currentTarget.dataset.index);
    if(board[idx] || isGameOver()) return;
    if(mode === 'cpu' && currentPlayer !== humanSymbol) return; // waiting for AI
    makeMove(idx, currentPlayer);
    if(mode === 'cpu' && !isGameOver()) {
      setTimeout(aiMove, 220);
    }
  }

  function makeMove(idx, player){
    history.push(board.slice());
    board[idx] = player;
    renderBoard();
    const winner = checkWinner(board);
    if(winner){
      endGame(winner);
    } else if(board.every(Boolean)){
      endGame('T'); // tie
    } else {
      currentPlayer = (player === 'X') ? 'O' : 'X';
      updateUI();
    }
  }

  function aiMove(){
    if(isGameOver()) return;
    const ai = humanSymbol === 'X' ? 'O' : 'X';
    const move = bestMove(board.slice(), ai);
    makeMove(move, ai);
  }

  function bestMove(bd, player){
    // minimax
    const opponent = player === 'X' ? 'O' : 'X';
    function scoreState(b){
      const w = checkWinner(b);
      if(w === player) return 10;
      if(w === opponent) return -10;
      return 0;
    }
    function minimax(b, p){
      const winner = checkWinner(b);
      if(winner) return {score: scoreState(b)};
      if(b.every(Boolean)) return {score:0};
      const moves = [];
      for(let i=0;i<9;i++){
        if(!b[i]){
          b[i] = p;
          const result = minimax(b, p === 'X' ? 'O' : 'X');
          moves.push({index:i, score: result.score});
          b[i] = null;
        }
      }
      // choose best for p
      let bestMove = null;
      if(p === player){
        let bestScore = -Infinity;
        for(const m of moves) if(m.score > bestScore){ bestScore = m.score; bestMove = m; }
      } else {
        let bestScore = Infinity;
        for(const m of moves) if(m.score < bestScore){ bestScore = m.score; bestMove = m; }
      }
      return bestMove;
    }
    return minimax(bd, player).index;
  }

  function checkWinner(bd){
    for(const combo of WIN_COMBOS){
      const [a,b,c] = combo;
      if(bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) return bd[a];
    }
    return null;
  }

  function endGame(result){
    if(result === 'T'){
      msgEl.textContent = "It's a tie.";
      scores.T += 1;
    } else {
      msgEl.textContent = `Winner — ${result}`;
      scores[result] += 1;
      // highlight winning cells
      const combo = WIN_COMBOS.find(c => board[c[0]] && board[c[0]] === board[c[1]] && board[c[1]] === board[c[2]]);
      if(combo){
        combo.forEach(i => {
          const cell = boardEl.querySelector(`.cell[data-index="${i}"]`);
          if(cell) cell.classList.add('win');
        });
      }
    }
    saveScores();
    updateUI(true);
  }

  function isGameOver(){
    return Boolean(checkWinner(board)) || board.every(Boolean);
  }

  function undo(){
    if(history.length === 0) return;
    board = history.pop();
    // if vs CPU, pop again to revert CPU move as well
    if(mode === 'cpu' && history.length && currentPlayer !== humanSymbol){
      board = history.pop();
    }
    currentPlayer = 'X';
    renderBoard();
    msgEl.textContent = 'Move undone.';
    updateUI();
  }

  function restart(){
    board = Array(9).fill(null);
    history = [];
    currentPlayer = 'X';
    msgEl.textContent = 'New game started.';
    document.querySelectorAll('.cell').forEach(c=>c.classList.remove('win'));
    renderBoard();
    updateUI();
  }

  function updateUI(final=false){
    turnEl.textContent = currentPlayer;
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreT.textContent = scores.T;
    if(final) {
      // flashing message
      msgEl.classList.add('fade-in');
      setTimeout(()=> msgEl.classList.remove('fade-in'), 400);
    }
  }

  function bindEvents(){
    modeSelect.addEventListener('change', e=>{
      mode = e.target.value;
      restart();
    });
    symbolSelect.addEventListener('change', e=>{
      humanSymbol = e.target.value;
      restart();
      // if CPU starts as X and human selected O, play AI move
      if(mode === 'cpu' && humanSymbol === 'O'){
        setTimeout(aiMove, 300);
      }
    });
    btnRestart.addEventListener('click', restart);
    btnUndo.addEventListener('click', undo);
    btnTheme.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('theme-alt');
    });
    // keyboard shortcuts
    window.addEventListener('keydown', e=>{
      if(e.key === 'r') restart();
      if(e.key === 'u') undo();
    });
  }

  // expose for debugging
  window.__triad = {get board(){return board}, restart, undo};

  init();
})();