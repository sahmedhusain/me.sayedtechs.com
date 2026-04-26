import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import http from 'node:http';

const ROOT = process.cwd();
const PORT = Number(process.env.PORT || 5500);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.webmanifest': 'application/manifest+json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.vcf': 'text/vcard; charset=UTF-8'
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const cleaned = decoded === '/' ? '/index.html' : decoded;
  return normalize(cleaned).replace(/^\.{2}(\/|\\|$)/, '');
}

const server = http.createServer((req, res) => {
  const pathname = safePath(req.url || '/');
  const filePath = join(ROOT, pathname);

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
    return;
  }

  const indexPath = join(ROOT, 'index.html');
  if (existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    createReadStream(indexPath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`SPA server running on http://127.0.0.1:${PORT}`);
});
