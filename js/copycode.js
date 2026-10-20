/* Copy code without external clipboard or notification dependencies. */
(function () {
  'use strict';
  var script = document.currentScript;
  var successText = script && script.getAttribute('successtext') || 'Copied!';

  function fallbackCopy(text) {
    var focused = document.activeElement;
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      if (!document.execCommand('copy')) throw new Error('Copy failed');
    } finally {
      textarea.remove();
      if (focused && focused.focus) focused.focus();
    }
  }

  function copy(text) {
    if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () {
        fallbackCopy(text);
      });
    }
    try {
      fallbackCopy(text);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  document.querySelectorAll('.highlight .code pre').forEach(function (pre) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn-copy';
    button.title = 'Copy code';
    button.setAttribute('aria-label', 'Copy code');
    button.innerHTML = '<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path></svg>';
    pre.parentNode.insertBefore(button, pre);

    var status = document.createElement('span');
    status.className = 'copy-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    pre.parentNode.appendChild(status);
    var timeout;

    button.addEventListener('click', function () {
      clearTimeout(timeout);
      status.textContent = '';
      button.disabled = true;
      copy(pre.textContent).then(function () {
        status.textContent = successText;
      }, function () {
        status.textContent = 'Could not copy. Select the code and copy it manually.';
      }).then(function () {
        button.disabled = false;
        timeout = setTimeout(function () { status.textContent = ''; }, 2500);
      });
    });
  });
}());
