import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Post_Bac_08_Topologie: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-TOPO"
        title="Topologie"
        subtitle="Ouverts, fermés, voisinages et continuité. La science de la proximité."
        duration="1h 20"
      />

      <Section title="⚠️ Introduction : Le Caoutchouc" icon="🍩" color="emerald">
        <p>
          Si tu étires, que tu tords, ou que tu pétris un objet mathématique sans le déchirer ou le trouer... alors topologiquement parlant, <strong>c'est exactement le même objet !</strong>. L'exemple ultime : pour un mathématicien, un Donut et une Tasse de café c'est pareil (1 seul trou de passage au milieu).
        </p>
        <p className="mt-2">
          La topologie se fout des distances (des mètres, ou de l'angle). Elle ne juge QUE la notion de <strong>'Voisinage'</strong> (qui touche qui, qui englobe qui).
        </p>
      </Section>

      <Section title="⚖️ Ouverts, Fermés et Frontières" icon="🚪" color="indigo">
        <p className="mb-4">
          Un ensemble est dit <strong>Ouvert</strong> (comme l'intervalle ]0, 1[) si à l'intérieur, peu importe où vous vous tenez, vous pouvez TOUJOURS dessiner une mini bulle de protection autour de vous qui reste dans l'ensemble. 
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="L'Adhérence (Fermeture)" 
            math={"\\bar{A} \\\\ \\text{L'ensemble avec sa Frontière collée}"} 
          />
          <FormulaBox 
            title="L'Intérieur" 
            math={"A^{\\circ} \\\\ \\text{L'ensemble OÙ on a gratté la surface extérieure}"} 
          />
        </div>
        <div className="mt-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>Lien vital :</strong> La Frontière d'un ensemble, mathématiquement s'écrit (Adhérence) MOINS (Intérieur). Un ensemble est FERMÉ (comme [0,1]) si et seulement si il contient sa propre frontière, donc il englobe toutes ses limites sans jamais qu'elles fuient.
        </div>
      </Section>

      <Section title="📜 La Continuité par les Ouverts" icon="🌊" color="amber">
        <p className="mb-4">
          Au lycée, f(x) est continue si "on trace la courbe sans lever le stylo". En post-bac, c'est drastiquement différent et absolu.
        </p>
        
        <InfoBlock type="definition" title="La Définition Topologique">
          Une fonction f : E → F est CONTINUE si et seulement si <strong>l'image réciproque (l'inverse temporaire f^-1) de TOUT ensemble Ouvert de l'arrivée, reste un Ouvert au départ.</strong>
        </InfoBlock>

      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Ouvert ou Fermé ?"
          question={<p>Dans <><MathComponent math={"\\mathbb{R}"} /></> avec la topologie usuelle (la distance classique), considérons l'intervalle <><MathComponent math={"I = ]0, 1]"} /></>. Est-il ouvert ? Est-il fermé ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Test de l'ouvert</p>
              <p>Pour être ouvert, chaque point doit contenir une petite bulle (un petit intervalle centré) incluse dans <><MathComponent math={"I"} /></>. Regardons le point 1. Toute bulle autour de 1, comme <><MathComponent math={"]1-\\epsilon, 1+\\epsilon["} /></>, va forcément déborder à droite de 1 ! Donc <><MathComponent math={"I"} /></> n'est PAS ouvert.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Test du fermé</p>
              <p>Pour être fermé, <><MathComponent math={"I"} /></> doit contenir toutes ses limites. Or la suite <><MathComponent math={"1/n"} /></> (pour <><MathComponent math={"n \\ge 1"} /></>) est entièrement dans <><MathComponent math={"I"} /></>, mais sa limite <><MathComponent math={"0"} /></> n'est PAS dans <><MathComponent math={"I"} /></>. Il fuit ! Donc <><MathComponent math={"I"} /></> n'est PAS fermé.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"I = ]0, 1]"} /></> n'est NI ouvert, NI fermé ! C'est ce qu'on appelle un intervalle semi-ouvert. (Seuls <><MathComponent math={"\\emptyset"} /></> et <><MathComponent math={"\\mathbb{R}"} /></> sont à la fois ouverts et fermés en même temps, mais beaucoup d'ensembles ne sont ni l'un ni l'autre.)</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Compacité dans R²"
          question={<p>On définit dans <><MathComponent math={"\\mathbb{R}^2"} /></> le cercle trigonométrique <><MathComponent math={"S = \\{(x,y) \\in \\mathbb{R}^2 \\mid x^2 + y^2 = 1\\}"} /></>. Est-il compact ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Fermé ?</p>
              <p><><MathComponent math={"S"} /></> est l'image réciproque du point fermé <><MathComponent math={"\\{1\\}"} /></> par la fonction continue <><MathComponent math={"f(x,y)=x^2+y^2"} /></>. L'image réciproque d'un fermé par une fonction continue est un fermé ! Donc <><MathComponent math={"S"} /></> est fermé.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Borné ?</p>
              <p>Le cercle est contenu par exemple dans le carré de coordonnées <><MathComponent math={"[-2,2] \\times [-2,2]"} /></>. Ou plus simplement, son rayon est 1, donc toutes ses distances à l'origine sont limitées. Il est donc borné.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Dans <><MathComponent math={"\\mathbb{R}^n"} /></>, on a l'équivalence (Théorème de Borel-Lebesgue) : Compact <><MathComponent math={"\\iff"} /></> Fermé ET Borné. Puisque le cercle <><MathComponent math={"S"} /></> est fermé et borné, alors OUI c'est un espace topologiquement Compact !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le vide ø, il est Ouvert ou Fermé ?</>}
            back={<><strong>LES DEUX !</strong><br/><span className="text-sm">Il est à la fois fermé et ouvert (C'est un "Clopen" en anglais). C'est magique mais c'est comme L'espace Entier E, ce sont les seules exceptions obligatoires.</span></>}
          />
          <Flashcard 
            front={<>Un sous-ensemble peut-il être Dense partout ?</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Prends le sel de cuisine (Q, les rationnels) et la soupe (R, les réels). Il y a du sel absolument PARTOUT. Entre deux décimaux quelconques, je pourrai toujours coincer une fraction infinitésimale. L'adhérence de Q c'est R tout entier. Donc Q est un sous-ensemble 'dense' dans R.</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur de Topologie" icon="🕹️" color="slate">
        <FillInTheBlanks 
          id="pb-topo-eval"
          content={[
            "Le Théorème de Bolzano-Weierstrass affirme que de toute suite 'bornée' (coincée dans une boîte)... on peut toujours extraire une sous-suite partielle qui finit par ",
            { options: ["S'ennuyer", "Converger vers un point limite", "S'évaporer"], correctAnswer: 1 },
            ". \nCe concept magique, où l'espace est tellement serré que si on a une infinité de points sous cloche, ils finissent POUROBER par s'empiler et s'amasser en un point donné... On appelle cette propriété la ",
            { options: ["Compacité", "Connexité", "Divergence"], correctAnswer: 0 },
            ". \nDans R^n, la Compacité c'est le Graal : un ensemble Compact est obligatoirement Fermé et Borné. S'il est les deux, tu possèdes les pouvoirs divins de l'Analyse ! "
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si j'utilise une fonction CONTINUE sur un ensemble COMPACT au départ. Que garantit le théorème ?",
              options: [
                "L'image d'arrivée est un Ouvert.",
                "La fonction est constante.",
                "L'image d'arrivée EST AUSSI un ensemble Compact ! (Donc elle atteint son Max et son Min)"
              ],
              correctAnswer: 2,
              explanation: "Exact ! C'est le théorème Bornes Atteintes. Toute fonction continue sur un compact a son image qui 'emporte' la compacité avec elle vers l'arrivée. Donc la fonction est bornée, ET elle atteint le zénith absolu et les abysses de ses valeurs !"
            },
            {
              question: "C'est quoi un ensemble 'Connexe' ?",
              options: [
                "Un ensemble en 1 Seul Bloc (qui ne peut pas être coupé en 2 ouverts disjoints)",
                "Un ensemble troué",
                "Un ensemble connecté à Internet"
              ],
              correctAnswer: 0,
              explanation: "La Connexité, c'est l'impossibilité de trancher l'ensemble au sabre topologique (par l'union de deux ouverts séparés). Dans le monde banal des réels R, les seuls ensembles connexes sont les Intervalles !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Ouvert = La réunion quelconque d'ouverts est un Ouvert.",
            "Fermé = Le complémentaire d'un ouvert. L'intersection de fermés est un Fermé.",
            "Compact = Le roi suprême. Propriété d'extraction infinie.",
            "Connexe = 1 seul bloc plein."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Post_Bac_08_Topologie;
