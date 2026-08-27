const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'files-manifest.json'), 'utf8')
);

// Exclude helper scripts from the published kit
const publish = manifest.filter(
  (file) => !file.path.startsWith('scripts/')
);

console.log(JSON.stringify({
  count: publish.length,
  paths: publish.map((f) => f.path),
}));
