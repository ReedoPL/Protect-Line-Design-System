const fs = require('fs');
const path = require('path');
const https = require('https');

const owner = 'ReedoPL';
const repo = 'Protect-Line-Design-System';
const branch = 'main';

function getToken() {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT;
}

function githubRequest(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const token = getToken();
    if (!token) {
      reject(new Error('Missing GitHub token in GITHUB_TOKEN, GH_TOKEN, or GITHUB_PAT'));
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

async function getFileSha(filePath) {
  try {
    const data = await githubRequest(
      'GET',
      `/contents/${encodeURIComponent(filePath).replace(/%2F/g, '/')}?ref=${branch}`
    );
    return data.sha;
  } catch (error) {
    if (String(error.message).includes('404')) return null;
    throw error;
  }
}

async function upsertFile(filePath, content, message) {
  const sha = await getFileSha(filePath);
  const body = {
    message,
    branch,
    content: Buffer.from(content, 'utf8').toString('base64'),
  };
  if (sha) body.sha = sha;
  return githubRequest('PUT', `/contents/${filePath}`, body);
}

(async () => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'publish-manifest.json'), 'utf8')
  );

  let pushed = 0;
  for (const file of manifest) {
    if (file.path === 'README.md') continue;
    await upsertFile(
      file.path,
      file.content,
      `Add ${file.path}`
    );
    pushed += 1;
    console.log(`OK ${file.path}`);
  }

  console.log(`DONE ${pushed} files`);
})().catch((error) => {
  console.error('FAIL', error.message);
  process.exit(1);
});
