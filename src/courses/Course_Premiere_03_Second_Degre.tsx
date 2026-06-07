import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, InteractiveExercise 
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";

const Course_Premiere_03_Second_Degre: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-5);
  const [c, setC] = useState<number>(6);

  const delta = (b * b) - (4 * a * c);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-1-DEG"
        title="Le Second Degré"
        subtitle="L'art sacré de résoudre ax² + bx + c = 0 avec l'arme absolue : Delta."
        duration="45 min"
      />

      <Section title="⚠️ Introduction : La Parabole" icon="🎢" color="emerald">
        <p>
          Au collège, tu as appris à résoudre les équations du premier degré (avec des x simples, comme une ligne droite). Mais que se passe-t-il si la variable x se met au carré ?
        </p>
        <p className="mt-2">
          L'équation <strong>ax² + bx + c = 0</strong> représente graphiquement une courbe que l'on appelle une <strong className="text-emerald-700 dark:text-emerald-300">Parabole</strong>. Elle peut être orientée vers le haut (sourire) ou vers le bas (triste), et elle peut croiser l'axe horizontal des abscisses en 2 points, 1 point, ou 0 point !
        </p>
        
        <InfoBlock type="definition" title="La Loi du 'a'">
          Le coefficient <strong>a</strong> (le nombre collé au x²) est le chef de la parabole. <br/>
          - Si <strong>a &gt; 0</strong> : La parabole sourit (tournée vers le haut). ∪ <br/>
          - Si <strong>a &lt; 0</strong> : La parabole est triste (tournée vers le bas). ∩
        </InfoBlock>
      </Section>

      <Section title="⚔️ L'Arme Absolue : Le Discriminant (Delta Δ)" icon="🗡️" color="rose">
        <p className="mb-4">
          Pour savoir instantanément combien de fois la parabole traverse l'axe des abscisses (c'est-à-dire combien de solutions a l'équation ax² + bx + c = 0), on utilise le <strong>Discriminant</strong>, affectueusement appelé Delta (Δ).
        </p>

        <FormulaBox 
          title="Le Grand Delta" 
          formula={<>Δ = b² - 4ac</>} 
        />
      </Section>

      <Section title="⚙️ Simulateur de Delta" icon="💻" color="indigo">
        <p className="mb-4">Teste différents coefficients pour ton équation <span className="font-mono bg-slate-100 px-1 rounded">ax² + bx + c = 0</span> :</p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <label className="flex flex-col items-center">
              <span className="font-bold text-slate-700 dark:text-slate-300 mb-1">a = {a}</span>
              <input type="range" min="-5" max="5" step="1" value={a} onChange={(e) => setA(parseInt(e.target.value) || 1)} className="w-24 accent-indigo-500" />
            </label>
            <label className="flex flex-col items-center">
              <span className="font-bold text-slate-700 dark:text-slate-300 mb-1">b = {b}</span>
              <input type="range" min="-10" max="10" step="1" value={b} onChange={(e) => setB(parseInt(e.target.value))} className="w-24 accent-indigo-500" />
            </label>
            <label className="flex flex-col items-center">
              <span className="font-bold text-slate-700 dark:text-slate-300 mb-1">c = {c}</span>
              <input type="range" min="-10" max="10" step="1" value={c} onChange={(e) => setC(parseInt(e.target.value))} className="w-24 accent-indigo-500" />
            </label>
          </div>

          <div className="text-center p-4 bg-card rounded-xl border border-border">
            <h4 className="font-bold text-slate-500 uppercase tracking-wider text-sm mb-2">Calcul de Δ</h4>
            <p className="font-mono text-xl mb-4 text-slate-900 dark:text-slate-100">
              Δ = ({b})² - 4 × ({a}) × ({c}) = <strong className="text-indigo-600 dark:text-indigo-400">{delta}</strong>
            </p>
            
            <div className={`p-4 rounded-lg border-2 font-bold ${
              delta > 0 ? 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-100' : 
              delta === 0 ? 'bg-amber-50/50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/60 text-amber-900 dark:text-amber-100' : 
              'bg-rose-50/50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800/60 text-rose-900 dark:text-rose-100'
            }`}>
              {delta > 0 && "Δ > 0 : Il y a DEUX racines distinctes (2 solutions)."}
              {delta === 0 && "Δ = 0 : Il y a UNE racine double (1 seule solution)."}
              {delta < 0 && "Δ < 0 : Il n'y a AUCUNE racine réelle (la parabole flotte au-dessus ou coule en-dessous sans toucher l'axe)."}
            </div>
          </div>
        </div>
      </Section>

      <Section title="📜 Les Racines (Les Formules de x)" icon="🗝️" color="slate">
        <p className="mb-4">Si Delta est positif, tes deux racines (x₁ et x₂) se trouvent grâce à ces formules magiques qui mêlent -b et √Δ :</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Racine 1 (x₁)" 
            formula={<>x₁ = (-b - √Δ) / 2a</>} 
          />
          <FormulaBox 
            title="Racine 2 (x₂)" 
            formula={<>x₂ = (-b + √Δ) / 2a</>} 
          />
        </div>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm italic">
          Note : Si Δ = 0, x₁ et x₂ fusionnent pour donner la racine double : <span className="font-bold">-b / 2a</span>.
        </p>
      </Section>

      <Section title="🧠 Le Jeu du Signe" icon="⚡" color="amber">
        <p className="mb-4">Un exercice classique est de trouver le SIGN du polynôme (quand est-il positif ? négatif ?). La règle d'or est imparable :</p>
        <div className="bg-amber-50/50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/60 p-4 rounded-xl text-amber-950 dark:text-amber-50 font-medium">
          "Le polynôme ax² + bx + c est toujours du <strong>signe de a</strong> à l'extérieur de ses racines, et du signe contraire à l'intérieur."
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Flashcard 
            front={<>Si <strong>Δ &lt; 0</strong>, quel est le signe du polynôme ?</>}
            back={<>Puisqu'il n'a pas de racines (il ne traverse jamais l'axe), il est <strong>TOUJOURS du signe de a</strong>, de -∞ à +∞.</>}
          />
          <Flashcard 
            front={<>Le discriminant vaut quoi si l'équation est <strong>x² - 4 = 0</strong> ?</>}
            back={<>Ici, b=0, c=-4. Donc Δ = 0² - 4(1)(-4) = +16.<br/><span className="text-sm">Même si c'est plus rapide de dire x²=4 donc x=2 ou -2.</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur de Racines" icon="🕹️" color="indigo">
        <p className="mb-4">Démontre que tu as assimilé la puissance de Delta :</p>
        <FillInTheBlanks 
          id="deg-eval"
          content={[
            "On me donne l'équation -2x² + 3x - 1 = 0. Le coefficient 'a' vaut -2. La parabole est donc orientée vers le ",
            { options: ["haut", "bas"], correctAnswer: 1 },
            ". Je calcule Δ : b² - 4ac = 3² - 4(-2)(-1) = 9 - 8 = ",
            { options: ["1", "17", "-1"], correctAnswer: 0 },
            ". Comme le discriminant est strictement positif, l'équation admet ",
            { options: ["zéro", "une", "deux"], correctAnswer: 2 },
            " solutions distinctes."
          ]}
        />
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul direct des racines"
          question={<p>Résoudre l'équation <><MathComponent math={"x^2 - 5x + 6 = 0"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Identifier a, b, c et calculer Delta</p>
              <p><><MathComponent math={"a = 1"} /></>, <><MathComponent math={"b = -5"} /></>, et <><MathComponent math={"c = 6"} /></>.<br/><><MathComponent math={"\\Delta = (-5)^2 - 4 \\times 1 \\times 6 = 25 - 24 = 1"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Le nombre de solutions</p>
              <p>Comme <><MathComponent math={"\\Delta > 0"} /></>, l'équation a deux solutions réelles distinctes. La racine carrée de <><MathComponent math={"\\Delta"} /></> est <><MathComponent math={"1"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Calculer x1 et x2</p>
              <p><><MathComponent math={"x_1 = \\frac{-(-5) - 1}{2 \\times 1} = \\frac{5 - 1}{2} = 2"} /></><br/><><MathComponent math={"x_2 = \\frac{-(-5) + 1}{2 \\times 1} = \\frac{5 + 1}{2} = 3"} /></></p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Les solutions sont <><MathComponent math={"S = \\{2; 3\\}"} /></>. (Tu peux vérifier que <><MathComponent math={"2^2 - 5 \\times 2 + 6 = 4 - 10 + 6 = 0"} /></>).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Inéquation et règle des signes"
          question={<p>Résoudre l'inéquation <><MathComponent math={"-2x^2 + 8x - 8 \\ge 0"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Calculer Delta</p>
              <p><><MathComponent math={"a = -2"} /></>, <><MathComponent math={"b = 8"} /></>, <><MathComponent math={"c = -8"} /></>. Donc <><MathComponent math={"\\Delta = 8^2 - 4(-2)(-8) = 64 - 64 = 0"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Déduire le tableau de signes</p>
              <p>Puisque <><MathComponent math={"\\Delta = 0"} /></>, il y a une racine double : <><MathComponent math={"x = \\frac{-8}{2(-2)} = \\frac{-8}{-4} = 2"} /></>. La règle dit que le polynôme est TOUJOURS du signe de <><MathComponent math={"a"} /></> (donc négatif), sauf en <><MathComponent math={"x=2"} /></> où il vaut 0.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : On cherche quand le polynôme est <><MathComponent math={"\\ge 0"} /></> (positif ou nul). Il n'est JAMAIS strictement positif. Mais il est nul en <><MathComponent math={"x=2"} /></>. Donc la seule solution est <><MathComponent math={"S = \\{2\\}"} /></> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la valeur de Δ pour l'équation x² + 2x + 1 = 0 ?",
              options: [
                "Δ = 0",
                "Δ = 4",
                "Δ = -4"
              ],
              correctAnswer: 0,
              explanation: "Δ = 2² - 4(1)(1) = 4 - 4 = 0. C'est une identité remarquable (x+1)², donc il n'y a qu'une seule racine double (x = -1)."
            },
            {
              question: "Si Δ < 0 et a = -3. Le polynôme peut-il prendre des valeurs positives ?",
              options: [
                "Oui, car Delta est négatif.",
                "Non, il est toujours du signe de 'a', c'est-à-dire strictement négatif."
              ],
              correctAnswer: 1,
              explanation: "Δ < 0 signifie 'ne touche jamais zéro'. Il est donc coincé d'un seul côté de l'axe. Puisque a = -3 (triste), il est coincé en bas : toujours négatif !"
            },
            {
              question: "La formule de la racine double (quand Δ = 0) est :",
              options: [
                "x = b / 2a",
                "x = -b / 2a",
                "x = √b / a"
              ],
              correctAnswer: 1,
              explanation: "Puisque √Δ = 0, la formule générale (-b ± √Δ) / 2a devient simplement -b / 2a."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais identifier a, b et c sans me tromper de signe.",
            "Je connais par cœur la formule de survie : Δ = b² - 4ac.",
            "Je sais que Δ < 0 (0 sol), Δ = 0 (1 sol), Δ > 0 (2 sols).",
            "Je connais la règle du signe : du signe de 'a' à l'extérieur des racines."
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

export default Course_Premiere_03_Second_Degre;
