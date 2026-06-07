import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { PieChart, Divide, X, Plus, Scaling, RotateCcw, Activity } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_4eme_04_Fractions: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Safe helper to render math
  const mathS = (tex: string) => <MathComponent math={tex} />;

  // Interactive Slicer states
  const [num, setNum] = useState<number>(3);
  const [den, setDen] = useState<number>(8);
  const [visualType, setVisualType] = useState<'pizza' | 'chocolate'>('pizza');

  // Addition game states
  const [numA, setNumA] = useState<number>(1);
  const [denA, setDenA] = useState<number>(2);
  const [numB, setNumB] = useState<number>(1);
  const [denB, setDenB] = useState<number>(3);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Math helper for circle paths
  const getSectorPath = (index: number, total: number): string => {
    if (total === 1) {
      return "M 50 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0";
    }
    const angleStep = (2 * Math.PI) / total;
    const startAngle = index * angleStep - Math.PI / 2;
    const endAngle = (index + 1) * angleStep - Math.PI / 2;

    const x1 = 50 + 40 * Math.cos(startAngle);
    const y1 = 50 + 40 * Math.sin(startAngle);
    const x2 = 50 + 40 * Math.cos(endAngle);
    const y2 = 50 + 40 * Math.sin(endAngle);

    return `M 50 50 L ${x1.toFixed(2)} ${y1.toFixed(2)} A 40 40 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
  };

  const handleSetDen = (val: number) => {
    if (val < 1) return;
    setDen(val);
    if (num > val) {
      setNum(val);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-04"
        title="Fractions et Opérations"
        subtitle="Domptez les dénominateurs et devenez l'As du Partage !"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Tables de multiplication absolues", "Simplification de fractions (5ème)"]}
        objectives={[
          "Mémoriser que l'Addition = Dénominateur Commun OBLIGATOIRE.",
          "Mémoriser que la Multiplication = Frappe toute droite sans réfléchir.",
          "Comprendre la Division : L'art du renversement (L'Inverse).",
          "Simplifier une formule avant de multiplier pour épargner ton cerveau."
        ]}
      />

      <Section title="🌟 Introduction : Le conflit des parts de pizza" icon="🍕" color="slate">
        <p>
          Si tu manges {"$\\frac{1}{2}$"} pizza (la moitié), et que ton ami mange {"$\\frac{1}{4}$"} (un quart). Vous avez mangé combien de pizzas au total ? Impossible d'additionner les chiffres directement en disant {"$1+1=2$"} et {"$2+4=6$"} car manger {"$\\frac{2}{6}$"} de pizza serait ridicule (c'est plus petit que la moitié !).
        </p>
        <p className="mt-4">
          Le domaine des fractions, c'est l'art d'utiliser le <strong>Numérateur</strong> (le nombre de parts choisies) et le <strong>Dénominateur</strong> (la taille de chaque part). Tu ne peux combiner que des parts de même taille ! Découvrons ensemble comment les manipuler sans douleur.
        </p>
      </Section>

      {/* SCHEMA INTERACTIF & APLI ENRICHIE */}
      <Section title="🎮 Simulateur Interactif : La Trancheuse Tactile" icon="⚙️" color="indigo">
        <p className="mb-6 text-muted-text">
          Manipule les réglettes pour changer le numérateur et le dénominateur de ta fraction. Observe instantanément la différence visuelle entre une pizza coupée en de grands secteurs et une barre de chocolat !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2rem] shadow-indigo-100/50 dark:shadow-none shadow-xl">
          {/* Controls */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <span className="text-xs font-mono text-indigo-500 font-bold uppercase tracking-widest block mb-2">Sélecteur de Format</span>
              <div className="flex gap-4">
                <button 
                  onClick={() => setVisualType('pizza')}
                  className={`flex-1 py-3 text-sm font-bold rounded-2xl border transition-all ${visualType === 'pizza' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'}`}
                >
                  🍕 Pizza Circulaire
                </button>
                <button 
                  onClick={() => setVisualType('chocolate')}
                  className={`flex-1 py-3 text-sm font-bold rounded-2xl border transition-all ${visualType === 'chocolate' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'}`}
                >
                  🍫 Barre Chocolat
                </button>
              </div>
            </div>

            {/* Numerator */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Numérateur (Haut, Parts prises) : <span className="font-mono text-xl text-indigo-600 font-extrabold">{num}</span></label>
                <div className="flex gap-2">
                  <button 
                    disabled={num <= 0}
                    onClick={() => setNum(prev => prev - 1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    -
                  </button>
                  <button 
                    disabled={num >= den}
                    onClick={() => setNum(prev => prev + 1)}
                    className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                  >
                    +
                  </button>
                </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max={den} 
                value={num}
                onChange={e => setNum(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            {/* Denominator */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Dénominateur (Bas, Total de Slices) : <span className="font-mono text-xl text-indigo-600 font-extrabold">{den}</span></label>
                <div className="flex gap-2">
                  <button 
                    disabled={den <= 1}
                    onClick={() => handleSetDen(den - 1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    -
                  </button>
                  <button 
                    disabled={den >= 24}
                    onClick={() => handleSetDen(den + 1)}
                    className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center font-bold text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900"
                  >
                    +
                  </button>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="24" 
                value={den}
                onChange={e => handleSetDen(parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-sm font-bold text-slate-500">Formule mathématique :</span>
              <div className="text-3xl my-2 flex justify-center items-center font-serif text-slate-800 dark:text-slate-100">
                <span className="flex flex-col items-center">
                  <span>{num}</span>
                  <span className="w-10 h-[3px] bg-slate-800 dark:bg-slate-200 my-1"></span>
                  <span>{den}</span>
                </span>
                <span className="mx-4 text-xl text-slate-400">=</span>
                <span className="font-mono text-2xl font-bold text-indigo-600">{(num / den).toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-2xl py-8 min-h-[250px] border border-slate-100 dark:border-slate-800">
            {visualType === 'pizza' ? (
              <svg width="220" height="220" viewBox="0 0 100 100" className="overflow-visible drop-shadow-lg">
                {/* Background Shadow Circle */}
                <circle cx="50" cy="50" r="41" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                {/* Visual Sectors */}
                {Array.from({ length: den }).map((_, i) => {
                  const isActive = i < num;
                  return (
                    <path
                      key={i}
                      d={getSectorPath(i, den)}
                      fill={isActive ? '#6366f1' : '#f1f5f9'}
                      stroke="#ffffff"
                      strokeWidth={den > 16 ? "0.4" : "1"}
                      className="transition-all duration-300 cursor-pointer hover:opacity-90"
                    />
                  );
                })}
                {/* Center Core Pin */}
                <circle cx="50" cy="50" r="2.5" fill="#475569" />
              </svg>
            ) : (
              <div className="grid w-full max-w-[280px] h-[160px] bg-slate-100 dark:bg-slate-900 duration-300 p-2 rounded-2xl shadow-inner gap-1 border border-slate-200 dark:border-slate-800" style={{ gridTemplateColumns: `repeat(${den}, 1fr)` }}>
                {Array.from({ length: den }).map((_, i) => {
                  const isActive = i < num;
                  return (
                    <div 
                      key={i} 
                      className={`h-full rounded-md transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-sm border border-indigo-700' : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Le saviez-vous ? InfoBlock */}
        <div className="mt-6">
          <InfoBlock title="Le saviez-vous ? De l'origine égyptienne" type="funfact">
            Au temps des Pharaons, on n'écrivait jamais des fractions complexes comme {"$\\frac{3}{5}$"}. Ils n'utilisaient QUE des fractions unitaires (dont le numérateur est 1), par exemple {"$\\frac{1}{2} + \\frac{1}{10}$"} pour représenter {"$\\frac{3}{5}$"}. C'était un casse-tête de scribes incroyable !
          </InfoBlock>
        </div>
      </Section>

      <Section title="1. Addition et Soustraction (La guerre des Dénominateurs)" icon="➕" color="indigo">
        <p className="mb-4">
          Tu ne peux JAMAIS fusionner des demis <><MathComponent math={"\\frac{1}{2}"} /></> avec des tiers <><MathComponent math={"\\frac{1}{3}"} /></>. Les morceaux n'ont pas la même taille sur le plateau de jeu. Tu dois les "re-découper" virtuellement pour créer un <strong>Dénominateur Commun</strong> (le même format mondial pour tous).
        </p>

        {/* COMPOSANT INTERACTIF : DEMONSTRATEUR D'ADDITION DE FRACTIONS */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm my-6">
          <h3 className="font-bold text-center text-slate-800 dark:text-slate-100 mb-6 flex justify-center items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" /> Laboratoire de l'Addition
          </h3>

          <div className="flex flex-col md:flex-row justify-around items-center gap-4 mb-6">
            {/* Fraction A */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-indigo-600 font-bold mb-1">Fraction A</span>
              <div className="flex items-center gap-1">
                <input 
                  type="number" 
                  min="1" 
                  max="5"
                  value={numA}
                  onChange={e => { setNumA(Math.min(5, Math.max(1, parseInt(e.target.value) || 1))); setShowResult(false); }}
                  className="w-12 text-center font-mono font-bold border border-slate-200 dark:border-slate-700 bg-card rounded-lg p-1 text-lg"
                />
                <span className="mx-1 text-slate-400">/</span>
                <input 
                  type="number" 
                  min="2" 
                  max="12"
                  value={denA}
                  onChange={e => { setDenA(Math.min(12, Math.max(2, parseInt(e.target.value) || 2))); setShowResult(false); }}
                  className="w-12 text-center font-mono font-bold border border-slate-200 dark:border-slate-700 bg-card rounded-lg p-1 text-lg"
                />
              </div>
            </div>

            <Plus className="w-8 h-8 text-indigo-500 mt-4 md:mt-0" />

            {/* Fraction B */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-indigo-600 font-bold mb-1">Fraction B</span>
              <div className="flex items-center gap-1">
                <input 
                  type="number" 
                  min="1" 
                  max="5"
                  value={numB}
                  onChange={e => { setNumB(Math.min(5, Math.max(1, parseInt(e.target.value) || 1))); setShowResult(false); }}
                  className="w-12 text-center font-mono font-bold border border-slate-200 dark:border-slate-700 bg-card rounded-lg p-1 text-lg"
                />
                <span className="mx-1 text-slate-400">/</span>
                <input 
                  type="number" 
                  min="2" 
                  max="12"
                  value={denB}
                  onChange={e => { setDenB(Math.min(12, Math.max(2, parseInt(e.target.value) || 2))); setShowResult(false); }}
                  className="w-12 text-center font-mono font-bold border border-slate-200 dark:border-slate-700 bg-card rounded-lg p-1 text-lg"
                />
              </div>
            </div>

            <button
              onClick={() => setShowResult(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md font-bold transition-all"
            >
              Égaliser &amp; Additionner
            </button>
          </div>

          {showResult ? (
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-sm space-y-3">
              <p className="font-bold text-center text-indigo-800 dark:text-indigo-300">🔎 Analyse étape par étape :</p>
              <div>
                <span>1. Les dénominateurs sont ({denA}) et ({denB}). Ce n'est pas égal !</span>
              </div>
              <div className="bg-card dark:bg-black/20 p-2 rounded border border-indigo-50/50">
                <span>Le dénominateur commun idéal est : {denA} × {denB} = <strong>{denA * denB}</strong>.</span>
              </div>
              <div>
                <span>2. On convertit chaque fraction :</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Fraction A : {"$\\frac{" + numA + "}{" + denA + "} = \\frac{" + numA + " \\times " + denB + "}{" + denA + " \\times " + denB + "} = \\mathbf{\\frac{" + (numA * denB) + "}{" + (denA * denB) + "}}$"}</li>
                  <li>Fraction B : {"$\\frac{" + numB + "}{" + denB + "} = \\frac{" + numB + " \\times " + denA + "}{" + denB + " \\times " + denA + "} = \\mathbf{\\frac{" + (numB * denA) + "}{" + (denA * denB) + "}}$"}</li>
                </ul>
              </div>
              <div className="bg-indigo-600 text-white p-3 rounded-xl font-bold flex flex-col items-center">
                <span>Résultat Brut :</span>
                <span className="text-lg">{"$\\frac{" + (numA * denB) + "}{" + (denA * denB) + "} + \\frac{" + (numB * denA) + "}{" + (denA * denB) + "} = \\frac{" + (numA * denB + numB * denA) + "}{" + (denA * denB) + "}$"}</span>
              </div>
            </div>
          ) : (
            <p className="text-center italic text-xs text-slate-400">Cliquez sur "Égaliser &amp; Additionner" pour voir l'effet laser.</p>
          )}
        </div>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800/50 shadow-sm my-6 flex flex-col items-center">
          <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-200 mb-4 pb-2 border-b border-indigo-100 dark:border-indigo-800/50 w-full text-center">Exemple d'exercice : <><MathComponent math={"\\frac{3}{4} - \\frac{1}{12}"} /></></h3>
          
          <ul className="space-y-4 font-mono text-center w-full max-w-lg">
            <li>
              <span className="text-slate-400 text-xs mb-1 block">1. Les dénominateurs sont (4) et (12). Je dois trouver le dénominateur commun :</span>
              <span className="bg-card dark:bg-slate-950 p-2 rounded block text-sm">Le 12 est un multiple de 4 ! Car {"$4 \\times 3 = 12$"}. Je change donc uniquement la première fraction !</span>
            </li>
            <li>
              <span className="text-slate-400 text-xs mb-1 block">2. La transformation du caméléon :</span>
              <span className="bg-card dark:bg-slate-950 p-2 rounded block"><><MathComponent math={"\\frac{3 \\times 3}{4 \\times 3} = \\frac{9}{12}"} /></></span>
            </li>
            <li>
              <span className="text-slate-400 text-xs mb-1 block">3. Le combat final à armes égales :</span>
              <span className="bg-card dark:bg-slate-950 p-2 rounded block font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 shadow-inner"><><MathComponent math={"\\frac{9}{12} - \\frac{1}{12} = \\frac{9 - 1}{12} = \\mathbf{\\frac{8}{12}}"} /></></span>
            </li>
          </ul>
        </div>

        <TipBanner title="Et après le combat : Réduisez vos blessés !" type="info">
          Une fraction n'est belle que <strong>simplifiée au maximum</strong>. Pour notre butin <MathComponent math={"8 / 12"} />, ils sont tous deux dans la table de 4 ! On divise par 4 en haut et en bas !<br/>
          Résultat final parfait : <><MathComponent math={"\\frac{2}{3}"} /></>. (Même valeur, mais bien plus élégant !)
        </TipBanner>

        <div className="mt-6">
          <InfoBlock title="Rappel important" type="reminder">
            Pour additionner ou soustraire deux fractions, on ne touche <strong>JAMAIS</strong> au dénominateur commun une fois qu'il est établi. On se contente d'ajouter ou de soustraire les nombres du haut (Numérateurs).
          </InfoBlock>
        </div>
      </Section>

      <Section title="2. La Multiplication (Le Bulldozer Aveugle)" icon="✖️" color="blue">
        <p className="mb-4">Oublie la douleur des dénominateurs communs ! La multiplication de fractions est un bulldozer déchaîné. Il avance en ligne droite, sans se poser de question.</p>

        <div className="bg-blue-50/50 dark:bg-blue-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-900 my-6 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <X className="w-16 h-16 text-blue-500 hidden md:block" />
          <div className="flex-1 text-center md:text-left">
            <p className="font-serif font-black text-2xl text-blue-800 dark:text-blue-200 mb-2">"LE HAUT MULTIPLIE LE HAUT,<br/>LE BAS MULTIPLIE LE BAS !"</p>
            <div className="font-mono text-xl bg-card dark:bg-slate-950 p-3 rounded-lg border shadow-inner mt-4 inline-block">
              <><MathComponent math={"\\frac{5}{7} \\times \\frac{3}{4} = \\frac{5 \\times 3}{7 \\times 4} = "} /></> <strong><><MathComponent math={"\\frac{15}{28}"} /></></strong>
            </div>
          </div>
        </div>

        <InteractiveExercise 
          title="Le secret de la Simplification Avant-Combat"
          question={<>L'équation terrifiante arrive : <><MathComponent math={"\\frac{25}{14} \\times \\frac{21}{10}"} /></>. Si tu lances le calcul en ligne brute, tu vas trouver un affreux <><MathComponent math={"\\frac{525}{140}"} /></> impossible à simplifier de tête de retour chez toi. Quelle est l'alliance secrète ?</>}
          steps={[
            <><strong>L'Astuce Mondiale :</strong> Le Grand Marché Universel. Lors d'une multiplication, TOUS les nombres du haut partagent le même sommet, idem pour le bas.</>,
            <>On décompose les nombres en facteurs premiers : <br/>
            - {"$25$"} devient {"$5 \\times 5$"}<br/>
            - {"$21$"} devient {"$3 \\times 7$"}<br/>
            - {"$14$"} devient {"$2 \\times 7$"}<br/>
            - {"$10$"} devient {"$2 \\times 5$"}</>,
            <>On réunit le tout sous le même toit : <br/>
            {"$\\frac{5 \\times 5 \\times 3 \\times 7}{2 \\times 7 \\times 2 \\times 5}$"}</>,
            <><strong>Le Massacre d'Or :</strong> On élimine le 5 du haut et du bas, ainsi que le 7 du haut et du bas !</>,
            <>Que reste-t-il sur le champ de bataille ? <br/>
            - En haut : {"$5 \\times 3 = 15$"} <br/>
            - En bas : {"$2 \\times 2 = 4$"}</>,
            <>Résultat pur, déjà simplifié au micron : <strong><><MathComponent math={"\\frac{15}{4}"} /></></strong> ! Incroyable non ?</>
          ]}
        />
      </Section>

      <InfoBlock type="info" title="Zoom sur : Ne pas confondre Inverse et Opposé">
        C&apos;est le piège récurrent au collège !
        <br />- L&apos;<strong>opposé</strong> d&apos;un nombre qui change uniquement son signe : l&apos;opposé de {"$\\frac{3}{4}$"} est {"$-\\frac{3}{4}$"}.
        <br />- L&apos;<strong>inverse</strong> d&apos;une fraction, qui consiste à permuter numérateur et dénominateur : l&apos;inverse de {"$\\frac{3}{4}$"} est {"$\\frac{4}{3}$"}.
        <br />Inverser ne change jamais le signe d&apos;origine !
      </InfoBlock>

      <Section title="3. La Division (L'Art de l'Inverse)" icon="➗" color="emerald">
        <p className="mb-4">Personne n'aime diviser des fractions. C'est illisible et foudroyant à écrire sur une copie à cause des lignes d'étages superposées. La solution ? <strong>On sabote le duel en changeant la règle !</strong></p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-950/35 p-6 rounded-[2rem] border-l-8 border-emerald-500 shadow-sm my-6 text-center">
          <h3 className="font-bold text-lg mb-4 text-emerald-900 dark:text-emerald-100">La Proclamation Impériale Divisionnelle</h3>
          <p className="font-serif italic text-lg mb-6">
            "Diviser par une fraction, c'est purement et simplement MULTIPLIER par son INVERSE !"
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 font-mono text-xl">
            <div className="bg-card dark:bg-slate-900 p-3 border shadow-inner rounded-xl">
              <><MathComponent math={"\\frac{5}{3} \\div "} /></> <strong><><MathComponent math={"\\frac{7}{4}"} /></></strong>
            </div>
            <div className="mx-4 text-emerald-500 font-bold rotate-90 md:rotate-0">&rarr;</div>
            <div className="bg-card dark:bg-slate-900 p-3 border border-emerald-500 shadow-inner rounded-xl font-bold">
              <><MathComponent math={"\\frac{5}{3} \\times "} /></> <strong><><MathComponent math={"\\frac{4}{7}"} /></></strong>
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-500 max-w-md mx-auto">
            J'ai changé le signe de division en multiplication, MAIS en contrepartie absolue, j'ai fait faire un poirier acrobatique parfait uniquement à la fraction de droite (4 monte au balcon, 7 descend à la cave !).
          </p>
          <div className="mt-4 bg-emerald-600 text-white p-2 rounded-lg font-bold w-max mx-auto shadow-md">
            <><MathComponent math={"= \\frac{20}{21}"} /></>
          </div>
        </div>
      </Section>

      {/* RESOLVED EXERCISES (EXERCICES RESOLUS) - OBLIGATOIRE */}
      <Section title="📝 Exercices Résolus de Combat" icon="✍️" color="purple">
        <div className="space-y-6">
          <InteractiveExercise 
            title="Exercice Résolu 1 : L'Héritage Forcené"
            question={<p>L'oncle Picsou lègue son coffre d'or de la façon suivante : {"$\\frac{1}{3}$"} pour Riri, {"$\\frac{2}{5}$"} pour Fifi. Quelle fraction du butin reste-t-il pour Loulou ?</p>}
            steps={[
              <><strong>Étape 1 : Calculer la part combinée des deux premiers frères</strong><br/>
              Pour ajouter {"$\\frac{1}{3}$"} et {"$\\frac{2}{5}$"}, on trouve le dénominateur commun : {"$3 \\times 5 = 15$"}.<br/>
              {"$\\frac{1 \\times 5}{3 \\times 5} + \\frac{2 \\times 3}{5 \\times 3} = \\frac{5}{15} + \\frac{6}{15} = \\frac{11}{15}$"} du trésor.</>,
              <><strong>Étape 2 : Déterminer la part restante</strong><br/>
              Le coffre entier représente l'unité {"$1$"}, soit sur notre nouveau standard : {"$\\frac{15}{15}$"}.<br/>
              Loulou aura donc : {"$\\frac{15}{15} - \\frac{11}{15} = \\mathbf{\\frac{4}{15}}$"} du total !</>
            ]}
          />

          <InteractiveExercise 
            title="Exercice Résolu 2 : L'Enchaînement Suprême (PEMDAS)"
            question={<p>Détermine le résultat exact de l'expression : {"$A = \\frac{2}{3} - \\frac{5}{3} \\times \\frac{1}{4}$"}</p>}
            steps={[
              <><strong>Étape 1 : Priorité absolue à la Reine des opérations</strong><br/>
              La multiplication a priorité absolue sur la soustraction. On doit d'abord calculer : <br/>
              {"$B = \\frac{5}{3} \\times \\frac{1}{4} = \\frac{5 \\times 1}{3 \\times 4} = \\frac{5}{12}$"}.</>,
              <><strong>Étape 2 : Opérer la soustraction sur un standard égalisé</strong><br/>
              L'équation originale devient : {"$A = \\frac{2}{3} - \\frac{5}{12}$"}.<br/>
              Le dénominateur commun est 12, car {"$3 \\times 4 = 12$"}.<br/>
              On convertit {"$\\frac{2}{3}$"} :<br/>
              {"$\\frac{2 \\times 4}{3 \\times 4} = \\frac{8}{12}$"}.</>,
              <><strong>Étape 3 : Soustraction finale</strong><br/>
              {"$A = \\frac{8}{12} - \\frac{5}{12} = \\mathbf{\\frac{3}{12}}$"}.<br/>
              On simplifie par 3 en haut et en bas : {"$A = \\mathbf{\\frac{1}{4}}$"}. Splendide !</>
            ]}
          />
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande l'<strong>Opposé</strong> de <><MathComponent math={"\\frac{3}{5}"} /></> et l'<strong>Inverse</strong> de <><MathComponent math={"\\frac{3}{5}"} /></>. Quelle est la distinction ?</>}
            back={<><strong>Ne confonds jamais les deux !</strong><br/>- <strong>Opposé</strong> (jeu des signes de miroir) = <strong><><MathComponent math={"-\\frac{3}{5}"} /></></strong><br/>- <strong>Inverse</strong> (les cascades acrobatiques) = <strong><><MathComponent math={"\\frac{5}{3}"} /></></strong>.</>}
          />
          <Flashcard 
            front={<>Si j'ai le nombre entier "7" tout seul dans mes calculs, comment l'intégrer à d'autres fractions ?</>}
            back={<><strong>Tout entier cache une fraction !</strong><br/>Le 7 est secrètement la fraction <strong><><MathComponent math={"\\frac{7}{1}"} /></></strong>. Tu peux l'utiliser comme tel, et multiplier le haut et le bas par 2 pour générer son clone <><MathComponent math={"\\frac{14}{2}"} /></> !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'additionne sans dénominateur commun : 1/2 + 1/3 = 2/5. Que se passe-t-il ?",
              answer: "Les enseignants appellent ça 'le Dénominateur de l'Angoisse'. C'est une faute théorique majeure : cela revient à additionner des patates et des carottes. Vous obtiendrez systématiquement 0 à la question !"
            },
            {
              question: "Pourquoi multiplier deux fractions donne parfois un résultat plus petit ?",
              answer: "Parce que vous prenez une fraction de part ! Si vous avez la moitié (1/2) d'un gâteau, et que vous la multipliez par la moitié (1/2), vous cherchez la moitié de la moitié, ce qui donne un quart (1/4). Cela rétrécie l'entité !"
            },
            {
              question: "Est-ce que l'inverse de zéro existe en fraction ?",
              answer: "Absolument pas ! Si vous aviez 0/1, l'inverse serait 1/0. Or, diviser par zéro est mathématiquement interdit et détruit les calculateurs mondiaux !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Devant le calcul : ( 1/2 + 3/4 ). Que dois-tu opérer en priorité ?",
              options: [
                "Je tape sans réfléchir : Haut + Haut (4) et Bas + Bas (6). Donc 4/6 !",
                "Je multiplie le haut et le bas de 1/2 par 2 pour générer 2/4. J'aurai (2/4 + 3/4) = 5/4 !",
                "Je dis que 2 et 4 c'est la table de 8 et je fais 8 partout."
              ],
              correctAnswer: 1,
              explanation: "Exact ! On trouve le dénominateur commun 4. La fraction 1/2 se transforme en 2/4. Ensuite, on fait 2 + 3 = 5 sur un socle de 4."
            },
            {
              question: "Je dois opérer la division suivante : 8/3 ÷ 5/2. Comment faire ?",
              options: [
                "Ça donne 8/3 × 5/2 = 40/6 simplifié en 20/3 !",
                "Je fuis le duel en transformant le tout : 8/3 × 2/5 = 16/15 !",
                "Je divise le haut (8÷5) et le bas (3÷2) séparément."
              ],
              correctAnswer: 1,
              explanation: "Magnifique ! Diviser revient à multiplier par son inverse. La deuxième fraction plonge au poirier (5/2 devient 2/5)."
            },
            {
              question: "Que vaut la fraction issue de cette expression : 5 × (2/3) ?",
              options: [
                "10/15 (on multiplie 5 en haut et en bas)",
                "10/3 (on multiplie 5 uniquement en haut car 5 = 5/1)",
                "impossible à calculer"
              ],
              correctAnswer: 1,
              explanation: "Bravo ! En se rappelant que 5 = 5/1, on multiplie en ligne droite : le haut avec le haut (5×2=10) et le bas avec le bas (1×3=3)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je ne multiplierai jamais en Croix pour de simples additions.",
            "Je simplifie toujours une multiplication de fractions à l'aide de décompositions astucieuses.",
            "Je transforme systématiquement toute division de fractions en un produit inversé."
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

export default Course_College_4eme_04_Fractions;
