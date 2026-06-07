import React, { useState, useMemo } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, FormulaBox
} from '../components/SharedUI';
import { LineChart, Sliders, CheckCircle } from 'lucide-react';

const Course_BTS_02_Statistiques_Inferentielles: React.FC = () => {
  // Simulator state
  const [sampleSize, setSampleSize] = useState<number>(150); // n
  const [proportion, setProportion] = useState<number>(0.4); // p (0.1 to 0.9)
  const [confidence, setConfidence] = useState<number>(95); // 90%, 95%, 99%

  const mathCalc = useMemo(() => {
    const n = sampleSize;
    const p = proportion;
    
    let z = 1.96;
    if (confidence === 90) z = 1.645;
    if (confidence === 99) z = 2.576;

    const stdError = Math.sqrt((p * (1 - p)) / n);
    const margin = z * stdError;
    const lower = Math.max(0, p - margin);
    const upper = Math.min(1, p + margin);

    return {
      n, p, z, stdError, margin, lower, upper
    };
  }, [sampleSize, proportion, confidence]);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="BTS-02"
        title="Statistiques Inférentielles"
        subtitle="Estimation ponctuelle, construction d'Intervalles de Confiance, fluctuation d'échantillonnage et introduction aux tests d'hypothèses."
        duration="5 heures"
        level="Post-Bac (BTS)"
        prerequisites={["Loi Normale centrée réduite", "Loi Binomiale"]}
        objectives={[
          "Démystifier le passage de l'échantillon à la population globale",
          "Calculer et interpréter des estimateurs ponctuels non biaisés",
          "Déterminer un intervalle de confiance au seuil d'importance standard",
          "Comprendre les risques d'erreur alpha et bêta dans les tests de décision"
        ]}
      />

      <InfoBlock type="definition" title="Qu'est-ce que l'Inférence Statistique ?">
        <p>
          L'inférence statistique est la démarche scientifique qui consiste à extrapoler à une population entière (souvent inaccessible) des caractéristiques mesurées sur un échantillon aléatoire représentatif. Elle repose sur la théorie mathématique de l'échantillonnage.
        </p>
      </InfoBlock>

      <Section title="📊 Théorie de l'Estimation" icon="📊" color="indigo">
        <p className="mb-4">
          On distingue deux types majeurs d'estimations :
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-700 dark:text-slate-300">
          <li><strong>L'estimation ponctuelle :</strong> Fournit une valeur unique pour estimer un paramètre inconnu (par exemple, la moyenne observée d'un échantillon {"$\\bar{x}$"} estime la moyenne globale {"$\\mu$"}).</li>
          <li><strong>L'estimation par intervalle :</strong> Donne une plage de valeurs $[f - t, f + t]$ associée à une probabilité d'erreur contrôlée appelée <strong>niveau de confiance</strong> (souvent {"$95\\%$"}).</li>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormulaBox 
            title="Écart-Type d'Échantillonnage \sigma" 
            math={"\\sigma = \\sqrt{\\frac{p(1-p)}{n}}"} 
          />
          <FormulaBox 
            title="Intervalle de Confiance à 95%" 
            math={"I_c = \\left[ p - 1.96 \\sqrt{\\frac{p(1-p)}{n}} \\ ; \\ p + 1.96 \\sqrt{\\frac{p(1-p)}{n}} \\right]"} 
          />
        </div>
      </Section>

      <Section title="📈 Exercice Interactif : Simulateur d'Intervalle de Confiance" icon={<LineChart className="w-5 h-5 text-emerald-600" />} color="emerald">
        <p className="mb-4">
          Manipulez les contrôles pour ajuster la taille de l'échantillon {"$n$"} et la proportion observée {"$p$"} pour visualiser l'élargissement ou le rétrécissement de l'intervalle de confiance sur le profil de la loi normale.
        </p>

        {/* INTERACTIVE COMPONENT: Confidence Interval Simulator */}
        <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Controls */}
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-705 dark:text-slate-300 block uppercase">
                Ajuster les Conditions :
              </span>
              <div>
                <label className="text-xs font-mono font-bold text-slate-500 block mb-1">
                  Taille de l'Échantillon (n) : {sampleSize}
                </label>
                <input 
                  type="range" min="30" max="600" step="10" value={sampleSize}
                  onChange={(e) => setSampleSize(parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-mono font-bold text-slate-500 block mb-1">
                  Proportion Observée (p) : {(proportion * 100).toFixed(0)} %
                </label>
                <input 
                  type="range" min="0.1" max="0.9" step="0.05" value={proportion}
                  onChange={(e) => setProportion(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-mono font-bold text-slate-500 block mb-1">
                  Niveau de Confiance : {confidence} %
                </label>
                <div className="flex gap-2">
                  {[90, 95, 99].map(level => (
                    <button 
                      key={level}
                      onClick={() => setConfidence(level)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${confidence === level ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white dark:bg-slate-950 border-slate-200'}`}
                    >
                      {level}% (z = {level === 90 ? '1.64' : level === 95 ? '1.96' : '2.58'})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Graph Render */}
            <div className="bg-white dark:bg-slate-950 p-6 border rounded-2xl flex flex-col items-center justify-center">
              <span className="text-xs font-mono font-bold text-slate-400 mb-4 block uppercase tracking-wider">Loi de Fluctuation de Proportion</span>
              
              {/* SVG Curve Renders */}
              <svg width="220" height="130" className="overflow-visible mb-4">
                {/* Horizontal Baseline */}
                <line x1="10" y1="110" x2="210" y2="110" stroke="#cbd5e1" strokeWidth="2" />
                
                {/* Visual central Gaussian curve */}
                <path 
                  d="M 10,110 C 60,110 80,10 110,10 C 140,10 160,110 210,110" 
                  fill="none" 
                  stroke="#cbd5e1" 
                  strokeWidth="2" 
                />

                {/* Highlighted core confidence zone based on width calculation */}
                {/* The larger the standard error, the wider the confidence interval */}
                <path 
                  d={`M ${110 - (mathCalc.margin * 180)} ,110 C ${110 - (mathCalc.margin * 100)},110 80,10 110,10 C 140,10 ${110 + (mathCalc.margin * 100)},110 ${110 + (mathCalc.margin * 180)},110`}
                  fill="rgba(16, 185, 129, 0.15)"
                  stroke="#10b981"
                  strokeWidth="3.5"
                />

                <line x1="110" y1="10" x2="110" y2="110" stroke="#059669" strokeWidth="1.5" strokeDasharray="3" />
                <text x="110" y="125" fill="#059669" className="font-mono text-[10px]" textAnchor="middle">p = {proportion.toFixed(2)}</text>
              </svg>

              <div className="text-center">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Intervalle de Confiance :
                </p>
                <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded mt-1.5 inline-block">
                  I_c = [{mathCalc.lower.toFixed(4)} ; {mathCalc.upper.toFixed(4)}]
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="🧠 Flashcards : Inférence & Tests" icon="🧠" color="amber">
        <p className="mb-4">
          Un entraînement rapide de révision mentale pour consolider les notions clés demandées dans les dossiers d'épreuves de BTS.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Qu'est-ce qu'un estimateur sans biais ?</>}
            back={<>C'est un estimateur dont la moyenne théorique est égale à la grandeur réelle à estimer.</>}
          />
          <Flashcard 
            front={<>Comment varie la taille d'un intervalle de confiance si la taille {"$n$"} de l'échantillon double ?</>}
            back={<>La taille de l'intervalle diminue par un facteur de {"$\\sqrt{2}$"} (environ {"$40\\%$"} plus précis).</>}
          />
          <Flashcard 
            front={<>Qu'est-ce que l'erreur de premier type {"$\\alpha$"} dans un test d'hypothèse ?</>}
            back={<>C'est la probabilité de rejeter l'hypothèse nulle {"$H_0$"} alors qu'elle est en réalité vraie (faux positif).</>}
          />
          <Flashcard 
            front={<>Quelle est la formule simplifiée du théorème central limite pour les proportions ?</>}
            back={<>Si {"$n \\ge 30$"}, {"$np \\ge 5$"} et {"$n(1-p) \\ge 5$"}, la proportion suit approximativement la loi normale {"$\\mathcal{N}(p, \\sqrt{p(1-p)/n})$"}.</>}
          />
        </div>
      </Section>

      <Section title="⚔️ Challenge Statistique" icon="⚙" color="purple">
        <Quiz 
          questions={[
            {
              question: "Si l'on cherche un niveau de confiance de 99%, le coefficient diviseur de référence z-score est :",
              options: [
                "z = 1.96",
                "z = 1.645",
                "z = 2.576",
                "z = 3.00"
              ],
              correctAnswer: 2,
              explanation: "Pour englober 99% des valeurs sous la courbe de Gauss (loi normale), on doit s'éloigner d'environ 2,576 écarts-types de chaque côté de la moyenne."
            },
            {
              question: "Quelle condition sur l'échantillon n'est pas impérative pour valider l'approximation par une loi de Gauss ?",
              options: [
                "L'échantillon doit obligatoirement être supérieur ou égal à 30 (n ≥ 30)",
                "Les conditions limites du théorème central limite doivent s'appliquer (np ≥ 5)",
                "La variance de l'échantillon doit être exactement égale à sa moyenne (V = moyenne)",
                "Les tirages doivent s'assimiler à des tirages indépendants"
              ],
              correctAnswer: 2,
              explanation: "L'égalité absolue de la variance et de la moyenne caractérise la Loi de Poisson, mais ce n'est absolument pas une obligation pour appliquer le TCL à une variable de proportion."
            },
            {
              question: "Qu'est-ce que la marge d'erreur d'un intervalle ?",
              options: [
                "La demi-largeur de l'intervalle de confiance représentant l'écart d'erreur potentiel z*std_error",
                "Le pourcentage de tirages défectueux dans l'industrie",
                "L'opposée exacte du coefficient d'estimateur de fluctuation",
                "Un écart d'erreur systématique involontaire du protocole scientifique"
              ],
              correctAnswer: 0,
              explanation: "La marge d'erreur exprime la demi-longueur de l'intervalle de fluctuation ou de confiance. On écrit Ic = [p - marge, p + marge]."
            }
          ]}
        />
      </Section>
    </div>
  );
};

export default Course_BTS_02_Statistiques_Inferentielles;
