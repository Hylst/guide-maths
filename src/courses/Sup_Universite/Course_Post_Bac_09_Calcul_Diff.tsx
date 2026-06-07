import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import GradientDescentVisualizer from '../../components/interactive/GradientDescentVisualizer';

const Course_Post_Bac_09_Calcul_Diff: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-PB-DIFF"
        title="Calcul Différentiel et Optimisation"
        subtitle="Machines à gradients, dérivées partielles, et recherche des sommets à plusieurs dimensions."
        duration="1h 30"
      />

      <Section title="⚠️ Introduction : La Dérivée Ultime" icon="🧗" color="emerald">
        <p>
          Au lycée, f(x) prend une valeur et recrache une valeur, donc la dérivée temporelle f'(x) est un simple nombre (une pente). 
        </p>
        <p className="mt-2 mb-4">
          En machine learning ou en physique pour une température dans le vide, les fonctions ont TOUTES la forme Magique : <strong>f(x, y, z, ... , t)</strong>. Tu es sur une surface de montagne 3D ou 8D à une position donnée. Comment définir la 'pente', alors qu'il y en a une infinité autour de toi selon d'où tu tournes la tête ?
        </p>

        <InfoBlock type="funfact" title="Le saviez-vous ?">
          En dimension infinie, la dérivation elle-même devient un opérateur linéaire agissant sur des espaces vectoriels de fonctions ! La formulation rigoureuse du calcul différentiel pour ces espaces s'appelle le <strong>calcul des variations</strong>. Il permet de trouver des courbes minimales (comme le chemin de lumière de Fermat ou les orbites d'action minimale d'Hamilton/Lagrange) et est indispensable en relativité générale et physique quantique.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Les Dérivées Partielles et le Gradient" icon="🏹" color="indigo">
        <p className="mb-4">
          C'est simple : on choisit une direction, et OON CONGÈLE tout le rete ! C'est ce qu'on appelle les dérivées partielles ∂f/∂x et ∂f/∂y.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
          <FormulaBox 
            title="La Partielle en X (d rond)" 
            math={"\\frac{\\partial f}{\\partial x} (x,y)"} 
          />
          <FormulaBox 
            title="Le Vecteur Gradient (Nabla)" 
            math={"\\nabla f = \\begin{pmatrix} \\partial f/\\partial x \\\\ \\partial f/\\partial y \\end{pmatrix}"} 
          />
        </div>
        <div className="my-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm">
          <strong>L'ADN de l'IA (La descente de Gradient) :</strong> Le Vecteur Gradient pointe TOUJOURS dans la direction de la <strong>PENTE MAXIMALE</strong> de dépassement. C'est l'axe le plus raide de la montagne. À l'inverse, si on trace son chemin vers '- Nabla', on obtient l'algorithme "Descente de Gradient" utilisé par toutes les IA actuelles (ChatGPT/Midjourney) pour minimiser l'Intelligence d'Erreur (La fonction de coût).
        </div>

        <InfoBlock type="reminder" title="Rappel : Dérivabilité vs Continuité">
          En dimension supérieure à 1, l'existence simple de toutes les dérivées partielles orientées en un point {"$\\vec{a}$"} ne suffit <strong>PAS</strong> à garantir que la fonction y est continue ! C'est un piège de licence classique. C'est pour cela qu'on définit la <strong>différentiabilité</strong> d'une manière beaucoup plus forte, qui elle assure la continuité et l'existence d'un plan tangent approchant au premier ordre.
        </InfoBlock>
      </Section>

      <Section title="📜 La Différentielle Absolue (Matrice Jacobienne)" icon="🕸️" color="amber">
        <p className="mb-4">
          Si votre fonction retourne un Vecteur (et non un simple noble d'altitude). Par exemple un courant de vent F(x,y,z) = (VentX, VentY, VentZ). Alors on ne peut plus faire un gradient.
        </p>
        
        <InfoBlock type="definition" title="La Matrice Jacobienne">
          Dans ce cas, LA dérivée Globale 'df' est une vraie Matrice. On range toutes les dérivées partielles dans une grille où les Lignes sont les dimensions d'arrivée, et les Colonnes les dimensions de départ. C'est LE zoom microscopique <strong>linéaire</strong> de l'espace à ce point local.
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : Les Multiplicateurs de Lagrange">
          L'optimisation sous contrainte est le nerf de l'ingénierie. Si on cherche à maximiser {"$f(x,y)$"} sous la contrainte géométrique d'égalité {"$g(x,y)=0$"}, les multiplicateurs de Lagrange établissent qu'au point optimal, le gradient de la contrainte est colinéaire à celui de la fonction : {"$\\nabla f(x,y) = \\lambda \\nabla g(x,y)$"}. On résout cela en cherchant les points critiques sans contrainte de la fonction Lagrangienne : {"$\\mathcal{L}(x,y,\\lambda) = f(x,y) - \\lambda g(x,y)$"}.
        </InfoBlock>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul de Gradient"
          question={<p>Soit la fonction <><MathComponent math={"f(x,y) = x^2 y + \\sin(x)"} /></>. Quel est son vecteur gradient au point de coordonnées <><MathComponent math={"(\\pi/2, 1)"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Dérivée partielle par rapport à x</p>
              <p>On dérive en "congelant" y (y est traité comme une constante comme 5). <><MathComponent math={"\\frac{\\partial f}{\\partial x} = 2xy + \\cos(x)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Dérivée partielle par rapport à y</p>
              <p>On "congèle" x cette fois (y compris le <><MathComponent math={"\\sin(x)"} /></> qui est donc une constante à dériver en 0). <><MathComponent math={"\\frac{\\partial f}{\\partial y} = x^2 \\times 1 + 0 = x^2"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On évalue au point <><MathComponent math={"x=\\pi/2"} /></> et <><MathComponent math={"y=1"} /></>. On obtient <><MathComponent math={"\\frac{\\partial f}{\\partial x} = 2(\\pi/2)(1) + \\cos(\\pi/2) = \\pi + 0 = \\pi"} /></>. Et <><MathComponent math={"\\frac{\\partial f}{\\partial y} = (\\pi/2)^2 = \\pi^2/4"} /></>. Le vecteur gradient est donc le vecteur (colonne) de coordonnées <><MathComponent math={"(\\pi, \\pi^2/4)"} /></> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Recherche de points critiques"
          question={<p>Trouver le ou les points critiques de la fonction de la cuvette : <><MathComponent math={"f(x,y) = x^2 + y^2 - 4x + 6y"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Système du gradient Nul</p>
              <p>Pour qu'un point soit critique, il FAUT que le gradient soit nul (surface plate). Donc <><MathComponent math={"\\frac{\\partial f}{\\partial x} = 0"} /></> ET <><MathComponent math={"\\frac{\\partial f}{\\partial y} = 0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Résolution</p>
              <p><><MathComponent math={"\\frac{\\partial f}{\\partial x} = 2x - 4 = 0"} /></> (ce qui donne <><MathComponent math={"x=2"} /></>). Puis <><MathComponent math={"\\frac{\\partial f}{\\partial y} = 2y + 6 = 0"} /></> (ce qui donne <><MathComponent math={"y=-3"} /></>).</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : L'unique point critique est le point de coordonnées <><MathComponent math={"(2, -3)"} /></>. Pour savoir si c'est un Maximum ou un Minimum, il faudrait calculer la matrice Hessienne, qui a pour termes <><MathComponent math={"\\frac{\\partial^2 f}{\\partial x^2} = 2"} /></> et <><MathComponent math={"\\frac{\\partial^2 f}{\\partial y^2} = 2"} /></>. La trace et le déterminant (4) sont positifs : on est au fond d'un bol convexe global !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le Théorème de Schwarz dit qu'on peut croiser les dérivées ?</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Si tu dérives par rapport à 'x' puis ENSUITE par rapport à 'y'.... c'est l'exact même résultat que si tu fais 'y' puis ensuite 'x' ! (Sous condition C2 de l'existence lisse de la courbe bien sur).</span></>}
          />
          <Flashcard 
            front={<>Si le Gradient de la Montagne est le vecteur (0, 0), on est tout en haut (Max Absolu) ?</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">Si ∇f = 0, on sait que l'on est "à plat". C'est un 'Point Critique'. Ce peut être le vrai Sommet (Maximum), le Fond de la cuvette (Minimum)... OU BIEN le fameux "Point Selle de Cheval" (Col), qui remonte devant nous et glisse sur la gauche/droite.</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur de Gradient & Optimisation (Points Critiques)" icon="🕹️" color="slate">
        <GradientDescentVisualizer />

        <div className="mt-6">
          <FillInTheBlanks 
            id="pb-diff-eval"
            content={[
              "Pour trouver un Extrémum (Max ou Min), l'étape 1 est obligatoire : il faut résoudre l'équation Gradient de f = ",
              { options: ["1", "0", "L'infini"], correctAnswer: 1 },
              ". \nUne fois qu'on a trouvé ce ou ces mystérieux Points Critiques. Il faut utiliser l'étape 2 (La dérivée Seconde). On étudie une énorme matrice de dérivées secondes croisées appelée la Matrice ",
              { options: ["Miroir", "Jacobienne", "Hessienne"], correctAnswer: 2 },
              ". \nEn calculant les Valeurs Propres de cette matrice : Si elles sont toutes Positives = C'est un Fond de Cuvette (Minimum). Si elles sont toutes Négatives = C'est un Sommet Parfait (Maximum). Si l'une est plus grande et l'autre plus petite... c'est mort c'est un point de selle !"
            ]}
          />
        </div>
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la Vraie formule de l'Approx Linéaire de Taylor à l'ordre 1 (tangente 3D) en un point A ?",
              options: [
                "f(A+h) ≈ f(A) + h",
                "f(A+h) ≈ f(A) + Jac(A) × h",
                "Tant pis, il faut utiliser la calculette"
              ],
              correctAnswer: 1,
              explanation: "C'est la base de tout. Une toute petite variation 'h', engendre f(A+h) = l'altitude de base f(A) PLUS l'apport local de la matrice linéaire df(A) (La Jacobienne) multiplier au scalaire du vecteur 'h'."
            },
            {
              question: "Comment trouver le sommet (un Maximum), SI JE SOUMET LA PERSONNE À UNE CONTRAINTE (Par exmple : je veux le point le plus chaud de la piece, MAIS tu es forcé de te tenir UNIQUEMENT sur le bord de la moquette, donc sur le cercle d'équation x²+y²=1).",
              options: [
                "Je cherche quand Gradients = 0 partout.",
                "Je cherche quand la Hesisenne est vide.",
                "J'utilise les Multiplicateurs de Lagrange !"
              ],
              correctAnswer: 2,
              explanation: "Lagrange est le sauveur. Le théorème dit qu'au point le plus extreme 'sous une contrainte' (par exemple sur le bord d'un cercle C). Le gradient de la chaleur (le vecteur) est FORCÉMENT parallèle / colinéaire au gradient naturel du Cercle (qui s'écrit ∇f = Lambda × ∇g)!"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Gradient = Le GPS absolu, c'est le vecteur pente + forte, perpendiculaire aux lignes de niveaux (isothermes).",
            "Jacobienne = C'est elle, la Dérivée (df) dans le monde des espaces dimensionnés.",
            "Point critique = Quand gradient = (0,0... 0).",
            "Hessienne = Dérivées secondes croisées, c'est elle qui valide la courbure (Sommet, Cuve, Col)."
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

export default Course_Post_Bac_09_Calcul_Diff;
