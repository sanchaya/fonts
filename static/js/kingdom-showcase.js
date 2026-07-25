(function() {
  'use strict';

  var currentLang = 'kn';

  var translations = {
    kn: {
      heroSuptitle: 'ಫಾಂಟ್ಸ್ ಸಂಚಯ',
      heroTitle: 'ಕನ್ನಡ ಲಿಪಿಗಳು:<br>ರಾಜವಂಶಗಳ ಮೂಲಕ',
      heroSubtitle: 'ಕರ್ನಾಟಕದ ರಾಜವಂಶಗಳ ಕಾಲದ ಲಿಪಿಗಳಿಂದ ಪ್ರೇರಿತವಾದ ಫಾಂಟ್‌ಗಳು — ಕಾರ್ಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಮತ್ತು ಅಕ್ಷರ ಚಿತ್ರ ರಚಿಸಿ',
      sectionKingdoms: 'ರಾಜವಂಶಗಳು',
      sectionPrint: 'ಮುದ್ರಣ ಯುಗ',
      kadambaName: 'ಕಡಂಬ ರಾಜವಂಶ',
      kadambaDesc: 'ಕರ್ನಾಟಕದ ಮೊದಲ ಸ್ಥಳೀಯ ರಾಜವಂಶ. ಕಡಂಬರು ಬನವಾಸಿಯಿಂದ ಆಳಿದರು ಮತ್ತು ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯವನ್ನು ಪೋಷಿಸಿದರು.',
      kadambaFontLabel: 'ಕಡಂಬ',
      kadambaFontStyle: 'ಕಾಕುಸ್ಥವರ್ಮ · ನಿಯಮಿತ',
      gangaName: 'ಪಶ್ಚಿಮ ಗಂಗ ರಾಜವಂಶ',
      gangaDesc: 'ಗಂಗರು ಕೋಲಾರ ಮತ್ತು ತಲಕಾಡಿನಿಂದ ದಕ್ಷಿಣ ಕರ್ನಾಟಕವನ್ನು ಆಳಿದರು. ಜೈನಧರ್ಮ ಮತ್ತು ಕನ್ನಡ ಸಾಹಿತ್ಯದ ಮಹಾನ್ ಪೋಷಕರು.',
      gangaFontLabel: 'ಗಂಗ',
      gangaFontStyle: 'ಮಾರಸಿಂಹ · ನಿಯಮಿತ',
      chalukyaName: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ರಾಜವಂಶ',
      chalukyaDesc: 'ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು ಕನ್ನಡ ಸಾಹಿತ್ಯ ಮತ್ತು ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ಸುವರ್ಣಯುಗವನ್ನು ಆರಂಭಿಸಿದರು.',
      chalukyaFontLabel: 'ಚಾಲುಕ್ಯ',
      chalukyaFontStyle: 'ವಿಜಯಾದಿತ್ಯ · ನಿಯಮಿತ',
      hoysalaName: 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯ',
      hoysalaDesc: 'ಹೊಯ್ಸಳರು ಬೇಲೂರು, ಹಳೇಬೀಡು ಮತ್ತು ಸೋಮನಾಥಪುರದಲ್ಲಿ ಅದ್ಭುತ ದೇವಾಲಯಗಳನ್ನು ನಿರ್ಮಿಸಿದರು. ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ಸಂಪನ್ನತೆಯ ಕಾಲ.',
      hoysalaFontLabel: 'ಹೊಯ್ಸಳ',
      hoysalaFontStyle: 'ನಿಯಮಿತ',
      printEraName: 'ಮುದ್ರಣ ಯುಗ',
      printEraDesc: 'ಮಿಷನ್ ಮುದ್ರಣಾಲಯಗಳ ಯುಗ ಮತ್ತು ಕನ್ನಡ ಮುದ್ರಣಕಲೆಯ ಜನನ. ಬಾಸೆಲ್ ಮಿಷನ್ (ಮಂಗಳೂರು), ವೆಸ್ಲಿಯನ್ ಮಿಷನ್ (ಬೆಂಗಳೂರು) ಮತ್ತು ಜರ್ಮನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯಗಳು ಮೊದಲ ಕನ್ನಡ ಅಕ್ಷರ ಶೈಲಿಗಳನ್ನು ಸೃಷ್ಟಿಸಿದವು.',
      kittelFontLabel: 'ಕರ್ನಾಟ ಎಫ್ ಕಿತ್ತೆಲ್',
      kittelFontStyle: 'ಬಾಸೆಲ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ (1830–1900)',
      germanFontLabel: 'ಕರ್ನಾಟ ಜರ್ಮನ್ ಮಿಷನ್',
      germanFontStyle: 'ಜರ್ಮನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ · ಮಂಗಳೂರು',
      wesleyanFontLabel: 'ಕರ್ನಾಟ ವೆಸ್ಲಿಯನ್ ಮಿಷನ್',
      wesleyanFontStyle: 'ವೆಸ್ಲಿಯನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ · ಬೆಂಗಳೂರು',
      createImage: 'ಚಿತ್ರ ರಚಿಸಿ',
      modalTitle: 'ಇದರೊಂದಿಗೆ ರಚಿಸಿ',
      modalSubtitle: 'ನಿಮ್ಮ ಪಠ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ ಮತ್ತು ಚಿತ್ರವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
      yourText: 'ನಿಮ್ಮ ಪಠ್ಯ',
      textPlaceholder: 'ನಿಮ್ಮ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...',
      fontSize: 'ಅಕ್ಷರ ಗಾತ್ರ',
      theme: 'ಥೀಮ್',
      themeLight: 'ಲೈಟ್',
      themeDark: 'ಡಾರ್ಕ್',
      themeWarm: 'ವಾರ್ಮ್',
      preview: 'ಪೂರ್ವವೀಕ್ಷಣೆ',
      copyImage: 'ಚಿತ್ರ ನಕಲಿಸಿ',
      downloadPng: 'PNG ಡೌನ್‌ಲೋಡ್',
      footer: 'ಫಾಂಟ್ಸ್ ಸಂಚಯದ ಭಾಗ',
      footerSub: 'ಸಂಚಯ ಅವರಿಂದ ಕನ್ನಡ ಅಕ್ಷರ ಶೈಲಿಗಳ ಡಿಜಿಟಲ್ ಆರ್ಕೈವ್',
      toastCopied: 'ಚಿತ್ರ ಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ನಕಲಿಸಲಾಗಿದೆ!',
      toastDownloaded: 'ಬದಲಿಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ'
    },
    en: {
      heroSuptitle: 'Fonts Sanchaya',
      heroTitle: 'Kannada Typefaces<br>Through the Kingdoms',
      heroSubtitle: 'Fonts inspired by Karnataka\'s great dynasties and the early print era — click any card to create a typographic image',
      sectionKingdoms: 'Kingdoms',
      sectionPrint: 'Early Print Era',
      kadambaName: 'Kadamba Kingdom',
      kadambaDesc: 'Karnataka\'s first indigenous dynasty. The Kadambas ruled from Banavasi and patronized Kannada language and literature.',
      kadambaFontLabel: 'Kadamba',
      kadambaFontStyle: 'Kakusthavarman · Regular',
      gangaName: 'Western Ganga Dynasty',
      gangaDesc: 'The Gangas ruled southern Karnataka from Kolar and Talakad. Great patrons of Jainism and Kannada literature.',
      gangaFontLabel: 'Ganga',
      gangaFontStyle: 'Marasimha · Regular',
      chalukyaName: 'Badami Chalukya Dynasty',
      chalukyaDesc: 'The Chalukyas of Badami ushered in the golden age of Kannada literature and temple architecture.',
      chalukyaFontLabel: 'Chalukya',
      chalukyaFontStyle: 'Vijayaditya · Regular',
      hoysalaName: 'Hoysala Empire',
      hoysalaDesc: 'The Hoysalas left an indelible mark on Karnataka with their stunning temple architecture at Belur, Halebidu, and Somnathpur.',
      hoysalaFontLabel: 'Hoysala',
      hoysalaFontStyle: 'Regular',
      printEraName: 'Early Print Era',
      printEraDesc: 'The age of mission presses and the birth of Kannada typography. Basel Mission (Mangalore), Wesleyan Mission (Bangalore), and German Mission presses created the first Kannada typefaces, later revived by the Sanchaya project.',
      kittelFontLabel: 'Karnata F Kittel',
      kittelFontStyle: 'Basel Mission Press (1830–1900)',
      germanFontLabel: 'Karnata German Mission Press',
      germanFontStyle: 'German Mission Press · Mangaluru',
      wesleyanFontLabel: 'Karnata Wesleyan Mission Press',
      wesleyanFontStyle: 'Wesleyan Mission Press · Bengaluru',
      createImage: 'Create Image',
      modalTitle: 'Create with',
      modalSubtitle: 'Type your text below and download as an image',
      yourText: 'Your Text',
      textPlaceholder: 'Type your text here...',
      fontSize: 'Font Size',
      theme: 'Theme',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeWarm: 'Warm',
      preview: 'Preview',
      copyImage: 'Copy Image',
      downloadPng: 'Download PNG',
      footer: 'Part of Fonts Sanchaya',
      footerSub: 'A digital archive of Kannada Typefaces by Sanchaya',
      toastCopied: 'Image copied to clipboard!',
      toastDownloaded: 'Downloaded instead'
    }
  };

  function applyLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'kn' ? 'kn' : 'en';

    var els = document.querySelectorAll('[data-i18n]');
    els.forEach(function(el) {
      var key = el.dataset.i18n;
      var text = translations[lang][key];
      if (text !== undefined) {
        el.innerHTML = text;
      }
    });

    var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(function(el) {
      var key = el.dataset.i18nPlaceholder;
      var text = translations[lang][key];
      if (text !== undefined) {
        el.placeholder = text;
      }
    });

    var langBtns = document.querySelectorAll('.ks-lang-btn');
    langBtns.forEach(function(btn) {
      btn.classList.toggle('ks-lang-active', btn.dataset.lang === lang);
    });
  }

  var langBtns = document.querySelectorAll('.ks-lang-btn');
  langBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var lang = this.dataset.lang;
      if (lang !== currentLang) {
        applyLanguage(lang);
      }
    });
  });

  var modal = document.getElementById('ksModal');
  var previewBox = document.getElementById('ksPreviewBox');
  var previewText = document.getElementById('ksPreviewText');
  var textInput = document.getElementById('ksTextInput');
  var fontSizeInput = document.getElementById('ksFontSize');
  var fontSizeLabel = document.getElementById('ksFontSizeLabel');
  var modalFontName = document.getElementById('ksModalFontName');
  var modalFontFamily = document.getElementById('ksModalFontFamily');
  var downloadBtn = document.getElementById('ksDownloadBtn');
  var copyBtn = document.getElementById('ksCopyBtn');

  var currentFontFamily = '';
  var currentFontName = '';

  var actionBtns = document.querySelectorAll('.ks-card-action');
  actionBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var family = this.dataset.family;
      var font = this.dataset.font;
      openModal(family, font);
    });
  });

  var fontCards = document.querySelectorAll('.ks-font-card');
  fontCards.forEach(function(card) {
    card.addEventListener('click', function() {
      var action = this.querySelector('.ks-card-action');
      if (action) {
        var family = action.dataset.family;
        var font = action.dataset.font;
        openModal(family, font);
      }
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
    modal.classList.add('ks-modal-open');
    document.body.style.overflow = 'hidden';
  }

  function getDefaultText(family) {
    var texts = {
      'Kadamba': currentLang === 'kn' ? 'ಕಡಂಬ ರಾಜವಂಶದ ಕೀರ್ತಿ' : 'Glory of the Kadamba dynasty',
      'Ganga': currentLang === 'kn' ? 'ಗಂಗ ರಾಜವಂಶದ ವೈಭವ' : 'Splendor of the Ganga dynasty',
      'Chalukya': currentLang === 'kn' ? 'ಚಾಲುಕ್ಯ ರಾಜವಂಶದ ವೈಭವ' : 'Splendor of the Chalukya dynasty',
      'Hoysala': currentLang === 'kn' ? 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯದ ಶ್ರೀ' : 'Glory of the Hoysala empire',
      'Karnata-F-Kittel-Font': currentLang === 'kn' ? 'ಬಾಸೆಲ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ 1836' : 'Basel Mission Press 1836',
      'Karnata-German-Mission-Press': currentLang === 'kn' ? 'ಜರ್ಮನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ' : 'German Mission Press',
      'Karnata-Wesleyan-Mission-Press': currentLang === 'kn' ? 'ವೆಸ್ಲಿಯನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ' : 'Wesleyan Mission Press'
    };
    return texts[family] || (currentLang === 'kn' ? 'ಕನ್ನಡ ಲಿಪಿಯ ಸೊಬಗು' : 'Beauty of Kannada script');
  }

  function updatePreview() {
    var text = textInput.value || (currentLang === 'kn' ? 'ಕನ್ನಡ ಲಿಪಿಯ ಸೊಬಗು' : 'Beauty of Kannada script');
    var size = fontSizeInput.value;
    fontSizeLabel.textContent = size + 'px';
    previewText.textContent = text;
    previewText.style.fontSize = size + 'px';
  }

  textInput.addEventListener('input', updatePreview);
  fontSizeInput.addEventListener('input', updatePreview);

  var themeBtns = document.querySelectorAll('.ks-theme-btn');
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

  document.querySelector('.ks-modal-close').addEventListener('click', closeModal);
  document.querySelector('.ks-modal-backdrop').addEventListener('click', closeModal);

  function closeModal() {
    modal.classList.remove('ks-modal-open');
    document.body.style.overflow = '';
  }

  downloadBtn.addEventListener('click', function() {
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
              showToast(translations[currentLang].toastCopied);
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
    showToast(translations[currentLang].toastDownloaded);
  }

  function showToast(msg) {
    var existing = document.querySelector('.ks-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'ks-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function() {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(function() { toast.remove(); }, 300);
    }, 2000);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('ks-modal-open')) {
      closeModal();
    }
  });

  applyLanguage('kn');
})();
