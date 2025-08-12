// Advanced Calculator with History
(() => {
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  const historyListEl = document.getElementById('history-list');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const btnTheme = document.getElementById('btn-theme');

  let currentExpression = '';
  let currentResult = '0';
  let history = [];
  let justCalculated = false;

  // Load history from localStorage
  function loadHistory() {
    try {
      const saved = JSON.parse(localStorage.getItem('calculator_history') || '[]');
      history = saved;
      renderHistory();
    } catch (e) {}
  }

  // Save history to localStorage
  function saveHistory() {
    try {
      localStorage.setItem('calculator_history', JSON.stringify(history.slice(-20))); // Keep last 20
    } catch (e) {}
  }

  // Render history panel
  function renderHistory() {
    if (history.length === 0) {
      historyListEl.innerHTML = '<div class="history-empty">No calculations yet</div>';
      return;
    }

    historyListEl.innerHTML = history.slice(-10).reverse().map(item => `
      <div class="history-item" onclick="useHistoryItem('${item.expression}', '${item.result}')">
        <div class="calc">${item.expression}</div>
        <div class="result">= ${item.result}</div>
      </div>
    `).join('');
  }

  // Use history item
  window.useHistoryItem = function(expression, result) {
    currentExpression = expression;
    currentResult = result;
    updateDisplay();
    justCalculated = true;
  };

  // Update display
  function updateDisplay() {
    expressionEl.textContent = currentExpression || '0';
    resultEl.textContent = currentResult;
  }

  // Add to history
  function addToHistory(expression, result) {
    history.push({ expression, result, timestamp: Date.now() });
    saveHistory();
    renderHistory();
  }

  // Handle button clicks
  function handleButtonClick(e) {
    const btn = e.target.closest('.btn');
    if (!btn) return;

    const value = btn.dataset.value;
    const action = btn.dataset.action;

    // Add visual feedback
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = '', 100);

    if (action) {
      handleAction(action);
    } else if (value) {
      handleValue(value);
    }
  }

  // Handle actions (clear, backspace, equals)
  function handleAction(action) {
    switch (action) {
      case 'clear':
        currentExpression = '';
        currentResult = '0';
        justCalculated = false;
        break;
      
      case 'clear-entry':
        currentResult = '0';
        break;
      
      case 'backspace':
        if (justCalculated) {
          currentExpression = '';
          currentResult = '0';
          justCalculated = false;
        } else if (currentExpression) {
          currentExpression = currentExpression.slice(0, -1);
          if (currentExpression) {
            try {
              currentResult = evaluateExpression(currentExpression).toString();
            } catch (e) {
              currentResult = '0';
            }
          } else {
            currentResult = '0';
          }
        }
        break;
      
      case 'equals':
        if (currentExpression && !justCalculated) {
          try {
            const result = evaluateExpression(currentExpression);
            addToHistory(currentExpression, result.toString());
            currentResult = result.toString();
            justCalculated = true;
          } catch (e) {
            currentResult = 'Error';
            justCalculated = true;
          }
        }
        break;
    }
    updateDisplay();
  }

  // Handle value input (numbers, operators)
  function handleValue(value) {
    if (justCalculated && !isOperator(value)) {
      // Start new calculation
      currentExpression = value;
      justCalculated = false;
    } else if (justCalculated && isOperator(value)) {
      // Continue with result
      currentExpression = currentResult + value;
      justCalculated = false;
    } else {
      // Prevent multiple operators in a row
      if (isOperator(value) && isOperator(currentExpression.slice(-1))) {
        currentExpression = currentExpression.slice(0, -1) + value;
      } else {
        currentExpression += value;
      }
    }

    // Calculate live result
    if (currentExpression && !isOperator(currentExpression.slice(-1))) {
      try {
        currentResult = evaluateExpression(currentExpression).toString();
      } catch (e) {
        // Keep previous result if expression is incomplete
      }
    }

    updateDisplay();
  }

  // Check if character is an operator
  function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
  }

  // Safe expression evaluation
  function evaluateExpression(expr) {
    // Replace display operators with JS operators
    let jsExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');

    // Basic validation
    if (!/^[0-9+\-*/.%() ]+$/.test(jsExpr)) {
      throw new Error('Invalid expression');
    }

    // Evaluate using Function constructor (safer than eval)
    try {
      const result = new Function('return ' + jsExpr)();
      if (!isFinite(result)) {
        throw new Error('Invalid result');
      }
      return Math.round(result * 1e10) / 1e10; // Round to 10 decimal places
    } catch (e) {
      throw new Error('Calculation error');
    }
  }

  // Clear history
  function clearHistory() {
    history = [];
    saveHistory();
    renderHistory();
  }

  // Toggle theme
  function toggleTheme() {
    document.documentElement.classList.toggle('theme-alt');
    localStorage.setItem('calculator_theme', 
      document.documentElement.classList.contains('theme-alt') ? 'alt' : 'default'
    );
  }

  // Keyboard support
  function handleKeyboard(e) {
    const key = e.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
      handleValue(key);
      e.preventDefault();
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
      handleValue(key);
      e.preventDefault();
    } else if (key === 'Enter' || key === '=') {
      handleAction('equals');
      e.preventDefault();
    } else if (key === 'Escape') {
      handleAction('clear');
      e.preventDefault();
    } else if (key === 'Backspace') {
      handleAction('backspace');
      e.preventDefault();
    }
  }

  // Initialize
  function init() {
    loadHistory();
    updateDisplay();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('calculator_theme');
    if (savedTheme === 'alt') {
      document.documentElement.classList.add('theme-alt');
    }

    // Event listeners
    document.querySelector('.buttons-grid').addEventListener('click', handleButtonClick);
    if (btnClearHistory) btnClearHistory.addEventListener('click', clearHistory);
    if (btnTheme) btnTheme.addEventListener('click', toggleTheme);
    document.addEventListener('keydown', handleKeyboard);
  }

  // Start the calculator
  init();

  // Expose for debugging
  window.__calculator = {
    get expression() { return currentExpression; },
    get result() { return currentResult; },
    get history() { return history; },
    clear: () => handleAction('clear'),
    calculate: () => handleAction('equals')
  };
})();
