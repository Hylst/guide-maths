const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/courses');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'CourseRegistry.tsx');

let passed = 0;
let total = 0;
const missing = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    total++;
    const hasFlashcard = content.includes('<Flashcard');
    const hasQuiz = content.includes('<Quiz') || content.includes('options:');
    const hasChecklist = content.includes('<InteractiveChecklist');
    const hasFill = content.includes('<FillInTheBlanks');
    const hasFormula = content.includes('<FormulaBox');
    
    // We expect at least a core set of interactive components.
    if (!hasFlashcard || (!hasQuiz && !hasFill) || !hasChecklist || !hasFormula) {
        missing.push({
            file,
            hasFlashcard,
            hasQuiz: hasQuiz || hasFill,
            hasChecklist,
            hasFormula
        });
    } else {
        passed++;
    }
});

console.log(`${passed}/${total} completely match the interactivity requirements.`);
if (missing.length > 0) {
    console.log('\nMissing components:');
    missing.forEach(m => {
        let missingFeats = [];
        if (!m.hasFlashcard) missingFeats.push('Flashcard');
        if (!m.hasQuiz) missingFeats.push('Quiz/FillInTheBlanks');
        if (!m.hasChecklist) missingFeats.push('InteractiveChecklist');
        if (!m.hasFormula) missingFeats.push('FormulaBox');
        console.log(`- ${m.file}: missing ${missingFeats.join(', ')}`);
    });
}
