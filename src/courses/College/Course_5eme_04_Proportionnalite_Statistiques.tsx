import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, FormulaBox, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

const Course_5eme_04_Proportionnalite_Statistiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Calculator state
  const [valA, setValA] = useState<string>('3');
  const [valB, setValB] = useState<string>('10');
  const [valC, setValC] = useState<string>('6');
  const [selectedMissing, setSelectedMissing] = useState<'A' | 'B' | 'C' | 'D'>('D');

  // Multiplier interactive state
  const [multiplier, setMultiplier] = useState<number>(2);

  const numA = parseFloat(valA) || 0;
  const numB = parseFloat(valB) || 0;
  const numC = parseFloat(valC) || 0;

  // Compute D based on selections
  let resultText = '';
  let stepsHtml: React.ReactNode = null;
  
  if (selectedMissing === 'D') {
    if (numA !== 0) {
      const computedD = (numB * numC) / numA;
      resultText = `? = ${computedD.toFixed(2).replace(/\.00$/, '')}`;
      stepsHtml = (
        <span className="text-sm font-semibold">
          Étape 1 : Diagonale connue : {`$${numB} \\times ${numC} = ${numB * numC}$`} <br/>
          Étape 2 : Division par la valeur restante : {`$${numB * numC} \\div ${numA} = ${computedD.toFixed(2).replace(/\.00$/, '')}$`}
        </span>
      );
    } else {
      resultText = 'Impossible (division par 0)';
    }
  } else if (selectedMissing === 'C') {
    if (numB !== 0) {
      const computedC = (numA * (parseFloat(valA) || 0)) / numB; // just a placeholder formula example
      // Let's use the standard configuration where D is missing dynamically
    }
  }

  // standard missing value as cell D (bottom right)
  const computeD = () => {
    if (numA === 0) return 'Ø';
    return ((numB * numC) / numA).toFixed(1).replace(/\.0$/, '') || '0';
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-PROP"
        title="Proportionnalité et Statistiques"
        subtitle="Dompter le Tableau Magique, maîtriser le produit en croix et décrypter les données."
        duration="40 min"
        level="5ème Collège"
        prerequisites={["Opérations de base", "Connaissance des fractions"]}
        objectives={[
          "Reconnaître une situation de proportionnalité dans la vie réelle",
          "Calculer une quatrième proportionnelle par la technique du Produit en Croix",
          "Appliquer et calculer des pourcentages",
          "Calculer et interpréter des fréquences dans des séries statistiques"
        ]}
      />

      <Section title="⚖️ La Loi de l'Équilibre et Rapport" icon="🍏" color="emerald">
        <p className="lead text-lg">
          La proportionnalité régit de nombreux phénomènes du quotidien. Si 3 bouteilles d'eau coûtent 6 €, combien coûteront 10 bouteilles ?
        </p>
        <p className="mt-4">
          Deux grandeurs sont dites <strong>proportionnelles</strong> si l'on peut passer de l'une à l'autre en multipliant (ou divisant) toujours par un même nombre non nul appelé le <strong>coefficient de proportionnalité</strong>.
        </p>

        {/* SVG interactif animant la proportionnalité */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm text-center">
          <h4 className="font-bold text-lg mb-4 text-emerald-800 dark:text-emerald-400">Visualisation Interactive : La pesée proportionnelle</h4>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex justify-center items-center gap-4">
              <span className="font-bold">Nombre de pommes : {multiplier}</span>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={multiplier} 
                onChange={(e) => setMultiplier(parseInt(e.target.value))}
                className="w-48 accent-emerald-500"
              />
              <span className="font-bold">Prix : {multiplier * 2} €</span>
            </div>
            
            <svg className="w-full max-w-sm h-32 border border-slate-100 rounded-xl bg-slate-50 dark:bg-slate-900" viewBox="0 0 400 120">
              {/* Scale bar */}
              <line x1="100" y1="90" x2="300" y2="90" stroke="#cbd5e1" strokeWidth="4" />
              {/* Stand */}
              <path d="M200 90 L200 110 M170 110 L230 110" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
              
              {/* Left scale basket (Apples representation) */}
              <g transform="translate(100, 0)">
                <line x1="0" y1="90" x2="0" y2="50" stroke="#94a3b8" strokeWidth="2" />
                <path d="M-30 50 Q0 80 30 50" fill="none" stroke="#64748b" strokeWidth="3" />
                {Array.from({ length: multiplier }).map((_, i) => (
                  <circle key={i} cx={(i % 3) * 12 - 12} cy={45 - Math.floor(i / 3) * 10} r="7" fill="#ef4444" className="stroke-white" />
                ))}
              </g>

              {/* Right scale basket (Coins/Value representation) */}
              <g transform="translate(300, 0)">
                <line x1="0" y1="90" x2="0" y2="50" stroke="#94a3b8" strokeWidth="2" />
                <path d="M-30 50 Q0 80 30 50" fill="none" stroke="#64748b" strokeWidth="3" />
                {Array.from({ length: multiplier * 2 }).map((_, i) => (
                  <circle key={i} cx={(i % 4) * 8 - 12} cy={48 - Math.floor(i / 4) * 7} r="5" fill="#eab308" className="stroke-white" />
                ))}
              </g>
            </svg>
            <p className="text-xs text-slate-500 font-mono">Chaque pomme coûte exactement 2€. Le rapport reste constant : {"$\\frac{Prix}{Nombre} = 2$"}.</p>
          </div>
        </div>

        <InfoBlock type="reminder" title="La Condition Critique">
          Rien ne sert d'appliquer des calculs de proportionnalité si la relation ne s'y prête pas ! L'âge et la taille d'un être humain ne sont pas proportionnels : doubler ton âge ne double pas ta hauteur.
        </InfoBlock>
      </Section>

      <Section title="❌ Le Produit en Croix" icon="⚔️" color="rose">
        <p>
          Quand il manque une seule valeur dans un tableau à 4 cases, le <strong>Produit en Croix</strong> (ou quatrième proportionnelle) est la méthode ultime.
        </p>

        <FormulaBox title="Règle Générale" math={"a \\times d = b \\times c \\implies d = \\frac{b \\times c}{a}"} />

        {/* Dynamic simulator calculator */}
        <div className="bg-muted dark:bg-slate-900 border-2 border-border p-6 rounded-3xl my-8 shadow-inner">
          <h4 className="font-bold text-center text-lg mb-4 text-indigo-900 dark:text-indigo-400">Simulateur Interactif de Produit en Croix</h4>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="relative">
              <div className="grid grid-cols-2 text-center text-xl font-bold rounded-2xl border-4 border-slate-700 bg-card overflow-hidden w-64 shadow-lg">
                <div className="p-4 border-b-2 border-r-2 border-slate-700">
                  <input 
                    aria-label="Valeur A"
                    type="number" 
                    value={valA} 
                    onChange={(e) => setValA(e.target.value)} 
                    className="w-full text-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-slate-900 dark:text-slate-100" 
                  />
                </div>
                <div className="p-4 border-b-2 border-slate-700">
                  <input 
                    aria-label="Valeur B"
                    type="number" 
                    value={valB} 
                    onChange={(e) => setValB(e.target.value)} 
                    className="w-full text-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-slate-900 dark:text-slate-100" 
                  />
                </div>
                <div className="p-4 border-r-2 border-slate-700">
                  <input 
                    aria-label="Valeur C"
                    type="number" 
                    value={valC} 
                    onChange={(e) => setValC(e.target.value)} 
                    className="w-full text-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-slate-900 dark:text-slate-100" 
                  />
                </div>
                <div className="p-4 bg-rose-500/10 text-rose-600 font-black text-2xl flex items-center justify-center">
                  {computeD()}
                </div>
              </div>
              
              {/* Colored cross arrows built with HTML absolute divs to avoid viewport issue */}
              <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
                <div className="absolute left-[30%] top-[40%] w-[40%] h-[20%] border-t-2 border-emerald-500 rotate-[22deg]" />
                <div className="absolute left-[30%] top-[40%] w-[40%] h-[20%] border-b-2 border-rose-500 -rotate-[22deg]" />
              </div>
            </div>

            <div className="max-w-xs text-center md:text-left space-y-3">
              <h5 className="font-bold text-base uppercase text-slate-500">Calcul étape par étape :</h5>
              <div className="bg-card p-4 rounded-xl shadow-sm text-sm border font-mono">
                <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-1">1. Multiplier la diagonale connue :</p>
                <p className="mb-3">{valB} × {valC} = {(parseFloat(valB) || 0) * (parseFloat(valC) || 0)}</p>
                
                <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-1">2. Diviser par le troisième nombre :</p>
                <p className="font-bold text-center text-lg mt-2 text-indigo-700 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
                  {((parseFloat(valB) || 0) * (parseFloat(valC) || 0))} ÷ {valA} = {computeD()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="📊 Fréquences et Statistiques" icon="📈" color="indigo">
        <p>
          En statistiques, on étudie un caractère chez un groupe (population). Pour comprendre la répartition d'une catégorie (effectif), on calcule la <strong>Fréquence</strong>.
        </p>

        <FormulaBox formula="Fréquence = (Effectif cible) / (Effectif TOTAL)" title="Formule de la Fréquence" />
        
        <TipBanner type="info" title="L'interprétation">
          La fréquence est toujours un nombre compris entre <strong>0 et 1</strong> (ou une fraction). Pour l'exprimer en <strong>pourcentage (%)</strong>, on multiplie simplement la fréquence par 100.
        </TipBanner>

        <InfoBlock type="funfact" title="Le saviez-vous ?">
          La somme de toutes les fréquences de toutes les catégories d'une même étude statistique est TOUJOURS égale à <strong>1</strong> (soit 100%). S'il s'agit d'autres valeurs, vous avez commis une erreur dans vos additions !
        </InfoBlock>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans un tableau de proportionnalité, comment calcule-t-on le <strong>coefficient</strong> ?</>}
            back={<>On divise n'importe quel nombre de la deuxième ligne par celui correspondant de la première ligne.</>}
          />
          <Flashcard 
            front={<>Que vaut la somme de toutes les fréquences exprimées en pourcentages dans une étude ?</>}
            back={<>La somme fait toujours exactement <strong>100%</strong>.</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Le Trésor des Pourcentages"
          question="Dans un collège de 400 élèves, 120 élèves portent des lunettes. Quel est le pourcentage d'élèves portant des lunettes ?"
          steps={[
            "J'écris le rapport de la situation : l'effectif cible (les porteurs de lunettes) divisé par l'effectif total d'élèves. F = 120 / 400.",
            "Pour trouver un pourcentage, je peux simplifier la fraction pour avoir 100 au dénominateur. Je divise le numérateur et le dénominateur par 4 : 120 ÷ 4 = 30, et 400 ÷ 4 = 100.",
            "Le rapport est donc de 30 pour 100, soit 30% d'élèves à lunettes."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : La Recette Secrète"
          question="Pour faire de la confiture, on utilise 3 kg de fruits pour 2 kg de sucre. De combien de sucre a-t-on besoin si l'on a récolté 7,5 kg de fruits ?"
          steps={[
            "Il s'agit d'une situation de proportionnalité. Je construis mentalement un tableau avec une colonne Fruits et une colonne Sucre : 3 de Fruits s'associent à 2 de Sucre. Je cherche la valeur pour 7,5 de Fruits.",
            "J'applique le produit en croix avec ma diagonale complète (7,5 et 2) et le diviseur restant (3). Calcul : (7,5 × 2) ÷ 3.",
            "Calcul intermédiaire : 7,5 × 2 = 15. Division finale : 15 ÷ 3 = 5. On a donc besoin de 5 kg de sucre !"
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Le produit en croix donne-t-il toujours un nombre fini ?",
              answer: "Non, parfois la division tombe sur un nombre avec une infinité de chiffres après la virgule (par exemple 10/3 = 3.3333...). Dans ce cas, on conserve une valeur arrondie ou l'écriture fractionnaire."
            },
            {
              question: "Quelle différence y a-t-il entre effectif et fréquence ?",
              answer: "L'effectif est le nombre réel brut (ex: '20 élèves'), alors que la fréquence exprime une proportion (ex: '0.40' ou '40%'). Elle est utile pour comparer des classes de tailles différentes."
            },
            {
              question: "Peut-on utiliser le produit en croix pour convertir des unités ?",
              answer: "Oui, tout à fait ! Les unités de vitesse, de masse ou de longueur respectent la proportionnalité (ex : 1 h = 60 min, donc 2,5 h = x min)."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Simulateur de Croix" icon="🕹️" color="purple">
        <p className="mb-4">Voyons si tu as assimilé la technique secrète.</p>
        <FillInTheBlanks 
          id="prop-eval"
          content={[
            "Dans mon tableau, j'ai 5 bonbons qui coûtent 2€. Je veux connaître le prix de 15 bonbons. Ma diagonale sans trou est composée de 15 et de ",
            { options: ["5", "2", "?"], correctAnswer: 1 },
            ". Je calcule cette diagonale, ce qui me fait ",
            { options: ["10", "30", "15"], correctAnswer: 1 },
            ". Enfin, je divise ce résultat final par l'unique nombre restant dans le tableau, qui est ",
            { options: ["5", "10", "?", "15"], correctAnswer: 0 },
            ". Le résultat ultime est donc ",
            { options: ["6€", "4€", "10€"], correctAnswer: 0 },
            " ! C'est le pouvoir du produit en croix !"
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans un tableau proportionnel, si je double la quantité en haut, que se passe-t-il pour le prix en bas ?",
              options: [
                "Le prix reste fixe d'après la formule.",
                "Je dois doubler le prix d'après la loi de proportionnalité."
              ],
              correctAnswer: 1,
              explanation: "C'est la règle d'or de la proportion ! Si X grandit d'un multiplicateur (×2), alors Y doit grandir de ce même multiplicateur."
            },
            {
              question: "Deux grandeurs A et B sont liées. Si A augmente de 5, B augmente toujours de 5. Sont-elles proportionnelles ?",
              options: [
                "Oui, car l'évolution est régulière.",
                "Non, la proportionnalité requiert une multiplication constante, pas une addition."
              ],
              correctAnswer: 1,
              explanation: "Exactement ! Ajouter la même valeur ne suffit pas (par exemple ton âge gagne 1 an par an, mais ta taille ne gagne pas 1 mètre par an)."
            },
            {
              question: "Si 1/4 des élèves portent des lunettes, quel est ce pourcentage ?",
              options: [
                "14%",
                "40%",
                "25%"
              ],
              correctAnswer: 2,
              explanation: "1/4 c'est la fraction pour un quart. 1 divisé par 4 = 0.25 = 25% ! (Ou bien on multiplie par 25 le haut et le bas pour avoir 25/100)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais identifier si une situation est proportionnelle ou non.",
            "Je remplis une case vide dans un tableau de proportion en un éclair avec le Produit en Croix.",
            "Je calcule une fréquence en divisant la cible étudiée par l'effectif TOTAL de l'expérience.",
            "Je transforme une fraction (/4, /5) ou une décimale (0.25) en un pourcentage (%)."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            type="button"
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

export default Course_5eme_04_Proportionnalite_Statistiques;
