import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  BookOpen, 
  GraduationCap, 
  Medal, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  Award, 
  Target,
  ChevronRight,
  Brain,
  Calendar,
  Check,
  Percent,
  Lock,
  Unlock,
  Save
} from 'lucide-react';
import { Course } from '../types';
import { CourseProgress } from '../hooks/useProgress';
import { useLocalAccount } from '../hooks/useLocalAccount';

interface DashboardProps {
  stats: {
    xp: number;
    level: number;
    xpForNextLevel: number;
    xpForCurrentLevel: number;
    badges: { id: string; name: string; threshold: number; icon: string; description: string }[];
    completedCount: number;
    // Advanced fields
    quizCount: number;
    perfectQuizCount: number;
    avgQuizScore: number;
    currentStreak: number;
    weeklyActivity: { dayLabel: string; active: boolean; dateStr: string }[];
    xpHistory: { date: string; xp: number; rawDate: string }[];
  };
  groupedCourses: Record<string, Record<string, Course[]>>;
  progress: Record<string, CourseProgress>;
  subLevelOrder: string[];
  account: ReturnType<typeof useLocalAccount>;
}

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
  Probabilites: "Licence L2/L3 - Probabilités",
  Universite_L2_L3: "Licence L3 & Master - Calcul Avancé",
  Licence_Maths: "Licence Maths Fondamentales",
  Licence_MIASHS: "Licence MIASHS",
  CPGE: "CPGE Scientifiques (MPSI, PCSI, MP)",
  CPGE_ECG: "CPGE Économiques (Voie ECG/ECT)",
  CPGE_BL: "CPGE B/L (Lettres & Sciences Sociales)",
  Prep_Ingenieur: "Écoles d'Ingénieurs (Prépas Intégrées)",
  Ingenieur_IA_Data: "Sup IA & Data Science",
  Sup_Eco: "Sup Éco (Macroéconomie & Solow)",
  Sup_Finance: "Sup Finance (Temps Retenu & Black-Scholes)",
  Sup_Bio: "Sup Bio (Modélisation SIR)",
  BUT: "IUT / BUT (Science des Données & Info)",
  BUT_GEA: "BUT GEA - Mathématiques de Gestion",
  BUT_GEII: "BUT GEII - Génie Électrique & Info",
  BUT_Industriel: "BUT Génie Industriel (GIM / GMP / QLIO)",
  BUT_Tertiaire: "BUT Tertiaire (GEA / TC / MLT)",
  BTS: "BTS SIO (Services Informatiques)",
  BTS_CG: "BTS Comptabilité Gestion",
  BTS_Industriel: "BTS Industriel (Vibrations & Fourier)",
  BTS_Tertiaire: "BTS Tertiaire (Gestion Budgétaire)",
  Autres: "Autres formations",
  Communes: "Ressources communes",
};

export default function Dashboard({ stats, groupedCourses, progress, subLevelOrder, account }: DashboardProps) {
  const { 
    xp, 
    level, 
    xpForNextLevel, 
    xpForCurrentLevel, 
    badges, 
    completedCount,
    quizCount,
    perfectQuizCount,
    avgQuizScore,
    currentStreak,
    weeklyActivity,
    xpHistory
  } = stats;

  const { profile, getActiveAvatar, notes, saveNotes, isNotepadUnlocked, unlockNotepad } = account;

  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const [dashboardNotes, setDashboardNotes] = useState(notes);
  const [dashboardNotesSaved, setDashboardNotesSaved] = useState(true);
  const [dashPasswordInput, setDashPasswordInput] = useState("");
  const [dashPasswordError, setDashPasswordError] = useState(false);

  React.useEffect(() => {
    setDashboardNotes(notes);
    setDashboardNotesSaved(true);
  }, [notes]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDashboardNotes(e.target.value);
    setDashboardNotesSaved(false);
  };

  const handleSaveNotes = () => {
    saveNotes(dashboardNotes);
    setDashboardNotesSaved(true);
  };

  const progressToNextLevel = ((xp - xpForCurrentLevel) / (Math.max(xpForNextLevel - xpForCurrentLevel, 15))) * 100;

  // Circular progress configuration
  const circleRadius = 45;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const levelStrokeDashoffset = circleCircumference - (progressToNextLevel / 100) * circleCircumference;

  // Chart configuration
  const svgWidth = 540;
  const svgHeight = 200;
  const chartPaddingLeft = 45;
  const chartPaddingRight = 20;
  const chartPaddingTop = 25;
  const chartPaddingBottom = 30;

  const maxXPInHistory = Math.max(...xpHistory.map(h => h.xp), 15);
  const chartYMax = Math.ceil(maxXPInHistory * 1.12); // add cushion

  const chartPoints = xpHistory.map((item, idx) => {
    const x = chartPaddingLeft + (idx * (svgWidth - chartPaddingLeft - chartPaddingRight)) / (xpHistory.length - 1 || 1);
    const y = svgHeight - chartPaddingBottom - (item.xp / (chartYMax || 1)) * (svgHeight - chartPaddingTop - chartPaddingBottom);
    return { ...item, x, y };
  });

  const chartPathString = chartPoints.length > 0
    ? `M ${chartPoints[0].x} ${chartPoints[0].y} ` + chartPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')
    : '';

  const chartAreaString = chartPoints.length > 0
    ? `${chartPathString} L ${chartPoints[chartPoints.length - 1].x} ${svgHeight - chartPaddingBottom} L ${chartPoints[0].x} ${svgHeight - chartPaddingBottom} Z`
    : '';

  // Quotes generator based on level/current stats
  const getMotivationalMessage = () => {
    if (completedCount === 0) {
      return "Prêt à relever ton premier défi ? Choisis un chapitre et commence à gagner tes premiers points d'XP ! 🚀";
    }
    if (currentStreak > 2) {
      return `Super série ! Tu as travaillé ${currentStreak} jours de suite. Continue comme ça, le génie est en toi ! 🔥`;
    }
    return "Chaque théorème compris est un pas de plus vers la maîtrise. Quelle notion vas-tu conquérir aujourd'hui ? 🧠";
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 select-none">
      
      {/* Welcome Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-card p-6 rounded-3xl border border-border-strong overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
      >
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary/5 via-primary/0 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left w-full md:w-auto">
          {profile.pseudo && (
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 border-white dark:border-slate-800 shrink-0 select-none"
              style={{ background: getActiveAvatar().bgGradient }}
            >
              {getActiveAvatar().emoji}
            </div>
          )}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center justify-center md:justify-start gap-2">
              {profile.pseudo ? `Bonjour, ${profile.pseudo} !` : "Ton Espace d'Apprentissage"} <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </h1>
            <p className="text-muted-text text-sm md:text-base font-medium">
              {profile.studyLevel && (
                <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-1.5">
                  [{profile.studyLevel === "Post_Bac" ? "Supérieur" : profile.studyLevel === "Lycee" ? "Lycée" : profile.studyLevel === "College" ? "Collège" : profile.studyLevel}]
                </span>
              )}
              {getMotivationalMessage()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-primary-light dark:bg-muted p-4 rounded-2xl border border-primary/10 shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-text font-bold uppercase tracking-wider">Formations Validées</div>
            <div className="text-xl font-extrabold text-foreground">{completedCount} <span className="text-sm font-medium text-muted-text">chapitres</span></div>
          </div>
        </div>
      </motion.div>

      {/* Hero row: Level, Streak, Weekly Calendar & Notepad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Level Status Card with Circular progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card p-6 rounded-[2rem] shadow-sm border border-border-strong relative flex items-center justify-between overflow-hidden gap-6"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-indigo-400 to-transparent" />
          
          <div className="flex-1 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded-full">Rang Mathématiques</span>
              <h2 className="text-2xl font-extrabold text-foreground mt-2">Niveau {level}</h2>
              <p className="text-sm text-muted-text mt-1">{xp} XP cumulés</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-text font-semibold">
                <span>{xpForCurrentLevel} XP</span>
                <span className="text-primary font-bold">{xpForNextLevel} XP</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
              <p className="text-[11px] text-muted-text font-medium text-right pt-0.5">
                Il te faut encore <span className="font-bold text-foreground text-xs">{(xpForNextLevel - xp)} XP</span> pour le niveau {level + 1}
              </p>
            </div>
          </div>

          <div className="relative flex-shrink-0 flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={circleRadius}
                className="stroke-muted"
                strokeWidth="7"
                fill="transparent"
              />
              <motion.circle
                cx="56"
                cy="56"
                r={circleRadius}
                className="stroke-primary"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={circleCircumference}
                initial={{ strokeDashoffset: circleCircumference }}
                animate={{ strokeDashoffset: levelStrokeDashoffset }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase font-bold text-muted-text">PROG.</span>
              <span className="text-lg font-black text-foreground">{Math.round(progressToNextLevel)}%</span>
            </div>
          </div>
        </motion.div>

        {/* Learning Streak Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-card p-6 rounded-[2rem] shadow-sm border border-border-strong relative flex flex-col justify-between overflow-hidden gap-5"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
          
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
                Série d'Apprentissage
              </h3>
              <p className="text-xs text-muted-text">Sois régulier pour assimiler les notions complexes</p>
            </div>
            
            <motion.div
              animate={currentStreak > 0 ? { scale: [1, 1.15, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold text-sm border border-orange-200/40"
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>{currentStreak} {currentStreak > 1 ? 'Jours' : 'Jour'}</span>
            </motion.div>
          </div>

          {/* 7 Days calendar visualization */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-muted-text uppercase tracking-wider flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-orange-500" /> Progression sur 7 jours
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {weeklyActivity.map((day, idx) => {
                const isToday = idx === 6;
                return (
                  <div key={day.dateStr} className="flex flex-col items-center gap-1.5">
                    <span className={`text-2xs font-bold uppercase ${isToday ? 'text-primary font-extrabold' : 'text-muted-text'}`}>
                      {day.dayLabel}
                    </span>
                    <div 
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        day.active 
                          ? 'bg-gradient-to-tr from-emerald-400 to-emerald-500 text-white shadow-sm shadow-emerald-500/20' 
                          : 'bg-muted border border-border-strong text-muted-text/30'
                      }`}
                    >
                      {day.active ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span className="text-2xs font-bold">{new Date(day.dateStr).getDate()}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Notepad Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-6 rounded-[2rem] shadow-sm border border-border-strong relative flex flex-col justify-between overflow-hidden gap-4"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500" />
          
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Bloc-notes Rapide
            </h3>
            {isNotepadUnlocked && !dashboardNotesSaved && (
              <span className="text-[10px] font-bold text-amber-500 animate-pulse">Non sauvé</span>
            )}
            {isNotepadUnlocked && dashboardNotesSaved && (
              <span className="text-[10px] font-bold text-emerald-500">Enregistré ✓</span>
            )}
          </div>

          {!isNotepadUnlocked ? (
            <div className="flex-1 flex flex-col items-center justify-center py-4 space-y-3">
              <Lock className="w-8 h-8 text-rose-500 animate-bounce" />
              <p className="text-xs text-muted-text text-center font-semibold">Le bloc-notes est verrouillé.</p>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const ok = unlockNotepad(dashPasswordInput);
                  if (ok) {
                    setDashPasswordInput("");
                    setDashPasswordError(false);
                  } else {
                    setDashPasswordError(true);
                    setTimeout(() => setDashPasswordError(false), 2000);
                  }
                }}
                className="w-full flex gap-1.5"
              >
                <input
                  type="password"
                  placeholder="Saisir..."
                  value={dashPasswordInput}
                  onChange={(e) => setDashPasswordInput(e.target.value)}
                  className={`flex-1 px-3 py-1.5 bg-muted text-foreground border text-xs rounded-xl outline-none transition-all ${
                    dashPasswordError ? "border-rose-500 ring-1 ring-rose-200" : "border-transparent focus:bg-card focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                >
                  Déverr.
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-2">
              <textarea
                value={dashboardNotes}
                onChange={handleNotesChange}
                placeholder="Prenez des notes rapides ou écrivez des formules ici..."
                className="w-full h-24 p-3 bg-muted text-foreground rounded-2xl text-xs outline-none resize-none font-medium transition-all focus:bg-card focus:ring-2 focus:ring-primary-light"
              />
              <button
                onClick={handleSaveNotes}
                disabled={dashboardNotesSaved}
                className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  dashboardNotesSaved 
                    ? "bg-muted text-muted-text cursor-default" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                }`}
              >
                <Save className="w-3.5 h-3.5" />
                Enregistrer les notes
              </button>
            </div>
          )}
        </motion.div>

      </div>

      {/* Dynamic Graph Section: XP Progression History */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card p-6 rounded-[2rem] border border-border-strong shadow-sm space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Courbe de Progression d'XP
            </h3>
            <p className="text-xs text-muted-text">Suivi cumulatif de tes connaissances acquises cette semaine</p>
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-3 text-xs font-semibold text-muted-text bg-muted px-3 py-1.5 rounded-xl border border-border-strong">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span>XP accumulés</span>
          </div>
        </div>

        {/* SVG interactive graph */}
        <div className="relative pt-2">
          {/* Graph canvas */}
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="min-w-[500px]">
              <svg 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                className="w-full h-auto overflow-visible select-none"
              >
                <defs>
                  {/* Glowing chart line filter */}
                  <filter id="lineGlow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="var(--primary)" floodOpacity="0.25" />
                  </filter>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                {[0, 0.5, 1].map((ratio, i) => {
                  const y = chartPaddingTop + ratio * (svgHeight - chartPaddingTop - chartPaddingBottom);
                  const labels = [chartYMax, Math.round(chartYMax / 2), 0];
                  return (
                    <g key={i}>
                      <line 
                        x1={chartPaddingLeft} 
                        y1={y} 
                        x2={svgWidth - chartPaddingRight} 
                        y2={y} 
                        stroke="var(--border-strong)" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                      />
                      <text 
                        x={chartPaddingLeft - 8} 
                        y={y + 3} 
                        textAnchor="end" 
                        className="text-[9px] font-mono fill-muted-text font-semibold"
                      >
                        {labels[i]} XP
                      </text>
                    </g>
                  );
                })}

                {/* Shaded Area fill under the curve */}
                {chartAreaString && (
                  <path 
                    d={chartAreaString} 
                    fill="url(#areaGradient)" 
                  />
                )}

                {/* Main line stroke */}
                {chartPathString && (
                  <path 
                    d={chartPathString} 
                    fill="none" 
                    stroke="var(--primary)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    filter="url(#lineGlow)"
                  />
                )}

                {/* Points projection markers & Hover interactions */}
                {chartPoints.map((pt, idx) => {
                  const isHovered = hoveredPoint === idx;
                  return (
                    <g key={idx}>
                      {/* Vertical projection line on hover */}
                      {isHovered && (
                        <line 
                          x1={pt.x} 
                          y1={chartPaddingTop} 
                          x2={pt.x} 
                          y2={svgHeight - chartPaddingBottom} 
                          stroke="var(--primary)" 
                          strokeWidth="1.2"
                          strokeDasharray="2 2"
                        />
                      )}
                      
                      {/* Inner circle on node */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isHovered ? 6 : 4} 
                        fill="var(--card)" 
                        stroke="var(--primary)" 
                        strokeWidth={isHovered ? 3.5 : 2.5}
                        className="transition-all duration-150"
                      />
                      
                      {/* Date label at bottom of graph */}
                      <text 
                        x={pt.x} 
                        y={svgHeight - 12} 
                        textAnchor="middle" 
                        className={`text-[9px] font-mono font-bold tracking-tight ${
                          isHovered ? 'fill-primary font-extrabold' : 'fill-muted-text'
                        }`}
                      >
                        {pt.date}
                      </text>

                      {/* Invisible coordinate shield to expand hover target */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="20"
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPoint(idx)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Floating dynamic rich text tooltip inside the card */}
          <div className="h-10 flex items-center justify-center text-center mt-3 scale-95 transition-all">
            <AnimatePresence mode="wait">
              {hoveredPoint !== null ? (
                <motion.div
                  key={`tooltip-${hoveredPoint}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 text-xs font-bold font-mono tracking-tight"
                >
                  {xpHistory[hoveredPoint].date} : {xpHistory[hoveredPoint].xp} XP totaux cumulés 📈
                </motion.div>
              ) : (
                <motion.div
                  key="tooltip-default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-xs text-muted-text font-medium flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Survole les points pour voir ton historique quotidien
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </motion.div>

      {/* Interactive Quiz Advanced Stats panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Semi-Circle Quiz Score Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="bg-card p-6 rounded-[2rem] border border-border-strong shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-1">
            <h4 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-500" /> Taux de Réussite
            </h4>
            <p className="text-2xs text-muted-text">Moyenne générale de précision aux quiz interactifs</p>
          </div>

          <div className="flex flex-col items-center justify-center py-4 relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="40"
                className="stroke-muted"
                strokeWidth="8"
                fill="transparent"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="40"
                className="stroke-indigo-500"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 40}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: (2 * Math.PI * 40) - (avgQuizScore / 100) * (2 * Math.PI * 40) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-x-0 bottom-4 py-8 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-foreground">{avgQuizScore}%</span>
              <span className="text-3xs font-extrabold uppercase tracking-widest text-muted-text mt-0.5">Précision Moyenne</span>
            </div>
          </div>
        </motion.div>

        {/* Numeric Quiz Counters */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.28 }}
          className="bg-card p-6 rounded-[2rem] border border-border-strong shadow-sm md:col-span-2 flex flex-col justify-between gap-6"
        >
          <div className="space-y-1">
            <h4 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" /> Détail de tes Compétences
            </h4>
            <p className="text-2xs text-muted-text">Statistiques calculées à partir de tes participations actives</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="bg-muted p-4 rounded-2xl border border-border-strong flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-3xs text-muted-text font-bold uppercase tracking-wider">Quiz Complétés</div>
                <div className="text-lg font-black text-foreground">{quizCount}</div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-2xl border border-border-strong flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 flex-shrink-0">
                <Medal className="w-5 h-5" />
              </div>
              <div>
                <div className="text-3xs text-muted-text font-bold uppercase tracking-wider">Sans-Faute (100%)</div>
                <div className="text-lg font-black text-foreground">{perfectQuizCount}</div>
              </div>
            </div>

          </div>

          <div className="text-xs font-semibold text-muted-text bg-primary/5 p-3 rounded-2xl border border-primary/10 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Refais les quiz où tu as fait des erreurs pour perfectionner ta moyenne !</span>
          </div>
        </motion.div>

      </div>

      {/* Badges Collection Column */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" /> Mes Badges Évolutifs
        </h3>

        {badges.length === 0 ? (
          <div className="bg-card p-6 rounded-[2rem] border border-border-strong text-center text-muted-text text-sm font-medium">
            Tu n'as pas encore débloqué d'insignes. Valide un chapitre d'exercice pour débloquer ton premier badge !
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {badges.map((badge, idx) => (
              <motion.div 
                key={badge.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.35 + (idx * 0.08) }}
                className="bg-card p-5 rounded-2xl border border-border-strong flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all"
              >
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <span className="text-4xl mb-2 filter drop-shadow animate-wiggle group-hover:scale-110 transition-transform">{badge.icon}</span>
                <span className="font-extrabold text-xs text-foreground tracking-tight">{badge.name}</span>
                <p className="text-[10px] text-muted-text mt-1 text-center max-w-[150px] font-semibold leading-tight min-h-[32px] flex items-center justify-center">
                  {badge.description}
                </p>
                <span className="text-3xs text-emerald-600 dark:text-emerald-400 font-extrabold mt-2.5 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-100/30">
                  ✓ Débloqué
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Course Detailed Progress Column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-500" /> Progression thématique en détail
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedCourses).map(([levelName, subLevelsObj]) => {
            const displayLevel = levelName.replace('_', ' ');
            const subLevels = Object.keys(subLevelsObj);
            
            if (subLevels.length === 0) return null;
            
            let totalCoursesInLevel = 0;
            let completedInLevel = 0;
            
            subLevels.forEach(sl => {
              const subCourses = subLevelsObj[sl];
              totalCoursesInLevel += subCourses.length;
              completedInLevel += subCourses.filter(c => progress[c.id]?.completed).length;
            });

            if (totalCoursesInLevel === 0) return null;
            const levelProgressPercent = (completedInLevel / totalCoursesInLevel) * 100;

            return (
              <div 
                key={levelName} 
                className="bg-card p-5 rounded-3xl border border-border-strong shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center bg-muted/45 pl-3 pr-2 py-1.5 rounded-xl border border-border-strong">
                  <h4 className="text-xs font-black uppercase tracking-wider text-foreground">{displayLevel}</h4>
                  <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full border border-primary/10">
                    {completedInLevel} / {totalCoursesInLevel}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-indigo-500"
                      style={{ width: `${levelProgressPercent}%` }}
                    />
                  </div>
                  <div className="text-3xs text-right font-bold text-muted-text">
                    Progression : {Math.round(levelProgressPercent)}%
                  </div>
                </div>
                
                <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1 no-scrollbar pt-1">
                  {subLevels.sort((a,b) => subLevelOrder.indexOf(a) - subLevelOrder.indexOf(b)).map(sl => {
                    const subCourses = subLevelsObj[sl];
                    if (subCourses.length === 0) return null;
                    const subCompleted = subCourses.filter(c => progress[c.id]?.completed).length;
                    const subTotal = subCourses.length;

                    return (
                      <div key={sl} className="flex justify-between items-center text-xs ml-1 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                        <span className="font-medium text-muted-text line-clamp-1 flex-1 pr-2">
                          {subLevelLabels[sl] || sl.replace(/_/g, ' ')}
                        </span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-2xs font-bold font-mono text-muted-text-subtle">{subCompleted}/{subTotal}</span>
                          {subCompleted === subTotal && subTotal > 0 ? (
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white scale-90">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-border-strong" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
}
