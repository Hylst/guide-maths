import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Flame } from 'lucide-react';

interface StreakCalendarProps {
  progress: Record<string, { completed: boolean; completedAt?: string }>;
  currentStreak: number;
}

function formatDateStr(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTH_LABELS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

export default function StreakCalendar({ progress, currentStreak }: StreakCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const { activeDates, weeks, monthMarkers } = useMemo(() => {
    const activeSet = new Set<string>();
    Object.entries(progress).forEach(([, p]) => {
      if (p.completed && p.completedAt) {
        activeSet.add(p.completedAt.substring(0, 10));
      }
    });

    const today = new Date();
    const days: { dateStr: string; active: boolean; dayOfWeek: number; weekIndex: number }[] = [];

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);
    // Align to Monday
    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() - 1);
    }

    const msPerDay = 86400000;
    const startTime = startDate.getTime();
    const todayTime = today.getTime();
    const totalDays = Math.ceil((todayTime - startTime) / msPerDay) + 1;

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startTime + i * msPerDay);
      const dateStr = formatDateStr(d);
      days.push({
        dateStr,
        active: activeSet.has(dateStr),
        dayOfWeek: (d.getDay() + 6) % 7, // Monday=0, Sunday=6
        weekIndex: Math.floor(i / 7),
      });
    }

    const totalWeeks = Math.ceil(days.length / 7);

    // Month markers
    const markers: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    days.forEach((day, i) => {
      const month = new Date(day.dateStr).getMonth();
      if (month !== lastMonth) {
        markers.push({ label: MONTH_LABELS[month], weekIndex: Math.floor(i / 7) });
        lastMonth = month;
      }
    });

    return { activeDates: days, weeks: totalWeeks, monthMarkers: markers };
  }, [progress]);

  const levels = ['bg-muted/30', 'bg-emerald-200/50 dark:bg-emerald-900/30', 'bg-emerald-400/60 dark:bg-emerald-700/50', 'bg-emerald-500/80 dark:bg-emerald-600/70', 'bg-emerald-600 dark:bg-emerald-500'];

  const CELL_SIZE = 14;
  const CELL_GAP = 3;
  const LABEL_WIDTH = 32;
  const HEADER_HEIGHT = 18;

  const svgWidth = weeks * (CELL_SIZE + CELL_GAP) + LABEL_WIDTH + 10;
  const svgHeight = 7 * (CELL_SIZE + CELL_GAP) + HEADER_HEIGHT + 10;

  const dayPositions = activeDates.map((day, i) => ({
    ...day,
    x: LABEL_WIDTH + day.weekIndex * (CELL_SIZE + CELL_GAP),
    y: HEADER_HEIGHT + day.dayOfWeek * (CELL_SIZE + CELL_GAP),
    level: day.active ? 1 : 0,
  }));

  return (
    <div className="bg-card p-6 rounded-2xl border border-border-strong shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-amber-500" /> Calendrier d'Activité
        </h3>
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-text">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>{currentStreak} jours</span>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-full h-auto select-none" style={{ minWidth: '500px' }}>
          {/* Month labels */}
          {monthMarkers.map((m, i) => (
            <text
              key={`month-${i}`}
              x={LABEL_WIDTH + m.weekIndex * (CELL_SIZE + CELL_GAP)}
              y="10"
              className="fill-muted-text text-2xs font-bold"
              fontSize="9"
            >
              {m.label}
            </text>
          ))}

          {/* Day labels */}
          {DAY_LABELS.map((label, i) => (
            <text
              key={`day-${i}`}
              x="6"
              y={HEADER_HEIGHT + i * (CELL_SIZE + CELL_GAP) + CELL_SIZE - 2}
              className="fill-muted-text text-2xs font-bold"
              fontSize="8"
              textAnchor="end"
            >
              {label}
            </text>
          ))}

          {/* Cells */}
          {dayPositions.map((day, i) => (
            <motion.rect
              key={day.dateStr}
              x={day.x}
              y={day.y}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx="3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.002 }}
              className={levels[day.level]}
              onMouseEnter={() => setHoveredDay(day.dateStr)}
              onMouseLeave={() => setHoveredDay(null)}
            />
          ))}
        </svg>
      </div>

      {hoveredDay && (
        <p className="text-2xs text-muted-text font-semibold text-center">
          {hoveredDay} — {activeDates.find(d => d.dateStr === hoveredDay)?.active ? '✅ Actif' : '—'}
        </p>
      )}

      <div className="flex items-center justify-end gap-1 text-2xs font-bold text-muted-text">
        <span>Moins</span>
        {levels.map((cls, i) => (
          <div key={i} className={`w-3 h-3 rounded ${cls}`} />
        ))}
        <span>Plus</span>
      </div>
    </div>
  );
}
