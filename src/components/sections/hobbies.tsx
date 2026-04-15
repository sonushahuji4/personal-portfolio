'use client';

import { motion } from 'framer-motion';
import { Guitar, Piano, Target, Medal, Dumbbell, Code, Lightbulb, Puzzle, Globe } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { HOBBIES } from '@/data/hobbies';
import { SECTION_IDS } from '@/lib/constants';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Guitar, Piano, Target, Medal, Dumbbell, Code, Lightbulb, Puzzle, Globe,
};

const CATEGORY_CONFIG: Record<string, { emoji: string; gradient: string }> = {
  Music: { emoji: '🎵', gradient: 'from-pink-500/5 to-purple-500/5 hover:from-pink-500/10 hover:to-purple-500/10' },
  Sports: { emoji: '⚡', gradient: 'from-amber-500/5 to-orange-500/5 hover:from-amber-500/10 hover:to-orange-500/10' },
  Tech: { emoji: '💻', gradient: 'from-blue-500/5 to-cyan-500/5 hover:from-blue-500/10 hover:to-cyan-500/10' },
};

const CATEGORIES = ['Music', 'Sports', 'Tech'] as const;

const Hobbies = () => {
  return (
    <section id={SECTION_IDS.hobbies} className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading title="Beyond Code" subtitle="Things that keep me inspired and creative" />

        <div className="grid gap-8 sm:grid-cols-3">
          {CATEGORIES.map((category, ci) => {
            const items = HOBBIES.filter((h) => h.category === category);
            const config = CATEGORY_CONFIG[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.12 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-2xl">{config.emoji}</span>
                  <h3 className="font-display text-lg font-bold text-foreground">{category}</h3>
                </div>
                <div className="space-y-2">
                  {items.map((hobby, i) => {
                    const Icon = ICON_MAP[hobby.icon];
                    return (
                      <motion.div
                        key={hobby.name}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: ci * 0.12 + i * 0.06 }}
                        className={`flex items-center gap-3 rounded-xl bg-linear-to-r ${config.gradient} border border-transparent p-3.5 transition-all duration-300 hover:border-border hover:-translate-y-0.5`}
                      >
                        {Icon && <Icon size={16} className="shrink-0 text-accent" />}
                        <span className="text-sm font-medium text-foreground">{hobby.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
