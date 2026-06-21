import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  User, 
  BookOpen, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Heart, 
  Compass, 
  Cpu, 
  CheckCircle2, 
  GraduationCap,
  Lightbulb,
  FileText,
  Activity,
  Terminal,
  Clock,
  ShieldCheck,
  BrainCircuit,
  GitBranch,
  Eye
} from "lucide-react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "author" | "project" | "guide" | "tips" | "tech" | "graph";

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("author");
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Focus trap: cycle Tab within modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modal = modalRef.current;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  const email = "geoffroy.streit@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Titres dynamiques selon l'onglet
  const getTabTitleAndIcon = () => {
    switch (activeTab) {
      case "author":
        return { text: "À propos de l'Auteur", icon: <User className="w-5 h-5 text-indigo-500" /> };
      case "project":
        return { text: "La Genèse du Projet", icon: <Compass className="w-5 h-5 text-emerald-500" /> };
      case "guide":
        return { text: "Guide & Mode d'emploi", icon: <GraduationCap className="w-5 h-5 text-amber-500" /> };
      case "tips":
        return { text: "Conseils d'Étude", icon: <Lightbulb className="w-5 h-5 text-rose-500" /> };
      case "tech":
        return { text: "Coulisses Techniques", icon: <Terminal className="w-5 h-5 text-purple-500" /> };
      case "graph":
        return { text: "Graphe Conceptuel", icon: <GitBranch className="w-5 h-5 text-cyan-500" /> };
    }
  };

  const currentHeaderInfo = getTabTitleAndIcon();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-md dark:bg-black/60"
        />

        {/* Modal Container */}
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Informations sur le Guide Mathématiques"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="w-full max-w-2xl bg-card border border-border-strong rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header Title & Close Button */}
          <div className="p-6 md:p-8 pb-3 flex items-center justify-between border-b border-border-strong/40">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-muted border border-border-strong flex items-center justify-center shadow-inner">
                {currentHeaderInfo.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground tracking-tight">
                  {currentHeaderInfo.text}
                </h2>
                <p className="text-xs text-muted-text font-semibold">Guide Mathématiques Applet • Informations</p>
                    </div>
                  </div>

                  {/* AI Assistance */}
                  <div className="bg-indigo-500/[0.03] p-4 rounded-2xl border border-indigo-500/15 space-y-1.5">
                    <h4 className="flex items-center gap-1.5 text-xs font-black uppercase text-indigo-700 dark:text-indigo-400">
                      <Cpu className="w-4 h-4 text-indigo-500" /> Conception Assistée par IA
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-indigo-300/80 leading-normal font-semibold">
                      Le code, les schémas interactifs, les activités pédagogiques, la recherche documentaire, la modélisation des concepts et une partie du contenu rédactionnel ont été assistés par intelligence artificielle, sous la direction et la validation humaine de l'auteur.
                    </p>
                  </div>
            
            <button
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-muted text-muted-text hover:text-foreground transition-all active:scale-90 border border-border-strong/40"
              aria-label="Fermer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Navigation Tabs (Scrollable on small screens to fit all 6 items) */}
          <div className="px-6 md:px-8 py-2.5 bg-muted/20 border-b border-border-strong/35 flex items-center gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
            <button
              onClick={() => setActiveTab("author")}
              className={`px-3.5 py-2.5 rounded-xl text-2xs font-extrabold tracking-tight transition-all flex items-center gap-2 ${
                activeTab === "author"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                  : "text-muted-text hover:text-foreground hover:bg-muted font-bold"
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              L'Auteur
            </button>

            <button
              onClick={() => setActiveTab("project")}
              className={`px-3.5 py-2.5 rounded-xl text-2xs font-extrabold tracking-tight transition-all flex items-center gap-2 ${
                activeTab === "project"
                  ? "bg-emerald-600 text-white dark:bg-emerald-500 shadow-md"
                  : "text-muted-text hover:text-foreground hover:bg-muted font-bold"
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              Le Projet
            </button>

            <button
              onClick={() => setActiveTab("guide")}
              className={`px-3.5 py-2.5 rounded-xl text-2xs font-extrabold tracking-tight transition-all flex items-center gap-2 ${
                activeTab === "guide"
                  ? "bg-amber-600 text-white dark:bg-amber-500 shadow-md"
                  : "text-muted-text hover:text-foreground hover:bg-muted font-bold"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              Mode d'Emploi
            </button>

            <button
              onClick={() => setActiveTab("tips")}
              className={`px-3.5 py-2.5 rounded-xl text-2xs font-extrabold tracking-tight transition-all flex items-center gap-2 ${
                activeTab === "tips"
                  ? "bg-rose-600 text-white dark:bg-rose-500 shadow-md"
                  : "text-muted-text hover:text-foreground hover:bg-muted font-bold"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 shrink-0" />
              Conseils d'Étude
            </button>

            <button
              onClick={() => setActiveTab("tech")}
              className={`px-3.5 py-2.5 rounded-xl text-2xs font-extrabold tracking-tight transition-all flex items-center gap-2 ${
                activeTab === "tech"
                  ? "bg-purple-600 text-white dark:bg-purple-500 shadow-md"
                  : "text-muted-text hover:text-foreground hover:bg-muted font-bold"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 shrink-0" />
              Technique
            </button>

            <button
              onClick={() => setActiveTab("graph")}
              className={`px-3.5 py-2.5 rounded-xl text-2xs font-extrabold tracking-tight transition-all flex items-center gap-2 ${
                activeTab === "graph"
                  ? "bg-cyan-600 text-white dark:bg-cyan-500 shadow-md"
                  : "text-muted-text hover:text-foreground hover:bg-muted font-bold"
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 shrink-0" />
              Graphe
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === "author" && (
                <motion.div
                  key="author-tab"
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Bio Header Badge */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-muted/40 p-4 rounded-3xl border border-border-strong/50">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-mono text-xl font-bold shadow-md shadow-indigo-500/25 shrink-0">
                      GS
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <h3 className="text-base font-extrabold text-foreground">Geoffroy Streit</h3>
                      <p className="text-xs text-muted-text font-semibold flex items-center justify-center sm:justify-start gap-1">
                        <Cpu className="w-3.5 h-3.5 text-indigo-500" /> Ancien Ingénieur & Passionné de Sciences
                      </p>
                    </div>
                  </div>

                  {/* Profile & History */}
                  <div className="space-y-3 leading-relaxed text-sm text-slate-600 dark:text-slate-300 font-medium">
                    <p>
                      Je suis un ancien ingénieur ayant évolué à l'intersection de disciplines captivantes : <strong>l'optique</strong>, <strong>l'électronique</strong>, <strong>l'informatique industrielle</strong>, puis le <strong>commerce</strong>.
                    </p>
                    <p>
                      Profondément passionné par les sciences et par la noble tâche de <strong>transmission du savoir</strong>, j'aime rendre intelligibles et vivants des concepts parfois perçus comme trop austères ou inaccessibles.
                    </p>

                    {/* Neurodiversity Block */}
                    <div className="bg-amber-500/[0.04] p-4 rounded-2xl border border-amber-500/20 space-y-2">
                      <h4 className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-700 dark:text-amber-400">
                        <Sparkles className="w-4 h-4 text-amber-500" /> Profil Atypique : TDAH & DYS
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-emerald-400/80 leading-normal">
                        Étant porteur d'un profil <strong>TDAH / dys</strong> mais habité par une passion débordante, je traduis ce fonctionnement singulier au service de la pédagogie : structure visuelle renforcée, clarté absolue, découpages ludiques, récompenses sous forme d'XP et interaction fluide.
                      </p>
                    </div>
                  </div>

                  {/* Contact Block */}
                  <div className="pt-4 border-t border-border-strong/45 space-y-4">
                    <div className="text-center sm:text-left">
                      <h4 className="text-xs font-extrabold text-foreground">Une remarque ou une proposition d'ajout ?</h4>
                      <p className="text-2xs text-muted-text mt-1 font-semibold">Écris-moi pour co-construire cette plateforme :</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 max-w-full">
                      <span className="w-full bg-muted border border-border-strong/85 px-3 py-2 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-200 select-all truncate">
                        {email}
                      </span>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={handleCopyEmail}
                          className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 flex-shrink-0"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Copié
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copier
                            </>
                          )}
                        </button>
                        <a
                          href={`mailto:${email}?subject=Retour%20sur%20le%20Guide%20Maths`}
                          className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm shadow-indigo-500/20"
                        >
                          <Mail className="w-3.5 h-3.5" /> Écrire
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "project" && (
                <motion.div
                  key="project-tab"
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                    Ce guide repense l'apprentissage des mathématiques autour de <strong>trois piliers</strong> : l'interactivité sensorielle, l'ancrage dans le réel et une progression spiralaire qui suit la façon dont le cerveau construit ses connaissances.
                  </p>

                  <div className="space-y-3">
                    <div className="p-4 bg-indigo-50/45 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-800/40 rounded-2xl flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500 font-black text-sm shrink-0">1</div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-extrabold text-foreground">Apprentissage Interactif</h4>
                        <p className="text-2xs text-muted-text leading-relaxed font-semibold">
                          Simulateurs 3D pour la géométrie, graphes dynamiques qui réagissent en temps réel au mouvement d'un curseur, algorithmique visuelle. L'objectif est de <strong>manipuler</strong> les objets mathématiques pour les comprendre intuitivement, pas seulement les mémoriser.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50/45 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/40 rounded-2xl flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500 font-black text-sm shrink-0">2</div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-extrabold text-foreground">Ancrage dans le Réel</h4>
                        <p className="text-2xs text-muted-text leading-relaxed font-semibold">
                          Les mathématiques racontent notre monde. Chaque module relie la théorie à l'histoire, à la physique ou à l'économie : de l'orbite lunaire modélisée par Laplace à la croissance exponentielle en biologie ou en finance. <strong>Les formules prennent vie.</strong>
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50/45 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-800/40 rounded-2xl flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-500 font-black text-sm shrink-0">3</div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-extrabold text-foreground">Pédagogie Spiralaire</h4>
                        <p className="text-2xs text-muted-text leading-relaxed font-semibold">
                          Du primaire jusqu'à l'enseignement supérieur, les concepts ne sont pas cloisonnés en chapitres étanches. Ils <strong>évoluent et se connectent</strong> naturellement au fil du parcours. La Carte Conceptuelle (126 nœuds) et l'algorithme de suggestion intégré au Tableau de Bord guident l'étudiant dans cette progression continue.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/40 border border-border-strong p-4 rounded-2xl flex gap-3">
                    <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-foreground">100% Gratuit & Bénévole</h4>
                      <p className="text-2xs text-muted-text leading-normal font-semibold">
                        Rédigé sur mon temps libre sans abonnement ni collecte de données. Le catalogue de cours et d'outils est régulièrement enrichi à partir des retours d'utilisation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "guide" && (
                <motion.div
                  key="guide-tab"
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    Pour tirer le meilleur parti de l'application, utilise les différentes briques interactives :
                  </p>

                  <div className="space-y-3">
                    {/* Chapitres */}
                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500 font-extrabold text-xs shrink-0">
                        1
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Sélectionner un Chapitre</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          Navigue par niveau scolaire (Primaire, Collège, Lycée, Post-Bac). Chaque cours est interactif et te permet de modifier les paramètres des équations en temps réel.
                        </p>
                      </div>
                    </div>

                    {/* Exercices */}
                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500 font-extrabold text-xs shrink-0">
                        2
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Fiche Auto-évaluation & Mini-Quiz</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          À la fin de chaque cours, teste-toi ! Remplis les mini-quiz pour consolider tes connaissances et gagner de précieux badges thématiques.
                        </p>
                      </div>
                    </div>

                    {/* Glossaire & Bac à Sable */}
                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-500 font-extrabold text-xs shrink-0">
                        3
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Glossaire & Bac à Sable Interactif</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          Explore le Glossaire scientifique dans la liste des ressources. C'est un véritable outil de recherche disposant de son propre bac à sable pour expérimenter.
                        </p>
                      </div>
                    </div>

                    {/* Gamification */}
                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 font-extrabold text-xs shrink-0">
                        4
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Gamification & XP</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          La validation d'un cours te rapporte +15 XP. Un mini-défi de calcul rapide et une énigme secrète t'attendent sur la page Récompenses pour t'aider à progresser plus vite !
                        </p>
                      </div>
                    </div>

                    {/* Mode Parcours */}
                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-500 font-extrabold text-xs shrink-0">
                        5
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Mode Parcours & Spirale</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          Le Tableau de Bord analyse ta progression et te suggère le meilleur chapitre à étudier ensuite, selon la readiness de ses prérequis. C'est la <strong>pédagogie spiralaire</strong> appliquée à l'interface : un fil rouge qui t'accompagne de chapitre en chapitre.
                        </p>
                      </div>
                    </div>

                    {/* Nouveautés */}
                    <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-rose-50/60 to-amber-50/60 dark:from-rose-950/10 dark:to-amber-950/10 rounded-xl border border-rose-200/50 dark:border-rose-900/30">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 font-extrabold text-xs shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-extrabold text-foreground">🆕 Nouveautés de la Session</h4>
                        <ul className="text-2xs text-muted-text font-semibold leading-relaxed list-disc list-inside space-y-1">
                          <li><strong>Timeline Spirale</strong> visible après chaque validation — visualise où se situe le concept dans le graphe</li>
                          <li><strong>Connexions Personnelles</strong> — note dans quel contexte tu as croisé chaque notion</li>
                          <li><strong>Tableau de Bord enrichi</strong> — suggestions de cours, badges par domaine, timeline XP</li>
                          <li><strong>Page d'accueil</strong> — 3 piliers pédagogiques affichés, streak visible</li>
                          <li><strong>Graphe conceptuel</strong> — 126 nœuds interconnectés</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "tips" && (
                <motion.div
                  key="tips-tab"
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    Voici quelques conseils d'apprentissage testés scientifiquement pour mémoriser durablement et surmonter l'anxiété mathématique :
                  </p>

                  <div className="space-y-4">
                    {/* Routine de 5 min */}
                    <div className="bg-rose-500/[0.02] border border-rose-100 dark:border-rose-950/40 p-4 rounded-2xl space-y-1.5">
                      <h4 className="text-xs font-extrabold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-rose-500 animate-pulse" /> La Routine des 5 Minutes
                      </h4>
                      <p className="text-2xs text-muted-text leading-relaxed font-semibold">
                        Mieux vaut étudier 5 à 10 minutes chaque jour qu'une heure entière une fois par semaine. Utilise le système de <strong>Streak</strong> de l'application (cycle d'étude quotidien) pour activer l'ancrage mémoriel.
                      </p>
                    </div>

                    {/* Répétition Espacée */}
                    <div className="bg-indigo-500/[0.02] border border-indigo-100 dark:border-indigo-950/40 p-4 rounded-2xl space-y-1.5">
                      <h4 className="text-xs font-extrabold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                        <BrainCircuit className="w-4 h-4 text-indigo-500" /> Active la Répétition Espacée
                      </h4>
                      <p className="text-2xs text-muted-text leading-relaxed font-semibold">
                        Utilise les flashcards mnémotechniques deux ou trois fois par semaine. Le rappel actif force le cerveau à reconnecter ses synapses pour retrouver l'information, consolidant durablement la notion étudiée.
                      </p>
                    </div>

                    {/* Découper les concepts */}
                    <div className="bg-emerald-500/[0.02] border border-emerald-100 dark:border-emerald-950/40 p-4 rounded-2xl space-y-1.5">
                      <h4 className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Découpe en actions miniatures
                      </h4>
                      <p className="text-2xs text-muted-text leading-relaxed font-semibold">
                        Face à un théorème complexe {"(comme Euler ou les suites)"}, n'essaie pas de tout apprendre en une traite. Analyse d'abord l'interprétation graphique du cours, puis l'équation, et enfin passe au mini-jeu de calcul pour détendre ton cerveau.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "graph" && (
                <motion.div
                  key="graph-tab"
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    Les mathématiques ne sont pas une succession de chapitres isolés, mais un <strong>graphe vivant de concepts interconnectés</strong>. La Carte Conceptuelle te permet de visualiser cette architecture.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-500 font-extrabold text-xs shrink-0">
                        1
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Exploration Visuelle</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          Parcours le graphe de 126 nœuds classés par domaine (Nombres, Algèbre, Analyse, Géométrie, Probabilités, Algorithmique). Chaque nœud est un cours, coloré par niveau scolaire.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-500 font-extrabold text-xs shrink-0">
                        <Eye className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Survol Intelligent</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          Passe la souris sur un nœud : sa lignée pédagogique s'illumine — les prérequis en vert, les notions suivantes en indigo. Tu vois d'un coup d'œil où tu te situes dans la spirale.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-500 font-extrabold text-xs shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Navigation Contextuelle</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          Clique sur un nœud pour voir ses dépendances en détail, puis lance le cours directement. Chaque cours affiche son propre "Fil d'Ariane" 🌱🌸 en haut de page.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-500 font-extrabold text-xs shrink-0">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Pédagogie Spiralaire</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          Le graphe incarne la pédagogie spiralaire : une notion naît au primaire, s'épaissit au collège, se formalise au lycée et s'approfondit dans le supérieur. Suis les flèches pour voyager à travers les niveaux.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-xl border border-border-strong/40">
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-500 font-extrabold text-xs shrink-0">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-extrabold text-foreground">Navigation Suggestive</h4>
                        <p className="text-2xs text-muted-text font-semibold leading-normal">
                          L'algorithme du "Mode Parcours" utilise ce même graphe pour te suggérer le prochain cours : il analyse les prérequis déjà satisfaits et te propose le successeur le plus prêt à être abordé. Retrouve-le dans la carte "Continuer ma Spirale" du Tableau de Bord.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-50/50 dark:bg-cyan-950/10 border border-cyan-100/60 dark:border-cyan-950/50 p-4 rounded-2xl flex gap-3">
                    <Eye className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-foreground">Astuce</h4>
                      <p className="text-2xs text-muted-text leading-relaxed font-semibold">
                        Utilise la molette pour zoomer, glisse pour te déplacer, et active les filtres pour te concentrer sur un domaine ou un niveau spécifique. Le Mode Parcours est accessible depuis l'accueil et la sidebar.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "tech" && (
                <motion.div
                  key="tech-tab"
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    Cette application privilégie un code propre, modulaire et extrêmement rapide pour offrir la meilleure interactivité :
                  </p>

                  <div className="space-y-3 font-semibold text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border-strong/50">
                      <span className="text-muted-text text-2xs">Framework Core</span>
                      <span className="font-mono text-2xs text-foreground bg-muted px-2.5 py-1 rounded border border-border-strong/40">React 19 & TypeScript Strict</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border-strong/50">
                      <span className="text-muted-text text-2xs">Moteur Graphique / Animations</span>
                      <span className="font-mono text-2xs text-foreground bg-muted px-2.5 py-1 rounded border border-border-strong/40">TailwindCSS & Framer Motion / Custom SVG</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border-strong/50">
                      <span className="text-muted-text text-2xs">Moteur d'Édition Mathématique</span>
                      <span className="font-mono text-2xs text-foreground bg-muted px-2.5 py-1 rounded border border-border-strong/40">KaTeX / rehype-katex / Markdown</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border-strong/50">
                      <span className="text-muted-text text-2xs">Persistance des Données Client</span>
                      <span className="font-mono text-2xs text-foreground bg-muted px-2.5 py-1 rounded border border-border-strong/40">Local Storage & Reactive State listener</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border-strong/50">
                      <span className="text-muted-text text-2xs">Génération Sonore</span>
                      <span className="font-mono text-2xs text-foreground bg-muted px-2.5 py-1 rounded border border-border-strong/40">Web Audio API (Fréquences Synthétisées)</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-border-strong/50">
                      <span className="text-muted-text text-2xs">Conception Assistée</span>
                      <span className="font-mono text-2xs text-foreground bg-muted px-2.5 py-1 rounded border border-border-strong/40">IA (code, schémas, contenu, recherche)</span>
                    </div>
                  </div>

                  <div className="bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100/60 dark:border-indigo-950/50 p-4 rounded-2xl flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-foreground">Hébergement Responsable</h4>
                      <p className="text-2xs text-muted-text leading-normal">
                        Déployé sur des containers durables et hautement optimisés. Temps d'affichage initial inférieur à 0.4s sur mobile et desktop.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Bar */}
          <div className="px-6 md:px-8 py-4 bg-muted/20 border-t border-border-strong/40 flex justify-end gap-2.5">
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-extrabold text-xs cursor-pointer transition-all active:scale-95 shadow-sm"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
