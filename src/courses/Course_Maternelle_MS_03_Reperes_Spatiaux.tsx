import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Box, ArrowRight, ArrowLeft } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import confetti from 'canvas-confetti';

const SpatialGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // levels => Find the position
  const rounds = [
    { target: "DEVANT", question: "Où le chat est-il DEVANT la boîte ?",
      options: [
        { id: 1, pos: 'devant', zIndex: 10, y: 10, x: 0 },
        { id: 2, pos: 'derriere', zIndex: -1, y: -20, x: 20 },
      ], correct: 1 
    },
    { target: "DERRIÈRE", question: "Où le chat est-il DERRIÈRE la boîte ?",
      options: [
        { id: 1, pos: 'devant', zIndex: 10, y: 10, x: 0 },
        { id: 2, pos: 'derriere', zIndex: -1, y: -20, x: -20 },
      ], correct: 2 
    },
    { target: "À CÔTÉ", question: "Où le chat est-il À CÔTÉ de la boîte ?",
      options: [
        { id: 1, pos: 'a_cote', zIndex: 5, y: 0, x: 40 },
        { id: 2, pos: 'derriere', zIndex: -1, y: -20, x: 10 }
      ], correct: 1 
    }
  ];

  const handlePick = (id: number) => {
    if (gameWon) return;
    if (rounds[level].correct === id) {
      if (level === rounds.length - 1) {
        setGameWon(true);
        onWin();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        setLevel(l => l + 1);
      }
    }
  };

  const reset = () => {
    setLevel(0);
    setGameWon(false);
  };

  const currentRound = rounds[level] || rounds[0];

  return (
    <div className="bg-card border-4 border-emerald-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-emerald-900">Le Cache-Cache du Chat</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <p className="font-bold text-emerald-800 text-lg">
          {currentRound.question}
        </p>
      </div>

      <div className="h-64 flex items-center justify-center gap-6 bg-slate-50 p-4 border-2 border-slate-200 rounded-2xl relative">
        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div 
              key={level}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex items-center justify-center gap-6 w-full"
            >
              {currentRound.options.map(opt => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePick(opt.id)}
                  className="relative w-32 h-32 bg-white rounded-xl shadow-md border-b-4 border-slate-200 flex items-center justify-center"
                >
                  {/* The Box */}
                  <Box size={72} className="text-amber-600 fill-amber-100 absolute z-5" strokeWidth={1} style={{ zIndex: 0 }} />
                  {/* The Cat */}
                  <div 
                    className="absolute text-3xl transition-transform"
                    style={{ 
                      zIndex: opt.zIndex, 
                      transform: `translate(${opt.x}px, ${opt.y}px)`,
                      filter: opt.pos === 'derriere' ? 'brightness(0.7)' : 'none'
                    }}
                  >
                    🐈
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-full text-emerald-600"
            >
              <div className="text-6xl mb-2">🐈</div>
              <p className="font-bold text-2xl">Miaou ! Tu m'as trouvé !</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 font-bold text-slate-400">
        Niveau {Math.min(level + 1, rounds.length)} / {rounds.length}
      </div>
    </div>
  );
};

const Course_Maternelle_MS_03_Reperes_Spatiaux: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/MS/03_Maternelle_MS_03_Reperes_Spatiaux.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais montrer ce qui est DEVANT.",
    "Je sais montrer ce qui est DERRIÈRE.",
    "Je sais montrer ce qui est À CÔTÉ."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="MS" 
        title="Moyenne Section - Repères Spatiaux" 
        subtitle="Devant, Derrière, À côté : Où est passé le chat ?"
        level="Moyenne Section"
        objectives={[
          "Se repérer dans l'espace par rapport à un objet.",
          "Utiliser le vocabulaire : Devant, Derrière, À côté.",
          "Comprendre la profondeur basique (premier plan, arrière-plan)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        En Moyenne Section, l'enfant passe à un niveau supérieur. Après 'sur' et 'sous' (axe vertical), il explore la profondeur ('devant', 'derrière') et la latéralité basique ('à côté'). Ces concepts demandent de se projeter par rapport à un autre objet que soi-même.
      </InfoBlock>

      <Section title="La Théorie : Les nouvelles cachettes" color="indigo" icon="✨">
        <p>Le chat fait des bêtises et se cache partout avec sa boîte en carton !</p>
        <BentoGrid>
          <BentoCard title="DEVANT" color="amber" icon={<ArrowRight className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 relative h-24 items-end">
               <Box size={60} className="text-amber-200 fill-amber-100 absolute bottom-0 z-0"/>
               <div className="text-5xl z-10 relative left-4">🐈</div>
            </div>
            <p className="text-center font-bold">Le chat est en premier, il cache un peu la boîte !</p>
          </BentoCard>
          
          <BentoCard title="DERRIÈRE" color="emerald" icon={<ArrowLeft className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 relative h-24 items-end">
               <div className="text-5xl z-0 absolute bottom-4 left-[30%] opacity-70 scale-90">🐈</div>
               <Box size={70} className="text-amber-500 fill-amber-400 absolute bottom-0 z-10"/>
            </div>
            <p className="text-center font-bold">La boîte cache le chat ! On ne voit presque plus que sa tête.</p>
          </BentoCard>

          <BentoCard title="À CÔTÉ" color="rose" icon={<ArrowRight className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 relative h-24 items-end gap-2">
               <Box size={60} className="text-blue-500 fill-blue-100"/>
               <div className="text-5xl">🐈</div>
            </div>
            <p className="text-center font-bold">Ni devant, ni derrière. Ils sont sur la même ligne !</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Astuce du quotidien">
        Dans la rue ou au parc : « Regarde, le chien est DEVANT le banc, mais le vélo est DERRIÈRE l'arbre ! ». Mettez des mots sur ce qu'il voit.
      </InfoBlock>

      <Section title="Schéma interactif : Cache-Cache" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Aide-nous à trouver le chat ! Lis bien (ou écoute) ce qui est demandé.</p>
        <SpatialGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        La notion de « Devant » et « Derrière » dépend d'où l'on regarde ! Si tu te places de l'autre côté de la boîte, ce qui était derrière devient devant. C'est magique !
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Faut-il différencier 'à droite' et 'à gauche' à la place de 'à côté' ?",
            answer: "Non, c'est trop tôt ! La droite et la gauche (latéralisation fine) seront travaillées en fin de Grande Section ou au CP. Pour l'instant, 'à côté' suffit amplement."
          },
          {
            question: "Mon enfant s'emmêle entre 'sous' et 'derrière', pourquoi ?",
            answer: "C'est une confusion fréquente liée à la 2D des dessins (où 'derrière' est souvent dessiné un peu plus haut). Privilégiez les jeux en 3D avec de vrais objets."
          }
        ]} />
      </Section>

      <Section title="Flashcards : Où suis-je ?" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour voir la réponse !</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-center">🌳<span className="text-[2rem] ml-[-1rem] relative z-10">🐻</span></div> Le petit ours cache la base de l'arbre. Donc l'ours est... ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-amber-500">DEVANT !</div> C'est lui qu'on voit en premier.</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-center"><span className="text-[2rem] relative top-2 left-6 opacity-80 z-0">🏃</span>🧱</div> Le garçon est caché par le mur. Il est... ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">DERRIÈRE !</div> Le mur est devant lui.</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">On vérifie si tu as tout compris !</p>
        <Quiz questions={[
          {
            question: "Si tu te caches derrière une porte fermée, est-ce qu'on te voit de l'autre côté ?",
            options: ["Oui", "Non, car je suis caché derrière !"],
            correctAnswer: 1,
            explanation: "Exact ! Si tu es DERRIÈRE, la porte te cache !"
          },
          {
            question: "Quand tu conduis ta trottinette et que ton copain roule juste à ta hauteur de l'autre côté du chemin, il est :",
            options: ["Devant toi", "Derrière toi", "À CÔTÉ de toi"],
            correctAnswer: 2,
            explanation: "C'est ça, s'il est à ta hauteur, il est À CÔTÉ !"
          },
          {
            question: "À la caisse du supermarché, la personne qui paie avant toi est :",
            options: [
              "DEVANT toi",
              "Derrière toi",
              "À côté"
            ],
            correctAnswer: 0,
            explanation: "Oui, la personne qui passe avant est DEVANT toi dans la file !"
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_MS_03_Reperes_Spatiaux;
