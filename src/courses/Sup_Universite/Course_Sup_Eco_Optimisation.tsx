import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  FormulaBox, InteractiveExercise, Flashcard, Accordion
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";

const Course_Sup_Eco_Optimisation: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [R, setR] = useState(120); // Revenu ajustable par slider
  const px = 4; // Prix de x fixe
  const py = 6; // Prix de y fixe
  const alpha = 0.5; // Exposant x, Cobb-Douglas symétrique
  const beta = 0.5; // Exposant y, Cobb-Douglas symétrique

  // Calcul du panier d'équilibre x* et y*
  // x* = alpha * R / px
  // y* = beta * R / py
  const xOpt = (alpha * R) / px;
  const yOpt = (beta * R) / py;
  const uOpt = Math.pow(xOpt, alpha) * Math.pow(yOpt, beta);

  // Pour tracer l'indifférence U(x, y) = uOpt => y = (uOpt / x^alpha)^(1/beta) = uOpt^2 / x (puisque alpha=beta=0.5)
  const pointsIndiff: string[] = [];
  const startX = 3;
  const endX = 40;
  const scaleX = 8;
  const scaleY = 8;
  const originX = 50;
  const originY = 320;

  for (let xi = startX; xi <= endX; xi += 0.5) {
    const yi = Math.pow(uOpt, 1 / beta) / Math.pow(xi, alpha / beta);
    if (yi <= 40) {
      const graphX = originX + xi * scaleX;
      const graphY = originY - yi * scaleY;
      pointsIndiff.push(`${graphX},${graphY}`);
    }
  }

  // Ligne de budget p_x * x + p_y * y = R
  // Intersections : xMax = R/px , yMax = R/py
  const xMax = R / px;
  const yMax = R / py;
  const budgetX1 = originX;
  const budgetY1 = originY - yMax * scaleY;
  const budgetX2 = originX + xMax * scaleX;
  const budgetY2 = originY;

  // Optimum point coords
  const optXGraph = originX + xOpt * scaleX;
  const optYGraph = originY - yOpt * scaleY;

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-SUP-ECO"
        title="Sup Économie : Microéconomie et Optimisation"
        subtitle="Maximisation sous contrainte de la consommation et du profit : multiplicateurs de Lagrange, TMS et équilibres de marché."
        duration="2h 15"
        level="École supérieure de Commerce / Université de Sciences Économiques"
        prerequisites={["Dérivées partielles", "Gradients", "Calcul matriciel"]}
        objectives={[
          "Formuler analytiquement un programme d'optimisation classique de consommateur.",
          "Comprendre le rôle économique du multiplicateur de Lagrange λ.",
          "Dériver la loi de l'égalisation des utilités marginales pondérées par les prix.",
          "Résoudre graphiquement et algébriquement des optima intérieurs."
        ]}
      />

      <Section title="🎯 Le Problème du Consommateur Rationnel" icon="Target" color="indigo">
        <p className="mb-4">
          En microéconomie quantitative, le consommateur cherche à maximiser son bien-être individuel, exprimé sous la forme d'une fonction mathématique d'<strong>utilité subjective</strong> <MathComponent math="U(x, y)" />, tout en faisant face à une barrière réelle incontournable : son budget limité <MathComponent math="R" />.
        </p>
        <p className="mb-4">
          Le panier de biens idéal est représenté par les quantités respectives de deux biens matériels, <MathComponent math="x" /> et <MathComponent math="y" />. Si ces biens s'échangent sur le marché aux prix nominaux respectifs <MathComponent math="p_x" /> et <MathComponent math="p_y" />, le programme s'écrit de la manière suivante :
        </p>

        <FormulaBox 
          title="Programme d'Optimisation" 
          math="\max_{x, y} \ U(x, y) \quad \text{sous contrainte} \quad p_x \cdot x + p_y \cdot y \le R" 
        />

        <InfoBlock type="definition" title="La Fonction d'Utilité Cobb-Douglas">
          La spécification la plus utilisée en microéconomie théorique est la Cobb-Douglas :
          <MathComponent block math="U(x, y) = x^\alpha \cdot y^\beta \quad (\alpha > 0, \beta > 0)" />
          Les exposants <MathComponent math="\alpha" /> et <MathComponent math="\beta" /> mesurent l'intensité relative des goûts de l'individu pour chacun des biens.
        </InfoBlock>
      </Section>

      <Section title="⚖️ Simulateur Interactif des Courbes d'Indifférence" icon="Sliders" color="emerald">
        <p className="mb-4">
          Utilisez le slider pour faire varier le budget disponible <MathComponent math="R" />. Observez l'expansion de la droite budgétaire (en orange) et le glissement du point d'optimum <MathComponent math="(x^*, y^*)" /> à la tangence avec la courbe d'utilité stable (en bleu). Les prix des biens sont ici fixés à <MathComponent math="p_x = 4" />€ et <MathComponent math="p_y = 6" />€.
        </p>

        {/* Panel de contrôle budgétaire */}
        <div className="bg-slate-950 text-white p-5 rounded-3xl mb-8 shadow-inner border border-slate-800">
          <label className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
            Budget Mensuel du Consommateur (R) : {R} €
          </label>
          <input 
            type="range" min="60" max="240" step="10" value={R} 
            onChange={(e) => setR(parseInt(e.target.value))}
            className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
        </div>

        {/* Graphique SVG des droites et courbes */}
        <div className="flex justify-center bg-card p-4 rounded-3xl border border-border shadow-md">
          <svg viewBox="0 0 450 350" className="w-full max-w-[420px] font-sans">
            {/* Axes */}
            <line x1="50" y1="320" x2="420" y2="320" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="320" stroke="#cbd5e1" strokeWidth="2" />

            {/* Droite budgétaire */}
            <line 
              x1={budgetX1} y1={budgetY1} 
              x2={budgetX2} y2={budgetY2} 
              stroke="#f97316" 
              strokeWidth="3" 
            />

            {/* Courbe d'indifférence optimale tangentielle */}
            <path 
              d={`M ${pointsIndiff.join(' L ')}`} 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="3" 
            />

            {/* Point optimal */}
            <circle cx={optXGraph} cy={optYGraph} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />

            {/* Projections du point optimal */}
            <line x1={optXGraph} y1={optYGraph} x2={optXGraph} y2="320" stroke="#ef4444" strokeDasharray="3 3" />
            <line x1={optXGraph} y1={optYGraph} x2="50" y2={optYGraph} stroke="#ef4444" strokeDasharray="3 3" />

            {/* Labels */}
            <text x="400" y="342" className="text-xs fill-slate-500 font-bold">Bien x</text>
            <text x="12" y="35" className="text-xs fill-slate-500 font-bold">Bien y</text>
            <text x={optXGraph - 15} y="338" className="text-xs fill-slate-800 font-bold">{"x*"}</text>
            <text x="25" y={optYGraph + 4} className="text-xs fill-slate-800 font-bold">{"y*"}</text>
            <text x="310" y="70" className="text-xs fill-blue-500 font-bold">{"U(x,y) = C"}</text>
            <text x={budgetX2 - 45} y={budgetY2 - 25} className="text-xs fill-orange-500 font-bold" transform={`rotate(-33, ${budgetX2}, ${budgetY2})`}>{"Budget"}</text>
          </svg>
        </div>

        {/* Métriques */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-sm font-bold">
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Demande Optimale x*</p>
            <p className="text-xl text-indigo-700 dark:text-indigo-300 mt-1">{xOpt.toFixed(2)} pièces</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Demande Optimale y*</p>
            <p className="text-xl text-emerald-700 dark:text-emerald-300 mt-1">{yOpt.toFixed(2)} pièces</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100 dark:border-scale-900">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Niveau d'Utilité (U)</p>
            <p className="text-xl text-blue-700 dark:text-blue-300 mt-1">{uOpt.toFixed(2)} utils</p>
          </div>
        </div>
      </Section>

      <Section title="📈 Taux Marginal de Substitution et Fonction de Lagrange" icon="TrendingUp" color="rose">
        <p className="mb-4">
          La résolution analytique de ce problème repose sur deux approches conceptuelles d'une immense élégance mathématique.
        </p>

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">1. La condition de tangence géométrique (TMS)</h3>
        <p className="mb-4">
          Le <strong>Taux Marginal de Substitution (TMS)</strong> de <MathComponent math="y" /> vers <MathComponent math="x" /> représente la quantité additionnelle de bien <MathComponent math="y" /> exigée par un consommateur pour tolérer la perte d'une unité de bien <MathComponent math="x" />, à niveau d'utilité constant. 
          Il équivaut au rapport des utilités marginales :
          <MathComponent block math="TMS_{x \to y} = \frac{Um_x}{Um_y} = \frac{\partial U / \partial x}{\partial U / \partial y}" />
        </p>
        <p className="mb-4">
          À l'optimum, le taux de conversion subjectif du consommateur (la pente de la courbe d'indifférence) doit correspondre à la possibilité de conversion objective offerte par le marché (le rapport des prix nominaux <MathComponent math="p_x/p_y" />).
        </p>
        <FormulaBox 
          title="Équation Fondamentale du TMS d'Écrit" 
          math="TMS_{x \to y} = \frac{p_x}{p_y}" 
        />

        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">2. L'Approche du Lagrangien</h3>
        <p className="mb-4">
          Pour une résolution généralisée avec contrainte d'égalité stricte à l'optimum, on formule une fonction virtuelle artificielle de Lagrange <MathComponent math="\mathcal{L}" />, qui intègre la contrainte budgétaire pénalisée par une variable de commande <MathComponent math="\lambda" /> (multiplicateur de Lagrange) :
          <MathComponent block math="\mathcal{L}(x, y, \lambda) = U(x, y) + \lambda \cdot (R - p_x x - p_y y)" />
        </p>
        <p className="mb-4">
          Les conditions nécessaires du premier ordre (CPO) s'obtiennent en annulant le gradient multidimensionnel de <MathComponent math="\mathcal{L}" /> :
          <MathComponent block math="\frac{\partial \mathcal{L}}{\partial x} = Um_x - \lambda p_x = 0 \implies Um_x = \lambda p_x" />
          <MathComponent block math="\frac{\partial \mathcal{L}}{\partial y} = Um_y - \lambda p_y = 0 \implies Um_y = \lambda p_y" />
          <MathComponent block math="\frac{\partial \mathcal{L}}{\partial \lambda} = R - p_x x - p_y y = 0 \implies p_x x + p_y y = R" />
        </p>

        <InfoBlock type="warning" title="Le rôle mathématique de lambda">
          En divisant la première équation par la seconde, nous retrouvons directement le TMS : <MathComponent math="Um_x / Um_y = p_x / p_y" />. 
          De plus, le multiplicateur <MathComponent math="\lambda" /> a une interprétation cruciale : il est l'<strong>utilité marginale du revenu</strong> (<MathComponent math="\lambda = \partial U^* / \partial R" />). Il exprime la quantité d'utilité que procurerait un euro additionnel de budget.
        </InfoBlock>
      </Section>

      <Section title="💎 Études de Cas Cliniques : Exercices Corrigés" icon="BookOpen" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Calcul analytique de la demande Cobb-Douglas"
          question={<p>Un étudiant dispose d'une utilité {"$U(x, y) = x^{0.4} y^{0.6}$"}. Les prix sont de <MathComponent math="p_x" /> et <MathComponent math="p_y" /> pour un budget total de <MathComponent math="R" />. Déterminer l'équation de demande générale de <MathComponent math="x" /> et <MathComponent math="y" /> en fonction de ces paramètres de marché.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Calculer les utilités marginales et le TMS</p>
              <p>On dérive <MathComponent math="U" /> par rapport à <MathComponent math="x" /> et <MathComponent math="y" /> :</p>
              <p><MathComponent block math="Um_x = \frac{\partial U}{\partial x} = 0.4 \cdot x^{-0.6} y^{0.6} \quad \text{et} \quad Um_y = \frac{\partial U}{\partial y} = 0.6 \cdot x^{0.4} y^{-0.4}" /></p>
              <p>On exprime le TMS :</p>
              <p><MathComponent block math="TMS = \frac{Um_x}{Um_y} = \frac{0.4 \cdot x^{-0.6} y^{0.6}}{0.6 \cdot x^{0.4} y^{-0.4}} = \frac{0.4}{0.6} \cdot \frac{y}{x} = \frac{2}{3} \cdot \frac{y}{x}" /></p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Égaliser le TMS au ratio des prix nominaux</p>
              <p>La règle d'or exige :</p>
              <p><MathComponent block math="TMS = \frac{p_x}{p_y} \implies \frac{2}{3} \cdot \frac{y}{x} = \frac{p_x}{p_y} \implies y = \frac{3}{2} \cdot \frac{p_x \cdot x}{p_y}" /></p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Substituer dans la contrainte et conclure</p>
              <p>Remplaçons ce résultat dans la relation budgétaire <MathComponent math="p_x x + p_y y = R" /> :</p>
              <p><MathComponent block math="p_x \cdot x + p_y \left(\frac{3}{2} \frac{p_x \cdot x}{p_y}\right) = p_x \cdot x + 1.5 \cdot p_x \cdot x = 2.5 \cdot p_x \cdot x = R" /></p>
              <p>D'où les fonctions de demande parfaites :</p>
              <p><MathComponent block math="x^* = \frac{R}{2.5 \cdot p_x} = 0.4 \cdot \frac{R}{p_x} \quad \text{et} \quad y^* = 0.6 \cdot \frac{R}{p_y}" /></p>
              <p>C'est la splendide propriété du modèle Cobb-Douglas : la proportion constante du budget épargné/alloué à chaque bien équivaut exactement à son exposant !</p>
            </div>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Maximisation du profit d'un producteur"
          question={<p>Une entreprise industrielle produit un bien <MathComponent math="q" /> avec une fonction Cobb-Douglas de facteurs capital <MathComponent math="K" /> et travail <MathComponent math="L" /> : <MathComponent math="q = F(K, L) = K^{0.5} L^{0.5}" />. Le coût d'utilisation du capital est <MathComponent math="r=10" />€, le salaire horaire est <MathComponent math="w=15" />€. L'entreprise veut produire <MathComponent math="q_0 = 30" /> unités au coût le plus bas. Résoudre l'optimum technique d'efficacité.</p>}
          steps={[
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 1 : Définir la contrainte et le TMST</p>
              <p>Pour le producteur, on étudie le <strong>Taux Marginal de Substitution Technique (TMST)</strong> qui compare les productivités marginales de K et L :</p>
              <p><MathComponent block math="TMST = \frac{Pm_L}{Pm_K} = \frac{\partial F / \partial L}{\partial F / \partial K} = \frac{0.5 K^{0.5} L^{-0.5}}{0.5 K^{-0.5} L^{0.5}} = \frac{K}{L}" /></p>
            </div>,
            <div className="bg-muted p-4 rounded-xl border border-border">
              <p className="font-bold text-indigo-900 dark:text-indigo-100">Étape 2 : Égaliser au rapport des coûts factoriels (w/r)</p>
              <p>La condition d'optimum exige de minimiser le coût d'acquisition pour un niveau de production fixé, d'où d'après le théorème des isoquants :</p>
              <p><MathComponent block math="TMST = \frac{w}{r} \implies \frac{K}{L} = \frac{15}{10} = 1.5 \implies K = 1.5 \cdot L" /></p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-950 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Étape 3 : Calculer les quantités optimales K et L</p>
              <p>On injecte dans la contrainte d'isoquant de production <MathComponent math="q = 30" /> :</p>
              <p><MathComponent block math="K^{0.5} L^{0.5} = 30 \implies (1.5 \cdot L)^{0.5} \cdot L^{0.5} = \sqrt{1.5} \cdot L = 30" /></p>
              <p>Ce qui donne les quantités d'efficacité :</p>
              <p><MathComponent block math="L^* = \frac{30}{\sqrt{1.5}} \approx 24.49 \quad \text{et} \quad K^* = 1.5 \cdot 24.49 \approx 36.74" /></p>
            </div>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards de synthèse" icon="BrainCircuit" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <Flashcard 
            front={<>Quelle est la signification théorique rigoureuse du TMS à l'optimum ?</>}
            back={<>Le TMS vaut {"$p_x / p_y$"}, signifiant que le taux d'échange psychologique subjectif de l'individu équivaut exactement au taux d'échange monétaire objectif du marché réel.</>}
          />
          <Flashcard 
            front={<>Comment s'exprime la fonction de Lagrange générale pour contraintes budgétaires ?</>}
            back={<>Elle vaut {"$\\mathcal{L}(x, y, \\lambda) = U(x, y) + \\lambda(R - p_x x - p_y y)$"} où {"$\\lambda$"} est le prix fictif shadow-price représenté par l'utilité du revenu supplémentaire.</>}
          />
        </div>
      </Section>

      <Section title="❓ Foire Aux Questions (FAQ)" icon="HelpCircle" color="indigo">
        <Accordion title="1. Qu'est-ce qu'une courbe d'indifférence en microéconomie ?">
          Une courbe d'indifférence relie graphiquement l'ensemble des paniers de consommation (combinaisons de biens <MathComponent math="x" /> et <MathComponent math="y" />) qui procurent un niveau de satisfaction ou d'utilité identique à un consommateur donné. Elle est généralement convexe, reflétant la préférence interne pour la diversification par rapport aux paniers extrêmes.
        </Accordion>
        <Accordion title="2. Pourquoi le Lagrangien aide-t-il dans des situations complexes ?">
          En présence de plusieurs variables (ex: panier à 50 biens) ou de restrictions complexes (ex: rationnement écologique), le calcul géométrique par TMS devient impossible. Le Lagrangien traduit de simples contraintes économiques physiques en dérivations de gradients d'équations multivariables solubles à grande échelle par ordinateur.
        </Accordion>
        <Accordion title="3. Qu'en est-il si les biens sont parfaitement complémentaires ?">
          Pour des biens strictement complémentaires (ex: une chaussure gauche et une chaussure droite), l'utilité s'écrit de la forme de Leontief : <MathComponent math="U(x, y) = \min(a x, b y)" />. La courbe d'indifférence forme un coude à 90° et l'optimum se situe au coin où <MathComponent math="a x = b y" />, sans recours possible au calcul de dérivées traditionnelles.
        </Accordion>
      </Section>

      <Section title="📝 Quiz de validation" icon="🎓" color="rose">
        <Quiz 
          questions={[
            {
              question: "Si l'exposant 'alpha' d'un bien vaut 0.40 pour une Cobb-Douglas, quelle proportion du budget est allouée à ce bien ?",
              options: [
                "Exactement 40%",
                "Elle dépend de la valeur absolue des prix",
                "Seulement si le revenu dépasse 1000€"
              ],
              correctAnswer: 0,
              explanation: "Pour les fonctions Cobb-Douglas classiques à exposants sommés à un, les équations analytiques dérivent une demande linéaire où la proportion budgétaire relative est constante et vaut l'exposant de la Cobb-Douglas."
            },
            {
              question: "Quelle est la définition formelle de l'utilité marginale d'un bien ?",
              options: [
                "L'utilité brute que procure la consommation d'une boîte entière de biens",
                "Le rapport entre le prix du bien x et le prix du bien y",
                "La dérivée partielle première de l'utilité par rapport à la quantité consommée"
              ],
              correctAnswer: 2,
              explanation: "L'utilité marginale quantifie l'agrément apporté par la consommation d'une unité infinitésimale supplémentaire, ce qui équivaut à la dérivée première partielle."
            },
            {
              question: "Qu'indique graphiquement la tangence géométrique entre courbe d'indifférence et ligne de budget ?",
              options: [
                "Le coût total maximal",
                "L'optimum utilitaire d'équilibre du consommateur",
                "L'absence totale d'échange possible"
              ],
              correctAnswer: 1,
              explanation: "La tangence entre la contrainte linéaire et la courbe de niveau d'utilité représente le panier idéal qui extrait la satisfaction maximale d'une contrainte budgétaire donnée."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais la formulation d'un programme d'optimisation économique.",
            "Je comprends géométriquement la tangence entre utilité d'indifférence et budget.",
            "Je sais poser le Lagrangien et utiliser le multiplicateur lambda.",
            "Je maîtrise la dérivation des équations de demandes optimales de consommateur."
          ]}
        />
      </Section>

      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+30 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Sup_Eco_Optimisation;
