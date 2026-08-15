# Kingdom-showcase: standalone paragraph creation section (removed)

The standalone paragraph creation section at the bottom of the kingdom-showcase
page was removed on 2026-08-15. Paragraph creation still works per font card via
the "ಪ್ಯಾರಾಗ್ರಾಫ್" button on each card (Sentence ⇄ Paragraph mode toggle in the
modal, see `views/kingdom-showcase/kingdomShowcase.ejs` and
`static/js/kingdom-showcase.js`).

This file preserves the removed code for future use. It lives in three parts:
EJS markup (with the export modal), the JavaScript wiring, and the CSS.

## EJS (was between the print-era block and the footer)

```html
  <div class="ks-section-label ks-section-label-para">
    <span class="ks-section-icon"><i class="fas fa-align-left"></i></span>
    <span data-i18n="paraSectionLabel">ಪ್ಯಾರಾಗ್ರಾಫ್ ರಚಿಸಿ</span>
  </div>

  <% var paraFonts = []; %>
  <% kingdoms.forEach(function(e){ paraFonts = paraFonts.concat(e.fonts); }); %>
  <% printFonts.forEach(function(e){ paraFonts = paraFonts.concat(e.fonts); }); %>

  <div class="ks-paragraph-section">
    <div class="ks-paragraph-card">
      <div class="ks-pg-row">
        <div class="ks-pg-select-wrap">
          <label data-i18n="selectFont">ಫಾಂಟ್ ಆಯ್ಕೆಮಾಡಿ</label>
          <select id="ksParaFontSelect" class="ks-select">
            <% paraFonts.forEach(function(f){ %>
              <option value="<%= f.font %>" data-family="<%= f.family %>" data-label="<%= f.preview %>"><%= f.preview %> — <%= f.styleEn %></option>
            <% }); %>
          </select>
        </div>
        <div class="ks-pg-select-wrap">
          <label data-i18n="fontSize">ಅಕ್ಷರ ಗಾತ್ರ</label>
          <div class="ks-range-group">
            <input type="range" id="ksParaFontSize" min="16" max="120" value="36">
            <span id="ksParaFontSizeLabel">36px</span>
          </div>
        </div>
      </div>
      <textarea id="ksParaTextInput" maxlength="500" rows="5" class="ks-pg-textarea" data-i18n-placeholder="paraPlaceholder" placeholder="ನಿಮ್ಮ ಪ್ಯಾರಾಗ್ರಾಫ್ ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ..."></textarea>
      <div class="ks-pg-preview" id="ksParaPreview">
        <p></p>
      </div>
      <button class="ks-pg-export" id="ksParaExportBtn">
        <i class="fas fa-image"></i> <span data-i18n="paraExport">ಪ್ಯಾರಾಗ್ರಾಫ್ ಚಿತ್ರವಾಗಿ ರಚಿಸಿ</span>
      </button>
    </div>
  </div>
```

## EJS: export modal `#ksParaModal` (was after `#ksModal`)

```html
<div class="ks-modal" id="ksParaModal">
  <div class="ks-modal-backdrop" id="ksParaModalBackdrop"></div>
  <div class="ks-modal-content">
    <button class="ks-modal-close" id="ksParaModalClose"><i class="fas fa-times"></i></button>
    <div class="ks-modal-header">
      <h2 class="ks-modal-title"><span data-i18n="paraModalTitle">ಪ್ಯಾರಾಗ್ರಾಫ್ ಡೌನ್‌ಲೋಡ್</span></h2>
      <p class="ks-modal-subtitle" data-i18n="modalSubtitle">ನಿಮ್ಮ ಪಠ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ ಮತ್ತು ಚಿತ್ರವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ</p>
    </div>
    <div class="ks-modal-body">
      <div class="ks-pg-export-preview" id="ksParaExportPreview"></div>
    </div>
    <div class="ks-modal-footer">
      <div class="ks-modal-footer-info">
        <span id="ksParaExportFamily"></span>
        <span>fonts.sanchaya.net</span>
      </div>
      <div class="ks-modal-actions">
        <button class="ks-btn ks-btn-secondary" id="ksParaCopyBtn"><i class="fas fa-copy"></i> <span data-i18n="copyImage">ಚಿತ್ರ ನಕಲಿಸಿ</span></button>
        <button class="ks-btn ks-btn-primary" id="ksParaDownloadBtn"><i class="fas fa-download"></i> <span data-i18n="downloadPng">PNG ಡೌನ್‌ಲೋಡ್</span></button>
      </div>
    </div>
  </div>
</div>
```

## JavaScript (was in `static/js/kingdom-showcase.js`)

Element lookups (were added after `modalFontSelect` lookup):

```js
  var paraTextInput = document.getElementById('ksParaTextInput');
  var paraFontSelect = document.getElementById('ksParaFontSelect');
  var paraFontSizeInput = document.getElementById('ksParaFontSize');
  var paraFontSizeLabel = document.getElementById('ksParaFontSizeLabel');
  var paraPreview = document.getElementById('ksParaPreview');
  var paraExportBtn = document.getElementById('ksParaExportBtn');
  var paraModal = document.getElementById('ksParaModal');
  var paraExportPreview = document.getElementById('ksParaExportPreview');
  var paraExportFamily = document.getElementById('ksParaExportFamily');
  var paraCopyBtn = document.getElementById('ksParaCopyBtn');
  var paraDownloadBtn = document.getElementById('ksParaDownloadBtn');
```

Wiring (was after `updateParaPreview` definition, before `applyLanguage('kn')`):

```js
  function updateParaPreview() {
    var text = paraTextInput.value || translations[currentLang].paraFallback;
    var size = paraFontSizeInput.value;
    var font = paraFontSelect.value;
    paraFontSizeLabel.textContent = size + 'px';
    var p = paraPreview.querySelector('p');
    p.style.fontFamily = "'" + font + "', serif";
    p.style.fontSize = size + 'px';
    p.innerHTML = formatParagraphText(text);
  }

  paraTextInput.addEventListener('input', updateParaPreview);
  paraFontSizeInput.addEventListener('input', updateParaPreview);
  paraFontSelect.addEventListener('change', updateParaPreview);
  updateParaPreview();

  function getParaOptionData(select) {
    var option = select.options[select.selectedIndex];
    return {
      font: select.value,
      family: option.dataset.family || select.value,
      label: option.dataset.label || select.value
    };
  }

  function openParaModal() {
    paraModal.classList.add('ks-modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeParaModal() {
    paraModal.classList.remove('ks-modal-open');
    document.body.style.overflow = '';
  }

  paraExportBtn.addEventListener('click', function() {
    var data = getParaOptionData(paraFontSelect);
    var size = paraFontSizeInput.value;
    var text = paraTextInput.value || translations[currentLang].paraFallback;

    paraExportFamily.textContent = data.label;
    paraExportPreview.innerHTML =
      '<div class="ks-pg-export-content" style="font-family:\'' + data.font + '\', serif; font-size:' + size + 'px; padding:40px 50px; background:#ffffff; border-radius:12px; text-align:center; max-width:700px; line-height:1.6; color:#1a1a2e;">' +
        '<p style="margin:0; word-break:break-word;">' + formatParagraphText(text) + '</p>' +
        '<div style="margin-top:20px; padding-top:15px; border-top:1px solid #e0e0e0; font-size:12px; color:#888; font-family:Arial, sans-serif;">' +
          data.label + ' | fonts.sanchaya.net' +
        '</div>' +
      '</div>';
    openParaModal();
  });

  paraDownloadBtn.addEventListener('click', function() {
    var content = paraExportPreview.querySelector('.ks-pg-export-content');
    var data = getParaOptionData(paraFontSelect);
    document.fonts.ready.then(function() {
      html2canvas(content, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true
      }).then(function(canvas) {
        var link = document.createElement('a');
        link.download = (data.family || 'paragraph').replace(/[^a-zA-Z0-9]/g, '-') + '-paragraph.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });
  });

  paraCopyBtn.addEventListener('click', function() {
    var content = paraExportPreview.querySelector('.ks-pg-export-content');
    var data = getParaOptionData(paraFontSelect);
    document.fonts.ready.then(function() {
      html2canvas(content, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true
      }).then(function(canvas) {
        canvas.toBlob(function(blob) {
          try {
            var item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(function() {
              showToast(translations[currentLang].toastCopied);
            }).catch(function() {
              fallbackParaDownload(canvas, data);
            });
          } catch (e) {
            fallbackParaDownload(canvas, data);
          }
        });
      });
    });
  });

  function fallbackParaDownload(canvas, data) {
    var link = document.createElement('a');
    link.download = (data.family || 'paragraph').replace(/[^a-zA-Z0-9]/g, '-') + '-paragraph.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(translations[currentLang].toastDownloaded);
  }

  document.getElementById('ksParaModalClose').addEventListener('click', closeParaModal);
  document.getElementById('ksParaModalBackdrop').addEventListener('click', closeParaModal);
```

The Escape key handler also had a branch for the paragraph modal (now removed):

```js
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('ks-modal-open')) {
      closeModal();
    } else if (e.key === 'Escape' && paraModal.classList.contains('ks-modal-open')) {
      closeParaModal();
    }
  });
```

## i18n keys that were removed from both `kn` and `en` in `translations`

```js
  paraSectionLabel: 'ಪ್ಯಾರಾಗ್ರಾಫ್ ರಚಿಸಿ',   // kn  (en: 'Create a Paragraph')
  paraExport: 'ಪ್ಯಾರಾಗ್ರಾಫ್ ಚಿತ್ರವಾಗಿ ರಚಿಸಿ', // kn  (en: 'Export Paragraph as Image')
  paraModalTitle: 'ಪ್ಯಾರಾಗ್ರಾಫ್ ಡೌನ್‌ಲೋಡ್',  // kn  (en: 'Download Paragraph Image')
```

`paraPlaceholder` and `paraFallback` were KEPT — they are still used by the
per-card paragraph mode in `setModalMode()`.

## CSS (was under `/* Paragraph creation section */` in `static/css/kingdom-showcase.css`)

```css
.ks-section-label-para {
  margin-top: 48px;
}

.ks-paragraph-card {
  background: #ffffff;
  border: 1px solid #eae6e0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.ks-pg-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.ks-pg-select-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.ks-pg-select-wrap label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #5a5a7a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ks-pg-textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.ks-pg-textarea:focus {
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.ks-pg-preview {
  border: 1px solid #eee;
  border-radius: 12px;
  background: #ffffff;
  padding: 28px 24px;
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.ks-pg-preview p {
  margin: 0;
  text-align: center;
  color: #1a1a2e;
  line-height: 1.6;
  max-width: 100%;
  word-break: break-word;
}

.ks-pg-export {
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #4361ee 0%, #3f37c9 100%);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  transition: all 0.2s;
}

.ks-pg-export:hover {
  box-shadow: 0 6px 20px rgba(67, 97, 238, 0.35);
  transform: translateY(-1px);
}

.ks-pg-export-preview {
  display: flex;
  justify-content: center;
}
```

The mobile media query also had:

```css
  .ks-pg-row {
    grid-template-columns: 1fr;
  }
```

`.ks-select`, `.ks-select:focus`, and `.ks-pg-export-content` were KEPT — the
first two style the font select inside the main modal, and the last is still used
by `captureParagraphExport()` in the per-card paragraph mode.
