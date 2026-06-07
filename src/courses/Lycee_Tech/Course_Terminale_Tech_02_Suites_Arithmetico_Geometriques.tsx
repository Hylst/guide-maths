import React, { useState, useMemo } from 'react';
import { CourseHeader, Section, InfoBlock, TipBanner, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard, InteractiveExercise } from '../../components/SharedUI';
import { useProgress } from '../../hooks/useProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronRight, HelpCircle, ArrowRight, TrendingUp, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

// Interactive Arithmetic-Geometric Sequence Simulator
const ArithmeticoGeometriqueSim = () => {
  const [u0, setU0] = useState<number>(1000);   // Initial value (e.g. population or loan depth)
  const [coeffA, setCoeffA] = useState<number>(0.8); // coefficient 'a' multiplication
  const [constB, setConstB] = useState<number>(300); // additive 'b' constant

  const dataPoints = useMemo(() => {
    const points = [];
    let current = u0;
    points.push({ step: 0, val: current });
    for (let i = 1; i <= 10; i++) {
      current = coeffA * current + constB;
      points.push({ step: i, val: current });
    }
    
    // Stable state Limit calculation: L = b / (1 - a)
    let limit: number | null = null;
    let isStable = false;
    if (Math.abs(coeffA) < 1) {
      limit = constB / (1 - coeffA);
      isStable = true;
    }

    return {
      points,
      limit,
      isStable
    };
  }, [u0, coeffA, constB]);

  // Determine the max value for scale in SVG layout
  const maxVal = useMemo(() => {
    const vals = dataPoints.points.map(p => p.val);
    if (dataPoints.limit !== null) {
      vals.push(dataPoints.limit);
    }
    return Math.max(...vals, 100) * 1.1; // 10% upper padding
  }, [dataPoints]);

  return (
    <div className="bg-card border-2 border-slate-100 rounded-3xl p-6 shadow-xl max-w-3xl mx-auto my-8">
      <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-4">
        Simulateur de Suite Arithmético-Géométrique : {"$u_{n+1} = a \\cdot u_n + b$"}
      </h3>
      <p className="text-xs text-slate-500 text-center mb-6">
        Modélisez un système (ex: population de faucons, crédit de trésorerie, raccord de stock) et observez l'évolution dynamique temporelle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Interactive Controls */}
        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Valeur Initiale ({"$u_0$"}) : <span className="text-indigo-600 font-mono font-black">{u0}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="3000" 
                step="100"
                value={u0} 
                onChange={(e) => setU0(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Coefficient Multiplication ({"$a$"}) : <span className="text-indigo-600 font-mono font-black">{coeffA.toFixed(2)}</span>
              </label>
              <input 
                type="range" 
                min="0.1" 
                max="1.5" 
                step="0.05"
                value={coeffA} 
                onChange={(e) => setCoeffA(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
                <span>Stabilisé (a &lt; 1)</span>
                <span>Divergent (a &gt; 1)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Constante d'Apport ({"$b$"}) : <span className="text-indigo-600 font-mono font-black">+{constB}</span>
              </label>
              <input 
                type="range" 
                min="-500" 
                max="800" 
                step="50"
                value={constB} 
                onChange={(e) => setConstB(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900 space-y-2.5">
            <h4 className="text-xs font-bold text-indigo-805 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
              <TrendingUp size={14} /> Diagnostic des Limites :
            </h4>
            
            {dataPoints.isStable && dataPoints.limit !== null ? (
              <div className="space-y-1">
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-350">
                  Comme le coefficient {"$|a| < 1$"}, la suite converge vers un état d'équilibre stationnaire appelé la **limite de stabilisation** :
                </p>
                <div className="font-mono text-center mt-1 py-1.5 bg-white dark:bg-slate-900 border rounded font-black text-indigo-700 dark:text-indigo-400 text-sm">
                  {"$$L = \\frac{b}{1-a} = \\frac{"}{constB}{"}{1 - "}{coeffA.toFixed(2)}{"} = "}{dataPoints.limit.toFixed(1)}{"$$"}
                </div>
              </div>
            ) : (
              <p className="text-xs text-rose-600 dark:text-rose-450 font-bold leading-relaxed">
                Le coefficient {"$a \\ge 1$"} provoque une explosion exponentielle à l'infini (divergence). Le système est instable et grandit sans limite naturelle !
              </p>
            )}
          </div>
        </div>

        {/* Right: Dynamic Interactive SVG graph */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Comportement Graphique (n=0 à 10)</span>
          <div className="w-full h-64 bg-slate-100 dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-800 flex items-center justify-center p-4 shadow-inner relative">
            <svg 
              viewBox="0 0 220 150" 
              className="w-full h-full overflow-visible"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid lines */}
              <line x1="20" y1="130" x2="210" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="20" y1="10" x2="20" y2="130" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Grid reference guide line for limit L */}
              {dataPoints.isStable && dataPoints.limit !== null && (
                (() => {
                  const yPos = 130 - (dataPoints.limit / maxVal) * 110;
                  if (yPos >= 10 && yPos <= 130) {
                    return (
                      <>
                        <line x1="20" y1={yPos} x2="210" y2={yPos} stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="210" y={yPos - 2} fill="#10b981" textAnchor="end" className="text-[7px] font-mono font-bold">Asymptote L={dataPoints.limit.toFixed(0)}</text>
                      </>
                    );
                  }
                  return null;
                })()
              )}

              {/* Data curve nodes */}
              {(() => {
                const pointsSvg = dataPoints.points.map((p, idx) => {
                  const x = 20 + idx * 18;
                  const y = 130 - (p.val / maxVal) * 110;
                  return { x, y, val: p.val, step: p.step };
                });

                // Generate SVG polyline path string
                const pathStr = pointsSvg.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                return (
                  <>
                    <path d={pathStr} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {pointsSvg.map((p) => {
                      if (p.y >= 5 && p.y <= 135) {
                        return (
                          <g key={p.step}>
                            <circle cx={p.x} cy={p.y} r="3" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" className="cursor-pointer hover:r-4 transition-all" />
                            {p.step % 2 === 0 && (
                              <text x={p.x} y="142" textAnchor="middle" fill="#64748b" className="text-[7px] font-mono font-medium">n={p.step}</text>
                            )}
                          </g>
                        );
                      }
                      return null;
                    })}
                  </>
                );
              })()}
            </svg>
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/85 text-[9px] text-emerald-400 font-mono rounded-lg flex items-center gap-1 shadow">
              <span>u(10) = {dataPoints.points[10].val.toFixed(0)}</span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400 mt-2 uppercase">Nuage de points reliés (u_n)</span>
        </div>
      </div>
    </div>
  );
};

const Course_Terminale_Tech_02_Suites_Arithmetico_Geometriques: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/03_Lycee/Technologique/02_Terminale_Tech_02_Suites_Arithmetico_Geometriques.md";

  const checklistItems = [
    "Reconnaître l'énoncé d'une relation de récurrence arithmético-géométrique u(n+1) = a u(n) + b.",
    "Déterminer par un procédé d'équation l'état d'équilibre constant L (la limite théorique).",
    "Poser la suite auxiliaire géométrique v(n) = u(n) - L.",
    "Formuler l'expression générale explicite de u(n) en fonction du temps n.",
    "Étudier les variations et décider de l'existence de la convergence en fonction de l'intervalle de a."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="SAG" 
        title="Suites Arithmético-Géométriques" 
        subtitle="Modéliser et analyser des systèmes dynamiques mixtes combinant un facteur d'amortissement et un apport constant."
        level="Terminale Technologique"
        duration="2h"
        objectives={[
          "Identifier d'après un énoncé une relation de récurrence de la forme u_{n+1} = a u_n + b.",
          "Savoir exprimer le terme général u_n à l'aide d'une suite géométrique auxiliaire.",
          "Déterminer la limite stationnaire et étudier les seuils de stabilisation.",
          "Appliquer ces séquences aux modélisations concrètes : crédits et d'évolution écologique."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : Les suites géométriques et leur raison">
        Avant de t&apos;intéresser aux modèles mixtes, rappelle-toi que la limite d&apos;une suite géométrique dépend absolument de sa raison {"$q$"}. Si {"$|q| < 1$"}, la suite géométrique converge vers 0 quand {"$n$"} tend vers l&apos;infini. C&apos;est la clé de la stabilisation de nos suites arithmético-géométriques !
      </InfoBlock>

      <InfoBlock type="funfact" title="Le saviez-vous ? L'origine des premiers calculs de rentes et de crédits">
        Les suites arithmético-géométriques sont nées historiquement au XVIIe siècle avec l&apos;apparition des premières grandes compagnies d&apos;assurances et banques centrales maritimes européennes. Les marchands devaient calculer à l&apos;avance la capitalisation composée annuelle (effet multiplicateur géométrique) tout en retirant ou ajoutant une rente forfaitaire fixe chaque année (facteur arithmétique). C&apos;est ainsi qu&apos;est née la modélisation mathématique de l&apos;amortissement de prêt bancaire !
      </InfoBlock>

      <InfoBlock type="info" title="Zoom sur : Les systèmes de refroidissement d'un réacteur nucléaire">
        Dans le domaine de l&apos;ingénierie et de la physique industrielle, on modélise l&apos;évolution de température d&apos;une piscine de refroidissement de centrale nucléaire grâce à ces suites. À chaque intervalle de temps, l&apos;eau dissipe un pourcentage fixe de sa chaleur résiduelle dans l&apos;atmosphère (facteur d&apos;amortissement géométrique {"$a \\times u_n$"}), pendant que le réacteur y injecte un apport thermique constant (apport arithmétique {"$b$"}). La limite théorique {"$L$"} de la suite représente alors la température de stabilisation définitive de sécurité !
      </InfoBlock>

      <InfoBlock type="info" title="Les suites mixtes : La clé des modélisations réalistes">
        En économie, en chimie ou en biologie, les variations pures (linéaires comme les suites arithmétiques, ou exponentielles comme les suites géométriques) s'avèrent souvent insuffisantes. Une suite arithmético-géométrique combine les deux : par exemple, un étang d'aquaculture dont la population de poissons diminue d'un pourcentage fixe à cause des pêches territoriales, mais augmente de façon constante grâce à des repeuplements planifiés chaque fin de mois.
      </InfoBlock>

      <Section title="1. Définition et Relation de Récurrence" color="slate" icon={<Activity className="text-indigo-600 w-6 h-6"/>}>
        <div className="space-y-4">
          <p>
            Une suite {"$(u_n)$"} est dite **arithmético-géométrique** s'il existe deux nombres réels {"$a$"} et {"$b$"} non nuls tels que pour tout entier naturel {"$n$"} :
          </p>
          <div className="font-mono text-center my-4 bg-slate-50 dark:bg-slate-900 border p-3.5 rounded-2xl font-black text-indigo-700 dark:text-indigo-400">
            {"$$u_{n+1} = a \\times u_n + b$$"}
          </div>

          <TipBanner type="info" title="Cas particuliers remarquables">
            • Si {"$a = 1$"}, la suite devient une simple **suite arithmétique** de raison {"$b$"}.
            <br />
            • Si {"$b = 0$"}, la suite devient une simple **suite géométrique** de raison {"$a$"}.
          </TipBanner>
        </div>
      </Section>

      <Section title="2. Résolution : Méthode de la Suite Auxiliaire " color="indigo" icon="🛸">
        <div className="space-y-4">
          <p>
            Pour calculer directement le terme de rang {"$u_{100}$"} sans devoir calculer les 99 termes intermédiaires un par un, on effectue une traduction à l'aide d'une suite géométrique fantôme, appelée **suite auxiliaire**.
          </p>

          <div className="space-y-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-805 p-5 rounded-3xl">
            <h4 className="font-extrabold text-indigo-700 dark:text-indigo-300 text-sm mb-2">Les 4 étapes de la résolution analytique :</h4>
            <ol className="list-decimal pl-5 text-sm my-3 space-y-4 leading-normal">
              <li>
                <strong>Rechercher la valeur d'équilibre constante {"$L$"}</strong> en résolvant l'équation d'immobilité :
                {"$L = aL + b \\implies L(1-a) = b \\implies L = \\frac{b}{1-a}$"} (possible car {"$a \\neq 1$"}).
              </li>
              <li>
                <strong>Poser et définir la suite auxiliaire {"$v_n$"} :</strong>
                <div className="font-mono text-center my-2 p-1.5 bg-white dark:bg-black rounded border font-semibold">
                  {"$v_n = u_n - L$"}
                </div>
                Démontrer qu'elle est géométrique de raison {"$a$"} en montrant que {"$v_{n+1} = a \\times v_n$"}, puis calculer son premier terme : {"$v_0 = u_0 - L$"}.
              </li>
              <li>
                <strong>Écrire l'expression explicite de {"$v_n$"} :</strong>
                {"$v_n = v_0 \\times a^n$"} grâce aux règles des suites géométriques.
              </li>
              <li>
                <strong>Isoler et restituer l'expression finale de les {"$u_n$"} :</strong>
                <div className="font-mono text-center my-2 p-1.5 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-400 border rounded font-black">
                  {"$$u_n = v_n + L = (u_0 - L) \\times a^n + L$$"}
                </div>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      <Section title="3. Simulateur Interactif Temporel" color="purple" icon="⏳">
        <ArithmeticoGeometriqueSim />
      </Section>

      <Section title="4. Limite de Convergence" color="emerald" icon="🎯">
        <div className="space-y-4">
          <p>
            Le comportement à long terme de la suite dépend exclusivement de la valeur du coefficient multiplicateur d'amortissement {"$a$"}.
          </p>

          <BentoGrid>
            <BentoCard title="Condition de Convergence" color="emerald">
              <p className="text-sm mb-2">Si le coefficient de récurrence respecte la condition suivante :</p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-emerald-700 dark:text-emerald-400 font-bold">
                {"$$-1 < a < 1$$"}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">Alors le terme d'atténuation {"$a^n$"} tend vers 0 à l'infini. La suite converge vers l'asymptote plate de limite : {"$\\lim\\limits_{n \\to +\\infty} u_n = L$"}.</p>
            </BentoCard>

            <BentoCard title="Condition de Divergence" color="rose">
              <p className="text-sm mb-2">Si le coefficient multiplicateur est supérieur ou égal :</p>
              <div className="font-mono text-center p-2 bg-white dark:bg-slate-950 rounded border text-rose-700 dark:text-rose-450 font-bold">
                {"$$a \\ge 1$$"}
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">Alors la grandeur explose de manière exponentielle vers l'infini. Il n'existe aucun état de stabilisation ou d'équilibre possible.</p>
            </BentoCard>
          </BentoGrid>
        </div>
      </Section>

      <Section title="Exercices de Modélisation Résolus" color="amber" icon="🧠">
        <InteractiveExercise 
          title="Exercice 1 : Évolution écologique d'un parc naturel"
          question={
            <>
              Une réserve naturelle compte initialement {"$u_0 = 1\\,200$"} faucons. Chaque année, les prédateurs naturels provoquent une réduction de {"$15\\%$"} de la population mondiale locale, mais les gardes forestiers réintroduisent {"$150$"} nouveaux couples bagués (soit {"$300$"} oiseaux individuels).
              <br />
              1. Modéliser la population {"$u_n$"} à l'aide d'une suite récurrente.
              <br />
              2. Déterminer la limite constante vers laquelle cette population va tendre à long terme.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Formuler la relation de récurrence</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Diminuer de {"$15\\%$"} revient à appliquer un coefficient multiplicateur de {"$1 - 0.15 = 0.85$"}, puis on ajoute les {"$300$"} individus réintroduits chaque automne :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded font-bold">
                {"$$u_{n+1} = 0.85 \\times u_n + 300$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Chercher la valeur limite constante L</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On résout l'équation d'équilibre constante {"$L = 0.85 L + 300$"}:
                <br />
                {"$L - 0.85 L = 300 \\implies 0.15 L = 300 \\implies L = \\frac{300}{0.15} = 2\\,000$"}.
              </p>
              <div className="font-mono text-center my-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded border font-semibold">
                {"$$L = 2\\,000\\text{ faucons}$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Élucider le sens d'évolution</strong>
              <p className="mt-2 text-sm leading-relaxed flex items-start gap-1">
                Comme le coefficient d'amortissement respecte {"$0.85 < 1$"}, la population s'achemine lentement de manière monotone vers un plafond d'équilibre de 2 000 faucons. C'est un gage de sûreté écologique.
              </p>
            </>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Épargne bancaire avec prélèvements réguliers"
          question={
            <>
              Un client place initialement un capital de {"$u_0 = 10\\,000\\text{ €}$"} sur un compte de trésorerie rémunérateur à un taux d'intérêts de {"$3\\%$"} par an. Chaque fin d'année, il prélève de sa tirelire une somme fixe de {"$500\\text{ €}$"} pour couvrir ses abonnements.
              <br />
              1. Modéliser le compte d'épargne d'une année sur l'autre par la suite {"$u_{n}$"}.
              <br />
              2. Donner l'expression explicite de {"$u_n$"} à l'aide d'une suite de référence.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Établir la relation de récurrence</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Appliquer des intérêts annuels de {"$3\\%$"} équivaut à un coefficient de croissance de {"$1 + 0.03 = 1.03$"} sur le solde restant, suivi du prélèvement linéaire de {"$500\\text{ €}$"} :
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-100 dark:bg-slate-800 rounded">
                {"$$u_{n+1} = 1.03 \\times u_n - 500$$"}
              </div>
            </>,
            <>
              <strong>Étape 2 : Rechercher la limite d'équilibre de référence L</strong>
              <p className="mt-2 text-sm">
                Résolvons {"$L = 1.03 L - 500$"}:
              </p>
              <div className="font-mono text-center my-2 p-2 bg-slate-150 rounded text-slate-700">
                {"$$L - 1.03 L = -500 \\implies -0.03 L = -500 \\implies L = \\frac{-500}{-0.03} \\approx 16\\,666.67\\text{ €}$$"}
              </div>
            </>,
            <>
              <strong>Étape 3 : Expression générale de la suite</strong>
              <p className="mt-2 text-sm leading-relaxed">
                On pose la suite auxiliaire géométrique {"$v_n = u_n - L$"} de raison {"$a = 1.03$"} :
                <br />
                • {"$v_0 = u_0 - L = 10\\,000 - 16\\,666.67 = -6\\,666.67\\text{ €}$"}.
                <br />
                • {"$v_n = -6\\,666.67 \\times (1.03)^n$"}.
                <br />
                On injecte ce résultat pour obtenir l'expression explicite globale cherchée :
              </p>
              <div className="font-mono text-center my-2 p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border rounded font-bold text-base">
                {"$$u_n = -6\\,666.67 \\times (1.03)^n + 16\\,666.67$$"}
              </div>
              <p className="text-xs text-slate-500 italic mt-1">Comme {"$a = 1.03 > 1$"}, le coefficient croît à l'infini mais précédé d'un signe négatif, son épargne s'écroule de manière inévitable et le compte finira à découvert.</p>
            </>
          ]}
        />
      </Section>

      <Section title="Questions Fréquentes (FAQ)" color="slate" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Quelle est la signification physique d'une limite d'équilibre dans un modèle de suite ?",
            answer: "C'est l'état où les entrées et les sorties du système se compensent exactement. Au niveau L, la perte causée par le coefficient 'a' est idéalement comblée par l'apport d'ajout 'b'."
          },
          {
            question: "Est-ce que toutes les suites arithmético-géométriques convergent toujours ?",
            answer: "Non, absolument pas ! Elles ne convergent que si le coefficient d'amortissement 'a' est compris strictement entre -1 et 1. Si a >= 1 (comme dans le cas de l'épargne avec capitalisation d'intérêts), la suite explose."
          },
          {
            question: "À quoi sert l'utilisation de la suite auxiliaire, concrètement ?",
            answer: "La suite auxiliaire sert à 'geler' l'apport constant 'b' en ramenant l'étude à l'origine. En éliminant virtuellement 'b', on obtient une suite géométrique d'école dont les formules de résolution explicite directe de u_n sont connues et immédiates."
          }
        ]} />
      </Section>

      <Section title="Cartes Mémo (Flashcards)" color="purple" icon="🃏">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle relation caractérise une suite arithmético-géométrique ?</>}
            back={<>Une récurrence associant produit de croissance et addition linéaire : {"$u_{n+1} = a \\times u_n + b$"}.</>}
          />
          <Flashcard 
            front={<>Quelle est la formule d'équilibre de la limite asymptotique L ?</>}
            back={<>L'évaluation stationnaire : {"$L = \\frac{b}{1-a}$"} sous conditions strictes de convergence.</>}
          />
        </div>
      </Section>

      <Section title="Quiz de validation" color="indigo" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si u(n+1) = u(n) + 3, de quel type de suite s'agit-il ?",
              options: ["Arithmétique pure (a=1)", "Géométrique pure (b=0)", "Arithmético-géométrique divergent"],
              correctAnswer: 0,
              explanation: "Comme le coefficient multiplicatif a vaut 1, la suite n'a pas de composante géométrique, c'est une suite arithmétique de raison 3."
            },
            {
              question: "Déterminer la limite constante d'équilibre de la suite u(n+1) = 0.8 u(n) + 100",
              options: ["100", "500 (100 / 0.2)", "80 (100 * 0.8)"],
              correctAnswer: 1,
              explanation: "En appliquant la formule d'asymptote L = b / (1 - a) : L = 100 / (1 - 0.8) = 100 / 0.2 = 500."
            },
            {
              question: "Si a = 1.15 dans la relation de récurrence, que fait la suite pour des valeurs positives ?",
              options: ["Elle converge vers la limite L", "Elle s'annihile d'elle-même", "Elle diverge de manière explosive vers l'infini"],
              correctAnswer: 2,
              explanation: "Comme 1.15 est strictement supérieur à 1, la suite géométrique associée diverge de manière explosive."
            }
          ]}
        />
      </Section>

      <div onClick={() => validateCourse(courseId)}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Terminale_Tech_02_Suites_Arithmetico_Geometriques;
