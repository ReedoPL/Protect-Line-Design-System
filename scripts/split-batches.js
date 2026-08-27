const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'publish-manifest.json'), 'utf8')
);

const batchSize = 8;
for (let i = 0; i < manifest.length; i += batchSize) {
  const batch = manifest.slice(i, i + batchSize);
  const index = Math.floor(i / batchSize) + 1;
  fs.writeFileSync(
    path.join(__dirname, `push-batch-${index}.json`),
    JSON.stringify(batch)
  );
  console.log(`batch-${index}: ${batch.length} files`);
}
