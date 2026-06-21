import React from 'react';
import { motion } from 'framer-motion';
import { CONCEPT_METADATA } from '../data/concept_links';
import { GitBranch, ArrowRight, GraduationCap, BookOpen, Sparkles } from 'lucide-react';

interface SpiralTimelineProps {
  courseId: string;
}

const LEVEL_ORDER = ['Maternelle', 'Primaire', 'Collège', 'Lycée', 'Post-Bac', 'Général'];

const getLevelFromPath = (id: string): string => {
  if (id.includes('/00_Maternelle/')) return 'Maternelle';
  if (id.includes('/01_Primaire/')) return 'Primaire';
  if (id.includes('/02_College/')) return 'Collège';
  if (id.includes('/03_Lycee/')) return 'Lycée';
  if (id.includes('/04_Post_Bac/')) return 'Post-Bac';
  return 'Général';
};

const levelColors: Record<string, string> = {
  'Maternelle': 'bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800/50 text-pink-700 dark:text-pink-300',
  'Primaire': 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300',
  'Collège': 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300',
  'Lycée': 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300',
  'Post-Bac': 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300',
  'Général': 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-300',
};

const levelDotColors: Record<string, string> = {
  'Maternelle': 'bg-pink-400',
  'Primaire': 'bg-emerald-400',
  'Collège': 'bg-blue-400',
  'Lycée': 'bg-indigo-400',
  'Post-Bac': 'bg-purple-400',
  'Général': 'bg-slate-400',
};

const MAX_PER_GROUP = 4;

export default function SpiralTimeline({ courseId }: SpiralTimelineProps) {
  const meta = CONCEPT_METADATA[courseId];
  if (!meta) return null;

  const visitedAnc = new Set<string>();
  const ancestors: { id: string; title: string; level: string }[] = [];
  const walkAncestors = (id: string, depth: number) => {
    if (depth > 2 || visitedAnc.has(id)) return;
    visitedAnc.add(id);
    const node = CONCEPT_METADATA[id];
    if (!node || !node.dependencies) return;
    node.dependencies.forEach(dep => {
      if (depth < 2) walkAncestors(dep, depth + 1);
      const depNode = CONCEPT_METADATA[dep];
      if (depNode && !ancestors.some(a => a.id === dep)) {
        ancestors.push({ id: dep, title: depNode.shortTitle, level: getLevelFromPath(dep) });
      }
    });
  };
  walkAncestors(courseId, 0);

  const descendants: { id: string; title: string; level: string }[] = [];
  Object.entries(CONCEPT_METADATA).forEach(([childId, childMeta]) => {
    if (childMeta.dependencies?.includes(courseId)) {
      descendants.push({ id: childId, title: childMeta.shortTitle, level: getLevelFromPath(childId) });
    }
  });

  if (ancestors.length === 0 && descendants.length === 0) return null;

  const groupByLevel = (items: typeof ancestors) => {
    const groups: Record<string, typeof ancestors> = {};
    items.forEach(item => {
      if (!groups[item.level]) groups[item.level] = [];
      groups[item.level].push(item);
    });
    const sorted = LEVEL_ORDER.filter(l => groups[l]).map(l => ({ level: l, nodes: groups[l].slice(0, MAX_PER_GROUP), total: groups[l].length }));
    return sorted;
  };

  const ancestorGroups = groupByLevel(ancestors);
  const descendantGroups = groupByLevel(descendants);
  const currentLevel = getLevelFromPath(courseId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="mt-6 p-6 bg-card rounded-[2rem] border border-border-strong shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-5">
        <GitBranch className="w-5 h-5 text-indigo-500" />
        <h3 className="text-base font-extrabold text-foreground tracking-tight">Ta Spirale d'Apprentissage</h3>
        <div className="ml-auto text-3xs font-bold text-muted-text bg-muted px-2 py-1 rounded-full">
          {ancestors.length} ancêtres · {descendants.length} successeurs
        </div>
      </div>

      <div className="overflow-x-auto pb-2 no-scrollbar -mx-2 px-2">
        <div className="flex items-center gap-1 min-w-max">
          {ancestorGroups.length === 0 ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-border-strong text-2xs text-muted-text font-semibold whitespace-nowrap">
              <GraduationCap className="w-3.5 h-3.5" /> Concept fondateur
            </div>
          ) : (
            ancestorGroups.map((group, gi) => (
              <React.Fragment key={`anc-${group.level}`}>
                <div className="flex flex-col gap-1.5">
                  <div className="text-3xs font-bold text-muted-text uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${levelDotColors[group.level] || 'bg-slate-400'}`} />
                    {group.level}
                  </div>
                  {group.nodes.map((node) => (
                    <div
                      key={node.id}
                      className={`px-2.5 py-1.5 rounded-lg border text-2xs font-semibold whitespace-nowrap leading-tight ${levelColors[node.level] || levelColors['Général']}`}
                    >
                      {node.title}
                    </div>
                  ))}
                  {group.total > MAX_PER_GROUP && (
                    <div className="text-3xs text-muted-text font-bold px-2.5 py-1">
                      +{group.total - MAX_PER_GROUP} autres
                    </div>
                  )}
                </div>
                {gi < ancestorGroups.length - 1 && (
                  <div className="flex flex-col items-center gap-0.5 self-center mx-1">
                    <ArrowRight className="w-3.5 h-3.5 text-muted-text-subtle" />
                  </div>
                )}
              </React.Fragment>
            ))
          )}

          <div className="mx-2 flex flex-col items-center self-stretch justify-center">
            <div className="w-0.5 flex-1 bg-gradient-to-b from-transparent via-border-strong to-transparent" />
          </div>

          <div className="flex flex-col items-center gap-1.5 min-w-[120px]">
            <div className={`px-4 py-2.5 rounded-xl border-2 text-sm font-extrabold whitespace-nowrap shadow-md ${levelColors[currentLevel] || levelColors['Général']}`}>
              📍 {meta.shortTitle}
            </div>
            <div className="flex items-center gap-1 text-3xs font-bold text-muted-text uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {currentLevel}
            </div>
          </div>

          <div className="mx-2 flex flex-col items-center self-stretch justify-center">
            <div className="w-0.5 flex-1 bg-gradient-to-b from-transparent via-border-strong to-transparent" />
          </div>

          {descendantGroups.length === 0 ? (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-border-strong text-2xs text-muted-text font-semibold whitespace-nowrap">
              <BookOpen className="w-3.5 h-3.5" /> Sommet du graphe
            </div>
          ) : (
            descendantGroups.map((group, gi) => (
              <React.Fragment key={`desc-${group.level}`}>
                <div className="flex flex-col gap-1.5">
                  <div className="text-3xs font-bold text-muted-text uppercase tracking-wider mb-0.5 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${levelDotColors[group.level] || 'bg-slate-400'}`} />
                    {group.level}
                  </div>
                  {group.nodes.map((node) => (
                    <div
                      key={node.id}
                      className={`px-2.5 py-1.5 rounded-lg border text-2xs font-semibold whitespace-nowrap leading-tight ${levelColors[node.level] || levelColors['Général']}`}
                    >
                      {node.title}
                    </div>
                  ))}
                  {group.total > MAX_PER_GROUP && (
                    <div className="text-3xs text-muted-text font-bold px-2.5 py-1">
                      +{group.total - MAX_PER_GROUP} autres
                    </div>
                  )}
                </div>
                {gi < descendantGroups.length - 1 && (
                  <div className="flex flex-col items-center gap-0.5 self-center mx-1">
                    <ArrowRight className="w-3.5 h-3.5 text-muted-text-subtle" />
                  </div>
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border-strong/50 flex items-center gap-3 text-3xs text-muted-text font-semibold flex-wrap">
        <span>Légende :</span>
        {LEVEL_ORDER.filter(l => l !== 'Général').map(level => (
          <span key={level} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${levelDotColors[level]}`} />
            {level}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
