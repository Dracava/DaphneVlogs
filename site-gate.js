(function () {
  var STORAGE_KEY = 'daphnevlogs_gate_ok';
  var PASSWORD = 'tobecontinued';

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
  } catch (e) {
    return;
  }

  function unlock() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {}
    document.documentElement.classList.remove('site-gate-pending');
    document.documentElement.classList.add('site-gate-done');
  }

  var overlay = document.createElement('div');
  overlay.className = 'site-gate';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'site-gate-heading');
  overlay.innerHTML =
    '<div class="site-gate-panel">' +
    '<img class="site-gate-logo" src="images/Logo DV.png" alt="" width="56" height="56">' +
    '<h1 id="site-gate-heading" class="site-gate-title">DaphneVlogs</h1>' +
    '<p class="site-gate-intro">Voer het wachtwoord in om door te gaan.</p>' +
    '<form class="site-gate-form" autocomplete="current-password">' +
    '<label class="site-gate-label" for="site-gate-password">Wachtwoord</label>' +
    '<input id="site-gate-password" class="site-gate-input" type="password" name="password" required autocomplete="current-password">' +
    '<p class="site-gate-error" aria-live="polite"></p>' +
    '<button type="submit" class="site-gate-submit">Doorgaan</button>' +
    '</form>' +
    '</div>';

  document.body.insertBefore(overlay, document.body.firstChild);

  var form = overlay.querySelector('.site-gate-form');
  var input = overlay.querySelector('#site-gate-password');
  var err = overlay.querySelector('.site-gate-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = (input.value || '').trim();
    if (v === PASSWORD) {
      overlay.remove();
      unlock();
      return;
    }
    err.textContent = 'Dat wachtwoord klopt niet. Probeer opnieuw.';
    input.focus();
    input.select();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      input.focus();
    });
  } else {
    input.focus();
  }
})();
