'use client';

import { motion } from 'framer-motion';
import { Code, Globe, Puzzle, Target, Medal, Dumbbell, Piano, Lightbulb } from 'lucide-react';
import { HOBBIES } from '@/data/hobbies';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code, Globe, Puzzle, Target, Medal, Dumbbell, Piano, Lightbulb,
};

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  Tech: { label: 'Tech', color: '#06B6D4' },
  Sports: { label: 'Sports', color: '#F59E0B' },
  Music: { label: 'Chill', color: '#D946EF' },
};

const categories = ['Tech', 'Sports', 'Music'] as const;

const InterestsStrip = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-10 sm:py-14"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
          Beyond code
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categories.map((cat, catIdx) => {
            const items = HOBBIES.filter((h) => h.category === cat);
            const meta = CATEGORY_META[cat];

            return (
              <div key={cat} className="contents">
                {/* Category divider dot (between groups, not before first) */}
                {catIdx > 0 && (
                  <span
                    className="hidden sm:block h-1 w-1 rounded-full mx-1"
                    style={{ backgroundColor: 'var(--muted-foreground)', opacity: 0.2 }}
                  />
                )}

                {items.map((hobby, i) => {
                  const Icon = ICON_MAP[hobby.icon];
                  return (
                    <motion.span
                      key={hobby.name}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: catIdx * 0.1 + i * 0.05 }}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground transition-all duration-200 hover:border-opacity-50 hover:text-foreground hover:bg-card"
                      style={{
                        '--hover-color': meta.color,
                      } as React.CSSProperties}
                    >
                      {Icon && (
                        <span className="opacity-50 transition-all duration-200 group-hover:opacity-100" style={{ color: meta.color }}>
                          <Icon size={12} />
                        </span>
                      )}
                      {hobby.name}
                    </motion.span>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default InterestsStrip;
