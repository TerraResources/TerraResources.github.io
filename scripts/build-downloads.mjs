import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = join(projectRoot, 'download-source');
const outputRoot = join(projectRoot, 'public', 'downloads');

const files = [
  {
    source: 'automation/word/TerraResources-Lecture-Notes.ahk',
    output: 'TerraResources-Lecture-Notes.ahk',
  },
  {
    source: 'automation/word/TerraResources-Master-Hotkeys.ahk',
    output: 'TerraResources-Master-Hotkeys.ahk',
  },
  {
    source: 'automation/word/TerraResources-Lecture-Settings.ahk',
    output: 'TerraResources-Lecture-Settings.ahk',
  },
  {
    source: 'automation/maps/MapShortcuts-v2.ahk',
    output: 'MapShortcuts-v2.ahk',
  },
  {
    source: 'templates/Coordinate-Log-Template.csv',
    output: 'Coordinate-Log-Template.csv',
  },
  {
    source: 'templates/Field-Notes-Template.txt',
    output: 'Field-Notes-Template.txt',
  },
  {
    source: 'guide/TerraResources-Starter-Guide.txt',
    output: 'TerraResources-Starter-Guide.txt',
  },
];

const wordFiles = files.filter((file) => file.source.startsWith('automation/word/'));
const releaseDate = new Date('2026-09-24T00:00:00.000Z');

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const file of files) {
  const source = join(sourceRoot, file.source);
  const output = join(outputRoot, file.output);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, await readFile(source));
}

const archive = new JSZip();
for (const file of wordFiles) {
  const source = join(sourceRoot, file.source);
  archive.file(file.output, await readFile(source), {
    date: releaseDate,
    unixPermissions: 0o644,
  });
}

const archiveBuffer = await archive.generateAsync({
  type: 'nodebuffer',
  compression: 'DEFLATE',
  compressionOptions: { level: 9 },
  platform: 'UNIX',
});

const archivePath = join(outputRoot, 'TerraResources-Word-Toolkit.zip');
await writeFile(archivePath, archiveBuffer);

const checksumFiles = [
  ...files.map((file) => join(outputRoot, file.output)),
  archivePath,
];
const checksumLines = [];
for (const filePath of checksumFiles) {
  const digest = createHash('sha256').update(await readFile(filePath)).digest('hex');
  checksumLines.push(`${digest}  ${basename(filePath)}`);
}
await writeFile(join(outputRoot, 'SHA256SUMS.txt'), `${checksumLines.join('\n')}\n`);

console.log(`Built ${files.length} download files, the Word toolkit archive, and SHA-256 checksums.`);
