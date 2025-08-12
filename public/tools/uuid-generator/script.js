(() => {
  // DOM Elements
  const uuidOutput = document.getElementById('uuid-output');
  const btnGenerate = document.getElementById('btn-generate');
  const btnCopy = document.getElementById('btn-copy');
  const btnRegenerate = document.getElementById('btn-regenerate');
  const btnBulkGenerate = document.getElementById('btn-bulk-generate');
  const btnCopyAll = document.getElementById('btn-copy-all');
  const btnDownload = document.getElementById('btn-download');
  const btnClearResults = document.getElementById('btn-clear-results');
  const btnHistory = document.getElementById('btn-history');
  const btnClearHistory = document.getElementById('btn-clear-history');
  const btnTheme = document.getElementById('btn-theme');
  const versionSelect = document.getElementById('version-select');
  const formatSelect = document.getElementById('format-select');
  const quantityInput = document.getElementById('quantity-input');
  const resultsList = document.getElementById('results-list');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');

  // State
  let currentUuid = null;
  let generatedUuids = [];
  let history = [];

  // Initialize
  function init() {
    loadSettings();
    loadHistory();
    bindEvents();
    generateUuid();
  }

  // Event Listeners
  function bindEvents() {
    btnGenerate.addEventListener('click', generateUuid);
    btnCopy.addEventListener('click', copyCurrentUuid);
    btnRegenerate.addEventListener('click', generateUuid);
    btnBulkGenerate.addEventListener('click', generateBulkUuids);
    btnCopyAll.addEventListener('click', copyAllUuids);
    btnDownload.addEventListener('click', downloadUuids);
    btnClearResults.addEventListener('click', clearResults);
    btnHistory.addEventListener('click', showHistory);
    btnClearHistory.addEventListener('click', clearHistory);
    btnTheme.addEventListener('click', toggleTheme);
    versionSelect.addEventListener('change', generateUuid);
    formatSelect.addEventListener('change', updateCurrentUuidFormat);
  }

  // Generate UUID v4 (Random)
  function generateUuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Generate UUID v1 (Timestamp-based)
  function generateUuidV1() {
    const timestamp = Date.now();
    const random = Math.random().toString(16).substring(2, 15);
    const clockSeq = Math.random().toString(16).substring(2, 6);
    const node = Math.random().toString(16).substring(2, 14);
    
    const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0');
    const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0');
    const timeHigh = (((timestamp >> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0');
    
    return `${timeLow}-${timeMid}-${timeHigh}-${clockSeq}-${node}`;
  }

  // Generate UUID based on selected version
  function generateRawUuid() {
    const version = versionSelect.value;
    return version === '1' ? generateUuidV1() : generateUuidV4();
  }

  // Format UUID based on selected format
  function formatUuid(uuid) {
    const format = formatSelect.value;
    
    switch (format) {
      case 'compact':
        return uuid.replace(/-/g, '');
      case 'uppercase':
        return uuid.toUpperCase();
      case 'braces':
        return `{${uuid}}`;
      default:
        return uuid;
    }
  }

  // Generate new UUID
  function generateUuid() {
    const rawUuid = generateRawUuid();
    currentUuid = rawUuid;
    const formattedUuid = formatUuid(rawUuid);
    
    uuidOutput.textContent = formattedUuid;
    
    // Add to history
    history.unshift({
      uuid: rawUuid,
      formatted: formattedUuid,
      version: versionSelect.value,
      format: formatSelect.value,
      timestamp: Date.now()
    });
    
    // Keep history limited
    if (history.length > 100) {
      history = history.slice(0, 100);
    }
    
    saveHistory();
    showNotification('New UUID generated!', 'success');
  }

  // Update current UUID format
  function updateCurrentUuidFormat() {
    if (currentUuid) {
      const formattedUuid = formatUuid(currentUuid);
      uuidOutput.textContent = formattedUuid;
    }
  }

  // Generate bulk UUIDs
  function generateBulkUuids() {
    const quantity = Math.min(parseInt(quantityInput.value) || 1, 1000);
    const newUuids = [];
    
    for (let i = 0; i < quantity; i++) {
      const rawUuid = generateRawUuid();
      const formattedUuid = formatUuid(rawUuid);
      newUuids.push({
        raw: rawUuid,
        formatted: formattedUuid
      });
    }
    
    generatedUuids = [...newUuids, ...generatedUuids];
    renderResults();
    showNotification(`Generated ${quantity} UUIDs!`, 'success');
  }

  // Copy current UUID
  async function copyCurrentUuid() {
    const uuid = uuidOutput.textContent;
    if (uuid === 'Click "Generate" to create a UUID') {
      showNotification('Generate a UUID first', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(uuid);
      showNotification('UUID copied to clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to copy UUID', 'error');
    }
  }

  // Copy all UUIDs
  async function copyAllUuids() {
    if (generatedUuids.length === 0) {
      showNotification('No UUIDs to copy', 'warning');
      return;
    }

    const allUuids = generatedUuids.map(item => item.formatted).join('\n');
    
    try {
      await navigator.clipboard.writeText(allUuids);
      showNotification(`Copied ${generatedUuids.length} UUIDs!`, 'success');
    } catch (error) {
      showNotification('Failed to copy UUIDs', 'error');
    }
  }

  // Download UUIDs as file
  function downloadUuids() {
    if (generatedUuids.length === 0) {
      showNotification('No UUIDs to download', 'warning');
      return;
    }

    const content = generatedUuids.map(item => item.formatted).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`Downloaded ${generatedUuids.length} UUIDs!`, 'success');
  }

  // Clear results
  function clearResults() {
    generatedUuids = [];
    renderResults();
    showNotification('Results cleared!', 'success');
  }

  // Show history
  function showHistory() {
    if (history.length === 0) {
      showNotification('No history available', 'warning');
      return;
    }

    generatedUuids = history.map(item => ({
      raw: item.uuid,
      formatted: item.formatted
    }));
    
    renderResults();
    showNotification(`Loaded ${history.length} UUIDs from history!`, 'success');
  }

  // Clear history
  function clearHistory() {
    history = [];
    saveHistory();
    showNotification('History cleared!', 'success');
  }

  // Render results list
  function renderResults() {
    if (generatedUuids.length === 0) {
      resultsList.innerHTML = '<div class="no-results">No UUIDs generated yet</div>';
      return;
    }

    const html = generatedUuids.map((item, index) => `
      <div class="uuid-item">
        <span class="uuid-text">${item.formatted}</span>
        <button class="uuid-copy" onclick="copyUuid('${item.formatted}', ${index})">📋</button>
      </div>
    `).join('');

    resultsList.innerHTML = html;
  }

  // Copy individual UUID
  window.copyUuid = async function(uuid, index) {
    try {
      await navigator.clipboard.writeText(uuid);
      showNotification('UUID copied!', 'success');
    } catch (error) {
      showNotification('Failed to copy', 'error');
    }
  };

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
      version: versionSelect.value,
      format: formatSelect.value
    };
    localStorage.setItem('uuid_generator_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('uuid_generator_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
      
      if (settings.version) {
        versionSelect.value = settings.version;
      }
      
      if (settings.format) {
        formatSelect.value = settings.format;
      }
    } catch (e) {}
  }

  // Save history
  function saveHistory() {
    try {
      localStorage.setItem('uuid_generator_history', JSON.stringify(history));
    } catch (e) {}
  }

  // Load history
  function loadHistory() {
    try {
      history = JSON.parse(localStorage.getItem('uuid_generator_history') || '[]');
    } catch (e) {
      history = [];
    }
  }

  // Initialize app
  init();

  // Expose for debugging
  window.__uuidGenerator = {
    get currentUuid() { return currentUuid; },
    get generatedUuids() { return generatedUuids; },
    get history() { return history; },
    generateV4: generateUuidV4,
    generateV1: generateUuidV1
  };
})();