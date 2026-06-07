import React, { useState } from 'react';
import { 
  CourseHeader, Section, Flashcard, Quiz, InteractiveChecklist, 
  InteractiveExercise, InfoBlock, AccordionFAQ, TipBanner, FormulaBox
} from '../../components/SharedUI';
import { Bot, Code2, ArrowRight, Waypoints, RotateCw, RefreshCw, Compass } from 'lucide-react';
import { MathComponent } from "../../components/MathComponent";

const Course_College_6eme_11_Algorithmique_Scratch: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator States
  const [catX, setCatX] = useState(150);
  const [catY, setCatY] = useState(100);
  const [angle, setAngle] = useState(0); // 0 = right, 90 = down, 180 = left, 270 = up
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  const handleAdvance = () => {
    // Calculate new position
    const rad = (angle * Math.PI) / 180;
    const distance = 40;
    const newX = Math.round(catX + Math.cos(rad) * distance);
    const newY = Math.round(catY + Math.sin(rad) * distance);

    // Keep within bounds
    const clampedX = Math.max(10, Math.min(290, newX));
    const clampedY = Math.max(10, Math.min(190, newY));

    setLines(prev => [...prev, { x1: catX, y1: catY, x2: clampedX, y2: clampedY }]);
    setCatX(clampedX);
    setCatY(clampedY);
  };

  const handleTurnRight = () => {
    setAngle(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setCatX(150);
    setCatY(100);
    setAngle(0);
    setLines([]);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-6EME-11"
        title="Algorithmique et Scratch"
        subtitle="Apprendre à parler au Capping Électrique"
        duration="1h"
        level="6ème (Cycle 3)"
        prerequisites={["Géométrie de base (connaître les angles droits)", "Repérage sur un quadrillage"]}
        objectives={[
          "Comprendre ce qu'est un algorithme et un programme.",
          "Distinguer la différence vitale entre Traduction (Avancer/Reculer) et Rotation (Tourner).",
          "Maîtriser la brique magique 'Répéter' pour économiser du code.",
          "Décoder un programme d'un tracé géométrique complexe."
        ]}
      />

      <Section title="🌟 Introduction : L'Idiot Parfait" icon="🤖" color="slate">
        <p>
          Un ordinateur est la machine la plus bête de l'univers : <strong>il ne sait absolument rien faire de lui-même !</strong> Mais c'est aussi la plus puissante, car <strong>il exécute à la perfection absolue</strong> tous les ordres qu'on lui transmet.
        </p>
        <p className="mt-4">
          Si tu lui ordonnes d'aller "chercher du pain", il risque de planter. Pourquoi ? Parce que pour lui, c'est trop flou ! Tu dois lui préciser : "Lève ton pied droit de 30 cm, pousse ta jambe vers l'avant, repose-la, fais pareil avec la gauche...". Cette suite finie d'ordres ultra-précis s'appelle : <strong>un Algorithme</strong>.
        </p>
        <p className="mt-4">
          Sur Terre, les informaticiens écrivent ces lignes à l'aide de langages complexes (comme Python ou JavaScript). Au collège, nous utilisons une formidable alternative utilisant de jolis briques imbriquées comme du Lego : le logiciel <strong>Scratch</strong> !
        </p>
      </Section>

      {/* SCRATCH INTERACTIVE PLAYGROUND DETECTOR */}
      <Section title="🐱 Le Mini-Scratch : Pilote le Lutin !" icon="Code2" color="indigo">
        <p className="mb-6">
          Voici notre simulateur de tracé Scratch. Clique sur les blocs ci-dessous pour empiler des commandes réelles et regarde le Chat tracer des lignes sur son espace à dessin !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-indigo-50/50 dark:bg-indigo-900/10 p-6 md:p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-900/50">
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-bold text-indigo-950 dark:text-indigo-200">Ta palette de Blocs Scratch :</h4>
            
            {/* Advance block */}
            <button 
              onClick={handleAdvance}
              className="w-full flex items-center justify-between px-5 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-md transform active:scale-95 transition-all text-sm antialiased"
            >
              <div className="flex items-center gap-3">
                <ArrowRight size={20} />
                <span>avancer de 40 pas</span>
              </div>
              <span className="bg-sky-750 text-xs px-2 py-1 rounded font-mono">Bleu</span>
            </button>

            {/* Turn block */}
            <button 
              onClick={handleTurnRight}
              className="w-full flex items-center justify-between px-5 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-md transform active:scale-95 transition-all text-sm antialiased"
            >
              <div className="flex items-center gap-3">
                <RotateCw size={20} />
                <span>tourner à droite de 90 degrés</span>
              </div>
              <span className="bg-indigo-750 text-xs px-2 py-1 rounded font-mono">Bleu</span>
            </button>

            {/* Reset block */}
            <button 
              onClick={handleReset}
              className="w-full flex items-center justify-between px-5 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold shadow-md transform active:scale-95 transition-all text-sm antialiased"
            >
              <div className="flex items-center gap-3">
                <RefreshCw size={20} />
                <span>effacer tout et réinitialiser</span>
              </div>
              <span className="bg-rose-750 text-xs px-2 py-1 rounded font-mono">Rouge</span>
            </button>

            {/* Orientation tracker feedback */}
            <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-indigo-100 font-medium text-xs space-y-1">
              <p className="flex justify-between">
                <span>Position du lutin :</span>
                <span className="font-mono font-bold">X : {catX - 150}, Y : {100 - catY}</span>
              </p>
              <p className="flex justify-between">
                <span>Direction :</span>
                <span className="font-mono font-bold text-indigo-600">
                  {angle === 0 ? '⏩ Droite (0°)' : angle === 90 ? '⬇️ Bas (90°)' : angle === 180 ? '⏪ Gauche (180°)' : '⬆️ Haut (270°)'}
                </span>
              </p>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col items-center bg-card dark:bg-black/30 rounded-3xl border border-indigo-100/50 p-4 relative min-h-[220px]">
            <svg width="100%" height="200" className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950">
              {/* Drawn lines trace */}
              {lines.map((line, idx) => (
                <line 
                  key={idx} 
                  x1={line.x1} 
                  y1={line.y1} 
                  x2={line.x2} 
                  y2={line.y2} 
                  stroke="#ef4444" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
              ))}

              {/* Grid backdrop */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-900" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" pointerEvents="none" />

              {/* The Cat Lutin Avatar */}
              <g transform={`translate(${catX - 12}, ${catY - 12}) rotate(${angle}, 12, 12)`} className="transition-transform duration-300">
                <rect width="24" height="24" rx="12" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                {/* Face indicators to show direction */}
                <circle cx="16" cy="8" r="2" fill="black" />
                <circle cx="16" cy="16" r="2" fill="black" />
                <polygon points="22,12 16,10 16,14" fill="#ef4444" />
                <text x="2" y="15" fontSize="12">🐱</text>
              </g>
            </svg>
            <span className="text-[10px] text-slate-400 mt-2">Active les briques ci-contre pour dessiner ton carré ou ton escalier !</span>
          </div>
        </div>
      </Section>

      <Section title="1. L'Anatomie du Plan de Travail" icon="Code2" color="indigo">
        <p className="mb-4">
          Dans Scratch, l'application se compose systématiquement de trois espaces indispensables pour faire naître ton programme :
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
           <div className="bg-card dark:bg-black/30 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-center">
             <div className="h-4 w-full bg-rose-500 rounded-full mb-3"></div>
             <h4 className="font-bold text-rose-500 mb-2">1. Le Magasin de blocs</h4>
             <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
               C'est là que sont rangés tous les blocs d'instruction classés par couleur : <strong>Bleu</strong> pour les mouvements, <strong>Jaune</strong> pour le contrôle (le démarrage, les boucles), et <strong>Vert</strong> pour les calculs.
             </p>
           </div>
           
           <div className="bg-card dark:bg-black/30 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-center">
             <div className="h-4 w-full bg-indigo-500 rounded-full mb-3"></div>
             <h4 className="font-bold text-indigo-500 mb-2">2. La Zone de script</h4>
             <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
               C'est le centre de contrôle, ton espace blanc d'écriture. Tu y glisses et y connectes ("clipses") les blocs entre-eux de haut en bas pour définir le cerveau de ton personnage.
             </p>
           </div>

           <div className="bg-card dark:bg-black/30 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-center">
             <div className="h-4 w-full bg-emerald-500 rounded-full mb-3"></div>
             <h4 className="font-bold text-emerald-500 mb-2">3. La Scène et le Lutin</h4>
             <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
               C'est la fenêtre de rendu (ton écran de jeu). Le <strong>Lutin</strong> (le petit chat Scratch par défaut) s'y déplace et y dessine à l'écran dès que tu cliques sur le fameux drapeau vert de démarrage.
             </p>
           </div>
        </div>
      </Section>

      <Section title="2. Mouvement vs Orientation : Ne confonds plus !" icon="ArrowRight" color="blue">
        <p className="mb-4 leading-relaxed">
          C'est l'erreur la plus classique commise lors des examens scolaires de fin de cycle : confondre le déplacement spatial réel et la rotation sur soi-même.
        </p>

        <TipBanner title="Le Grand Dicateur de Trait :" type="warning">
          <strong>Brique [avancer de 50 pas] :</strong> Le personnage fait un pas en avant en ligne droite, selon la direction vers laquelle son regard pointe. S'il tient un stylo d'écriture en position posée, cela trace une droite physique de 50 pixels sur l'écran.<br/><br/>
          <strong>Brique [tourner à droite de 90 degrés] :</strong> Le personnage <strong>ne bouge pas d'un seul millimètre !</strong> Il pivote seulement sur son axe, comme s'il tournait la tête. Cela ne trace aucune ligne sur le papier mais oriente simplement l'angle de la prochaine droite qu'il tracera.
        </TipBanner>
      </Section>

      <Section title="3. L'Économie d'Énergie : Le bloc 'Répéter'" icon="Waypoints" color="amber">
        <p className="mb-4">
          Pour ordonner au robot de dessiner un carré, on pourrait empiler quatre fois de suite les mêmes briques d'instruction... mais c'est fatiguant et prend beaucoup trop de place dans notre zone de script !
        </p>

        <p className="mb-4">
          On utilise alors une <strong>Boucle de répétition</strong>. C'est un grand bloc jaune en "C" qui prend au piège les briques placées à l'intérieur :
        </p>

        <div className="my-6 p-5 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 rounded-2xl max-w-md mx-auto">
          <p className="font-bold text-amber-950 dark:text-amber-200 mb-3 font-mono">Structure d'un Carré dans Scratch :</p>
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg border-2 border-yellow-300 font-mono text-sm space-y-2">
            <p className="font-extrabold text-yellow-700 dark:text-yellow-400">Répéter [4] fois :</p>
            <div className="pl-6 border-l-4 border-sky-400 space-y-1 font-semibold text-sky-700 dark:text-sky-300">
              <p>avancer de 100 pas</p>
              <p>tourner à droite de 90 degrés</p>
            </div>
            <p className="font-extrabold text-yellow-700 dark:text-yellow-400">Fin de la boucle</p>
          </div>
        </div>

        <InfoBlock type="warning" title="🚨 Le Piège Ultime du Triangle Équilatéral !">
          Pour tracer un triangle équilatéral (3 côtés égaux), on répète l'instruction 3 fois. Mais de quel angle faut-il tourner le lutin ?<br/>
          <strong>Ce n'est pas 60° ! Mais bien 120° !</strong><br/>
          Comme le lutin avance, s'il tourne seulement de 60°, il va trop se refermer et ratera sa forme. Il pivote de l'angle extérieur : {"$180 - 60 = 120^\\circ$"}. Ne tombe jamais dans ce panneau lors d'une évaluation !
        </InfoBlock>
      </Section>

      <Section title="✍️ Exercices Résolus : Décrypter le Code" icon="Bot" color="rose">
        <p className="mb-6">Étudie la résolution pas-à-pas de deux problèmes géométriques fondamentaux.</p>

        <InteractiveExercise 
          title="Exercice 1 : Trouver la figure finale"
          question={<>On donne le script suivant : s'orienter à 90 (vers la droite); répéter 4 fois [ avancer de 40 pas; tourner à gauche de 90 degrés; avancer de 40 pas; tourner à droite de 90 degrés ]. Quelle forme géométrique dessine le lutin ?</>}
          steps={[
            <><strong>1. Je décompose la première étape :</strong> Le lutin regarde à droite. Il avance de 40 puis tourne à gauche de 90 (regarde vers le haut). Il avance à nouveau de 40 pas puis se tourne vers la droite. Cela dessine une <strong>première marche d'escalier</strong> !</>,
            <><strong>2. J'identifie les répétitions :</strong> Le mot clé est 'Répéter 4 fois'. Ce motif se reproduit donc 4 fois d'affilée de façon linéaire vers la droite et le haut de mon écran.</>,
            <><strong>3. J'assemble l'image mentale :</strong> Le lutin construit quatre marches identiques les unes au-dessus des autres.</>,
            <><strong>Réponse finale :</strong> Le lutin dessine un magnifique <strong>Escalier de 4 marches régulières</strong> !</>
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : Calculer la longueur totale du tracé"
          question={<>On possède un stylo d'écriture actif de couleur rouge. Le lutin effectue le script suivant : répéter 6 fois [ avancer de 30 pas; tourner de 60 degrés ]. Quelle est la longueur globale de la ligne tracée par le crayon ?</>}
          steps={[
            <><strong>1. Je repère les briques qui tracent de l'encre :</strong> Seule la commande "avancer" crée un trait sur notre scène. Les rotations (les ordres du bloc 'tourner') font pivot sur place sans faire couler d'encre.</>,
            <><strong>2. Je multiplie la distance par le nombre d'étapes :</strong> La commande d'avancement est d'une distance de 30 pas. On se rappelle que la boucle répète les opérations précisément 6 fois.</>,
            <><strong>3. Je calcule la distance totale parcourue en pas :</strong><br/>
               On fait : <MathComponent math="6 \times 30 = 180" />.</>,
            <><strong>Réponse finale :</strong> La longueur totale du tracé d'encre dessiné est de <strong>180 pas</strong> (ce qui donnera la forme fermée d'un Hexagone régulier d'arête 30 !).</>
          ]}
        />
      </Section>

      <Section title="🧠 Flashcards d'Algorithmique" icon="Layers" color="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Flashcard 
            front={<>Quelle brique de contrôle est obligatoire pour lancer n'importe quel code au clic du bouton d'action ?</>}
            back={<><strong>'quand le drapeau vert est cliqué' !</strong><br/>C'est la brique chapeau indispensable placée tout en haut qui agit comme l'allumage ou le démarreur du programme.</>}
          />
          <Flashcard 
            front={<>Si le lutin effectue 'avancer de -50 pas', dans quel sens marche-t-il ?</>}
            back={<><strong>Il recule de 50 pas !</strong><br/>En informatique, confier une valeur négative ou un signe moins à la brique 'avancer' équivaut simplement à faire reculer le personnage tout droit sans changer son regard de côté.</>}
          />
          <Flashcard 
            front={<>Le bloc jaune 'Répéter indéfiniment' s'arrête-t-il au bout de 100 fois ?</>}
            back={<><strong>Jamais d'elle-même !</strong><br/>C'est une boucle infinie. Le programme s'exécute éternellement ou jusqu'à ce que tu cliques sur le bouton d'arrêt d'urgence rouge de l'écran.</>}
          />
        </div>
      </Section>

      <Section title="FAQ (Questions Fréquentes)" icon="HelpCircle" color="slate">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi Scratch parle-t-il en 'pas' et pas en 'centimètres' ?",
              answer: "L'écran d'un ordinateur est un quadrillage de points lumineux appelés 'pixels'. Un 'pas' dans Scratch équivaut strictement à se décaler d'une case de pixel sur l'affichage."
            },
            {
              question: "Que se passe-t-il si j'oublie de mettre 'stylo en position d'écriture' ?",
              answer: "Ton lutin va danser, tourner et se déplacer exactement comme ordonné... mais aucun trait d'encre ne s'affichera à l'écran. C'est l'équivalent de faire le mouvement de la main en l'air sans toucher le papier."
            },
            {
              question: "Pourquoi les briques de Scratch ont-elles des encoches ?",
              answer: "C'est un système anti-erreur ingénieux ! Les briques ne s'emboîtent que si la commande est logique, t'évitant d'écrire des ordres absurdes d'un point de vue de logique informatique."
            }
          ]}
        />
      </Section>

      <Section title="🎯 Épreuve Finale" icon="Layers" color="rose">
        <Quiz 
          questions={[
            {
              question: "Dans Scratch, si on désire réinitialiser l'écran entier et effacer tous les dessins du passé, on utilise quelle brique ?",
              options: [
                "Relever le stylo",
                "Effacer tout (de la catégorie Stylo)",
                "Cacher le lutin"
              ],
              correctAnswer: 1,
              explanation: "Exact ! Le bouton 'effacer tout' fait un grand ménage sur notre scène et efface tout le travail fait par notre stylo."
            },
            {
              question: "Pour dessiner un beau triangle équilatéral classique de 3 côtés égaux dans notre boucle, le lutin doit pivoter de :",
              options: [
                "60 degrés (l'angle intérieur)",
                "90 degrés d'angle droit",
                "120 degrés (l'angle extérieur d'ajustement)"
              ],
              correctAnswer: 2,
              explanation: "Magnifique ! C'est le piège numéro 1 : le lutin pivote par l'angle de braquage extérieur, c'est-à-dire 180 - 60 = 120°."
            },
            {
              question: "Qu'est-ce qu'un Algorithme d'un point de vue général ?",
              options: [
                "Le nom du chat de Scratch",
                "Une suite d'instructions claires et soignées permettant de résoudre un problème",
                "Un outil géométrique pour mesurer les côtés"
              ],
              correctAnswer: 1,
              explanation: "Absolument ! Un algorithme est une recette de cuisine : une liste soignée d'étapes ordonnées destinées à accomplir une tâche."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je connais l'espace de Scratch (Palette, Zone de Script, Scène).",
            "Je sais que pivoter sur place n'ajoute pas de ligne de dessin.",
            "Je comprends que la boucle répéter permet de réaliser de magnifiques figures symétriques sans copier-coller."
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

export default Course_College_6eme_11_Algorithmique_Scratch;
