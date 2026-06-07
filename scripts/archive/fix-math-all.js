import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coursesDir = path.join(__dirname, 'src', 'courses');

let totalFixed = 0;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Look for single backslash \ not preceded by backslash, 
    // and not followed by n, r, t, ", ', `
    // Replace with double backslash
    const regex = /(?<!\\)\\(?![nrt"'\`\\])/g;
    content = content.replace(regex, '\\\\');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated all backslashes in ${path.basename(filePath)}`);
        totalFixed++;
    }
}

fs.readdirSync(coursesDir).forEach(file => {
    if (file.endsWith('.tsx')) {
        processFile(path.join(coursesDir, file));
    }
});

console.log(`Fixed backslashes in ${totalFixed} files.`);
