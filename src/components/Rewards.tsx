import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Lock, 
  Gift, 
  CheckCircle2, 
  Volume2, 
  ArrowRight, 
  BrainCircuit, 
  HelpCircle, 
  Clock, 
  Star,
  Coins,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  playXpGainSound, 
  playLvlUpSound, 
  playBadgeUnlockSound, 
  playSuccessSound, 
  playFailureSound, 
  playTapSound 
} from '../utils/sound';

interface RewardsProps {
  stats: {
    xp: number;
    level: number;
    xpForNextLevel: number;
    xpForCurrentLevel: number;
    badges: { id: string; name: string; threshold: number; icon: string; description: string }[];
    completedCount: number;
    quizCount: number;
    perfectQuizCount: number;
    avgQuizScore: number;
    currentStreak: number;
    weeklyActivity: { dayLabel: string; active: boolean; dateStr: string }[];
  };
}

// Liste complète et typée des badges pour affichage des bloqués/débloqués
interface BadgeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Progression' | 'Mathématicien' | 'Exploit';
  hint: string;
}

const ALL_BADGES_INFO: BadgeInfo[] = [
  {
    id: 'premier_pas',
    name: 'Premier pas',
    description: 'Valide ton tout premier cours interactif.',
    icon: '🌟',
    category: 'Progression',
    hint: 'Compléter 1 cours'
  },
  {
    id: 'apprenti',
    name: 'Apprenti',
    description: 'Valide au moins 5 chapitres d\'apprentissage.',
    icon: '🔥',
    category: 'Progression',
    hint: 'Compléter 5 cours'
  },
  {
    id: 'intermediaire',
    name: 'Intermédiaire',
    description: 'Passe la barre fatidique des 10 chapitres complétés !',
    icon: '🚀',
    category: 'Progression',
    hint: 'Compléter 10 cours'
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Validation de plus de 25 chapitres différents.',
    icon: '🧠',
    category: 'Progression',
    hint: 'Compléter 25 cours'
  },
  {
    id: 'pythagore',
    name: 'Insigne de Pythagore',
    description: 'Génie de l\'antiquité. Débloqué en validant un cours école et collège.',
    icon: '📐',
    category: 'Mathématicien',
    hint: 'Étudier les fondamentaux (Primaire/Collège)'
  },
  {
    id: 'euler',
    name: 'Insigne d\'Euler',
    description: 'Maître de l\'analyse. Débloqué en complétant un cours du Lycée (Suites, Exponentielle...).',
    icon: '🌀',
    category: 'Mathématicien',
    hint: 'Étudier l\'analyse supérieure (Lycée)'
  },
  {
    id: 'lagrange',
    name: 'Insigne de Lagrange',
    description: 'Pionnier de l\'algèbre moderne. Obtenu pour la validation d\'un parcours Post-Bac.',
    icon: '🏛️',
    category: 'Mathématicien',
    hint: 'Étudier l\'algèbre moderne (Post-Bac)'
  },
  {
    id: 'gauss',
    name: 'Insigne de Gauss',
    description: 'Le prince des mathématiques. Débloqué après un sans-faute (100%) sur un Quiz.',
    icon: '⚡',
    category: 'Exploit',
    hint: 'Obtenir 100% à un Quiz'
  },
  {
    id: 'lovelace',
    name: 'Insigne d\'Ada Lovelace',
    description: 'Prêtresse des algorithmes. Validé après un cours orienté programmation ou algorithmique.',
    icon: '💻',
    category: 'Mathématicien',
    hint: 'Valider un chapitre d\'Algorithmique'
  },
  {
    id: 'hypatie',
    name: 'Insigne d\'Hypatie',
    description: 'Philosophe alexandrine. Offert pour avoir étudié avec rigueur 3 jours consécutifs.',
    icon: '🌌',
    category: 'Exploit',
    hint: 'Maintenir un cycle de 3 jours d\'étude'
  }
];

// Liste de citations de félicitations pour les coffres mathématiques
const MATH_QUOTES = [
  {
    concept: "La divine proportion",
    theorem: "Nombre d'Or φ",
    desc: "Le nombre d'or vaut environ 1,618. On le retrouve dans la coquille des nautiles, les tournesols et l'architecture antique.",
    fact: "En mathématiques, la formule est : $\\phi = \\frac{1+\\sqrt{5}}{2}$"
  },
  {
    concept: "La reine des équations",
    theorem: "Identité d'Euler",
    desc: "Elle relie cinq constantes fondamentales des mathématiques : 0, 1, e, i et π d'une manière incroyablement harmonieuse.",
    fact: "La formule magnifique est : $e^{i\\pi} + 1 = 0$"
  },
  {
    concept: "L'infinitésimalité",
    theorem: "Série Harmonique",
    desc: "La somme des inverses des entiers naturels diverge vers l'infini, bien que chaque terme ajouté soit de plus en plus minuscule.",
    fact: "Formule : $H_n = \\sum_{k=1}^n \\frac{1}{k}$"
  },
  {
    concept: "La beauté symétrique",
    theorem: "Théorème de Pythagore",
    desc: "Dans un triangle rectangle, le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des autres côtés.",
    fact: "Formule intemporelle : $a^2 + b^2 = c^2$"
  }
];

export default function Rewards({ stats }: RewardsProps) {
  // Calcul mental game states
  const [mentalActive, setMentalActive] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [question, setQuestion] = useState({ text: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [mentalScore, setMentalScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [gameFeedback, setGameFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Énigme mystère hebdomadaire (Weekly riddle)
  const [riddleUnlocked, setRiddleUnlocked] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [riddleSuccess, setRiddleSuccess] = useState<boolean | null>(null);

  // Sound board interactive visualization (visual equalizers feedback for clicks)
  const [activeEqualizer, setActiveEqualizer] = useState<string | null>(null);

  // Coffres mystères
  const [chestsClaimed, setChestsClaimed] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('maths_chests_claimed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number | null>(null);

  // Progression XP bar
  const xpInCurrentLevel = stats.xp - stats.xpForCurrentLevel;
  const xpNeededForNext = stats.xpForNextLevel - stats.xpForCurrentLevel;
  const progressPercent = Math.min((xpInCurrentLevel / Math.max(xpNeededForNext, 1)) * 100, 100);

  // Générateur de question pour le calcul mental
  const generateMentalQuestion = (diff: 'easy' | 'medium' | 'hard') => {
    let num1 = 0, num2 = 0, op = '+';
    const ops = ['+', '-', '*'];

    if (diff === 'easy') {
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      op = Math.random() > 0.5 ? '+' : '-';
    } else if (diff === 'medium') {
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 50) + 10;
      op = ops[Math.floor(Math.random() * 3)];
    } else {
      num1 = Math.floor(Math.random() * 99) + 11;
      num2 = Math.floor(Math.random() * 15) + 3;
      op = '*';
    }

    let text = '';
    let answer = 0;

    switch (op) {
      case '+':
        text = `${num1} + ${num2}`;
        answer = num1 + num2;
        break;
      case '-':
        // Évite les réponses négatives en facile
        if (diff === 'easy' && num1 < num2) {
          const temp = num1;
          num1 = num2;
          num2 = temp;
        }
        text = `${num1} - ${num2}`;
        answer = num1 - num2;
        break;
      case '*':
        text = `${num1} × ${num2}`;
        answer = num1 * num2;
        break;
    }

    setQuestion({ text, answer });
    setUserAnswer('');
    setGameFeedback(null);
  };

  // Activer le mini-jeu de calcul mental
  const startMentalGame = (selectedDiff: 'easy' | 'medium' | 'hard') => {
    playTapSound();
    setDifficulty(selectedDiff);
    setMentalActive(true);
    setMentalScore(0);
    setTimer(30);
    generateMentalQuestion(selectedDiff);
  };

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (mentalActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0 && mentalActive) {
      setMentalActive(false);
      // Récompense XP finale du jeu !
      const earnedXP = difficulty === 'easy' ? mentalScore * 2 : difficulty === 'medium' ? mentalScore * 4 : mentalScore * 6;
      if (earnedXP > 0) {
        triggerAdditionalXP(earnedXP);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    }
    return () => clearInterval(interval);
  }, [mentalActive, timer]);

  // Validation de la réponse au calcul mental
  const handleMentalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ans = parseInt(userAnswer.trim(), 10);
    if (!isNaN(ans) && ans === question.answer) {
      playSuccessSound();
      setMentalScore(prev => prev + 1);
      setGameFeedback('correct');
      setTimeout(() => {
        generateMentalQuestion(difficulty);
      }, 400);
    } else {
      playFailureSound();
      setGameFeedback('wrong');
    }
  };

  // Injection d'XP supplémentaire persisté dans le localStorage
  const triggerAdditionalXP = (amount: number) => {
    try {
      const currentXP = parseInt(localStorage.getItem('guide-maths-custom-xp') || '0', 10);
      localStorage.setItem('guide-maths-custom-xp', (currentXP + amount).toString());
      window.dispatchEvent(new Event('storage'));
      playXpGainSound();
    } catch (err) {
      console.error(err);
    }
  };

  // Ouverture des coffres mystères
  const handleChestClick = (idx: number) => {
    if (chestsClaimed[idx]) {
      // Déjà réclamé, juste jouer un son d'information
      playTapSound();
      setCurrentQuoteIndex(idx);
      return;
    }

    playBadgeUnlockSound();
    confetti({
      particleCount: 50,
      spread: 40,
      colors: ['#f59e0b', '#10b981', '#6366f1']
    });

    const updatedChests = { ...chestsClaimed, [idx]: true };
    setChestsClaimed(updatedChests);
    localStorage.setItem('maths_chests_claimed', JSON.stringify(updatedChests));
    
    // Gagne +5 XP d'exploration par coffre
    triggerAdditionalXP(10);
    setCurrentQuoteIndex(idx);
  };

  // Résolution de l'énigme
  const handleRiddleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAns = riddleAnswer.trim().toLowerCase();
    // Énigme : "Plus j'ai de côtés, plus je me rapproche d'un cercle. Qui suis-je ?" -> "polygone" ou "un polygone" ou "un polygone régulier"
    if (cleanAns.includes('polygone')) {
      playSuccessSound();
      setRiddleSuccess(true);
      triggerAdditionalXP(25);
      confetti({
        particleCount: 100,
        spread: 70
      });
    } else {
      playFailureSound();
      setRiddleSuccess(false);
    }
  };

  // Déclencher et visualiser les sons sur le soundboard
  const triggerSoundboard = (soundFunc: () => void, soundName: string) => {
    soundFunc();
    setActiveEqualizer(soundName);
    setTimeout(() => {
      setActiveEqualizer(null);
    }, 600);
  };

  return (
    <div className="space-y-10 py-6 max-w-6xl mx-auto pb-24">
      {/* En-tête de la Page Récompenses */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border-strong/80 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-500/[0.02] dark:bg-indigo-500/[0.01] pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-extrabold text-xs uppercase px-3 py-1 rounded-full shadow-sm shadow-amber-500/10">
            <Trophy className="w-3.5 h-3.5" />
            Espace Récompenses & Gamification
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Académie des Mathématiciens
          </h1>
          <p className="text-muted-text text-sm md:text-base max-w-xl font-medium">
            Accumule de l'expérience, teste tes réflexes cérébraux en calcul mental, ouvre des coffres secrets et collectionne des insignes légendaires.
          </p>
        </div>

        {/* Grand Affichage de l'XP & Niveau d'inspiration Apple-like */}
        <div className="flex items-center gap-5 bg-background/50 dark:bg-slate-900/30 backdrop-blur-md p-6 rounded-[2rem] border border-border-strong/70 shrink-0 relative z-10 shadow-sm">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg relative shrink-0">
            <span className="text-white font-black text-2xl">{stats.level}</span>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-1 border-2 border-card">
              <Sparkles className="w-3 h-3 text-white fill-white" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-2xs font-extrabold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">Progression Actuelle</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black tracking-tight text-foreground">{stats.xp}</span>
              <span className="text-xs font-semibold text-muted-text-subtle">XP cumulés</span>
            </div>
            <div className="text-3xs font-bold text-muted-text flex items-center gap-1">
              <Coins className="w-3 h-3 text-amber-500" />
              Niveau suivant dans <span className="text-foreground font-black">{stats.xpForNextLevel - stats.xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de Progression Visuelle */}
      <div className="bg-card border border-border-strong p-6 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 text-sm font-extrabold">
          <span className="text-muted-text">Niveau {stats.level} • Professeur Certifié</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-black">{xpInCurrentLevel} / {xpNeededForNext} XP ({Math.round(progressPercent)}%)</span>
        </div>
        <div className="h-4.5 bg-muted rounded-full overflow-hidden p-0.5 border border-border-strong/50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full cursor-pointer relative"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-[loading-bar_1s_linear_infinite]" />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLONNE GAUCHE & CENTRE (2/3) : Activité, Défis de Calcul Mental et Coffres */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* JEU DE CALCUL MENTAL ULTRA GAMIFIÉ */}
          <section className="bg-card border border-border-strong p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.02] rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between gap-4 border-b border-border-strong/40 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-950/40 rounded-2xl text-emerald-600 dark:text-emerald-400">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground tracking-tight">Mini-Défi : Calcul Mental Flash</h3>
                  <p className="text-xs text-muted-text font-semibold">Réponds juste à autant d'équations que possible en 30s !</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 font-black text-2xs px-3 py-1.5 rounded-xl border border-amber-200/40 text-amber-600 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Gain d'XP direct
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!mentalActive ? (
                <motion.div 
                  key="start-screen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-6 space-y-6"
                >
                  <p className="text-sm text-muted-text max-w-lg mx-auto font-medium leading-relaxed">
                    Choisis ta difficulté. Chaque calcul résolu avec succès te rapporte de la vitesse cérébrale, et de l'XP immédiat pour franchir tes niveaux !
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => startMentalGame('easy')}
                      className="px-6 py-3 bg-emerald-50 hover:bg-emerald-100/80 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 border border-emerald-200/40 dark:border-emerald-800/40 rounded-2xl text-emerald-600 dark:text-emerald-400 font-extrabold text-xs tracking-tight transition-all active:scale-95 shadow-sm"
                    >
                      🟢 Facile (+2 XP / rép)
                    </button>
                    <button
                      onClick={() => startMentalGame('medium')}
                      className="px-6 py-3 bg-amber-50 hover:bg-amber-100/80 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 border border-amber-200/40 dark:border-amber-800/40 rounded-2xl text-amber-600 dark:text-amber-400 font-extrabold text-xs tracking-tight transition-all active:scale-95 shadow-sm"
                    >
                      🟡 Moyen (+4 XP / rép)
                    </button>
                    <button
                      onClick={() => startMentalGame('hard')}
                      className="px-6 py-3 bg-rose-50 hover:bg-rose-100/80 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 border border-rose-200/40 dark:border-rose-800/40 rounded-2xl text-rose-600 dark:text-rose-400 font-extrabold text-xs tracking-tight transition-all active:scale-95 shadow-sm"
                    >
                      🔴 Difficile (+6 XP / rép)
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="game-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between bg-muted/60 px-5 py-3 rounded-2xl border border-border-strong/50">
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-text">
                      <Clock className="w-4 h-4 text-rose-500 animate-pulse" />
                      Temps restant : <span className="font-extrabold text-rose-600 dark:text-rose-400 text-sm">{timer}s</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-text">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Calculs réussis : <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{mentalScore}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-8 bg-background rounded-3xl border border-border-strong relative min-h-[140px]">
                    <div className="text-3xs font-extrabold uppercase tracking-widest text-muted-text-subtle mb-1">CALCULE RAPIDEMENT :</div>
                    <span className="text-3xl md:text-4xl font-black text-foreground tracking-tight select-none">
                      {question.text} = ?
                    </span>
                    
                    {gameFeedback && (
                      <div className={`absolute bottom-3 text-3xs font-extrabold uppercase tracking-widest ${gameFeedback === 'correct' ? 'text-emerald-500' : 'text-rose-500 animate-wiggle'}`}>
                        {gameFeedback === 'correct' ? '✓ Correct !' : '✗ Incorrect, réessaye !'}
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleMentalSubmit} className="flex gap-4">
                    <input
                      type="text"
                      pattern="[0-9\-]*"
                      inputMode="numeric"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Saisis ton résultat..."
                      className="flex-1 bg-background border border-border-strong/80 px-5 py-4 rounded-2xl text-foreground text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-inner"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs tracking-tight rounded-2xl shadow-md cursor-pointer transition-all active:scale-95 hover:shadow-indigo-500/15"
                    >
                      Valider
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* COFFRES DE CONNAISSANCES MATHÉMATIQUES SECRETS */}
          <section className="bg-card border border-border-strong p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/[0.02] rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 border-b border-border-strong/40 pb-5 mb-6">
              <div className="p-3 bg-purple-100 dark:bg-purple-950/40 rounded-2xl text-purple-600 dark:text-purple-400">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-foreground tracking-tight">Les Coffres Héréditaires</h3>
                <p className="text-xs text-muted-text font-semibold">Ouvre des coffres et amasse de l'XP en débloquant du contenu historique !</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {MATH_QUOTES.map((quote, idx) => {
                const isClaimed = chestsClaimed[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handleChestClick(idx)}
                    className={`p-5 rounded-2xl border text-center transition-all relative overflow-hidden group cursor-pointer flex flex-col items-center justify-center min-h-[140px] ${
                      isClaimed
                        ? 'bg-muted/40 border-border-strong/60 hover:bg-muted/60'
                        : 'bg-gradient-to-b from-amber-50 to-orange-100/50 dark:from-amber-950/10 dark:to-orange-950/10 border-amber-200/40 dark:border-amber-900/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/5'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isClaimed ? (
                        <motion.div 
                          key="claimed"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex flex-col items-center"
                        >
                          <span className="text-3xl mb-2 grayscale opacity-75">🔓</span>
                          <span className="text-[10px] font-extrabold text-muted-text uppercase tracking-wider">{quote.theorem}</span>
                          <span className="text-4xs font-bold text-emerald-500 dark:text-emerald-400 bg-emerald-100/30 px-1.5 py-0.5 rounded-full mt-2">✓ +10 XP Gagnés</span>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="unclaimed"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex flex-col items-center"
                        >
                          <span className="text-3xl mb-2 filter drop-shadow animate-bounce group-hover:scale-110 transition-transform">🎁</span>
                          <span className="text-2xs font-extrabold text-amber-700 dark:text-amber-400">Coffre #{idx + 1}</span>
                          <span className="text-4xs font-black text-amber-500 uppercase tracking-widest mt-1">Clique pour XP</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            {/* Affichage de la carte d'Histoire secrète débloquée */}
            <AnimatePresence>
              {currentQuoteIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-6 bg-muted/60 border border-border-strong rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute top-3 right-3 flex gap-1">
                    <span className="text-4xs font-black uppercase bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded">CONCEPT MATHÉMATIQUE</span>
                  </div>
                  <h4 className="font-extrabold text-sm text-foreground mb-1">
                    {MATH_QUOTES[currentQuoteIndex].concept} : <span className="text-indigo-600 dark:text-indigo-400">{MATH_QUOTES[currentQuoteIndex].theorem}</span>
                  </h4>
                  <p className="text-xs text-muted-text leading-relaxed font-semibold mb-3">
                    {MATH_QUOTES[currentQuoteIndex].desc}
                  </p>
                  
                  {/* Utilisation de la syntaxe LaTeX brute isolée en dehors de JSX pour respecter scrupuleusement AGENTS.md */}
                  <div className="p-3.5 bg-background border border-border-strong rounded-xl text-center font-mono text-sm text-indigo-600 dark:text-indigo-400 select-none">
                    Formule : {MATH_QUOTES[currentQuoteIndex].fact}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* L'ÉNIGME MATHÉMATIQUE DE LA SEMAINE */}
          <section className="bg-card border border-border-strong p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 border-b border-border-strong/40 pb-5 mb-6">
              <div className="p-3 bg-amber-100 dark:bg-amber-950/40 rounded-2xl text-amber-600 dark:text-amber-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-foreground tracking-tight">L'Énigme Astrale</h3>
                <p className="text-xs text-muted-text font-semibold">Résous l'énigme du sage et gagne instantanément un gros bonus d'XP.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-background border border-border-strong rounded-2xl text-center italic text-sm text-foreground font-semibold">
                "Nous sommes formés de segments reliés bout à bout. Plus j'ai de côtés, plus mon tracé se confond avec celui d'un cercle. Qui suis-je ?"
              </div>

              {riddleSuccess === null ? (
                <form onSubmit={handleRiddleSubmit} className="flex gap-4">
                  <input
                    type="text"
                    value={riddleAnswer}
                    onChange={(e) => setRiddleAnswer(e.target.value)}
                    placeholder="Saisis ton secret en un mot (ex: polygone...)"
                    className="flex-1 bg-background border border-border-strong/80 px-5 py-3.5 rounded-2xl text-foreground text-xs font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-xs rounded-2xl shadow-sm cursor-pointer transition-all active:scale-95"
                  >
                    Résoudre
                  </button>
                </form>
              ) : riddleSuccess ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-2xl text-center font-bold text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Magnifique ! C'est effectivement le <strong>Polygone</strong> (qui tend vers le cercle à l'infini). Tu as gagné +25 XP !
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 rounded-2xl text-center font-bold text-xs text-rose-600 dark:text-rose-400">
                    Ce n'est pas la réponse magique... Essaye encore ! (Indice : commence par "poly...")
                  </div>
                  <button
                    onClick={() => { setRiddleSuccess(null); setRiddleAnswer(''); }}
                    className="w-full py-2 bg-muted hover:bg-muted/80 text-foreground border border-border-strong text-xs font-extrabold rounded-xl"
                  >
                    Recommencer
                  </button>
                </div>
              )}
            </div>
          </section>

        </div>

        {/* COLONNE DROITE (1/3) : Soundboard de maths + Liste complète des badges (Bloqués/Débloqués) */}
        <div className="space-y-8">
          
          {/* SOUNDBOARD AUDIO DES MATHÉMATIQUES */}
          <section className="bg-card border border-border-strong p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.01] rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 border-b border-border-strong/40 pb-5 mb-5">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-950/40 rounded-2xl text-indigo-600 dark:text-indigo-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-foreground tracking-tight">Audio Mathématique</h3>
                <p className="text-xs text-muted-text font-semibold">Toutes les mélodies de l'app sont codées à la main avec du Web Audio !</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-3xs text-muted-text font-semibold leading-relaxed">
                Appuie sur les boutons pour produire des fréquences et accorder ton esprit aux ondes géométriques.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => triggerSoundboard(playXpGainSound, 'xp')}
                  className="p-3 bg-muted/60 hover:bg-muted text-foreground border border-border-strong/75 rounded-2xl text-center font-extrabold text-3xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span className="text-xl">✨</span>
                  <span>Billet de 880 Hz (XP)</span>
                </button>
                <button
                  onClick={() => triggerSoundboard(playSuccessSound, 'success')}
                  className="p-3 bg-muted/60 hover:bg-muted text-foreground border border-border-strong/75 rounded-2xl text-center font-extrabold text-3xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span className="text-xl">🔔</span>
                  <span>Accord de 3e (Succès)</span>
                </button>
                <button
                  onClick={() => triggerSoundboard(playLvlUpSound, 'lvlup')}
                  className="p-3 bg-muted/60 hover:bg-muted text-foreground border border-border-strong/75 rounded-2xl text-center font-extrabold text-3xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 col-span-2"
                >
                  <span className="text-xl">🎵</span>
                  <span>Mélodie d'Analyse (Level Up)</span>
                </button>
                <button
                  onClick={() => triggerSoundboard(playBadgeUnlockSound, 'badge')}
                  className="p-3 bg-muted/60 hover:bg-muted text-foreground border border-border-strong/75 rounded-2xl text-center font-extrabold text-3xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 col-span-2"
                >
                  <span className="text-xl">🎷</span>
                  <span>Fanfare Triomphante (Gauss)</span>
                </button>
              </div>

              {/* Petit simulateur d'egaliseur visuel pour l'ambiance */}
              <div className="h-10 bg-black/5 dark:bg-black/30 rounded-xl flex items-end justify-center gap-1.5 p-2 overflow-hidden border border-border-strong/30">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={activeEqualizer ? {
                      height: [
                        `${Math.random() * 80 + 20}%`,
                        `${Math.random() * 80 + 20}%`,
                        `${Math.random() * 80 + 20}%`,
                        '10%'
                      ]
                    } : { height: '10%' }}
                    transition={{ repeat: activeEqualizer ? Infinity : 0, duration: 0.4 }}
                    className="w-1.5 bg-gradient-to-t from-indigo-500 through-purple-500 to-pink-500 rounded-full"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* LISTE ET ÉTAT DES BADGES (VERROUILLÉS vs DÉVERROUILLÉS) */}
          <section className="bg-card border border-border-strong p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 border-b border-border-strong/40 pb-5 mb-5">
              <div className="p-3 bg-amber-100 dark:bg-amber-950/40 rounded-2xl text-amber-600 dark:text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-foreground tracking-tight">Insignes Millénaires</h3>
                <p className="text-xs text-muted-text font-semibold">Ta collection de médailles scientifiques ({stats.badges.length} / {ALL_BADGES_INFO.length})</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-2 scrollbar-none">
              {ALL_BADGES_INFO.map((badge) => {
                const isUnlocked = stats.badges.some(b => b.id === badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-3.5 p-4 rounded-xl border relative overflow-hidden ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-background to-indigo-500/[0.01] border-indigo-100/50 dark:border-indigo-950/30'
                        : 'bg-muted/35 border-border-strong/30 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted/60 dark:bg-slate-900 border border-border-strong/50 shrink-0 text-2xl">
                      {isUnlocked ? badge.icon : <Lock className="w-5 h-5 text-muted-text-subtle" />}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-foreground tracking-tight">{badge.name}</span>
                        <span className="text-4xs font-black uppercase tracking-wider bg-muted px-2 py-0.5 rounded text-muted-text">{badge.category}</span>
                      </div>
                      <p className="text-[10px] text-muted-text-subtle font-semibold leading-relaxed">
                        {isUnlocked ? badge.description : `Défi : ${badge.hint}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
