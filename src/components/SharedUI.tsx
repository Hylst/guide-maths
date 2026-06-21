import React, { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, AlertCircle, Info, BookOpen, BrainCircuit, Lightbulb, Check, X, Target, ShieldQuestion, Clock, BarChart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import confetti from 'canvas-confetti';
import { MathComponent } from './MathComponent';
import { Course } from '../types';
import { CONCEPT_METADATA } from '../data/concept_links';
import coursesIndex from '../data/courses_index.json';

export const CourseContext = createContext<Course | null>(null);

interface BentoGridProps {
  id?: string;
  children: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ id, children }) => (
  <div id={id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
    {children}
  </div>
);

interface BentoCardProps {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3;
  color?: 'slate' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple';
}

export const BentoCard: React.FC<BentoCardProps> = ({ id, title, icon, children, colSpan = 1, color = 'slate' }) => {
  const colorStyles = {
    slate: 'bg-muted dark:bg-slate-900 border-border dark:border-slate-800 text-foreground dark:text-slate-200',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800/50 text-indigo-900 dark:text-indigo-100',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100',
    amber: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-100',
    rose: 'bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-100',
    purple: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800/50 text-purple-900 dark:text-purple-100',
  };

  const spanClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
  };

  return (
    <motion.div 
      id={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-[2rem] border shadow-sm flex flex-col ${colorStyles[color]} ${spanClasses[colSpan]}`}
    >
      <div className="flex items-center gap-3 mb-4 opacity-80">
        {icon}
        <h3 className="font-bold tracking-tight uppercase text-xs">{title}</h3>
      </div>
      <div className="flex-1 font-medium leading-relaxed text-sm">
        {children}
      </div>
    </motion.div>
  );
};

interface ObjectiveListProps {
  items: string[];
}

export const ObjectiveList: React.FC<ObjectiveListProps> = ({ items }) => (
  <ul className="space-y-3">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-3">
        <Target className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
        <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
      </li>
    ))}
  </ul>
);

interface CourseHeaderProps {
  id?: string;
  acronym: string;
  title: string;
  subtitle?: string;
  duration?: string;
  level?: string;
  prerequisites?: string[];
  objectives?: string[];
}

export const CourseHeader: React.FC<CourseHeaderProps> = ({ 
  id, acronym, title, subtitle, duration, level, prerequisites, objectives 
}) => {
  const currentCourse = useContext(CourseContext);

  // Find pedigree links if currentCourse is available
  const parents: { id: string; title: string; slug: string; level: string }[] = [];
  const successors: { id: string; title: string; slug: string; level: string }[] = [];

  if (currentCourse) {
    const metadata = CONCEPT_METADATA[currentCourse.id];
    if (metadata) {
      // 1. Resolve prerequisites (parents)
      const depIds = metadata.dependencies || [];
      depIds.forEach(depId => {
        const found = coursesIndex.find(c => c.id === depId);
        if (found) {
          const shortT = CONCEPT_METADATA[depId]?.shortTitle || found.title.replace(/Chapitre \d+ : /, "").slice(0, 20);
          parents.push({
            id: depId,
            title: shortT,
            slug: depId.replace("/Cours_Math/", "").replace(".md", ""),
            level: found.level === "Post_Bac" ? "Post-Bac" : found.level
          });
        }
      });

      // 2. Resolve successors (children)
      Object.entries(CONCEPT_METADATA).forEach(([childId, childMeta]) => {
        if (childMeta.dependencies && childMeta.dependencies.includes(currentCourse.id)) {
          const found = coursesIndex.find(c => c.id === childId);
          if (found) {
            const shortT = childMeta.shortTitle;
            successors.push({
              id: childId,
              title: shortT,
              slug: childId.replace("/Cours_Math/", "").replace(".md", ""),
              level: found.level === "Post_Bac" ? "Post-Bac" : found.level
            });
          }
        }
      });
    }
  }

  const hasPedigree = parents.length > 0 || successors.length > 0;

  return (
    <div id={id} className="mb-12">
      <motion.div 
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-slate-900 dark:bg-slate-950 text-white p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-indigo-500/10 mb-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none transform scale-150 translate-x-1/4 -translate-y-1/4">
          <BookOpen size={240} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-card/10 backdrop-blur-md text-white border border-white/20 font-mono text-xs rounded-full font-bold tracking-widest uppercase shadow-inner">
              {acronym}
            </span>
            {duration && (
              <span className="text-slate-300 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 border border-slate-700/50 rounded-full px-4 py-1.5 bg-slate-800/50 shadow-inner">
                <Clock size={14} /> {duration}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Pedigree section */}
          {hasPedigree && (
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs select-none no-print">
              {parents.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">🌱 Prend racine dans :</span>
                  <div className="flex flex-wrap gap-2">
                    {parents.map(p => (
                      <Link
                        key={p.id}
                        to={`/cours/${p.slug}`}
                        className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-semibold transition-all hover:scale-[1.02] flex items-center gap-1"
                      >
                        <span>{p.title}</span>
                        <span className="text-[9px] opacity-60 font-mono">({p.level})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {successors.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">🌸 Fleurira dans :</span>
                  <div className="flex flex-wrap gap-2">
                    {successors.map(c => (
                      <Link
                        key={c.id}
                        to={`/cours/${c.slug}`}
                        className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg text-indigo-200 font-semibold transition-all hover:scale-[1.02] flex items-center gap-1"
                      >
                        <span>{c.title}</span>
                        <span className="text-[9px] opacity-60 font-mono">({c.level})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {(level || prerequisites || objectives) && (
        <BentoGrid>
          {level && (
            <BentoCard title="Niveau" icon={<BarChart className="w-5 h-5" />} color="slate" colSpan={1}>
              <div className="text-foreground dark:text-slate-100 font-bold text-lg">
                {level}
              </div>
            </BentoCard>
          )}
          
          {prerequisites && (
            <BentoCard title="Prérequis" icon={<ShieldQuestion className="w-5 h-5" />} color="amber" colSpan={level ? 2 : 3}>
              <p className="text-amber-900/80 dark:text-amber-100/80 font-medium">
                {prerequisites.join(' • ')}
              </p>
            </BentoCard>
          )}

          {objectives && (
            <BentoCard title="Objectifs pédagogiques" icon={<Target className="w-5 h-5" />} color="indigo" colSpan={3}>
              <ObjectiveList items={objectives} />
            </BentoCard>
          )}
        </BentoGrid>
      )}
    </div>
  );
};

interface SectionProps {
  id?: string;
  title: string;
  icon?: string | React.ReactNode;
  color?: 'slate' | 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'blue';
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, icon, color = 'slate', children }) => {
  const colorMap = {
    slate: 'text-slate-500 dark:text-slate-400 bg-muted dark:bg-slate-800/50 ring-slate-200 dark:ring-slate-700',
    indigo: 'text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 ring-indigo-200 dark:ring-indigo-800',
    emerald: 'text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 ring-emerald-200 dark:ring-emerald-800',
    rose: 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 ring-rose-200 dark:ring-rose-800',
    amber: 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 ring-amber-200 dark:ring-amber-800',
    purple: 'text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 ring-purple-200 dark:ring-purple-800',
    blue: 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 ring-blue-200 dark:ring-blue-800'
  };

  let renderedIcon: React.ReactNode = icon;

  if (typeof icon === 'string') {
    const isEmoji = /\p{Emoji}/u.test(icon) && icon.length <= 4;
    if (isEmoji) {
      renderedIcon = <span className="text-xl leading-none select-none">{icon}</span>;
    } else {
      const IconComponent = (LucideIcons as any)[icon];
      if (IconComponent) {
        renderedIcon = <IconComponent className="w-5 h-5 md:w-6 md:h-6" />;
      } else {
        renderedIcon = <span className="text-sm font-mono leading-none">{icon}</span>;
      }
    }
  }

  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="my-14 p-8 md:p-10 rounded-[2rem] border border-border/60 dark:border-slate-800 bg-card/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4 mb-8 text-foreground tracking-tight">
        {renderedIcon && (
          <span className={`w-12 h-12 flex items-center justify-center rounded-2xl ring-1 ${colorMap[color]} shadow-sm`}>
            {renderedIcon}
          </span>
        )}
        {title}
      </h2>
      <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-strong:text-foreground dark:prose-strong:text-slate-200 prose-headings:text-foreground dark:prose-headings:text-slate-100">
        {children}
      </div>
    </motion.section>
  );
};

interface InfoBlockProps {
  id?: string;
  type: 'info' | 'warning' | 'definition' | 'funfact' | 'reminder';
  title?: string;
  children: React.ReactNode;
}

export const InfoBlock: React.FC<InfoBlockProps> = ({ id, type, title, children }) => {
  const styles = {
    info: { bg: 'bg-indigo-50/50 dark:bg-indigo-900/20', border: 'border-indigo-100 dark:border-indigo-800/60', text: 'text-indigo-900 dark:text-indigo-100', icon: <Info className="w-5 h-5 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} /> },
    warning: { bg: 'bg-amber-50/50 dark:bg-amber-900/20', border: 'border-amber-100 dark:border-amber-800/60', text: 'text-amber-900 dark:text-amber-100', icon: <AlertCircle className="w-5 h-5 text-amber-500 dark:text-amber-400" strokeWidth={2.5} /> },
    definition: { bg: 'bg-emerald-50/50 dark:bg-emerald-900/20', border: 'border-emerald-100 dark:border-emerald-800/60', text: 'text-emerald-900 dark:text-emerald-100', icon: <BookOpen className="w-5 h-5 text-emerald-500 dark:text-emerald-400" strokeWidth={2.5} /> },
    funfact: { bg: 'bg-purple-50/50 dark:bg-purple-900/20', border: 'border-purple-100 dark:border-purple-800/60', text: 'text-purple-900 dark:text-purple-100', icon: <BrainCircuit className="w-5 h-5 text-purple-500 dark:text-purple-400" strokeWidth={2.5} /> },
    reminder: { bg: 'bg-rose-50/50 dark:bg-rose-900/20', border: 'border-rose-100 dark:border-rose-800/60', text: 'text-rose-900 dark:text-rose-100', icon: <Lightbulb className="w-5 h-5 text-rose-500 dark:text-rose-400" strokeWidth={2.5} /> }
  };

  const style = styles[type];

  return (
    <motion.div 
      id={id}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`not-prose ${style.bg} ${style.border} border rounded-2xl p-6 my-8 flex flex-col sm:flex-row gap-5 shadow-sm transition-all`}
    >
      <div className="flex-shrink-0 mt-0.5 p-2 bg-card rounded-xl shadow-sm border border-border-strong/50">{style.icon}</div>
      <div>
        {title && <h3 className={`font-bold mb-2 text-lg tracking-tight ${style.text}`}>{title}</h3>}
        <div className={`text-base leading-relaxed ${style.text}`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

interface FlashcardProps {
  id?: string;
  front: React.ReactNode;
  back: React.ReactNode;
}

export const Flashcard: React.FC<FlashcardProps> = ({ id, front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      id={id}
      className="not-prose relative w-full h-64 md:h-72 cursor-pointer perspective-1000 my-4 outline-none" 
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsFlipped(!isFlipped); }}
      aria-label="Flashcard interractive, cliquer pour révéler"
    >
      <motion.div
        className="w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-card border border-border-strong rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg hover:border-primary/50 transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-text font-bold mb-4 absolute top-6">Question</span>
          <div className="text-xl md:text-2xl font-semibold text-foreground leading-snug">{front}</div>
          <p className="text-sm text-primary/60 absolute bottom-6 font-medium animate-pulse">Cliquez pour révéler</p>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-foreground border border-border rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-background/60 font-bold mb-4 absolute top-6">Réponse</span>
          <div className="text-lg md:text-xl font-medium leading-relaxed text-background">{back}</div>
        </div>
      </motion.div>
    </div>
  );
};

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-2xl mb-4 overflow-hidden bg-card shadow-sm transition-all focus-within:ring-2 focus-within:ring-indigo-500/50">
      <button 
        className="w-full px-6 py-5 flex items-center justify-between bg-card hover:bg-muted/50 transition-colors text-left outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-foreground text-lg tracking-tight">{title}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-slate-100 p-1.5 rounded-full text-slate-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-border-strong bg-muted/30"
          >
            <div className="p-6 prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FormulaBoxProps {
  formula?: React.ReactNode;
  math?: string;
  title?: React.ReactNode;
}

export const FormulaBox: React.FC<FormulaBoxProps> = ({ formula, math, title }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="not-prose bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 my-10 text-center relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 dark:border-slate-800"
  >
    {title && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card text-foreground px-5 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm border border-border">
        {title}
      </div>
    )}
    <div className="text-lg md:text-xl text-indigo-900 dark:text-indigo-100 font-medium overflow-x-auto py-2 tracking-tight">
      {math ? <MathComponent block math={math} /> : formula}
    </div>
  </motion.div>
);

interface StepListProps {
  children: React.ReactNode[];
}

export const StepList: React.FC<StepListProps> = ({ children }) => (
  <div className="my-10 relative">
    <div className="absolute top-6 bottom-6 left-[1.35rem] border-l-2 border-border-strong z-0" />
    <div className="space-y-6 relative z-10">
      {React.Children.map(children, (child, index) => (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="flex gap-5"
        >
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-card text-indigo-600 border-2 border-border-strong font-bold flex items-center justify-center shadow-sm relative">
            {index + 1}
          </div>
          <div className="not-prose bg-card border border-border-strong/80 p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex-1">
            {child}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="border border-border rounded-3xl overflow-hidden bg-card shadow-sm my-10">
      <div className="flex border-b border-border-strong bg-muted/50 overflow-x-auto hide-scrollbar p-2 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              activeTab === tab.id 
                ? 'text-foreground bg-card shadow-sm shadow-slate-200' 
                : 'text-slate-500 hover:text-foreground hover:bg-slate-100/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.find(t => t.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface FillInTheBlanksProps {
  id: string;
  content: (string | { options: string[], correctAnswer: number })[];
}

export const FillInTheBlanks: React.FC<FillInTheBlanksProps> = ({ content }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const blankItems = content.filter(item => typeof item !== 'string');
  
  const handleSelect = (index: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [index]: optionIndex }));
  };

  const isComplete = Object.keys(answers).length === blankItems.length;
  
  const checkAnswers = () => {
    setIsSubmitted(true);
    let allCorrect = true;
    
    let blankIndex = 0;
    content.forEach((item) => {
      if (typeof item !== 'string') {
        if (answers[blankIndex] !== item.correctAnswer) {
          allCorrect = false;
        }
        blankIndex++;
      }
    });

    if (allCorrect) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 }, colors: ['#10b981', '#3b82f6', '#8b5cf6'] });
    }
  };

  const renderContent = () => {
    let blankIndex = 0;
    
    return content.map((item, idx) => {
      if (typeof item === 'string') {
        return <span key={idx} className="whitespace-pre-wrap">{item}</span>;
      }

      const currentIndex = blankIndex;
      blankIndex++;
      
      const isAnswered = answers[currentIndex] !== undefined;
      const isCorrect = isAnswered && answers[currentIndex] === item.correctAnswer;
      const isWrong = isSubmitted && !isCorrect;

      return (
        <span key={idx} className="inline-block mx-1.5 align-middle">
          <select 
            aria-label="Texte à trous"
            disabled={isSubmitted}
            className={`appearance-none bg-muted border-2 rounded-xl px-4 py-1.5 pr-10 font-bold outline-none transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500
              ${!isAnswered ? 'border-border text-slate-500 hover:border-slate-300' : ''}
              ${isAnswered && !isSubmitted ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : ''}
              ${isSubmitted && isCorrect ? 'border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100' : ''}
              ${isSubmitted && isWrong ? 'border-rose-400 bg-rose-50 text-rose-700 shadow-sm shadow-rose-100' : ''}
            `}
            value={answers[currentIndex] ?? -1}
            onChange={(e) => handleSelect(currentIndex, parseInt(e.target.value))}
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
          >
            <option value={-1} disabled>___</option>
            {item.options.map((opt, optIdx) => (
              <option key={optIdx} value={optIdx}>{opt}</option>
            ))}
          </select>
        </span>
      );
    });
  };

  return (
    <div className="not-prose bg-card border text-foreground border-border rounded-[2rem] p-8 md:p-10 my-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-lg leading-loose font-medium">
      <div className="mb-8">{renderContent()}</div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border-strong pt-8 gap-4">
        <div className="text-base font-medium">
          {isSubmitted ? (
            <span className="flex items-center gap-2">
              {blankItems.every((item, i) => answers[i] === (item as any).correctAnswer) ? (
                <><CheckCircle2 className="text-emerald-500 w-6 h-6"/> <span className="text-emerald-700 dark:text-emerald-400 font-bold">Parfait, mission réussie !</span></>
              ) : (
                <><AlertCircle className="text-rose-500 w-6 h-6"/> <span className="text-rose-700 dark:text-rose-400 font-bold">Il y a des erreurs, corrigez-les !</span></>
              )}
            </span>
          ) : (
            <span className="text-slate-400 font-medium">Remplissez toutes les cellules pour valider.</span>
          )}
        </div>
        
        {!isSubmitted ? (
          <button 
            disabled={!isComplete}
            onClick={checkAnswers}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 outline-none ${
              isComplete 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Vérifier mes réponses
          </button>
        ) : (
          <button 
            onClick={() => { setIsSubmitted(false); setAnswers({}); }}
            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 outline-none"
          >
            Recommencer
          </button>
        )}
      </div>
    </div>
  );
};

interface QuizProps {
  id?: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export const Quiz: React.FC<QuizProps> = ({ id, questions }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelected(idx);
    setIsAnswered(true);

    if (idx === questions[currentQ].correctAnswer) {
      setScore(s => s + 1);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score === questions.length - 1) {
        confetti({ particleCount: 150, spread: 80, colors: ['#4f46e5', '#10b981', '#f59e0b'] });
      }
    }
  };

  if (isFinished) {
    const isPerfect = score === questions.length;
    return (
      <div id={id} className="not-prose bg-card border border-border rounded-[2rem] p-10 md:p-14 text-center my-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 shadow-inner ${isPerfect ? 'bg-emerald-50 text-emerald-500 border-4 border-emerald-100' : 'bg-indigo-50 text-indigo-500 border-4 border-indigo-100'}`}>
          {isPerfect ? <CheckCircle2 size={48} strokeWidth={2.5} /> : <BrainCircuit size={48} strokeWidth={2.5} />}
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-foreground mb-4 tracking-tight">Quiz Terminé !</h3>
        <p className="text-xl text-slate-500 mb-10 font-medium">Votre score : <span className={`font-black text-2xl ${isPerfect ? 'text-emerald-500' : 'text-indigo-600'}`}>{score} / {questions.length}</span></p>
        
        <button 
          onClick={() => { setCurrentQ(0); setSelected(null); setIsAnswered(false); setScore(0); setIsFinished(false); }}
          className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
        >
          Recommencer l'épreuve
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div id={id} className="not-prose bg-card border border-border rounded-[2rem] p-8 md:p-12 my-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
        <motion.div 
          className="h-full bg-indigo-500" 
          initial={{ width: 0 }}
          animate={{ width: `${(currentQ / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-end mb-8 mt-2 text-sm font-bold text-slate-400 tracking-[0.2em] uppercase">
        <span>Question {currentQ + 1} / {questions.length}</span>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs">Score: {score}</span>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-10 leading-snug tracking-tight">
        {q.question}
      </h3>

      <div className="space-y-4">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correctAnswer;
          const isSelected = selected === idx;
          
          let btnClass = "border-border text-foreground hover:border-indigo-300 hover:bg-indigo-50/50 hover:dark:bg-indigo-900/10 bg-card";
          if (isAnswered) {
            if (isCorrect) btnClass = "border-emerald-500 bg-emerald-50/80 text-emerald-900 shadow-sm shadow-emerald-500/20 z-10 scale-[1.02] transform transition-transform";
            else if (isSelected) btnClass = "border-rose-400 bg-rose-50 text-rose-900";
            else btnClass = "border-border-strong text-slate-400 opacity-50 bg-muted/50";
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-200 font-medium ${btnClass} flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
            >
              <span className="leading-relaxed">{opt}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="text-emerald-600 w-6 h-6 flex-shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <X className="text-rose-600 w-6 h-6 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
            className="overflow-hidden"
          >
            <div className={`p-6 rounded-2xl border ${selected === q.correctAnswer ? 'bg-emerald-50/50 text-emerald-900 border-emerald-200/60' : 'bg-muted text-foreground border-border'}`}>
              <p className="font-bold mb-2 flex items-center gap-2 text-lg">
                {selected === q.correctAnswer ? <><CheckCircle2 size={20} className="text-emerald-500"/> Excellente réponse !</> : <><Info size={20} className="text-slate-500"/> Explication :</>}
              </p>
              <p className="opacity-90 leading-relaxed font-medium">{q.explanation}</p>
            </div>
            
            <button 
              onClick={nextQuestion}
              className="w-full mt-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:-translate-y-1 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              {currentQ < questions.length - 1 ? 'Question Suivante' : 'Voir les résultats'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface InteractiveChecklistProps {
  id?: string;
  items: string[];
}

export const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({ id, items }) => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => {
    setChecked(prev => {
      const next = { ...prev, [idx]: !prev[idx] };
      if (Object.values(next).filter(Boolean).length === items.length) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  const isAllChecked = Object.values(checked).filter(Boolean).length === items.length;

  return (
    <div id={id} className={`my-10 p-8 md:p-10 rounded-[2rem] border transition-all duration-500 ${isAllChecked ? 'bg-emerald-50/50 border-emerald-200 shadow-xl shadow-emerald-500/10' : 'bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]'}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h3 className={`text-2xl font-bold flex items-center gap-3 tracking-tight ${isAllChecked ? 'text-emerald-900' : 'text-foreground'}`}>
          <CheckCircle2 className={isAllChecked ? 'text-emerald-500' : 'text-slate-300'} size={32} />
          Checklist d'apprentissage
        </h3>
        {isAllChecked && (
          <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-sm whitespace-nowrap">
            Objectif atteint
          </span>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => {
          const isChecked = checked[idx];
          return (
            <motion.label 
              key={idx}
              className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer border transition-all outline-none focus-within:ring-2 focus-within:ring-indigo-500 ${isChecked ? 'bg-card border-emerald-200 shadow-sm' : 'bg-muted border-transparent hover:bg-slate-100 hover:border-border'}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(idx); } }}
            >
              <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5 border-2 transition-all shadow-sm ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-slate-300 text-transparent group-hover:border-slate-400'}`}>
                <Check size={18} strokeWidth={3} />
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={!!isChecked} 
                onChange={() => toggle(idx)}
                tabIndex={-1}
              />
              <span className={`text-lg transition-colors ${isChecked ? 'text-slate-400 line-through font-medium' : 'text-foreground font-semibold'}`}>
                {item}
              </span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );
};

export const AccordionFAQ: React.FC<{ id?: string; items: { question: string; answer: React.ReactNode }[] }> = ({ id, items }) => (
  <div id={id} className="space-y-4 my-8">
    {items.map((item, idx) => (
      <details key={idx} className="group p-6 border border-border-strong rounded-[2rem] bg-card shadow-sm transition-all open:shadow-md cursor-pointer">
        <summary className="font-bold text-lg text-foreground hover:text-primary transition-colors focus-visible:outline-none flex justify-between items-center list-none">
          {item.question}
          <ChevronDown className="w-5 h-5 text-muted-text group-open:-rotate-180 transition-transform" />
        </summary>
        <div className="mt-4 pt-4 border-t border-border-strong text-muted-text leading-relaxed whitespace-pre-wrap">
          {item.answer}
        </div>
      </details>
    ))}
  </div>
);

export const TipBanner: React.FC<{ id?: string; type?: 'info' | 'warning' | 'success'; title: string; children: React.ReactNode }> = ({ id, type = 'info', title, children }) => {
  const styles = {
    info: 'bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100',
    warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
    success: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100',
  };
  const Icons = { info: Info, warning: AlertCircle, success: CheckCircle2 };
  const Icon = Icons[type];

  return (
    <div id={id} className={`p-6 rounded-[2rem] border shadow-sm my-6 flex gap-4 ${styles[type]}`}>
      <Icon className="w-6 h-6 flex-shrink-0 mt-0.5 opacity-80" />
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <div className="opacity-90 leading-relaxed text-sm md:text-base">{children}</div>
      </div>
    </div>
  );
};

export const InteractiveExercise: React.FC<{ id?: string; title: string; question: React.ReactNode; steps: React.ReactNode[] }> = ({ id, title, question, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div id={id} className="not-prose bg-card border border-border-strong rounded-[2rem] p-6 md:p-8 my-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <BrainCircuit className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="mb-8 text-foreground text-lg leading-relaxed">{question}</div>
      
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: idx <= currentStep ? 1 : 0, height: idx <= currentStep ? 'auto' : 0 }}
            className={`overflow-hidden ${idx <= currentStep ? 'block' : 'hidden'}`}
          >
            <div className="p-5 bg-muted rounded-[1.5rem] border border-border-strong">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                <span className="font-bold text-sm text-muted-text tracking-widest uppercase">Étape</span>
              </div>
              <div className="text-foreground">{step}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {currentStep < steps.length - 1 && (
        <button 
          onClick={() => setCurrentStep(prev => prev + 1)}
          className="mt-6 w-full py-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          Voir l'étape suivante <ChevronDown className="w-5 h-5" />
        </button>
      )}
      {currentStep === steps.length - 1 && (
        <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-bold text-center rounded-xl border border-emerald-200 dark:border-emerald-800/50 flex flex-col items-center gap-2">
          <CheckCircle2 className="w-8 h-8 mx-auto" />
          Exercice terminé !
        </div>
      )}
    </div>
  );
};
