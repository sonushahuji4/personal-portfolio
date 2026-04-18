'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Mountain, Cpu, Smartphone, CloudRain, Globe, DoorOpen, Sun, Brain, Coffee, Infinity } from 'lucide-react';
import type { Chapter } from '@/types/life-circle';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Sparkles, BookOpen, Mountain, Cpu, Smartphone, CloudRain, Globe, DoorOpen, Sun, Brain, Coffee, Infinity,
};

interface VerticalTimelineProps {
  chapters: Chapter[];
  onSelectChapter: (id: number) => void;
}

const VerticalTimeline = ({ chapters, onSelectChapter }: VerticalTimelineProps) => {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-linear-to-b from-accent/30 via-accent/15 to-transparent" />

      {chapters.map((chapter, i) => {
        const Icon = ICON_MAP[chapter.icon];
        return (
          <motion.button
            key={chapter.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => onSelectChapter(chapter.id)}
            className="group relative mb-4 last:mb-0 w-full text-left rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 transition-all duration-300 hover:border-border-hover hover:-translate-y-0.5 hover:shadow-lg"
            aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
          >
            {/* Dot on timeline */}
            <div className="absolute -left-[25px] top-5 h-3 w-3 rounded-full transition-transform group-hover:scale-150"
              style={{ backgroundColor: chapter.accentColor }} />

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: chapter.accentColor + '15' }}>
                {Icon && <Icon size={16} />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: chapter.accentColor }}>{chapter.number}</span>
                  <span className="text-sm font-semibold text-foreground">{chapter.title}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{chapter.teaser}</p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default VerticalTimeline;
