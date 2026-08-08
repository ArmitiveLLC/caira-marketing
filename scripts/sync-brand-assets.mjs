/**
 * Copy brand assets from caira-clients into caira-marketing/public.
 * Web public: logos, favicon, banner-sunrise
 * Mobile assets: icon, adaptive-icon, splash (mobile-only)
 */
import { createHash } from 'node:crypto';
import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const marketingRoot = path.resolve(__dirname, '..');
const clientsRoot = path.resolve(marketingRoot, '..', 'caira-clients');
const webPublic = path.join(clientsRoot, 'apps', 'web', 'public');
const mobileAssets = path.join(clientsRoot, 'apps', 'mobile', 'assets');
const destPublic = path.join(marketingRoot, 'public');

async function hashFile(filePath) {
  const { createReadStream } = await import('node:fs');
  return new Promise((resolve, reject) => {
    const hash = createHash('md5');
    createReadStream(filePath)
      .on('data', (chunk) => hash.update(chunk))
      .on('end', () => resolve(hash.digest('hex')))
      .on('error', reject);
  });
}

async function copyIfNewer(src, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  try {
    const srcHash = await hashFile(src);
    const destHash = await hashFile(dest);
    if (srcHash === destHash) {
      console.log(`  skip (identical): ${path.relative(destPublic, dest)}`);
      return;
    }
  } catch {
    // dest missing — copy
  }
  await cp(src, dest);
  console.log(`  copied: ${path.relative(destPublic, dest)}`);
}

async function copyWebLogos() {
  console.log('From apps/web/public:');
  const entries = await readdir(webPublic);
  for (const name of entries) {
    if (!name.startsWith('logo') && name !== 'favicon.png') continue;
    await copyIfNewer(path.join(webPublic, name), path.join(destPublic, name));
  }
  const bannerSrc = path.join(webPublic, 'images', 'banner-sunrise.png');
  try {
    await stat(bannerSrc);
    await copyIfNewer(bannerSrc, path.join(destPublic, 'images', 'banner-sunrise.png'));
  } catch {
    console.warn('  warn: images/banner-sunrise.png not found in web public');
  }
}

async function copyMobileOnly() {
  console.log('From apps/mobile/assets:');
  const mobileOnly = ['icon.png', 'adaptive-icon.png', 'splash.png'];
  for (const name of mobileOnly) {
    const src = path.join(mobileAssets, name);
    try {
      await stat(src);
      await copyIfNewer(src, path.join(destPublic, name));
    } catch {
      console.warn(`  warn: ${name} not found in mobile assets`);
    }
  }
}

async function main() {
  console.log('Syncing brand assets...\n');
  await copyWebLogos();
  await copyMobileOnly();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
