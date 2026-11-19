/**
 * Load, merge and resolve the DTCG token files in tokens/.
 *
 * Dependency-free. Reads tokens/foundation.tokens.json and tokens/app.tokens.json,
 * merges them into one tree (a file may add to a group the other defines, but may
 * not redefine a token), resolves {alias} references, and formats values as CSS.
 *
 * Naming rule shared by every output:
 *   CSS custom property = "--" + path joined with "-", with
 *   - a leading "theme.light" / "theme.dark" removed (those are the two mode sets), and
 *   - a trailing "default" segment dropped (app.surface.default -> --app-surface).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const TOKEN_FILES = ['tokens/foundation.tokens.json', 'tokens/app.tokens.json'];
const MODES = ['light', 'dark'];
const EM_EXT = 'uk.co.protectline.css-unit';

const isToken = (node) => node && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, '$value');

function readJson(rel) {
  const file = path.join(ROOT, rel);
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new Error(`${rel}: ${err.message}`);
  }
}

function merge(into, from, trail) {
  for (const [key, value] of Object.entries(from)) {
    if (key.startsWith('$')) {
      if (!(key in into)) into[key] = value;
      continue;
    }
    const here = trail.concat(key);
    if (!(key in into)) {
      into[key] = value;
    } else if (isToken(into[key]) || isToken(value)) {
      throw new Error(`Token ${here.join('.')} is defined in more than one file`);
    } else {
      merge(into[key], value, here);
    }
  }
}

/** Walk the tree; yields { path, token, inheritedType }. */
function* walk(node, trail = [], inheritedType) {
  const groupType = node.$type || inheritedType;
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$') || value === null || typeof value !== 'object') continue;
    const here = trail.concat(key);
    if (isToken(value)) yield { path: here, token: value, inheritedType: groupType };
    else yield* walk(value, here, groupType);
  }
}

function load() {
  const tree = {};
  for (const rel of TOKEN_FILES) merge(tree, readJson(rel), []);
  const byPath = new Map();
  for (const entry of walk(tree)) byPath.set(entry.path.join('.'), entry);

  const resolving = new Set();
  function resolve(key) {
    const entry = byPath.get(key);
    if (!entry) throw new Error(`Unknown token reference {${key}}`);
    if (entry.resolved) return entry.resolved;
    if (resolving.has(key)) throw new Error(`Circular reference at {${key}}`);
    resolving.add(key);
    const raw = entry.token.$value;
    let result;
    if (typeof raw === 'string' && /^\{[^}]+\}$/.test(raw)) {
      const target = raw.slice(1, -1);
      const t = resolve(target);
      result = { type: entry.token.$type || entry.inheritedType || t.type, value: t.value, alias: target, ext: entry.token.$extensions || t.ext };
    } else {
      const type = entry.token.$type || entry.inheritedType;
      if (!type) throw new Error(`Token ${key} has no $type`);
      result = { type, value: raw, alias: null, ext: entry.token.$extensions };
    }
    resolving.delete(key);
    entry.resolved = result;
    return result;
  }
  for (const key of byPath.keys()) resolve(key);
  checkColourComponents(byPath);
  checkModeParity(byPath);
  return { tree, byPath };
}

/** In a DTCG colour object, `hex` is authoritative; `components` must agree with it. */
function checkColourComponents(byPath) {
  for (const [key, entry] of byPath) {
    const v = entry.token.$value;
    if (!v || typeof v !== 'object' || !('colorSpace' in v)) continue;
    if (v.colorSpace !== 'srgb') throw new Error(`${key}: only srgb colours are supported`);
    const fromHex = [1, 3, 5].map((i) => parseInt(v.hex.slice(i, i + 2), 16) / 255);
    v.components.forEach((c, i) => {
      if (Math.abs(c - fromHex[i]) > 0.001) throw new Error(`${key}: components ${JSON.stringify(v.components)} do not match hex ${v.hex}`);
    });
  }
}

/** theme.light and theme.dark must define exactly the same keys. */
function checkModeParity(byPath) {
  const sets = Object.fromEntries(MODES.map((m) => [m, new Set()]));
  for (const key of byPath.keys()) {
    const m = key.match(/^theme\.(light|dark)\.(.+)$/);
    if (m) sets[m[1]].add(m[2]);
  }
  const onlyLight = [...sets.light].filter((k) => !sets.dark.has(k));
  const onlyDark = [...sets.dark].filter((k) => !sets.light.has(k));
  if (onlyLight.length || onlyDark.length) {
    throw new Error(`Light and dark sets differ. Only in light: ${onlyLight.join(', ') || '-'}; only in dark: ${onlyDark.join(', ') || '-'}`);
  }
}

// ── naming ──
function cssName(key) {
  let parts = key.split('.');
  if (parts[0] === 'theme' && MODES.includes(parts[1])) parts = parts.slice(2);
  if (parts.length > 1 && parts[parts.length - 1] === 'default') parts = parts.slice(0, -1);
  return '--' + parts.join('-');
}

// ── value formatting ──
const round = (n) => +n.toFixed(4);
function colourCss(v) {
  if (v.alpha === undefined || v.alpha === 1) return v.hex;
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(v.hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${round(v.alpha)})`;
}
const dimCss = (d) => (d.value === 0 ? '0' : `${round(d.value)}${d.unit}`);
const EASINGS = { ease: [0.25, 0.1, 0.25, 1], linear: [0, 0, 1, 1], 'ease-in': [0.42, 0, 1, 1], 'ease-out': [0, 0, 0.58, 1], 'ease-in-out': [0.42, 0, 0.58, 1] };
function easingCss(arr) {
  for (const [name, e] of Object.entries(EASINGS)) if (e.every((x, i) => x === arr[i])) return name;
  return `cubic-bezier(${arr.join(', ')})`;
}
function familyCss(list) {
  const generic = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-monospace', 'ui-sans-serif', 'ui-serif']);
  return (Array.isArray(list) ? list : [list]).map((f) => (generic.has(f) ? f : `'${f}'`)).join(', ');
}

/** Format a resolved token's value as the final CSS string (no var()). */
function formatValue({ type, value, ext }) {
  switch (type) {
    case 'color': return colourCss(value);
    case 'dimension': return dimCss(value);
    case 'number': return ext && ext[EM_EXT] === 'em' ? (value === 0 ? '0' : `${value}em`) : String(value);
    case 'fontWeight': return String(value);
    case 'fontFamily': return familyCss(value);
    case 'duration': return `${value.value}${value.unit}`;
    case 'shadow': {
      const list = Array.isArray(value) ? value : [value];
      if (!list.length) return 'none';
      return list.map((s) => [s.inset ? 'inset' : null, dimCss(s.offsetX), dimCss(s.offsetY), dimCss(s.blur), s.spread && s.spread.value ? dimCss(s.spread) : null, colourCss(s.color)].filter(Boolean).join(' ')).join(', ');
    }
    case 'transition': {
      const d = value.duration;
      const delay = value.delay && value.delay.value ? ` ${value.delay.value}${value.delay.unit}` : '';
      return `${d.value}${d.unit} ${easingCss(value.timingFunction)}${delay}`;
    }
    default: throw new Error(`No CSS formatter for $type ${type}`);
  }
}

/** The CSS for one token: var() for an alias, the literal value otherwise. */
function cssValue(entry) {
  const r = entry.resolved;
  return r.alias ? `var(${cssName(r.alias)})` : formatValue(r);
}

module.exports = { ROOT, MODES, load, cssName, cssValue, formatValue, isToken };
