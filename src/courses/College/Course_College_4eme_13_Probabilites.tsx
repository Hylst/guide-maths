import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Dice5, HelpCircle, Shuffle, BarChart3, HelpCircle as HelpIcon, Play, RefreshCw } from 'lucide-react';
import { MathComponent } from '../../components/MathComponent';

const Course_College_4eme_13_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Urn Simulator State
  const [redCount, setRedCount] = useState<number>(3);
  const [greenCount, setGreenCount] = useState<number>(4);
  const [blueCount, setBlueCount] = useState<number>(3);
  const [drawnMarble, setDrawnMarble] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  
  // Real Stats tracker (Law of large numbers demonstration)
  const [stats, setStats] = useState<{ red: number; green: number; blue: number; total: number }>({
    red: 0,
    green: 0,
    blue: 0,
    total: 0
  });

  const totalMarbles = redCount + greenCount + blueCount;

  // Run random drawing animation
  const handleDraw = () => {
    if (totalMarbles === 0 || isDrawing) return;
    setIsDrawing(true);
    setDrawnMarble(null);

    let counter = 0;
    const interval = setInterval(() => {
      // Simulate rapid switching
      const colors = ['red', 'green', 'blue'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setDrawnMarble(randomColor);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        
        // Final draw proportional to current contents
        const rand = Math.random() * totalMarbles;
        let selectedColor = 'red';
        if (rand < redCount) {
          selectedColor = 'red';
        } else if (rand < redCount + greenCount) {
          selectedColor = 'green';
        } else {
          selectedColor = 'blue';
        }

        setDrawnMarble(selectedColor);
        setIsDrawing(false);

        // Update stats
        setStats(prev => ({
          ...prev,
          [selectedColor]: prev[selectedColor as 'red' | 'green' | 'blue'] + 1,
          total: prev.total + 1
        }));
      }
    }, 80);
  };

  // Reset simulator statistics
  const handleResetStats = () => {
    setStats({ red: 0, green: 0, blue: 0, total: 0 });
    setDrawnMarble(null);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-13"
        title="Les Probabilités"
        subtitle="Apprendre à Dompter le Hasard et Mesurer la Chance"
        duration="1h 00"
        level="4ème (Cycle 4)"
        prerequisites={["Manipuler les fractions basiques", "Calculer un pourcentage", "Additionner des fractions de même dénominateur"]}
        objectives={[
          "Traduire les notions courantes du hasard en un vocabulaire noble (expérience, issue, univers).",
          "Calculer la probabilité d'une issue avec la formule de Laplace.",
          "Déterminer la probabilité de l'événement contraire ('au moins', 'sauf').",
          "Comprendre le lien entre fréquence réelle (Statistiques) et probabilité théorique."
        ]}
      />

      <Section title="🌟 Introduction : Prédire l'avenir scientifiquement" icon="🎰" color="slate">
        <p className="leading-relaxed">
          Depuis la nuit des temps, l&apos;Homme cherche à percer les mystères de la chance pour remporter les jeux d&apos;argent. Cependant, notre cerveau est un piètre évaluateur du hasard : il invente des théories de malédiction (&quot;J&apos;ai obtenu 5 Pile d&apos;affilée, le Face va forcément sortir !&quot; {"→"} <strong>C&apos;est rigoureusement faux</strong>, la pièce n&apos;a pas de mémoire !).
        </p>
        <p className="mt-4 leading-relaxed">
          Pour y voir clair, la 4ème introduit un système imbattable : la <strong>Probabilité</strong>. C&apos;est la science d&apos;assigner un nombre chiffré rigoureux entre <strong className="text-rose-500">0</strong> (Impossible Absolu) et <strong className="text-emerald-500">1</strong> (Certain absolu) à un événement futur.
        </p>
      </Section>

      {/* PROBABILITY INTERACTIVE SANDBOX */}
      <Section title="🛠️ Le Laboratoire du Hasard : L'Urne à Billes" icon={<Shuffle className="text-indigo-500" />} color="indigo">
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Personnalise le contenu de l&apos;urne en changeant le nombre de billes de chaque couleur. Clique ensuite sur <strong>&quot;Tirer au hasard&quot;</strong> pour simuler un tirage et observer la loi statistique des grands nombres.
        </p>

        <div className="bg-card border border-slate-100 dark:border-slate-800/80 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Visual Urn Container */}
            <div className="bg-slate-50 dark:bg-black/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-center relative min-h-[220px] flex flex-col justify-between overflow-hidden">
              <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider text-slate-400">Représentation de l&apos;Urne magique</span>
              
              {/* Spheres rendering inside container */}
              <div className="w-48 h-32 bg-white/40 dark:bg-black/40 border-2 border-slate-300 dark:border-slate-700 rounded-b-[4rem] rounded-t-xl mx-auto flex flex-wrap items-center justify-center p-4 gap-2 relative mt-6 shadow-inner">
                {Array.from({ length: redCount }).map((_, i) => (
                  <div key={`r-${i}`} className="w-5 h-5 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full shadow-md animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
                {Array.from({ length: greenCount }).map((_, i) => (
                  <div key={`g-${i}`} className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-md animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
                {Array.from({ length: blueCount }).map((_, i) => (
                  <div key={`b-${i}`} className="w-5 h-5 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-md animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}

                {totalMarbles === 0 && (
                  <span className="text-xs text-rose-500 font-bold">L&apos;urne est vide !</span>
                )}
              </div>

              {/* Drawing output visual indicator */}
              <div className="h-12 flex items-center justify-center mt-4">
                {drawnMarble && (
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white dark:bg-slate-900 border-slate-100 shadow">
                    <span className="text-xs font-bold text-slate-600">Bille tirée :</span>
                    <div className={`w-4 h-4 rounded-full ${drawnMarble === 'red' ? 'bg-rose-500' : drawnMarble === 'green' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                      {drawnMarble === 'red' ? 'Rouge' : drawnMarble === 'green' ? 'Verte' : 'Bleue'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Controls panel */}
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 text-sm uppercase">
                🎯 Configuration des Probabilités
              </h3>

              {/* Red counter */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500" /> Billes Rouges
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setRedCount(Math.max(0, redCount - 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg bg-slate-50 hover:bg-slate-100 transition-all"
                  >-</button>
                  <span className="w-6 text-center font-mono font-bold text-sm">{redCount}</span>
                  <button 
                    onClick={() => setRedCount(Math.min(8, redCount + 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg bg-slate-50 hover:bg-slate-100 transition-all"
                  >+</button>
                </div>
              </div>

              {/* Green counter */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" /> Billes Vertes
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setGreenCount(Math.max(0, greenCount - 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg bg-slate-50 hover:bg-slate-100 transition-all"
                  >-</button>
                  <span className="w-6 text-center font-mono font-bold text-sm">{greenCount}</span>
                  <button 
                    onClick={() => setGreenCount(Math.min(8, greenCount + 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg bg-slate-50 hover:bg-slate-100 transition-all"
                  >+</button>
                </div>
              </div>

              {/* Blue counter */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-500" /> Billes Bleues
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setBlueCount(Math.max(0, blueCount - 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg bg-slate-50 hover:bg-slate-100 transition-all"
                  >-</button>
                  <span className="w-6 text-center font-mono font-bold text-sm">{blueCount}</span>
                  <button 
                    onClick={() => setBlueCount(Math.min(8, blueCount + 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center font-bold text-lg bg-slate-50 hover:bg-slate-100 transition-all"
                  >+</button>
                </div>
              </div>

              {/* Theoretical Stats view */}
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border text-xs space-y-2">
                <span className="font-bold text-slate-500 uppercase tracking-widest text-[10px] block mb-1">Analyse Théorique (Laplace)</span>
                <p>N total de billes : <strong className="font-mono text-indigo-600">{totalMarbles}</strong></p>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono font-bold pt-1">
                  <div className="p-1 border border-rose-100 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-995/10 rounded-xl text-rose-700">
                    P(R) = {totalMarbles > 0 ? `${redCount}/${totalMarbles}` : '0'}<br />
                    ({totalMarbles > 0 ? Math.round((redCount / totalMarbles) * 100) : 0}%)
                  </div>
                  <div className="p-1 border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-995/10 rounded-xl text-emerald-700">
                    P(V) = {totalMarbles > 0 ? `${greenCount}/${totalMarbles}` : '0'}<br />
                    ({totalMarbles > 0 ? Math.round((greenCount / totalMarbles) * 100) : 0}%)
                  </div>
                  <div className="p-1 border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-995/10 rounded-xl text-blue-700">
                    P(B) = {totalMarbles > 0 ? `${blueCount}/${totalMarbles}` : '0'}<br />
                    ({totalMarbles > 0 ? Math.round((blueCount / totalMarbles) * 100) : 0}%)
                  </div>
                </div>
              </div>

              {/* ACTION Draw button */}
              <button 
                onClick={handleDraw}
                disabled={totalMarbles === 0 || isDrawing}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed text-sm"
              >
                <Play size={16} /> Tirer une bille au hasard !
              </button>
            </div>
          </div>

          {/* LAW OF LARGE NUMBERS REAL-STATS LOG */}
          {stats.total > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 size={14} /> Résultats cumulés ({stats.total} tirages réels)
                </span>
                <button 
                  onClick={handleResetStats}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-600"
                >
                  <RefreshCw size={10} /> réinitialiser les stats
                </button>
              </div>

              {/* Comparing ratios visually with percentage Bars */}
              <div className="space-y-3 text-xs">
                {/* Red row */}
                <div>
                  <div className="flex justify-between font-mono font-bold text-[11px] mb-1">
                    <span className="text-rose-700">Tirages Billes Rouges ({stats.red})</span>
                    <span>Théorique: {totalMarbles > 0 ? Math.round((redCount/totalMarbles)*100) : 0}% | Réel: {Math.round((stats.red/stats.total)*100)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full transition-all duration-305" style={{ width: `${(stats.red/stats.total)*100}%` }} />
                  </div>
                </div>

                {/* Green row */}
                <div>
                  <div className="flex justify-between font-mono font-bold text-[11px] mb-1">
                    <span className="text-emerald-700 font-bold">Tirages Billes Vertes ({stats.green})</span>
                    <span>Théorique: {totalMarbles > 0 ? Math.round((greenCount/totalMarbles)*100) : 0}% | Réel: {Math.round((stats.green/stats.total)*100)}%</span>
                  </div>
                  <div className="w-full bg-slate-105 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-505 h-full bg-emerald-500 transition-all duration-305" style={{ width: `${(stats.green/stats.total)*100}%` }} />
                  </div>
                </div>

                {/* Blue row */}
                <div>
                  <div className="flex justify-between font-mono font-bold text-[11px] mb-1">
                    <span className="text-blue-700 font-bold">Tirages Billes Bleues ({stats.blue})</span>
                    <span>Théorique: {totalMarbles > 0 ? Math.round((blueCount/totalMarbles)*100) : 0}% | Réel: {Math.round((stats.blue/stats.total)*100)}%</span>
                  </div>
                  <div className="w-full bg-slate-105 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-305" style={{ width: `${(stats.blue/stats.total)*100}%` }} />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 italic mt-4 leading-relaxed">
                👉 <strong>Loi des Grands Nombres :</strong> Plus tu lances de tirages (ex: dépasse 100 tirages), plus la fréquence réelle (les barres) se rapproche avec perfection de la probabilité théorique calculée par la formule !
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section title="1. Lexique des parieurs professionnels" icon="📖" color="slate">
        <p className="mb-4 leading-relaxed">
          Pour mener à bien ton évaluation face à l&apos;examinateur du Brevet, tu dois remplacer le langage commun par des termes mathématiques nobles :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <div className="bg-slate-50 dark:bg-black/30 p-5 rounded-2xl border text-xs leading-relaxed">
            <span className="font-bold text-indigo-700 dark:text-indigo-400 text-sm block mb-1">🧬 Expérience Aléatoire</span>
            <p>
              C&apos;est une action ou un jeu dont on ne peut pas connaître le résultat avec certitude à l&apos;avance (ex : jeter le dé). Taper dans un ballon de foot devant le but vide n&apos;en est pas une.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-black/30 p-5 rounded-2xl border text-xs leading-relaxed">
            <span className="font-bold text-indigo-700 dark:text-indigo-400 text-sm block mb-1">🏁 L&apos;Issue</span>
            <p>
              C&apos;est un résultat brut unitaire de l&apos;expérience. Obtenir &quot;Face 6&quot; est une issue. L&apos;ensemble de toutes les issues s&apos;appelle l&apos;<strong>Univers</strong>.
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-black/30 p-5 rounded-2xl border border-l-4 border-l-indigo-500 text-xs leading-relaxed shadow-sm">
            <span className="font-bold text-indigo-700 dark:text-indigo-400 text-sm block mb-1">📣 L&apos;Événement (A)</span>
            <p>
              C&apos;est la condition ou l&apos;objectif fixé en français (ex : A = &quot;Tire un nombre pair&quot;). L&apos;événement A rassemble donc plusieurs issues : [les faces 2, 4 et 6].
            </p>
          </div>
        </div>
      </Section>

      <Section title="2. La Formule Fondatrice de Laplace" icon="➗" color="slate">
        <p className="mb-4 leading-relaxed">
          Lorsque les dés ne sont pas pipés, c&apos;est-à-dire que chaque face a exactement la même chance d&apos;apparaître (situation d&apos;<strong>équiprobabilité</strong>), on utilise le quotient le plus célèbre de la chance :
        </p>

        <div className="bg-card p-6 rounded-3xl border-x-8 border-indigo-500 shadow-xl shadow-indigo-500/5 flex flex-col items-center my-6 text-center max-w-2xl mx-auto">
          <span className="font-bold italic text-slate-500 uppercase tracking-widest text-[10px] mb-2">Théorème de Laplace</span>
          
          <div className="font-mono text-xs md:text-sm font-black bg-slate-50 dark:bg-black/30 w-full p-4 rounded-xl mt-4 border border-slate-100">
            <span className="block border-b-2 border-slate-300 dark:border-slate-700 pb-2 mb-2">
              Nombre de cas FAVORABLES (Issues gagnantes)
            </span>
            <span className="block">
              Nombre TOTAL de possibilités (Taille de l&apos;Univers)
            </span>
          </div>
          
          <div className="mt-6 flex flex-col items-center">
            <p className="font-bold text-slate-700 dark:text-slate-300 text-xs mb-2">💡 Exemple : Urne de 3 billes rouges et 5 billes noires.</p>
            <p className="font-bold text-base mt-2">
              {"$P(\\text{Rouge}) = \\frac{3}{3 + 5} = \\mathbf{\\frac{3}{8}} = 0,375 \\text{ (soit } 37,5\\%\\text{ de chance)}$"}
            </p>
          </div>
        </div>
      </Section>

      <Section title="3. L&apos;Événement Contraire : Le Bouclier de la Flemme" icon="🛡️" color="slate">
        <p className="mb-4 leading-relaxed">
          Parfois, calculer directement la chance d&apos;un événement est incroyablement long et source d&apos;erreurs (ex : A = &quot;Obtenir au moins un 2 avec 3 dés&quot;). La loi mathématique affirme que la somme de tes chances et de celles de ton opposant vaut toujours <strong>1 pur (100%)</strong>.
        </p>

        <InteractiveExercise 
          title="Fiche Technique : L'interruption de calcul (1 - Ennemi)"
          question={<>Dans une Roue de loterie numérotée de 1 à 100 ! Tu gagnes si tu tires n&apos;importe quel numéro SAUF le 100.<br/>Calcule la probabilité exacte P(A) de gagner.</>}
          steps={[
            <><strong>Mauvaise méthode (La douleur):</strong> Tu fais l&apos;addition des fractions : {"$P(1) + P(2) + P(3) ...$"} jusqu&apos;à 99. C&apos;est affreusement long et tu vas faire une faute de frappe.</>,
            <><strong>Bonne méthode (Le Bouclier) :</strong> Quel est l&apos;événement opposé (l&apos;Ennemi fatal qui te fait perdre) ?<br/>C&apos;est seulement d&apos;obtenir le fatal numéro 100. Sa probabilité est de : {"$P(\\text{Ennemi}) = \\frac{1}{100}$"}.</>,
            <><strong>Formule magique complémentaire :</strong> Tes chances de gagner correspondent à l&apos;Univers complet de 100% (le nombre 1) moins les chances de ton ennemi :<br />{"$P(A) = 1 - P(\\text{Ennemi}) = 1 - \\frac{1}{100}$"}</>,
            <><strong>Calcul final immédiat :</strong> {"$P(A) = \\frac{100}{100} - \\frac{1}{100} = \\mathbf{\\frac{99}{100}}$"} (soit 99 % de chance !). C&apos;est d&apos;une efficacité redoutable.</>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande de calculer la probabilité de tirer une bille rouge sur le dé classique de 6 faces.</>}
            back={<><strong>Zéro (0) ! C&apos;est un Événement Impossible.</strong><br/>Il n&apos;y a aucun cas favorable, donc 0/6 = 0. Inversement, l&apos;événement 'obtenir un chiffre plus petit ou égal à 6' vaut (6/6) = <strong>1 (Événement Certain)</strong>.</>}
          />
          <Flashcard 
            front={<>Mon exercice se termine par une probabilité finale de 1.4. Le résultat est-il correct ?</>}
            back={<><strong>Alerte Erreur Fatale ! Absimpossible !</strong><br/>Une probabilité est l&apos;expression d&apos;une fraction d&apos;un tout. Elle est <strong>scrupuleusement comprise entre 0 et 1</strong>. Une probabilité ne peut jamais être négative, ni dépasser 1 (qui représente le certain absolu @ 100%).</>}
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes (FAQ)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si je lance 2 fois une pièce. Est-ce que j'additionne mes chances (50% + 50% = 100%) d'obtenir Pile ?",
              answer: "Ah, c'est l'erreur la plus classique commise dans les casinos ! Si c'était vrai, tu aurais l'assurance absolue à 100% de voir sortir un Pile. Or, tu peux avoir deux 'Faces' d'affilée. Lors de l'enchaînement de plusieurs événements indépendants, on n'additionne pas les chances, on les multiplie ! (Tu le découvriras à l'aide des arbres de probabilité en 3ème)."
            },
            {
              question: "Dois-je simplifier ma fraction de probabilité au Brevet ?",
              answer: "Bien sûr, un bon mathématicien rend toujours son résultat le plus épuré possible. Laisser 4/8 vous fera perdre un point de soin. Simplifiez-le systématiquement en 1/2 !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans une urne il y a 8 jetons lettres : G, E, O, F, F, R, O, Y. Tu tires un jeton au hasard. Quelle est la probabilité d'obtenir la lettre 'O' ?",
              options: [
                "1 / 8  (Car c'est juste 1 lettre du prénom)",
                "2 / 8  Qui se simplifie en 1 / 4 (soit 25% de chance)",
                "1 / 6  (Car il y a 6 types de lettres différentes)"
              ],
              correctAnswer: 1,
              explanation: "Félicitations ! Il y a physiquement deux jetons marqués 'O' mélangés dans l'urne. Tu as donc 2 chances favorables sur un Univers de 8 jetons. Ce qui fait bien 2/8, soit 1/4 !"
            },
            {
              question: "Un événement A a une probabilité de 0,35 de se réaliser. Quelle est celle de son événement contraire ?",
              options: [
                "-0,35",
                "0,75",
                "0,65 (soit 65% de chance)"
              ],
              correctAnswer: 2,
              explanation: "Superbe ! P(Contraire) = 1 - P(A) = 1 - 0.35 = 0.65. Les deux parts forment le camembert parfait de 1.0 (100%)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je vérifie impérativement que mes probabilités sont coincées entre 0.0 et 1.0.",
            "Je sais que 'équiprobabilité' signifie équilibre parfait de chance pour chaque issue.",
            "Je sais utiliser l'événement contraire pour esquiver des heures de calcul au brouillon."
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

export default Course_College_4eme_13_Probabilites;
