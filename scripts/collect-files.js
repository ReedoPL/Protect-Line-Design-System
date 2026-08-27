const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const out = path.join(__dirname, 'files-manifest.json');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    if (entry === '.git') continue;
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const files = walk(root).map((full) => ({
  path: path.relative(root, full).replace(/\\/g, '/'),
  content: fs.readFileSync(full, 'utf8'),
}));

fs.writeFileSync(out, JSON.stringify(files));
console.log(`Wrote ${files.length} files to ${out}`);
