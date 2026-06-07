const fs = require('fs');
const path = require('path');

const postBacDir = path.join(__dirname, '..', 'Cours_Math', '04_Post_Bac');

function walk(dir, callback) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

function convertQuiz(content, fileRel) {
  // Regex to match a single HTML details-based quiz block
  // It handles nested details for answer
  const detailsRegex = /<details\b[^>]*>\s*<summary\b[^>]*>\s*(?:❓\s*)?Question\s*(\d+)\s*:\s*([\s\S]*?)<\/summary>\s*<ul>([\s\S]*?)<\/ul>\s*<details\b[^>]*>\s*<summary\b[^>]*>[\s\S]*?<\/summary>\s*<strong>Bonne réponse\s*:\s*([A-D])\s*[\s\S]*?<\/strong>([\s\S]*?)<\/details>\s*<\/details>/gi;

  let hasMatches = false;
  let newContent = content.replace(detailsRegex, (match, qNum, qText, optionsBlock, correctLetter, explanationText) => {
    hasMatches = true;
    
    // Parse options
    const options = [];
    const liRegex = /<li>\s*([A-D])\)\s*([\s\S]*?)<\/li>/gi;
    let m;
    while ((m = liRegex.exec(optionsBlock)) !== null) {
      options.push({
        letter: m[1].toUpperCase(),
        text: m[2].trim()
      });
    }

    if (options.length === 0) {
      // Fallback if formatting is slightly different (e.g. no letter)
      const liFallbackRegex = /<li>([\s\S]*?)<\/li>/gi;
      let letterIndex = 0;
      const letters = ['A', 'B', 'C', 'D'];
      while ((m = liFallbackRegex.exec(optionsBlock)) !== null) {
        let text = m[1].trim();
        let letter = letters[letterIndex] || 'A';
        // strip A) B) if present
        if (/^[A-D]\)\s*/i.test(text)) {
          letter = text[0].toUpperCase();
          text = text.replace(/^[A-D]\)\s*/i, '');
        }
        options.push({
          letter,
          text
        });
        letterIndex++;
      }
    }

    // Build the options markdown
    let optionsMarkdown = '';
    options.forEach(opt => {
      const isCorrect = opt.letter === correctLetter.toUpperCase();
      const checkbox = isCorrect ? '[x]' : '[ ]';
      optionsMarkdown += `- ${checkbox} ${opt.text}\n`;
    });

    const cleanQText = qText.replace(/[\r\n\s]+/g, ' ').trim();
    const cleanExplanation = explanationText.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();

    return `**Question ${qNum} : ${cleanQText}**\n${optionsMarkdown}> **Explication :** ${cleanExplanation}`;
  });

  // Let's standardise the main section header to "## 📝 Mini-Quiz"
  newContent = newContent.replace(/## 📝 Mini-Quiz\b[^\n]*/gi, '## 📝 Mini-Quiz');

  return { content: newContent, modified: hasMatches };
}

function processFile(filePath) {
  if (!filePath.endsWith('.md')) return;
  const fileRel = path.relative(postBacDir, filePath);

  let original = fs.readFileSync(filePath, 'utf-8');
  let { content, modified } = convertQuiz(original, fileRel);

  // Check if checklist is present, if not add it at the bottom before any closing text
  if (!content.includes('## ✅ Checklist des Essentiels')) {
    let checklistText = `\n\n## ✅ Checklist des Essentiels (Validation)\n\n- [ ] Je maîtrise les définitions clés de ce chapitre.\n- [ ] Je sais appliquer les méthodes fondamentales présentées.\n- [ ] J'ai résolu les exercices pratiques d'entraînement.\n- [ ] J'ai complété le mini-quiz du chapitre avec succès.\n`;
    
    // Find where to inject. Usually before "*(Fin de " or "*(Fin des " or at the very end
    const lastLineRegex = /(\n\*\(Fin[\s\S]*)$/i;
    if (lastLineRegex.test(content)) {
      content = content.replace(lastLineRegex, `${checklistText}$1`);
    } else {
      content += checklistText;
    }
    modified = true;
    console.log(`[CHECKLIST ADDED] ${fileRel}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[CONVERTED QUIZ/STRUCTURE] ${fileRel}`);
  }
}

console.log('Scanning Post_Bac math courses to convert quizzes to interactive Markdown...');
walk(postBacDir, processFile);
console.log('Conversion process finished.');
