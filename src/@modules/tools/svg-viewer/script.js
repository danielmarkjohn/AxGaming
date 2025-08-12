(() => {
  // DOM Elements
  const svgInput = document.getElementById('svg-input');
  const previewContainer = document.getElementById('preview-container');
  const btnFormat = document.getElementById('btn-format');
  const btnValidate = document.getElementById('btn-validate');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnResetZoom = document.getElementById('btn-reset-zoom');
  const btnToggleGrid = document.getElementById('btn-toggle-grid');
  const btnTheme = document.getElementById('btn-theme');
  const btnDownload = document.getElementById('btn-download');
  const btnClear = document.getElementById('btn-clear');
  const inputStats = document.getElementById('input-stats');
  const validationStatus = document.getElementById('validation-status');
  const previewDimensions = document.getElementById('preview-dimensions');
  const zoomLevel = document.getElementById('zoom-level');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');

  // State
  let currentZoom = 1;
  let gridEnabled = false;
  let currentSvg = null;

  // Initialize
  function init() {
    loadSettings();
    bindEvents();
    updateStats();
  }

  // Event Listeners
  function bindEvents() {
    svgInput.addEventListener('input', handleInput);
    btnFormat.addEventListener('click', formatSvg);
    btnValidate.addEventListener('click', validateSvg);
    btnCopyCode.addEventListener('click', copyCode);
    btnZoomIn.addEventListener('click', zoomIn);
    btnZoomOut.addEventListener('click', zoomOut);
    btnResetZoom.addEventListener('click', resetZoom);
    btnToggleGrid.addEventListener('click', toggleGrid);
    btnTheme.addEventListener('click', toggleTheme);
    btnDownload.addEventListener('click', downloadSvg);
    btnClear.addEventListener('click', clearAll);
  }

  // Handle input changes
  function handleInput() {
    updateStats();
    updatePreview();
  }

  // Update input statistics
  function updateStats() {
    const text = svgInput.value;
    const chars = text.length;
    inputStats.textContent = `${chars} characters`;
  }

  // Update SVG preview
  function updatePreview() {
    const svgCode = svgInput.value.trim();
    
    if (!svgCode) {
      showPlaceholder();
      return;
    }

    try {
      // Basic SVG validation
      if (!svgCode.includes('<svg')) {
        throw new Error('No SVG element found');
      }

      // Create preview
      previewContainer.innerHTML = svgCode;
      const svgElement = previewContainer.querySelector('svg');
      
      if (svgElement) {
        currentSvg = svgElement;
        svgElement.classList.add('svg-preview');
        updatePreviewInfo(svgElement);
        setValidationStatus('Valid SVG', 'valid');
      } else {
        throw new Error('Invalid SVG structure');
      }
    } catch (error) {
      showError(error.message);
      setValidationStatus(error.message, 'error');
    }
  }

  // Show placeholder
  function showPlaceholder() {
    previewContainer.innerHTML = `
      <div class="preview-placeholder">
        <div class="placeholder-icon">🖼️</div>
        <p>Enter SVG code to see preview</p>
      </div>
    `;
    previewDimensions.textContent = 'No SVG loaded';
    setValidationStatus('Ready', 'valid');
  }

  // Show error in preview
  function showError(message) {
    previewContainer.innerHTML = `
      <div class="preview-placeholder">
        <div class="placeholder-icon">❌</div>
        <p>Error: ${message}</p>
      </div>
    `;
    previewDimensions.textContent = 'Invalid SVG';
  }

  // Update preview info
  function updatePreviewInfo(svgElement) {
    const width = svgElement.getAttribute('width') || svgElement.viewBox?.baseVal?.width || 'auto';
    const height = svgElement.getAttribute('height') || svgElement.viewBox?.baseVal?.height || 'auto';
    previewDimensions.textContent = `${width} × ${height}`;
  }

  // Set validation status
  function setValidationStatus(message, type) {
    validationStatus.textContent = message;
    validationStatus.className = `status-${type}`;
  }

  // Format SVG code
  function formatSvg() {
    const code = svgInput.value.trim();
    if (!code) {
      showNotification('No SVG code to format', 'warning');
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'image/svg+xml');
      const svgElement = doc.querySelector('svg');
      
      if (!svgElement) {
        throw new Error('Invalid SVG');
      }

      const formatted = formatXml(svgElement.outerHTML);
      svgInput.value = formatted;
      updatePreview();
      showNotification('SVG formatted successfully!', 'success');
    } catch (error) {
      showNotification('Failed to format SVG', 'error');
    }
  }

  // Simple XML formatter
  function formatXml(xml) {
    const formatted = xml.replace(/></g, '>\n<');
    const lines = formatted.split('\n');
    let indent = 0;
    
    return lines.map(line => {
      if (line.includes('</') && !line.includes('</'+ line.split('</')[1].split('>')[0] + '>')) {
        indent--;
      }
      const indented = '  '.repeat(Math.max(0, indent)) + line.trim();
      if (line.includes('<') && !line.includes('</') && !line.includes('/>')) {
        indent++;
      }
      return indented;
    }).join('\n');
  }

  // Validate SVG
  function validateSvg() {
    const code = svgInput.value.trim();
    if (!code) {
      showNotification('No SVG code to validate', 'warning');
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'image/svg+xml');
      const errors = doc.querySelectorAll('parsererror');
      
      if (errors.length > 0) {
        throw new Error('XML parsing error');
      }

      const svgElement = doc.querySelector('svg');
      if (!svgElement) {
        throw new Error('No SVG element found');
      }

      setValidationStatus('Valid SVG ✓', 'valid');
      showNotification('SVG is valid!', 'success');
    } catch (error) {
      setValidationStatus('Invalid SVG ✗', 'error');
      showNotification('SVG validation failed', 'error');
    }
  }

  // Copy SVG code
  async function copyCode() {
    const code = svgInput.value;
    if (!code.trim()) {
      showNotification('No code to copy', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      showNotification('SVG code copied!', 'success');
    } catch (error) {
      showNotification('Failed to copy code', 'error');
    }
  }

  // Zoom functions
  function zoomIn() {
    currentZoom = Math.min(currentZoom * 1.2, 5);
    updateZoom();
  }

  function zoomOut() {
    currentZoom = Math.max(currentZoom / 1.2, 0.1);
    updateZoom();
  }

  function resetZoom() {
    currentZoom = 1;
    updateZoom();
  }

  function updateZoom() {
    if (currentSvg) {
      currentSvg.style.transform = `scale(${currentZoom})`;
    }
    zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
  }

  // Toggle grid
  function toggleGrid() {
    gridEnabled = !gridEnabled;
    previewContainer.classList.toggle('grid-enabled', gridEnabled);
    btnToggleGrid.style.background = gridEnabled ? 'rgba(0,212,255,0.2)' : '';
  }

  // Download SVG
  function downloadSvg() {
    const code = svgInput.value.trim();
    if (!code) {
      showNotification('No SVG to download', 'warning');
      return;
    }

    const blob = new Blob([code], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `svg-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('SVG downloaded!', 'success');
  }

  // Clear all
  function clearAll() {
    svgInput.value = '';
    showPlaceholder();
    updateStats();
    resetZoom();
    showNotification('Cleared!', 'success');
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
      gridEnabled
    };
    localStorage.setItem('svg_viewer_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('svg_viewer_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
      
      if (settings.gridEnabled) {
        toggleGrid();
      }
    } catch (error) {
      console.warn('Failed to load settings');
    }
  }

  // Initialize app
  init();
})();