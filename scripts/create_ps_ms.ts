import fs from 'fs';
import path from 'path';

const psPath = 'Cours_Math/00_Maternelle/PS';
const msPath = 'Cours_Math/00_Maternelle/MS';

// Clean old files
try { fs.unlinkSync(path.join(psPath, '01_Maternelle_PS_01_Exploration.md')); } catch(e){}
try { fs.unlinkSync(path.join(msPath, '01_Maternelle_MS_01_Decouverte.md')); } catch(e){}
try { fs.unlinkSync('src/courses/Maternelle/Course_Maternelle_PS_01_Exploration.tsx'); } catch(e){}
try { fs.unlinkSync('src/courses/Maternelle/Course_Maternelle_MS_01_Decouverte.tsx'); } catch(e){}

// Course titles
const courses = [
  { level: 'PS', id: '01_Quantites', title: 'Petite Section - Quantités', short: 'PS 01 Quantites', order: 1 },
  { level: 'PS', id: '02_Formes_et_Grandeurs', title: 'Petite Section - Formes et Grandeurs', short: 'PS 02 Formes et Grandeurs', order: 2 },
  { level: 'PS', id: '03_Reperes_Spatiaux', title: 'Petite Section - Repères Spatiaux', short: 'PS 03 Reperes Spatiaux', order: 3 },
  { level: 'MS', id: '01_Quantites', title: 'Moyenne Section - Quantités', short: 'MS 01 Quantites', order: 1 },
  { level: 'MS', id: '02_Formes_et_Grandeurs', title: 'Moyenne Section - Formes et Grandeurs', short: 'MS 02 Formes et Grandeurs', order: 2 },
  { level: 'MS', id: '03_Reperes_Spatiaux', title: 'Moyenne Section - Repères Spatiaux', short: 'MS 03 Reperes Spatiaux', order: 3 },
];

courses.forEach(c => {
  const dirPath = c.level === 'PS' ? psPath : msPath;
  const num = c.order.toString().padStart(2, '0');
  const mdFile = `${num}_Maternelle_${c.level}_${c.id}.md`;
  const tsxFile = `Course_Maternelle_${c.level}_${c.id}.tsx`;

  fs.writeFileSync(path.join(dirPath, mdFile), 
`---
title: "${c.title}"
order: ${c.order}
---

Contenu du cours pour ${c.title}.
`);

  const tsxCode = `import React from 'react';
import { CourseHeader, Section } from '../../components/SharedUI';

const Course: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader acronym="${c.level}" title="Maternelle ${c.short}" />
      <Section title="Contenu en préparation" color="emerald">
        <p>Le contenu détaillé de ce cours sera bientôt disponible.</p>
      </Section>
    </div>
  );
};

export default Course;`;

  fs.writeFileSync(path.join('src/courses/Maternelle', tsxFile), tsxCode);
});

console.log('Courses created');
