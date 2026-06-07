const fs = require('fs');
const path = require('path');

const COURS_DIR = path.join(__dirname, 'Cours_Math');

const requiredSections = [
    /activit[eé]s?/i,
    /introduction/i,
    /explications?/i,
    /th[eé]orie/i,
    /rappels?/i,
    /le saviez-vous/i,
    /exercices? corrig[eé]s?/i,
    /faq/i,
    /mini-quiz|quizz?/i
];

function analyzeDirectory(dir) {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (file !== 'assets') {
                results = results.concat(analyzeDirectory(fullPath));
            }
        } else if (file.endsWith('.md') && !file.toLowerCase().startsWith('programme') && !file.toLowerCase().startsWith('plan') && !file.toLowerCase().startsWith('readme') && !file.toLowerCase().startsWith('about') && !file.toLowerCase().startsWith('changelog') && !file.toLowerCase().startsWith('preface') && !file.toLowerCase().startsWith('structure') && !file.toLowerCase().startsWith('todo')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const missingSections = [];

            for (const sectionRegex of requiredSections) {
                if (!sectionRegex.test(content)) {
                    missingSections.push(sectionRegex.toString().replace(/\//g, '').replace(/i$/, ''));
                }
            }

            const hasSvg = content.includes('.svg');

            if (missingSections.length > 0 || !hasSvg) {
                results.push({
                    file: fullPath.replace(COURS_DIR, ''),
                    missingSections: missingSections,
                    hasSvg: hasSvg
                });
            }
        }
    }
    return results;
}

const analysis = analyzeDirectory(COURS_DIR);
console.log(JSON.stringify(analysis, null, 2));
