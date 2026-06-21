import React, { useState, useEffect } from "react";
import { 
  X, 
  Menu, 
  BookOpen, 
  GraduationCap, 
  ChevronRight, 
  ChevronDown, 
  Calculator, 
  Sigma, 
  BookA, 
  Search, 
  CheckCircle2, 
  Sun, 
  Moon, 
  LayoutDashboard, 
  Sparkles, 
  Folder, 
  Info, 
  PanelLeftClose, 
  Trophy, 
  Activity,
  Network,
  Settings 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogoTitle from "./AnimatedLogoTitle";
import { Course } from "../types";
import { useLocalAccount } from "../hooks/useLocalAccount";

const POST_BAC_CATEGORY_CONFIG = [
  {
    id: "CPGE",
    label: "CPGE",
    subLevels: ["CPGE", "CPGE_ECG", "CPGE_BL"],
  },
  {
    id: "BUT",
    label: "BUT",
    subLevels: ["BUT_GEA", "BUT_GEII", "BUT_Industriel", "BUT_Tertiaire", "BUT"],
  },
  {
    id: "LICENCES",
    label: "LICENCES",
    subLevels: [
      "Tronc_Commun",
      "Analyse_L1",
      "Analyse_L2",
      "Algebre_L1_L2",
      "Probabilites",
      "Universite_L2_L3",
      "Licence_Maths",
      "Licence_MIASHS"
    ],
  },
  {
    id: "BTS",
    label: "BTS",
    subLevels: ["BTS_Industriel", "BTS_Tertiaire", "BTS", "BTS_CG"],
  },
  {
    id: "ECOLES_SUP",
    label: "ECOLES SUP",
    subLevels: ["Prep_Ingenieur", "Ingenieur_IA_Data", "Sup_Eco", "Sup_Finance", "Sup_Bio"],
  },
];

const getPostBacCategoryId = (subLevel: string): string | null => {
  for (const cat of POST_BAC_CATEGORY_CONFIG) {
    if (cat.subLevels.includes(subLevel)) return cat.id;
  }
  return null;
};

const subLevelLabels: Record<string, string> = {
  PS: "Maternelle - Petite Section",
  MS: "Maternelle - Moyenne Section",
  GS: "Maternelle - Grande Section",
  CP: "Primaire - CP",
  CE1: "Primaire - CE1",
  CE2: "Primaire - CE2",
  CM1: "Primaire - CM1",
  CM2: "Primaire - CM2",
  "6eme": "Collège - 6ème",
  "5eme": "Collège - 5ème",
  "4eme": "Collège - 4ème",
  "3eme": "Collège - 3ème",
  Seconde: "Lycée - Seconde Générale",
  Premiere: "Lycée - Première Générale",
  Terminale: "Lycée - Terminale Générale",
  Terminale_Complementaires: "Lycée - Options Complémentaires",
  Terminale_Expertes: "Lycée - Spécialité Expertes",
  Professionnel: "Lycée - Voie Professionnelle",
  Technologique: "Lycée - Voie Technologique",
  Tronc_Commun: "Université - Tronc Commun L1/L2",
  Analyse_L1: "Licence L1 - Analyse & Intégration",
  Analyse_L2: "Licence L2 - Analyse & Séries",
  Algebre_L1_L2: "Licence L1/L2 - Algèbre & Structures",
  Probabilites: "Licence L2/L3 - Probabilités",
  Universite_L2_L3: "Licence L3 & Master - Calcul Avancé",
  Licence_Maths: "Licence Maths Fondamentales",
  Licence_MIASHS: "Licence MIASHS",
  CPGE: "CPGE Scientifique",
  CPGE_ECG: "CPGE Commerce",
  CPGE_BL: "CPGE BL",
  Prep_Ingenieur: "Sup Ingenierie",
  Ingenieur_IA_Data: "Sup IA & Data Science",
  Sup_Eco: "Sup Eco",
  Sup_Finance: "Sup Finance",
  Sup_Bio: "Sup Bio",
  BUT: "BUT Informatique",
  BUT_GEA: "BUT GEA - Mathématiques de Gestion",
  BUT_GEII: "BUT GEII - Génie Électrique & Informatique",
  BUT_Industriel: "BUT Génie Industriel (GIM / GMP / QLIO)",
  BUT_Tertiaire: "BUT Tertiaire (GEA / TC / MLT)",
  BTS: "BTS SIO",
  BTS_CG: "BTS Tertiaire",
  BTS_Industriel: "BTS Industriel",
  BTS_Tertiaire: "BTS Tertiaire (CG/etc.)",
  Autres: "Autres formations",
  Communes: "Ressources communes",
};

const formatSubLevelName = (subLevel: string): string => {
  return subLevelLabels[subLevel] || subLevel.replace(/_/g, " ");
};

const getLevelIcon = (level: string) => {
  if (level.includes("Primaire")) return <BookA className="w-4 h-4" />;
  if (level.includes("College")) return <BookOpen className="w-4 h-4" />;
  if (level.includes("Lycee")) return <Calculator className="w-4 h-4" />;
  if (level.includes("PostBac")) return <Sigma className="w-4 h-4" />;
  return <GraduationCap className="w-4 h-4" />;
};

interface SidebarProps {
  selectedCourse: Course | null;
  isDashboard: boolean;
  isRewards: boolean;
  isSettings: boolean;
  isGraph: boolean;
  isGlossaireSelected: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  handleCourseSelect: (course: Course) => void;
  filteredCourses: Course[];
  groupedCourses: Record<string, Record<string, Course[]>>;
  getProgress: (id: string) => any;
  stats: any;
  account: ReturnType<typeof useLocalAccount>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (val: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (val: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  navigate: (path: string) => void;
  setIsGrapherOpen: (val: boolean) => void;
  setIsInfoOpen: (val: boolean) => void;
  setIsOnboardingOpen: (val: boolean) => void;
  subLevelOrder: string[];
}

export default function Sidebar({
  selectedCourse,
  isDashboard,
  isRewards,
  isSettings,
  isGraph,
  isGlossaireSelected,
  searchQuery,
  setSearchQuery,
  handleCourseSelect,
  filteredCourses,
  groupedCourses,
  getProgress,
  stats,
  account,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isDarkMode,
  setIsDarkMode,
  navigate,
  setIsGrapherOpen,
  setIsInfoOpen,
  setIsOnboardingOpen,
  subLevelOrder,
}: SidebarProps) {
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});
  const [expandedSubLevels, setExpandedSubLevels] = useState<Record<string, boolean>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (selectedCourse && !searchQuery.trim()) {
      setExpandedLevels((prev) => ({ ...prev, [selectedCourse.level]: true }));
      if (selectedCourse.subLevel) {
        setExpandedSubLevels((prev) => ({
          ...prev,
          [selectedCourse.subLevel!]: true,
        }));
        if (selectedCourse.level === "Post_Bac") {
          const catId = getPostBacCategoryId(selectedCourse.subLevel);
          if (catId) {
            setExpandedCategories((prev) => ({
              ...prev,
              [catId]: true,
            }));
          }
        }
      }
    }
  }, [selectedCourse, searchQuery]);

  const toggleLevel = (level: string) => {
    setExpandedLevels((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  const toggleSubLevel = (subLevel: string) => {
    setExpandedSubLevels((prev) => ({ ...prev, [subLevel]: !prev[subLevel] }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <nav
      aria-label="Menu principal"
      className={`fixed inset-y-0 left-0 z-50 bg-sidebar border-sidebar-border transform flex flex-col shadow-2xl md:shadow-none transition-all duration-300 ease-in-out md:relative md:overflow-hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} ${isSidebarCollapsed ? "md:-translate-x-full md:w-0 md:min-w-0 md:max-w-0 md:opacity-0 md:border-r-0 pointer-events-none" : "md:translate-x-0 w-80 md:w-80 md:min-w-80 md:opacity-100 border-r"}`}
    >
      <div className="w-80 flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between cursor-pointer">
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={() => navigate("/")}
            title="Accueil - Guide Mathématiques"
          >
            <AnimatedLogoTitle size="sm" showSubtitle={false} />
          </div>
          <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-muted-text hover:bg-muted transition-colors cursor-pointer"
              aria-label="Basculer le thème"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            
            {/* Desktop Collapse Button */}
            <button
              onClick={() => setIsSidebarCollapsed(true)}
              className="hidden md:flex p-2 rounded-lg text-muted-text hover:bg-muted hover:text-primary transition-all duration-200 cursor-pointer"
              aria-label="Réduire le menu"
              title="Réduire le menu"
            >
              <PanelLeftClose className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex md:hidden p-2 rounded-lg text-muted-text hover:bg-muted hover:text-primary transition-all duration-200 cursor-pointer"
              aria-label="Fermer le menu"
              title="Fermer le menu"
            >
              <X className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </button>
          </div>
        </div>

        {/* Dashboard Button */}
        <div className="px-4 pt-4 bg-sidebar select-none">
          <button
            onClick={() => navigate("/dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isDashboard
                ? "bg-primary text-white shadow-md"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Tableau de Bord
            <div
              className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${
                isDashboard ? "bg-white/20" : "bg-primary/10 text-primary"
              }`}
            >
              Niv. {stats.level}
            </div>
          </button>
        </div>

        {/* Concept Graph Button */}
        <div className="px-4 pt-2 bg-sidebar select-none">
          <button
            onClick={() => navigate("/graph")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isGraph
                ? "bg-primary text-white shadow-md"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            <Network className="w-5 h-5" />
            Carte Conceptuelle
            <div
              className={`ml-auto px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                isGraph ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
              }`}
            >
              Réseau
            </div>
          </button>
        </div>

        {/* Glossaire Button */}
        <div className="px-4 pt-2 bg-sidebar select-none">
          <button
            onClick={() => navigate("/cours/05_Ressources/Glossaire")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isGlossaireSelected
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Glossaire de Maths
            <div
              className={`ml-auto px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                isGlossaireSelected ? "bg-white/20 text-white" : "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
              }`}
            >
              V6 • Animé
            </div>
          </button>
        </div>

        {/* Rewards Button */}
        <div className="px-4 pt-2 bg-sidebar select-none">
          <button
            onClick={() => navigate("/rewards")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isRewards
                ? "bg-amber-500 text-white shadow-md shadow-amber-400/20"
                : "bg-muted/50 text-gradient-amber hover:bg-muted"
            }`}
          >
            <Trophy className="w-5 h-5 text-amber-500" />
            Récompenses & Défis
            <div
              className={`ml-auto px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                isRewards ? "bg-white/20 text-white" : "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
              }`}
            >
              🏅 {stats.badges.length} / 10
            </div>
          </button>
        </div>

        {/* Settings Button */}
        <div className="px-4 pt-2 bg-sidebar select-none">
          <button
            onClick={() => navigate("/settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isSettings
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                : "bg-muted/50 text-foreground hover:bg-muted"
            }`}
          >
            <Settings className={`w-5 h-5 ${isSettings ? "text-white" : "text-indigo-500"}`} />
            Paramètres & Profil
            {account.profile.pseudo ? (
              <div
                className={`ml-auto px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider truncate max-w-[100px] flex items-center gap-1 ${
                  isSettings ? "bg-white/20 text-white" : "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                }`}
              >
                <span>{account.getActiveAvatar().emoji}</span>
                <span className="truncate">{account.profile.pseudo}</span>
              </div>
            ) : (
              <div
                className={`ml-auto px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                  isSettings ? "bg-white/20 text-white" : "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                }`}
              >
                Config.
              </div>
            )}
          </button>
        </div>

        <div className="px-4 py-4 border-b border-sidebar-border bg-sidebar">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-text-subtle"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              aria-label="Rechercher un cours"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted text-foreground border-transparent focus:bg-card focus:border-primary focus:ring-2 focus:ring-primary-light rounded-xl text-sm transition-all outline-none"
            />
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto bg-sidebar">
          {filteredCourses.length === 0 ? (
            <div className="text-center text-muted-text py-8 text-sm">
              Aucun cours trouvé pour "{searchQuery}"
            </div>
          ) : searchQuery.trim() !== "" ? (
            filteredCourses.map((course) => {
              const courseProgress = getProgress(course.id);
              const isCompleted = courseProgress?.completed;
              const quizScore = courseProgress?.quizScore;

              return (
                <button
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  aria-current={
                    selectedCourse?.id === course.id ? "page" : undefined
                  }
                  className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-all duration-200 group flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary ${
                    selectedCourse?.id === course.id && !isDashboard
                      ? "bg-sidebar-active border border-sidebar-active-border shadow-sm"
                      : "hover:bg-sidebar-hover border border-transparent"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div
                      className={`flex items-center space-x-1.5 text-[0.65rem] mb-1.5 font-bold uppercase tracking-widest transition-colors ${
                        selectedCourse?.id === course.id && !isDashboard
                          ? "text-primary"
                          : "text-muted-text-subtle group-hover:text-muted-text"
                      }`}
                    >
                      {getLevelIcon(course.level)}
                      <span className="truncate mt-0.5">
                        {course.level.replace(/_/g, " ")}{" "}
                        {course.subLevel
                          ? `> ${formatSubLevelName(course.subLevel)}`
                          : ""}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`font-semibold tracking-tight truncate transition-colors ${
                          selectedCourse?.id === course.id && !isDashboard
                            ? "text-primary-hover"
                            : "text-foreground group-hover:text-primary-hover"
                        }`}
                      >
                        {course.title}
                      </div>
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    {quizScore && !isCompleted && (
                      <div className="text-xs text-muted-text mt-1">
                        Quiz: {quizScore.score}/{quizScore.total}
                      </div>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      selectedCourse?.id === course.id && !isDashboard
                        ? "text-primary translate-x-1"
                        : "text-muted-text-subtle group-hover:text-muted-text"
                    }`}
                  />
                </button>
              );
            })
          ) : (
            Object.keys(groupedCourses).map((level) => {
              const subLevelsObj = groupedCourses[level] || {};
              const subLevels = Object.keys(subLevelsObj);

              if (subLevels.length === 0) return null;

              const isExpanded = expandedLevels[level];
              const displayLevel = level.replace("_", " ");

              const sortedSubLevels = subLevels.sort((a, b) => {
                const indexA = subLevelOrder.indexOf(a);
                const indexB = subLevelOrder.indexOf(b);
                if (indexA === -1 && indexB === -1) return a.localeCompare(b);
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
              });

              if (level === "Post_Bac") {
                const isExpandedPostBac = expandedLevels[level];
                const displayLevelPostBac = "POST BAC";

                return (
                  <div
                    key={level}
                    className="mb-2 border-b border-sidebar-border pb-2 last:border-0"
                  >
                    <button
                      onClick={() => toggleLevel(level)}
                      className="w-full text-left px-2 py-2 rounded-lg flex items-center justify-between text-foreground hover:bg-muted font-bold transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {getLevelIcon(level)}
                        <span className="uppercase tracking-wider text-xs">
                          {displayLevelPostBac}
                        </span>
                      </div>
                      {isExpandedPostBac ? (
                        <ChevronDown className="w-4 h-4 text-muted-text" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-text" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpandedPostBac && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-2"
                        >
                          {POST_BAC_CATEGORY_CONFIG.map((category) => {
                            const isCatExpanded = expandedCategories[category.id];
                            
                            // Check if this category has any courses in any of its sublevels
                            const totalCoursesInCat = category.subLevels.reduce((acc, subL) => {
                              return acc + (subLevelsObj[subL]?.length || 0);
                            }, 0);

                            return (
                              <div key={category.id} className="mt-1 border-l border-sidebar-border/50 pl-2">
                                <button
                                  onClick={() => toggleCategory(category.id)}
                                  className="w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between text-foreground/95 hover:text-foreground hover:bg-muted/60 font-bold text-xs uppercase tracking-wider transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <Folder className="w-3.5 h-3.5 text-primary" />
                                    <span>{category.label}</span>
                                    <span className="text-[10px] text-muted-text/60 font-medium lowercase">
                                      ({totalCoursesInCat} cours)
                                    </span>
                                  </div>
                                  {isCatExpanded ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-muted-text" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-text" />
                                  )}
                                </button>

                                <AnimatePresence>
                                  {isCatExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden pl-2 mt-1 space-y-1"
                                    >
                                      {category.subLevels.map((subLevel) => {
                                        const coursesInSubLevel = (subLevelsObj[subLevel] || [])
                                          .slice()
                                          .sort((a, b) => (a.order || 0) - (b.order || 0));
                                        
                                        const isSubExpanded = expandedSubLevels[subLevel];
                                        const displaySubLevel = formatSubLevelName(subLevel);
                                        const hasCourses = coursesInSubLevel.length > 0;

                                        return (
                                          <div key={subLevel} className="mt-1">
                                            <button
                                              onClick={() => hasCourses ? toggleSubLevel(subLevel) : null}
                                              className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between text-foreground/80 hover:text-foreground hover:bg-muted/50 font-semibold text-sm transition-colors ${
                                                !hasCourses ? "opacity-60 cursor-default" : ""
                                              }`}
                                            >
                                              <span className="truncate">{displaySubLevel}</span>
                                              {hasCourses ? (
                                                isSubExpanded ? (
                                                  <ChevronDown className="w-3 h-3" />
                                                ) : (
                                                  <ChevronRight className="w-3 h-3" />
                                                )
                                              ) : (
                                                <span className="text-[9px] font-bold text-orange-500 bg-orange-100 dark:bg-orange-950/40 px-1.5 py-0.5 rounded uppercase">Bientôt</span>
                                              )}
                                            </button>

                                            <AnimatePresence>
                                              {isSubExpanded && hasCourses && (
                                                <motion.div
                                                  initial={{ height: 0, opacity: 0 }}
                                                  animate={{ height: "auto", opacity: 1 }}
                                                  exit={{ height: 0, opacity: 0 }}
                                                  transition={{ duration: 0.2 }}
                                                  className="overflow-hidden pl-3 mt-1 space-y-1 relative before:absolute before:left-1 before:top-0 before:bottom-0 before:w-px before:bg-border-strong"
                                                >
                                                  {coursesInSubLevel.map((course) => {
                                                    const courseProgress = getProgress(course.id);
                                                    const isCompleted = courseProgress?.completed;
                                                    const isSelected = selectedCourse?.id === course.id && !isDashboard;

                                                    return (
                                                      <button
                                                        key={course.id}
                                                        onClick={() => handleCourseSelect(course)}
                                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-start gap-2 relative ${
                                                          isSelected
                                                            ? "bg-primary/10 text-primary font-medium"
                                                            : "text-muted-text hover:text-foreground hover:bg-muted"
                                                        }`}
                                                      >
                                                        {isSelected && (
                                                          <span className="absolute left-[-13px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                                                        )}

                                                        {isCompleted ? (
                                                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                        ) : (
                                                          <div className="w-4 h-4 rounded-full border-2 border-muted-text/30 mt-0.5 flex-shrink-0" />
                                                        )}

                                                        <span className="line-clamp-2 leading-tight">
                                                          {course.title
                                                            .replace(/Chapitre \d+ : /, "")
                                                            .replace(/Thème : /, "")
                                                            .replace(/Maths Expertes - Chapitre \d+ : /, "")
                                                          }
                                                        </span>
                                                      </button>
                                                    );
                                                  })}
                                                </motion.div>
                                              )}
                                            </AnimatePresence>
                                          </div>
                                        );
                                      })}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (level === "Ressources") {
                const isExpandedRessources = expandedLevels[level];
                const displayLevelRessources = "RESSOURCES";
                
                // Flatten all subLevels of Ressources to list items directly
                const coursesInLevel = Object.values(subLevelsObj)
                  .flat()
                  .sort((a, b) => (a.order || 0) - (b.order || 0));

                return (
                  <div
                    key={level}
                    className="mb-2 border-b border-sidebar-border pb-2 last:border-0"
                  >
                    <button
                      onClick={() => toggleLevel(level)}
                      className="w-full text-left px-2 py-2 rounded-lg flex items-center justify-between text-foreground hover:bg-muted font-bold transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {getLevelIcon(level)}
                        <span className="uppercase tracking-wider text-xs">
                          {displayLevelRessources}
                        </span>
                      </div>
                      {isExpandedRessources ? (
                        <ChevronDown className="w-4 h-4 text-muted-text" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-text" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpandedRessources && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-2"
                        >
                          <div className="pl-3 mt-1 space-y-1 border-l border-sidebar-border/50 relative">
                            {coursesInLevel.map((course) => {
                              const courseProgress = getProgress(course.id);
                              const isCompleted = courseProgress?.completed;
                              const isSelected = selectedCourse?.id === course.id && !isDashboard;

                              return (
                                <button
                                  key={course.id}
                                  onClick={() => handleCourseSelect(course)}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-start gap-2 relative ${
                                    isSelected
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "text-muted-text hover:text-foreground hover:bg-muted"
                                  }`}
                                >
                                  {isSelected && (
                                    <span className="absolute left-[-13px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                                  )}

                                  {isCompleted ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-muted-text/30 mt-0.5 flex-shrink-0" />
                                  )}

                                  <span className="line-clamp-2 leading-tight">
                                    {course.title}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <div
                  key={level}
                  className="mb-2 border-b border-sidebar-border pb-2 last:border-0"
                >
                  <button
                    onClick={() => toggleLevel(level)}
                    className="w-full text-left px-2 py-2 rounded-lg flex items-center justify-between text-foreground hover:bg-muted font-bold transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      {getLevelIcon(level)}
                      <span className="uppercase tracking-wider text-xs">
                        {displayLevel}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-text" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-text" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-2"
                      >
                        {sortedSubLevels.map((subLevel) => {
                          const coursesInSubLevel = subLevelsObj[subLevel]
                            .slice()
                            .sort((a, b) => (a.order || 0) - (b.order || 0));
                          const isSubExpanded = expandedSubLevels[subLevel];
                          const displaySubLevel = formatSubLevelName(subLevel);

                          return (
                            <div key={subLevel} className="mt-1">
                              <button
                                onClick={() => toggleSubLevel(subLevel)}
                                className="w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between text-foreground/80 hover:text-foreground hover:bg-muted/50 font-semibold text-sm transition-colors"
                              >
                                <span>{displaySubLevel}</span>
                                {isSubExpanded ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronRight className="w-3 h-3" />
                                )}
                              </button>

                              <AnimatePresence>
                                {isSubExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden pl-3 mt-1 space-y-1 relative before:absolute before:left-1 before:top-0 before:bottom-0 before:w-px before:bg-border-strong"
                                  >
                                    {coursesInSubLevel.map((course) => {
                                      const courseProgress = getProgress(
                                        course.id,
                                      );
                                      const isCompleted =
                                        courseProgress?.completed;
                                      const isSelected =
                                        selectedCourse?.id === course.id &&
                                        !isDashboard;

                                      return (
                                        <button
                                          key={course.id}
                                          onClick={() =>
                                            handleCourseSelect(course)
                                          }
                                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-start gap-2 relative ${
                                            isSelected
                                              ? "bg-primary/10 text-primary font-medium"
                                              : "text-muted-text hover:text-foreground hover:bg-muted"
                                          }`}
                                        >
                                          {isSelected && (
                                            <span className="absolute left-[-13px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                                          )}

                                          {isCompleted ? (
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                          ) : (
                                            <div className="w-4 h-4 rounded-full border-2 border-muted-text/30 mt-0.5 flex-shrink-0" />
                                          )}

                                          <span className="line-clamp-2 leading-tight">
                                            {course.title
                                              .replace(/Chapitre \d+ : /, "")
                                              .replace(/Thème : /, "")
                                              .replace(
                                                /Maths Expertes - Chapitre \d+ : /,
                                                "",
                                              )}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar flex flex-col gap-2 shrink-0 no-print">
          <button
            onClick={() => setIsGrapherOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs text-muted-text hover:text-foreground hover:bg-muted transition-all active:scale-95 text-left bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="truncate">Grapheur Virtuel</span>
          </button>

          <button
            onClick={() => setIsInfoOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-xs text-muted-text hover:text-foreground hover:bg-muted transition-all active:scale-95 text-left"
          >
            <Info className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">À propos de l'Auteur</span>
          </button>
          
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 bg-muted/40 hover:bg-muted text-muted-text hover:text-foreground rounded-xl text-[11px] font-bold transition-all active:scale-95 text-left"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
            <span className="truncate">Présentation du Guide</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
