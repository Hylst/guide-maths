import fs from 'fs';
import path from 'path';

function checkBlocks(filePath) {
    if (!fs.existsSync(filePath)) {
        return {
            path: filePath,
            name: path.basename(filePath),
            status: 'missing_file',
            missing: ['FICHIER INEXISTANT']
        };
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const missing = [];
    
    // Check "Le saviez-vous ?"
    const hasFunfact = content.includes('type="funfact"') || 
                       content.includes('Le saviez-vous') || 
                       content.includes('Le sais-tu') || 
                       content.includes('Le saviez-vous ?') || 
                       content.includes('Le sais-tu ?');
    if (!hasFunfact) {
        missing.push('Le saviez-vous ?');
    }

    // Check "Rappel"
    const hasReminder = content.includes('type="reminder"') || 
                        content.includes('Rappel') || 
                        content.includes('Rappel de');
    if (!hasReminder) {
        missing.push('Rappel');
    }

    // Check "Zoom sur"
    const hasZoom = content.includes('Zoom sur') || 
                    content.includes('Zoom sur :') || 
                    content.toLowerCase().includes('zoom');
    if (!hasZoom) {
        missing.push('Zoom sur');
    }

    // Extract Course Title if possible (usually in <CourseHeader title="..." or just double quotes)
    let title = path.basename(filePath, '.tsx').replace(/Course_/, '');
    const titleRegex = /<CourseHeader[^>]*title=["']([^"']+)["']/i;
    const match = content.match(titleRegex);
    if (match && match[1]) {
        title = match[1];
    } else {
        // Try to look for another title fallback
        const titleRegex2 = /title:\s*["']([^"']+)["']/i;
        const match2 = content.match(titleRegex2);
        if (match2 && match2[1]) {
            title = match2[1];
        }
    }

    return {
        path: filePath,
        name: path.basename(filePath),
        title: title,
        status: 'ok',
        missing: missing
    };
}

const registryPath = './src/courses/CourseRegistry.tsx';
const registryContent = fs.readFileSync(registryPath, 'utf-8');

const importRegex = /import\(['"]([^'"]+)['"]\)/g;
let match;
const activeFiles = new Set();

while ((match = importRegex.exec(registryContent)) !== null) {
    let importPath = match[1];
    let fullPath = path.join('./src/courses', importPath + '.tsx');
    activeFiles.add(path.normalize(fullPath));
}

const results = Array.from(activeFiles).map(checkBlocks);
const incompleteList = results.filter(r => r.missing.length > 0);

// Grouping by level for beautiful display
const levels = {
    'Maternelle': [],
    'Primaire': [],
    'Collège / Collège': [],
    'Lycée / Lycée': [],
    'Supérieur / Prépa / BTS / BUT': [],
    'Autres / Ressources': []
};

results.forEach(r => {
    let category = 'Autres / Ressources';
    if (r.path.includes('Maternelle')) {
        category = 'Maternelle';
    } else if (r.path.includes('Primaire')) {
        category = 'Primaire';
    } else if (r.path.includes('College') || r.path.includes('Course_5eme')) {
        category = 'Collège / Collège';
    } else if (r.path.includes('Lycee') || r.path.includes('Premiere_Tech')) {
        category = 'Lycée / Lycée';
    } else if (r.path.includes('Sup_') || r.path.includes('Post_Bac')) {
        category = 'Supérieur / Prépa / BTS / BUT';
    }
    levels[category].push(r);
});

// Construct markdown content
let markdown = `## 📊 Audit des Blocs d'Information (Le saviez-vous ? | Rappel | Zoom sur)\n\n`;
markdown += `Ce rapport liste tous les cours actifs (déclarés dans \`CourseRegistry.tsx\`) dans lesquels il manque un ou plusieurs blocs de synthèse pédagogiques obligatoires (**Le saviez-vous ?**, **Rappel**, **Zoom sur**).\n\n`;

let totalMissingAny = 0;

for (const [levelName, courses] of Object.entries(levels)) {
    const missingInLevel = courses.filter(c => c.missing.length > 0);
    if (missingInLevel.length === 0) continue;
    
    totalMissingAny += missingInLevel.length;

    markdown += `### 🎓 ${levelName} (${missingInLevel.length} cours à compléter)\n\n`;
    markdown += `| Cours / Fiche | Fichier | Éléments Manquants | Statut |\n`;
    markdown += `| :--- | :--- | :--- | :---: |\n`;
    
    missingInLevel.forEach(c => {
        const missingLabels = c.missing.map(m => `❌ **${m}**`).join(' & ');
        markdown += `| ${c.title} | \`${c.name}\` | ${missingLabels} | ⚠️ À compléter |\n`;
    });
    markdown += `\n`;
}

markdown += `*Nombre total de cours incomplets sur ces blocs : **${totalMissingAny}** / ${results.length}*\n\n`;

// Let us update todo.md
const todoPath = './todo.md';
let todoContent = fs.readFileSync(todoPath, 'utf-8');

// We want to insert this markdown before "## Top 30 des Cours les Plus Incomplets"
const targetSection = '## Top 30 des Cours les Plus Incomplets';
const index = todoContent.indexOf(targetSection);

if (index !== -1) {
    const header = todoContent.substring(0, index);
    const body = todoContent.substring(index);
    // Let's remove any previous audit blocks if run multiple times
    const cleanHeader = header.replace(/## 📊 Audit des Blocs d'Information[\s\S]*?(?=## Top|$)/, '');
    const updatedContent = cleanHeader + markdown + body;
    fs.writeFileSync(todoPath, updatedContent, 'utf-8');
    console.log(`Scripts: todo.md mis à jour avec succès! (${totalMissingAny} cours incomplets documentés)`);
} else {
    // If not found, append to the end of todo.md
    fs.writeFileSync(todoPath, todoContent + '\n\n' + markdown, 'utf-8');
    console.log("Scripts: todo.md mis à jour à la fin car la section cible n'a pas été trouvée");
}
