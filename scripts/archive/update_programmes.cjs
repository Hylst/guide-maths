const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'Cours_Math/01_Primaire');
const levels = ['CP', 'CE1', 'CE2', 'CM1', 'CM2'];

levels.forEach(level => {
    const filePath = path.join(baseDir, level, `Programme_${level}.md`);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove from Améliorations Possibles
    content = content.replace(/- \*\*Foire Aux Questions \(FAQ\) ciblées\*\*.+\n/g, '');
    content = content.replace(/- \*\*Création d'évaluations interactives\*\*.+\n/g, '');
    content = content.replace(/- \*\*Projets interdisciplinaires et "Tâches complexes"\*\*.+\n/g, '');
    content = content.replace(/- \*\*Activités de manipulation \(Primaire\)\*\*.+\n/g, '');

    // Add to État d'avancement
    if (!content.includes('FAQ, Évaluations interactives, Projets interdisciplinaires')) {
        content = content.replace(
            /(\*\*État d'avancement et Ressources Disponibles\*\*.*?\n)/s,
            `$1- **Améliorations Pédagogiques Intégrées** : FAQ ciblées, Évaluations interactives (Mini-quiz), Projets interdisciplinaires (Tâches complexes) ajoutés à tous les chapitres existants.\n`
        );
    }
    
    if (['CP', 'CE1', 'CE2'].includes(level) && !content.includes('Activités de manipulation')) {
        content = content.replace(
            /(- \*\*Améliorations Pédagogiques Intégrées\*\*.*?\n)/,
            `$1- **Activités de manipulation** : Suggestions d'activités pratiques (monnaie, horloge, gabarits) intégrées aux chapitres.\n`
        );
    }

    fs.writeFileSync(filePath, content);
    console.log('Updated ' + filePath);
});
