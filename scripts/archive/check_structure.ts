import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const COURSES_DIR = path.join(process.cwd(), 'Cours_Math');

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function checkStructure() {
  const files = getAllMarkdownFiles(COURSES_DIR);
  const courses = files.filter(f => !path.basename(f).startsWith('Programme_') && !path.basename(f).startsWith('index') && !path.basename(f).startsWith('Plan_Detaille') && !path.basename(f).startsWith('README') && !path.basename(f).startsWith('about') && !path.basename(f).startsWith('changelog') && !path.basename(f).startsWith('preface') && !path.basename(f).startsWith('structure') && !path.basename(f).startsWith('todo'));

  let coursesMissingSections = 0;

  for (const courseFile of courses) {
    const content = fs.readFileSync(courseFile, 'utf-8');
    const { data, content: markdownContent } = matter(content);
    
    const hasIntro = markdownContent.match(/^## .*Introduction/im) || markdownContent.match(/^## .*Objectif/im) || markdownContent.match(/^## .*Découverte/im);
    const hasTheory = markdownContent.match(/^## .*Théorie/im) || markdownContent.match(/^## .*Cours/im) || markdownContent.match(/^## .*Règle/im) || markdownContent.match(/^## .*Propriété/im) || markdownContent.match(/^## .*Définition/im) || markdownContent.match(/^## .*Leçon/im) || markdownContent.match(/^## .*Principe/im);
    const hasExamples = markdownContent.match(/^## .*Exemple/im) || markdownContent.match(/^### .*Exemple/im) || markdownContent.match(/^## .*Méthode/im) || markdownContent.match(/^### .*Méthode/im);
    const hasExercises = markdownContent.match(/^## .*Exercice/im) || markdownContent.match(/^## .*Entraînement/im) || markdownContent.match(/^## .*Pratique/im) || markdownContent.match(/^## .*Application/im);
    const hasQuiz = markdownContent.match(/^## .*Quiz/im) || markdownContent.match(/^## .*Mini-Quiz/im) || markdownContent.match(/^## .*Test/im) || markdownContent.match(/^## .*Évaluation/im);

    const missing = [];
    if (!hasIntro) missing.push('Introduction');
    if (!hasTheory) missing.push('Théorie');
    if (!hasExamples) missing.push('Exemples');
    if (!hasExercises) missing.push('Exercices');
    if (!hasQuiz) missing.push('Quiz');

    if (missing.length > 0) {
      console.log(`[${path.basename(courseFile)}] missing: ${missing.join(', ')}`);
      coursesMissingSections++;
    }
  }

  console.log(`\nTotal courses missing sections: ${coursesMissingSections} out of ${courses.length}`);
}

checkStructure();
