import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coursesDir = path.join(__dirname, 'src', 'courses');

const latexMacros = [
    'times', 'text', 'frac', 'int', 'vec', 'cos', 'sin', 'tan', 'ln', 'lim', 'infty',
    'mathbb', 'mathcal', 'pi', 'alpha', 'beta', 'Delta', 'sigma', 'mu', 'Omega', 'theta', 'rho', 'lambda',
    'rightarrow', 'Rightarrow', 'Leftrightarrow', 'le', 'ge', 'neq', 'approx', 'equiv', 'sim', 'propto',
    'cap', 'cup', 'in', 'notin', 'subset', 'supset', 'emptyset', 'sum', 'prod', 'sqrt', 'cdot',
    'left', 'right', 'pmatrix', 'vmatrix', 'Bmatrix', 'bmatrix', 'Vmatrix', 'matrix', 'array'
];

let totalFixed = 0;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // We want to replace \macro with \\macro
    // But ONLY if it's currently \macro (not \\macro)
    // Regex: lookbehind for non-backslash, then \ then the macro name
    
    latexMacros.forEach(macro => {
        // Find backslash followed by macro, but NOT preceded by backslash
        // JavaScript regex lookbehind: (?<!\\)
        const regex = new RegExp(`(?<!\\\\)\\\\(?=${macro})`, 'g');
        content = content.replace(regex, '\\\\');
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${path.basename(filePath)}`);
        totalFixed++;
    }
}

fs.readdirSync(coursesDir).forEach(file => {
    if (file.endsWith('.tsx')) {
        processFile(path.join(coursesDir, file));
    }
});

console.log(`Fixed ${totalFixed} files.`);
