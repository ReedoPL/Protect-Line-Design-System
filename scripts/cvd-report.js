#!/usr/bin/env node
/**
 * Colour-vision report for the data-viz palette.
 *
 *   node scripts/cvd-report.js   print the report; exit 1 if a gate fails
 *
 * Simulation: Machado, Oliveira & Fernandes (2009) at severity 1.0 for protanopia,
 * deuteranopia and tritanopia. Difference: CIEDE2000 (ΔE00). OKLab ΔE×100 is printed
 * beside it because the dataviz guidance the palette was checked against is
 * calibrated to that metric.
 *
 * Gates (exit 1 on failure):
 *   categorical — every adjacent pair (slot n vs n+1) ΔE00 >= 10 under normal vision
 *                 and each of the three simulations, in both modes
 *   categorical — the first three slots pairwise ΔE00 >= 10 (scatter and map charts,
 *                 where any two marks can touch, are capped at three series)
 *   sequential  — OKLCH lightness strictly monotonic, adjacent step >= 0.06
 *   diverging   — monotonic out from the midpoint on both arms, and each step >= 10
 *                 ΔE00 from its opposite number in every simulation (the arms never merge)
 * Everything else (all-pairs worst case, status-vs-series distance) is informational.
 */
'use strict';

const { load, formatValue } = require('./lib/tokens');
const { dE00, dEok, oklch, contrast, CVD_KINDS } = require('./lib/colour');

const ADJ_MIN = 10;
const SEQ_MIN_DL = 0.06;
const VISIONS = [undefined, ...CVD_KINDS];
const label = (k) => (k ? k : 'normal');

function main() {
  const { byPath } = load();
  const get = (mode, key) => {
    const e = byPath.get(`theme.${mode}.${key}`) || byPath.get(key);
    if (!e) throw new Error(`Unknown token ${key}`);
    return formatValue(e.resolved);
  };
  const series = (mode, group, n) => Array.from({ length: n }, (_, i) => get(mode, `${group}.${i + 1}`));
  let failed = false;
  const fail = (msg) => { failed = true; console.log(`  FAIL  ${msg}`); };

  for (const mode of ['light', 'dark']) {
    const surface = get(mode, 'app.surface.default');
    const cat = series(mode, 'viz.cat', 8);
    console.log(`\n== Categorical, ${mode} (chart surface ${surface}) ==`);
    console.log('slot  hex       OKLCH L  C      h     vs surface');
    cat.forEach((h, i) => {
      const o = oklch(h);
      console.log(`${String(i + 1).padEnd(6)}${h}   ${o.L.toFixed(3)}  ${o.C.toFixed(3)}  ${o.H.toFixed(0).padStart(3)}   ${contrast(h, surface).toFixed(2)}:1`);
    });
    console.log('\nadjacent ΔE00      normal  protan  deutan  tritan   (OKLab×100 protan/deutan)');
    const worst = Object.fromEntries(VISIONS.map((k) => [label(k), Infinity]));
    for (let i = 0; i < cat.length - 1; i++) {
      const ds = VISIONS.map((k) => dE00(cat[i], cat[i + 1], k));
      ds.forEach((d, j) => { worst[label(VISIONS[j])] = Math.min(worst[label(VISIONS[j])], d); });
      const ok = `${dEok(cat[i], cat[i + 1], 'protanopia').toFixed(1)}/${dEok(cat[i], cat[i + 1], 'deuteranopia').toFixed(1)}`;
      console.log(`  ${i + 1}–${i + 2}               ${ds.map((d) => d.toFixed(1).padStart(6)).join('  ')}   (${ok})`);
    }
    console.log(`  minimum           ${VISIONS.map((k) => worst[label(k)].toFixed(1).padStart(6)).join('  ')}`);
    for (const [k, v] of Object.entries(worst)) if (v < ADJ_MIN) fail(`${mode} adjacent ${k} ΔE00 ${v.toFixed(1)} < ${ADJ_MIN}`);

    const firstThree = [];
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) for (const k of VISIONS) firstThree.push([dE00(cat[i], cat[j], k), i + 1, j + 1, label(k)]);
    firstThree.sort((a, b) => a[0] - b[0]);
    const f3 = firstThree[0];
    console.log(`  slots 1–3, every pair: worst ΔE00 ${f3[0].toFixed(1)} (${f3[1]}–${f3[2]}, ${f3[3]})`);
    if (f3[0] < ADJ_MIN) fail(`${mode} first-three all-pairs ΔE00 ${f3[0].toFixed(1)} < ${ADJ_MIN}`);

    const all = [];
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) for (const k of VISIONS) all.push([dE00(cat[i], cat[j], k), i + 1, j + 1, label(k)]);
    all.sort((a, b) => a[0] - b[0]);
    console.log(`  all 8, every pair (info): worst ΔE00 ${all[0][0].toFixed(1)} (${all[0][1]}–${all[0][2]}, ${all[0][3]}) — why scatter/map charts stop at 3 series`);

    const statuses = ['success', 'warning', 'danger'].map((s) => [s, get(mode, `app.status.${s}.solid`)]);
    const near = statuses.map(([s, h]) => {
      const best = cat.map((c, i) => [dE00(h, c), i + 1]).sort((a, b) => a[0] - b[0])[0];
      return `${s} solid ↔ slot ${best[1]}: ${best[0].toFixed(1)}`;
    });
    console.log(`  status vs nearest series (info, normal vision): ${near.join('; ')}`);

    for (const ramp of ['seq-navy', 'seq-pink']) {
      const steps = series(mode, `viz.${ramp}`, 6);
      const Ls = steps.map((h) => oklch(h).L);
      const dir = Ls[Ls.length - 1] > Ls[0] ? 1 : -1;
      const dls = Ls.slice(1).map((L, i) => (L - Ls[i]) * dir);
      console.log(`\n== Sequential ${ramp}, ${mode} == ${steps.join(' ')}`);
      console.log(`  OKLCH L: ${Ls.map((L) => L.toFixed(3)).join(' → ')}   smallest step ${Math.min(...dls).toFixed(3)}`);
      if (Math.min(...dls) < SEQ_MIN_DL) fail(`${mode} ${ramp} lightness step ${Math.min(...dls).toFixed(3)} < ${SEQ_MIN_DL}`);
      const firstVsSurface = contrast(steps[0], surface);
      console.log(`  low end vs surface ${firstVsSurface.toFixed(2)}:1 (the low end may recede — magnitude, not identity)`);
    }

    const div = series(mode, 'viz.div', 7);
    const dL = div.map((h) => oklch(h).L);
    console.log(`\n== Diverging, ${mode} == ${div.join(' ')}`);
    console.log(`  OKLCH L: ${dL.map((L) => L.toFixed(3)).join('  ')}`);
    const mid = dL[3];
    const away = (a, b) => Math.abs(b - mid) > Math.abs(a - mid);
    if (!(away(dL[2], dL[1]) && away(dL[1], dL[0]) && away(dL[4], dL[5]) && away(dL[5], dL[6]))) fail(`${mode} diverging arms are not monotonic away from the midpoint`);
    console.log('  opposite steps ΔE00   normal  protan  deutan  tritan   lightness mismatch');
    [[2, 4, 'inner'], [1, 5, 'middle'], [0, 6, 'outer']].forEach(([a, b, name]) => {
      const ds = VISIONS.map((k) => dE00(div[a], div[b], k));
      console.log(`    ${name.padEnd(19)}${ds.map((d) => d.toFixed(1).padStart(6)).join('  ')}   ${Math.abs(dL[a] - dL[b]).toFixed(3)}`);
      const m = Math.min(...ds);
      if (m < ADJ_MIN) fail(`${mode} diverging ${name} steps ΔE00 ${m.toFixed(1)} < ${ADJ_MIN} — the two arms merge`);
    });
    const midC = oklch(div[3]).C;
    console.log(`  midpoint ${div[3]}: OKLCH chroma ${midC.toFixed(3)}${midC < 0.02 ? ' (neutral)' : ' (the raised navy surface — tinted, reads as "nothing" on a navy page)'}`);
  }

  console.log(failed ? '\nFAILED' : `\nAll gates pass (adjacent ΔE00 >= ${ADJ_MIN} in every simulation, first three slots pairwise >= ${ADJ_MIN}, ramps monotonic).`);
  process.exit(failed ? 1 : 0);
}

main();
