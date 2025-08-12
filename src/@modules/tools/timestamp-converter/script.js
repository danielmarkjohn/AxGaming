(() => {
  // DOM Elements
  const timestampInput = document.getElementById('timestamp-input');
  const timestampFormat = document.getElementById('timestamp-format');
  const btnConvertTimestamp = document.getElementById('btn-convert-timestamp');
  const localTime = document.getElementById('local-time');
  const utcTime = document.getElementById('utc-time');
  const isoTime = document.getElementById('iso-time');
  const relativeTime = document.getElementById('relative-time');
  
  const datetimeInput = document.getElementById('datetime-input');
  const dateStringInput = document.getElementById('date-string-input');
  const outputFormat = document.getElementById('output-format');
  const btnConvertDate = document.getElementById('btn-convert-date');
  const btnConvertString = document.getElementById('btn-convert-string');
  const outputSeconds = document.getElementById('output-seconds');
  const outputMilliseconds = document.getElementById('output-milliseconds');
  const outputMicroseconds = document.getElementById('output-microseconds');
  const outputNanoseconds = document.getElementById('output-nanoseconds');
  
  const batchInput = document.getElementById('batch-input');
  const batchResults = document.getElementById('batch-results');
  const btnBatchConvert = document.getElementById('btn-batch-convert');
  const btnBatchClear = document.getElementById('btn-batch-clear');
  const btnBatchExport = document.getElementById('btn-batch-export');
  
  const btnNow = document.getElementById('btn-now');
  const btnClear = document.getElementById('btn-clear');
  const btnTheme = document.getElementById('btn-theme');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');

  // State
  let batchData = [];

  // Initialize
  function init() {
    loadSettings();
    bindEvents();
    setCurrentTime();
  }

  // Event Listeners
  function bindEvents() {
    timestampInput.addEventListener('input', convertTimestamp);
    btnConvertTimestamp.addEventListener('click', convertTimestamp);
    timestampFormat.addEventListener('change', convertTimestamp);
    
    datetimeInput.addEventListener('change', convertDateTime);
    btnConvertDate.addEventListener('click', convertDateTime);
    dateStringInput.addEventListener('input', convertDateString);
    btnConvertString.addEventListener('click', convertDateString);
    outputFormat.addEventListener('change', updateDateOutputs);
    
    btnBatchConvert.addEventListener('click', convertBatch);
    btnBatchClear.addEventListener('click', clearBatch);
    btnBatchExport.addEventListener('click', exportBatch);
    
    btnNow.addEventListener('click', setCurrentTime);
    btnClear.addEventListener('click', clearAll);
    btnTheme.addEventListener('click', toggleTheme);
    
    // Click to copy functionality
    document.querySelectorAll('.value').forEach(el => {
      el.addEventListener('click', () => copyToClipboard(el.textContent));
    });
    
    // Example click handlers
    document.querySelectorAll('.example').forEach(el => {
      el.addEventListener('click', () => {
        if (el.textContent.match(/^\d+/)) {
          timestampInput.value = el.textContent.split(' ')[0];
          convertTimestamp();
        } else {
          dateStringInput.value = el.textContent;
          convertDateString();
        }
      });
    });
  }

  // Convert timestamp to date
  function convertTimestamp() {
    const input = timestampInput.value.trim();
    if (!input) {
      clearTimestampResults();
      return;
    }

    try {
      let timestamp = parseFloat(input);
      const format = timestampFormat.value;
      
      // Convert to milliseconds
      switch (format) {
        case 'seconds':
          timestamp *= 1000;
          break;
        case 'milliseconds':
          // Already in milliseconds
          break;
        case 'microseconds':
          timestamp /= 1000;
          break;
        case 'nanoseconds':
          timestamp /= 1000000;
          break;
      }
      
      const date = new Date(timestamp);
      
      if (isNaN(date.getTime())) {
        throw new Error('Invalid timestamp');
      }
      
      // Update results
      localTime.textContent = date.toLocaleString();
      utcTime.textContent = date.toUTCString();
      isoTime.textContent = date.toISOString();
      relativeTime.textContent = getRelativeTime(date);
      
    } catch (error) {
      clearTimestampResults();
      showNotification('Invalid timestamp format', 'error');
    }
  }

  // Convert datetime input to timestamp
  function convertDateTime() {
    const input = datetimeInput.value;
    if (!input) {
      clearDateResults();
      return;
    }

    try {
      const date = new Date(input);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      
      updateDateOutputs(date);
      showNotification('Date converted successfully!', 'success');
    } catch (error) {
      clearDateResults();
      showNotification('Invalid date format', 'error');
    }
  }

  // Convert date string to timestamp
  function convertDateString() {
    const input = dateStringInput.value.trim();
    if (!input) {
      clearDateResults();
      return;
    }

    try {
      let date = parseFlexibleDate(input);
      
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      
      updateDateOutputs(date);
      showNotification('Date string parsed successfully!', 'success');
    } catch (error) {
      clearDateResults();
      showNotification('Could not parse date string', 'error');
    }
  }

  // Parse flexible date formats
  function parseFlexibleDate(input) {
    const lower = input.toLowerCase().trim();
    
    // Handle relative dates
    if (lower === 'now') return new Date();
    if (lower === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
    if (lower === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      return yesterday;
    }
    if (lower === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow;
    }
    
    // Try various date formats
    const formats = [
      // ISO formats
      input,
      input.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6'),
      input.replace(/(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '$1-$2-$3T$4:$5:$6'),
      
      // US formats
      input.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2'),
      input.replace(/(\d{1,2})-(\d{1,2})-(\d{4})/, '$3-$1-$2'),
      
      // European formats
      input.replace(/(\d{1,2})\.(\d{1,2})\.(\d{4})/, '$3-$2-$1'),
      
      // Add time if missing
      input.includes(':') ? input : input + ' 00:00:00'
    ];
    
    for (const format of formats) {
      const date = new Date(format);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    
    // Last resort - try direct parsing
    return new Date(input);
  }

  // Update date outputs
  function updateDateOutputs(date = null) {
    if (!date && datetimeInput.value) {
      date = new Date(datetimeInput.value);
    }
    if (!date && dateStringInput.value) {
      date = parseFlexibleDate(dateStringInput.value);
    }
    if (!date || isNaN(date.getTime())) {
      clearDateResults();
      return;
    }
    
    const timestamp = date.getTime();
    
    outputSeconds.textContent = Math.floor(timestamp / 1000);
    outputMilliseconds.textContent = timestamp;
    outputMicroseconds.textContent = timestamp * 1000;
    outputNanoseconds.textContent = timestamp * 1000000;
  }

  // Get relative time
  function getRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (Math.abs(seconds) < 60) return `${seconds} seconds ago`;
    if (Math.abs(minutes) < 60) return `${minutes} minutes ago`;
    if (Math.abs(hours) < 24) return `${hours} hours ago`;
    if (Math.abs(days) < 30) return `${days} days ago`;
    if (Math.abs(months) < 12) return `${months} months ago`;
    return `${years} years ago`;
  }

  // Batch conversion
  function convertBatch() {
    const lines = batchInput.value.trim().split('\n').filter(line => line.trim());
    if (lines.length === 0) {
      showNotification('Please enter some data to convert', 'warning');
      return;
    }
    
    batchData = [];
    
    lines.forEach(line => {
      const input = line.trim();
      let result = '';
      
      try {
        // Try as timestamp first
        if (/^\d+(\.\d+)?$/.test(input)) {
          let timestamp = parseFloat(input);
          
          // Auto-detect format based on length
          if (input.length <= 10) timestamp *= 1000; // seconds
          else if (input.length <= 13) {} // milliseconds
          else if (input.length <= 16) timestamp /= 1000; // microseconds
          else timestamp /= 1000000; // nanoseconds
          
          const date = new Date(timestamp);
          result = date.toISOString();
        } else {
          // Try as date string
          const date = parseFlexibleDate(input);
          result = Math.floor(date.getTime() / 1000).toString();
        }
        
        batchData.push({ input, result, success: true });
      } catch (error) {
        batchData.push({ input, result: 'Invalid format', success: false });
      }
    });
    
    renderBatchResults();
    showNotification(`Converted ${batchData.filter(item => item.success).length} items`, 'success');
  }

  // Render batch results
  function renderBatchResults() {
    if (batchData.length === 0) {
      batchResults.innerHTML = '<div class="batch-empty">Enter timestamps or dates above and click "Convert All"</div>';
      return;
    }
    
    const html = batchData.map(item => `
      <div class="batch-item">
        <div class="batch-input-value">${item.input}</div>
        <div class="batch-output-value ${item.success ? '' : 'error'}">${item.result}</div>
      </div>
    `).join('');
    
    batchResults.innerHTML = html;
  }

  // Clear batch
  function clearBatch() {
    batchInput.value = '';
    batchData = [];
    renderBatchResults();
    showNotification('Batch data cleared', 'success');
  }

  // Export batch results
  function exportBatch() {
    if (batchData.length === 0) {
      showNotification('No data to export', 'warning');
      return;
    }
    
    const csv = 'Input,Output,Status\n' + 
      batchData.map(item => `"${item.input}","${item.result}","${item.success ? 'Success' : 'Error'}"`).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `timestamp-conversion-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Results exported to CSV!', 'success');
  }

  // Set current time
  function setCurrentTime() {
    const now = new Date();
    timestampInput.value = Math.floor(now.getTime() / 1000);
    datetimeInput.value = now.toISOString().slice(0, 16);
    convertTimestamp();
    convertDateTime();
    showNotification('Current time set!', 'success');
  }

  // Clear all
  function clearAll() {
    timestampInput.value = '';
    dateStringInput.value = '';
    datetimeInput.value = '';
    batchInput.value = '';
    clearTimestampResults();
    clearDateResults();
    clearBatch();
    showNotification('All data cleared!', 'success');
  }

  // Clear results
  function clearTimestampResults() {
    localTime.textContent = '-';
    utcTime.textContent = '-';
    isoTime.textContent = '-';
    relativeTime.textContent = '-';
  }

  function clearDateResults() {
    outputSeconds.textContent = '-';
    outputMilliseconds.textContent = '-';
    outputMicroseconds.textContent = '-';
    outputNanoseconds.textContent = '-';
  }

  // Copy to clipboard
  async function copyToClipboard(text) {
    if (text === '-') return;
    
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Copied to clipboard!', 'success');
    } catch (error) {
      showNotification('Failed to copy', 'error');
    }
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
      timestampFormat: timestampFormat.value,
      outputFormat: outputFormat.value
    };
    localStorage.setItem('timestamp_converter_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('timestamp_converter_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
      
      if (settings.timestampFormat) {
        timestampFormat.value = settings.timestampFormat;
      }
      
      if (settings.outputFormat) {
        outputFormat.value = settings.outputFormat;
      }
    } catch (e) {}
  }

  // Initialize app
  init();

  // Expose for debugging
  window.__timestampConverter = {
    convertTimestamp,
    convertDateTime,
    parseFlexibleDate,
    getRelativeTime
  };
})();