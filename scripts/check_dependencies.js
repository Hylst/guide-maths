import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('./src/data/concept_links.ts', 'utf-8');
const keyRegex = /"(\/Cours_Math\/[^"]+)":\s*\{/g;
const depRegex = /dependencies:\s*\[([^\]]+)\]/g;

const keys = new Set();
let match;
while ((match = keyRegex.exec(content)) !== null) {
  keys.add(match[1]);
}

const allDeps = [];
const depMatchRegex = /"(\/Cours_Math\/[^"]+)"/g;
while ((match = depMatchRegex.exec(content)) !== null) {
  allDeps.push(match[1]);
}

const indexContent = fs.readFileSync('./src/data/courses_index.json', 'utf-8');
const indexIds = new Set(JSON.parse(indexContent).map(e => e.id));

let dangling = 0;
for (const dep of allDeps) {
  if (!keys.has(dep)) {
    console.error(`DANGLING: dependency "${dep}" not found as a key in CONCEPT_METADATA`);
    dangling++;
  }
}

let missingFromIndex = 0;
for (const key of keys) {
  if (!indexIds.has(key)) {
    console.error(`MISSING FROM INDEX: key "${key}" not found in courses_index.json`);
    missingFromIndex++;
  }
}

if (dangling === 0 && missingFromIndex === 0) {
  console.log(`✅ 0 dangling — ${keys.size} nodes, all deps valid, all keys in index`);
} else {
  console.log(`❌ ${dangling} dangling, ${missingFromIndex} missing from index`);
  process.exit(1);
}
