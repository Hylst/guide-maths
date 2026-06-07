import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coursesDir = path.join(__dirname, 'src', 'courses');

function fixMissingDark(content) {
    const colors = ['amber', 'emerald', 'indigo', 'rose', 'purple', 'slate', 'blue'];
    colors.forEach(color => {
        content = content.replace(new RegExp(`\\btext-${color}-700(?!\\s+dark:text-)`, 'g'), `text-${color}-700 dark:text-${color}-300`);
        content = content.replace(new RegExp(`\\btext-${color}-600(?!\\s+dark:text-)`, 'g'), `text-${color}-600 dark:text-${color}-400`);
    });
    return content;
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    content = fixMissingDark(content);

    // Clean up multiple spaces in className if any were created
    content = content.replace(/className="([^"]*)"/g, (match, classes) => {
        return `className="${classes.replace(/\s+/g, ' ').trim()}"`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${path.basename(filePath)}`);
    }
}

fs.readdirSync(coursesDir).forEach(file => {
    if (file.endsWith('.tsx')) {
        processFile(path.join(coursesDir, file));
    }
});
