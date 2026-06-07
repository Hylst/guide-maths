import fs from 'fs';
import path from 'path';

const COURS_DIR = path.join(process.cwd(), 'Cours_Math');

const requiredSections = [
    { name: 'Introduction', regex: /## .*Introduction/i },
    { name: 'Activités', regex: /## .*Activit[eé]s?/i },
    { name: 'Rappels', regex: /## .*Rappels?/i },
    { name: 'Explications/Théorie', regex: /## .*Explications?|## .*Th[eé]orie/i },
    { name: 'Exemples/Méthodes', regex: /## .*Exemples?|## .*M[eé]thodes?/i },
    { name: 'Le saviez-vous', regex: /## .*Le saviez-vous/i },
    { name: 'Exercices', regex: /## .*Exercices?(?! corrig[eé]s)/i },
    { name: 'Exercices corrigés', regex: /## .*Exercices? corrig[eé]s?/i },
    { name: 'Synthèse/Mémos', regex: /## .*Synth[eè]se|## .*M[eé]mos?/i },
    { name: 'FAQ', regex: /## .*FAQ/i },
    { name: 'Mini-Quiz', regex: /## .*Mini-Quiz|## .*Quizz?/i },
];

function analyzeDirectory(dir: string) {
    let results: any = { total: 0, missing: {}, svgCount: 0 };
    requiredSections.forEach(s => results.missing[s.name] = 0);

    function walk(currentDir: string) {
        const files = fs.readdirSync(currentDir);
        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                if (file !== 'assets') walk(fullPath);
            } else if (file.endsWith('.md') && !file.toLowerCase().startsWith('programme') && !file.toLowerCase().startsWith('plan') && !file.toLowerCase().startsWith('readme') && !file.toLowerCase().startsWith('about') && !file.toLowerCase().startsWith('changelog') && !file.toLowerCase().startsWith('preface') && !file.toLowerCase().startsWith('structure') && !file.toLowerCase().startsWith('todo')) {
                results.total++;
                const content = fs.readFileSync(fullPath, 'utf-8');

                requiredSections.forEach(section => {
                    if (!section.regex.test(content)) {
                        results.missing[section.name]++;
                    }
                });

                if (content.includes('.svg')) results.svgCount++;
            }
        }
    }
    walk(dir);
    return results;
}

console.log(JSON.stringify(analyzeDirectory(COURS_DIR), null, 2));
