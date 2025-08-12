// Modern Timer - Countdown, Stopwatch & Pomodoro
(() => {
  // DOM Elements
  const timeDisplay = document.getElementById('time-display');
  const timeLabel = document.getElementById('time-label');
  const progressCircle = document.getElementById('progress-circle');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const resetBtn = document.getElementById('reset-btn');
  const notification = document.getElementById('notification');
  const notificationClose = document.getElementById('notification-close');
  const btnSound = document.getElementById('btn-sound');
  const btnTheme = document.getElementById('btn-theme');

  // Timer inputs
  const hoursInput = document.getElementById('hours-input');
  const minutesInput = document.getElementById('minutes-input');
  const secondsInput = document.getElementById('seconds-input');

  // Mode elements
  const modeBtns = document.querySelectorAll('.mode-btn');
  const timerSection = document.getElementById('timer-section');
  const pomodoroSection = document.getElementById('pomodoro-section');

  // Pomodoro elements
  const pomodoroCount = document.getElementById('pomodoro-count');
  const currentSession = document.getElementById('current-session');
  const workTimeInput = document.getElementById('work-time');
  const breakTimeInput = document.getElementById('break-time');

  // State
  let currentMode = 'timer';
  let isRunning = false;
  let isPaused = false;
  let timeLeft = 0;
  let totalTime = 0;
  let interval = null;
  let soundEnabled = true;

  // Pomodoro state
  let pomodoroSessions = 0;
  let isWorkSession = true;

  // Initialize
  function init() {
    loadSettings();
    bindEvents();
    updateDisplay();
    setMode('timer');
  }

  // Event Listeners
  function bindEvents() {
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    notificationClose.addEventListener('click', hideNotification);
    btnSound.addEventListener('click', toggleSound);
    btnTheme.addEventListener('click', toggleTheme);

    // Mode buttons
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => setMode(btn.dataset.mode));
    });

    // Quick timer buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', () => setQuickTimer(parseInt(btn.dataset.time)));
    });

    // Input changes
    [hoursInput, minutesInput, secondsInput].forEach(input => {
      input.addEventListener('change', updateTimerFromInputs);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboard);
  }

  // Set mode
  function setMode(mode) {
    currentMode = mode;
    
    // Update active button
    modeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Show/hide sections
    timerSection.classList.toggle('hidden', mode !== 'timer');
    pomodoroSection.classList.toggle('hidden', mode !== 'pomodoro');

    // Reset and update
    resetTimer();
    
    if (mode === 'stopwatch') {
      timeLabel.textContent = 'Stopwatch ready';
      timeLeft = 0;
      totalTime = 0;
    } else if (mode === 'pomodoro') {
      timeLabel.textContent = 'Pomodoro timer';
      setWorkSession();
    } else {
      timeLabel.textContent = 'Set your timer';
      updateTimerFromInputs();
    }
    
    updateDisplay();
  }

  // Timer functions
  function startTimer() {
    if (currentMode === 'timer' && timeLeft === 0) {
      updateTimerFromInputs();
      if (timeLeft === 0) return;
    }

    if (currentMode === 'pomodoro' && timeLeft === 0) {
      setWorkSession();
    }

    isRunning = true;
    isPaused = false;
    
    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    
    if (currentMode === 'stopwatch') {
      timeLabel.textContent = 'Running...';
    } else {
      timeLabel.textContent = isRunning ? 'Running...' : 'Paused';
    }

    interval = setInterval(tick, 1000);
  }

  function pauseTimer() {
    isRunning = false;
    isPaused = true;
    clearInterval(interval);
    
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    timeLabel.textContent = 'Paused';
  }

  function resetTimer() {
    isRunning = false;
    isPaused = false;
    clearInterval(interval);
    
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    
    if (currentMode === 'timer') {
      updateTimerFromInputs();
      timeLabel.textContent = 'Set your timer';
    } else if (currentMode === 'stopwatch') {
      timeLeft = 0;
      totalTime = 0;
      timeLabel.textContent = 'Stopwatch ready';
    } else if (currentMode === 'pomodoro') {
      setWorkSession();
      timeLabel.textContent = 'Pomodoro timer';
    }
    
    updateDisplay();
    updateProgress();
  }

  // Timer tick
  function tick() {
    if (currentMode === 'stopwatch') {
      timeLeft++;
      totalTime++;
    } else {
      timeLeft--;
      
      if (timeLeft <= 0) {
        timeLeft = 0;
        timerComplete();
        return;
      }
    }
    
    updateDisplay();
    updateProgress();
  }

  // Timer complete
  function timerComplete() {
    isRunning = false;
    clearInterval(interval);
    
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    
    if (currentMode === 'pomodoro') {
      if (isWorkSession) {
        pomodoroSessions++;
        pomodoroCount.textContent = pomodoroSessions;
        setBreakSession();
        timeLabel.textContent = 'Work session complete! Take a break.';
      } else {
        setWorkSession();
        timeLabel.textContent = 'Break over! Ready for work.';
      }
      saveSettings();
    } else {
      timeLabel.textContent = "Time's up!";
    }
    
    showNotification();
    playSound();
    updateDisplay();
    updateProgress();
  }

  // Pomodoro sessions
  function setWorkSession() {
    isWorkSession = true;
    const minutes = parseInt(workTimeInput.value) || 25;
    timeLeft = minutes * 60;
    totalTime = timeLeft;
    currentSession.textContent = 'Work';
    currentSession.style.color = '#4ade80';
  }

  function setBreakSession() {
    isWorkSession = false;
    const minutes = parseInt(breakTimeInput.value) || 5;
    timeLeft = minutes * 60;
    totalTime = timeLeft;
    currentSession.textContent = 'Break';
    currentSession.style.color = '#fbbf24';
  }

  // Update timer from inputs
  function updateTimerFromInputs() {
    if (currentMode !== 'timer') return;
    
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    
    timeLeft = hours * 3600 + minutes * 60 + seconds;
    totalTime = timeLeft;
    
    updateDisplay();
    updateProgress();
  }

  // Set quick timer
  function setQuickTimer(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    hoursInput.value = hours;
    minutesInput.value = minutes;
    secondsInput.value = secs;
    
    updateTimerFromInputs();
  }

  // Update display
  function updateDisplay() {
    const time = currentMode === 'stopwatch' ? timeLeft : Math.max(0, timeLeft);
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    
    timeDisplay.textContent = 
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Update progress ring
  function updateProgress() {
    if (currentMode === 'stopwatch' || totalTime === 0) {
      progressCircle.style.strokeDashoffset = '565.48';
      return;
    }
    
    const progress = (totalTime - timeLeft) / totalTime;
    const offset = 565.48 - (progress * 565.48);
    progressCircle.style.strokeDashoffset = offset;
  }

  // Notification
  function showNotification() {
    notification.classList.remove('hidden');
    setTimeout(hideNotification, 5000);
  }

  function hideNotification() {
    notification.classList.add('hidden');
  }

  // Sound
  function playSound() {
    if (!soundEnabled) return;
    
    // Create audio context for beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    btnSound.textContent = soundEnabled ? '🔊' : '🔈';
    saveSettings();
  }

  // Theme
  function toggleTheme() {
    document.documentElement.classList.toggle('theme-alt');
    saveSettings();
  }

  // Keyboard shortcuts
  function handleKeyboard(e) {
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key) {
      case ' ':
        e.preventDefault();
        if (isRunning) pauseTimer();
        else startTimer();
        break;
      case 'r':
        resetTimer();
        break;
      case 'Escape':
        hideNotification();
        break;
    }
  }

  // Settings
  function saveSettings() {
    const settings = {
      soundEnabled,
      pomodoroSessions,
      theme: document.documentElement.classList.contains('theme-alt') ? 'alt' : 'default'
    };
    localStorage.setItem('timer_settings', JSON.stringify(settings));
  }

  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('timer_settings') || '{}');
      soundEnabled = settings.soundEnabled !== false;
      pomodoroSessions = settings.pomodoroSessions || 0;
      
      btnSound.textContent = soundEnabled ? '🔊' : '🔈';
      pomodoroCount.textContent = pomodoroSessions;
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
    } catch (e) {}
  }

  // Initialize app
  init();

  // Expose for debugging
  window.__timer = {
    get timeLeft() { return timeLeft; },
    get isRunning() { return isRunning; },
    get mode() { return currentMode; }
  };
})();
