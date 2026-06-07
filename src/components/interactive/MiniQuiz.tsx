import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ThumbsUp, RefreshCw, ArrowRight, Check, HelpCircle } from 'lucide-react';

interface MiniQuizProps {
  questions: QuizQuestion[];
  courseTitle: string;
  onComplete?: (score: number, total: number) => void;
}

export default function MiniQuiz({ questions, courseTitle, onComplete }: MiniQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  if (!questions || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;

  const handleOptionSelect = (index: number) => {
    if (!isSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null && !isSubmitted) {
      setIsSubmitted(true);
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResults(true);
      if (onComplete) {
        // Calculate final score since setScore is async
        const finalScore = isCorrect ? score + 1 : score;
        onComplete(finalScore, questions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        aria-live="polite"
        className="mt-12 w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans"
      >
        <div className="p-6 bg-indigo-50 border-b border-indigo-100 text-center">
          <h3 className="text-2xl font-bold text-indigo-900">Quiz Terminé !</h3>
          <p className="text-indigo-700 mt-1">{courseTitle}</p>
        </div>
        <div className="p-8 flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mb-6"
          >
            {percentage === 100 ? (
              <div className="w-24 h-24 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12" />
              </div>
            ) : percentage >= 50 ? (
              <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-12 h-12" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center">
                <HelpCircle className="w-12 h-12" />
              </div>
            )}
          </motion.div>
          
          <div className="text-4xl font-bold text-slate-800 mb-3">
            {score} <span className="text-slate-400 text-2xl">/ {questions.length}</span>
          </div>
          
          <div className="text-slate-500 mb-8 text-center max-w-sm">
            {percentage === 100 
              ? "Parfait ! Vous maîtrisez ce chapitre sur le bout des doigts." 
              : percentage >= 50 
                ? "Bien joué ! Encore un petit effort pour la perfection." 
                : "N'hésitez pas à relire le cours et à réessayer pour vous améliorer."}
          </div>
          
          <button 
            onClick={handleRestart}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-sm"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Recommencer le Quiz</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mt-16 w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <span>Mini-Quiz</span>
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">Testez vos connaissances sur ce chapitre</p>
        </div>
        <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-medium text-slate-800 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h4>
            
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative overflow-hidden ";
                
                if (!isSubmitted) {
                  buttonClass += selectedOption === index 
                    ? "border-indigo-500 bg-indigo-50 text-indigo-900 shadow-sm" 
                    : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
                } else {
                  if (index === currentQuestion.correctAnswerIndex) {
                    buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm";
                  } else if (index === selectedOption) {
                    buttonClass += "border-rose-500 bg-rose-50 text-rose-900";
                  } else {
                    buttonClass += "border-slate-200 bg-slate-50 text-slate-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isSubmitted}
                    aria-pressed={selectedOption === index}
                    className={buttonClass}
                  >
                    <div className="flex items-center relative z-10">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-colors ${
                        isSubmitted && index === currentQuestion.correctAnswerIndex ? "border-emerald-500 bg-emerald-500 text-white" :
                        isSubmitted && index === selectedOption ? "border-rose-500 bg-rose-500 text-white" :
                        selectedOption === index ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-300"
                      }`}>
                        {isSubmitted && index === currentQuestion.correctAnswerIndex && <Check className="w-4 h-4" />}
                        {isSubmitted && index === selectedOption && index !== currentQuestion.correctAnswerIndex && <XCircle className="w-4 h-4" />}
                        {!isSubmitted && selectedOption === index && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  aria-live="polite"
                  className={`p-5 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}
                >
                  <div className="font-bold mb-2 flex items-center space-x-2">
                    {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    <span>{isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse'}</span>
                  </div>
                  <p className="text-sm leading-relaxed opacity-90">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end border-t border-slate-100 mt-6 pt-6">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                selectedOption === null 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md'
              }`}
            >
              <Check className="w-5 h-5" />
              <span>Valider ma réponse</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
            >
              <span>{currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}</span>
              {currentQuestionIndex < questions.length - 1 ? <ArrowRight className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
