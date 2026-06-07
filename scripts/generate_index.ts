import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COURSES_DIR = path.resolve(__dirname, '../Cours_Math');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/courses_index.json');

function processDirectory(directory: string, index: any[]) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath, index);
    } else if (file.endsWith('.md')) {
      if (
        file.includes('Programme_') ||
        file.includes('Plan_Detaille') ||
        file.includes('README') ||
        file.includes('about') ||
        file.includes('changelog') ||
        file.includes('preface') ||
        file.includes('structure') ||
        file.includes('todo')
      ) {
        continue;
      }

      let content = '';
      try {
        content = fs.readFileSync(fullPath, 'utf-8');
      } catch (e) {
        continue;
      }
      
      const parsed = matter(content);
      
      const relativePath = path.relative(path.resolve(__dirname, '..'), fullPath).replace(/\\/g, '/');
      
      // Extract subLevel from folder name
      let subLevel = parsed.data.subLevel;
      const parts = relativePath.split('/');
      if (!subLevel && parts.length > 2) {
          subLevel = parts[parts.length - 2].replace(/^\d{2}_/, '');
      }

      index.push({
        id: '/' + relativePath,
        title: parsed.data.title || file.replace('.md', ''),
        level: parsed.data.level || parts[1].replace(/^\d{2}_/, ''),
        subLevel: subLevel,
        order: parsed.data.order || parseInt(file.split('_')[0]) || 99
      });
    }
  }
}

const index: any[] = [];
if (fs.existsSync(COURSES_DIR)) {
  processDirectory(COURSES_DIR, index);
}

// Inject advanced TSX-only university courses that do not reside in the old Markdown folder structure
const tsxCourses = [
  {
    id: "/Cours_Math/04_Post_Bac/Sup_CPGE/Course_CPGE_BL_Proba.md",
    title: "Théorie des Probabilités et Modélisations",
    level: "Post_Bac",
    subLevel: "CPGE_BL",
    order: 1
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_CPGE/Course_CPGE_BL_AlgebreLineaire.md",
    title: "Algèbre Linéaire & Réduction des Endomorphismes",
    level: "Post_Bac",
    subLevel: "CPGE_BL",
    order: 2
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_CPGE/Course_CPGE_BL_Optimisation.md",
    title: "Calcul Différentiel & Optimisation sous Contrainte",
    level: "Post_Bac",
    subLevel: "CPGE_BL",
    order: 3
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_Maths_Groupes.md",
    title: "Introduction aux Groupes Abéliens",
    level: "Post_Bac",
    subLevel: "Licence_Maths",
    order: 1
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_Maths_TopologieMetric.md",
    title: "Topologie des Espaces Métriques",
    level: "Post_Bac",
    subLevel: "Licence_Maths",
    order: 2
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_Maths_AlgebreBilinea.md",
    title: "Algèbre Bilinéaire & Formes Quadratiques",
    level: "Post_Bac",
    subLevel: "Licence_Maths",
    order: 3
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_MIASHS_Jeux.md",
    title: "Théorie des Jeux & Décision en Économie",
    level: "Post_Bac",
    subLevel: "Licence_MIASHS",
    order: 1
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_MIASHS_Regression.md",
    title: "Régression Linéaire Multiple",
    level: "Post_Bac",
    subLevel: "Licence_MIASHS",
    order: 2
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Licence_MIASHS_MarkovChain.md",
    title: "Chaînes de Markov à États Finis",
    level: "Post_Bac",
    subLevel: "Licence_MIASHS",
    order: 3
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Eco_Solow.md",
    title: "Le Modèle de Solow",
    level: "Post_Bac",
    subLevel: "Sup_Eco",
    order: 1
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Eco_Optimisation.md",
    title: "Microéconomie et Optimisation",
    level: "Post_Bac",
    subLevel: "Sup_Eco",
    order: 2
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Eco_GameTheory.md",
    title: "Duopoles et Théorie des Jeux",
    level: "Post_Bac",
    subLevel: "Sup_Eco",
    order: 3
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Finance_BlackScholes.md",
    title: "Évaluation quantitative et Modèle de Black-Scholes",
    level: "Post_Bac",
    subLevel: "Sup_Finance",
    order: 1
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Finance_Markowitz.md",
    title: "Théorie Moderne du Portefeuille de Markowitz",
    level: "Post_Bac",
    subLevel: "Sup_Finance",
    order: 2
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Finance_CoxRoss.md",
    title: "Options Binomiales et Arbres de Cox-Ross-Rubinstein",
    level: "Post_Bac",
    subLevel: "Sup_Finance",
    order: 3
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Bio_Epidemio.md",
    title: "Modèles Épidémiologiques SIR",
    level: "Post_Bac",
    subLevel: "Sup_Bio",
    order: 1
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Bio_LotkaVolterra.md",
    title: "Relations Proies-Prédateurs de Lotka-Volterra",
    level: "Post_Bac",
    subLevel: "Sup_Bio",
    order: 2
  },
  {
    id: "/Cours_Math/04_Post_Bac/Sup_Universite/Course_Sup_Bio_MichaelisMenten.md",
    title: "Cinétique Enzymatique de Michaelis-Menten",
    level: "Post_Bac",
    subLevel: "Sup_Bio",
    order: 3
  }
];

index.push(...tsxCourses);

index.sort((a, b) => {
  if (a.level !== b.level) return a.level.localeCompare(b.level);
  if (a.subLevel !== b.subLevel) return (a.subLevel || '').localeCompare(b.subLevel || '');
  return a.order - b.order;
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf-8');
