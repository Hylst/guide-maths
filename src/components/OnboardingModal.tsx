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
  AlertCircle,
  GraduationCap,
  Compass
} from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);
  const [userLevel, setUserLevel] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);

  if (!isOpen) return null;

  const saveAndClose = () => {
    const prefs = { goal, userLevel, mode };
    localStorage.setItem("onboarding-preferences", JSON.stringify(prefs));
    localStorage.setItem("onboarding-completed", "true");
    onClose();
  };

  const ChoiceCard = ({ value, label, desc, icon, selected, onSelect }: { value: string; label: string; desc: string; icon: string; selected: boolean; onSelect: () => void }) => (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
        selected
          ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-sm"
          : "border-border-strong hover:border-indigo-200 dark:hover:border-indigo-800 bg-card hover:bg-muted/50"
      }`}
    >
      <span className="text-2xl shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="font-extrabold text-sm text-foreground">{label}</div>
        <div className="text-2xs text-muted-text font-semibold mt-0.5">{desc}</div>
      </div>
    </button>
  );

  const steps = [
    {
      title: "Bienvenue !",
      subtitle: "Parlons un peu de toi",
      icon: (
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-primary shadow-sm shadow-indigo-100/50">
          <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
      ),
      content: (
        <div className="space-y-3 w-full">
          <p className="text-xs text-muted-text font-semibold text-center mb-2">Quel est ton objectif principal ?</p>
          <ChoiceCard value="study" label="Étudier & Progresser" desc="Réviser un examen, consolider des bases ou avancer à ton rythme" icon="🎯" selected={goal === "study"} onSelect={() => setGoal("study")} />
          <ChoiceCard value="teach" label="Enseigner & Accompagner" desc="Trouver des ressources interactives pour tes élèves ou enfants" icon="👩‍🏫" selected={goal === "teach"} onSelect={() => setGoal("teach")} />
          <ChoiceCard value="explore" label="Explorer par Curiosité" desc="Découvrir les mathématiques autrement, sans pression scolaire" icon="🔭" selected={goal === "explore"} onSelect={() => setGoal("explore")} />
        </div>
      )
    },
    {
      title: "Ton niveau",
      subtitle: "Pour adapter les suggestions",
      icon: (
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/30 flex items-center justify-center text-emerald-500 shadow-sm shadow-emerald-100/50">
          <GraduationCap className="w-8 h-8" />
        </div>
      ),
      content: (
        <div className="space-y-2.5 w-full">
          <p className="text-xs text-muted-text font-semibold text-center mb-2">Où te situes-tu actuellement ?</p>
          <ChoiceCard value="primaire" label="École Primaire" desc="CP au CM2 — les fondations" icon="🎒" selected={userLevel === "primaire"} onSelect={() => setUserLevel("primaire")} />
          <ChoiceCard value="college" label="Collège" desc="6ᵉ à 3ᵉ — découverte de l'algèbre" icon="📐" selected={userLevel === "college"} onSelect={() => setUserLevel("college")} />
          <ChoiceCard value="lycee" label="Lycée" desc="Seconde à Terminale — analyse et spécialités" icon="🔬" selected={userLevel === "lycee"} onSelect={() => setUserLevel("lycee")} />
          <ChoiceCard value="postbac" label="Post-Bac / Supérieur" desc="Université, CPGE, BTS, BUT, écoles" icon="🏛️" selected={userLevel === "postbac"} onSelect={() => setUserLevel("postbac")} />
          <ChoiceCard value="unsure" label="Je ne sais pas" desc="Laisse-toi guider par la carte conceptuelle" icon="🧭" selected={userLevel === "unsure"} onSelect={() => setUserLevel("unsure")} />
        </div>
      )
    },
    {
      title: "Mode de navigation",
      subtitle: "Comment veux-tu explorer ?",
      icon: (
        <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-800/30 flex items-center justify-center text-amber-500 shadow-sm shadow-amber-100/50">
          <Compass className="w-8 h-8" />
        </div>
      ),
      content: (
        <div className="space-y-3 w-full">
          <p className="text-xs text-muted-text font-semibold text-center mb-2">Comment souhaites-tu naviguer dans les cours ?</p>
          <ChoiceCard value="guided" label="Parcours conseillé" desc="L'app te suggère le prochain cours à étudier en fonction de tes progrès" icon="🧭" selected={mode === "guided"} onSelect={() => setMode("guided")} />
          <ChoiceCard value="free" label="Exploration libre" desc="Tu parcours les cours comme tu le souhaites, sans suggestion" icon="🗺️" selected={mode === "free"} onSelect={() => setMode("free")} />
        </div>
      )
    },
    {
      title: "Prêt à commencer !",
      subtitle: "Une expérience conçue pour toi",
      icon: (
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
          <Sparkles className="w-8 h-8" />
        </div>
      ),
      content: (
        <div className="space-y-4 text-center">
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Super ! Tu es prêt à explorer les mathématiques autrement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 bg-muted/65 border border-border-strong/50 rounded-xl text-center">
              <span className="text-lg">🎯</span>
              <h5 className="font-semibold text-xs mt-1 text-foreground">{goal === "study" ? "Progresser" : goal === "teach" ? "Enseigner" : "Explorer"}</h5>
              <p className="text-3xs text-muted-text mt-1">Objectif défini</p>
            </div>
            <div className="p-3 bg-muted/65 border border-border-strong/50 rounded-xl text-center">
              <span className="text-lg">📚</span>
              <h5 className="font-semibold text-xs mt-1 text-foreground">{userLevel === "unsure" ? "Guidé" : userLevel || "—"}</h5>
              <p className="text-3xs text-muted-text mt-1">Niveau de départ</p>
            </div>
            <div className="p-3 bg-muted/65 border border-border-strong/50 rounded-xl text-center">
              <span className="text-lg">{mode === "guided" ? "🧭" : "🗺️"}</span>
              <h5 className="font-semibold text-xs mt-1 text-foreground">{mode === "guided" ? "Parcours" : "Libre"}</h5>
              <p className="text-3xs text-muted-text mt-1">Mode de navigation</p>
            </div>
          </div>
          <p className="text-xs text-muted-text font-semibold mt-2">
            Tu pourras modifier ces préférences à tout moment dans les Paramètres.
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      saveAndClose();
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
