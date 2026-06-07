import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { BarChart3, PieChart, Activity, Calculator, LineChart, Plus, Trash2, RefreshCw } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

// Interactive Data Analyzer with SVG Chart Visualizer
const InteractiveDataExplorer: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([12, 16, 8, 15, 10, 13]);
  const [newValueInput, setNewValueInput] = useState<string>('');

  // Handle value change for elements
  const updateDataPoint = (index: number, val: number) => {
    const updated = [...dataPoints];
    updated[index] = Math.max(0, Math.min(20, val)); // restrict scores between 0 and 20
    setDataPoints(updated);
  };

  // Add a new value
  const addValue = () => {
    const parsed = parseFloat(newValueInput);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 20) {
      if (dataPoints.length < 12) {
        setDataPoints([...dataPoints, parsed]);
        setNewValueInput('');
      }
    }
  };

  // Delete a value
  const removeValue = (index: number) => {
    if (dataPoints.length > 3) {
      setDataPoints(dataPoints.filter((_, i) => i !== index));
    }
  };

  // Reset to default
  const resetToDefault = () => {
    setDataPoints([12, 16, 8, 15, 10, 13]);
  };

  // Calculations
  const count = dataPoints.length;
  const sorted = [...dataPoints].sort((a, b) => a - b);
  const sum = dataPoints.reduce((acc, curr) => acc + curr, 0);
  const average = sum / count;
  const minim = Math.min(...dataPoints);
  const maxim = Math.max(...dataPoints);
  const range = maxim - minim;

  // Median Calculation details
  let median = 0;
  let medianStepText = '';
  if (count % 2 === 1) {
    const midIdx = Math.floor(count / 2);
    median = sorted[midIdx];
    medianStepText = `Le nombre d'éléments (${count}) est impair. La médiane est l'élément central situé à la position (N+1)/2, soit l'indice ${midIdx + 1} du classement trié.`;
  } else {
    const midIdx1 = (count / 2) - 1;
    const midIdx2 = count / 2;
    median = (sorted[midIdx1] + sorted[midIdx2]) / 2;
    medianStepText = `Le nombre d'éléments (${count}) est pair. La médiane est la moyenne arithmétique de deux valeurs centrales à l'indice ${midIdx1 + 1} (${sorted[midIdx1]}) et ${midIdx2 + 1} (${sorted[midIdx2]}).`;
  }

  // Bar dimensions for the SVG Chart
  const svgWidth = 360;
  const svgHeight = 200;
  const paddingLeft = 30;
  const paddingRight = 10;
  const paddingTop = 20;
  const paddingBottom = 25;
  const usableWidth = svgWidth - paddingLeft - paddingRight;
  const usableHeight = svgHeight - paddingTop - paddingBottom;
  const barWidth = Math.min(25, (usableWidth / count) - 4);

  return (
    <div className="not-prose bg-card border border-border rounded-[2rem] p-6 md:p-8 my-8 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-indigo-500" />
          <h3 className="text-xl font-bold text-foreground">Schéma Interactif : Explorateur de Data en Temps Réel</h3>
        </div>
        <button 
          onClick={resetToDefault} 
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
          title="Réinitialiser"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Réinitialiser
        </button>
      </div>

      <p className="text-sm text-muted-text mb-6">
        Ajustez les notes (curseurs) ou insérez-en de nouvelles. Observez instantanément l'emplacement de la moyenne et de la médiane se tracer graphiquement au milieu des colonnes !
      </p>

      {/* Grid view of sliders */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
        {dataPoints.map((pt, idx) => (
          <div key={idx} className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400">Note N°{idx + 1}</span>
            <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{pt}</span>
            
            <input 
              type="range"
              min="0"
              max="20"
              step="1"
              value={pt}
              onChange={(e) => updateDataPoint(idx, parseInt(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer my-2"
            />
            
            {dataPoints.length > 3 && (
              <button 
                onClick={() => removeValue(idx)}
                className="text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 p-1 rounded-full transition"
                title="Supprimer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Inputs to add values */}
      {dataPoints.length < 12 && (
        <div className="flex sm:flex-row gap-2 max-w-sm mb-6 items-center">
          <input 
            type="number"
            min="0"
            max="20"
            step="0.5"
            placeholder="Nouvelle note (0-20)"
            value={newValueInput}
            onChange={(e) => setNewValueInput(e.target.value)}
            className="flex-1 bg-muted border border-border rounded-xl px-4 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <button 
            onClick={addValue}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl flex items-center gap-1.5 transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      )}

      {/* SVG Chart & Stats Breakdown Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
        
        {/* SVG visualizer column */}
        <div className="lg:col-span-8 flex justify-center items-center bg-card rounded-2xl p-4 border border-dashed border-slate-200 dark:border-slate-800 h-64">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full max-h-[220px]" style={{ overflow: 'visible' }}>
            {/* Grid background lines */}
            {[0, 5, 10, 15, 20].map((gridVal) => {
              const yPos = paddingTop + usableHeight - (gridVal / 20) * usableHeight;
              return (
                <g key={gridVal} opacity="0.3">
                  <line x1={paddingLeft} y1={yPos} x2={svgWidth - paddingRight} y2={yPos} stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2,2" />
                  <text x={paddingLeft - 8} y={yPos + 4} fill="#64748b" fontSize="9" textAnchor="end" fontWeight="bold">{gridVal}</text>
                </g>
              );
            })}

            {/* Render bars for scores */}
            {dataPoints.map((pt, idx) => {
              const xPos = paddingLeft + (idx * (usableWidth / count)) + ((usableWidth / count - barWidth) / 2);
              const barHeight = (pt / 20) * usableHeight;
              const yPos = paddingTop + usableHeight - barHeight;

              return (
                <g key={idx}>
                  {/* Cylinder styled column with gradients */}
                  <rect 
                    x={xPos} 
                    y={yPos} 
                    width={barWidth} 
                    height={barHeight} 
                    fill="#a5b4fc" 
                    rx="4" 
                    stroke="#4f46e5" 
                    strokeWidth="1.5" 
                    opacity="0.8"
                  />
                  <text x={xPos + barWidth/2} y={yPos - 5} fill="#4f46e5" fontSize="9" fontWeight="extrabold" textAnchor="middle">{pt}</text>
                  <text x={xPos + barWidth/2} y={svgHeight - paddingBottom + 14} fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">N{idx+1}</text>
                </g>
              );
            })}

            {/* Horizontal Line for calculated Mean (Moyenne) */}
            {average > 0 && (
              <g>
                <line 
                  x1={paddingLeft} 
                  y1={paddingTop + usableHeight - (average / 20) * usableHeight} 
                  x2={svgWidth - paddingRight} 
                  y2={paddingTop + usableHeight - (average / 20) * usableHeight} 
                  stroke="#fbbf24" 
                  strokeWidth="2.5" 
                  strokeDasharray="4,2" 
                />
                <text x={svgWidth - paddingRight - 4} y={paddingTop + usableHeight - (average / 20) * usableHeight - 6} fill="#d97706" fontSize="9" fontWeight="extrabold" textAnchor="end">Moyenne: {average.toFixed(1)}</text>
              </g>
            )}

            {/* Horizontal Line for calculated Median (Médiane) */}
            {median > 0 && (
              <g>
                <line 
                  x1={paddingLeft} 
                  y1={paddingTop + usableHeight - (median / 20) * usableHeight} 
                  x2={svgWidth - paddingRight} 
                  y2={paddingTop + usableHeight - (median / 20) * usableHeight} 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  strokeDasharray="1,2" 
                />
                <text x={paddingLeft + 1} y={paddingTop + usableHeight - (median / 20) * usableHeight - 6} fill="#ef4444" fontSize="9" fontWeight="extrabold">Médiane: {median.toFixed(1)}</text>
              </g>
            )}
          </svg>
        </div>

        {/* Statistical summary list column */}
        <div className="lg:col-span-4 flex flex-col gap-3 text-sm">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <h4 className="font-extrabold text-slate-500 mb-3 uppercase text-xs tracking-wider">Statistiques :</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-semibold">Trier la série :</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{sorted.join(' • ')}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">Moyenne :</span>
                <span className="font-mono font-black text-indigo-700 dark:text-indigo-300">{average.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-rose-600 dark:text-rose-400 font-bold">Médiane :</span>
                <span className="font-mono font-black text-rose-700 dark:text-rose-300">{median.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Étendue (écart) :</span>
                <span className="font-mono font-black text-emerald-700 dark:text-emerald-300">{range} <span className="text-[10px] text-slate-400 font-normal">({maxim} - {minim})</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100/50 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200">
        <strong>Déduction de la Médiane sur ce classement :</strong><br />
        {medianStepText}
      </div>
    </div>
  );
};

const Course_College_3eme_10_Statistiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-3EME-10"
        title="Statistiques et Analyse des Données"
        subtitle="Devenez l'analyste maître de la Data !"
        duration="1h"
        level="3ème (Cycle 4)"
        prerequisites={["Calcul avec des fractions", "La notion de pourcentage"]}
        objectives={[
          "Calculer une Moyenne arithmétique simple et une Moyenne Pondérée.",
          "Déterminer la Médiane d'une série statistique (diviser d'un bloc en deux).",
          "Calculer l'Étendue de la série pour mesurer la dispersion.",
          "Interpréter avec rigueur des Histogrammes et des Diagrammes Circulaires."
        ]}
      />

      <Section title="🌟 Introduction : Le pouvoir d'extraire la vérité" icon="📊" color="slate">
        <p>
          Si je te présente une liste brute de 2 000 notes d'un concours national, ton cerveau n'y verra qu'un amas indéchiffrable de bruit. C'est ici que les <strong>Statistiques</strong> interviennent comme un super-pouvoir mathématique : elles permettent de <strong>résumer ces montagnes de chiffres</strong> en trois indicateurs d'une précision diabolique (Moyenne, Médiane, Étendue).
        </p>
        <p className="mt-4">
          De grands réseaux de distribution comme Amazon, Spotify ou TikTok utilisent ces méthodes de base en permanence pour comprendre tes habitudes, segmenter les types de profils, et modéliser l’activité globale.
        </p>
      </Section>

      <Section title="1. La Moyenne (Le barycentre d'équilibre)" icon="⚖️" color="indigo">
        <p className="mb-4 text-sm md:text-base">
          La moyenne est l'indicateur de <strong>partage équitable idéal</strong>. Si on devait rassembler toutes les richesses et les redistribuer équitablement à chaque individu de la cohorte, quelle serait la valeur reçue par chacun ?
        </p>
        
        <h3 className="font-extrabold text-lg mb-2 text-indigo-900 dark:text-indigo-200">A. La Moyenne Simple</h3>
        <p className="text-sm mb-3">On additionne toutes les valeurs de la série et on divise par le nombre total de contributeurs.</p>
        <div className="bg-muted p-4 rounded-xl mb-4 font-mono text-center font-bold text-foreground">
          {"$M = \\frac{\\text{Somme de toutes les valeurs}}{\\text{Effectif Total}}$"}
        </div>

        <h3 className="font-extrabold text-lg mb-2 mt-6 text-indigo-900 dark:text-indigo-200">B. La Moyenne Pondérée (avec coefficients de poids)</h3>
        <p className="text-sm mb-4 leading-relaxed">
          Quand certaines valeurs pèsent plus lourd que d'autres (comme une note de contrôle coefficient 3 contre une note d'exercice coefficient 1) ou qu'un effectif multiple les amplifie.
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-800 shadow-sm flex flex-col md:flex-row gap-6 items-center">
          <Calculator className="w-16 h-16 text-indigo-500 hidden md:block" />
          <div className="flex-1">
            <p className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Exemple des contrôles trimestriels :</p>
            <table className="w-full text-left border-collapse mb-4 text-xs md:text-sm">
              <thead>
                <tr className="border-b border-indigo-100 dark:border-indigo-800">
                  <th className="p-2">Note (sur 20)</th>
                  <th className="p-2 border-l border-indigo-100 dark:border-indigo-800 font-mono">10</th>
                  <th className="p-2 border-l border-indigo-100 dark:border-indigo-800 font-mono">15</th>
                  <th className="p-2 border-l border-indigo-100 dark:border-indigo-800 font-mono">8</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-bold">Effectif (Pondération)</td>
                  <td className="p-2 border-l border-indigo-100 dark:border-indigo-800 font-mono">1</td>
                  <td className="p-2 border-l border-indigo-100 dark:border-indigo-800 font-mono text-indigo-600 dark:text-indigo-400 ">3</td>
                  <td className="p-2 border-l border-indigo-100 dark:border-indigo-800 font-mono">2</td>
                </tr>
              </tbody>
            </table>
            <div className="font-mono bg-card dark:bg-slate-900 p-4 rounded-xl text-xs md:text-sm border border-indigo-100 dark:border-indigo-800/80 shadow-inner leading-relaxed overflow-x-auto text-left">
              {"$M = \\frac{(10 \\times 1) + (15 \\times 3) + (8 \\times 2)}{1 + 3 + 2}$"}<br/><br/>
              {"$M = \\frac{10 + 45 + 16}{6} = \\frac{71}{6} \\approx 11,83$"}
            </div>
          </div>
        </div>

        <InfoBlock title="Le saviez-vous ? L'origine étymologique des « Statistiques »" type="funfact">
          Le mot « statistique » vient du mot latin « status », qui signifie État. À l&apos;origine, les statistiques désignaient exclusivement la collecte méthodique d&apos;informations démographiques et fiscales par les rois et les empereurs pour dénombrer leur peuple, organiser leurs armées et prélever les impôts. C&apos;est la science originelle des souverains !
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : Le paradoxe de Simpson, le piège le plus sournois">
          Le paradoxe de Simpson est un phénomène d&apos;analyse de données très célèbre : une tendance observée de manière systématique dans plusieurs groupes distincts de données peut s&apos;inverser totalement lorsque ces groupes sont agrégés et combinés ensemble ! 
          <br />Par exemple, un médicament peut sembler plus efficace qu&apos;un autre lors de deux études cliniques séparées (une sur les hommes, une sur les femmes), mais s&apos;avérer statistiquement moins efficace si l&apos;on fusionne la cohorte d&apos;hommes et de femmes dans un même tableau global. C&apos;est pour cela qu&apos;il faut toujours analyser les variables cachées des statistiques !
        </InfoBlock>
      </Section>

      <Section title="2. La Médiane (Le juste séparateur des mondes)" icon="⚔️" color="rose">
        <p className="mb-4">
          La moyenne a un gros défaut : elle est très sensible aux valeurs extrêmes (si Bill Gates entre dans un bar, la moyenne de richesse du bar dépasse un milliard de dollars, ce qui ne représente pourtant l'état de personne !). <br/>
          La <strong>Médiane</strong> est quant à elle incorruptible. <strong>C'est une barricade qui sépare la série triée en deux tranches d'un effectif rigoureusement identique : 50% en deçà, et 50% au-delà.</strong>
        </p>

        <InteractiveExercise 
          title="L'art du Tri Préparatoire"
          question={<>Calculer la médiane de cette série de salaires d'une start-up : <em>2000€, 1500€, 50000€, 1800€, 1600€</em></>}
          steps={[
            <>
              <strong>🛑 ALERTE PIÈGE N°1 :</strong> Tout calcul sans tri préalable conduit à une erreur automatique ! La première tâche obligatoire est d'<strong>ordonner les valeurs par ordre croissant</strong>.
            </>,
            <>
              <strong>Rangement par ordre croissant :</strong><br/>
              1500€ • 1600€ • <strong>1800€</strong> • 2000€ • 50000€
            </>,
            <>
              <strong>Déduction de l'élément central :</strong><br/>
              Il y a 5 valeurs (un total IMPAIR). L'entité centrale se trouve au milieu, à la 3ème colonne.
            </>,
            <>
              <strong>Résultat final :</strong><br/>
              La médiane est de <strong>1800€</strong>. Il y a précisément deux salaires plus modestes d'un côté (1500, 1600) et deux salaires plus élevés de l'autre (2000, 50000). Le salaire démesuré du Boss (50 000€) n'a eu aucune influence sur notre calcul !
            </>
          ]}
        />

        <InfoBlock title="Règle sur les effectifs pairs ⚖️" type="warning">
          Si votre cohorte contient un nombre pair de lignes :<br/>
          Série ordonnée : 10 • 12 • <strong>14 • 16</strong> • 18 • 20 (Effectif total = 6).<br/>
          Le milieu se situe exactement dans l'espace vide entre le 3ème (14) et le 4ème élément (16).<br/>
          On effectue la moyenne de ces deux valeurs tampons : <br/>
          {"$\\text{Médiane} = \\frac{14 + 16}{2} = 15$"} !
        </InfoBlock>
      </Section>

      {/* Embedded dynamic simulator layout */}
      <InteractiveDataExplorer />

      <Section title="3. L'Étendue (L'indicateur de dispersion absolue)" icon="📏" color="emerald">
        <p className="mb-4 leading-relaxed">
          C'est un calcul d'une rapidité redoutable qui mesure la volatilité, la tension ou <strong>l'écart extrême</strong> entre les valeurs d'une même étude.
        </p>
        
        <div className="bg-emerald-50/50 dark:bg-emerald-900/20 py-5 px-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center text-lg shadow-sm border-b-4 border-b-emerald-500 mb-6">
          <strong>{"$\\text{Étendue} = \\text{Valeur Maximale} - \\text{Valeur Minimale}$"}</strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="bg-card p-5 rounded-2xl border border-border">
            <h4 className="font-bold mb-2 text-emerald-900 dark:text-emerald-200">Classe Unie (Étendue = 2)</h4>
            <p className="text-sm">Notes : 11 • 11 • 12 • 12 • 13</p>
            <p className="text-xs text-muted-text mt-3">L'effectif a un niveau d'apprentissage extrêmement resserré et homogène.</p>
          </div>
          
          <div className="bg-card p-5 rounded-2xl border border-border">
            <h4 className="font-bold mb-2 text-rose-900 dark:text-rose-200">Classe Éclatée (Étendue = 18)</h4>
            <p className="text-sm">Notes : 2 • 4 • 12 • 19 • 20</p>
            <p className="text-xs text-muted-text mt-3">Une hétérogénéité violente sépare les élèves en grande difficulté des profils d'élite.</p>
          </div>
        </div>
        
        <p className="text-sm italic text-center text-slate-500 mt-4 leading-relaxed">
          Notez bien que la Moyenne de ces deux classes de 5 élèves est EXACTEMENT IDENTIQUE (11,8) ! L'étude de l'Étendue est donc vitale pour révéler des disparités invisibles via la seule moyenne.
        </p>
      </Section>

      <Section title="4. Analyser les Outils Graphiques" icon="📈" color="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2rem] border border-sky-200 dark:border-sky-800 shadow-sm">
            <h4 className="font-bold text-sky-800 dark:text-sky-200 mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-500" /> L'Histogramme & Diagramme en barres
            </h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Modélise précisément la distribution des effectifs. Plus la colonne est élancée, plus la quantité de réponses ou d’individus enregistrée dans cette classe est écrasante.
            </p>
          </div>
          
          <div className="bg-purple-50/50 dark:bg-purple-900/20 p-6 rounded-[2rem] border border-purple-150 dark:border-purple-800 shadow-sm">
            <h4 className="font-bold text-purple-900 dark:text-purple-200 mb-3 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-500" /> Le Diagramme Circulaire (Camembert)
            </h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Idéal pour observer de manière instantanée des pourcentages de répartition géométrique. <br />
              <strong>Astuce Proportionnelle :</strong> La totalité du disque correspond au total de l'effectif soit {"$360^\\circ$"}, ce qui se convertit simplement à base de tableau classique de produit en croix !
            </p>
          </div>
        </div>
      </Section>

      <Section title="5. Exercices Résolus" icon="📝" color="rose">
        <InteractiveExercise
          title="Exercice 1 : Calcul de moyenne pondérée complète"
          question={
            <>
              Un élève a obtenu les notes suivantes au cours de son trimestre : <br/>
              - Récitation : {"$14/20$"} (coefficient 1)<br/>
              - Devoir à la maison : {"$18/20$"} (coefficient 1)<br/>
              - Examen final de synthèse : {"$9/20$"} (coefficient 3)<br/>
              Déterminer sa moyenne trimestrielle.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Lister les multiplications de notes par leurs coefficients</strong><br/>
              On calcule la somme pondérée en multipliant chaque élément par son coefficient : <br/>
              Somme des notes pondérées = {"$(14 \\times 1) + (18 \\times 1) + (9 \\times 3) = 14 + 18 + 27 = 59$"}.
            </>,
            <>
              <strong>Étape 2 : Diviser par la somme cumulée des coefficients</strong><br/>
              La somme des coefficients vaut {"$1 + 1 + 3 = 5$"}.<br/>
              Moyenne trimestrielle = {"$\\frac{59}{5} = 11,8$"}.<br/>
              Malgré la bévue sur l'évaluation finale (qui a abaissé l'ensemble du bilan en raison de son poids élevé), l'élève conserve une moyenne honorable au-dessus de la moyenne.
            </>
          ]}
        />

        <InteractiveExercise
          title="Exercice 2 : Reconstruction d'un effectif"
          question={
            <>
              Dans un séminaire professionnel, l'étude d'âge des 4 participants donne les valeurs triées suivantes : <br/>
              {"$24$ • $26$ • $X$ • $42$ ans"}. <br/>
              Puisque l'on sait que la Médiane est de {"$29$ ans"}, calculez l'âge inconnu {"$X$"} de ce participant.
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Analyser l'effectif pair</strong><br/>
              L'effectif est de 4 (un nombre pair). La Médiane arithmétique est issue de la moyenne des deux membres au centre, soit le 2ème et le 3ème élément.<br/>
              {"$\\text{Médiane} = \\frac{26 + X}{2}$"}.
            </>,
            <>
              <strong>Étape 2 : Résolution d'équation</strong><br/>
              On dispose de l'égalité : {"$29 = \\frac{26 + X}{2}$"}.<br/>
              En multipliant par 2 de chaque côté, on trouve : {"$58 = 26 + X$"}.<br/>
              Puis par soustraction : {"$X = 58 - 26 = 32$ ans"}. Le participant manquant a 32 ans !
            </>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le plus redoutable des pièges lors du calcul d'une Médiane ?</>}
            back={<><strong>Oublier de trier la liste !</strong><br/>Si l'étude vous soumet la liste brute [18, 5, 12], la médiane n'est surtout pas le nombre 5 simplement parce qu'il siège au milieu de la feuille. On trie : [5, 12, 18] → la médiane est de 12 !</>}
          />
          <Flashcard 
            front={<>Si l'on change la note minimale d'un devoir d'un élève de 2/20 à 0/20, sa moyenne change-t-elle ? Et qu'en est-il de sa médiane ?</>}
            back={<>Sa <strong>Moyenne décline obligatoirement</strong> car la somme globale régresse. <br/>Sa <strong>Médiane reste inchangée</strong> car la structure ordonnée de répartition à 50% de part et d'autre ne chancelle pas d'une marche !</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Quelle est la nuance de fond entre Moyenne et Médiane pour résumer un groupe ?",
              answer: "La moyenne est un indicateur de centralité arithmétique globale, qui subit fortement l'influence d'une seule valeur gigantesque. La médiane est un indicateur de position, qui localise le centre physique du groupe ordonné : elle vous indique que 50% du groupe fait moins que ce jalon, et 50% fait plus, sans égard pour la hauteur des extrêmes."
            },
            {
              question: "Qu'est-ce qu'une 'classe' dans un histogramme statistique ?",
              answer: "Une classe est un intervalle de valeurs. Par exemple, au lieu d'analyser l'âge de chaque participant individuellement, on regroupe les effectifs par blocs d'âges homogenes : [10 ; 15[, [15 ; 20[. C'est ainsi que l'on dessine de somptueux histogrammes de distributions des populations."
            },
            {
              question: "Si l'on ajoute 1 point à tous les élèves à un contrôle, comment se comportent les indices ?",
              answer: "La Moyenne du groupe augmente d'exactement 1 point. La Médiane augmente d'exactement 1 point. En revanche, l'Étendue (écart max - min) reste parfaitement identique car les élèves ont conservé le même écart de niveau !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Une entreprise emploie 9 salariés qui gagnent 1400€ par mois, et 1 directeur qui gagne 12 000€ par mois. Quelle affirmation décrit fidèlement le climat social ?",
              options: [
                "Le salaire Moyen est de 2460€, ce qui prouve que 50% de l'effectif touche plus de 2000€.",
                "Le salaire Moyen est de 2460€, mais le salaire Médian est de 1400€. Il décrit mieux l'entreprise : 90% des employés sont payés au SMIC.",
                "La moyenne et la médiane donnent toutes deux le salaire représentatif exact de 1400€."
              ],
              correctAnswer: 1,
              explanation: "Top ! La moyenne est foudroyée par le salaire énorme du directeur, donnant une image flatteuse mais trompeuse. La médiane (1400€) révèle la réalité sociale !"
            },
            {
              question: "On étudie la série des notes : { 3 • 7 • 12 • 15 • 19 }. Quel est le couple de valeurs (Médiane, Étendue) ?",
              options: [
                "Médiane = 12, Étendue = 16",
                "Médiane = 11.2, Étendue = 19",
                "Médiane = 12, Étendue = 15"
              ],
              correctAnswer: 0,
              explanation: "Génial ! La valeur centrale de cette cohorte impaire est bien 12 (médiane). L'Étendue est la différence d'écart absolu : Max - Min, soit 19 - 3 = 16 !"
            },
            {
              question: "Si l'on trace un Diagramme Circulaire pour représenter le moyen de transport de 20 élèves, et que la bicyclette regroupe 5 élèves. Quel angle au rapporteur le secteur doit-il mesurer ?",
              options: [
                "25 degrés (car 5 élèves correspond à 25%)",
                "90 degrés (un angle droit)",
                "50 degrés d'amplitude"
              ],
              correctAnswer: 1,
              explanation: "Parfait ! La bicyclette rassemble 5 élèves sur 20, soit un quart (1/4) de l'effectif. L'angle d'amplitude doit donc occuper 1/4 du cercle de 360°, d'où 360 ÷ 4 = 90°."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais trier mes valeurs dans l'ordre croissant avant d'isoler une Médiane.",
            "Je sais calculer une moyenne pondérée en incorporant l'effet multiplicatif des effectifs.",
            "Je mémorise la définition de l'Étendue : l'écart brut entre le maximum et le minimum.",
            "Je sais qu'une médiane sépare le groupe ordonné en deux effectifs identiques de 50%."
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

export default Course_College_3eme_10_Statistiques;
