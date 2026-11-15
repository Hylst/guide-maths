// Renomme les cours Markdown de dist/Cours_Math en .txt apres `vite build`.
//
// Le serveur de production refuse tous les fichiers .md (403) ; l'application
// lit donc les cours en .txt (voir src/utils/courseFile.ts). Lance par le
// script `postbuild`.

import { existsSync, readdirSync, renameSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../dist/Cours_Math/", import.meta.url));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith(".md")) out.push(full);
  }
  return out;
}

if (!existsSync(ROOT)) {
  console.error("publish_course_text : dist/Cours_Math absent");
  process.exit(1);
}

const files = walk(ROOT);
for (const file of files) renameSync(file, file.replace(/\.md$/, ".txt"));
console.log(`publish_course_text : ${files.length} cours publies en .txt`);
