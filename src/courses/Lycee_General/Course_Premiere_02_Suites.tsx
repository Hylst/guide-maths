import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise, AccordionFAQ
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Premiere_02_Suites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [suiteType, setSuiteType] = useState<'arithmetic' | 'geometric'>('arithmetic');
  const [nValue, setNValue] = useState<number>(5);

  const getSuiteTerms = (n: number) => {
    const terms = [];
    if (suiteType === 'arithmetic') {
      // U0 = 2, r = 3 (Arithmétique)
      for (let i = 0; i <= n; i++) {
        terms.push({ idx: i, val: 2 + i * 3 });
      }
    } else {
      // U0 = 2, q = 2 (Géométrique)
      for (let i = 0; i <= n; i++) {
        terms.push({ idx: i, val: 2 * Math.pow(2, i) });
      }
    }
    return terms;
  };

  const terms = getSuiteTerms(nValue);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-1-SUI"
        title="Suites Numériques"
        subtitle="L'art de sauter de pierre en pierre au lieu d'avancer en continu."
        duration="50 min"
      />

      <Section title="⚠️ Introduction : Fonctions vs Suites" icon="🐸" color="emerald">
        <p>
          Jusqu'à présent, tu as surtout travaillé avec des <strong>fonctions</strong> f(x), où x est un nombre <em>réel</em> continu. La courbe d'une fonction, c'est comme une ligne ininterrompue que tu peux tracer sans lever le stylo.
        </p>
        <p className="mt-2">
          Une <strong>Suite</strong> (notée <span className="font-mono bg-slate-100 px-1 rounded">U_n</span>), c'est l'inverse. L'indice <span className="font-mono">n</span> ne peut être qu'un nombre entier positif (0, 1, 2, 3...). Graphiquement, ce n'est pas une ligne, ce sont des <strong>points séparés</strong>. C'est le monde du <em>discret</em> (rang 0, rang 1, rang 2...).
        </p>
        
        <InfoBlock type="definition" title="Le Vocabulaire Sacré">
          - <strong>n</strong> : L'indice ou le "rang" (la position dans la file d'attente). <br/>
          - <strong>U_n</strong> : Le terme de rang n (la valeur à cette position). <br/>
          - <strong>U_0</strong> : Le terme initial (le commencement).
        </InfoBlock>
      </Section>

      <Section title="🔬 Le Simulateur de Suites" icon="⚙️" color="indigo">
        <p className="mb-4">Il existe deux grandes familles de suites remarquables : les Arithmétiques (on additionne) et les Géométriques (on multiplie).</p>
        
        <div className="bg-muted border-2 border-border p-6 rounded-2xl shadow-sm">
          <div className="flex justify-center gap-4 mb-6">
            <button 
              onClick={() => setSuiteType('arithmetic')}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${suiteType === 'arithmetic' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600 dark:text-slate-400 hover:bg-slate-300'}`}
            >
              U_n Arithmétique (+3)
            </button>
            <button 
              onClick={() => setSuiteType('geometric')}
              className={`px-4 py-2 rounded-lg font-bold transition-colors ${suiteType === 'geometric' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600 dark:text-slate-400 hover:bg-slate-300'}`}
            >
              V_n Géométrique (×2)
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="font-bold text-slate-700 dark:text-slate-300">Calculer jusqu'au rang :</span>
            <input 
              type="range" 
              min="1" max="10" step="1"
              value={nValue} 
              onChange={(e) => setNValue(parseInt(e.target.value))}
              className="accent-indigo-500 cursor-pointer w-48"
            />
            <span className="font-mono bg-card border border-slate-300 px-2 py-1 rounded">n = {nValue}</span>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-2 min-w-max">
              {terms.map((t, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-16 h-16 flex items-center justify-center text-xl font-bold font-mono rounded-xl text-white shadow-sm transition-all duration-300 ${suiteType === 'arithmetic' ? 'bg-indigo-500' : 'bg-rose-500'}`}>
                    {t.val}
                  </div>
                  <span className="text-xs text-slate-500 font-mono mt-2">U_{t.idx}</span>
                  {index < terms.length - 1 && (
                    <div className="text-xs font-bold mt-1 text-slate-400">
                      {suiteType === 'arithmetic' ? '+3' : '×2'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Remarque comme la suite géométrique (×2) explose et devient immense très vite, comparée à la suite arithmétique (+3) qui avance pas à pas.
          </p>
        </div>
      </Section>

      <Section title="📜 Les Formules de Survie" icon="⚡" color="amber">
        <p className="mb-4">On peut définir une suite de 2 manières : <br/>
        1) <strong>Par récurrence</strong> (on décrit comment passer d'un terme au suivant).<br/>
        2) <strong>Explicitement</strong> (une formule directe avec <span className="font-mono">n</span> pour calculer n'importe quel rang instantanément sans calculer les précédents).</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Arithmétique (Raison r)" 
            formula={<>U_n₊₁ = U_n + r <br/><span className="text-sm opacity-80 mt-2 block border-t border-indigo-400 pt-2">U_n = U_0 + n.r</span></>} 
          />
          <FormulaBox 
            title="Géométrique (Raison q)" 
            formula={<>V_n₊₁ = q × V_n <br/><span className="text-sm opacity-80 mt-2 block border-t border-amber-400 pt-2">V_n = V_0 × qⁿ</span></>} 
          />
        </div>

        <div className="space-y-4 mt-6">
          <InfoBlock type="reminder" title="Rappel de cours : Étudier la monotonie d'une suite">
            Pour déterminer si une suite {"$(u_n)$"} est croissante ou décroissante, on étudie le <strong>signe de la différence {"$u_{n+1} - u_n$"}$</strong> pour tout entier naturel {"$n$"} :
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm bg-slate-50 dark:bg-slate-900/40 p-2 rounded-xl border border-border">
              <li>Si {"$u_{n+1} - u_n \ge 0$"}, alors la suite est <strong>croissante</strong>.</li>
              <li>Si {"$u_{n+1} - u_n \le 0$"}, alors la suite est <strong>décroissante</strong>.</li>
            </ul>
          </InfoBlock>

          <InfoBlock type="funfact" title="Le saviez-vous ? Fibonacci, ses lapins et le nombre d'or">
            La très célèbre suite de Fibonacci {"$(0, 1, 1, 2, 3, 5, 8, 13, 21, ...)$"} modélise à l'origine la reproduction théorique d'un couple de lapins ! Dans cette suite, chaque terme est la somme des deux précédents. Plus étonnant encore : le rapport de deux termes successifs {"$F_{n+1} / F_n$"} se rapproche de plus en plus du <strong>Nombre d'Or {"$\\varphi \\approx 1,618$"}$</strong>, une proportion que l'on observe partout dans le vivant (les spirales de tournesols, les coquilles de mollusques, etc.).
          </InfoBlock>

          <InfoBlock type="info" title="Zoom sur : L'explosion géométrique et le monde réel">
            Une suite géométrique de raison {"$q > 1$"} croît à une vitesse vertigineuse. On appelle cela la <strong>croissance exponentielle</strong>. On la retrouve partout :
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Dans la <strong>propagation d'un virus</strong> (si un malade contamine 2 personnes, on a une croissance de raison q = 2).</li>
              <li>Dans la <strong>finance / les intérêts composés</strong> (un livret à 3% d'intérêts par an est modélisé par une suite géométrique de raison q = 1,03).</li>
            </ul>
          </InfoBlock>
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Trouver la raison"
          question={<p>On considère une suite arithmétique <><MathComponent math={"(u_n)"} /></> telle que <><MathComponent math={"u_2 = 10"} /></> et <><MathComponent math={"u_5 = 25"} /></>. Quelle est la raison <><MathComponent math={"r"} /></> de cette suite ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Formule du terme général</p>
              <p>On sait que pour aller de <><MathComponent math={"u_2"} /></> à <><MathComponent math={"u_5"} /></>, on a ajouté <><MathComponent math={"3"} /></> fois la raison <><MathComponent math={"r"} /></>. Autrement dit, <><MathComponent math={"u_5 = u_2 + 3r"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Équation</p>
              <p><><MathComponent math={"25 = 10 + 3r"} /></> donc <><MathComponent math={"15 = 3r"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : La raison <><MathComponent math={"r"} /></> vaut donc <><MathComponent math={"5"} /></> ! (=<><MathComponent math={"15 / 3"} /></>).</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Somme géométrique"
          question={<p>Calculer la somme des puissances de 2 : <><MathComponent math={"S = 1 + 2 + 4 + 8 + ... + 1024"} /></> sachant que <><MathComponent math={"1024 = 2^{10}"} /></>.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Identifier la suite</p>
              <p>C'est la somme des termes d'une suite géométrique de premier terme <><MathComponent math={"u_0 = 1"} /></> et de raison <><MathComponent math={"q = 2"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Compter les termes</p>
              <p>La somme va de <><MathComponent math={"2^0"} /></> à <><MathComponent math={"2^{10}"} /></>, il y a donc <><MathComponent math={"11"} /></> termes au total.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 3 : Appliquer la formule</p>
              <p>La formule pour <><MathComponent math={"q > 1"} /></> est <><MathComponent math={"S = \\text{Premier} \\times \\frac{q^{\\text{nombredetermes}} - 1}{q - 1}"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : <><MathComponent math={"S = 1 \\times \\frac{2^{11} - 1}{2 - 1} = 2048 - 1 = 2047"} /></>.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Cartes Mentales" icon="💡" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Pour prouver qu'une suite U_n est <strong>arithmétique</strong>, que dois-tu calculer ?</>}
            back={<>Il faut calculer <strong>U_n₊₁ - U_n</strong>. <br/>Si le résultat est un nombre constant (indépendant de n), c'est la raison r !</>}
          />
          <Flashcard 
            front={<>La formule <strong>S = (n+1) × (U_0 + U_n) / 2</strong>, à quoi fichtre sert-elle ?</>}
            back={<>C'est la formule pour calculer la <strong>somme des termes</strong> d'une suite Arithmétique. <br/><span className="text-sm">(Nombre de termes × (Premier + Dernier) / 2)</span></>}
          />
        </div>
      </Section>

      <Section title="🎮 Simulateur de Termes" icon="🕹️" color="slate">
        <p className="mb-4">Il est temps de dériver... pardon, d'évaluer tes compétences en suites :</p>
        <FillInTheBlanks 
          id="suite1-eval"
          content={[
            "On me donne la suite définie par U₀ = 5 et U_n₊₁ = U_n + 4. Il s'agit d'une suite ",
            { options: ["géométrique", "arithmétique", "constante"], correctAnswer: 1 },
            " de premier terme 5 et de ",
            { options: ["différence", "raison", "pente"], correctAnswer: 1 },
            " r = 4. Je peux donc écrire sa formule explicite directe : U_n = ",
            { options: ["5 × 4^n", "4 + 5n", "5 + 4n"], correctAnswer: 2 },
            ". Si je veux calculer le 10ème terme, U₁₀, je remplace n par 10 dans la formule explicite et je trouve : 5 + 4×10, ce qui donne ",
            { options: ["45", "90", "5000"], correctAnswer: 0 },
            " !"
          ]}
        />
      </Section>

      <Section title="❓ FAQ (Questions Fréquentes)" icon="HelpCircle" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale entre U(n) et u_n ?",
              answer: "Aucune ! C'est uniquement une affaire de notation. On écrit généralement u_n (avec l'indice n en bas) pour désigner un terme d'une suite, mais certains logiciels ou calculatrices écrivent u(n) comme s'il s'agissait d'une fonction."
            },
            {
              question: "Qu'est-ce qu'une suite 'récurrente' par rapport à une suite 'explicative' ?",
              answer: "Une formule par récurrence est comme un escalier : pour connaître la marche suivante, tu as besoin de la marche actuelle (u_n+1 = u_n + r). Une formule explicite est comme un ascenseur : tu lui donnes directement l'étage 'n' et elle t'y amène instantanément sans passer par les étages intermédiaires (u_n = u_0 + n.r)."
            },
            {
              question: "Une suite géométrique peut-elle avoir une raison négative ?",
              answer: "Oui, tout à fait ! Si la raison q est négative, les termes de la suite vont alterner de signe à chaque étape (positif, négatif, positif, négatif...). C'est ce qu'on appelle une suite alternée."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Duel Final" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si tu places 1000€ sur un compte bloqué rémunéré à 3% par an (intérêts composés). Ce modèle correspond à une suite :",
              options: [
                "Arithmétique, de raison r = 30",
                "Géométrique, de raison q = 1,03",
                "Géométrique, de raison q = 3"
              ],
              correctAnswer: 1,
              explanation: "Augmenter de 3%, c'est multiplier le capital par (1 + 0,03) = 1,03. Puisqu'on multiplie chaque année par 1,03, c'est bien une suite géométrique de raison q = 1,03."
            },
            {
              question: "Dans le monde des suites, peut-on calculer U_2,5 ?",
              options: [
                "Oui, il suffit de prendre la moyenne entre U2 et U3.",
                "Non, l'indice 'n' doit obligatoirement être un nombre entier naturel."
              ],
              correctAnswer: 1,
              explanation: "Une suite est discrète. Les indices sont N (0, 1, 2, 3...). Il n'y a pas de 'rang et demi'."
            },
            {
              question: "Quelle est la somme des 101 premiers termes (de k=0 à k=100) de la somme de Gauss (0 + 1 + 2 + ... + 100) ?",
              options: [
                "100 × 100 / 2 = 5000",
                "101 × (0 + 100) / 2 = 5050",
                "100 × (0 + 101) = 10100"
              ],
              correctAnswer: 1,
              explanation: "Formule : Nb_termes × (Premier + Dernier)/2. De 0 à 100 il y a 101 termes ! Résultat : 101 × 100 / 2 = 5050."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais différencier une formule par récurrence d'une formule explicite.",
            "Je connais le lien : Arithmétique = + r / Géométrique = × q.",
            "Je connais les formules explicites par cœur (U_0 + nr et V_0 × q^n).",
            "Je n'oublie jamais que le calcul d'un pourcentage d'évolution correspond à une suite géométrique."
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

export default Course_Premiere_02_Suites;
