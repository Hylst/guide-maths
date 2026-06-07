import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COURSES_DIR = path.resolve(__dirname, '../Cours_Math');

function getMdFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getMdFiles(fullPath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function parseAndFixQuiz(quizText: string): string {
    // If already contains - [x]
    if (quizText.includes('- [x]')) return quizText;

    // Look for answers line: **Réponses :** 1. 1 | 2. $\pi$ | 3. 1 | 4. $2i$
    // Or *Réponses : 1. Vrai | 2. Vrai | 3. Faux ($i^3 = -i$).*
    const answersMatch = quizText.match(/Réponses\s*:\s*(.*)/i);
    let answers: Record<number, string> = {};
    if (answersMatch) {
      const answersStr = answersMatch[1].replace(/\*|>/g, '');
      const parts = answersStr.split(/\||(?=\d+\.)/);
      for (const part of parts) {
        let trimmed = part.trim();
        const m = trimmed.match(/^(\d+)\.\s*(.*)/);
        if (m) {
          answers[parseInt(m[1])] = m[2].trim();
        }
      }
    }

    // Now extract questions
    // Split by \n1. , \n2. , etc
    const questionsText = quizText.replace(/\*?\*?Réponses\s*:.*$/is, '');
    const qMatches = Array.from(questionsText.matchAll(/(\d+)\.\s+(.*?)\n((?:(?:\s*-\s+.*?\n)+)?)/g));
    
    if (qMatches.length === 0) return quizText;

    let newQuiz = '## 📝 Mini-Quiz\n\n';

    for (const match of qMatches) {
        let qNumStr = match[1];
        let qNum = parseInt(match[1]);
        let qText = match[2].trim();
        let optionsBlock = match[3];

        newQuiz += `**Question ${qNumStr} : ${qText}**\n`;

        let options: string[] = [];
        if (optionsBlock && optionsBlock.trim() !== '') {
            const optMatches = Array.from(optionsBlock.matchAll(/\s*-\s+(.*)/g));
            for (const oMatch of optMatches) {
                options.push(oMatch[1].trim());
            }
        } else {
            // Probably Vrai ou Faux
            if (qText.toLowerCase().includes('vrai ou faux') || quizText.toLowerCase().includes('vrai ou faux')) {
                options = ['Vrai', 'Faux'];
            }
        }

        let correctAnswer = answers[qNum] || '';
        let foundCorrect = false;

        for (const opt of options) {
            let isCorrect = false;
            if (correctAnswer && (opt.toLowerCase().includes(correctAnswer.toLowerCase()) || correctAnswer.toLowerCase().includes(opt.toLowerCase()))) {
                isCorrect = true;
                foundCorrect = true;
            }
            newQuiz += `- [${isCorrect ? 'x' : ' '}] ${opt}\n`;
        }
        
        // If we didn't match any option to the correct answer but there are options, maybe just mark the first one as a fallback for fixing later
        if (!foundCorrect && options.length > 0 && correctAnswer) {
             // Let's just output the exact answer in explanation if we missed
        }

        let explanation = `La bonne réponse est : ${correctAnswer || 'Non spécifiée'}`;
        
        newQuiz += `> **Explication :** ${explanation}\n\n`;
    }

    return newQuiz;
}

function processFile(file: string) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Also clean up any double mini quizzes
  const doubleQuizMatch = content.match(/(## Mini-Quiz[\s\S]*?)## 📝 Mini-Quiz[\s\S]*$/);
  if (doubleQuizMatch && doubleQuizMatch[1].includes('- [x]') === false) {
     // Wait, some files have both the bad one and the good one. Like Nombres Complexes.
     // In that case, we can just remove the old bad one.
     let goodQuizMatch = content.match(/## 📝 Mini-Quiz[\s\S]*?(?=\n## |\n*$)/);
     if (goodQuizMatch) {
         // remove the old one
         content = content.replace(/## Mini-Quiz[\s\S]*?(?=## 📝 Mini-Quiz)/, '');
         fs.writeFileSync(file, content, 'utf-8');
     }
  }
  
  const quizRegex = /## 10\. Mini-Quiz|## 📝 Mini-Quiz|## Mini-Quiz|## Auto-évaluation/i;
  
  const match = content.match(quizRegex);
  if (!match) return; // No quiz found

  const index = match.index!;
  
  let endIndex = content.length;
  const nextSectionMatch = content.slice(index + match[0].length).match(/\n## |\n---/);
  if (nextSectionMatch) {
    endIndex = index + match[0].length + nextSectionMatch.index!;
  }
  
  const oldQuizText = content.slice(index, endIndex);
  
  if (oldQuizText.includes('- [x]') && oldQuizText.includes('**Question')) {
    return; // Already formatted
  }
  
  const newQuizText = parseAndFixQuiz(oldQuizText);
  if (newQuizText === oldQuizText) return; // couldn't parse

  content = content.slice(0, index) + newQuizText + content.slice(endIndex);
  fs.writeFileSync(file, content, 'utf-8');
  console.log(`✔ Fixed quiz in ${path.basename(file)}`);
}

function main() {
  const files = getMdFiles(COURSES_DIR);
  for (const file of files) {
      processFile(file);
  }
}

main();
