import fs from 'fs';

const content = fs.readFileSync('./src/data/concept_links.ts', 'utf-8');
const keyRegex = /"(\/Cours_Math\/[^"]+)":\s*\{/g;
const keys = new Set();
let match;
while ((match = keyRegex.exec(content)) !== null) {
  keys.add(match[1]);
}

const indexContent = fs.readFileSync('./src/data/courses_index.json', 'utf-8');
const entries = JSON.parse(indexContent);

let count = 0;
for (const entry of entries) {
  if (!keys.has(entry.id)) {
    console.log(`MISSING: ${entry.id} — ${entry.title}`);
    count++;
  }
}
console.log(`\nTotal: ${count} courses without pedigree node`);
