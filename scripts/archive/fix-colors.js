import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coursesDir = path.join(__dirname, 'src', 'courses');

function replaceColor(content, colorName) {
    // Backgrounds (skip to avoid double applying /50)
    // Borders (skip to avoid double applying)
    
    // Fix cascading replace issue
    content = content.replace(new RegExp(`text-${colorName}-950 dark:text-${colorName}-50 dark:text-${colorName}-100`, 'g'), `text-${colorName}-900 dark:text-${colorName}-100`);
    
    return content;
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    const colors = ['amber', 'emerald', 'indigo', 'rose', 'purple', 'slate', 'blue'];
    colors.forEach(color => {
        content = replaceColor(content, color);
    });

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

