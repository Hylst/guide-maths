import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { Dice5, CircleDot, Play, Plus, Minus, RotateCcw, Sparkles } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_3eme_05_Probabilites: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator State
  const [redBalls, setRedBalls] = useState<number>(3);
  const [blueBalls, setBlueBalls] = useState<number>(2);
  const [greenBalls, setGreenBalls] = useState<number>(5);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawnBall, setDrawnBall] = useState<'red' | 'blue' | 'green' | null>(null);
  const [history, setHistory] = useState<('red' | 'blue' | 'green')[]>([]);

  const totalBalls = redBalls + blueBalls + greenBalls;

  const addBall = (color: 'red' | 'blue' | 'green') => {
    if (totalBalls >= 15) return; // Prevent overcrowding
    if (color === 'red') setRedBalls(r => r + 1);
    if (color === 'blue') setBlueBalls(b => b + 1);
    if (color === 'green') setGreenBalls(g => g + 1);
  };

  const removeBall = (color: 'red' | 'blue' | 'green') => {
    if (color === 'red' && redBalls > 0) setRedBalls(r => r - 1);
    if (color === 'blue' && blueBalls > 0) setBlueBalls(b => b - 1);
    if (color === 'green' && greenBalls > 0) setGreenBalls(g => g - 1);
  };

  const drawBall = () => {
    if (totalBalls === 0 || isDrawing) return;
    setIsDrawing(true);
    setDrawnBall(null);

    // Pick random index based on current ratios
    const rand = Math.random() * totalBalls;
    let color: 'red' | 'blue' | 'green';
    if (rand < redBalls) {
      color = 'red';
    } else if (rand < redBalls + blueBalls) {
      color = 'blue';
    } else {
      color = 'green';
    }

    setTimeout(() => {
      setDrawnBall(color);
      setHistory(h => [color, ...h].slice(0, 10)); // Keep last 10
      setIsDrawing(false);
    }, 800);
  };

  const resetAll = () => {
    setRedBalls(3);
    setBlueBalls(2);
    setGreenBalls(5);
    setDrawnBall(null);
    setHistory([]);
    setIsDrawing(false);
  };

  // Ball positions inside the SVG jar to look nicely packed (max 15 positions)
  const ballPositions = [
    { cx: 100, cy: 190 }, { cx: 70, cy: 195 }, { cx: 130, cy: 195 },
    { cx: 85, cy: 175 }, { cx: 115, cy: 175 }, { cx: 145, cy: 180 },
    { cx: 55, cy: 180 }, { cx: 100, cy: 155 }, { cx: 70, cy: 155 },
    { cx: 130, cy: 155 }, { cx: 115, cy: 130 }, { cx: 85, cy: 130 },
    { cx: 100, cy: 110 }, { cx: 70, cy: 120 }, { cx: 130, cy: 120 }
  ];

  // List of current ball assignments for display mapping
  const currentBalls: { id: number; color: 'red' | 'blue' | 'green' }[] = [];
  let idAcc = 0;
  for (let i = 0; i < redBalls; i++) currentBalls.push({ id: idAcc++, color: 'red' });
  for (let i = 0; i < blueBalls; i++) currentBalls.push({ id: idAcc++, color: 'blue' });
  for (let i = 0; i < greenBalls; i++) currentBalls.push({ id: idAcc++, color: 'green' });

  return (
    <div id="probabilites-course-root" className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        id="probs-header"
        acronym="MATH-3EME-05"
        title="Les Probabilités"
        subtitle="Domptez le hasard et découvrez l'arme ultime des prévisions !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Les fractions (simplification)", "Les pourcentages", "Les nombres décimaux"]}
        objectives={[
          "Comprendre le vocabulaire fondamental : expérience aléatoire, issue, événement.",
          "Calculer des probabilités à l'aide de la formule magique de Laplace.",
          "Modéliser des situations réelles avec l'Arbre pondéré des Possibles.",
          "Calculer des événements contraires pour simplifier les exercices complexes.",
          "Distinguer les probabilités théoriques d'expériences empiriques."
        ]}
      />

      <Section id="intro" title="🌟 Introduction : Le hasard est-il mathématique ?" icon="🎲" color="slate">
        <p>
          Si je lance un dé à 6 faces, personne sur Terre (pas même un ordinateur surpuissant) ne peut savoir sur quelle face il tombera. C'est l'essence même d'une expérience aléatoire : elle est imprédictible à court terme.
        </p>
        <p className="mt-4">
          Et pourtant, le <strong>hasard total obéit à des lois rigides</strong> sur le long terme ! C'est ce qu'on appelle les <em>probabilités</em>. En calculant précisément toutes les chances mathématiques, les banques, les compagnies d'assurance, la météorologie et même l'intelligence artificielle arrivent à anticiper l'avenir avec une exactitude incroyable. Es-tu prêt à calculer ton propre futur ?
        </p>
      </Section>

      {/* SVG INTERACTIVE APPLET SCHEMA */}
      <Section id="simulateur-urne" title="🧪 Simulateur d'ADN Arithmétique : L'Urne de Laplace" icon="🔮" color="indigo">
        <TipBanner id="urne-banner" title="Manipulez les composants de l'urne aléatoire" type="info">
          Ajoutez ou retirez des boules colorées de l'urne avec les boutons. Lancez le tirage et observez comment la probabilité théorique se transforme en tirage concret !
        </TipBanner>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center bg-card border border-border-strong rounded-[2rem] p-6 md:p-8 shadow-md">
          {/* Controls - 4 cols */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-foreground">Ajuster la composition :</h3>
            
            {/* Red Controller */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border">
              <span className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
                <span className="w-4 h-4 rounded-full bg-rose-500 inline-block"></span>
                Rouges (R)
              </span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => removeBall('red')}
                  className="w-8 h-8 rounded-full bg-card hover:bg-slate-200 border flex items-center justify-center font-bold text-slate-700 transition"
                  aria-label="Enlever une boule rouge"
                >
                  <Minus size={16} />
                </button>
                <span className="font-mono font-bold text-lg w-6 text-center">{redBalls}</span>
                <button 
                  onClick={() => addBall('red')}
                  disabled={totalBalls >= 15}
                  className="w-8 h-8 rounded-full bg-card hover:bg-slate-200 border flex items-center justify-center font-bold text-slate-700 transition disabled:opacity-30"
                  aria-label="Ajouter une boule rouge"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Blue Controller */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border">
              <span className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                <span className="w-4 h-4 rounded-full bg-indigo-500 inline-block"></span>
                Bleues (B)
              </span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => removeBall('blue')}
                  className="w-8 h-8 rounded-full bg-card hover:bg-slate-200 border flex items-center justify-center font-bold text-slate-700 transition"
                  aria-label="Enlever une boule bleue"
                >
                  <Minus size={16} />
                </button>
                <span className="font-mono font-bold text-lg w-6 text-center">{blueBalls}</span>
                <button 
                  onClick={() => addBall('blue')}
                  disabled={totalBalls >= 15}
                  className="w-8 h-8 rounded-full bg-card hover:bg-slate-200 border flex items-center justify-center font-bold text-slate-700 transition disabled:opacity-30"
                  aria-label="Ajouter une boule bleue"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Green Controller */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border">
              <span className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-4 h-4 rounded-full bg-emerald-500 inline-block"></span>
                Vertes (V)
              </span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => removeBall('green')}
                  className="w-8 h-8 rounded-full bg-card hover:bg-slate-200 border flex items-center justify-center font-bold text-slate-700 transition"
                  aria-label="Enlever une boule verte"
                >
                  <Minus size={16} />
                </button>
                <span className="font-mono font-bold text-lg w-6 text-center">{greenBalls}</span>
                <button 
                  onClick={() => addBall('green')}
                  disabled={totalBalls >= 15}
                  className="w-8 h-8 rounded-full bg-card hover:bg-slate-200 border flex items-center justify-center font-bold text-slate-700 transition disabled:opacity-30"
                  aria-label="Ajouter une boule verte"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Simulated Probabilities List */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border space-y-3">
              <span className="text-2xs uppercase text-slate-400 font-bold block">Probabilités théoriques instantanées :</span>
              <div className="space-y-1 my-1">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-rose-600 dark:text-rose-400">p(Rouge)</span>
                  <span className="font-mono">{redBalls} / {totalBalls} ({totalBalls > 0 ? ((redBalls / totalBalls) * 100).toFixed(0) : 0}%)</span>
                </div>
                <div className="w-full bg-rose-100 dark:bg-rose-950/40 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-rose-500 h-full" style={{ width: `${totalBalls > 0 ? (redBalls / totalBalls) * 100 : 0}%` }}></div>
                </div>
              </div>

              <div className="space-y-1 my-1">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-indigo-600 dark:text-indigo-400">p(Bleue)</span>
                  <span className="font-mono">{blueBalls} / {totalBalls} ({totalBalls > 0 ? ((blueBalls / totalBalls) * 100).toFixed(0) : 0}%)</span>
                </div>
                <div className="w-full bg-indigo-100 dark:bg-indigo-950/40 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-full" style={{ width: `${totalBalls > 0 ? (blueBalls / totalBalls) * 100 : 0}%` }}></div>
                </div>
              </div>

              <div className="space-y-1 my-1">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">p(Verte)</span>
                  <span className="font-mono">{greenBalls} / {totalBalls} ({totalBalls > 0 ? ((greenBalls / totalBalls) * 100).toFixed(0) : 0}%)</span>
                </div>
                <div className="w-full bg-emerald-100 dark:bg-emerald-950/40 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${totalBalls > 0 ? (greenBalls / totalBalls) * 100 : 0}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive SVG Urn display - 4 cols */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-48 h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed py-4 shadow-inner">
              
              {/* Urn Drawing */}
              <svg className="w-40 h-56" viewBox="0 0 200 240">
                {/* Background Shadow inside */}
                <ellipse cx="100" cy="210" rx="75" ry="20" fill="currentColor" className="text-slate-200 dark:text-slate-800" />
                
                {/* Balls mapping */}
                {currentBalls.map((b, idx) => {
                  const pos = ballPositions[idx] || { cx: 100, cy: 190 };
                  const colorClass = 
                    b.color === 'red' ? 'fill-rose-500' :
                    b.color === 'blue' ? 'fill-indigo-500' :
                    'fill-emerald-500';

                  return (
                    <circle 
                      key={b.id} 
                      cx={pos.cx} 
                      cy={pos.cy} 
                      r="12" 
                      className={`${colorClass} stroke-white/20 transition-all duration-300 drop-shadow-sm`} 
                    />
                  );
                })}

                {/* Drawn Flying Ball Overlay Animation */}
                {isDrawing && (
                  <circle cx="100" cy="50" r="14" fill="#a855f7" className="animate-bounce">
                    <animate attributeName="cy" values="180;50;40;50" dur="0.8s" repeatCount="1" />
                  </circle>
                )}

                {/* Urn Outline Jar */}
                <path 
                  d="M 60 40 
                     C 60 70, 30 90, 20 140 
                     C 10 190, 40 230, 100 230 
                     C 160 230, 190 190, 180 140 
                     C 170 90, 140 70, 140 40 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  className="text-indigo-900 dark:text-indigo-400 opacity-60" 
                />
              </svg>

              {/* Absolute Flying Result Container */}
              {drawnBall && !isDrawing && (
                <div className="absolute -top-3 bg-indigo-600 text-white font-bold text-xs py-1 px-3 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                  <span>Tiré : </span>
                  <span className={`w-3.5 h-3.5 rounded-full inline-block ${
                    drawnBall === 'red' ? 'bg-rose-500' :
                    drawnBall === 'blue' ? 'bg-indigo-500' :
                    'bg-emerald-500'
                  }`} />
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button 
                onClick={drawBall}
                disabled={totalBalls === 0 || isDrawing}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition disabled:opacity-30 shadow-md shadow-indigo-600/10"
              >
                <Play size={14} /> {isDrawing ? 'Saisie...' : 'Tirer une boule'}
              </button>
              <button 
                onClick={resetAll}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition"
                aria-label="Réinstaller l'urne par défaut"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Draw History - 3 cols */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Historique empirique :</h4>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border min-h-[160px] flex flex-wrap gap-2 items-start content-start">
              {history.length === 0 ? (
                <p className="text-xs text-slate-400/80 italic text-center w-full my-auto">L'historique est vide. Tirez quelques boules pour le remplir !</p>
              ) : (
                history.map((col, idx) => (
                  <span 
                    key={idx} 
                    className={`w-6 h-6 rounded-full border border-white/20 shadow-sm flex items-center justify-center text-2xs text-white font-bold animate-fade-in ${
                      col === 'red' ? 'bg-rose-500' :
                      col === 'blue' ? 'bg-indigo-500' :
                      'bg-emerald-500'
                    }`}
                  >
                    {col[0].toUpperCase()}
                  </span>
                ))
              )}
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Remarque la "loi des grands nombres" : plus vous faites de tirages, plus les fréquences réelles de l'historique vont tendre vers les valeurs mathématiques exactes.
            </p>
          </div>
        </div>
      </Section>

      <Section id="vocabulaire" title="1. Le Vocabulaire des Croupiers" icon="🎓" color="indigo">
        <p className="mb-6">
          Pour vaincre le baccalauréat ou le brevet, tu dois impérativement maîtriser le lexique chirurgical de la théorie probabiliste.
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-card p-5 rounded-2xl border border-border-strong border-l-4 border-l-indigo-500 shadow-sm flex items-start gap-4">
            <span className="text-3xl mt-0.5" role="img" aria-label="laboratoire">🧪</span>
            <div>
              <p className="font-bold text-indigo-700 dark:text-indigo-300 text-lg">Expérience Aléatoire</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Une action matérielle dont on ne peut pas anticiper l'issue finale, bien qu'on en connaisse par avance l'ensemble de tous les dénouements concevables. <span className="italic block mt-1 text-slate-400">Exemple : "Lancer un dé à six faces non truqué."</span>
              </p>
            </div>
          </div>
          
          <div className="bg-card p-5 rounded-2xl border border-border-strong border-l-4 border-l-amber-500 shadow-sm flex items-start gap-4">
            <span className="text-3xl mt-0.5" role="img" aria-label="cible">🎯</span>
            <div>
              <p className="font-bold text-amber-700 dark:text-amber-300 text-lg">L'Issue (ou l'Événement Élémentaire)</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Le résultat atomique et unique que fournit une expérience. Pour le dé à 6 faces, il y a exactement 6 issues possibles : les entiers de 1 à 6. On note l'ensemble de ces issues l'univers.
              </p>
            </div>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border-strong border-l-4 border-l-rose-500 shadow-sm flex items-start gap-4">
            <span className="text-3xl mt-0.5" role="img" aria-label="trophee">🏆</span>
            <div>
              <p className="font-bold text-rose-700 dark:text-rose-300 text-lg">L'Événement</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Un ensemble composé d'une ou plusieurs issues. Un événement se valide si le tirage final est contenu dans cet ensemble. <span className="italic block mt-1 text-slate-400">Exemple : "Obtenir un nombre pair." Cet événement comprend les issues {"{2, 4, 6}"}.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-5 bg-slate-50 dark:bg-slate-900 border rounded-2xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">🎈 Événement Impossible</h4>
            <p className="text-sm opacity-95 text-slate-500">Un événement qui ne contient aucune issue. Sa probabilité est de strictly ZÉRO. <br/><span className="text-xs text-indigo-500 font-bold">Ex : "Faire 8 avec un dé classique."</span></p>
          </div>
          <div className="p-5 bg-slate-50 dark:bg-slate-900 border rounded-2xl">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">⭐ Événement Certain</h4>
            <p className="text-sm opacity-95 text-slate-500">Un événement qui regroupe la totalité absolue de l'univers. Sa probabilité est de strictly UN. <br/><span className="text-xs text-indigo-500 font-bold">Ex : "Tirer une boule rouge, verte ou bleue dans notre urne."</span></p>
          </div>
        </div>

        <InfoBlock title="Le saviez-vous ? Blaise Pascal et la naissance des probabilités au casino" type="funfact">
          Au XVIIe siècle, un noble amateur de jeux d&apos;argent, le Chevalier de Méré, s&apos;étonnait de perdre sa fortune sur un pari de dés qu&apos;il pensait pourtant avantageux. Il envoya une lettre désespérée au prodige scientifique Blaise Pascal. Pascal s&apos;associa avec Pierre de Fermat pour résoudre ce dilemme : c&apos;est ainsi, pour élucider une triche de casino, qu&apos;ils ont cofondé ensemble la branche entière du calcul des probabilités !
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : Probabilité théorique vs Fréquence statistique empirique">
          Une confusion courante est de croire qu&apos;une probabilité de 50% d&apos;avoir « Pile » garantit d&apos;avoir exactement 50 Piles sur 100 lancers. C&apos;est faux à courte échelle ! 
          <br />- La <strong>probabilité théorique</strong> est un calcul idéal statique d&apos;équiprobabilité.
          <br />- La <strong>fréquence statistique</strong> est un relevé factuel concret de terrain.
          <br />C&apos;est la <strong>loi des grands nombres</strong> qui fait le pont : si tu lances ta pièce 10 000 fois de suite, la fréquence d&apos;apparition Pile va se resserrer inexorablement autour de l&apos;idéal de 50% !
        </InfoBlock>
      </Section>

      <Section id="equiproba" title="2. La Formule Sacrée (Équiprobabilité)" icon="⚖️" color="emerald">
        <p className="mb-4">
          Dans la grande majorité des situations d'examen de classe de 3ème, les objets d'expérience sont supposés normaux (dés non plombés, pièces équilibrées, tirage sans tricherie). C'est la situation d'<strong>équiprobabilité</strong>.
        </p>

        <p className="mb-4 text-muted-text">
          On utilise alors l'unique formule de Laplace pour calculer la probabilité {"$p(A)$"} d'un événement arbitraire {"$A$"} :
        </p>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-3xl p-6 shadow-sm my-6 text-center">
          <div className="inline-block bg-background px-6 py-4 rounded-2xl border shadow-sm">
            <p className="font-black text-md text-emerald-800 dark:text-emerald-400 mb-3 uppercase tracking-wide">La Formule d'Équiprobabilité</p>
            <div className="text-indigo-900 dark:text-indigo-300 font-mono text-lg md:text-xl font-bold flex flex-col items-center gap-1.5">
              <span>{"$p(A) = \\frac{\\text{Nombre d'issues favorables}}{\\text{Nombre total d'issues}}$"}</span>
            </div>
          </div>
        </div>

        <InfoBlock id="golden-limit" title="La loi d'or du domaine mathématique" type="reminder">
          Puisque le numérateur (ce que l'on veut) est forcément inférieur ou égal au dénominateur (la totalité des cas), une probabilité est <strong>stricto sensu comprise entre 0 et 1</strong> (ou entre 0% et 100%).
          <br />
          Si un de tes calculs de fraction donne {"$p(A) = 1.35$"} ou {"$\\frac{7}{4}$"}, arrête-toi immédiatement ! Ton équation est fausse.
        </InfoBlock>
      </Section>

      <Section id="contraire" title="3. L'Événement Contraire" icon="☯️" color="rose">
        <p className="mb-4">
          En arithmétique, il est parfois atrocement long de dénombrer toutes les issues favorables d'une épreuve complexe. Il est alors tellement plus élégant de compter son opposé exact et d'appliquer la formule du contraire !
        </p>

        <p className="mb-4 text-muted-text">
          L'événement contraire de {"$A$"}, noté {"$\\bar{A}$"} (lu "A barre"), est composé de toutes les issues de l'univers qui n'appartiennent PAS à {"$A$"}.
        </p>

        <div className="bg-rose-50/50 dark:bg-rose-900/15 p-6 rounded-3xl border border-rose-200/60 shadow-sm flex flex-col md:flex-row items-center gap-6 my-6">
          <div className="flex-1">
            <h4 className="font-bold text-rose-800 dark:text-rose-400 text-lg mb-2">Le bouclier d'opposition :</h4>
            <div className="font-mono text-lg font-black text-rose-600 dark:text-rose-300 mb-4 bg-background px-4 py-2 border rounded-xl inline-block">
              {"$p(\\bar{A}) = 1 - p(A)$"}
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Exemple :</strong> On interroge un lycéen au hasard dans un établissement où 93% des enfants étudient leurs leçons le soir. On veut savoir quelle est la probabilité {"$p(E)$"} de choisir un enfant qui ne révise pas.
              <br />
              <span className="italic font-bold block mt-3 text-rose-500">
                p(E) = 1 - 0.93 = 0.07 (soit 7%).
              </span>
            </p>
          </div>
          <div className="w-36 h-36 bg-card border-x-4 border-rose-500 rounded-[2rem] flex flex-col items-center justify-center p-3 text-center shadow-md flex-shrink-0">
            <span className="text-2xs uppercase tracking-widest text-rose-500 font-bold block mb-1">Univers</span>
            <span className="text-xl font-bold font-mono">100%</span>
            <div className="w-24 h-0.5 bg-slate-200 dark:bg-slate-800 my-2"></div>
            <span className="text-xs text-slate-400">A + Bar(A) = 1</span>
          </div>
        </div>
      </Section>

      <Section id="arbres" title="4. L'Arbre des Pondérations (Expériences à 2 épreuves)" icon="🌳" color="amber">
        <p className="mb-4">
          Comment calcule-t-on la chance d'obtenir Pile puis Pile en lançant deux fois une pièce de monnaie ? Notre cerveau fatigue dès que deux événements se chevauchent. La solution consiste à dresser un <strong>arbre de probabilités</strong>.
        </p>

        <div className="bg-card p-6 rounded-3xl border shadow-sm my-6 overflow-x-auto">
          {/* Detailed Tree */}
          <div className="min-w-[500px] flex justify-center py-6">
            <div className="flex flex-col items-center">
              <div className="bg-indigo-600 text-white font-mono text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 relative">
                Base de Départ (Univers)
              </div>
              
              <div className="flex gap-24 relative">
                
                {/* Branch Left */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Épreuve 1</span>
                  <div className="bg-slate-100 dark:bg-slate-800 border p-3 rounded-2xl font-bold font-mono text-sm">
                    {"$p(G) = \\frac{1}{2}$"} (Gâteau)
                  </div>
                  
                  {/* Children Branch Left */}
                  <div className="h-6 w-[2px] bg-indigo-200 my-3"></div>
                  <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-1">Épreuve 2</span>
                  
                  <div className="flex gap-10">
                    <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-950/25 p-3 rounded-2xl border border-emerald-200">
                      <span className="text-xs font-bold font-mono">Chocolat</span>
                      <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-1">{"$p = \\frac{2}{3}$"}</span>
                      <div className="mt-3 border-t pt-1.5 text-[10px] text-slate-500 font-mono">
                        Poids = {"$\\frac{1}{2} \\times \\frac{2}{3} = \\frac{1}{3}$"}
                      </div>
                    </div>
                    <div className="flex flex-col items-center bg-rose-50 dark:bg-rose-950/25 p-3 rounded-2xl border border-rose-200">
                      <span className="text-xs font-bold font-mono">Crème</span>
                      <span className="text-rose-600 dark:text-rose-400 text-xs font-bold mt-1">{"$p = \\frac{1}{3}$"}</span>
                      <div className="mt-3 border-t pt-1.5 text-[10px] text-slate-500 font-mono">
                        Poids = {"$\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}$"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch Right */}
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Épreuve 1</span>
                  <div className="bg-slate-100 dark:bg-slate-800 border p-3 rounded-2xl font-bold font-mono text-sm">
                    {"$p(F) = \\frac{1}{2}$"} (Fruits)
                  </div>
                  
                  {/* Children Branch Right */}
                  <div className="h-6 w-[2px] bg-indigo-200 my-3"></div>
                  <span className="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-1">Épreuve 2</span>
                  
                  <div className="flex gap-10">
                    <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-950/25 p-3 rounded-2xl border border-emerald-200">
                      <span className="text-xs font-bold font-mono">Chocolat</span>
                      <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-1">{"$p = \\frac{1}{4}$"}</span>
                      <div className="mt-3 border-t pt-1.5 text-[10px] text-slate-500 font-mono">
                        Poids = {"$\\frac{1}{2} \\times \\frac{1}{4} = \\frac{1}{8}$"}
                      </div>
                    </div>
                    <div className="flex flex-col items-center bg-rose-50 dark:bg-rose-950/25 p-3 rounded-2xl border border-rose-200">
                      <span className="text-xs font-bold font-mono">Crème</span>
                      <span className="text-rose-600 dark:text-rose-400 text-xs font-bold mt-1">{"$p = \\frac{3}{4}$"}</span>
                      <div className="mt-3 border-t pt-1.5 text-[10px] text-slate-500 font-mono">
                        Poids = {"$\\frac{1}{2} \\times \\frac{3}{4} = \\frac{3}{8}$"}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <TipBanner id="branches-multi-rule" title="La Loi Fondamentale multiplicative sur les chemins" type="warning">
          Pour trouver la probabilité d'un chemin complet (l'événement "obtenir un fruit, puis obtenir du chocolat"), on doit <strong>MULTIPLIER</strong> les probabilités rencontrées sur ce chemin. 
          <br />
          <span className="font-mono mt-2 block font-black text-rose-600">
            {"$p(\\text{Fruits et Chocolat}) = p(F) \\times p(C) = \\frac{1}{2} \\times \\frac{1}{4} = \\frac{1}{8}$"}
          </span>
        </TipBanner>
      </Section>

      {/* TWO EXERCICES RESOLUS DU BREVET SECTION */}
      <Section id="exercices-resolus" title="✏️ Exercices Résolus du Brevet Blanc" icon="✍️" color="emerald">
        
        {/* Exercise 1 */}
        <InteractiveExercise 
          title="Exercice 1 : Le Coffre Fort Fortifié aux 5 Cartes"
          question={(
            <div>
              <p className="mb-2">
                Un coffre-fort se verrouille à l'aide d'un tirage. Pour l'ouvrir, un pirate doit insérer une carte dans une fente. On possède 5 cartes distinctes dans un sac noir :
              </p>
              <ul className="list-disc ml-6 space-y-1 mb-3 text-slate-600 font-medium">
                <li>Carte <strong>A (As)</strong>, de valeur 1</li>
                <li>Carte <strong>B (Roi)</strong>, de valeur 10</li>
                <li>Carte <strong>C (Reine)</strong>, de valeur 10</li>
                <li>Carte <strong>D (Valet)</strong>, de valeur 10</li>
                <li>Carte <strong>X (Joker)</strong>, de valeur 0</li>
              </ul>
              <p className="font-bold">
                1. Quelle est la probabilité d'obtenir une carte d'une valeur supérieure ou égale à 10 ? <br />
                2. On tire une première carte, puis une deuxième carte SANS remise de la première. Quelle est la probabilité d'obtenir une somme totale d'une valeur de 20 ?
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Calcul du premier événement :</strong>
              <p className="mt-1 text-slate-600">
                L'univers total est composé de {"$5$"} issues possibles. 
                <br />
                Les cartes de valeur supérieure ou égale à 10 sont : B, C, et D. Elles constituent exactement {"$3$"} issues favorables.
                <br />
                La probabilité théorique simple est de : <strong>{"$p = \\frac{3}{5}$"}</strong> (soit 60%).
              </p>
            </>,
            <>
              <strong>2. Construction du second cas complexe (deux épreuves sans remise) :</strong>
              <p className="mt-1 text-slate-600">
                Puisqu'un pirate cherche à obtenir une somme égale à 20, le premier tirage et le second tirage doivent obligatoirement fournir une carte de valeur 10 (c'est-à-dire une carte parmi B, C ou D).
              </p>
            </>,
            <>
              <strong>3. Probabilité du premier tirage :</strong>
              <p className="mt-1 text-slate-600">
                L'urne possède 3 cartes favorables (B, C, D) sur un total de 5 cartes.
                <br />
                <code>{"$p_1 = \\frac{3}{5}$"}</code>.
              </p>
            </>,
            <>
              <strong>4. Probabilité du second tirage (sans remise !) :</strong>
              <p className="mt-1 text-slate-600">
                Puisqu'on n'a pas remis la première carte de valeur 10, il ne reste plus que 2 cartes de valeur 10 favorables.
                <br />
                Le nombre total de cartes dans l'urne a également baissé : il n'en reste plus que 4.
                <br />
                <code>{"$p_2 = \\frac{2}{4} = \\frac{1}{2}$"}</code>.
              </p>
            </>,
            <>
              <strong>5. Bilan cumulatif par le produit de Chasles-Laplace :</strong>
              <p className="mt-1 text-slate-600">
                On multiplie les probabilités des branches successives :
                <br />
                <code>{"$p(\\text{Somme 20}) = p_1 \\times p_2 = \\frac{3}{5} \\times \\frac{2}{4} = \\frac{6}{20} = \\frac{3}{10}$"}</code> (soit 30%).
              </p>
              <p className="font-bold text-emerald-600 mt-2">Le pirate a exactement 30% de chances de forcer le verrou !</p>
            </>
          ]}
        />

        {/* Exercise 2 */}
        <InteractiveExercise 
          title="Exercice 2 : La Loterie de la Fête Foraine"
          question={(
            <div>
              <p className="mb-2">
                À la fête des forains, une roulette est composée de 12 secteurs colorés identiques : 1 secteur <strong>Gagnant Or</strong>, 3 secteurs <strong>Gagnants Argent</strong>, et 8 secteurs <strong>Perdants Marron</strong>.
              </p>
              <p className="font-bold">
                On souhaite calculer la probabilité d'obtenir un gain (Or ou Argent) en appliquant deux méthodes distinctes.
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>Méthode Directe (Laplace) :</strong>
              <p className="mt-1 text-slate-600">
                On additionne les issues favorables : 1 (Or) + 3 (Argent) = 4 issues gagnantes.
                <br />
                Le total des issues possibles est de 12.
                <br />
                <code>{"$p(\\text{Gain}) = \\frac{4}{12} = \\frac{1}{3}$"}</code> (soit environ 33.3%).
              </p>
            </>,
            <>
              <strong>Méthode par l'Événement Contraire :</strong>
              <p className="mt-1 text-slate-600">
                On identifie l'opposé : perdre à la loterie. Il y a 8 secteurs perdants sur un total de 12.
                <br />
                <code>{"$p(\\text{Perte}) = \\frac{8}{12} = \\frac{2}{3}$"}</code>.
                <br />
                On applique la formule du contraire :
                <br />
                <code>{"$p(\\text{Gain}) = 1 - p(\\text{Perte}) = 1 - \\frac{2}{3} = \\frac{1}{3}$"}</code>.
              </p>
              <p className="font-bold text-emerald-600 mt-2">Les deux méthodes s'accordent à la perfection sur la fraction d'un tiers !</p>
            </>
          ]}
        />
      </Section>

      <Section id="flashcards" title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande d'exprimer la probabilité de faire "6" avec un dé sous TOUTES ses formes. Que veut-il ?</>}
            back={<>Il veut :<br/>1) La FRACTION : 1/6.<br/>2) Le DÉCIMAL : ~0.166.<br/>3) Le POURCENTAGE : ~16.6%.</>}
          />
          <Flashcard 
            front={<>Dans un jeu de 32 cartes (sans jokers), je veux un AS. Quelle est la probabilité ?</>}
            back={<>Combien y a-t-il d'AS (Favorables) ? Il y a 4 (Pique, Cœur, Carreau, Trèfle).<br/>Combien de cartes Total ? 32.<br/>Fraction : 4/32 qui se réduit en divisant par 4 = 1/8 (soit 12.5%).</>}
          />
          <Flashcard 
            front={<>Que vaut la somme des probabilités de toutes les branches issues d'un même nœud dans un arbre pondéré ?</>}
            back={<>La somme des probabilités d'un même nœud vaut <strong>toujours EXAMEN 1</strong> (ou 100%). C'est une règle absolue très utile pour compléter les arbres incomplets !</>}
          />
          <Flashcard 
            front={<>Si un événement A a une probabilité nulle (p = 0), comment le qualifie-t-on ?</>}
            back={<>C'est un <strong>événement impossible</strong> (ex: tirer une boule jaune dans l'urne virtuelle si vous n'en avez pas inséré !).</>}
          />
        </div>
      </Section>

      <Section id="faq" title="❓ Questions Fréquentes" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la différence fondamentale entre la probabilité théorique et la fréquence observée ?",
              answer: "La probabilité théorique est calculée de manière pure à l'esprit (ex : 50% de chances de faire pile). La fréquence de notre historique réel dépend des caprices de la réalité immédiate (ex : on peut très bien faire 3 faces d'affilée). Mais selon la loi statistique des grands nombres, si l'on répétait le lancer un million de fois, on convergerait strictement vers la valeur idéale théorique."
            },
            {
              question: "Peut-on additionner des probabilités d'événements distincts ?",
              answer: "Oui, mais uniquement si les événements sont incompatibles (qui ne peuvent pas se réaliser en même temps). Par exemple, sur notre dé, p(Obtenir 2 ou Obtenir 5) = p(2) + p(5) = 1/6 + 1/6 = 2/6."
            },
            {
              question: "Pourquoi le nombre 1 ou 0 sont les bornes absolues du hasard ?",
              answer: "Puisque les probabilités mesurent des rations d'issues réelles, une probabilité de 0 signifie l'absence totale de chemin d'issues, tandis qu'une probabilité de 100% (1) signifie que toutes les issues possibles sont couvertes par la question."
            }
          ]}
        />
      </Section>

      <Section id="quiz" title="🥇 Épreuve Spatiale Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est la probabilité d'obtenir un '7' avec un dé classique à 6 faces ?",
              options: [
                "1/6",
                "0",
                "1/7"
              ],
              correctAnswer: 1,
              explanation: "C'est un événement IMPOSSIBLE ! Un dé classique à six faces ne possède pas de numéro '7'. Sa probabilité d'apparition est strictement 0."
            },
            {
              question: "Si j'ai p(A) = 3/8 pour devenir riche aujourd'hui. Quelle est la probabilité (p contraire) de ne pas l'être ?",
              options: [
                "8/3",
                "0",
                "5/8"
              ],
              correctAnswer: 2,
              explanation: "Bien joué ! L'événement contraire complète l'univers jusqu'à 1. Ainsi : 1 - 3/8 = 5/8. J'ai 5 chances sur 8 d'échouer."
            },
            {
              question: "Dans notre urne Laplace ci-dessus, s'il y a 2 boules rouges, 3 boules bleues et 5 vertes. Quelle est la probabilité exacte d'une boule non verte ?",
              options: [
                "5/10 (50%)",
                "1/2 (50%)",
                "Tous les deux !"
              ],
              correctAnswer: 2,
              explanation: "Formidable ! Les issues non vertes regroupent les rouges et bleues (2 + 3 = 5). La fraction de Laplace est de 5/10, qui se simplifie en 1/2. Les deux écritures désignent donc la même vérité !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          id="essentials-checklist"
          items={[
            "J'ai compris l'expérience d'équiprobabilité (formula Laplace).",
            "Je sais que p(A) est strictement compris entre 0 et 1.",
            "Je maîtrise la formule du contraire : p(Barre A) = 1 - p(A).",
            "J'ai testé l'urne virtuelle et compris que la fréquence réelle s'approche de la théorie sur le grand nombre."
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

export default Course_College_3eme_05_Probabilites;
