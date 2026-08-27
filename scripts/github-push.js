const fs = require('fs');
const path = require('path');
const https = require('https');

const owner = 'ReedoPL';
const repo = 'Protect-Line-Design-System';
const branch = 'main';
const message = 'Initial Protect Line design system for Claude Design and Cursor';

const manifestPath = path.join(__dirname, 'publish-manifest.json');
if (!fs.existsSync(manifestPath)) {
  require('./prepare-publish.js');
}

const files = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function request(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (!token) {
      reject(new Error('GITHUB_TOKEN or GH_TOKEN not set'));
      return;
    }

    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: 'api.github.com',
        path: `/repos/${owner}/${repo}${apiPath}`,
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'protect-line-design-system',
          Accept: 'application/vnd.github+json',
          ...(payload
            ? {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
              }
            : {}),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data ? JSON.parse(data) : null);
            return;
          }
          reject(new Error(`${res.statusCode} ${data}`));
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

(async () => {
  try {
    const result = await request('PUT', '/contents', {
      message,
      branch,
      files,
    });
    console.log('PUSH_OK', result.commit.sha);
  } catch (error) {
    console.error('PUSH_FAIL', error.message);
    process.exit(1);
  }
})();
