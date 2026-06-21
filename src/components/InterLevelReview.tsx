import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseInteractiveElementsFromMarkdown } from '../hooks/useCourses';

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

interface InterLevelReviewProps {
  completedCourseIds: string[];
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function InterLevelReview({ completedCourseIds, onComplete, onClose }: InterLevelReviewProps) {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [allQuestions, setAllQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Load questions from completed courses
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const all: QuizQuestion[] = [];
      const candidates = shuffle(completedCourseIds).slice(0, 20);
      for (let i = 0; i < candidates.length; i++) {
        if (cancelled) return;
        setLoadProgress(Math.round(((i + 1) / candidates.length) * 100));
        try {
          const resp = await fetch(candidates[i]);
          if (!resp.ok) continue;
          const text = await resp.text();
          const parsed = parseInteractiveElementsFromMarkdown(text);
          if (parsed.quiz) {
            all.push(...parsed.quiz);
          }
        } catch {
          // skip failed loads
        }
      }
      if (!cancelled) {
        const selected = shuffle(all).slice(0, 10);
        setAllQuestions(selected);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [completedCourseIds]);

  // Timer
  useEffect(() => {
    if (loading || finished || showResult) return;
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id);
          setFinished(true);
          setShowResult(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [loading, finished, showResult]);

  const currentQuestion = allQuestions[currentIndex];

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setFinished(true);
      setShowResult(true);
      onComplete(score + (selectedOption === currentQuestion.correctAnswerIndex ? 1 : 0), allQuestions.length);
    }
  };

  const handleSkip = () => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setFinished(true);
      setShowResult(true);
      onComplete(score, allQuestions.length);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-card p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <h3 className="text-lg font-extrabold text-foreground">Préparation de la révision</h3>
          <p className="text-sm text-muted-text font-semibold">Chargement des quiz des cours complétés...</p>
          <div className="w-full max-w-xs bg-muted rounded-full h-2 mx-auto">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${loadProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  if (allQuestions.length === 0) {
    return (
      <div className="bg-card p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-4 text-center">
        <h3 className="text-lg font-extrabold text-foreground">Aucune question trouvée</h3>
        <p className="text-sm text-muted-text font-semibold">Complète des cours avec quiz interactifs pour débloquer ce mode.</p>
        <button onClick={onClose} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm">
          Retour
        </button>
      </div>
    );
  }

  if (showResult) {
    const finalScore = finished ? score + (submitted && selectedOption === currentQuestion?.correctAnswerIndex ? 1 : 0) : score;
    const pct = Math.round((finalScore / allQuestions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-6 text-center"
      >
        <h3 className="text-2xl font-extrabold text-foreground">Révision terminée</h3>
        <div className="text-6xl">{pct >= 80 ? '🌟' : pct >= 50 ? '👍' : '💪'}</div>
        <p className="text-lg font-bold">
          {finalScore} / {allQuestions.length} ({pct}%)
        </p>
        <p className="text-sm text-muted-text font-semibold">
          {pct >= 80 ? 'Excellent travail !' : pct >= 50 ? 'Continue comme ça !' : 'Entraîne-toi encore !'}
        </p>
        <p className="text-xs text-muted-text">+{Math.round(finalScore * 5)} XP bonus de révision</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onClose} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm">
            Terminer
          </button>
        </div>
      </motion.div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-card p-6 md:p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-foreground">Révision Inter-Niveaux</h3>
        <div className="flex items-center gap-4 text-sm font-bold">
          <span className={timeLeft < 60 ? 'text-rose-500' : 'text-muted-text'}>
            ⏱ {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-muted-text">{currentIndex + 1} / {allQuestions.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-1.5">
        <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / allQuestions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          <p className="text-base font-bold text-foreground leading-relaxed">
            {currentQuestion.question}
          </p>

          <div className="space-y-2">
            {currentQuestion.options.map((opt, idx) => {
              let style = 'border-border-strong bg-card hover:bg-muted/50 cursor-pointer';
              if (submitted) {
                if (idx === currentQuestion.correctAnswerIndex) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
                } else if (idx === selectedOption) {
                  style = 'border-rose-500 bg-rose-50 dark:bg-rose-900/20';
                } else {
                  style = 'border-border-strong bg-card opacity-50';
                }
              } else if (idx === selectedOption) {
                style = 'border-primary bg-primary/5';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {submitted && currentQuestion.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 text-sm font-semibold text-muted-text leading-relaxed"
            >
              💡 {currentQuestion.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="flex gap-3 justify-end">
        {!submitted ? (
          <>
            <button onClick={handleSkip} className="px-4 py-2 rounded-xl text-sm font-bold text-muted-text hover:bg-muted transition-all">
              Passer
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              Valider
            </button>
          </>
        ) : (
          <button onClick={handleNext} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm transition-all active:scale-95">
            {currentIndex < allQuestions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
          </button>
        )}
      </div>
    </div>
  );
}
