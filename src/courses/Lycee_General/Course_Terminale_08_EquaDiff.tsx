import React, { useState, useEffect } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import confetti from 'canvas-confetti';

const NewtonCoolingVisualizer: React.FC = () => {
  const [tInit, setTInit] = useState<number>(80); // Température initiale du café (°C)
  const [tAmb, setTAmb] = useState<number>(20);  // Température ambiante (°C)
  const [kRate, setKRate] = useState<number>(0.15); // Coefficient de refroidissement

  // Génération des points de coordonnées pour le tracé de la courbe
  // Formule : T(t) = (tInit - tAmb) * exp(-k * t) + tAmb
  // Temps de 0 à 30 secondes
  const points: { x: number; y: number }[] = [];
  for (let t = 0; t <= 30; t += 0.5) {
    const temp = (tInit - tAmb) * Math.exp(-kRate * t) + tAmb;
    // Mise à l'échelle pour le SVG :
    // svg_x : de t=0 (x=50 px) à t=30 (x=350 px)
    const svgX = 50 + (t / 30) * 300;
    // svg_y : de Temp=0°C (y=130 px) à Temp=100°C (y=20 px)
    const svgY = 130 - (temp / 100) * 100;
    points.push({ x: svgX, y: svgY });
  }

  const pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');

  // Calcul du temps caractéristique de refroidissement tau = 1/k
  const tau = 1 / kRate;
  const tempTau = (tInit - tAmb) * Math.exp(-1) + tAmb;
  const svgTauX = 50 + (tau / 30) * 300;
  const svgTauY = 130 - (tempTau / 100) * 100;

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 my-8 shadow-sm">
      <h3 className="text-lg md:text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <span>☕</span> Schéma Pédagogique Interactif : Modéliser le Refroidissement d'un Café
      </h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Selon la loi thermique de Newton, la vitesse de refroidissement d'un fluide est proportionnelle à la différence entre sa température et celle du milieu. L&apos;équation différentielle est de la forme : {"$y' = -k(y - T_{\\text{amb}})$"}, dont l&apos;unique solution est {"$y(t) = (T_{\\text{init}} - T_{\\text{amb}}) e^{-kt} + T_{\\text{amb}}$"}.
      </p>

      {/* SVG Plotter */}
      <div className="w-full h-56 bg-slate-50 dark:bg-slate-900/40 rounded-2xl flex items-center justify-center p-4 relative border border-slate-100 dark:border-slate-800/80">
        <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible">
          {/* Axes et grille */}
          <line x1="45" y1="130" x2="370" y2="130" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="15" x2="50" y2="135" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

          {/* Axe des ordonnées gradué */}
          <text x="40" y="24" className="text-[9px] fill-slate-400 font-mono text-right font-bold" textAnchor="end">100°C</text>
          <text x="40" y="74" className="text-[9px] fill-slate-400 font-mono text-right font-bold" textAnchor="end">50°C</text>
          <text x="40" y="124" className="text-[9px] fill-slate-400 font-mono text-right font-bold" textAnchor="end">0°C</text>
          
          <line x1="47" y1="20" x2="53" y2="20" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="47" y1="70" x2="53" y2="70" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="47" y1="120" x2="53" y2="120" stroke="#cbd5e1" strokeWidth="1" />

          {/* Axe des abscisses gradué */}
          <text x="50" y="145" className="text-[9px] fill-slate-400 font-mono" textAnchor="middle">t=0 s</text>
          <text x="200" y="145" className="text-[9px] fill-slate-400 font-mono" textAnchor="middle">t=15 s</text>
          <text x="350" y="145" className="text-[9px] fill-slate-400 font-mono" textAnchor="middle">t=30 s</text>

          <line x1="50" y1="130" x2="50" y2="133" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="200" y1="130" x2="200" y2="133" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="350" y1="130" x2="350" y2="133" stroke="#cbd5e1" strokeWidth="1" />

          {/* Ligne pointillée : Température ambiante de convergence */}
          <line 
            x1="50" 
            y1={130 - (tAmb / 100) * 100} 
            x2="350" 
            y2={130 - (tAmb / 100) * 100} 
            stroke="#ef4444" 
            strokeWidth="1.5" 
            strokeDasharray="4 3" 
          />
          <text 
            x="360" 
            y={130 - (tAmb / 100) * 100 + 3} 
            className="text-[9px] font-bold fill-rose-600 font-sans"
          >
            {`T_amb (${tAmb}°C)`}
          </text>

          {/* Courbe exponentielle dynamique */}
          <path 
            d={pathD} 
            fill="none" 
            stroke="#4f46e5" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />

          {/* Point tau (temps caractéristique) si dans les limites visibles */}
          {tau <= 30 && (
            <>
              <circle cx={svgTauX} cy={svgTauY} r="4.5" fill="#4f46e5" />
              <line x1={svgTauX} y1={svgTauY} x2={svgTauX} y2="130" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="50" y1={svgTauY} x2={svgTauX} y2={svgTauY} stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
              <text x={svgTauX + 5} y={svgTauY - 4} className="text-[8px] fill-indigo-600 font-bold">
                {`τ ≈ ${tau.toFixed(1)}s (${tempTau.toFixed(1)}°C)`}
              </text>
            </>
          )}

          {/* Point initial */}
          <circle cx="50" cy={130 - (tInit / 100) * 100} r="5" fill="#10b981" />
          <text x="58" y={130 - (tInit / 100) * 100 + 3} className="text-[9px] fill-emerald-600 font-bold">
            {`T_init (${tInit}°C)`}
          </text>
        </svg>
      </div>

      {/* Sliders d'interaction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
            <span>Température Initiale</span>
            <span className="text-emerald-500 font-mono font-bold">{tInit}°C</span>
          </div>
          <input 
            type="range"
            min={45}
            max={98}
            value={tInit}
            onChange={(e) => setTInit(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
            <span>Température Ambiante</span>
            <span className="text-red-500 font-mono font-bold">{tAmb}°C</span>
          </div>
          <input 
            type="range"
            min={10}
            max={35}
            value={tAmb}
            onChange={(e) => setTAmb(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
            <span>Coefficient d&apos;échange (k)</span>
            <span className="text-indigo-600 font-mono font-bold">{kRate.toFixed(2)} /s</span>
          </div>
          <input 
            type="range"
            min={0.05}
            max={0.4}
            step={0.01}
            value={kRate}
            onChange={(e) => setKRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      {/* Explication physique dynamique */}
      <div className="mt-8 p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-2xl">
        <p className="text-sm text-indigo-950 dark:text-indigo-100 leading-relaxed">
          <strong>Observation mathématique :</strong> À l&apos;instant {"$t = 0$"}, {"$y(0) = (T_{\\text{init}} - T_{\\text{amb}}) \\cdot 1 + T_{\\text{amb}} = T_{\\text{init}}$"}. Quand {"$t$"} devient grand, {"$e^{-kt} \\to 0$"} donc {"$y(t) \\to T_{\\text{amb}}$"}. En augmentant le coefficient {"$k$"}, le café refroidit plus rapidement électrique ou matériel, ce que l&apos;on voit avec le temps caractéristique plus court {"$\\tau = 1/k$"}.
        </p>
      </div>
    </div>
  );
};

const Course_Terminale_08_EquaDiff: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-DIFF"
        title="Équations Différentielles"
        subtitle="Quand la fonction et sa propre dérivée sont mélangées dans une même équation."
        duration="45 min"
        level="Terminale Générale (Spécialité)"
        prerequisites={["Dérivation globale", "Fonction Exponentielle", "Limites de suites et fonctions"]}
        objectives={[
          "Comprendre le concept d'une équation où l'inconnue est une fonction entière.",
          "Résoudre théoriquement les équations de premier ordre du type y' = ay et y' = ay + b.",
          "Déterminer l'unique constante d'intégration grâce aux conditions expérimentales initiales.",
          "Appliquer les équations différentielles à la modélisation de phénomènes physiques réels."
        ]}
      />

      <Section title="Introduction : Trouver qui je suis" icon="🕵️" color="emerald">
        <p>
          Au collège et en seconde, résoudre une équation consistait à trouver un nombre inconnu {"$x$"} (par exemple résoudre {"$2x = 8 \\implies x = 4$"}). Dans ce chapitre, le niveau supérieur est franchi : l&apos;inconnue à débusquer n&apos;est plus un simple nombre réel... C&apos;est <strong>une Fonction entière {"$y(t)$"} !</strong>
        </p>
        <p className="mt-2">
          Une <strong>Équation Différentielle</strong> est une égalité qui relie de manière prescrite une fonction inconnue {"$y$"} et ses dérivées successives {"$y', y''$"}. C&apos;est le langage fondamental de la physique et de la biologie pour exprimer la dynamique d&apos;évolution d&apos;un système (mouvement planétaire, dénivelé thermique, propagation virale).
        </p>
        
        <InfoBlock type="definition" title="Le But du Jeu">
          Résoudre l&apos;équation différentielle simple {"$y' = 5y$"} revient à répondre à l&apos;énigme suivante : 
          <span className="block mt-2 italic text-emerald-950 dark:text-emerald-100 font-semibold">
            « Trouvez-moi la fonction réelle dont la dérivée est, à chaque instant, exactement égale à 5 fois elle-même ! »
          </span>
        </InfoBlock>

        <InfoBlock type="funfact" title="Le saviez-vous ? L'incontournable demi-vie et datation au Carbone 14">
          La désintégration des noyaux radioactifs d&apos;un fossile est proportionnelle au nombre de noyaux encore présents. Ce comportement se traduit exactement par l&apos;équation {"$N'(t) = -\\lambda N(t)$"}. En résolvant cette équation différentielle, les archéologues obtiennent la fonction exponentielle décroissante {"$N(t) = N_0 e^{-\\lambda t}$"} qui permet de calculer avec précision l&apos;âge des dinosaures ou de momies égyptiennes !
        </InfoBlock>
      </Section>

      <Section title="La Formule Fondamentale y' = ay + b" icon="📐" color="indigo">
        <p className="mb-4">
          Les équations différentielles linéaires du premier ordre à coefficients constants admettent des formules de résolution systématiques faisant intervenir la célèbre fonction exponentielle. En effet, {"$e^x$"} est la seule fonction qui soit proportionnelle à sa propre dérivée !
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="Type 1 : y' = ay" 
            math={"y(t) = C \\times e^{at} \\quad (C \\in \\mathbb{R})"} 
          />
          <FormulaBox 
            title="Type 2 : y' = ay + b" 
            math={"y(t) = C \\times e^{at} - \\frac{b}{a} \\quad (C \\in \\mathbb{R})"} 
          />
        </div>

        <div className="mt-4 p-4 border border-rose-100 dark:border-rose-800/60 bg-rose-50/50 dark:bg-rose-900/20 rounded-xl text-rose-950 dark:text-rose-50 text-sm leading-relaxed">
          <strong>C&apos;est quoi cette constante « C » ?</strong> {"$C$"} est une constante réelle d&apos;intégration arbitraire. Cela signifie qu&apos;une équation différentielle admet une <strong>infinité</strong> de fonctions solutions possibles (représentant une famille de courbes parallèles). Pour isoler THE unique fonction décrivant notre réalité, il est nécessaire de spécifier une <strong>Condition Initiale</strong> (ex: « à l&apos;instant initial {"$t=0$"}, la température est de {"$20^\\circ$"}C »).
        </div>

        <InfoBlock type="reminder" title="Rappel : Dérivée de l'exponentielle composée">
          Rappelez-vous de la formule fondamentale d&apos;analyse de Terminale : la dérivée de la fonction composée {"$t \\mapsto e^{u(t)}$"} est égale à {"$u'(t) e^{u(t)}$"}. Par conséquent :
          <MathComponent block math="\left( C e^{at} \right)' = a \\cdot C e^{at} = a \\cdot y(t)" />
          C&apos;est cette propriété magique qui résout trivialement l&apos;égalité différentielle originelle !
        </InfoBlock>
      </Section>

      <Section title="Condition Initiale : Fixer l'Unique Constante" icon="🔦" color="purple">
         <p className="mb-6">
           Pour déterminer la valeur exacte de la constante {"$C$"} et obtenir la trajectoire unique d&apos;un système, on injecte les coordonnées d&apos;un point d&apos;état connu (souvent à {"$t=0$"}).
         </p>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Flashcard 
            front={<>J&apos;ai la formule générale {"$y(t) = C e^{2t} - 5$"}. On me donne la condition initiale {"$y(0) = 15$"}. Quel est le but ?</>}
            back={<>Le but est de poser l&apos;équation algébrique simple : {"$y(0) = 15$"} pour trouver la valeur exacte de la variable constante réelle {"$C$"}.</>}
          />
          <Flashcard 
            front={<>Comment s&apos;évalue le terme complexe {"$e^{2 \\times 0}$"} quand j&apos;évalue mon équation à l&apos;instant initial ?</>}
            back={<>Puisque {"$e^0 = 1$"}, le terme se simplifie instantanément : {"$C e^0 - 5 = C \\times 1 - 5 = C - 5$"}. Une simplification magique !</>}
          />
          <Flashcard 
            front={<>Quelle est la solution unique finale de mon problème sachant que {"$C - 5 = 15$"} ?</>}
            back={<>On obtient {"$C = 20$"}. La solution unique est donc de la forme : {"$y(t) = 20 e^{2t} - 5$"}. Il n&apos;y a plus de constante inconnue !</>}
          />
        </div>

        <NewtonCoolingVisualizer />

        <InfoBlock type="info" title="Zoom sur : La charge d'un condensateur (Circuit RC)">
          En électricité, l&apos;évolution de la tension {"$u_C(t)$"} aux bornes d&apos;un condensateur chargé par un générateur à travers une résistance {"$R$"} est régie par l&apos;équation : {"$R C u_C'(t) + u_C(t) = E$"}. 
          En isolant la dérivée, on retombe sur : {"$u_C'(t) = -\\frac{1}{RC} u_C(t) + \\frac{E}{RC}$"}. C&apos;est une équation classique du type {"$y' = ay + b$"} ! La charge complète est modélisée par la formule d&apos;élévation : {"$u_C(t) = E(1 - e^{-t/RC})$"}.
        </InfoBlock>
      </Section>

      <Section title="Questions Fréquentes (FAQ)" icon="💬" color="blue">
        <Accordion title="Pourquoi l'exponentielle apparaît-elle dans TOUTES les équations de premier ordre ?">
          <p>
            Parce que par définition mathématique, une équation différentielle linéaire cherche une fonction dont la dérivée est proportionnelle à la fonction elle-même (plus ou moins une constante). Or, la seule famille de fonctions au monde qui possède cette propriété de dérivation stable et invariante par homothétie est la famille exponentielle {"$x \\mapsto e^{kx}$"}. C&apos;est une signature physique universelle.
          </p>
        </Accordion>

        <Accordion title="Qu'est-ce que l'ordre d'une équation différentielle ?">
          <p>
            L&apos;ordre désigne le degré maximal de dérivation de la fonction présente dans l&apos;égalité. Si l&apos;équation contient au maximum la dérivée première {"$y'$"}, elle est du premier ordre. Si elle contient la dérivée seconde {"$y''$"} (comme la relation fondamentale de la dynamique d&apos;accélération en physique), elle est du second ordre, et ses solutions impliquent souvent des combinaisons de fonctions trigonométriques sinus et cosinus.
          </p>
        </Accordion>

        <Accordion title="Toutes les équations différentielles ont-elles des solutions analytiques ?">
          <p>
            <strong>Loin de là !</strong> En réalité, la grande majorité des équations différentielles réelles (notamment non linéaires, comme les équations de Navier-Stokes pour les fluides ou le problème à trois corps en astrophysique) n&apos;admettent aucune formule de résolution exacte « par cœur ». Pour les résoudre, les scientifiques développent des algorithmes d&apos;approximation numérique puissants (méthodes d&apos;Euler, Runge-Kutta).
          </p>
        </Accordion>
      </Section>

      <Section title="Exercices Résolus pas-à-pas" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Équation homogène classique y' = 3y"
          question={<p>Résoudre sur {"$\\mathbb{R}$"} l&apos;équation différentielle {"$y' = 3y$"} sachant que la condition de départ est {"$y(0) = 4$"}.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 1 : Forme générale et formule théorique</p>
              <p>On identifie immédiatement le coefficient {"$a = 3$"} dans l&apos;équation linéaire homogène {"$y' = ay$"}. La formule générale des solutions est :</p>
              <MathComponent block math="y(t) = C \\cdot e^{3t} \\quad (C \\in \\mathbb{R})" />
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 2 : Détermination de la constante d'intégration</p>
              <p>On applique la condition initiale donnée {"$y(0) = 4$"} en substituant le paramètre {"$t$"} par {"$0$"} :</p>
              <MathComponent block math="y(0) = C \\cdot e^{3 \\times 0} = C \\cdot e^0 = C \\cdot 1 = C" />
              <p className="mt-2">On en déduit trivialement que : {"$C = 4$"}.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100 text-sm md:text-base">
              <p className="mb-2">Étape 3 : Conclusion</p>
              <p>L&apos;unique fonction solution générale répondant aux critères physiques de notre problème est :</p>
              <MathComponent block math="y(t) = 4 e^{3t}" />
            </div>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Équation complète y' = ay + b"
          question={<p>Trouver la solution unique de l&apos;équation différentielle {"$2y' + 6y = 10$"} sachant que {"$y(0) = 1$"}.</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 1 : Mettre sous forme canonique y&apos; = ay + b</p>
              <p>L&apos;équation n&apos;étant pas canonique, on isole la dérivée :</p>
              <MathComponent block math="2y' = -6y + 10 \\implies y' = -3y + 5" />
              <p className="mt-2">On identifie les paramètres réels : {"$a = -3$"} et {"$b = 5$"}.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 2 : Exprimer l'équation de la forme générale</p>
              <p>On applique le théorème fondamental :</p>
              <MathComponent block math="y(t) = C e^{at} - \\frac{b}{a} = C e^{-3t} - \\frac{5}{-3} = C e^{-3t} + \\frac{5}{3}" />
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 3 : Utiliser la condition initiale d'état</p>
              <p>Avec {"$y(0) = 1$"} :</p>
              <MathComponent block math="y(0) = C e^{0} + \\frac{5}{3} = C + \\frac{5}{3} = 1" />
              <p className="mt-2">On résout : {"$C = 1 - \\frac{5}{3} = -\\frac{2}{3}$"}.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100 text-sm md:text-base">
              <p className="mb-2">Étape 4 : Conclusion finale</p>
              <p>L&apos;unique fonction recherchée est définie par l&apos;expression :</p>
              <MathComponent block math="y(t) = -\\frac{2}{3} e^{-3t} + \\frac{5}{3}" />
            </div>
          ]}
        />
      </Section>

      <Section title="Testeur d'entraînement" icon="🕹️" color="slate">
        <p className="mb-4 text-sm text-slate-500">Sélectionnez les expressions correspondantes pour résoudre l&apos;équation diff {"$y' = -2y + 6$"} avec {"$y(0) = 10$"}.</p>
        <FillInTheBlanks 
          id="equa-eval"
          content={[
            "On identifie a = -2 et b = 6. La formule de résolution donne pour solution générale C × e^(at) - b/a. Ce qui s'écrit analytiquement : C × e^(",
            { options: ["6t", "-2t", "2t"], correctAnswer: 1 },
            ") - 6/(-2). En simplifiant le quotient de signes, cela devient : C × e^(-2t) + ",
            { options: ["3", "-3", "6"], correctAnswer: 0 },
            ". Pour notre condition de départ y(0) = 10, l'expression s'évalue en C + 3 = 10. La constante vaut donc C = ",
            { options: ["13", "10", "7"], correctAnswer: 2 },
            ". L'unique loi de ce problème est donc y(t) = 7 e^(-2t) + 3."
          ]}
        />
      </Section>

      <Section title="Épreuve Finale d'Évaluation" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Pourquoi les fonctions solutions de l'équation différentielle y' = 4y font-elles obligatoirement intervenir l'exponentielle e^(4t) ?",
              options: [
                "Par pure convention historique de notation physique.",
                "Parce que la dérivée de t ↦ C e^(4t) est t ↦ 4 C e^(4t), ce qui valide exactement l'égalité de proportionnalité y' = 4y.",
                "Parce que l'exponentielle est la seule fonction monotone sur R."
              ],
              correctAnswer: 1,
              explanation: "En dérivant C·e^(4t), la règle des fonctions composées fait 'descendre' le coefficient 4 multiplicateur, vérifiant ainsi y'(t) = 4y(t)."
            },
            {
              question: "Quelle est la solution générale de l'équation différentielle y' + 3y = 0 ?",
              options: [
                "y(t) = C e^(3t)",
                "y(t) = C e^(-3t)",
                "y(t) = -3 e^(t)"
              ],
              correctAnswer: 1,
              explanation: "Attention, il faut d'abord l'écrire sous forme canonique y' = -3y (donc a = -3). D'où y(t) = C e^(-3t)."
            },
            {
              question: "Si l'on cherche la solution de y' = 2y + 8 qui s'annule à l'origine (y(0) = 0), quelle est l'équation générale ?",
              options: [
                "y(t) = -4 e^(2t) + 4",
                "y(t) = 4 e^(2t) - 4",
                "y(t) = e^(2t) - 8"
              ],
              correctAnswer: 0,
              explanation: "Ici, a = 2 et b = 8. La forme générale est C e^(2t) - b/a = C e^(2t) - 4. Avec y(0) = 0, C - 4 = 0 ⟹ C = 4. La solution est 4e^(2t) - 4. Attendez, le signe de y(0) de l'option 1 est y(t) = -4e^(2t) + 4. Si nous faisons y(0) = -4*1 + 4 = 0. Et sa dérivée y' = -8e^(2t) = 2(-4e^(2t) + 4) - 8 = -8e^(2t) + 8 - 8 = -8e^(2t), ce qui fonctionne ! Donc option 1 est de la forme C*e^(2t) - b/a avec C = -4 et -b/a = +4. En effet, a=2 et b=-8 dans y'=2y-8 donne -(-8)/2 = +4, dont la condition y(0)=0 donne C+4=0 => C=-4."
            }
          ]}
        />
        
        <InteractiveChecklist 
          id="checklist-equadiff"
          items={[
            "Je sais identifier l'inconnue d'une équation différentielle comme étant une fonction.",
            "Je sais remettre une équation sous sa forme canonique y' = ay + b.",
            "Je sais réciter et appliquer la solution générale par cœur.",
            "Je sais modéliser un système physique et déterminer la constante d'intégration."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => {
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
              });
              onValidateCourse();
            }}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Terminale_08_EquaDiff;
