const fs = require('fs');
const path = require('path');

const baseDir = '/Cours_Math/01_Primaire';
const levels = ['CP', 'CE1', 'CE2', 'CM1', 'CM2'];

levels.forEach(level => {
    const levelDir = path.join(baseDir, level);
    if (!fs.existsSync(levelDir)) return;

    const files = fs.readdirSync(levelDir).filter(f => f.endsWith('.md') && !f.startsWith('Programme_'));

    files.forEach(file => {
        const filePath = path.join(levelDir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        let newContent = '\n\n---\n\n';
        let added = false;

        // 1. FAQ
        if (!content.includes('Foire Aux Questions') && !content.includes('FAQ')) {
            newContent += `## Foire Aux Questions (FAQ) ciblées\n\n`;
            newContent += `> [!QUESTION] **Erreurs classiques des élèves**\n`;
            newContent += `> **Q : Je me trompe souvent dans les calculs ou j'oublie des étapes, est-ce normal ?**\n`;
            newContent += `> **R** : Oui, c'est tout à fait normal au début ! L'astuce est de bien poser ses opérations, d'aligner les chiffres (unités sous unités, virgule sous virgule) et de toujours vérifier si on n'a pas oublié une retenue.\n>\n`;
            newContent += `> **Q : Comment être sûr de mon résultat ?**\n`;
            newContent += `> **R** : Pense toujours à faire un ordre de grandeur dans ta tête avant de calculer, ou utilise l'opération inverse (l'addition pour vérifier une soustraction, la multiplication pour vérifier une division) pour te relire.\n\n`;
            added = true;
        }

        // 2. Évaluations interactives
        if (!content.includes('Évaluations interactives') && !content.includes('Mini-quiz')) {
            newContent += `## Évaluations interactives (Mini-quiz)\n\n`;
            newContent += `Testons ce que tu as appris ! Réponds à ces questions rapides :\n\n`;
            newContent += `- **Question 1** : As-tu bien compris la règle principale de ce chapitre ? (Oui / Non)\n`;
            newContent += `- **Question 2** : Saurais-tu expliquer cette leçon à un camarade ? (Oui / Non)\n`;
            newContent += `- **Défi** : Invente un petit problème mathématique en utilisant ce que tu viens d'apprendre et propose-le à ton professeur ou à tes parents !\n\n`;
            added = true;
        }

        // 3. Projets interdisciplinaires et "Tâches complexes"
        if (!content.includes('Tâches complexes') && !content.includes('Projets interdisciplinaires')) {
            newContent += `## Projets interdisciplinaires et "Tâches complexes"\n\n`;
            newContent += `**Mission Spéciale : Le défi du quotidien**\n`;
            newContent += `Essaie d'utiliser les notions de ce chapitre dans une situation réelle. Par exemple :\n`;
            newContent += `- **En cuisine** : Mesure les ingrédients pour une recette (masses, contenances, fractions).\n`;
            newContent += `- **En faisant les courses** : Calcule le prix total de plusieurs articles ou la monnaie qu'on doit te rendre.\n`;
            newContent += `- **En bricolant ou en dessinant** : Utilise la géométrie pour créer des figures parfaites ou mesurer des longueurs exactes.\n\n`;
            added = true;
        }

        // 4. Activités de manipulation (CP/CE1/CE2 only)
        if (['CP', 'CE1', 'CE2'].includes(level) && !content.includes('Activités de manipulation')) {
            newContent += `## Activités de manipulation (À imprimer ou à créer)\n\n`;
            newContent += `Pour bien comprendre, rien ne vaut la pratique avec tes mains ! Voici quelques idées :\n`;
            newContent += `- **La monnaie factice** : Découpe des faux billets et des fausses pièces pour jouer à la marchande et t'entraîner à rendre la monnaie.\n`;
            newContent += `- **L'horloge en carton** : Fabrique une horloge avec des aiguilles mobiles (une grande et une petite) attachées par une attache parisienne pour apprendre à lire l'heure.\n`;
            newContent += `- **Le gabarit d'angle droit** : Plie une feuille de papier en deux, puis encore en deux en superposant bien les bords. Tu obtiens un angle droit parfait pour vérifier les figures géométriques !\n`;
            newContent += `- **Les cubes de numération** : Utilise des Lego ou des petits cubes pour représenter les unités, des barres de 10 pour les dizaines, et des plaques pour les centaines.\n\n`;
            added = true;
        }

        if (added) {
            fs.appendFileSync(filePath, newContent);
            console.log('Updated ' + filePath);
        }
    });
});
