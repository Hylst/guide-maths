const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'Cours_Math/01_Primaire');
const levels = ['CP', 'CE1', 'CE2', 'CM1', 'CM2'];

levels.forEach(level => {
    const levelDir = path.join(baseDir, level);
    if (!fs.existsSync(levelDir)) return;

    const files = fs.readdirSync(levelDir).filter(f => f.endsWith('.md'));

    files.forEach(file => {
        const filePath = path.join(levelDir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        let originalContent = content;

        // 1. Remplacer les alertes GitHub (non supportées par tous les convertisseurs PDF/DOCX) par du Markdown standard
        content = content.replace(/> \[!TIP\]/g, '> **💡 Astuce :**');
        content = content.replace(/> \[!WARNING\]/g, '> **⚠️ Attention :**');
        content = content.replace(/> \[!QUESTION\]/g, '> **❓ Question :**');
        content = content.replace(/> \[!INFO\]/g, '> **ℹ️ Info :**');

        // 2. Remplacer les balises HTML <span> (qui peuvent mal se compiler) par du texte brut
        content = content.replace(/<span[^>]*>(.*?)<\/span>/g, '$1');

        // 3. Remplacer les balises HTML <img> par du Markdown standard pour les images
        content = content.replace(/<img\s+src="([^"]+)"\s+alt="([^"]*)"[^>]*>/g, '![$2]($1)');

        // 4. Adapter les quiz pour l'impression (cases à cocher physiques)
        content = content.replace(/\(Oui \/ Non\)/g, '☐ Oui    ☐ Non');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Adapté pour l'impression : ${filePath}`);
        }
    });
});
