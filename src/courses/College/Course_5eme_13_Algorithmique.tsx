import React, { useState, useEffect } from 'react';
import { 
  CourseHeader, Section, InfoBlock, Flashcard, Quiz, InteractiveChecklist, 
  AccordionFAQ, FillInTheBlanks, StepList, TipBanner, InteractiveExercise
} from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';

interface DrawStep {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const Course_5eme_13_Algorithmique: React.FC<{
  onValidateCourse: () => void;
  isCompleted: boolean;
}> = ({ onValidateCourse, isCompleted }) => {
  // Simulator Robot positioning & drawing state
  const [posX, setPosX] = useState<number>(100);
  const [posY, setPosY] = useState<number>(100);
  const [angle, setAngle] = useState<number>(0); // 0 = pointing right, 90 = pointing down, etc.
  const [lines, setLines] = useState<DrawStep[]>([]);
  const [logs, setLogs] = useState<string[]>(["Système prêt. Clique sur des blocs !"]);

  // Action helpers
  const clearCanvas = () => {
    setPosX(100);
    setPosY(100);
    setAngle(0);
    setLines([]);
    setLogs(["Écran réinitialisé. Lutin ramené au centre (100, 100)."]);
  };

  const moveForward = (steps: number) => {
    // Calcul de la nouvelle position d'après l'angle trigonométrique (en degrés)
    const rad = (angle * Math.PI) / 180;
    const nextX = Math.max(10, Math.min(190, posX + steps * Math.cos(rad)));
    const nextY = Math.max(10, Math.min(190, posY + steps * Math.sin(rad)));

    setLines(prev => [...prev, { x1: posX, y1: posY, x2: nextX, y2: nextY }]);
    setPosX(nextX);
    setPosY(nextY);
    setLogs(prev => [`Avancer de ${steps} pas`, ...prev]);
  };

  const turnRight = (deg: number) => {
    setAngle(prev => (prev + deg) % 360);
    setLogs(prev => [`Tourner de ${deg}° à droite ↺`, ...prev]);
  };

  // Run full square macro loop
  const drawSquareMacro = () => {
    clearCanvas();
    // Simulate drawing a square sequence sequentially
    setTimeout(() => {
      // Step 1: line 1
      const rad0 = 0;
      const x1 = 100, y1 = 100;
      const x2 = 140, y2 = 100;
      // Step 2: line 2
      const x3 = 140, y3 = 140;
      // Step 3: line 3
      const x4 = 100, y4 = 140;
      // Step 4: line 4
      const x5 = 100, y5 = 100;

      setLines([
        { x1, y1, x2, y2 },
        { x1: x2, y1: y2, x2: x3, y2: y3 },
        { x1: x3, y1: y3, x2: x4, y2: y4 },
        { x1: x4, y1: y4, x2: x5, y2: y5 }
      ]);
      setPosX(100);
      setPosY(100);
      setAngle(0);
      setLogs(prev => ["Boucle : [Avancer, Tourner 90°] répété 4 fois ! → Carré dessiné ✅", ...prev]);
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <CourseHeader 
        acronym="MATH-5-ALG"
        title="Algorithmique (Scratch)"
        subtitle="Donner des instructions précises, concevoir des boucles et comprendre la logique séquentielle."
        duration="45 min"
        level="5ème Collège"
        prerequisites={["Se repérer dans un plan", "Mesures d'angles simples"]}
        objectives={[
          "Comprendre le fonctionnement séquentiel d'un algorithme",
          "Identifier le rôle des variables et des structures décisionnelles",
          "Exploiter les boucles pour simplifier l'écriture de répétitions",
          "Tracer ou modéliser des figures géométriques à l'aide d'instructions Scratch"
        ]}
      />

      <Section title="⚠️ L'Esprit de l'Ordinateur" icon="🤖" color="rose">
        <p className="lead text-lg">
          Un ordinateur ne prend aucune initiative : il exécute bêtement vos commandes de haut en bas sans jamais dévier.
        </p>
        <p className="mt-4">
          Un <strong>algorithme</strong> est une suite d'instructions claires et ordonnées permettant de résoudre un problème ou d'accomplir un dessin. Sur Scratch, chaque instruction prend la forme d'un bloc coloré de type LEGO.
        </p>
        
        <InfoBlock type="definition" title="La Séquence d'Instructions">
          Un programme s'exécute de manière rigoureuse dans l'ordre de lecture (du haut vers le bas). L'instruction 1 doit se finir complètement avant de passer à l'instruction 2.
        </InfoBlock>
      </Section>

      <Section title="🎮 Le Bac à Sable Scratch Interactif" icon="🕹️" color="indigo">
        <p className="mb-4">Clique sur les blocs de programmation ci-dessous pour déplacer le lutin (le triangle bleu) et observer le tracé géométrique résultant !</p>

        {/* Scratch blocks interactive simulator */}
        <div className="bg-card border border-border rounded-3xl p-6 my-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            
            {/* Left : Programming blocks deck */}
            <div className="w-full lg:w-5/12 flex flex-col gap-3">
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-250 tracking-wider uppercase mb-2">Palette de Blocs :</h4>
              
              <button 
                type="button"
                onClick={() => moveForward(40)}
                className="flex items-center gap-2 px-4 py-3 bg-blue-100 dark:bg-blue-950/40 hover:bg-blue-200 border border-blue-300 text-blue-900 dark:text-blue-250 font-bold rounded-2xl transition-all hover:-translate-y-0.5 active:scale-95 text-xs text-left"
              >
                <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-[10px]">Bleu</span>
                Avancer de 40 pas ➡️
              </button>

              <button 
                type="button"
                onClick={() => turnRight(90)}
                className="flex items-center gap-2 px-4 py-3 bg-blue-100 dark:bg-blue-950/40 hover:bg-blue-200 border border-blue-300 text-blue-900 dark:text-blue-250 font-bold rounded-2xl transition-all hover:-translate-y-0.5 active:scale-95 text-xs text-left"
              >
                <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-[10px]">Bleu</span>
                Tourner de 90° à droite ↻
              </button>

              <button 
                type="button"
                onClick={() => turnRight(45)}
                className="flex items-center gap-2 px-4 py-3 bg-blue-100 dark:bg-blue-950/40 hover:bg-blue-200 border border-blue-300 text-blue-900 dark:text-blue-250 font-bold rounded-2xl transition-all hover:-translate-y-0.5 active:scale-95 text-xs text-left"
              >
                <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-[10px]">Bleu</span>
                Tourner de 45° à droite ↻
              </button>

              <div className="border border-yellow-250 bg-yellow-50/50 dark:bg-yellow-950/20 p-1.5 rounded-2xl">
                <button 
                  type="button"
                  onClick={drawSquareMacro}
                  className="w-full flex items-center gap-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-black rounded-xl transition-all text-xs"
                >
                  <span className="bg-amber-600 px-1.5 py-0.5 rounded text-[9px]">Boucle</span>
                  Répéter 4 fois [Avancer, Tourner 90°]
                </button>
              </div>

              <button 
                type="button"
                onClick={clearCanvas}
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 font-extrabold rounded-2xl text-xs"
              >
                💥 Effacer le dessin et Recentrer
              </button>
            </div>

            {/* Right: Tracing Screen Viewport */}
            <div className="w-full lg:w-7/12 flex flex-col gap-4">
              <div className="flex-1 flex items-center justify-center relative bg-slate-50 dark:bg-slate-900 border rounded-2xl p-4 min-h-[220px]">
                <svg className="w-48 h-48 border border-white dark:border-slate-800 bg-white dark:bg-slate-950 shadow-inner rounded-xl" viewBox="0 0 200 200">
                  {/* Lines drawing */}
                  {lines.map((line, idx) => (
                    <line key={idx} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                  ))}

                  {/* Robot Lutin pointer - SVG triangle facing 'angle' degrees */}
                  <g transform={`translate(${posX}, ${posY}) rotate(${angle})`}>
                    <polygon points="-8,-6 10,0 -8,6" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="2" fill="#fff" />
                  </g>
                </svg>

                {/* Status indicators */}
                <span className="absolute bottom-2 right-2 text-[10px] font-mono bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600">
                  X: {posX.toFixed(0)}, Y: {posY.toFixed(0)}, Ang: {angle}°
                </span>
              </div>

              {/* Console Logs */}
              <div className="bg-slate-950 text-emerald-400 p-3 rounded-2xl border border-slate-800 font-mono text-xs h-24 overflow-y-auto w-full shadow-inner select-none">
                <div className="text-[10px] text-slate-500 border-b border-slate-800 pb-1 mb-2">Historique d'exécution (Console) :</div>
                {logs.map((log, lIdx) => (
                  <div key={lIdx} className="leading-relaxed">&gt; {log}</div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Section>

      <Section title="🛠️ Les 4 Piliers Algorithmiques" icon="🗂️" color="indigo">
        <p className="mb-4">Un codeur Scratch performant assemble son architecture logique autour de ces 4 familles fondamentales :</p>

        <StepList>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">1. Les Événements (Blocs Jaunes ou Chapeaux)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Le pilote indispensable. "<b>Quand le drapeau vert est cliqué</b>" est l'interrupteur qui met le contact moteur de vos blocs de code.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">2. Le Mouvement et l'Apparence (Bleu/Violet)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Les actions visuelles palpables à l'écran : "Avancer de 10 pas", "Tourner à droite", ou "Dire 'Bonjour !' pendant 2 secondes".
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">3. Les Variables (Blocs Oranges)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Un tiroir de rangement temporaire possédant une étiquette nominative (ex: "Score" ou "Vies") dans lequel on dépose des valeurs à incrémenter.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">4. Les Contrôles (Boucles C et Choix)</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              L'unité pensante de l'appareil. Gère le "Répéter..." pour s'épargner du recopiage, et le "Si (quelque chose est vrai) Alors..." pour bifurquer intelligemment.
            </p>
          </div>
        </StepList>
      </Section>

      <Section title="🔁 Le Pouvoir des Boucles" icon="🔄" color="purple">
        <p className="mb-4">
          Un bon algorithme évite d'exécuter des blocs rigoureusement identiques en colonne. Il utilise le facteur factorisation avec une boucle pour condenser son code !
        </p>

        <div className="bg-purple-50/50 dark:bg-purple-900/20 border-2 border-purple-100 dark:border-purple-800/60 p-6 rounded-2xl shadow-sm leading-relaxed mb-6">
          <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">Tracé d'un Polygone Régulier : La Formule Magique</h3>
          <p className="text-sm font-medium">
            Pour tracer une figure géométrique fermée à $N$ côtés égaux, la règle d'angle de Scratch est absolue ! <br/>
            On doit répéter la boucle $N$ fois, et tourner à chaque étape d'un angle égal à : <br/>
            <strong className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-base">Angle de rotation = $360^\circ \div N$</strong>
          </p>
        </div>

        <TipBanner type="success" title="Exemples de géométrie">
          - Pour un <strong>Carré</strong> (4 côtés) : Angle de rotation = $360^\circ \div 4 = 90^\circ$.<br/>
          - Pour un <strong>Triangle Équilatéral</strong> (3 côtés) : Angle de rotation = $360^\circ \div 3 = 120^\circ$.
        </TipBanner>
      </Section>

      <Section title="🧠 Entraînement Visuel (Flashcards)" icon="⚡" color="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<>Quelle différence y a-t-il entre le bloc 'Mettre Score à 0' et 'Ajouter 1 à Score' ?</>}
            back={<><strong>'Mettre'</strong> remplace sauvagement l'ancienne valeur par 0. <strong>'Ajouter 1'</strong> ajoute 1 à la valeur déjà présente.</>}
          />
          <Flashcard 
            front={<>Quel angle de rotation doit-on programmer pour dessiner un hexagone régulier (6 côtés) ?</>}
            back={<>On tourne de <strong>$60^\circ$</strong> ($360^\circ \div 6 = 60^\circ$) répété 6 fois !</>}
          />
        </div>
      </Section>

      <Section title="📝 Exercices Résolus" icon="✍️" color="slate">
        <InteractiveExercise 
          title="Exercice 1 : Le cheminement secret"
          question="Mon lutin part de coordonnées (50, 50). Il exécute les instructions : 'Aller à x: 0 y: 0', 'Avancer de 10 pas'. Où se trouve-t-il à la fin s'il regarde vers la droite ?"
          steps={[
            "J'analyse la première instruction : 'Aller à (0,0)' remplace brutalement la position de départ. Il est désormais centré au point neutre (0, 0).",
            "La seconde instruction lui ordonne d'avancer de 10 pas en conservant son orientation (regard vers la droite = axe des abscisses x positif).",
            "Il se situe donc au point final de coordonnées <strong>x = 10, y = 0</strong>."
          ]}
        />

        <InteractiveExercise 
          title="Exercice 2 : La variable sous surveillance"
          question="Une variable de jeu nommée 'Vies' vaut 3. On déclenche l'instruction : 'Si (Score > 10) alors (Ajouter 1 à Vies) sinon (Mettre Vies à 1)'. Si la variable 'Score' vaut 8, quelle est la valeur finale des 'Vies' ?"
          steps={[
            "J'évalue la condition du bloc décisionnel : 'Score > 10'. Or Score vaut 8, donc '8 > 10' est une affirmation FAUSSE.",
            "Le programme s'engage donc obligatoirement dans la branche alternative du 'sinon'.",
            "La commande associée est : 'Mettre Vies à 1'. La valeur des vies est écrasée. 'Vies' vaut donc à la fin exactement <strong>1</strong>."
          ]}
        />
      </Section>

      <Section title="💬 Questions Fréquentes (FAQ)" icon="❓" color="blue">
        <AccordionFAQ 
          items={[
            {
              question: "Pourquoi l'angle de dessin du triangle fait 120° et non 60° ?",
              answer: "L'instruction de rotation Scratch correspond à l'angle extérieur (le pivot du robot). Pour tracer un angle intérieur de 60° de triangle équilatéral, le robot doit pivoter du reste par rapport à la ligne droite, soit 180° - 60° = 120° !"
            },
            {
              question: "La boucle 'Répéter indéfiniment' va-t-elle faire planter la page ?",
              answer: "Non ! C'est ce qui régit le rafraîchissement d'un jeu vidéo ou d'une animation. Le logiciel Scratch s'assure de l'exécuter de façon fluide sans saturer inutilement la mémoire."
            },
            {
              question: "Qu'est-ce qu'un lutin ?",
              answer: "Le 'lutin' (ou sprite en anglais) désigne tout objet graphique ou personnage mobile présent à l'écran auquel on associe nos scripts d'algorithmes."
            }
          ]}
        />
      </Section>

      <Section title="🎮 Testeur de Code" icon="🕹️" color="slate">
        <p className="mb-4">Tu inspectes un algorithme inconnu. Analyse ses effets :</p>
        <FillInTheBlanks 
          id="alg-eval"
          content={[
            "Le code commence par un chapeau jaune 'Quand [drapeau] est cliqué'. Ensuite, on a une boucle 'Répéter 3 fois'. À l'intérieur, il y a : 'Avancer de 100 pas' et 'Tourner ↻ de 120°'. Ouh là ! S'il avance 3 fois en tournant de 120° à chaque fois, il va refermer sa trajectoire et dessiner un ",
            { options: ["carré", "triangle équilatéral", "cercle"], correctAnswer: 1 },
            ". En effet, 3 fois 120° ça fait bien ",
            { options: ["360°", "180°", "90°"], correctAnswer: 0 },
            ", soit un tour complet sur lui-même pour revenir à sa position de départ !"
          ]}
        />
      </Section>

      <Section title="🎯 Remplir les Objectifs" icon="🏆" color="rose">
        <Quiz 
          questions={[
            {
              question: "Que se passe-t-il si un programme contient deux événements 'Quand le drapeau vert est cliqué' différents ?",
              options: [
                "Un conflit d'exécution va faire bugger l'ordinateur.",
                "Les deux scripts vont démarrer absolument en même temps (exécution en parallèle).",
                "Seul le premier script s'exécutera."
              ],
              correctAnswer: 1,
              explanation: "Scratch supporte parfaitement le parallélisme. Si deux drapeaux existent, les deux suites d'instructions s'exécutent simultanément !"
            },
            {
              question: "Quelle condition logique d'un bloc de contrôle permet de s'assurer du contact d'une couleur ?",
              options: [
                "Couleur [verte] touchée ?",
                "Aller à [couleur]",
                "Mettre couleur à 10"
              ],
              correctAnswer: 0,
              explanation: "C'est un bloc capteur hexagonal (bleu turquoise) permettant de renvoyer une affirmation logique 'Vrai' ou 'Faux' s'il y a superposition colorée à l'écran."
            },
            {
              question: "Combien de fois un bloc 'Répéter' imbriqué 3 fois dans lui-même se réalise-t-il ?",
              options: [
                "3 fois de suite.",
                "9 fois du fait de l'effet multiplication.",
                "6 fois."
              ],
              correctAnswer: 1,
              explanation: "C'est le jeu des boucles imbriquées : 3 répétitions d'un bloc qui comprend lui-même 3 répétitions provoquent un total mécanique de 3 × 3 = 9 passages."
            }
          ]}
        />
        
        <InteractiveChecklist 
          items={[
            "Je sais que les blocs s'exécutent de haut en bas.",
            "Je sais utiliser l'événement Drapeau Vert pour démarrer.",
            "Je sais remplacer 4 déplacements identiques par UNE boucle 'Répéter 4 fois'.",
            "Je sais identifier la différence entre un 'Répéter...' et un 'Si... Alors...'"
          ]}
        />
      </Section>
      
      {!isCompleted && (
        <div className="flex justify-center mt-8">
          <button 
            type="button"
            onClick={onValidateCourse}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-500/30 transform hover:-translate-y-1 transition-all text-lg font-bold"
          >
            Valider le Chapitre (+15 XP)
          </button>
        </div>
      )}
    </div>
  );
};

export default Course_5eme_13_Algorithmique;
