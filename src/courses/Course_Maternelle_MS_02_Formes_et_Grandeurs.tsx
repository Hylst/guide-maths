import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Box, Triangle, RectangleHorizontal, Circle, Square, Ruler, Maximize2 } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import confetti from 'canvas-confetti';

const ShapeGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // levels => "Find the correct one"
  const rounds = [
    { target: "TRIANGLE", question: "Touche le TRIANGLE !", options: [{ id: 1, type: "square" }, { id: 2, type: "triangle" }, { id: 3, type: "circle" }], correct: 2 },
    { target: "RECTANGLE", question: "Touche le RECTANGLE !", options: [{ id: 1, type: "rectangle" }, { id: 2, type: "square" }], correct: 1 },
    { target: "LONG", question: "Touche le train le plus LONG !", options: [{ id: 1, type: "train_court", size: 60 }, { id: 2, type: "train_moyen", size: 100 }, { id: 3, type: "train_long", size: 150 }], correct: 3 }
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

  const renderOption = (opt: any) => {
    switch (opt.type) {
      case 'square': return <Square size={64} className="text-emerald-500 fill-emerald-500" strokeWidth={1} />;
      case 'triangle': return <Triangle size={64} className="text-amber-500 fill-amber-500" strokeWidth={1} />;
      case 'circle': return <Circle size={64} className="text-rose-500 fill-rose-500" strokeWidth={1} />;
      case 'rectangle': return <RectangleHorizontal size={64} className="text-indigo-500 fill-indigo-500 w-24 h-16" strokeWidth={1} />;
      case 'train_court':
      case 'train_moyen':
      case 'train_long':
        return (
          <div className="flex bg-slate-300 rounded-lg p-2 items-center" style={{ width: opt.size }}>
             <Box size={20} className="text-slate-600 fill-slate-500"/>
          </div>
        );
      default: return null;
    }
  }

  return (
    <div className="bg-card border-4 border-indigo-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-indigo-900">Le Détective des Formes</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
        <p className="font-bold text-indigo-800 text-lg">
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
                  className="bg-white rounded-xl shadow-md border-b-4 border-slate-200 flex items-center justify-center p-4 hover:border-indigo-300 transition-colors"
                >
                  {renderOption(opt)}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-full text-indigo-600"
            >
              <Maximize2 size={64} className="mb-2" />
              <p className="font-bold text-2xl">Mission accomplie !</p>
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

const Course_Maternelle_MS_02_Formes_et_Grandeurs: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/MS/02_Maternelle_MS_02_Formes_et_Grandeurs.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais reconnaître un TRIANGLE (3 pointes).",
    "Je sais reconnaître un RECTANGLE (long).",
    "Je sais utiliser les mots LONG et COURT."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="MS" 
        title="Moyenne Section - Formes et Grandeurs" 
        subtitle="Nouveaux amis : le Triangle, le Rectangle et les Longueurs !"
        level="Moyenne Section"
        objectives={[
          "Nommer et reconnaître le triangle et le rectangle.",
          "Distinguer le carré du rectangle.",
          "Comparer des longueurs (long, court)."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        À 4 ans, après le rond et le carré, l'enfant affine son regard. Les formes deviennent un peu plus complexes. Il faut compter les "piquants" (les sommets) pour le triangle (3). Le rectangle introduit la notion de longueur (il a 2 grands côtés et 2 petits).
      </InfoBlock>

      <Section title="La Théorie : Les Nouvelles Formes" color="indigo" icon="✨">
        <p>Tu connaissais le Rond et le Carré ? Voici leurs copains !</p>
        <BentoGrid>
          <BentoCard title="Le Triangle" color="amber" icon={<Triangle className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4">
               <Triangle size={64} className="text-amber-500 fill-amber-500"/>
            </div>
            <p className="text-center font-bold">Il a 3 pointes, comme un chapeau de sorcière ou une part de pizza !</p>
          </BentoCard>
          
          <BentoCard title="Le Rectangle" color="indigo" icon={<RectangleHorizontal className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4 items-center">
               <RectangleHorizontal size={80} className="text-indigo-500 fill-indigo-500"/>
            </div>
            <p className="text-center font-bold">C'est comme un carré que l'on aurait étiré. Comme une porte ou ton lit !</p>
          </BentoCard>

          <BentoCard title="Long et Court" color="emerald" icon={<Ruler className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center flex-col gap-2 my-4 items-center">
               <div className="w-24 h-4 bg-emerald-500 rounded text-xs text-white text-center">LONG</div>
               <div className="w-10 h-4 bg-emerald-300 rounded text-xs text-emerald-900 text-center">COURT</div>
            </div>
            <p className="text-center font-bold">Un serpent est LONG. Une petite larme de crocodile est COURTE.</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Astuce du quotidien">
        Pour distinguer le carré du rectangle, prenez une boîte à chaussures. C'est le meilleur exemple du rectangle !
      </InfoBlock>

      <Section title="Schéma interactif : Le Détective" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Retrouve la bonne forme ou la bonne longueur !</p>
        <ShapeGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        Le mot "Triangle" veut dire "trois angles" ! Les angles, ce sont les petits coins pointus. Essaie de les compter ! Un, deux, et trois !
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Mon enfant appelle le rectangle un 'carré long', c'est grave ?",
            answer: "C'est même très logique ! Cela signifie qu'il a perçu les angles droits communs aux deux figures. Dites-lui juste 'Oui, c'est ce qu'on appelle un rectangle'."
          },
          {
            question: "Comment lui expliquer Long / Court ?",
            answer: "Utilisez deux ficelles ou deux morceaux de pâte à modeler (des colombins). Mettez-les côte à côte avec le même point de départ pour voir lequel va 'plus loin'."
          }
        ]} />
      </Section>

      <Section title="Flashcards : Révisons en un clic" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour voir la réponse !</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-[4rem]">🍕</div> Quelle est la forme d'une part de pizza ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-amber-500">Un TRIANGLE !</div> Avec ses 3 jolis coins.</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-[2rem] flex justify-center gap-4"><span>🐛 (Mille-pattes)</span> VS <span>🐜 (Fourmi)</span></div> Lequel des deux est le plus LONG ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">Le mille-pattes !</div> Il est tout en longueur !</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Un petit jeu pour voir si on a tout compris !</p>
        <Quiz questions={[
          {
            question: "Combien de coins pointus a le triangle ?",
            options: ["4 (quatre)", "3 (trois)", "Aucun, c'est tout rond"],
            correctAnswer: 1,
            explanation: "Bravo ! Le TRI-angle a TROIS pointes !"
          },
          {
            question: "La porte du salon, quelle est sa forme ?",
            options: ["Un Rectangle", "Un Triangle", "Un Rond"],
            correctAnswer: 0,
            explanation: "C'est bien ça ! La porte est longue, c'est un Rectangle."
          },
          {
            question: "Qu'est-ce qui est généralement très COURT ?",
            options: [
              "Un très long serpent",
              "Un train énorme",
              "Ton petit doigt"
            ],
            correctAnswer: 2,
            explanation: "Oui ! Ton petit doigt (l'auriculaire) est très COURT !"
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_MS_02_Formes_et_Grandeurs;
