import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseInteractiveElementsFromMarkdown } from '../hooks/useCourses';
import { Zap, Clock, Trophy } from 'lucide-react';

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

interface QuizRushProps {
  completedCourseIds: string[];
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

const STORAGE_KEY = 'maths_quizrush';
const TOTAL_TIME = 30;
const QUESTION_COUNT = 5;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getTodayStr(): string {
  return new Date().toISOString().substring(0, 10);
}

function loadHighScore(): { date: string; score: number; total: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveHighScore(score: number, total: number) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: getTodayStr(), score, total }));
}

export default function QuizRush({ completedCourseIds, onComplete, onClose }: QuizRushProps) {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [finished, setFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [canPlay, setCanPlay] = useState(true);

  const todayScore = loadHighScore();

  // Check if already played today
  useEffect(() => {
    if (todayScore?.date === getTodayStr()) {
      setCanPlay(false);
      setFinished(true);
      setShowResult(true);
      setScore(todayScore.score);
    }
  }, []);

  // Load questions
  useEffect(() => {
    if (!canPlay) return;
    let cancelled = false;
    async function load() {
      const all: QuizQuestion[] = [];
      const candidates = shuffle(completedCourseIds).slice(0, 15);
      for (let i = 0; i < candidates.length; i++) {
        if (cancelled) return;
        setLoadProgress(Math.round(((i + 1) / candidates.length) * 100));
        try {
          const resp = await fetch(candidates[i]);
          if (!resp.ok) continue;
          const text = await resp.text();
          const parsed = parseInteractiveElementsFromMarkdown(text);
          if (parsed.quiz) all.push(...parsed.quiz);
        } catch { /* skip */ }
      }
      if (!cancelled) {
        setQuestions(shuffle(all).slice(0, QUESTION_COUNT));
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [canPlay, completedCourseIds]);

  // Timer
  useEffect(() => {
    if (loading || finished || showResult || !canPlay) return;
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
  }, [loading, finished, showResult, canPlay]);

  const currentQuestion = questions[currentIndex];

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
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalScore = score + (submitted && selectedOption === currentQuestion?.correctAnswerIndex ? 1 : 0);
    saveHighScore(finalScore, questions.length);
    setFinished(true);
    setShowResult(true);
    onComplete(finalScore, questions.length);
  };

  if (loading && canPlay) {
    return (
      <div className="bg-card p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
          <h3 className="text-lg font-extrabold text-foreground">Préparation du Quiz Rush</h3>
          <p className="text-sm text-muted-text font-semibold">Chargement des questions...</p>
          <div className="w-full max-w-xs bg-muted rounded-full h-2 mx-auto">
            <div className="bg-amber-500 h-2 rounded-full transition-all duration-300" style={{ width: `${loadProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const finalScore = todayScore?.date === getTodayStr() ? todayScore.score : score;
    const pct = Math.round((finalScore / QUESTION_COUNT) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-6 text-center"
      >
        <div className="flex justify-center">
          <Trophy className={`w-16 h-16 ${pct >= 80 ? 'text-amber-500' : 'text-muted-text'}`} />
        </div>
        <h3 className="text-2xl font-extrabold text-foreground">
          {pct >= 80 ? 'Score parfait !' : 'Quiz Rush terminé !'}
        </h3>
        <p className="text-lg font-bold">{finalScore} / {QUESTION_COUNT}</p>
        <p className="text-sm text-muted-text font-semibold">
          {todayScore?.date === getTodayStr() ? "Tu as déjà joué aujourd'hui !" : `+${finalScore * 10} XP`}
        </p>
        <button onClick={onClose} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm">
          Terminer
        </button>
      </motion.div>
    );
  }

  if (questions.length === 0 && canPlay) {
    return (
      <div className="bg-card p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-4 text-center">
        <h3 className="text-lg font-extrabold text-foreground">Pas assez de questions</h3>
        <p className="text-sm text-muted-text font-semibold">Complète des cours avec quiz interactifs pour jouer.</p>
        <button onClick={onClose} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm">Retour</button>
      </div>
    );
  }

  if (!canPlay) {
    return (
      <div className="bg-card p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-6 text-center">
        <Trophy className="w-12 h-12 mx-auto text-amber-500" />
        <h3 className="text-xl font-extrabold text-foreground">Déjà joué aujourd'hui !</h3>
        <p className="text-sm text-muted-text font-semibold">
          Score : {todayScore?.score} / {todayScore?.total}
        </p>
        <p className="text-xs text-muted-text">Reviens demain pour un nouveau Quiz Rush !</p>
        <button onClick={onClose} className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm">Fermer</button>
      </div>
    );
  }

  const seconds = timeLeft;

  return (
    <div className="bg-card p-6 md:p-8 rounded-[2rem] border-2 border-amber-200 dark:border-amber-800/40 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-extrabold text-foreground">Quiz Rush ⚡</h3>
        </div>
        <div className="flex items-center gap-4 text-sm font-bold">
          <span className={`flex items-center gap-1 ${seconds < 10 ? 'text-rose-500 animate-pulse' : 'text-muted-text'}`}>
            <Clock className="w-4 h-4" /> {seconds}s
          </span>
          <span className="text-muted-text">{currentIndex + 1} / {questions.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
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
                style = 'border-amber-500 bg-amber-50 dark:bg-amber-900/20';
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
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-sm transition-all active:scale-95"
          >
            {currentIndex < questions.length - 1 ? 'Suivante' : 'Voir les résultats'}
          </button>
        )}
      </div>
    </div>
  );
}
