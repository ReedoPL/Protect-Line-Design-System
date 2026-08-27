const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT) || 8767;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.js': 'application/javascript',
  '.json': 'application/json',
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const relative = urlPath === '/' ? '/kit/index.html' : urlPath.replace(/^\//, '');
    const filePath = path.join(root, relative);

    if (!filePath.startsWith(root)) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404).end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': mime[path.extname(filePath)] || 'text/plain' });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Serving ${root} at http://127.0.0.1:${port}/`);
  });
