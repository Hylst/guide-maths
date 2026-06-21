import { useState, useEffect } from 'react';
import { CONCEPT_METADATA } from '../data/concept_links';
import coursesIndex from '../data/courses_index.json';

export interface CourseProgress {
  completed: boolean;
  completedAt?: string;
  quizScore?: {
    score: number;
    total: number;
  };
  nextReview?: string;
  reviewInterval?: number;
  repetitions?: number;
}

export interface UserStats {
  xp: number;
  level: number;
  levelTitle: string;
  xpForNextLevel: number;
  xpForCurrentLevel: number;
  badges: { id: string; name: string; threshold: number; icon: string; description: string }[];
  completedCount: number;
  quizCount: number;
  perfectQuizCount: number;
  avgQuizScore: number;
  currentStreak: number;
  weeklyActivity: { dayLabel: string; active: boolean; dateStr: string }[];
  xpHistory: { date: string; xp: number; rawDate: string }[];
  totalBadges: number;
  reviewCount: number;
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
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 1);
      return {
        ...prev,
        [courseId]: {
          ...existing,
          completed: true,
          completedAt: new Date().toISOString(),
          nextReview: nextDate.toISOString(),
          reviewInterval: 1,
          repetitions: 0,
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

  const scheduleReview = (courseId: string, interval?: number) => {
    setProgress(prev => {
      const current = prev[courseId];
      if (!current?.completed) return prev;
      const days = interval ?? 1;
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + days);
      return {
        ...prev,
        [courseId]: {
          ...current,
          nextReview: nextDate.toISOString(),
          reviewInterval: days,
          repetitions: current.repetitions || 0,
        }
      };
    });
  };

  const markReviewed = (courseId: string) => {
    let shouldAward = false;
    setProgress(prev => {
      const current = prev[courseId];
      if (!current) return prev;
      shouldAward = true;
      const intervals = [1, 3, 7, 14, 30, 60, 90];
      const reps = (current.repetitions || 0);
      const nextInterval = intervals[Math.min(reps, intervals.length - 1)];
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + nextInterval);
      return {
        ...prev,
        [courseId]: {
          ...current,
          nextReview: nextDate.toISOString(),
          reviewInterval: nextInterval,
          repetitions: reps + 1,
        }
      };
    });
    if (shouldAward) {
      const prevXP = parseInt(localStorage.getItem('maths_review_xp') || '0', 10);
      localStorage.setItem('maths_review_xp', String(prevXP + 3));
    }
  };

  const getDueReviews = (): string[] => {
    const now = new Date();
    return Object.entries(progress)
      .filter(([, p]) => p.completed && p.nextReview && new Date(p.nextReview) <= now)
      .map(([id]) => id);
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
  // Validation = +15 XP | Correct Quiz Response = +5 XP | Glossary Sandbox = +5 XP | Review = +3 XP
  let reviewXP = 0;
  try {
    reviewXP = parseInt(localStorage.getItem('maths_review_xp') || '0', 10);
  } catch (err) {
    console.error(err);
  }
  const xp = (completedCount * 15) + quizBonusXP + glossaryXP + reviewXP;

  // Level scales with sqrt for diminishing returns at high XP
  const XP_PER_LEVEL = 30;
  const level = Math.floor(Math.sqrt(xp / XP_PER_LEVEL)) + 1;
  const xpForNextLevel = Math.pow(level, 2) * XP_PER_LEVEL;
  const xpForCurrentLevel = Math.pow(level - 1, 2) * XP_PER_LEVEL;

  // Dynamic level titles
  const LEVEL_TITLES: Record<number, string> = {
    1: 'Apprenti',
    2: 'Explorateur',
    3: 'Déterminé',
    4: 'Mathématicien',
    5: 'Analyste',
    6: 'Stratège',
    7: 'Érudit',
    8: 'Expert',
    9: 'Savant',
    10: 'Génie',
    11: 'Virtuose',
    12: 'Légende',
    13: 'Mythe',
    14: 'Grand Maître',
    15: 'Astronome',
    16: 'Oracle',
    17: 'Philosophe',
    18: 'Sage',
    19: 'Transcendant',
    20: 'Infini',
  };
  const levelTitle = LEVEL_TITLES[level] || `Niveau ${level}`;

  // 5. Streaks and Active Dates (only real completedAt dates)
  const activeDatesSet = new Set<string>();
  completedCourses.forEach(([courseId, p]) => {
    if (p.completedAt) {
      activeDatesSet.add(p.completedAt.substring(0, 10));
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

  const reviewCount = getDueReviews().length;
  const totalReviewsDone = Object.values(progress).reduce((sum, p) => sum + (p.repetitions || 0), 0);

  // Dynamic evaluation checklist for educational levels (based on course IDs)
  const completions = completedCourses.map(([courseId]) => courseId.toLowerCase());
  const hasPrimaireCollege = completions.some(cid => cid.includes('college') || cid.includes('3eme') || cid.includes('primaire'));
  const hasLycee = completions.some(cid => cid.includes('lycee') || cid.includes('seconde') || cid.includes('premiere') || cid.includes('terminale'));
  const hasPostBac = completions.some(cid => cid.includes('post_bac') || cid.includes('but_industriel') || cid.includes('prepa'));
  const hasAlgo = completions.some(cid => cid.includes('algo') || cid.includes('scratch') || cid.includes('euler') || cid.includes('crible') || cid.includes('tri_'));
  const hasMaternelle = completions.some(cid => cid.includes('maternelle') || cid.includes('ps') || cid.includes('ms') || cid.includes('gs'));

  // Domain-based progress (for domain badges)
  const domainCompletedCounts: Record<string, number> = { numbers: 0, algebra: 0, analysis: 0, geometry: 0, probability: 0, algorithms: 0 };
  Object.entries(CONCEPT_METADATA).forEach(([courseId, meta]) => {
    if (progress[courseId]?.completed) {
      const domain = meta.domain || 'general';
      if (domainCompletedCounts[domain] !== undefined) {
        domainCompletedCounts[domain]++;
      }
    }
  });

  const domainBadgesUnlocked = [
    domainCompletedCounts.numbers >= 3,
    domainCompletedCounts.algebra >= 3,
    domainCompletedCounts.analysis >= 3,
    domainCompletedCounts.geometry >= 3,
    domainCompletedCounts.probability >= 3,
    domainCompletedCounts.algorithms >= 2,
  ].filter(Boolean).length;

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
    },
    // Domain-based badges (faisceaux thématiques)
    {
      id: 'maitre_nombres',
      name: 'Maître des Nombres',
      description: 'Validé 3 cours du domaine Nombres (arithmétique, fractions, suites financières).',
      icon: '🔢',
      threshold: 3,
      unlocked: domainCompletedCounts.numbers >= 3
    },
    {
      id: 'genie_algebre',
      name: 'Génie de l\'Algèbre',
      description: 'Validé 3 cours du domaine Algèbre (structures, matrices, espaces vectoriels).',
      icon: '🧮',
      threshold: 3,
      unlocked: domainCompletedCounts.algebra >= 3
    },
    {
      id: 'analyste',
      name: 'Analyste',
      description: 'Validé 3 cours du domaine Analyse (limites, dérivées, intégrales, équa. diff.).',
      icon: '📈',
      threshold: 3,
      unlocked: domainCompletedCounts.analysis >= 3
    },
    {
      id: 'geometre',
      name: 'Géomètre',
      description: 'Validé 3 cours du domaine Géométrie (trigonométrie, géométrie plane/3D, complexes).',
      icon: '🔷',
      threshold: 3,
      unlocked: domainCompletedCounts.geometry >= 3
    },
    {
      id: 'probabiliste',
      name: 'Probabiliste',
      description: 'Validé 3 cours du domaine Probabilités (statistiques, probas, chaînes de Markov).',
      icon: '🎲',
      threshold: 3,
      unlocked: domainCompletedCounts.probability >= 3
    },
    {
      id: 'alchimiste_algo',
      name: 'Alchimiste du Code',
      description: 'Validé 2 cours du domaine Algorithmique (Scratch, Python, tris, optimisation).',
      icon: '💻',
      threshold: 2,
      unlocked: domainCompletedCounts.algorithms >= 2
    },
    // Streak badges
    {
      id: 'regulier',
      name: 'Régulier',
      description: 'Maintiens une série d\'apprentissage de 7 jours consécutifs.',
      icon: '📅',
      threshold: 7,
      unlocked: currentStreak >= 7
    },
    {
      id: 'assidu',
      name: 'Assidu',
      description: 'Atteins une série de 14 jours consécutifs sans interruption.',
      icon: '🔥',
      threshold: 14,
      unlocked: currentStreak >= 14
    },
    // Review badges
    {
      id: 'revisuer',
      name: 'Réviseur',
      description: 'Effectue 10 révisions programmées.',
      icon: '🔄',
      threshold: 10,
      unlocked: totalReviewsDone >= 10
    },
    {
      id: 'relecteur',
      name: 'Relecteur',
      description: 'Effectue 25 révisions programmées, la mémoire est en marche !',
      icon: '📖',
      threshold: 25,
      unlocked: totalReviewsDone >= 25
    },
    // Explorer badge
    {
      id: 'explorateur',
      name: 'Explorateur',
      description: 'Étudie des cours dans tous les niveaux : Maternelle, Primaire, Collège, Lycée et Post-Bac.',
      icon: '🌍',
      threshold: 5,
      unlocked: hasMaternelle && hasPrimaireCollege && hasLycee && hasPostBac
    },
    // Collection badge
    {
      id: 'collectionneur',
      name: 'Collectionneur',
      description: 'Débloque 5 badges de domaine différents.',
      icon: '🏆',
      threshold: 5,
      unlocked: domainBadgesUnlocked >= 5
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

  // Generate 7 Days Cumulative XP History (only real dates)
  const completionsWithDates = completedCourses
    .filter(([_, p]) => p.completedAt)
    .map(([courseId, p]) => ({
      courseId,
      dateStr: p.completedAt!.substring(0, 10)
    }));

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

  // --- Course Suggestion Algorithm (Spirale) ---
  const completedIds = new Set(completedCourses.map(([id]) => id));

  // Build successors map
  const successors: Record<string, string[]> = {};
  Object.entries(CONCEPT_METADATA).forEach(([id, meta]) => {
    if (!meta.dependencies) return;
    meta.dependencies.forEach(depId => {
      if (!successors[depId]) successors[depId] = [];
      successors[depId].push(id);
    });
  });

  // Find best next course
  let suggestedCourse: { courseId: string; shortTitle: string; slug: string; readiness: number; reason: string } | null = null;
  const candidateScores: Record<string, { readiness: number; depCount: number }> = {};
  completedIds.forEach(completedId => {
    (successors[completedId] || []).forEach(succId => {
      if (completedIds.has(succId)) return;
      const meta = CONCEPT_METADATA[succId];
      if (!meta || !meta.dependencies || meta.dependencies.length === 0) return;
      const satisfied = meta.dependencies.filter(d => completedIds.has(d)).length;
      const readiness = satisfied / meta.dependencies.length;
      if (!candidateScores[succId] || readiness > candidateScores[succId].readiness) {
        candidateScores[succId] = { readiness, depCount: meta.dependencies.length };
      }
    });
  });

  const sorted = Object.entries(candidateScores).sort(([, a], [, b]) => b.readiness - a.readiness || a.depCount - b.depCount);
  if (sorted.length > 0) {
    const [bestId] = sorted[0];
    const bestMeta = CONCEPT_METADATA[bestId];
    if (bestMeta) {
      const readyCount = bestMeta.dependencies.filter(d => completedIds.has(d)).length;
      const totalDeps = bestMeta.dependencies.length;
      let reason = totalDeps === 0 ? "Nouveau concept à explorer" : `${Math.round((readyCount / totalDeps) * 100)}% des prérequis déjà maîtrisés`;
      suggestedCourse = {
        courseId: bestId,
        shortTitle: bestMeta.shortTitle,
        slug: bestId.replace("/Cours_Math/", "").replace(".md", ""),
        readiness: sorted[0][1].readiness,
        reason
      };
    }
  }

  // Fallback: first uncompleted course if nothing found
  if (!suggestedCourse) {
    const firstUncompleted = coursesIndex.find(c => !completedIds.has(c.id));
    if (firstUncompleted) {
      suggestedCourse = {
        courseId: firstUncompleted.id,
        shortTitle: firstUncompleted.title.replace(/Chapitre \d+ : /, "").slice(0, 30),
        slug: firstUncompleted.id.replace("/Cours_Math/", "").replace(".md", ""),
        readiness: 0,
        reason: "Premier pas dans l'aventure"
      };
    }
  }

  return {
    progress,
    validateCourse,
    saveQuizScore,
    getProgress,
    scheduleReview,
    markReviewed,
    getDueReviews,
    reviewCount,
    suggestedCourse,
    stats: {
      xp,
      level,
      levelTitle,
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
      xpHistory,
      totalBadges: ALL_BADGES_LIST.length,
      reviewCount,
    }
  };
}
