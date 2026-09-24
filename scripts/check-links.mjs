import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const outputDirectory = resolve('dist');
const attributePattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/g;
const ignoredSchemes = ['mailto:', 'tel:', 'data:', 'javascript:'];

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtmlFiles(path)));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }

  return files;
}

async function pathExists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

let files;
try {
  files = await collectHtmlFiles(outputDirectory);
} catch {
  console.error('No dist directory found. Run the Astro build first.');
  process.exit(1);
}

const failures = [];
const htmlIds = new Map();
let checkedReferences = 0;

async function getHtmlIds(file) {
  if (htmlIds.has(file)) return htmlIds.get(file);

  const html = await readFile(file, 'utf8');
  const ids = new Set();
  for (const match of html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)) ids.add(match[1]);
  htmlIds.set(file, ids);
  return ids;
}

for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(attributePattern)) {
    const reference = match[1];
    const url = new URL(reference, 'https://terraresources.local');

    if (ignoredSchemes.includes(url.protocol) || url.hostname !== 'terraresources.local') continue;

    checkedReferences += 1;
    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      failures.push({ file, reference, reason: 'invalid URL encoding' });
      continue;
    }

    const directPath = join(outputDirectory, pathname.replace(/^\/+/, ''));
    const candidates = pathname.endsWith('/')
      ? [join(directPath, 'index.html')]
      : [directPath, join(directPath, 'index.html')];

    let resolvedTarget;
    if (url.hash && (url.pathname === '/' || url.pathname === '') && reference.startsWith('#')) {
      resolvedTarget = file;
    } else {
      for (const candidate of candidates) {
        if (await pathExists(candidate)) {
          resolvedTarget = candidate;
          break;
        }
      }
    }

    if (!resolvedTarget) {
      failures.push({ file, reference, reason: 'local target not found' });
      continue;
    }

    if (url.hash && resolvedTarget.endsWith('.html')) {
      let fragment;
      try {
        fragment = decodeURIComponent(url.hash.slice(1));
      } catch {
        failures.push({ file, reference, reason: 'invalid fragment encoding' });
        continue;
      }

      const targetIds = await getHtmlIds(resolvedTarget);
      if (!targetIds.has(fragment)) {
        failures.push({ file, reference, reason: `fragment #${fragment} not found` });
      }
    }
  }
}

if (failures.length > 0) {
  console.error('Broken local references found:');
  for (const failure of failures) {
    console.error(`- ${relative(outputDirectory, failure.file)}: ${failure.reference} (${failure.reason})`);
  }
  process.exit(1);
}

console.log(`Validated ${checkedReferences} local references across ${files.length} HTML files.`);
