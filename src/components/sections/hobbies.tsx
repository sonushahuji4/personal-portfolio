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
  Guitar,
  Piano,
  Target,
  Medal,
  Dumbbell,
  Code,
  Lightbulb,
  Puzzle,
  Globe,
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

        <div className="grid gap-10 sm:grid-cols-3">
          {CATEGORY_LABELS.map((category) => {
            const items = HOBBIES.filter((h) => h.category === category);
            return (
              <div key={category}>
                <h3 className="mb-4 text-center font-display text-base font-semibold text-accent">
                  {category}
                </h3>
                <div className="space-y-3">
                  {items.map((hobby, i) => {
                    const Icon = ICON_MAP[hobby.icon];
                    return (
                      <motion.div
                        key={hobby.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border-hover hover:bg-card-hover"
                      >
                        {Icon && <Icon size={20} className="shrink-0 text-accent" />}
                        <span className="text-sm text-foreground">{hobby.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
