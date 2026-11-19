/**
 * Charts and colour-vision strips for preview/data-viz.html.
 *
 * Everything is drawn from the CSS custom properties, so a theme switch
 * re-colours the charts; the strips and ΔE figures are recomputed from the
 * values the browser resolved. Plain DOM and SVG, no libraries. Labels are
 * set with textContent.
 */
(function () {
  'use strict';
  var SVG = 'http://www.w3.org/2000/svg';
  var root = document.documentElement;
  var tip;

  function token(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  function el(tag, attrs, parent) {
    var n = document.createElementNS(SVG, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function html(tag, cls, parent, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    if (parent) parent.appendChild(n);
    return n;
  }

  // ── colour maths (mirrors scripts/lib/colour.js) ──
  function rgb(hex) { var h = hex.replace('#', ''); return [0, 2, 4].map(function (i) { return parseInt(h.slice(i, i + 2), 16) / 255; }); }
  function s2l(c) { return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
  function l2s(c) { c = Math.max(0, Math.min(1, c)); return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; }
  function lum(hex) { var l = rgb(hex).map(s2l); return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2]; }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  var M = {
    protanopia: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
    deuteranopia: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
    tritanopia: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.3039]]
  };
  function simLin(hex, kind) {
    var v = rgb(hex).map(s2l);
    if (!kind) return v;
    return M[kind].map(function (r) { return Math.max(0, Math.min(1, r[0] * v[0] + r[1] * v[1] + r[2] * v[2])); });
  }
  function simHex(hex, kind) {
    return '#' + simLin(hex, kind).map(function (c) { return Math.round(l2s(c) * 255).toString(16).padStart(2, '0'); }).join('');
  }
  function lab(l) {
    var X = (0.4124564 * l[0] + 0.3575761 * l[1] + 0.1804375 * l[2]) / 0.95047;
    var Y = 0.2126729 * l[0] + 0.7151522 * l[1] + 0.072175 * l[2];
    var Z = (0.0193339 * l[0] + 0.119192 * l[1] + 0.9503041 * l[2]) / 1.08883;
    function f(t) { return t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116; }
    return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
  }
  function de00(p, q) {
    var rad = Math.PI / 180, L1 = p[0], a1 = p[1], b1 = p[2], L2 = q[0], a2 = q[1], b2 = q[2];
    var C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2), Cm = (C1 + C2) / 2;
    var G = 0.5 * (1 - Math.sqrt(Math.pow(Cm, 7) / (Math.pow(Cm, 7) + Math.pow(25, 7))));
    var a1p = (1 + G) * a1, a2p = (1 + G) * a2, C1p = Math.hypot(a1p, b1), C2p = Math.hypot(a2p, b2);
    function hp(x, y) { return x === 0 && y === 0 ? 0 : ((Math.atan2(y, x) / rad) + 360) % 360; }
    var h1 = hp(a1p, b1), h2 = hp(a2p, b2), dL = L2 - L1, dC = C2p - C1p, dh = 0;
    if (C1p * C2p !== 0) { dh = h2 - h1; if (dh > 180) dh -= 360; else if (dh < -180) dh += 360; }
    var dH = 2 * Math.sqrt(C1p * C2p) * Math.sin(dh / 2 * rad), Lm = (L1 + L2) / 2, Cmp = (C1p + C2p) / 2, hm = h1 + h2;
    if (C1p * C2p !== 0) hm = Math.abs(h1 - h2) > 180 ? (h1 + h2 < 360 ? (h1 + h2 + 360) / 2 : (h1 + h2 - 360) / 2) : (h1 + h2) / 2;
    var T = 1 - 0.17 * Math.cos((hm - 30) * rad) + 0.24 * Math.cos(2 * hm * rad) + 0.32 * Math.cos((3 * hm + 6) * rad) - 0.2 * Math.cos((4 * hm - 63) * rad);
    var dT = 30 * Math.exp(-Math.pow((hm - 275) / 25, 2)), RC = 2 * Math.sqrt(Math.pow(Cmp, 7) / (Math.pow(Cmp, 7) + Math.pow(25, 7)));
    var SL = 1 + 0.015 * Math.pow(Lm - 50, 2) / Math.sqrt(20 + Math.pow(Lm - 50, 2)), SC = 1 + 0.045 * Cmp, SH = 1 + 0.015 * Cmp * T, RT = -Math.sin(2 * dT * rad) * RC;
    return Math.sqrt(Math.pow(dL / SL, 2) + Math.pow(dC / SC, 2) + Math.pow(dH / SH, 2) + RT * (dC / SC) * (dH / SH));
  }
  function dE(a, b, kind) { return de00(lab(simLin(a, kind)), lab(simLin(b, kind))); }
  function inkFor(fill) {
    var ink = token('--app-text'), inv = token('--app-text-inverse');
    return contrast(fill, ink) >= contrast(fill, inv) ? ink : inv;
  }

  // ── tooltip ──
  function showTip(evt, title, rows) {
    if (!tip) tip = html('div', 'vz-tip', document.body);
    tip.textContent = '';
    html('div', 'vz-tip__title', tip, title);
    rows.forEach(function (r) {
      var row = html('div', 'vz-tip__row', tip);
      var key = html('span', 'vz-tip__key', row);
      key.style.background = r.colour;
      html('span', 'vz-tip__value', row, r.value);
      html('span', 'vz-tip__label', row, r.label);
    });
    var box = evt.target.getBoundingClientRect();
    var x = evt.clientX !== undefined && evt.type !== 'focus' ? evt.clientX : box.left + box.width / 2;
    var y = evt.clientY !== undefined && evt.type !== 'focus' ? evt.clientY : box.top;
    tip.style.left = Math.min(window.innerWidth - tip.offsetWidth - 8, Math.max(8, x + 12)) + 'px';
    tip.style.top = Math.max(8, y - tip.offsetHeight - 12) + window.scrollY + 'px';
    tip.classList.add('is-on');
  }
  function hideTip() { if (tip) tip.classList.remove('is-on'); }
  function hover(node, title, rows) {
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'img');
    node.setAttribute('aria-label', title + ': ' + rows.map(function (r) { return r.label + ' ' + r.value; }).join(', '));
    ['pointermove', 'focus'].forEach(function (t) { node.addEventListener(t, function (e) { showTip(e, title, rows); }); });
    ['pointerleave', 'blur'].forEach(function (t) { node.addEventListener(t, hideTip); });
  }

  // Bar path: 4px rounded data end, square at the baseline.
  function columnPath(x, y, w, h, r) {
    r = Math.min(r, w / 2, h);
    return 'M' + x + ',' + (y + h) + 'V' + (y + r) + 'Q' + x + ',' + y + ' ' + (x + r) + ',' + y + 'H' + (x + w - r) + 'Q' + (x + w) + ',' + y + ' ' + (x + w) + ',' + (y + r) + 'V' + (y + h) + 'Z';
  }

  // ── 1. Grouped columns: this agent vs the rest ──
  var WEEKS = ['4 Aug', '11 Aug', '18 Aug', '25 Aug', '1 Sep', '8 Sep', '15 Sep', '22 Sep'];
  var AGENT = [72, 75, 71, 78, 82, 80, 85, 88];
  var REST = [74, 73, 75, 74, 76, 75, 77, 76];

  function drawColumns(host) {
    host.textContent = '';
    var W = host.clientWidth, H = 240, padL = 40, padR = 8, padT = 16, padB = 28;
    var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, class: 'vz-svg', 'aria-hidden': 'false', role: 'group', 'aria-label': 'Pass rate by week' }, host);
    var plotW = W - padL - padR, plotH = H - padT - padB;
    [0, 25, 50, 75, 100].forEach(function (v) {
      var y = padT + plotH - plotH * v / 100;
      el('line', { x1: padL, x2: W - padR, y1: y, y2: y, class: v === 0 ? 'vz-axis' : 'vz-grid' }, svg);
      var t = el('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', class: 'vz-tick' }, svg);
      t.textContent = v + '%';
    });
    var band = plotW / WEEKS.length;
    var bw = Math.max(4, Math.min(16, (band - 14) / 2));
    WEEKS.forEach(function (wk, i) {
      var cx = padL + band * i + band / 2;
      // Slot 1 (navy) is the comparison, slot 2 (pink) the subject — as in the PDF charts.
      [[REST[i], 'vz-s1'], [AGENT[i], 'vz-s2']].forEach(function (s, j) {
        var h = plotH * s[0] / 100, x = j === 0 ? cx - bw - 1 : cx + 1;
        var p = el('path', { d: columnPath(x, padT + plotH - h, bw, h, 4), class: 'vz-mark ' + s[1] }, svg);
        hover(p, wk, [{ colour: token('--viz-cat-2'), value: AGENT[i] + '%', label: 'This agent' }, { colour: token('--viz-cat-1'), value: REST[i] + '%', label: 'The rest' }]);
      });
      if (band > 38 || i % 2 === 0) {
        var t = el('text', { x: cx, y: H - 8, 'text-anchor': 'middle', class: 'vz-tick' }, svg);
        t.textContent = wk;
      }
      if (i === WEEKS.length - 1) {
        var l1 = el('text', { x: cx + bw / 2 + 1, y: padT + plotH - plotH * AGENT[i] / 100 - 6, 'text-anchor': 'middle', class: 'vz-label' }, svg);
        l1.textContent = AGENT[i] + '%';
      }
    });
  }

  // ── 2. Stacked share: how calls ended, by team ──
  var TEAMS = ['Manchester', 'London', 'Customer care', 'Retention', 'Partners'];
  var OUTCOMES = [['Sale', '--viz-cat-1'], ['Callback booked', '--viz-cat-2'], ['Not interested', '--viz-cat-3'], ['No answer', '--viz-cat-4'], ['Other', '--viz-other']];
  var SHARE = [[34, 22, 21, 15, 8], [29, 25, 24, 14, 8], [12, 18, 31, 27, 12], [41, 19, 17, 13, 10], [24, 30, 20, 16, 10]];

  function drawStack(host) {
    host.textContent = '';
    var wrap = html('div', 'vz-stack', host);
    TEAMS.forEach(function (team, r) {
      html('div', 'vz-stack__label', wrap, team);
      var bar = html('div', 'vz-stack__bar', wrap);
      SHARE[r].forEach(function (v, k) {
        var seg = html('div', 'vz-stack__seg', bar);
        var fill = token(OUTCOMES[k][1]);
        seg.style.flexGrow = v;
        seg.style.background = 'var(' + OUTCOMES[k][1] + ')';
        var lbl = html('span', '', seg, v + '%');
        lbl.style.color = inkFor(fill);
        hover(seg, team, [{ colour: fill, value: v + '%', label: OUTCOMES[k][0] }]);
      });
    });
    // Hide labels that do not fit with padding (never clip them).
    requestAnimationFrame(function () {
      wrap.querySelectorAll('.vz-stack__seg span').forEach(function (s) {
        s.style.visibility = s.scrollWidth + 8 <= s.parentElement.clientWidth ? 'visible' : 'hidden';
      });
    });
  }

  // ── 3. Diverging heatmap: difference from the company average ──
  var QUESTIONS = ['Greeting', 'ID check', 'Needs', 'Explains cover', 'Price', 'Objections', 'Next steps', 'Close'];
  var DIFF = [
    [3, -2, 8, 12, -5, 1, 6, 9],
    [-1, 4, -6, -12, 2, -3, 0, -8],
    [5, 9, 14, 7, 11, 16, 3, 2],
    [-4, -9, -2, 1, -14, -18, -7, -3],
    [0, 2, 5, -3, 4, 8, 12, 6]
  ];
  // Whole points. Upper edge of each bin, inclusive; the last bin is open.
  var BIN_TOPS = [-12, -6, -2, 1, 5, 11];
  var BIN_LABELS = ['−12 or less', '−11 to −6', '−5 to −2', '−1 to +1', '+2 to +5', '+6 to +11', '+12 or more'];
  function binOf(v) { for (var i = 0; i < BIN_TOPS.length; i++) if (v <= BIN_TOPS[i]) return i; return BIN_TOPS.length; }

  function drawHeat(host) {
    host.textContent = '';
    var grid = html('div', 'vz-heat', host);
    grid.style.gridTemplateColumns = 'minmax(96px, auto) repeat(' + QUESTIONS.length + ', minmax(44px, 1fr))';
    html('div', 'vz-heat__corner', grid);
    QUESTIONS.forEach(function (q) { html('div', 'vz-heat__col', grid, q); });
    TEAMS.forEach(function (team, r) {
      html('div', 'vz-heat__row', grid, team);
      DIFF[r].forEach(function (v, c) {
        var b = binOf(v), name = '--viz-div-' + (b + 1), fill = token(name);
        var cell = html('div', 'vz-heat__cell', grid, (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v));
        cell.style.background = 'var(' + name + ')';
        cell.style.color = inkFor(fill);
        hover(cell, team + ' · ' + QUESTIONS[c], [{ colour: fill, value: (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' pts', label: 'vs company average' }]);
      });
    });
  }

  function drawHeatLegend(host) {
    host.textContent = '';
    BIN_LABELS.forEach(function (l, i) {
      var item = html('div', 'vz-scale__item', host);
      var sw = html('span', 'vz-scale__swatch', item);
      sw.style.background = 'var(--viz-div-' + (i + 1) + ')';
      html('span', '', item, l);
    });
  }

  // ── 4. Colour-vision strips ──
  var KINDS = [[null, 'Normal vision'], ['protanopia', 'Protanopia'], ['deuteranopia', 'Deuteranopia'], ['tritanopia', 'Tritanopia']];
  function drawCvd(host) {
    host.textContent = '';
    var cat = []; for (var i = 1; i <= 8; i++) cat.push(token('--viz-cat-' + i));
    KINDS.forEach(function (k) {
      var row = html('div', 'vz-cvd__row', host);
      html('div', 'vz-cvd__name', row, k[1]);
      var strip = html('div', 'vz-cvd__strip', row);
      cat.forEach(function (hex) { var s = html('span', '', strip); s.style.background = k[0] ? simHex(hex, k[0]) : hex; });
      var min = Infinity;
      for (var j = 0; j < cat.length - 1; j++) min = Math.min(min, dE(cat[j], cat[j + 1], k[0]));
      var m = html('div', 'vz-cvd__min', row);
      html('span', 'pv-ratio', m, min.toFixed(1)).setAttribute('data-pass', min >= 10 ? 'yes' : 'no');
    });
  }

  function drawSwatches() {
    document.querySelectorAll('[data-viz-hex]').forEach(function (n) {
      var hex = token(n.getAttribute('data-viz-hex'));
      n.textContent = hex.toUpperCase();
    });
    document.querySelectorAll('[data-viz-contrast]').forEach(function (n) {
      var r = contrast(token(n.getAttribute('data-viz-contrast')), token('--app-surface'));
      n.textContent = r.toFixed(2) + ':1';
      n.setAttribute('data-pass', r >= 3 ? 'yes' : 'warn');
    });
  }

  function drawAll() {
    var c = document.getElementById('vz-columns'); if (c) drawColumns(c);
    var s = document.getElementById('vz-stack'); if (s) drawStack(s);
    var h = document.getElementById('vz-heat'); if (h) drawHeat(h);
    var l = document.getElementById('vz-heat-legend'); if (l) drawHeatLegend(l);
    var v = document.getElementById('vz-cvd'); if (v) drawCvd(v);
    drawSwatches();
  }

  window.addEventListener('load', function () {
    drawAll();
    new MutationObserver(drawAll).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(drawAll, 120); });
  });
})();
