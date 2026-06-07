import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, AccordionFAQ, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { motion } from 'framer-motion';
import { Thermometer, Navigation, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const Course_5eme_02_Nombres_Relatifs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Axe Gradué Sandbox State
  const [val, setVal] = useState<number>(-4);

  const distanceToZero = Math.abs(val);
  const oppose = val === 0 ? 0 : -val;

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-5-RELA"
        title="Les Nombres Relatifs"
        subtitle="L'Empire d'En-Bas : Domptez les nombres négatifs et l'art des profondeurs."
        duration="45 min"
        level="5ème (Cycle 4)"
        prerequisites={["Savoir ordonner des nombres positifs décimaux", "Comprendre le concept d'axe gradué", "Maîtriser une soustraction simple"]}
        objectives={[
          "Comprendre ce qu'est un nombre négatif et comment il se note.",
          "Lire, repérer et ordonner des nombres relatifs sur un axe gradué.",
          "Déterminer sans ambiguïté la distance à zéro (la valeur absolue) d'un nombre.",
          "Savoir trouver l'opposé d'un nombre relatif dans le miroir du zéro."
        ]}
      />

      {/* INTRODUCTION PÉDAGOGIQUE */}
      <Section title="❄️ Le Portail sous le Zéro" icon="🌌" color="blue">
        <p className="leading-relaxed">
          Pendant des siècles, les mathématiciens ont refusé d&apos;admettre l&apos;existence de nombres plus petits que rien. Ils les appelaient les <em>nombres absurdes</em> ou fictifs ! Pourtant, ces nombres invisibles résolvent des énigmes de tous les jours. Comment exprimer d&apos;un seul coup d&apos;œil une altitude sous le niveau de la mer, une température glaciale polaire, ou une dette bancaire ?
        </p>
        <p className="mt-4 leading-relaxed font-semibold text-slate-800 dark:text-slate-100">
          Les <strong>Nombres Relatifs</strong> sont nés de ce besoin. Ils forment un pont entre deux royaumes :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/60 rounded-[2rem]">
            <h4 className="font-bold text-amber-900 dark:text-amber-250 text-lg flex items-center gap-2">☀️ Le Côté Positif (Nombres &gt; 0)</h4>
            <p className="text-xs font-mono text-amber-800 dark:text-amber-300/85 mt-2 leading-relaxed">
              Ce sont tes anciens amis. Précédés d&apos;un signe plus (+) sous-entendu. Ils marquent les gains, l&apos;altitude, ou les températures estivales.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-950/20 dark:to-sky-950/20 border border-indigo-200 dark:border-indigo-900/60 rounded-[2rem]">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-250 text-lg flex items-center gap-2">❄️ Le Côté Négatif (Nombres &lt; 0)</h4>
            <p className="text-xs font-mono text-indigo-800 dark:text-indigo-300/85 mt-2 leading-relaxed">
              Précédés d&apos;un signe moins (-). Ils marquent les pertes, l&apos;excavation, ou les températures polaires sous le gel du Zéro.
            </p>
          </div>
        </div>
      </Section>

      {/* INTERACTIVE PEDAGOGICAL DYNAMIC AXIS GRADUATION */}
      <Section title="🛠️ Le Laboratoire : L'Axe Gradué Tactile" icon={<Thermometer className="text-blue-500" />} color="blue">
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Fais glisser le curseur pour déplacer le point sur l&apos;Axe Gradué. Observe en temps réel sa **distance absolue à zéro (mesure d&apos;énergie)** et son **point opposé** symétrique dans le miroir :
        </p>

        <div className="bg-card border border-slate-150 dark:border-slate-800 rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-indigo-100/10 mb-8">
          <div className="flex flex-col items-center">
            
            {/* Value display */}
            <div className="flex justify-around items-center w-full mb-8 font-mono text-center">
              <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border flex flex-col min-w-[120px]">
                <span className="text-[9px] uppercase font-bold text-slate-400">Position</span>
                <span className={`text-2xl font-black ${val < 0 ? 'text-indigo-600' : val > 0 ? 'text-amber-600' : 'text-slate-500'}`}>
                  {val > 0 ? `+${val}` : val}
                </span>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-150 flex flex-col min-w-[120px]">
                <span className="text-[9px] uppercase font-bold text-emerald-500">Distance à Zéro</span>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                  {distanceToZero}
                </span>
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-150 flex flex-col min-w-[120px]">
                <span className="text-[9px] uppercase font-bold text-rose-500">Nombre Opposé</span>
                <span className="text-2xl font-black text-rose-700 dark:text-rose-400">
                  {oppose > 0 ? `+${oppose}` : oppose}
                </span>
              </div>
            </div>

            {/* SVG Graduated Axis Representation */}
            <div className="w-full bg-slate-50 dark:bg-slate-900 border p-4 rounded-2xl mb-8 overflow-x-auto min-h-[140px] flex items-center justify-center">
              <svg viewBox="0 0 500 120" className="w-full max-w-lg">
                {/* Horizontal infinite axis */}
                <line x1="20" y1="60" x2="480" y2="60" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="480,55 490,60 480,65" fill="#94a3b8" />

                {/* Subsections & Numbers */}
                {Array.from({ length: 21 }, (_, i) => i - 10).map(num => {
                  const xPos = 250 + num * 22;
                  const isZero = num === 0;

                  return (
                    <g key={num}>
                      <line x1={xPos} y1={55} x2={xPos} y2={65} stroke={isZero ? '#000000' : '#cbd5e1'} strokeWidth={isZero ? 3 : 1.5} />
                      {num % 2 === 0 && (
                        <text x={xPos} y={80} textAnchor="middle" className="font-mono text-[10px] font-bold text-slate-400">{num}</text>
                      )}
                    </g>
                  );
                })}

                {/* Draw measurement arc (distance to zero) */}
                {val !== 0 && (
                  <path
                    d={`M ${250} 55 Q ${(250 + (250 + val * 22)) / 2} 20 ${250 + val * 22} 55`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Standard central Zero anchor flag */}
                <circle cx="250" cy="60" r="5" fill="#3b82f6" />
                <text x="250" y="45" textAnchor="middle" className="font-sans text-[8px] font-black text-indigo-500 uppercase tracking-widest">Axe Zéro</text>

                {/* Point representing modern absolute location */}
                <circle cx={250 + val * 22} cy="60" r="8" fill="#4f46e5" className="animate-pulse" />
                <text x={250 + val * 22} y={35} textAnchor="middle" className="font-sans text-[9px] font-extrabold text-indigo-700 bg-white px-1">Moi</text>

                {/* Point representing opposite */}
                {val !== 0 && (
                  <>
                    <circle cx={250 - val * 22} cy="60" r="6" fill="#f43f5e" opacity="0.7" />
                    <text x={250 - val * 22} y={35} textAnchor="middle" className="font-sans text-[9px] font-extrabold text-rose-500 opacity-80">Opposé</text>
                  </>
                )}
              </svg>
            </div>

            {/* Slider input Controller */}
            <div className="w-full max-w-md">
              <input
                type="range"
                min="-10"
                max="10"
                step="1"
                aria-label="Positionneur de curseur"
                value={val}
                onChange={(e) => setVal(parseInt(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-400 mt-2 px-1">
                <span>🌑 Gel arctique (-10)</span>
                <span>Zéro</span>
                <span>☀️ Four solaire (+10)</span>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* PARTIE THÉORIE ENRICHIE */}
      <Section title="🏛️ Le Codex de l&apos;Axe Relatif" icon="📖" color="slate">
        <p className="mb-6 leading-relaxed">
          Pour ordonner et comparer les nombres relatifs sans jamais te méprendre, tu as besoin de trois notions fondamentales gravées dans la roche des mathématiciens :
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">1. L&apos;Anatomie d&apos;un Nombre Relatif</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Un nombre relatif est par définition composé de **deux parties distinctes** :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 font-medium text-slate-700 dark:text-slate-300 text-sm">
              <li>Le <strong>Signe (+ ou -)</strong> : Il indique de quel côté de la barrière du Zéro le nombre se positionne.</li>
              <li>La <strong>Distance à Zéro</strong> : C&apos;est la valeur nue du nombre, dépouillée de son signe. C&apos;est un nombre positif décrivant l&apos;amplitude pure par rapport au centre.</li>
            </ul>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-xs italic">
              Exemple : Pour {"$-7$"}, le signe est Moins (–) et sa distance à zéro est exactement {"$7$"}.
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">2. L&apos;Art de Comparer les points</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Pour savoir si un nombre est plus grand que son frère de combat, on applique deux lois :
            </p>
            <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-950/60 p-5 rounded-2xl my-3">
              <ul className="space-y-3 font-semibold text-sky-950 dark:text-sky-300 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <span>👉</span> 
                  <div>
                    <strong>Loi 1 :</strong> N&apos;importe quel nombre positif est <strong>TOUJOURS</strong> strictement plus grand que n&apos;importe quel nombre négatif.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                   <span>👉</span> 
                  <div>
                    <strong>Loi 2 (La loi arctique) :</strong> Si deux nombres sont négatifs, le plus grand est celui qui est <strong>le plus proche de Zéro</strong> ! (car il fait moins froid à {"$-2^\\circ\\text{C}$"} qu&apos;à {"$-17^\\circ\\text{C}$"}).
                  </div>
                </li>
              </ul>
            </div>
            <p className="font-mono text-xs text-center text-slate-500 mt-2">
              Illustration de comparaison : {"$-100 < -1 < 0 < +5 < +12$"}
            </p>
          </div>
        </div>
      </Section>

      {/* RESOLVED EXERCISES (CHECKLIST HIGHLY DETAILED REQUIREMENTS) */}
      <Section title="✍️ Épreuves Méthodiques Résolues" icon="⚙️" color="indigo">
        <InteractiveExercise 
          title="Exercice Résolu 1 : Calculer l'intervalle thermique"
          question={<>La température en Alaska est passée de {"$-12^\\circ\\text{C}$"} le matin à {"$+3^\\circ\\text{C}$"} à midi. Quel est l&apos;écart de température total (la variation absolue) ?</>}
          steps={[
            <><strong>Étape 1 : Identifier les portions par rapport à zéro :</strong> Le thermomètre est parti d&apos;un point situé sous le zéro et est remonté jusqu&apos;à un point au-dessus de zéro. On va décomposer le trajet en passant par l&apos;axe intermédiaire neutralisé (le 0).</>,
            <><strong>Étape 2 : Compter la remontée vers zéro :</strong> Pour remonter de {"$-12^\\circ\\text{C}$"} jusqu&apos;à {"$0^\\circ\\text{C}$"}, la température doit grimper de <strong>12 degrés</strong> (sa distance à zéro vaut 12).</>,
            <><strong>Étape 3 : Compter l'élévation au-dessus de zéro :</strong> Pour s&apos;élever de {"$0^\\circ\\text{C}$"} jusqu&apos;à celle de midi {"$+3^\\circ\\text{C}$"}, la valeur grimpe encore de <strong>3 degrés</strong>.</>,
            <><strong>Étape 4 : Sommer l'écart total :</strong> Nous additionnons ces deux trajets d&apos;amplitude : <br />{"$\\text{Écart} = 12 + 3 = 15^\\circ\\text{C}$"}.<br />Le thermomètre a grimpé d&apos;exactement <strong>15 degrés</strong> au total !</>
          ]}
        />

        <InteractiveExercise 
          title="Exercice Résolu 2 : Chasseur de trésor et altitude sous-marine"
          question={<>Un drone sous-marin de recherche sonde le fond marin à une altitude de {"$-250\\text{ m}$"}. Un satellite vole pile au-dessus de lui à une altitude de {"$+350\\text{ m}$"}. Calcule la distance de communication directe séparant les deux émetteurs.</>}
          steps={[
            <><strong>Étape 1 : Visualiser l'axe gradué vertical :</strong> Le niveau moyen de la mer correspond à la position de référence (la hauteur 0).</>,
            <><strong>Étape 2 : Définir les distances absolues :</strong> Le drone est localisé à une distance de <code>250 mètres</code> sous la mer. Le satellite est positionné à <code>350 mètres</code> au-dessus de la mer.</>,
            <><strong>Étape 3 : Calculer la distance de bout en bout :</strong> Comme ils sont positionnés de part et d&apos;autre de la frontière nautique (Zéro), on somme leurs distances à zéro : <br />{"$\\text{Distance} = 250\\text{ m} + 350\\text{ m} = 600\\text{ m}$"}.<br />Les deux émetteurs sont séparés d&apos;exactement <strong>600 mètres</strong> de câble optique direct.</>
          ]}
        />
      </Section>

      {/* FLASHCARDS REMINDER SECTION */}
      <Section title="🧠 Flashcards de secours" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quel est l&apos;opposé de l&apos;opposé du nombre relatif <code>-42</code> ?</>}
            back={<>C&apos;est <strong>-42</strong> ! L&apos;opposé de -42 est +42. Et l&apos;opposé de +42 redonne le point de départ -42 (double symétrie miroir du zéro).</>}
          />
          <Flashcard 
            front={<>Pourquoi a-t-on la relation mathématique <code>-15 &lt; -2</code> alors que 15 est plus grand que 2 ?</>}
            back={<>Parce que sur l&apos;axe gradué négatif, <strong>-2</strong> est situé beaucoup plus proche de la source Zéro que -15. En température, il fait moins froid à -2 qu&apos;à -15 !</>}
          />
        </div>
      </Section>

      {/* TEXT HOLES FOR TEXT EVALUATION */}
      <Section title="🕹️ Défi des Décideurs" icon="🕹️" color="emerald">
        <p className="mb-4">Analyse l&apos;exercice d&apos;évaluation ci-dessous et complète les choix :</p>
        <FillInTheBlanks 
          id="rel-eval"
          content={[
            "Mickaël effectue un saut d'évaluation. Il démarre à une altitude de +15 mètres sur son tremplin. Il plonge dans l'eau claire et s'enfonce à -4 mètres de profondeur. L'altitude du plongeur à la fin est caractérisée par le signe ",
            { options: ["Positif (+)", "Négatif (-)"], correctAnswer: 1 },
            ". La distance entre le tremplin et le fond de son plongeon s'exprime par la somme des distances de Zéro : (15 + 4) qui vaut ",
            { options: ["11 mètres", "19 mètres", "23 mètres"], correctAnswer: 1 },
            ", tandis que l'opposé exact de l'altitude maximale s'écrit ",
            { options: ["-15", "+15", "-4"], correctAnswer: 0 },
            " !"
          ]}
        />
      </Section>

      {/* FAQ SECTION: MANDATORY AT LEAST 3 DETAILED ANSWERS */}
      <Section title="❓ Questions Fréquentes (FAQ)" icon="🙋" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Le signe (+) est-il obligatoire pour noter un nombre relatif positif ?",
              answer: "Absolument pas ! Précéder un nombre positif de son signe [+] est facultatif. Écrire [+5] ou simplement [5] est rigoureusement identique. Par contre, le signe moins [-] pour les nombres négatifs est STRICTEMENT OBLIGATOIRE, sinon vous trahiriez la famille du dessous du zéro !"
            },
            {
              question: "La distance à zéro peut-elle être un nombre négatif dans des calculs ?",
              answer: "Jamais ! Une distance représente une grandeur physique mesurable brute (comme les centimètres sur ta règle). Elle ne peut jamais être sous-zéro ni négative. C'est pour cela que la distance à zéro de [-9] est strictement [+9] (ou 9)."
            },
            {
              question: "Comment compare-t-on instantanément un nombre négatif décimal à un autre plus grand ?",
              answer: "Tu dessines mentalement un thermomètre ou un ascenseur. Le nombre le plus élevé (le plus haut sur le mur ou le plus proche du soleil) est toujours le plus grand. Par exemple, [-2,5] est au-dessus de [-5,8], donc -2,5 est plus grand que -5,8."
            }
          ]}
        />
      </Section>

      {/* QUIZ (MANDATORY AT LEAST 3 DETAILED MATCHES) */}
      <Section title="🏆 Combat de Qualification" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel nombre représente l'opposé parfait du nombre -5,5 ?",
              options: [
                "-5,5 (Qui ne bouge pas)",
                "+5,5 (Qui repasse du côté lumineux)",
                "0"
              ],
              correctAnswer: 1,
              explanation: "Exact ! L'opposé d'un terme change strictement son badge de signe. Donc l'opposé de -5,5 est +5,5 (ou 5,5)."
            },
            {
              question: "Quelle est la distance à zéro absolue du nombre -99,9 ?",
              options: [
                "-99,9",
                "+99,9",
                "0"
              ],
              correctAnswer: 1,
              explanation: "Bravo ! La distance à zéro supprime le signe moins pour ne stocker que la force pure de distance : 99,9."
            },
            {
              question: "Laquelle de ces affirmations de comparaison de nombres est vraie ?",
              options: [
                "-12 > -5 (Car 12 est supérieur à 5)",
                "-12 < -15 (Car -12 est placé au-dessus)",
                "-12 > -15 (Car -12 est plus proche de zéro)"
              ],
              correctAnswer: 2,
              explanation: "Impressionnant ! -12 étant situé plus haut / plus proche de 0 sur un thermomètre que -15, on dit bien que -12 est supérieur à -15 : la détresse du froid est moindre !"
            }
          ]}
        />

        <InteractiveChecklist 
          items={[
            "Je maîtrise l'usage historique du signe moins (-) pour représenter les valeurs négatives.",
            "Je sais repérer et comparer sans faille des nombres relatifs sur un axe gradué.",
            "Je sais extraire la distance à zéro (amplitude positive) d'une coordonnée.",
            "Je sais cibler l'opposé exact de n'importe quel nombre relatif par symétrie."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+40 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_5eme_02_Nombres_Relatifs;
