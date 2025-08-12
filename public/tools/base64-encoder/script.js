(() => {
  // DOM Elements
  const inputText = document.getElementById('input-text');
  const outputText = document.getElementById('output-text');
  const modeBtns = document.querySelectorAll('.mode-btn');
  const btnPaste = document.getElementById('btn-paste');
  const btnFile = document.getElementById('btn-file');
  const btnCopy = document.getElementById('btn-copy');
  const btnDownload = document.getElementById('btn-download');
  const btnSwap = document.getElementById('btn-swap');
  const btnClear = document.getElementById('btn-clear');
  const btnTheme = document.getElementById('btn-theme');
  const fileInput = document.getElementById('file-input');
  const inputTitle = document.getElementById('input-title');
  const outputTitle = document.getElementById('output-title');
  const inputChars = document.getElementById('input-chars');
  const inputBytes = document.getElementById('input-bytes');
  const outputChars = document.getElementById('output-chars');
  const outputStatus = document.getElementById('output-status');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');

  // State
  let currentMode = 'encode';

  // Initialize
  function init() {
    loadSettings();
    bindEvents();
    updateInputInfo();
    setMode('encode');
  }

  // Event Listeners
  function bindEvents() {
    inputText.addEventListener('input', handleInput);
    modeBtns.forEach(btn => btn.addEventListener('click', (e) => setMode(e.target.dataset.mode)));
    btnPaste.addEventListener('click', pasteText);
    btnFile.addEventListener('click', () => fileInput.click());
    btnCopy.addEventListener('click', copyOutput);
    btnDownload.addEventListener('click', downloadOutput);
    btnSwap.addEventListener('click', swapInputOutput);
    btnClear.addEventListener('click', clearAll);
    btnTheme.addEventListener('click', toggleTheme);
    fileInput.addEventListener('change', handleFileSelect);
  }

  // Handle input changes
  function handleInput() {
    updateInputInfo();
    processText();
  }

  // Set mode (encode/decode)
  function setMode(mode) {
    currentMode = mode;
    
    modeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    if (mode === 'encode') {
      inputTitle.textContent = 'Text to Encode';
      outputTitle.textContent = 'Base64 Output';
      inputText.placeholder = 'Enter text to encode...';
      outputText.placeholder = 'Encoded result will appear here...';
    } else {
      inputTitle.textContent = 'Base64 to Decode';
      outputTitle.textContent = 'Decoded Output';
      inputText.placeholder = 'Enter Base64 to decode...';
      outputText.placeholder = 'Decoded result will appear here...';
    }

    processText();
  }

  // Process text based on current mode
  function processText() {
    const input = inputText.value;
    
    if (!input.trim()) {
      outputText.value = '';
      updateOutputInfo('', 'Ready');
      return;
    }

    try {
      let result;
      
      if (currentMode === 'encode') {
        result = btoa(unescape(encodeURIComponent(input)));
        updateOutputInfo(result, 'Encoded successfully', 'success');
      } else {
        result = decodeURIComponent(escape(atob(input)));
        updateOutputInfo(result, 'Decoded successfully', 'success');
      }
      
      outputText.value = result;
    } catch (error) {
      outputText.value = `Error: ${error.message}`;
      updateOutputInfo('', 'Invalid input', 'error');
    }
  }

  // Paste text from clipboard
  async function pasteText() {
    try {
      const text = await navigator.clipboard.readText();
      inputText.value = text;
      handleInput();
      showNotification('Text pasted from clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to paste from clipboard', 'error');
    }
  }

  // Handle file selection
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    if (currentMode === 'encode') {
      reader.onload = (e) => {
        const base64 = btoa(e.target.result);
        inputText.value = e.target.result;
        handleInput();
        showNotification(`File "${file.name}" loaded!`, 'success');
      };
      reader.readAsBinaryString(file);
    } else {
      reader.onload = (e) => {
        inputText.value = e.target.result;
        handleInput();
        showNotification(`File "${file.name}" loaded!`, 'success');
      };
      reader.readAsText(file);
    }
  }

  // Copy output to clipboard
  async function copyOutput() {
    const output = outputText.value;
    if (!output || output.startsWith('Error:')) {
      showNotification('Nothing to copy', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      showNotification('Copied to clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to copy', 'error');
    }
  }

  // Download output as file
  function downloadOutput() {
    const output = outputText.value;
    if (!output || output.startsWith('Error:')) {
      showNotification('Nothing to download', 'warning');
      return;
    }

    const filename = currentMode === 'encode' ? 'encoded.txt' : 'decoded.txt';
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`Downloaded as ${filename}`, 'success');
  }

  // Swap input and output
  function swapInputOutput() {
    const inputValue = inputText.value;
    const outputValue = outputText.value;
    
    if (!outputValue || outputValue.startsWith('Error:')) {
      showNotification('Nothing to swap', 'warning');
      return;
    }
    
    inputText.value = outputValue;
    setMode(currentMode === 'encode' ? 'decode' : 'encode');
    handleInput();
    showNotification('Input and output swapped!', 'success');
  }

  // Clear all content
  function clearAll() {
    inputText.value = '';
    outputText.value = '';
    updateInputInfo();
    updateOutputInfo('', 'Ready');
    showNotification('Cleared all content', 'success');
  }

  // Update input info
  function updateInputInfo() {
    const text = inputText.value;
    const chars = text.length;
    const bytes = new Blob([text]).size;
    
    inputChars.textContent = `${chars} characters`;
    inputBytes.textContent = `${bytes} bytes`;
  }

  // Update output info
  function updateOutputInfo(content, status, type = 'ready') {
    const chars = content.length;
    outputChars.textContent = `${chars} characters`;
    outputStatus.textContent = status;
    outputStatus.className = `status-${type}`;
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

  // Toggle theme
  function toggleTheme() {
    document.documentElement.classList.toggle('theme-alt');
    saveSettings();
  }

  // Save settings
  function saveSettings() {
    const settings = {
      theme: document.documentElement.classList.contains('theme-alt') ? 'alt' : 'default',
      mode: currentMode
    };
    localStorage.setItem('base64_encoder_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('base64_encoder_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
      
      if (settings.mode) {
        currentMode = settings.mode;
      }
    } catch (e) {}
  }

  // Initialize app
  init();

  // Expose for debugging
  window.__base64Encoder = {
    get mode() { return currentMode; },
    encode: (text) => btoa(unescape(encodeURIComponent(text))),
    decode: (base64) => decodeURIComponent(escape(atob(base64)))
  };
})();