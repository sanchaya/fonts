(function() {
  'use strict';

  var modal = document.getElementById('tlModal');
  var previewBox = document.getElementById('tlPreviewBox');
  var previewText = document.getElementById('tlPreviewText');
  var textInput = document.getElementById('tlTextInput');
  var fontSizeInput = document.getElementById('tlFontSize');
  var fontSizeLabel = document.getElementById('tlFontSizeLabel');
  var modalFontName = document.getElementById('modalFontNameDisplay');
  var modalFontFamily = document.getElementById('modalFontFamilyDisplay');
  var downloadBtn = document.getElementById('tlDownloadBtn');
  var copyBtn = document.getElementById('tlCopyBtn');

  var currentFontFamily = '';
  var currentFontName = '';

  document.fonts.ready.then(function() {
  });

  var tryButtons = document.querySelectorAll('.tl-font-try');
  tryButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var family = this.dataset.family;
      var font = this.dataset.font;
      openModal(family, font);
    });
  });

  var fontCards = document.querySelectorAll('.tl-font-card');
  fontCards.forEach(function(card) {
    card.addEventListener('click', function() {
      var family = this.dataset.family;
      var font = this.dataset.font;
      openModal(family, font);
    });
  });

  function openModal(family, font) {
    currentFontFamily = family;
    currentFontName = font;
    modalFontName.textContent = font;
    modalFontFamily.textContent = family.replace(/-/g, ' ');
    previewText.style.fontFamily = "'" + font + "', serif";
    if (!textInput.value) {
      textInput.value = getDefaultText(family);
    }
    updatePreview();
    modal.classList.add('tl-modal-open');
    document.body.style.overflow = 'hidden';
  }

  function getDefaultText(family) {
    var texts = {
      'Kadamba': 'ಕದಂಬ ರಾಜವಂಶದ ಕೀರ್ತಿ',
      'Ganga': 'ಗಂಗ ರಾಜವಂಶದ ವೈಭವ',
      'Chalukya': 'ಚಾಲುಕ್ಯ ರಾಜವಂಶದ ವೈಭವ',
      'Hoysala': 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯದ ಶ್ರೀ',
      'Karnata-F-Kittel-Font': 'ಬಾಸೆಲ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ 1836',
      'Karnata-German-Mission-Press': 'ಜರ್ಮನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ',
      'Karnata-Wesleyan-Mission-Press': 'ವೆಸ್ಲಿಯನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ',
      'KarnataGTN': 'ಜಿ.ಟಿ.ನಾರಾಯಣ ರಾವ್ ಅವರ ಹಸ್ತಾಕ್ಷರ'
    };
    return texts[family] || 'ಕನ್ನಡ ಲಿಪಿಯ ಸೊಬಗು';
  }

  function updatePreview() {
    var text = textInput.value || 'ಕನ್ನಡ ಲಿಪಿಯ ಸೊಬಗು';
    var size = fontSizeInput.value;
    fontSizeLabel.textContent = size + 'px';
    previewText.textContent = text;
    previewText.style.fontSize = size + 'px';
  }

  textInput.addEventListener('input', updatePreview);
  fontSizeInput.addEventListener('input', updatePreview);

  var themeBtns = document.querySelectorAll('.tl-theme-btn');
  themeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      themeBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      var bg = this.dataset.bg;
      var textColor = this.dataset.text;
      previewBox.style.background = bg;
      previewText.style.color = textColor;
    });
  });

  document.querySelector('.tl-modal-close').addEventListener('click', closeModal);
  document.querySelector('.tl-modal-backdrop').addEventListener('click', closeModal);

  function closeModal() {
    modal.classList.remove('tl-modal-open');
    document.body.style.overflow = '';
  }

  downloadBtn.addEventListener('click', function() {
    var content = previewText;
    var font = currentFontName;

    document.fonts.ready.then(function() {
      html2canvas(previewBox, {
        scale: 2,
        backgroundColor: previewBox.style.background || '#ffffff',
        useCORS: true,
        allowTaint: true
      }).then(function(canvas) {
        var link = document.createElement('a');
        link.download = currentFontFamily.replace(/[^a-zA-Z0-9]/g, '-') + '-typography.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });
  });

  copyBtn.addEventListener('click', function() {
    var content = previewText;

    document.fonts.ready.then(function() {
      html2canvas(previewBox, {
        scale: 2,
        backgroundColor: previewBox.style.background || '#ffffff',
        useCORS: true,
        allowTaint: true
      }).then(function(canvas) {
        canvas.toBlob(function(blob) {
          try {
            var item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(function() {
              showToast('Image copied to clipboard!');
            }).catch(function() {
              fallbackDownload(canvas);
            });
          } catch (e) {
            fallbackDownload(canvas);
          }
        });
      });
    });
  });

  function fallbackDownload(canvas) {
    var link = document.createElement('a');
    link.download = currentFontFamily.replace(/[^a-zA-Z0-9]/g, '-') + '-typography.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Downloaded instead');
  }

  function showToast(msg) {
    var existing = document.querySelector('.tl-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'tl-toast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1a1a2e;color:#fff;padding:12px 24px;border-radius:10px;font-size:0.9rem;z-index:200000;box-shadow:0 4px 20px rgba(0,0,0,0.2);animation:tlFadeIn 0.3s ease;font-family:Inter,sans-serif;';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(function() { toast.remove(); }, 300);
    }, 2000);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('tl-modal-open')) {
      closeModal();
    }
  });

  var styleSheet = document.createElement('style');
  styleSheet.textContent = '@keyframes tlFadeIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }';
  document.head.appendChild(styleSheet);

})();
