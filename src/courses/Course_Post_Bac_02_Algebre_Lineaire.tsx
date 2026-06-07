import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Post_Bac_02_Algebre_Lineaire: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-ALGLIN"
        title="Algèbre Linéaire"
        subtitle="Espaces vectoriels, applications linéaires, et matrices de passage. Le cœur des mathématiques modernes."
        duration="1h 30"
      />

      <Section title="⚠️ Introduction : Plus Haut, Plus Loin" icon="🚀" color="emerald">
        <p>
          Au lycée, un "vecteur" c'est une flèche dans le plan (x,y) ou (x,y,z). En algèbre linéaire, on généralise ce concept : un vecteur peut être un polynôme, une fonction, une matrice, ou une suite infinie ! 
        </p>
        <p className="mt-2">
          À partir du moment où tu peux <strong>additionner</strong> deux objets entre eux, et les <strong>multiplier</strong> par un scalaire (un nombre)... alors cet ensemble d'objets forme un Espace Vectoriel.
        </p>
        
        <InfoBlock type="definition" title="Le Graal de l'Ingénieur">
          Chaque fois que Google classe une page web, qu'une IA apprend un mot, ou que la physique quantique décrit un atome, on manipule des espaces vectoriels de dimension énorme.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Familles de Vecteurs" icon="👨‍👩‍👧‍👦" color="indigo">
        <p className="mb-4">
          Dans un espace E, on peut choisir une petit ensemble de vecteurs qu'on appelle "famille". On les juge selon deux critères cruciaux.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="1. Famille Libre" 
            math={"\\lambda_1 v_1 + ... + \\lambda_n v_n = 0 \\implies \\lambda_i = 0"} 
          />
          <FormulaBox 
            title="2. Famille Génératrice" 
            math={"\\text{Tout } x \\in E \\text{ peut s'écrire } \\\\ x = a_1 v_1 + ... + a_n v_n"} 
          />
        </div>
        <div className="mt-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>La Base :</strong> Si une famille est à la fois LIBRE (personne n'est inutile/copié sur l'autre) et GÉNÉRATRICE (ils sont assez nombreux pour construire tout l'espace), on appelle ça une <strong>BASE</strong>. Le nombre de vecteurs dans cette base forme la <strong>Dimension</strong> de l'espace.
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Libres ou Liés ?"
          question={<p>Dans <><MathComponent math={"\\mathbb{R}^3"} /></>, on considère les vecteurs <><MathComponent math={"v_1 = (1, 0, 0)"} /></>, <><MathComponent math={"v_2 = (0, 1, 0)"} /></> et <><MathComponent math={"v_3 = (2, 3, 0)"} /></>. Cette famille est-elle libre ou liée ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser une combinaison linéaire</p>
              <p>Une famille est liée si l'un des vecteurs peut s'écrire comme une combinaison (un mélange) des autres.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Chercher la formule</p>
              <p>Regarde attentivement <><MathComponent math={"v_3"} /></>. Que donne <><MathComponent math={"2v_1 + 3v_2"} /></> ? Cela donne exactement <><MathComponent math={"(2, 3, 0)"} /></> !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : La famille est LIÉE ! En effet, <><MathComponent math={"v_3 = 2v_1 + 3v_2"} /></>. Le vecteur <><MathComponent math={"v_3"} /></> n'apporte aucune "nouvelle dimension" à l'espace, il vit entièrement dans le plan défini par <><MathComponent math={"v_1"} /></> et <><MathComponent math={"v_2"} /></>.</p>
            </div>
          ]}
        />
        
        <InteractiveExercise
          title="Exercice 2 : Application de Théorème du Rang"
          question={<p>Soit <><MathComponent math={"f : \\mathbb{R}^5 \\rightarrow \\mathbb{R}^3"} /></> une application linéaire. On a calculé que son noyau (Ker f) est de dimension 2. L'application <><MathComponent math={"f"} /></> est-elle surjective ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Appelons le Théorème du Rang</p>
              <p>Le théorème dit : <><MathComponent math={"\\dim(E) = \\dim(\\ker f) + \\dim(\\text{Im } f)"} /></>. Ici l'espace de départ a pour dimension 5.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Calculer la dimension de l'Image</p>
              <p><><MathComponent math={"5 = 2 + \\dim(\\text{Im } f)"} /></>. On en déduit que <><MathComponent math={"\\dim(\\text{Im } f) = 3"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Oui ! L'espace d'arrivée de la fonction a pour dimension 3 (c'est <><MathComponent math={"\\mathbb{R}^3"} /></>). Puisque l'Image a aussi pour dimension 3, cela veut dire que l'Image = l'espace d'arrivée entier. Donc TOUT l'espace est atteint. La fonction est surjective !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="📜 Applications Linéaires & Noyau" icon="🏭" color="amber">
        <p className="mb-4">
          Une application linéaire 'f' est une usine de transformation qui respecte parfaitement les proportions : <strong>f(u + v) = f(u) + f(v)</strong> et <strong>f(λu) = λf(u)</strong>.
        </p>
        
        <InfoBlock type="definition" title="Ker et Im (Noyau et Image)">
          <strong>Le Noyau (Ker f) :</strong> L'ensemble de tous les vecteurs 'x' qui sont broyés par la fonction pour donner 0 : f(x) = 0.<br/>
          <strong>L'Image (Im f) :</strong> L'ensemble de tous les résultats possibles en sortie de l'usine.
        </InfoBlock>

        <div className="mt-4 text-center">
            <h4 className="font-bold text-amber-900 dark:text-amber-100">Le Théorème du Rang (Très Imporant)</h4>
            <div className="font-mono text-lg text-amber-950 dark:text-amber-50 mt-2 p-3 bg-card border border-amber-300 rounded inline-block">
                dim(Ker f) + dim(Im f) = dim(E)
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">L'énergie ne se perd pas : la dimension de ce qui est détruit (Noyau) + ce qui sort (Image) = ce qui entre (E).</p>
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Une application linéaire est Injective si et seulement si son Noyau ne contient QUE le vecteur nul {"{0}"}.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Si Ker f = {"{0}"}, aucune "information" n'est détruite ou fusionnée vers la sortie. Chaque entrée mène à une sortie unique. C'est l'un des théorèmes les plus utiles en algèbre.</span></>}
          />
          <Flashcard 
            front={<>La dimension de l'espace des Polynômes de degré au plus 2 (noté R2[X]) est de 2.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Un polynôme est ax² + bx + c. Il te faut 3 paramètres pour le définir (a, b et c). La base canonique est {"{1, X, X²}"}. Donc la dimension vaut 3 ! L'espace Rn[X] a pour dimension n+1.</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Testeur de Concepts" icon="🕹️" color="slate">
        <FillInTheBlanks 
          id="pb-alg-eval"
          content={[
            "Dans R³, une famille contenant 4 vecteurs sera FORCÉMENT ",
            { options: ["Liée", "Libre", "Génératrice"], correctAnswer: 0 },
            " car il ne peut pas y avoir plus de vecteurs libres que la dimension de l'espace. \nÀ l'inverse, si une famille de R³ possède seulement 2 vecteurs, elle ne pourra JAMAIS être ",
            { options: ["Liée", "Libre", "Génératrice"], correctAnswer: 2 },
            " ! Il manque des briques pour construire tout l'espace."
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'ai une application linéaire 'f' allant d'un espace E de dimension N, vers un espace F de dimension N (même dimension). Si on prouve que 'f' est Injective (Ker f = {0}). Que peut-on dire d'autre ?",
              options: [
                "f est une base",
                "f est bijective (un isomorphisme)",
                "On ne peut rien dire"
              ],
              correctAnswer: 1,
              explanation: "C'est la magie de la dimension finie ! Si E et F ont la même dimension, Injectif = Surjectif = Bijectif. C'est du tout ou rien."
            },
            {
              question: "Quelle est la matrice de la fonction Identité (f(x) = x) ?",
              options: [
                "Une matrice vide",
                "La matrice nulle",
                "La matrice Identité I"
              ],
              correctAnswer: 2,
              explanation: "Logique, I*X = X. La matrice Identité a des 1 sur la diagonale principale et des 0 partout ailleurs."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais ce qu'est un espace vectoriel (je peux l'imaginer avec des polynômes par exemple).",
            "Famille Libre : Aucun vecteur ne peut se calculer grâce aux autres.",
            "Base : Une famille à la fois Libre et Génératrice.",
            "Théorème du rang : dim(Ker f) + rg(f) = dim(E)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_02_Algebre_Lineaire;
