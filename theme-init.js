/**
 * Visual themes: original | apple | google
 * Appearance: light | dark (persisted separately)
 * Sidebar drawer (mobile) + optional section label sync (index)
 */
(function () {
  var root = document.documentElement;

  var THEME_COLORS = {
    original: { light: '#f4f6f9', dark: '#0c0f14' },
    apple: { light: '#f5f5f7', dark: '#000000' },
    google: { light: '#f8f9fa', dark: '#131314' }
  };

  function syncMeta() {
    var m = document.getElementById('theme-color-meta');
    if (!m) return;
    var v = root.getAttribute('data-visual') || 'original';
    var a = root.getAttribute('data-appearance') || 'dark';
    var row = THEME_COLORS[v] || THEME_COLORS.original;
    m.content = row[a] || row.dark;
  }

  function setVisual(val) {
    if (val !== 'original' && val !== 'apple' && val !== 'google') val = 'original';
    root.setAttribute('data-visual', val);
    try {
      localStorage.setItem('visualTheme', val);
    } catch (e) {}
    syncMeta();
  }

  function setAppearance(isLight) {
    root.setAttribute('data-appearance', isLight ? 'light' : 'dark');
    try {
      localStorage.setItem('appearance', isLight ? 'light' : 'dark');
    } catch (e) {}
    syncMeta();
  }

  function syncThemeToggle() {
    var light = root.getAttribute('data-appearance') === 'light';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', light ? 'true' : 'false');
      btn.title = light ? 'Switch to dark appearance' : 'Switch to light appearance';
      var vh = btn.querySelector('.visually-hidden');
      if (vh) vh.textContent = light ? 'Switch to dark appearance' : 'Switch to light appearance';
    });
  }

  function syncThemeSelect() {
    var sel = document.getElementById('visual-theme');
    if (!sel) return;
    var v = root.getAttribute('data-visual') || 'original';
    sel.value = v;
  }

  function getDrawerToggle() {
    return document.querySelector('.site-topbar .nav-toggle');
  }

  function closeDrawer() {
    var sidebar = document.getElementById('site-sidebar');
    var backdrop = document.getElementById('site-drawer-backdrop');
    var toggle = getDrawerToggle();
    if (sidebar) sidebar.classList.remove('is-open');
    if (backdrop) {
      backdrop.classList.remove('is-visible');
      backdrop.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('site-drawer-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  }

  function openDrawer() {
    var sidebar = document.getElementById('site-sidebar');
    var backdrop = document.getElementById('site-drawer-backdrop');
    var toggle = getDrawerToggle();
    if (sidebar) sidebar.classList.add('is-open');
    if (backdrop) {
      backdrop.classList.add('is-visible');
      backdrop.setAttribute('aria-hidden', 'false');
    }
    document.body.classList.add('site-drawer-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
    }
  }

  function toggleDrawer() {
    var sidebar = document.getElementById('site-sidebar');
    if (!sidebar) return;
    if (sidebar.classList.contains('is-open')) closeDrawer();
    else openDrawer();
  }

  function initDrawer() {
    var toggle = getDrawerToggle();
    var backdrop = document.getElementById('site-drawer-backdrop');
    var nav = document.getElementById('site-nav');

    if (toggle) {
      toggle.addEventListener('click', function () {
        toggleDrawer();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeDrawer();
      });
    }

    if (nav) {
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          closeDrawer();
        });
      });
      nav.querySelectorAll('select').forEach(function (s) {
        s.addEventListener('change', function () {
          closeDrawer();
        });
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    var wide = window.matchMedia('(min-width: 52rem)');
    function onWideChange() {
      if (wide.matches) closeDrawer();
    }
    if (wide.addEventListener) wide.addEventListener('change', onWideChange);
    else wide.addListener(onWideChange);
  }

  function topbarBottomOffset() {
    var topbar = document.querySelector('.site-topbar');
    if (!topbar) return 72;
    var r = topbar.getBoundingClientRect();
    return r.bottom + 6;
  }

  function initSectionSpy() {
    var labelEl = document.getElementById('current-section-label');
    var main = document.getElementById('main');
    if (!labelEl || !main) return;

    var sections = Array.prototype.slice.call(main.querySelectorAll('section[data-nav-label]'));
    if (!sections.length) return;

    var nav = document.getElementById('site-nav');

    function sync() {
      var offset = topbarBottomOffset();
      var active = sections[0];
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= offset) active = sections[i];
      }
      var id = active.id;
      var label = active.getAttribute('data-nav-label') || '';
      labelEl.textContent = label;

      if (nav) {
        nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
          a.removeAttribute('aria-current');
        });
        var cur = nav.querySelector('a[href="#' + id + '"]');
        if (cur) cur.setAttribute('aria-current', 'location');
      }
    }

    sync();

    var ticking = false;
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(function () {
            sync();
            ticking = false;
          });
        }
      },
      { passive: true }
    );

    window.addEventListener('resize', sync);
  }

  function syncSiteVersion() {
    var el = document.getElementById('site-version');
    if (!el) return;
    var v = typeof window.__SITE_VERSION__ === 'string' ? window.__SITE_VERSION__.trim() : '';
    if (!v) return;
    el.textContent = 'v' + v;
    el.setAttribute('title', 'Site release ' + v);
  }

  function initThemeControls() {
    syncSiteVersion();
    syncThemeSelect();
    syncThemeToggle();
    syncMeta();

    var sel = document.getElementById('visual-theme');
    if (sel) {
      sel.addEventListener('change', function () {
        setVisual(this.value);
        syncThemeSelect();
      });
    }

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var light = root.getAttribute('data-appearance') === 'light';
        setAppearance(!light);
        syncThemeToggle();
      });
    });

    initDrawer();
    initSectionSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeControls);
  } else {
    initThemeControls();
  }
})();
