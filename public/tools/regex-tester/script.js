(() => {
  // DOM Elements
  const regexInput = document.getElementById('regex-input');
  const regexFlags = document.getElementById('regex-flags');
  const testInput = document.getElementById('test-input');
  const replaceInput = document.getElementById('replace-input');
  const replaceSection = document.querySelector('.replace-section');
  const explanationSection = document.querySelector('.explanation-section');
  const explanationContent = document.getElementById('explanation-content');
  
  // Buttons
  const btnTest = document.getElementById('btn-test');
  const btnReplace = document.getElementById('btn-replace');
  const btnValidate = document.getElementById('btn-validate');
  const btnExplain = document.getElementById('btn-explain');
  const btnCopyRegex = document.getElementById('btn-copy-regex');
  const btnCopyText = document.getElementById('btn-copy-text');
  const btnApplyReplace = document.getElementById('btn-apply-replace');
  const btnExportMatches = document.getElementById('btn-export-matches');
  const btnClearMatches = document.getElementById('btn-clear-matches');
  const btnCloseExplanation = document.getElementById('btn-close-explanation');
  const btnLibrary = document.getElementById('btn-library');
  const btnTheme = document.getElementById('btn-theme');
  const btnClear = document.getElementById('btn-clear');
  
  // Status elements
  const regexStatus = document.getElementById('regex-status');
  const matchCount = document.getElementById('match-count');
  const matchesList = document.getElementById('matches-list');
  const groupsList = document.getElementById('groups-list');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');
  
  // Flag checkboxes
  const flagCheckboxes = {
    g: document.getElementById('flag-g'),
    i: document.getElementById('flag-i'),
    m: document.getElementById('flag-m'),
    s: document.getElementById('flag-s'),
    u: document.getElementById('flag-u'),
    y: document.getElementById('flag-y')
  };

  // State
  let currentMatches = [];
  let currentRegex = null;

  // Common regex patterns library
  const regexLibrary = {
    'Email': '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    'URL': 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    'Phone (US)': '\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})',
    'IPv4 Address': '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
    'Date (MM/DD/YYYY)': '(0[1-9]|1[0-2])\\/(0[1-9]|[12][0-9]|3[01])\\/(19|20)\\d\\d',
    'Time (24h)': '([01]?[0-9]|2[0-3]):[0-5][0-9]',
    'Hex Color': '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})',
    'Credit Card': '\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\\b',
    'Social Security': '\\b\\d{3}-\\d{2}-\\d{4}\\b',
    'Username': '^[a-zA-Z0-9_]{3,16}$',
    'Strong Password': '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    'HTML Tag': '<\\/?[a-z][a-z0-9]*[^<>]*>',
    'Word Boundary': '\\b\\w+\\b',
    'Whitespace': '\\s+',
    'Digits Only': '^\\d+$'
  };

  // Initialize
  function init() {
    loadSettings();
    bindEvents();
    testRegex();
  }

  // Event Listeners
  function bindEvents() {
    regexInput.addEventListener('input', handleRegexChange);
    regexFlags.addEventListener('input', handleFlagsChange);
    testInput.addEventListener('input', testRegex);
    
    Object.values(flagCheckboxes).forEach(checkbox => {
      checkbox.addEventListener('change', updateFlagsFromCheckboxes);
    });
    
    btnTest.addEventListener('click', testRegex);
    btnReplace.addEventListener('click', toggleReplace);
    btnValidate.addEventListener('click', validateRegex);
    btnExplain.addEventListener('click', explainRegex);
    btnCopyRegex.addEventListener('click', copyRegex);
    btnCopyText.addEventListener('click', copyText);
    btnApplyReplace.addEventListener('click', applyReplace);
    btnExportMatches.addEventListener('click', exportMatches);
    btnClearMatches.addEventListener('click', clearMatches);
    btnCloseExplanation.addEventListener('click', closeExplanation);
    btnLibrary.addEventListener('click', showLibrary);
    btnTheme.addEventListener('click', toggleTheme);
    btnClear.addEventListener('click', clearAll);
  }

  // Handle regex input change
  function handleRegexChange() {
    testRegex();
    saveSettings();
  }

  // Handle flags input change
  function handleFlagsChange() {
    updateCheckboxesFromFlags();
    testRegex();
    saveSettings();
  }

  // Update flags input from checkboxes
  function updateFlagsFromCheckboxes() {
    const flags = Object.keys(flagCheckboxes)
      .filter(flag => flagCheckboxes[flag].checked)
      .join('');
    regexFlags.value = flags;
    testRegex();
    saveSettings();
  }

  // Update checkboxes from flags input
  function updateCheckboxesFromFlags() {
    const flags = regexFlags.value;
    Object.keys(flagCheckboxes).forEach(flag => {
      flagCheckboxes[flag].checked = flags.includes(flag);
    });
  }

  // Test regex against input text
  function testRegex() {
    const pattern = regexInput.value;
    const flags = regexFlags.value;
    const text = testInput.value;
    
    if (!pattern) {
      clearResults();
      setRegexStatus('Enter a regex pattern', 'error');
      return;
    }

    try {
      currentRegex = new RegExp(pattern, flags);
      setRegexStatus('Valid regex', 'valid');
      
      // Find all matches
      currentMatches = [];
      let match;
      
      if (flags.includes('g')) {
        while ((match = currentRegex.exec(text)) !== null) {
          currentMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups || {}
          });
          
          // Prevent infinite loop
          if (match.index === currentRegex.lastIndex) {
            currentRegex.lastIndex++;
          }
        }
      } else {
        match = currentRegex.exec(text);
        if (match) {
          currentMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
            namedGroups: match.groups || {}
          });
        }
      }
      
      updateMatchCount();
      displayMatches();
      displayGroups();
      
    } catch (error) {
      setRegexStatus(`Invalid regex: ${error.message}`, 'error');
      clearResults();
    }
  }

  // Set regex status
  function setRegexStatus(message, type) {
    regexStatus.textContent = message;
    regexStatus.className = `status-${type}`;
  }

  // Update match count
  function updateMatchCount() {
    matchCount.textContent = `${currentMatches.length} match${currentMatches.length !== 1 ? 'es' : ''}`;
  }

  // Display matches
  function displayMatches() {
    if (currentMatches.length === 0) {
      matchesList.innerHTML = '<div class="no-matches">No matches found</div>';
      return;
    }

    const html = currentMatches.map((match, index) => `
      <div class="match-item">
        <div class="match-text">"${escapeHtml(match.match)}"</div>
        <div class="match-info">
          Match ${index + 1} at position ${match.index}-${match.index + match.match.length}
        </div>
      </div>
    `).join('');

    matchesList.innerHTML = html;
  }

  // Display capture groups
  function displayGroups() {
    const allGroups = [];
    
    currentMatches.forEach((match, matchIndex) => {
      match.groups.forEach((group, groupIndex) => {
        if (group !== undefined) {
          allGroups.push({
            matchIndex: matchIndex + 1,
            groupIndex: groupIndex + 1,
            value: group
          });
        }
      });
      
      Object.entries(match.namedGroups).forEach(([name, value]) => {
        allGroups.push({
          matchIndex: matchIndex + 1,
          groupName: name,
          value: value
        });
      });
    });

    if (allGroups.length === 0) {
      groupsList.innerHTML = '<div class="no-groups">No capture groups</div>';
      return;
    }

    const html = allGroups.map(group => `
      <div class="group-item">
        <div class="match-text">"${escapeHtml(group.value)}"</div>
        <div class="group-info">
          Match ${group.matchIndex}, Group ${group.groupName || group.groupIndex}
        </div>
      </div>
    `).join('');

    groupsList.innerHTML = html;
  }

  // Clear results
  function clearResults() {
    currentMatches = [];
    matchCount.textContent = '0 matches';
    matchesList.innerHTML = '<div class="no-matches">No matches found</div>';
    groupsList.innerHTML = '<div class="no-groups">No capture groups</div>';
  }

  // Toggle replace mode
  function toggleReplace() {
    replaceSection.classList.toggle('hidden');
    btnReplace.textContent = replaceSection.classList.contains('hidden') ? '🔄 Replace' : '✕ Close';
  }

  // Apply replacement
  function applyReplace() {
    const pattern = regexInput.value;
    const flags = regexFlags.value;
    const text = testInput.value;
    const replacement = replaceInput.value;
    
    if (!pattern || !currentRegex) {
      showNotification('Invalid regex pattern', 'error');
      return;
    }

    try {
      const result = text.replace(currentRegex, replacement);
      testInput.value = result;
      testRegex();
      showNotification('Replacement applied!', 'success');
    } catch (error) {
      showNotification('Replacement failed', 'error');
    }
  }

  // Validate regex
  function validateRegex() {
    const pattern = regexInput.value;
    const flags = regexFlags.value;
    
    if (!pattern) {
      showNotification('Enter a regex pattern to validate', 'warning');
      return;
    }

    try {
      new RegExp(pattern, flags);
      showNotification('Regex is valid!', 'success');
      setRegexStatus('Valid regex ✓', 'valid');
    } catch (error) {
      showNotification(`Invalid regex: ${error.message}`, 'error');
      setRegexStatus(`Invalid: ${error.message}`, 'error');
    }
  }

  // Explain regex (simplified explanation)
  function explainRegex() {
    const pattern = regexInput.value;
    
    if (!pattern) {
      showNotification('Enter a regex pattern to explain', 'warning');
      return;
    }

    const explanation = generateExplanation(pattern);
    explanationContent.innerHTML = explanation;
    explanationSection.classList.remove('hidden');
  }

  // Generate regex explanation
  function generateExplanation(pattern) {
    const explanations = {
      '^': 'Start of string/line',
      '$': 'End of string/line',
      '.': 'Any character except newline',
      '*': 'Zero or more of the preceding',
      '+': 'One or more of the preceding',
      '?': 'Zero or one of the preceding',
      '\\d': 'Any digit (0-9)',
      '\\w': 'Any word character (a-z, A-Z, 0-9, _)',
      '\\s': 'Any whitespace character',
      '\\b': 'Word boundary',
      '\\D': 'Any non-digit',
      '\\W': 'Any non-word character',
      '\\S': 'Any non-whitespace character',
      '[': 'Character class start',
      ']': 'Character class end',
      '(': 'Capture group start',
      ')': 'Capture group end',
      '|': 'Alternation (OR)',
      '{': 'Quantifier start',
      '}': 'Quantifier end'
    };

    let explanation = '<div style="margin-bottom: 16px;"><strong>Pattern breakdown:</strong></div>';
    explanation += '<div style="font-family: Monaco, Consolas, monospace; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; margin-bottom: 16px;">';
    explanation += escapeHtml(pattern);
    explanation += '</div>';
    
    explanation += '<div><strong>Components found:</strong></div><ul style="margin-left: 20px; margin-top: 8px;">';
    
    Object.entries(explanations).forEach(([char, desc]) => {
      if (pattern.includes(char)) {
        explanation += `<li style="margin-bottom: 4px;"><code style="background: rgba(0,212,255,0.2); padding: 2px 4px; border-radius: 3px;">${escapeHtml(char)}</code> - ${desc}</li>`;
      }
    });
    
    explanation += '</ul>';
    
    return explanation;
  }

  // Close explanation
  function closeExplanation() {
    explanationSection.classList.add('hidden');
  }

  // Show pattern library
  function showLibrary() {
    let libraryHtml = '<div style="margin-bottom: 16px;"><strong>Common Regex Patterns:</strong></div>';
    
    Object.entries(regexLibrary).forEach(([name, pattern]) => {
      libraryHtml += `
        <div style="margin-bottom: 12px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 6px; cursor: pointer;" 
             onclick="loadPattern('${pattern.replace(/'/g, "\\'")}', '${name}')">
          <div style="font-weight: 600; margin-bottom: 4px;">${name}</div>
          <div style="font-family: Monaco, Consolas, monospace; font-size: 12px; color: var(--muted);">${escapeHtml(pattern)}</div>
        </div>
      `;
    });
    
    explanationContent.innerHTML = libraryHtml;
    explanationSection.classList.remove('hidden');
  }

  // Load pattern from library
  window.loadPattern = function(pattern, name) {
    regexInput.value = pattern;
    testRegex();
    closeExplanation();
    showNotification(`Loaded ${name} pattern!`, 'success');
  };

  // Copy regex
  async function copyRegex() {
    const pattern = regexInput.value;
    const flags = regexFlags.value;
    const fullRegex = `/${pattern}/${flags}`;
    
    if (!pattern) {
      showNotification('No regex to copy', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(fullRegex);
      showNotification('Regex copied!', 'success');
    } catch (error) {
      showNotification('Failed to copy regex', 'error');
    }
  }

  // Copy text
  async function copyText() {
    const text = testInput.value;
    
    if (!text) {
      showNotification('No text to copy', 'warning');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showNotification('Text copied!', 'success');
    } catch (error) {
      showNotification('Failed to copy text', 'error');
    }
  }

  // Export matches
  function exportMatches() {
    if (currentMatches.length === 0) {
      showNotification('No matches to export', 'warning');
      return;
    }

    const data = currentMatches.map((match, index) => ({
      match: match.match,
      position: match.index,
      groups: match.groups,
      namedGroups: match.namedGroups
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `regex-matches-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Matches exported!', 'success');
  }

  // Clear matches
  function clearMatches() {
    testInput.value = '';
    clearResults();
    showNotification('Matches cleared!', 'success');
  }

  // Clear all
  function clearAll() {
    regexInput.value = '';
    regexFlags.value = 'g';
    testInput.value = '';
    replaceInput.value = '';
    updateCheckboxesFromFlags();
    clearResults();
    setRegexStatus('Enter a regex pattern', 'error');
    replaceSection.classList.add('hidden');
    explanationSection.classList.add('hidden');
    showNotification('All cleared!', 'success');
  }

  // Toggle theme
  function toggleTheme() {
    document.documentElement.classList.toggle('theme-alt');
    saveSettings();
  }

  // Utility functions
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
      regex: regexInput.value,
      flags: regexFlags.value,
      testText: testInput.value
    };
    localStorage.setItem('regex_tester_settings', JSON.stringify(settings));
  }

  // Load settings
  function loadSettings() {
    try {
      const settings = JSON.parse(localStorage.getItem('regex_tester_settings') || '{}');
      
      if (settings.theme === 'alt') {
        document.documentElement.classList.add('theme-alt');
      }
      
      if (settings.regex) regexInput.value = settings.regex;
      if (settings.flags) regexFlags.value = settings.flags;
      if (settings.testText) testInput.value = settings.testText;
      
      updateCheckboxesFromFlags();
    } catch (error) {
      console.warn('Failed to load settings');
    }
  }

  // Initialize app
  init();
})();