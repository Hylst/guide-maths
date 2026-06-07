import React, { useState, useEffect } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, AccordionFAQ, TipBanner, InfoBlock 
} from '../../components/SharedUI';
import { Terminal, Code, Cpu, Repeat, GitBranch, Play, RotateCcw, AlertCircle, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_3eme_06_Algorithmique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator State
  const [targetShape, setTargetShape] = useState<'square' | 'triangle' | 'hexagon'>('square');
  const [repeats, setRepeats] = useState<number>(4);
  const [angle, setAngle] = useState<number>(90);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawProgress, setDrawProgress] = useState<number>(0);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);
  const [simMessage, setSimMessage] = useState<{ type: 'success' | 'warning' | 'info'; text: string }>({
    type: 'info',
    text: "Configurez les blocs Scratch puis cliquez sur 'Exécuter le script'."
  });

  // Target values
  const targets = {
    square: { r: 4, a: 90, name: "un Carré" },
    triangle: { r: 3, a: 120, name: "un Triangle équilatéral" },
    hexagon: { r: 6, a: 60, name: "un Hexagone régulier" }
  };

  const handleResetSim = () => {
    setIsDrawing(false);
    setDrawProgress(0);
    setCurrentPoints([]);
    setSimMessage({
      type: 'info',
      text: "Simulateur réinitialisé. Ajustez les paramètres pour relever le défi."
    });
  };

  useEffect(() => {
    handleResetSim();
    // Auto-fill parameters nicely for the selected shape so user can see correct or slightly off starting points
    if (targetShape === 'square') {
      setRepeats(4);
      setAngle(90);
    } else if (targetShape === 'triangle') {
      setRepeats(3);
      setAngle(60); // Intentionally offset so they can correct 60 -> 120!
    } else if (targetShape === 'hexagon') {
      setRepeats(5); // Intentionally offset so they can correct 5 -> 6!
      setAngle(60);
    }
  }, [targetShape]);

  // Run the turtle path render in ticks
  const handleStartSim = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setDrawProgress(0);
    setCurrentPoints([]);

    const sideLen = 45;
    const startX = 100;
    const startY = 120;
    const points: { x: number; y: number }[] = [{ x: startX, y: startY }];

    let currX = startX;
    let currY = startY;
    let currAngleDeg = 0; // facing right

    for (let i = 0; i < repeats; i++) {
      // Calculate next coordinate based on direction
      const angleRad = (currAngleDeg * Math.PI) / 180;
      currX += sideLen * Math.cos(angleRad);
      currY += sideLen * Math.sin(angleRad);
      points.push({ x: currX, y: currY });

      // Apply rotation for next step
      currAngleDeg += angle; // turning right
    }

    // Animate drawing points
    let idx = 0;
    const timer = setInterval(() => {
      idx++;
      if (idx <= repeats) {
        setDrawProgress(idx);
        setCurrentPoints(points.slice(0, idx + 1));
      } else {
        clearInterval(timer);
        setIsDrawing(false);

        // Check success conditions
        const target = targets[targetShape];
        const isClosed = Math.abs(currX - startX) < 2 && Math.abs(currY - startY) < 2;
        
        if (repeats === target.r && angle === target.a) {
          setSimMessage({
            type: 'success',
            text: `🎯 Magnifique ! Tu as dessiné parfaitement ${target.name} !`
          });
        } else if (isClosed && repeats > target.r) {
          setSimMessage({
            type: 'warning',
            text: `⚠️ La figure s'est fermée, mais le crayon a repassé inutilement sur les mêmes traits car Répéter (${repeats}) est trop grand !`
          });
        } else if (!isClosed) {
          setSimMessage({
            type: 'warning',
            text: `❌ Oh non, la figure n'est pas fermée. L'angle de rotation (${angle}°) ou le nombre d'itérations (${repeats}) n'est pas correct !`
          });
        } else {
          setSimMessage({
            type: 'info',
            text: "Figure tracée. Est-elle conforme à tes prévisions ?"
          });
        }
      }
    }, 400);
  };

  return (
    <div id="algo-course-root" className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        id="algo-header"
        acronym="MATH-3EME-06"
        title="Algorithmique et Programmation"
        subtitle="Devenez l'architecte du code avec le logiciel Scratch !"
        duration="1h 15"
        level="3ème (Cycle 4)"
        prerequisites={["Géométrie élémentaire", "Mesure d'angles en degrés", "Calcul littéral de base"]}
        objectives={[
          "Maîtriser le concept fondamental de Variable (écraser vs additionner).",
          "Comprendre les structures itératives (les boucles Pour et Tant Que).",
          "Savoir exécuter de tête un programme d'instructions conditionnelles.",
          "Être capable de décoder un tracé Scratch géométrique complexe pour le Brevet."
        ]}
      />

      <Section id="intro" title="🌟 Introduction : Dompter l'obéissance aveugle" icon="👨‍🍳" color="slate">
        <p>
          Un ordinateur, contrairement à ce que l'on lit parfois, est une machine parfaitement bête. Il ne possède aucune initiative, aucune intuition. Sa seule force réside dans sa vitesse phénoménale et son obéissance absolue.
        </p>
        <p className="mt-4">
          Un <strong>algorithme</strong> est simplement une recette de cuisine ultra-précise. Si vous donnez des instructions floues à un robot de cuisine, il finira par détruire vos ingrédients. En mathématiques au Cycle 4, nous utilisons le langage de programmation par blocs <strong>Scratch</strong> pour structurer notre pensée, automatiser des calculs algébriques lourds et dessiner de splendides rosaces géométriques de manière dynamique.
        </p>
      </Section>

      {/* INTERACTIVE block scratch / drawing tool */}
      <Section id="atelier-scratch" title="🧱 L'Atelier Scratch Interactif" icon="🐢" color="indigo">
        <TipBanner id="scratch-banner" title="Aidez le lutin Scratch à relever le défi géométrique" type="info">
          Choisissez la figure cible ci-dessous, modifiez les blocs de boucle et d'angle pour correspondre parfaitement au cahier des charges, puis cliquez sur <strong>Démarrer</strong> pour observer le dessin en temps réel !
        </TipBanner>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-stretch bg-card border border-border-strong rounded-[2rem] p-6 shadow-md">
          {/* Target selector & blocks - 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-3">1. Choisissez un défi de dessin :</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setTargetShape('square')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${
                    targetShape === 'square' 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Dessiner un Carré
                </button>
                <button 
                  onClick={() => setTargetShape('triangle')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${
                    targetShape === 'triangle' 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Dessiner un Triangle équilatéral
                </button>
                <button 
                  onClick={() => setTargetShape('hexagon')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${
                    targetShape === 'hexagon' 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Dessiner un Hexagone
                </button>
              </div>
            </div>

            {/* Visual Scratch Blocks */}
            <div className="space-y-2 select-none">
              <h3 className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-1">2. Vos Blocs Scratch de code :</h3>
              
              {/* Event Block */}
              <div className="bg-amber-500 text-white font-bold p-3 rounded-t-xl rounded-rb-xl w-fit text-sm shadow-sm flex items-center gap-2 border-b-4 border-amber-600">
                <span className="text-lg">🏁</span> quand drapeau vert cliqué
              </div>

              {/* Init blocks */}
              <div className="bg-sky-500 text-white font-bold p-2.5 rounded-xl w-3/4 text-xs shadow-sm ml-4 border-b-4 border-sky-600">
                effacer tout & relever le stylo
              </div>
              <div className="bg-sky-500 text-white font-bold p-2.5 rounded-xl w-3/4 text-xs shadow-sm ml-4 border-b-4 border-sky-600">
                aller à x: 0, y: 0 et s'orienter à 90° (droite)
              </div>
              <div className="bg-sky-500 text-white font-bold p-2.5 rounded-xl w-3/4 text-xs shadow-sm ml-4 border-b-4 border-sky-600">
                stylo en position d'écriture
              </div>

              {/* Repeat Loop block */}
              <div className="bg-orange-500 text-white font-bold p-4 mr-4 rounded-xl shadow-sm ml-4 border-l-8 border-l-orange-600 border-b-4 border-orange-600 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Repeat size={16} /> répéter 
                  <input 
                    type="number" 
                    value={repeats}
                    onChange={(e) => setRepeats(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={isDrawing}
                    className="w-12 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center rounded p-1 font-mono font-bold"
                  />
                  fois:
                </div>

                {/* Sub-blocks inside the loop */}
                <div className="pl-4 border-l-2 border-orange-300 space-y-2">
                  <div className="bg-sky-500 text-white font-bold p-2.5 rounded-lg text-xs shadow-inner flex items-center gap-2 border-b-2 border-sky-600">
                    avancer de <span className="bg-white/20 px-2 py-0.5 rounded font-mono">45</span> pas
                  </div>
                  <div className="bg-sky-500 text-white font-bold p-2.5 rounded-lg text-xs shadow-inner flex items-center gap-2 border-b-2 border-sky-600">
                    tourner ↻ de 
                    <input 
                      type="number" 
                      value={angle}
                      onChange={(e) => setAngle(parseInt(e.target.value) || 0)}
                      disabled={isDrawing}
                      className="w-16 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center rounded p-0.5 font-mono font-bold"
                    />
                    degrés
                  </div>
                </div>

                <div className="text-[10px] text-white/80 uppercase font-black tracking-wider">Fin du bloc répéter</div>
              </div>
            </div>
          </div>

          {/* SVG canvas drawing on right - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 dark:bg-slate-950 rounded-3xl p-4 border border-dashed text-center min-h-[350px]">
            <span className="text-2xs font-bold tracking-widest text-slate-400 uppercase">Écran de Tracé Géométrique</span>
            
            <div className="relative w-full h-56 flex items-center justify-center my-4 overflow-hidden bg-background rounded-2xl border shadow-inner">
              
              {/* Dynamic Grid */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] dark:opacity-[0.06] pointer-events-none">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border border-foreground"></div>
                ))}
              </div>

              {/* Dynamic SVG */}
              <svg className="w-full h-full" viewBox="0 0 240 240">
                {/* Coordinates axes */}
                <line x1="120" y1="0" x2="120" y2="240" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-800" />
                <line x1="0" y1="120" x2="240" y2="120" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-800" />

                {/* Traced Lines */}
                {currentPoints.length > 1 && (
                  <path 
                    d={`M ${currentPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                    fill="none" 
                    stroke="#4f46e5" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="drop-shadow-sm"
                  />
                )}

                {/* Simulated Turtle Pointer (Cat Arrow pointer) */}
                {currentPoints.length > 0 && (
                  <g transform={`translate(${currentPoints[currentPoints.length - 1].x}, ${currentPoints[currentPoints.length - 1].y})`}>
                    <circle r="8" className="fill-amber-500 stroke-white stroke-2 animate-pulse" />
                    <polygon points="0,-4 8,0 0,4" className="fill-indigo-900" transform={`rotate(${angle * drawProgress})`} />
                  </g>
                )}
              </svg>

              {/* Absolute loading loader */}
              {isDrawing && (
                <div className="absolute bottom-2 right-2 bg-indigo-600 text-white font-mono text-[9px] px-2 py-1 rounded animate-pulse">
                  Compilation bloc {drawProgress}/{repeats}...
                </div>
              )}
            </div>

            {/* Sim Info Banner Output */}
            <div className={`p-3 rounded-2xl text-xs font-semibold text-left flex items-start gap-2 border ${
              simMessage.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 text-emerald-800 dark:text-emerald-300' :
              simMessage.type === 'warning' ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 text-amber-800 dark:text-amber-300' :
              'bg-slate-100 dark:bg-slate-900 border-slate-200 text-slate-700 dark:text-slate-300'
            }`}>
              {simMessage.type === 'success' ? <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" /> : <AlertCircle size={16} className="mt-0.5 flex-shrink-0 animate-bounce" />}
              <span>{simMessage.text}</span>
            </div>

            <div className="flex gap-2 mt-4">
              <button 
                onClick={handleStartSim}
                disabled={isDrawing}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                <Play size={16} /> Exécuter le script
              </button>
              <button 
                onClick={handleResetSim}
                className="py-3 px-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition"
                aria-label="Réinstaller le tracé"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section id="variable" title="1. La Variable (Le coffre-fort de la mémoire)" icon="📦" color="indigo">
        <p className="mb-4">
          Contrairement à notre esprit qui retient les nombres de manière fluide, un microprocesseur d'ordinateur a besoin de compartiments rigides et nommés pour stocker des informations temporaires : ce sont les <strong>Variables</strong>.
        </p>

        <div className="bg-card p-6 rounded-[2rem] border border-border-strong border-t-8 border-t-indigo-500 shadow-sm my-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 bg-indigo-50 dark:bg-indigo-900/40 rounded-3xl border-4 border border-dashed border-indigo-500 flex flex-col items-center justify-center shadow-inner relative">
               <span className="text-[10px] bg-indigo-500 text-white px-2.5 py-0.5 rounded-full absolute -top-3.5 font-bold tracking-wider font-mono">Ma_Variable</span>
               <span className="font-mono text-4xl font-black text-indigo-700 dark:text-indigo-300">17</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="font-bold text-foreground">Une variable se définit comme une boîte étiquetée. Tu as le droit à 3 boutons :</p>
               <ul className="space-y-1.5 text-sm md:text-base text-slate-600 dark:text-slate-400">
                 <li><span className="text-indigo-500 font-bold mr-2">Mettre à :</span> Écrase brutalement le contenu précédent pour y inscrire une nouvelle chose.</li>
                 <li><span className="text-indigo-500 font-bold mr-2">Ajouter à :</span> Conserve l'ancienne valeur historique et réalise une addition arithmétique (+/-).</li>
                 <li><span className="text-indigo-500 font-bold mr-2">Rappeler :</span> Extrait la valeur actuelle pour la poser dans un calcul (comme {"$x$"} en algèbre).</li>
               </ul>
            </div>
          </div>
        </div>

        <TipBanner id="variable-trap" title="L'indispensable piège du Brevet !" type="warning">
          Ne confondez jamais sur votre copie de brevet de fin d'année : <br />
          - Le bloc <strong>"Mettre [Score] à 10"</strong> {"\u2192"} Le Score devient égal à 10, quoi qu'il se soit passé avant.
          <br />
          - Le bloc <strong>"Ajouter 10 à [Score]"</strong> {"\u2192"} On ajoute 10 à la boîte. Si Score valait 15, il équivaut désormais à 25.
        </TipBanner>

        <InfoBlock title="Le saviez-vous ? D'où vient le mot « Algorithme » ?" type="funfact">
          Le mot « algorithme » provient de la latinisation du nom du légendaire mathématicien perse <strong>Muhammad ibn Musa al-Khwarizmi</strong> (né vers 780). Il a écrit le premier traité d&apos;algèbre moderne et a popularisé l&apos;introduction des chiffres indo-arabes en Europe. Quant au mot de l&apos;outil de programmation « Scratch », il fait référence à la technique des DJ de hip-hop qui mélangent et assemblent des morceaux de disques vinyles, tout comme nous assemblons des blocs de code !
        </InfoBlock>

        <InfoBlock type="info" title="Zoom sur : L'art du débogage informatique">
          En programmation, un bug est une anomalie ou une erreur contenue dans ton script d&apos;instructions. Le mot « bug » (qui signifie petit insecte en anglais) est né en 1947 quand la pionnière de l&apos;informatique Grace Hopper décida d&apos;ouvrir un immense ordinateur en panne à l&apos;université de Harvard... et y trouva une véritable mite coincée entre deux relais électriques physiques ! Déboguer, c&apos;est exécuter mentalement ton bloc Scratch, ligne par ligne, avec un crayon et un brouillon, pour dépister quel bloc s&apos;est mal enchaîné.
        </InfoBlock>
      </Section>

      <Section id="boucles" title="2. Les Boucles (Le pouvoir secret d'automatisation)" icon="🔄" color="emerald">
        <p className="mb-4">
          Pourquoi s'épuiser à écrire 4 fois d'affilée "Avancer de 10 pas, tourner à droite" ? Un bon informaticien est un informaticien paresseux qui délègue ces actions répétitives à la boucle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {/* Loop POUR */}
          <div className="bg-card border-x border-b border-t-8 border-t-emerald-500 rounded-3xl p-5 shadow-sm space-y-3">
             <div className="flex items-center gap-2">
               <Repeat className="text-emerald-500" />
               <h4 className="font-black text-foreground">La boucle définie (POUR / Répéter N fois)</h4>
             </div>
             <p className="text-xs text-slate-400 font-medium">On l'utilise quand on connaît dès le départ le nombre précis d'itérations à accomplir.</p>
             <div className="bg-orange-100 dark:bg-orange-950/40 p-2 text-xs font-bold font-mono rounded border border-orange-200">répéter (4) fois</div>
             <div className="bg-slate-100 dark:bg-slate-900 border-l-4 border-orange-500 p-2 ml-4 font-mono text-xs text-orange-600 dark:text-orange-400 space-y-1 rounded-r">
               <div>avancer de 100 pas</div>
               <div>tourner ↻ de 90°</div>
             </div>
             <p className="text-xs text-muted-text"><strong>Tracé :</strong> Ici, l'ordinateur s'exécute précisément 4 fois d'affilée, dessinant un carré parfait de dimension 100.</p>
          </div>

          {/* Loop TANT QUE */}
          <div className="bg-card border-x border-b border-t-8 border-t-amber-500 rounded-3xl p-5 shadow-sm space-y-3">
             <div className="flex items-center gap-2">
               <Repeat className="text-amber-500" />
               <h4 className="font-black text-foreground">La boucle conditionnelle (Répéter jusqu'à)</h4>
             </div>
             <p className="text-xs text-slate-400 font-medium">On l'utilise quand l'arrêt dépend d'un capteur, d'un événement externe ou d'un test logique inconnu.</p>
             <div className="bg-amber-100 dark:bg-amber-950/40 p-2 text-xs font-bold font-mono rounded border border-amber-200">répéter jusqu'à ce que (toucher la couleur rouge)</div>
             <div className="bg-slate-100 dark:bg-slate-900 border-l-4 border-amber-500 p-2 ml-4 font-mono text-xs text-amber-600 dark:text-amber-400 space-y-1 rounded-r">
               <div>avancer de 10 pas</div>
             </div>
             <p className="text-xs text-muted-text"><strong>Arrêt :</strong> Le lutin avance par saccades tant qu'il ne bute pas sur un pixel rouge. Utile pour coder des collisions de jeux vidéo !</p>
          </div>
        </div>
      </Section>

      <Section id="conditions" title="3. Les Structures Conditionnelles" icon="🛣️" color="blue">
        <p className="mb-4">
          La force d'un programme informatique réside dans ses embranchements logiques. C'est l'outil <strong>Si... Alors... Sinon</strong> (les balises conditionnelles).
        </p>

        <div className="bg-sky-50 dark:bg-sky-900/10 p-6 rounded-[2rem] border border-sky-100 shadow-sm flex flex-col md:flex-row gap-6 items-center my-6">
          <GitBranch className="w-16 h-16 text-sky-500 flex-shrink-0" />
          <div className="flex-1">
             <h4 className="font-bold text-sky-800 dark:text-sky-300 text-lg mb-2">L'aiguillage d'instructions Scratch :</h4>
             <div className="font-mono text-sm bg-background p-4 rounded-2xl border space-y-1 text-slate-700 dark:text-slate-300">
               <strong>SI</strong> {"<"} Note est supérieure ou égale à 10 {">"} <strong>ALORS</strong><br/>
               <span className="pl-4 text-emerald-600 font-bold">Dire ("Chapeau bas !") pendant 2 secondes</span><br/>
               <strong>SINON</strong><br/>
               <span className="pl-4 text-rose-600 font-bold">Dire ("Encore un petit effort !") pendant 2 secondes</span>
             </div>
             <p className="mt-3 text-xs text-slate-400 leading-relaxed font-semibold">
               ⚠️ Un processeur ne réalise jamais les deux sorties simultanément ! Si la condition initiale est validée, il pénètre l'espace ALORS et saute automatiquement l'espace SINON sans s'y arrêter.
             </p>
          </div>
        </div>
      </Section>

      {/* TWO DETAILED SOLVED EXERCISES SECTION */}
      <Section id="exercices-resolus" title="✏️ Exercices Résolus de Programmation" icon="✍️" color="emerald">
        
        {/* Exercise 1 */}
        <InteractiveExercise 
          title="Exercice 1 : Le Tracé Polygonal du Brevet Blanc"
          question={(
            <div>
              <p className="mb-2">
                Un lutin Scratch s'exécute en déplaçant son crayon. On étudie le bloc de script suivant :
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border font-mono text-xs my-3 space-y-1">
                <p className="text-amber-500">Mettre la longueur à 20</p>
                <p className="text-orange-500">Répéter 5 fois :</p>
                <p className="pl-4 text-sky-500">Avancer de 'longueur' pas</p>
                <p className="pl-4 text-sky-500">Tourner de 90° à gauche</p>
                <p className="pl-4 text-amber-500">Ajouter 20 à la longueur</p>
              </div>
              <p className="font-bold">
                1. Quelle est la longueur du premier trait dessiné ? <br />
                2. De combien de degrés a tourné le lutin au total à la fin de la boucle ? <br />
                3. Quelle figure géométrique spirale se dessine à l'écran ?
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Analyse du premier tracé :</strong>
              <p className="mt-1 text-slate-600">
                L'algorithme initialise la variable <code>longueur</code> à 20. 
                <br />
                La boucle débute et la première instruction rencontrée est : "Avancer de longueur pas".
                <br />
                Le premier trait mesure donc très exactement <strong>20 pas</strong>.
              </p>
            </>,
            <>
              <strong>2. Suivi de l'angle cumulé :</strong>
              <p className="mt-1 text-slate-600">
                La boucle s'exécute très exactement 5 fois. À chaque passage, le lutin réalise une rotation de 90°.
                <br />
                L'angle total cumulé de rotation est de : <code>{"$5 \\times 90^{\\circ} = 450^{\\circ}$"}</code>.
              </p>
            </>,
            <>
              <strong>3. Simulation pas-à-pas des longueurs successives :</strong>
              <p className="mt-1 text-slate-600">
                Détaillons les 5 tracés exécutés par la machine :
                <br />
                - Passage 1 : Avancer de <strong>20 pas</strong> (puis longueur devient 40).
                <br />
                - Passage 2 : Avancer de <strong>40 pas</strong> (puis longueur devient 60).
                <br />
                - Passage 3 : Avancer de <strong>60 pas</strong> (puis longueur devient 80).
                <br />
                - Passage 4 : Avancer de <strong>80 pas</strong> (puis longueur devient 100).
                <br />
                - Passage 5 : Avancer de <strong>100 pas</strong> (puis longueur devient 120).
              </p>
            </>,
            <>
              <strong>4. Conclusion géométrique :</strong>
              <p className="mt-1 text-slate-600">
                Puisque l'angle reste constant (90° = angle droit) mais que chaque trait successif est de plus en plus long, le crayon ne se ferme pas.
                <br />
                Il décrit une magnifique <strong>spirale rectangulaire</strong> en colimaçon vers l'extérieur !
              </p>
            </>
          ]}
        />

        {/* Exercise 2 */}
        <InteractiveExercise 
          title="Exercice 2 : Le programme avec variables imbriquées"
          question={(
            <div>
              <p className="mb-2">
                On propose le programme de calcul textuel suivant implémentant deux variables nommées {"$x$"} et {"$y$"} :
              </p>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border font-mono text-xs my-3 space-y-1">
                <p>1. Saisir un nombre de départ</p>
                <p>2. Stocker ce nombre dans la variable x</p>
                <p>3. Mettre y à la valeur : x multiplié par x</p>
                <p>4. Ajouter 10 à la variable y</p>
                <p>5. Retirer le double de x à la variable y</p>
                <p>6. Afficher la valeur de y</p>
              </div>
              <p className="font-bold">
                1. Quel nombre obtient-on à la fin si l'on saisit 5 au départ ? <br />
                2. Exprimez la formule algébrique finale de {"$y$"} en fonction du nombre de départ {"$x$"}.
              </p>
            </div>
          )}
          steps={[
            <>
              <strong>1. Application de l'algorithme avec le nombre 5 :</strong>
              <p className="mt-1 text-slate-600 font-mono text-sm space-y-1">
                <span>- Ligne 1-2 : x = 5</span> <br />
                <span>- Ligne 3 : y = 5 × 5 = 25</span> <br />
                <span>- Ligne 4 : y = 25 + 10 = 35</span> <br />
                <span>- Ligne 5 : Le double de x est 10. On le soustrait : y = 35 - 10 = 25</span>
              </p>
              <p className="font-bold text-indigo-600 mt-2">Le résultat affiché est donc 25.</p>
            </>,
            <>
              <strong>2. Modélisation littérale algébrique (en fonction de x) :</strong>
              <p className="mt-1 text-slate-600">
                Posons rigoureusement la variable de départ sous la forme d'un inconnu littéral {"$x$"}.
                <br />
                - Ligne 3 : {"$y = x^2$"}
                <br />
                - Ligne 4 : {"$y = x^2 + 10$"}
                <br />
                - Ligne 5 : Le double de {"$x$"} s'écrit {"$2x$"}. On l'enlève : {"$y = x^2 - 2x + 10$"}.
              </p>
              <p className="text-sm border-t pt-2 mt-2">
                <strong>Vérification magique :</strong> En remplaçant {"$x$"} par 5 :
                <br />
                <code>{"$5^2 - 2 \\times 5 + 10 = 25 - 10 + 10 = 25$"}</code>. Notre modélisation littérale est parfaitement exacte !
              </p>
            </>
          ]}
        />
      </Section>

      <Section id="flashcards" title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le script m'annonce : "Mettre X à 3", puis "Répéter 4 fois : Ajouter X à X". Quelle est la valeur de X à la fin ?</>}
            back={<><strong>48 !</strong><br/>Attention de ne pas aller trop vite de tête :<br/>1er tour : X = 3 + 3 = 6.<br/>2e tour : X = 6 + 6 = 12.<br/>3e tour : X = 12 + 12 = 24.<br/>4e tour : X = 24 + 24 = 48 !</>}
          />
          <Flashcard 
            front={<>Quelle est la formule universelle pour fermer un polygone régulier à N côtés sur Scratch ?</>}
            back={<>Le tracé doit faire un tour complet de 360° divisé par le nombre de côtés.<br/>La formule de l'angle à insérer dans le bloc Tourner ↻ est obligatoirement : <strong>{"$360 \\div N$"}</strong> degrés.</>}
          />
          <Flashcard 
            front={<>Qu'est-ce que le système de coordonnées cartésiennes de Scratch ?</>}
            back={<>C'est une grille plane virtuelle. Son centre est l'origine (x:0, y:0). L'axe horizontal x oscille entre -240 et +240, et l'axe vertical y s'étend de -180 à +180.</>}
          />
          <Flashcard 
            front={<>Comment s'appelle l'outil qui permet de changer de cap si une condition est validée, et de faire autre chose sinon ?</>}
            back={<>C'est la structure conditionnelle alternative : <strong>Si... Alors... Sinon</strong>.</>}
          />
        </div>
      </Section>

      <Section id="faq" title="❓ Questions Fréquentes" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi est-ce que tourner à gauche de 90° et tourner à droite de 270° est équivalent ?",
              answer: "Parce qu'un cercle complet fait 360 degrés ! Si l'on tourne de 270° dans un sens, on s'oriente vers la même direction finale que si l'on avait fait le saut le plus court de 90° dans l'autre sens (360 - 270 = 90)."
            },
            {
              question: "Qu'est ce qu'un bloc 'Stylo en position d'écriture' sur Scratch ?",
              answer: "C'est l'ordre d'abaisser la mine virtuelle du crayon sur le papier pour tracer des traits lors de chaque déplacement. Sans cette instruction, le lutin bouge de manière invisible sans laisser la moindre marque à l'écran."
            },
            {
              question: "Quelle est la différence fondamentale entre '=' en programmation et en algèbre ?",
              answer: "En algèbre classique, '=' désigne un équilibre statique indestructible. En programmation informatique, c'est l'affectation dynamique de valeur. Modifier le contenu d'un casier en lui détruisant sa valeur d'origine pour y enregistrer la nouvelle."
            }
          ]}
        />
      </Section>

      <Section id="final" title="🎯 Épreuve Finale de Logique" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "À la fin d'un script d'examen, on peut lire : { Répéter 5 fois [ Tourner de 72° ] }. De quel angle total le lutin a-t-il pivoté ?",
              options: [
                "72°",
                "360° (tour complet)",
                "180° (demi-tour)"
              ],
              correctAnswer: 1,
              explanation: "Exactement ! 5 tours de de 72° équivalent à une rotation totale de 5 × 72 = 360°, ce qui correspond à un tour d'horizon complet sur soi-même."
            },
            {
              question: "On exécute avec x = 4 : { Si (x < 3) Alors [ x = 10 ] Sinon [ x = x + 2 ] }. Que vaut x à la sortie ?",
              options: [
                "10",
                "4",
                "6"
              ],
              correctAnswer: 2,
              explanation: "Top ! La condition (4 < 3) est fausse ! Le processeur plonge donc tête la première dans le block Sinon de secours, ajoutant 2 à x : x = 4 + 2 = 6."
            },
            {
              question: "Comment traduire mathématiquement l'opération Scratch 'Mettre X à (3 * X + 1)' ?",
              options: [
                "La fonction affine f(x) = 3x + 1",
                "Une équation à résoudre",
                "La constante absolue 3"
              ],
              correctAnswer: 0,
              explanation: "Formidable ! Multiplier une entrée par 3 et lui ajouter 1 est la définition rigoureuse en mathématiques de la fonction affine f(x) = 3x + 1."
            }
          ]}
        />
        
        <InteractiveChecklist 
          id="essentials-checklist"
          items={[
            "Je sais d'un coup d'œil suivre les modifications de valeurs des variables.",
            "Je maîtrise l'usage de la boucle géométrique fermée (360/N degrés).",
            "Je fais la différence critique entre 'Mettre à' et 'Ajouter à'.",
            "J'ai compris le fonctionnement d'un aiguillage logique Si... Alors... Sinon."
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

export default Course_College_3eme_06_Algorithmique;
