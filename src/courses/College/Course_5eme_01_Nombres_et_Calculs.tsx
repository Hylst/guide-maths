import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Quiz, InteractiveChecklist, 
  StepList, InteractiveExercise, Flashcard, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Sparkles, HelpCircle, GraduationCap, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const Course_5eme_01_Nombres_et_Calculs: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Sandbox state
  const numbersToSort = [
    { id: 1, value: "42", type: "naturel", label: "42 (Nombre de base)" },
    { id: 2, value: "-15", type: "negatif", label: "-15 (Sous-zéro)" },
    { id: 3, value: "3,14", type: "decimal", label: "3,14 (Partie décimale)" },
    { id: 4, value: "3/4", type: "fraction", label: "3/4 (Éclat de pizza)" },
    { id: 5, value: "2x + 5", type: "litteral", label: "2x + 5 (Formule)" },
    { id: 6, value: "-8,5", type: "decimal", label: "-8,5 (Froid négatif)" },
  ];

  const categories = [
    { id: "naturel", name: "🛡️ Entiers Naturels", desc: "Nombres entiers positifs (sans rature ni virgule)" },
    { id: "negatif", name: "❄️ Entiers Négatifs", desc: "Entiers situés sous le miroir du Zéro (-)" },
    { id: "decimal", name: "📏 Nombres Décimaux", desc: "Nombres possédant une partie après la virgule" },
    { id: "fraction", name: "🍕 Fractions", desc: "Quotients précis exprimant une proportion exacte" },
    { id: "litteral", name: "🪄 Calcul Littéral", desc: "Formules universelles invoquant des LETTRES" },
  ];

  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  const [placements, setPlacements] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<{ id: number; correct: boolean } | null>(null);

  const handlePlace = (catId: string) => {
    if (selectedNum === null) return;
    const num = numbersToSort.find(n => n.id === selectedNum);
    if (!num) return;

    const isCorrect = num.type === catId;
    setPlacements(prev => ({ ...prev, [selectedNum]: catId }));
    setFeedback({ id: selectedNum, correct: isCorrect });

    if (isCorrect) {
      const updated = { ...placements, [selectedNum]: catId };
      const allCorrect = numbersToSort.every(n => updated[n.id] === n.type);
      if (allCorrect) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  const resetSorting = () => {
    setPlacements({});
    setSelectedNum(null);
    setFeedback(null);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-5-INTRO"
        title="Thème : Nombres et Calculs"
        subtitle="L'Arsenal du Mathématicien : Forger les nombres pour maîtriser le programme de 5ème."
        duration="30 min"
        level="5ème (Cycle 4)"
        prerequisites={["Connaître les tables d'addition et de multiplication", "Savoir lire un nombre à virgule", "Comprendre un partage de base"]}
        objectives={[
          "Comprendre l'organisation générale des familles de nombres.",
          "Savoir situer les nombres négatifs par rapport au portail Zéro.",
          "Identifier le rôle magique des expressions littérales.",
          "Manipuler avec aisance les termes numérateur et dénominateur."
        ]}
      />

      {/* INTRODUCTION PÉDAGOGIQUE */}
      <Section title="🌍 Le Code Source de l'Univers" icon="🚀" color="indigo">
        <p className="leading-relaxed">
          Le calcul n&apos;est pas un banal exercice scolaire : c&apos;est la <strong>colonne vertébrale</strong> qui maintient l&apos;Univers en équilibre ! En 5ème, tu quittes le petit village tranquille des nombres positifs tout simples pour plonger dans un océan mathématique fascinant.
        </p>
        <p className="mt-4 leading-relaxed font-semibold text-slate-800 dark:text-slate-100">
          Dans ce grand thème fondateur, tu vas acquérir <strong>les 4 armes légendaires</strong> indispensables pour survivre au collège :
        </p>
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 rounded-[2rem] p-6 mt-6 shadow-indigo-100/10">
          <ul className="space-y-4 font-medium text-indigo-950 dark:text-indigo-200">
            <li className="flex items-start gap-3">
              <span className="text-xl">🛡️</span> 
              <div>
                <strong>Les Priorités Opératoires :</strong> Le code de la route absolu pour calculer dans le bon ordre sans voir l&apos;expression exploser !
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🌌</span> 
              <div>
                <strong>Les Nombres Relatifs :</strong> Le voyage sous le Zéro vers l&apos;univers miroir des dettes et des températures arctiques !
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🍕</span> 
              <div>
                <strong>Les Fractions :</strong> L&apos;art divin de couper chirurgicalement des parts égales d&apos;un trésor céleste.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-xl">🪄</span> 
              <div>
                <strong>Le Calcul Littéral :</strong> Le grimoire magique où l&apos;on remplace les nombres par des lettres pour écrire des lois éternelles.
              </div>
            </li>
          </ul>
        </div>
      </Section>

      {/* PEDAGOGICAL INTERACTIVE SVG SCHEMA */}
      <Section title="🗺️ Le Royaume et la Hiérarchie des Nombres" icon={<GraduationCap className="text-indigo-500" />} color="slate">
        <p className="mb-6 leading-relaxed">
          Les mathématiciens rangent les nombres dans des tiroirs emboîtés (des ensembles). Visualise ci-dessous la grande cartographie des nombres :
        </p>

        {/* Dynamic SVG Cartography */}
        <div className="bg-card border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-slate-100/10 mb-8">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 500 350" className="w-full max-w-lg mb-4 drop-shadow-md">
              {/* Outer box of Calcul Littéral */}
              <rect x="10" y="10" width="480" height="330" rx="20" fill="rgba(244, 244, 245, 0.4)" stroke="#e4e4e7" strokeWidth="2" strokeDasharray="4 4" />
              <text x="30" y="325" fill="#71717a" className="font-mono text-xs font-bold uppercase tracking-wider">Calcul Littéral (Formules avec x, a, b)</text>
              <text x="400" y="50" fill="#a1a1aa" className="font-mono text-lg font-bold">2x + 3</text>

              {/* Ensemble des Relatifs */}
              <rect x="30" y="40" width="440" height="250" rx="20" fill="rgba(224, 231, 255, 0.3)" stroke="#c7d2fe" strokeWidth="2" />
              <text x="50" y="275" fill="#4f46e5" className="font-sans text-xs font-bold uppercase tracking-wider">Nombres Relatifs (Positifs & Négatifs)</text>
              <text x="410" y="110" fill="#6366f1" className="font-mono text-base font-bold">-15</text>

              {/* Ensemble des Décimaux */}
              <rect x="50" y="70" width="400" height="170" rx="18" fill="rgba(209, 250, 229, 0.3)" stroke="#a7f3d0" strokeWidth="2" />
              <text x="70" y="225" fill="#059669" className="font-sans text-xs font-bold uppercase tracking-wider">Nombres Décimaux (avec virgule)</text>
              <text x="380" y="130" fill="#10b981" className="font-mono text-base font-bold">3,14</text>

              {/* Ensemble des Entiers Naturels */}
              <rect x="70" y="100" width="360" height="100" rx="16" fill="rgba(254, 243, 199, 0.4)" stroke="#fde68a" strokeWidth="2" />
              <text x="90" y="175" fill="#d97706" className="font-sans text-xs font-bold uppercase tracking-wider">Entiers Naturels (Positifs de base)</text>
              <text x="120" y="140" fill="#b45309" className="font-mono text-2xl font-black">0</text>
              <text x="220" y="140" fill="#b45309" className="font-mono text-2xl font-black">7</text>
              <text x="320" y="140" fill="#b45309" className="font-mono text-2xl font-black">42</text>
            </svg>
            <p className="text-xs text-slate-400 text-center italic">
              Remarque : Chaque boîte est contenue dans la suivante ! Tout nombre entier naturel est aussi un nombre décimal et relatif.
            </p>
          </div>
        </div>

        <InfoBlock type="reminder" title="Le Zéro central">
          Le nombre <strong>0</strong> est exceptionnel : il est le SEUL nombre au monde à être à la fois <strong>positif</strong> et <strong>négatif</strong> ! Il sert d&apos;axe de rotation à toutes les mathématiques.
        </InfoBlock>
      </Section>

      {/* INTERACTIVE MANDATORY APPLICATION SANDBOX */}
      <Section title="🛠️ Le Laboratoire : Le Tri des Nombres" icon={<Sparkles className="text-amber-500" />} color="amber">
        <p className="mb-6 leading-relaxed text-sm text-slate-600 dark:text-slate-300">
          Arriveras-tu à vaincre l&apos;ésotérisme du tri ? Clique sur l&apos;un des nombres à tester, puis sur la bonne boîte de tri pour l&apos;y placer. Complète tout le tableau sans erreur !
        </p>

        <div className="bg-card border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 shadow-xl shadow-amber-500/5">
          {/* Numbers to test */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {numbersToSort.map(num => {
              const placement = placements[num.id];
              const isCurrent = selectedNum === num.id;
              const hasPlacement = placement !== undefined;
              const isCorrect = hasPlacement && placement === num.type;

              return (
                <button
                  key={num.id}
                  onClick={() => { setSelectedNum(num.id); setFeedback(null); }}
                  className={`px-5 py-3 rounded-2xl font-mono text-base font-bold transition-all border shadow-sm flex items-center gap-2
                    ${isCurrent ? 'bg-indigo-600 border-indigo-600 text-white scale-105' : ''}
                    ${!isCurrent && !hasPlacement ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100' : ''}
                    ${hasPlacement && isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through opacity-60' : ''}
                    ${hasPlacement && !isCorrect ? 'bg-rose-50 border-rose-300 text-rose-800' : ''}
                  `}
                >
                  {num.value}
                  {hasPlacement && (isCorrect ? "✅" : "❌")}
                </button>
              );
            })}
          </div>

          {/* Slots / Drawers to load into */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handlePlace(cat.id)}
                disabled={selectedNum === null}
                className="p-4 rounded-2xl border text-center transition-all bg-slate-50 dark:bg-black/20 hover:bg-slate-100 dark:hover:bg-black/40 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-inner flex flex-col justify-between h-40 disabled:opacity-50"
              >
                <div className="font-bold text-xs uppercase mb-2 text-indigo-700 dark:text-indigo-400">{cat.name}</div>
                <div className="text-[10px] text-slate-400 leading-normal leading-relaxed">{cat.desc}</div>
                <div className="mt-4 border border-indigo-100 dark:border-indigo-900/60 rounded-xl bg-white dark:bg-slate-900 p-1 min-h-[36px] flex items-center justify-center font-mono text-sm font-bold">
                  {Object.entries(placements)
                    .filter(([numId, catId]) => {
                      const num = numbersToSort.find(n => n.id === parseInt(numId));
                      return catId === cat.id && num?.type === cat.id;
                    })
                    .map(([numId]) => {
                      const num = numbersToSort.find(n => n.id === parseInt(numId));
                      return num ? num.value : '';
                    })
                    .join(', ') || <span className="text-[10px] text-slate-350 italic">vide</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback area */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 gap-4">
            <div>
              {feedback ? (
                <div className="flex items-center gap-2">
                  <span className={feedback.correct ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>
                    {feedback.correct ? '🏆 Fantastique ! C\'est parfaitement classé.' : '❌ Mince ! Retente ta chance avec un autre tiroir.'}
                  </span>
                </div>
              ) : (
                <span className="text-slate-400 text-xs font-semibold">Choisis un nombre et clique sur un tiroir pour trier.</span>
              )}
            </div>
            <button 
              onClick={resetSorting}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors"
            >
              <RotateCcw size={14} /> Réécrire à zéro
            </button>
          </div>
        </div>
      </Section>

      {/* PARTIE THÉORIE ENRICHIE */}
      <Section title="🏛️ Les Fondations des Mathématiciens" icon="📖" color="slate">
        <p className="mb-4 leading-relaxed">
          Pour progresser sans trébucher, tu dois impérativement maîtriser la distinction des familles de nombres.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">1. Les Nombres Entiers</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              Ce sont les nombres bruts, entiers, comme {"$0, 1, 2, 854$"} ou, de l&apos;autre côté du miroir, {"$-5, -42$"}. On ne les coupe jamais en rondelles, ils n&apos;ont pas de morceaux de virgule décimale.
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">2. Les Écritures Fractionnaires</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              Elles marquent le partage parfait d&apos;une quantité. On écrit une fraction sous la forme {"$\\frac{a}{b}$"}, où la barre centrale représente une division invisible :
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 border rounded-2xl p-4 my-2 font-mono text-center text-sm">
              <span className="font-bold text-indigo-600">Numérateur</span> (la quantité) sur le <span className="font-bold text-emerald-600">Dénominateur</span> (en combien on brise)
              <p className="text-xs font-mono text-slate-400 mt-2">
                Exemple : {"$\\frac{3}{4} = 3 \\div 4 = 0,75$"}
              </p>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
              Certaines fractions tombent juste historiquement (ex: {"$\\frac{3}{4} = 0,75$"}), d&apos;autres ont une infinité de chiffres après la virgule (ex: {"$\\frac{1}{3} = 0,3333...$"}).
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">3. Le Début de l&apos;Algèbre (Le calcul littéral)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
              En mathématiques supérieures, un calcul ne sert plus à trouver une valeur unique (comme une addition de ticket de caisse), mais à démontrer des **Lois Universelles**. Pour cela, on remplace les chiffres figés par des lettres magiques variables :{" "}
              <strong>A, B, X ou Y</strong>.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
              Ces formules décrivent des mécanismes généraux (comme la formule du périmètre ou de l&apos;aire d&apos;un rectangle : {"$\\mathcal{A} = L \\times l$"}).
            </p>
          </div>
        </div>

        <InfoBlock type="funfact" title="Le Grimoire Historique">
          Le savant perse <strong>Al-Khwarizmi</strong> (vers l&apos;an 800) est surnommé le grand-père de l&apos;Algèbre ! C&apos;est de son ouvrage de référence et de son propre nom qu&apos;est issu notre célèbre mot <strong>&quot;Algorithme&quot;</strong>, pilier absolu de l&apos;informatique moderne !
        </InfoBlock>
      </Section>

      {/* RESOLVED EXERCISES (CHECKLIST REQUIRED) */}
      <Section title="✍️ Fiches Méthodes & Exercices Corrigés" icon="⚙️" color="indigo">
        <InteractiveExercise 
          title="Exercice Résolu 1 : Maîtriser le jargon géométrique & numérique"
          question={<p>Représente le calcul de la surface d&apos;un carré de côté variable {"$c$"}. Écris la formule sous forme littérale.</p>}
          steps={[
            <><strong>Étape 1 : Se remémorer la forme :</strong> Pour calculer l&apos;aire d&apos;un rectangle, on multiplie longueur par largeur. Un carré est un rectangle particulier : la longueur et la largeur valent toutes les deux {"$c$"}.</>,
            <><strong>Étape 2 : Multiplier les lettres :</strong> On écrit donc l&apos;équation d&apos;aire : {"$\\text{Aire} = c \\times c$"}.</>,
            <><strong>Étape 3 : Simplifier le jargon mathématique :</strong> Pour éviter la confusion avec la lettre &quot;x&quot;, on utilise la notation puissance : le produit d&apos;une lettre par elle-même s&apos;écrit avec la puissance carrée : {"$\\text{Aire} = c^2$"}. C&apos;est la forme universelle résolue !</>
          ]}
        />

        <InteractiveExercise 
          title="Exercice Résolu 2 : Scanner l'exactitude des fractions"
          question={<p>Dans une pizza coupée en {"$3$"} parts égales, tu disposes de {"$5$"} de ces parts (un ami t&apos;en a donné). Écris la fraction exacte, puis détermine s&apos;il s&apos;agit de plus ou moins d&apos;une pizza entière.</p>}
          steps={[
            <><strong>Étape 1 : Identifier le dénominateur :</strong> Le bouclier inférieur s&apos;obtient en comptant le découpage de départ d&apos;un gâteau complet. Ici, la pizza est sciée en {"$3$"}. Le dénominateur vaut donc {"$3$"}.</>,
            <><strong>Étape 2 : Compter les parts possédées (Le numérateur) :</strong> Tu possèdes physiquement {"$5$"} parts de ce gâteau. La fraction finale est donc {"$\\frac{5}{3}$"}.</>,
            <><strong>Étape 3 : Évaluer par rapport à l'unité :</strong> Comme le numérateur {"$5$"} est plus grand que le dénominateur {"$3$"}, tu possèdes plus que le tout complet (plus que {"$3/3$"}). Tu as donc plus de {"$1$"} pizza entière !</>
          ]}
        />
      </Section>

      {/* FLASHCARDS MANDATORY REVISION BLOCK */}
      <Section title="⚡ Flashcards de Sauvegarde" icon="🔑" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle est la grande différence entre les nombres <code>Décimaux</code> et les nombres <code>Entiers</code> ?</>}
            back={<>Les <strong>nombres entiers</strong> s&apos;écrivent sans virgule (ex: 2 ou -5). Les <strong>nombres décimaux</strong> possèdent des chiffres non nuls après la virgule (ex: 3,5 ou -0,12).</>}
          />
          <Flashcard 
            front={<>Comment s&apos;appelle le nombre magique situé pile à la frontière du positif et du négatif ?</>}
            back={<>C&apos;est le <strong>Zéro (0)</strong> ! Il est le seul nombre à la fois positif et négatif de l&apos;Univers.</>}
          />
        </div>
      </Section>

      {/* FAQ SECTION (MANDATORY 3 ANSWERS) */}
      <Section title="❓ Questions Fréquentes (FAQ)" icon="🙋" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi est-il crucial de séparer les nombres en différentes familles ?",
              answer: "Comme chez un pharmacien ou un garagiste, ranger les outils évite les drames. Les mathématiques utilisent des règles différentes selon si le nombre est entier, possède une suite infinie décimale, ou est négatif. Les classer permet de toujours savoir quelle loi de combat appliquer sans faire d'erreur fatale !"
            },
            {
              question: "Est-ce qu'une fraction comme 4/2 est aussi un nombre entier naturel ?",
              answer: "Oui, tout à fait ! C'est ce qu'on appelle une écriture fractionnaire. Si tu effectues la division invisible : 4 divisé par 2 donne exactement 2. Le nombre 2 est bien un entier naturel. Les familles de nombres sont emboîtées comme des poupées russes !"
            },
            {
              question: "Quelle est l'utilité réelle du calcul littéral dans les jeux vidéo ou dans la vraie vie ?",
              answer: "Derrière les graphismes de tes jeux vidéo favoris (Minecraft, Fortnite), il n'y a pas de chiffres fixes mais des millions de formules littérales ! On l'utilise pour calculer des distances, simuler la trajectoire d'une balle de foot ou modéliser la gravité en ajustant des variables à l'infini."
            }
          ]}
        />
      </Section>

      {/* FINAL QUIZ (MANDATORY MINIMUM 3 QUESTIONS) */}
      <Section title="💎 Épreuve de l'Intronisation" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Comment qualifie-t-on l'ensemble des nombres contenant à la fois le royaume positif et le royaume négatif ?",
              options: [
                "Les Entiers Naturels",
                "Les Nombres Relatifs",
                "Les Écritures Décimales simples"
              ],
              correctAnswer: 1,
              explanation: "Félicitations ! Les nombres relatifs englobent tous les nombres reliés par un signe positif [+] ou négatif [-]."
            },
            {
              question: "Que représente le Dénominateur dans l'anatomie d'une écriture fractionnaire ?",
              options: [
                "L'épée supérieure : la quantité brute de morceaux que l'on possède.",
                "Le bouclier inférieur : le nombre total de parts égales dans lesquelles l'unité est brisée.",
                "La virgule mobile."
              ],
              correctAnswer: 1,
              explanation: "Incroyable ! C'est bien le bouclier inférieur. Il indique la finesse de la division fondamentale du trésor entier."
            },
            {
              question: "Dans la formule de l'aire d'un disque Aire = π × r², par quel type d'expression est écrit le rayon 'r' ?",
              options: [
                "Une constante numérique figée",
                "Une expression littérale variable",
                "Un nombre entier relatif négatif"
              ],
              correctAnswer: 1,
              explanation: "Merveilleux ! 'r' est une variable littérale. Elle te permet d'appliquer la formule pour n'importe quel disque de l'Univers, du plus petit bouton de chemise au Soleil !"
            }
          ]}
        />

        {/* INTERACTIVE CHECKLIST OF THE ESSENTIALS */}
        <InteractiveChecklist 
          items={[
            "Je sais nommer les quatre grandes branches des Nombres et Calculs en 5ème.",
            "Je visualise le diagramme des boîtes imbriquées de l'univers des nombres.",
            "Je comprends les termes de Numérateur (haut) et de Dénominateur (bas).",
            "Je sais que le calcul littéral permet de créer des lois universelles de combat."
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

export default Course_5eme_01_Nombres_et_Calculs;
