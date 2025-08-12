(() => {
  // DOM Elements
  const inputJwt = document.getElementById('input-jwt');
  const btnParse = document.getElementById('btn-parse');
  const btnPaste = document.getElementById('btn-paste');
  const btnCopy = document.getElementById('btn-copy');
  const btnClear = document.getElementById('btn-clear');
  const btnTheme = document.getElementById('btn-theme');
  const inputChars = document.getElementById('input-chars');
  const tokenStatus = document.getElementById('token-status');
  const headerOutput = document.getElementById('header-output');
  const payloadOutput = document.getElementById('payload-output');
  const signatureAlg = document.getElementById('signature-alg');
  const signatureValue = document.getElementById('signature-value');
  const signatureVerify = document.getElementById('signature-verify');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  // State
  let currentJwt = null;
  let parsedJwt = null;

  // Initialize
  function init() {
    loadSettings();
    bindEvents();
    updateInputInfo();
    
    // Sample JWT for demo
    const sampleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    inputJwt.value = sampleJwt;
    parseJwt();
  }

  // Event Listeners
  function bindEvents() {
    inputJwt.addEventListener('input', handleInput);
    btnParse.addEventListener('click', parseJwt);
    btnPaste.addEventListener('click', pasteJwt);
    btnCopy.addEventListener('click', copyParsedJwt);
    btnClear.addEventListener('click', clearAll);
    btnTheme.addEventListener('click', toggleTheme);
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
    });
  }

  // Handle input changes
  function handleInput() {
    updateInputInfo();
    if (inputJwt.value.trim()) {
      parseJwt();
    } else {
      clearOutput();
    }
  }

  // Parse JWT token
  function parseJwt() {
    const token = inputJwt.value.trim();
    if (!token) {
      showNotification('Please enter a JWT token', 'warning');
      return;
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format - must have 3 parts separated by dots');
      }

      // Decode header
      const header = JSON.parse(base64UrlDecode(parts[0]));
      
      // Decode payload
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      
      // Get signature
      const signature = parts[2];

      currentJwt = token;
      parsedJwt = { header, payload, signature };

      // Display results
      displayHeader(header);
      displayPayload(payload);
      displaySignature(header, signature);

      tokenStatus.textContent = 'Valid JWT';
      tokenStatus.className = 'status-valid';
      showNotification('JWT parsed successfully!', 'success');

    } catch (error) {
      clearOutput();
      tokenStatus.textContent = `Invalid: ${error.message}`;
      tokenStatus.className = 'status-error';
      showNotification('Invalid JWT format', 'error');
    }
  }

  // Base64 URL decode
  function base64UrlDecode(str) {
    // Add padding if needed
    str += '='.repeat((4 - str.length % 4) % 4);
    // Replace URL-safe characters
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    // Decode
    return decodeURIComponent(escape(atob(str)));
  }

  // Display header
  function displayHeader(header) {
    const formatted = JSON.stringify(header, null, 2);
    headerOutput.innerHTML = highlightJson(formatted);
  }

  // Display payload
  function displayPayload(payload) {
    const formatted = JSON.stringify(payload, null, 2);
    payloadOutput.innerHTML = highlightJson(formatted);
  }

  // Display signature info
  function displaySignature(header, signature) {
    signatureAlg.textContent = header.alg || 'Unknown';
    signatureValue.textContent = signature;
    
    if (header.alg === 'none') {
      signatureVerify.textContent = 'No signature (alg: none)';
      signatureVerify.className = 'status-warning';
    } else {
      signatureVerify.textContent = 'Cannot verify without secret key';
      signatureVerify.className = 'status-warning';
    }
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

  // Switch tabs
  function switchTab(tabName) {
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
  }

  // Paste JWT from clipboard
  async function pasteJwt() {
    try {
      const text = await navigator.clipboard.readText();
      inputJwt.value = text;
      handleInput();
      showNotification('JWT pasted from clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to paste from clipboard', 'error');
    }
  }

  // Copy parsed JWT
  async function copyParsedJwt() {
    if (!parsedJwt) {
      showNotification('No parsed JWT to copy', 'warning');
      return;
    }

    const output = {
      header: parsedJwt.header,
      payload: parsedJwt.payload,
      signature: parsedJwt.signature
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(output, null, 2));
      showNotification('Parsed JWT copied to clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to copy', 'error');
    }
  }

  // Clear all
  function clearAll() {
    inputJwt.value = '';
    clearOutput();
    updateInputInfo();
    showNotification('Cleared all content', 'success');
  }

  // Clear output
  function clearOutput() {
    headerOutput.textContent = '';
    payloadOutput.textContent = '';
    signatureAlg.textContent = '-';
    signatureValue.textContent = '-';
    signatureVerify.textContent = 'Cannot verify without secret';
    signatureVerify.className = 'status-warning';
    tokenStatus.textContent = 'Ready to parse';
    tokenStatus.className = 'status-ready';
    currentJwt = null;
    parsedJwt = null;
  }

  // Update input info
  function updateInputInfo() {
    const text = inputJwt.value;
    const chars = text.length;
    inputChars.textContent = `${chars} characters`;
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
      theme: document.documentElement.classList.contains('theme-alt') ? 'alt' : 'default'
    };
    localStorage.setItem('jwt_parser_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('jwt_parser_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
    } catch (e) {}
  }

  // Initialize app
  init();

  // Expose for debugging
  window.__jwtParser = {
    get currentJwt() { return currentJwt; },
    get parsedJwt() { return parsedJwt; },
    parseJwt,
    base64UrlDecode
  };
})();