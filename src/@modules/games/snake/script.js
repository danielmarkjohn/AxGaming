// Serpent — polished HTML5 Snake game
(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d', { alpha: true });
  const scoreEl = document.getElementById('score');
  const highEl = document.getElementById('highscore');
  const btnRestart = document.getElementById('btn-restart');
  const btnPause = document.getElementById('btn-pause');
  const btnSound = document.getElementById('btn-sound');

  const DPR = Math.max(1, window.devicePixelRatio || 1);
  const WIDTH = 720;
  const HEIGHT = 480;
  canvas.width = WIDTH * DPR;
  canvas.height = HEIGHT * DPR;
  canvas.style.width = WIDTH + 'px';
  canvas.style.height = HEIGHT + 'px';
  ctx.scale(DPR, DPR);

  // Game settings
  const GRID_SIZE = 20; // size of grid cell in px
  const COLS = Math.floor(WIDTH / GRID_SIZE);
  const ROWS = Math.floor(HEIGHT / GRID_SIZE);
  const BASE_SPEED = 8; // frames per second initial
  let speed = BASE_SPEED;
  let lastFrameTime = 0;
  let accumulator = 0;

  // State
  let snake = [{x: Math.floor(COLS/2), y: Math.floor(ROWS/2)}];
  let dir = {x:1,y:0};
  let nextDir = null;
  let food = null;
  let score = 0;
  let highscore = Number(localStorage.getItem('serpent_high') || 0);
  let running = true;
  let soundOn = true;
  highEl.textContent = highscore;

  // Particle system for eat
  const particles = [];

  function placeFood(){
    const blocked = new Set(snake.map(s=>s.x + ',' + s.y));
    let tries = 0;
    while(tries < 1000){
      const x = Math.floor(Math.random()*COLS);
      const y = Math.floor(Math.random()*ROWS);
      if(!blocked.has(x+','+y)){
        food = {x,y, r: GRID_SIZE/2 * 0.9, type: Math.random()<0.12 ? 'gold' : 'fruit'};
        return;
      }
      tries++;
    }
  }

  function resetGame(){
    snake = [{x: Math.floor(COLS/2), y: Math.floor(ROWS/2)}];
    dir = {x:1,y:0}; nextDir = null;
    score = 0; speed = BASE_SPEED; running = true;
    placeFood();
    scoreEl.textContent = score;
  }

  function saveHigh(){
    if(score > highscore){
      highscore = score;
      localStorage.setItem('serpent_high', String(highscore));
      highEl.textContent = highscore;
    }
  }

  function playSound(type){
    if(!soundOn) return;
    try{
      const a = new Audio();
      a.src = 'data:audio/wav;base64,' + sounds[type];
      a.volume = 0.2;
      a.play().catch(()=>{});
    }catch(e){}
  }

  // Small WAV samples (very short) base64-encoded — tiny generated tones
  const sounds = {
    eat: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YUIAAAAA/////w==',
    hit: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YUIAAAAA/////w==',
  };

  // Draw rounded rect
  function roundRect(x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.closePath();
  }

  function drawGrid(){
    // subtle grid glow
    ctx.save();
    ctx.globalAlpha = 0.06;
    for(let i=0;i<=COLS;i++){
      ctx.fillRect(i*GRID_SIZE - 0.5, 0, 1, HEIGHT);
    }
    for(let j=0;j<=ROWS;j++){
      ctx.fillRect(0, j*GRID_SIZE - 0.5, WIDTH, 1);
    }
    ctx.restore();
  }

  function drawBackground(){
    // layered gradient with vignette
    const g = ctx.createLinearGradient(0,0,0,HEIGHT);
    g.addColorStop(0, 'rgba(6,10,16,0.9)');
    g.addColorStop(1, 'rgba(2,6,12,0.95)');
    ctx.fillStyle = g;
    roundRect(0,0,WIDTH,HEIGHT,12);
    ctx.fill();
    // subtle vignette
    const vg = ctx.createRadialGradient(WIDTH*0.3, HEIGHT*0.15, 100, WIDTH*0.5, HEIGHT*0.5, Math.max(WIDTH,HEIGHT));
    vg.addColorStop(0, 'rgba(0,212,255,0.02)');
    vg.addColorStop(1, 'rgba(0,0,0,0.6)');
    ctx.fillStyle = vg;
    ctx.fillRect(0,0,WIDTH,HEIGHT);
  }

  function spawnParticles(x,y,color='rgba(255,220,120,0.9)'){
    for(let i=0;i<18;i++){
      particles.push({
        x: x + (Math.random()-0.5)*GRID_SIZE*0.6,
        y: y + (Math.random()-0.5)*GRID_SIZE*0.6,
        vx: (Math.random()-0.5)*2.6,
        vy: (Math.random()-0.9)*3.8,
        life: 40 + Math.random()*20,
        color
      });
    }
  }

  function updateParticles(){
    for(let i=particles.length-1;i>=0;i--){
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.life -= 1;
      p.vx *= 0.99;
      if(p.life<=0) particles.splice(i,1);
    }
  }

  function drawParticles(){
    ctx.save();
    particles.forEach(p=>{
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life/60));
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawFood(){
    if(!food) return;
    const fx = food.x*GRID_SIZE + GRID_SIZE/2;
    const fy = food.y*GRID_SIZE + GRID_SIZE/2;
    // glow
    ctx.save();
    const rg = ctx.createRadialGradient(fx,fy,2,fx,fy,GRID_SIZE*1.2);
    if(food.type === 'gold'){
      rg.addColorStop(0,'rgba(255,218,88,1)');
      rg.addColorStop(1,'rgba(255,218,88,0)');
    } else {
      rg.addColorStop(0,'rgba(255,90,90,0.95)');
      rg.addColorStop(1,'rgba(255,90,90,0)');
    }
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(fx,fy, GRID_SIZE*0.9, 0, Math.PI*2);
    ctx.fill();
    // fruit detail
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.08;
    ctx.beginPath();
    ctx.arc(fx - GRID_SIZE*0.18, fy - GRID_SIZE*0.28, GRID_SIZE*0.2, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawSnake(){
    for(let i=snake.length-1;i>=0;i--){
      const s = snake[i];
      const x = s.x*GRID_SIZE, y = s.y*GRID_SIZE;
      const t = i/snake.length;
      // body gradient color
      const hue = 160 - t*80;
      ctx.fillStyle = `hsl(${hue} 80% ${40 - t*8}%)`;
      roundRect(x+2, y+2, GRID_SIZE-4, GRID_SIZE-4, 6);
      ctx.fill();
      // sheen
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#fff';
      roundRect(x+2, y+2, GRID_SIZE-4, (GRID_SIZE-4)/2, 6);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    // head shine circle
    const head = snake[0];
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.arc(head.x*GRID_SIZE + GRID_SIZE/2, head.y*GRID_SIZE + GRID_SIZE/2, GRID_SIZE*0.8, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function moveSnake(){
    const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
    // wrap-around world
    if(head.x < 0) head.x = COLS - 1;
    if(head.x >= COLS) head.x = 0;
    if(head.y < 0) head.y = ROWS - 1;
    if(head.y >= ROWS) head.y = 0;

    // collision with body
    for(let i=0;i<snake.length;i++){
      if(snake[i].x === head.x && snake[i].y === head.y){
        // hit
        playSound('hit');
        running = false;
        saveHigh();
        return;
      }
    }

    snake.unshift(head);

    // eat
    if(food && head.x === food.x && head.y === food.y){
      score += (food.type === 'gold') ? 10 : 1;
      // speed increase slightly
      speed = BASE_SPEED + Math.floor(score/6);
      playSound('eat');
      spawnParticles(head.x*GRID_SIZE + GRID_SIZE/2, head.y*GRID_SIZE + GRID_SIZE/2, 'rgba(255,200,120,0.95)');
      if(food.type === 'gold'){
        // golden fruit gives a length burst
        for(let i=0;i<2;i++) snake.push({...snake[snake.length-1]});
      }
      placeFood();
      scoreEl.textContent = score;
      return;
    }

    // normal move: pop tail
    snake.pop();
  }

  function update(delta){
    if(!running) return;
    accumulator += delta;
    const period = 1000 / speed;
    if(accumulator >= period){
      accumulator -= period;
      // apply buffered direction
      if(nextDir){
        // prevent reverse
        if(!(nextDir.x === -dir.x && nextDir.y === -dir.y)){
          dir = nextDir;
        }
        nextDir = null;
      }
      moveSnake();
    }
    updateParticles();
  }

  function draw(){
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    drawBackground();
    drawGrid();
    drawFood();
    drawParticles();
    drawSnake();
  }

  function loop(ts){
    if(!lastFrameTime) lastFrameTime = ts;
    const delta = ts - lastFrameTime;
    lastFrameTime = ts;
    update(delta);
    draw();
    requestAnimationFrame(loop);
  }

  // Input handling
  window.addEventListener('keydown', e => {
    if(e.key === 'ArrowUp' || e.key === 'w') nextDir = {x:0,y:-1};
    if(e.key === 'ArrowDown' || e.key === 's') nextDir = {x:0,y:1};
    if(e.key === 'ArrowLeft' || e.key === 'a') nextDir = {x:-1,y:0};
    if(e.key === 'ArrowRight' || e.key === 'd') nextDir = {x:1,y:0};
    if(e.code === 'Space') {
      running = !running;
      btnPause.textContent = running ? '⏸' : '▶';
    }
  });

  // Touch swipe support for mobile
  let touchStart = null;
  canvas.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    touchStart = {x: t.clientX, y: t.clientY};
  });
  canvas.addEventListener('touchend', (e) => {
    if(!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    touchStart = null;
    if(Math.abs(dx) > Math.abs(dy)){
      if(dx > 20) nextDir = {x:1,y:0};
      else if(dx < -20) nextDir = {x:-1,y:0};
    } else {
      if(dy > 20) nextDir = {x:0,y:1};
      else if(dy < -20) nextDir = {x:0,y:-1};
    }
  });

  // Mouse click to quick turn (optional)
  canvas.addEventListener('click', (e) => {
    // point relative to canvas
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const head = snake[0];
    const hx = head.x*GRID_SIZE + GRID_SIZE/2;
    const hy = head.y*GRID_SIZE + GRID_SIZE/2;
    const dx = cx - hx, dy = cy - hy;
    if(Math.abs(dx) > Math.abs(dy)){
      nextDir = {x: dx>0 ? 1:-1, y:0};
    } else {
      nextDir = {x:0, y: dy>0 ? 1:-1};
    }
  });

  btnRestart.addEventListener('click', ()=>{ resetGame(); playSound('eat'); });
  btnPause.addEventListener('click', ()=>{ running = !running; btnPause.textContent = running ? '⏸' : '▶'; });
  btnSound.addEventListener('click', ()=>{ soundOn = !soundOn; btnSound.textContent = soundOn ? '🔊' : '🔈'; });

  // Start
  resetGame();
  requestAnimationFrame(loop);

  // save on unload
  window.addEventListener('beforeunload', saveHigh);
  // autosave highscore periodically
  setInterval(saveHigh, 2000);

  // expose debug (optional)
  window.__serpent = {
    snake, get score(){return score;}, get high(){return highscore}
  };
})();