import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Rocket, Zap, Minimize2, MoveUpRight, AlertTriangle, HelpCircle, Activity } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

// Interactive Scientific Scale and Power Visualizer
const InteractivePowerScale: React.FC = () => {
  const [exponent, setExponent] = useState<number>(3);
  const [coefficient, setCoefficient] = useState<number>(4.5);

  const finalValue = coefficient * Math.pow(10, exponent);

  // Formatting helper for numbers
  const formatDecimalValue = (coeff: number, exp: number) => {
    if (exp === 0) return coeff.toString();
    if (exp > 0) {
      // positive power
      const val = coeff * Math.pow(10, exp);
      if (val >= 1000) {
        return val.toLocaleString('fr-FR');
      }
      return val.toString();
    } else {
      // negative power
      const val = coeff * Math.pow(10, exp);
      // to avoid floating subpoints, we can format manually or use toFixed
      const fixedVal = val.toFixed(Math.abs(exp) + 1);
      // clean trailing zeroes
      return parseFloat(fixedVal).toString().replace('.', ',');
    }
  };

  // Human scale illustrations based on magnitude
  const getScaleIllustration = (exp: number) => {
    if (exp >= 8) return { emoji: "🌌", label: "Échelle Cosmique (Galaxie)", desc: "100 000 années-lumière. L'univers s'étend à perte de vue." };
    if (exp >= 5) return { emoji: "🌍", label: "Échelle Planétaire (Terre)", desc: "12 700 kilomètres de diamètre. Notre habitat céleste bleu." };
    if (exp >= 3) return { emoji: "⛰️", label: "Échelle Géographique (Kilomètre)", desc: "Hauteur du Mont Blanc (4810 m). Le royaume des géants rocheux." };
    if (exp >= 1) return { emoji: "🧍", label: "Échelle Humaine (Mètre)", desc: "Taille moyenne d'un humain d'environ 1,70 m." };
    if (exp === 0) return { emoji: "🍎", label: "Échelle Centimétrique (Pomme)", desc: "Une belle pomme juteuse mûre d'environ 8 centimètres." };
    if (exp >= -2) return { emoji: "🐜", label: "Échelle Millimétrique (Fourmi)", desc: "Quelques millimètres de long. Les travailleuses de l'herbe." };
    if (exp >= -5) return { emoji: "🦠", label: "Échelle Microscopique (Bactérie)", desc: "Quelques micromètres (10^-6 m). La vie microscopique invisible." };
    return { emoji: "⚛️", label: "Échelle Atomique", desc: "Rayon d'un atome (10^-10 m). Le bloc d'acier élémentaire de la matière." };
  };

  const scale = getScaleIllustration(exponent);

  return (
    <div className="not-prose bg-card border border-border rounded-[2rem] p-6 md:p-8 my-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-indigo-500" />
        <h3 className="text-xl font-bold text-foreground">Schéma Interactif : Échelle des Puissances de 10</h3>
      </div>

      <p className="text-sm text-muted-text mb-6">
        Faites glisser l'exposant {"$n$"} et le coefficient {"$a$"} pour forger instantanément de gigantesques nombres stellaires ou d’infimes entités chimiques, tout en apprenant comment la virgule se déplace !
      </p>

      {/* Reglettes Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>Exposant (n) [Ordre de grandeur]</span>
            <span className="text-indigo-600 font-extrabold">10^{exponent}</span>
          </div>
          <input 
            type="range"
            min="-6"
            max="9"
            step="1"
            value={exponent}
            onChange={(e) => setExponent(parseInt(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>Coefficient Scientifique (a)</span>
            <span className="text-emerald-600 font-extrabold">{coefficient}</span>
          </div>
          <input 
            type="range"
            min="1.0"
            max="9.9"
            step="0.1"
            value={coefficient}
            onChange={(e) => setCoefficient(parseFloat(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
        
        {/* Logarithmic scale visualization in SVG */}
        <div className="lg:col-span-7 flex justify-center items-center bg-card rounded-2xl p-4 border border-dashed border-slate-200 dark:border-slate-800 min-h-[180px] relative overflow-hidden">
          <svg viewBox="0 0 320 140" className="w-full h-full" style={{ overflow: 'visible' }}>
            {/* Axis slider path */}
            <line x1="20" y1="80" x2="300" y2="80" stroke="#94a3b8" strokeWidth="3" rx="1.5" />
            
            {/* Tick marks on logarithmic axis */}
            {[-6, -3, 0, 3, 6, 9].map((val) => {
              // Map from [-6, 9] to [30, 290]
              const tX = 30 + ((val - (-6)) / (9 - (-6))) * 250;
              return (
                <g key={val}>
                  <line x1={tX} y1="75" x2={tX} y2="85" stroke="#64748b" strokeWidth="1.5" />
                  <text x={tX} y="98" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">10^{val}</text>
                </g>
              );
            })}

            {/* Moving Cursor */}
            {(() => {
              const currentX = 30 + ((exponent - (-6)) / (9 - (-6))) * 250;
              return (
                <g>
                  {/* Glowing bubble anchor */}
                  <circle cx={currentX} cy="80" r="10" fill="#6366f1" fillOpacity="0.3" className="animate-pulse" />
                  <circle cx={currentX} cy="80" r="6" fill="#4f46e5" />
                  
                  {/* Large dynamic floating emoji avatar */}
                  <g transform={`translate(${currentX - 16}, 16)`}>
                    <text x="16" y="24" fontSize="26" textAnchor="middle" className="select-none">{scale.emoji}</text>
                  </g>
                </g>
              );
            })()}

            <text x="160" y="130" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle" className="uppercase tracking-widest">Axe des ordres de grandeur</text>
          </svg>
        </div>

        {/* Dynamic Formatting Output Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4 text-xs">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <h4 className="font-extrabold text-indigo-900 dark:text-indigo-200 mb-3 uppercase text-xs tracking-wider">Notation & Décodage :</h4>
            
            <div className="space-y-3 font-medium">
              <div className="p-2 rounded bg-indigo-50/50 dark:bg-indigo-950/20 border-l-4 border-indigo-500">
                <span className="font-bold text-[10.5px]">Écriture Scientifique :</span><br/>
                <span className="font-mono text-base font-black text-indigo-700 dark:text-indigo-300">
                  {coefficient} × 10^{exponent}
                </span>
              </div>
              
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500">
                <span className="font-bold text-[10.5px]">Écriture Décimale brute :</span><br/>
                <span className="font-mono text-sm font-black text-emerald-700 dark:text-emerald-300">
                  {formatDecimalValue(coefficient, exponent)}
                </span>
              </div>

              <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 text-[10px] leading-relaxed">
                <span className="font-black text-amber-800 dark:text-amber-200 flex items-center gap-1">
                  💡 {scale.label}
                </span>
                <span className="text-slate-600 block mt-1">{scale.desc}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Course_College_4eme_03_Puissances: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-4EME-03"
        title="Les Puissances"
        subtitle="Domptez les nombres cosmiques et les atomes microscopiques !"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["Tables de multiplication", "Règles des signes des nombres relatifs", "Connaître le carré (ex: 5² = 25)"]}
        objectives={[
          "Comprendre la notation puissance (la base et son petit expo aérien).",
          "Effectuer des calculs avec des exposants positifs et négatifs.",
          "Mémoriser les 3 lois fondamentales de calcul des puissances de même base.",
          "Maîtriser l'Écriture Scientifique de précision d'un nombre."
        ]}
      />

      <Section title="🌟 Introduction : Le raccourci phénoménal" icon="🚀" color="slate">
        <p>
          Si tu devais écrire sur ton cahier de chimie la multiplication suivante : <br />
          <span className="block text-center font-mono text-sm bg-slate-100 dark:bg-slate-800 p-2 my-2 rounded-lg">
            {"$2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2$"}
          </span> 
          tu aurais mal au poignet avant d’avoir pu achever d’autres équations. Les mathématiciens, soucieux d'optimiser leur temps de rédaction, ont consolidé cet enchaînement répétitif en une notation compacte : la <strong>Puissance</strong>.
        </p>
        <p className="mt-4">
          C'est l'outil suprême des sciences de l'infiniment grand et de l'infiniment petit. La masse de notre galaxie se mesure en {"$10^{42} \\text{ kg}$"} tandis que le diamètre d'un noyau atomique ne mesure que {"$10^{-15} \\text{ m}$"}. Tout est régi par la force de cette notation exponentielle !
        </p>
      </Section>

      <Section title="1. La Notation (Le nombre au sol et son chef aérien)" icon="👑" color="indigo">
        <p className="mb-4 text-sm md:text-base leading-relaxed">
          Une expression de puissance s’organise rigoureusement autour de deux protagonistes : la est la <strong>Base</strong> (le grand nombre posé sur le plancher) et l'<strong>Exposant</strong> (le petit nombre suspendu en altitude).
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-8 items-center my-6">
          <div className="flex items-end mx-auto md:mx-0">
            <span className="text-8xl font-black text-indigo-700 dark:text-indigo-300">5</span>
            <span className="text-5xl font-black text-rose-500 mb-8">4</span>
          </div>
          <div className="flex-1 text-sm md:text-base leading-relaxed">
            <h3 className="font-bold text-lg mb-2 text-indigo-950 dark:text-indigo-200">Rôles de chacun :</h3>
            <ul className="space-y-3 font-medium text-slate-700 dark:text-slate-300">
              <li>• <span className="text-indigo-700 dark:text-indigo-300 font-bold text-lg">5 (La Base) :</span> C’est le nombre copié qui va servir de matière première au calcul.</li>
              <li>• <span className="text-rose-500 font-bold text-lg">4 (L'Exposant) :</span> C’est le chef d’orchestre qui ordonne : <em>"Multipliez la base 5 par elle-même, de façon à ce qu'elle apparaisse 4 fois au total !"</em></li>
              <li className="bg-card dark:bg-slate-900 p-3 rounded-lg text-center font-mono border text-xs md:text-sm border-border">
                {"$5^4 = 5 \\times 5 \\times 5 \\times 5 = 625$"}
              </li>
            </ul>
          </div>
        </div>

        <TipBanner title="L'erreur internationale fatale ! 🛑" type="warning">
          Ne confondez jamais une puissance avec une table de multiplication ! <br />
          {"$5^4$"} n'est **absolument pas** égal à {"$5 \\times 4 = 20$"}. <br />
          La puissance est un phénomène multiplicateur de croissance exponentielle (comme une cellule biologique qui se scinde en deux, puis chaque moitié en deux...).
        </TipBanner>
      </Section>

      <Section title="2. Les Exposants Négatifs (L'incursion sous la barre de fraction)" icon="🔬" color="blue">
        <p className="mb-4">
          Si un exposant positif correspond à l'idée d'amplifier et de multiplier par le haut, alors un exposant négatif exprime l'action d’inverser, de diviser, ou de glisser <strong>au dénominateur</strong>. C'est l'<strong>Inverse</strong> du nombre.
        </p>

        <div className="bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 my-6 shadow-sm">
          <div className="font-mono text-center text-lg text-blue-900 dark:text-blue-100 mb-6 bg-card dark:bg-slate-900 px-4 py-3 rounded-xl shadow inline-block border border-blue-200/50">
            {"$10^{-3} = \\frac{1}{10^3} = \\frac{1}{1000} = 0,001$"}
          </div>
          
          <h3 className="font-bold mb-2 flex items-center gap-2"><MoveUpRight className="text-blue-500 w-5 h-5" /> Règles capitales à retenir :</h3>
          <ul className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
            <li>• Un exposant négatif (ex: -3) <strong>ne génère jamais un résultat numérique négatif précédé d'un signe « - » !</strong></li>
            <li>• Il configure simplement un nombre décimal microscopique démarrant par {"$0,\\dots$"}.</li>
            <li>• L'exposant négatif d'une puissance de 10 vous dicte précisément <strong>le nombre global de zéros à positionner</strong> (le premier zéro à gauche de la virgule étant inclus !). Ainsi, {"$10^{-4}$"} s'écrit avec 4 zéros : {"$0,0001$"}.</li>
          </ul>
        </div>
      </Section>

      <Section title="3. Les 3 Règles d'Or des Calculs" icon="⚡" color="emerald">
        <p className="mb-4">
          Dans l'arène des calculs, on ne peut pas fusionner des puissances de bases différentes (un boss {"$3^2$"} ne pactise pas avec un boss {"$5^4$"}). MAIS, si vous manipulez la <strong>même base</strong>, des règles de simplification s'appliquent immédiatement :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 py-4 px-3 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex flex-col items-center shadow-sm">
            <span className="font-bold text-center mb-2 text-sm text-emerald-950 dark:text-emerald-250">1. La Multiplication<br/>(L'Alliance des expos)</span>
            <div className="bg-card dark:bg-slate-900 p-3 rounded-xl shadow border border-border font-mono text-center w-full mt-auto text-xs">
              {"$a^m \\times a^p = a^{m+p}$"}<br/>
              <hr className="my-2 border-border"/>
              {"$2^3 \\times 2^4 = 2^7$"}<br/>
              <span className="text-[10px] text-slate-400 font-semibold">(On somme les forces)</span>
            </div>
          </div>
          
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 py-4 px-3 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex flex-col items-center shadow-sm">
            <span className="font-bold text-center mb-2 text-sm text-emerald-950 dark:text-emerald-250">2. La Division<br/>(La Soustraction)</span>
            <div className="bg-card dark:bg-slate-900 p-3 rounded-xl shadow border border-border font-mono text-center w-full mt-auto text-xs">
              {"$\\frac{a^m}{a^p} = a^{m-p}$"}<br/>
              <hr className="my-2 border-border"/>
              {"$\\frac{7^5}{7^3} = 7^2$"}<br/>
              <span className="text-[10px] text-slate-400 font-semibold">(Le haut retranche le bas)</span>
            </div>
          </div>

          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 py-4 px-3 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex flex-col items-center shadow-sm">
            <span className="font-bold text-center mb-2 text-sm text-emerald-950 dark:text-emerald-250">3. La Super-Puissance<br/>(La Colocation)</span>
            <div className="bg-card dark:bg-slate-900 p-3 rounded-xl shadow border border-border font-mono text-center w-full mt-auto text-xs">
              {"$(a^m)^p = a^{m \\times p}$"}<br/>
              <hr className="my-2 border-border"/>
              {"$(3^4)^2 = 3^8$"}<br/>
              <span className="text-[10px] text-slate-400 font-semibold">(Prolifération immédiate)</span>
            </div>
          </div>
        </div>

        <InfoBlock title="Exceptions universelles indispensables 💡" type="info">
          Deux théorèmes invariants structurent le code de l'arithmétique :<br/>
          • N'importe quelle valeur non nulle élevée à l'exposant <strong>Zéro</strong> donne toujours **1**. Ex: {"$5849^0 = 1$"}.<br/>
          • Tout nombre élevé à l'exposant <strong>1</strong> reste inchangé. Ex: {"$42^1 = 42$"}.
        </InfoBlock>
      </Section>

      {/* Insert custom interactive simulator scale visualizer here */}
      <InteractivePowerScale />

      <Section title="4. L'Écriture Scientifique (L'outil des savants)" icon="🔭" color="rose">
        <p className="mb-4">
          La physique moderne déteste écrire le poids moyen d'une étoile ou d'une particule avec 30 zéros alignés. C’est la garantie d’oublier un zéro ou d'occuper de l’espace inutilement. Pour y remédier, ils emploient l’<strong>Écriture Scientifique</strong>.
        </p>

        <InteractiveExercise 
          title="Forger l'écriture standard scientifique"
          question={<>Convertir la distance galactique brute suivante en écriture scientifique optimisée : <strong>{"$74\\ 500\\ 000\\ \\text{m}$"}</strong></>}
          steps={[
            <>
              <strong>Règle N°1 : La sentinelle unique !</strong><br/>
              On ne tolère qu'<strong>un seul chiffre non nul</strong> placé à gauche de la virgule. <br />
              Pour {"$74\\ 500\\ 000$"}, on déplace fictivement notre curseur pour isoler : <strong>7,45</strong>.
            </>,
            <>
              <strong>Règle N°2 : Déterminer la puissance de compensation</strong><br/>
              Pour rétablir le nombre originel à partir de 7,45, nous devons décaler la virgule de plusieurs positions vers la droite (ce qui revient à multiplier par 10 de manière répétée).
            </>,
            <>
              <strong>Compter les impulsions</strong><br/>
              De 7,45 à {"$74\\ 500\\ 000$"}, la virgule doit effectuer exactement <strong>7 sauts vers la droite</strong>. <br />
              La puissance de compensation associée sera de {"$10^7$"}.
            </>,
            <>
              <strong>L'écriture de synthèse :</strong><br/>
              La distance s'exprime ainsi de manière normalisée : <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">{"$7,45 \\times 10^7\\ \\text{m}$"}</span>.
            </>
          ]}
        />
        
        <p className="mt-4 text-xs font-semibold text-center text-slate-500 italic">
          (À l'inverse, si votre cible est infinitésimale tel que {"$0,00052$"}, on isole 5,2 et la virgule effectue un décalage vers la gauche de 4 crans, d'où l’interprétation par l'exposant négatif : {"$5,2 \\times 10^{-4}$"}).
        </p>
      </Section>

      <Section title="5. Exercices Résolus" icon="📝" color="purple">
        <InteractiveExercise
          title="Exercice 1 : Simplification d'expression"
          question={
            <>
              Réduire au maximum l'écriture suivante en une seule fraction de puissance de même base : <br/>
              {"$A = \\frac{10^7 \\times 10^{-2}}{(10^3)^2}$"}
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Simplifier le numérateur (Alliance)</strong><br/>
              On somme les puissances en haut : {"$10^7 \\times 10^{-2} = 10^{7 + (-2)} = 10^5$"}.
            </>,
            <>
              <strong>Étape 2 : Simplifier le dénominateur (Inception)</strong><br/>
              On multiplie les exposants : {"$(10^3)^2 = 10^{3 \\times 2} = 10^6$"}.
            </>,
            <>
              <strong>Étape 3 : Soustraire les deux entités (Guerre)</strong><br/>
              On soustrait le haut par le bas : <br/>
              {"$A = \\frac{10^5}{10^6} = 10^{5 - 6} = 10^{-1}$"} (ce qui correspond précisément à un dixième, ou {"$0,1$"}).
            </>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Évaluation des signes"
          question={
            <>
              Déterminer sans calculatrice le signe final des deux nombres suivants : <br/>
              1. {"$B = -4^2$"} <br />
              2. {"$C = (-4)^2$"}
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Analyser la puissance brute sans parenthèses</strong><br/>
              Pour B, la puissance carrée s'applique exclusivement à la base numérique 4. Le signe négatif placé devant n'est pas affecté. <br />
              {"$B = - (4 \\times 4) = -16$"} (le nombre est <strong>négatif</strong>).
            </>,
            <>
              <strong>Étape 2 : Analyser l'effet de l'enveloppe parenthèse</strong><br/>
              Pour C, la parenthèse englobe à la fois le signe et la valeur numérique. Tout le bloc subit la multiplication par lui-même. <br />
              {"$C = (-4) \\times (-4)$"}. Or, le produit de deux signes négatifs est positif.<br/>
              {"$C = 16$"} (le nombre est <strong>positif</strong>). Rappelez-vous bien de cette différence !
            </>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le nombre {"$45 \\times 10^3$"} est-il rédigé sous une forme scientifique valide ?</>}
            back={<><strong>NON, IL EST INCORRECT.</strong><br/>Pour valider la charte scientifique standard, le coefficient placé devant la virgule doit obligatoirement être compris strictement entre 1 et 9. La forme correcte est :<br/><strong>{"$4,5 \\times 10^4$"}.</strong></>}
          />
          <Flashcard 
            front={<>Peut-on additionner les exposants lors d'une addition de bases identiques comme : {"$3^2 + 3^5$"}. ?</>}
            back={<><strong>C'EST LE PIÈGE ULTIME ! ABSOLUMENT PAS !</strong><br/>Les 3 règles d'or (multiplication, division, super-puissance) s'appliquent EXCLUSIVEMENT aux produits et quotients. L'addition est interdite de fusion. Vous devez évaluer chaque terme manuellement : <br/>{"$9 + 243 = 252$"} !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'exposant zéro donne-t-il toujours 1 ?",
              answer: "On l'explique simplement par la règle logique de transition. Pour passer de 10^3 à 10^2, on divise par 10. De 10^1 à 10^0, on divise donc 10 par 10, ce qui conduit inéluctablement à 1 !"
            },
            {
              question: "Quelle est l'unité de grandeur du Giga-octet (Go) de stockage sur mon smartphone ?",
              answer: "L'abréviation de stockage repose sur les puissances de 10 de l'écriture décimale : \n- Mega (Mo) = millions de données (10^6).\n- Giga (Go) = milliards de données (10^9).\n- Tera (To) = mille milliards de données (10^12) !"
            },
            {
              question: "Comment multiplier facilement un nombre décimal par une puissance de 10 positive ?",
              answer: "C'est un jeu d'enfant virtuel : il suffit de décaler la virgule vers la droite d'autant de crans que d'exposants (en comblant par des zéros si vous manquez de chiffres). Ex: 4,52 × 10^3 = 4520."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Simplifiez l'écriture de cette alliance de puissances : 10⁵ × 10⁻³",
              options: [
                "10⁻¹⁵ (car on multiplie les exposants)",
                "10² (car on additionne les exposants : 5 + (-3) = 2)",
                "10⁸ (car on effectue une soustraction de compensation)"
              ],
              correctAnswer: 1,
              explanation: "Top ! Lors de la multiplication de bases rigoureusement identiques, on additionne sagement leurs exposants de puissance correspondants."
            },
            {
              question: "Déterminer la forme scientifique correcte associée au nombre 0,000035",
              options: [
                "35 × 10^-6",
                "3,5 × 10^5",
                "3,5 × 10^-5"
              ],
              correctAnswer: 2,
              explanation: "Génial ! La première règle est de positionner un unique chiffre non nul devant, d'où 3,5. Puis on constate que la virgule effectue un décalage de 5 pas vers la gauche, imposant un coefficient négatif de puissance : -5."
            },
            {
              question: "Laquelle de ces affirmations est vraie concernant la puissance cubique (-2)³ ?",
              options: [
                "Elle vaut -8 (car l'exposant impair conserve le signe initial)",
                "Elle vaut +8 car un nombre au cube est toujours positif",
                "Elle vaut -6"
              ],
              correctAnswer: 0,
              explanation: "Parfait ! (-2)³ c'est (-2) × (-2) × (-2) = 4 × (-2) = -8. L'exposant étant de valeur impaire (3), le signe global négatif se maintient."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je fais la différence absolue entre l'exposant d'un carré et une basique multiplication.",
            "Je sais que tout nombre non nul assigné à la puissance zéro équivaut à 1.",
            "Je sais manipuler l'alliance exponentielle des 3 règles d'or sur la même base.",
            "Je maîtrise l'Écriture Scientifique d'un nombre conforme à la charte d'analyse."
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

export default Course_College_4eme_03_Puissances;
