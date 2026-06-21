import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Heart, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Calculator,
  Compass,
  Trophy,
  Activity,
  ChevronRight
} from "lucide-react";
import AnimatedLogoTitle from "./AnimatedLogoTitle";
import { Course } from "../types";

interface HomeProps {
  stats: {
    xp: number;
    level: number;
    badges: any[];
    completedCount: number;
  };
  groupedCourses: Record<string, Record<string, Course[]>>;
  progress: Record<string, any>;
  navigate: (path: string) => void;
  handleCourseSelect: (course: Course) => void;
}

export default function Home({
  stats,
  groupedCourses,
  progress,
  navigate,
  handleCourseSelect,
}: HomeProps) {
  
  // Calculate total courses and completed ones
  const totals = React.useMemo(() => {
    let total = 0;
    let completed = 0;
    Object.values(groupedCourses).forEach((subLevelsObj) => {
      Object.values(subLevelsObj).forEach((coursesInSubLevel) => {
        total += coursesInSubLevel.length;
        completed += coursesInSubLevel.filter((c) => progress[c.id]?.completed).length;
      });
    });
    return { total, completed };
  }, [groupedCourses, progress]);

  // Format level labels
  const levelMeta: Record<string, { title: string; desc: string; emoji: string; color: string; bg: string }> = {
    Maternelle: { 
      title: "Maternelle", 
      desc: "Découverte des nombres, formes géométriques de base et repérage spatial par le jeu.",
      emoji: "🧸", 
      color: "text-pink-500 dark:text-pink-400",
      bg: "bg-pink-500/5 dark:bg-pink-500/10 border-pink-500/10"
    },
    Primaire: { 
      title: "École Primaire", 
      desc: "Apprentissage des quatre opérations fondamentales, des fractions de base et de la géométrie plane.",
      emoji: "🎒", 
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/10"
    },
    College: { 
      title: "Collège", 
      desc: "Introduction de l'algèbre littérale, théorèmes majeurs (Pythagore, Thalès) et algorithmique Scratch.",
      emoji: "📐", 
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/10"
    },
    Lycee: { 
      title: "Lycée", 
      desc: "Analyse réelle (dérivées, limites), probabilités, trigonométrie et spécialités avancées.",
      emoji: "🔬", 
      color: "text-indigo-500 dark:text-indigo-400",
      bg: "bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-500/10"
    },
    Post_Bac: { 
      title: "Post-Bac / Supérieur", 
      desc: "Algèbre matricielle, équations différentielles de l'asservissement, optimisation économique, CPGE, BUT, Licences.",
      emoji: "🏛️", 
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/10"
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  } as const;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto py-6 px-2 sm:px-4 space-y-12 select-none"
    >
      {/* Hero Header Section */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col items-center text-center space-y-6 pt-4 sm:pt-8"
      >
        <div className="transform scale-90 sm:scale-100 transition-transform hover:scale-[1.03] active:scale-95 duration-300">
          <AnimatedLogoTitle size="xl" showSubtitle={true} />
        </div>
        
        <p className="text-muted-text text-base sm:text-lg max-w-2xl font-medium px-4 leading-relaxed">
          Un guide d'apprentissage des mathématiques interactif, visuel et progressif. 
          De la manipulation intuitive dès la maternelle jusqu'aux démonstrations avancées du supérieur.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center px-6 sm:px-0">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white font-extrabold rounded-2xl text-sm transition-all active:scale-95 shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trophy className="w-4.5 h-4.5" />
            Mon Tableau de Bord
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => {
              // Open first resource or just scroll/focus user to sidebar on mobile
              const el = document.querySelector('input[placeholder*="Rechercher"]');
              if (el) (el as HTMLElement).focus();
              // Trigger mobile menu if screen is small
              const btn = document.querySelector('button[aria-label="Ouvrir le menu"]');
              if (btn) (btn as HTMLElement).click();
            }}
            className="px-6 py-3.5 bg-muted hover:bg-border-strong text-foreground font-extrabold rounded-2xl text-sm transition-all active:scale-95 border border-border-strong flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4.5 h-4.5 text-primary" />
            Parcourir les Chapitres
          </button>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        <div className="bg-card p-4 rounded-2xl border border-border-strong text-center shadow-sm">
          <div className="text-2xs text-muted-text font-bold uppercase tracking-wider">Catalogue</div>
          <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">{totals.total} cours</div>
        </div>
        
        <div className="bg-card p-4 rounded-2xl border border-border-strong text-center shadow-sm">
          <div className="text-2xs text-muted-text font-bold uppercase tracking-wider">Validés</div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {totals.completed} / {totals.total}
          </div>
        </div>

        <div className="bg-card p-4 rounded-2xl border border-border-strong text-center shadow-sm">
          <div className="text-2xs text-muted-text font-bold uppercase tracking-wider">Niveau</div>
          <div className="text-xl sm:text-2xl font-extrabold text-primary mt-1">Niv. {stats.level}</div>
        </div>

        <div className="bg-card p-4 rounded-2xl border border-border-strong text-center shadow-sm">
          <div className="text-2xs text-muted-text font-bold uppercase tracking-wider">Badges</div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-500 mt-1">🏅 {stats.badges.length} / 10</div>
        </div>
      </motion.div>

      {/* Philosophy Block & Humble Tone (passion, modest, fun, incomplete warnings) */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-5 gap-6"
      >
        {/* Humble Message (60% width equivalent) */}
        <div className="md:col-span-3 bg-card p-6 sm:p-8 rounded-[2rem] border border-border-strong shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
                Une Démarche Modeste, Portée par la Passion
              </h3>
            </div>
            
            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 font-medium">
              <p>
                Ce projet est né d'une initiative purement bénévole. Il a été conçu et développé sur mon temps libre avec un objectif simple : 
                <strong> transmettre le goût des mathématiques</strong>, aider à surmonter les blocages scolaires et proposer une méthode d'apprentissage alternative.
              </p>
              <p>
                Étant moi-même porteur d'un profil neuroatypique (<strong>TDAH & dys</strong>), j'ai cherché à structurer ce guide pour limiter la surcharge cognitive : 
                des modules découpés, des visuels colorés et des laboratoires dynamiques pour manipuler directement les objets mathématiques.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border-strong/50 flex items-center gap-3 text-xs text-muted-text font-semibold">
            <Heart className="w-4.5 h-4.5 text-rose-500 fill-rose-500 animate-pulse shrink-0" />
            <span>Réalisé avec passion par Geoffroy Streit (Hylst).</span>
          </div>
        </div>

        {/* Warning / Incomplete alert (40% width equivalent) */}
        <div className="md:col-span-2 bg-amber-500/[0.03] dark:bg-amber-500/[0.02] p-6 sm:p-8 rounded-[2rem] border border-amber-500/20 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h4 className="text-xs font-black uppercase tracking-wider">Chantier en cours & Coquilles</h4>
            </div>
            
            <p className="text-xs sm:text-sm text-amber-900/80 dark:text-amber-300/80 leading-relaxed font-semibold">
              Attention ! Le contenu est régulièrement mis à jour mais reste <strong>partiel et incomplet</strong>. 
              Certains chapitres sont encore succincts et il n'est pas impossible que de petites erreurs ou coquilles se soient glissées dans les explications.
            </p>
            <p className="text-2xs text-amber-800/70 dark:text-amber-400/60 leading-normal font-semibold">
              Si tu repères une erreur, n'hésite pas à m'écrire (contact dans le bouton Infos en bas à gauche de ton écran) !
            </p>
          </div>

          <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-3xs text-amber-700 dark:text-amber-400 font-extrabold uppercase tracking-widest text-center">
            🚧 Version Bêta • Évolutive
          </div>
        </div>
      </motion.div>

      {/* Interactive Pedagogy Blocks (Comment ça fonctionne) */}
      <motion.div 
        variants={itemVariants}
        className="space-y-6"
      >
        <div className="text-center sm:text-left space-y-1">
          <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <Compass className="w-5 h-5 text-indigo-500" />
            Comment Fonctionne l'Applet ?
          </h3>
          <p className="text-xs text-muted-text font-semibold">Une expérience d'étude en 4 temps, entièrement passive de calculs complexes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card p-5 rounded-2xl border border-border-strong shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary font-black text-sm">1</div>
            <h4 className="text-sm font-bold text-foreground">Choix du Chapitre</h4>
            <p className="text-2xs text-muted-text leading-normal font-medium">
              Explore le menu latéral classé par niveaux. Filtre instantanément via la barre de recherche.
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border-strong shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary font-black text-sm">2</div>
            <h4 className="text-sm font-bold text-foreground">Sensory Learning</h4>
            <p className="text-2xs text-muted-text leading-normal font-medium">
              Manipule des curseurs géométriques, observe des graphes en temps réel et des simulateurs 3D interactifs.
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border-strong shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary font-black text-sm">3</div>
            <h4 className="text-sm font-bold text-foreground">Auto-Évaluation</h4>
            <p className="text-2xs text-muted-text leading-normal font-medium">
              Chaque cours propose des fiches de mémorisation active et un mini-quiz final. Fais un sans-faute pour valider !
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border-strong shadow-sm space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-primary font-black text-sm">4</div>
            <h4 className="text-sm font-bold text-foreground">XP & Récompenses</h4>
            <p className="text-2xs text-muted-text leading-normal font-medium">
              Gagne de l'XP (+15 par cours validé), franchis les niveaux et débloque des badges d'honneur.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Levels Directory (Contenu) */}
      <motion.div 
        variants={itemVariants}
        className="space-y-6"
      >
        <div className="text-center sm:text-left space-y-1">
          <h3 className="text-xl font-extrabold text-foreground tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-500" />
            Parcours Mathématiques Disponibles
          </h3>
          <p className="text-xs text-muted-text font-semibold">Une structure spiralaire qui fait grandir les concepts de classe en classe</p>
        </div>

        <div className="space-y-3">
          {Object.entries(levelMeta).map(([key, meta]) => {
            const levelsObj = groupedCourses[key] || {};
            const subLevelKeys = Object.keys(levelsObj);
            
            // Calculate total courses in this parent category
            let count = 0;
            subLevelKeys.forEach(sl => {
              count += levelsObj[sl]?.length || 0;
            });

            return (
              <div 
                key={key} 
                className={`p-5 rounded-3xl border shadow-sm transition-all hover:translate-x-1 duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card hover:border-primary/20 ${meta.bg}`}
              >
                <div className="flex gap-4 items-start sm:items-center">
                  <span className="text-3xl filter drop-shadow-sm shrink-0">{meta.emoji}</span>
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-foreground flex items-center gap-2">
                      {meta.title}
                      <span className="text-3xs font-extrabold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase shrink-0">
                        {count} {count > 1 ? "cours" : "cours"}
                      </span>
                    </h4>
                    <p className="text-2xs sm:text-xs text-muted-text leading-relaxed max-w-2xl font-medium">
                      {meta.desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1.5 flex-wrap w-full sm:w-auto">
                  {subLevelKeys.slice(0, 4).map(subL => (
                    <span 
                      key={subL}
                      className="px-2 py-1 bg-muted dark:bg-slate-900 border border-border-strong text-[9px] font-bold rounded-lg text-slate-600 dark:text-slate-400 whitespace-nowrap"
                    >
                      {subL.replace("eme", "ème").replace("ere", "ère")}
                    </span>
                  ))}
                  {subLevelKeys.length > 4 && (
                    <span className="px-2 py-1 bg-muted dark:bg-slate-900 border border-border-strong text-[9px] font-bold rounded-lg text-muted-text-subtle">
                      +{subLevelKeys.length - 4}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Sovereignty, Security & Offline card */}
      <motion.div 
        variants={itemVariants}
        className="bg-card p-6 sm:p-8 rounded-[2rem] border border-border-strong shadow-sm relative overflow-hidden"
      >
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-indigo-500/5 via-indigo-500/0 to-transparent pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-primary shrink-0">
            <ShieldCheck className="w-6 h-6 text-indigo-500" />
          </div>
          
          <div className="space-y-3 flex-1">
            <h4 className="text-base font-extrabold text-foreground tracking-tight">
              Souveraineté des Données & Zéro Réseau (100% Client-Side)
            </h4>
            
            <p className="text-xs sm:text-sm text-muted-text leading-relaxed font-semibold">
              Cette application est conçue pour être la plus légère, sécurisée et respectueuse possible de ta vie privée.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-2 text-2xs text-muted-text font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Aucune Donnée Collectée :</strong> Pas d'inscription, pas d'adresse e-mail demandée, ni de profil en ligne.</span>
              </div>
              
              <div className="flex items-start gap-2 text-2xs text-muted-text font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Stockage Local Éco-friendly :</strong> Tes XP, badges débloqués et progressions restent uniquement dans le <code>localStorage</code> de ton appareil.</span>
              </div>

              <div className="flex items-start gap-2 text-2xs text-muted-text font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Sans trackers ni cookies :</strong> Zéro fuite de données possible, l'application fonctionne de manière autonome en 100% front-end.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
