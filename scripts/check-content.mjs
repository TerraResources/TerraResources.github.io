import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const outputDirectory = resolve('dist');

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

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'));
  return match?.[1];
}

const files = await collectHtmlFiles(outputDirectory);
const failures = [];
let checkedImages = 0;
let checkedBlankLinks = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const relativeFile = relative(outputDirectory, file);
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  if (h1Count !== 1) {
    failures.push(`${relativeFile}: expected one h1, found ${h1Count}`);
  }

  if (!/<html\b[^>]*\blang=["'][^"']+["'][^>]*>/i.test(html)) {
    failures.push(`${relativeFile}: missing document language`);
  }

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    failures.push(`${relativeFile}: duplicate ids: ${[...new Set(duplicateIds)].join(', ')}`);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    checkedImages += 1;
    if (getAttribute(match[0], 'alt') === undefined) {
      failures.push(`${relativeFile}: image missing alt text`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const tag = match[0];
    if (getAttribute(tag, 'target') !== '_blank') continue;
    checkedBlankLinks += 1;
    const rel = getAttribute(tag, 'rel') ?? '';
    if (!rel.includes('noopener') || !rel.includes('noreferrer')) {
      failures.push(`${relativeFile}: target=_blank link missing noopener/noreferrer`);
    }
  }
}

if (failures.length > 0) {
  console.error('Content checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Validated content structure across ${files.length} HTML files (${checkedImages} images, ${checkedBlankLinks} external links).`,
);
