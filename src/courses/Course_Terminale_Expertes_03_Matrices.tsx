import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { 
  MatrixMultiplicationVisualizer,
  MatrixInverseVisualizer,
  GraphAdjacencyVisualizer
} from './Ressources/MatricesInteractiveVisualizer';

const Course_Terminale_Expertes_03_Matrices: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-TE-MATR"
        title="Matrices & Graphes"
        subtitle="Stocker des données en tableaux géants et modéliser des réseaux sociaux."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : Tableaux de Nombres" icon="📊" color="emerald">
        <p>
          Si tu veux calculer les notes de 3 élèves sur 4 matières, tu as 12 numéros à gérer. Dans la finance ou l'IA, on gère des millions de données simultanément. Pour ça, on va utiliser des tableaux géants que l'on appelle des <strong>Matrices</strong>.
        </p>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          La magie des matrices, c'est de pouvoir tout compacter dans une seule lettre (souvent A), et d'effectuer des opérations groupées en un seul calcul matriciel.
        </p>
        
        <InfoBlock type="definition" title="Dimension (L, C)">
          Une matrice de dimension <strong>(m, p)</strong> possède 'm' <strong>Lignes</strong> (horizontales) et 'p' <strong>Colonnes</strong> (verticales). <br/>
          (Astuce : L et C, ça s'écrit dans l'ordre de Lecture Courante).
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Multiplication Diabolique" icon="⚔️" color="indigo">
        <p className="mb-4">
          L'addition de deux matrices est enfantine : on additionne case par case. MAIS la multiplication est beaucoup plus sadique : <strong>on plonge une ligne dans une colonne !</strong>
        </p>
        
        <div className="bg-indigo-50/55 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl mb-4">
          <p className="font-bold text-indigo-950 dark:text-indigo-50 mb-2">Comment faire Ligne × Colonne ?</p>
          <ul className="text-sm text-indigo-900 dark:text-indigo-100 space-y-1 list-disc pl-4">
            <li>On prend la 1ère Ligne de la matrice de Gauche.</li>
            <li>On prend la 1ère Colonne de la matrice de Droite.</li>
            <li>On les met face à face, on multiplie chaque élément avec son jumeau d'en face, puis on FAIT LA SOMME.</li>
          </ul>
        </div>
        
        <div className="mt-4 p-4 border border-rose-100 dark:border-rose-800/60 bg-rose-50/50 dark:bg-rose-900/20 rounded-xl text-rose-950 dark:text-rose-50 text-sm">
          <strong>Condition vitale :</strong> Pour pouvoir multiplier A × B, il faut absolument que le nombre de <strong>Colonnes</strong> de A soit égal au nombre de <strong>Lignes</strong> de B. Sinon, elles ne "s'enclenchent" pas ensemble. (Ex: Une matrice [2x3] peut être multipliée avec une [3x4], ce qui donnera au final une [2x4]).
        </div>

        {/* INTERACTIVE MULTIPLICATION WIDGET */}
        <MatrixMultiplicationVisualizer />
      </Section>

      <Section title="📜 L'Identité et l'Inverse" icon="🪞" color="amber">
        <p className="mb-4">Dans les nombres réels, si je t'écris 5 × x = 1, la réponse c'est l'inverse (1/5). Avec les matrices carrées, c'est le même principe.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Matrice Identité (I)" 
            math={"\\text{Des 1 sur la diagonale,}\\\\ \\text{des 0 partout ailleurs.}\\\\ A \\times I_n = A"} 
          />
          <FormulaBox 
            title="Matrice Inverse (A⁻¹)" 
            math={"A \\times A^{-1} = I_n \\\\ \\text{Attention, } A^{-1}\\\\ \\text{n'existe pas toujours !}"} 
          />
        </div>
        <div className="mt-4 text-sm text-slate-700 dark:text-slate-300 bg-card p-3 border border-border rounded-lg">
          L'inverse d'une matrice nous sert à <strong>résoudre des systèmes d'équations instantanément.</strong> Si on écrit A * X = Y. Alors on trouve l'inconnue X en écrivant X = A⁻¹ * Y ! C'est la base de toute la robotique et de la 3D.
        </div>

        {/* INTERACTIVE INVERSE CALCULATOR */}
        <MatrixInverseVisualizer />
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>A × B est toujours égal à B × A.</>}
            back={<><strong>FAUX ! (C'est très grave).</strong><br/><span className="text-sm">La multiplication de matrices N'EST PAS COMMUTATIVE. L'ordre est vital. Souvent, la matrice B*A sera de taille différente, ou pire, le calcul sera impossible car les dimensions ne s'enclenchent plus !</span></>}
          />
          <Flashcard 
            front={<>Si j'ai A² - 4A = I. La matrice A est-elle inversible ?</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Je factorise par A. J'obtiens A * (A - 4I) = I. J'ai trouvé son inverse ! C'est la parenthèse (A - 4I). Donc oui, A est inversible et A⁻¹ = A - 4I.</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Test de la multiplication Ligne-Colonne"
          question={<p>On a une matrice Ligne <><MathComponent math={"A = \\begin{pmatrix} 2 & 3 \\end{pmatrix}"} /></> et une matrice Colonne <><MathComponent math={"B = \\begin{pmatrix} 4 \\\\ 5 \\end{pmatrix}"} /></>. Calcule <><MathComponent math={"A \\times B"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Vérifier la faisabilité</p>
              <p>A est de taille [1x2]. B est de taille [2x1]. Le nombre de colonnes de A (2) est égal au nombre de lignes de B (2). C'est autorisé ! Le résultat sera de taille [1x1] (un simple nombre).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Superposer la ligne sur la colonne</p>
              <p>Le 1er élément de A (2) rencontre le 1er élément de B (4). Le 2ème élément de A (3) rencontre le 2ème élément de B (5).</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On fait la somme des petits produits. <><MathComponent math={"2 \\times 4 + 3 \\times 5 = 8 + 15 = 23"} /></>. Le résultat est la matrice <><MathComponent math={"\\begin{pmatrix} 23 \\end{pmatrix}"} /></>.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Inverser une matrice 2x2"
          question={<p>Une formule magique existe pour les matrices 2x2. Soit <><MathComponent math={"M = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}"} /></>. La formule de son inverse (si le déterminant ad-bc n'est pas nul) est <><MathComponent math={"\\frac{1}{ad-bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}"} /></>. Trouve l'inverse de <><MathComponent math={"M = \\begin{pmatrix} 4 & 3 \\\\ 2 & 2 \\end{pmatrix}"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Calcul du déterminant (la croix)</p>
              <p>On fait <><MathComponent math={"a \\times d - b \\times c"} /></>. Donc <><MathComponent math={"4 \\times 2 - 3 \\times 2 = 8 - 6 = 2"} /></>. Le déterminant est 2. La matrice est inversible !</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Échanger et Inverser les signes</p>
              <p>J'échange ce qu'il y a sur la diagonale principale (le 4 et le 2). Je mets un "moins" aux deux autres (le 3 et le 2). La matrice réarrangée est <><MathComponent math={"\\begin{pmatrix} 2 & -3 \\\\ -2 & 4 \\end{pmatrix}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Enfin, je divise tout par le déterminant (2). <br/>L'inverse <><MathComponent math={"M^{-1}"} /></> est <><MathComponent math={"\\begin{pmatrix} 1 & -1.5 \\\\ -1 & 2 \\end{pmatrix}"} /></>. Quelle puissance de feu !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Les Graphes et L'Arbre de Puissance" icon="🕹️" color="slate">
        <p className="mb-4">Le lien incroyable entre Graphes et Matrices :</p>
        <FillInTheBlanks 
          id="matr-eval"
          content={[
            "Un graphe est composé de points appelés des Ssommets. Pour représenter ce réseau dans un ordinateur, on utilise une <strong>Matrice d'Adjacence (M)</strong>. C'est une matrice carrée remplie de 0 et de 1. Si on met un 1 dans la Ligne A et la Colonne B, ça veut dire que ",
            { options: ["Le sommet A est supérieur à B", "Il y a un chemin direct entre A et B", "Rien"], correctAnswer: 1 },
            ". \nOr le graal absolu arrive quand tu calcules M² (la matrice élevée au carré). Les nombres qui vont apparaitre dans le tableau final te donneront le nombre de chemins possibles de longueur EXACTEMENT ",
            { options: ["1", "2", "Infinie"], correctAnswer: 1 },
            " entre deux villes. \nDonc si je dois construire un réseau de train, je fais M³, et je trouve d'un coup de bouton tous les parcours en 3 étapes ! "
          ]}
        />

        {/* INTERACTIVE GRAPH INTERACTION ZONE */}
        <GraphAdjacencyVisualizer />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est l'Astuce Ultime pour multiplier deux matrices à la main sans s'emmêler les pinceaux ?",
              options: [
                "Utiliser la calculatrice 100% du temps",
                "Le Schéma des Ascenseurs (la matrice B est dessinée 'au-dessus' du résultat)",
                "Placer les deux graphes M et C en file indienne"
              ],
              correctAnswer: 1,
              explanation: "C'est la méthode visuelle classique enseignée mondialement. On place la deuxième matrice en décalé vers le haut, ce qui forme une croix parfaite entre les lignes et les colonnes, pointant exactement sur la future case du résultat."
            },
            {
              question: "Si (A * B) * C est un produit de matrices. Ai-je le droit de calculer d'abord B*C, puis de faire A * (Le résultat) ?",
              options: [
                "Oui",
                "Non",
                "Seulement si B=C"
              ],
              correctAnswer: 0,
              explanation: "Ce qu'on t'interdit : BOUGER L'ORDRE des lettres. Mais l'ASSOCIATIVITÉ est parfaite : tu as tout a fait le droit de prioriser les calculs comme bon te semble tant que ça reste A, B, C de la gauche vers la droite."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "C'est toujours Ligne PUIS Colonne (L, C).",
            "A * B ≠ B * A",
            "Identité = I = Diagonale de 1 (Le super 1 de Matrix).",
            "M^k = Le nombre de chemins de longueur k sur le graphe."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Terminale_Expertes_03_Matrices;
