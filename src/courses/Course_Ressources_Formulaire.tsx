import React, { useState } from 'react';
import { 
  CourseHeader, Section, FormulaBox, InfoBlock, Flashcard, Quiz
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { Sliders, RotateCcw } from 'lucide-react';

const Course_Ressources_Formulaire: React.FC = () => {
  // Interactive widget state: Geometric shape builder
  const [shape, setShape] = useState<'rectangle' | 'triangle' | 'circle'>('rectangle');
  const [dim1, setDim1] = useState<number>(6); // L or b or R
  const [dim2, setDim2] = useState<number>(4); // l or h

  const handleReset = () => {
    setDim1(6);
    setDim2(4);
  };

  // Calculs dynamiques
  const rectangleArea = dim1 * dim2;
  const rectanglePerimeter = 2 * (dim1 + dim2);
  const triangleArea = (dim1 * dim2) / 2;
  const triangleHypotenuse = Math.sqrt(dim1 * dim1 + dim2 * dim2);
  const trianglePerimeter = dim1 + dim2 + triangleHypotenuse;
  const circleArea = Math.PI * dim1 * dim1;
  const circlePerimeter = 2 * Math.PI * dim1;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="RES-FORM"
        title="Formulaire Exhaustif et Visuel"
        subtitle="Un guide complet regroupant toutes les formules fondamentales de la géométrie, de l'analyse, de l'algèbre et des probabilités avec entraînements visuels."
        duration="N/A"
      />

      <InfoBlock type="info" title="Pourquoi maîtriser ces formules ?">
        <p>
          En mathématiques, les formules ne sont pas de simples recettes de cuisine à mémoriser bêtement. Elles traduisent des réalités géométriques ou des transformations analytiques profondes. Comprendre leur origine permet de les retrouver facilement et de les appliquer avec pertinence.
        </p>
      </InfoBlock>

      <Section title="📐 Exercice Interactif : Géométrie Plane" icon="📏" color="emerald">
        <p className="mb-4">
          La géométrie s'appuie sur la mesure des espaces (longueurs, aires, volumes). Utilisez le simulateur dynamique ci-dessous pour modifier les dimensions en temps réel et observer les résultats des calculs d'aires et de périmètres associé à leur formule.
        </p>

        {/* INTERACTIVE COMPONENT: Geometric Form Calculator */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl mb-8">
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <button 
              onClick={() => { setShape('rectangle'); handleReset(); }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${shape === 'rectangle' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}
            >
              Rectangle
            </button>
            <button 
              onClick={() => { setShape('triangle'); handleReset(); }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${shape === 'triangle' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}
            >
              Triangle Rectangle
            </button>
            <button 
              onClick={() => { setShape('circle'); handleReset(); }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${shape === 'circle' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}
            >
              Cercle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visualizer area */}
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
              {shape === 'rectangle' && (
                <svg width="200" height="150" className="overflow-visible">
                  <rect x="30" y="30" width={dim1 * 20} height={dim2 * 20} fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="3" rx="4" />
                  <text x={30 + (dim1 * 10)} y="20" fill="#047857" className="font-mono text-sm text-center" textAnchor="middle">Longueur (L) = {dim1}</text>
                  <text x="15" y={30 + (dim2 * 10)} fill="#047857" className="font-mono text-sm" textAnchor="end">largeur (l) = {dim2}</text>
                </svg>
              )}

              {shape === 'triangle' && (
                <svg width="200" height="150" className="overflow-visible">
                  <path d={`M 30,120 L 30,${120 - dim2 * 20} L ${30 + dim1 * 20},120 Z`} fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="3" strokeLinejoin="round" />
                  {/* Right angle indicator */}
                  <rect x="30" y="110" width="10" height="10" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  <text x={30 + (dim1 * 10)} y="140" fill="#047857" className="font-mono text-sm text-center" textAnchor="middle">Base (b) = {dim1}</text>
                  <text x="15" y={120 - (dim2 * 10)} fill="#047857" className="font-mono text-sm" textAnchor="end">Hauteur (h) = {dim2}</text>
                </svg>
              )}

              {shape === 'circle' && (
                <svg width="200" height="180" className="overflow-visible">
                  <circle cx="100" cy="90" r={dim1 * 12} fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="3" />
                  <line x1="100" y1="90" x2={100 + dim1 * 12} y2="90" stroke="#047857" strokeWidth="2.5" strokeDasharray="3" />
                  <circle cx="100" cy="90" r="3" fill="#047857" />
                  <text x={100 + (dim1 * 6)} y="82" fill="#047857" className="font-mono text-sm text-center" textAnchor="middle">Rayon (R) = {dim1}</text>
                </svg>
              )}
            </div>

            {/* Slider Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-600" /> Paramètres
                </span>
                <button 
                  onClick={handleReset}
                  className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                  title="Réinitialiser"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {shape !== 'circle' ? (
                <>
                  <div>
                    <label className="text-xs font-mono font-bold text-slate-500 block mb-1">
                      {shape === 'rectangle' ? 'LONGUEUR (L)' : 'BASE (b)'} : {dim1} cm
                    </label>
                    <input 
                      type="range" min="3" max="8" step="0.5" value={dim1}
                      onChange={(e) => setDim1(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-bold text-slate-500 block mb-1">
                      {shape === 'rectangle' ? 'LARGEUR (l)' : 'HAUTEUR (h)'} : {dim2} cm
                    </label>
                    <input 
                      type="range" min="2" max="6" step="0.5" value={dim2}
                      onChange={(e) => setDim2(parseFloat(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-xs font-mono font-bold text-slate-500 block mb-1">
                    RAYON (R) : {dim1} cm
                  </label>
                  <input 
                    type="range" min="2.5" max="6" step="0.5" value={dim1}
                    onChange={(e) => setDim1(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-2.5">
                <p className="text-sm">
                  <span className="font-bold text-foreground">Aire : </span>
                  {shape === 'rectangle' && (
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      L {"\\times"} l = {dim1} {"\\times"} {dim2} = {rectangleArea.toFixed(2)} cm²
                    </span>
                  )}
                  {shape === 'triangle' && (
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      {"\\frac{b \\times h}{2}"} = {"\\frac{"}{dim1} {"\\times"} {dim2} {"}{2}"} = {triangleArea.toFixed(2)} cm²
                    </span>
                  )}
                  {shape === 'circle' && (
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      {"\\pi \\times R^2"} = {"\\pi \\times"} {dim1}² = {circleArea.toFixed(2)} cm²
                    </span>
                  )}
                </p>
                <p className="text-sm">
                  <span className="font-bold text-foreground">Périmètre : </span>
                  {shape === 'rectangle' && (
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      2(L + l) = 2({dim1} + {dim2}) = {rectanglePerimeter.toFixed(2)} cm
                    </span>
                  )}
                  {shape === 'triangle' && (
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      b + h + {"\\sqrt{b^2 + h^2}"} = {dim1} + {dim2} + {triangleHypotenuse.toFixed(2)} = {trianglePerimeter.toFixed(2)} cm
                    </span>
                  )}
                  {shape === 'circle' && (
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                      2{"\\pi R"} = 2{"\\times \\pi \\times"} {dim1} = {circlePerimeter.toFixed(2)} cm
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormulaBox 
            title="Théorème de Pythagore" 
            math={"a^2 + b^2 = c^2 \\iff c = \\sqrt{a^2 + b^2}"} 
          />
          <FormulaBox 
            title="Théorème de Thalès" 
            math={"\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}"} 
          />
          <FormulaBox 
            title="Trigonométrie (SOH-CAH-TOA)" 
            math={"\\cos(\\theta) = \\frac{\\text{adj}}{\\text{hyp}} \\quad \\sin(\\theta) = \\frac{\\text{opp}}{\\text{hyp}} \\quad \\tan(\\theta) = \\frac{\\text{opp}}{\\text{adj}}"} 
          />
          <FormulaBox 
            title="Vecteurs (Distance)" 
            math={"AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}"} 
          />
        </div>
      </Section>

      <Section title="📈 Algèbre & Analyse Réelle" icon="📈" color="indigo">
        <InfoBlock type="reminder" title="Identités & Dérivation">
          <p>
            En analyse de fonctions, l'outil roi est la <strong>dérivée</strong>. Elle donne la pente de la tangente en tout point de la courbe, tandis que les identités remarquables permettent la factorisation des expressions polynomiales pour l'étude de signes.
          </p>
        </InfoBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormulaBox 
            title="Identités Remarquables" 
            math={"(a+b)^2 = a^2 + 2ab + b^2 \\\\ (a-b)^2 = a^2 - 2ab + b^2 \\\\ (a-b)(a+b) = a^2 - b^2"} 
          />
          <FormulaBox 
            title="Second Degré (Racines)" 
            math={"\\Delta = b^2 - 4ac \\quad \\text{Si } \\Delta > 0 : x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}"} 
          />
          <FormulaBox 
            title="Dérivées Usuelles" 
            math={"(x^n)' = n \\cdot x^{n-1} \\quad (e^x)' = e^x \\quad (\\ln(x))' = \\frac{1}{x}"} 
          />
          <FormulaBox 
            title="Opérations de Dérivation" 
            math={"(uv)' = u'v + uv' \\quad \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2} \\quad (v \\circ u)' = u' \\cdot (v' \\circ u)"} 
          />
          <FormulaBox 
            title="Limites d'importance" 
            math={"\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1 \\quad \\lim_{x \\to +\\infty} \\frac{\\ln(x)}{x} = 0 \\quad \\lim_{x \\to 0} x\\ln(x) = 0"} 
          />
          <FormulaBox 
            title="Nombres Complexes" 
            math={"z = a + ib = r(\\cos \\theta + i\\sin \\theta) = r e^{i\\theta} \\quad e^{i\\pi} + 1 = 0"} 
          />
        </div>
      </Section>

      <Section title="🎲 Probabilités & Statistiques" icon="🎲" color="rose">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormulaBox 
            title="Probabilité Conditionnelle" 
            math={"P_A(B) = \\frac{P(A \\cap B)}{P(A)} \\iff P(A \\cap B) = P(A) \\ times P_A(B)"} 
          />
          <FormulaBox 
            title="Formule des Probabilités Totales" 
            math={"P(B) = \\sum_{i=1}^n P(B \\cap A_i) = \\sum_{i=1}^n P(A_i) \\times P_{A_i}(B)"} 
          />
          <FormulaBox 
            title="Espérance d'une Variable Aléatoire" 
            math={"E(X) = \\sum_{i=1}^k x_i P(X = x_i) \\quad \\text{Variance : } V(X) = E(X^2) - [E(X)]^2"} 
          />
          <FormulaBox 
            title="Loi Binomiale \\mathcal{B}(n, p)" 
            math={"P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}"} 
          />
        </div>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <p className="mb-4">
          Testez instantanément votre réactivité et l'assimilation des formules avec nos flashcards interactives de synthèse mathématique.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle est la formule de dérivation pour le quotient de deux fonctions {"$\\left(\\frac{u}{v}\\right)'$"} ?</>}
            back={<>{"$\\frac{u'v - uv'}{v^2}$"}</>}
          />
          <Flashcard 
            front={<>Quelle est la formule pour l'espérance d'une loi binomiale {"$\\mathcal{B}(n, p)$"} ?</>}
            back={<>{"$E(X) = n \\times p$"}</>}
          />
          <Flashcard 
            front={<>Quel est le discriminant {"$\\Delta$"} associé à l'équation polynômiale {"$ax^2 + bx + c = 0$"} ?</>}
            back={<>{"$\\Delta = b^2 - 4ac$"}</>}
          />
          <Flashcard 
            front={<>Sous quelle forme trigonométrique écrit-on un nombre complexe {"$z$"} ?</>}
            back={<>{"$z = r(\\cos \\theta + i \\sin \\theta)$"} ou {"$z = r e^{i\\theta}$"} avec {"$r = |z|$"} et {"$\\theta = \\arg(z)$"}</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Test de Connaissance" icon="⚙" color="purple">
        <Quiz 
          questions={[
            {
              question: "Quelle est la dérivée de la fonction f(x) = exp(3x) ?",
              options: [
                "f'(x) = exp(3x)",
                "f'(x) = 3 exp(3x)",
                "f'(x) = 3x exp(3x-1)",
                "f'(x) = exp(3x) / 3"
              ],
              correctAnswer: 1,
              explanation: "D'après la formule (exp(u))' = u' * exp(u). Ici, u(x) = 3x d'où u'(x) = 3. Le résultat est donc bien 3exp(3x)."
            },
            {
              question: "Pour deux événements indépendants de probabilités non nulles A et B, quelle formule est vraie ?",
              options: [
                "P(A ∩ B) = P(A) + P(B)",
                "P(A | B) = P(B)",
                "P(A ∩ B) = P(A) * P(B)",
                "P_A(B) = P(A) / P(B)"
              ],
              correctAnswer: 2,
              explanation: "Par définition, l'indépendance de deux événements A et B implique que la réalisation de l'un n'influence pas l'autre, d'où P(A ∩ B) = P(A) * P(B)."
            },
            {
              question: "Si Thalès s'applique sur un triangle AMN imbriqué dans ABC, la proportion d'égalité correcte est :",
              options: [
                "AM/AB = AN/AC = MN/BC",
                "AM/AN = AB/AC = MN/BC",
                "AB/AM = AC/AN = BC/CB",
                "AM/MB = AN/NC = MN/BC"
              ],
              correctAnswer: 0,
              explanation: "La proportionnalité s'évalue toujours en comparant les côtés du triangle réduit (AM, AN, MN) aux côtés correspondants du triangle étendu (AB, AC, BC)."
            }
          ]}
        />
      </Section>
    </div>
  );
};

export default Course_Ressources_Formulaire;
