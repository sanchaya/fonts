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
      kadambaName: 'ಕದಂಬ ರಾಜವಂಶ',
      kadambaDesc: 'ಕರ್ನಾಟಕದ ಮೊದಲ ಸ್ಥಳೀಯ ರಾಜವಂಶ. ಕದಂಬರು ಬನವಾಸಿಯಿಂದ ಆಳಿದರು ಮತ್ತು ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯವನ್ನು ಪೋಷಿಸಿದರು.',
      kadambaFontLabel: 'ಕದಂಬ',
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
      kittelFontLabel: 'ಕರ್ನಾಟ ಎಫ್ ಕಿಟೆಲ್',
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
      lineHeight: 'ಲೈನ್ ಸ್ಪೇಸಿಂಗ್',
      charSpacing: 'ಅಕ್ಷರ ಅಂತರ',
      themeLight: 'ಲೈಟ್',
      themeDark: 'ಡಾರ್ಕ್',
      themeWarm: 'ವಾರ್ಮ್',
      preview: 'ಪೂರ್ವವೀಕ್ಷಣೆ',
      copyImage: 'ಚಿತ್ರ ನಕಲಿಸಿ',
      downloadPng: 'PNG ಡೌನ್‌ಲೋಡ್',
      footer: 'ಫಾಂಟ್ಸ್ ಸಂಚಯದ ಭಾಗ',
      footerSub: '<a href="https://sanchaya.org" target="_blank">ಸಂಚಯ</a>ದ ಕನ್ನಡ ಅಕ್ಷರ ಶೈಲಿಗಳ ಡಿಜಿಟಲ್ ಆರ್ಕೈವ್',
      toastCopied: 'ಚಿತ್ರ ಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ನಕಲಿಸಲಾಗಿದೆ!',
      toastDownloaded: 'ಬದಲಿಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ',
      selectFont: 'ಫಾಂಟ್ ಆಯ್ಕೆಮಾಡಿ',
      paraSectionLabel: 'ಪ್ಯಾರಾಗ್ರಾಫ್ ರಚಿಸಿ',
      paraPlaceholder: 'ನಿಮ್ಮ ಪ್ಯಾರಾಗ್ರಾಫ್ ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...',
      paraExport: 'ಪ್ಯಾರಾಗ್ರಾಫ್ ಚಿತ್ರವಾಗಿ ರಚಿಸಿ',
      paraModalTitle: 'ಪ್ಯಾರಾಗ್ರಾಫ್ ಡೌನ್‌ಲೋಡ್',
      paraFallback: 'ಕನ್ನಡ ಲಿಪಿಯ ಇತಿಹಾಸ ಆರಂಭದಿಂದ ಮುದ್ರಣ ಯುಗದವರೆಗೆ — ಪ್ರತಿ ಯುಗದ ಲಿಪಿ ತನ್ನದೇ ಆದ ಸೊಗಸನ್ನು ಹೊಂದಿದೆ.\nನಿಮ್ಮ ಪ್ಯಾರಾಗ್ರಾಫ್ ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ.',
      createMode: 'ರಚನೆ ವಿಧಾನ',
      modeSentence: 'ವಾಕ್ಯ',
      modeParagraph: 'ಪ್ಯಾರಾಗ್ರಾಫ್',
      paraShort: 'ಪ್ಯಾರಾಗ್ರಾಫ್'
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
      lineHeight: 'Line Spacing',
      charSpacing: 'Char Spacing',
      themeLight: 'Light',
      themeDark: 'Dark',
      themeWarm: 'Warm',
      preview: 'Preview',
      copyImage: 'Copy Image',
      downloadPng: 'Download PNG',
      footer: 'Part of Fonts Sanchaya',
      footerSub: 'A digital archive of Kannada Typefaces by Sanchaya',
      toastCopied: 'Image copied to clipboard!',
      toastDownloaded: 'Downloaded instead',
      selectFont: 'Select Font',
      paraSectionLabel: 'Create a Paragraph',
      paraPlaceholder: 'Type your paragraph here...',
      paraExport: 'Export Paragraph as Image',
      paraModalTitle: 'Download Paragraph Image',
      paraFallback: 'From the dawn of the Kannada script to the print era — every age has its own beauty.\nType your paragraph here.',
      createMode: 'Create Mode',
      modeSentence: 'Sentence',
      modeParagraph: 'Paragraph',
      paraShort: 'Paragraph'
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

    if (modal && modal.classList.contains('ks-modal-open') && textInput) {
      setModalMode(currentMode);
    }
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
  var lineHeightInput = document.getElementById('ksLineHeight');
  var lineHeightLabel = document.getElementById('ksLineHeightLabel');
  var charSpacingInput = document.getElementById('ksCharSpacing');
  var charSpacingLabel = document.getElementById('ksCharSpacingLabel');
  var modalFontName = document.getElementById('ksModalFontName');
  var modalFontFamily = document.getElementById('ksModalFontFamily');
  var downloadBtn = document.getElementById('ksDownloadBtn');
  var copyBtn = document.getElementById('ksCopyBtn');
  var modalFontSelect = document.getElementById('ksFontSelect');

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

  var currentFontFamily = '';
  var currentFontName = '';
  var currentMode = 'sentence';

  var actionBtns = document.querySelectorAll('.ks-card-action');
  actionBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var family = this.dataset.family;
      var font = this.dataset.font;
      openModal(family, font, this.dataset.mode || 'sentence');
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

  function openModal(family, font, mode) {
    currentFontFamily = family;
    currentFontName = font;
    modalFontName.textContent = font;
    modalFontFamily.textContent = family.replace(/-/g, ' ');
    previewText.style.fontFamily = "'" + font + "', serif";
    if (modalFontSelect) {
      modalFontSelect.value = font;
    }
    setModalMode(mode || 'sentence');
    modal.classList.add('ks-modal-open');
    document.body.style.overflow = 'hidden';
  }

  function setModalMode(mode) {
    currentMode = mode === 'paragraph' ? 'paragraph' : 'sentence';
    document.querySelectorAll('.ks-mode-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.mode === currentMode);
    });
    textInput.maxLength = currentMode === 'paragraph' ? 500 : 300;
    textInput.placeholder = currentMode === 'paragraph'
      ? translations[currentLang].paraPlaceholder
      : translations[currentLang].textPlaceholder;
    if (!textInput.value) {
      textInput.value = currentMode === 'paragraph'
        ? translations[currentLang].paraFallback
        : getDefaultText(currentFontFamily);
    }
    updatePreview();
  }

  document.querySelectorAll('.ks-mode-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setModalMode(this.dataset.mode);
    });
  });

  modalFontSelect.addEventListener('change', function() {
    var family = this.options[this.selectedIndex].dataset.family;
    var font = this.value;
    currentFontFamily = family;
    currentFontName = font;
    modalFontName.textContent = font;
    modalFontFamily.textContent = family.replace(/-/g, ' ');
    previewText.style.fontFamily = "'" + font + "', serif";
    updatePreview();
  });

  function getDefaultText(family) {
    var texts = {
      'Kadamba': currentLang === 'kn' ? 'ಕದಂಬ ರಾಜವಂಶದ ಕೀರ್ತಿ' : 'Glory of the Kadamba dynasty',
      'Ganga': currentLang === 'kn' ? 'ಗಂಗ ರಾಜವಂಶದ ವೈಭವ' : 'Splendor of the Ganga dynasty',
      'Chalukya': currentLang === 'kn' ? 'ಚಾಲುಕ್ಯ ರಾಜವಂಶದ ವೈಭವ' : 'Splendor of the Chalukya dynasty',
      'Hoysala': currentLang === 'kn' ? 'ಹೊಯ್ಸಳ ಸಾಮ್ರಾಜ್ಯದ ಶ್ರೀ' : 'Glory of the Hoysala empire',
      'Karnata-F-Kittel-Font': currentLang === 'kn' ? 'ಬಾಸೆಲ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ 1836' : 'Basel Mission Press 1836',
      'Karnata-German-Mission-Press': currentLang === 'kn' ? 'ಜರ್ಮನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ' : 'German Mission Press',
      'Karnata-Wesleyan-Mission-Press': currentLang === 'kn' ? 'ವೆಸ್ಲಿಯನ್ ಮಿಷನ್ ಮುದ್ರಣಾಲಯ' : 'Wesleyan Mission Press'
    };
    return texts[family] || (currentLang === 'kn' ? 'ಕನ್ನಡ ಲಿಪಿಯ ಸೊಬಗು' : 'Beauty of Kannada script');
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatParagraphText(text) {
    return escapeHtml(text).replace(/\n/g, '<br>');
  }

  function updatePreview() {
    var text = textInput.value || (currentLang === 'kn' ? 'ಕನ್ನಡ ಲಿಪಿಯ ಸೊಬಗು' : 'Beauty of Kannada script');
    var size = fontSizeInput.value;
    var lh = lineHeightInput.value;
    var cs = charSpacingInput.value;
    fontSizeLabel.textContent = size + 'px';
    lineHeightLabel.textContent = lh;
    charSpacingLabel.textContent = cs + 'px';
    previewText.innerHTML = formatParagraphText(text);
    previewText.style.fontSize = size + 'px';
    previewText.style.lineHeight = lh;
    previewText.style.letterSpacing = cs + 'px';
  }

  textInput.addEventListener('input', updatePreview);
  fontSizeInput.addEventListener('input', updatePreview);
  lineHeightInput.addEventListener('input', updatePreview);
  charSpacingInput.addEventListener('input', updatePreview);

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

  function getExportContent() {
    return currentMode === 'paragraph' ? captureParagraphExport() : previewBox;
  }

  function captureParagraphExport() {
    var label = modalFontSelect.options[modalFontSelect.selectedIndex].dataset.label || currentFontName;
    var size = fontSizeInput.value;
    var lh = lineHeightInput.value;
    var cs = charSpacingInput.value;
    var bg = previewBox.style.background || '#ffffff';
    var textColor = previewText.style.color || '#1a1a2e';
    var text = textInput.value || translations[currentLang].paraFallback;

    var holder = document.getElementById('ksParaExportHolder');
    if (!holder) {
      holder = document.createElement('div');
      holder.id = 'ksParaExportHolder';
      holder.style.cssText = 'position:absolute;left:-9999px;top:0;';
      document.body.appendChild(holder);
    }
    holder.innerHTML =
      '<div class="ks-pg-export-content" style="font-family:\'' + currentFontName + '\', serif; font-size:' + size + 'px; padding:40px 50px; background:' + bg + '; border-radius:12px; text-align:center; max-width:700px; line-height:' + lh + '; letter-spacing:' + cs + 'px; color:' + textColor + ';">' +
        '<p style="margin:0; word-break:break-word;">' + formatParagraphText(text) + '</p>' +
        '<div style="margin-top:20px; padding-top:15px; border-top:1px solid #e0e0e0; font-size:12px; color:#888; font-family:Arial, sans-serif;">' +
          label + ' | fonts.sanchaya.net' +
        '</div>' +
      '</div>';
    return holder.querySelector('.ks-pg-export-content');
  }

  downloadBtn.addEventListener('click', function() {
    document.fonts.ready.then(function() {
      html2canvas(getExportContent(), {
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
      html2canvas(getExportContent(), {
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

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('ks-modal-open')) {
      closeModal();
    } else if (e.key === 'Escape' && paraModal.classList.contains('ks-modal-open')) {
      closeParaModal();
    }
  });

  applyLanguage('kn');
})();
