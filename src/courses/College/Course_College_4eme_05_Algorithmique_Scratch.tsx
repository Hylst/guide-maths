import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner
} from '../../components/SharedUI';
import { Code, Terminal, Play, Repeat, Navigation, PackageOpen, RotateCw, RotateCcw, PenTool, Trash2 } from 'lucide-react';

interface DrawLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const Course_College_4eme_05_Scratch: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {

  // Scratch Simulator coordinates (Scratch center is 0,0)
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [direction, setDirection] = useState<number>(90); // Scratch: 90 is RIGHT, 0 is UP, 180 is DOWN, -90 is LEFT
  const [penDown, setPenDown] = useState<boolean>(true);
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [stepInput, setStepInput] = useState<number>(40);

  // Math translation for Scratch sprite
  // Scratch: 0 points UP, 90 points RIGHT.
  // Standard math angle for drawing starts at RIGHT (90 Scratch is 0 Math, 0 Scratch is 90 Math).
  const scratchToMathRad = (deg: number): number => {
    const mathDeg = 90 - deg;
    return (mathDeg * Math.PI) / 180;
  };

  const handleMove = (steps: number) => {
    const rad = scratchToMathRad(direction);
    const dx = Math.round(Math.cos(rad) * steps);
    const dy = Math.round(Math.sin(rad) * steps);

    const newX = Math.min(130, Math.max(-130, posX + dx));
    const newY = Math.min(130, Math.max(-130, posY + dy));

    if (penDown) {
      setLines(prev => [...prev, { x1: posX, y1: posY, x2: newX, y2: newY }]);
    }
    setPosX(newX);
    setPosY(newY);
  };

  const rotateCw = (deg: number) => {
    setDirection(prev => {
      let raw = prev + deg;
      // Normalise to -180 to 180 Scratch space
      while (raw > 180) raw -= 360;
      while (raw <= -180) raw += 360;
      return raw;
    });
  };

  const rotateCcw = (deg: number) => {
    setDirection(prev => {
      let raw = prev - deg;
      while (raw > 180) raw -= 360;
      while (raw <= -180) raw += 360;
      return raw;
    });
  };

  const clearSandbox = () => {
    setPosX(0);
    setPosY(0);
    setDirection(90);
    setPenDown(true);
    setLines([]);
  };

  // Convert Scratch coordinate to SVG viewbox (300 x 300, center is 150, 150)
  const mapX = (x: number): number => 150 + x;
  const mapY = (y: number): number => 150 - y; // Y goes up in Scratch but down in SVG

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4">
      <CourseHeader 
        acronym="MATH-4EME-05"
        title="Algorithmique et Scratch"
        subtitle="Contrôlez la matrice et devenez le marionnettiste du Chat !"
        duration="1h"
        level="4ème (Cycle 4)"
        prerequisites={["Se repérer dans un plan (x,y)", "Notions de distances"]}
        objectives={[
          "Comprendre ce qu'est une Variable (Une boîte magique).",
          "Maîtriser les boucles ('Répéter' vs 'Répéter Indéfiniment').",
          "Anticiper les coordonnées (x,y) de fin de mouvement.",
          "Lire et prédire le tracé exact d'un algorithme au Brevet."
        ]}
      />

      <Section title="🌟 Introduction : Le pouvoir d'un Algorithme" icon="💻" color="slate">
        <p>
          Un ordinateur est la machine la plus obéissante de la création. Il obéit aveuglément à des séries d'ordres sans jamais se poser de question. Un <strong>Algorithme</strong>, c'est simplement une <strong>recette de cuisine ultra-détaillée</strong> que tu lui donnes.
        </p>
        <p className="mt-4">
          Dans le langage visuel Scratch, on emboîte des blocs comme des Lego. Au Brevet des Collèges, l'épreuve de mathématiques comporte presque systématiquement un exercice d'algorithmique. On va te donner un algorithme écrit et te demander : <em>« Si je clique sur le drapeau vert, que va-t-il se dessiner à l'écran ? »</em>. À toi d'apprendre à être le compilateur humain !
        </p>
      </Section>

      {/* SCHEMA INTERACTIF & APLI ENRICHIE */}
      <Section title="🎮 Simulateur Interactif : Dr. Scratch" icon="🐱" color="indigo">
        <p className="mb-6 text-muted-text">
          Bienvenue dans le laboratoire spatial de Scratch ! Clique sur les blocs d'instructions sur la gauche pour déplacer le chat sur la grille quadrillée de droite. Observe comment les coordonnées {"$(x, y)$"} et le stylo s'adaptent à chaque instruction.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-card dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-indigo-100/50 dark:shadow-none shadow-xl">
          {/* Blocks Menu (Left) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono text-indigo-500 font-bold uppercase tracking-widest block mb-1">Boîte à Blocs</span>
            
            {/* Move Block */}
            <div className="p-3 bg-blue-100 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-mono text-sm font-semibold">
                <span>avancer de</span>
                <input 
                  type="number" 
                  value={stepInput} 
                  onChange={e => setStepInput(Math.min(100, Math.max(10, parseInt(e.target.value) || 10)))}
                  className="w-12 text-center bg-card rounded p-0.5 border border-blue-300 font-bold text-slate-800 dark:text-slate-150"
                />
                <span>pas</span>
              </div>
              <button 
                onClick={() => handleMove(stepInput)}
                className="p-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-current"/> Exécuter
              </button>
            </div>

            {/* Rotate Right CW Block */}
            <div className="p-3 bg-indigo-100 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-mono text-sm font-semibold">
                <RotateCw className="w-4 h-4 text-indigo-500" />
                <span>tourner ↻ de 90 degrés</span>
              </div>
              <button 
                onClick={() => rotateCw(90)}
                className="p-1 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all"
              >
                Tourner
              </button>
            </div>

            {/* Rotate Left CCW Block */}
            <div className="p-3 bg-indigo-100 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-200 font-mono text-sm font-semibold">
                <RotateCcw className="w-4 h-4 text-indigo-500" />
                <span>tourner ↺ de 90 degrés</span>
              </div>
              <button 
                onClick={() => rotateCcw(90)}
                className="p-1 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all"
              >
                Tourner
              </button>
            </div>

            {/* Polygon rotation shortcuts */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => rotateCw(120)}
                className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-mono font-bold rounded-xl flex items-center justify-center gap-1"
              >
                <RotateCw className="w-3 h-3" /> Triangle (120°)
              </button>
              <button 
                onClick={() => rotateCw(60)}
                className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-mono font-bold rounded-xl flex items-center justify-center gap-1"
              >
                <RotateCw className="w-3 h-3" /> Hexagone (60°)
              </button>
            </div>

            {/* Pen Tool Block */}
            <div className={`p-3 border rounded-xl flex items-center justify-between gap-2 shadow-sm transition-all ${penDown ? 'bg-emerald-100 border-emerald-200 text-emerald-950 dark:bg-emerald-950/20' : 'bg-rose-100 border-rose-200 text-rose-950 dark:bg-rose-950/20'}`}>
              <div className="flex items-center gap-2 font-mono text-sm font-semibold">
                <PenTool className="w-4 h-4" />
                <span>stylo en position d'écriture</span>
              </div>
              <button 
                onClick={() => setPenDown(!penDown)}
                className={`p-1 px-3 text-white rounded-lg text-xs font-bold transition-all ${penDown ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}
              >
                {penDown ? 'Leve Stylo' : 'Pose Stylo'}
              </button>
            </div>

            {/* Monitor Area */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 font-mono text-xs space-y-2">
              <span className="font-bold text-slate-500 uppercase tracking-widest block text-[10px] mb-2">Variables du Système</span>
              <div className="flex justify-between border-b pb-1">
                <span>Coordonnée x :</span>
                <span className="font-bold text-indigo-600">{posX}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Coordonnée y :</span>
                <span className="font-bold text-indigo-600">{posY}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Direction actuelle :</span>
                <span className="font-bold text-blue-500">{direction}° (Scratch)</span>
              </div>
              <div className="flex justify-between">
                <span>État du stylo :</span>
                <span className={`font-bold ${penDown ? 'text-emerald-500' : 'text-rose-500'}`}>{penDown ? 'ÉCRITURE 🖊️' : 'LEVÉ 🚫'}</span>
              </div>
            </div>

            {/* Trash Clear Button */}
            <button 
              onClick={clearSandbox}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Trash2 className="w-4 h-4"/> Réinitialiser la Toile
            </button>
          </div>

          {/* Grid Canvas Screen (Right) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 min-h-[300px] border border-slate-100 dark:border-slate-800 relative">
            <span className="absolute top-3 left-3 text-[10px] font-mono text-slate-400">ÉCRAN MAQUETTE SCRATCH 240x240</span>
            
            <svg width="280" height="280" viewBox="0 0 300 300" className="overflow-visible bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md">
              {/* Grid Lines */}
              <line x1="0" y1="150" x2="300" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
              <circle cx="150" cy="150" r="100" fill="none" stroke="#e2e8f0" strokeWidth="1" />

              {/* Coords corner notes */}
              <text x="270" y="162" fontSize="9" className="font-mono fill-slate-400 text-right">x</text>
              <text x="135" y="15" fontSize="9" className="font-mono fill-slate-400">y</text>

              {/* Drawn Lines */}
              {lines.map((line, i) => (
                <line
                  key={i}
                  x1={mapX(line.x1)}
                  y1={mapY(line.y1)}
                  x2={mapX(line.x2)}
                  y2={mapY(line.y2)}
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              ))}

              {/* Drawn Sprite representation (a shiny triangle or circle pointing to Scratch angle) */}
              <g transform={`translate(${mapX(posX)}, ${mapY(posY)}) rotate(${95 - direction})`}>
                <circle cx="0" cy="0" r="10" fill="#6366f1" className="shadow-lg" />
                {/* Nose pointer direction */}
                <polygon points="-4,-8 0,-18 4,-8" fill="#f43f5e" />
                {/* Eyes showing coordinate orientation */}
                <circle cx="-3" cy="-2" r="1.5" fill="#ffffff" />
                <circle cx="3" cy="-2" r="1.5" fill="#ffffff" />
              </g>
            </svg>
          </div>
        </div>

        {/* Le saviez-vous ? InfoBlock */}
        <div className="mt-6">
          <InfoBlock title="Le saviez-vous ? L'origine de Scratch" type="funfact">
            Scratch a été créé par l'un des laboratoires du prestigieux **MIT (Massachusetts Institute of Technology)**. Son ambition première était de permettre aux enfants du monde entier de comprendre la logique du code informatique simplement à l'aide de blocs colorés empilables !
          </InfoBlock>
        </div>
      </Section>

      <Section title="1. Le Plan de Travail (x, y) et l'Orientation" icon="🗺️" color="indigo">
        <p className="mb-4">Le chat de Scratch vit dans un repère orthogonal en 2D parfait. Le centre exact de son écran de jeu est le point <strong className="font-mono bg-indigo-100 dark:bg-indigo-950 px-2 py-1 rounded text-indigo-700 dark:text-indigo-400 font-bold">(0, 0)</strong>.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-card p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm relative overflow-hidden">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-300">
              <Navigation className="w-5 h-5"/> L'Axe des coordonnées
            </h3>
            <ul className="space-y-3 font-medium text-slate-700 dark:text-slate-300">
              <li><strong className="text-rose-500">x (Axe horizontal)</strong> : Droite (positif) / Gauche (négatif).</li>
              <li><strong className="text-sky-500 font-bold">y (Axe vertical)</strong> : Haut (positif) / Bas (négatif).</li>
            </ul>
            <div className="mt-4 bg-slate-50 dark:bg-slate-950 p-3 rounded font-mono text-xs border border-slate-150">
              aller à x: (50) y: (-20) &rarr; Le chat est situé en bas à droite !
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 shadow-sm relative overflow-hidden">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-300">
              <Navigation className="w-5 h-5"/> L'Orientation du regard (La boussole)
            </h3>
            <ul className="space-y-3 font-medium text-slate-700 dark:text-slate-300 font-mono text-sm">
              <li><strong>0°</strong> : Regarde en HAUT (Nord).</li>
              <li><strong>90°</strong> : Regarde à DROITE (Est - orientation de départ).</li>
              <li><strong>180°</strong> : Regarde en BAS (Sud).</li>
              <li><strong>-90°</strong> : Regarde à GAUCHE (Ouest).</li>
            </ul>
          </div>
        </div>
        
        <TipBanner title="Le piège de la plume invisible" type="warning">
          Un chat qui bouge ne dessine absolument rien au départ ! Tu dois <strong>OBLIGATOIREMENT</strong> ajouter le bloc <strong>« Stylo en position d'écriture »</strong> issu de l'extension Stylo. S'il n'y est pas, le chat se déplace mais ne laisse aucune trace de son passage (Réponse piège au Brevet !).
        </TipBanner>
      </Section>

      <Section title="2. Les Variables (Les boîtes secrètes)" icon="📦" color="blue">
        <p className="mb-4">Une « Variable » est une boîte virtuelle sur laquelle tu places une étiquette (par exemple : "Longueur", "Score", "Vie"). Tu mets une donnée numérique dedans, et l'ordinateur peut s'en rappeler ou la modifier !</p>

        <div className="bg-blue-50/50 dark:bg-blue-950/20 p-6 rounded-[2rem] border border-blue-200 dark:border-blue-900 my-6 flex flex-col md:flex-row gap-6 items-center">
          <PackageOpen className="w-24 h-24 text-blue-500 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-mono bg-slate-950 text-emerald-400 p-4 rounded-xl mb-4 text-sm leading-relaxed border border-emerald-950 shadow-inner">
              (1) Mettre [Longueur] à 50<br/>
              (2) Avancer de (Longueur)<br/>
              (3) Ajouter 10 à [Longueur]<br/>
              (4) Avancer de (Longueur)
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <strong>Traduction humaine :</strong> Au début, ma boîte 'Longueur' contient la valeur 50. J'avance de 50. Ensuite j'AJOUTE 10 dans la boîte ! La boîte contient maintenant <strong>60</strong>. Mon deuxième trait fera donc 60 pas de long ! C'est le secret absolu pour tracer des Spirales de taille progressive à chaque tour de boucle.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <InfoBlock title="Rappel déterminant" type="reminder">
            Différencie bien le bloc d'assignation **« Mettre Nom à X »** (qui écrase la boîte) du bloc incrémental **« Ajouter X à Nom »** (qui additionne la valeur à la donnée précédente).
          </InfoBlock>
        </div>
      </Section>

      <Section title="3. Les Boucles et les Angles" icon="🔁" color="emerald">
        <p className="mb-4">Si un chat doit dessiner un Carré, on ne va pas copier/coller 4 fois de suite « Avancer de 100 », « Tourner ». On utilise le bloc orange fantastique : <strong>Répéter (4) fois</strong>.</p>
        
        <InteractiveExercise 
          title="Le secret des Angles Extérieurs"
          question={<>Pour dessiner une FIGURE FERMÉE RÉGULIÈRE, tu dois utiliser la formule magique : <strong>Angle de Rotation = 360 / Nombre de Côtés</strong>. Quel est l'angle exact pour un Triangle Équilatéral ?</>}
          steps={[
            <><strong>Nombre de côtés :</strong> Un triangle équilatéral possède 3 côtés égaux.</>,
            <><strong>L'opération de rotation :</strong> 360 &divide; 3 = 120.</>,
            <><strong>Le bloc magique :</strong> Tourner ↻ de (120) degrés.</>,
            <><strong>L'Erreur Mondiale :</strong> Beaucoup d'élèves écrivent 60° car l'angle À L'INTÉRIEUR du triangle fait 60°. Mais le chat avance, et pour tourner, il effectue le virage EXTÉRIEUR au sommet ! Il doit donc pivoter de 120° (le supplément pour faire un demi-tour rectiligne de 180° : 180 - 60 = 120).</>
          ]}
        />
        
        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 snap-x">
          <div className="bg-card dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm min-w-[200px] snap-center">
             <div className="font-bold text-center border-b pb-2 mb-2 text-slate-800 dark:text-slate-100">CARRÉ</div>
             <div className="font-mono text-sm text-center text-slate-500">Répéter (4) fois<br/>Avancer de X<br/>Tourner ↻ 90°</div>
          </div>
          <div className="bg-card dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm min-w-[200px] snap-center">
             <div className="font-bold text-center border-b pb-2 mb-2 text-slate-800 dark:text-slate-100">TRIANGLE EQU.</div>
             <div className="font-mono text-sm text-center text-slate-500">Répéter (3) fois<br/>Avancer de X<br/>Tourner ↻ 120°</div>
          </div>
          <div className="bg-card dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm min-w-[200px] snap-center">
             <div className="font-bold text-center border-b pb-2 mb-2 text-slate-800 dark:text-slate-100">HEXAGONE</div>
             <div className="font-mono text-sm text-center text-slate-500">Répéter (6) fois<br/>Avancer de X<br/>Tourner ↻ 60°</div>
          </div>
        </div>
      </Section>

      {/* RESOLVED EXERCISES (EXERCICES RESOLUS) - OBLIGATOIRE */}
      <Section title="📝 Exercices Résolus de Compilateur Humain" icon="✍️" color="purple">
        <div className="space-y-6">
          <InteractiveExercise 
            title="Exercice Résolu 1 : Le Tracé d'Escargot"
            question={
              <div className="space-y-2">
                <p>On exécute l'algorithme suivant :</p>
                <div className="bg-slate-950 text-emerald-400 p-3 rounded-xl font-mono text-xs leading-relaxed max-w-sm">
                  - Poser le stylo<br/>
                  - Mettre L à 10<br/>
                  - Répéter 3 fois :<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;- Avancer de L<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;- Tourner ↻ de 90°<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;- Ajouter 20 à L
                </div>
                <p>Quelles sont les longueurs successives des segments dessinés par le chat ?</p>
              </div>
            }
            steps={[
              <><strong>Étape 1 : Analyse de la première itération de boucle</strong><br/>
              La variable L vaut 10 au début. Le chat avance de <strong>10</strong> pas.<br/>
              Il tourne à droite de 90°. La variable L s'ajoute de 20 et vaut désormais : 10 + 20 = <strong>30 pas</strong>.</>,
              <><strong>Étape 2 : Deuxième boucle</strong><br/>
              Le chat avance de la nouvelle valeur de L, soit <strong>30</strong> pas.<br/>
              Il tourne à droite de 90°. La variable L s'ajoute de 20 et vaut désormais : 30 + 20 = <strong>50 pas</strong>.</>,
              <><strong>Étape 3 : Troisième et dernière boucle</strong><br/>
              Le chat avance de la nouvelle valeur de L, soit <strong>50</strong> pas.<br/>
              Il tourne à droite de 90°. La variable L passe à 50 + 20 = 70 pas (mais le tracé s'arrête ici !).<br/>
              Les segments tracés mesurent donc successivement : <strong>10 pas, 30 pas, et 50 pas</strong>.</>
            ]}
          />

          <InteractiveExercise 
            title="Exercice Résolu 2 : Le Piège des Coordonnées"
            question={
              <p>Le chat est positionné au point de coordonnée {"$(20, -50)$"}. Il exécute la consigne : « aller à x: (abscisse de départ - 30) y: (ordonnée de départ + 80) ». Quelles sont ses nouvelles coordonnées ?</p>
            }
            steps={[
              <><strong>Étape 1 : Analyser l'abscisse (axe x)</strong><br/>
              Le chat démarre à {"$x = 20$"}. Une diminution de 30 donne :<br/>
              {"$x_{\\text{final}} = 20 - 30 = -10$"}.</>,
              <><strong>Étape 2 : Analyser l'ordonnée (axe y)</strong><br/>
              Le chat démarre à la fois bas : {"$y = -50$"}. Une augmentation de 80 donne :<br/>
              {"$y_{\\text{final}} = -50 + 80 = +30$"}.</>,
              <><strong>Étape 3 : Conclusion finale</strong><br/>
              Le chat aura pour coordonnées finales : <strong>{"$(-10, 30)$"}</strong>. Il se situe désormais dans le quartier supérieur gauche de l'écran.</>
            ]}
          />
        </div>
      </Section>

      <Section title="⚡ Flashcards" icon="🧠" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Le chat pointe vers l'Est (90°) et j'exécute le bloc : « Tourner ↻ 90 degrés ». Vers où regarde-t-il désormais ?</>}
            back={<><strong>En Bas (180°) !</strong><br/>Il pointait à Droite (90°). En pivotant vers la droite de son corps de 90°, il finit par regarder vers le bas, vers le Sud, soit 180° dans le repère Scratch.</>}
          />
          <Flashcard 
            front={<>À quoi sert spécifiquement le bloc d'initialisation « Effacer tout » au début de chaque algorithme propre ?</>}
            back={<><strong>À réinitialiser la toile virtuelle !</strong><br/>Sinon, à chaque fois que tu cliques sur le drapeau vert, les nouveaux dessins s'impriment par dessus les anciens comme du gribouillage infini.</>}
          />
        </div>
      </Section>

      <Section title="FAQ" icon="❓" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Si j'ai des Boucles Imbriquées : Un 'Répéter 5 fois' à l'intérieur d'un 'Répéter 3 fois' ?",
              answer: "Les nombres de pas s'additionnent ou se multiplient ? On multiplie ! Le bloc intérieur s'exécutera 5 fois d'affilée, et ce scénario se reproduira 3 fois de suite, soit 5 × 3 = 15 exécutions globales du bloc de base. C'est idéal pour créer de magnifiques rosaces."
            },
            {
              question: "Ma calculette ou Scratch a-t-il les mêmes angles que les mathématiques traditionnelles ?",
              answer: "Presque, mais fais attention ! En trigonométrie classique (0° commence à droite et monte anti-horaire). Sur Scratch, 0° commence en Haut (au Nord) et tourne horaire. C'est l'équivalent d'une boussole marine !"
            },
            {
              question: "Que se passe-t-il au Brevet si je ne justifie pas les calculs d'angles ?",
              answer: "Pour les figures géométriques régulières de Scratch, écris systématiquement la formule : Angle = 360 / (nombre de côtés) pour garantir d'enlever tous les points à la notation."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "L'instruction `s'orienter à 0` fait pointer notre chat vers quel segment de l'écran ?",
              options: [
                "Le point Cardinal NORD (Vers le Haut)",
                "Le point Cardinal EST (Vers la Droite des x)",
                "Le chat effectue une rotation à 360° et ne bouge pas."
              ],
              correctAnswer: 0,
              explanation: "Exact ! Sur Scratch, orientation 0 égale le Haut absolu (90 est la droite, 180 le bas, -90 la gauche)."
            },
            {
              question: "Le chat part de (0, 0), posé à droite (90°). Il avance de 50, pivote de 90° ↺ (anti-horaire), puis avance de 20. Quelles sont ses coordonnées ?",
              options: [
                "(50, 20)",
                "(20, 50)",
                "(-50, -20)"
              ],
              correctAnswer: 0,
              explanation: "Top ! Départ de 0,0. Avancer de 50 vers la droite donne x=50. Pivoter à gauche (anti-horaire) l'oriente vers le haut (0°). Avancer de 20 fait grimper y à 20. On atterrit à (50, 20)."
            },
            {
              question: "Si j'écris 'Répéter 8 fois : avancer de 50 pas, tourner de 45 degrés.' Quelle figure le chat va-t-il dessiner ?",
              options: [
                "Un Hexagone régulier",
                "Un Octogone régulier (Huit côtés)",
                "Une spirale éternelle"
              ],
              correctAnswer: 1,
              explanation: "Bravo ! Répéter 8 fois trace 8 côtés identiques. Et l'angle de rotation extérieur est bien de 360 ÷ 8 = 45°. C'est la signature de l'Octogone !"
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je chercherai impérativement le bloc 'Stylo en position d'écriture' pour analyser les figures du Brevet.",
            "Je me rappellerai de la formule Angle = 360 / (N côtés) pour toutes les rotations régulières.",
            "Je distinguerai sans faille l'effet de 'Mètre à' vs 'Ajouter à' pour les variables."
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

export default Course_College_4eme_05_Scratch;
