(function () {
  'use strict';

  var translateLink = document.querySelector('#translate-page');
  if (translateLink) {
    function translateToEnglish() {
      var selector = document.querySelector('.goog-te-combo');
      if (!selector) return false;
      selector.value = 'en';
      selector.dispatchEvent(new Event('change'));
      translateLink.classList.remove('is-loading');
      return true;
    }

    translateLink.addEventListener('click', function (event) {
      event.preventDefault();
      if (translateToEnglish()) return;
      translateLink.classList.add('is-loading');
      window.setTimeout(translateToEnglish, 800);
    });

    window.googleTranslateElementInit = function () {
      if (!(window.google && window.google.translate)) return;
      new window.google.translate.TranslateElement({
        pageLanguage: 'zh-CN',
        includedLanguages: 'en',
        autoDisplay: false
      }, 'google_translate_element');
      translateLink.classList.remove('is-loading');
    };
  }

  var statistics = document.querySelector('.site-statistics');
  if (!statistics) return;

  var values = statistics.querySelectorAll('[id^="busuanzi_value_"]');
  function refreshStatistics() {
    var hasValue = Array.prototype.some.call(values, function (value) {
      return value.textContent.trim().length > 0;
    });
    statistics.classList.toggle('is-ready', hasValue);
  }
  refreshStatistics();
  new MutationObserver(refreshStatistics).observe(statistics, { childList: true, characterData: true, subtree: true });
}());
