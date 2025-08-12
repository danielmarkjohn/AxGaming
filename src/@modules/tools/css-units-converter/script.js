(() => {
  // DOM Elements
  const inputValue = document.getElementById('input-value');
  const inputUnit = document.getElementById('input-unit');
  const resultsGrid = document.getElementById('results-grid');
  const baseFontSize = document.getElementById('base-font-size');
  const viewportWidth = document.getElementById('viewport-width');
  const viewportHeight = document.getElementById('viewport-height');
  const dpiInput = document.getElementById('dpi');
  const settingsPanel = document.querySelector('.settings-panel');
  const comparisonContainer = document.getElementById('comparison-container');
  const comparisonProperty = document.getElementById('comparison-property');
  const demoOriginal = document.getElementById('demo-original');
  const demoConverted = document.getElementById('demo-converted');
  const valueOriginal = document.getElementById('value-original');
  const valueConverted = document.getElementById('value-converted');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');

  // Buttons
  const btnTheme = document.getElementById('btn-theme');
  const btnSettings = document.getElementById('btn-settings');
  const btnClear = document.getElementById('btn-clear');
  const btnCopyInput = document.getElementById('btn-copy-input');
  const btnPaste = document.getElementById('btn-paste');
  const btnCopyAll = document.getElementById('btn-copy-all');
  const btnExport = document.getElementById('btn-export');
  const btnToggleComparison = document.getElementById('btn-toggle-comparison');
  const quickBtns = document.querySelectorAll('.quick-btn');

  // Unit definitions and conversion factors
  const unitDefinitions = {
    // Absolute units (all converted to pixels first)
    px: { type: 'absolute', name: 'Pixels', description: 'Screen pixels' },
    pt: { type: 'absolute', name: 'Points', description: '1/72 of an inch', toPx: (val) => val * 96 / 72 },
    pc: { type: 'absolute', name: 'Picas', description: '12 points', toPx: (val) => val * 96 / 6 },
    in: { type: 'absolute', name: 'Inches', description: 'Physical inches', toPx: (val, dpi = 96) => val * dpi },
    cm: { type: 'absolute', name: 'Centimeters', description: 'Physical centimeters', toPx: (val, dpi = 96) => val * dpi / 2.54 },
    mm: { type: 'absolute', name: 'Millimeters', description: 'Physical millimeters', toPx: (val, dpi = 96) => val * dpi / 25.4 },
    Q: { type: 'absolute', name: 'Quarter-millimeters', description: '1/4 of a millimeter', toPx: (val, dpi = 96) => val * dpi / 101.6 },
    
    // Relative units
    em: { type: 'relative', name: 'Em', description: 'Relative to element font-size' },
    rem: { type: 'relative', name: 'Root Em', description: 'Relative to root font-size' },
    ex: { type: 'relative', name: 'Ex', description: 'Height of lowercase x', toPx: (val, fontSize = 16) => val * fontSize * 0.5 },
    ch: { type: 'relative', name: 'Character', description: 'Width of "0" character', toPx: (val, fontSize = 16) => val * fontSize * 0.5 },
    lh: { type: 'relative', name: 'Line Height', description: 'Element line height', toPx: (val, fontSize = 16) => val * fontSize * 1.2 },
    rlh: { type: 'relative', name: 'Root Line Height', description: 'Root line height', toPx: (val, fontSize = 16) => val * fontSize * 1.2 },
    
    // Viewport units
    vw: { type: 'viewport', name: 'Viewport Width', description: '1% of viewport width' },
    vh: { type: 'viewport', name: 'Viewport Height', description: '1% of viewport height' },
    vmin: { type: 'viewport', name: 'Viewport Min', description: '1% of smaller viewport dimension' },
    vmax: { type: 'viewport', name: 'Viewport Max', description: '1% of larger viewport dimension' },
    vi: { type: 'viewport', name: 'Viewport Inline', description: '1% of viewport inline axis' },
    vb: { type: 'viewport', name: 'Viewport Block', description: '1% of viewport block axis' },
    
    // Container query units
    cqw: { type: 'container', name: 'Container Width', description: '1% of container width' },
    cqh: { type: 'container', name: 'Container Height', description: '1% of container height' },
    cqi: { type: 'container', name: 'Container Inline', description: '1% of container inline size' },
    cqb: { type: 'container', name: 'Container Block', description: '1% of container block size' },
    cqmin: { type: 'container', name: 'Container Min', description: '1% of smaller container dimension' },
    cqmax: { type: 'container', name: 'Container Max', description: '1% of larger container dimension' },
    
    // Percentage
    '%': { type: 'percentage', name: 'Percentage', description: 'Relative to parent element' }
  };

  // State
  let currentSettings = {
    baseFontSize: 16,
    viewportWidth: 1920,
    viewportHeight: 1080,
    dpi: 96,
    containerWidth: 800,
    containerHeight: 600
  };

  // Initialize
  function init() {
    loadSettings();
    bindEvents();
    convert();
  }

  // Event Listeners
  function bindEvents() {
    inputValue.addEventListener('input', convert);
    inputUnit.addEventListener('change', convert);
    
    baseFontSize.addEventListener('input', updateSettings);
    viewportWidth.addEventListener('input', updateSettings);
    viewportHeight.addEventListener('input', updateSettings);
    dpiInput.addEventListener('input', updateSettings);
    
    comparisonProperty.addEventListener('change', updateComparison);
    
    btnTheme.addEventListener('click', toggleTheme);
    btnSettings.addEventListener('click', toggleSettings);
    btnClear.addEventListener('click', clearAll);
    btnCopyInput.addEventListener('click', copyInput);
    btnPaste.addEventListener('click', pasteValue);
    btnCopyAll.addEventListener('click', copyAllResults);
    btnExport.addEventListener('click', exportResults);
    btnToggleComparison.addEventListener('click', toggleComparison);
    
    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        inputValue.value = btn.dataset.value;
        convert();
      });
    });
  }

  // Update settings
  function updateSettings() {
    currentSettings.baseFontSize = parseFloat(baseFontSize.value) || 16;
    currentSettings.viewportWidth = parseFloat(viewportWidth.value) || 1920;
    currentSettings.viewportHeight = parseFloat(viewportHeight.value) || 1080;
    currentSettings.dpi = parseFloat(dpiInput.value) || 96;
    
    convert();
    updateComparison();
    saveSettings();
  }

  // Convert units
  function convert() {
    const value = parseFloat(inputValue.value);
    const fromUnit = inputUnit.value;
    
    if (isNaN(value) || value === 0) {
      resultsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 40px;">Enter a value to see conversions</div>';
      return;
    }

    // Convert input to pixels first
    const pixelValue = convertToPixels(value, fromUnit);
    
    // Generate results for all units
    const results = [];
    Object.keys(unitDefinitions).forEach(unit => {
      if (unit !== fromUnit) {
        const convertedValue = convertFromPixels(pixelValue, unit);
        if (convertedValue !== null) {
          results.push({
            unit,
            value: convertedValue,
            definition: unitDefinitions[unit]
          });
        }
      }
    });

    displayResults(results);
    updateComparison();
  }

  // Convert any unit to pixels
  function convertToPixels(value, unit) {
    const def = unitDefinitions[unit];
    const settings = currentSettings;
    
    switch (unit) {
      case 'px': return value;
      case 'pt': return def.toPx(value);
      case 'pc': return def.toPx(value);
      case 'in': return def.toPx(value, settings.dpi);
      case 'cm': return def.toPx(value, settings.dpi);
      case 'mm': return def.toPx(value, settings.dpi);
      case 'Q': return def.toPx(value, settings.dpi);
      case 'em': return value * settings.baseFontSize;
      case 'rem': return value * settings.baseFontSize;
      case 'ex': return def.toPx(value, settings.baseFontSize);
      case 'ch': return def.toPx(value, settings.baseFontSize);
      case 'lh': return def.toPx(value, settings.baseFontSize);
      case 'rlh': return def.toPx(value, settings.baseFontSize);
      case 'vw': return value * settings.viewportWidth / 100;
      case 'vh': return value * settings.viewportHeight / 100;
      case 'vmin': return value * Math.min(settings.viewportWidth, settings.viewportHeight) / 100;
      case 'vmax': return value * Math.max(settings.viewportWidth, settings.viewportHeight) / 100;
      case 'vi': return value * settings.viewportWidth / 100; // Assuming horizontal writing mode
      case 'vb': return value * settings.viewportHeight / 100;
      case 'cqw': return value * settings.containerWidth / 100;
      case 'cqh': return value * settings.containerHeight / 100;
      case 'cqi': return value * settings.containerWidth / 100;
      case 'cqb': return value * settings.containerHeight / 100;
      case 'cqmin': return value * Math.min(settings.containerWidth, settings.containerHeight) / 100;
      case 'cqmax': return value * Math.max(settings.containerWidth, settings.containerHeight) / 100;
      case '%': return value * settings.baseFontSize / 100; // Assuming font-size context
      default: return value;
    }
  }

  // Convert pixels to any unit
  function convertFromPixels(pixels, unit) {
    const def = unitDefinitions[unit];
    const settings = currentSettings;
    
    switch (unit) {
      case 'px': return pixels;
      case 'pt': return pixels * 72 / 96;
      case 'pc': return pixels * 6 / 96;
      case 'in': return pixels / settings.dpi;
      case 'cm': return pixels * 2.54 / settings.dpi;
      case 'mm': return pixels * 25.4 / settings.dpi;
      case 'Q': return pixels * 101.6 / settings.dpi;
      case 'em': return pixels / settings.baseFontSize;
      case 'rem': return pixels / settings.baseFontSize;
      case 'ex': return pixels / (settings.baseFontSize * 0.5);
      case 'ch': return pixels / (settings.baseFontSize * 0.5);
      case 'lh': return pixels / (settings.baseFontSize * 1.2);
      case 'rlh': return pixels / (settings.baseFontSize * 1.2);
      case 'vw': return pixels * 100 / settings.viewportWidth;
      case 'vh': return pixels * 100 / settings.viewportHeight;
      case 'vmin': return pixels * 100 / Math.min(settings.viewportWidth, settings.viewportHeight);
      case 'vmax': return pixels * 100 / Math.max(settings.viewportWidth, settings.viewportHeight);
      case 'vi': return pixels * 100 / settings.viewportWidth;
      case 'vb': return pixels * 100 / settings.viewportHeight;
      case 'cqw': return pixels * 100 / settings.containerWidth;
      case 'cqh': return pixels * 100 / settings.containerHeight;
      case 'cqi': return pixels * 100 / settings.containerWidth;
      case 'cqb': return pixels * 100 / settings.containerHeight;
      case 'cqmin': return pixels * 100 / Math.min(settings.containerWidth, settings.containerHeight);
      case 'cqmax': return pixels * 100 / Math.max(settings.containerWidth, settings.containerHeight);
      case '%': return pixels * 100 / settings.baseFontSize;
      default: return null;
    }
  }

  // Display conversion results
  function displayResults(results) {
    const html = results.map(result => {
      const formattedValue = formatValue(result.value);
      return `
        <div class="result-item" data-unit="${result.unit}" data-value="${formattedValue}">
          <button class="result-copy" onclick="copyResult('${formattedValue}${result.unit}')" title="Copy">📋</button>
          <div class="result-unit">${result.definition.name}</div>
          <div class="result-value">${formattedValue}${result.unit}</div>
          <div class="result-description">${result.definition.description}</div>
        </div>
      `;
    }).join('');
    
    resultsGrid.innerHTML = html;
  }

  // Format numeric values
  function formatValue(value) {
    if (Math.abs(value) >= 1000) {
      return value.toFixed(1);
    } else if (Math.abs(value) >= 100) {
      return value.toFixed(2);
    } else if (Math.abs(value) >= 10) {
      return value.toFixed(3);
    } else {
      return value.toFixed(4);
    }
  }

  // Update visual comparison
  function updateComparison() {
    const value = parseFloat(inputValue.value);
    const fromUnit = inputUnit.value;
    const property = comparisonProperty.value;
    
    if (isNaN(value)) return;

    const originalValue = `${value}${fromUnit}`;
    const pixelValue = convertToPixels(value, fromUnit);
    const remValue = convertFromPixels(pixelValue, 'rem');
    const convertedValue = `${formatValue(remValue)}rem`;

    valueOriginal.textContent = originalValue;
    valueConverted.textContent = convertedValue;

    // Apply styles to demo elements
    if (property === 'font-size') {
      demoOriginal.style.fontSize = originalValue;
      demoConverted.style.fontSize = convertedValue;
      demoOriginal.style.width = 'auto';
      demoConverted.style.width = 'auto';
      demoOriginal.style.height = 'auto';
      demoConverted.style.height = 'auto';
    } else if (property === 'width') {
      demoOriginal.style.width = originalValue;
      demoConverted.style.width = convertedValue;
      demoOriginal.style.fontSize = '14px';
      demoConverted.style.fontSize = '14px';
    } else if (property === 'height') {
      demoOriginal.style.height = originalValue;
      demoConverted.style.height = convertedValue;
      demoOriginal.style.fontSize = '14px';
      demoConverted.style.fontSize = '14px';
    } else if (property === 'margin') {
      demoOriginal.style.margin = originalValue;
      demoConverted.style.margin = convertedValue;
    } else if (property === 'padding') {
      demoOriginal.style.padding = originalValue;
      demoConverted.style.padding = convertedValue;
    } else if (property === 'border-width') {
      demoOriginal.style.borderWidth = originalValue;
      demoConverted.style.borderWidth = convertedValue;
      demoOriginal.style.borderStyle = 'solid';
      demoConverted.style.borderStyle = 'solid';
      demoOriginal.style.borderColor = 'var(--accent)';
      demoConverted.style.borderColor = 'var(--accent)';
    }
  }

  // Copy single result
  window.copyResult = async function(value) {
    try {
      await navigator.clipboard.writeText(value);
      showNotification(`Copied: ${value}`, 'success');
    } catch (error) {
      showNotification('Failed to copy', 'error');
    }
  };

  // Copy input value
  async function copyInput() {
    const value = inputValue.value;
    const unit = inputUnit.value;
    const fullValue = `${value}${unit}`;
    
    try {
      await navigator.clipboard.writeText(fullValue);
      showNotification(`Copied: ${fullValue}`, 'success');
    } catch (error) {
      showNotification('Failed to copy', 'error');
    }
  }

  // Paste value
  async function pasteValue() {
    try {
      const text = await navigator.clipboard.readText();
      const match = text.match(/^([\d.]+)([a-z%]+)?$/i);
      
      if (match) {
        inputValue.value = match[1];
        if (match[2] && unitDefinitions[match[2]]) {
          inputUnit.value = match[2];
        }
        convert();
        showNotification('Value pasted!', 'success');
      } else {
        showNotification('Invalid format', 'error');
      }
    } catch (error) {
      showNotification('Failed to paste', 'error');
    }
  }

  // Copy all results
  async function copyAllResults() {
    const results = Array.from(resultsGrid.querySelectorAll('.result-item')).map(item => {
      const unit = item.dataset.unit;
      const value = item.dataset.value;
      return `${value}${unit}`;
    });
    
    const text = results.join('\n');
    
    try {
      await navigator.clipboard.writeText(text);
      showNotification('All results copied!', 'success');
    } catch (error) {
      showNotification('Failed to copy results', 'error');
    }
  }

  // Export results
  function exportResults() {
    const value = parseFloat(inputValue.value);
    const fromUnit = inputUnit.value;
    
    if (isNaN(value)) {
      showNotification('No data to export', 'warning');
      return;
    }

    const results = Array.from(resultsGrid.querySelectorAll('.result-item')).map(item => {
      const unit = item.dataset.unit;
      const convertedValue = item.dataset.value;
      const definition = unitDefinitions[unit];
      
      return {
        unit,
        value: convertedValue,
        name: definition.name,
        description: definition.description,
        type: definition.type
      };
    });

    const exportData = {
      input: { value, unit: fromUnit },
      settings: currentSettings,
      conversions: results,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `css-units-conversion-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Results exported!', 'success');
  }

  // Toggle settings panel
  function toggleSettings() {
    settingsPanel.classList.toggle('hidden');
  }

  // Toggle comparison
  function toggleComparison() {
    comparisonContainer.classList.toggle('hidden');
  }

  // Toggle theme
  function toggleTheme() {
    document.documentElement.classList.toggle('theme-alt');
    saveSettings();
  }

  // Clear all
  function clearAll() {
    inputValue.value = '';
    resultsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--muted); padding: 40px;">Enter a value to see conversions</div>';
    showNotification('Cleared!', 'success');
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
      ...currentSettings,
      theme: document.documentElement.classList.contains('theme-alt') ? 'alt' : 'default',
      inputValue: inputValue.value,
      inputUnit: inputUnit.value
    };
    localStorage.setItem('css_units_converter_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('css_units_converter_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
      
      if (settings.baseFontSize) {
        currentSettings.baseFontSize = settings.baseFontSize;
        baseFontSize.value = settings.baseFontSize;
      }
      
      if (settings.viewportWidth) {
        currentSettings.viewportWidth = settings.viewportWidth;
        viewportWidth.value = settings.viewportWidth;
      }
      
      if (settings.viewportHeight) {
        currentSettings.viewportHeight = settings.viewportHeight;
        viewportHeight.value = settings.viewportHeight;
      }
      
      if (settings.dpi) {
        currentSettings.dpi = settings.dpi;
        dpiInput.value = settings.dpi;
      }
      
      if (settings.inputValue) inputValue.value = settings.inputValue;
      if (settings.inputUnit) inputUnit.value = settings.inputUnit;
      
    } catch (error) {
      console.warn('Failed to load settings');
    }
  }

  // Initialize app
  init();
})();