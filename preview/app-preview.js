/**
 * Shared behaviour for the app-layer preview pages.
 *
 * - ?theme=dark or ?theme=light forces a theme (used for headless renders);
 *   otherwise the OS setting decides. The resolved theme is written to
 *   <html data-theme> so the page can swap the logo.
 * - [data-theme-toggle] (a .pl-switch) flips between light and dark.
 * - [data-contrast="--fg on --bg"] elements get a live WCAG ratio, recomputed
 *   whenever the theme changes, from the values the browser actually resolved.
 *
 * Load in <head> without defer, so the theme is set before first paint.
 */
(function () {
  'use strict';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var forced = (location.search.match(/[?&]theme=(light|dark)/) || [])[1];

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) toggle.checked = theme === 'dark';
    updateContrast();
  }

  setTheme(forced || (media && media.matches ? 'dark' : 'light'));

  // ── colour maths (WCAG 2.x) ──
  function parse(str) {
    str = String(str).trim();
    var m = str.match(/^#([0-9a-f]{6})$/i);
    if (m) return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16), a: 1 };
    m = str.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)$/i);
    if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
    return null;
  }
  function over(fg, bg) {
    return { r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 };
  }
  function lum(c) {
    function ch(v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
  }
  function ratio(a, b) {
    var la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  function hex(c) {
    return '#' + [c.r, c.g, c.b].map(function (v) { return Math.round(v).toString(16).padStart(2, '0'); }).join('');
  }
  function token(name) {
    return getComputedStyle(root).getPropertyValue(name).trim();
  }
  function colour(expr) {
    // "--a over --b": composite a translucent token over the one beneath it.
    var parts = expr.split(' over ');
    var c = parse(token(parts[parts.length - 1].trim()));
    for (var i = parts.length - 2; i >= 0 && c; i--) {
      var layer = parse(token(parts[i].trim()));
      c = layer ? over(layer, c) : null;
    }
    if (c && c.a < 1) {
      var base = parse(token('--app-surface'));
      c = base ? over(c, base) : null;
    }
    return c;
  }

  function updateContrast() {
    var nodes = document.querySelectorAll('[data-contrast]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var spec = el.getAttribute('data-contrast').split(' on ');
      var fg = colour(spec[0]);
      var bg = colour(spec[1]);
      if (!fg || !bg) { el.textContent = '?'; continue; }
      var r = ratio(fg, bg);
      var min = +(el.getAttribute('data-min') || 4.5);
      el.textContent = r.toFixed(2) + ':1';
      el.setAttribute('data-pass', r >= min ? 'yes' : 'no');
      el.title = hex(fg) + ' on ' + hex(bg) + ' — needs ' + min + ':1';
    }
    var vals = document.querySelectorAll('[data-token-value]');
    for (var j = 0; j < vals.length; j++) {
      var c = colour(vals[j].getAttribute('data-token-value'));
      var raw = parse(token(vals[j].getAttribute('data-token-value')));
      vals[j].textContent = raw && raw.a < 1 ? token(vals[j].getAttribute('data-token-value')).replace(/\s+/g, ' ') : (c ? hex(c).toUpperCase() : '');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.checked = root.getAttribute('data-theme') === 'dark';
      toggle.addEventListener('change', function () { setTheme(toggle.checked ? 'dark' : 'light'); });
    }
    if (media && !forced && media.addEventListener) {
      media.addEventListener('change', function (e) { setTheme(e.matches ? 'dark' : 'light'); });
    }
    updateContrast();
  });
  // Stylesheets are only guaranteed to have applied by load.
  window.addEventListener('load', updateContrast);

  // ?measure=1: record the full page height on <html data-height> once fonts have
  // loaded. Used only by headless renders, which need the height up front.
  if (/[?&]measure=1/.test(location.search)) {
    window.addEventListener('load', function () {
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () {
        setTimeout(function () { root.setAttribute('data-height', Math.ceil(document.documentElement.scrollHeight)); }, 300);
      });
    });
  }

  window.plPreview = { setTheme: setTheme, updateContrast: updateContrast, ratio: ratio, parse: parse, colour: colour, hex: hex };
})();
