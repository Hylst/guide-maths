import fs from 'fs';
import path from 'path';

const coursesDir = path.join(process.cwd(), 'Cours_Math');
const todoFile = path.join(process.cwd(), 'todo.md');

const allMds = [];

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (file !== 'assets') traverseDir(fullPath);
        } else if (
            fullPath.endsWith('.md') && 
            !file.startsWith('Programme') && 
            file !== 'preface.md' && 
            file !== 'Plan_Detaille.md' && 
            file !== 'structure.md' && 
            file !== 'README.md' && 
            file !== 'about.md' && 
            file !== 'changelog.md' && 
            !fullPath.includes('05_Ressources')
        ) {
            allMds.push(fullPath.replace(coursesDir, ''));
        }
    });
}

traverseDir(coursesDir);

allMds.sort();

let content = `\n\n# V2 - Enrichissement des cours (checklist)\n\n`;
content += `Ces tâches visent à appliquer rigoureusement les directives du fichier \`enrich_cours_rules.md\`.\n\n`;

for (const md of allMds) {
    content += `- [ ] ${md.replace(/\\/g, '/')}\n`;
}

fs.appendFileSync(todoFile, content);
console.log('Appended V2 checklist to todo.md');
