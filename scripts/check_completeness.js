import fs from 'fs';
import path from 'path';

function checkFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return {
            path: filePath,
            name: path.basename(filePath),
            missingCount: 99,
            missing: ['FICHIER INEXISTANT'],
            size: 0
        };
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);
    const missing = [];
    
    if (!content.includes('<CourseHeader')) missing.push('CourseHeader');
    if (!content.includes('<Section')) missing.push('Section');
    
    // Contenu pédagogique attendu
    if (!content.includes('Exemple') && !content.includes('<TipBanner') && !content.includes('<InfoBlock')) {
        missing.push('Théorie/Exemples (InfoBlock/TipBanner)');
    }
    if (!content.includes('<InteractiveExercise') && !content.includes('Exercice') && !content.includes('Simulation') && !content.includes('<FillInTheBlanks')) {
        missing.push('Exercices Interactifs');
    }
    if (!content.includes('<Flashcard')) {
        missing.push('Flashcards (Synthèse)');
    }
    if (!content.includes('<Quiz') && !content.includes('<MiniQuiz')) {
        missing.push('Quiz / QCM');
    }

    return {
        path: filePath,
        name: path.basename(filePath),
        missingCount: missing.length,
        missing: missing,
        size: stats.size
    };
}

// Lire CourseRegistry.tsx pour n'analyser que les fichiers réels
const registryPath = './src/courses/CourseRegistry.tsx';
const registryContent = fs.readFileSync(registryPath, 'utf-8');

const importRegex = /import\(['"]([^'"]+)['"]\)/g;
let match;
const activeFiles = new Set();

while ((match = importRegex.exec(registryContent)) !== null) {
    let importPath = match[1]; // e.g. './College/Course_5eme_01_Nombres_et_Calculs'
    // Résoudre le chemin relatif par rapport à src/courses/
    let fullPath = path.join('./src/courses', importPath + '.tsx');
    activeFiles.add(path.normalize(fullPath));
}

const allCourses = Array.from(activeFiles).map(checkFile);

// Trier par nombre d'éléments manquants (descendant) puis par taille de fichier (ascendant)
const sortedCourses = allCourses.sort((a, b) => {
    if (b.missingCount !== a.missingCount) {
        return b.missingCount - a.missingCount;
    }
    return a.size - b.size; // plus petit d'abord
});

console.log("\n=== TOP 30 DES COURS ACTIFS LES PLUS INCOMPLETS ===");
sortedCourses.slice(0, 30).forEach((course, index) => {
    console.log(`${index + 1}. **${course.name}** (Taille: ${(course.size / 1024).toFixed(1)} KB) - Chemin: ${course.path}`);
    if (course.missing.length > 0) {
        console.log(`   Missing: ${course.missing.join(', ')}`);
    } else {
        console.log(`   (No missing structure, but small size)`);
    }
});
