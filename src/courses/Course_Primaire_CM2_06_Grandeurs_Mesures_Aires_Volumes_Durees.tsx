import React, { useState } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  FillInTheBlanks, InteractiveExercise
} from '../components/SharedUI';
import { MathComponent } from "../components/MathComponent";
import { Sparkles, Activity, Layers, Disc } from 'lucide-react';

const Course_Primaire_CM2_06_Grandeurs_Mesures_Aires_Volumes_Durees: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  const [metricTab, setMetricTab] = useState<'perimetre' | 'aire' | 'volume'>('perimetre');

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-P-CM2-MES"
        title="Aires, Volumes et Durées"
        subtitle="Mesurer la surface du sol, l'espace dans une boîte et jouer avec le temps."
        duration="35 min"
      />

      <Section title="⚠️ Périmètre vs Aire vs Volume" icon="📏" color="emerald">
        <p className="mb-4">
          Il ne faut jamais confondre ces trois mots ! Imagine qu'on construit une piscine de jardin.
        </p>

        {/* Dynamic Metric Playground */}
        <div className="bg-gradient-to-br from-emerald-50/50 to-slate-50 dark:from-slate-900/30 dark:to-slate-950 border border-emerald-150/40 dark:border-emerald-950 p-6 rounded-3xl my-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
            <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Le Laboratoire des Mesures (1D, 2D, 3D)</h4>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full max-w-sm sm:max-w-none px-4 sm:px-0">
            <button
              onClick={() => setMetricTab('perimetre')}
              className={`w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                metricTab === 'perimetre'
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Le Périmètre (1D) 📏
            </button>
            <button
              onClick={() => setMetricTab('aire')}
              className={`w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                metricTab === 'aire'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              L'Aire (2D) 🟩
            </button>
            <button
              onClick={() => setMetricTab('volume')}
              className={`w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                metricTab === 'volume'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 dark:bg-slate-850 dark:border-slate-700 dark:text-slate-300'
              }`}
            >
              Le Volume (3D) 📦
            </button>
          </div>

          <div className="w-full max-w-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Visual Screen */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 flex items-center justify-center min-h-[160px]">
              {metricTab === 'perimetre' && (
                <svg viewBox="0 0 200 120" className="w-full h-auto">
                  {/* Dotted contour representing running path */}
                  <rect
                    x="30"
                    y="25"
                    width="140"
                    height="70"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="4"
                    strokeDasharray="6,4"
                    className="animate-[dash_2s_linear_infinite]"
                  />
                  {/* Inside fill */}
                  <rect x="30" y="25" width="140" height="70" fill="#10b981" fillOpacity="0.05" />
                  
                  {/* Side dimensions */}
                  <text x="100" y="20" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle">4 m</text>
                  <text x="100" y="110" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle">4 m</text>
                  <text x="15" y="65" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle">3 m</text>
                  <text x="185" y="65" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle">3 m</text>
                  
                  <style>{`
                    @keyframes dash {
                      to {
                        stroke-dashoffset: -20;
                      }
                    }
                  `}</style>
                </svg>
              )}

              {metricTab === 'aire' && (
                <svg viewBox="0 0 200 120" className="w-full h-auto">
                  <rect x="35" y="20" width="130" height="80" fill="#3b82f6" fillOpacity="0.1" stroke="#2563eb" strokeWidth="2" />
                  
                  {/* Grid layout (4 x 3) */}
                  {/* Verticals */}
                  <line x1="67.5" y1="20" x2="67.5" y2="100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />
                  <line x1="100" y1="20" x2="100" y2="100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />
                  <line x1="132.5" y1="20" x2="132.5" y2="100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />
                  {/* Horizontals */}
                  <line x1="35" y1="46.6" x2="165" y2="46.6" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />
                  <line x1="35" y1="73.3" x2="165" y2="73.3" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3" />
                  
                  {/* Cell Numbers for area counting */}
                  <g fontSize="7" fontWeight="bold" fill="#1d4ed8" textAnchor="middle" className="opacity-80">
                    <text x="51" y="37">1 m²</text><text x="83" y="37">2 m²</text><text x="116" y="37">3 m²</text><text x="148" y="37">4 m²</text>
                    <text x="51" y="63">5 m²</text><text x="83" y="63">6 m²</text><text x="116" y="63">7 m²</text><text x="148" y="63">8 m²</text>
                    <text x="51" y="90">9 m²</text><text x="83" y="90">10 m²</text><text x="116" y="90">11 m²</text><text x="148" y="90">12 m²</text>
                  </g>
                  
                  <text x="100" y="15" fontSize="10" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">Aire = 4 × 3 = 12 m²</text>
                </svg>
              )}

              {metricTab === 'volume' && (
                <svg viewBox="0 0 200 120" className="w-full h-auto">
                  {/* Back-face helper grid */}
                  <polygon points="50,90 130,90 170,55 90,55" fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="2" />
                  <line x1="90" y1="55" x2="90" y2="115" stroke="#818cf8" strokeWidth="1" strokeDasharray="2" />
                  
                  {/* Rising liquid water volume body */}
                  <polygon points="50,115 130,115 170,80 90,80" fill="#6366f1" fillOpacity="0.4" />
                  <polygon points="50,90 130,90 170,55 90,55" fill="#4f46e5" fillOpacity="0.15" />
                  <rect x="50" y="90" width="80" height="25" fill="#6366f1" fillOpacity="0.3" />
                  <polygon points="130,90 170,55 170,80 130,115" fill="#4f46e5" fillOpacity="0.25" />

                  {/* Outer wireframe container */}
                  <line x1="50" y1="115" x2="130" y2="115" stroke="#4338ca" strokeWidth="2" />
                  <line x1="130" y1="115" x2="170" y2="80" stroke="#4338ca" strokeWidth="2" />
                  <line x1="50" y1="115" x2="50" y2="55" stroke="#4338ca" strokeWidth="2" />
                  <line x1="130" y1="115" x2="130" y2="55" stroke="#4338ca" strokeWidth="2" />
                  <line x1="170" y1="80" x2="170" y2="20" stroke="#4338ca" strokeWidth="2" />
                  
                  {/* Roof rim wireframe */}
                  <polygon points="50,55 130,55 170,20 90,20" fill="none" stroke="#4338ca" strokeWidth="2" />

                  <text x="90" y="118" fontSize="8" fontWeight="bold" fill="#4338ca" textAnchor="middle">Longueur</text>
                  <text x="160" y="105" fontSize="8" fontWeight="bold" fill="#4338ca" textAnchor="middle">largeur</text>
                  <text x="145" y="55" fontSize="8" fontWeight="bold" fill="#4338ca" textAnchor="middle">Hauteur</text>
                </svg>
              )}
            </div>

            {/* Explanatory text panel */}
            <div className="text-left">
              {metricTab === 'perimetre' && (
                <>
                  <h5 className="font-extrabold text-emerald-700 text-sm mb-1">Le Périmètre (Contour) 📏</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    C'est la longueur de la **barrière** extérieure. On fait simplement le tour en additionnant toutes les arêtes de clôture :
                    <br/><strong className="text-emerald-600">Périmètre = 4 + 3 + 4 + 3 = 14 m</strong>.
                  </p>
                </>
              )}
              {metricTab === 'aire' && (
                <>
                  <h5 className="font-extrabold text-blue-700 text-sm mb-1">L'Aire (Surface au Sol) 🟩</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    C'est l'espace couvert à l'intérieur d'un territoire plat 2D. On quadrille la bâche en carrés d'un mètre sur un mètre :
                    <br/><strong className="text-blue-600">Aire = L × l = 4 m × 3 m = 12 m²</strong>.
                  </p>
                </>
              )}
              {metricTab === 'volume' && (
                <>
                  <h5 className="font-extrabold text-indigo-700 text-sm mb-1">Le Volume (Espace 3D) 📦</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                    C'est l'espace intérieur disponible dans une forme 3D (ex: remplir d'eau ou remplir de cubes). On multiplie les 3 dimensions de notre boîte :
                    <br/><strong className="text-indigo-600">Volume = Longueur × largeur × Hauteur</strong>.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoBlock type="definition" title="Le Périmètre (Le contour)">
            C'est la longueur de la barrière autour de la piscine pour empêcher le chien de tomber. Se mesure en <strong>mètres (m)</strong>.
          </InfoBlock>
          <InfoBlock type="definition" title="L'Aire (La Place / Surface)">
            C'est la taille de la bâche plastique qu'il faut acheter pour recouvrir le fond de l'eau. Se mesure en <strong>mètres carrés (m²)</strong>. (m × m).
          </InfoBlock>
          <InfoBlock type="definition" title="Le Volume (Le Remplissage)">
            C'est toute l'eau qu'on coule pour remplir la piscine (Espace 3D). Se mesure en <strong>mètres cubes (m³)</strong> ou en Litres. (m × m × m).
          </InfoBlock>
        </div>
      </Section>

      <Section title="⚖️ Les Formules Reines" icon="👑" color="indigo">
        <p className="mb-4">
          Il faut connaître par coeur ces petites formules qui te suivront jusqu'au lycée.
        </p>
        
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 p-4 rounded-xl mb-4 text-indigo-950 dark:text-indigo-50">
          <ul className="text-sm list-disc pl-4 space-y-2">
            <li><strong>Aire du Rectangle :</strong> <><MathComponent math={"Longueur \\times largeur"} /></> (ex: <><MathComponent math={"L \\times l"} /></>)</li>
            <li><strong>Aire du Carré :</strong> <><MathComponent math={"C\\^ot\\acute{e} \\times C\\^ot\\acute{e}"} /></> (ex: <><MathComponent math={"c^2"} /></>)</li>
            <li><strong>Aire du Triangle (Rectangle) :</strong> On le voit comme un demi-rectangle. Donc <><MathComponent math={"(Base \\times Hauteur) \\div 2"} /></></li>
            <li><strong>Volume d'une boîte (Pavé) :</strong> <><MathComponent math={"Longueur \\times largeur \\times Hauteur"} /></></li>
          </ul>
        </div>
      </Section>

      <Section title="🧠 Vrai ou Faux" icon="🔦" color="purple">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Dans le tableau des unités d'Aire (clôturé par m²), il y a 2 colonnes par case d'unité.</>}
            back={<><strong>VRAI !</strong><br/><span className="text-sm">Parce que c'est du carré (m² puissance 2) ! 1 m² = 100 dm² ! Le pouvoir de 10 est au carré. Si tu passes en Volume (m³), il y aura 3 colonnes par case d'unité ! (1 m³ = 1000 dm³).</span></>}
          />
          <Flashcard 
            front={<>1h de cours + 30 min de pause = 1,30 heures de temps total.</>}
            back={<><strong>FAUX ! (Piège de Durée)</strong><br/><span className="text-sm">Le temps se mesure sur une base soixante (60), pas cent (100) !!! 30 minutes, c'est la MOITIÉ d'une heure. Donc en écriture décimale, ça s'écrit 1,5 heure ! Pas 1,30.</span></>}
          />
        </div>
      </Section>

      <Section title="⚔️ Exercices Interactifs" icon="⚙️" color="amber">
        <InteractiveExercise
          title="Exercice 1 : La Chambre à Carreler"
          question={<p>La chambre de Paul est un rectangle de <><MathComponent math={"4 m"} /></> de longueur sur <><MathComponent math={"3 m"} /></> de largeur. Il veut poser du carrelage. Quelle est l'aire de sa chambre au sol ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Choisir la formule</p>
              <p>On parle d'une surface au sol, donc on cherche l'Aire d'un rectangle. La formule est <><MathComponent math={"Longueur \\times largeur"} /></>.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : Appliquer les valeurs</p>
              <p>On fait : <><MathComponent math={"4 \\times 3"} /></>.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : Le résultat est 12. Ne pas oublier la bonne unité : ce sont des mètres carrés. Donc <strong><><MathComponent math={"12 m^2"} /></></strong> !</p>
            </div>
          ]}
        />
        <InteractiveExercise
          title="Exercice 2 : Addition de durées"
          question={<p>Un train part à 10h45. Le trajet dure 20 minutes. À quelle heure arrive-t-il ?</p>}
          steps={[
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 1 : Regrouper les minutes</p>
              <p>Il part à 45 minutes et roule 20 minutes. <><MathComponent math={"45 + 20 = 65"} /></> minutes.</p>
            </div>,
            <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/60">
              <p className="font-bold text-amber-900 dark:text-amber-100">Étape 2 : La bascule de l'heure</p>
              <p>Le cadran bloque à 60 ! 65 minutes, c'est <><MathComponent math={"60"} /></> minutes (donc une heure pleine) + <><MathComponent math={"5"} /></> minutes de rab.</p>
            </div>,
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/60 font-bold text-emerald-900 dark:text-emerald-100">
              <p>Solution : L'heure pleine vient grossir les 10h qui deviennent 11h. On ajoute les petites 5 minutes. Le train arrive à <strong>11h05</strong> !</p>
            </div>
          ]}
        />
      </Section>

      <Section title="🎮 Test tes mots" icon="🕹️" color="slate">
        <p className="mb-4">Retiens bien quel outil fait quoi :</p>
        <FillInTheBlanks 
          id="cm2-mes-eval"
          content={[
            "L'espace rempli à l'intérieur d'une chose en 3 dimensions (comme l'eau dans un aquarium) s'appelle le ",
            { options: ["Périmètre", "Volume", "Aire"], correctAnswer: 1 },
            ". \nEt pour mesurer l'eau d'une bouteille, en général on n'utilise pas des mètres cubes, on utilise une autre unité de base très connue : le ",
            { options: ["gramme", "mètre", "Litre"], correctAnswer: 2 },
            " !"
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Quelle est l'Astuce pour calculer le périmètre d'un carré de côté C ?",
              options: [
                "C + C",
                "C × C",
                "C × 4"
              ],
              correctAnswer: 2,
              explanation: "Le périmètre, c'est faire le tour complet de la clôture (il y a 4 côtés identiques). Donc C+C+C+C, c'est plus simplement 4 fois le C (4 × C). Si c'est C×C, c'est la formule de l'Aire (le sol) !"
            },
            {
              question: "Si j'écris 2,5 h... De combien de temps parle-t-on environ en minutes ?",
              options: [
                "2h et 5 minutes",
                "2h et 50 minutes",
                "2h et 30 minutes"
              ],
              correctAnswer: 2,
              explanation: "Le ',5' représente 'la moitié'. La moitié d'une heure (qui vaut 60 minutes), c'est 30 minutes. C'est l'erreur la plus mortelle des durées !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Périmètre (contour) = additionner les côtés.",
            "Aire (surface) = multiplier 2 longueurs.",
            "Volume (remplissage) = multiplier 3 dimensions (L, l, H).",
            "La machine du temps est bloquée à 60 (pas 100) !"
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

export default Course_Primaire_CM2_06_Grandeurs_Mesures_Aires_Volumes_Durees;
