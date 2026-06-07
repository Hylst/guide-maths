import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { Target, Activity, Cpu, Sliders, ChevronRight, RefreshCw, BarChart2 } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_3eme_03_Fonctions: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Local state for the Function Machine
  const [inputVal, setInputVal] = useState<number>(3);
  const [formulaType, setFormulaType] = useState<'double' | 'square' | 'triple'>('double');

  // Math equations based on choice
  const calculateOutput = (x: number) => {
    switch (formulaType) {
      case 'double': return 2 * x - 5;
      case 'square': return x * x - 1;
      case 'triple': return 3 * x + 4;
      default: return 0;
    }
  };

  const getFormulaLabel = () => {
    switch (formulaType) {
      case 'double': return "f(x) = 2x - 5";
      case 'square': return "g(x) = x² - 1";
      case 'triple': return "h(x) = 3x + 4";
    }
  };

  const getStepByStep = (x: number) => {
    switch (formulaType) {
      case 'double':
        return (
          <div className="space-y-1 font-mono text-xs">
            <p>1. Multiplier par 2 : {x} × 2 = {x * 2}</p>
            <p>2. Soustraire 5 : {x * 2} - 5 = {2 * x - 5}</p>
          </div>
        );
      case 'square':
        return (
          <div className="space-y-1 font-mono text-xs">
            <p>1. Mettre au carré : {x} × {x} = {x * x}</p>
            <p>2. Soustraire 1 : {x * x} - 1 = {x * x - 1}</p>
          </div>
        );
      case 'triple':
        return (
          <div className="space-y-1 font-mono text-xs">
            <p>1. Multiplier par 3 : {x} × 3 = {x * 3}</p>
            <p>2. Ajouter 4 : {x * 3} + 4 = {3 * x + 4}</p>
          </div>
        );
    }
  };

  const outputVal = calculateOutput(inputVal);

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-03"
        title="La Notion de Fonction"
        subtitle="Découvrez la machine mathématique universelle qui transforme les nombres !"
        duration="1h 15min"
        level="3ème (Cycle 4)"
        prerequisites={["Calcul littéral (lettre x)", "Lecture d'un repère orthonormé"]}
        objectives={[
          "Comprendre le vocabulaire de base : Antécédent, Image, Fonction.",
          "Lire et utiliser les notations mathématiques comme f(x) = 2x + 3.",
          "Identifier images et antécédents via un tableau, un graphique ou une formule.",
          "Tracer la courbe représentative d'une fonction.",
          "Maîtriser la distinction logique fondamentale entre une graine (départ) et son fruit (image)."
        ]}
      />

      <InfoBlock type="reminder" title="Rappel : Les équations et le calcul de x">
        Avant de manipuler des fonctions, souviens-toi que la lettre {"$x$"} est une variable muette qui représente un nombre inconnu. De plus, pour résoudre une équation simple comme {"$4x - 6 = 10$"}, tu cherches la valeur de {"$x$"} qui vérifie l&apos;égalité : en isolant {"$x$"}, on obtient {"$4x = 16$"} soit {"$x = 4$"}. C&apos;est exactement la technique pour retrouver un antécédent par le calcul !
      </InfoBlock>

      <Section title="🌟 Introduction : La Machine Mystère du Futur" icon="⚙️" color="slate">
        <p>
          Au collège, on t'a beaucoup appris à faire des calculs statiques ("combien fait 4 + 5 ?"). Mais le monde réel bouge ! La trajectoire d'un drone, l'évolution du cours de la bourse, la courbe des températures de la terre : tout varie. 
        </p>
        <p className="mt-4">
          Une <strong>Fonction</strong>, c'est comme une incroyable <strong>machine de formage</strong> automatique dans une usine technologique.
        </p>
        <p className="mt-4">
          Tu fais entrer un bloc de matière première (le nombre de départ, <strong className="text-sky-600 font-mono">x</strong>), la machine le transforme selon un plan de construction secret et rigide, et il en ressort un bel engrenage fini (le nombre d'arrivée). On dit que la machine "fonctionne". 
        </p>
        <p className="mt-4">
          Inventer cette notion fondamentale a permis à l'Humanité de propulser la science moderne en comprenant la gravitation de Newton, la météo, la foudre et aujourd'hui les algorithmes prédictifs d'Intelligence Artificielle !
        </p>
      </Section>

      <Section title="⚙️ Schéma Interactif : La Machine à Transformer les Nombres" icon={<Cpu className="w-6 h-6 text-indigo-500" />} color="indigo">
        <TipBanner title="Alimentez la machine d'usine" type="info">
          <p>
            Sélectionnez une recette de fonction (en haut à droite), déplacez le curseur d'entrée {"$x$"} et observez les étapes internes du moteur de calcul pour forger la sortie !
          </p>
        </TipBanner>

        <div className="bg-card dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-md my-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h4 className="font-bold text-foreground">Machine Industrielle de Calcul</h4>
              <p className="text-xs text-slate-500">Choisissez la recette configurée sur la puce.</p>
            </div>
            <div className="flex gap-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border">
              {(['double', 'square', 'triple'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFormulaType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${formulaType === type ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {type === 'double' ? 'f(x)' : type === 'square' ? 'g(x)' : 'h(x)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border">
            {/* Input Slider */}
            <div className="space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-sky-600 flex items-center gap-1.5">
                <Sliders size={14} /> Matière Première
              </span>
              <div className="space-y-1">
                <label htmlFor="input-val-slider" className="block text-sm font-bold text-slate-600">Nombre de départ x :</label>
                <div className="flex items-center gap-4">
                  <input 
                    id="input-val-slider"
                    type="range" min="-10" max="10" step="1" value={inputVal}
                    onChange={(e) => setInputVal(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg accent-indigo-600"
                  />
                  <span className="font-mono text-xl font-black bg-indigo-50 dark:bg-indigo-950 text-indigo-700 px-3.5 py-1.5 rounded-xl border border-indigo-200">{inputVal}</span>
                </div>
              </div>
            </div>

            {/* Core Machine visualization */}
            <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x py-6 md:py-0 px-4">
              <div className="relative w-44 h-24 bg-indigo-600 dark:bg-indigo-800 rounded-3xl flex flex-col items-center justify-center text-white border border-indigo-500 shadow-lg text-center select-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-20 pointer-events-none" />
                <span className="text-2xs uppercase tracking-[0.25em] font-black text-indigo-200">TRAITEMENT</span>
                <span className="font-mono text-lg font-black tracking-tight my-1">{getFormulaLabel()}</span>
                <div className="flex items-center gap-1 text-2xs font-bold opacity-80 animate-pulse">
                  <RefreshCw size={10} className="animate-spin" /> Moteur Actif
                </div>
              </div>
              <div className="mt-4 w-full">
                {getStepByStep(inputVal)}
              </div>
            </div>

            {/* Output view */}
            <div className="space-y-4 text-center md:text-left">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 flex items-center justify-center md:justify-start gap-1.5">
                <BarChart2 size={14} /> Produit Fini
              </span>
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-bold block">Image calculée :</span>
                <div className="inline-block bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-emerald-700 px-5 py-3 rounded-2xl">
                  <span className="font-mono text-2xl font-black">{outputVal}</span>
                </div>
              </div>
              <p className="text-2xs text-slate-400 italic">
                Nous écrivons officiellement : <br/>
                <code className="font-bold font-mono text-xs text-slate-800 dark:text-slate-200">
                  {formulaType === 'double' ? `f(${inputVal}) = ${outputVal}` : formulaType === 'square' ? `g(${inputVal}) = ${outputVal}` : `h(${inputVal}) = ${outputVal}`}
                </code>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="1. Le Vocabulaire Absolu" icon="🗣️" color="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800">
            <h4 className="font-bold text-sky-800 dark:text-sky-200 text-xl border-b border-sky-200 dark:border-sky-800 pb-2 mb-4">L'Antécédent (Avant)</h4>
            <ul className="space-y-2 text-sm md:text-base text-foreground">
              <li>• C'est le point de <strong>DÉPART</strong>, la matière première de la machine.</li>
              <li>• On l'appelle souvent la variable <strong><MathComponent math={"x"} /></strong>.</li>
              <li>• C'est le bloc brut qu'on "donne à manger" aux parenthèses de la fonction.</li>
              <li>• Sur un graphique, on le repère toujours sur <strong>l'axe horizontal (l'axe des abscisses)</strong>.</li>
            </ul>
          </div>
          
          <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-950 dark:text-emerald-100 text-xl border-b border-emerald-100 dark:border-emerald-800 pb-2 mb-4">L'Image (Après)</h4>
            <ul className="space-y-2 text-sm md:text-base text-foreground">
              <li>• C'est le point d'<strong>ARRIVÉE</strong>, le résultat du formage mathématique.</li>
              <li>• On le note <strong><MathComponent math={"f(x)"} /></strong> (qui s'articule : "f de x").</li>
              <li>• C'est l'étiquette finale qui sort du tapis roulant de l'usine.</li>
              <li>• Sur un graphique, on le repère toujours sur <strong>l'axe vertical (l'axe des ordonnées)</strong>.</li>
            </ul>
          </div>
        </div>

        <TipBanner title="Règle d'or absolue pour parler français" type="success">
          La grammaire d'une phrase de fonction est toujours immuable : <br/>
          <strong>"L'image de [le nombre de départ] est [le nombre d'arrivée]"</strong>.<br/>
          <em>Exemple : Si f(3) = 7. Nous écrivons : "L'image de 3 est 7." ou "3 a pour image 7." ou "L'antécédent de 7 est 3."</em>
        </TipBanner>
      </Section>

      <Section title="2. Les Trois Visages d'une Fonction" icon="🎭" color="emerald">
        <p className="mb-6">Une fonction peut se présenter sous 3 formes différentes dans les exercices ou dans la vie réelle :</p>
        
        <h3 className="text-xl font-bold mt-4 mb-2">A. La Formule Algébrique (La notice de la machine)</h3>
        <p className="mb-4">C'est la forme avec la lettre <MathComponent math={"x"} />. Elle décrit exactement le calcul mathématique à effectuer.</p>
        <div className="bg-card p-4 rounded-xl border border-border-strong text-center shadow-sm mb-6 max-w-sm mx-auto font-mono text-lg">
          f(x) = 2x - 5
        </div>
        <p className="mb-8">Cela scande : <em>"La machine <MathComponent math={"f"} /> prend <MathComponent math={"x"} />, le multiplie par 2, puis lui enlève 5."</em>. Si je donne l'antécédent <MathComponent math={"x = 10"} />, la machine calcule <MathComponent math={"f(10) = 2 \\times 10 - 5 = 15"} />. L'image est donc <MathComponent math={"15"} />.</p>

        <h3 className="text-xl font-bold mt-4 mb-2">B. Le Tableau de Valeurs (Le registre d'usine)</h3>
        <p className="mb-4">Un ouvrier a noté sur un tableau des exemples de produits fabriqués par le passé, sans te donner la formule secrète d'origine :</p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full max-w-lg mx-auto bg-card rounded-xl overflow-hidden border border-border-strong text-center shadow-sm">
            <thead>
              <tr className="bg-sky-50 dark:bg-slate-800">
                <th className="py-3 px-4 border-b border-r border-border-strong font-bold text-sky-800 dark:text-sky-300">x (Antécédents)</th>
                <th className="py-3 px-4 border-b border-border-strong text-foreground">-2</th>
                <th className="py-3 px-4 border-b border-border-strong text-foreground">0</th>
                <th className="py-3 px-4 border-b border-border-strong text-foreground">3</th>
                <th className="py-3 px-4 border-b border-border-strong text-foreground">5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-r border-border-strong font-bold bg-emerald-50/50 dark:bg-slate-900/50 text-emerald-950 dark:text-emerald-100">f(x) (Images)</td>
                <td className="py-3 px-4 text-foreground">8</td>
                <td className="py-3 px-4 text-foreground">-1</td>
                <td className="py-3 px-4 text-foreground">8</td>
                <td className="py-3 px-4 text-foreground">12</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <InfoBlock title="Attention au grand piège de l'Antécédent !" type="warning">
          <strong>Combien y a-t-il d'antécédents pour le nombre 8 dans notre tableau de valeurs ?</strong><br/>
          Regarde attentivement la deuxième ligne (celle des images). Le nombre 8 apparaît DEUX fois ! Ses antécédents respectifs (juste au-dessus d'eux) sont <code>-2</code> ET <code>3</code>.<br/>
          <em>Règle de fer :</em> Un nombre peut posséder plusieurs antécédents différents (ex: -2 et 3 donnent tous deux 8), mais un antécédent ne donne <strong>QU'UNE SEULE ET UNIQUE image</strong>. Si un départ de calcul donnait deux résultats en même temps, la machine serait mathématiquement cassée !
        </InfoBlock>

        <InfoBlock title="Le saviez-vous ? L'origine de l'écriture f(x)" type="funfact">
          C&apos;est le célèbre mathématicien suisse Leonhard Euler qui a introduit pour la première fois la notation magique {"$f(x)$"} en 1734. Avant cela, les mathématiciens écrivaient de longues phrases en latin pour décrire les formules ! La lettre {"$f$"} fait référence au terme latin « functio », qui désigne le devoir ou l&apos;accomplissement d&apos;une tâche.
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : Les types de fonctions incontournables du collège">
          Au collège, tu étudieras deux types simplifiés de fonctions fondamentales :
          <br />- Les <strong>fonctions linéaires</strong> (de la forme {"$f(x) = ax$"}), qui représentent des situations de proportionnalité parfaite (leur courbe est une droite passant par l&apos;origine).
          <br />- Les <strong>fonctions affines</strong> (de la forme {"$f(x) = ax + b$"}), qui représentent une proportionnalité décalée par une valeur fixe appelée « ordonnée à l&apos;origine » (leur courbe est une droite qui ne passe pas forcément par l&apos;origine).
        </InfoBlock>

        <h3 className="text-xl font-bold mt-8 mb-2">C. Le Graphique (La courbe représentative)</h3>
        <p className="mb-4">
          C'est la forme visuelle d'une trajectoire. Sur l'axe horizontal, on place la matière première (le curseur des Antécédents {"$x$"}). Sur l'axe vertical, la machine vient pointer l'altitude du signal final (les Images {"$y$"}).
        </p>
        <div className="bg-muted dark:bg-slate-900/30 p-6 rounded-[2rem] border border-border-strong text-center my-6 shadow-sm">
          <p className="font-bold text-lg text-foreground mb-4">Pour lire graphiquement sur une courbe :</p>
          <ol className="text-left max-w-lg mx-auto space-y-3 font-medium text-slate-700 dark:text-slate-300 text-sm md:text-base">
            <li className="flex gap-2">
              <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span><strong>Chercher l'image de a :</strong> Place ton index sur {"$a$"} sur l'axe HORIZONTAL (abscisses). Monte ou descends en ligne droite vers la courbe, puis regarde l'altitude lue en face sur l'axe VERTICAL.</span>
            </li>
            <li className="flex gap-2">
              <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span><strong>Chercher l'antécédents de b :</strong> Place ton index de départ sur l'altitude {"$b$"} de l'axe VERTICAL (ordonnées). Trace une ligne horizontale imaginaire. Regarde tous les points d'intersection de cette ligne avec la courbe, et descends verticalement lire leur projeté sur l'axe HORIZONTAL.</span>
            </li>
          </ol>
        </div>
      </Section>

      <Section title="✍️ Deux Exercices Type Brevet Résolus" icon="✏️" color="emerald">
        {/* Exercice 1 */}
        <InteractiveExercise 
          title="Exercice 1 : Inverser le moteur par le calcul (Trouver l'antécédent)"
          question={(
            <div>
              <p className="mb-2">
                On dispose de la formule algébrique suivante : <strong className="font-mono text-base bg-muted px-2 py-1 rounded inline-block"><MathComponent math={"f(x) = 4x - 6"} /></strong>.
              </p>
              <p className="font-bold">
                Trouvez par le calcul l'antécédent de 10 par la fonction f.
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Identifier l'inconnue et le sens de l'exercice :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Attention ! On cherche l'antécédent (le nombre {"$x$"} secret de départ). On ne doit surtout pas calculer la valeur {"$f(10)$"}. Au contraire, {"$10$"} est le fruit final (l'image). Nous cherchons {"$x$"} tel que {"$f(x) = 10$"}.
              </p>
            </>,
            <>
              <strong>2. Poser l'équation correspondante :</strong>
              <p className="mt-1 text-sm text-foreground/85 font-mono bg-card dark:bg-black/30 p-2.5 rounded border border-border-strong inline-block">
                4x - 6 = 10
              </p>
            </>,
            <>
              <strong>3. Isoler les termes en x (Étape 1 du calcul littéral) :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                On transfert le "-6" à droite du signe égal en changeant son signe, il devient "+6" : <br/>
                <code>4x = 10 + 6</code><br/>
                <code>4x = 16</code>
              </p>
            </>,
            <>
              <strong>4. Diviser pour éteindre le multiplicateur :</strong>
              <p className="mt-1 text-sm text-foreground/80 font-mono">
                x = 16 ÷ 4 = 4.
              </p>
            </>,
            <>
              <strong>5. Conclusion et validation de raisonnement :</strong>
              <p className="mt-1 font-bold text-emerald-600 dark:text-emerald-400">
                L'unique antécédent de 10 par la fonction f est le nombre 4. (Vérif : 4 × 4 - 6 = 16 - 6 = 10).
              </p>
            </>
          ]}
        />

        {/* Exercice 2 */}
        <InteractiveExercise 
          title="Exercice 2 : La trajectoire du drone (Lecture de graphique)"
          question={(
            <div>
              <p className="mb-2">
                Un drone topographique décolle pour survoler un canal. Son altitude verticale {"$y$"} (en mètres) dépend de sa distance horizontale {"$x$"} (en décamètres) par rapport à sa base. 
              </p>
              <p className="mb-2">
                Cette grandeur est donnée par la courbe d'une fonction {"$A(x)$"}. On sait que la courbe passe par les coordonnées cartésiennes de points d'appuis suivants :
              </p>
              <ul className="list-disc ml-6 space-y-1 font-mono text-sm leading-relaxed">
                <li>(0 ; 0) : Base de décollage</li>
                <li>(2 ; 8) : Survol du mât de repère</li>
                <li>(5 ; 12) : Sommet de trajectoire autonome</li>
                <li>(8 ; 8) : Entrée en phase de descente radio-guidée</li>
              </ul>
              <p className="mt-2 font-bold">
                Déterminez graphiquement l'altitude du drone à une distance horizontale de 2 décamètres, ainsi que l'ensemble des distances où l'altitude du drone vaut exactement 8 mètres.
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Analyse de la demande "altitude à une distance x = 2" :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                L'énoncé nous demande l'altitude correspondant à une abscisse de {"$2$"}. On cherche donc l'image de 2 par la fonction A, c'est-à-dire {"$A(2)$"}.
              </p>
            </>,
            <>
              <strong>2. Résolution du premier point :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                En se positionnant sur 2 sur la ligne du sol (abscisses) et en montant à la verticale vers la courbe, on lit une altitude de 8 mètres sur l'axe vertical (ordonnées). D'ailleurs, les coordonnées s'affichent <code className="font-bold font-mono text-xs">(2 ; 8)</code>.<br/>
                <strong className="text-emerald-600 font-bold block mt-1">L'image de 2 par la fonction A est 8 mètres.</strong>
              </p>
            </>,
            <>
              <strong>3. Analyse de la demande : "distances où l'altitude vaut 8" :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                Cette fois-ci, l'altitude de 8 est le résultat. On nous demande quels sont les départs possibles de la machine pour atteindre 8. On cherche donc les <strong>antécédents de 8</strong> par la fonction A.
              </p>
            </>,
            <>
              <strong>4. Détection des intersections sur l'horizontale en y = 8 :</strong>
              <p className="mt-1 text-sm text-foreground/80">
                On trace mentalement une ligne horizontale à l'altitude héliocentrique de 8 mètres (ordonnée 8). Elle coupe la courbe en deux points précis : <br/>
                - Le premier point d'abscisse <code>x = 2</code> decamètres.<br/>
                - Le second point d'abscisse <code>x = 8</code> decamètres.
              </p>
            </>,
            <>
              <strong>5. Formulation de la réponse pédagogique :</strong>
              <p className="mt-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/25 p-2 rounded border">
                Les antécédents de 8 par la fonction A sont 2 et 8. Le drone se trouve précisément à 8 mètres d'altitude lorsqu'il a parcouru 2 décamètres ET lorsqu'il a atteint 8 décamètres de distance horizontale.
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards de Révision" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Dans la notation classique <strong><MathComponent math={"f(-4) = 16"} /></strong>, quel nombre désigne l'antécédent et quel nombre est l'image ?</>}
            back={<>L'antécédent (x) est la variable brute absorbée dans les parenthèses : <strong>-4</strong>.<br/>L'image (le résultat final) est le bloc éjecté de l'autre côté du signe égal : <strong>16</strong>.</>}
          />
          <Flashcard 
            front={<>Vrai ou Faux : Un antécédent peut-il être associé à deux images distinctes en même temps ?</>}
            back={<><strong>FAUX ! Absolument impossible.</strong><br/>C'est la définition absolue d'une fonction mathématique cohérente. Pour un point de départ x donné, il y a un calcul et un seul. (Par contre, l'altitude d'arrivée y pourrait théoriquement posséder plusieurs départs possibles au sol).</>}
          />
          <Flashcard 
            front={<>Que veut dire graphiquement l'ordonnée à l'origine (quand x = 0) ?</>}
            back={<>C'est l'endroit précis où le dessin de la courbe traverse l'axe vertical (axe des ordonnées). Le drone est au temps ou à la distance zéro, c'est son point de départ vertical d'origine fictive.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi les mathématiciens utilisent-ils toujours les lettres f, g, h et x ?",
              answer: "Par simple convention historique mondiale ! 'f' pour Fonction, et 'x' pour l'Inconnue ou la variable horizontale. Cependant, en science physique, on adapte toujours les lettres ! On étudiera la fonction 'v(t)' pour désigner la Vitesse en fonction du Temps 't', ou 'P(z)' pour la Pression atmosphérique en fonction de l'Altitude 'z'."
            },
            {
              question: "Quelle est la différence concrète entre la notation f(x) et y sur un graphe de repère ?",
              answer: "C'est la même chose ! L'axe des ordonnées vertical s'appelle historiquement l'axe des y. Dès qu'on trace une fonction dans le plan, l'altitude 'y' d'un point est régie par la valeur de calcul de sa formule f(x). On écrit ainsi l'équation de courbe : y = f(x)."
            },
            {
              question: "Pourquoi dit-on qu'une fonction à trou n'a parfois pas d'antécédents ?",
              answer: "Si vous prenez la fonction f(x) = x² (qui calcule un carré toujours positif). Cherchons les antécédents de -5. Comment trouver un nombre x dont le carré vaut -5 ? Un carré négatif n'existe pas chez les réels ! -5 n'a donc aucun antécédent par cette fonction graphique."
            }
          ]}
        />
      </Section>

      <Section title="🏆 Quiz d'Évaluation Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans une usine de fonctions, que représente l'Antécédent par rapport au processus de formage ?",
              options: [
                "Un déchet de métal résiduel.",
                "Un nombre ou une quantité prise en départ avant d'effectuer le calcul.",
                "La somme totale des équations.",
                "Le nom du directeur de l'usine."
              ],
              correctAnswer: 1,
              explanation: "L'antécédent est l'antériorité : le nombre qu'on injecte au départ à la place de la variable x."
            },
            {
              question: "On vous scande la phrase suivante : 'f(-3) = 9'. Quelle affirmations grammaticale est correcte ?",
              options: [
                "L'image de 9 par la fonction f est -3.",
                "L'antécédent de -3 par la fonction f est 9.",
                "L'image de -3 par la fonction f est 9."
              ],
              correctAnswer: 2,
              explanation: "On place -3 dans la machine et on obtient 9 en sortie. Donc 9 est le reflet, l'image que renvoie la machine lorsqu'on l'aimante à -3."
            },
            {
              question: "La courbe représentative de la fonction f traverse l'axe vertical au point d'altitude 5. Comment l'écrit-on ?",
              options: [
                "f(5) = 0",
                "f(0) = 5",
                "f(x) = y + 5"
              ],
              correctAnswer: 1,
              explanation: "L'intersection avec l'axe vertical signifie que l'abscisse horizontale x vaut 0. Donc l'image de 0 est 5, ce qui donne f(0) = 5."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Antécédent = Avant (Ligne des abscisses x au sol).",
            "Image = Après (Ligne des ordonnées y en altitude).",
            "Je sais calculer l'image d'un nombre en remplaçant la lettre x par sa valeur dans la formule.",
            "Je comprends qu'un même nombre d'arrivée peut provenir de plusieurs antécédents différents (ex : parabole symétrique)."
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

export default Course_College_3eme_03_Fonctions;
