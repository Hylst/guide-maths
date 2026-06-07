import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  CheckCircle, 
  Inbox, 
  Check, 
  X, 
  ChevronRight, 
  Star,
  Info,
  ExternalLink,
  Zap,
  BookOpen,
  FolderOpen
} from 'lucide-react';
import { CourseHeader, Section, InfoBlock, TipBanner, Quiz, InteractiveExercise } from '../../components/SharedUI';
import { MathComponent } from '../../components/MathComponent';
import confetti from 'canvas-confetti';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  deckId: string;
  isMath?: boolean;
}

interface Deck {
  id: string;
  title: string;
  icon: string;
  description: string;
  level: string;
}

const DECKS: Deck[] = [
  {
    id: 'mat_prim',
    title: 'Primaire / Maternelle',
    icon: '🎒',
    description: 'Périmètres, aires, fractions et vocabulaire géométrique élémentaire.',
    level: 'Primaire'
  },
  {
    id: 'college',
    title: 'Collège',
    icon: '📐',
    description: 'Théorème de Pythagore, Thalès, calcul littéral et équations.',
    level: 'Collège'
  },
  {
    id: 'lycee',
    title: 'Lycée',
    icon: '📈',
    description: 'Dérivées courantes, trigonométrie, exponentielles et limites.',
    level: 'Lycée'
  },
  {
    id: 'post_bac',
    title: 'Post-Bac',
    icon: '🧬',
    description: 'Développements limités, groupes algébriques, et matrices avancées.',
    level: 'Post_Bac'
  },
  {
    id: 'custom',
    title: 'Cartes Personnalisées',
    icon: '✍️',
    description: 'Révise tes propres cours en créant tes flashcards avec LaTeX.',
    level: 'Mes révisions'
  }
];

const INITIAL_FLASHCARDS: Flashcard[] = [
  // Deck Primaire
  {
    id: 'p1',
    question: "Comment s'appelle un polygone qui possède trois côtés ?",
    answer: "Un triangle ! S'il contient un angle droit de 90 degrés, on l'appelle un triangle rectangle.",
    deckId: 'mat_prim'
  },
  {
    id: 'p2',
    question: "Quelle est la formule du périmètre d'un cercle ?",
    answer: "P = 2 \\times \\pi \\times r (où r représente le rayon du cercle). L'aire associée est de \\pi \\times r^2.",
    deckId: 'mat_prim',
    isMath: true
  },
  {
    id: 'p3',
    question: "Donner la formule de l'aire d'un rectangle de longueur L et de largeur l",
    answer: "A = L \\times l. Pour un carré de côté c, cela devient c \\times c = c^2.",
    deckId: 'mat_prim',
    isMath: true
  },
  {
    id: 'p4',
    question: "Quelle fraction correspond à la moitié de la moitié d'un gâteau ?",
    answer: "Un quart, représenté par la fraction \\frac{1}{4} ou 0,25 en écriture décimale.",
    deckId: 'mat_prim',
    isMath: true
  },

  // Deck Collège
  {
    id: 'c1',
    question: "Énoncer l'égalité de Pythagore dans un triangle ABC rectangle en A.",
    answer: "BC^2 = AB^2 + AC^2 \n(Le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.)",
    deckId: 'college',
    isMath: true
  },
  {
    id: 'c2',
    question: "Qu'est-ce que l'opposé d'un nombre relatif x ?",
    answer: "C'est le nombre -x. Leur distance à l'origine est identique mais de signe contraire. Leur somme vaut toujours 0 : x + (-x) = 0.",
    deckId: 'college',
    isMath: true
  },
  {
    id: 'c3',
    question: "Développer l'identité remarquable suivante : (a + b)^2",
    answer: "(a + b)^2 = a^2 + 2ab + b^2. Le terme 2ab est appelé le 'double produit'.",
    deckId: 'college',
    isMath: true
  },
  {
    id: 'c4',
    question: "Quelle est la définition de la médiane d'une série statistique ?",
    answer: "C'est la valeur qui partage la série ordonnée en deux groupes de même effectif. Au moins 50% des valeurs sont inférieures ou égales à la médiane.",
    deckId: 'college'
  },

  // Deck Lycée
  {
    id: 'l1',
    question: "Quelle est la formule de la dérivée de f(x) = x^n ?",
    answer: "f'(x) = n \\cdot x^{n-1} pour tout entier relatif n (et plus généralement pour tout réel n non nul sur l'intervalle d'étude).",
    deckId: 'lycee',
    isMath: true
  },
  {
    id: 'l2',
    question: "Quelle est la relation fondamentale entre cos(x) et sin(x) ?",
    answer: "\\cos^2(x) + \\sin^2(x) = 1 pour tout réel x. Cela provient directement du théorème de Pythagore sur le cercle trigonométrique.",
    deckId: 'lycee',
    isMath: true
  },
  {
    id: 'l3',
    question: "Quelle est l'équation générale de la tangente à une courbe en un point d'abscisse a ?",
    answer: "y = f'(a)(x - a) + f(a) où f'(a) désigne le coefficient directeur de cette tangente.",
    deckId: 'lycee',
    isMath: true
  },
  {
    id: 'l4',
    question: "Simplifier l'expression exponentielle suivante : e^a \\cdot e^b",
    answer: "e^a \\cdot e^b = e^{a+b}. De la même manière, \\frac{e^a}{e^b} = e^{a-b}.",
    deckId: 'lycee',
    isMath: true
  },

  // Deck Post-Bac
  {
    id: 'pb1',
    question: "Donner la définition d'un Groupe (G, *) en algèbre.",
    answer: "C'est un ensemble G pourvu d'une loi de composition interne '*' associative, disposant d'un élément neutre e, et où chaque élément x possède un symétrique x' tel que x * x' = x' * x = e.",
    deckId: 'post_bac'
  },
  {
    id: 'pb2',
    question: "Donner la dérivée de la fonction f(x) = \\arctan(x).",
    answer: "f'(x) = \\frac{1}{1 + x^2} pour tout nombre réel x.",
    deckId: 'post_bac',
    isMath: true
  },
  {
    id: 'pb3',
    question: "Énoncer le théorème des valeurs intermédiaires (TVI).",
    answer: "Si f est une fonction continue sur [a,b], pour tout réel k compris entre f(a) et f(b), il existe au moins un réel c de [a,b] tel que f(c) = k.",
    deckId: 'post_bac'
  },
  {
    id: 'pb4',
    question: "Qu'est-ce qu'une matrice orthogonale P ?",
    answer: "Une matrice carrée réelle telle que ^tP \\cdot P = I (sa transposée est égale à son inverse). Son déterminant vaut toujours +1 ou -1.",
    deckId: 'post_bac',
    isMath: true
  }
];

export default function Course_Ressources_Hub_Revision_Flashcards() {
  const [selectedDeckId, setSelectedDeckId] = useState<string>('mat_prim');
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [cardPositions, setCardPositions] = useState<Record<string, number>>({}); // id -> box Number (1, 2, or 3)
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<string>('');
  const [newAnswer, setNewAnswer] = useState<string>('');
  const [isNewMath, setIsNewMath] = useState<boolean>(true);

  // Load custom and initial cards
  useEffect(() => {
    // 1. Initialise positions
    const savedPositions = localStorage.getItem('guide_maths_flashcard_boxes');
    if (savedPositions) {
      setCardPositions(JSON.parse(savedPositions));
    } else {
      const initialPositions: Record<string, number> = {};
      INITIAL_FLASHCARDS.forEach(c => {
        initialPositions[c.id] = 1; // start in Box 1 (À réviser)
      });
      setCardPositions(initialPositions);
      localStorage.setItem('guide_maths_flashcard_boxes', JSON.stringify(initialPositions));
    }

    // 2. Load custom cards
    const savedCustom = localStorage.getItem('guide_maths_custom_flashcards');
    let customList: Flashcard[] = [];
    if (savedCustom) {
      customList = JSON.parse(savedCustom);
    }
    
    setCards([...INITIAL_FLASHCARDS, ...customList]);
  }, []);

  // Sync positions when updated
  const updateCardBox = (cardId: string, boxNum: number) => {
    const updated = { ...cardPositions, [cardId]: boxNum };
    setCardPositions(updated);
    localStorage.setItem('guide_maths_flashcard_boxes', JSON.stringify(updated));

    // Show celebratory confetti on Box 3 achievements
    if (boxNum === 3) {
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.8 },
        colors: ["#10b981", "#3b82f6"]
      });
    }
  };

  // Filter cards based on selected deck
  const currentDeckCards = cards.filter(c => c.deckId === selectedDeckId);

  // Stats for the active deck
  const statsInDeck = {
    box1: currentDeckCards.filter(c => (cardPositions[c.id] || 1) === 1).length,
    box2: currentDeckCards.filter(c => cardPositions[c.id] === 2).length,
    box3: currentDeckCards.filter(c => cardPositions[c.id] === 3).length,
    total: currentDeckCards.length
  };

  const masteryPercent = statsInDeck.total > 0 
    ? Math.round((statsInDeck.box3 / statsInDeck.total) * 100) 
    : 0;

  // Active card
  const activeReviewCards = currentDeckCards;
  const activeCard = activeReviewCards[currentCardIndex];

  // Force flipping back on deck change
  useEffect(() => {
    setIsFlipped(false);
    setCurrentCardIndex(0);
  }, [selectedDeckId]);

  // Handler to add custom cards
  const handleAddCustomCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newCard: Flashcard = {
      id: `custom_${Date.now()}`,
      question: newQuestion,
      answer: newAnswer,
      deckId: 'custom',
      isMath: isNewMath
    };

    const updatedCustomList = [...cards.filter(c => c.id.startsWith('custom_')), newCard];
    localStorage.setItem('guide_maths_custom_flashcards', JSON.stringify(updatedCustomList));

    // Also set position to box 1
    const updatedPositions = { ...cardPositions, [newCard.id]: 1 };
    setCardPositions(updatedPositions);
    localStorage.setItem('guide_maths_flashcard_boxes', JSON.stringify(updatedPositions));

    setCards([...INITIAL_FLASHCARDS, ...updatedCustomList]);
    setNewQuestion('');
    setNewAnswer('');
    
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
  };

  // Remove a custom card
  const handleDeleteCustomCard = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedCustomList = cards.filter(c => c.id !== cardId && c.id.startsWith('custom_'));
    localStorage.setItem('guide_maths_custom_flashcards', JSON.stringify(updatedCustomList));

    const updatedPositions = { ...cardPositions };
    delete updatedPositions[cardId];
    setCardPositions(updatedPositions);
    localStorage.setItem('guide_maths_flashcard_boxes', JSON.stringify(updatedPositions));

    setCards([...INITIAL_FLASHCARDS, ...updatedCustomList]);
    if (currentCardIndex >= Math.max(1, currentDeckCards.length - 1)) {
      setCurrentCardIndex(0);
    }
  };

  // Reset progress of the active deck back to Box 1
  const handleResetDeckProgress = () => {
    const updatedPositions = { ...cardPositions };
    currentDeckCards.forEach(c => {
      updatedPositions[c.id] = 1;
    });
    setCardPositions(updatedPositions);
    localStorage.setItem('guide_maths_flashcard_boxes', JSON.stringify(updatedPositions));
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 px-4 space-y-10">
      <CourseHeader 
        acronym="REV-HUB"
        title="Hub de Révision"
        subtitle="Révise tes formules clés grâce aux flashcards interactives et à l'algorithme de répétition espacée (système de Leitner)."
        duration="15 min / jour"
      />

      <Section title="1. Console Interactive d'Auto-Évaluation" color="indigo" icon={<Layers className="text-indigo-600 w-6 h-6"/>}>
        {/* Leitner Explanation Banner */}
      <div className="bg-indigo-50/50 dark:bg-indigo-950/15 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 flex flex-col md:flex-row items-start md:items-center gap-4 text-indigo-950 dark:text-indigo-100">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-500 flex-shrink-0">
          <Layers className="w-6 h-6" />
        </div>
        <div className="space-y-1 flex-1">
          <h4 className="font-extrabold text-sm flex items-center gap-1.5 uppercase tracking-wide">
            Le Système de Leitner (Répétition Espacée) <Zap className="w-4 h-4 fill-current text-indigo-500 animate-bounce" />
          </h4>
          <p className="text-xs text-indigo-900/80 dark:text-indigo-200/80 leading-relaxed">
            Les questions sont réparties en 3 boîtes selon ton niveau de maîtrise. Les cartes de la <span className="font-bold">Boîte 1</span> (à réviser) sont présentées en priorité. Une fois maîtrisée, une carte monte d'une boîte. Si tu te trompes, elle retourne directement en boîte 1 !
          </p>
        </div>
      </div>

      {/* Grid: Deck Selection Sidebar / Top Row & Current Deck Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Decks selection column */}
        <div className="lg:col-span-1 space-y-3">
          <div className="text-xs uppercase font-bold tracking-widest text-muted-text flex items-center gap-1">
            <FolderOpen className="w-4 h-4" /> Sélectionner un thème
          </div>
          <div className="flex xl:flex-col overflow-x-auto no-scrollbar gap-2 pb-2 xl:pb-0">
            {DECKS.map(deck => {
              const isActive = selectedDeckId === deck.id;
              const deckCards = cards.filter(c => c.deckId === deck.id);
              const cardCount = deckCards.length;
              
              return (
                <button
                  key={deck.id}
                  onClick={() => setSelectedDeckId(deck.id)}
                  className={`flex-shrink-0 flex items-center gap-3.5 px-4 py-3 rounded-2xl text-left border transition-all select-none ${
                    isActive 
                      ? 'bg-primary border-primary-light text-white shadow-md shadow-primary/10' 
                      : 'bg-card border-border-strong text-foreground hover:bg-muted'
                  }`}
                  style={{ minWidth: '220px' }}
                >
                  <span className="text-2xl">{deck.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-extrabold text-xs tracking-tight truncate">{deck.title}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-muted border border-border-strong text-muted-text'}`}>
                        {cardCount} {cardCount > 1 ? 'cartes' : 'carte'}
                      </span>
                    </div>
                    <p className={`text-[10px] line-clamp-1 mt-0.5 ${isActive ? 'text-white/80' : 'text-muted-text'}`}>
                      {deck.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Deck Global Progress */}
        <div className="lg:col-span-2 bg-card p-6 rounded-3xl border border-border-strong shadow-sm flex flex-col justify-between gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-mono">Boîtes de Leitner</span>
              <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                Progression : {DECKS.find(d => d.id === selectedDeckId)?.title}
              </h3>
            </div>
            
            {statsInDeck.total > 0 && (
              <button 
                onClick={handleResetDeckProgress}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-border-strong text-muted-text hover:text-foreground hover:bg-muted transition-all"
                title="Mettre toutes les cartes en boîte 1 pour recommencer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Recommencer
              </button>
            )}
          </div>

          {statsInDeck.total === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6 text-muted-text">
              <HelpCircle className="w-10 h-10 text-muted-text/30 mb-2" />
              <p className="text-sm font-medium">Aucune carte dans ce deck pour le moment.</p>
              {selectedDeckId === 'custom' && <p className="text-xs text-muted-text/75 mt-1">Utilise le formulaire ci-dessous pour créer ta première carte !</p>}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Box Progress Bar Split */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-muted-text">Maîtrise Globale</span>
                  <span className="text-emerald-500">{masteryPercent}%</span>
                </div>
                
                <div className="h-3 bg-muted rounded-full overflow-hidden flex">
                  <div 
                    title={`${statsInDeck.box1} cartes en boîte 1`}
                    className="h-full bg-rose-400 transition-all duration-300"
                    style={{ width: `${(statsInDeck.box1 / statsInDeck.total) * 100}%` }}
                  />
                  <div 
                    title={`${statsInDeck.box2} cartes en boîte 2`}
                    className="h-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${(statsInDeck.box2 / statsInDeck.total) * 100}%` }}
                  />
                  <div 
                    title={`${statsInDeck.box3} cartes maîtrisées (boîte 3)`}
                    className="h-full bg-emerald-400 transition-all duration-300"
                    style={{ width: `${(statsInDeck.box3 / statsInDeck.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Box Summary Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 p-3 rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-rose-500 dark:text-rose-400">À revoir</span>
                    <p className="text-xs text-muted-text font-medium">Boîte 1</p>
                  </div>
                  <span className="text-xl font-black text-rose-600 dark:text-rose-400">{statsInDeck.box1}</span>
                </div>

                <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-amber-500 dark:text-amber-400">En cours</span>
                    <p className="text-xs text-muted-text font-medium">Boîte 2</p>
                  </div>
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400">{statsInDeck.box2}</span>
                </div>

                <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-400">Maîtrisé</span>
                    <p className="text-xs text-muted-text font-medium">Boîte 3</p>
                  </div>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{statsInDeck.box3}</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Main Flashcard Interactive Session Arena */}
      {activeReviewCards.length > 0 && activeCard && (
        <motion.div 
          key={selectedDeckId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          {/* Card Frame Header */}
          <div className="w-full max-w-xl flex items-center justify-between text-xs px-2 select-none">
            <span className="font-bold text-muted-text uppercase tracking-wider">
              Carte {currentCardIndex + 1} sur {activeReviewCards.length}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-muted-text">État actuel :</span>
              <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                (cardPositions[activeCard.id] || 1) === 3 
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                  : (cardPositions[activeCard.id] || 1) === 2
                    ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                    : 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
              }`}>
                Boîte {(cardPositions[activeCard.id] || 1)}
              </span>
            </div>
          </div>

          {/* Flip Container */}
          <div className="perspective-1000 w-full max-w-xl cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div 
              className={`relative w-full h-80 rounded-[2rem] transition-transform duration-500 transform-style-3d border ${
                isFlipped ? 'rotate-y-180 border-indigo-200' : 'border-border-strong hover:scale-[1.01]'
              } shadow-lg`}
            >
              
              {/* FRONT SIDE */}
              <div className="absolute inset-0 w-full h-full p-8 rounded-[2rem] bg-card flex flex-col justify-between backface-hidden">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-muted-text bg-muted px-2.5 py-1 rounded-full uppercase tracking-wider">QUESTION</span>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
                  <p className="text-lg font-extrabold text-foreground leading-snug">
                    {activeCard.question}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-text font-bold uppercase tracking-widest bg-muted/45 pl-3 pr-2 py-2 rounded-xl">
                  <span>Cliquer pour retourner</span> <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 w-full h-full p-8 rounded-[2rem] bg-gradient-to-b from-indigo-50/20 to-indigo-100/10 dark:from-slate-900/40 dark:to-slate-950/20 flex flex-col justify-between backface-hidden rotate-y-180">
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">RÉPONSE</span>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center px-4 py-3">
                  {activeCard.isMath ? (
                    <div className="text-base text-foreground font-semibold leading-relaxed">
                      <MathComponent math={activeCard.answer} block={true} />
                    </div>
                  ) : (
                    <p className="text-base font-extrabold text-foreground leading-relaxed whitespace-pre-line">
                      {activeCard.answer}
                    </p>
                  )}
                </div>

                <div className="text-3xs text-muted-text text-center uppercase tracking-widest font-sans font-black opacity-80 pt-1">
                  Explications de cours validées
                </div>
              </div>

            </div>
          </div>

          {/* Action Boxes / Leitner Recall Grading Buttons */}
          <div className="w-full max-w-xl text-center space-y-4">
            
            <AnimatePresence mode="wait">
              {isFlipped ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <p className="text-xs text-muted-text font-bold uppercase tracking-wider">
                    As-tu réussi à t'en souvenir ?
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => {
                        updateCardBox(activeCard.id, 1);
                        setIsFlipped(false);
                        setCurrentCardIndex(prev => (prev + 1) % activeReviewCards.length);
                      }}
                      className="bg-rose-500 hover:bg-rose-600 text-white font-extrabold px-4 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <X className="w-4 h-4 stroke-[3]" /> Pas du tout (Boîte 1)
                    </button>

                    <button
                      onClick={() => {
                        updateCardBox(activeCard.id, 2);
                        setIsFlipped(false);
                        setCurrentCardIndex(prev => (prev + 1) % activeReviewCards.length);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-4 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Star className="w-4 h-4 fill-current" /> Difficilement (Boîte 2)
                    </button>

                    <button
                      onClick={() => {
                        updateCardBox(activeCard.id, 3);
                        setIsFlipped(false);
                        setCurrentCardIndex(prev => (prev + 1) % activeReviewCards.length);
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-4 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Check className="w-4 h-4 stroke-[3]" /> C'est maîtrisé (Boîte 3)
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-between items-center sm:px-6"
                >
                  <button
                    disabled={currentCardIndex === 0}
                    onClick={() => {
                      setCurrentCardIndex(prev => Math.max(0, prev - 1));
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-border-strong text-xs font-extrabold text-muted-text hover:text-foreground hover:bg-muted disabled:opacity-40 transition-all"
                  >
                    Précédent
                  </button>

                  <button
                    onClick={() => {
                      setIsFlipped(true);
                    }}
                    className="px-6 py-2.5 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary-hover shadow-sm transition-all"
                  >
                    Voir la réponse
                  </button>

                  <button
                    onClick={() => {
                      setCurrentCardIndex(prev => (prev + 1) % activeReviewCards.length);
                      setIsFlipped(false);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-border-strong text-xs font-extrabold text-muted-text hover:text-foreground hover:bg-muted transition-all"
                  >
                    Sauter / Suivant
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}

      {/* Custom Cards Form and Stack display */}
      {selectedDeckId === 'custom' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pt-4 border-t border-border-strong"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Form to construct flashcard */}
            <div className="bg-card border border-border-strong p-6 rounded-3xl h-fit space-y-4">
              <div className="space-y-1">
                <h4 className="font-extrabold text-foreground text-base flex items-center gap-1.5">
                  <Plus className="w-5 h-5 text-primary" /> Créer une nouvelle Flashcard
                </h4>
                <p className="text-xs text-muted-text">Construis tes thèmes sur-mesure d'algèbre, géométrie ou physique.</p>
              </div>

              <form onSubmit={handleAddCustomCard} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="card_question" className="text-2xs uppercase tracking-wider font-extrabold text-muted-text">Question / Concept</label>
                  <input
                    id="card_question"
                    type="text"
                    required
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ex: Quelle est la formule du produit scalaire ?"
                    className="w-full pl-4 pr-4 py-2 bg-muted text-foreground border border-border-strong focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="card_answer" className="text-2xs uppercase tracking-wider font-extrabold text-muted-text">Réponse / Formule</label>
                  <textarea
                    id="card_answer"
                    required
                    rows={3}
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Ex: u \cdot v = ||u|| \times ||v|| \times \cos(\theta)"
                    className="w-full pl-4 pr-4 py-2.5 bg-muted text-foreground border border-border-strong focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm transition-all outline-none"
                  />
                  <p className="text-[10px] text-muted-text-subtle">
                    {"💡 Astuce : Si tu coches KaTeX, écris ta formule en syntaxe LaTeX standard sans symboles $. (Ex: \\frac{a}{b})."}
                  </p>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-border/60">
                  <div className="flex items-center gap-2">
                    <input 
                      id="card_katex_checkbox" 
                      type="checkbox" 
                      checked={isNewMath}
                      onChange={(e) => setIsNewMath(e.target.checked)}
                      className="w-4 h-4 text-primary bg-muted rounded border-border-strong focus:ring-primary-light"
                    />
                    <label htmlFor="card_katex_checkbox" className="text-xs font-bold text-foreground">
                      Activer le rendu de formule KaTeX 🤖
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-black py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Ajouter au deck personnalisé
                </button>
              </form>
            </div>

            {/* Custom Cards list panel */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-foreground text-sm flex items-center gap-1.5 uppercase tracking-wide">
                Liste de mes cartes ({currentDeckCards.length})
              </h4>

              {currentDeckCards.length === 0 ? (
                <div className="text-center text-muted-text text-xs font-semibold py-8 bg-card border border-border-strong/60 rounded-3xl">
                  Aucune carte personnalisée créée. Saisis une question ci-contre !
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {currentDeckCards.map((card) => (
                    <div 
                      key={card.id} 
                      className="bg-card border border-border-strong p-4 rounded-2xl flex items-start justify-between gap-3 group shadow-2sm"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="text-[10px] font-bold text-primary uppercase">Question</span>
                        <p className="text-xs font-extrabold text-foreground truncate">{card.question}</p>
                        
                        <span className="text-[10px] font-bold text-emerald-500 uppercase block pt-1">Réponse</span>
                        {card.isMath ? (
                          <div className="text-xs font-mono bg-muted p-1.5 rounded-lg border border-border/80 h-fit scale-95 origin-left">
                            <MathComponent math={card.answer} block={false} />
                          </div>
                        ) : (
                          <p className="text-xs text-muted-text line-clamp-2">{card.answer}</p>
                        )}
                      </div>
                      
                      <button 
                        onClick={(e) => handleDeleteCustomCard(card.id, e)}
                        className="text-muted-text hover:text-rose-500 p-1.5 bg-muted hover:bg-rose-500/10 rounded-lg transition-all"
                        title="Supprimer la carte"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </motion.div>
      )}
      </Section>

      <Section title="2. Les Secrets de la Répétition Espacée" color="purple" icon="⚡">
        <div className="space-y-4">
          <p>
            Le cerveau humain oublie naturellement les informations apprises selon une courbe exponentielle décroissante, théorisée par le psychologue <strong>Hermann Ebbinghaus</strong>. Sans révision, la rétention mémorielle suit la loi mathématique suivante :
          </p>
          
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center font-mono">
            {"$$R = e^{-\\frac{t}{S}}$$"}
          </div>

          <p className="text-xs text-muted-text text-center font-mono mt-1">
            où {"$R$"} est la rétention mémorielle (la probabilité de se souvenir), {"$t$"} est le temps écoulé, et {"$S$"} est la force relative de la trace mnésique.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <InfoBlock type="funfact" title="Le saviez-vous ? L'effet d'espacement">
              Réviser une formule de trigonométrie ou de géométrie 5 fois en une seule soirée est beaucoup moins efficace que de la réviser 5 fois réparties sur deux semaines ! C'est ce qu'on appelle <strong>l'effet d'espacement</strong>. Notre cerveau a besoin de périodes de sommeil entre les rappels pour consolider les connexions synaptiques profondes.
            </InfoBlock>

            <InfoBlock type="reminder" title="Rappel méthodologique : Le Leitner intelligent">
              Chaque fois que vous donnez une mauvaise réponse, la carte rétrograde immédiatement en <strong>Boîte 1</strong>. Cela garantit que les notions difficiles réapparaissent fréquemment, tandis que les notions maîtrisées s'espacent de plus en plus pour libérer votre charge cognitive active.
            </InfoBlock>
          </div>
        </div>
      </Section>

      <Section title="3. Exercice Interactif de Planification" color="emerald" icon="🗓️">
        <InteractiveExercise 
          title="Calcul des intervalles optimaux selon Leitner"
          question={
            <>
              Un étudiant apprend une nouvelle formule de géométrie aujourd'hui. D'après le protocole de Leitner à intervalles classiques (Boîte 1 = tous les jours, Boîte 2 = tous les 3 jours, Boîte 3 = tous les 7 jours).
              <br />
              S'il réussit son rappel aujourd'hui (Boîte 1) et réussit également à sa révision suivante en Boîte 2, après combien de jours au total aura lieu sa révision suivante ?
            </>
          }
          steps={[
            <>
              <strong>Étape 1 : Comprendre les boîtes de niveau</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Au jour 0 (aujourd'hui), la carte est en <strong>Boîte 1</strong>. Puisqu'il réussit, elle passe en <strong>Boîte 2</strong>.
              </p>
            </>,
            <>
              <strong>Étape 2 : Planifier la révision de la Boîte 2</strong>
              <p className="mt-2 text-sm leading-relaxed">
                Les cartes de la Boîte 2 doivent être revues tous les 3 jours. L'étudiant attend donc 3 jours pour faire sa deuxième révision.
              </p>
            </>,
            <>
              <strong>Étape 3 : Calculer la date de la Boîte 3</strong>
              <p className="mt-2 text-sm leading-relaxed">
                À la fin du 3ème jour, s'il réussit le rappel, le niveau de la carte monte en <strong>Boîte 3</strong>.
                La Boîte 3 demande une révision après 7 jours supplémentaires. Au total, la prochaine révision aura donc lieu après :
                <br />
                <span className="font-mono font-bold text-indigo-600 block text-center my-2">{"$3\\text{ jours (Boîte 2)} + 7\\text{ jours (Boîte 3)} = 10\\text{ jours}$"}</span>
                L'écart total depuis le jour 0 est donc de 10 jours accumulés !
              </p>
            </>
          ]}
        />
      </Section>

      <Section title="4. Teste tes connaissances" color="rose" icon="🎯">
        <Quiz 
          questions={[
            {
              question: "Si l'on échoue à se rappeler d'une carte stockée dans la Boîte 3, où est-elle replacée ?",
              options: [
                "Elle reste dans la Boîte 3.",
                "Elle retourne directement dans la Boîte 1.",
                "Elle descend uniquement d'un cran dans la Boîte 2."
              ],
              correctAnswer: 1,
              explanation: "Dans le protocole de Leitner authentique, toute erreur renvoie directement la carte en Boîte 1 pour forcer un réapprentissage immédiat de la base."
            },
            {
              question: "Quelle fonction mathématique régit le rythme naturel d'oubli cérébral théorisé par Ebbinghaus ?",
              options: [
                "Une fonction linéaire décroissante.",
                "Une fonction trigonométrique périodique.",
                "Une fonction exponentielle négative."
              ],
              correctAnswer: 2,
              explanation: "La rétention R d'une information diminue de manière exponentielle négative avec le temps : R = e^(-t/S)."
            }
          ]}
        />
      </Section>

    </div>
  );
}
