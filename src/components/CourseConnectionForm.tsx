import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Heart, CheckCircle2 } from 'lucide-react';

interface CourseConnection {
  courseId: string;
  courseTitle: string;
  context: string;
  createdAt: string;
}

interface CourseConnectionFormProps {
  courseId: string;
  courseTitle: string;
}

const STORAGE_KEY = 'maths_course_connections';

const loadConnections = (): CourseConnection[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const hasConnection = (courseId: string): boolean => {
  return loadConnections().some(c => c.courseId === courseId);
};

export function getCourseConnections(): CourseConnection[] {
  return loadConnections();
}

export default function CourseConnectionForm({ courseId, courseTitle }: CourseConnectionFormProps) {
  const [isOpen, setIsOpen] = useState(!hasConnection(courseId));
  const [context, setContext] = useState('');
  const [saved, setSaved] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (hasConnection(courseId)) {
      setIsOpen(false);
      setSaved(true);
    }
  }, [courseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = context.trim();
    if (!trimmed) return;

    const connections = loadConnections();
    connections.push({
      courseId,
      courseTitle,
      context: trimmed,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(connections));
    setSaved(true);
    setIsOpen(false);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setIsOpen(false);
  };

  if (!isOpen || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-6 overflow-hidden"
      >
        <div className="p-5 bg-gradient-to-br from-rose-50/80 to-indigo-50/80 dark:from-rose-950/10 dark:to-indigo-950/10 border border-rose-100 dark:border-rose-900/30 rounded-[2rem] relative">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-rose-100 dark:hover:bg-rose-950/50 text-muted-text transition-all"
            aria-label="Ignorer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 mb-3">
            <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-extrabold text-foreground">Connexion Personnelle</h4>
              <p className="text-2xs text-muted-text font-semibold mt-0.5">
                As-tu déjà croisé cette notion ailleurs (école, jeu, travail, vidéo, vie quotidienne) ?
              </p>
            </div>
          </div>

          {saved ? (
            <div className="flex items-center gap-2 text-2xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
              <CheckCircle2 className="w-4 h-4" />
              Connexion enregistrée — tu peux la retrouver dans ton Tableau de Bord.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={context}
                onChange={e => setContext(e.target.value)}
                placeholder="Ex: dans mon stage, j'ai utilisé les pourcentages..."
                className="flex-1 bg-card border border-border-strong px-3 py-2 rounded-xl text-xs outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-all"
                autoFocus
              />
              <button
                type="submit"
                disabled={!context.trim()}
                className="px-3 py-2 bg-rose-500 hover:bg-rose-600 disabled:bg-muted disabled:text-muted-text text-white font-extrabold text-xs rounded-xl transition-all active:scale-95 flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
