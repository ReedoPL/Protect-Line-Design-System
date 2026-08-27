const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'files-manifest.json'), 'utf8')
);

const exclude = new Set([
  'scripts/collect-files.js',
  'scripts/list-publish.js',
  'scripts/files-manifest.json',
]);

const publish = manifest.filter((file) => !exclude.has(file.path));

fs.writeFileSync(path.join(__dirname, 'publish-manifest.json'), JSON.stringify(publish));
console.log(`Publish files: ${publish.length}`);
