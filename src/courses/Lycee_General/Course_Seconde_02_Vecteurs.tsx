import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise, TipBanner
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Seconde_02_Vecteurs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [ux, setUx] = useState<number>(2);
  const [uy, setUy] = useState<number>(1);
  const [vx, setVx] = useState<number>(1);
  const [vy, setVy] = useState<number>(3);

  // Pour la somme u + v
  const sumX = ux + vx;
  const sumY = uy + vy;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-2-VEC"
        title="Vecteurs du Plan"
        subtitle="Des flèches, des translations, et l'art de se déplacer dans le plan."
        duration="50 min"
      />

      <Section title="⚠️ Introduction : Pourquoi des vecteurs ?" icon="🏹" color="emerald">
        <p>
          Au collège, un segment c'est juste un trait entre A et B. Mais imagine que tu veuilles dire 'Je me déplace DE A VERS B, de tant de kilomètres'. Tu as besoin d'une direction, d'un sens, et d'une longueur.
        </p>
        <p className="mt-2">
          Cliquer sur un bouton de jeu vidéo pour faire avancer ton personnage, c'est utiliser un <strong>vecteur</strong>. Le vent qui souffle à 50 km/h vers le Nord-Est, c'est un vecteur. C'est l'outil mathématique du mouvement !
        </p>
        
        <InfoBlock type="definition" title="Les 3 piliers du vecteur">
          Un vecteur défini par 2 points A et B (noté AB avec une flèche au-dessus) possède :<br/>
          - Une <strong>direction</strong> (la droite (AB), l'inclinaison).<br/>
          - Un <strong>sens</strong> (de A vers B).<br/>
          - Une <strong>norme</strong> (la longueur du segment [AB] en cm ou carreaux).
        </InfoBlock>
      </Section>

      <Section title="⚖️ La Magie de Chasles" icon="🔗" color="indigo">
        <p className="mb-4">
          La relation de Chasles est la règle suprême de l'addition des vecteurs. C'est le principe du 'bout à bout'.
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl text-center mb-6">
          <p className="font-mono text-xl font-bold text-indigo-900 dark:text-indigo-100">
            {"\\vec{AB} + \\vec{BC} = \\vec{AC}"}
          </p>
          <p className="text-sm mt-2 text-indigo-700 dark:text-indigo-300">Je vais de A à B, puis de B à C. Au final, c'est comme si j'étais allé directement de A à C !</p>
        </div>

        <TipBanner type="warning" title="Le piège des soustractions">
          Chasles ne marche QUE pour l'addition ! Si tu as <><MathComponent math={"\\vec{AB} - \\vec{CB}"} /></>, ne panique pas : transforme d'abord la soustraction en addition de l'opposé : <><MathComponent math={"\\vec{AB} + \\vec{BC}"} /></>. Et c'est là que la magie de Chasles (qui donne <><MathComponent math={"\\vec{AC}"} /></>) opère !
        </TipBanner>

        <Accordion title="Et si je change le sens ? Le vecteur opposé !">
          <div className="p-4 bg-card border border-border rounded-xl">
            <p className="mb-2">Le vecteur <MathComponent math={"\\vec{BA}"} /> est <strong>l'opposé</strong> de <MathComponent math={"\\vec{AB}"} />.</p>
            <p className="font-mono bg-muted p-2 rounded text-slate-900 dark:text-slate-100"><MathComponent math={"\\vec{BA}"} /> = - <MathComponent math={"\\vec{AB}"} /></p>
          </div>
        </Accordion>
      </Section>

      <Section title="🛠️ Simulateur de Coordonnées (Le Repère)" icon="🗺️" color="amber">
        <p className="mb-4">
          Dans un repère, un vecteur <MathComponent math={"\\vec{u}"} /> a des coordonnées (x, y). x c'est l'avancée horizontale, y c'est l'avancée verticale.
        </p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Vecteur <MathComponent math={"\\vec{u}"} /></h4>
              <div className="flex flex-col gap-2">
                <label className="flex justify-between items-center text-sm">
                  <span className="font-mono">x = {ux}</span>
                  <input type="range" min="-5" max="5" value={ux} onChange={(e) => setUx(parseInt(e.target.value))} className="w-32 accent-indigo-500" />
                </label>
                <label className="flex justify-between items-center text-sm">
                  <span className="font-mono">y = {uy}</span>
                  <input type="range" min="-5" max="5" value={uy} onChange={(e) => setUy(parseInt(e.target.value))} className="w-32 accent-indigo-500" />
                </label>
              </div>
            </div>
            
            <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Vecteur <MathComponent math={"\\vec{v}"} /></h4>
              <div className="flex flex-col gap-2">
                <label className="flex justify-between items-center text-sm">
                  <span className="font-mono">x' = {vx}</span>
                  <input type="range" min="-5" max="5" value={vx} onChange={(e) => setVx(parseInt(e.target.value))} className="w-32 accent-rose-500" />
                </label>
                <label className="flex justify-between items-center text-sm">
                  <span className="font-mono">y' = {vy}</span>
                  <input type="range" min="-5" max="5" value={vy} onChange={(e) => setVy(parseInt(e.target.value))} className="w-32 accent-rose-500" />
                </label>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/60">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-wider text-sm mb-2">Addition Analytique : <MathComponent math={"\\vec{u}"} /> + <MathComponent math={"\\vec{v}"} /></h4>
            <p className="font-mono text-xl mb-2 text-emerald-950 dark:text-emerald-50 font-bold">
              ({ux} + {vx} ; {uy} + {vy}) = ({sumX} ; {sumY})
            </p>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">On additionne bêtement les x entre eux, et les y entre eux !</p>
          </div>
        </div>
      </Section>

      <Section title="📜 Formulaire Coordonnées" icon="⚡" color="rose">
        <p className="mb-4">Si on te donne deux points A(x_A ; y_A) et B(x_B ; y_B), tu dois savoir calculer le vecteur AB, la distance AB, et le milieu [AB].</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title={<>Coordonnées de <MathComponent math={"\\vec{AB}"} /></>} 
            math={"\\vec{AB} (x_{B} - x_{A} ; y_{B} - y_{A})"} 
          />
          <FormulaBox 
            title="Milieu I de [AB]" 
            math={"I ( (x_A + x_B)/2 ; (y_A + y_B)/2 )"} 
          />
        </div>
        <div className="mt-4">
          <FormulaBox 
            title="Distance AB (Norme)" 
            math={"AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"} 
          />
        </div>
      </Section>

      <Section title="🧠 Colinéarité : Le Test Ultime" icon="🔦" color="purple">
         <p className="mb-4">Deux vecteurs sont colinéaires s'ils ont la même direction (ils sont parallèles). S'ils sont colinéaires, <><MathComponent math={"\\vec{v} = k \\times \\vec{u}"} /></>. Mais avec les coordonnées, on a l'arme absolue : le Déterminant !</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>C'est quoi la formule du Déterminant de <><MathComponent math={"\\vec{u}(x, y)"} /></> et <><MathComponent math={"\\vec{v}(x', y')"} /></> ?</>}
            back={<><strong>x × y' - y × x'</strong><br/><span className="text-sm">Le produit en croix, moins l'autre diagonale !</span></>}
          />
          <Flashcard 
            front={<>Et si ce déterminant vaut ZÉRO ?</>}
            back={<>BINGO ! Les vecteurs sont parfaitement <strong>colinéaires</strong> (parallèles).</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Simplification par Chasles"
          question={<p>Simplifier au maximum l'expression suivante : <><MathComponent math={"\\vec{AB} - \\vec{AC} + \\vec{DB}"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : S'occuper du signe moins</p>
              <p>On transforme <><MathComponent math={"-\\vec{AC}"} /></> en <><MathComponent math={"+\\vec{CA}"} /></>. L'expression devient <><MathComponent math={"\\vec{AB} + \\vec{CA} + \\vec{DB}"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Réorganiser et appliquer Chasles</p>
              <p>On change l'ordre pour faire des dominos (lettre de fin = lettre de début). Donc <><MathComponent math={"\\vec{CA} + \\vec{AB} + \\vec{DB}"} /></>. Le début donne <><MathComponent math={"\\vec{CB}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Il nous reste <><MathComponent math={"\\vec{CB} + \\vec{DB}"} /></>. On ne peut pas les fusionner par Chasles ! C'est le résultat final.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Coordonnées de D pour faire un parallélogramme"
          question={<p>On donne <><MathComponent math={"A(1; 1)"} /></>, <><MathComponent math={"B(5; 2)"} /></> et <><MathComponent math={"C(6; 5)"} /></>. Trouver les coordonnées de <><MathComponent math={"D"} /></> pour que <><MathComponent math={"ABCD"} /></> soit un parallélogramme.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Traduction avec les vecteurs</p>
              <p>Le quadrilatère <><MathComponent math={"ABCD"} /></> est un parallélogramme si et seulement si <><MathComponent math={"\\vec{AB} = \\vec{DC}"} /></>. (ATTENTION, <><MathComponent math={"\\vec{CD}"} /></> est faux, il faut respecter l'ordre et le sens !)</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Calculer <><MathComponent math={"\\vec{AB}"} /></></p>
              <p><><MathComponent math={"\\vec{AB}"} /></> a pour abscisse <><MathComponent math={"5-1=4"} /></> et pour ordonnée <><MathComponent math={"2-1=1"} /></>. Donc <><MathComponent math={"\\vec{AB}(4; 1)"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Poser les équations pour D(x; y)</p>
              <p>Le vecteur <><MathComponent math={"\\vec{DC}"} /></> a pour coordonnées <><MathComponent math={"(6-x ; 5-y)"} /></>. On veut l'égalité : <><MathComponent math={"6-x=4"} /></> et <><MathComponent math={"5-y=1"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"6-x=4 \\implies x=2"} /></> et <><MathComponent math={"5-y=1 \\implies y=4"} /></>. Le point est donc <><MathComponent math={"D(2; 4)"} /></>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Formules" icon="🕹️" color="slate">
        <p className="mb-4">A toi de jouer avec les coordonnées :</p>
        <FillInTheBlanks 
          id="vec-eval"
          content={[
            "J'ai le point A(1; 2) et B(4; 6). Le vecteur AB se calcule en faisant xb - xa et yb - ya. Donc on obtient AB(3; ",
            { options: ["4", "8", "-4"], correctAnswer: 0 },
            "). Pour trouver la distance AB, j'utilise la racine carrée géante : √(3² + 4²) = √(9 + 16) = √25 = ",
            { options: ["5", "6.25", "25"], correctAnswer: 0 },
            ". Magique ! Maintenant, j'ai u(2; 3) et v(4; 6). Le déterminant fait 2×6 - 3×4 = 12 - 12 = ",
            { options: ["0", "24", "-12"], correctAnswer: 0 },
            ". Le déterminant est nul, les vecteurs sont donc ",
            { options: ["orthogonaux", "colinéaires", "égaux"], correctAnswer: 1 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle simplification donne la relation de Chasles pour : BC + AB ?",
              options: [
                "AC",
                "CA",
                "CB"
              ],
              correctAnswer: 0,
              explanation: "Rappel : l'addition est commutative ! BC + AB c'est comme AB + BC, et par Chasles, ça donne AC."
            },
            {
              question: "u(1; 5) et v(-3; -15). Ces vecteurs sont-ils colinéaires ?",
              options: [
                "Oui, car v = -3 × u (ou car le déterminant vaut 0).",
                "Non, le signe moins casse la colinéarité.",
                "Non, 1×(-15) - 5×(-3) ne fait pas zéro."
              ],
              correctAnswer: 0,
              explanation: "En effet, 1×(-15) = -15, et - (-3)×5 = +15. Donc -15 + 15 = 0 ! Les vecteurs sont colinéaires."
            },
            {
              question: "La formule des coordonnées du milieu I de [AB], c'est :",
              options: [
                "(xb - xa)/2",
                "(xa + xb)/2 (idem pour y)",
                "√(xa + xb)"
              ],
              correctAnswer: 1,
              explanation: "Le milieu, c'est comme la MOYENNE des notes. On additionne les x et on divise par 2 !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la Relation de Chasles (bout à bout).",
            "Je sais calculer les coordonnées de AB (xB - xA).",
            "Je ne confonds pas le Milieu (addition/2) et la Distance (racine de la somme des carrés).",
            "Je sais faire le Déterminant (produit en croix).",
            "Déterminant = 0 => Vecteurs Colinéaires (Parallèles)."
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

export default Course_Seconde_02_Vecteurs;
