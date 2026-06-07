import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Heart, 
  BookOpen, 
  Mail, 
  Copy, 
  Check, 
  BrainCircuit, 
  AlertCircle 
} from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const email = "geoffroy.streit@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      title: "Bienvenue !",
      subtitle: "Votre Guide de Mathématiques Interactif",
      icon: (
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-primary shadow-sm shadow-indigo-100/50">
          <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
      ),
      content: (
        <div className="space-y-4 text-center">
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            Ce site est né de la passion intense pour la science et de l'envie profonde de transmettre le savoir de façon claire, ludique et structurée.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-750 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-100 dark:border-emerald-900/60 shadow-sm mt-2">
            <Sparkles className="w-3.5 h-3.5" /> 100% Gratuit, Bénévole & Sans Publicité
          </div>
        </div>
      )
    },
    {
      title: "Une œuvre humble",
      subtitle: "Un projet vivant et perfectible",
      icon: (
        <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/30 flex items-center justify-center text-rose-500 shadow-sm shadow-rose-100/50">
          <Heart className="w-8 h-8" />
        </div>
      ),
      content: (
        <div className="space-y-4 text-left">
          <div className="space-y-3">
            <div className="flex gap-3 items-start bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80">
              <span className="text-xl mt-0.5">🌱</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">En cours d'amélioration</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Ce guide est <strong>imparfait et encore incomplet</strong>. Les cours de mathématiques sont rédigés et enrichis de manière progressive.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start bg-slate-50 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80">
              <span className="text-xl mt-0.5">✨</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Toujours accessible</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Pas d'inscription requise, pas de cookies publicitaires, juste un environnement sain et épuré pour se concentrer sur l'essentiel.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Des outils interactifs",
      subtitle: "Pour apprendre et ancrer vos connaissances",
      icon: (
        <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center text-amber-500 shadow-sm shadow-amber-100/50">
          <BrainCircuit className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
      ),
      content: (
        <div className="space-y-3 text-left">
          <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm text-center mb-2 leading-relaxed">
            Pour aller au-delà de la simple lecture passive, nous avons intégré plusieurs modules conçus pour stimuler votre mémoire de manière ludique :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 bg-muted/65 dark:bg-muted/30 border border-border-strong/50 rounded-xl text-center">
              <span className="text-lg">📊</span>
              <h5 className="font-semibold text-xs mt-1 text-foreground">LaTeX Propre</h5>
              <p className="text-3xs text-muted-text mt-1 leading-normal">Des équations impeccables et faciles à délier</p>
            </div>
            <div className="p-3 bg-muted/65 dark:bg-muted/30 border border-border-strong/50 rounded-xl text-center">
              <span className="text-lg">🗂️</span>
              <h5 className="font-semibold text-xs mt-1 text-foreground">Flashcards</h5>
              <p className="text-3xs text-muted-text mt-1 leading-normal">Prêt-à-réviser interactif pour réactiver le cerveau</p>
            </div>
            <div className="p-3 bg-muted/65 dark:bg-muted/30 border border-border-strong/50 rounded-xl text-center">
              <span className="text-lg">🏆</span>
              <h5 className="font-semibold text-xs mt-1 text-foreground">Système d'XP</h5>
              <p className="text-3xs text-muted-text mt-1 leading-normal">Gagnez de l'XP en validant des cours et des quiz !</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Co-construisons ensemble !",
      subtitle: "Votre regard est une aide précieuse",
      icon: (
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center text-indigo-500 shadow-sm shadow-indigo-100/50">
          <Mail className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
      ),
      content: (
        <div className="space-y-4 text-center">
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            S'agissant d'un projet mené seul à côté de mes activités, des coquilles, erreurs d'affichage de formules LaTeX ou imprécisions peuvent subsister.
          </p>
          
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-3.5 text-left flex gap-3 items-start max-w-md mx-auto">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 dark:text-amber-200 leading-normal">
              <strong>N'hésitez pas à me contacter !</strong> Que ce soit pour signaler une simple erreur de calcul, une faute, une incohérence ou soumettre une idée de cours ou d'exercice à ajouter !
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto pt-1">
            <div className="w-full bg-muted border border-border-strong rounded-xl px-3 py-2 text-xs font-mono select-all flex items-center justify-between text-slate-700 dark:text-slate-300">
              <span className="truncate">{email}</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-4 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all flex-shrink-0 active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copié !
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copier le mail
                </>
              )}
            </button>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("onboarding-completed", "true");
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-md dark:bg-black/60"
        />

        {/* Modal Sheet Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="w-full max-w-lg bg-card border border-border-strong rounded-[2rem] shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
        >
          {/* Close button inside modal */}
          <button
            onClick={() => {
              localStorage.setItem("onboarding-completed", "true");
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-muted text-muted-text hover:text-foreground transition-all z-20 active:scale-90"
            aria-label="Ignorer l'onboarding"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Slide Body */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto flex flex-col items-center justify-center pt-10 pb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full flex flex-col items-center gap-5 my-auto"
              >
                {steps[currentStep].icon}

                <div className="text-center space-y-1">
                  <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-xs md:text-sm font-bold text-primary tracking-wider uppercase">
                    {steps[currentStep].subtitle}
                  </p>
                </div>

                <div className="w-full py-2">
                  {steps[currentStep].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Indicators & Navigation Bar */}
          <div className="p-6 md:px-8 border-t border-border-strong/50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/20">
            {/* Step indicators */}
            <div className="flex gap-2.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-border-strong/80 hover:bg-border-strong-hover"
                  }`}
                  aria-label={`Accéder à l'étape ${idx + 1}`}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 w-full sm:w-auto">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl border border-border-strong bg-card text-foreground font-semibold text-xs transition-all hover:bg-muted flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </button>
              )}

              <button
                onClick={handleNext}
                className="flex-grow py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-primary/20"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    C'est parti !
                    <Sparkles className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Suivant
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
