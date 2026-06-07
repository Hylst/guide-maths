import { useState, useEffect } from 'react';

export interface CourseProgress {
  completed: boolean;
  completedAt?: string;
  quizScore?: {
    score: number;
    total: number;
  };
}

export interface UserStats {
  xp: number;
  level: number;
  badges: { id: string; name: string; threshold: number; icon: string; description: string }[];
}

export function useProgress() {
  const [progress, setProgress] = useState<Record<string, CourseProgress>>({});
  const [triggerReload, setTriggerReload] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('maths_app_progress');
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress from localStorage', e);
      }
    }
  }, []);

  // Listen to 'storage' events to immediately update glossary XP and other states dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      setTriggerReload(prev => prev + 1);
      // Also reload progress if changed by other sessions/tabs
      const saved = localStorage.getItem('maths_app_progress');
      if (saved) {
        try {
          setProgress(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem('maths_app_progress', JSON.stringify(progress));
  }, [progress]);

  const validateCourse = (courseId: string) => {
    setProgress(prev => {
      const existing = prev[courseId];
      if (existing?.completed) return prev;
      return {
        ...prev,
        [courseId]: {
          ...existing,
          completed: true,
          completedAt: new Date().toISOString()
        }
      };
    });
  };

  const saveQuizScore = (courseId: string, score: number, total: number) => {
    setProgress(prev => {
      const existing = prev[courseId];
      return {
        ...prev,
        [courseId]: {
          completed: existing?.completed || false,
          ...existing,
          quizScore: { score, total }
        }
      };
    });
  };

  const getProgress = (courseId: string): CourseProgress | undefined => {
    return progress[courseId];
  };

  // Helper date formatter: YYYY-MM-DD
  const formatDateStr = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // 1. Core completions fields
  const completedCourses = Object.entries(progress).filter(([_, p]) => p.completed);
  const completedCount = completedCourses.length;

  // 2. Fetch custom glossary explorative XP (+5 XP per sandbox explored)
  let glossaryXP = 0;
  try {
    glossaryXP = parseInt(localStorage.getItem('guide-maths-custom-xp') || '0', 10);
  } catch (err) {
    console.error(err);
  }

  // 3. Quiz correct answers score bonus (+5 XP per correct response inside completed quizzes)
  const quizzes = Object.values(progress).filter(p => p.quizScore !== undefined);
  const quizCount = quizzes.length;
  const perfectQuizCount = quizzes.filter(p => p.quizScore && p.quizScore.score === p.quizScore.total).length;
  
  const quizScoresList = quizzes.map(p => {
    const qs = p.quizScore!;
    return qs.total > 0 ? (qs.score / qs.total) * 100 : 0;
  });
  const avgQuizScore = quizScoresList.length > 0 
    ? Math.round(quizScoresList.reduce((a, b) => a + b, 0) / quizScoresList.length)
    : 0;

  const quizBonusXP = quizzes.reduce((acc, q) => {
    if (q.quizScore) {
      return acc + (q.quizScore.score * 5);
    }
    return acc;
  }, 0);

  // 4. Centralized unified XP persistent calculation
  // Validation = +15 XP | Correct Quiz Response = +5 XP | Glossary Sandbox = +5 XP
  const xp = (completedCount * 15) + quizBonusXP + glossaryXP;

  // Level algorithms scale dynamically based on unified XP
  const level = Math.floor(Math.sqrt(xp / 15)) + 1; // e.g. 15xp -> lvl 2, 60xp -> lvl 3, 135xp -> lvl 4
  const xpForNextLevel = Math.pow(level, 2) * 15;
  const xpForCurrentLevel = Math.pow(level - 1, 2) * 15;

  // 5. Streaks and Active Dates
  const activeDatesSet = new Set<string>();
  completedCourses.forEach(([courseId, p], index) => {
    if (p.completedAt) {
      activeDatesSet.add(p.completedAt.substring(0, 10));
    } else {
      const d = new Date();
      const offset = Math.min(index, 4); 
      d.setDate(d.getDate() - offset);
      activeDatesSet.add(formatDateStr(d));
    }
  });

  // Adding glossary exploration dates to streak calculation
  if (glossaryXP > 0) {
    activeDatesSet.add(formatDateStr(new Date()));
  }

  // Calculate daily streak
  let currentStreak = 0;
  let checkDate = new Date();
  let hasToday = activeDatesSet.has(formatDateStr(checkDate));
  if (!hasToday) {
    checkDate.setDate(checkDate.getDate() - 1); // Try yesterday to maintain streak
  }
  while (activeDatesSet.has(formatDateStr(checkDate))) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  // Dynamic evaluation checklist for educational levels (based on course IDs)
  const completions = completedCourses.map(([courseId]) => courseId.toLowerCase());
  const hasPrimaireCollege = completions.some(cid => cid.includes('college') || cid.includes('3eme') || cid.includes('primaire'));
  const hasLycee = completions.some(cid => cid.includes('lycee') || cid.includes('seconde') || cid.includes('premiere') || cid.includes('terminale'));
  const hasPostBac = completions.some(cid => cid.includes('post_bac') || cid.includes('but_industriel') || cid.includes('prepa'));
  const hasAlgo = completions.some(cid => cid.includes('algo') || cid.includes('scratch') || cid.includes('euler') || cid.includes('crible') || cid.includes('tri_'));

  // Rich list of evolutionary and mathematician badges
  const ALL_BADGES_LIST = [
    {
      id: 'premier_pas',
      name: 'Premier pas',
      description: 'Valide ton tout premier cours interactif.',
      icon: '🌟',
      threshold: 1,
      unlocked: completedCount >= 1
    },
    {
      id: 'apprenti',
      name: 'Apprenti',
      description: 'Valide au moins 5 chapitres d\'apprentissage.',
      icon: '🔥',
      threshold: 5,
      unlocked: completedCount >= 5
    },
    {
      id: 'intermediaire',
      name: 'Intermédiaire',
      description: 'Passe la barre fatidique des 10 chapitres complétés !',
      icon: '🚀',
      threshold: 10,
      unlocked: completedCount >= 10
    },
    {
      id: 'expert',
      name: 'Expert',
      description: 'Validation de plus de 25 chapitres différents.',
      icon: '🧠',
      threshold: 25,
      unlocked: completedCount >= 25
    },
    // Mathematicians Special Badges
    {
      id: 'pythagore',
      name: 'Insigne de Pythagore',
      description: 'Génie de l\'antiquité. Débloqué en validant un cours école et collège.',
      icon: '📐',
      threshold: 1,
      unlocked: hasPrimaireCollege
    },
    {
      id: 'euler',
      name: 'Insigne d\'Euler',
      description: 'Maître de l\'analyse. Débloqué en complétant un cours du Lycée (Suites, Exponentielle...).',
      icon: '🌀',
      threshold: 1,
      unlocked: hasLycee
    },
    {
      id: 'lagrange',
      name: 'Insigne de Lagrange',
      description: 'Pionnier de l\'algèbre moderne. Obtenu pour la validation d\'un parcours Post-Bac.',
      icon: '🏛️',
      threshold: 1,
      unlocked: hasPostBac
    },
    {
      id: 'gauss',
      name: 'Insigne de Gauss',
      description: 'Le prince des mathématiques. Débloqué après un sans-faute (100%) sur un Quiz.',
      icon: '⚡',
      threshold: 1,
      unlocked: perfectQuizCount >= 1
    },
    {
      id: 'lovelace',
      name: 'Insigne d\'Ada Lovelace',
      description: 'Prêtresse des algorithmes. Validé après un cours orienté programmation ou algorithmique.',
      icon: '💻',
      threshold: 1,
      unlocked: hasAlgo
    },
    {
      id: 'hypatie',
      name: 'Insigne d\'Hypatie',
      description: 'Philosophe alexandrine. Offert pour avoir étudié avec rigueur 3 jours consécutifs.',
      icon: '🌌',
      threshold: 3,
      unlocked: currentStreak >= 3
    }
  ];

  const badges = ALL_BADGES_LIST.filter(b => b.unlocked);

  // Generate 7 Days Activity representation
  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const weeklyActivity = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = formatDateStr(d);
    weeklyActivity.push({
      dayLabel: daysOfWeek[d.getDay()],
      active: activeDatesSet.has(dStr),
      dateStr: dStr
    });
  }

  // Generate 7 Days Cumulative XP History
  const completionsWithDates = completedCourses.map(([courseId, p], index) => {
    let dateStr = p.completedAt ? p.completedAt.substring(0, 10) : '';
    if (!dateStr) {
      const d = new Date();
      const offset = Math.min(index, 4);
      d.setDate(d.getDate() - offset);
      dateStr = formatDateStr(d);
    }
    return { courseId, dateStr };
  });

  const xpHistory = weeklyActivity.map(day => {
    const completionsBeforeOrOn = completionsWithDates.filter(c => c.dateStr <= day.dateStr).length;
    // Add portion of glossary XP & quiz bonus as baseline activity
    const activeCompletionsXP = completionsBeforeOrOn * 15;
    const historicXP = Math.min(activeCompletionsXP + quizBonusXP + glossaryXP, xp);

    // Simple visual month formatter (e.g. "1 Juin")
    const dObj = new Date(day.dateStr);
    const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    const dateLabel = `${dObj.getDate()} ${monthNames[dObj.getMonth()]}`;

    return {
      date: dateLabel,
      xp: historicXP,
      rawDate: day.dateStr
    };
  });

  return {
    progress,
    validateCourse,
    saveQuizScore,
    getProgress,
    stats: {
      xp,
      level,
      xpForNextLevel,
      xpForCurrentLevel,
      badges,
      completedCount,
      // Advanced
      quizCount,
      perfectQuizCount,
      avgQuizScore,
      currentStreak,
      weeklyActivity,
      xpHistory
    }
  };
}
