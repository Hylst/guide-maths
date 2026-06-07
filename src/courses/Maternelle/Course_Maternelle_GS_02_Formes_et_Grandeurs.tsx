import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Triangle, Square, Circle, RectangleHorizontal, Star, Hexagon } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import confetti from 'canvas-confetti';

const ShapePropertiesGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const rounds = [
    { target: "CARRÉ", question: "Qui a 4 côtés de la même taille ?", options: [{ id: 1, type: "triangle" }, { id: 2, type: "square" }, { id: 3, type: "circle" }], correct: 2 },
    { target: "TRIANGLE", question: "Qui a 3 pointes (sommets) ?", options: [{ id: 1, type: "rectangle" }, { id: 2, type: "square" }, { id: 3, type: "triangle" }], correct: 3 },
    { target: "CERCLE", question: "Qui n'a AUCUN coin ni côté droit ?", options: [{ id: 1, type: "circle" }, { id: 2, type: "triangle" }, { id: 3, type: "rectangle" }], correct: 1 }
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
    } else {
       // On error, maybe a small shake effect, but we keep it simple here.
    }
  };

  const reset = () => {
    setLevel(0);
    setGameWon(false);
  };

  const currentRound = rounds[level] || rounds[0];

  const renderOption = (opt: any) => {
    switch (opt.type) {
      case 'square': return <Square size={64} className="text-emerald-500 fill-emerald-500" strokeWidth={1} />;
      case 'triangle': return <Triangle size={64} className="text-amber-500 fill-amber-500" strokeWidth={1} />;
      case 'circle': return <Circle size={64} className="text-rose-500 fill-rose-500" strokeWidth={1} />;
      case 'rectangle': return <RectangleHorizontal size={64} className="text-indigo-500 fill-indigo-500 w-24 h-16" strokeWidth={1} />;
      default: return null;
    }
  }

  return (
    <div className="bg-card border-4 border-emerald-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-emerald-900">Le Maître des Formes</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <p className="font-bold text-emerald-800 text-lg">
          {currentRound.question}
        </p>
      </div>

      <div className="h-64 flex flex-col items-center justify-center gap-6 bg-slate-50 p-4 border-2 border-slate-200 rounded-2xl">
        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div 
              key={level}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap"
            >
              {currentRound.options.map(opt => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePick(opt.id)}
                  className="bg-white rounded-xl shadow-md border-b-4 border-slate-200 flex items-center justify-center p-4 hover:border-emerald-300 transition-colors w-28 h-28"
                >
                  {renderOption(opt)}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-full text-emerald-600"
            >
              <Star size={64} className="mb-2 fill-emerald-500" />
              <p className="font-bold text-2xl">Parfait !</p>
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

const Course_Maternelle_GS_02_Formes_et_Grandeurs: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/GS/02_Maternelle_GS_02_Formes_et_Grandeurs.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais voir que le carré a 4 côtés pareils.",
    "Je sais voir que le triangle a 3 pointes (sommets).",
    "Je ne confonds plus le carré et le rectangle."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="GS" 
        title="Grande Section - Formes et Grandeurs" 
        subtitle="Côtés, sommets et propriétés : Les secrets des formes planes !"
        level="Grande Section"
        objectives={[
          "Connaitre les propriétés du carré, rectangle et triangle.",
          "Utiliser le vocabulaire : côté, sommet, pointe.",
          "Reconnaître des formes dans des compositions complexes."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        En Grande Section, on ne se contente plus de nommer les formes globalement. L'enfant doit analyser leurs caractéristiques (nombre de côtés, de sommets) pour les différencier. C'est l'aube de la géométrie ! 
      </InfoBlock>

      <Section title="La Théorie : Décrire les formes" color="indigo" icon="✨">
        <p>Maintenant, on regarde les formes de très près pour voir comment elles sont fabriquées !</p>
        <BentoGrid>
          <BentoCard title="Côtés et Sommets" color="emerald" icon={<Triangle className="w-5 h-5"/>} colSpan={2}>
            <div className="flex justify-center flex-col items-center gap-4 my-4 h-32">
               <div className="relative w-24 h-24 border-4 border-emerald-500 bg-emerald-100 flex items-center justify-center font-bold text-emerald-800">CARRÉ</div>
               <p className="text-sm text-center">Les lignes droites sont les <strong>CÔTÉS</strong>.<br/>Les bouts pointus sont les <strong>SOMMETS</strong>.</p>
            </div>
          </BentoCard>
          
          <BentoCard title="Le Triangle" color="amber" icon={<Triangle className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4">
               <Triangle size={64} className="text-amber-500 fill-amber-500"/>
            </div>
            <p className="text-center font-bold text-sm">3 côtés<br/>3 sommets</p>
          </BentoCard>

          <BentoCard title="Le Carré vs Rectangle" color="indigo" icon={<Square className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center gap-4 my-4 items-center">
               <Square size={48} className="text-indigo-500 fill-indigo-500"/>
               <RectangleHorizontal size={64} className="text-rose-500 fill-rose-500"/>
            </div>
            <p className="text-center font-bold text-sm">Le carré a des côtés tous pareils. Le rectangle a des petits et des grands côtés !</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Astuce du quotidien">
        Amusez-vous à trouver des rectangles et des carrés cachés dans la cuisine : le carrelage (carré), la porte du frigo (rectangle), l'assiette (cercle). Et laissez-le toucher les "bords" et les "coins" (bords=côtés, coins=sommets).
      </InfoBlock>

      <Section title="Exercice Interactif : Le Maître des Formes" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Lis la devinette et trouve la bonne forme !</p>
        <ShapePropertiesGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        Le cercle n'a aucun côté, rien du tout ! C'est une seule ligne complètement courbée qui ne s'arrête jamais. On dit qu'il roule !
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Doit-il utiliser les mots 'Sommet' et 'Côté' ?",
            answer: "Oui, c'est l'objectif en Grande Section. S'il dit 'pointe' ou 'coin' pour sommet, reprenez-le en douceur : 'Oui, la pointe, ça s'appelle un sommet en mathématiques.'."
          },
          {
            question: "Il ne voit pas la différence avec un carré penché (losange), comment faire ?",
            answer: "Si on tourne un carré bleu sur la table, cela reste un carré bleu ! Aidez-le en faisant pivoter physiquement des objets pour montrer que la forme ne change pas, même la tête en bas."
          }
        ]} />
      </Section>

      <Section title="Flashcards : Les Devinettes" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour voir la réponse !</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-[2rem] text-center font-bold font-mono">3 = ?</div> J'ai 3 côtés et 3 sommets pointus. Qui suis-je ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-amber-500">Un TRIANGLE !</div> Tri = trois !</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-[4rem] text-center">📺</div> La plupart des télévisions ou des écrans ont quelle forme ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-indigo-500">Un RECTANGLE !</div> Elles sont plus longues que hautes !</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Testons tes nouvelles connaissances d'expert !</p>
        <Quiz questions={[
          {
            question: "Combien de CÔTÉS possède un Carré ?",
            options: ["3 côtés", "4 côtés", "Zéro, ça roule"],
            correctAnswer: 1,
            explanation: "Excellent ! Le carré a 4 côtés, et ils sont tous exactement de la même longueur !"
          },
          {
            question: "Je suis une forme qui n'a AUCUN sommet (aucune pointe). Qui suis-je ?",
            options: ["Le Cercle (Rond)", "Le Rectangle", "Le Triangle"],
            correctAnswer: 0,
            explanation: "Bravo ! Le cercle n'a aucune pointe, c'est pour ça qu'il peut rouler comme un ballon !"
          },
          {
            question: "La grande différence entre le Carré et le Rectangle, c'est que :",
            options: [
              "Le rectangle a 3 côtés",
              "Le carré a un côté plus long",
              "Le rectangle a deux grands côtés et deux petits côtés"
            ],
            correctAnswer: 2,
            explanation: "C'est exact ! Le carré a tout ses côtés pareils, le rectangle lui, s'est fait étirer !"
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_GS_02_Formes_et_Grandeurs;
