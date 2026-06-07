import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, InteractiveExercise 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Premiere_05_Trigonometrie: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [angleDeg, setAngleDeg] = useState<number>(45);
  
  // Calculate rad, cos, sin
  const angleRad = (angleDeg * Math.PI) / 180;
  const cosVal = Math.cos(angleRad);
  const sinVal = Math.sin(angleRad);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-1-TRI"
        title="La Trigonométrie"
        subtitle="Le monde magique du Cercle Unité et des Radians."
        duration="55 min"
      />

      <Section title="⚠️ Introduction : Adieu les Degrés" icon="🧭" color="emerald">
        <p>
          Au collège, tu mesurais les angles en degrés (de 0 à 360°) avec un rapporteur. Mais c'est une invention des Babyloniens ! En mathématiques pures, on utilise une mesure naturelle basée sur la longueur de l'arc : les <strong>Radians</strong>.
        </p>
        
        <InfoBlock type="definition" title="Le Cercle Trigonométrique">
          C'est un cercle magique dont le <strong>rayon est exactement 1</strong>, et dont le centre est l'origine d'un repère (0,0). <br/>
          Puisque le périmètre complet d'un cercle est 2×π×R, et que R=1, un tour complet mesure exactement <strong>2π radians</strong>. Donc 360° = 2π.
        </InfoBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
          <div className="bg-muted p-4 border rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Tour complet</h4>
            <p className="font-mono text-xl text-indigo-600 dark:text-indigo-400">360° = 2π</p>
          </div>
          <div className="bg-muted p-4 border rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Demi-tour</h4>
            <p className="font-mono text-xl text-indigo-600 dark:text-indigo-400">180° = π</p>
          </div>
          <div className="bg-muted p-4 border rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Angle droit</h4>
            <p className="font-mono text-xl text-indigo-600 dark:text-indigo-400">90° = π/2</p>
          </div>
          <div className="bg-muted p-4 border rounded-xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300">L'angle de 60°</h4>
            <p className="font-mono text-xl text-indigo-600 dark:text-indigo-400">60° = π/3</p>
          </div>
        </div>
      </Section>

      <Section title="🎯 Le Cosinus et le Sinus" icon="🏹" color="rose">
        <p className="mb-4">
          Oublie SOH CAH TOA (adj/hyp). Sur le cercle de rayon 1, les choses deviennent ultra simples. Prends un point M posé sur le cercle, repéré par un angle x.
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 dark:text-slate-300">
          <li>L'<strong>abscisse</strong> (l'axe horizontal) du point M est le <strong>Cosinus (cos x)</strong>.</li>
          <li>L'<strong>ordonnée</strong> (l'axe vertical) du point M est le <strong>Sinus (sin x)</strong>.</li>
        </ul>

        <div className="bg-card border-2 border-border p-6 rounded-2xl shadow-sm text-center">
          <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Simulateur de Coordonnées</h4>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="font-bold text-slate-700 dark:text-slate-300">Angle : </span>
            <input 
              type="range" 
              min="0" max="360" step="15"
              value={angleDeg} 
              onChange={(e) => setAngleDeg(parseInt(e.target.value))}
              className="accent-rose-500 cursor-pointer w-48"
            />
            <span className="font-mono font-bold w-16 text-left">{angleDeg}°</span>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl">
              <span className="block text-sm font-bold text-indigo-900 dark:text-indigo-100 mb-1">Cosinus (Abscisse)</span>
              <span className="text-xl font-mono text-indigo-950 dark:text-indigo-50 border-b border-indigo-100 dark:border-indigo-800/60 pb-1">{cosVal.toFixed(3)}</span>
            </div>
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/60 p-4 rounded-xl">
              <span className="block text-sm font-bold text-emerald-900 dark:text-emerald-100 mb-1">Sinus (Ordonnée)</span>
              <span className="text-xl font-mono text-emerald-950 dark:text-emerald-50 border-b border-emerald-100 dark:border-emerald-800/60 pb-1">{sinVal.toFixed(3)}</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Regarde bien : le Cosinus et le Sinus ne dépasseront <strong>jamais 1</strong>, et ne descendront <strong>jamais sous -1</strong>. (Logique, le rayon vaut 1 !).
          </p>
        </div>
      </Section>

      <Section title="📜 La Formule Fondamentale" icon="⚖️" color="amber">
        <p className="mb-4">S'il n'y avait qu'une seule formule de trigonométrie à se faire tatouer, ce serait celle-ci. C'est l'application directe du Théorème de Pythagore dans notre cercle trigonométrique !</p>
        
        <FormulaBox 
          title="L'Identité Remarquable" 
          formula={<>cos²(x) + sin²(x) = 1</>} 
        />
        <p className="mt-4 text-center text-slate-600 dark:text-slate-400 font-medium">
          Cette formule est vraie pour <strong>n'importe quel angle x</strong> !
        </p>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver le cosinus manquant"
          question={<p>On sait que <><MathComponent math={"\\sin(x) = 0.8"} /></> (soit <><MathComponent math={"4/5"} /></>) et que l'angle <><MathComponent math={"x"} /></> est entre <><MathComponent math={"0"} /></> et <><MathComponent math={"\\pi/2"} /></> (angle aigu). Que vaut <><MathComponent math={"\\cos(x)"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Appliquer l'identité fondamentale</p>
              <p>Le cours dit : <><MathComponent math={"\\cos^2(x) + \\sin^2(x) = 1"} /></>. On remplace : <><MathComponent math={"\\cos^2(x) + 0.8^2 = 1"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Isoler le carré</p>
              <p><><MathComponent math={"\\cos^2(x) + 0.64 = 1"} /></>, donc <><MathComponent math={"\\cos^2(x) = 1 - 0.64 = 0.36"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"\\cos(x)"} /></> vaut donc <><MathComponent math={"\\sqrt{0.36}"} /></> ou <><MathComponent math={"-\\sqrt{0.36}"} /></>. Comme l'angle est entre 0 et <><MathComponent math={"\\pi/2"} /></> (quart en haut à droite du cercle), le cosinus est positif. La réponse est <><MathComponent math={"\\cos(x) = 0.6"} /></> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Parité cosinus/sinus"
          question={<p>Que vaut <><MathComponent math={"\\cos(-\\pi/3)"} /></> sachant que <><MathComponent math={"\\cos(\\pi/3) = 1/2"} /></> ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Visualisation sur le cercle</p>
              <p>Un angle négatif <><MathComponent math={"-x"} /></> signifie qu'on tourne "vers le bas" à l'envers sur le cercle. Le point <><MathComponent math={"-\\pi/3"} /></> (soit -60°) est le symétrique vers le bas du point <><MathComponent math={"\\pi/3"} /></> (60°).</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Projection sur l'axe</p>
              <p>Quand on plie le cercle en deux de haut en bas, la 'hauteur' s'inverse (le sinus change de signe : <><MathComponent math={"\\sin(-x) = -\\sin(x)"} /></>). MAIS la projection sur l'axe horizontal reste exactement au même endroit !</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Le cosinus "avale" le signe moins. La fonction cos est paire : <><MathComponent math={"\\cos(-x) = \\cos(x)"} /></>. Donc <><MathComponent math={"\\cos(-\\pi/3) = 1/2"} /></> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes de Repérage" icon="⚡" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Le cosinus se lit sur quel axe ?</>}
            back={<>L'axe <strong>horizontal</strong> (les abscisses).</>}
          />
          <Flashcard 
            front={<>Combien vaut <strong>cos(0)</strong> ? Et <strong>sin(0)</strong> ?</>}
            back={<>À l'angle 0 (tout à droite du cercle), le point est en (1, 0). Donc <strong>cos(0) = 1</strong> et <strong>sin(0) = 0</strong>.</>}
          />
        </div>
      </Section>

      <Section title="🎮 Test de Conversion" icon="🕹️" color="slate">
        <p className="mb-4">Convertissons avant la tombée de la nuit :</p>
        <FillInTheBlanks 
          id="tri-eval"
          content={[
            "Sachant que π radians correspond à un angle plat de 180°, l'angle droit de 90° s'écrit ",
            { options: ["2π", "π/2", "π/4"], correctAnswer: 1 },
            ". Le fameux angle de 30° s'écrit lui ",
            { options: ["π/6", "π/3", "π"], correctAnswer: 0 },
            ". Sur le cercle, je regarde le point M correspondant à π/2 (en haut du cercle, l'angle droit). Son abscisse vaut 0, donc cos(π/2) = ",
            { options: ["1", "-1", "0"], correctAnswer: 2 },
            ". Par contre, son ordonnée est à fond vers le haut, donc sin(π/2) = ",
            { options: ["0", "1", "-1"], correctAnswer: 1 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la valeur de cos²(42°) + sin²(42°) ?",
              options: [
                "42",
                "1",
                "On ne peut pas le calculer de tête sans calculatrice."
              ],
              correctAnswer: 1,
              explanation: "Piège magique ! La formule cos²(x) + sin²(x) = 1 fonctionne pour N'IMPORTE QUEL angle x. Même pour 42°."
            },
            {
              question: "Où se lit le SINUS sur le cercle trigonométrique ?",
              options: [
                "Sur l'axe vertical (les ordonnées).",
                "Sur l'axe horizontal (les abscisses).",
                "C'est la longueur de la diagonale."
              ],
              correctAnswer: 0,
              explanation: "Le Sinus est la 'hauteur' du point, donc l'ordonnée."
            },
            {
              question: "Si x = π radians. Que valent le cosinus et le sinus ?",
              options: [
                "cos = 1 et sin = 0",
                "cos = 0 et sin = 1",
                "cos = -1 et sin = 0"
              ],
              correctAnswer: 2,
              explanation: "L'angle π c'est 180°, c'est un demi-tour. On est tout à gauche du cercle, au point de coordonnées (-1 ; 0). Donc cos = -1 et sin = 0."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que 180° = π radians.",
            "Je associe Cosinus = Horizontal = Abscisse.",
            "Je associe Sinus = Vertical = Ordonnée.",
            "Je connais l'identité fondamentale : cos² + sin² = 1."
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

export default Course_Premiere_05_Trigonometrie;
