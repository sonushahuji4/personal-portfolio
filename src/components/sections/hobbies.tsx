'use client';

import { motion } from 'framer-motion';
import {
  Guitar, Piano, Target, Medal, Dumbbell,
  Code, Lightbulb, Puzzle, Globe,
} from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { HOBBIES } from '@/data/hobbies';
import { SECTION_IDS } from '@/lib/constants';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Guitar, Piano, Target, Medal, Dumbbell, Code, Lightbulb, Puzzle, Globe,
};

const CATEGORY_CONFIG: Record<string, { emoji: string; color: string }> = {
  Music: { emoji: '🎵', color: 'from-pink-500/10 to-purple-500/10' },
  Sports: { emoji: '⚡', color: 'from-amber-500/10 to-orange-500/10' },
  Tech: { emoji: '💻', color: 'from-blue-500/10 to-cyan-500/10' },
};

const CATEGORY_LABELS = ['Music', 'Sports', 'Tech'] as const;

const Hobbies = () => {
  return (
    <section id={SECTION_IDS.hobbies} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Hobbies & Interests"
          subtitle="Beyond the code — things that keep me inspired"
        />

        <div className="grid gap-8 sm:grid-cols-3">
          {CATEGORY_LABELS.map((category, ci) => {
            const items = HOBBIES.filter((h) => h.category === category);
            const config = CATEGORY_CONFIG[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.15 }}
              >
                <div className="mb-4 text-center">
                  <span className="text-2xl">{config.emoji}</span>
                  <h3 className="mt-1 font-display text-base font-semibold text-foreground">
                    {category}
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {items.map((hobby, i) => {
                    const Icon = ICON_MAP[hobby.icon];
                    return (
                      <motion.div
                        key={hobby.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: ci * 0.15 + i * 0.08 }}
                        className={`flex items-center gap-3 rounded-xl border border-border bg-linear-to-r ${config.color} p-4 transition-all hover:border-border-hover hover:-translate-y-0.5`}
                      >
                        {Icon && <Icon size={18} className="shrink-0 text-accent" />}
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
