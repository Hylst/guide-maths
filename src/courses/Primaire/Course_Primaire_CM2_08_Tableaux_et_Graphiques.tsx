import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from "../../components/MathComponent";
import { Sparkles } from 'lucide-react';

const Course_Primaire_CM2_08_Tableaux_et_Graphiques: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [chartType, setChartType] = useState<'batons' | 'courbe' | 'circulaire'>('batons');

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-P-CM2-DATA"
        title="Tableaux et Graphiques"
        subtitle="Savoir lire, construire et analyser des données."
        duration="30 min"
      />

      <Section title="⚠️ Pourquoi faire des graphiques ?" icon="📈" color="emerald">
        <p className="mb-4">
          Un texte rempli de nombres est très difficile à comprendre pour le cerveau. Un <strong>graphique</strong> permet de voir l'information d'un seul coup d'oeil ! C'est comme transformer des mathématiques en dessin.
        </p>
        <InfoBlock type="definition" title="Le Tableau à Double Entrée">
          Avant de dessiner, on range souvent les informations dans un tableau. Si on veut croiser deux informations (ex: Nombre de Filles/Garçons ET le sport pratiqué), on utilise un tableau avec des Lignes et des Colonnes. On lit la réponse à l'intersection (au croisement) des deux !
        </InfoBlock>
      </Section>

      <Section title="⚖️ Les 3 grands types de Graphiques" icon="📊" color="indigo">
        <p className="mb-4">
          Selon ce que l'on veut montrer, on ne choisit pas le même dessin.
        </p>

        {/* Interactive Math Charts Laboratory */}
        <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 dark:from-slate-900/30 dark:to-slate-950 border border-indigo-150/40 dark:border-indigo-950 p-6 rounded-3xl my-6 flex flex-col items-center animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Le Générateur de Graphiques CM2</h4>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
            <button
              onClick={() => setChartType('batons')}
              className={`w-full sm:w-auto px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                chartType === 'batons'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Diagramme en Bâtons 📊
            </button>
            <button
              onClick={() => setChartType('courbe')}
              className={`w-full sm:w-auto px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                chartType === 'courbe'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Courbe d'Évolution 📈
            </button>
            <button
              onClick={() => setChartType('circulaire')}
              className={`w-full sm:w-auto px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
                chartType === 'circulaire'
                  ? 'bg-rose-500 border-rose-500 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Diagramme Circulaire 🍕
            </button>
          </div>

          <div className="w-full max-w-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Visual Canvas Display */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 flex items-center justify-center min-h-[160px]">
              {chartType === 'batons' && (
                <svg viewBox="0 0 180 140" className="w-full h-auto">
                  {/* Grid Lines */}
                  <line x1="25" y1="20" x2="160" y2="20" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="25" y1="50" x2="160" y2="50" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="25" y1="80" x2="160" y2="80" stroke="#e2e8f0" strokeWidth="1" />
                  
                  {/* Axes */}
                  <line x1="25" y1="10" x2="25" y2="110" stroke="#475569" strokeWidth="2" />
                  <line x1="25" y1="110" x2="165" y2="110" stroke="#475569" strokeWidth="2" />

                  {/* Axis labels */}
                  <text x="18" y="24" fontSize="8" fill="#64748b" textAnchor="end">30</text>
                  <text x="18" y="54" fontSize="8" fill="#64748b" textAnchor="end">20</text>
                  <text x="18" y="84" fontSize="8" fill="#64748b" textAnchor="end">10</text>

                  {/* Bars */}
                  {/* Chat */}
                  <rect x="40" y="35" width="20" height="75" fill="#6366f1" className="transition-all duration-700 origin-bottom" />
                  <text x="50" y="122" fontSize="7" fontWeight="bold" fill="#64748b" textAnchor="middle">Chats</text>
                  <text x="50" y="30" fontSize="8" fontWeight="bold" fill="#4f46e5" textAnchor="middle">25</text>

                  {/* Chien */}
                  <rect x="80" y="20" width="20" height="90" fill="#f43f5e" className="transition-all duration-700 origin-bottom animate-pulse" />
                  <text x="90" y="122" fontSize="7" fontWeight="bold" fill="#64748b" textAnchor="middle">Chiens</text>
                  <text x="90" y="15" fontSize="8" fontWeight="bold" fill="#e11d48" textAnchor="middle">30</text>

                  {/* Lapin */}
                  <rect x="120" y="65" width="20" height="45" fill="#10b981" className="transition-all duration-700 origin-bottom" />
                  <text x="130" y="122" fontSize="7" fontWeight="bold" fill="#64748b" textAnchor="middle">Lapins</text>
                  <text x="130" y="60" fontSize="8" fontWeight="bold" fill="#059669" textAnchor="middle">15</text>
                </svg>
              )}

              {chartType === 'courbe' && (
                <svg viewBox="0 0 180 140" className="w-full h-auto">
                  {/* Grid Lines */}
                  <line x1="25" y1="20" x2="160" y2="20" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3" />
                  <line x1="25" y1="50" x2="160" y2="50" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3" />
                  <line x1="25" y1="80" x2="160" y2="80" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3" />
                  
                  {/* Axes */}
                  <line x1="25" y1="10" x2="25" y2="110" stroke="#475569" strokeWidth="2" />
                  <line x1="25" y1="110" x2="165" y2="110" stroke="#475569" strokeWidth="2" />

                  {/* Axis labels */}
                  <text x="18" y="24" fontSize="8" fill="#64748b" textAnchor="end">30°</text>
                  <text x="18" y="54" fontSize="8" fill="#64748b" textAnchor="end">20°</text>
                  <text x="18" y="84" fontSize="8" fill="#64748b" textAnchor="end">10°</text>

                  {/* Curve Path Line coordinates: 8h(95), 12h(40), 16h(20), 20h(80) */}
                  <path d="M 45,95 L 80,40 L 115,20 L 150,80" fill="none" stroke="#2563eb" strokeWidth="3.5" className="transition-all duration-1000" />

                  {/* Chart Nodes Dots */}
                  <circle cx="45" cy="95" r="4.5" fill="#3b82f6" />
                  <text x="45" y="122" fontSize="7" fill="#64748b" textAnchor="middle">8h</text>
                  
                  <circle cx="80" cy="40" r="4.5" fill="#3b82f6" />
                  <text x="80" y="122" fontSize="7" fill="#64748b" textAnchor="middle">12h</text>

                  <circle cx="115" cy="20" r="4.5" fill="#2563eb" className="animate-ping" />
                  <circle cx="115" cy="20" r="4.5" fill="#2563eb" />
                  <text x="115" y="122" fontSize="7" fill="#64748b" textAnchor="middle">16h</text>

                  <circle cx="150" cy="80" r="4.5" fill="#3b82f6" />
                  <text x="150" y="122" fontSize="7" fill="#64748b" textAnchor="middle">20h</text>
                </svg>
              )}

              {chartType === 'circulaire' && (
                <svg viewBox="0 0 180 140" className="w-full h-auto">
                  {/* Concentric Donut wedges */}
                  <circle cx="90" cy="70" r="40" fill="none" stroke="#e2e8f0" strokeWidth="16" />
                  
                  {/* Fraise (50%) */}
                  <circle cx="90" cy="70" r="40" fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray="125.6 251.2" strokeDashoffset="0" />
                  
                  {/* Vanille (25%) */}
                  <circle cx="90" cy="70" r="40" fill="none" stroke="#eab308" strokeWidth="16" strokeDasharray="62.8 251.2" strokeDashoffset="-125.6" />
                  
                  {/* Chocolat (25%) */}
                  <circle cx="90" cy="70" r="40" fill="none" stroke="#4f46e5" strokeWidth="16" strokeDasharray="62.8 251.2" strokeDashoffset="-188.4" />

                  {/* Hole content label */}
                  <text x="90" y="74" fontSize="8" fontWeight="black" fill="#334155" textAnchor="middle">Total 100%</text>

                  {/* Mini-legends */}
                  <g fontSize="7" fontWeight="bold">
                    <rect x="2" y="10" width="8" height="8" fill="#ef4444" />
                    <text x="14" y="16" fill="#334155">Fraise 50%</text>

                    <rect x="2" y="24" width="8" height="8" fill="#eab308" />
                    <text x="14" y="30" fill="#334155">Vanille 25%</text>

                    <rect x="2" y="38" width="8" height="8" fill="#4f46e5" />
                    <text x="14" y="44" fill="#334155">Choco 25%</text>
                  </g>
                </svg>
              )}
            </div>

            {/* Explanatory descriptions panel */}
            <div className="text-left w-full">
              {chartType === 'batons' && (
                <>
                  <h5 className="font-extrabold text-indigo-700 text-sm mb-1">Diagramme en Bâtons 📊</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    La hauteur des bâtons est proportionnelle à la quantité. C'est le meilleur graphique pour **comparer ou classer des objets** (par exemple, quel animal de compagnie est le plus aimé)!
                  </p>
                </>
              )}
              {chartType === 'courbe' && (
                <>
                  <h5 className="font-extrabold text-blue-700 text-sm mb-1">La Courbe d'Évolution 📈</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    Les points reliés par des segments décrivent un parcours. Idéal pour voir **l'évolution d'une valeur au fil du temps** (par exemple, la température de l'après-midi, ta croissance, etc.)!
                  </p>
                </>
              )}
              {chartType === 'circulaire' && (
                <>
                  <h5 className="font-extrabold text-rose-600 text-sm mb-1">Diagramme Circulaire 🍕</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    Un disque partagé proportionnellement. Parfait pour visualiser la **répartition ou les parts d'un tout** (comme les parfums des glaces dégustées à la kermesse).
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl mb-4 text-indigo-950 dark:text-indigo-50">
          <ul className="text-sm list-disc pl-4 space-y-2">
            <li><strong>Le Diagramme en Bâtons :</strong> Parfait pour comparer des quantités (ex: le nombre d'animaux préférés de la classe).</li>
            <li><strong>La Courbe d'Évolution :</strong> Une ligne qui monte et qui descend. Parfait pour le TEMPS (ex: la température de la journée heure par heure).</li>
            <li><strong>Le Diagramme Circulaire (Camembert) :</strong> Un cercle coupé en parts. Parfait pour voir la REPARTITION d'un total (ex: le pourcentage des parfums de glace vendus).</li>
          </ul>
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans un graphique, l'axe vertical (celui qui monte) s'appelle l'axe des Abscisses.</>}
            back={<><strong>FAUX !</strong><br/><span className="text-sm">L'axe qui monte comme une tour s'appelle l'axe des Ordonnées. L'axe couché au sol (horizontal) s'appelle l'axe des Abscisses ! Mnémo: Ordonnées pointe vers le Haut (Odre Divin).</span></>}
          />
          <Flashcard 
            front={<>Pour lire un graphique, il faut toujours regarder le "titre" et "l'échelle" des axes.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Si tu regardes une barre qui monte jusqu'au trait "5". Sans lire l'unité, tu ne sais pas si ça veut dire "5 pommes" ou "5 millions de personnes". Toujours lire les légendes !</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : Lire un tableau croisé"
          question={<p>Dans un tableau, la ligne "Garçons" croise la colonne "Football" à la case "12". La ligne "Filles" croise la colonne "Football" à la case "8". Quelle information puis-je en déduire ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Lire la première intersection</p>
              <p>Il y a 12 garçons qui font du Football.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Lire la deuxième intersection</p>
              <p>Il y a 8 filles qui font du Football.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Au total, dans cette classe ou ce club, <><MathComponent math={"12 + 8 = 20"} /></> enfants jouent au Football ! Le tableau permet d'additionner les détails par colonne.</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Choisir le bon graphique"
          question={<p>Je veux montrer à mes parents que ma taille a augmenté de la naissance jusqu'à mes 10 ans. Quel graphique dois-je utiliser ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Analyser le type de donnée</p>
              <p>On regarde "L'Âge" par rapport à "La Taille". "L'Âge" est un écoulement du TEMPS.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Dès qu'il s'agit d'une évolution dans le temps, le meilleur choix est la <strong>Courbe d'Évolution</strong> (une ligne qui monte). Les bâtons ou le camembert ne sont pas du tout adaptés pour ça !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Test tes mots" icon="🕹️" color="slate">
        <p className="mb-4">Complète ces définitions :</p>
        <FillInTheBlanks 
          id="cm2-data-eval"
          content={[
            "Pour représenter la répartition des élèves selon leur mois de naissance, j'utiliserai de préférence un diagramme en ",
            { options: ["courbe", "bâtons", "points"], correctAnswer: 1 },
            ". \nL'axe horizontal (couché) s'appelle l'axe des ",
            { options: ["Ordonnées", "Origines", "Abscisses"], correctAnswer: 2 },
            ". Et l'axe vertical s'appelle l'axe des ",
            { options: ["Ordonnées", "Origines", "Abscisses"], correctAnswer: 0 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "A quoi sert la Légende d'un graphique ?",
              options: [
                "À raconter une histoire ancienne",
                "À donner le titre général",
                "À expliquer les couleurs des ronds ou des bâtons"
              ],
              correctAnswer: 2,
              explanation: "La légende est la petite boîte avec les codes couleurs : Rouge = Filles, Bleu = Garçons, etc. Indispensable pour comprendre le dessin."
            },
            {
              question: "Si j'ai un camembert avec la part rouge qui prend EXACTEMENT la moitié de tout le cercle. Que signifie cette part rouge ?",
              options: [
                "Elle représente 50% du total (la moitié)",
                "Elle représente 100% du total",
                "Elle représente 2"
              ],
              correctAnswer: 0,
              explanation: "100%, c'est le total complet (le cercle en entier). La moitié d'un cercle, c'est 50%. Les parts visuelles d'un camembert sont toujours proportionnelles au total !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Abscisses = Ligne Horizontale. Ordonnées = Ligne Verticale.",
            "Toujours regarder la graduation (est-ce que ça avance de 1 en 1, de 10 en 10 ?).",
            "La Courbe est reine pour l'évolution dans le Temps.",
            "Le Camembert (Circulaire) est roi pour les Pourcentages / Parts d'un total."
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+10 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_Primaire_CM2_08_Tableaux_et_Graphiques;
