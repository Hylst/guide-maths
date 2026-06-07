import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, PackageOpen, Box, ArrowDown, ArrowUp } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import confetti from 'canvas-confetti';

const SpatialGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // levels => "Où est la balle ?"
  const rounds = [
    { 
      target: 'SUR', 
      options: [
        { id: 1, pos: 'sur', iconOffset: { y: -24, x: 0 }, zIndex: 10 }, 
        { id: 2, pos: 'sous', iconOffset: { y: 24, x: 0 }, zIndex: 0 }, 
      ], 
      correct: 1 
    },
    { 
      target: 'DEDANS', 
      options: [
        { id: 1, pos: 'sur', iconOffset: { y: -24, x: 0 }, zIndex: 10 }, 
        { id: 2, pos: 'dedans', iconOffset: { y: 0, x: 0 }, zIndex: 0 }, // It will be 'behind' the front of the box if we use Box, but just represent it with low zIndex or visually
        { id: 3, pos: 'sous', iconOffset: { y: 30, x: 0 }, zIndex: 0 }
      ], 
      correct: 2 
    },
    { 
      target: 'SOUS', 
      options: [
        { id: 1, pos: 'sur', iconOffset: { y: -30, x: 0 }, zIndex: 10 }, 
        { id: 2, pos: 'sous', iconOffset: { y: 30, x: 0 }, zIndex: 0 }, 
      ], 
      correct: 2 
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
    <div className="bg-card border-4 border-indigo-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-indigo-900">Le jeu de Cache-Cache</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
        <p className="font-bold text-indigo-800 text-xl">
          Touche la boîte où la balle rouge est <strong className="uppercase text-indigo-900 underline font-black">{currentRound.target}</strong> !
        </p>
      </div>

      <div className="h-64 flex items-center justify-center gap-6 bg-slate-50 p-4 border-2 border-slate-200 rounded-2xl">
        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div 
              key={level}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-6"
            >
              {currentRound.options.map(opt => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePick(opt.id)}
                  className="relative w-32 h-32 bg-white rounded-xl shadow-md border-2 border-slate-200 flex flex-col items-center justify-center overflow-visible"
                >
                  <PackageOpen size={64} className="text-amber-500 z-10" strokeWidth={1} />
                  <div 
                    className="absolute w-8 h-8 rounded-full bg-rose-500 shadow-md"
                    style={{ 
                      transform: `translate(${opt.iconOffset.x}px, ${opt.iconOffset.y}px)`,
                      zIndex: opt.zIndex 
                    }}
                  />
                  {/* Petit "trou" pour l'effet Dedans */}
                  {opt.pos === 'dedans' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-[60px] h-[30px] mt-1 bg-amber-600/30 rounded-[100%] opacity-80" style={{ zIndex: 11 }} />
                    </div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-full text-indigo-600"
            >
              <PackageOpen size={64} className="mb-2" />
              <p className="font-bold text-2xl">Super ! Tu as tout trouvé !</p>
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

const Course_Maternelle_PS_03_Reperes_Spatiaux: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/PS/03_Maternelle_PS_03_Reperes_Spatiaux.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais montrer quand quelque chose est 'SUR' .",
    "Je sais montrer quand quelque chose est 'SOUS'.",
    "Je sais montrer quand quelque chose est 'DEDANS'."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="PS" 
        title="Maternelle PS 03 - Repères Spatiaux" 
        subtitle="Sur, Sous, Dedans : Où est caché le doudou ?"
        level="Petite Section"
        objectives={[
          "Se repérer dans l'espace proche.",
          "Comprendre les mots 'Sur', 'Sous', et 'Dedans'.",
          "Placer un objet au bon endroit selon une consigne."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        Se situer dans l'espace est une compétence majeure en Petite Section. Cela aide l'enfant à structurer son monde physique, ce qui préparera plus tard son cerveau à la géométrie et même à la lecture (le sens des lettres). On commence avec le corps et les objets du quotidien ! 
      </InfoBlock>

      <Section title="La Théorie : Les Cachettes" color="indigo" icon="🎯">
        <p>Aujourd'hui, nous allons jouer à cache-cache avec les objets !</p>
        <BentoGrid>
          <BentoCard title="SUR" color="amber" icon={<ArrowUp className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 items-center flex-col h-24">
              <div className="w-6 h-6 bg-rose-500 rounded-full mb-1"></div>
              <div className="w-20 h-4 bg-amber-600 rounded"></div>
            </div>
            <p className="text-center font-bold">L'objet est posé au-dessus, comme une assiette sur la table !</p>
          </BentoCard>
          
          <BentoCard title="SOUS" color="emerald" icon={<ArrowDown className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 items-center flex-col h-24">
              <div className="w-20 h-4 bg-emerald-600 rounded mb-1"></div>
              <div className="w-6 h-6 bg-rose-500 rounded-full"></div>
            </div>
            <p className="text-center font-bold">L'objet est caché en-dessous, comme le chat sous le lit !</p>
          </BentoCard>

          <BentoCard title="DEDANS" color="rose" icon={<Box className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 items-center h-24">
              <div className="relative w-16 h-16 border-4 border-rose-600 rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-rose-400 rounded-full"></div>
              </div>
            </div>
            <p className="text-center font-bold">L'objet est à l'intérieur, comme tes jouets dans le bac !</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Astuce du quotidien">
        Demandez-lui de l'aide pour ranger : « Mets tes chaussures DEDANS le placard » ou « Ton doudou est SOUS la chaise ! ». Parlez en insistant bien sur ces mots magiques.
      </InfoBlock>

      <Section title="Exercice Interactif : Le jeu de Cache-Cache !" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Retrouve la balle rouge ! Écoute bien s'il faut la trouver SUR, SOUS ou DEDANS !</p>
        <SpatialGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        C'est en maîtrisant "Sur" et "Sous" que l'enfant comprendra plus tard "En haut" et "En bas" sur une feuille de papier, ce qui est indispensable pour ne pas écrire à l'envers.
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Et DESSUS / DESSOUS ?",
            answer: "Ce sont des synonymes de 'Sur / Sous'. Vous pouvez les utiliser, mais à 3 ans, gardez un vocabulaire constant les premiers temps pour éviter la confusion phonétique."
          },
          {
            question: "Il ne comprend pas 'Dedans/Dehors', que faire ?",
            answer: "Jouez avec des cerceaux ou des boîtes géantes (cartons). Dites 'On saute DEDANS !', 'On saute DEHORS !'. L'apprentissage passe d'abord par le corps tout entier."
          },
          {
            question: "Faut-il aborder 'Devant/Derrière' ?",
            answer: "Vous pouvez, mais c'est souvent la prochaine étape. Assurez-vous d'abord que l'axe vertical (sur/sous) et l'inclusion (dedans) sont parfaits."
          }
        ]} />
      </Section>

      <Section title="Flashcards : Devine où c'est !" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour dévoiler la réponse.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-[4rem]">📦🧸</div> Le nounours est mis à l'intérieur du carton. Où est-il ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-rose-500">DEDANS !</div> Il est bien au chaud !</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-[2rem]">🪑</div><div className="text-[2rem]">🐈</div> Le chat s'est caché par terre, et la chaise le cache. Où est-il ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">SOUS la chaise !</div> C'est une bonne cachette.</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Voyons ce qu'on a retenu !</p>
        <Quiz questions={[
          {
            question: "Quand je mets mon bonnet sur ma tête, le bonnet est :",
            options: ["Sous ma tête", "Dedans ma tête", "SUR ma tête"],
            correctAnswer: 2,
            explanation: "Bravo ! Le bonnet est posé au-dessus, donc il est SUR ta tête."
          },
          {
            question: "Mes chaussettes sont dans le tiroir fermé. Elles sont :",
            options: ["Sur le tiroir", "Dedans (à l'intérieur) du tiroir", "Sous le tiroir"],
            correctAnswer: 1,
            explanation: "C'est ça ! Quand on range quelque chose dans une boîte fermée, c'est DEDANS."
          },
          {
            question: "Le chien dort par terre, et toi tu es assis dans le fauteuil au-dessus de lui. Le chien est :",
            options: [
              "SOUS le fauteuil",
              "SUR le fauteuil",
              "Dedans le fauteuil"
            ],
            correctAnswer: 0,
            explanation: "Très bien, le chien est caché en-dessous, il est SOUS le fauteuil !"
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_PS_03_Reperes_Spatiaux;