import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCourses } from "./hooks/useCourses";
import { useProgress } from "./hooks/useProgress";
import { Course } from "./types";
import Dashboard from "./components/Dashboard";
import Rewards from "./components/Rewards";
import { playLvlUpSound, playBadgeUnlockSound } from "./utils/sound";
import confetti from "canvas-confetti";
import { MathContainer } from "./components/MathContainer";
import OnboardingModal from "./components/OnboardingModal";
import InfoModal from "./components/InfoModal";
import MathGrapherModal from "./components/MathGrapherModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calculator,
  Sigma,
  PanelLeftOpen,
} from "lucide-react";

import CourseContent from "./components/CourseContent";
import Sidebar from "./components/Sidebar";
import { normalizeString, getCourseKeywords } from "./utils/search";

export default function App() {
  const {
    courses,
    loading,
    loadCourseContent,
    activeCourseContent,
    loadingCourseId,
  } = useCourses();
  const { progress, validateCourse, saveQuizScore, getProgress, stats } =
    useProgress();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Modal states & automatic first-time onboarding check
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isGrapherOpen, setIsGrapherOpen] = useState(false);

  // Surveiller les changements de niveau et de badges pour célébrations sonores et graphiques
  const prevLevelRef = useRef(stats.level);
  const prevBadgesCountRef = useRef(stats.badges.length);

  useEffect(() => {
    // Éviter le déclenchement au montage initial si c'est la valeur par défaut ou s'il n'y a pas d'écart
    if (stats.level > prevLevelRef.current) {
      playLvlUpSound();
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
    prevLevelRef.current = stats.level;
  }, [stats.level]);

  useEffect(() => {
    if (stats.badges.length > prevBadgesCountRef.current) {
      playBadgeUnlockSound();
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }
    prevBadgesCountRef.current = stats.badges.length;
  }, [stats.badges.length]);

  useEffect(() => {
    const completed = localStorage.getItem("onboarding-completed");
    if (completed !== "true") {
      setIsOnboardingOpen(true);
    }
  }, []);

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Handle routing
  useEffect(() => {
    if (courses.length === 0) return;

    const path = decodeURIComponent(location.pathname);
    if (path.startsWith("/cours/")) {
      const slug = path.replace("/cours/", "");
      const courseId = `/Cours_Math/${slug}.md`;
      const course = courses.find((c) => c.id === courseId);

      if (course && course.id !== selectedCourse?.id) {
        setSelectedCourse(course);
        loadCourseContent(course.id);
      }
    } else if (path === "/" || path === "/dashboard" || path === "/rewards") {
      setSelectedCourse(null);
    }
  }, [location.pathname, courses]);

  // Close mobile menu when a course is selected
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [selectedCourse, location.pathname]);

  const handleCourseSelect = (course: Course) => {
    const slug = course.id.replace("/Cours_Math/", "").replace(".md", "");
    navigate(`/cours/${slug}`);
  };

  const handleQuizComplete = (score: number, total: number) => {
    if (selectedCourse) {
      saveQuizScore(selectedCourse.id, score, total);
    }
  };

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    
    const searchTerms = searchQuery
      .trim()
      .split(/\s+/)
      .map((term) => normalizeString(term))
      .filter(Boolean);

    if (searchTerms.length === 0) return courses;

    return courses.filter((course) => {
      const courseTags = getCourseKeywords(course);
      return searchTerms.every((term) =>
        courseTags.some((tag) => tag.includes(term))
      );
    });
  }, [courses, searchQuery]);

  const groupedCourses = useMemo(() => {
    const levelOrder = ["Maternelle", "Primaire", "College", "Lycee", "Post_Bac", "Autres", "Ressources"];
    const groups: Record<string, Record<string, Course[]>> = {};

    levelOrder.forEach((l) => (groups[l] = {}));

    filteredCourses.forEach((course) => {
      const level = course.level;
      const subLevel = course.subLevel || "Général";

      if (!groups[level]) groups[level] = {};
      if (!groups[level][subLevel]) groups[level][subLevel] = [];

      groups[level][subLevel].push(course);
    });

    return groups;
  }, [filteredCourses]);

  const isLoadingCurrentCourse = loadingCourseId === selectedCourse?.id;
  const isDashboard = location.pathname === "/dashboard";
  const isRewards = location.pathname === "/rewards";
  const isGlossaireSelected = selectedCourse?.id === "/Cours_Math/05_Ressources/Glossaire.md" && !isDashboard && !isRewards;

  const subLevelOrder = [
    "PS",
    "MS",
    "GS",
    "CP",
    "CE1",
    "CE2",
    "CM1",
    "CM2",
    "6eme",
    "5eme",
    "4eme",
    "3eme",
    "Seconde",
    "Premiere",
    "Terminale",
    "Terminale_Complementaires",
    "Terminale_Expertes",
    "Professionnel",
    "Technologique",
    "Tronc_Commun",
    "Analyse_L1",
    "Analyse_L2",
    "Algebre_L1_L2",
    "Probabilites",
    "Universite_L2_L3",
    "Licence_Maths",
    "Licence_MIASHS",
    "CPGE",
    "CPGE_ECG",
    "CPGE_BL",
    "Prep_Ingenieur",
    "Ingenieur_IA_Data",
    "Sup_Eco",
    "Sup_Finance",
    "Sup_Bio",
    "BUT_GEA",
    "BUT_GEII",
    "BUT_Industriel",
    "BUT_Tertiaire",
    "BUT",
    "BTS_Industriel",
    "BTS",
    "BTS_CG",
    "Autres",
    "Communes",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-muted-text">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Calculator className="w-8 h-8 text-primary" />
        </motion.div>
        <span className="ml-3 font-medium">Chargement des cours...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden transition-colors duration-200">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border z-40 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sigma className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1
            className="text-xl font-bold text-foreground cursor-pointer"
            onClick={() => navigate("/")}
          >
            Guide Maths
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-muted text-muted-text hover:bg-border-strong transition-colors"
            aria-label="Basculer le thème"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
            className="p-2 rounded-lg bg-muted text-muted-text hover:bg-border-strong transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
            className="md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm dark:bg-black/50"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <Sidebar
        selectedCourse={selectedCourse}
        isDashboard={isDashboard}
        isRewards={isRewards}
        isGlossaireSelected={isGlossaireSelected}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleCourseSelect={handleCourseSelect}
        filteredCourses={filteredCourses}
        groupedCourses={groupedCourses}
        getProgress={getProgress}
        stats={stats}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        navigate={navigate}
        setIsGrapherOpen={setIsGrapherOpen}
        setIsInfoOpen={setIsInfoOpen}
        setIsOnboardingOpen={setIsOnboardingOpen}
        subLevelOrder={subLevelOrder}
      />

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto bg-background transition-all duration-300 relative ${isSidebarCollapsed ? "pt-24 px-4 md:px-12" : "pt-16 md:pt-6 px-4 md:px-8"}`}>
        {/* Toggle Sidebar Button for Desktop when Collapsed */}
        {isSidebarCollapsed && (
          <button
            onClick={() => setIsSidebarCollapsed(false)}
            className="hidden md:flex fixed top-5 left-5 z-40 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all active:scale-95 shadow-lg shadow-indigo-500/5 cursor-pointer animate-in fade-in slide-in-from-left-2 duration-300"
            title="Afficher le menu"
            aria-label="Afficher le menu"
          >
            <PanelLeftOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </button>
        )}

        <AnimatePresence mode="wait">
          {isDashboard ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-8"
            >
              <Dashboard stats={stats} groupedCourses={groupedCourses} progress={progress} subLevelOrder={subLevelOrder} />
            </motion.div>
          ) : isRewards ? (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-8"
            >
              <Rewards stats={stats} />
            </motion.div>
          ) : selectedCourse ? (
            <motion.div
              key={selectedCourse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-4 md:p-8 lg:p-12 w-full max-w-6xl mx-auto min-h-screen"
            >
              <MathContainer key={selectedCourse.id}>
                <CourseContent
                  course={selectedCourse}
                  activeCourseContent={activeCourseContent}
                  isLoadingCurrentCourse={isLoadingCurrentCourse}
                  onQuizComplete={handleQuizComplete}
                  courseProgress={getProgress(selectedCourse.id)}
                  onValidateCourse={() => validateCourse(selectedCourse.id)}
                />
              </MathContainer>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center h-full text-muted-text-subtle p-8 text-center"
            >
              <div className="w-24 h-24 bg-card rounded-3xl shadow-sm border border-border-strong flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-primary opacity-50" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                Sélectionnez un cours
              </h2>
              <p className="text-muted-text max-w-md">
                Choisissez un chapitre dans le menu de gauche pour commencer
                votre apprentissage interactif des mathématiques.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
      <MathGrapherModal isOpen={isGrapherOpen} onClose={() => setIsGrapherOpen(false)} />
    </div>
  );
}
