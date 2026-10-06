#!/usr/bin/env node
/**
 * WCAG 2.x contrast report for the app layer, light and dark.
 *
 *   node scripts/contrast-report.js             print the table, exit 1 on any failure
 *   node scripts/contrast-report.js --markdown  print the table as Markdown
 *
 * Every pair below is a real pairing used by components/app-components.css.
 * Thresholds:
 *   text  4.5:1  — normal-size text (WCAG 1.4.3)
 *   ui    3:1    — boundaries and graphics needed to see a control or its state (WCAG 1.4.11):
 *                  input borders, the focus ring, status solid fills, the selected bar
 *   info  none   — decorative borders and disabled text, reported for reference only
 *
 * Translucent tokens (hover, pressed) are composited over the surface they sit on before
 * measuring, so the ratio is the one a reader actually sees. Dependency-free.
 */
'use strict';

const { load, formatValue } = require('./lib/tokens');
const { over, contrast, parseColour, toHex } = require('./lib/colour');

const MIN = { text: 4.5, ui: 3, info: 0 };

const SURFACES = ['app.surface.canvas', 'app.surface.default', 'app.surface.raised', 'app.surface.sunken', 'app.surface.selected'];
const STATUSES = ['info', 'success', 'warning', 'danger', 'attention', 'neutral'];

/** [kind, foreground, background, note] — a background may be "a over b" for a translucent layer. */
function pairs() {
  const list = [];
  const text = (fg, bg, note) => list.push(['text', fg, bg, note]);
  const ui = (fg, bg, note) => list.push(['ui', fg, bg, note]);
  const info = (fg, bg, note) => list.push(['info', fg, bg, note]);

  for (const t of ['app.text.default', 'app.text.muted', 'app.text.subtle']) {
    for (const s of SURFACES) text(t, s);
    text(t, 'app.surface.hover over app.surface.default', 'hovered row');
    text(t, 'app.surface.hover over app.surface.raised', 'hovered menu item');
  }
  for (const s of ['app.surface.default', 'app.surface.canvas', 'app.surface.raised', 'app.surface.selected']) text('app.text.link', s);
  text('app.text.default', 'app.accent.subtle', 'user chat bubble');
  text('app.text.muted', 'app.accent.subtle', 'chat bubble meta');
  text('app.text.inverse', 'app.surface.inverse', 'tooltip, sidebar');
  for (const a of ['app.accent.default', 'app.accent.hover', 'app.accent.pressed']) text('app.text.on-accent', a, 'primary button');
  text('app.selection.text', 'app.selection.bg', '::selection');
  text('app.destructive.text', 'app.destructive.default', 'destructive button');
  for (const s of ['app.surface.default', 'app.surface.raised', 'app.surface.sunken']) ui('app.destructive.default', s, 'destructive fill');
  ui('color.navy', 'app.illustration.plate', 'Hugo outline on plate');
  for (const st of STATUSES) {
    const p = `app.status.${st}`;
    text(`${p}.fg`, `${p}.bg`, 'pill, alert');
    text(`${p}.fg`, 'app.surface.default', 'icon, inline text');
    text(`${p}.fg`, 'app.surface.raised', 'toast icon');
    text('app.text.default', `${p}.bg`, 'alert body');
    text('app.text.muted', `${p}.bg`, 'alert detail');
    text(`${p}.on-solid`, `${p}.solid`, 'solid badge');
    ui(`${p}.solid`, 'app.surface.default', 'solid fill vs surface');
    ui(`${p}.solid`, 'app.surface.canvas');
    ui(`${p}.solid`, 'app.surface.raised');
    info(`${p}.border`, `${p}.bg`, 'decorative');
  }
  for (const s of ['app.surface.default', 'app.surface.canvas', 'app.surface.raised']) ui('app.border.strong', s, 'input, checkbox, radio');
  ui('app.border.strong', 'app.surface.hover over app.surface.default', 'checkbox in hovered row');
  for (const s of ['app.surface.default', 'app.surface.canvas', 'app.surface.raised', 'app.surface.selected', 'app.surface.sunken']) ui('app.focus.ring', s, 'focus ring');
  for (const s of ['app.surface.default', 'app.surface.canvas', 'app.surface.raised']) ui('app.accent.default', s, 'primary fill, checked box');
  ui('app.accent.strong', 'app.surface.selected', 'selected-row bar');
  ui('app.accent.strong', 'app.surface.default', 'active tab bar, switch track');
  ui('app.accent.strong', 'app.surface.sunken', 'progress fill on track');
  ui('app.surface.default', 'app.accent.strong', 'switch thumb on track');
  ui('app.text.on-accent', 'app.accent.default', 'checkbox tick');
  info('app.border.default', 'app.surface.default', 'panel outline (decorative)');
  info('app.border.subtle', 'app.surface.default', 'row divider (decorative)');
  info('app.text.disabled', 'app.surface.default', 'disabled (exempt)');
  return list;
}

function main() {
  const markdown = process.argv.includes('--markdown');
  const { byPath } = load();
  const value = (mode, key) => {
    const full = byPath.get(`theme.${mode}.${key}`) || byPath.get(key);
    if (!full) throw new Error(`Unknown token ${key}`);
    return formatValue(full.resolved);
  };
  const colourOf = (mode, expr) => {
    const parts = expr.split(' over ');
    let c = parseColour(value(mode, parts[parts.length - 1]));
    for (let i = parts.length - 2; i >= 0; i--) c = over(parseColour(value(mode, parts[i])), c);
    if (c.a < 1) c = over(c, parseColour(value(mode, 'app.surface.default')));
    return c;
  };
  const short = (k) => k.replace(/app\./g, '').replace(/\.default\b/g, '');

  const rows = [];
  let failures = 0;
  for (const mode of ['light', 'dark']) {
    for (const [kind, fg, bg, note] of pairs()) {
      const f = colourOf(mode, fg);
      const b = colourOf(mode, bg);
      const ratio = contrast(f, b);
      const pass = ratio + 1e-9 >= MIN[kind];
      if (!pass) failures++;
      rows.push({ mode, kind, fg: short(fg), bg: short(bg), fgHex: toHex(f), bgHex: toHex(b), ratio, min: MIN[kind], result: kind === 'info' ? 'info' : pass ? 'pass' : 'FAIL', note: note || '' });
    }
  }

  if (markdown) {
    console.log('| Mode | Kind | Foreground | Background | Ratio | Min | Result |');
    console.log('|---|---|---|---|---:|---:|---|');
    for (const r of rows) console.log(`| ${r.mode} | ${r.kind} | \`${r.fg}\` ${r.fgHex} | \`${r.bg}\` ${r.bgHex} | ${r.ratio.toFixed(2)} | ${r.min ? r.min + ':1' : '—'} | ${r.result} |`);
  } else {
    const w = { fg: Math.max(...rows.map((r) => r.fg.length)), bg: Math.max(...rows.map((r) => r.bg.length)) };
    console.log(`${'mode'.padEnd(6)}${'kind'.padEnd(6)}${'foreground'.padEnd(w.fg + 10)}${'background'.padEnd(w.bg + 10)}${'ratio'.padStart(7)}${'min'.padStart(6)}  result  note`);
    for (const r of rows) {
      console.log(`${r.mode.padEnd(6)}${r.kind.padEnd(6)}${(r.fg + ' ' + r.fgHex).padEnd(w.fg + 10)}${(r.bg + ' ' + r.bgHex).padEnd(w.bg + 10)}${r.ratio.toFixed(2).padStart(7)}${(r.min ? r.min.toFixed(1) : '-').padStart(6)}  ${r.result.padEnd(6)}  ${r.note}`);
    }
  }
  const counted = rows.filter((r) => r.kind !== 'info');
  console.log(`\n${counted.length - failures}/${counted.length} required pairs pass (${rows.length - counted.length} informational rows).`);
  if (failures) {
    console.error(`${failures} pair(s) below the minimum.`);
    process.exit(1);
  }
}

main();
