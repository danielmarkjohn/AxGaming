(() => {
  // DOM Elements
  const inputJson = document.getElementById('input-json');
  const outputJson = document.getElementById('output-json');
  const btnFormat = document.getElementById('btn-format');
  const btnMinify = document.getElementById('btn-minify');
  const btnValidate = document.getElementById('btn-validate');
  const btnCopy = document.getElementById('btn-copy');
  const btnClear = document.getElementById('btn-clear');
  const btnTheme = document.getElementById('btn-theme');
  const indentSelect = document.getElementById('indent-select');
  const inputChars = document.getElementById('input-chars');
  const inputLines = document.getElementById('input-lines');
  const outputStatus = document.getElementById('output-status');
  const outputSize = document.getElementById('output-size');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');

  // State
  let currentJson = null;
  let isValid = false;

  // Initialize
  function init() {
    loadSettings();
    bindEvents();
    updateInputInfo();
    
    // Sample JSON
    const sampleJson = {
      "name": "JSON Formatter",
      "version": "1.0.0",
      "features": ["format", "minify", "validate"],
      "settings": {
        "theme": "dark",
        "indent": 4
      }
    };
    inputJson.value = JSON.stringify(sampleJson);
    formatJson();
  }

  // Event Listeners
  function bindEvents() {
    inputJson.addEventListener('input', handleInput);
    btnFormat.addEventListener('click', formatJson);
    btnMinify.addEventListener('click', minifyJson);
    btnValidate.addEventListener('click', validateJson);
    btnCopy.addEventListener('click', copyOutput);
    btnClear.addEventListener('click', clearAll);
    btnTheme.addEventListener('click', toggleTheme);
    indentSelect.addEventListener('change', formatJson);
  }

  // Handle input changes
  function handleInput() {
    updateInputInfo();
    if (inputJson.value.trim()) {
      validateJson();
    } else {
      clearOutput();
    }
  }

  // Format JSON
  function formatJson() {
    const input = inputJson.value.trim();
    if (!input) {
      showNotification('Please enter some JSON to format', 'warning');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      currentJson = parsed;
      isValid = true;
      
      const indent = indentSelect.value === 'tab' ? '\t' : parseInt(indentSelect.value);
      const formatted = JSON.stringify(parsed, null, indent);
      
      outputJson.innerHTML = highlightJson(formatted);
      updateOutputInfo(formatted, 'Valid JSON');
      showNotification('JSON formatted successfully!', 'success');
    } catch (error) {
      isValid = false;
      outputJson.textContent = `Error: ${error.message}`;
      updateOutputInfo('', 'Invalid JSON', 'error');
      showNotification('Invalid JSON format', 'error');
    }
  }

  // Minify JSON
  function minifyJson() {
    const input = inputJson.value.trim();
    if (!input) {
      showNotification('Please enter some JSON to minify', 'warning');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      currentJson = parsed;
      isValid = true;
      
      const minified = JSON.stringify(parsed);
      outputJson.textContent = minified;
      updateOutputInfo(minified, 'Valid JSON (Minified)');
      showNotification('JSON minified successfully!', 'success');
    } catch (error) {
      isValid = false;
      outputJson.textContent = `Error: ${error.message}`;
      updateOutputInfo('', 'Invalid JSON', 'error');
      showNotification('Invalid JSON format', 'error');
    }
  }

  // Validate JSON
  function validateJson() {
    const input = inputJson.value.trim();
    if (!input) {
      updateOutputInfo('', 'No input');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      currentJson = parsed;
      isValid = true;
      updateOutputInfo('', 'Valid JSON');
      showNotification('JSON is valid!', 'success');
    } catch (error) {
      isValid = false;
      updateOutputInfo('', `Invalid: ${error.message}`, 'error');
      showNotification('JSON is invalid', 'error');
    }
  }

  // Copy output
  function copyOutput() {
    const output = outputJson.textContent;
    if (!output || output.startsWith('Error:')) {
      showNotification('Nothing to copy', 'warning');
      return;
    }

    navigator.clipboard.writeText(output).then(() => {
      showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
      showNotification('Failed to copy', 'error');
    });
  }

  // Clear all
  function clearAll() {
    inputJson.value = '';
    clearOutput();
    updateInputInfo();
    showNotification('Cleared all content', 'success');
  }

  // Clear output
  function clearOutput() {
    outputJson.textContent = '';
    updateOutputInfo('', 'No output');
    currentJson = null;
    isValid = false;
  }

  // Update input info
  function updateInputInfo() {
    const text = inputJson.value;
    const chars = text.length;
    const lines = text ? text.split('\n').length : 0;
    
    inputChars.textContent = `${chars} characters`;
    inputLines.textContent = `${lines} lines`;
  }

  // Update output info
  function updateOutputInfo(content, status, type = 'valid') {
    const bytes = new Blob([content]).size;
    outputSize.textContent = `${bytes} bytes`;
    outputStatus.textContent = status;
    outputStatus.className = `status-${type}`;
  }

  // Highlight JSON syntax
  function highlightJson(json) {
    return json
      .replace(/(".*?")\s*:/g, '<span class="json-key">$1</span>:')
      .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
      .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
      .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
      .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>');
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
      indent: indentSelect.value
    };
    localStorage.setItem('json_formatter_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('json_formatter_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
      
      if (settings.indent) {
        indentSelect.value = settings.indent;
      }
    } catch (e) {}
  }

  // Initialize app
  init();

  // Expose for debugging
  window.__jsonFormatter = {
    get currentJson() { return currentJson; },
    get isValid() { return isValid; }
  };
})();