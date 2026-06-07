import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import ComplexPlane from '../../components/interactive/ComplexPlane';

const Course_Post_Bac_01_Complexes: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-CPX"
        title="Nombres Complexes Avancés"
        subtitle="Racines n-ièmes, polynômes et topologie du plan complexe pour l'enseignement supérieur."
        duration="1h 15"
      />

      <Section title="⚠️ Introduction : Au-delà du Lycée" icon="🌌" color="emerald">
        <p>
          Au lycée, on découvre C comme un plan géométrique (module, argument). Dans le supérieur (Prépa/Fac), on utilise les complexes pour <strong>casser des polynômes</strong>, étudier des fonctions de la variable complexe, et résoudre des équations différentielles.
        </p>
        <p className="mt-2 mb-4">
          Le domaine complexe est si riche que l'analyse complexe est une matière à part entière.
        </p>

        <InfoBlock type="funfact" title="Le saviez-vous ?">
          L'existence des nombres complexes a été découverte par le mathématicien italien Gerolamo Cardano au XVIe siècle, non pas pour résoudre des équations du second degré sans solution réelle, mais pour résoudre des équations du <strong>troisième degré</strong> ! Ironiquement, sa formule pour trouver des racines réelles passait par des étapes contenant des racines carrées de nombres négatifs.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Les Racines n-ièmes de l'unité" icon="❄️" color="indigo">
        <p className="mb-4 font-normal">
          Dans les réels, résoudre x³ = 1 n'a qu'une solution (x=1). Dans les complexes, une équation de degré N a EXACTEMENT N solutions ! 
          Géométriquement, elles forment un polygone régulier à N côtés inscrit dans le cercle unité.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Formule de l'ensemble U_n" 
            math={"U_n = \\left\\{ e^{i \\frac{2k\\pi}{n}} \\mid k \\in [[0, n-1]] \\right\\}"} 
          />
          <FormulaBox 
            title="Propriété fondamentale" 
            math={"\\text{La somme de toutes les} \\\\ \\text{racines n-ièmes vaut 0 (si n>1)}"} 
          />
        </div>

        <InfoBlock type="reminder" title="Rappel">
          Toute racine n-ième de l'unité {"$z \\in U_n$"} vérifie par définition {"$z^n = 1$"}. En particulier, leur module est égal à 1, ce qui signifie qu'elles sont toutes situées sur le cercle trigonométrique de rayon 1. La somme est nulle car elle s'exprime comme une progression géométrique de raison {"$q = e^{i \\frac{2\\pi}{n}}$"}.
        </InfoBlock>
      </Section>

      <Section title="📜 Théorème de d'Alembert-Gauss" icon="🗡️" color="amber">
        <p className="mb-4">
          Aussi appelé <strong>Théorème Fondamental de l'Algèbre</strong>. C'est l'arme de destruction massive pour les polynômes.
        </p>
        
        <InfoBlock type="definition" title="Le Théorème">
          Tout polynôme non constant à coefficients complexes admet <strong>au moins une racine</strong> dans C. <br/>
          (Par récurrence, cela implique que tout polynôme de degré n sur C est scindé, il se factorise complètement en n facteurs de degré 1).
        </InfoBlock>
        
        <div className="my-4 p-4 border border-amber-100 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-900/20 rounded-xl text-amber-950 dark:text-amber-50 text-sm">
          <strong>Lien avec R :</strong> Si un polynôme est à coefficients RÉELS, et qu'il possède une racine complexe 'z', alors son conjugué 'z_barre' est FORCÉMENT aussi une racine. Les complexes marchent toujours par paires conjuguées quand on travaille sur les réels !
        </div>

        <InfoBlock type="info" title="Zoom sur : Les corps algébriquement clos">
          En algèbre abstraite, on dit qu'un corps {"$\\mathbb{K}$"} est <strong>algébriquement clos</strong> si tout polynôme non constant à coefficients dans {"$\\mathbb{K}$"} admet au moins une racine dans {"$\\mathbb{K}$"}. Le Théorème Fondamental établit donc que {"$\\mathbb{C}$"} est algébriquement clos, ce qui n'est pas le cas de {"$\\mathbb{R}$"} (puisque {"$X^2 + 1$"} n'a pas de racine réelle) ni de {"$\\mathbb{Q}$"}.
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Les racines cubiques de l'unité"
          question={<p>On cherche à résoudre <><MathComponent math={"z^3 = 1"} /></> sur <><MathComponent math={"\\mathbb{C}"} /></>, on note ces solutions les racines cubiques de l'unité. Quelles sont-elles ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Forme exponentielle</p>
              <p>On sait que 1 s'écrit <><MathComponent math={"1 = e^{i \\times 0}"} /></>. Les racines n-ièmes de 1 s'écrivent sous la forme <><MathComponent math={"z_k = e^{i\\frac{2k\\pi}{n}}"} /></>. Ici n=3.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Les valeurs de k</p>
              <p>On fait varier <><MathComponent math={"k"} /></> de <><MathComponent math={"0"} /></> à <><MathComponent math={"n-1"} /></>, donc de <><MathComponent math={"0"} /></> à <><MathComponent math={"2"} /></>. <><MathComponent math={"z_0 = e^0 = 1"} /></>, <><MathComponent math={"z_1 = e^{i\\frac{2\\pi}{3}}"} /></>, et <><MathComponent math={"z_2 = e^{i\\frac{4\\pi}{3}}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Les 3 racines sont : <><MathComponent math={"1"} /></>, <><MathComponent math={"e^{i\\frac{2\\pi}{3}}"} /></> (souvent notée <><MathComponent math={"j"} /></>) et <><MathComponent math={"e^{i\\frac{4\\pi}{3}}"} /></> (qui est aussi <><MathComponent math={"\\bar{j}"} /></> ou <><MathComponent math={"j^2"} /></>).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Produit et Somme de j"
          question={<p>On note <><MathComponent math={"j = e^{i\\frac{2\\pi}{3}}"} /></>. Que vaut <><MathComponent math={"1 + j + j^2"} /></> et que vaut <><MathComponent math={"j^3"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Cube</p>
              <p><><MathComponent math={"j"} /></> est une racine cubique de l'unité (c'est-à-dire solution de <><MathComponent math={"z^3 = 1"} /></>). Donc évidemment, <><MathComponent math={"j^3 = 1"} /></> !</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Somme</p>
              <p>La somme des racines n-ièmes (pour n {">"} 1) est toujours nulle. Or les trois racines sont <><MathComponent math={"1"} /></>, <><MathComponent math={"j"} /></> et <><MathComponent math={"j^2"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"j^3 = 1"} /></> et <><MathComponent math={"1 + j + j^2 = 0"} /></>. Ce sont deux identités hyper classiques à connaître par cœur en mathématiques supérieures !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Topologie et Fonctions Holomorphes" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>C'est quoi une fonction Holomorphe ?</>}
            back={<><strong>La dérivation complexe.</strong><br/><span className="text-sm">Une fonction f(z) dérivable dans le monde complexe est dite holomorphe. C'est infiniment plus fort que la dérivation réelle. Une fonction holomorphe est automatiquement développable en série entière (analytique) !</span></>}
          />
          <Flashcard 
            front={<>C'est quoi les équations de Cauchy-Riemann ?</>}
            back={<><strong>Le pont entre R² et C.</strong><br/><span className="text-sm">Si on écrit f(x+iy) = U(x,y) + iV(x,y), les dérivées partielles de U et V sont liées (dU/dx = dV/dy et dU/dy = -dV/dx) pour que f soit dérivable !</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur de Racines & Plan Complexe" icon="🕹️" color="slate">
        <ComplexPlane />

        <div className="mt-6">
          <FillInTheBlanks 
            id="pb-cpx-eval"
            content={[
              "Combien de solutions complexes possède l'équation z^10 = 1 ? Il y a ",
              { options: ["1", "5", "10"], correctAnswer: 2 },
              " solutions appelées racines 10-ièmes de l'unité. Elles sont disposées sur le cercle trigonométrique et forment un décagone régulier. La somme de toutes ces 10 solutions est égale à ",
              { options: ["0", "1", "10"], correctAnswer: 0 },
              ". \nEt si je multiplie TOUTES ces 10 racines entre elles, le produit vaut ",
              { options: ["-1", "0", "1"], correctAnswer: 0 },
              " (Car la formule du produit est (-1)^(n-1))."
            ]}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'écris l'exponentielle complexe e^z avec z = x + iy. Quelle est l'affirmation vraie ?",
              options: [
                "Son module est toujours 1",
                "Son module est e^x",
                "Ça n'existe pas"
              ],
              correctAnswer: 1,
              explanation: "Exact ! e^(x+iy) = e^x * e^iy. Le premier terme e^x est un réel positif (c'est le module de l'ensemble !), et e^iy est la partie directionnelle de module 1."
            },
            {
              question: "Quelle affirmation est vraie concernant un polynôme P à coefficients réels ?",
              options: [
                "Il a forcément des racines réelles",
                "S'il a une racine complexe z, son conjugué nz barre l'est aussi",
                "Il est toujours scindé sur R"
              ],
              correctAnswer: 1,
              explanation: "C'est l'astuce clé ! Les racines complexes apparaissent toujours par paires conjuguées quand le modèle d'origine (les coefficients) est strictement réel."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Rappel : e^(i*theta) a un module de 1.",
            "L'équation z^n = a possède n racines dans C.",
            "D'Alembert-Gauss = Tout polynôme se factorise complètement dans C.",
            "Si les coefs d'un polynômes sont réels, les racines complexes vont par paires z et z_barre."
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

export default Course_Post_Bac_01_Complexes;
