import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Triangle, Move, RotateCw, RefreshCw, Layers } from 'lucide-react';
import { MathComponent } from '../../components/MathComponent';

const Course_College_4eme_10_Triangles: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator State
  const [k, setK] = useState<number>(1.2);
  const [rotation, setRotation] = useState<number>(30);
  const [flip, setFlip] = useState<boolean>(false);

  // Reset simulator state
  const handleReset = () => {
    setK(1.0);
    setRotation(0);
    setFlip(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-10"
        title="Triangles Égaux et Semblables"
        subtitle="L'Art du Clonage et de la Proportionnalité en Géométrie"
        duration="1h 15"
        level="4ème (Cycle 4)"
        prerequisites={["Mesurer un angle et utiliser un rapporteur", "Notion de proportionnalité (fractions)"]}
        objectives={[
          "Reconnaître deux Triangles Égaux (clonage parfait de formes).",
          "Maîtriser les 3 cas d'égalité (SSS, CAC, ACA) pour prouver que deux triangles sont superposables.",
          "Reconnaître deux Triangles Semblables (poupées russes de forme identique).",
          "Démontrer la similitude à l'aide des angles ou de la proportionnalité des côtés homologues."
        ]}
      />

      <Section title="🌟 Introduction : Clones vs Famille élargie" icon="🧬" color="slate">
        <p className="leading-relaxed">
          En géométrie, repérer deux triangles identiques est une arme absolue. Si tu démontres que deux triangles sont rigoureusement identiques, tu peux <strong>voler</strong> toutes les longueurs et tous les angles du premier pour les attribuer directement au second sans faire aucun calcul !
        </p>
        <p className="mt-4 leading-relaxed">
          Le programme de 4ème te demande de bien distinguer deux notions cruciales : le <strong>clonage superposable</strong> (les triangles Égaux) et l'effet <strong>zoom / réduction</strong> (les triangles Semblables).
        </p>
      </Section>

      {/* INTERACTIVE SIMULATOR */}
      <Section title="🛠️ Simulateur Interactif : Clones et Zoom" icon={<Layers className="text-indigo-500" />} color="indigo">
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
          Manipule les curseurs ci-dessous pour transformer le triangle de droite <strong>(DEF)</strong>. Observe comment ses côtés et angles évoluent par rapport au triangle de référence de gauche <strong>(ABC)</strong>.
        </p>

        <div className="bg-card border border-slate-100 dark:border-slate-800/80 rounded-[2rem] p-6 shadow-xl shadow-indigo-500/5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual SVGs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* Triangle Reference ABC */}
              <div className="bg-slate-50 dark:bg-black/30 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center flex-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-2">Triangle ABC (Référence)</span>
                <svg width="100%" height="160" viewBox="0 0 220 160" className="mx-auto overflow-visible">
                  {/* Triangle wire */}
                  <polygon points="40,130 180,130 40,30" fill="rgba(99, 102, 241, 0.1)" stroke="#4f46e5" strokeWidth="2.5" />
                  
                  {/* Right Angle Indicator */}
                  <rect x="40" y="120" width="10" height="10" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
                  
                  {/* Vertices labels */}
                  <text x="25" y="135" className="fill-slate-800 dark:fill-white font-bold text-sm">A</text>
                  <text x="185" y="135" className="fill-slate-800 dark:fill-white font-bold text-sm">B</text>
                  <text x="35" y="25" className="fill-slate-800 dark:fill-white font-bold text-sm">C</text>

                  {/* Side values */}
                  <text x="105" y="145" className="fill-indigo-600 dark:fill-indigo-400 font-mono text-xs font-bold text-center">AB = 7 cm</text>
                  <text x="15" y="85" className="fill-indigo-600 dark:fill-indigo-400 font-mono text-xs font-bold">AC = 5 cm</text>
                  <text x="110" y="70" className="fill-indigo-600 dark:fill-indigo-400 font-mono text-xs font-bold">BC ≈ 8.6 cm</text>

                  {/* Angle values */}
                  <text x="55" y="122" className="fill-slate-500 font-mono text-[10px]">90°</text>
                  <text x="140" y="125" className="fill-slate-500 font-mono text-[10px]">35.5°</text>
                  <text x="45" y="55" className="fill-slate-500 font-mono text-[10px]">54.5°</text>
                </svg>
              </div>

              {/* Triangle Target DEF */}
              <div className="bg-slate-50 dark:bg-black/30 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center flex-1 transition-all">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-2">Triangle DEF (Transformé)</span>
                <svg width="100%" height="160" viewBox="0 0 220 160" className="mx-auto overflow-visible">
                  {/* Apply transform via center (110, 80) */}
                  <g transform={`translate(110, 80) rotate(${rotation}) scale(${k * (flip ? -1 : 1)}, ${k}) translate(-110, -80)`}>
                    {/* Yellow/emerald fill indicating dynamic change */}
                    <polygon points="40,120 180,120 40,20" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2.5" />
                    
                    {/* Right Angle Indicator */}
                    <rect x="40" y="110" width="10" height="10" fill="none" stroke="#10b981" strokeWidth="1.5" />
                    
                    {/* Vertices labels */}
                    <text x="25" y="125" className="fill-slate-800 dark:fill-white font-bold text-sm">D</text>
                    <text x="185" y="125" className="fill-slate-800 dark:fill-white font-bold text-sm">E</text>
                    <text x="35" y="15" className="fill-slate-800 dark:fill-white font-bold text-sm">F</text>
                  </g>
                </svg>
                {/* Visual state descriptors */}
                <div className="flex gap-2 justify-center mt-2 flex-wrap">
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-700 dark:text-slate-300">
                    Zoom: x{k.toFixed(1)}
                  </span>
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-700 dark:text-slate-300">
                    Angle: {rotation}°
                  </span>
                  {flip && (
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded font-bold text-amber-700 dark:text-amber-300">
                      Symétrie active
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Dynamic Controls */}
            <div className="space-y-6">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                🎮 Paramètres de la Transformation
              </h3>

              {/* Slider scale */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  <span>Zoom / Rapport d&apos;agrandissement (k)</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">k = {k.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.0" 
                  step="0.1" 
                  value={k} 
                  onChange={(e) => setK(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0.5 (Réduction)</span>
                  <span>1.0 (Égaux / Superposables)</span>
                  <span>2.0 (Agrandissement)</span>
                </div>
              </div>

              {/* Slider Rotation */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
                  <span>Orientation / Rotation (θ)</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">{rotation}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  step="5" 
                  value={rotation} 
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 bg-slate-100 dark:bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Checkbox flip & reset button */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={flip} 
                    onChange={(e) => setFlip(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  Appliquer une Symétrie (Retournement)
                </label>

                <button 
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all"
                >
                  <RefreshCw size={12} /> Réinitialiser
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Analysis section */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-1.5">
              📊 Analyse en temps réel des deux figures :
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-900 text-xs space-y-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">📏 Longueurs Comparées :</span>
                <p className="font-mono">AB = 7.0 cm  {"→"}  DE = {(7 * k).toFixed(1)} cm <span className="text-slate-400">(Ratio: DE/AB = {k.toFixed(1)})</span></p>
                <p className="font-mono">AC = 5.0 cm  {"→"}  DF = {(5 * k).toFixed(1)} cm <span className="text-slate-400">(Ratio: DF/AC = {k.toFixed(1)})</span></p>
                <p className="font-mono">BC ≈ 8.6 cm  {"→"}  EF = {(8.6 * k).toFixed(1)} cm <span className="text-slate-400">(Ratio: EF/BC = {k.toFixed(1)})</span></p>
              </div>

              <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-900 text-xs space-y-2">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">📐 Angles Comparés :</span>
                <p className="font-mono">{"∠A = 90.0°"}  {"→"}  {"∠D = 90.0°"} <span className="text-emerald-600 font-bold">{"(Égal)"}</span></p>
                <p className="font-mono">{"∠B = 35.5°"}  {"→"}  {"∠E = 35.5°"} <span className="text-emerald-600 font-bold">{"(Égal)"}</span></p>
                <p className="font-mono">{"∠C = 54.5°"}  {"→"}  {"∠F = 54.5°"} <span className="text-emerald-600 font-bold">{"(Égal)"}</span></p>
              </div>
            </div>

            {/* Verdict Box */}
            <div className="mt-4">
              {k === 1.0 ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-990/20 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 rounded-2xl font-medium text-xs md:text-sm shadow-sm flex items-start gap-2.5">
                  <span className="text-lg">✔️</span>
                  <div>
                    <strong>Verdict : Les triangles ABC et DEF sont ÉGAUX !</strong>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      Ils sont parfaitement superposables (clones). Toutes leurs longueurs homologues sont égales (DE = AB, DF = AC, EF = BC). La rotation et la symétrie n'affectent pas leur égalité !
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-blue-50 dark:bg-blue-995/20 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 rounded-2xl font-medium text-xs md:text-sm shadow-sm flex items-start gap-2.5">
                  <span className="text-lg">🔍</span>
                  <div>
                    <strong>Verdict : Les triangles ABC et DEF sont SEMBLABLES !</strong>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      Ils ont la même silhouette (leurs angles sont deux à deux identiques @ 90°, 35.5°, 54.5°), mais pas la même taille. Leurs longueurs sont proportionnelles de rapport <strong className="text-indigo-600 dark:text-indigo-400 font-mono">k = {k.toFixed(1)}</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section title="1. Triangles Égaux (Le Clonage Superposable)" icon="👥" color="slate">
        <p className="mb-4 leading-relaxed">
          Deux triangles sont dits <strong>ÉGAUX</strong> (ou historiquement, superposables) si tu peux les découper aux ciseaux et les poser l&apos;un sur l&apos;autre de manière <strong>parfaite</strong>, éventuellement après les avoir retournés (symétrie) ou tournés.
        </p>

        <p className="mb-4 font-semibold text-slate-800 dark:text-slate-200 text-sm">
          💡 Deux triangles égaux partagent donc :
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm mb-6">
          <li>Leurs 3 côtés deux à deux identiques (longueurs homologues identiques).</li>
          <li>Leurs 3 angles deux à deux identiques.</li>
        </ul>

        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-150 dark:border-slate-800/80 my-6">
          <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-300">
            🛠️ Comment prouver l&apos;égalité parfaite sans ciseaux ? (Les 3 cas d&apos;égalité)
          </h3>
          <p className="text-sm mb-4">
            Au brevet, tu ne peux pas découper les feuilles d&apos;examen. Tu dois chercher des preuves logiques. Il te suffit de démontrer <strong>L&apos;UN</strong> de ces 3 cas (un seul suffit) :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card dark:bg-black/40 p-5 rounded-2xl border text-center shadow-sm">
              <span className="font-bold block mb-2 text-indigo-600 dark:text-indigo-400">CAS 1 : Trois Côtés</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2">(Cas C-C-C)</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Si les 3 côtés du premier triangle ont exactement les mêmes mesures que les 3 côtés du second triangle, ils sont égaux.
              </p>
            </div>
            
            <div className="bg-card dark:bg-black/40 p-5 rounded-2xl border text-center shadow-sm">
              <span className="font-bold block mb-2 text-indigo-600 dark:text-indigo-400">CAS 2 : Sandwich d&apos;Angle</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2">(Cas C-A-C)</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Deux côtés ont la même longueur, et l&apos;angle <strong>coincé en sandwich</strong> entre ces deux côtés a la même mesure.
              </p>
            </div>
            
            <div className="bg-card dark:bg-black/40 p-5 rounded-2xl border text-center shadow-sm">
              <span className="font-bold block mb-2 text-indigo-600 dark:text-indigo-400">CAS 3 : Sandwich de Côté</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2">(Cas A-C-A)</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Un côté a la même longueur, et les deux angles <strong>qui touchent</strong> ce côté ont les mêmes mesures.
              </p>
            </div>
          </div>
        </div>

        <TipBanner title="⚠️ Alerte Sommet du Piège !" type="warning">
          Avoir 3 angles égaux <strong>NE SUFFIT JAMAIS</strong> pour dire que deux triangles sont égaux ! <br />
          Regarde un triangle équilatéral de 5 cm de côté (3 angles de 60°) et un autre géant de 2 mètres de côté (3 angles de 60° aussi). Ils partagent les mêmes angles, mais ne sont pas superposables ! Ils sont dits <strong>semblables</strong>.
        </TipBanner>
      </Section>

      <Section title="2. Triangles Semblables (La Notion de Zoom)" icon="🔍" color="slate">
        <p className="mb-4 leading-relaxed">
          Deux triangles sont dits <strong>SEMBLABLES</strong> s&apos;ils ont la même silhouette (mêmes angles), mais pas nécessairement la même taille. L&apos;un est un <strong>agrandissement</strong> ou une <strong>réduction</strong> de l&apos;autre.
        </p>

        <div className="bg-emerald-50/50 dark:bg-emerald-990/10 p-6 rounded-3xl border border-emerald-150 dark:border-emerald-800/40 my-6">
          <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
            🧬 Les deux chemins de détection au Brevet :
          </h3>
          
          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
            <p>
              🥇 <span className="text-emerald-600 dark:text-emerald-400 font-bold">Méthode 1 : Par les Angles (Le radar rapide)</span><br />
              S&apos;ils ont deux angles deux à deux identiques, alors ils sont semblables. En effet, comme la somme des angles d&apos;un triangle fait toujours 180°, le troisième angle sera lui aussi forcé d&apos;être égal.
            </p>
            <p>
              🥈 <span className="text-emerald-600 dark:text-emerald-400 font-bold">Méthode 2 : Par les Côtés (La proportionnalité lente)</span><br />
              S&apos;ils ont les longueurs de leurs côtés proportionnelles, alors ils sont semblables. Pour de tels triangles, le rapport d&apos;agrandissement ou réduction est appelé le coefficient d&apos;agrandissement/réduction <strong className="font-mono text-emerald-600 dark:text-emerald-400">k</strong>.
            </p>
          </div>
        </div>
      </Section>

      <Section title="3. L&apos;Ordre rigoureux des Côtés Homologues (La Loi du Plus Faible)" icon="⚖️" color="indigo">
        <p className="mb-4 leading-relaxed">
          Pour tester si deux triangles sont semblables par leurs côtés, ne divise pas n&apos;importe quoi par n&apos;importe quoi ! Tu dois associer les côtés qui jouent le même rôle, appelés les <strong>côtés homologues</strong>.
        </p>

        <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-6 rounded-[2rem] border border-indigo-100 dark:border-indigo-850/50 mb-6">
          <h3 className="font-bold text-indigo-800 dark:text-indigo-300 mb-3">
            🎯 La Règle d&apos;Or du rangement :
          </h3>
          <p className="text-sm mb-3">
            Trie toujours les longueurs du Triangle 1 et du Triangle 2 dans l&apos;ordre croissant (du plus petit au plus grand). Ensuite, divise :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-card dark:bg-black/30 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
              <span className="font-semibold text-xs block mb-1">Côté le Plus Petit</span>
              <MathComponent math={"\\frac{\\text{Plus Petit (DEF)}}{\\text{Plus Petit (ABC)}}"} />
            </div>
            
            <div className="bg-card dark:bg-black/30 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
              <span className="font-semibold text-xs block mb-1">Côté Moyen</span>
              <MathComponent math={"\\frac{\\text{Côté Moyen (DEF)}}{\\text{Côté Moyen (ABC)}}"} />
            </div>
            
            <div className="bg-card dark:bg-black/30 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
              <span className="font-semibold text-xs block mb-1">Côté le Plus Grand</span>
              <MathComponent math={"\\frac{\\text{Plus Grand (DEF)}}{\\text{Plus Grand (ABC)}}"} />
            </div>
          </div>
          <p className="text-xs text-slate-500 italic mt-4 text-center">
            &quot;Si ces trois quotients donnent exactement le même nombre k, les triangles sont semblables, et k est ton coefficient d&apos;échelle.&quot;
          </p>
        </div>

        <InteractiveExercise 
          title="Exercice résolu : Prouver la ressemblance au Brevet"
          question={<>Soit un triangle ABC de côtés : 6 cm, 8 cm et 10 cm.<br/>Soit un triangle DEF de côtés : 4 cm, 3 cm et 5 cm.<br/>Démontre que ces deux triangles sont semblables.</>}
          steps={[
            <><strong>Étape 1 : Classer les tailles par ordre croissant.</strong><br/>- Pour ABC : 6 cm (Petit), 8 cm (Moyen), 10 cm (Grand).<br/>- Pour DEF : 3 cm (Petit), 4 cm (Moyen), 5 cm (Grand).</>,
            <><strong>Étape 2 : Établir les rapports de quotients (Grand / Petit ou inverse).</strong><br/>Divisons les longueurs du plus grand triangle ABC par celles du plus petitDEF :<br/>- quotient du Petit : {"$\\frac{6}{3} = 2$"}<br/>- quotient du Moyen : {"$\\frac{8}{4} = 2$"}<br/>- quotient du Grand : {"$\\frac{10}{5} = \\mathbf{2}$"}</>,
            <><strong>Étape 3 : Rédiger la conclusion imprenable.</strong><br/>Comme {"$\\frac{AB}{DE} = \\frac{BC}{EF} = \\frac{AC}{DF} = 2$"}, les longueurs des deux triangles sont proportionnelles.<br/><strong>On conclut : Les triangles ABC et DEF sont semblables. ABC est un agrandissement de DEF de rapport k = 2.</strong></>
          ]}
        />
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Deux triangles ont pour angles respectifs (30°, 60°, 90°) et (30°, 65°, 85°). Sont-ils de la même famille (semblables) ?</>}
            back={<><strong>NON !</strong><br/>Pour être semblables, ils doivent avoir exactement les trois mêmes gènes (les mêmes angles en degrés). Ici, ce n&apos;est pas le même cas de silhouette (60° ≠ 65°).</>}
          />
          <Flashcard 
            front={<>Le triangle 1 est égal au triangle 2. Est-il aussi son semblable ?</>}
            back={<><strong>OUI, absolument !</strong><br/>Deux triangles égaux sont semblables de rapport d&apos;échelle {"$k = 1.0$"}. C&apos;est un zoom neutre (clonage exact). L&apos;égalité est un sous-cas particulier de la similitude.</>}
          />
        </div>
      </Section>

      <Section title="❓ Questions Fréquentes (FAQ)" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi nous embêter avec des théorèmes de sandwich au lieu de simplement mesurer au double décimètre ?",
              answer: "Parce que sur les sujets de brevet, il y a toujours écrit en gras 'Figure non à l'échelle' ou 'Le dessin n'est pas en vraie grandeur'. Si tu réponds en utilisant ta règle, tu auras 0 point. Seul le raisonnement logique avec les cas d'égalité ou les côtés homologues te donnera tous les points."
            },
            {
              question: "Quelle est la différence entre coefficient d'agrandissement et coefficient de réduction ?",
              answer: "C'est purement une affaire de taille du nombre ! Si ton coefficient k est strictement supérieur à 1 (ex: k = 2), tu as agrandi la forme. S'il est compris entre 0 et 1 (ex: k = 0,5), tu as réduit la forme (la forme devient deux fois plus petite)."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans les cas d'égalité, quel est le nom du cas dit 'Sandwich d'Angle' ?",
              options: [
                "Avoir trois angles égaux.",
                "Avoir deux angles égaux et un côté n'importe où.",
                "Avoir un angle de même mesure pris en sandwich entre deux côtés de mêmes longueurs."
              ],
              correctAnswer: 2,
              explanation: "Exactement ! Cas Côté-Angle-Côté (CAC). L'angle doit être formé précisément par la rencontre de ces deux côtes spécifiques."
            },
            {
              question: "On te dit que le rapport de proportionnalité k pour aller de ABC à DEF est de 0,4. Qu'est-ce que cela signifie ?",
              options: [
                "DEF est un agrandissement de ABC de 40%.",
                "DEF est une réduction de ABC, ses côtés sont 2.5 fois plus petits.",
                "C'est impossible, un rapport de zoom doit toujours être supérieur à 1."
              ],
              correctAnswer: 1,
              explanation: "Comme k (0.4) est plus petit que 1, il s'agit d'une réduction. Multiplier par 0,4 revient à diviser par 2,5 (car 1 / 0,4 = 2,5). C'est très efficace !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais trier les côtés du plus petit au plus grand pour tester la proportionnalité.",
            "Je me rappelle que 3 angles de même mesure = SEMBLABLES et pas forcément égaux.",
            "Je manipule l'écriture des fractions homologues sans intervertir l'ordre haut/bas."
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

export default Course_College_4eme_10_Triangles;
