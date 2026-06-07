import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Thermometer, CreditCard, Crosshair, ArrowRightLeft, Activity, Plus, Minus, MoveRight } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_4eme_06_Nombres_Relatifs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  // Axis Interactive States
  const [valA, setValA] = useState<number>(-3);
  const [valB, setValB] = useState<number>(2);
  const [operator, setOperator] = useState<'+' | '-' | 'x' | '/'>('+');

  const computeResult = (): number => {
    switch (operator) {
      case '+': return valA + valB;
      case '-': return valA - valB;
      case 'x': return valA * valB;
      case '/': return valB !== 0 ? valA / valB : 0;
      default: return 0;
    }
  };

  const getAxisX = (val: number): number => {
    // Range maps from -10 (x=30) to +10 (x=370)
    const clamped = Math.min(10, Math.max(-10, val));
    return 200 + clamped * 17;
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-06"
        title="Nombres Relatifs et Opérations"
        subtitle="Dettes ou Bénéfices ? Maîtriser le chaud et le froid !"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["Somme et Différence (5ème)"]}
        objectives={[
          "Mémoriser la fameuse 'Règle des Signes' sans hésiter.",
          "Comprendre pourquoi un Moins et un Moins donnent un Plus en Multiplication.",
          "Enchaîner de longues séries d'additions/soustractions (La Banque).",
          "Détruire les calculs combinant les quatre opérations (PEMDAS)."
        ]}
      />

      <Section title="🌟 Introduction : Le Zéro n'est plus le mur" icon="🧱" color="slate">
        <p>
          Au primaire, le Zéro était un mur infranchissable. On ne pouvait tout simplement pas calculer {"$3 - 5$"}. Au collège, tu découvres que derrière le mur se cache le grand désert des températures polaires, le royaume du découvert bancaire, de l'envers du miroir.
        </p>
        <p className="mt-4">
          Dans ce cours, les additions et soustractions de relatifs vont rencontrer leurs cousines mortelles : la Multiplication et la Division des entités négatives. C'est l'un des chapitres où les erreurs d'inattention coûtent le plus cher au Brevet. Développons tes armures thermiques de ninja !
        </p>
      </Section>

      {/* SCHEMA INTERACTIF & APLI ENRICHIE */}
      <Section title="🎮 Simulateur Interactif : La Frise de l'Envers" icon="⚖️" color="indigo">
        <p className="mb-6 text-muted-text">
          Sélectionne deux nombres de départ {"$A$"} et {"$B$"} et choisis une opération cardinale. Vois leur position sautillante et le rayon laser s'afficher sur l'axe numérique allant de {"$-10$"} à {"$+10$"}.
        </p>

        <div className="bg-card dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-indigo-100/50 dark:shadow-none shadow-xl">
          {/* Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border">
            {/* Number A */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Valeur de A</span>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="-5" 
                  max="5" 
                  value={valA}
                  onChange={e => setValA(parseInt(e.target.value))}
                  className="w-24 accent-indigo-600"
                />
                <span className="font-mono text-lg font-black text-indigo-600">{valA > 0 ? `+${valA}` : valA}</span>
              </div>
            </div>

            {/* Operator selector */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Opérateur</span>
              <div className="flex gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
                {(['+', '-', 'x', '/'] as const).map(op => (
                  <button
                    key={op}
                    onClick={() => setOperator(op)}
                    className={`w-9 h-9 rounded-lg font-mono text-sm font-bold flex items-center justify-center transition-all ${operator === op ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                  >
                    {op === 'x' ? '×' : op === '/' ? '÷' : op}
                  </button>
                ))}
              </div>
            </div>

            {/* Number B */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Valeur de B</span>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="-5" 
                  max="5" 
                  value={valB}
                  onChange={e => setValB(parseInt(e.target.value))}
                  className="w-24 accent-indigo-600"
                />
                <span className="font-mono text-lg font-black text-indigo-600">{valB > 0 ? `+${valB}` : valB}</span>
              </div>
            </div>
          </div>

          {/* SVG Axis Visualization */}
          <div className="flex flex-col items-center py-4 bg-white dark:bg-slate-950 rounded-2xl border p-2 overflow-x-auto">
            <svg width="400" height="90" className="overflow-visible select-none">
              {/* Central axis line */}
              <line x1="15" y1="50" x2="385" y2="50" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
              {/* Ticks from -10 to 10 */}
              {Array.from({ length: 21 }).map((_, i) => {
                const tickVal = i - 10;
                const x = getAxisX(tickVal);
                const isMajor = tickVal % 5 === 0;
                return (
                  <g key={i}>
                    <line x1={x} y1={50 - (isMajor ? 8 : 4)} x2={x} y2={50 + (isMajor ? 8 : 4)} stroke="#64748b" strokeWidth={isMajor ? 2 : 1} />
                    {isMajor && (
                      <text x={x} y="75" textAnchor="middle" fontSize="10" className="font-mono font-bold fill-slate-500">
                        {tickVal === 0 ? '0' : tickVal > 0 ? `+${tickVal}` : tickVal}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Start Node (A) */}
              <circle cx={getAxisX(valA)} cy="50" r="6" fill="#4f46e5" />
              <text x={getAxisX(valA)} y="33" textAnchor="middle" fontSize="11" className="font-mono font-bold fill-indigo-600">A</text>

              {/* Vector line to result */}
              <path
                d={`M ${getAxisX(valA)} 50 Q ${(getAxisX(valA) + getAxisX(computeResult())) / 2} 25 ${getAxisX(computeResult())} 50`}
                fill="none"
                stroke="#ec4899"
                strokeWidth="2.5"
                strokeDasharray={operator === 'x' || operator === '/' ? "2 2" : "0"}
                className="animate-pulse"
              />

              {/* End Node (Result) */}
              <polygon points={`${getAxisX(computeResult())-4},50 ${getAxisX(computeResult())+4},50 ${getAxisX(computeResult())},42`} fill="#db2777" />
              <circle cx={getAxisX(computeResult())} cy="50" r="4.5" fill="#db2777" />
              <text x={getAxisX(computeResult())} y="18" textAnchor="middle" fontSize="11" className="font-mono font-black fill-pink-600">Résultat</text>
            </svg>

            {/* Arithmetic display box */}
            <div className="mt-4 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 rounded-xl text-center w-full max-w-sm font-mono text-lg font-bold text-slate-800 dark:text-slate-100">
              <span>({valA}) {operator === 'x' ? '×' : operator === '/' ? '÷' : operator} ({valB}) = </span>
              <span className="text-pink-600 text-xl font-black">{computeResult() % 1 !== 0 ? computeResult().toFixed(2) : computeResult()}</span>
            </div>
          </div>
        </div>

        {/* Le saviez-vous ? InfoBlock */}
        <div className="mt-6">
          <InfoBlock title="Le saviez-vous ? La naissance des nombres négatifs" type="funfact">
            Les premiers à avoir utilisé de vrais nombres négatifs de façon systématique sont les **mathématiciens chinois** durant l'Antiquité (vers le IIème siècle avant J-C). Ils utilisaient des bâtonnets rouges pour représenter les gains (bénéfices) et des bâtonnets noirs pour représenter les pertes (les dettes). C'était l'ancêtre du système bancaire moderne !
          </InfoBlock>
        </div>
      </Section>

      <Section title="1. La Règle d'Or de L'Épée et du Bouclier (Multiplication/Division)" icon="⚔️" color="rose">
        <p className="mb-4 font-normal text-slate-700 dark:text-slate-300">Contrairement à l'addition simple où l'on garde un sens de montant bancaire, la Multiplication et la Division de nombres relatifs possèdent des lois hermétiques rigides : la règle des signes.</p>
        
        <div className="bg-rose-50/50 dark:bg-slate-900 duration-300 p-6 rounded-[2rem] border border-rose-100 dark:border-rose-950 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-card dark:bg-slate-950 p-4 rounded-xl shadow-sm text-center border">
            <h3 className="font-bold text-rose-900 dark:text-rose-300 mb-2">Les AMIS (Signes Identiques)</h3>
            <p className="text-xs text-slate-400 mb-4">La multiplication de deux signes semblables produit TOUJOURS un résultat positif.</p>
            <div className="font-mono text-lg font-bold border-l-4 border-emerald-500 pl-4 py-2 inline-block text-left">
              (+) <MathComponent math={"\\times"} /> (+) = <span className="text-emerald-500 font-extrabold">(+)</span><br/>
              (-) <MathComponent math={"\\times"} /> (-) = <span className="text-emerald-500 font-extrabold">(+)</span>
            </div>
          </div>
          
          <div className="bg-card dark:bg-slate-950 p-4 rounded-xl shadow-sm text-center border">
            <h3 className="font-bold text-rose-900 dark:text-rose-300 mb-2">Les ENNEMIS (Signes Différents)</h3>
            <p className="text-xs text-slate-400 mb-4">La multiplication de deux signes opposés produit TOUJOURS un résultat négatif.</p>
            <div className="font-mono text-lg font-bold border-l-4 border-rose-500 pl-4 py-2 inline-block text-left">
              (+) <MathComponent math={"\\times"} /> (-) = <span className="text-rose-500 font-extrabold">(-)</span><br/>
              (-) <MathComponent math={"\\times"} /> (+) = <span className="text-rose-500 font-extrabold">(-)</span>
            </div>
          </div>
        </div>

        <TipBanner title="Le théorème identique des Divisions" type="success">
          La division étant le reflet strict de la multiplication, elle obéit **exactement à la même loi des signes** ! <br/>
          <span className="font-mono font-bold"><><MathComponent math={"(-15) \\div (-3) = \\mathbf{+5}"} /></> (Moins et Moins : Plus !)</span>
        </TipBanner>
      </Section>

      <Section title="2. Les chaînes de facteurs (Produits multiples)" icon="⛓️" color="blue">
        <p className="mb-4">Si l'on te confie un long calcul de multiplication du genre : <><MathComponent math={"(-2) \\times 3 \\times (-1) \\times (-5) \\times 2"} /></>, ne commence surtout pas à multiplier de gauche à droite au hasard ! Utilise l'arme absolue de l'Assassinat de Signe.</p>

        <InteractiveExercise 
          title="L'Assassinat du Signe Global"
          question={<>Trouve la valeur et le signe final de l'opération combinée suivante : <><MathComponent math={"(-2) \\times (-3) \\times (-4) \\times 5 \\times (-1)"} /></></>}
          steps={[
            <><strong>Étape 1 : Ignorer les valeurs numériques et compter les signes MOINS (-) uniquement</strong><br/>
            On ignore les nombres et les '+'. On ne compte QUE le nombre de signes négatifs (-) présents dans l'expression.</>,
            <>Je dénombre : un moins devant le 2, un devant le 3, un devant le 4, et un devant le 1. <br/>
            <strong>Nous avons un total de 4 signes négatifs.</strong></>,
            <><strong>Étape 2 : Loi des fractions paires</strong><br/>
            - Si le total des signes moins est <strong>Pair</strong> (2, 4, 6, 8...) &rarr; Le résultat final de l'expression est **POSITIF (+)**.<br/>
            - Si le total des signes moins est <strong>Impair</strong> (1, 3, 5, 7...) &rarr; Le résultat final est **NÉGATIF (-)**.</>,
            <>4 étant évidemment un chiffre pair, tous les signes se neutralisent par binômes (Moins x Moins = Plus). <br/>
            Le signe du résultat final est donc <strong>POSITIF (+)</strong> !</>,
            <><strong>Étape 3 : Effectuer le calcul classique sans se soucier du reste</strong><br/>
            Il ne nous reste plus qu'à multiplier les valeurs brutes :<br/>
            {"$2 \\times 3 \\times 4 \\times 5 \\times 1 = 120$"}. <br/>
            Résultat final de l'Assassinat : <strong>+120</strong> (ou 120 de façon sobre !) !</>
          ]}
        />
      </Section>

      <Section title="3. La terrible confusion (Addition vs Multiplication)" icon="🚨" color="amber">
        <p className="mb-4">Voici la faille qui décime la moitié des copies d'élèves au Brevet des Collèges : l'incapacité à délimiter les règles.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-card dark:bg-slate-900 border-t-4 border-rose-500 p-5 rounded-2xl shadow-sm">
            <span className="text-rose-500 font-bold font-mono text-sm block mb-1">Addition (Le concept de la Banque)</span>
            <span className="text-2xl font-mono text-slate-800 dark:text-slate-100 font-extrabold">{"$-5 - 8 = \\mathbf{-13}$"}</span>
            <p className="text-xs font-sans text-slate-500 mt-2 leading-relaxed">
              Dette de 5€ combinée à une nouvelle dette de 8€. J'ai une dette globale s'élevant à 13€. Ne dis surtout pas <em>« Moins par Moins donne Plus »</em> ici ! Il n'y a aucun symbole de MULTIPLICATION dans cette phrase !
            </p>
          </div>
          
          <div className="bg-card dark:bg-slate-900 border-t-4 border-emerald-500 p-5 rounded-2xl shadow-sm">
            <span className="text-emerald-500 font-bold font-mono text-sm block mb-1">Multiplication (L'effet des Signes)</span>
            <span className="text-2xl font-mono text-slate-800 dark:text-slate-100 font-extrabold">{"$-5 \\times (-8) = \\mathbf{+40}$"}</span>
            <p className="text-xs font-sans text-slate-500 mt-2 leading-relaxed">
              Ici, c'est l'affrontement armé de la règle d'or ! Deux signes identiques (Moins) s'accouplent pour fusionner en un signal positif flamboyant.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <InfoBlock title="Règles d'or de priorité (PEMDAS)" type="reminder">
            Rappelle-toi que les multiplications et les divisions ont toujours préséance et écrasent de plein fouet les additions et les soustractions ordinaires ! Ne calcule jamais de gauche à droite s'il y a un symbole de calcul prioritaire.
          </InfoBlock>
        </div>
      </Section>

      {/* RESOLVED EXERCISES (EXERCICES RESOLUS) - OBLIGATOIRE */}
      <Section title="📝 Exercices Résolus d'Infiltration" icon="✍️" color="purple">
        <div className="space-y-6">
          <InteractiveExercise 
            title="Exercice Résolu 1 : Le Double Négatif centrale"
            question={<p>Désamorce la formule suivante en retirant les parenthèses de collision : {"$C = -15 - (-8) + 4 - (+6)$"}</p>}
            steps={[
              <><strong>Étape 1 : Analyser les duos de collision</strong><br/>
              Le coeur de l'erreur réside dans le choc des signes collés. Analysons :<br/>
              - {"$- (-8)$"} : Deux moins consécutifs fusionnent en un **PLUS** : {"$+8$"}.<br/>
              - {"$- (+6)$"} : Un choc entre un moins et un plus crée un **MOINS** : {"$-6$"}.</>,
              <><strong>Étape 2 : Réécrire proprement l'expression</strong><br/>
              L'équation épurée de ses parenthèses est désormais :<br/>
              {"$C = -15 + 8 + 4 - 6$"}.</>,
              <><strong>Étape 3 : Effectuer l'addition de mon solde</strong><br/>
              Séparons les positifs et les négatifs :<br/>
              - Solde positif : {"$8 + 4 = 12$"}<br/>
              - Dettes cumulées : {"$-15 - 6 = -21$"}.<br/>
              Calcul combiné : {"$12 - 21 = \\mathbf{-9}$"}. Délicieux !</>
            ]}
          />

          <InteractiveExercise 
            title="Exercice Résolu 2 : Le Combat de la Banquise (Priorités)"
            question={<p>Détermine le résultat rigoureux de cet enchaînement prioritaire : {"$D = -7 + (-4) \\times (-3) - 24 \\div (-6)$"}</p>}
            steps={[
              <><strong>Étape 1 : Isoler les duels prioritaires</strong><br/>
              La multiplication et la division doivent s'opérer en premier ! Séparons les blocs prioritaires :<br/>
              - Bloc A : {"$(-4) \\times (-3)$"}<br/>
              - Bloc B : {"$- 24 \\div (-6)$"}</>,
              <><strong>Étape 2 : Calculer chaque bloc en appliquant la loi des signes</strong><br/>
              - Bloc A : deux signes moins donnent un plus &rarr; {"$(-4) \\times (-3) = +12$"}.<br/>
              - Bloc B : divisons en conservant le signe de soustraction ou gérons globalement. Calculons {"$-24 \\div (-6)$"}. Deux moins divisés donnent un plus &rarr; {"$-24 \\div (-6) = +4$"}.</>,
              <><strong>Étape 3 : Recomposer pour le bilan de l'addition finale</strong><br/>
              L'expression devient alors :<br/>
              {"$D = -7 + 12 + 4$"}.<br/>
              Accumulons : {"$-7 + 16 = \\mathbf{+9}$"}. Victoire parfaite !</>
            ]}
          />
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Calcule le piège de la pieuvre : <><MathComponent math={"-10 - (-5)"} /></></>}
            back={<><strong>-5 !</strong><br/>Les deux signes enlacés '--' au centre se transforment en un '+'. <br/>L'équation devient : <><MathComponent math={"-10 + 5"} /></>. J'ai une dette de 10, je rembourse 5. Il reste 5 de dette (-5).</>}
          />
          <Flashcard 
            front={<>On divise 0 par -8. <><MathComponent math={"0 \\div -8"} /></>. Est-ce une erreur mathématique ou un résultat nul ?</>}
            back={<><strong>C'est égal à Zéro (0).</strong><br/>Tu as zéro bonbon que tu divises entre 8 ennemis. Ils auront chacun 0 bonbon. C'est diviser PAR zéro qui est interdit, mais diviser zéro par un autre nombre est parfaitement légal !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'écris $-4 \\times -2$ sans parenthèses, le professeur va-t-il me pénaliser ?",
              answer: "Oui ! C'est une faute de grammaire mathématique universelle. Deux signes opératoires (× et -) ne doivent JAMAIS se chevaucher sans un garde-fou. Tu dois obligatoirement écrire l'expression entre parenthèses : $-4 \\times (-2)$."
            },
            {
              question: "Quelle est la définition scientifique de la 'valeur absolue' d'un relatif ?",
              answer: "C'est sa distance brute par rapport à zéro, dénudée de tout signe ! Par exemple, la valeur absolue de -8 est simplement 8. Elle représente une taille ou une longueur physique."
            },
            {
              question: "Comment ne pas s'embrouiller avec les priorités PEMDAS et les signes moins ?",
              answer: "La clé est d'encadrer virtuellement ou au surligneur tes blocs prioritaires (les divisions et multiplications) et de résoudre d'abord le signe de chaque bloc. Le reste découlera d'une simple addition de relatifs."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quel est le résultat exact et vérifié de la multiplication : (-6) × (-3) ?",
              options: [
                "-18",
                "+18",
                "-9"
              ],
              correctAnswer: 1,
              explanation: "Bravo ! Règle des signes en multiplication directe : Moins multiplié par Moins = PLUS ! Et 6 × 3 = 18."
            },
            {
              question: "Désamorce cette bombe prioritaire : -5 - 2 × (-3)",
              options: [
                "21 (Car -5 - 2 = -7, puis -7 × -3 = 21)",
                "-1",
                "+1"
              ],
              correctAnswer: 2,
              explanation: "Sublime ! La multiplication s'effectue en premier ! Le bloc -2 × (-3) donne +6. Et -5 + 6 = +1 (ou 1)."
            },
            {
              question: "Qu'obtient-on si l'on divise un nombre négatif par un nombre positif ?",
              options: [
                "Un nombre positif de fait",
                "Un nombre négatif (choc de signes opposés)",
                "impossible d'y répondre"
              ],
              correctAnswer: 1,
              explanation: "Excellent ! Signes différents (Moins et Plus) donnent toujours un résultat négatif en multiplication comme en division."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je séparerai distinctement dans mon esprit le Mode Banque (Addition/Soustraction) et le Mode Chaos (Loi des signes en multiplication).",
            "Je compterai les signes négatifs d'un seul coup d'œil lors d'un produit multi-facteurs.",
            "Je délimiterai mes blocs opératoires en respectant scrupuleusement la priorité PEMDAS."
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

export default Course_College_4eme_06_Nombres_Relatifs;
