import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner 
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sliders, Activity, TrendingUp } from 'lucide-react';

const Course_BTS_Tertiaire_01_Suites_Finance: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [initialCapital, setInitialCapital] = useState(5000); // Euros
  const [interestRate, setInterestRate] = useState(4.5); // % annual percentage
  const [years, setYears] = useState(8); // years

  // Derived financial computations
  // Years data array for drawing the interactive SVG bar graph
  const rateDecimal = interestRate / 100;
  
  const barData: { year: number; valSimple: number; valCompound: number }[] = [];
  for (let y = 0; y <= years; y++) {
    const valSimple = initialCapital * (1 + y * rateDecimal);
    const valCompound = initialCapital * Math.pow(1 + rateDecimal, y);
    barData.push({ year: y, valSimple, valCompound });
  }

  const finalCompoundValue = barData[barData.length - 1].valCompound;
  const totalInterestEarned = finalCompoundValue - initialCapital;

  // SVG dimensions for growth rendering
  const width = 450;
  const height = 180;
  const paddingX = 40;
  const paddingY = 20;

  const maxVal = Math.max(...barData.map(d => d.valCompound)) * 1.05;
  const graphWidth = width - 2 * paddingX;
  const graphHeight = height - 2 * paddingY;
  const colWidth = graphWidth / barData.length;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-BTS-TER-01"
        title="BTS Tertiaire : Finance mathématique & Suites"
        subtitle="Saisissez et comparez les modèles à intérêts simples et composés qui régissent les stratégies d'investissement actuelles."
        duration="1h 20"
      />

      {/* 1. Introduction */}
      <Section title="🎯 Introduction Pédagogique" icon="💰" color="indigo">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Dans le cadre de la gestion d'entreprise, de la comptabilité générale (BTS CG) et de l'analyse financière, l'évaluation du temps et de l'intérêt est primordiale. Chaque euro d'aujourd'hui ne possède pas la même valeur économique que celui de demain.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Pour modéliser l'évolution d'un placement ou le remboursement d'un emprunt bancaire, les mathématiciens s'appuient sur deux outils discrets extrêmement performants : les **suites arithmétiques** (modèle d'intérêts simples à croissance linéaire) et les **suites géométriques** (modèle d'intérêts composés à croissance exponentielle). Ce module vous apprend les théories et formules financières clés indispensables à l'obtention de votre diplôme supérieur.
        </p>
        <TipBanner type="info" title="L'actualisation financière">
          L'actualisation permet de déterminer le coût actuel équivalent à une rentrée financière future, ce qui sert de boussole absolue pour valider le retour sur investissement d'un grand projet industriel (mécanique ou tertiaire).
        </TipBanner>
      </Section>

      {/* 2. Interactive SVG bar chart simulation */}
      <Section title="📈 Simulateur de Capital & Intérêts Composés" icon="📈" color="emerald">
        <p className="mb-6 text-slate-700 dark:text-slate-300">
          Ajustez le capital initial de départ, le taux annuel nominal proposé et la durée du blocage pour observer l'écart exponentiel s'élargir entre les intérêts simples (barres bleues) et les intérêts composés (barres vertes) :
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
          {/* Sliders panel */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <h4 className="flex items-center gap-2 font-bold text-slate-950 dark:text-slate-50 text-base">
              <Sliders className="w-5 h-5 text-indigo-500" />
              Réglages de Placement
            </h4>

            {/* Capital slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Capital Initial (C₀) :</span>
                <span className="text-indigo-650 font-bold">{initialCapital.toLocaleString()} €</span>
              </div>
              <input 
                type="range" min="1000" max="25000" step="1000" value={initialCapital}
                onChange={(e) => setInitialCapital(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Interest Rate slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Taux d'intérêt annuel (t) :</span>
                <span className="text-indigo-650 font-bold">{interestRate.toFixed(1)} %</span>
              </div>
              <input 
                type="range" min="0.5" max="15.0" step="0.5" value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Horizon years slider */}
            <div>
              <div className="flex justify-between text-xs font-mono font-medium mb-1">
                <span className="text-slate-600 dark:text-slate-400">Durée d'épargne (n) :</span>
                <span className="text-indigo-650 font-bold">{years} ans</span>
              </div>
              <input 
                type="range" min="2" max="15" step="1" value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic SVG graphic rendering */}
          <div className="lg:col-span-4 flex flex-col items-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-mono">Projection à {years} ans</span>
            <div className="relative w-full h-[180px] flex items-center justify-center">
              <svg width={width} height={height} className="rounded-lg">
                {/* Horizontal reference grids */}
                <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#f1f5f9" />
                <line x1={paddingX} y1={paddingY + graphHeight / 2} x2={width - paddingX} y2={paddingY + graphHeight / 2} stroke="#f1f5f9" />
                <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#cbd5e1" strokeWidth="1.5" />

                {/* Grow bars */}
                {barData.map((d, idx) => {
                  const simpleH = (d.valSimple / maxVal) * graphHeight;
                  const compoundH = (d.valCompound / maxVal) * graphHeight;
                  const xCoord = paddingX + idx * colWidth + colWidth * 0.1;
                  const rectW = colWidth * 0.35;

                  return (
                    <g key={idx}>
                      {/* Simple interest bar (blue) */}
                      <rect 
                        x={xCoord} 
                        y={height - paddingY - simpleH} 
                        width={rectW} 
                        height={simpleH} 
                        fill="#60a5fa" 
                        rx="1.5"
                      />
                      {/* Compound interest bar (emerald) */}
                      <rect 
                        x={xCoord + rectW + 1} 
                        y={height - paddingY - compoundH} 
                        width={rectW} 
                        height={compoundH} 
                        fill="#10b981" 
                        rx="1.5"
                      />
                      {/* X label */}
                      <text x={xCoord + rectW} y={height - 4} textAnchor="middle" className="text-[9px] fill-slate-400 font-mono">
                        A{d.year}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Growth metadata feedback */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono block mb-2 font-medium">Bilan Épargne final</span>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Capital acquis final (C_n) :</div>
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-500 font-mono">
                    {finalCompoundValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} €
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Total des gains d'intérêts :</div>
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                    + {totalInterestEarned.toLocaleString(undefined, { maximumFractionDigits: 2 })} €
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed font-sans border-t pt-3 mt-4">
              La différence arithmétique globale s'élève à <strong>{(finalCompoundValue - barData[barData.length - 1].valSimple).toLocaleString(undefined, { maximumFractionDigits: 2 })} €</strong> en faveur des intérêts composés. C'est l'effet boule de neige du capital réinvesti.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Detailed Theory section with LaTeX formulas */}
      <Section title="📘 Formalisme des Suites Arithmétiques & Géométriques" icon="📚" color="slate">
        <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Plaçons nous dans un contexte financier discret. Soit {"$C_0$"} le capital placé de départ :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <InfoBlock type="definition" title="1. Modèle d'Intérêts Simples (Arithmétique)">
            Le versement d'interêt annuel est calculé exclusivement sur le capital de départ {"$C_0$"} et reste fixe chaque année. Il s'associe à une suite arithmétique de raison {"$r = C_0 \times t$"} :
            <MathComponent block math="C_n = C_0 + n \times r = C_0 \left(1 + n \times t\right)" />
            Le taux {"$t$"} s'applique sous forme décimale (ex : {"$4\% = 0.04$"}). C'est le modèle standard des dépôts de court terme inférieurs à 12 mois.
          </InfoBlock>

          <InfoBlock type="definition" title="2. Modèle d'Intérêts Composés (Géométrique)">
            Les intérêts générés à la clôture de chaque exercice annuel sont réintégrés au capital de placement d'origine pour fructifier l'année d'après. C'est un processus géométrique de raison {"$q = 1 + t$"} :
            <MathComponent block math="C_n = C_0 \times (1 + t)^n" />
            Ce comportement géométrique génère une accélération exponentielle d'intérêts au fil des ans. C'est la base de toute épargne de longue durée.
          </InfoBlock>
        </div>

        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-2">3. Théorie Fondamentale de l'Actualisation & Évaluation des flux</h4>
        <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          Pour acquérir une entreprise ou négocier un crédit à remboursement constant, les comptables calculent la **valeur actuelle** d'une série de versements récurrents {"$a$"} d'intérêts périodiques constants. La valeur actuelle actualisée totale {"$V_0$"} juste s'écrit :
        </p>

        <FormulaBox 
          title="Valeur Actuelle d'une Suite d'Annuités Constantes" 
          math="V_0 = a \times \frac{1 - (1+t)^{-n}}{t}" 
        />
      </Section>

      {/* 4. Two solved exercises */}
      <Section title="🛠️ Exercices Résolus d'Examen" icon="🛠️" color="purple">
        <InteractiveExercise 
          title="Exercice 1 : Épargne Logement d'Entreprise (BTS CG / Tertiaire)"
          question={
            <div className="space-y-2">
              <p>
                Une PME de logistique locale d'Angers place un capital disponible de trésorerie de {"$C_0 = 10000\\text{ €}$"} sur un compte de dépôt à terme bloqué rémunéré au taux de {"$t = 4\\%\\text{ par an}$"} à intérêts composés.
              </p>
              <p className="font-semibold">
                1. Calculez la valeur globale acquise par cette trésorerie au bout de 5 ans.
              </p>
              <p className="font-semibold">
                2. Déterminez le temps d'attente minimal en années nécessaires pour doubler la mise de fonds de départ pour atteindre {"$20000\\text{ €}$"}.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Calcul de la valeur acquise</p>
              <p>On applique la formule fondamentale d'intérêts composés géométriques de raison {"$q = 1.04$"}:</p>
              <MathComponent block math="C_5 = 10000 \times (1 + 0.04)^5 = 10000 \times (1.04)^5 \approx 10000 \times 1.21665 = 12166.53\text{ €}" />
              <p>La PME aura acquis {"$12166.53\\text{ €}$"} à la fin des 5 ans d'exercice.</p>
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Poser l'inéquation logarithmique de doublement</p>
              <p>On cherche l'entier minimal {"$n$"} tel que {"$C_n \\ge 20000$"}. Écrivons :</p>
              <MathComponent block math="10000 \times (1.04)^n \ge 20000 \implies (1.04)^n \ge 2" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Résolution via les logarithmes de base 10 (ou népériens LN)</p>
              <p>On applique l'opérateur logarithmique népérien qui descend la puissance {"$n$"}:</p>
              <MathComponent block math="\ln((1.04)^n) \ge \ln(2) \implies n \times \ln(1.04) \ge \ln(2) \implies n \ge \frac{\ln(2)}{\ln(1.04)}" />
              <p>Numériquement :</p>
              <MathComponent block math="n \ge \frac{0.69315}{0.03922} \approx 17.67\text{ ans}" />
              <p>Il faudra attendre un minimum absolu de <strong>18 années complètes d'exercice</strong> de placement continu pour doubler le capital initial de trésorerie.</p>
            </div>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Calcul de la mensualité constante d'un prêt de bureau"
          question={
            <div className="space-y-2">
              <p>
                Un cabinet d'expert-comptable emprunte un capital de {"$V_0 = 50000\\text{ €}$"} au taux annuel d'intérêt nominal de {"$t = 3\\%$"}. Ce cabinet s'engage à rembourser en block de 5 ans par annuités constantes annuelles.
              </p>
              <p className="font-semibold">
                Calculez le montant exact de l'annuité constante de remboursement annuel {"$a$"} de ce bureau commercial.
              </p>
            </div>
          }
          steps={[
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 1 : Poser l'équation de valeur actuelle des annuités</p>
              <p>On utilise la formule d'actualisation de BTS Tertiaire en isolant l'inconnue {"$a$"}:</p>
              <MathComponent block math="V_0 = a \times \frac{1 - (1+t)^{-n}}{t} \implies a = V_0 \times \frac{t}{1 - (1+t)^{-n}}" />
            </div>,
            <div className="space-y-2">
              <p className="font-bold text-slate-800">Étape 2 : Remplacement numérique des termes</p>
              <p>On substitue les constantes : {"$V_0 = 50000$"}${"$t = 0.03$"} et {"$n = 5$"} ans :</p>
              <MathComponent block math="a = 50000 \times \frac{0.03}{1 - (1.03)^{-5}}" />
              <p>Calculons le terme au dénominateur :</p>
              <MathComponent block math="1.03^{-5} \approx 0.86261 \implies 1 - 1.03^{-5} \approx 0.13739" />
            </div>,
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-medium text-emerald-950">
              <p className="font-bold">Étape 3 : Calcul final de la mensualité financière de remboursement</p>
              <MathComponent block math="a \approx 50000 \times \frac{0.03}{0.13739} \approx 50000 \times 0.21835 = 10917.72\text{ €}" />
              <p>Le cabinet comptable devra verser un chèque d'un montant annuel constant d'échéance de <strong>10917.72 € par an</strong> pour apurer sa dette commerciale de 50000 €.</p>
            </div>
          ]}
        />
      </Section>

      {/* 5. Interactive Flashcards */}
      <Section title="⚡ Flashcards de Révision" icon="⚡" color="rose">
        <p className="mb-4 text-slate-700 dark:text-slate-300">
          Chiffrez de tête les bases logiques du placement :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Suites Mathématiques</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">À quel type de modèle de suite correspond mathématiquement le système d'intérêt simple ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-150 mb-1">Une Suite Arithmétique</span>
                <MathComponent block math="C_n = C_0 + n \times r" />
                <span className="text-xs text-slate-600 dark:text-slate-400 mt-2">La raison vaut r = C_0 * t. La croissance de l'épargne est strictement rectiligne / symétrique.</span>
              </div>
            }
          />

          <Flashcard 
            front={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Modèle Exponentiel</span>
                <span className="text-base font-semibold text-slate-800 dark:text-slate-150">Pourquoi l'épargne géométrique accélère-t-elle avec le temps ?</span>
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-rose-50/10">
                <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-mono">Réponse</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">Les intérêts produisent à leur tour des intérêts</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Dans le modèle des intérêts composés, la fructification ne s'éteint pas sur le capital initial mais capitalise continuellement les gains des exercices précédents réinvestis.
                </p>
              </div>
            }
          />
        </div>
      </Section>

      {/* 6. FAQ Section */}
      <Section title="💡 Questions Fréquentes (FAQ)" icon="❓" color="amber">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'actualisation est-elle cruciale pour apprécier un projet d'investissement ?",
              answer: (
                <p>
                  Parce qu'un versement futur comporte une incertitude (inflation, risque de solvabilité de l'acteur). Recevoir 1000 € dans 5 ans possède beaucoup moins de valeur aujourd'hui que d'obtenir ces mêmes 1000 € immédiatement. L'actualisation {"$(\"1+t\")^{-n}$"} décote mathématiquement les flux lointains pour calculer leur équivalence contemporaine réelle et fiable.
                </p>
              )
            },
            {
              question: "Qu'est-ce que le taux de rendement interne (TRI) ?",
              answer: (
                <p>
                  Le Taux de Rendement Interne (TRI) correspond au taux d'actualisation nominal idéal pour lequel la Valeur Actuelle Nette (VAN) d'un projet d'investissement s'égalise précisément à zéro. C'est l'indicateur universel de rentabilité interne d'un investisment.
                </p>
              )
            },
            {
              question: "Pourquoi le Livret A d'épargne français fonctionne-t-il sur les intérêts composés ?",
              answer: (
                <p>
                  Le Livret A d'épargne est basé sur le principe de capitalisation géométrique annuelle : les intérêts calculés au 31 décembre sont crédités sur le solde de la quinzaine et s'additionnent de manière pérenne aux encours capitalisés pour l'assiette du calcul de l'année d'après.
                </p>
              )
            }
          ]}
        />
      </Section>

      {/* 7. Comprehensive Quiz with 3 questions minimum */}
      <Section title="📝 Mini-Quiz de Validation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle formule donne la valeur finale nominale Cn acquise par un capital C0 placé à intérêts composés à un taux d'intérêt i pendant n périodes ?",
              options: [
                "Cn = C₀ * (1 + n * i)",
                "Cn = C₀ * (1 + i)^n",
                "Cn = C₀ / (1 + i)^n"
              ],
              correctAnswer: 1,
              explanation: "À intérêts composés, le mécanisme est une croissance géométrique d'assiette, sa modélisation algébrique s'écrit donc explicitement sous la forme Cn = C₀ * (1+i)^n."
            },
            {
              question: "Comment se comporte graphiquement et temporellement la valeur globale d'une investissement à intérêts simples ?",
              options: [
                "Comme une ligne droite à pente constante",
                "Comme une courbe parabolique accélérée",
                "Comme une dégringolade logarithmique"
              ],
              correctAnswer: 0,
              explanation: "Les intérêts simples ajoutent la même somme fixe d'intérêts d'un exercice sur l'autre (raisons arithmétiques r). Graphiquement, le capital décrit une pure progression linéaire qui s'apparente à une droite affine d'équation y = ax+b."
            },
            {
              question: "Dans le remboursement d'un emprunt à annuités constantes, qu'arrive-t-il à la part d'intérêts d'échéance remboursée au fil du temps ?",
              options: [
                "Elle grimpe exponentiellement chaque mois",
                "Elle décline constamment car le capital restant dû diminue",
                "Elle reste parfaitement inchangée pendant 15 ans"
              ],
              correctAnswer: 1,
              explanation: "Puisque les annuités payées sont constantes mais qu'au fil du contrat, l'emprunteur amortit (rembourse) une part croissante du montant principal, le capital restant dû s'amenuise. La part d'intérêt décroît ainsi logiquement au bénéfice de l'amortissement du capital de départ."
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je fais sans erreur la distinction de croissance mathématique arithmétique/géométrique.",
            "Je sais manipuler les formules des intérêts simples et composés de mon syllabus de BTS.",
            "Je maîtrise l'usage des logarithmes pour l'extraction rationnelle de la variable de temps n.",
            "Je sais calculer la valeur d'actualisation et les annuités de dettes financières."
          ]}
        />
      </Section>

      {/* 8. Course Complete button */}
      {!isCompleted && (
        <div className="flex justify-center mt-12">
          <button 
            onClick={onValidateCourse}
            className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-650 hover:to-teal-700 text-white rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-xl font-bold"
          >
            <Activity className="w-6 h-6 animate-pulse" />
            Valider le Cours & Débloquer (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_BTS_Tertiaire_01_Suites_Finance;
