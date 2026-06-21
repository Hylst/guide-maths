import React from 'react';
import { motion } from 'framer-motion';
import { CONCEPT_METADATA, DOMAIN_DETAILS } from '../data/concept_links';

interface JourneyMapProps {
  progress: Record<string, { completed: boolean; completedAt?: string }>;
}

const TAILWIND_TO_HEX: Record<string, string> = {
  emerald: '#10b981',
  amber: '#f59e0b',
  blue: '#3b82f6',
  rose: '#f43f5e',
  purple: '#a855f7',
  indigo: '#6366f1',
  slate: '#64748b',
};

const LEVEL_ORDER = [
  'PS', 'MS', 'GS',
  'CP', 'CE1', 'CE2', 'CM1', 'CM2',
  '6eme', '5eme', '4eme', '3eme',
  'Seconde', 'Premiere', 'Terminale',
  'Terminale_Complementaires', 'Terminale_Expertes',
  'Professionnel', 'Technologique',
  'Tronc_Commun', 'Analyse_L1', 'Analyse_L2', 'Probabilites',
  'Universite_L2_L3', 'Licence_Maths', 'Licence_MIASHS',
  'BUT_Industriel', 'Prepa_Maths', 'Prepa_Physique', 'Prepa_Info',
];

function extractLevel(courseId: string): string {
  const parts = courseId.split('/');
  for (let i = 0; i < parts.length; i++) {
    if (LEVEL_ORDER.includes(parts[i])) return parts[i];
  }
  return '';
}

function extractDomain(courseId: string): string {
  const meta = CONCEPT_METADATA[courseId];
  return meta?.domain || 'general';
}

function shortTitle(courseId: string): string {
  const meta = CONCEPT_METADATA[courseId];
  if (meta?.shortTitle) return meta.shortTitle;
  return courseId.split('/').pop()?.replace('.md', '').replace(/^\d+_/, '') || courseId;
}

export default function JourneyMap({ progress }: JourneyMapProps) {
  const entries = Object.entries(progress)
    .filter(([, p]) => p.completed && p.completedAt)
    .sort(([, a], [, b]) => new Date(a.completedAt!).getTime() - new Date(b.completedAt!).getTime());

  if (entries.length < 2) {
    return (
      <div className="bg-card p-6 rounded-2xl border border-border-strong text-center text-sm text-muted-text font-semibold">
        Complète au moins 2 cours pour voir ta carte de parcours
      </div>
    );
  }

  const points = entries.map(([courseId, p]) => ({
    courseId,
    title: shortTitle(courseId),
    level: extractLevel(courseId),
    domain: extractDomain(courseId),
    date: p.completedAt!.substring(0, 10),
    yIndex: LEVEL_ORDER.indexOf(extractLevel(courseId)),
  }));

  const validPoints = points.filter(p => p.yIndex >= 0);
  if (validPoints.length < 2) {
    return (
      <div className="bg-card p-6 rounded-2xl border border-border-strong text-center text-sm text-muted-text font-semibold">
        Niveaux non reconnus pour la carte de parcours
      </div>
    );
  }

  const minY = Math.min(...validPoints.map(p => p.yIndex));
  const maxY = Math.max(...validPoints.map(p => p.yIndex));
  const yRange = maxY - minY || 1;
  const svgHeight = 200;
  const svgWidth = Math.max(300, validPoints.length * 60);

  const xPos = (i: number) => 30 + (i / (validPoints.length - 1)) * (svgWidth - 60);
  const yPos = (yIndex: number) => svgHeight - 20 - ((yIndex - minY) / yRange) * (svgHeight - 60);

  const pathD = validPoints.map((p, i) => {
    const x = xPos(i);
    const y = yPos(p.yIndex);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="bg-card p-6 rounded-2xl border border-border-strong shadow-sm space-y-4">
      <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        Carte de Parcours
      </h3>
      <div className="overflow-x-auto no-scrollbar">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none" style={{ minWidth: `${Math.min(svgWidth, 800)}px` }}>
          <path d={pathD} fill="none" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="6 4" />
          {validPoints.map((p, i) => {
            const cx = xPos(i);
            const cy = yPos(p.yIndex);
            const domainDetail = DOMAIN_DETAILS[p.domain as keyof typeof DOMAIN_DETAILS];
            const color = domainDetail ? TAILWIND_TO_HEX[domainDetail.color] || '#6366f1' : '#6366f1';
            return (
              <motion.g
                key={p.courseId}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, type: 'spring', stiffness: 200 }}
              >
                <circle cx={cx} cy={cy} r="8" fill={color} stroke="white" strokeWidth="2.5" />
                <title>{p.title} ({p.date})</title>
              </motion.g>
            );
          })}
        </svg>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(DOMAIN_DETAILS).filter(([key]) => key !== 'general').map(([domain, details]) => {
          const color = TAILWIND_TO_HEX[details.color] || '#6366f1';
          return (
            <span key={domain} className="flex items-center gap-1 text-2xs font-bold text-muted-text">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              {details.label}
            </span>
          );
        })}
      </div>
      <p className="text-2xs text-muted-text font-semibold text-center">
        {validPoints.length} cours complétés — chaque point représente un chapitre, reliés par ordre chronologique
      </p>
    </div>
  );
}
