import React, { useState } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Star, Search } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import confetti from 'canvas-confetti';

const CountingGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [stars, setStars] = useState<{ id: number; popped: boolean }[]>([]);
  const [gameWon, setGameWon] = useState(false);

  const rounds = [
    { count: 1, text: "Une étoile" },
    { count: 2, text: "Deux étoiles" },
    { count: 3, text: "Trois étoiles" }
  ];

  // Initialize round
  React.useEffect(() => {
    if (level < rounds.length) {
      const newStars = Array.from({ length: rounds[level].count }).map((_, i) => ({ id: i, popped: false }));
      setStars(newStars);
    }
  }, [level]);

  const handlePop = (id: number) => {
    const newStars = [...stars];
    const star = newStars.find(s => s.id === id);
    if (star && !star.popped) {
      star.popped = true;
      setStars(newStars);

      if (newStars.every(s => s.popped)) {
        setTimeout(() => {
          if (level === rounds.length - 1) {
            setGameWon(true);
            onWin();
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          } else {
            setLevel(l => l + 1);
          }
        }, 500);
      }
    }
  };

  const reset = () => {
    setLevel(0);
    setGameWon(false);
  };

  const currentRound = rounds[level] || rounds[0];

  return (
    <div className="bg-card border-4 border-amber-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-amber-900">Le jeu des Étoiles</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="font-bold text-amber-800 text-xl">
          Touche <strong className="uppercase text-amber-900 mx-1">{currentRound.text}</strong> pour les attraper !
        </p>
      </div>

      <div className="h-48 flex items-center justify-center gap-4 sm:gap-8 bg-indigo-950 p-4 border-2 border-indigo-900 rounded-2xl relative overflow-hidden">
        {/* Background decorative dots to look like space */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {Array.from({length: 20}).map((_, i) => (
             <div key={i} className="absolute w-1 h-1 bg-white rounded-full flex" style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div 
              key={level}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex items-center gap-4 sm:gap-8 z-10"
            >
              {stars.map(star => (
                <AnimatePresence key={star.id}>
                  {!star.popped && (
                    <motion.button
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handlePop(star.id)}
                      className="text-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500 rounded-full"
                    >
                      <Star size={64} fill="currentColor" stroke="none" className="drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
                    </motion.button>
                  )}
                </AnimatePresence>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-full text-amber-400 z-10"
            >
              <Star size={64} fill="currentColor" className="mb-2" />
              <p className="font-bold text-2xl">Bravo ! Tu sais compter jusqu'à 3 !</p>
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

const Course_Maternelle_MS_01_Decouverte: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/MS/01_Maternelle_MS_01_Decouverte.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais montrer 1 doigt, 2 doigts, 3 doigts.",
    "Je peux reconnaître et dire '1', '2' et '3' quand je les vois.",
    "Je sais compter 'Un, deux, trois !' dans l'ordre."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="MS" 
        title="Moyenne Section - Découverte" 
        subtitle="Un, deux, trois... Partez ! À la découverte des premiers nombres."
        level="Moyenne Section"
        objectives={[
          "Associer le nom des nombres à leur quantité réelle.",
          "Dénombrer de petites quantités (1, 2, 3).",
          "Mémoriser l'ordre de la petite comptine numérique."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        À 4 ans, le monde des quantités devient précis. L'enfant ne dit plus seulement 'beaucoup' ou 'un peu', il va associer un mot précis (un, deux, trois) à une quantité exacte, et c'est une étape cognitive gigantesque. Misons sur l'interaction !
      </InfoBlock>

      <Section title="La Théorie : 1, 2 et 3" color="indigo" icon="✨">
        <p>Voici les trois premiers nombres ! Regarde bien avec tes doigts !</p>
        <BentoGrid>
          <BentoCard title="Le Nombre 1" color="amber" icon={<Star className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4">
              <span className="text-7xl font-bold text-amber-500">1</span>
            </div>
            <p className="text-center font-bold">Un seul objet, comme ton nez au milieu de la figure !</p>
          </BentoCard>
          
          <BentoCard title="Le Nombre 2" color="emerald" icon={<Star className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4">
              <span className="text-7xl font-bold text-emerald-500">2</span>
            </div>
            <p className="text-center font-bold">Deux objets, comme tes deux yeux ou tes deux oreilles !</p>
          </BentoCard>

          <BentoCard title="Le Nombre 3" color="rose" icon={<Star className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center my-4">
              <span className="text-7xl font-bold text-rose-500">3</span>
            </div>
            <p className="text-center font-bold">Trois objets, comme les roues d'un tricycle !</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Apprentissage par le corps">
        Demandez-lui : « Montre-moi 2 avec tes doigts ! » - L'association entre le mot et le geste ancre le nombre. N'hésitez pas à compter en tapant dans les mains.
      </InfoBlock>

      <Section title="Schéma interactif : Le train des Étoiles" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Retrouve le bon nombre d'étoiles !</p>
        <CountingGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        La plupart des enfants apprennent à chanter « 1,2,3,4,5... » comme une chanson avant même de comprendre que cela sert à compter des vrais objets ! C'est ce qu'on appelle la comptine numérique.
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Mon enfant saute toujours le chiffre 2 quand il compte, que faire ?",
            answer: "C'est normal ! Corrigez-le doucement en recomptant avec lui, toujours en pointant chaque objet avec le doigt pour l'aider à ralentir : « Un... deux... et trois ! »."
          },
          {
            question: "Doit-il savoir écrire les chiffres ?",
            answer: "À 4 ans, la priorité est de les reconnaître visuellement et de les associer à des quantités. L'écriture viendra surtout en Grande Section, même si le tracé dans le sable peut commencer."
          }
        ]} />
      </Section>

      <Section title="Flashcards : Montre avec tes doigts !" color="purple" icon="🃏">
        <p className="text-center mb-6">Parents : lisez la question et touchez la carte pour vérifier que les doigts correspondent !</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-3xl font-bold">1, 2... ?</div> Quel est le nombre qui vient après ?</>}
            back={<><div className="text-5xl font-bold mb-2 text-rose-500">3 !</div> Bravo, après c'est Trois !</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-[4rem]">🚲</div> Combien de roues vois-tu sur ce vélo ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">Deux ! (2)</div> Il y a deux roues pour bien rouler.</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Un petit jeu pour voir si on maîtrise 1, 2, 3 !</p>
        <Quiz questions={[
          {
            question: "Combien as-tu de pouces sur tes deux mains réunies ?",
            options: ["1 seul", "2 (Deux)"],
            correctAnswer: 1,
            explanation: "Exactement ! Tu as un pouce sur chaque main, ça fait 2 pouces !"
          },
          {
            question: "Que faut-il dire après UN ?",
            options: ["TROIS", "DEUX", "QUATRE"],
            correctAnswer: 1,
            explanation: "Oui ! C'est UN, puis DEUX, puis TROIS !"
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_MS_01_Decouverte;

