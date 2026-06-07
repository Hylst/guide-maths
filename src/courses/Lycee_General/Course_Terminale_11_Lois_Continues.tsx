import React, { useState, useEffect } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, FormulaBox, Accordion, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import confetti from 'canvas-confetti';

const UniformVisualizer: React.FC = () => {
  const [lower, setLower] = useState<number>(100);
  const [upper, setUpper] = useState<number>(115);

  const minVal = 90;
  const maxVal = 120;
  const totalRange = maxVal - minVal;

  const handleLowerChange = (val: number) => {
    setLower(Math.min(val, upper - 1));
  };

  const handleUpperChange = (val: number) => {
    setUpper(Math.max(val, lower + 1));
  };

  const currentProbability = (upper - lower) / totalRange;

  return (
    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 my-8 shadow-sm">
      <h3 className="text-lg md:text-xl font-bold mb-4 text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <span>📊</span> Schéma Pédagogique Interactif : Densité de la Loi Uniforme {"$[90; 120]$"}
      </h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
        Fais glisser les curseurs ci-dessous pour modifier l'intervalle {"$[u; v]$"} et observer l'aire colorée (la probabilité) correspondante sous la courbe de densité {"$f(x) = \\frac{1}{30}$"}.
      </p>

      {/* SVG Canvas */}
      <div className="w-full h-48 bg-slate-50 dark:bg-slate-900/40 rounded-2xl flex items-center justify-center p-4 relative border border-slate-100 dark:border-slate-800/80">
        <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
          {/* Grille et axes */}
          <line x1="40" y1="120" x2="360" y2="120" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="20" x2="40" y2="130" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

          {/* Graduations axes */}
          <text x="35" y="125" className="text-[10px] fill-slate-400 font-mono text-right" textAnchor="end">0</text>
          <text x="35" y="55" className="text-[10px] fill-slate-400 font-mono text-right" textAnchor="end">1/30</text>

          <line x1="37" y1="50" x2="43" y2="50" stroke="#cbd5e1" strokeWidth="1.5" />
          
          <line x1="90" y1="117" x2="90" y2="123" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="90" y="137" className="text-[10px] fill-slate-400 font-mono text-middle" textAnchor="middle">90</text>

          <line x1="330" y1="117" x2="330" y2="123" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="330" y="137" className="text-[10px] fill-slate-400 font-mono text-middle" textAnchor="middle">120</text>

          {/* Aire totale en pointillés légers */}
          <rect x="90" y="50" width="240" height="70" fill="currentColor" className="text-slate-200/40 dark:text-slate-800/20" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Aire d'intervalle sélectionné [u, v] */}
          {/* u_x_svg = 90 + (lower - 90) * 8 */}
          {/* v_x_svg = 90 + (upper - 90) * 8 */}
          <rect 
            x={90 + (lower - 90) * 8} 
            y="50" 
            width={(upper - lower) * 8} 
            height="70" 
            fill="currentColor" 
            className="text-indigo-500/20 dark:text-indigo-400/20" 
            stroke="#6366f1" 
            strokeWidth="2" 
          />

          {/* Ligne f(x) = 1/30 */}
          <line x1="90" y1="50" x2="330" y2="50" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />

          {/* Texte de l'intervalle dynamique */}
          <text x={90 + (lower - 90) * 8 + ((upper - lower) * 8) / 2} y="85" className="text-[11px] font-bold fill-indigo-600 dark:fill-indigo-400 text-middle" textAnchor="middle">
            {`P(${lower} ≤ X ≤ ${upper})`}
          </text>

          {/* Graduations dynamiques u et v */}
          <line x1={90 + (lower - 90) * 8} y1="120" x2={90 + (lower - 90) * 8} y2="126" stroke="#6366f1" strokeWidth="1.5" />
          <text x={90 + (lower - 90) * 8} y="148" className="text-[10px] font-bold fill-indigo-600 dark:fill-indigo-400 text-middle" textAnchor="middle">
            {`u = ${lower}`}
          </text>

          <line x1={90 + (upper - 90) * 8} y1="120" x2={90 + (upper - 90) * 8} y2="126" stroke="#6366f1" strokeWidth="1.5" />
          <text x={90 + (upper - 90) * 8} y="148" className="text-[10px] font-bold fill-indigo-600 dark:fill-indigo-400 text-middle" textAnchor="middle">
            {`v = ${upper}`}
          </text>
        </svg>
      </div>

      {/* Sliders d'interaction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
            <span>Borne inférieure u</span>
            <span className="text-indigo-600 font-mono">{lower} min</span>
          </div>
          <input 
            type="range"
            min={minVal}
            max={maxVal - 1}
            value={lower}
            onChange={(e) => handleLowerChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex justify-between">
            <span>Borne supérieure v</span>
            <span className="text-indigo-600 font-mono">{upper} min</span>
          </div>
          <input 
            type="range"
            min={minVal + 1}
            max={maxVal}
            value={upper}
            onChange={(e) => handleUpperChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      {/* Résultat statistique dynamique */}
      <div className="mt-8 p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-indigo-950 dark:text-indigo-100 font-medium">
          Calcul dynamique : <MathComponent math="P(u \le X \le v) = \frac{v - u}{b-a}" />
        </div>
        <div className="bg-indigo-600 text-white rounded-xl px-4 py-2 text-sm md:text-base font-bold shadow-md shadow-indigo-600/10 flex items-center gap-2">
          <span>{`P(${lower} ≤ X ≤ ${upper}) =`}</span>
          <MathComponent math={`\\frac{${upper - lower}}{30} \\approx ${(currentProbability * 100).toFixed(1)}\\%`} />
        </div>
      </div>
    </div>
  );
};

const Course_Terminale_11_Lois_Continues: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [checklistFinished, setChecklistFinished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('MATH_T_CONT_completed');
    if (saved === 'true') {
      setChecklistFinished(true);
    }
  }, []);

  const handleChecklistComplete = () => {
    setChecklistFinished(true);
    localStorage.setItem('MATH_T_CONT_completed', 'true');
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
    onValidateCourse();
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-T-CONT"
        title="Probabilités & Lois Continues"
        subtitle="Quand le temps devient infini : de la densité de probabilité à la Loi Uniforme."
        duration="40 min"
        level="Terminale Générale (Spécialité)"
        prerequisites={["Intégrales et Primitives", "Calcul de Probabilités Discrètes"]}
        objectives={[
          "Comprendre la transition fondamentale entre univers discret et univers continu.",
          "Maîtriser les propriétés physiques et mathématiques d'une densité de probabilité.",
          "Calculer des probabilités de type intervalle et modéliser via la Loi Uniforme.",
          "Calculer et interpréter l'Espérance d'une variable aléatoire à densité."
        ]}
      />

      <Section title="Introduction : Du Discret au Continu" icon="🌦️" color="emerald">
        <p>
          Lancer un dé, c&apos;est <strong>Discret</strong> (1, 2, 3... il y a des « trous » entre les nombres). Mais attendre le bus ou un coup de téléphone, le temps d&apos;attente {"$T$"} peut prendre n&apos;importe quelle valeur de l&apos;intervalle réel (1.2 sec, 1.2003 sec, {"$\\pi$"} sec). C&apos;est le monde <strong>Continu</strong>.
        </p>
        <p className="mt-2">
          Dans le monde continu, la probabilité d&apos;obtenir <strong>exactement</strong> une valeur ultra-précise (par exemple attendre pile <MathComponent math="1.23456743..." /> secondes) est égale à 0. C&apos;est tellement précis que c&apos;est impossible ! Avec les lois continues, on ne calcule plus la probabilité d&apos;un « point », mais la probabilité d&apos;un <strong>INTERVALLE</strong> (ex: « attendre entre 1 et 2 secondes »).
        </p>
        
        <InfoBlock type="definition" title="La Règle d'Or">
          Une probabilité devient alors modélisée par l&apos;<strong>Aire Sous Une Courbe</strong> (l&apos;intégrale) d&apos;une fonction spéciale appelée <strong>Fonction de Densité de Probabilité</strong>.
        </InfoBlock>

        <InfoBlock type="funfact" title="Le saviez-vous ? Le paradoxe du temps continu">
          Si la probabilité d&apos;attendre EXACTEMENT 15 minutes à votre arrêt de bus est statistiquement de {"$0$"}, comment se fait-il que vous finissiez toujours par prendre un bus après un temps précis d&apos;attente ? C&apos;est le célèbre paradoxe de la mesure : l&apos;ensemble infini de points de mesure nulle s&apos;agrège par intégration pour former un intervalle d&apos;aire (et donc de probabilité) non nulle !
        </InfoBlock>
      </Section>

      <Section title="La Fonction de Densité (Le Parapluie de l'Univers)" icon="☂️" color="indigo">
        <p className="mb-4">
          Une fonction {"$f$"} définie sur un intervalle {"$I$"} est une densité de probabilité si elle remplit trois conditions absolues :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaBox 
            title="1. Positivité" 
            math={"f(x) \\ge 0"} 
          />
          <FormulaBox 
            title="2. Totale (L'univers)" 
            math={"\\int_{I} f(x) dx = 1"} 
          />
        </div>

        <div className="mt-4 p-4 border border-indigo-100 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl text-indigo-950 dark:text-indigo-50 text-sm leading-relaxed">
          <strong>3. Continuité :</strong> La fonction doit être continue par morceaux (au lycée, elle est continue sauf éventuellement en quelques points isolés). L&apos;intégrale sur tout l&apos;intervalle vaut {"$1$"}, représentant 100% de notre univers probabiliste.
        </div>

        <InfoBlock type="reminder" title="Rappel : Primitives et calcul d'aires">
          Pour calculer la probabilité que notre variable aléatoire {"$X$"} appartienne à un intervalle {"$[c; d]$"}, on calcule l&apos;intégrale de la densité {"$f$"} entre {"$c$"} et {"$d$"}, en utilisant sa primitive {"$F$"} :
          <MathComponent block math="P(c \le X \le d) = \int_{c}^{d} f(x) dx = F(d) - F(c)" />
        </InfoBlock>
      </Section>

      <Section title="La Loi Uniforme sur [a; b]" icon="🔦" color="purple">
         <p className="mb-6">
           La <strong>Loi Uniforme</strong> est la loi continue la plus simple. Elle modélise une situation où toutes les valeurs d&apos;un intervalle ont la même « chance » d&apos;apparaître (« aucun favoritisme »). Sa densité de probabilité est constante.
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Flashcard 
            front={<>Quelle est l&apos;équation de la fonction de densité d&apos;une <strong>Loi Uniforme</strong> sur {"$[a; b]$"} ?</>}
            back={<>La densité est constante et vaut : {"$f(x) = \\frac{1}{b-a}$"}. Ainsi, l&apos;intégrale totale sur {"$[a; b]$"} forme un rectangle d&apos;aire égale à {"$1$"}.</>}
          />
          <Flashcard 
            front={<>Quelle est la formule générale de l&apos;<strong>Espérance</strong> d&apos;une Loi Uniforme sur {"$[a; b]$"} ?</>}
            back={<>L&apos;Espérance (la moyenne statistique attendue) se situe pile au milieu de l&apos;intervalle : {"$E(X) = \\frac{a+b}{2}$"}.</>}
          />
        </div>

        <UniformVisualizer />

        <InfoBlock type="info" title="Zoom sur : La Loi Exponentielle en fiabilité industrielle">
          Contrairement à la Loi Uniforme qui n&apos;a aucun favoritisme, d&apos;autres lois continues modélisent le vieillissement ou l&apos;attente. C&apos;est le cas de la <strong>Loi Exponentielle</strong> de paramètre {"$\\lambda > 0$"}, dont la densité s&apos;écrit {"$f(x) = \\lambda e^{-\\lambda x}$"} pour {"$x \\ge 0$"}. Elle est qualifiée de « loi sans mémoire » : elle modélise parfaitement la durée de vie des composants électroniques ou la désintégration radioactive !
        </InfoBlock>
      </Section>

      <Section title="Questions Fréquentes (FAQ)" icon="💬" color="blue">
        <Accordion title="Est-ce que P(X = c) = 0 signifie que l'événement est impossible ?">
          <p>
            <strong>Pas tout à fait !</strong> C&apos;est l&apos;un des aspects les plus déroutants de l&apos;infini continu. L&apos;événement se produit (puisque la variable aléatoire prendra bien une valeur réelle), mais la probabilité de concevoir <i>exactement</i> cette valeur de manière absolue est d&apos;une chance sur l&apos;infini, soit localement nulle. En probabiliste, on dit qu&apos;un événement individuel a une probabilité nulle mais peut quand même survenir.
          </p>
        </Accordion>

        <Accordion title="Pourquoi la densité f(x) peut-elle être supérieure à 1 ?">
          <p>
            Contrairement à une probabilité discrète qui est toujours bornée par {"$1$"}, la valeur de la densité {"$f(x)$"} peut être arbitrairement grande ! La seule contrainte absolue est que l&apos;<strong>intégrale totale (l&apos;aire globale sous la courbe)</strong> soit égale à {"$1$"}. Par exemple, pour une loi uniforme sur {"$[0; 0.1]$"}, la densité vaut {"$f(x) = \\frac{1}{0.1 - 0} = 10$"}, mais l&apos;aire (la largeur {"$0.1$"} multipliée par la hauteur {"$10$"}) fait bien {"$1$"}.
          </p>
        </Accordion>

        <Accordion title="Comment démontre-t-on la formule de l'Espérance en continu ?">
          <p>
            En discret, l&apos;espérance est la somme pondérée {"$\\sum x_i p_i$"}. En continu, la somme devient une intégrale pondérée par la densité :
            <MathComponent block math="E(X) = \int_{a}^{b} x f(x) dx" />
            Pour la loi uniforme, en sortant la constante {"$\\frac{1}{b-a}$"}, on obtient la primitive simple :
            <MathComponent block math="\int_{a}^{b} x dx = \left[ \frac{x^2}{2} \right]_{a}^{b} = \frac{b^2 - a^2}{2} = \frac{(b-a)(b+a)}{2}" />
            En divisant par {"$(b-a)$"}, les termes se simplifient pour donner la formule canonique : {"$E(X) = \\frac{a+b}{2}$"}.
          </p>
        </Accordion>
      </Section>

      <Section title="Exercices Résolus pas-à-pas" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul de probabilité uniforme"
          question={<p>La durée d&apos;un film varie entre 90 et 120 minutes selon une loi uniforme. Quelle est la probabilité que le film dure exactement entre 100 et 110 minutes ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 1 : Analyser l&apos;intervalle total</p>
              <p>L&apos;intervalle total de notre loi est {"$[90; 120]$"}. La largeur totale (l&apos;univers) est de :</p>
              <MathComponent block math="b - a = 120 - 90 = 30 \text{ minutes}" />
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 2 : Analyser l&apos;intervalle cible</p>
              <p>On cherche la probabilité d&apos;être compris dans {"$[100; 110]$"}. La largeur cible est :</p>
              <MathComponent block math="d - c = 110 - 100 = 10 \text{ minutes}" />
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100 text-sm md:text-base">
              <p className="mb-2">Étape 3 : Application de la formule et conclusion</p>
              <MathComponent block math="P(100 \le X \le 110) = \frac{d - c}{b - a} = \frac{10}{30} = \frac{1}{3} \approx 33.3\%" />
              <p className="mt-2 text-xs font-normal">Il y a donc exactement un tiers de chance que le film dure entre 100 et 110 minutes.</p>
            </div>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : La notion de Densité Vraie"
          question={<p>Soit une fonction constante <MathComponent math="f(x) = k" /> définie sur l&apos;intervalle {"$[0; 5]$"}. Quelle doit être la valeur de la constante réelle {"$k$"} pour que {"$f$"} soit une véritable fonction de densité ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 1 : Le Théorème Fondamental d&apos;Intégration d&apos;une densité</p>
              <p>L&apos;aire totale sous la courbe d&apos;une fonction de densité sur son intervalle de définition {"$I = [0; 5]$"} doit impérativement être égale à {"$1$"} :</p>
              <MathComponent block math="\int_{0}^{5} f(x) dx = 1" />
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60 text-sm md:text-base">
              <p className="font-bold text-amber-900 dark:text-amber-100 mb-2">Étape 2 : Calculer l&apos;aire du rectangle plat</p>
              <p>La courbe est un rectangle de largeur 5 (de 0 à 5) et de hauteur {"$k$"}. L&apos;intégrale se calcule ainsi :</p>
              <MathComponent block math="\int_{0}^{5} k dx = [k x]_{0}^{5} = 5k" />
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100 text-sm md:text-base">
              <p className="mb-2">Étape 3 : Résoudre l&apos;équation</p>
              <p>On résout l&apos;égalité :</p>
              <MathComponent block math="5k = 1 \implies k = \frac{1}{5} = 0.2" />
              <p className="mt-2 text-xs font-normal">Ainsi, la constante {"$k$"} doit valoir {"$0.2$"}. C&apos;est l&apos;expression d&apos;une densité uniforme sur {"$[0; 5]$"}.</p>
            </div>
          ]}
        />
      </Section>

      <Section title="Test d'entraînement rapide" icon="🕹️" color="slate">
        <p className="mb-4 text-sm text-slate-500">Choisissez les bonnes options pour compléter le texte de l&apos;évaluation.</p>
        <FillInTheBlanks 
          id="cont-eval"
          content={[
            "Mon bus passe entre 8h et 8h30 (largeur de 30 minutes). Le temps d'attente suit une loi Uniforme sur [0; 30]. Je veux connaître la probabilité d'attendre entre 10 et 20 minutes. La largeur de cet intervalle est de 10 min. La probabilité est de ",
            { options: ["1/3", "2/3", "1/2"], correctAnswer: 0 },
            ". Et la probabilité d'attendre EXACTEMENT 15 minutes ? Elle vaut ",
            { options: ["0", "1/30", "15/30"], correctAnswer: 0 },
            " ! Car l'intégrale sur un point unique est nulle : P(X = a) = 0."
          ]}
        />
      </Section>

      <Section title="Épreuve Finale d'Évaluation" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si X suit une loi de densité f sur [a; b], que vaut la probabilité de l'événement P(X ≤ c) pour c compris dans l'intervalle ?",
              options: [
                "L'intégrale de f entre a et c.",
                "F(c) si la primitive F s'annule en a.",
                "Les deux propositions sont correctes."
              ],
              correctAnswer: 2,
              explanation: "Par définition, l'integrale de f entre a et c s'évalue par F(c) - F(a). Si F(a) = 0, alors P(X ≤ c) = F(c)."
            },
            {
              question: "Pour une Loi Uniforme sur [10; 50], quelle est l'Espérance mathématique E(X) ?",
              options: [
                "20",
                "30",
                "40"
              ],
              correctAnswer: 1,
              explanation: "On fait la moyenne arithmétique simple des bornes de l'intervalle : (10 + 50) / 2 = 60 / 2 = 30."
            },
            {
              question: "Laquelle de ces propositions décrit une propriété obligatoire pour qu'une fonction soit qualifiée de densité de probabilité ?",
              options: [
                "La fonction doit être croissante sur son intervalle.",
                "La fonction doit être positive et son intégrale totale sur son intervalle de définition doit être égale à 1.",
                "La fonction ne peut jamais dépasser la valeur maximale de 1."
              ],
              correctAnswer: 1,
              explanation: "Une fonction de densité doit impérativement être positive ou nulle sur son intervalle, de continuité suffisante, et d'intégrale globale valant 1 (100% de l'univers probabiliste)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          id="checklist-continuous"
          items={[
            "Je sais distinguer un cas probabiliste discret d'un cas réel continu.",
            "Je connais les 3 propriétés qui caractérisent une densité de probabilité.",
            "Je sais calculer une probabilité de type intervalle pour une loi uniforme.",
            "Je sais appliquer et interpréter la formule de l'Espérance d'une loi uniforme."
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

export default Course_Terminale_11_Lois_Continues;
