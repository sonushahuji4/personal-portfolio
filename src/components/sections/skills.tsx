'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Database, Cloud, Blocks, Lightbulb } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { SKILL_CATEGORIES } from '@/data/skills';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { TECH_ICON_MAP } from '@/components/common/tech-icons';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor, Server, Database, Cloud, Blocks, Lightbulb,
};

const CATEGORY_COLORS = ['#A78BFA', '#6EE7B7', '#67E8F9', '#F472B6', '#FCD34D', '#A5B4FC'];

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id={SECTION_IDS.skills} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Tech Stack" subtitle="Technologies and tools I build with" accent="#6366f1" />

        {/* Category tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-2">
            {SKILL_CATEGORIES.map((cat, i) => {
              const Icon = ICON_MAP[cat.icon];
              const color = CATEGORY_COLORS[i];
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveTab(i)}
                  aria-pressed={activeTab === i}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all',
                    activeTab === i
                      ? 'text-white shadow-lg'
                      : 'text-muted hover:text-foreground hover:bg-background/50'
                  )}
                  style={activeTab === i ? { backgroundColor: color, boxShadow: `0 4px 14px ${color}33` } : {}}
                >
                  {Icon && <Icon size={15} />}
                  <span className="hidden sm:inline">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Grid — icon + name like the reference screenshot */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-4xl"
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {SKILL_CATEGORIES[activeTab].skills.map((skill, si) => {
                const TechIcon = TECH_ICON_MAP[skill.name];
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25, delay: si * 0.03 }}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card/80 backdrop-blur-sm px-4 py-3 transition-all duration-300 hover:border-border-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-shadow"
                  >
                    {TechIcon ? (
                      <TechIcon size={32} />
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold" style={{ backgroundColor: CATEGORY_COLORS[activeTab] + '12', color: CATEGORY_COLORS[activeTab] }}>
                        {skill.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Other categories as mini pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {SKILL_CATEGORIES.map((cat, i) => {
            if (i === activeTab) return null;
            const Icon = ICON_MAP[cat.icon];
            return (
              <button
                key={cat.name}
                onClick={() => setActiveTab(i)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted transition-all hover:border-border-hover hover:text-foreground"
              >
                {Icon && <Icon size={12} />}
                {cat.name}
                <span className="text-muted-foreground">({cat.skills.length})</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
