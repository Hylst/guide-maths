import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { TriangleRight, Compass, Settings, CheckCircle2, RotateCw } from 'lucide-react';
import { MathComponent } from '../../components/MathComponent';

const Course_College_4eme_11_Cosinus: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Trigonometry Simulator State
  const [angle, setAngle] = useState<number>(60);
  const [hypotenuse, setHypotenuse] = useState<number>(8); // in cm
  const [activeTab, setActiveTab] = useState<'adjacent' | 'hypotenuse' | 'angle'>('adjacent');
  
  // Angle slider for manual arccos demonstration
  const [manualAdj, setManualAdj] = useState<number>(4);
  const [manualHyp, setManualHyp] = useState<number>(8);

  const rad = (angle * Math.PI) / 180;
  const cosValue = Math.cos(rad);
  const adjacent = hypotenuse * cosValue;
  const opposite = hypotenuse * Math.sin(rad);

  // SVG dimensions & scaling
  const scale = 12; // pixels per cm for rendering
  const originX = 30;
  const originY = 150;

  // Manual angle calculation for Arccos Tab
  const calcRatio = manualAdj / manualHyp;
  const calcAngleRad = Math.acos(Math.min(1, Math.max(0, calcRatio)));
  const calcAngleDeg = Math.round((calcAngleRad * 180) / Math.PI);

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-11"
        title="Le Cosinus et la Trigonométrie"
        subtitle="L'Art de Maîtriser les Angles et les Longueurs du Triangle Rectangle"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["L'Hypoténuse (Théorème de Pythagore)", "Bouton de calculatrice scientifique", "Résoudre une équation simple (produit en croix)"]}
        objectives={[
          "Associer à chaque angle aigu d'un triangle rectangle son côté adjacent.",
          "Mémoriser la formule fondamentale du cosinus : Adjacence divisée par l'Hypoténuse.",
          "Calculer une longueur manquante (adjacent ou hypoténuse) avec une précision absolue.",
          "Déterminer la mesure d'un angle aigu en degrés à l'aide de l'Arccos (touche Cos⁻¹)."
        ]}
      />

      <Section title="🌟 Introduction : Compléter la boîte à outils de Pythagore" icon="📐" color="slate">
        <p className="leading-relaxed">
          Le célèbre Théorème de Pythagore est fantastique, mais il souffre d&apos;une faiblesse majeure : il exige que tu connaisses <strong>deux côtés</strong> pour deviner le troisième. Si tu n&apos;as qu&apos;une seule longueur et l&apos;angle d&apos;inclinaison d&apos;une échelle... Pythagore est aveugle.
        </p>
        <p className="mt-4 leading-relaxed">
          La <strong>trigonométrie</strong> (du grec <em>trigōnon</em> &quot;triangle&quot; et <em>metron</em> &quot;mesure&quot;) vient résoudre ce problème. Le Cosinus établit un pont magique et immuable entre les degrés d&apos;un angle et le rapport des longueurs du triangle.
        </p>
      </Section>

      {/* TRIGONOMETRY SIMULATOR */}
      <Section title="🛠️ Laboratoire de Trigonométrie : Le Triangle Dynamique" icon={<Compass className="text-indigo-500" />} color="indigo">
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Chosis ci-dessous ce que tu cherches à calculer. Manipule les curseurs pour observer les calculs en temps réel et les tracer sur le triangle rectangle ABC rectangle en A.
        </p>

        {/* Tab Selection */}
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-6 max-w-md">
          <button 
            onClick={() => setActiveTab('adjacent')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'adjacent' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Calculer l&apos;Adjacent
          </button>
          <button 
            onClick={() => setActiveTab('hypotenuse')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'hypotenuse' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Calculer l&apos;Hypoténuse
          </button>
          <button 
            onClick={() => setActiveTab('angle')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeTab === 'angle' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Calculer l&apos;Angle
          </button>
        </div>

        <div className="bg-card border border-slate-100 dark:border-slate-800/80 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Visual Screen */}
            <div className="bg-slate-50 dark:bg-black/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
              <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider text-slate-400">Rendu Géométrique (Cosinus)</span>
              
              <svg width="100%" height="220" viewBox="0 0 240 180" className="mx-auto overflow-visible mt-4">
                {/* Right angle marker A */}
                <rect x={originX} y={originY - 12} width="12" height="12" fill="none" stroke="#64748b" strokeWidth="1.5" />
                
                {/* Active custom rendering of right-angled triangle */}
                {activeTab !== 'angle' ? (
                  <>
                    {/* Hypotenuse (diagonale) */}
                    <line 
                      x1={originX} 
                      y1={originY - opposite * scale} 
                      x2={originX + adjacent * scale} 
                      y2={originY} 
                      stroke="#10b981" 
                      strokeWidth="3.5" 
                    />
                    
                    {/* Adjacent (horizontale) */}
                    <line 
                      x1={originX} 
                      y1={originY} 
                      x2={originX + adjacent * scale} 
                      y2={originY} 
                      stroke="#3b82f6" 
                      strokeWidth="3.5" 
                    />
                    
                    {/* Oppose (verticale) */}
                    <line 
                      x1={originX} 
                      y1={originY - opposite * scale} 
                      x2={originX} 
                      y2={originY} 
                      stroke="#cbd5e1" 
                      strokeWidth="1.5" 
                      strokeDasharray="3,3"
                    />

                    {/* Angle arc highlighting angle at B */}
                    <path 
                      d={`M ${originX + adjacent * scale - 20} ${originY} A 20 20 0 0 0 ${originX + adjacent * scale - 20 * Math.cos(rad)} ${originY - 20 * Math.sin(rad)}`} 
                      fill="none" 
                      stroke="#f43f5e" 
                      strokeWidth="2.5" 
                    />

                    {/* Vertices Labels */}
                    <text x={originX - 15} y={originY + 5} className="fill-slate-800 dark:fill-white font-bold text-sm">A</text>
                    <text x={originX + adjacent * scale + 8} y={originY + 5} className="fill-slate-800 dark:fill-white font-bold text-sm">B</text>
                    <text x={originX - 5} y={originY - opposite * scale - 10} className="fill-slate-800 dark:fill-white font-bold text-sm">C</text>

                    {/* Values HUD */}
                    <text x={originX + (adjacent * scale) / 2} y={originY + 18} className="fill-blue-600 dark:fill-blue-400 font-mono text-[11px] font-bold text-center">
                      Adj: {adjacent.toFixed(1)} cm
                    </text>
                    <text x={originX + (adjacent * scale) / 2 + 10} y={originY - (opposite * scale) / 2} className="fill-emerald-600 dark:fill-emerald-400 font-mono text-[11px] font-bold">
                      Hyp: {hypotenuse.toFixed(1)} cm
                    </text>
                    <text x={originX + adjacent * scale - 45} y={originY - 8} className="fill-rose-600 dark:fill-rose-400 font-mono text-[10px] font-bold">
                      {angle}°
                    </text>
                  </>
                ) : (
                  // Arccos Mode rendering
                  <>
                    {/* Angle calculate render values */}
                    {(() => {
                      const mRad = calcAngleRad;
                      const mOpposite = manualHyp * Math.sin(mRad);
                      const mAdjacent = manualAdj;
                      const mHypotenuse = manualHyp;
                      
                      return (
                        <>
                          <line 
                            x1={originX} 
                            y1={originY - mOpposite * scale} 
                            x2={originX + mAdjacent * scale} 
                            y2={originY} 
                            stroke="#10b981" 
                            strokeWidth="3.5" 
                          />
                          <line 
                            x1={originX} 
                            y1={originY} 
                            x2={originX + mAdjacent * scale} 
                            y2={originY} 
                            stroke="#3b82f6" 
                            strokeWidth="3.5" 
                          />
                          <line 
                            x1={originX} 
                            y1={originY - mOpposite * scale} 
                            x2={originX} 
                            y2={originY} 
                            stroke="#cbd5e1" 
                            strokeWidth="1.5" 
                            strokeDasharray="3,3"
                          />
                          <path 
                            d={`M ${originX + mAdjacent * scale - 20} ${originY} A 20 20 0 0 0 ${originX + mAdjacent * scale - 20 * Math.cos(mRad)} ${originY - 20 * Math.sin(mRad)}`} 
                            fill="none" 
                            stroke="#f43f5e" 
                            strokeWidth="2.5" 
                          />
                          <text x={originX - 15} y={originY + 5} className="fill-slate-800 dark:fill-white font-bold text-sm">A</text>
                          <text x={originX + mAdjacent * scale + 8} y={originY + 5} className="fill-slate-800 dark:fill-white font-bold text-sm">B</text>
                          <text x={originX - 5} y={originY - mOpposite * scale - 10} className="fill-slate-800 dark:fill-white font-bold text-sm">C</text>

                          <text x={originX + (mAdjacent * scale) / 2} y={originY + 18} className="fill-blue-600 dark:fill-blue-400 font-mono text-[11px] font-bold text-center">
                            Adj: {mAdjacent.toFixed(1)} cm
                          </text>
                          <text x={originX + (mAdjacent * scale) / 2 + 10} y={originY - (mOpposite * scale) / 2} className="fill-emerald-600 dark:fill-emerald-400 font-mono text-[11px] font-bold">
                            Hyp: {mHypotenuse.toFixed(1)} cm
                          </text>
                          <text x={originX + mAdjacent * scale - 45} y={originY - 8} className="fill-rose-700 dark:fill-rose-400 font-mono text-[10px] font-bold">
                            {calcAngleDeg}° ?
                          </text>
                        </>
                      );
                    })()}
                  </>
                )}
              </svg>
            </div>

            {/* Config panel and real calculations */}
            <div className="space-y-6">
              {activeTab !== 'angle' ? (
                <>
                  {/* Slider Angle */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                      <span>Angle aigu à mesurer {"∠B"} (Degrés)</span>
                      <span className="text-rose-600 dark:text-rose-400 font-mono">{angle}°</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="80" 
                      step="1" 
                      value={angle} 
                      onChange={(e) => setAngle(parseInt(e.target.value))}
                      className="w-full accent-rose-500 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Slider Hypotenuse */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                      <span>Hypoténuse du triangle (Côté BC)</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono">{hypotenuse.toFixed(1)} cm</span>
                    </div>
                    <input 
                      type="range" 
                      min="4" 
                      max="14" 
                      step="0.5" 
                      value={hypotenuse} 
                      onChange={(e) => setHypotenuse(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Angle computation inputs: Adjacent slider */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                      <span>Longueur côté Adjacent (AB)</span>
                      <span className="text-blue-600 font-mono">{manualAdj.toFixed(1)} cm</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max={manualHyp - 0.5} 
                      step="0.5" 
                      value={manualAdj} 
                      onChange={(e) => setManualAdj(parseFloat(e.target.value))}
                      className="w-full accent-blue-500 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Hypotenuse slider (must remain larger than adjacent) */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                      <span>Longueur de l&apos;Hypoténuse (BC)</span>
                      <span className="text-emerald-600 font-mono">{manualHyp.toFixed(1)} cm</span>
                    </div>
                    <input 
                      type="range" 
                      min={manualAdj + 0.5} 
                      max="15" 
                      step="0.5" 
                      value={manualHyp} 
                      onChange={(e) => setManualHyp(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </>
              )}

              {/* LIVE STEP-BY-STEP MATHEMATICAL RESOLUTION */}
              <div className="bg-slate-55 dark:bg-slate-900 px-5 py-4 rounded-2xl border border-slate-150 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Résolution Rédigée Moderne</span>
                
                {activeTab === 'adjacent' && (
                  <div className="text-xs font-serif leading-relaxed space-y-2">
                    <p>Dans le triangle {"$ABC$"} rectangle en {"$A$"} :</p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono">
                      {"$\\cos(\\widehat{B}) = \\frac{\\text{Adjacent}}{\\text{Hypoténuse}} = \\frac{AB}{BC}$"}
                    </p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono text-slate-600">
                      Remplaçons : {"$\\cos("}{angle}{"^{\\circ}) = \\frac{AB}{"}{hypotenuse.toFixed(1)}{"}$"}
                    </p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono font-bold text-indigo-650 dark:text-indigo-400 border-l-2 border-indigo-500">
                      Calcule : {"$AB = "}{hypotenuse.toFixed(1)}{" \\times \\cos("}{angle}{"^{\\circ}) \\approx "}{adjacent.toFixed(2)}{"\\text{ cm}$"}
                    </p>
                  </div>
                )}

                {activeTab === 'hypotenuse' && (
                  <div className="text-xs font-serif leading-relaxed space-y-2">
                    <p>Dans le triangle {"$ABC$"} rectangle en {"$A$"} :</p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono">
                      {"$\\cos(\\widehat{B}) = \\frac{AB}{BC}$"}
                    </p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono text-slate-600">
                      Supposons {"$AB$"} connu et égal à {adjacent.toFixed(1)} cm :
                    </p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono text-slate-600">
                      {"$\\cos("}{angle}{"^{\\circ}) = \\frac{"}{adjacent.toFixed(1)}{"}{BC}$"}
                    </p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono font-bold text-indigo-650 dark:text-indigo-400 border-l-2 border-indigo-500">
                      Calcule : {"$BC = \\frac{"}{adjacent.toFixed(1)}{"}{\\cos("}{angle}{"^{\\circ})} \\approx "}{((adjacent) / cosValue).toFixed(2)}{"\\text{ cm}$"}
                    </p>
                  </div>
                )}

                {activeTab === 'angle' && (
                  <div className="text-xs font-serif leading-relaxed space-y-2">
                    <p>On cherche l&apos;angle {"$\\widehat{B}$"} dans le triangle rectangle :</p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono">
                      {"$\\cos(\\widehat{B}) = \\frac{AB}{BC} = \\frac{"}{manualAdj.toFixed(1)}{"}{"}{manualHyp.toFixed(1)}{"}$"}
                    </p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono text-slate-600">
                      Rapport : {"$\\cos(\\widehat{B}) \\approx "}{calcRatio.toFixed(4)}{"$" }
                    </p>
                    <p className="bg-card dark:bg-black/30 p-1.5 rounded font-mono font-bold text-rose-650 dark:text-rose-400 border-l-2 border-rose-500">
                      Anti-Cosinus : {"$\\widehat{B} = \\text{Arccos}("}{calcRatio.toFixed(3)}{") \\approx "}{calcAngleDeg}{"^{\\circ}$"}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </Section>

      <Section title="1. Anatomie locale : Adjacent et Hypoténuse" icon="🏷️" color="slate">
        <p className="mb-4 leading-relaxed">
          Tout se joue au sein du <strong>Triangle Rectangle</strong>. Pour manipuler sereinement la trigonométrie, il est vital de savoir identifier chaque acteur de ton angle aigu :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-emerald-50/50 dark:bg-emerald-990/10 p-5 rounded-2xl border border-emerald-150 dark:border-emerald-900/50">
            <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1">👑 L&apos;Hypoténuse (BC)</span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              C&apos;est le roi du triangle. Le côté le plus long de tous, assis en face de l&apos;angle droit de 90°. Il ne change jamais de nom ni d&apos;identité, peu importe l&apos;angle aigu ciblé.
            </p>
          </div>
          
          <div className="bg-blue-50/50 dark:bg-blue-990/10 p-5 rounded-2xl border border-blue-150 dark:border-blue-900/50">
            <span className="font-bold text-blue-800 dark:text-blue-400 block mb-1">🤝 Le Côté Adjacent (AB)</span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Un angle est toujours formé par l&apos;intersection de <strong>deux murs</strong>. L&apos;un de ces murs est l&apos;Hypoténuse. <strong>L&apos;autre mur qui touche directement ton angle, c&apos;est le Côté Adjacent !</strong>
            </p>
          </div>
        </div>

        <TipBanner title="💡 Le cri de guerre : CAH" type="info">
          Pour te souvenir de la formule, rappelle-toi du premier mot magique de <strong>CAH-SOH-TOA</strong> (que tu complèteras en 3ème) : <br />
          <span className="text-xl font-black font-mono block text-center my-3 text-indigo-700 dark:text-indigo-300">
            C = A / H &nbsp; {"→"} &nbsp; Cosinus = Adjacent / Hypoténuse
          </span>
          Toujours l&apos;adjacent divisé par le plus grand côté ! Le résultat est donc <strong>toujours compris entre 0 et 1</strong> !
        </TipBanner>
      </Section>

      <Section title="2. Trouver une Longueur Manquante : Le Produit en Croix" icon="📏" color="slate">
        <p className="mb-4 leading-relaxed">
          Imagine une échelle de pompier posée contre une façade. Tu connais l&apos;angle d&apos;élévation au sol (60°) et la longueur de l&apos;échelle (8 mètres). Quelle hauteur atteint le mur ? Tu cherches la longueur.
        </p>

        <InteractiveExercise 
          title="Fiche Méthode : La technique ultime du 'Sur 1'"
          question={<>Calculer la distance au sol AB sachant que BC = 8 cm et l&apos;angle B fait 40° dans le triangle ABC rectangle en A.</>}
          steps={[
            <><strong>Étape 1 : Rédiger l&apos;introduction réglementaire.</strong><br/>&quot;Le triangle ABC est rectangle en A. On applique la formule du Cosinus pour l&apos;angle B.&quot;</>,
            <><strong>Étape 2 : Écrire la relation avec les lettres.</strong><br/>{"$\\cos(\\widehat{B}) = \\frac{\\text{Adjacent}}{\\text{Hypoténuse}} = \\frac{AB}{BC}$"}</>,
            <><strong>Étape 3 : Remplacer par les valeurs connues.</strong><br/>{"$\\cos(40^{\\circ}) = \\frac{AB}{8}$"}</>,
            <><strong>Étape 4 : L&apos;astuce magique du &apos;/1&apos;.</strong><br/>Pour ne jamais te tromper sur l&apos;équation, écris {"$\\cos(40^{\\circ})$"} sous forme de fraction en ajoutant un dénominateur de 1 :<br/>{"$\\frac{\\cos(40^{\\circ})}{1} = \\frac{AB}{8}$"}</>,
            <><strong>Étape 5 : Faire le Produit en Croix.</strong><br/>Le côté recherché AB est de diagonale logique :<br/>{"$AB = \\frac{8 \\times \\cos(40^{\\circ})}{1} = 8 \\times \\cos(40^{\\circ})$"}</>,
            <><strong>Étape 6 : Taper sur la calculatrice.</strong><br/>Tape <code>8 × Cos(40)</code>. Le résultat est de <strong>6,13 cm</strong> (au centième près).</>
          ]}
        />
      </Section>

      <Section title="3. Trouver un Angle Manquant : La puissance Cos⁻¹ (Arccos)" icon="🎯" color="rose">
        <p className="mb-4 leading-relaxed">
          Ici, tu as l&apos;échelle de 8 m et le sol de 4 m, et tu veux connaître parfaitement l&apos;inclinaison exacte en degrés ! Tu cherches l&apos;Angle. Ton sauveur est la touche <strong>Arccos</strong>.
        </p>

        <div className="bg-rose-50/50 dark:bg-rose-990/15 p-6 rounded-3xl border border-rose-150 dark:border-rose-900/50 my-6">
          <h3 className="font-bold text-rose-800 dark:text-rose-300 text-lg mb-4">La clé de déverrouillage de l&apos;angle</h3>
          <p className="text-sm mb-4">
            Le Cosinus emprisonne l&apos;angle à l&apos;intérieur de sa parenthèse. Pour le libérer, tu dois appliquer la fonction inverse <strong>Arccos</strong> (ou notée {"$Cos^{-1}$"} selon les calculatrices Casio/TI) :
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-card dark:bg-black/40 p-2.5 rounded border border-rose-100 dark:border-rose-900/40">
              1. On pose le rapport propre : {"$\\cos(\\widehat{B}) = \\frac{4}{8} = 0,5$"}
            </div>
            <div className="bg-card dark:bg-black/40 p-2.5 rounded border border-rose-100 dark:border-rose-900/40">
              2. On libère l&apos;angle en tapant la touche de déverrouillage : {"$\\widehat{B} = \\text{Arccos}(0,5)$"}
            </div>
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-800 text-white p-3.5 rounded-xl font-bold shadow-md text-center text-sm">
              🧑‍💻 Sur calculatrice : Appuie sur <code>Seconde</code> + <code>Cos</code> (ou <code>Shift</code> + <code>Cos</code>) et tape <code>0.5</code>. <br />
              {"→"} Mesure = <strong>60° !</strong>
            </div>
          </div>
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le professeur me demande le Cosinus de l&apos;angle d&apos;un rectangle non rectangle classique. Quelle formule poser ?</>}
            back={<><strong>Alerte Erreur Fatale ! PIÈGE !</strong><br/>Le mot &quot;Cosinus&quot; n&apos;a strictement AUCUN SENS si ton triangle n&apos;est pas <strong>RECTANGLE</strong>. Tu risquerais d&apos;avoir un calcul imaginaire déconnecté de la réalité.</>}
          />
          <Flashcard 
            front={<>La calculatrice me recrache un angle négatif ou une longueur absurde de -0.2 mètres ! Qu&apos;ai-je fait ?</>}
            back={<><strong>Problème d&apos;unité machine !</strong><br/>Ta calculatrice est réglée en [Rad] (Radians) ou [Grad] (Grades). Bascule-la en <strong>Mode Degrés [Deg]</strong> immédiatement via le bouton &apos;Mode&apos; ou &apos;Configuration&apos;, sinon le linter de ta note sera de 0 !</>}
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes (FAQ)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi Cos(B) ne peut jamais dépasser la valeur 1 ?",
              answer: "L'Hypoténuse (le dénominateur, en bas de la fraction) est immuablement le côté le plus long du triangle rectangle. Si tu divises n'importe quel côté normal par un côté plus grand que lui, le résultat mathématique est obligatoirement inférieur à 1. Si tu trouves Cos(B) = 1.6, tu as inversé ta fraction !"
            },
            {
              question: "Comment savoir si je dois multiplier ou diviser par le Cosinus ?",
              answer: "Grâce à notre technique magique du 'sur 1'. Si l'inconnu est sur le haut (le numérateur), le produit en croix te fait faire une multiplication. Si l'inconnu est en bas (au dénominateur, l'hypoténuse), le produit en croix se termine par une division !"
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans le triangle ABC rectangle en A, quel est le côté adjacent à l'angle C ?",
              options: [
                "C'est le côté AB.",
                "C'est le côté AC.",
                "C'est le côté BC (l'Hypoténuse)."
              ],
              correctAnswer: 1,
              explanation: "Bien joué ! L'hypoténuse est BC (face à l'angle droit). Les deux bras de l'angle C sont donc BC et AC. L'un est l'hypoténuse, donc le bras Adjacent est forcément AC !"
            },
            {
              question: "On te montre l'équation de départ : Cos(30°) = 5 / BC. Comment trouves-tu BC ?",
              options: [
                "BC = 5 × Cos(30°)",
                "BC = 5 ÷ Cos(30°)",
                "BC = Cos(30°) / 5"
              ],
              correctAnswer: 1,
              explanation: "Splendide ! Pour BC = 5 / Cos(30°). En effet, le produit en croix de [Cos(30°)/1 = 5/BC] donne BC = (5 × 1) ÷ Cos(30°)."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je repère à chaque coup l'Hypoténuse d'abord, pour sécuriser le bas de ma fraction.",
            "Je sais que le cosinus d'un angle aigu est un chiffre entre 0 et 1 (zéro-virgule-quelque-chose).",
            "J'ai vérifié le petit symbole 'D' ou 'DEG' tout en haut de l'écran de ma calculatrice."
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

export default Course_College_4eme_11_Cosinus;
