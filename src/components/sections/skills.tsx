'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Database, Cloud, Blocks, Lightbulb } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { SKILL_CATEGORIES } from '@/data/skills';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor, Server, Database, Cloud, Blocks, Lightbulb,
};

const CATEGORY_COLORS = [
  'from-blue-500/10 to-indigo-500/10',
  'from-emerald-500/10 to-teal-500/10',
  'from-amber-500/10 to-orange-500/10',
  'from-violet-500/10 to-purple-500/10',
  'from-rose-500/10 to-pink-500/10',
  'from-cyan-500/10 to-sky-500/10',
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id={SECTION_IDS.skills} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="Skills & Expertise" subtitle="Technologies and practices I work with daily" />

        {/* Category tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-2xl border border-border bg-card p-2">
            {SKILL_CATEGORIES.map((cat, i) => {
              const Icon = ICON_MAP[cat.icon];
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveTab(i)}
                  aria-pressed={activeTab === i}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all',
                    activeTab === i
                      ? 'bg-accent text-white shadow-lg shadow-accent/20'
                      : 'text-muted hover:text-foreground hover:bg-background'
                  )}
                >
                  {Icon && <Icon size={15} />}
                  <span className="hidden sm:inline">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active category skills */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-3xl"
          >
            <div className={`rounded-2xl border border-border bg-linear-to-br ${CATEGORY_COLORS[activeTab]} p-8`}>
              <div className="mb-6 flex items-center gap-3">
                {(() => { const Icon = ICON_MAP[SKILL_CATEGORIES[activeTab].icon]; return Icon ? <Icon size={24} className="text-accent" /> : null; })()}
                <h3 className="font-display text-xl font-bold text-foreground">
                  {SKILL_CATEGORIES[activeTab].name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {SKILL_CATEGORIES[activeTab].skills.map((skill, si) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: si * 0.03 }}
                    className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-accent/30 hover:bg-accent-muted hover:text-accent hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All categories grid (visible below) */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, i) => {
            const Icon = ICON_MAP[category.icon];
            if (i === activeTab) return null;
            return (
              <motion.button
                key={category.name}
                onClick={() => setActiveTab(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`rounded-xl border border-border bg-linear-to-br ${CATEGORY_COLORS[i]} p-5 text-left transition-all hover:border-border-hover hover:-translate-y-0.5 hover:shadow-md`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon size={16} className="text-accent" />}
                  <h4 className="font-display text-sm font-semibold text-foreground">{category.name}</h4>
                </div>
                <p className="mt-2 text-xs text-muted">{category.skills.length} skills</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
