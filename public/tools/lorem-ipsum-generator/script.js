(() => {
  // DOM Elements
  const typeSelect = document.getElementById('type-select');
  const amountInput = document.getElementById('amount-input');
  const startWithLorem = document.getElementById('start-with-lorem');
  const htmlFormat = document.getElementById('html-format');
  const btnGenerate = document.getElementById('btn-generate');
  const btnCopy = document.getElementById('btn-copy');
  const btnDownload = document.getElementById('btn-download');
  const btnClear = document.getElementById('btn-clear');
  const btnTheme = document.getElementById('btn-theme');
  const btnHistory = document.getElementById('btn-history');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const outputText = document.getElementById('output-text');
  const outputStats = document.getElementById('output-stats');
  const generationTime = document.getElementById('generation-time');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');

  // Lorem ipsum words
  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
    'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
    'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'sunt', 'explicabo',
    'nemo', 'ipsam', 'voluptatem', 'quia', 'voluptas', 'aspernatur', 'aut',
    'odit', 'fugit', 'sed', 'quia', 'consequuntur', 'magni', 'dolores', 'ratione',
    'sequi', 'nesciunt', 'neque', 'porro', 'quisquam', 'dolorem', 'adipisci',
    'numquam', 'eius', 'modi', 'tempora', 'incidunt', 'magnam', 'quaerat'
  ];

  // State
  let history = [];

  // Initialize
  function init() {
    loadSettings();
    loadHistory();
    bindEvents();
    generateText();
  }

  // Event Listeners
  function bindEvents() {
    btnGenerate.addEventListener('click', generateText);
    btnCopy.addEventListener('click', copyText);
    btnDownload.addEventListener('click', downloadText);
    btnClear.addEventListener('click', clearOutput);
    btnTheme.addEventListener('click', toggleTheme);
    btnHistory.addEventListener('click', showHistory);
    btnClearHistory.addEventListener('click', clearHistory);
    
    // Auto-generate on option change
    typeSelect.addEventListener('change', generateText);
    amountInput.addEventListener('change', generateText);
    startWithLorem.addEventListener('change', generateText);
    htmlFormat.addEventListener('change', generateText);
  }

  // Generate lorem ipsum text
  function generateText() {
    const startTime = performance.now();
    const type = typeSelect.value;
    const amount = parseInt(amountInput.value) || 1;
    const useLoremStart = startWithLorem.checked;
    const useHtml = htmlFormat.checked;

    let result = '';

    switch (type) {
      case 'words':
        result = generateWords(amount, useLoremStart);
        break;
      case 'sentences':
        result = generateSentences(amount, useLoremStart);
        break;
      case 'paragraphs':
        result = generateParagraphs(amount, useLoremStart);
        break;
      case 'lists':
        result = generateLists(amount, useLoremStart);
        break;
    }

    if (useHtml && type !== 'lists') {
      result = formatAsHtml(result, type);
    }

    outputText.value = result;
    updateStats(result);
    
    const endTime = performance.now();
    generationTime.textContent = `Generated in ${(endTime - startTime).toFixed(1)}ms`;

    // Add to history
    addToHistory(type, amount, result);
    
    showNotification('Text generated!', 'success');
  }

  // Generate words
  function generateWords(count, useLoremStart) {
    const words = [];
    
    if (useLoremStart && count >= 2) {
      words.push('Lorem', 'ipsum');
      count -= 2;
    }
    
    for (let i = 0; i < count; i++) {
      words.push(getRandomWord());
    }
    
    return words.join(' ');
  }

  // Generate sentences
  function generateSentences(count, useLoremStart) {
    const sentences = [];
    
    for (let i = 0; i < count; i++) {
      const wordCount = Math.floor(Math.random() * 10) + 8; // 8-17 words per sentence
      let sentence;
      
      if (i === 0 && useLoremStart) {
        sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
        for (let j = 0; j < wordCount - 8; j++) {
          sentence += ' ' + getRandomWord();
        }
      } else {
        const words = [];
        for (let j = 0; j < wordCount; j++) {
          words.push(getRandomWord());
        }
        sentence = words.join(' ');
      }
      
      sentence = capitalizeFirst(sentence) + '.';
      sentences.push(sentence);
    }
    
    return sentences.join(' ');
  }

  // Generate paragraphs
  function generateParagraphs(count, useLoremStart) {
    const paragraphs = [];
    
    for (let i = 0; i < count; i++) {
      const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences per paragraph
      const sentences = [];
      
      for (let j = 0; j < sentenceCount; j++) {
        const wordCount = Math.floor(Math.random() * 10) + 8;
        let sentence;
        
        if (i === 0 && j === 0 && useLoremStart) {
          sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
          for (let k = 0; k < wordCount - 8; k++) {
            sentence += ' ' + getRandomWord();
          }
        } else {
          const words = [];
          for (let k = 0; k < wordCount; k++) {
            words.push(getRandomWord());
          }
          sentence = words.join(' ');
        }
        
        sentence = capitalizeFirst(sentence) + '.';
        sentences.push(sentence);
      }
      
      paragraphs.push(sentences.join(' '));
    }
    
    return paragraphs.join('\n\n');
  }

  // Generate lists
  function generateLists(count, useLoremStart) {
    const lists = [];
    
    for (let i = 0; i < count; i++) {
      const itemCount = Math.floor(Math.random() * 5) + 3; // 3-7 items per list
      const items = [];
      
      for (let j = 0; j < itemCount; j++) {
        const wordCount = Math.floor(Math.random() * 6) + 2; // 2-7 words per item
        let item;
        
        if (i === 0 && j === 0 && useLoremStart) {
          item = 'Lorem ipsum dolor sit';
        } else {
          const words = [];
          for (let k = 0; k < wordCount; k++) {
            words.push(getRandomWord());
          }
          item = words.join(' ');
        }
        
        item = capitalizeFirst(item);
        items.push(`• ${item}`);
      }
      
      lists.push(items.join('\n'));
    }
    
    return lists.join('\n\n');
  }

  // Format as HTML
  function formatAsHtml(text, type) {
    switch (type) {
      case 'words':
        return `<span>${text}</span>`;
      case 'sentences':
        return `<p>${text}</p>`;
      case 'paragraphs':
        return text.split('\n\n').map(p => `<p>${p}</p>`).join('\n');
      default:
        return text;
    }
  }

  // Get random word
  function getRandomWord() {
    return loremWords[Math.floor(Math.random() * loremWords.length)];
  }

  // Capitalize first letter
  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Update statistics
  function updateStats(text) {
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    outputStats.textContent = `${words} words, ${chars} characters`;
  }

  // Copy text
  async function copyText() {
    const text = outputText.value;
    if (!text.trim()) {
      showNotification('No text to copy', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showNotification('Text copied to clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to copy text', 'error');
    }
  }

  // Download text
  function downloadText() {
    const text = outputText.value;
    if (!text.trim()) {
      showNotification('No text to download', 'warning');
      return;
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `lorem-ipsum-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Text downloaded!', 'success');
  }

  // Clear output
  function clearOutput() {
    outputText.value = '';
    outputStats.textContent = '0 words, 0 characters';
    generationTime.textContent = 'Ready to generate';
    showNotification('Output cleared!', 'success');
  }

  // Add to history
  function addToHistory(type, amount, text) {
    history.unshift({
      type,
      amount,
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      fullText: text,
      timestamp: Date.now()
    });
    
    if (history.length > 50) {
      history = history.slice(0, 50);
    }
    
    saveHistory();
  }

  // Show history
  function showHistory() {
    if (history.length === 0) {
      showNotification('No history available', 'warning');
      return;
    }
    
    // Simple history display (could be enhanced with a modal)
    const historyText = history.map((item, index) => 
      `${index + 1}. ${item.type} (${item.amount}) - ${new Date(item.timestamp).toLocaleString()}\n${item.text}\n`
    ).join('\n');
    
    outputText.value = historyText;
    updateStats(historyText);
    showNotification('History loaded!', 'success');
  }

  // Clear history
  function clearHistory() {
    history = [];
    saveHistory();
    showNotification('History cleared!', 'success');
  }

  // Toggle theme
  function toggleTheme() {
    document.documentElement.classList.toggle('theme-alt');
    saveSettings();
  }

  // Show notification
  function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }

  // Save settings
  function saveSettings() {
    const settings = {
      theme: document.documentElement.classList.contains('theme-alt') ? 'alt' : 'default',
      type: typeSelect.value,
      amount: amountInput.value,
      startWithLorem: startWithLorem.checked,
      htmlFormat: htmlFormat.checked
    };
    localStorage.setItem('lorem_generator_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('lorem_generator_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
      
      if (settings.type) typeSelect.value = settings.type;
      if (settings.amount) amountInput.value = settings.amount;
      if (settings.startWithLorem !== undefined) startWithLorem.checked = settings.startWithLorem;
      if (settings.htmlFormat !== undefined) htmlFormat.checked = settings.htmlFormat;
    } catch (error) {
      console.warn('Failed to load settings');
    }
  }

  // Save history
  function saveHistory() {
    localStorage.setItem('lorem_generator_history', JSON.stringify(history));
  }

  // Load history
  function loadHistory() {
    try {
      history = JSON.parse(localStorage.getItem('lorem_generator_history') || '[]');
    } catch (error) {
      console.warn('Failed to load history');
      history = [];
    }
  }

  // Initialize app
  init();
})();