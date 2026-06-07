import React, { useState, useEffect } from 'react';
import { CourseHeader, Section, InfoBlock, InteractiveChecklist, AccordionFAQ, Quiz, Flashcard, BentoGrid, BentoCard } from '../components/SharedUI';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Apple, Plus, Equal, Hash, ListOrdered } from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import confetti from 'canvas-confetti';

const AppleBasketGame = ({ onWin }: { onWin: () => void }) => {
  const [level, setLevel] = useState(0);
  const [apples, setApples] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);

  const rounds = [
    { target: 5, text: "Cinq (5)" },
    { target: 8, text: "Huit (8)" },
    { target: 10, text: "Dix (10)" }
  ];

  const currentRound = rounds[level] || rounds[0];

  useEffect(() => {
    setApples([]);
  }, [level]);

  const addApple = () => {
    if (gameWon) return;
    if (apples.length < currentRound.target) {
      setApples([...apples, Date.now()]);
    }
  };

  const removeApple = () => {
     if (apples.length > 0) {
       setApples(apples.slice(0, -1));
     }
  };

  const validate = () => {
    if (apples.length === currentRound.target) {
      if (level === rounds.length - 1) {
        setGameWon(true);
        onWin();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      } else {
        setLevel(l => l + 1);
      }
    }
  };

  const reset = () => {
    setLevel(0);
    setGameWon(false);
    setApples([]);
  };

  return (
    <div className="bg-card border-4 border-rose-100 rounded-[2rem] p-6 text-center max-w-lg mx-auto shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-lg text-rose-900">Le Panier de Pommes</h4>
        <button onClick={reset} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors" aria-label="Recommencer">
          <RotateCcw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl">
        <p className="font-bold text-rose-800 text-lg">
          Mets exactement <strong className="uppercase text-rose-900 text-2xl mx-2 font-black">{currentRound.target}</strong> pommes dans le panier !
        </p>
      </div>

      <div className="min-h-64 flex flex-col items-center justify-center gap-6 bg-slate-50 p-4 border-2 border-slate-200 rounded-2xl relative">
        <AnimatePresence mode="wait">
          {!gameWon ? (
            <motion.div 
              key={level}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full flex flex-col items-center gap-4"
            >
              <div className="flex gap-4">
                <button onClick={addApple} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform active:scale-95 flex items-center gap-2">
                  <Plus size={20} /> Ajouter
                </button>
                <button onClick={removeApple} disabled={apples.length === 0} className="bg-rose-400 hover:bg-rose-500 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold py-2 px-6 rounded-full shadow-md transition-transform active:scale-95">
                  Retirer
                </button>
              </div>

              <div className="w-full max-w-sm h-32 border-b-8 border-x-4 border-amber-700 rounded-b-3xl bg-amber-100/50 flex flex-wrap-reverse content-start justify-center p-2 gap-2 relative overflow-hidden">
                <AnimatePresence>
                  {apples.map((id) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: -50, scale: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Apple size={36} className="text-rose-500 fill-rose-500 drop-shadow-sm" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="text-xl font-bold text-slate-600">
                Tu as <span className="text-rose-600 text-2xl">{apples.length}</span> pommes.
              </div>
              
              <button 
                onClick={validate} 
                disabled={apples.length !== currentRound.target}
                className="mt-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-transform active:scale-95 font-sans"
              >
                Vérifier !
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center w-full h-48 text-rose-600"
            >
              <Apple size={72} fill="currentColor" stroke="none" className="mb-4 drop-shadow-md" />
              <p className="font-bold text-3xl">Un vrai champion !</p>
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

const Course_Maternelle_GS_01_Quantites: React.FC = () => {
  const { validateCourse } = useProgress();
  const courseId = "/Cours_Math/00_Maternelle/GS/01_Maternelle_GS_01_Quantites.md";
  const [gameWon, setGameWon] = useState(false);

  const checklistItems = [
    "Je sais compter jusqu'à 10 objets sans me tromper.",
    "Je sais lire les nombres écrits (1, 2, 3... 10).",
    "Je sais préparer une quantité précise quand on me le demande."
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <CourseHeader 
        acronym="GS" 
        title="Grande Section - Quantités jusqu'à 10" 
        subtitle="Devenir un expert des nombres jusqu'à 10"
        level="Grande Section"
        objectives={[
          "Dénombrer une collection jusqu'à 10.",
          "Lire les chiffres de 1 à 10.",
          "Comprendre qu'ajouter ou enlever modifie la quantité."
        ]}
      />

      <InfoBlock type="info" title="Introduction pour les parents et éducateurs">
        À 5 ans, on entre dans la cour des grands ! L'enfant ne se contente plus de réciter la comptine numérique ; il maîtrise le dénombrement jusqu'à 10. Il comprend que le dernier mot prononcé ("dix") de la comptine correspond au nombre total d'objets.
      </InfoBlock>

      <Section title="La Théorie : La Famille des Nombres" color="indigo" icon="✨">
        <p>Tu connais 1, 2, 3... Maintenant, on va jusqu'à 10 ! C'est le nombre de tes doigts.</p>
        <BentoGrid>
          <BentoCard title="Compter" color="amber" icon={<ListOrdered className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center flex-wrap gap-2 my-4 h-24 content-center">
               <span className="text-3xl font-black text-slate-200">1</span>
               <span className="text-3xl font-black text-amber-300">2</span>
               <span className="text-3xl font-black text-rose-500">3</span>
               <span className="text-4xl font-black text-emerald-500 drop-shadow-md">4</span>
            </div>
            <p className="text-center font-bold text-sm">On doit toucher chaque objet une seule fois en comptant.</p>
          </BentoCard>
          
          <BentoCard title="Ajouter" color="emerald" icon={<Plus className="w-5 h-5"/>} colSpan={1}>
             <div className="flex justify-center items-center gap-2 my-4 h-24">
               <div className="text-4xl">🍎</div>
               <Plus className="text-emerald-500 w-8 h-8"/>
               <div className="text-4xl">🍎</div>
               <Equal className="text-slate-400 w-8 h-8"/>
               <div className="text-4xl">2</div>
            </div>
            <p className="text-center font-bold text-sm">Quand on ajoute, ça fait PLUS ! Le tas grandit.</p>
          </BentoCard>

          <BentoCard title="Jusqu'à DIX" color="rose" icon={<Hash className="w-5 h-5"/>} colSpan={1}>
            <div className="flex justify-center items-center my-4 h-24">
               <span className="text-7xl font-bold text-indigo-500">10</span>
            </div>
            <p className="text-center font-bold text-sm">Dix, c'est deux mains pleines !</p>
          </BentoCard>
        </BentoGrid>
      </Section>

      <InfoBlock type="reminder" title="Astuce du quotidien">
        Demandez-lui : « Va chercher 6 fourchettes pour mettre la table ! ». S'il revient avec le bon nombre, félicitez-le ! Mettre la table est le meilleur exercice de Grande Section.
      </InfoBlock>

      <Section title="Schéma interactif : La Cueillette" color="emerald" icon="▶️">
        <p className="mb-6 font-medium text-center text-lg">Prépare le panier de pommes qu'on t'a commandé !</p>
        <AppleBasketGame onWin={() => setGameWon(true)} />
      </Section>

      <InfoBlock type="funfact" title="Le sais-tu ?">
        Le nombre "Zéro" (0) est très étrange à comprendre. Il veut dire "rien", un panier vide ! C'est un concept très puissant en mathématiques.
      </InfoBlock>

      <Section title="Questions Fréquentes (Parents)" color="amber" icon="💬">
        <AccordionFAQ items={[
          {
            question: "Mon enfant compte encore sur ses doigts, est-ce un problème ?",
            answer: "Absolument pas ! Utiliser ses doigts (subitisation digitale) est fondamental. C'est son premier outil de calcul et cela apaise l'apprentissage. Il les abandonnera naturellement plus tard."
          },
          {
            question: "Doit-il savoir écrire les chiffres de 1 à 10 ?",
            answer: "Oui, en Grande Section, on commence à écrire les chiffres. Mais l'important ici est le sens (la quantité). L'écriture est de la graphomotricité."
          },
          {
            question: "Il saute souvent un objet quand il compte une grande quantité...",
            answer: "Apprenez-lui à déplacer les objets qu'il a déjà comptés de l'autre côté. Par exemple, faire glisser le jeton de la main gauche vers la main droite. Cela structure l'organisation."
          }
        ]} />
      </Section>

      <Section title="Flashcards : Combien y en a-t-il ?" color="purple" icon="🃏">
        <p className="text-center mb-6">Touche les cartes pour compter avec moi !</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Flashcard 
            front={<><div className="mb-4 text-[2rem] tracking-widest text-center">🦆🦆 🦆🦆</div> Combien de canards nagent ici ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-rose-500">QUATRE (4) !</div> 2 d'un côté, 2 de l'autre, ça fait 4 !</>}
          />
          <Flashcard 
            front={<><div className="mb-4 text-[2rem] font-bold text-center">✋ + ✋</div> Combien as-tu de doigts au total si tu ouvres grand tes deux mains ?</>}
            back={<><div className="text-3xl font-bold mb-2 text-emerald-500">DIX (10) !</div> C'est tout le bout de tes mains !</>}
          />
        </div>
      </Section>

      <Section title="Petit Questionnaire (QCM)" color="indigo" icon="🧠">
        <p className="mb-4 text-center">Voyons ce qu'on a retenu !</p>
        <Quiz questions={[
          {
            question: "Si j'ai 5 bonbons et que tu m'en donnes 1 autre. Combien j'en ai ?",
            options: ["4", "5", "6"],
            correctAnswer: 2,
            explanation: "Bravo ! Après 5, c'est 6. Ajouter 1, c'est toujours le nombre suivant !"
          },
          {
            question: "J'ai un coffre avec 8 pièces d'or. Je ferme les yeux. Devine combien il y en a !",
            options: ["Il y en a toujours 8", "Il y en a 10", "Il n'y en a plus"],
            correctAnswer: 0,
            explanation: "C'est ça ! Même si on ne les voit plus, le nombre ne change pas (c'est la conservation de la quantité) !"
          },
          {
            question: "Je dois donner UN biscuit à chaque chien. J'ai 4 chiens. Combien de biscuits me faut-il ?",
            options: [
              "3",
              "4",
              "5"
            ],
            correctAnswer: 1,
            explanation: "Parfait ! S'il y a 4 chiens, il faut 4 biscuits. C'est tout pareil !"
          }
        ]} />
      </Section>

      <div onClick={() => { if (gameWon) validateCourse(courseId); }}>
        <InteractiveChecklist items={checklistItems} />
      </div>
    </div>
  );
};

export default Course_Maternelle_GS_01_Quantites;

