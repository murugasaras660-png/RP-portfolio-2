import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentPath = path.resolve(__dirname, '../src/data/content.js');

const raw = fs.readFileSync(contentPath, 'utf-8');
const placeholderRegex = /'\[([A-Z0-9_]+)\]'/g;
const matches = [];
let match;

while ((match = placeholderRegex.exec(raw)) !== null) {
  matches.push(match[1]);
}

if (matches.length > 0) {
  console.error(`\x1b[31m[check:content failed]\x1b[0m Found unresolved placeholders in src/data/content.js:`);
  matches.forEach((p) => console.error(`  - [${p}]`));
  console.error(`Please update these fields in src/data/content.js before deploying to production.`);
  process.exit(1);
} else {
  console.log(`\x1b[32m[check:content passed]\x1b[0m No placeholders found in src/data/content.js.`);
}
